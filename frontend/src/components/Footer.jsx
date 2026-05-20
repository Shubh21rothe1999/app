import { Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { PROFILE } from "../lib/portfolio";

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="border-t border-zinc-200/70 dark:border-white/10 mt-24"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <div className="font-bold text-lg tracking-tight text-zinc-900 dark:text-white">
            {PROFILE.name}
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-xs">
            Data Engineer building Lakehouse pipelines on Databricks, Delta and the cloud.
          </p>
        </div>

        <div className="text-sm space-y-2 text-zinc-600 dark:text-zinc-400">
          <a href={`mailto:${PROFILE.email}`} data-testid="footer-email" className="flex items-center gap-2 hover:text-zinc-900 dark:hover:text-white">
            <Mail size={16} /> {PROFILE.email}
          </a>
          <a href={`tel:${PROFILE.phone}`} data-testid="footer-phone" className="flex items-center gap-2 hover:text-zinc-900 dark:hover:text-white">
            <Phone size={16} /> {PROFILE.phone}
          </a>
          <div className="flex items-center gap-2">
            <MapPin size={16} /> {PROFILE.location}
          </div>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer"
            data-testid="footer-linkedin"
            className="flex items-center gap-2 hover:text-zinc-900 dark:hover:text-white"
          >
            <Linkedin size={16} /> LinkedIn
          </a>
        </div>

        <div className="text-xs font-mono text-zinc-400 dark:text-zinc-500 md:text-right">
          <div>© {new Date().getFullYear()} {PROFILE.name}</div>
          <div className="mt-1">built · designed · deployed</div>
        </div>
      </div>
    </footer>
  );
}
