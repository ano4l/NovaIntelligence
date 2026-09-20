import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  DashboardSquare01Icon,
  FileUploadIcon,
  Task01Icon,
  BookOpen01Icon,
  Audit01Icon,
  UserMultiple02Icon,
  ShieldKeyIcon,
  Settings02Icon,
} from "@hugeicons/core-free-icons";
import type { View } from "../types";
import "./BranchedMenu.css";
const groups = [
  {
    label: "Operations",
    items: [
      ["overview", "Overview", DashboardSquare01Icon],
      ["evaluations", "Evaluations", Task01Icon],
      ["intake", "Intake", FileUploadIcon],
    ],
  },
  {
    label: "Governance",
    items: [
      ["rules", "Rule library", BookOpen01Icon],
      ["ledger", "Audit ledger", Audit01Icon],
      ["reviews", "Review queue", UserMultiple02Icon],
    ],
  },
  {
    label: "System",
    items: [
      ["verification", "Verification", ShieldKeyIcon],
      ["settings", "Settings", Settings02Icon],
    ],
  },
] as const;
export default function BranchedMenu({
  active,
  onSelect,
  reviewCount = 3,
}: {
  active: View;
  onSelect: (v: View) => void;
  reviewCount?: number;
}) {
  const [open, setOpen] = useState(new Set([0, 1, 2]));
  return (
    <nav className="branched" aria-label="Primary navigation">
      {groups.map((g, gi) => (
        <section key={g.label} data-open={open.has(gi) ? "" : undefined}>
          <button
            className="branch-head"
            aria-expanded={open.has(gi)}
            onClick={() =>
              setOpen((s) => {
                const n = new Set(s);
                n.has(gi) ? n.delete(gi) : n.add(gi);
                return n;
              })
            }
          >
            {g.label}
          </button>
          <div className="branch-fold" hidden={!open.has(gi)}>
            <div className="branch-items">
              {g.items.map(([v, l, icon], i) => (
                <button
                  key={v}
                  aria-current={active === v ? "page" : undefined}
                  onClick={() => onSelect(v)}
                  style={{ "--row": i } as React.CSSProperties}
                >
                  <span className="branch-line" />
                  <HugeiconsIcon icon={icon} size={17} strokeWidth={1.8} />
                  <span>{l}</span>
                  {v === "reviews" && (
                    <b>{String(reviewCount).padStart(2, "0")}</b>
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>
      ))}
    </nav>
  );
}
