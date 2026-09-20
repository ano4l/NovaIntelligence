import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Menu,
  Search,
  ChevronRight,
  Download,
  Printer,
  X,
  Plus,
  ShieldCheck,
  MoreHorizontal,
  CheckCircle2,
} from "lucide-react";
import BranchedMenu from "./components/BranchedMenu";
import IntakeWorkflow from "./components/IntakeWorkflow";
import StatusMark from "./components/StatusMark";
import ThoughtLine from "./components/ThoughtLine";
import {
  runs as seedRuns,
  events as seedEvents,
  cases as seedCases,
} from "./data/demo";
import type { Run, View, LedgerEvent } from "./types";
import "./styles.css";
function Shell({
  view,
  setView,
  reviewCount,
  children,
}: {
  view: View;
  setView: (v: View) => void;
  reviewCount: number;
  children: React.ReactNode;
}) {
  const [mobile, setMobile] = useState(false);
  const mobileRef = useRef<HTMLElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    const e = (x: KeyboardEvent) => {
      if (x.key === "Escape") setMobile(false);
      if (x.key === "Tab" && mobileRef.current) {
        const focusable = [
          ...mobileRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          ),
        ];
        if (!focusable.length) return;
        const first = focusable[0],
          last = focusable[focusable.length - 1];
        if (x.shiftKey && document.activeElement === first) {
          x.preventDefault();
          last.focus();
        } else if (!x.shiftKey && document.activeElement === last) {
          x.preventDefault();
          first.focus();
        }
      }
    };
    addEventListener("keydown", e);
    if (mobile)
      requestAnimationFrame(() =>
        mobileRef.current?.querySelector<HTMLElement>("button")?.focus(),
      );
    else openerRef.current?.focus();
    return () => removeEventListener("keydown", e);
  }, [mobile]);
  const nav = (
    <>
      <div className="brand">
        <i>N</i>
        <span>
          Nova<strong>Intelligence</strong>
        </span>
      </div>
      <div className="tenant">
        <span>NM</span>
        <div>
          <b>Nova Meridian</b>
          <small>South Africa · production demo</small>
        </div>
      </div>
      <BranchedMenu
        active={view}
        reviewCount={reviewCount}
        onSelect={(v) => {
          setView(v);
          setMobile(false);
        }}
      />
      <div className="rail-foot">
        <div className="operator">
          <span>LM</span>
          <div>
            <b>Lerato Mokoena</b>
            <small>Compliance operator</small>
          </div>
          <MoreHorizontal size={16} />
        </div>
        <p>
          <ShieldCheck size={13} /> Local deterministic demo
        </p>
      </div>
    </>
  );
  return (
    <div className="shell">
      <aside className="rail" inert={mobile ? true : undefined}>
        {nav}
      </aside>
      {mobile && (
        <>
          <button
            className="scrim"
            aria-label="Close menu"
            onClick={() => setMobile(false)}
          />
          <aside
            ref={mobileRef}
            className="mobile-rail"
            role="dialog"
            aria-modal="true"
            aria-label="Primary navigation"
          >
            <button
              className="close"
              aria-label="Close navigation"
              onClick={() => setMobile(false)}
            >
              <X />
            </button>
            {nav}
          </aside>
        </>
      )}
      <header className="mobile-bar" inert={mobile ? true : undefined}>
        <button
          ref={openerRef}
          onClick={() => setMobile(true)}
          aria-label="Open navigation"
        >
          <Menu />
        </button>
        <div className="brand">
          <i>N</i>
          <span>
            Nova<strong>Intelligence</strong>
          </span>
        </div>
        <span className="avatar">LM</span>
      </header>
      <main inert={mobile ? true : undefined}>{children}</main>
    </div>
  );
}
const Head = ({
  kicker,
  title,
  text,
  action,
}: {
  kicker: string;
  title: string;
  text: string;
  action?: React.ReactNode;
}) => (
  <header className="page-head">
    <div>
      <span className="eyebrow">{kicker}</span>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
    {action}
  </header>
);
function Overview({
  go,
  cases,
}: {
  go: (v: View) => void;
  cases: ReviewCase[];
}) {
  return (
    <section className="workspace">
      <Head
        kicker="Operations control plane"
        title="Configured obligations, rendered as evidence."
        text="One deterministic view of timing exposure, source facts and human decisions."
        action={
          <button className="primary" onClick={() => go("intake")}>
            <Plus size={16} /> Run intake
          </button>
        }
      />
      <div className="signal-strip">
        <div>
          <small>Open review exposure</small>
          <strong>R 308,610</strong>
          <span>
            Across {cases.filter((item) => item.state !== "resolved").length}{" "}
            employer records
          </span>
        </div>
        <div>
          <small>Configured deadlines</small>
          <strong>98.7%</strong>
          <span>1,482 facts evaluated</span>
        </div>
        <div>
          <small>Ledger continuity</small>
          <strong>284 / 284</strong>
          <span className="green">Chain verified locally</span>
        </div>
        <div>
          <small>Active rule version</small>
          <strong>v2.4.1</strong>
          <span>Effective 01 Aug 2026</span>
        </div>
      </div>
      <div className="overview-grid">
        <article className="panel focal">
          <div className="panel-head">
            <div>
              <span className="eyebrow">Highest configured exposure</span>
              <h2>Cape Meridian Manufacturing</h2>
            </div>
            <StatusMark status="done" label="Facts verified" />
          </div>
          <div className="exposure">
            <div>
              <small>Configured exposure</small>
              <strong>R 184,320</strong>
              <span>48 contribution records</span>
            </div>
            <div className="clock">
              <i />
              <span>
                <b>Deduction clock</b>
                <small>31 Aug → 07 Sep · 7 days</small>
              </span>
              <em>On time</em>
            </div>
            <div className="clock warning">
              <i />
              <span>
                <b>Payment clock</b>
                <small>31 Aug → 12 Sep · 12 days</small>
              </span>
              <em>+5 days</em>
            </div>
          </div>
          <footer>
            <p>
              Requires human review. This is configured timing exposure, not a
              statutory breach.
            </p>
            <button className="text-button" onClick={() => go("reviews")}>
              Open review case <ChevronRight size={15} />
            </button>
          </footer>
        </article>
        <article className="panel">
          <div className="panel-head">
            <div>
              <span className="eyebrow">Human review</span>
              <h2>Priority queue</h2>
            </div>
            <b className="count">
              {String(
                cases.filter((item) => item.state !== "resolved").length,
              ).padStart(2, "0")}
            </b>
          </div>
          {cases
            .filter((item) => item.state !== "resolved")
            .map((c) => (
              <button className="queue-row" onClick={() => go("reviews")}>
                <span>
                  <b>{c.employer}</b>
                  <small>{c.reason}</small>
                </span>
                <strong>{c.exposure}</strong>
                <ChevronRight size={15} />
              </button>
            ))}
        </article>
      </div>
      <article className="panel recent">
        <div className="panel-head">
          <div>
            <span className="eyebrow">Recent deterministic runs</span>
            <h2>Evaluation activity</h2>
          </div>
          <button className="text-button" onClick={() => go("evaluations")}>
            View all
          </button>
        </div>
        {seedRuns.map((r) => (
          <div className="run-row">
            <StatusMark status={r.status} />
            <span>
              <b>{r.id}</b>
              <small>{r.source}</small>
            </span>
            <span>{r.period}</span>
            <code>{r.anchor}</code>
            <strong>{r.records} records</strong>
          </div>
        ))}
      </article>
    </section>
  );
}
function Evaluations({
  runs,
  selectedId,
  events,
}: {
  runs: Run[];
  selectedId?: string;
  events: LedgerEvent[];
}) {
  const [q, setQ] = useState(""),
    [selected, setSelected] = useState(
      runs.find((run) => run.id === selectedId) ?? runs[0],
    ),
    [employer, setEmployer] = useState("Cape Meridian Manufacturing");
  useEffect(() => {
    if (selectedId)
      setSelected(runs.find((run) => run.id === selectedId) ?? runs[0]);
  }, [selectedId, runs]);
  const visible = runs.filter((r) =>
    (r.id + r.source + r.period).toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <section className="workspace">
      <Head
        kicker="Evaluation operations"
        title="Reproducible runs and evidence"
        text="Inspect canonical inputs, versioned rules and linked ledger events."
      />
      <div className="toolbar">
        <label className="search">
          <Search size={16} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search run, source or period"
          />
        </label>
        <select>
          <option>All statuses</option>
          <option>Completed</option>
          <option>Failed</option>
        </select>
        <select>
          <option>All periods</option>
          {[...new Set(runs.map((run) => run.period))].map((period) => (
            <option key={period}>{period}</option>
          ))}
        </select>
      </div>
      <div className="split">
        <article className="panel list-pane">
          <div className="table-head">
            <span>Run</span>
            <span>Period</span>
            <span>Status</span>
          </div>
          {visible.map((r) => (
            <button
              className="run-list"
              data-active={selected.id === r.id ? "" : undefined}
              onClick={() => setSelected(r)}
            >
              <span>
                <b>{r.id}</b>
                <small>{r.source}</small>
              </span>
              <span>{r.period}</span>
              <StatusMark status={r.status} />
            </button>
          ))}
          {!visible.length && (
            <div className="empty">
              <Search />
              <b>No matching runs</b>
              <span>Adjust your search or filters.</span>
            </div>
          )}
        </article>
        <article className="panel detail-pane">
          <div className="panel-head">
            <div>
              <span className="eyebrow">{selected.id}</span>
              <h2>{selected.period} contribution evaluation</h2>
            </div>
            <StatusMark
              status={selected.status}
              label={
                selected.status === "done" ? "Completed" : "Requires attention"
              }
            />
          </div>
          <div className="meta-grid">
            <span>
              <small>Rule version</small>
              <b>{selected.rule}</b>
            </span>
            <span>
              <small>Input checksum</small>
              <code>48de9b…a901</code>
            </span>
            <span>
              <small>Ledger anchor</small>
              <code>{selected.anchor}</code>
            </span>
            <span>
              <small>Records</small>
              <b>{selected.records}</b>
            </span>
          </div>
          <h3>Record-level inspection</h3>
          <label className="record-context">
            Employer context
            <select
              value={employer}
              onChange={(event) => setEmployer(event.target.value)}
            >
              <option>Cape Meridian Manufacturing</option>
              <option>Umoya Logistics Group</option>
              <option>Karoo Works Ltd</option>
            </select>
          </label>
          <div className="record-table">
            <div>
              <b>Record</b>
              <b>Deduction</b>
              <b>Payment</b>
              <b>Amount</b>
              <b>Finding</b>
            </div>
            {[
              [
                "CTR-1048",
                "31 Aug",
                "07 Sep",
                "R 42,300",
                "Within both clocks",
              ],
              [
                "CTR-1049",
                "31 Aug",
                "12 Sep",
                "R 78,200",
                "Configured timing exposure",
              ],
              ["CTR-1050", "31 Aug", "—", "R 63,820", "Requires evidence"],
            ].map((row) => (
              <button key={row[0]}>
                {row.map((cell, index) =>
                  index === 4 ? (
                    <StatusMark
                      key={cell}
                      status={
                        cell === "Within both clocks"
                          ? "done"
                          : cell === "Requires evidence"
                            ? "running"
                            : "failed"
                      }
                      label={cell}
                    />
                  ) : (
                    <span key={cell}>{cell}</span>
                  ),
                )}
              </button>
            ))}
          </div>
          <h3>Two-clock evidence · {employer}</h3>
          <div className="timeline">
            <span>
              31 Aug<small>Period end</small>
            </span>
            <i />
            <span>
              07 Sep<small>Configured due</small>
            </span>
            <i className="red" />
            <span>
              12 Sep<small>Payment fact</small>
            </span>
          </div>
          <div className="breakdown">
            <b>
              <small>Within both clocks</small>43
            </b>
            <b>
              <small>Configured timing exposure</small>3
            </b>
            <b>
              <small>Requires evidence</small>2
            </b>
          </div>
          <details open>
            <summary>Inspectable process trace</summary>
            <ol>
              <li>Canonical input hash confirmed</li>
              <li>Rule {selected.rule} pinned</li>
              <li>Both configured clocks evaluated</li>
              <li>Ledger events linked through {selected.anchor}</li>
            </ol>
          </details>
          <h3>Linked ledger events</h3>
          <div className="linked-events">
            {events.slice(0, 3).map((event) => (
              <div key={event.seq}>
                <code>{String(event.seq).padStart(4, "0")}</code>
                <span>
                  <b>{event.type}</b>
                  <small>{event.detail}</small>
                </span>
                <code>{event.hash}</code>
              </div>
            ))}
          </div>
          <p className="boundary">
            Interpretation explains deterministic output and cannot change
            findings.
          </p>
        </article>
      </div>
    </section>
  );
}
type ReviewCase = (typeof seedCases)[number];
function Reviews({
  cases,
  setCases,
  addEvent,
  removeEvent,
}: {
  cases: ReviewCase[];
  setCases: React.Dispatch<React.SetStateAction<ReviewCase[]>>;
  addEvent: (e: LedgerEvent) => void;
  removeEvent: (seq: number) => void;
}) {
  const [state, setState] = useState("unassigned"),
    [assigned, setAssigned] = useState(false),
    [complete, setComplete] = useState(false),
    [note, setNote] = useState(""),
    [disposition, setDisposition] = useState(""),
    [toast, setToast] = useState(""),
    [undo, setUndo] = useState<null | (() => void)>(null);
  const selectedCase = cases.find((item) => item.id === "REV-031")!;
  const moveCase = (next: ReviewCase["state"], message: string) => {
    const previous = selectedCase.state;
    setCases((items) =>
      items.map((item) =>
        item.id === selectedCase.id ? { ...item, state: next } : item,
      ),
    );
    setState(next);
    setUndo(() => () => {
      setCases((items) =>
        items.map((item) =>
          item.id === selectedCase.id ? { ...item, state: previous } : item,
        ),
      );
      setState(previous);
      setAssigned(previous === "assigned");
      setComplete(previous === "resolved");
      removeEvent(285);
    });
    act(message);
  };
  const act = (s: string) => {
    setToast(s);
    setTimeout(() => setToast(""), 3500);
  };
  return (
    <section className="workspace">
      <Head
        kicker="Human control"
        title="Review queue"
        text="Resolve source facts and record operational dispositions without creating a legal verdict."
      />
      <div className="tabs">
        {["unassigned", "assigned", "evidence", "resolved"].map((x) => (
          <button
            data-active={state === x ? "" : undefined}
            onClick={() => setState(x)}
          >
            {x === "evidence"
              ? "Awaiting evidence"
              : x.replace(/^./, (m) => m.toUpperCase())}
            <b>{cases.filter((item) => item.state === x).length}</b>
          </button>
        ))}
      </div>
      <div className="review-layout">
        <article className="panel case-list">
          {cases
            .filter((c) => c.state === state)
            .map((c) => (
              <button data-active="">
                <span>
                  <StatusMark
                    status={c.state === "evidence" ? "running" : "pending"}
                  />
                  <b>{c.employer}</b>
                  <small>
                    {c.id} · {c.period}
                  </small>
                </span>
                <strong>{c.exposure}</strong>
                <small>{c.due}</small>
              </button>
            ))}
          {!cases.some((c) => c.state === state) && (
            <div className="empty">
              <CheckCircle2 />
              <b>Queue is clear</b>
              <span>No cases in this view.</span>
            </div>
          )}
        </article>
        <article className="panel case-detail">
          <div className="panel-head">
            <div>
              <span className="eyebrow">REV-031 · unassigned</span>
              <h2>Cape Meridian Manufacturing</h2>
            </div>
            <StatusMark
              status={complete ? "done" : assigned ? "running" : "pending"}
              label={
                complete
                  ? "Review completed"
                  : assigned
                    ? "Assigned to you"
                    : "Awaiting assignment"
              }
            />
          </div>
          <div className="case-banner">
            <strong>R 184,320</strong>
            <span>Configured timing exposure</span>
            <p>
              Payment fact is 5 calendar days after the configured second clock.
            </p>
          </div>
          <div className="meta-grid">
            <span>
              <small>Rule version</small>
              <b>LAWOS-SA v2.4.1</b>
            </span>
            <span>
              <small>Source hash</small>
              <code>48de9b…a901</code>
            </span>
            <span>
              <small>Audit link</small>
              <code>EVT-00284</code>
            </span>
            <span>
              <small>Evidence</small>
              <b>2 source artefacts</b>
            </span>
          </div>
          <h3>Reviewer actions</h3>
          <div className="button-row">
            <button
              className="primary"
              disabled={assigned}
              onClick={() => {
                setAssigned(true);
                moveCase("assigned", "Case assigned to you");
              }}
            >
              Assign to me
            </button>
            <button
              className="quiet"
              onClick={() =>
                moveCase("evidence", "Evidence request recorded locally")
              }
            >
              Request supporting evidence
            </button>
          </div>
          <label className="note">
            Internal note
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Record factual context for the audit trail…"
            />
            <button
              className="quiet"
              disabled={!note}
              onClick={() => {
                act("Internal note added");
                setNote("");
              }}
            >
              Add note
            </button>
          </label>
          <label className="note">
            Operational disposition
            <select
              value={disposition}
              onChange={(event) => setDisposition(event.target.value)}
            >
              <option value="">Choose a factual disposition</option>
              <option>Confirmed data timing</option>
              <option>Source correction required</option>
              <option>No action under configured rule</option>
            </select>
          </label>
          <button
            className="primary full"
            disabled={!assigned || !disposition || complete}
            onClick={() => {
              setComplete(true);
              moveCase("resolved", "Operational disposition recorded");
              addEvent({
                seq: 285,
                type: "REVIEW_COMPLETED",
                actor: "L. Mokoena",
                module: "Review",
                detail: "Operational disposition recorded",
                hash: "011da9f2…e39c",
                time: "Just now",
              });
            }}
          >
            Mark review complete
          </button>
          <p className="boundary">
            Review completion records an operational disposition, not a legal
            determination.
          </p>
        </article>
      </div>
      {toast && (
        <div className="toast" role="status">
          <CheckCircle2 size={18} />
          {toast}
          <button
            onClick={() => {
              undo?.();
              setToast("");
            }}
          >
            Undo
          </button>
        </div>
      )}
    </section>
  );
}
function Ledger({
  events,
  verify = false,
}: {
  events: LedgerEvent[];
  verify?: boolean;
}) {
  const [q, setQ] = useState(""),
    [eventType, setEventType] = useState(""),
    [actor, setActor] = useState(""),
    [moduleFilter, setModuleFilter] = useState(""),
    [working, setWorking] = useState(false),
    [result, setResult] = useState<"ok" | "bad" | null>(null),
    [tampered, setTampered] = useState(false);
  const steps = [
    "Reading 284 events",
    "Recomputing SHA-256 links",
    "Comparing the chain root",
    "Confirming rule/input references",
  ];
  const run = () => {
    setWorking(true);
    setResult(null);
    setTimeout(() => {
      setWorking(false);
      setResult(tampered ? "bad" : "ok");
    }, 1200);
  };
  if (verify)
    return (
      <section className="workspace">
        <Head
          kicker="Local integrity control"
          title="Verify an audit chain"
          text="Recompute links against a prefilled anchor or a local demo artifact."
        />
        <div className="verify-grid">
          <article className="panel">
            <h2>Verification input</h2>
            <label className="note">
              Ledger anchor
              <input value="EVT-00284 · 6fe4c9…b710" readOnly />
            </label>
            <label className="mode">
              <input
                type="checkbox"
                checked={tampered}
                onChange={(e) => setTampered(e.target.checked)}
              />
              <span>
                <b>Use intentionally tampered demo</b>
                <small>Tests a controlled failure at sequence 0197.</small>
              </span>
            </label>
            <button className="primary full" onClick={run} disabled={working}>
              Verify chain locally
            </button>
          </article>
          <article className="panel receipt">
            {working && <ThoughtLine working steps={steps} />}{" "}
            {!working && !result && (
              <div className="empty">
                <ShieldCheck />
                <b>Ready to verify</b>
                <span>No upload or network connection is used.</span>
              </div>
            )}
            {result === "ok" && (
              <>
                <StatusMark status="done" label="Chain integrity verified" />
                <h2>Verification receipt</h2>
                <div className="receipt-root">
                  <small>Computed root</small>
                  <code>6fe4c9e01a7b…b710</code>
                </div>
                <dl>
                  <div>
                    <dt>Event range</dt>
                    <dd>0001—0284</dd>
                  </div>
                  <div>
                    <dt>Verified</dt>
                    <dd>20 Sep 2026 · 16:42 SAST</dd>
                  </div>
                  <div>
                    <dt>References</dt>
                    <dd>Rule and input confirmed</dd>
                  </div>
                </dl>
                <div className="button-row">
                  <button className="quiet" onClick={() => window.print()}>
                    <Printer size={15} /> Print
                  </button>
                  <button
                    className="quiet"
                    onClick={() => {
                      const a = document.createElement("a");
                      a.href = URL.createObjectURL(
                        new Blob([
                          "Nova Intelligence demo verification receipt\nRoot: 6fe4c9e01a7b…b710",
                        ]),
                      );
                      a.download = "nova-verification-receipt.txt";
                      a.click();
                    }}
                  >
                    <Download size={15} /> Export receipt
                  </button>
                </div>
              </>
            )}
            {result === "bad" && (
              <>
                <StatusMark status="failed" label="Chain mismatch detected" />
                <h2>Verification failed safely</h2>
                <div className="error-box">
                  <b>First mismatch · sequence 0197</b>
                  <p>
                    Expected previous hash <code>29f0…0ae1</code>, received{" "}
                    <code>29f0…92bc</code>.
                  </p>
                </div>
                <p className="boundary">
                  The verifier has not repaired or changed the demo artifact.
                </p>
              </>
            )}
          </article>
        </div>
      </section>
    );
  const visible = events.filter(
    (e) =>
      (e.type + e.actor + e.module + e.hash + e.seq)
        .toLowerCase()
        .includes(q.toLowerCase()) &&
      (!eventType || e.type === eventType) &&
      (!actor || e.actor === actor) &&
      (!moduleFilter || e.module === moduleFilter),
  );
  return (
    <section className="workspace">
      <Head
        kicker="Immutable operational record"
        title="Audit ledger"
        text="Search linked events across evaluation and human-review activity."
      />
      <div className="toolbar">
        <label className="search">
          <Search size={16} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Sequence, hash, actor or event"
          />
        </label>
        <select
          aria-label="Event type"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        >
          <option value="">All event types</option>
          {[...new Set(events.map((event) => event.type))].map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>
        <select
          aria-label="Actor"
          value={actor}
          onChange={(e) => setActor(e.target.value)}
        >
          <option value="">All actors</option>
          {[...new Set(events.map((event) => event.actor))].map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>
        <select
          aria-label="Module"
          value={moduleFilter}
          onChange={(e) => setModuleFilter(e.target.value)}
        >
          <option value="">All modules</option>
          {[...new Set(events.map((event) => event.module))].map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>
        {(q || eventType || actor || moduleFilter) && (
          <button
            className="quiet"
            onClick={() => {
              setQ("");
              setEventType("");
              setActor("");
              setModuleFilter("");
            }}
          >
            Clear filters
          </button>
        )}
      </div>
      <article className="panel ledger">
        <div className="ledger-head">
          <span>Seq</span>
          <span>Event</span>
          <span>Actor / module</span>
          <span>Hash</span>
          <span>Time</span>
        </div>
        {visible.map((e) => (
          <div className="ledger-row">
            <code>{String(e.seq).padStart(4, "0")}</code>
            <span>
              <b>{e.type}</b>
              <small>{e.detail}</small>
            </span>
            <span>
              <b>{e.actor}</b>
              <small>{e.module}</small>
            </span>
            <code>{e.hash}</code>
            <time>{e.time}</time>
          </div>
        ))}
        {!visible.length && (
          <div className="empty">
            <Search />
            <b>No ledger events match</b>
            <span>Clear filters to restore all events.</span>
          </div>
        )}
      </article>
    </section>
  );
}
function Rules() {
  const [selected, setSelected] = useState(false),
    [compare, setCompare] = useState(false);
  const drawerRef = useRef<HTMLElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!selected) return;
    const background = [
      ...document.querySelectorAll<HTMLElement>(
        ".workspace > *:not(.drawer-wrap)",
      ),
    ];
    background.forEach((element) => {
      element.inert = true;
    });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(false);
      if (event.key === "Tab" && drawerRef.current) {
        const controls = [
          ...drawerRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input, select, [tabindex]:not([tabindex="-1"])',
          ),
        ];
        const first = controls[0],
          last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    addEventListener("keydown", onKey);
    requestAnimationFrame(() =>
      drawerRef.current?.querySelector<HTMLElement>("button")?.focus(),
    );
    return () => {
      removeEventListener("keydown", onKey);
      background.forEach((element) => {
        element.inert = false;
      });
      openerRef.current?.focus();
    };
  }, [selected]);
  return (
    <section className="workspace">
      <Head
        kicker="Versioned configuration"
        title="Rule library"
        text="Immutable configured deadline facts with traceable source verification."
      />
      <div className="rule-grid">
        {["2.4.1", "2.4.0", "2.3.2"].map((v, i) => (
          <button
            ref={i === 0 ? openerRef : undefined}
            className="panel rule"
            onClick={() => setSelected(true)}
          >
            <StatusMark status={i < 2 ? "done" : "cancelled"} />
            <span>
              <b>LAWOS-SA v{v}</b>
              <small>
                {i
                  ? "Superseded configuration"
                  : "Active · effective 01 Aug 2026"}
              </small>
            </span>
            <em>{[1042, 388, 721][i]} uses</em>
            <ChevronRight />
          </button>
        ))}
      </div>
      {selected && (
        <div className="drawer-wrap">
          <button
            className="scrim"
            aria-label="Close rule details"
            onClick={() => setSelected(false)}
          />
          <aside
            ref={drawerRef}
            className="drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="rule-title"
          >
            <button
              className="close"
              aria-label="Close rule details"
              onClick={() => setSelected(false)}
            >
              <X />
            </button>
            <span className="eyebrow">Immutable rule metadata</span>
            <h2 id="rule-title">LAWOS-SA v2.4.1</h2>
            <StatusMark status="done" label="Source references verified" />
            <div className="meta-grid vertical">
              <span>
                <small>Effective period</small>
                <b>01 Aug 2026 — current</b>
              </span>
              <span>
                <small>Published by</small>
                <b>Rules governance team</b>
              </span>
              <span>
                <small>Content hash</small>
                <code>4ca28f…91d2</code>
              </span>
            </div>
            <h3>Revision timeline</h3>
            <ol className="revision">
              <li>
                <b>v2.4.1</b>
                <span>Calendar-day basis made explicit</span>
              </li>
              <li>
                <b>v2.4.0</b>
                <span>Evidence schema aligned</span>
              </li>
            </ol>
            <button
              className="primary full"
              onClick={() => setCompare(!compare)}
            >
              Compare with v2.4.0
            </button>
            {compare && (
              <div className="diff">
                <p>
                  <del>payment_clock_basis: business_days</del>
                </p>
                <p>
                  <ins>payment_clock_basis: calendar_days</ins>
                </p>
                <p>
                  This compares configuration fields, not legal conclusions.
                </p>
              </div>
            )}
          </aside>
        </div>
      )}
    </section>
  );
}
function App() {
  const [view, setView] = useState<View>("overview"),
    [runs, setRuns] = useState(seedRuns),
    [events, setEvents] = useState(seedEvents),
    [cases, setCases] = useState<ReviewCase[]>(seedCases),
    [selectedRunId, setSelectedRunId] = useState<string>();
  const openEvaluation = (id: string) => {
    setSelectedRunId(id);
    setView("evaluations");
  };
  let content: React.ReactNode;
  if (view === "overview") content = <Overview go={setView} cases={cases} />;
  else if (view === "intake")
    content = (
      <IntakeWorkflow
        onComplete={(r) =>
          setRuns((s) => (s.some((item) => item.id === r.id) ? s : [r, ...s]))
        }
        onOpenEvaluation={openEvaluation}
      />
    );
  else if (view === "evaluations")
    content = (
      <Evaluations runs={runs} selectedId={selectedRunId} events={events} />
    );
  else if (view === "reviews")
    content = (
      <Reviews
        cases={cases}
        setCases={setCases}
        addEvent={(e) =>
          setEvents((s) => [e, ...s.filter((item) => item.seq !== e.seq)])
        }
        removeEvent={(seq) =>
          setEvents((items) => items.filter((item) => item.seq !== seq))
        }
      />
    );
  else if (view === "ledger") content = <Ledger events={events} />;
  else if (view === "verification") content = <Ledger events={events} verify />;
  else if (view === "rules") content = <Rules />;
  else
    content = (
      <section className="workspace">
        <Head
          kicker="Tenant configuration"
          title="Settings"
          text="Production controls are shown for demonstration and remain local."
        />
        <article className="panel settings">
          <h2>Operational safeguards</h2>
          {[
            "Require human review for configured exposure",
            "Retain inspectable process traces",
            "Use Africa/Johannesburg for date normalisation",
          ].map((x) => (
            <label>
              <span>
                <b>{x}</b>
                <small>Enabled for this tenant</small>
              </span>
              <input type="checkbox" defaultChecked />
            </label>
          ))}
        </article>
      </section>
    );
  return (
    <Shell
      view={view}
      setView={setView}
      reviewCount={cases.filter((item) => item.state !== "resolved").length}
    >
      {content}
    </Shell>
  );
}
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
