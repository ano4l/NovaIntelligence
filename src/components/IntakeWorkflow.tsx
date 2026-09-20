import { useState } from "react";
import StatusMark from "./StatusMark";
import ThoughtLine from "./ThoughtLine";
import type { Run } from "../types";
const cols = [
  "Employer ID",
  "Pay period",
  "Deduction date",
  "Contribution amount",
  "Payment date",
];
export default function IntakeWorkflow({
  onComplete,
  onOpenEvaluation,
}: {
  onComplete: (r: Run) => void;
  onOpenEvaluation: (id: string) => void;
}) {
  const [step, setStep] = useState(0),
    [file, setFile] = useState(false),
    [mapped, setMapped] = useState(cols.map(() => true)),
    [working, setWorking] = useState(false),
    [done, setDone] = useState(false);
  const stages =
    step === 2
      ? [
          "Reading 48 contribution records",
          "Normalising dates to Africa/Johannesburg",
          "Validating required fields",
          "Comparing record totals",
        ]
      : [
          "Pinning LAWOS-SA v2.4.1",
          "Hashing canonical input",
          "Evaluating both configured clocks",
          "Appending demo ledger events",
        ];
  const run = () => {
    setWorking(true);
    setTimeout(() => {
      setWorking(false);
      if (step === 2) setStep(3);
      else {
        setDone(true);
        onComplete({
          id: "RUN-0926-044",
          period: "September 2026",
          module: "LawOS · Contributions",
          rule: "LAWOS-SA v2.4.1",
          source: "demo_contributions_sep.csv",
          records: 48,
          status: "done",
          anchor: "EVT-00301",
        });
      }
    }, 1200);
  };
  return (
    <section className="workspace">
      <header className="page-head">
        <div>
          <span className="eyebrow">Controlled local workflow</span>
          <h1>Contribution intake</h1>
          <p>
            Prepare canonical source facts for a deterministic evaluation. No
            data leaves this demo.
          </p>
        </div>
        <button
          className="quiet"
          onClick={() => {
            setStep(0);
            setFile(false);
            setDone(false);
          }}
        >
          Reset demo
        </button>
      </header>
      <ol className="stepper">
        {["Source", "Map fields", "Validate", "Evaluate"].map((x, i) => (
          <li
            data-active={step === i ? "" : undefined}
            data-done={step > i ? "" : undefined}
          >
            <span>{step > i ? "✓" : i + 1}</span>
            {x}
          </li>
        ))}
      </ol>
      <div className="panel workflow-panel">
        {step === 0 && (
          <>
            <h2>Select a source</h2>
            <button className="dropzone" onClick={() => setFile(true)}>
              <strong>
                {file
                  ? "demo_contributions_sep.csv"
                  : "Drop a local contribution file"}
              </strong>
              <span>
                {file
                  ? "CSV · 48 fictional records · SHA-256 48de…a901"
                  : "or choose the controlled demo contribution file"}
              </span>
              <StatusMark
                status={file ? "done" : "pending"}
                label={file ? "Local file ready" : "Awaiting source"}
              />
            </button>
            {file && (
              <div className="button-row">
                <button className="text-button" onClick={() => setFile(false)}>
                  Remove
                </button>
                <button className="primary" onClick={() => setStep(1)}>
                  Map 5 fields →
                </button>
              </div>
            )}
          </>
        )}
        {step === 1 && (
          <>
            <h2>Map source fields</h2>
            <p className="muted">
              Required canonical fields must be mapped before validation.
            </p>
            <div className="mapping">
              {cols.map((c, i) => (
                <label>
                  <span>
                    {c}
                    <small>Required</small>
                  </span>
                  <select
                    value={mapped[i] ? c : ""}
                    onChange={(e) =>
                      setMapped((m) =>
                        m.map((v, k) => (k === i ? !!e.target.value : v)),
                      )
                    }
                  >
                    <option value="">Not mapped</option>
                    <option>{c}</option>
                    <option>Unused column</option>
                  </select>
                  <StatusMark status={mapped[i] ? "done" : "failed"} />
                </label>
              ))}
            </div>
            <div className="button-row">
              <button className="quiet" onClick={() => setStep(0)}>
                Back
              </button>
              <button
                className="primary"
                disabled={mapped.some((x) => !x)}
                onClick={() => setStep(2)}
              >
                Validate records →
              </button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h2>Validate canonical data</h2>
            {working ? (
              <ThoughtLine working steps={stages} />
            ) : (
              <>
                <div className="result-grid">
                  <b>
                    <strong>46</strong>Accepted
                  </b>
                  <b>
                    <strong>1</strong>Needs review
                  </b>
                  <b className="danger">
                    <strong>1</strong>Rejected
                  </b>
                </div>
                <div className="exception">
                  <StatusMark status="failed" />
                  <span>
                    <strong>Row 37 · payment_date</strong>
                    <small>
                      Value “31/09/2026” is not a valid configured date.
                    </small>
                  </span>
                  <button className="quiet">Exclude row from this run</button>
                </div>
                <div className="button-row">
                  <button className="quiet" onClick={() => setStep(1)}>
                    Return to mapping
                  </button>
                  <button className="primary" onClick={run}>
                    Run validation
                  </button>
                </div>
              </>
            )}
          </>
        )}
        {step === 3 && (
          <>
            <h2>Run deterministic evaluation</h2>
            <div className="form-grid">
              <label>
                Versioned rule set
                <select>
                  <option>LAWOS-SA v2.4.1 · effective 01 Aug 2026</option>
                </select>
              </label>
              <label>
                Reporting period
                <select>
                  <option>September 2026</option>
                  <option>August 2026</option>
                </select>
              </label>
            </div>
            {working && <ThoughtLine working steps={stages} />}{" "}
            {done && (
              <div className="success-box">
                <StatusMark
                  status="done"
                  label="Evaluation completed and demo ledger anchored"
                />
                <h3>RUN-0926-044 is ready for human review</h3>
                <p>
                  47 records evaluated · 3 configured timing exposures · anchor
                  EVT-00301.
                </p>
              </div>
            )}
            <div className="button-row">
              <button className="quiet" onClick={() => setStep(2)}>
                Back
              </button>
              {done && (
                <button
                  className="quiet"
                  onClick={() => {
                    setStep(0);
                    setFile(false);
                    setDone(false);
                  }}
                >
                  Start another intake
                </button>
              )}
              {done && (
                <button
                  className="primary"
                  onClick={() => onOpenEvaluation("RUN-0926-044")}
                >
                  Open new evaluation →
                </button>
              )}
              <button
                className="primary"
                hidden={done}
                disabled={working}
                onClick={run}
              >
                Run deterministic evaluation
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
