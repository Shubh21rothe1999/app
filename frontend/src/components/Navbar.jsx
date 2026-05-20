import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { Moon, Sun, Menu, X, Terminal } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/button";
import { PROFILE } from "../lib/portfolio";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/experience", label: "Experience" },
  { to: "/projects", label: "Projects" },
  { to: "/resume", label: "Resume" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header
      data-testid="site-header"
      className="sticky top-0 z-40 backdrop-blur-xl bg-white/70 dark:bg-black/60 border-b border-zinc-200/60 dark:border-white/10"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        <Link
          to="/"
          data-testid="brand-link"
          className="flex items-center gap-2 group"
        >
          <span className="grid place-items-center w-9 h-9 rounded-md bg-zinc-900 dark:bg-white text-white dark:text-zinc-900">
            <Terminal size={18} strokeWidth={2} />
          </span>
          <div className="leading-tight">
            <div className="font-bold tracking-tight text-zinc-900 dark:text-white">
              {PROFILE.name}
            </div>
            <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 -mt-0.5">
              data_engineer.exe
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              data-testid={`nav-${l.label.toLowerCase()}`}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "text-zinc-900 dark:text-white bg-zinc-100 dark:bg-white/10"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            data-testid="theme-toggle"
            variant="ghost"
            size="icon"
            onClick={toggle}
            aria-label="Toggle theme"
            className="rounded-full"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </Button>

          <Button
            data-testid="mobile-menu-toggle"
            variant="ghost"
            size="icon"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden rounded-full"
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {open && (
        <div
          data-testid="mobile-nav"
          className="md:hidden border-t border-zinc-200/60 dark:border-white/10 bg-white/90 dark:bg-black/90 backdrop-blur-xl"
        >
          <div className="px-5 py-3 flex flex-col">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={() => setOpen(false)}
                data-testid={`mobile-nav-${l.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `px-2 py-3 rounded-md text-sm font-medium ${
                    isActive
                      ? "text-zinc-900 dark:text-white bg-zinc-100 dark:bg-white/10"
                      : "text-zinc-600 dark:text-zinc-400"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
