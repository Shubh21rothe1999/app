import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Download, Eye, FileText } from "lucide-react";
import { PROFILE } from "../lib/portfolio";

export default function Resume() {
  return (
    <div data-testid="resume-page" className="py-16">
      <div className="mb-10">
        <div className="font-mono text-[11px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          resume
        </div>
        <h1 className="text-4xl sm:text-5xl tracking-tighter font-black mt-1">
          Download my CV
        </h1>
        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 mt-4 max-w-2xl">
          Single-page PDF — 4+ years of Data Engineering experience across Databricks,
          PySpark, SQL Server and cloud lakehouse stacks.
        </p>
      </div>

      <div
        data-testid="resume-card"
        className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6 justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 grid place-items-center rounded-md bg-zinc-900 dark:bg-white text-white dark:text-zinc-900">
            <FileText size={20} />
          </div>
          <div>
            <div className="font-bold text-zinc-900 dark:text-white">
              {PROFILE.resumeFileName}
            </div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400 font-mono">
              PDF · updated recently
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                data-testid="resume-preview-btn"
                className="rounded-full"
              >
                <Eye size={16} className="mr-2" /> Preview
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl w-[95vw] h-[85vh] p-0 flex flex-col">
              <DialogHeader className="px-5 py-3 border-b">
                <DialogTitle>Resume preview</DialogTitle>
              </DialogHeader>
              <iframe
                data-testid="resume-iframe"
                src={PROFILE.resumeUrl}
                title="resume"
                className="flex-1 w-full bg-white"
              />
            </DialogContent>
          </Dialog>

          <Button asChild data-testid="resume-download-btn" className="rounded-full">
            <a
              href={PROFILE.resumeUrl}
              download={PROFILE.resumeFileName}
              target="_blank"
              rel="noreferrer"
            >
              <Download size={16} className="mr-2" /> Download
            </a>
          </Button>
        </div>
      </div>

      {/* Inline PDF for quick scroll */}
      <div className="mt-10 rounded-2xl border border-zinc-200 dark:border-white/10 overflow-hidden hidden md:block">
        <iframe
          data-testid="resume-inline-iframe"
          src={PROFILE.resumeUrl}
          title="resume-inline"
          className="w-full h-[90vh] bg-white"
        />
      </div>
    </div>
  );
}
