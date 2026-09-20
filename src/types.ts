export type View =
  | "overview"
  | "evaluations"
  | "intake"
  | "rules"
  | "ledger"
  | "reviews"
  | "verification"
  | "settings";
export type MarkStatus =
  "pending" | "running" | "done" | "failed" | "cancelled";
export type LedgerEvent = {
  seq: number;
  type: string;
  actor: string;
  module: string;
  detail: string;
  hash: string;
  time: string;
};
export type Run = {
  id: string;
  period: string;
  module: string;
  rule: string;
  source: string;
  records: number;
  status: MarkStatus;
  anchor: string;
};
