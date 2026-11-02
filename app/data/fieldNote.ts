/**
 * Aggregate counts for /research. This repo is public, so no company names here.
 * Sources live in the private ops repo: ops/funnel.csv (send log) and
 * prospects/hunt-log.md (verdict log). Snapshot: 2026-11-02.
 */
export const FIELD_NOTE = {
  /** Companies with a recorded verdict: contradicted + fixedFirst + clean. */
  sample: 42,
  /** funnel.csv rows (13) minus the one whose finding was two of a company's own pages disagreeing. */
  contradicted: 12,
  /** Hunt log: contradiction found, gone on re-check within a day, never sent. */
  fixedFirst: 1,
  /** Hunt log verdicts of none, zero, no finding or 0 findings. */
  clean: 29,
  /** Sum of funnel.csv findings (17) minus that same row. */
  findings: 16,
  perCompany: { one: 9, two: 2, three: 1 },
  /** Our classification of the funnel and hunt-log notes. Each company counted once. */
  kinds: { limitLifted: 8, rename: 2, otherBehavior: 2 },
  /** Days from dated changelog entry to send date, where both dates are in the files. */
  age: { companies: 11, min: 7, median: 51, max: 244, overNinety: 4 },
  /** Unique hunt-log names marked skipped or not audited, rounded: one row ends "and others". */
  noVerdictApprox: 260,
} as const
