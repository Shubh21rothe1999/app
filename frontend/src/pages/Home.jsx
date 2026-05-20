import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Download, Database, Cloud, GitBranch, Cpu } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import ExperienceCounter from "../components/ExperienceCounter";
import { PROFILE } from "../lib/portfolio";

const HIGHLIGHT_SKILLS = [
  "Databricks",
  "PySpark",
  "Delta Lake",
  "Medallion",
  "SQL Server · T-SQL",
  "AWS S3",
  "Azure",
  "Snowflake",
  "Prophecy",
  "Unity Catalog",
];

const STATS = [
  { icon: Database, label: "10M+ records processed", value: "Servicer onboarding" },
  { icon: Cpu, label: "+40% Spark performance", value: "via partitioning + broadcast" },
  { icon: Cloud, label: "100+ jobs migrated", value: "to Unity Catalog volumes" },
  { icon: GitBranch, label: "99.8% data accuracy", value: "Mutual Fund ETL" },
];

export default function Home() {
  return (
    <div data-testid="home-page">
      {/* HERO */}
      <section className="pt-12 md:pt-20 pb-16 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/[0.03] text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400"
            data-testid="hero-pill"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Open to senior data engineering roles
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-4xl sm:text-5xl lg:text-6xl tracking-tighter font-black leading-[1.05]"
            data-testid="hero-headline"
          >
            Building <span className="bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 dark:from-sky-400 dark:via-cyan-300 dark:to-emerald-300 bg-clip-text text-transparent">Lakehouse</span>
            <br />
            pipelines that{" "}
            <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 dark:from-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
              actually scale.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed"
            data-testid="hero-subtext"
          >
            I'm <strong className="text-zinc-900 dark:text-white">Shubham Rothe</strong> — a Senior Data Engineer
            with 4+ years building production ETL/ELT pipelines on Databricks, PySpark, Delta Lake
            and the cloud for financial, banking and loan datasets.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-wrap gap-2"
          >
            {HIGHLIGHT_SKILLS.map((s) => (
              <Badge
                key={s}
                variant="secondary"
                data-testid={`hero-skill-${s}`}
                className="font-mono text-[11px] uppercase tracking-wider bg-zinc-100 dark:bg-white/[0.06] text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-white/10 hover:bg-zinc-200 dark:hover:bg-white/[0.1]"
              >
                {s}
              </Badge>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-3 pt-2"
          >
            <Button asChild size="lg" data-testid="hero-resume-btn" className="rounded-full">
              <Link to="/resume">
                <Download size={16} className="mr-2" /> View Resume
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              data-testid="hero-contact-btn"
              className="rounded-full"
            >
              <Link to="/contact">
                Contact Me <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="pt-6"
          >
            <ExperienceCounter />
          </motion.div>
        </div>

        {/* Photo column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="lg:col-span-5 relative"
          data-testid="hero-photo-card"
        >
          <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/[0.02]">
            <img
              src={PROFILE.photo}
              alt={PROFILE.name}
              className="w-full h-[420px] sm:h-[480px] object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <div className="font-mono text-[11px] uppercase tracking-widest text-white/70">
                pune · india
              </div>
              <div className="text-white font-bold text-lg">{PROFILE.name}</div>
              <div className="text-white/80 text-sm">Senior Data Engineer · 4+ yrs</div>
            </div>
          </div>
          <div className="absolute -z-10 -inset-6 rounded-3xl bg-zinc-100 dark:bg-white/[0.03] blur-2xl" />
        </motion.div>
      </section>

      {/* Stat strip */}
      <section className="py-10 border-y border-zinc-200/80 dark:border-white/10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              data-testid={`home-stat-${i}`}
              className="flex items-start gap-3"
            >
              <span className="h-9 w-9 grid place-items-center rounded-md bg-zinc-100 dark:bg-white/[0.06] text-zinc-700 dark:text-zinc-300 shrink-0">
                <s.icon size={18} />
              </span>
              <div>
                <div className="font-mono text-sm text-zinc-900 dark:text-white">{s.label}</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{s.value}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Now showing */}
      <section className="py-16">
        <div className="flex items-end justify-between gap-4 flex-wrap mb-8">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              what i'm shipping
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl tracking-tight font-bold mt-1">
              Current focus
            </h2>
          </div>
          <Link
            to="/projects"
            data-testid="home-projects-link"
            className="text-sm font-medium underline underline-offset-4 text-zinc-700 dark:text-zinc-300"
          >
            See all projects →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              t: "Medallion @ Scale",
              d: "Bronze / Silver / Gold lakehouse on Databricks + Delta with Auto Loader, Unity Catalog and Spark tuning.",
            },
            {
              t: "Production Reliability",
              d: "JAMS-orchestrated workflows, data quality + audit frameworks, parallel-execution controller notebook.",
            },
            {
              t: "Banking SQL Depth",
              d: "Dynamic T-SQL stored procedures, ER-modelled schemas and incremental loads powering US banking reports.",
            },
          ].map((c, i) => (
            <motion.div
              key={c.t}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              data-testid={`home-focus-${i}`}
              className="rounded-xl border border-zinc-200 dark:border-white/10 p-6 bg-white dark:bg-white/[0.02] hover:-translate-y-1 hover:border-zinc-300 dark:hover:border-white/20 transition-all"
            >
              <div className="font-bold text-lg text-zinc-900 dark:text-white">{c.t}</div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                {c.d}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
