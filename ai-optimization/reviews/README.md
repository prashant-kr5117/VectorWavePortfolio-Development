# Reviews

Reserved for individual reviewer-agent output, if/when the four-role agent architecture
described in `ai-optimization/README.md` ("Agent architecture") is actually split into
separate running passes — specifically Agent 2 (Design/UX/Content Reviewer) and Agent 3
(Technical Reviewer), whose findings would land here as one file per review, per
iteration, before Agent 4 (Final Judge) combines them.

**Current state:** the autonomous loop defined in `ai-optimization/loop/` runs visual and
technical review as steps within a single controller pass (`CONTROLLER.md` Steps 9-13),
not as separate agent roles — this matches how Workstreams 1-5 were actually executed
(one agent doing audit, implementation, and review together) rather than the fully
split four-role architecture `ai-optimization/README.md` describes as a future option.
If a future setup splits reviewing into its own pass, its output belongs here, one file
per iteration per reviewer role (e.g. `ITERATION-004-design-review.md`,
`ITERATION-004-technical-review.md`).

Empty as of 2026-08-21.
