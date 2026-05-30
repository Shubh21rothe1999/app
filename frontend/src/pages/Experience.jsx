import { motion } from "framer-motion";
import { Badge } from "../components/ui/badge";
import { Briefcase, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import { EXPERIENCE } from "../lib/portfolio";

export default function Experience() {
  return (
    <div data-testid="experience-page" className="py-16">
      <div className="mb-12">
        <div className="font-mono text-[11px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          experience
        </div>
        <h1 className="text-4xl sm:text-5xl tracking-tighter font-black mt-1">
          Where I've built things
        </h1>
        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 mt-4 max-w-2xl">
          Three flagship projects across financial data engineering — from raw FTP files to
          Unity Catalog–governed Gold tables.
        </p>
      </div>

      {EXPERIENCE.map((job) => (
        <section key={job.company} className="mb-16">
          <div
            data-testid={`job-${job.company}`}
            className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-6 sm:p-8 mb-8"
          >
            <div className="flex flex-wrap items-start gap-4 justify-between">
              <div>
                <div
                  className={`flex items-center gap-2 text-sm font-mono uppercase tracking-widest ${
                    job.active
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-zinc-500 dark:text-zinc-400"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      job.active ? "bg-emerald-500 animate-pulse" : "bg-zinc-400 dark:bg-zinc-500"
                    }`}
                  />
                  {job.active ? "active" : "completed"}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-2 text-zinc-900 dark:text-white">
                  {job.company}
                </h2>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                  <span className="flex items-center gap-1.5">
                    <Briefcase size={14} /> {job.role}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} /> {job.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} /> {job.period}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {job.projects.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                data-testid={`project-${i}`}
                className="rounded-2xl border border-zinc-200 dark:border-white/10 p-6 sm:p-8 bg-white dark:bg-white/[0.02] hover:border-zinc-300 dark:hover:border-white/20 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                      project 0{i + 1}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mt-1 text-zinc-900 dark:text-white">
                      {p.title}
                    </h3>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                      Role: {p.role}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="font-mono text-[11px] bg-zinc-100 dark:bg-white/[0.06] text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-white/10"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>

                <ul className="mt-6 space-y-2.5">
                  {p.bullets.map((b, j) => (
                    <li
                      key={j}
                      className="flex gap-3 text-sm sm:text-[15px] text-zinc-700 dark:text-zinc-300 leading-relaxed"
                    >
                      <CheckCircle2
                        size={16}
                        className="mt-1 text-zinc-400 dark:text-zinc-500 shrink-0"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
