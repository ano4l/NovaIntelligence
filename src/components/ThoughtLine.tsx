import { useEffect, useState } from "react";
import { Sparkles, ChevronDown, Check } from "lucide-react";
import "./ThoughtLine.css";
export default function ThoughtLine({
  working,
  steps,
  label = "Processing deterministic workflow…",
  doneLabel = "Process trace retained",
}: {
  working: boolean;
  steps: string[];
  label?: string;
  doneLabel?: string;
}) {
  const [open, setOpen] = useState(true);
  const [start] = useState(Date.now());
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!working) {
      setOpen(false);
      return;
    }
    const id = setInterval(() => setT((Date.now() - start) / 1000), 100);
    return () => clearInterval(id);
  }, [working, start]);
  return (
    <div
      className="thought-line"
      data-working={working ? "" : undefined}
      data-open={open ? "" : undefined}
    >
      <button onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <Sparkles size={17} />
        <span>{working ? label : doneLabel}</span>
        <em>{t.toFixed(1)}s</em>
        <ChevronDown size={15} />
      </button>
      <div className="thought-trace">
        <div>
          {steps.map((s, i) => (
            <p
              key={s}
              data-current={working && i === steps.length - 1 ? "" : undefined}
            >
              <span>
                {!working || i < steps.length - 1 ? <Check size={13} /> : <i />}
              </span>
              {s}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
