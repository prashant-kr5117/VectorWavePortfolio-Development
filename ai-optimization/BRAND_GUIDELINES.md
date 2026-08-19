# Brand Guidelines — Target Direction

This describes where VectorWave's brand should head. It is **descriptive, not yet
implemented** — no part of the live site was changed to produce this document. It exists
so future design/content decisions have a consistent target to check against.

## Brand personality

- Premium
- Modern
- Trustworthy
- Enterprise
- Technical
- Confident
- Precise
- Human

## Visual direction

VectorWave should feel like a mature enterprise technology consultancy — the kind of
vendor that a CFO, IT director, or operations lead would trust with their ERP/CRM
migration — rather than a generic web-development agency chasing visual trends.

Premium does not mean flashy. Modern does not mean trendy. Enterprise does not mean
boring. Technical does not mean complicated. Animation does not mean decoration.

### Avoid

- Generic stock-photo-heavy design
- Cheap agency aesthetic
- Excessive gradients, glassmorphism, neon, 3D, WebGL, or parallax
- Excessive animation or decorative effects without purpose
- Random visual trends adopted for their own sake
- AI-generated-looking corporate imagery
- Template-like, overcrowded layouts
- Fake or unsubstantiated marketing claims (see `BUSINESS_FACTS.md`)

## Visual hierarchy philosophy

- One clear primary action per section — the audit already found the site's CTAs are
  clear and consistently placed (Section 9); preserve that, don't dilute it with
  competing CTAs.
- Headings should establish scannable structure before a visitor commits to reading body
  copy — this is a B2B buyer's site, and buyers scan before they read (see
  `DESIGN_BENCHMARKS.md` on messaging-first hierarchy).
- Proof (the weakest current category, 48/100 — see `BASELINE.md`) should sit near the
  claim it supports, not be pushed to a separate "trust" section far from context.

## Whitespace philosophy

Whitespace is a credibility signal for enterprise buyers, not wasted space. Prefer fewer,
better-spaced elements per section over dense, template-style stacking. Do not fill
whitespace with decoration — fill it with either more breathing room or a genuinely
useful element (see Image Strategy below for the same rule applied to imagery).

## Image philosophy

See **Image Strategy** section below.

## Icon philosophy

The current site already uses `lucide-react` consistently with two lookup-table patterns
for platform/service icons. Keep icon usage functional (representing a real category or
action) rather than decorative filler. Any future icon-lookup code should fail
gracefully on an unrecognized name rather than crash (a real gap the audit found —
Section 6).

## Illustration philosophy

Prefer custom architecture/process diagrams that explain how VectorWave's actual work
looks (data flow, integration diagrams, workflow diagrams) over generic illustration.
This directly supports the "technical" and "precise" personality traits — it shows
understanding rather than asserting it.

## CTA philosophy

The audit found two competing mechanisms for the same "Book a call" action — a plain
link to `/contact` in the header vs. a modal-opening button elsewhere (Section 6). Any
future CTA work should resolve toward **one** consistent mechanism, not add a third.
CTAs should be direct and specific ("Book a call," "Talk to us") rather than vague
("Learn more," "Get started").

## Trust / proof philosophy

This is the site's weakest category today (Trust/Proof: 48/100 — see `BASELINE.md`).
Current 2026 B2B research indicates generic trust decoration (logo walls, unattributed
badges) is losing effectiveness — buyers respond to *specific, verifiable* proof placed
near the claim it backs, not a wall of logos at the page bottom (see
`DESIGN_BENCHMARKS.md`). For VectorWave specifically:

- Lead with the one real, named case study (Nikhil/Maxvill) more prominently — it is
  the strongest asset the site has and is currently under-leveraged.
- Never state a certification, award, or partnership without evidence in
  `BUSINESS_FACTS.md`. Soften or remove claims that can't be backed, rather than
  inventing backing for them.
- Prefer specific, attributed proof (named person + named company + specific outcome)
  over generic or anonymous claims.

---

## Image Strategy

Priority order for any future image decision:

1. Real VectorWave project visuals
2. Real implementation screenshots
3. Custom architecture diagrams
4. Custom process diagrams
5. Custom illustrations
6. Carefully selected professional conceptual imagery
7. AI-generated imagery — only when nothing above is appropriate

**Never add an image merely to fill whitespace.** An image must improve at least one of:
comprehension, credibility, storytelling, hierarchy, or conversion.

For every future image recommendation, a reviewer must specify:

- **Section** — where on the site
- **Why visual is needed** — which of the five goals above it serves
- **Visual type** — photo, diagram, screenshot, illustration, icon
- **What it should communicate**
- **Recommended source** — real asset, custom diagram, licensed stock, AI-generated (last resort)
- **Priority**

**Hard rules:**
- Never fabricate a project screenshot.
- Never imply AI-generated or stock imagery represents a real client implementation.
- The About page's four leadership placeholder icons and the blog's missing featured
  images (both noted in the audit, Sections 7–8) are examples of where this strategy
  applies once real assets are provided by the business — they are not to be replaced
  with generic stock photos or fabricated "team photos" in the meantime.

---

## Case Study Policy

The site currently has **exactly one** genuine, identifiable case study: the
Nikhil/Maxvill testimonial (Zoho CRM setup + Tally-to-Zoho-Books migration). That real
case study can be used and expanded on. **Do not fabricate additional named clients or
companies and present them as real.**

Allowed future content categories, each requiring an explicit label:

| Category | Label to use | Meaning |
|---|---|---|
| Real case study | *(no disclaimer needed — verified in `BUSINESS_FACTS.md`)* | A verified client/project, e.g. the Maxvill story |
| Solution story | *(clearly generalized)* | A generalized business problem + solution, not tied to a specific unnamed "client" implied to be real |
| Illustrative scenario | **"Illustrative Scenario"** | Clearly labeled hypothetical, matching the existing pattern on `/services/zoho-bundled-suite` |
| Example architecture | **"Example Architecture"** | Technical demonstration, not a claim about any real deployment |

Never represent hypothetical work as real client work, and never let a labeled
illustrative example drift into being cited elsewhere as if it were real.
