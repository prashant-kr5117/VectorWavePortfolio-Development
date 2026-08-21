"use client";

import { useEffect, useRef, useState } from "react";
import { Globe, Check } from "lucide-react";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "nl", label: "Netherland" },
];

// Google Translate rewrites text nodes across the page, which can leave React's
// virtual DOM out of sync with the real DOM. If React later tries to remove/insert
// a node Google has already moved, it throws and crashes the app. This patches
// removeChild/insertBefore to fail safely instead of throwing.
function patchDomForGoogleTranslate() {
  if (typeof window === "undefined") return;
  const w = window as unknown as { __gtDomPatched?: boolean };
  if (w.__gtDomPatched) return;
  w.__gtDomPatched = true;

  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function (this: Node, child) {
    if (child.parentNode !== this) {
      return child;
    }
    return originalRemoveChild.call(this, child);
  } as typeof Node.prototype.removeChild;

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (this: Node, newNode, referenceNode) {
    if (referenceNode && referenceNode.parentNode !== this) {
      return newNode;
    }
    return originalInsertBefore.call(this, newNode, referenceNode);
  } as typeof Node.prototype.insertBefore;
}

function getCurrentLang(): string {
  const match = document.cookie.match(/googtrans=\/en\/(\w+)/);
  return match ? match[1] : "en";
}

function setLanguage(code: string) {
  const domain = window.location.hostname;
  const isEnglish = code === "en";

  if (isEnglish) {
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain}`;
  } else {
    const value = `/en/${code}`;
    document.cookie = `googtrans=${value}; path=/`;
    document.cookie = `googtrans=${value}; path=/; domain=.${domain}`;
  }
  window.location.reload();
}

export default function LanguageSwitcher({
  colorClassName = "text-ink",
}: {
  colorClassName?: string;
}) {
  const [open, setOpen] =  useState(false);
  const [current, setCurrent] = useState("en");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    patchDomForGoogleTranslate();
    setCurrent(getCurrentLang());
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
       }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Change language"
        aria-expanded={open}
        className={`flex items-center gap-1 ${colorClassName} transition-all duration-300 active:scale-90`}
      >
        <Globe size={20} />
      </button>

      <div
        className={`absolute right-0 top-full z-30 mt-2 w-40 overflow-hidden rounded-lg border border-border bg-surface shadow-xl transition-all duration-200 ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => {
              setOpen(false);
              setLanguage(lang.code);
            }}
            className="flex w-full items-center justify-between px-3.5 py-2.5 text-left text-sm font-semibold text-ink-soft transition-colors duration-150 hover:bg-surface-alt hover:text-ink"
          >
            {lang.label}
            {current === lang.code && <Check size={14} className="text-primary" />}
          </button>
        ))}
      </div>
    </div>
  );
}
