import { motion } from "framer-motion";
import { Badge } from "../components/ui/badge";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { PROJECT_CARDS } from "../lib/portfolio";

export default function Projects() {
  return (
    <div data-testid="projects-page" className="py-16">
      <div className="mb-12 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            selected projects
          </div>
          <h1 className="text-4xl sm:text-5xl tracking-tighter font-black mt-1">
            Production data systems
          </h1>
        </div>
        <div className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md">
          Each card represents a real production system — its stack, scope, and measurable outcome.
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PROJECT_CARDS.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            data-testid={`project-card-${p.id}`}
            className="group rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-6 hover:-translate-y-1 hover:border-zinc-300 dark:hover:border-white/20 transition-all flex flex-col"
          >
            <div className="flex items-start justify-between">
              <div className="font-mono text-[11px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                0{i + 1}
              </div>
              <ArrowUpRight
                size={18}
                className="text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors"
              />
            </div>
            <h2 className="text-xl font-bold mt-4 text-zinc-900 dark:text-white">
              {p.title}
            </h2>
            <div className="text-sm font-mono text-zinc-500 dark:text-zinc-400 mt-1">
              {p.sub}
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-4 leading-relaxed flex-1">
              {p.desc}
            </p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <Badge
                  key={s}
                  variant="secondary"
                  className="font-mono text-[10px] bg-zinc-100 dark:bg-white/[0.06] text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-white/10"
                >
                  {s}
                </Badge>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-white/5 flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              <Sparkles size={14} className="text-emerald-500" />
              {p.metric}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
