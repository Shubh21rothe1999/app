import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Mail, Phone, MapPin, Linkedin, Send } from "lucide-react";
import { toast } from "sonner";
import { PROFILE } from "../lib/portfolio";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill out every field.");
      return;
    }
    // Static-friendly: open user's email client with prefilled body
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    toast.success("Opening your email app — hit send and we're good.");
  };

  return (
    <div data-testid="contact-page" className="py-16">
      <div className="mb-10">
        <div className="font-mono text-[11px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          contact
        </div>
        <h1 className="text-4xl sm:text-5xl tracking-tighter font-black mt-1">
          Let's talk data.
        </h1>
        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 mt-4 max-w-2xl">
          Whether you're hiring, collaborating, or have a tough pipeline problem —
          drop a message and I'll reply within a day.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        <form
          onSubmit={submit}
          data-testid="contact-form"
          className="lg:col-span-3 rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-6 sm:p-8 space-y-5"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              data-testid="contact-name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your full name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              data-testid="contact-email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@company.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              data-testid="contact-message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="What's the role / project / question?"
              rows={6}
              required
            />
          </div>
          <Button type="submit" data-testid="contact-submit" className="rounded-full">
            <Send size={16} className="mr-2" /> Send message
          </Button>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Submits via your email client — fully static, zero servers.
          </p>
        </form>

        <div className="lg:col-span-2 space-y-3">
          {[
            { icon: Mail, label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}`, testId: "contact-info-email" },
            { icon: Phone, label: "Phone", value: PROFILE.phone, href: `tel:${PROFILE.phone}`, testId: "contact-info-phone" },
            { icon: MapPin, label: "Location", value: PROFILE.location, href: null, testId: "contact-info-location" },
            { icon: Linkedin, label: "LinkedIn", value: "in/shubham-rothe", href: PROFILE.linkedin, testId: "contact-info-linkedin" },
          ].map((c) => {
            const Inner = (
              <>
                <span className="h-10 w-10 grid place-items-center rounded-md bg-zinc-100 dark:bg-white/[0.06] text-zinc-700 dark:text-zinc-300">
                  <c.icon size={18} />
                </span>
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                    {c.label}
                  </div>
                  <div className="text-sm text-zinc-900 dark:text-white mt-0.5">
                    {c.value}
                  </div>
                </div>
              </>
            );
            return c.href ? (
              <a
                key={c.label}
                href={c.href}
                target={c.label === "LinkedIn" ? "_blank" : undefined}
                rel="noreferrer"
                data-testid={c.testId}
                className="flex items-center gap-4 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-4 hover:border-zinc-300 dark:hover:border-white/20 transition-colors"
              >
                {Inner}
              </a>
            ) : (
              <div
                key={c.label}
                data-testid={c.testId}
                className="flex items-center gap-4 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-4"
              >
                {Inner}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
