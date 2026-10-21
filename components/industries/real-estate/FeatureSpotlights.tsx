"use client";

import { useState } from "react";
import { Check, FileText, User } from "lucide-react";
import { features, type FeatureKey } from "@/lib/real-estate";

/**
 * Tabbed feature spotlights for /industries/real-estate. Each tab pairs the feature's
 * plain-language benefits with a small stylized mock screen. The mocks use sample data
 * only and are labeled as such, following the same honest-labeling rule as
 * IllustrativeDashboardPreview.
 */
export default function FeatureSpotlights() {
  const [active, setActive] = useState<FeatureKey>("leads");
  const feature = features.find((f) => f.key === active) ?? features[0];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Real estate CRM features"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
      >
        {features.map((f) => {
          const selected = f.key === active;
          return (
            <button
              key={f.key}
              type="button"
              role="tab"
              id={`feature-tab-${f.key}`}
              aria-selected={selected}
              aria-controls="feature-panel"
              onClick={() => setActive(f.key)}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition-all duration-200 sm:text-sm ${
                selected
                  ? "border-ink-inverse bg-ink-inverse text-on-inverse shadow-[var(--shadow-card-hover)]"
                  : "border-border bg-surface text-ink-soft hover:border-primary/40 hover:text-primary"
              }`}
            >
              <f.icon size={15} className={selected ? "text-accent" : ""} />
              {f.tab}
            </button>
          );
        })}
      </div>

      <div
        id="feature-panel"
        role="tabpanel"
        aria-labelledby={`feature-tab-${feature.key}`}
        className="mt-8 grid items-center gap-8 rounded-2xl border border-border bg-surface p-5 sm:p-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12"
      >
        <div key={feature.key} className="animate-[fade-in-up_0.4s_ease-out_backwards]">
          <div className="text-[11px] font-bold uppercase tracking-wide text-primary">
            {feature.title}
          </div>
          <h3 className="mt-2 text-lg font-bold leading-snug text-ink sm:text-xl">
            {feature.headline}
          </h3>
          <ul className="mt-5 flex flex-col gap-2.5">
            {feature.points.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm text-ink-muted">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-surface-chip text-primary">
                  <Check size={11} strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div
          key={`${feature.key}-mock`}
          className="animate-[fade-in-up_0.5s_ease-out_backwards] rounded-xl border border-border bg-surface-alt p-4 sm:p-5"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-border-soft" />
              <span className="h-2.5 w-2.5 rounded-full bg-border-soft" />
              <span className="h-2.5 w-2.5 rounded-full bg-border-soft" />
            </div>
            <span className="rounded-full bg-surface px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-ink-faint">
              Sample data
            </span>
          </div>
          <FeatureMock kind={feature.key} />
        </div>
      </div>
    </div>
  );
}

function FeatureMock({ kind }: { kind: FeatureKey }) {
  switch (kind) {
    case "leads":
      return <LeadsMock />;
    case "visits":
      return <VisitsMock />;
    case "inventory":
      return <InventoryMock />;
    case "booking":
      return <BookingMock />;
    case "collections":
      return <CollectionsMock />;
  }
}

function LeadsMock() {
  const columns = [
    { title: "New", leads: [["Instagram Ad", "2 BHK · Tower A"], ["Property Portal", "3 BHK · Tower C"]] },
    { title: "Assigned", leads: [["Website Form", "Villa · Phase 2"], ["WhatsApp", "2 BHK · Tower B"]] },
    { title: "Follow-up", leads: [["Walk-in", "3 BHK · Tower A"]] },
  ];
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {columns.map((col) => (
        <div key={col.title}>
          <div className="mb-2 flex items-center justify-between text-[10.5px] font-bold uppercase tracking-wide text-ink-faint">
            {col.title}
            <span className="rounded bg-surface px-1.5 text-ink-soft">{col.leads.length}</span>
          </div>
          <div className="flex flex-col gap-2">
            {col.leads.map(([source, unit]) => (
              <div key={source} className="rounded-lg border border-border bg-surface p-2.5 shadow-[var(--shadow-card)]">
                <div className="mb-1.5 flex items-center gap-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-surface-chip text-primary">
                    <User size={11} />
                  </span>
                  <span className="h-1.5 flex-1 rounded-full bg-border" />
                </div>
                <div className="truncate text-[10.5px] font-bold text-ink-soft">{unit}</div>
                <div className="mt-1 inline-block rounded bg-accent/10 px-1.5 py-0.5 text-[9.5px] font-bold text-accent-hover">
                  {source}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function VisitsMock() {
  const visits = [
    { day: "Mon", time: "11:00", status: "Completed", tone: "bg-success-surface text-success" },
    { day: "Tue", time: "16:30", status: "Completed", tone: "bg-success-surface text-success" },
    { day: "Wed", time: "12:00", status: "No-show", tone: "bg-error-surface text-error" },
    { day: "Thu", time: "10:30", status: "Scheduled", tone: "bg-surface-chip text-primary" },
  ];
  const funnel = [
    { label: "Visited", value: 100 },
    { label: "Followed up", value: 78 },
    { label: "Booked", value: 34 },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="flex flex-col gap-2">
        {visits.map((v) => (
          <div key={v.day} className="flex items-center gap-3 rounded-lg border border-border bg-surface px-3 py-2">
            <div className="w-9 text-center">
              <div className="text-[10px] font-bold uppercase text-ink-faint">{v.day}</div>
              <div className="text-xs font-bold text-ink">{v.time}</div>
            </div>
            <span className="h-1.5 flex-1 rounded-full bg-border" />
            <span className={`rounded-full px-2 py-0.5 text-[9.5px] font-bold ${v.tone}`}>{v.status}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center gap-2">
        <div className="text-[10.5px] font-bold uppercase tracking-wide text-ink-faint">Visit → Booking</div>
        {funnel.map((f) => (
          <div key={f.label} className="mx-auto w-full" style={{ maxWidth: `${f.value}%`, minWidth: "55%" }}>
            <div className="rounded-md bg-primary px-3 py-2 text-center text-[11px] font-bold text-white" style={{ opacity: 0.45 + f.value / 180 }}>
              {f.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InventoryMock() {
  // a = available, h = on hold, s = sold
  const floors = ["sasaa", "ssahs", "assas", "hsssa", "sssha"];
  const tone = { a: "bg-success", h: "bg-amber-400", s: "bg-error/80" } as const;
  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-1.5 text-[10.5px] font-bold text-ink-soft">
        <span className="rounded bg-surface px-2 py-0.5">Project Skyline</span>›
        <span className="rounded bg-surface px-2 py-0.5">Tower B</span>›
        <span className="rounded bg-primary px-2 py-0.5 text-white">Floors 1–5</span>
      </div>
      <div className="flex flex-col gap-1.5">
        {floors.map((row, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className="w-7 text-[10px] font-bold text-ink-faint">F{floors.length - i}</span>
            {row.split("").map((u, j) => (
              <span
                key={j}
                className={`flex h-7 flex-1 items-center justify-center rounded text-[9.5px] font-bold text-white ${tone[u as keyof typeof tone]}`}
              >
                {floors.length - i}0{j + 1}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-4 text-[10.5px] font-bold text-ink-muted">
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-success" />Available</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-400" />On hold</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-error/80" />Sold</span>
      </div>
    </div>
  );
}

function BookingMock() {
  return (
    <div className="rounded-xl border border-border bg-surface p-4 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-inverse text-on-inverse">
            <User size={15} />
          </span>
          <div>
            <div className="text-xs font-bold text-ink">Booking #BK-1042</div>
            <div className="text-[10.5px] text-ink-muted">Tower B · Unit 402 · 3 BHK</div>
          </div>
        </div>
        <span className="rounded-full bg-success-surface px-2 py-0.5 text-[9.5px] font-bold text-success">Confirmed</span>
      </div>
      <div className="grid grid-cols-2 gap-3 py-3">
        {["KYC documents", "Agreement draft"].map((d) => (
          <div key={d} className="flex items-center gap-2 rounded-lg bg-surface-alt px-2.5 py-2 text-[10.5px] font-bold text-ink-soft">
            <FileText size={13} className="text-primary" /> {d}
          </div>
        ))}
      </div>
      <div className="text-[10.5px] font-bold uppercase tracking-wide text-ink-faint">Payment plan</div>
      <div className="mt-2 flex gap-1.5">
        {["Booking", "Agreement", "Slab 1", "Slab 2", "Possession"].map((s, i) => (
          <div key={s} className="flex-1">
            <div className={`h-1.5 rounded-full ${i < 2 ? "bg-primary" : "bg-border"}`} />
            <div className="mt-1 truncate text-[9px] font-bold text-ink-faint">{s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CollectionsMock() {
  const rows = [
    { unit: "A-302", status: "Paid", tone: "bg-success-surface text-success" },
    { unit: "B-402", status: "Due in 5 days", tone: "bg-surface-chip text-primary" },
    { unit: "C-110", status: "Overdue", tone: "bg-error-surface text-error" },
    { unit: "A-905", status: "Paid", tone: "bg-success-surface text-success" },
  ];
  return (
    <div>
      <div className="mb-3 grid grid-cols-3 gap-2">
        {[
          ["Booked", "100%"],
          ["Collected", "68%"],
          ["Outstanding", "32%"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg border border-border bg-surface px-3 py-2">
            <div className="text-sm font-bold text-ink">{value}</div>
            <div className="text-[10px] text-ink-muted">{label}</div>
          </div>
        ))}
      </div>
      <div className="mb-3 h-2 overflow-hidden rounded-full bg-border">
        <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-primary to-accent" />
      </div>
      <div className="flex flex-col gap-1.5">
        {rows.map((r) => (
          <div key={r.unit} className="flex items-center gap-3 rounded-lg border border-border bg-surface px-3 py-2">
            <span className="w-12 text-[11px] font-bold text-ink">{r.unit}</span>
            <span className="h-1.5 flex-1 rounded-full bg-border" />
            <span className={`rounded-full px-2 py-0.5 text-[9.5px] font-bold ${r.tone}`}>{r.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
