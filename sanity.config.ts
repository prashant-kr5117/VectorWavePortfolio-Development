"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool(),
    // Lets the content team run raw GROQ queries from inside the Studio; dev-only.
    ...(process.env.NODE_ENV === "development" ? [visionTool({ defaultApiVersion: apiVersion })] : []),
  ],
});
