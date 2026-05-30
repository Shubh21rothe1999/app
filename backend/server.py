from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

from emergentintegrations.llm.chat import LlmChat, UserMessage


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY', '')

app = FastAPI(title="Shubham Rothe - Portfolio API")
api_router = APIRouter(prefix="/api")

# ---------- Resume context (single source of truth for chatbot) ----------
RESUME_CONTEXT = """
You are "DE Career Assistant", a precise, concise AI that answers ONLY questions about
Shubham Rothe's documented Data Engineering experience as listed below. You speak in
clear recruiter-friendly language. NEVER invent skills, tools, dates, employers, or
projects. If a question is outside the documented experience, reply EXACTLY:
"This information is not part of Shubham's documented experience. You can reach out to him directly via the Contact page."

==== PROFILE ====
Name: Shubham Rothe
Title: Senior Data Engineer
Location: Pune, India
Email: shubhamrothe144@gmail.com
Phone: +91 7030757629
LinkedIn: https://www.linkedin.com/in/shubham-rothe-5099941bb/
Experience Start: 04 July 2022 (4+ years)

==== PROFESSIONAL SUMMARY ====
Data Engineer with 4 years of experience designing, developing, and supporting scalable
ETL/ELT pipelines for financial, banking, and loan datasets. Strong hands-on expertise in
Databricks, PySpark, SQL Server (T-SQL), MySQL Workbench, Python, and Prophecy ETL,
delivering cloud-native solutions using Lakehouse and Medallion Architecture. Experienced
in data ingestion, transformation, orchestration, validation, and production support.
Skilled in Apache Spark, Snowflake, AWS, Azure, batch and streaming data processing,
SCD Type-2 modeling, and data pipeline optimization.

==== SKILLS ====
- Languages: Python, SQL, T-SQL
- Big Data: Apache Spark, PySpark, Delta Lake, ETL/ELT pipelines
- Cloud & Data Platforms: Databricks, Delta Lake, Medallion Architecture, Snowflake, AWS, Azure
- Databases: MS SQL Server (SSMS), MySQL Workbench, MongoDB, Oracle, PostgreSQL
- DevOps: GitLab, JAMS Scheduler, Terraform (IaC), Monitoring & Observability
- ETL & Orchestration: Prophecy, Pentaho
- Core: Data Modeling, Medallion Architecture, Batch Processing, Stream Processing,
  Data Warehousing, Data Lakehouse, Data Governance, Star Schema, Snowflake Schema
- Interested in: Apache Kafka, Apache Airflow, dbt, Azure Data Factory, Azure Synapse

==== EXPERIENCE ====
Current Employer: Accenture, Pune, India
Current Role: Senior Data Engineer
Current Duration: May 2026 - Present
(Just joined Accenture's Data & AI practice — project assignment in onboarding phase.)

Previous Employer: Decimal Point Analytics, Mumbai (HQ), Working Location: Nashik
Previous Role: Senior Data Engineer (Software Development Engineer track)
Previous Duration: Jul 2022 - April 2026 (Completed)

All flagship project experience below is from the Decimal Point Analytics tenure:

PROJECT 1: Servicer Data Onboarding (Medallion Architecture)
- Led a team of 2 junior developers; ran a 20-day PySpark/SQL/Databricks training.
- Built scalable ETL/ELT pipelines in Databricks and Prophecy processing 10M+ financial
  records from CSV, Excel, JSON and text files.
- Implemented Medallion Architecture (Bronze-Silver-Gold).
- Automated FTP -> AWS S3 ingestion in Python, then Databricks transformations.
- Reusable, parameterized Databricks notebooks.
- Delta Lake: MERGE, OPTIMIZE, Z-ORDER, VACUUM, schema evolution.
- Data quality and validation frameworks with audit logging.
- Orchestrated workflows via JAMS Scheduler with SLA monitoring.
- Parallel-execution controller notebook for concurrent ingest across deals.
- Databricks Auto Loader (cloudFiles) with structured streaming + checkpointing.
- Spark tuning (partitioning, caching, broadcast joins) -> up to 40% performance gain.
- Migrated 100+ Databricks jobs from DBFS/mount paths to Unity Catalog external volumes.
- Production support, incident handling, release validation.

PROJECT 2: US Banking & Client Data Integration
- Developed dynamic stored procedures, functions, parameter-driven SQL.
- Built reporting models, applied complex business rules on fact/dim tables.
- Automated incremental and quarterly loads with consistency checks.
- Designed ER diagrams and optimized schemas for performance.

PROJECT 3: Mutual Fund Automation
- Pentaho ETL workflows for NAV and holdings ingestion (CSV/TXT/Excel).
- Star-schema fact/dimension design.
- Incremental loads + validation achieving 99.8% data accuracy.
- Developed SQL/PLSQL procedures for reporting and backend support for MIS dashboards.

==== EDUCATION ====
Bachelor of Engineering (Information Technology)
Savitribai Phule Pune University | 2018 – 2022 | CGPA: 9.03

==== STYLE RULES ====
- Keep answers concise (3-6 sentences) unless the user asks for detail.
- Use technical precision; explain like a senior engineer talking to a recruiter.
- Always ground answers in the above content only.
- If asked "contact", share email/phone/LinkedIn from the profile section.
"""


# ---------- Models ----------
class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None


class ChatResponse(BaseModel):
    session_id: str
    reply: str


class ContactCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    message: str = Field(min_length=1, max_length=5000)


class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"service": "shubham-portfolio-api", "status": "ok"}


@api_router.get("/health")
async def health():
    return {"status": "healthy", "time": datetime.now(timezone.utc).isoformat()}


@api_router.post("/contact", response_model=ContactMessage)
async def create_contact(payload: ContactCreate):
    msg = ContactMessage(name=payload.name, email=payload.email, message=payload.message)
    doc = msg.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_messages.insert_one(doc)
    return msg


@api_router.get("/contact", response_model=List[ContactMessage])
async def list_contacts():
    items = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for it in items:
        if isinstance(it.get('created_at'), str):
            it['created_at'] = datetime.fromisoformat(it['created_at'])
    return items


@api_router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(req: ChatRequest):
    if not EMERGENT_LLM_KEY:
        raise HTTPException(status_code=500, detail="LLM key not configured")

    session_id = req.session_id or str(uuid.uuid4())
    user_text = (req.message or "").strip()
    if not user_text:
        raise HTTPException(status_code=400, detail="Message is required")

    try:
        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=session_id,
            system_message=RESUME_CONTEXT,
        ).with_model("gemini", "gemini-3-flash-preview")

        reply = await chat.send_message(UserMessage(text=user_text))

        # Persist for audit
        await db.chat_messages.insert_one({
            "session_id": session_id,
            "user": user_text,
            "assistant": reply,
            "created_at": datetime.now(timezone.utc).isoformat(),
        })

        return ChatResponse(session_id=session_id, reply=reply)
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("Chat error: %s", e)
        raise HTTPException(status_code=500, detail=f"Chat error: {str(e)}")


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
