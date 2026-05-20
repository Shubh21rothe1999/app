// Vercel Serverless Function — /api/chat
// Runs on Vercel's free tier (100k invocations/month, lifetime free)
// Uses Google's native Gemini API (free key from https://aistudio.google.com/app/apikey)

const RESUME_CONTEXT = `
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
ETL/ELT pipelines for financial, banking, and loan datasets. Hands-on expertise in
Databricks, PySpark, SQL Server (T-SQL), MySQL Workbench, Python, and Prophecy ETL,
delivering cloud-native solutions using Lakehouse and Medallion Architecture.

==== SKILLS ====
- Languages: Python, SQL, T-SQL, PL/SQL
- Big Data: Apache Spark, PySpark, Delta Lake, Auto Loader, Structured Streaming
- Cloud & Platforms: Databricks, AWS S3, Azure, Snowflake, Unity Catalog
- Databases: MS SQL Server, MySQL, Oracle, PostgreSQL, MongoDB
- DevOps: GitLab CI/CD, JAMS Scheduler, Terraform
- ETL & Orchestration: Prophecy, Pentaho
- Architecture: Medallion, Lakehouse, Star Schema, SCD Type-2

==== EXPERIENCE ====
Company: Decimal Point Analytics, Mumbai (HQ), Nashik
Role: Senior Data Engineer (Software Development Engineer track)
Duration: Jul 2022 - Present

PROJECT 1: Servicer Data Onboarding (Medallion Architecture)
- Led team of 2 juniors; ran 20-day PySpark/SQL/Databricks training.
- ETL/ELT pipelines in Databricks + Prophecy processing 10M+ records.
- Implemented Medallion (Bronze/Silver/Gold).
- Automated FTP -> AWS S3 ingest in Python; Databricks transformations.
- Delta Lake: MERGE, OPTIMIZE, Z-ORDER, VACUUM, schema evolution.
- JAMS Scheduler orchestration with SLA monitoring.
- Auto Loader (cloudFiles) with structured streaming + checkpointing.
- Spark tuning gave up to 40% performance gain.
- Migrated 100+ Databricks jobs to Unity Catalog external volumes.

PROJECT 2: US Banking & Client Data Integration
- Dynamic stored procedures, functions, parameter-driven SQL.
- Optimized fact/dim joins, automated incremental + quarterly loads.
- ER diagrams and schema design for performance.

PROJECT 3: Mutual Fund Automation
- Pentaho ETL for NAV/holdings from CSV/TXT/Excel.
- Star schema fact/dim design.
- Incremental loads at 99.8% data accuracy.

==== EDUCATION ====
Bachelor of Engineering (IT) | Savitribai Phule Pune University | 2018-2022 | CGPA 9.03

==== STYLE ====
- Keep answers concise (3-6 sentences) unless asked for detail.
- Ground every answer in the data above. Refuse cleanly if not present.
`;

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GEMINI_API_KEY not configured" });
  }

  try {
    const { message } = req.body || {};
    if (!message || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Call Gemini API directly (free tier on Google AI Studio)
    const model = "gemini-2.0-flash-exp"; // Free, fast, public Gemini model
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const body = {
      systemInstruction: { parts: [{ text: RESUME_CONTEXT }] },
      contents: [{ role: "user", parts: [{ text: message }] }],
      generationConfig: { temperature: 0.3, maxOutputTokens: 600 },
    };

    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!r.ok) {
      const errText = await r.text();
      return res.status(502).json({ error: "Gemini upstream error", detail: errText });
    }

    const data = await r.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") ||
      "I couldn't generate a reply just now. Please try again.";

    return res.status(200).json({ session_id: "vercel", reply });
  } catch (e) {
    return res.status(500).json({ error: "Chat failed", detail: String(e) });
  }
}
