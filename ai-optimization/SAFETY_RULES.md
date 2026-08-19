# Safety Rules

Hard rules for any future AI-driven change to the VectorWave website. These are not
suggestions — a violation should cause an iteration to be rejected outright by the Final
Judge agent (see `README.md` Agent Architecture), regardless of how good the change
otherwise looks.

## Content safety — no exceptions

- Never invent a client name, testimonial, statistic, certification, or partnership. If
  it isn't in `BUSINESS_FACTS.md`, it does not get written into the site.
- Never change contact information (phone, email, address) without a human explicitly
  approving it first.
- Never present a hypothetical example as if it were real — always label it
  "Illustrative Scenario," "Hypothetical Example," or "Example Architecture" per the
  Case Study Policy in `BRAND_GUIDELINES.md`.
- Never change a business claim (a stat, a partner status, an award) without a human
  first approving an update to `BUSINESS_FACTS.md`.

## Technical safety — no exceptions

- Never break an existing page URL — if a URL must change, a redirect is added in the
  same change.
- Never remove SEO-critical elements (structured data, page titles/descriptions)
  without an equivalent replacement in the same change.
- Never quietly introduce a new font, new color, or new external library as a side
  effect of an unrelated change — only tokens already defined in `DESIGN_SYSTEM.md`
  (current or explicitly approved target) may be used.
- Never make sweeping, multi-page changes in a single step — one page or one sitewide
  design-token change per iteration, per `EVALUATION_RUBRIC.md`'s score rules.
- Never skip the automated build/safety checks, and never merge changes without human
  approval while this process is new and unproven.
- Never install a package or add a dependency without explicit human approval.

## Process safety

- Every iteration happens on a separate branch — never directly on `main`/production.
- Every iteration targets exactly one scoped objective (see `EVALUATION_RUBRIC.md` rule
  1 and 3).
- A build failure, broken route, broken navigation, broken form, or serious
  accessibility/performance regression rejects the iteration automatically (see
  `EVALUATION_RUBRIC.md` rules 6–11).
- The Final Judge agent reviews and scores; it never writes or modifies code.
- Human approval is required before any change merges into the live site, for at least
  the first several rounds of this process. Even once trust is established, changes to
  business facts, contact information, or page URLs should never be allowed to skip
  human approval — regardless of how automated the rest of the loop becomes.
- What is explicitly **not** built yet, and must not be assumed to exist: an automatic
  code-modification loop, automatic commits, automatic push, automatic deployment,
  automatic rollback, or any autonomous (human-approval-free) optimization. See
  `README.md` for current tool availability — the measurement tooling (visual
  regression, performance, accessibility) this loop depends on does not exist yet
  either.

## Related documents

[[BUSINESS_FACTS]] — the factual boundary these rules enforce.
[[EVALUATION_RUBRIC]] — the score rules these safety rules sit alongside.
[[BRAND_GUIDELINES]] — the Case Study Policy referenced above.
