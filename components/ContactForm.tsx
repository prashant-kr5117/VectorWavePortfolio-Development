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
              <label htmlFor="firstName" className="form-label">
                First name
              </label>
              <input
                id="firstName"
                required
                type="text"
                name="firstName"
                placeholder="Jordan"
                className="form-control"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="form-label">
                Last name
              </label>
              <input
                id="lastName"
                required
                type="text"
                name="lastName"
                placeholder="Taylor"
                className="form-control"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              required
              type="email"
              name="email"
              placeholder="jordan@company.com"
              className="form-control"
            />
          </div>

          <div>
            <label htmlFor="leadSource" className="form-label">
              How did you hear about us
            </label>
            <select id="leadSource" name="leadSource" defaultValue="Website" className="form-control">
              {leadSources.map((source) => (
                <option key={source} className="bg-surface text-ink">
                  {source}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="requirements" className="form-label">
              Your requirements
            </label>
            <textarea
              id="requirements"
              rows={4}
              name="requirements"
              placeholder="Tell us what you're looking to build or automate"
              className="form-control"
            />
          </div>

          {status === "error" && (
            <p className="form-error" role="alert">
              Something went wrong sending your message. Please try again.
            </p>
          )}

          <button type="submit" disabled={status === "loading"} className="btn btn-primary btn--md mt-2">
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
