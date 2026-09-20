import type { ReactNode } from "react";
import type { MarkStatus } from "../types";
import "./StatusMark.css";
export default function StatusMark({
  status = "pending",
  progress,
  label,
  size = 18,
  strike = false,
}: {
  status?: MarkStatus;
  progress?: number;
  label?: ReactNode;
  size?: number;
  strike?: boolean;
}) {
  const r = 9,
    c = 2 * Math.PI * r,
    p = Math.max(0, Math.min(1, progress ?? 0.68));
  return (
    <span
      className="status-mark"
      data-status={status}
      data-strike={strike ? "" : undefined}
      style={{ "--sm-size": `${size}px` } as React.CSSProperties}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle className="sm-track" cx="12" cy="12" r={r} />
        <circle
          className="sm-ring"
          cx="12"
          cy="12"
          r={r}
          style={{ strokeDasharray: `${c * p} ${c}` }}
        />
        <path className="sm-check" d="M7.5 12.25 10.5 15.25 16.75 8.75" />
        <path className="sm-cross" d="M8.5 8.5 15.5 15.5M15.5 8.5 8.5 15.5" />
      </svg>
      {label && (
        <span className="sm-label">
          {label}
          <i />
        </span>
      )}
      <span className="sr-only" role="status">
        {status}
        {progress != null ? ` ${Math.round(progress * 100)} percent` : ""}
      </span>
    </span>
  );
}
