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
      title="Veyra workspace"
      note="Product surface"
      accent
      items={["Episode reconstruction", "Fleet context", "Operational memory"]}
    />
    <StackLayer
      title="Temporal evidence engine"
      items={["State reconstruction", "Provenance", "Knowledge history"]}
    />
    <StackLayer
      title="Evidence layer"
      items={["Runtime snapshots", "Engineering notes", "Changes", "Interventions"]}
    />
    <StackLayer title="Existing systems" items={["ROS / MCAP", "Fleet platforms", "Git / CI", "Tickets", "Maintenance"]} />
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
    { from: 1, to: 3, label: "associated_with", dir: "v" },
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
    { t: "Capture", s: "Preserve irrecoverable runtime context" },
    { t: "Reconstruct", s: "Align runtime, software, configuration and human evidence" },
    { t: "Understand", s: "Separate observation, hypothesis, uncertainty and counterevidence" },
    { t: "Compare", s: "Find related conditions and historical episodes" },
    { t: "Decide", s: "Record attributable human action" },
    { t: "Learn", s: "Attach later outcome without rewriting earlier knowledge" },
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
        Designed for metadata-only synchronization. Raw payloads remain inside the client environment.
      </span>
    </div>

    <div className="rounded-2xl border border-primary/40 bg-primary/[0.04] px-5 py-6 text-center">
      <div className="text-[15px] text-foreground">Veyra platform</div>
      <div className="mt-1 text-[13px] text-muted-foreground">
        Machine episode reconstruction
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
  "episode_id": "episode_402",
  "asset_id": "line_a_conveyor",
  "event_time": "2026-08-18T09:18:00Z",
  "episode_type": "UNEXPECTED_MACHINE_BEHAVIOR",
  "knowledge_state": {
    "observed": ["abnormal vibration", "software rev 218 active"],
    "human_asserted": ["belt tension suspected; not established"],
    "derived": ["vibration returned within baseline after inspection"],
    "unknown": ["whether restart caused the behavior"],
    "counterevidence": ["same profile previously occurred without belt tension fault"]
  },
  "source_links": [
    "runtime_snapshot_09_14",
    "engineering_note_09_18",
    "inspection_wo_4471"
  ],
  "later_outcome": "no recurrence after four hours"
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
            Building continuous operational memory for Physical AI
          </h1>
          <p className="font-mono text-[12px] text-muted-foreground">
            Engineering note
          </p>
        </motion.header>

        <section className="mt-16">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Abstract
          </p>
          <div className="space-y-5 border-l border-border pl-6">
            <Lead>
              Physical AI systems generate enormous amounts of telemetry, logs and deployment data.
              What is harder to preserve is the context required to reconstruct why a machine reached
              a particular state.
            </Lead>
            <P>
              That context includes what software and configuration were active, what changed, what
              engineers observed or suspected, what interventions were attempted, and what evidence
              existed at the time.
            </P>
            <P>
              Veyra is an operational evidence layer that preserves this context across runtime
              systems, engineering tools and human workflows. It reconstructs persistent Machine
              Episodes without collapsing observation, inference and hindsight into a single version
              of truth.
            </P>
            <P>
              The result is an operational memory that can support incident investigation, fleet
              comparison, engineering decisions and future learning.
            </P>
          </div>
        </section>

        <Section num="01" title="System framing">
          <P>
            Today's Physical AI stack is increasingly mature at capture, but cross-system
            reconstruction remains fragmented. The missing layer is persistent operational memory
            across systems and time.
          </P>

          <Figure
            label="Figure 1"
            caption="Veyra reconstructs Machine Episodes above existing data, fleet and engineering systems."
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
            When you reconstruct a Machine Episode, the evidence does not live inside the robot. It is
            spread across systems, people and time.
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
              ["Human state", "Teleoperation, manual overrides, engineering notes, technician observations."],
              ["Lifecycle state", "Incident tickets, maintenance logs, parts history, lease and payment records."],
              ["Knowledge & decision state", "Observations, hypotheses, uncertainty, reviews, decisions and outcomes."],
            ]}
          />

          <P>
            Data volume is no longer the constraint. Context reconstruction is.
          </P>
        </Section>

        <Section num="02" title="Why operational context matters">
          <P>
            Physical AI failures are rarely data-free. The harder problem is reconstructing the
            operational context around an event after software, configuration, machine state and
            human understanding have already changed.
          </P>
          <P>
            Missing context increases investigation time, makes repeated incidents harder to
            recognize, obscures fleet-wide exposure and causes engineering knowledge to disappear into
            tickets and individual memory.
          </P>
          <div className="rounded-2xl border border-border bg-surface px-6 py-5">
            <p className="text-[15px] leading-relaxed text-foreground/80">
              The technical problem is not storing every signal. It is preserving what cannot be
              reliably reconstructed later and linking it to the evidence that can.
            </p>
          </div>
        </Section>

        <Section num="03" title="Architecture: reconstructing Machine Episodes">
          <P>
            Internally, Veyra represents operational history as bounded Machine Episodes: important
            physical-system events and the evidence, knowledge, interventions and outcomes around
            them. Event primitives are extracted through read-only integrations such as webhooks, log
            subscribers and REST APIs, then organized into typed nodes and directed edges.
          </P>

          <Figure
            label="Figure 3"
            caption="A Machine Episode links state, changes, evidence, human context and outcome."
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
              ["Decision", "An attributable human or governed action."],
              ["Record", "Engineering notes, tickets, inspection PDFs, logs and reports."],
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
            Observed is not derived
          </h3>
          <P>
            Veyra separates evidence kinds as a foundational type system. OBSERVED means directly
            emitted or recorded by a source. DERIVED means deterministically calculated from observed
            evidence. HUMAN_ASSERTED means an engineer's observation or interpretation. INFERRED
            means a system-generated hypothesis. DECISION means an attributable human or governed
            action. OUTCOME means a later observed result.
          </P>

          <h3 className="text-[17px] font-semibold text-foreground pt-4">
            Reconstructability over completeness
          </h3>
          <P>
            Veyra does not try to store every signal. It captures enough runtime context to make a
            future episode reconstructable: event IDs, precise timestamps, software and firmware
            versions, configuration, operating mode, critical state vectors, state diffs and related
            interventions.
          </P>

          <h3 className="text-[17px] font-semibold text-foreground pt-4">Non-goals</h3>
          <DefList
            items={[
              ["Not teleoperation", "No low-latency video streaming for remote driving."],
              ["Not raw storage", "MCAP files and data platforms keep their payloads."],
              ["Not a controller", "No execution commands dispatched to edge hardware."],
            ]}
          />
        </Section>

        <Section num="04" title="Reference episode: unexpected machine behavior">
          <P>
            The first implementation targets one bounded episode: unexpected machine behavior after a
            deployment, restart, intervention or maintenance event.
          </P>

          <Figure label="Figure 4" caption="From runtime event to reusable operational memory.">
            <PipelineDiagram />
          </Figure>

          <h3 className="text-[17px] font-semibold text-foreground">
            Anatomy of a Machine Episode
          </h3>
          <P>
            The output is a structured record of what happened, what was known, what was believed,
            what contradicted the working hypothesis, what intervention occurred and what became
            known later.
          </P>
          <CodeBlock code={evidencePack} />
        </Section>

        <Section num="05" title="Human evidence and engineering notes">
          <P>
            Machines observe physical state. Engineers observe context machines often cannot. In
            Veyra, an engineering note is not treated as a loose comment box. It is a source record
            that can contain observations, hypotheses, interventions, interpretations and outcomes.
          </P>
          <P>
            The original note remains intact. Any extracted structure is linked back to that source,
            so inferred or derived information is never presented as direct machine observation.
          </P>
          <CodeBlock
            code={`Original note:
"Elevated vibration appeared after restart. Belt tension suspected; not established.
Inspection completed and vibration returned to baseline."

Derived objects:
OBSERVATION   -> elevated vibration
HYPOTHESIS    -> belt tension involvement
INTERVENTION  -> inspection
OUTCOME       -> vibration returned to baseline`}
          />
        </Section>

        <Section num="06" title="Preserving what was known when">
          <P>
            Veyra does not maintain one mutable version of truth. It preserves the operational
            knowledge state at each point in time: what was observed, what was supported, what was
            assumed, what remained unknown and what was later contradicted.
          </P>
          <CodeBlock
            code={`14:18  Hypothesis H17 created
       Retry configuration may explain acknowledgement latency

15:02  Counterevidence observed
       Same configuration exists on another unaffected machine

15:04  H17 weakened

17:31  Alternative explanation established`}
          />
          <P>
            New evidence may change the present conclusion without rewriting the information state
            under which an earlier decision was made.
          </P>
        </Section>

        <Section num="07" title="Security & system boundary">
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
            perimeter. Normalized metadata, source references and state hashes can be synchronized
            according to deployment policy.
          </P>
        </Section>

        <Section num="08" title="Design commitments">
          <div className="space-y-4">
            {[
              [
                "Schema reusability",
                "Machine Episodes built for one asset can map onto mobile fleets without breaking core evidence relations.",
              ],
              [
                "Integration friction",
                "Read-only, payload-light integration should make IT and OT approval easier than control-path software.",
              ],
              [
                "Decision latency",
                "Automated correlation should reduce manual context stitching before investigation or review.",
              ],
            ].map(([t, d], i) => (
              <div
                key={t}
                className="flex gap-5 rounded-2xl border border-border bg-surface px-5 py-5"
              >
                <span className="font-mono text-[11px] text-muted-foreground tabular-nums pt-1">
                  {String(i + 1).padStart(2, "0")}
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
            Interested in operational evidence for Physical AI? We are looking for design partners
            operating robots, autonomous systems and other Physical AI in real environments.
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
