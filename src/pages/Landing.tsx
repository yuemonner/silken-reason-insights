import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
} from "lucide-react";
import Layout from "@/components/Layout";

const workflows = [
  {
    tag: "UNDERSTAND",
    title: "See what changed",
    description:
      "Bring together machine state, software, configuration, service history and recent changes around the incident.",
  },
  {
    tag: "SCOPE",
    title: "Find where else",
    description:
      "Compare affected and healthy machines. See which other deployed systems share the same conditions.",
  },
  {
    tag: "ACT",
    title: "Decide what to do",
    description:
      "Use the evidence available now to choose the next action, assign ownership and record what was actually done.",
  },
  {
    tag: "LEARN",
    title: "Know what worked",
    description:
      "Record what the team actually did, what happened afterwards, and reuse that history when a similar case appears again.",
  },
];

const FlowVisualization = () => {
  const flow = [
    { label: "Issue", detail: "Machine behavior changes", metric: "signal" },
    { label: "Understand", detail: "Reconstruct what changed", metric: "context" },
    { label: "Scope", detail: "Find where else it appears", metric: "peers" },
    { label: "Decide", detail: "Choose the next action", metric: "owner" },
    { label: "Act", detail: "Record what was actually done", metric: "action" },
    { label: "Outcome", detail: "Measure what happened", metric: "result" },
    { label: "Reuse", detail: "Bring it back next time", metric: "memory" },
  ];

  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-background px-5 py-6 md:px-8 md:py-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.45]"
          style={{
            backgroundImage:
              "linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            maskImage: "radial-gradient(ellipse at center, black 25%, transparent 76%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 25%, transparent 76%)",
          }}
        />

        <div className="relative hidden md:block">
          <svg viewBox="0 0 1260 210" className="h-[210px] w-full" role="img" aria-label="Operational case loop">
            <defs>
              <linearGradient id="caseFlow" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(var(--muted-foreground))" stopOpacity="0.18" />
                <stop offset="48%" stopColor="hsl(var(--primary))" stopOpacity="0.55" />
                <stop offset="100%" stopColor="hsl(var(--muted-foreground))" stopOpacity="0.18" />
              </linearGradient>
              <filter id="flowGlow">
                <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d="M 70 92 C 205 25, 320 155, 455 92 S 690 25, 825 92 S 1030 155, 1190 92"
              fill="none"
              stroke="url(#caseFlow)"
              strokeWidth="1.5"
            />
            <path
              d="M 1190 92 C 1060 190, 220 190, 70 92"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeDasharray="8 12"
              strokeOpacity="0.32"
              strokeWidth="1.5"
            />
            <motion.circle
              r="6"
              fill="hsl(var(--primary))"
              filter="url(#flowGlow)"
              animate={{
                cx: [70, 245, 410, 585, 760, 960, 1120, 1190],
                cy: [92, 79, 104, 76, 99, 82, 107, 92],
              }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              r="3"
              fill="hsl(var(--primary))"
              animate={{
                cx: [1190, 980, 760, 540, 310, 150, 70],
                cy: [92, 168, 182, 177, 172, 150, 92],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            />
          </svg>

          <div className="absolute inset-x-0 top-0 grid grid-cols-7 gap-2">
            {flow.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
                whileHover={{ y: -4 }}
                className="group relative min-h-[118px] rounded-2xl border border-border/80 bg-background/80 p-3 shadow-sm backdrop-blur transition-colors hover:border-primary/45 hover:bg-primary/[0.035]"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground group-hover:text-primary">
                    {item.label}
                  </div>
                  <div className="h-2 w-2 rounded-full bg-foreground/45 group-hover:bg-primary group-hover:shadow-[0_0_18px_hsl(var(--primary)/0.6)]" />
                </div>
                <div className="text-[14px] font-medium leading-snug text-foreground">
                  {item.detail}
                </div>
                <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                  {item.metric}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative grid gap-3 md:hidden">
          {flow.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              className="flex items-center gap-4 rounded-2xl border border-border bg-background/85 p-4"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/[0.05] font-mono text-[10px] text-primary">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  {item.label}
                </div>
                <div className="mt-1 text-[15px] font-medium leading-snug text-foreground">
                  {item.detail}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="relative mt-5 rounded-full border border-primary/25 bg-primary/[0.035] px-4 py-2 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-primary md:mt-0"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.35 }}
        >
          Every case makes the next one easier to handle
        </motion.div>
      </div>

      <p className="mt-5 border-t border-border pt-4 text-[13px] leading-relaxed text-muted-foreground">
        Veyra turns every operational incident into reusable evidence for the next one.
      </p>
    </div>
  );
};

/* ---------- Product episode canvas mock ---------- */
const ProductWorkspace = () => {
  const steps = [
    {
      n: "01",
      label: "Detect",
      title: "Something changes on a deployed machine.",
      detail: "R03 and R05 are affected after a software update. The case opens from machine evidence and engineer context.",
      focus: ["2 affected machines", "first signal 14:11", "engineer note 14:26"],
      metric: "2 affected",
      memory: "A new case opens automatically from machine state and engineer context.",
    },
    {
      n: "02",
      label: "Reconstruct",
      title: "See the relevant machine context.",
      detail: "Veyra brings software, configuration, machine state and service history into one case.",
      focus: ["policy v0.8 to v0.9", "camera calibration B to C", "gripper firmware 7.2 to 7.3"],
      metric: "3 changes",
      memory: "The case stores the change set beside the machine state that followed it.",
    },
    {
      n: "03",
      label: "Compare",
      title: "Understand what differs between affected and healthy machines.",
      detail: "The same software ran everywhere. Calibration C and gripper firmware 7.3 concentrate on the affected machines.",
      focus: ["2 affected", "4 healthy", "R06 exposed but healthy"],
      metric: "1 exposed healthy",
      memory: "Affected and healthy machines are compared in the same operational context.",
    },
    {
      n: "04",
      label: "Decide",
      title: "See what is known, uncertain and actionable.",
      detail: "The team can act while preserving what was known and what remained unresolved.",
      focus: ["known: R03/R05 affected", "unknown: R06 later behavior", "option: pause rollout"],
      metric: "14:27",
      memory: "The decision state records evidence, unknowns and options at that moment.",
    },
    {
      n: "05",
      label: "Act",
      title: "Record what the team actually does.",
      detail: "Rollout paused. R03 and R05 rolled back. Field dispatch held until the team has stronger evidence.",
      focus: ["rollout paused", "R03/R05 rolled back", "field dispatch held"],
      metric: "3 actions",
      memory: "The operational record captures the action scope and owner.",
    },
    {
      n: "06",
      label: "Measure",
      title: "Track whether the action worked.",
      detail: "R03 and R05 recovered. No field visit required. R06 later showed the same pattern.",
      focus: ["R03 recovered", "R05 recovered", "R06 later affected"],
      metric: "2 recovered",
      memory: "The outcome is linked back to the action that produced it.",
    },
    {
      n: "07",
      label: "Reuse",
      title: "Bring back what worked before.",
      detail: "When a similar case appears again, Veyra surfaces the previous action, outcome and missing evidence.",
      focus: ["similar case found", "rollback worked", "check config before dispatch"],
      metric: "12 days later",
      memory: "The next case starts with prior action and outcome context.",
    },
  ];
  const [active, setActive] = useState(0);
  const current = steps[active];

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-[0_1px_0_hsl(var(--border)),0_30px_60px_-30px_hsl(var(--foreground)/0.15)]">
      <div className="border-b border-border bg-surface/35 px-4 py-3 sm:px-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Case workspace
            </div>
            <div className="mt-1 text-[15px] font-semibold text-foreground">
              R03 / R05 post update anomaly
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px]">
            <span className="rounded-full border border-destructive/30 bg-destructive/10 px-3 py-1 text-destructive">
              2 affected
            </span>
            <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-primary">
              1 exposed healthy
            </span>
            <span className="rounded-full border border-border bg-background px-3 py-1 text-muted-foreground">
              action pending
            </span>
          </div>
        </div>
      </div>

      <div className="grid min-h-[620px] lg:grid-cols-[210px_minmax(0,1fr)_260px]">
        <aside className="border-b border-border bg-surface/25 p-4 lg:border-b-0 lg:border-r">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Machines
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">18</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 18 }).map((_, index) => {
              const affected = index === 2 || index === 4;
              const exposed = index === 5 || index === 11 || index === 15;
              return (
                <span
                  key={index}
                  className={`h-8 rounded-lg border transition-colors ${
                    affected
                      ? "border-destructive/45 bg-destructive/15"
                      : exposed
                        ? "border-primary/40 bg-primary/10"
                        : "border-border bg-background"
                  }`}
                />
              );
            })}
          </div>

          <div className="mt-5 space-y-2 text-[12px]">
            {[
              ["affected", "R03, R05"],
              ["watch", "R06"],
              ["release", "v0.9"],
              ["profile", "C + fw 7.3"],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-3 border-b border-border pb-2 last:border-b-0">
                <span className="text-muted-foreground">{label}</span>
                <span className="truncate text-right font-mono text-[11px] text-foreground">{value}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-xl border border-border bg-background p-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              Current question
            </div>
            <p className="mt-2 text-[12px] leading-relaxed text-foreground">
              Which machines share the conditions behind the behavior change?
            </p>
          </div>
        </aside>

        <main className="min-w-0 p-4 sm:p-5">
          <nav className="mb-5 flex gap-1.5 overflow-x-auto rounded-full border border-border bg-surface/35 p-1">
            {steps.map((step, index) => (
              <button
                key={step.label}
                onClick={() => setActive(index)}
                className={`shrink-0 rounded-full px-3.5 py-2 text-left transition-all ${
                  active === index
                    ? "bg-foreground text-background shadow-sm"
                    : "text-muted-foreground hover:bg-background hover:text-foreground"
                }`}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.12em]">
                  {step.n}
                </span>
                <span className="ml-2 text-[12px] font-medium">{step.label}</span>
              </button>
            ))}
          </nav>

          <motion.section
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
            className="rounded-2xl border border-border bg-background p-5 sm:p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  {current.n} {current.label}
                </div>
                <h4 className="mt-2 max-w-xl text-[24px] font-semibold leading-tight tracking-tight text-foreground md:text-[30px]">
                  {current.title}
                </h4>
              </div>
              <div className="rounded-full border border-border bg-surface/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground">
                {current.metric}
              </div>
            </div>

            <p className="mt-4 max-w-2xl text-[13px] leading-relaxed text-muted-foreground md:text-[14px]">
              {current.detail}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {current.focus.map((item) => (
                <div key={item} className="min-h-[86px] rounded-xl border border-border bg-surface/45 p-4">
                  <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                    Evidence
                  </div>
                  <div className="mt-3 text-[13px] font-medium leading-snug text-foreground">
                    {item}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 overflow-hidden rounded-xl border border-border">
              <div className="grid grid-cols-[0.7fr_1fr_0.8fr_1fr] border-b border-border bg-surface/50 px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                <span>Machine</span>
                <span>Status</span>
                <span>Release</span>
                <span>Profile</span>
              </div>
              {[
                ["R03", "affected", "v0.9", "C + fw 7.3"],
                ["R05", "affected", "v0.9", "C + fw 7.3"],
                ["R06", "healthy exposed", "v0.9", "C + fw 7.3"],
                ["R01", "healthy", "v0.9", "B + fw 7.2"],
              ].map((row) => (
                <div key={row[0]} className="grid grid-cols-[0.7fr_1fr_0.8fr_1fr] border-b border-border px-4 py-3 text-[12px] last:border-b-0">
                  <span className="font-mono text-foreground">{row[0]}</span>
                  <span className={row[1].includes("affected") ? "text-destructive" : "text-muted-foreground"}>{row[1]}</span>
                  <span className="text-muted-foreground">{row[2]}</span>
                  <span className="truncate text-foreground">{row[3]}</span>
                </div>
              ))}
            </div>
          </motion.section>
        </main>

        <aside className="border-t border-border bg-surface/20 p-4 lg:border-l lg:border-t-0">
          <motion.div
            key={`memory-${active}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
            className="space-y-3"
          >
            <div className="rounded-2xl border border-border bg-background p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Case role
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-foreground">
                {current.memory}
              </p>
            </div>

            <div className="rounded-2xl border border-primary/25 bg-primary/[0.035] p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary/80">
                Relevant history
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-foreground">
                Similar case found. Last time, rollback recovered 2 of 2 affected machines. One additional machine was affected later.
              </p>
              <div className="mt-4 rounded-xl border border-primary/20 bg-background/70 p-3 text-[12px] leading-relaxed text-muted-foreground">
                Use previous outcome
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-background p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Case state
              </div>
              <div className="mt-4 space-y-2 text-[12px]">
                {[
                  ["known", "2 affected"],
                  ["watch", "R06 exposed"],
                  ["action", active >= 4 ? "recorded" : "pending"],
                  ["outcome", active >= 5 ? "linked" : "pending"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-3 border-b border-border pb-2 last:border-b-0">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-mono text-[11px] text-foreground">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </aside>
      </div>
    </div>
  );
};

const Landing = () => {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.08),transparent_60%)]" />
          <div
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
            }}
          />
        </div>

        <div className="container mx-auto px-6 pt-40 pb-32 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl lg:text-[80px] font-semibold tracking-tight text-foreground leading-[1.02] mb-8">
              Operational Intelligence for{" "}
              <span className="text-primary">Physical AI</span>.
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
              Veyra helps teams understand what changed, decide what to do,
              and learn from what worked across deployed physical systems.
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-5 py-3 text-[13px] font-medium hover:bg-foreground/90 transition-colors"
            >
              Request a Design Partner Pilot
              <ArrowRight size={14} />
            </Link>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] tracking-[0.12em] uppercase text-muted-foreground">
              <span>✓ Read-only</span>
              <span>✓ Works with existing systems</span>
              <span>✓ No control path</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WORKFLOWS */}
      <section id="workflows" className="border-t border-border">
        <div className="container mx-auto px-6 py-28 max-w-6xl">
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-4">
                Workflows
              </p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.08]">
                Four questions decide what happens next.
              </h2>
            </div>
            <div className="rounded-2xl border border-border bg-surface/45 p-5">
              <div className="grid gap-2 sm:grid-cols-2">
                {["What changed?", "Where else?", "What should we do?", "Did it work?"].map((question, index) => (
                  <div key={question} className="rounded-xl border border-border bg-background px-4 py-3">
                    <div className="font-mono text-[10px] text-muted-foreground">0{index + 1}</div>
                    <div className="mt-1 text-[15px] font-medium text-foreground">{question}</div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
                The answers usually live across telemetry, deployments, configuration,
                service systems, tickets and people. Veyra brings them into one
                operational case.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {workflows.map((w, i) => (
              <motion.div
                key={w.tag}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="rounded-2xl border border-border bg-background p-6 hover:border-foreground/30 transition-colors"
              >
                <div className="mb-8 flex items-center justify-between">
                  <div className="text-[11px] font-mono tracking-[0.15em] uppercase text-muted-foreground">
                  {w.tag}
                  </div>
                  <span className="h-2 w-2 rounded-full bg-foreground/70" />
                </div>
                <h3 className="text-[22px] font-semibold text-foreground leading-snug">
                  {w.title}
                </h3>
                <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
                  {w.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTINUOUS OPERATIONS */}
      <section id="how" className="border-t border-border bg-surface/50">
        <div className="container mx-auto px-6 py-28 max-w-6xl">
          <div className="mb-16 max-w-2xl">
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-4">
              Operational Context
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-background p-6 md:p-10">
            <FlowVisualization />
          </div>
        </div>
      </section>

      {/* PRODUCT */}
      <section id="product" className="border-t border-border">
        <div className="container mx-auto px-6 py-28 max-w-7xl">
          <div className="mb-12">
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-4">
              Product
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.1] max-w-3xl">
              From machine issue to proven action.
            </h2>
            <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
              Veyra follows the case from the first signal through
              investigation, decision, action and outcome.
            </p>
          </div>

          <ProductWorkspace />

          {/* Deployment & privacy note */}
          <p className="mt-6 max-w-3xl text-[13px] leading-relaxed text-muted-foreground">
            Veyra runs alongside your existing operational systems. Raw operational
            data stays in your environment.
            <span className="block mt-3">
              <Link to="/engineering" className="text-foreground underline decoration-border underline-offset-4 hover:text-primary transition-colors">
                Read the engineering note
              </Link>
            </span>
          </p>
        </div>
      </section>

      {/* PILOT CTA */}
      <section className="border-t border-border">
        <div className="container mx-auto px-6 py-32 max-w-5xl">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Pilot
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.1] mb-12 max-w-3xl">
            6 to 8 week design partner deployment
          </h2>

          <ol className="grid gap-4 md:grid-cols-5 mb-12">
            {[
              { n: "01", t: "Choose one recurring operational problem", d: "Pick one class of machine issue your team already investigates repeatedly." },
              { n: "02", t: "Connect the minimum data", d: "Read-only access to the few sources needed to understand the case, including deployment, configuration, machine state and service data." },
              { n: "03", t: "Use Veyra on real incidents", d: "When that issue occurs, use Veyra to reconstruct what changed, compare machines and decide what to do." },
              { n: "04", t: "Track the action and outcome", d: "Record what the team actually did and whether it worked." },
              { n: "05", t: "Measure the value", d: "Compare investigation time, field visits, time to decision and repeat-case reuse against the current workflow." },
            ].map((s) => (
              <li
                key={s.n}
                className="rounded-2xl border border-border bg-background p-6 hover:border-foreground/30 transition-colors"
              >
                <div className="font-mono text-[11px] tracking-[0.15em] text-muted-foreground mb-4">{s.n}</div>
                <h3 className="text-[16px] font-semibold text-foreground mb-2 leading-snug">{s.t}</h3>
                <p className="text-[13px] leading-relaxed text-muted-foreground">{s.d}</p>
              </li>
            ))}
          </ol>

          <p className="mb-8 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
            If the deployment proves repeatable value in a live workflow, we
            move into production.
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-6 py-3 text-[13px] font-medium hover:bg-foreground/90 transition-colors"
          >
            Request a Design Partner Pilot <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border">
        <div className="container mx-auto px-6 py-14 max-w-6xl">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-foreground" />
              <span className="text-[15px] font-semibold tracking-tight text-foreground">Veyra</span>
              <span className="ml-2 text-[11px] text-muted-foreground">by Silken Reason</span>
            </div>
            <ul className="flex items-center gap-6 text-[13px]">
              <li><Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link to="/engineering" className="text-muted-foreground hover:text-foreground transition-colors">Engineering</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
            <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
              © 2026 Silken Reason
            </span>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default Landing;
