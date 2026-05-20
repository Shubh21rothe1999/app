import { useEffect, useState } from "react";
import { PROFILE } from "../lib/portfolio";

function diff(from) {
  const start = new Date(from + "T00:00:00");
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();
  let days = now.getDate() - start.getDate();
  if (days < 0) {
    months -= 1;
    const prev = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prev.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
}

export default function ExperienceCounter({ compact = false }) {
  const [v, setV] = useState(() => diff(PROFILE.startDate));

  useEffect(() => {
    const id = setInterval(() => setV(diff(PROFILE.startDate)), 60 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const Cell = ({ value, label, testId }) => (
    <div
      data-testid={testId}
      className="flex flex-col items-start px-4 py-3 sm:px-5 sm:py-4 rounded-md border border-zinc-200 dark:border-white/10 bg-white/70 dark:bg-white/[0.03]"
    >
      <span className="font-mono text-2xl sm:text-3xl font-bold tabular-nums text-zinc-900 dark:text-white">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mt-1">
        {label}
      </span>
    </div>
  );

  return (
    <div data-testid="experience-counter" className={`flex flex-col ${compact ? "gap-2" : "gap-3"}`}>
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          live · since 04 jul 2022
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-md">
        <Cell value={v.years} label="years" testId="counter-years" />
        <Cell value={v.months} label="months" testId="counter-months" />
        <Cell value={v.days} label="days" testId="counter-days" />
      </div>
    </div>
  );
}
