# Motion Guidelines

Descriptive philosophy for future animation work. Nothing here has been implemented —
the current site's actual motion (documented under "Current motion baseline" below) is
unchanged.

## The test every future animation must pass

> **"What user problem does this animation solve?"**

If the honest answer is only **"it looks cool,"** reject it. This applies to every future
proposal from the Design/UX/Content Reviewer agent and every implementation from the
Coding Agent — motion is not exempt from the same scrutiny as any other change.

This lines up with current (2026) industry direction: the dominant theme in current
motion-design guidance is restraint — movement should support clarity, not compete with
it, with the shift explicitly away from flashy/gratuitous animation toward subtle,
functional motion tied to a specific interaction (see `DESIGN_BENCHMARKS.md`, Motion
section, for sourcing).

## Preferred motion patterns

- Subtle fade
- Small translate (a few pixels/rem, not large sweeps)
- Controlled reveal (content appearing as it enters view, not as a spectacle)
- Staggered content (sequential reveal of list/grid items)
- Restrained hover states
- Button micro-interactions (the existing `.btn-shine` sweep is a reasonable example of
  scale — subtle, tied to a real interaction, not autoplaying)
- Workflow / architecture / data-flow animation — appropriate for VectorWave specifically
  because it's technical and process-oriented content, not decoration
- Progressive visual storytelling (revealing a diagram or process step-by-step tied to
  scroll or interaction)
- Subtle section transitions

## Avoid

- Aggressive parallax
- Excessive zoom
- Spinning or bouncing effects
- Flashing
- Autoplay-heavy animation
- Animated cursors
- Excessive floating decorative objects
- Unnecessary WebGL
- Any animation that delays content becoming visible/usable
- Animation with no UX purpose

## Accessibility — non-negotiable

Every future animation must respect `prefers-reduced-motion`. This is not a nice-to-have;
it is current baseline accessibility practice for 2026 (see `DESIGN_BENCHMARKS.md`) and
the site already does this correctly today — **preserve and improve it, never regress
it.**

## Current motion baseline (verified in code, 2026-08-20)

This is what exists today — documented so future changes can be measured against it,
not so it gets copied blindly.

- Site-wide `prefers-reduced-motion` media query correctly disables/shortens animations
  globally: [globals.css:236-245](../app/globals.css#L236-L245).
- `Reveal` component: the one clean, non-duplicated "fade up on scroll" wrapper used
  consistently across nearly every section — the audit calls this out as the single best
  animation building block in the codebase. Keep this pattern; extend it rather than
  building parallel ad hoc scroll-reveal logic.
- Modern IntersectionObserver-style "watch scroll position" APIs are used rather than
  old-style scroll-event listeners — efficient, no jank. Preserve this approach for any
  new scroll-tied motion.
- A `Typewriter` component types out headline text; correctly keeps the full text
  available to screen readers even mid-animation — a genuinely good accessibility detail
  worth preserving as a pattern.
- `.btn-shine` hover sweep on primary buttons ([globals.css:190-208](../app/globals.css#L190-L208)) —
  small, tied to a real hover interaction, reasonable scale.
- `EcosystemOrbit` — an interactive homepage diagram with orbit-dash motion
  ([globals.css:152-163](../app/globals.css#L152-L163)); maintains separate hard-coded
  size numbers for mobile vs. desktop rather than deriving them from one shared value —
  not a visible bug, but a maintenance note for whoever touches it next.
- Marquee scroll animation for the partner-logo strip, pausable on hover
  ([globals.css:128-150](../app/globals.css#L128-L150)).
- `page-enter` / `fade-in-up` keyframes used for page and content transitions.

## Known gap

- The language switcher dropdown does not close on Escape, unlike the more thoroughly
  built consultation modal (which does trap focus, close on Escape, and restore focus).
  Any future motion/interaction work on the language switcher should bring it up to the
  same interaction standard already proven elsewhere in the codebase — this is a
  consistency fix, not new design.
