import { motion } from "framer-motion";
import { Badge } from "../components/ui/badge";
import { PROFILE, SUMMARY, SKILLS, EDUCATION } from "../lib/portfolio";
import { GraduationCap, MapPin, Mail, Phone } from "lucide-react";

export default function About() {
  return (
    <div data-testid="about-page" className="py-16">
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 sticky top-24">
            <img
              src={PROFILE.photo}
              alt={PROFILE.name}
              className="w-full h-[360px] object-cover object-top"
            />
            <div className="p-5 space-y-2 bg-white dark:bg-white/[0.02]">
              <div className="font-bold text-xl text-zinc-900 dark:text-white">
                {PROFILE.name}
              </div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">{PROFILE.title}</div>
              <div className="pt-2 space-y-1.5 text-sm text-zinc-600 dark:text-zinc-400">
                <div className="flex items-center gap-2">
                  <MapPin size={14} /> {PROFILE.location}
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={14} /> {PROFILE.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} /> {PROFILE.phone}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-12">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              about
            </div>
            <h1
              data-testid="about-headline"
              className="text-4xl sm:text-5xl tracking-tighter font-black mt-1"
            >
              Engineer first. Data second.
            </h1>
            <p
              data-testid="about-summary"
              className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mt-6"
            >
              {SUMMARY}
            </p>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl tracking-tight font-bold mb-6">
              Technical skills
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {SKILLS.map((g, i) => (
                <motion.div
                  key={g.group}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  data-testid={`skill-group-${g.group}`}
                  className="rounded-xl border border-zinc-200 dark:border-white/10 p-5 bg-white dark:bg-white/[0.02]"
                >
                  <div className="font-mono text-[11px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                    {g.group}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {g.items.map((s) => (
                      <Badge
                        key={s}
                        variant="secondary"
                        className="font-mono text-[11px] bg-zinc-100 dark:bg-white/[0.06] text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-white/10"
                      >
                        {s}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl tracking-tight font-bold mb-6">
              Education
            </h2>
            <div
              data-testid="education-card"
              className="rounded-xl border border-zinc-200 dark:border-white/10 p-6 bg-white dark:bg-white/[0.02] flex items-start gap-4"
            >
              <span className="h-10 w-10 grid place-items-center rounded-md bg-zinc-100 dark:bg-white/[0.06] text-zinc-700 dark:text-zinc-300 shrink-0">
                <GraduationCap size={18} />
              </span>
              <div>
                <div className="font-bold text-zinc-900 dark:text-white">
                  {EDUCATION.degree}
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                  {EDUCATION.school}
                </div>
                <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mt-2">
                  {EDUCATION.period} · {EDUCATION.cgpa}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
