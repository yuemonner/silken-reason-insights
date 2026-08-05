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
  <section className="mt-24 border-t border-border pt-12">
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

const Sub = ({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section className="mt-16">
    <div className="flex items-baseline gap-3 mb-5">
      <span className="font-mono text-[11px] text-muted-foreground tabular-nums">{num}</span>
      <h3 className="text-[18px] md:text-[19px] font-semibold tracking-tight text-foreground">
        {title}
      </h3>
    </div>
    <div className="space-y-5">{children}</div>
  </section>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[16px] md:text-[17px] leading-[1.8] text-muted-foreground max-w-[68ch]">
    {children}
  </p>
);

const Lead = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[17px] md:text-[18px] leading-[1.75] text-foreground/80 max-w-[68ch]">
    {children}
  </p>
);

const Bullets = ({ items }: { items: string[] }) => (
  <ul className="space-y-2 max-w-[68ch]">
    {items.map((it) => (
      <li key={it} className="flex items-start gap-3 text-[15.5px] leading-relaxed text-muted-foreground">
        <span className="mt-[10px] h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50" />
        {it}
      </li>
    ))}
  </ul>
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
    <div className="rounded-2xl border border-border bg-surface p-4 md:p-8 overflow-x-auto">
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

const Arrow = () => (
  <div className="flex justify-center py-2 text-muted-foreground" aria-hidden>
    <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
      <path d="M7 22 V4" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
      <path d="M2 8 L7 1 L12 8" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" fill="none" />
    </svg>
  </div>
);

const StackLayer = ({
  title,
  items,
  accent,
  note,
}: {
  title: string;
  items: string[];
  accent?: "product" | "engine";
  note?: string;
}) => (
  <div
    className={`rounded-xl border px-4 py-4 md:px-5 md:py-5 ${
      accent === "product"
        ? "border-primary/40 bg-primary/[0.05]"
        : accent === "engine"
        ? "border-foreground/25 bg-background"
        : "border-border bg-background"
    }`}
  >
    <div className="flex flex-wrap items-baseline justify-between gap-2">
      <span
        className={`font-mono text-[10px] tracking-[0.18em] uppercase ${
          accent === "product" ? "text-primary/80" : "text-muted-foreground"
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
          className="rounded-lg border border-border bg-surface px-3 py-1.5 text-[13px] md:text-[13.5px] text-foreground"
        >
          {it}
        </span>
      ))}
    </div>
  </div>
);

const LandscapeDiagram = () => (
  <div className="w-full">
    <StackLayer
      title="Veyra Workspace"
      accent="product"
      note="Product"
      items={["Readiness review", "Evidence", "Human decision"]}
    />
    <Arrow />
    <StackLayer
      title="Operational Memory Engine"
      accent="engine"
      note="Backend"
      items={["Context reconstruction", "Provenance", "Historical memory"]}
    />
    <Arrow />
    <StackLayer
      title="Read-only integration"
      items={["Connectors", "Event normalization", "Source references"]}
    />
    <Arrow />
    <StackLayer
      title="Existing operational platforms"
      items={["Foxglove", "Formant", "InOrbit", "Jira", "Git"]}
    />
    <Arrow />
    <StackLayer title="Runtime and control systems" items={["ROS", "MCAP", "Sensors", "Controllers"]} />
  </div>
);

const GapDiagram = () => {
  const sources = [
    { label: "Edge state", sub: "Sensor streams, joint torque, camera frames, local state machines" },
    { label: "Software state", sub: "Commits, pipelines, model versions, configuration, deployments" },
    { label: "Human state", sub: "Teleoperation, overrides, technician notes, sign-offs" },
    { label: "Lifecycle state", sub: "Tickets, inspections, maintenance, component and commercial history" },
    { label: "Decision state", sub: "Reviews, approvals, rejected releases, constraints, outcomes" },
  ];
  return (
    <div className="w-full">
      <div className="grid gap-3 sm:grid-cols-2">
        {sources.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-background px-4 py-3">
            <div className="text-[14px] text-foreground">{s.label}</div>
            <div className="mt-0.5 text-[12px] leading-relaxed text-muted-foreground">{s.sub}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-dashed border-primary/50 bg-primary/[0.04] px-4 py-4 text-center">
        <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-primary/70">
          One readiness decision
        </span>
        <div className="mt-1 text-[13px] text-muted-foreground">
          Context distributed across systems, people and time
        </div>
      </div>
    </div>
  );
};

const GraphDiagram = () => {
  const chain: [string, string, string][] = [
    ["Asset", "Line A Conveyor", ""],
    ["Deployment", "rev 218", "executed_under"],
    ["Anomaly", "Runtime anomaly", "observed_during"],
    ["Intervention", "Maintenance intervention", "followed_by"],
    ["Record", "Inspection record", "supported_by"],
    ["Review", "Return-to-service review", "reviewed_in"],
    ["Outcome", "Limited operation outcome", "resulted_in"],
  ];
  return (
    <ol className="w-full">
      {chain.map(([kind, id, rel], i) => (
        <li key={id}>
          {i > 0 && (
            <div className="flex items-center gap-3 py-2 pl-4">
              <span className="h-6 w-px bg-border" aria-hidden />
              <span className="font-mono text-[10.5px] tracking-[0.08em] text-muted-foreground">
                {rel}
              </span>
            </div>
          )}
          <div className="rounded-xl border border-border bg-background px-4 py-3">
            <div className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-muted-foreground">
              {kind}
            </div>
            <div className="mt-1 text-[14.5px] text-foreground">{id}</div>
          </div>
        </li>
      ))}
    </ol>
  );
};

const PipelineDiagram = () => {
  const steps = [
    { t: "Trigger", s: "Anomaly, deployment, intervention or maintenance change" },
    { t: "Reconstruct", s: "Collect linked events and build the workflow memory" },
    { t: "Compare", s: "Retrieve previous occurrences, policies and outcomes" },
    { t: "Review", s: "Show evidence for, evidence against, missing and uncertain" },
    { t: "Decide", s: "Human selects go, no-go, limited release or request evidence" },
    { t: "Learn", s: "Capture the decision and later operating outcome" },
  ];
  return (
    <div className="w-full space-y-0">
      {steps.map((st, i) => (
        <div key={st.t}>
          <div className="flex items-center gap-4">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-mono text-[11px] ${
                i === steps.length - 1
                  ? "border-primary/50 bg-primary/[0.06] text-primary/80"
                  : "border-border bg-background text-muted-foreground"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="flex-1 rounded-xl border border-border bg-background px-4 py-3">
              <div className="text-[15px] text-foreground">{st.t}</div>
              <div className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground">{st.s}</div>
            </div>
          </div>
          {i < steps.length - 1 && <div className="ml-[18px] h-6 w-px bg-border" aria-hidden />}
        </div>
      ))}
      <div className="mt-5 rounded-xl border border-dashed border-primary/50 bg-primary/[0.04] px-4 py-3">
        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-primary/70">
          Feedback loop
        </div>
        <div className="mt-1 text-[13.5px] text-muted-foreground">
          Decision and observed outcome return to the Operational Memory Engine as context for the
          next review.
        </div>
      </div>
    </div>
  );
};

const MemoryLoop = () => {
  const steps = [
    "Events",
    "Workflow context",
    "Review",
    "Human decision",
    "Real-world outcome",
    "Updated operational memory",
  ];
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
        {steps.map((s, i) => (
          <span key={s} className="flex items-center gap-2">
            <span className="rounded-lg border border-border bg-background px-3 py-1.5 text-[13px] text-foreground">
              {s}
            </span>
            {i < steps.length - 1 && (
              <span className="font-mono text-[12px] text-muted-foreground">&rarr;</span>
            )}
          </span>
        ))}
      </div>
      <div className="mt-3 font-mono text-[10px] tracking-[0.14em] uppercase text-muted-foreground">
        Memory compounds with every completed review
      </div>
    </div>
  );
};

const BoundaryDiagram = () => (
  <div className="w-full">
    <div className="rounded-2xl border border-border bg-background p-5">
      <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground mb-4">
        Client systems
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          "ROS / MCAP",
          "Git / CI",
          "Jira / maintenance",
          "Inspection records",
          "Human interventions",
        ].map((a) => (
          <div key={a} className="rounded-xl border border-border bg-surface px-3 py-3 text-center">
            <div className="text-[13.5px] text-foreground">{a}</div>
          </div>
        ))}
      </div>
    </div>
    <Arrow />
    <div className="rounded-xl border border-dashed border-border px-4 py-3 text-center">
      <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-muted-foreground">
        Read-only connectors
      </span>
    </div>
    <Arrow />
    <div className="rounded-xl border border-border bg-background px-4 py-3 text-center">
      <span className="text-[14px] text-foreground">Local or customer-approved normalization</span>
    </div>
    <Arrow />
    <div className="rounded-xl border border-foreground/25 bg-background px-5 py-4 text-center">
      <div className="text-[15px] text-foreground">Operational Memory Engine</div>
      <div className="mt-1 font-mono text-[10px] tracking-[0.14em] uppercase text-muted-foreground">
        Backend architecture
      </div>
    </div>
    <Arrow />
    <div className="rounded-xl border border-primary/40 bg-primary/[0.05] px-5 py-4 text-center">
      <div className="text-[15px] text-foreground">Veyra Workspace</div>
      <div className="mt-1 font-mono text-[10px] tracking-[0.14em] uppercase text-primary/70">
        Product surface
      </div>
    </div>
  </div>
);

const CodeBlock = ({ code }: { code: string }) => (
  <pre className="my-8 overflow-x-auto rounded-2xl border border-border bg-surface p-5 font-mono text-[12.5px] leading-[1.7] text-muted-foreground">
    <code>{code}</code>
  </pre>
);

const eventSchema = `{
  "event_id": "evt_402",
  "asset_id": "line_a_conveyor",
  "event_type": "ANOMALY",
  "source_system": "ros_mcap",
  "source_record_id": "mcap_219_09_13",
  "occurred_at": "2026-08-05T09:13:22Z",
  "time_window": null,
  "actor": "system",
  "workflow_id": "return_to_service_91",
  "deployment_id": "rev_218",
  "source_reference": "client://mcap/mission_219",
  "confidence": "observed"
}`;

const evidencePack = `{
  "review_state": "LIMITED_OPERATION_MAY_BE_CONSIDERED",
  "evidence_for": [
    {
      "source": "telemetry_normalizer",
      "record_id": "rec_9941",
      "summary": "Thermal telemetry remained within the expected envelope for three cycles."
    },
    {
      "source": "jira_maintenance",
      "record_id": "maint_8812",
      "summary": "Belt tension was adjusted by the field technician."
    }
  ],
  "evidence_against": [
    {
      "source": "git_deployment",
      "record_id": "rev_218",
      "summary": "The torque variance first appeared after deployment rev 218."
    }
  ],
  "missing_evidence": [
    {
      "required_type": "INSPECTION_RECORD",
      "owner": "field_safety_lead",
      "status": "UNSUBMITTED"
    }
  ],
  "uncertainties": [
    {
      "summary": "Only three stable operating cycles have been observed."
    }
  ],
  "similar_prior_reviews": [
    {
      "review_id": "review_14_mar",
      "outcome": "Cleared after belt tension adjustment."
    }
  ],
  "suggested_next_step": {
    "action": "RUN_LIMITED_TEST_CYCLE",
    "basis": [
      "Telemetry normalized after maintenance",
      "A similar prior event cleared after belt adjustment"
    ],
    "constraints": {
      "speed_cap": "0.5m/s",
      "review_after": "30m"
    }
  },
  "human_decision": null,
  "observed_outcome": null
}`;

const WorkspaceMock = () => {
  const panel = (label: string, body: React.ReactNode, accent?: boolean) => (
    <div
      className={`rounded-xl border px-4 py-3 ${
        accent ? "border-primary/40 bg-primary/[0.04]" : "border-border bg-background"
      }`}
    >
      <div className="font-mono text-[9.5px] tracking-[0.18em] uppercase text-muted-foreground">
        {label}
      </div>
      <div className="mt-1.5 text-[13.5px] leading-relaxed text-foreground">{body}</div>
    </div>
  );
  const list = (items: string[]) => (
    <ul className="space-y-1">
      {items.map((i) => (
        <li key={i} className="flex items-start gap-2 text-[13.5px] text-muted-foreground">
          <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-muted-foreground/50" />
          {i}
        </li>
      ))}
    </ul>
  );
  return (
    <div className="w-full space-y-3">
      {panel("Review question", "Is Line A ready to return to service?", true)}
      {panel("Current state", "Limited operation may be considered")}
      <div className="grid gap-3 sm:grid-cols-2">
        {panel(
          "Evidence for",
          list([
            "Telemetry normalized after maintenance",
            "Three stable cycles completed",
            "Similar prior event cleared after belt adjustment",
          ])
        )}
        {panel("Evidence against", list(["Torque variance began after deployment rev 218"]))}
        {panel("Missing", list(["Post-maintenance inspection record"]))}
        {panel("Uncertainty", list(["Only three stable cycles observed"]))}
      </div>
      {panel("Suggested next step", "Run one limited test cycle and review again after 30 minutes")}
      <div className="rounded-xl border border-dashed border-border px-4 py-3 text-center font-mono text-[10.5px] tracking-[0.14em] uppercase text-muted-foreground">
        Human approval required
      </div>
    </div>
  );
};

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
          <p className="text-[17px] md:text-[18px] leading-[1.6] text-muted-foreground max-w-[62ch] mb-5">
            How Veyra reconstructs machine, software and human history for readiness review.
          </p>
          <p className="font-mono text-[12px] text-muted-foreground">Engineering note</p>
        </motion.header>

        <section className="mt-16">
          <h2 className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Abstract
          </h2>
          <div className="space-y-5 border-l border-border pl-6">
            <Lead>
              Physical AI fleets generate telemetry, MCAP files, deployment records, maintenance logs
              and human interventions every day. The difficulty is not capturing more data. It is
              continuously reconstructing enough operational context to answer a high-consequence
              question: is this system ready for what comes next?
            </Lead>
            <P>
              After an anomaly or deployment change, engineers often rebuild the story manually
              across ROS bags, software revisions, tickets, inspections and operator knowledge. The
              records exist. The operational memory does not.
            </P>
            <P>
              Veyra runs alongside the existing stack through read-only integrations. It converts
              operational changes into normalized events, groups them into workflow context,
              preserves source provenance and maintains a persistent memory across deployments,
              incidents, maintenance and human decisions.
            </P>
            <P>
              That memory powers the Veyra Workspace: a human review environment showing what
              happened, what changed, what supports readiness, what remains uncertain and what
              evidence is still missing. AI can retrieve, compare and summarize this context, but the
              final operational decision remains with the human reviewer.
            </P>
          </div>
        </section>

        <Section num="01" title="The missing operational memory layer">
          <P>
            Today&rsquo;s Physical AI stack is mature at recording, visualization and fleet
            operation. The missing layer is persistent operational memory across systems and time.
          </P>

          <Figure
            label="Figure 1"
            caption="Veyra sits above existing runtime, data and fleet platforms. It does not replace them."
          >
            <LandscapeDiagram />
          </Figure>

          <DefList
            items={[
              [
                "Recording layer",
                "ROS 2 bags and MCAP provide timestamped serialization and storage for raw operational data.",
              ],
              [
                "Robotics data platforms",
                "Foxglove and similar systems index, search, replay and visualize multimodal robotics streams.",
              ],
              [
                "Fleet operations",
                "Formant, InOrbit and related platforms support orchestration, deployment, alerting and teleoperation.",
              ],
              [
                "Veyra",
                "Veyra reconstructs the cross-system history needed for a readiness review and preserves the result as future operational memory.",
              ],
            ]}
          />

          <Sub num="1.1" title="The operational context gap">
            <P>
              Existing platforms can store, replay and operate a system, but the context behind one
              operational decision is often distributed across separate forms of state.
            </P>

            <Figure
              label="Figure 2"
              caption="The history behind one readiness decision is distributed across systems, people and time."
            >
              <GapDiagram />
            </Figure>

            <DefList
              items={[
                [
                  "Edge state",
                  "Sensor streams, joint torque, camera frames and local state-machine transitions.",
                ],
                [
                  "Software state",
                  "Commit hashes, pipelines, model versions, configuration parameters and deployment revisions.",
                ],
                [
                  "Human state",
                  "Teleoperation, manual overrides, technician notes, operator observations and sign-offs.",
                ],
                [
                  "Lifecycle state",
                  "Incident tickets, inspection records, maintenance logs, component history and commercial records.",
                ],
                [
                  "Decision state",
                  "Readiness reviews, approvals, rejected releases, requested evidence, operating constraints and observed outcomes.",
                ],
              ]}
            />

            <P>
              Data volume is no longer the primary constraint. Continuous context reconstruction is.
            </P>
          </Sub>
        </Section>

        <Section num="02" title="Why readiness review matters">
          <P>
            The IFR reports 542,000 industrial robot installations globally in 2024. Capgemini&rsquo;s
            2026 Physical AI study finds 79% of enterprises engaging with Physical AI while only 4%
            run it at scale, with operational readiness named as the primary barrier.
          </P>
          <P>
            In software, a failed deployment can often be rolled back remotely. In the physical
            world, an incorrect readiness decision may lead to unplanned downtime, field-service
            work, safety exposure or accelerated asset degradation.
          </P>
          <P>
            Veyra does not claim to eliminate downtime or predict every physical failure. Its
            narrower objective is to reduce the manual and cognitive cost of readiness review:
            locating relevant records, reconstructing sequence, checking prior occurrences,
            identifying missing evidence and documenting why a decision was made.
          </P>
          <P>
            The commercial value appears in the decision chain: shorter evidence preparation, more
            consistent reviews, clearer accountability and an operational memory that compounds
            across repeated incidents and deployments.
          </P>
          <div className="rounded-2xl border border-border bg-surface px-6 py-5">
            <p className="text-[15px] leading-relaxed text-foreground/80">
              Operational readiness is an engineering and business problem, not only an observability
              problem.
            </p>
          </div>
        </Section>

        <Section num="03" title="Architecture: continuous context reconstruction">
          <P>
            Veyra continuously converts fragmented operational records into persistent workflow
            memory. The architecture separates high-volume source data from the smaller set of
            events, relationships, policies and outcomes required for review.
          </P>

          <Sub num="3.1" title="Read-only event layer">
            <P>
              Veyra does not send continuous raw telemetry into an LLM. Raw payloads remain in the
              systems that already store and process them.
            </P>
            <P>
              Read-only connectors receive or extract selected operational events, metadata and
              references to source records.
            </P>
            <CodeBlock code={eventSchema} />
            <P>
              Events may come from log listeners, webhooks, cloud storage adapters, REST APIs,
              operational databases or user-submitted records.
            </P>
          </Sub>

          <Sub num="3.2" title="Identity and context resolution">
            <P>
              Relationships are established from explicit operational anchors first: asset IDs,
              deployment IDs, run or mission IDs, ticket references, component serial numbers and
              customer-defined workflow identifiers.
            </P>
            <P>
              Temporal proximity provides secondary context but is not treated as proof of causality.
            </P>
            <P>
              Precise machine events and human records are not forced onto the same timestamp model.
              Hardware telemetry may have exact timestamps, while maintenance notes may belong to a
              broader operational window. Veyra preserves that difference and exposes uncertainty
              rather than inventing precision.
            </P>
            <ol className="divide-y divide-border border-y border-border">
              {[
                "Explicit identifiers",
                "Workflow membership",
                "Source-declared relationships",
                "Bounded temporal context",
                "Suggested semantic similarity",
              ].map((t, i) => (
                <li key={t} className="flex items-center gap-4 py-3.5">
                  <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
                    {i + 1}
                  </span>
                  <span className="text-[15px] text-foreground">{t}</span>
                  {i === 4 && (
                    <span className="ml-auto rounded-full border border-border bg-surface px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                      Review required
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </Sub>

          <Sub num="3.3" title="Persistent operational memory">
            <P>
              Events are grouped into persistent workflow memories such as deployments, missions,
              incidents, maintenance interventions and readiness reviews.
            </P>
            <p className="text-[15px] text-foreground">A workflow memory can contain:</p>
            <Bullets
              items={[
                "key events and source references",
                "changes since the previous operating state",
                "software and configuration context",
                "human interventions",
                "unresolved conflicts",
                "missing evidence",
                "comparable previous occurrences",
                "the final human decision",
                "the observed operating outcome",
              ]}
            />
            <P>
              A completed review does not disappear into a static report. Its decision, rationale and
              later outcome become context for future reviews, subject to the customer&rsquo;s
              retention and governance policy.
            </P>
            <MemoryLoop />
          </Sub>

          <Sub num="3.4" title="Provenance graph">
            <P>
              The provenance graph links operational memories, assets, deployments, people, decisions
              and source records. It answers what is related and where each surfaced claim came from.
            </P>
            <P>
              It does not claim physical causality unless that relationship is explicitly supported
              by a source, policy or human review.
            </P>

            <h4 className="text-[15px] font-semibold text-foreground pt-2">Node types</h4>
            <div className="flex flex-wrap gap-2">
              {[
                "Asset",
                "Run or Mission",
                "Deployment",
                "Anomaly",
                "Intervention",
                "Maintenance",
                "Record",
                "Review",
                "Decision",
                "Outcome",
              ].map((n) => (
                <span
                  key={n}
                  className="rounded-lg border border-border bg-surface px-3 py-1.5 text-[13px] text-foreground"
                >
                  {n}
                </span>
              ))}
            </div>

            <h4 className="text-[15px] font-semibold text-foreground pt-4">Relationship types</h4>
            <div className="flex flex-wrap gap-2">
              {[
                "observed_during",
                "executed_under",
                "changed_after",
                "correlated_with",
                "supported_by",
                "contradicted_by",
                "resolved_by",
                "approved_after",
                "missing_evidence_for",
                "similar_to",
                "resulted_in",
              ].map((e) => (
                <span
                  key={e}
                  className="rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-[12px] text-muted-foreground"
                >
                  {e}
                </span>
              ))}
            </div>

            <Figure
              label="Figure 3"
              caption="The graph preserves relationships and source provenance inside a larger operational memory system."
            >
              <GraphDiagram />
            </Figure>
          </Sub>

          <Sub num="3.5" title="Retrieval, policy and bounded AI reasoning">
            <P>
              When a readiness review is opened, Veyra retrieves the current workflow memory, relevant
              previous occurrences, applicable review requirements and unresolved evidence gaps.
            </P>
            <p className="text-[15px] text-foreground">AI may assist with bounded tasks:</p>
            <Bullets
              items={[
                "extracting structured events from technician notes",
                "summarizing already selected evidence",
                "comparing the current case with prior reviews",
                "surfacing inconsistencies or missing records",
                "drafting a human-readable explanation of the review state",
              ]}
            />
            <P>
              AI does not process the entire continuous telemetry stream, invent missing evidence,
              silently assert physical causality or autonomously authorize operation.
            </P>

            <div className="rounded-2xl border border-primary/40 bg-primary/[0.04] px-6 py-6 space-y-3">
              <div className="text-[16px] font-semibold text-foreground">Evidence before inference</div>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                Veyra prioritizes explicit identifiers, source provenance and customer-defined policy.
                Possible relationships may be suggested, but ambiguous links remain labelled until
                reviewed or supported by additional evidence.
              </p>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                Missing and conflicting records remain visible. The system does not complete an
                operational story merely because a plausible narrative exists.
              </p>
            </div>
          </Sub>

          <Sub num="" title="System non-goals">
            <DefList
              items={[
                ["Not teleoperation", "No low-latency video streaming or remote-driving interface."],
                [
                  "Not raw storage",
                  "MCAP files, video, point clouds and existing data platforms retain their source payloads.",
                ],
                [
                  "Not a controller",
                  "Veyra does not dispatch actuation commands or operate inside the real-time control loop.",
                ],
                [
                  "Not autonomous authorization",
                  "Veyra can organize evidence and suggest a next step, but the readiness decision remains human-owned or governed by the customer's explicit approval process.",
                ],
              ]}
            />
          </Sub>
        </Section>

        <Section num="04" title="Reference workflow: return-to-service">
          <P>
            The first reference workflow is a return-to-service review triggered by an anomaly,
            deployment change, human intervention or maintenance event.
          </P>

          <Figure
            label="Figure 4"
            caption="The review closes only when the human decision and later outcome return to operational memory."
          >
            <PipelineDiagram />
          </Figure>

          <Sub num="4.1" title="The Veyra Workspace">
            <P>The primary product surface is the Veyra Workspace, not the underlying graph.</P>
            <p className="text-[15px] text-foreground">The Workspace presents:</p>
            <Bullets
              items={[
                "the current review question",
                "reconstructed operational history",
                "what changed",
                "evidence supporting readiness",
                "evidence against readiness",
                "missing and conflicting records",
                "comparable previous occurrences",
                "suggested next steps",
                "the human decision",
                "the later operating outcome",
              ]}
            />
            <div className="my-8 rounded-2xl border border-border bg-surface p-4 md:p-6">
              <WorkspaceMock />
            </div>
          </Sub>

          <Sub num="4.2" title="Exportable review record">
            <P>
              A Decision Evidence Pack is an exportable snapshot of a completed Workspace review. It
              can support audit, handover, external approval or later comparison, but it is not the
              primary product interface.
            </P>
            <CodeBlock code={evidencePack} />
            <P>
              Veyra recommends or drafts. Existing fleet, deployment and control systems execute
              approved actions.
            </P>
          </Sub>
        </Section>

        <Section num="05" title="Security and deployment models">
          <P>
            Veyra remains outside the real-time control path. Connectors use read-only access against
            fleet cloud environments, log aggregation systems, operational databases, cloud storage
            or replicated data stores.
          </P>

          <DefList
            items={[
              [
                "Customer-hosted",
                "The Operational Memory Engine and Workspace run inside the customer environment.",
              ],
              [
                "Hybrid",
                "Normalization and raw-data access remain inside the customer environment. Selected metadata, source references and review state may synchronize with Veyra cloud under customer policy.",
              ],
              [
                "Veyra cloud",
                "For lower-sensitivity pilots, Veyra connects to existing cloud systems and replicated operational stores.",
              ],
            ]}
          />

          <Bullets
            items={[
              "no control-loop dependency",
              "read-only access by default",
              "raw payloads remain in source systems unless the customer explicitly chooses otherwise",
              "customer-defined retention and access controls",
              "every surfaced claim links to a source or is clearly labelled as inferred",
              "human approvals remain attributable",
            ]}
          />

          <Figure
            label="Figure 5"
            caption="Veyra can be deployed without entering the real-time control path."
          >
            <BoundaryDiagram />
          </Figure>
        </Section>

        <Section num="06" title="Design commitments">
          <div className="space-y-4">
            {[
              [
                "Source provenance",
                "Every surfaced claim links back to a source record or is clearly labelled as inferred.",
              ],
              [
                "Visible uncertainty",
                "Missing, conflicting and ambiguous evidence remains visible rather than being silently completed.",
              ],
              [
                "Passive integration",
                "Veyra remains outside the real-time control path and works through read-only integrations by default.",
              ],
              [
                "Human-owned decisions",
                "Recommendations can organize context and suggest next steps, but operational authorization remains explicit and attributable.",
              ],
              [
                "Compounding memory",
                "Every completed review and observed outcome can become context for later reviews, subject to customer retention and governance policy.",
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

        <Section num="07" title="Hypotheses under validation">
          <div className="space-y-4">
            {[
              [
                "Schema reusability",
                "Can one canonical operational event model support both fixed industrial systems and mobile autonomous fleets without excessive customer-specific customization?",
              ],
              [
                "Integration friction",
                "Does read-only deployment materially reduce IT and OT approval effort compared with introducing another active operational platform?",
              ],
              [
                "Review consistency",
                "Does accumulated operational memory reduce manual reconstruction effort and improve consistency across repeated readiness reviews?",
              ],
              [
                "Recommendation boundaries",
                "Which recommendations can users responsibly rely on, and what evidence thresholds require explicit human or specialist review?",
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
          <div>
            <p className="text-[16px] text-foreground mb-1">
              Interested in discussing readiness review workflows?
            </p>
            <p className="text-[14.5px] text-muted-foreground max-w-[52ch]">
              We are looking for design partners working with autonomous systems, Physical AI and
              industrial operations.
            </p>
          </div>
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
