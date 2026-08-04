import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/* ---------------- primitives ---------------- */

const Section = ({
  num,
  title,
  children,
}: {
  num?: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section className="mt-20">
    <div className="flex items-baseline gap-3 mb-6">
      {num && (
        <span className="font-mono text-[11px] text-muted-foreground tabular-nums">{num}</span>
      )}
      <h2 className="text-[22px] md:text-[26px] font-semibold tracking-tight text-foreground">
        {title}
      </h2>
    </div>
    <div className="space-y-5">{children}</div>
  </section>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[16px] md:text-[17px] leading-[1.75] text-muted-foreground">{children}</p>
);

const Lead = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[17px] md:text-[18px] leading-[1.7] text-foreground/80">{children}</p>
);

const Figure = ({
  label,
  caption,
  children,
}: {
  label: string;
  caption: string;
  children: React.ReactNode;
}) => (
  <figure className="my-10">
    <div className="rounded-2xl border border-border bg-surface p-5 md:p-8 overflow-x-auto">
      {children}
    </div>
    <figcaption className="mt-3 flex flex-wrap items-baseline gap-2">
      <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
        {label}
      </span>
      <span className="text-[13px] text-muted-foreground">{caption}</span>
    </figcaption>
  </figure>
);

const DefList = ({ items }: { items: [string, string][] }) => (
  <dl className="divide-y divide-border border-y border-border">
    {items.map(([term, desc]) => (
      <div key={term} className="grid sm:grid-cols-[190px_1fr] gap-1 sm:gap-6 py-4">
        <dt className="text-[15px] text-foreground">{term}</dt>
        <dd className="text-[15px] leading-relaxed text-muted-foreground">{desc}</dd>
      </div>
    ))}
  </dl>
);

/* ---------------- diagrams ---------------- */

const StackLayer = ({
  title,
  items,
  accent,
  note,
}: {
  title: string;
  items: string[];
  accent?: boolean;
  note?: string;
}) => (
  <div
    className={`px-5 py-5 ${
      accent ? "bg-primary/[0.04] border-l-2 border-l-primary/50" : "bg-background"
    }`}
  >
    <div className="flex flex-wrap items-baseline justify-between gap-2">
      <span
        className={`font-mono text-[10px] tracking-[0.18em] uppercase ${
          accent ? "text-primary/70" : "text-muted-foreground"
        }`}
      >
        {title}
      </span>
      {note && (
        <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-muted-foreground">
          {note}
        </span>
      )}
    </div>
    <div className="mt-3 flex flex-wrap gap-2">
      {items.map((it) => (
        <span
          key={it}
          className="rounded-lg border border-border bg-surface px-3 py-1.5 text-[13.5px] text-foreground"
        >
          {it}
        </span>
      ))}
    </div>
  </div>
);

const LandscapeDiagram = () => (
  <div className="min-w-[520px] divide-y divide-border rounded-xl border border-border overflow-hidden">
    <StackLayer
      title="Operational decision layer"
      note="Missing today"
      accent
      items={["Decision evidence", "Operational history", "Readiness review"]}
    />
    <StackLayer
      title="Integration layer"
      items={["Read-only connectors", "Schema mapping", "Normalization"]}
    />
    <StackLayer title="Robot data platforms" items={["Foxglove", "Formant", "InOrbit"]} />
    <StackLayer title="Runtime systems" items={["ROS", "MCAP", "Sensors", "Controllers"]} />
  </div>
);

const GapDiagram = () => {
  const sources = [
    { label: "ROS 2 / MCAP telemetry", sub: "Sensor streams, joint torque, frames" },
    { label: "Git / Azure DevOps", sub: "Deployment revisions, parameters" },
    { label: "Jira / maintenance", sub: "Tickets, field notes, parts history" },
    { label: "Human interventions", sub: "Overrides, teleop, sign-offs" },
  ];
  return (
    <div className="min-w-[560px] grid grid-cols-[1fr_auto_1fr] items-center gap-x-6 gap-y-4">
      {sources.map((s, i) => (
        <div key={s.label} className="contents">
          <div
            className={`rounded-xl border border-border bg-background px-4 py-3 ${
              i % 2 === 0 ? "col-start-1" : "col-start-3"
            }`}
          >
            <div className="text-[14px] text-foreground">{s.label}</div>
            <div className="mt-0.5 text-[12px] text-muted-foreground">{s.sub}</div>
          </div>
          {i === 0 && (
            <div className="col-start-2 row-start-1 row-span-4 flex h-full items-center">
              <div className="rounded-full border border-dashed border-primary/50 bg-primary/[0.04] px-4 py-8 text-center">
                <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-primary/70 [writing-mode:vertical-rl] rotate-180">
                  Operational gap
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const GraphDiagram = () => {
  const nodes: { id: string; x: number; y: number; kind: string }[] = [
    { id: "mission_219", x: 90, y: 40, kind: "Mission" },
    { id: "anomaly_402", x: 460, y: 40, kind: "Anomaly" },
    { id: "deployment_rev218", x: 90, y: 170, kind: "Deployment" },
    { id: "torque_variance", x: 460, y: 170, kind: "Telemetry" },
    { id: "human_decision_91", x: 90, y: 300, kind: "Decision" },
    { id: "tension_adjust_log", x: 460, y: 300, kind: "Maintenance" },
  ];
  const W = 250;
  const H = 54;
  const edges: { from: number; to: number; label: string; dir: "h" | "v" }[] = [
    { from: 0, to: 1, label: "observed_during", dir: "h" },
    { from: 1, to: 3, label: "caused_by", dir: "v" },
    { from: 0, to: 2, label: "executed_under", dir: "v" },
    { from: 2, to: 3, label: "changed_after", dir: "h" },
    { from: 2, to: 4, label: "approved_by", dir: "v" },
    { from: 3, to: 5, label: "resolved_by", dir: "v" },
    { from: 5, to: 4, label: "supported_by", dir: "h" },
  ];

  return (
    <svg viewBox="0 0 730 380" className="w-full min-w-[560px]" role="img">
      <defs>
        <marker id="arw" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--muted-foreground))" opacity="0.55" />
        </marker>
      </defs>
      {edges.map((e, i) => {
        const a = nodes[e.from];
        const b = nodes[e.to];
        let d = "";
        let lx = 0;
        let ly = 0;
        if (e.dir === "h") {
          const left = a.x < b.x ? a : b;
          const right = a.x < b.x ? b : a;
          const y = a.y + H / 2;
          const x1 = a.x < b.x ? left.x + W : right.x;
          const x2 = a.x < b.x ? right.x : left.x + W;
          d = `M ${x1} ${y} L ${x2} ${y}`;
          lx = (x1 + x2) / 2;
          ly = y - 10;
        } else {
          const x = a.x + 26;
          d = `M ${x} ${a.y + H} L ${x} ${b.y}`;
          lx = x + 10;
          ly = (a.y + H + b.y) / 2;
        }
        return (
          <g key={i}>
            <path
              d={d}
              stroke="hsl(var(--muted-foreground))"
              strokeOpacity="0.4"
              strokeWidth="1"
              fill="none"
              markerEnd="url(#arw)"
            />
            <text
              x={lx}
              y={ly}
              textAnchor={e.dir === "h" ? "middle" : "start"}
              className="fill-muted-foreground"
              style={{ fontSize: 9.5, fontFamily: "JetBrains Mono, monospace" }}
            >
              {e.label}
            </text>
          </g>
        );
      })}
      {nodes.map((n) => (
        <g key={n.id}>
          <rect
            x={n.x}
            y={n.y}
            width={W}
            height={H}
            rx="12"
            fill="hsl(var(--background))"
            stroke="hsl(var(--border))"
          />
          <text
            x={n.x + 16}
            y={n.y + 21}
            className="fill-muted-foreground"
            style={{ fontSize: 9.5, letterSpacing: "0.16em", fontFamily: "JetBrains Mono, monospace" }}
          >
            {n.kind.toUpperCase()}
          </text>
          <text
            x={n.x + 16}
            y={n.y + 39}
            className="fill-foreground"
            style={{ fontSize: 13.5, fontFamily: "JetBrains Mono, monospace" }}
          >
            {n.id}
          </text>
        </g>
      ))}
    </svg>
  );
};

const PipelineDiagram = () => {
  const steps = [
    { t: "Anomaly / change event", s: "Deployment, intervention or maintenance" },
    { t: "Read-only ingestion", s: "Veyra schema normalization" },
    { t: "Cross-system evidence linker", s: "ROS · Git · Jira · inspection" },
    { t: "Decision evidence pack", s: "Structured, signed, reviewable" },
    { t: "Readiness gate", s: "Go · no-go · limited release" },
  ];
  return (
    <div className="min-w-[560px] space-y-0">
      {steps.map((st, i) => (
        <div key={st.t}>
          <div className="flex items-center gap-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-background font-mono text-[11px] text-muted-foreground">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="flex-1 rounded-xl border border-border bg-background px-4 py-3">
              <div className="text-[15px] text-foreground">{st.t}</div>
              <div className="mt-0.5 text-[13px] text-muted-foreground">{st.s}</div>
            </div>
          </div>
          {i < steps.length - 1 && (
            <div className="ml-[18px] h-6 w-px bg-border" aria-hidden />
          )}
        </div>
      ))}
    </div>
  );
};

const BoundaryDiagram = () => (
  <div className="min-w-[560px]">
    <div className="rounded-2xl border border-border bg-background p-5">
      <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground mb-4">
        Client environment
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          ["ROS 2 / MCAP logs", "Raw telemetry"],
          ["Azure DevOps / Git", "Software revisions"],
          ["Enterprise Jira / DBs", "Tickets, records"],
        ].map(([a, b]) => (
          <div key={a} className="rounded-xl border border-border bg-surface px-3 py-3 text-center">
            <div className="text-[13.5px] text-foreground">{a}</div>
            <div className="mt-0.5 text-[12px] text-muted-foreground">{b}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-dashed border-border px-4 py-3 text-center">
        <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-muted-foreground">
          Read-only API / adapter
        </span>
      </div>
    </div>

    <div className="flex flex-col items-center py-3 text-muted-foreground">
      <svg width="16" height="40" viewBox="0 0 16 40" fill="none">
        <path d="M8 0 V34" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
        <path d="M3 30 L8 37 L13 30" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" fill="none" />
      </svg>
      <span className="font-mono text-[10px] mt-1 text-center">
        Signed metadata and evidence signatures only. No raw payload egress.
      </span>
    </div>

    <div className="rounded-2xl border border-primary/40 bg-primary/[0.04] px-5 py-6 text-center">
      <div className="text-[15px] text-foreground">Veyra platform</div>
      <div className="mt-1 text-[13px] text-muted-foreground">
        Cross-system semantic execution engine
      </div>
    </div>
  </div>
);

const CodeBlock = ({ code }: { code: string }) => (
  <pre className="my-8 overflow-x-auto rounded-2xl border border-border bg-surface p-5 font-mono text-[12.5px] leading-[1.7] text-muted-foreground">
    <code>{code}</code>
  </pre>
);

const evidencePack = `{
  "status": "LIMITED_OPERATION_READY",
  "evidence_for": [
    { "source": "telemetry_normalizer", "record_id": "rec_9941",
      "summary": "Thermal telemetry stable within 1.2% envelope over 3 cycles." },
    { "source": "jira_maintenance", "record_id": "maint_8812",
      "summary": "Belt tension adjusted by field technician." }
  ],
  "evidence_against": [
    { "source": "git_deployment", "record_id": "rev_218",
      "summary": "Torque variance signature after perception_rev218." }
  ],
  "missing_evidence": [
    { "required_type": "INSPECTION_PDF", "owner": "field_safety_lead",
      "status": "UNSUBMITTED" }
  ],
  "recommended_action": {
    "policy": "RUN_LIMITED_PRODUCTION_CYCLE",
    "constraints": { "speed_cap": "0.5m/s", "re_evaluation_window": "30m" }
  }
}`;

const references = [
  {
    org: "International Federation of Robotics",
    title: "World Robotics Report 2025, industrial robot installations",
    url: "https://ifr.org/ifr-press-releases/global-robot-demand-in-factories-doubles-over-10-years",
  },
  {
    org: "Capgemini Research Institute",
    title: "Physical AI in industrial operations, scaling analysis (2026)",
    url: "https://www.capgemini.com/gb-en/news/press-releases/two-thirds-of-organisations-rate-physical-ai-as-a-high-priority-for-the-next-three-to-five-years/",
  },
  {
    org: "ABB Industrial Automation",
    title: "Value of reliability & predictive maintenance survey (2026)",
    url: "https://www.abb.com/global/en/company/stories/ai-predictive-maintenance",
  },
  {
    org: "Foxglove Technologies",
    title: "Foxglove Data Platform specifications & documentation",
    url: "https://docs.foxglove.dev/docs",
  },
  {
    org: "Formant Inc.",
    title: "Physical AI architecture & fleet management",
    url: "https://www.formant.ai/physical-ai",
  },
  {
    org: "OpenTelemetry",
    title: "Semantic conventions for events and ML signals",
    url: "https://opentelemetry.io/docs/specs/semconv/",
  },
];

/* ---------------- page ---------------- */

const Engineering = () => {
  return (
    <Layout>
      <article className="container mx-auto px-6 pt-24 pb-28 max-w-3xl">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-6">
            Engineering
          </p>
          <div className="divider mb-8" />
          <h1 className="text-4xl md:text-[52px] font-semibold tracking-tight text-foreground leading-[1.05] mb-5">
            Reconstructing operational decisions in Physical AI
          </h1>
          <p className="font-mono text-[12px] text-muted-foreground">
            Research note · August 2026
          </p>
        </motion.header>

        <section className="mt-16">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Abstract
          </p>
          <div className="space-y-5 border-l border-border pl-6">
            <Lead>
              Physical AI fleets record enormous amounts of telemetry, MCAP files and system logs
              every day. What they lack is a way to answer a simple operational question: is this
              machine ready to run again?
            </Lead>
            <P>
              When an autonomous system hits a runtime anomaly, engineers rebuild the story by hand —
              across ROS bags, deployment revisions, Jira tickets, maintenance logs and operator
              interventions. The record exists. The reconstruction does not.
            </P>
            <P>
              This note describes a read-only semantic layer that correlates those heterogeneous
              records into verifiable Decision Evidence Packs, so readiness gates such as
              return-to-service or deployment expansion become auditable — without touching a live
              control path.
            </P>
          </div>
        </section>

        <Section num="01" title="System framing">
          <P>
            Today's Physical AI stack is mature at capture and immature at reconstruction. Three
            layers exist and work well; a fourth is missing.
          </P>

          <Figure
            label="Figure 1"
            caption="The operational decision layer sits above existing data and fleet platforms."
          >
            <LandscapeDiagram />
          </Figure>

          <DefList
            items={[
              [
                "Recording layer",
                "ROS 2 bags and MCAP handle low-latency, timestamped serialization and local storage of raw topic data.",
              ],
              [
                "Robotics data platforms",
                "Foxglove and similar tools ingest, index, search and visualize multimodal robotics streams.",
              ],
              [
                "Fleet operations",
                "Formant and InOrbit provide orchestration, OTA deployment, alerting and teleoperation.",
              ],
            ]}
          />
        </Section>

        <Section num="1.1" title="The operational context gap">
          <P>
            These platforms store and replay topics, but they do not encode cross-system meaning.
            When you evaluate an anomaly, the evidence does not live inside the robot. It is spread
            across four different kinds of state.
          </P>

          <Figure
            label="Figure 2"
            caption="Evidence for a single decision is distributed across unconnected systems."
          >
            <GapDiagram />
          </Figure>

          <DefList
            items={[
              ["Edge state", "Sensor streams, joint torque, camera frames, local state-machine transitions."],
              ["Software state", "Commit hashes, pipelines, configuration parameters, deployment revisions."],
              ["Human state", "Teleoperation, manual overrides, technician notes, customer sign-offs."],
              ["Lifecycle state", "Incident tickets, maintenance logs, parts history, lease and payment records."],
            ]}
          />

          <P>
            Data volume is no longer the constraint. Context reconstruction is.
          </P>
        </Section>

        <Section num="02" title="Why this matters commercially">
          <P>
            The IFR reports 542,000 industrial robot installations globally in 2024. Capgemini's 2026
            Physical AI study finds 79% of enterprises engaging with Physical AI while only 4% run it
            at scale, with operational readiness named as the primary barrier.
          </P>
          <P>
            The asymmetry is the point. In software, a bad deploy rolls back over HTTP. In the
            physical world, a wrong readiness call costs unplanned downtime, a field service
            dispatch, safety exposure and asset degradation. ABB puts average unplanned downtime at
            roughly $169,889 per hour in automated manufacturing.
          </P>
          <div className="rounded-2xl border border-border bg-surface px-6 py-5">
            <p className="text-[15px] leading-relaxed text-foreground/80">
              At that cost per hour, authorizing a return to service on a guess or a manual log dive
              is not a workflow — it is an unpriced risk.
            </p>
          </div>
        </Section>

        <Section num="03" title="Architecture: the semantic execution graph">
          <P>
            Veyra builds a workflow-scoped semantic execution graph: an intermediate representation
            between raw telemetry and the operational question being asked. Event primitives are
            extracted through read-only integrations — webhooks, log subscribers, REST APIs — and
            organized into typed nodes and directed edges.
          </P>

          <Figure
            label="Figure 3"
            caption="A single return-to-service question, resolved as a graph rather than a search."
          >
            <GraphDiagram />
          </Figure>

          <h3 className="text-[17px] font-semibold text-foreground pt-2">Node types</h3>
          <DefList
            items={[
              ["Mission", "The intended task, route or operational cycle."],
              ["Deployment", "Software, model weights or configuration revision."],
              ["Anomaly", "Telemetry boundary violation, exception or physical near-miss."],
              ["Intervention", "Human override, teleoperation take-over or E-stop."],
              ["Maintenance", "Component replacement, calibration or manual adjustment."],
              ["Decision", "An authorization gate such as return-to-service."],
              ["Record", "Field notes, tickets, inspection PDFs, payment logs."],
            ]}
          />

          <h3 className="text-[17px] font-semibold text-foreground pt-2">Edge relations</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "observed_during",
              "correlated_with",
              "contradicted_by",
              "resolved_by",
              "approved_after",
              "missing_evidence_for",
            ].map((e) => (
              <span
                key={e}
                className="rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-[12px] text-muted-foreground"
              >
                {e}
              </span>
            ))}
          </div>

          <h3 className="text-[17px] font-semibold text-foreground pt-4">
            Deterministic, not probabilistic
          </h3>
          <P>
            Veyra does not infer physical causality with a black box. Guessing causes in
            unstructured environments invites hallucination. Instead it performs deterministic
            temporal alignment and marks uncertainty explicitly: missing and conflicting links are
            shown, never filled in.
          </P>
        </Section>

        <Section num="04" title="Reference workflow: return-to-service">
          <P>
            The first implementation targets one expensive gate — the return-to-service review,
            triggered by a deployment revision, an anomaly, an intervention or a maintenance event.
          </P>

          <Figure label="Figure 4" caption="From event to readiness gate, with no active control path.">
            <PipelineDiagram />
          </Figure>

          <h3 className="text-[17px] font-semibold text-foreground">
            Anatomy of a Decision Evidence Pack
          </h3>
          <P>
            The output is a structured document: what supports the decision, what contradicts it,
            what is still missing, what happened last time, and what is recommended under
            constraints.
          </P>
          <CodeBlock code={evidencePack} />
        </Section>

        <Section num="05" title="Security & system boundary">
          <Figure
            label="Figure 5"
            caption="Raw payloads stay inside the client perimeter; only normalized, signed metadata leaves."
          >
            <BoundaryDiagram />
          </Figure>

          <P>
            Veyra runs as a passive sidecar observer alongside live operations. It does not touch
            motor actuation, CAN bus control loops or teleoperation command channels. Ingestion is
            strictly read-only: log listeners, cloud storage adapters and webhook subscriptions.
          </P>
          <P>
            Raw video frames and high-frequency point clouds never leave the client's security
            perimeter. Veyra ingests and signs normalized metadata, event timestamps and state
            hashes — the minimum required to verify evidence.
          </P>

          <h3 className="text-[17px] font-semibold text-foreground pt-2">Non-goals</h3>
          <DefList
            items={[
              ["Not teleoperation", "No low-latency video streaming for remote driving."],
              ["Not raw storage", "MCAP files and data platforms keep their payloads."],
              ["Not a controller", "No execution commands dispatched to edge hardware."],
            ]}
          />
        </Section>

        <Section num="06" title="Hypotheses under validation">
          <div className="space-y-4">
            {[
              [
                "Schema reusability",
                "Event graphs built for return-to-service on fixed manipulators map onto mobile fleets without breaking core relations.",
              ],
              [
                "Read-only friction",
                "IT and OT security sign-off time drops by more than 70% when integration is read-only and payload-less.",
              ],
              [
                "Decision latency",
                "Automated correlation reduces return-to-service review from hours of manual stitching to under five minutes.",
              ],
            ].map(([t, d], i) => (
              <div
                key={t}
                className="flex gap-5 rounded-2xl border border-border bg-surface px-5 py-5"
              >
                <span className="font-mono text-[11px] text-muted-foreground tabular-nums pt-1">
                  H{i + 1}
                </span>
                <div>
                  <div className="text-[15px] text-foreground mb-1">{t}</div>
                  <div className="text-[14.5px] leading-relaxed text-muted-foreground">{d}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="References">
          <ol className="divide-y divide-border border-y border-border">
            {references.map((r, i) => (
              <li key={r.url} className="py-4 grid grid-cols-[28px_1fr] gap-4">
                <span className="font-mono text-[11px] text-muted-foreground tabular-nums pt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="text-[15px] text-foreground">{r.org}</div>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[14px] text-muted-foreground hover:text-foreground transition-colors underline decoration-border underline-offset-4"
                  >
                    {r.title}
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <div className="mt-20 divider" />
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-[15px] text-muted-foreground">
            Reviewing a readiness decision of your own?
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-4 py-2 text-[12px] font-medium hover:bg-foreground/90 transition-colors"
          >
            Request Pilot <ArrowRight size={13} />
          </Link>
        </div>
      </article>
    </Layout>
  );
};

export default Engineering;
