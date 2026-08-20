/**
 * Viewport definitions used across screenshot and health-check tests.
 * Matches the sizes requested in Stage 3 exactly.
 */
export type ViewportDef = {
  id: string;
  label: string;
  category: "desktop" | "tablet" | "mobile";
  width: number;
  height: number;
};

export const viewports: ViewportDef[] = [
  { id: "desktop-1440", label: "Desktop 1440x900", category: "desktop", width: 1440, height: 900 },
  { id: "desktop-1280", label: "Desktop 1280x800", category: "desktop", width: 1280, height: 800 },
  { id: "tablet-1024", label: "Tablet 1024x768", category: "tablet", width: 1024, height: 768 },
  { id: "tablet-768", label: "Tablet 768x1024", category: "tablet", width: 768, height: 1024 },
  { id: "mobile-390", label: "Mobile 390x844", category: "mobile", width: 390, height: 844 },
];
