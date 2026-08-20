"use client";

import { useState, type FormEvent } from "react";
import { Loader2, CheckCircle } from "lucide-react";

const leadSources = ["Facebook Ads", "Google Ads", "Website", "Walk-in", "Referral"];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          email: formData.get("email"),
          leadSource: formData.get("leadSource"),
          requirements: formData.get("requirements"),
        }),
      });
      if (!response.ok) throw new Error("Contact form submission failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-6 sm:p-8">
      <div
        className={`grid overflow-hidden transition-[grid-template-rows] duration-500 ease-in-out ${
          status === "sent" ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <CheckCircle size={36} className="text-primary" />
            <p className="text-sm font-bold text-ink">
              Thanks, your message is on its way.
            </p>
            <p className="text-xs text-ink-muted">
              We&apos;ll get back to you within 24 hours.
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className={`grid overflow-hidden transition-[grid-template-rows] duration-500 ease-in-out ${
          status === "sent" ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
        }`}
      >
        <div className="flex flex-col gap-4 overflow-hidden">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-bold text-ink-soft">
                First name
              </label>
              <input
                required
                type="text"
                name="firstName"
                placeholder="Jordan"
                className="w-full rounded-lg border border-border px-3 py-2.5 text-sm text-ink outline-none transition-colors duration-200 placeholder:text-ink-faint focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-ink-soft">
                Last name
              </label>
              <input
                required
                type="text"
                name="lastName"
                placeholder="Taylor"
                className="w-full rounded-lg border border-border px-3 py-2.5 text-sm text-ink outline-none transition-colors duration-200 placeholder:text-ink-faint focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold text-ink-soft">
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              placeholder="jordan@company.com"
              className="w-full rounded-lg border border-border px-3 py-2.5 text-sm text-ink outline-none transition-colors duration-200 placeholder:text-ink-faint focus:border-primary"
            />
          </div>

          <div>
            <label htmlFor="leadSource" className="mb-1 block text-xs font-bold text-ink-soft">
              How did you hear about us
            </label>
            <select
              id="leadSource"
              name="leadSource"
              defaultValue="Website"
              className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-ink outline-none transition-colors duration-200 focus:border-primary"
            >
              {leadSources.map((source) => (
                <option key={source} className="bg-surface text-ink">
                  {source}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold text-ink-soft">
              Your requirements
            </label>
            <textarea
              rows={4}
              name="requirements"
              placeholder="Tell us what you're looking to build or automate"
              className="w-full rounded-lg border border-border px-3 py-2.5 text-sm text-ink outline-none transition-colors duration-200 placeholder:text-ink-faint focus:border-primary"
            />
          </div>

          {status === "error" && (
            <p className="text-xs font-bold text-red-600">
              Something went wrong sending your message. Please try again.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-bold text-on-inverse transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-md active:translate-y-0 disabled:opacity-70"
          >
            {status === "loading" && (
              <Loader2 size={16} className="animate-spin" />
            )}
            {status === "loading" ? "Sending..." : "Send message"}
          </button>
        </div>
      </form>
    </div>
  );
}
