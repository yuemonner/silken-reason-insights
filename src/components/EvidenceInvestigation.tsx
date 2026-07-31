import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronRight, ChevronDown, CornerDownRight } from "lucide-react";

type Record_ = { label: string; value: string };

export type OpEvent = {
  id: string;
  time: string;
  date: string;
  title: string;
  asset: string;
  state: "anomaly" | "intervention" | "normalized" | "inspection" | "readiness";
  summary: string;
  telemetry: Record_[];
  deployment: string;
  maintenance: string[];
  relations: { label: string; to?: string; note: string }[];
  assets: string[];
  history: { when: string; text: string }[];
};

const stateLabel: Record<OpEvent["state"], string> = {
  anomaly: "anomaly",
  intervention: "intervention",
  normalized: "normalized",
  inspection: "inspection",
  readiness: "readiness",
};

const stateStyles: Record<OpEvent["state"], string> = {
  anomaly: "bg-destructive/10 text-destructive",
  intervention: "bg-primary/10 text-primary",
  normalized: "bg-foreground/5 text-foreground",
  inspection: "bg-foreground/5 text-foreground",
  readiness: "bg-primary/10 text-primary",
};

export const EVENTS: OpEvent[] = [
  {
    id: "e1",
    time: "09:13",
    date: "Today",
    title: "Runtime anomaly detected",
    asset: "Line A Conveyor",
    state: "anomaly",
    summary: "Torque variance exceeded the envelope held since deployment rev 214.",
    telemetry: [
      { label: "Torque variance", value: "+18.4%" },
      { label: "Belt speed", value: "0.92 m/s" },
      { label: "Drive temperature", value: "71 °C" },
      { label: "Signals captured", value: "1,284" },
    ],
    deployment: "rev 218 · deployed 4 days ago",
    maintenance: ["Bearing replaced · 6 weeks ago", "Belt tension adjusted · 3 months ago"],
    relations: [
      { label: "Related deployment", to: "e3", note: "Perception rev 218" },
      { label: "Same machine", to: "e2", note: "Maintenance intervention · 09:17" },
      { label: "Same subsystem", to: "e5", note: "Drive assembly" },
    ],
    assets: ["Line A Conveyor", "Drive Assembly 02", "Sorting Cell North"],
    history: [
      { when: "14 Mar", text: "Same torque signature preceded a 4-hour stoppage" },
      { when: "02 Feb", text: "Variance cleared after belt tension adjustment" },
    ],
  },
  {
    id: "e2",
    time: "09:17",
    date: "Today",
    title: "Maintenance intervention",
    asset: "Line A Conveyor",
    state: "intervention",
    summary: "Field technician opened the drive housing and reseated the tension arm.",
    telemetry: [
      { label: "Downtime", value: "9m 40s" },
      { label: "Operator", value: "M. Reinholt" },
      { label: "Work order", value: "WO-4471" },
    ],
    deployment: "rev 218 · unchanged",
    maintenance: ["Tension arm reseated", "Drive housing inspected · no wear"],
    relations: [
      { label: "Triggered by", to: "e1", note: "Runtime anomaly · 09:13" },
      { label: "Same operator", to: "e4", note: "Inspection completed · 09:31" },
      { label: "Previous maintenance", note: "Bearing replaced · 6 weeks ago" },
    ],
    assets: ["Line A Conveyor", "Drive Assembly 02"],
    history: [
      { when: "27 Apr", text: "Tension arm reseated by the same operator" },
      { when: "11 Jan", text: "Housing inspection logged no wear" },
    ],
  },
  {
    id: "e3",
    time: "09:26",
    date: "Today",
    title: "Telemetry normalized",
    asset: "Line A Conveyor",
    state: "normalized",
    summary: "Torque returned inside the envelope and held for nine consecutive minutes.",
    telemetry: [
      { label: "Torque variance", value: "+1.2%" },
      { label: "Belt speed", value: "1.08 m/s" },
      { label: "Drive temperature", value: "58 °C" },
      { label: "Hold duration", value: "9m" },
    ],
    deployment: "rev 218 · perception unchanged",
    maintenance: ["No further action required"],
    relations: [
      { label: "Follows", to: "e2", note: "Maintenance intervention · 09:17" },
      { label: "Similar operational pattern", to: "e5", note: "Robot-21 · recovery after reseat" },
    ],
    assets: ["Line A Conveyor", "Drive Assembly 02"],
    history: [{ when: "02 Feb", text: "Recovery curve matched within 4% of today" }],
  },
  {
    id: "e4",
    time: "09:31",
    date: "Today",
    title: "Inspection completed",
    asset: "Line A Conveyor",
    state: "inspection",
    summary: "Visual and vibration inspection closed against work order WO-4471.",
    telemetry: [
      { label: "Vibration RMS", value: "0.31 mm/s" },
      { label: "Photos captured", value: "12" },
      { label: "Duration", value: "18m" },
    ],
    deployment: "rev 218",
    maintenance: ["Inspection report signed · M. Reinholt"],
    relations: [
      { label: "Closes", to: "e2", note: "Work order WO-4471" },
      { label: "Same operator", to: "e2", note: "M. Reinholt" },
      { label: "Previous inspection", note: "218 days of inspection history on this asset" },
    ],
    assets: ["Line A Conveyor", "Inspection Mission #219"],
    history: [{ when: "19 May", text: "Inspection closed with identical vibration profile" }],
  },
  {
    id: "e5",
    time: "09:44",
    date: "Today",
    title: "Deployment readiness updated",
    asset: "Robot Fleet · North",
    state: "readiness",
    summary: "Evidence chain complete. Readiness moved from held to ready.",
    telemetry: [
      { label: "Evidence verified", value: "9 of 10" },
      { label: "Missing", value: "1" },
      { label: "Confidence", value: "High" },
    ],
    deployment: "rev 218 · cleared for fleet rollout",
    maintenance: ["No open work orders"],
    relations: [
      { label: "Supported by", to: "e4", note: "Inspection completed · 09:31" },
      { label: "Same subsystem", to: "e1", note: "Drive assembly" },
      { label: "Related deployment", to: "e3", note: "Telemetry normalized · 09:26" },
    ],
    assets: ["Robot Fleet · North", "Line A Conveyor", "AMR-07"],
    history: [
      { when: "19 May", text: "Readiness held for 2 days pending inspection" },
      { when: "14 Mar", text: "Rollout deferred after the same torque signature" },
    ],
  },
];

const Block = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="border-t border-border pt-4">
    <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-2.5">{label}</div>
    {children}
  </div>
);

const EventDetail = ({ e, onOpen }: { e: OpEvent; onOpen: (id: string) => void }) => (
  <div className="space-y-4 pt-4">
    <p className="text-[13px] text-muted-foreground leading-relaxed">{e.summary}</p>

    <Block label="Supporting telemetry">
      <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
        {e.telemetry.map((t) => (
          <div key={t.label} className="flex items-center justify-between gap-3 text-[12px]">
            <dt className="text-muted-foreground">{t.label}</dt>
            <dd className="font-mono tabular-nums text-foreground">{t.value}</dd>
          </div>
        ))}
      </dl>
    </Block>

    <Block label="Deployment revision">
      <p className="font-mono text-[12px] text-foreground">{e.deployment}</p>
    </Block>

    <Block label="Maintenance records">
      <ul className="space-y-1.5">
        {e.maintenance.map((m) => (
          <li key={m} className="flex items-start gap-2 text-[12px] text-muted-foreground">
            <span className="mt-[7px] h-1 w-1 rounded-full bg-muted-foreground/50 shrink-0" />
            {m}
          </li>
        ))}
      </ul>
    </Block>

    <Block label="Relationships">
      <ul className="space-y-1">
        {e.relations.map((r) => (
          <li key={r.label + r.note}>
            {r.to ? (
              <button
                onClick={() => onOpen(r.to!)}
                className="group flex w-full items-center gap-3 rounded-md px-2 py-1.5 -mx-2 text-left hover:bg-foreground/[0.04] transition-colors"
              >
                <CornerDownRight size={12} className="text-muted-foreground shrink-0" />
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground w-[150px] shrink-0 hidden sm:block">
                  {r.label}
                </span>
                <span className="text-[12px] text-foreground truncate">{r.note}</span>
                <ChevronRight size={12} className="ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </button>
            ) : (
              <div className="flex items-center gap-3 px-2 py-1.5 -mx-2">
                <CornerDownRight size={12} className="text-muted-foreground shrink-0" />
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground w-[150px] shrink-0 hidden sm:block">
                  {r.label}
                </span>
                <span className="text-[12px] text-muted-foreground truncate">{r.note}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </Block>

    <Block label="Linked assets">
      <div className="flex flex-wrap gap-1.5">
        {e.assets.map((a) => (
          <span key={a} className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] text-muted-foreground">
            {a}
          </span>
        ))}
      </div>
    </Block>

    <Block label="Previous occurrences">
      <ul className="space-y-1.5">
        {e.history.map((h) => (
          <li key={h.when} className="flex items-start gap-3 text-[12px]">
            <span className="font-mono text-[11px] text-muted-foreground tabular-nums w-[52px] shrink-0">{h.when}</span>
            <span className="text-muted-foreground">{h.text}</span>
          </li>
        ))}
      </ul>
    </Block>
  </div>
);

const EvidenceInvestigation = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [expanded, setExpanded] = useState<string | null>("e1");
  const scrollRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<Record<string, HTMLLIElement | null>>({});

  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => ev.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const openEvent = (id: string) => {
    setExpanded(id);
    requestAnimationFrame(() => {
      rowRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] bg-foreground/20 backdrop-blur-sm px-0 sm:px-6 py-0 sm:py-10"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(ev) => ev.stopPropagation()}
            className="mx-auto flex h-full max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-none sm:rounded-2xl border border-border bg-background"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-3 shrink-0">
              <div className="min-w-0">
                <div className="text-[13px] font-semibold text-foreground truncate">Line A Conveyor · operational history</div>
                <div className="font-mono text-[11px] text-muted-foreground truncate">
                  Today · 5 records · 218 days of history
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close evidence"
                className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
              >
                <X size={16} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 sm:px-8 py-6">
              <ul className="relative">
                <span className="absolute left-[calc(52px+5px)] top-2 bottom-2 w-px bg-border hidden sm:block" />
                {EVENTS.map((e) => {
                  const isOpen = expanded === e.id;
                  return (
                    <li
                      key={e.id}
                      ref={(el) => (rowRefs.current[e.id] = el)}
                      className="relative scroll-mt-4 pb-2"
                    >
                      <button
                        onClick={() => setExpanded(isOpen ? null : e.id)}
                        className="group flex w-full items-start gap-4 rounded-md py-3 text-left"
                      >
                        <span className="font-mono text-[11px] text-muted-foreground tabular-nums w-[52px] shrink-0 pt-[2px]">
                          {e.time}
                        </span>
                        <span className="relative hidden sm:block shrink-0 pt-[6px]">
                          <span
                            className={`block h-[11px] w-[11px] rounded-full border-2 border-background ring-1 ${
                              e.state === "anomaly"
                                ? "bg-destructive ring-destructive/40"
                                : isOpen
                                ? "bg-primary ring-primary/40"
                                : "bg-muted-foreground/40 ring-border"
                            }`}
                          />
                        </span>
                        <span className="min-w-0 flex-1 pl-0 sm:pl-3">
                          <span className="flex flex-wrap items-center gap-2">
                            <span className="text-[13px] text-foreground">{e.title}</span>
                            <span
                              className={`rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${stateStyles[e.state]}`}
                            >
                              {stateLabel[e.state]}
                            </span>
                          </span>
                          <span className="mt-0.5 block font-mono text-[10px] text-muted-foreground">{e.asset}</span>
                        </span>
                        {isOpen ? (
                          <ChevronDown size={13} className="text-muted-foreground shrink-0 mt-1" />
                        ) : (
                          <ChevronRight size={13} className="text-muted-foreground shrink-0 mt-1" />
                        )}
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="ml-0 sm:ml-[80px] pb-6">
                              <EventDetail e={e} onOpen={openEvent} />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-4 border-t border-border pt-5">
                <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-3">
                  Earlier on this asset
                </div>
                <ul className="space-y-2">
                  {[
                    ["19 May", "Inspection completed · vibration within envelope"],
                    ["27 Apr", "Tension arm reseated · M. Reinholt"],
                    ["14 Mar", "Runtime anomaly · 4-hour stoppage"],
                    ["02 Feb", "Belt tension adjusted · variance cleared"],
                    ["11 Jan", "Drive housing inspected · no wear"],
                  ].map(([when, text]) => (
                    <li key={when} className="flex items-start gap-4 text-[12px]">
                      <span className="font-mono text-[11px] text-muted-foreground tabular-nums w-[52px] shrink-0">{when}</span>
                      <span className="text-muted-foreground">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EvidenceInvestigation;
