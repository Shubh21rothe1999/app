// Single source of truth for all portfolio content.
export const PROFILE = {
  name: "Shubham Rothe",
  title: "Senior Data Engineer",
  tagline:
    "Databricks · PySpark · SQL · Cloud — building Lakehouse pipelines that move billions of rows reliably.",
  email: "shubhamrothe144@gmail.com",
  phone: "+91 7030757629",
  location: "Pune, India",
  linkedin: "https://www.linkedin.com/in/shubham-rothe-5099941bb/",
  github: "",
  startDate: "2022-07-04",
  photo: "/shubham.jpg",
  resumeUrl: "/Shubham_Rothe_Data_Engineer.pdf",
  resumeFileName: "Shubham_Rothe_Data_Engineer.pdf",
};

export const SUMMARY = `Data Engineer with 4 years of experience designing, developing, and supporting scalable ETL/ELT pipelines for financial, banking, and loan datasets. Hands-on expertise in Databricks, PySpark, SQL Server (T-SQL), Python, and Prophecy ETL — delivering cloud-native solutions on Lakehouse and Medallion architecture. Strong focus on ingestion, transformation, orchestration, validation, and production support.`;

export const SKILLS = [
  {
    group: "Languages",
    items: ["Python", "SQL", "T-SQL", "PL/SQL"],
  },
  {
    group: "Big Data & Spark",
    items: ["Apache Spark", "PySpark", "Delta Lake", "Auto Loader", "Structured Streaming"],
  },
  {
    group: "Cloud & Platforms",
    items: ["Databricks", "AWS S3", "Azure", "Snowflake", "Unity Catalog"],
  },
  {
    group: "Databases",
    items: ["MS SQL Server", "MySQL", "Oracle", "PostgreSQL", "MongoDB"],
  },
  {
    group: "ETL & Orchestration",
    items: ["Prophecy", "Pentaho", "JAMS Scheduler", "Apache Airflow*"],
  },
  {
    group: "DevOps & Tools",
    items: ["GitLab CI/CD", "Terraform", "VS Code", "Gitpod"],
  },
  {
    group: "Architecture",
    items: ["Medallion", "Lakehouse", "Star Schema", "Snowflake Schema", "SCD Type-2"],
  },
];

export const EXPERIENCE = [
  {
    company: "Accenture",
    role: "Senior Data Engineer",
    location: "Pune, India",
    period: "May 2026 — Present",
    active: true,
    projects: [
      {
        title: "Joined — projects in onboarding",
        role: "Senior Data Engineer",
        tags: ["Databricks", "PySpark", "Cloud", "Azure", "AWS"],
        bullets: [
          "Onboarded into Accenture's Data & AI practice as a Senior Data Engineer.",
          "Bringing 4+ years of Lakehouse, Medallion architecture and Spark expertise from Decimal Point Analytics.",
          "Project assignment and detailed deliverables to be added as engagements begin.",
        ],
      },
    ],
  },
  {
    company: "Decimal Point Analytics",
    role: "Senior Data Engineer",
    location: "Mumbai (HQ) · Working from Nashik",
    period: "Jul 2022 — April 2026",
    active: false,
    projects: [
      {
        title: "Servicer Data Onboarding — Medallion Architecture",
        role: "Senior Data Engineer · Project Lead",
        tags: ["Databricks", "PySpark", "Delta Lake", "AWS S3", "Prophecy", "Unity Catalog", "JAMS"],
        bullets: [
          "Led 2 junior developers and ran a 20-day PySpark / SQL / Databricks training to accelerate onboarding.",
          "Designed ETL/ELT pipelines in Databricks and Prophecy processing 10M+ financial records from CSV, Excel, JSON, TXT.",
          "Implemented Medallion Architecture (Bronze → Silver → Gold) for raw ingest, cleansing, validation and analytics-ready datasets.",
          "Automated FTP → AWS S3 ingestion in Python and downstream Databricks transformations.",
          "Built reusable, parameterized Databricks notebooks for ingestion, transformation, validation and reporting.",
          "Delta Lake at scale: MERGE, OPTIMIZE, Z-ORDER, VACUUM and schema evolution.",
          "Data quality / validation framework with logging and audit controls.",
          "Orchestrated workflows in JAMS Scheduler with failure handling and SLA monitoring.",
          "Parallel-execution controller notebook for concurrent ingest across deals — eliminated sequential bottlenecks.",
          "Auto Loader (cloudFiles) with structured streaming, schema inference and checkpointing.",
          "Spark tuning (partitioning, caching, broadcast joins) — up to 40% performance gain.",
          "Migrated 100+ Databricks jobs from DBFS / mount paths to Unity Catalog external volumes.",
        ],
      },
      {
        title: "US Banking & Client Data Integration",
        role: "Senior Data Engineer · ETL & Database",
        tags: ["SQL Server", "T-SQL", "Pentaho", "Stored Procedures", "Data Modeling"],
        bullets: [
          "Developed dynamic stored procedures, functions and parameter-driven SQL for financial reporting.",
          "Applied complex business rules across fact and dimension tables using optimized joins and aggregations.",
          "Automated incremental and quarterly loads with accuracy and consistency checks.",
          "Designed ER diagrams and optimized schemas for performance and scalability.",
        ],
      },
      {
        title: "Mutual Fund Automation",
        role: "Senior Data Engineer · ETL",
        tags: ["Pentaho", "Oracle", "SQL Server", "PL/SQL", "Star Schema"],
        bullets: [
          "Built Pentaho ETL workflows for NAV and holdings ingestion from CSV / TXT / Excel.",
          "Designed star-schema fact and dimension tables.",
          "Implemented incremental loads and validation checks reaching 99.8% data accuracy.",
          "Developed SQL/PLSQL procedures supporting MIS reporting dashboards.",
        ],
      },
    ],
  },
];

export const PROJECT_CARDS = [
  {
    id: "medallion",
    title: "Medallion Data Platform",
    sub: "Bronze · Silver · Gold on Delta Lake",
    desc: "Production-grade lakehouse pipelines on Databricks processing 10M+ records with Auto Loader, Delta MERGE/OPTIMIZE/Z-ORDER and Unity Catalog migration.",
    stack: ["Databricks", "PySpark", "Delta Lake", "AWS S3", "Prophecy"],
    metric: "+40% Spark performance",
  },
  {
    id: "banking",
    title: "US Banking Data Warehouse",
    sub: "SQL Server · Dynamic T-SQL",
    desc: "Reporting backbone for US banking clients — dynamic stored procedures, parameter-driven ETL, incremental and quarterly loads with ER-modelled schemas.",
    stack: ["SQL Server", "T-SQL", "Pentaho", "Stored Procs"],
    metric: "Real-time sync",
  },
  {
    id: "mutualfund",
    title: "Mutual Fund ETL System",
    sub: "Star Schema · NAV & Holdings",
    desc: "Pentaho workflows ingesting NAV and holdings, modelled on a star schema with PL/SQL procedures powering MIS dashboards.",
    stack: ["Pentaho", "Oracle", "PL/SQL", "Star Schema"],
    metric: "99.8% data accuracy",
  },
];

export const EDUCATION = {
  degree: "Bachelor of Engineering — Information Technology",
  school: "Savitribai Phule Pune University",
  period: "2018 — 2022",
  cgpa: "CGPA 9.03",
};
