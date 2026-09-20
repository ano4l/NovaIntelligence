import type { LedgerEvent, Run } from "../types";
export const runs: Run[] = [
  {
    id: "RUN-0826-041",
    period: "August 2026",
    module: "LawOS · Contributions",
    rule: "LAWOS-SA v2.4.1",
    source: "august_contributions.csv",
    records: 48,
    status: "done",
    anchor: "EVT-00284",
  },
  {
    id: "RUN-0726-038",
    period: "July 2026",
    module: "LawOS · Contributions",
    rule: "LAWOS-SA v2.4.0",
    source: "july_contributions.csv",
    records: 51,
    status: "done",
    anchor: "EVT-00231",
  },
  {
    id: "RUN-0626-032",
    period: "June 2026",
    module: "LawOS · Contributions",
    rule: "LAWOS-SA v2.3.2",
    source: "june_adjustment.csv",
    records: 12,
    status: "failed",
    anchor: "EVT-00192",
  },
];
export const events: LedgerEvent[] = Array.from({ length: 14 }, (_, i) => ({
  seq: 284 - i,
  type:
    i % 4 === 0
      ? "REVIEW_COMPLETED"
      : i % 3 === 0
        ? "INPUT_HASHED"
        : "RULE_EVALUATED",
  actor: i % 5 === 0 ? "L. Mokoena" : "system.demo",
  module: i % 2 ? "LawOS" : "Review",
  detail:
    i % 3 ? "Configured clocks evaluated" : "Operational disposition recorded",
  hash: `${(284 - i).toString(16).padStart(4, "0")}a9f2…${(i * 9187 + 4301).toString(16)}`,
  time: `20 Sep · ${String(14 - Math.floor(i / 2)).padStart(2, "0")}:${i % 2 ? "24" : "08"}`,
}));
export const cases = [
  {
    id: "REV-031",
    employer: "Cape Meridian Manufacturing",
    period: "Aug 2026",
    state: "unassigned",
    exposure: "R 184,320",
    reason: "Configured timing exposure",
    due: "Today · 16:00",
  },
  {
    id: "REV-030",
    employer: "Umoya Logistics Group",
    period: "Aug 2026",
    state: "assigned",
    exposure: "R 82,410",
    reason: "Source facts require confirmation",
    due: "Tomorrow",
  },
  {
    id: "REV-027",
    employer: "Karoo Works Ltd",
    period: "Jul 2026",
    state: "evidence",
    exposure: "R 41,880",
    reason: "Supporting evidence requested",
    due: "22 Sep",
  },
];
