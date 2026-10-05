import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
} from "lucide-react";
import Layout from "@/components/Layout";

const workflows = [
  {
    tag: "RECONSTRUCT",
    title: "Bring the case together.",
    description:
      "Bring machine, software, environment and human context into one case.",
  },
  {
    tag: "NARROW",
    title: "Separate the explanations.",
    description:
      "Compare affected and healthy systems and keep competing explanations explicit.",
  },
  {
    tag: "RESOLVE",
    title: "Know what matters next.",
    description:
      "Know what evidence or check is worth getting next.",
  },
  {
    tag: "LEARN",
    title: "Reuse what worked.",
    description:
      "Capture intervention and outcome so the next case starts ahead.",
  },
];

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
      label: "Contrast",
      title: "Compare affected and healthy machines.",
      detail: "The same software ran everywhere. Calibration C and gripper firmware 7.3 concentrate on the affected machines.",
      focus: ["2 affected", "4 healthy", "R06 exposed but healthy"],
      metric: "1 exposed healthy",
      memory: "Affected and healthy machines are compared in the same operational context.",
    },
    {
      n: "04",
      label: "Explain",
      title: "Keep competing explanations visible.",
      detail: "Veyra separates what each explanation explains, what contradicts it and what evidence is still missing.",
      focus: ["H1 calibration C", "H2 firmware 7.3", "H3 calibration and firmware"],
      metric: "3 hypotheses",
      memory: "The case preserves evidence for and against each remaining explanation.",
    },
    {
      n: "05",
      label: "Next Move",
      title: "Know what to check next.",
      detail: "Check R06 under the same condition first. It separates the two strongest remaining explanations with low cost and low risk.",
      focus: ["check R06 under condition X", "cost: low", "time: about 15 min"],
      metric: "1 next check",
      memory: "The system suggests the next most informative check, not a forced answer.",
    },
    {
      n: "06",
      label: "Intervention",
      title: "Record what the team actually does.",
      detail: "Rollout paused. R03 and R05 rolled back. Field dispatch held until the team has stronger evidence.",
      focus: ["rollout paused", "R03/R05 rolled back", "field dispatch held"],
      metric: "3 actions",
      memory: "The operational record captures the action scope and owner.",
    },
    {
      n: "07",
      label: "Outcome",
      title: "Track what happened after the action.",
      detail: "R03 and R05 recovered. No field visit required. R06 later showed the same pattern.",
      focus: ["R03 recovered", "R05 recovered", "R06 later affected"],
      metric: "2 recovered",
      memory: "The outcome is linked back to the action that produced it.",
    },
    {
      n: "08",
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
    <div className="overflow-hidden rounded-lg border border-[#c8d5e8] bg-background shadow-[0_1px_0_rgba(15,23,42,0.08),0_30px_80px_-45px_rgba(37,99,235,0.32)]">
      <div className="border-b border-[#c8d5e8] bg-[#f7faff] px-4 py-3 sm:px-5">
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
        <aside className="border-b border-[#c8d5e8] bg-[#f8fbff] p-4 lg:border-b-0 lg:border-r">
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
                  className={`h-8 rounded-md border transition-colors ${
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

          <div className="mt-5 rounded-lg border border-[#c8d5e8] bg-background p-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              Current question
            </div>
            <p className="mt-2 text-[12px] leading-relaxed text-foreground">
              Which machines share the conditions behind the behavior change?
            </p>
          </div>
        </aside>

        <main className="min-w-0 p-4 sm:p-5">
          <nav className="mb-5 flex gap-1.5 overflow-x-auto rounded-lg border border-[#c8d5e8] bg-[#f7faff] p-1">
            {steps.map((step, index) => (
              <button
                key={step.label}
                onClick={() => setActive(index)}
                className={`shrink-0 rounded-full px-3.5 py-2 text-left transition-all ${
                  active === index
                    ? "bg-[#0f172a] text-background shadow-sm"
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
            className="rounded-lg border border-[#c8d5e8] bg-background p-5 sm:p-6"
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
              <div className="rounded-md border border-[#c8d5e8] bg-[#f7faff] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground">
                {current.metric}
              </div>
            </div>

            <p className="mt-4 max-w-2xl text-[13px] leading-relaxed text-muted-foreground md:text-[14px]">
              {current.detail}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {current.focus.map((item) => (
                <div key={item} className="min-h-[86px] rounded-lg border border-[#c8d5e8] bg-[#f8fbff] p-4">
                  <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                    Evidence
                  </div>
                  <div className="mt-3 text-[13px] font-medium leading-snug text-foreground">
                    {item}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 overflow-hidden rounded-lg border border-[#c8d5e8]">
              <div className="grid grid-cols-[0.7fr_1fr_0.8fr_1fr] border-b border-[#c8d5e8] bg-[#f7faff] px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
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
                <div key={row[0]} className="grid grid-cols-[0.7fr_1fr_0.8fr_1fr] border-b border-[#e1e8f4] px-4 py-3 text-[12px] last:border-b-0">
                  <span className="font-mono text-foreground">{row[0]}</span>
                  <span className={row[1].includes("affected") ? "text-destructive" : "text-muted-foreground"}>{row[1]}</span>
                  <span className="text-muted-foreground">{row[2]}</span>
                  <span className="truncate text-foreground">{row[3]}</span>
                </div>
              ))}
            </div>
          </motion.section>
        </main>

        <aside className="border-t border-[#c8d5e8] bg-[#f8fbff] p-4 lg:border-l lg:border-t-0">
          <motion.div
            key={`memory-${active}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
            className="space-y-3"
          >
            <div className="rounded-lg border border-[#c8d5e8] bg-background p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Case role
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-foreground">
                {current.memory}
              </p>
            </div>

            <div className="rounded-lg border border-[#2563eb]/25 bg-[#2563eb]/[0.045] p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary/80">
                Relevant history
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-foreground">
                Similar case found. Last time, rollback recovered 2 of 2 affected machines. One additional machine was affected later.
              </p>
              <div className="mt-4 rounded-md border border-[#2563eb]/20 bg-background/70 p-3 text-[12px] leading-relaxed text-muted-foreground">
                Use previous outcome
              </div>
            </div>

            <div className="rounded-lg border border-[#c8d5e8] bg-background p-4">
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
      <section className="relative overflow-hidden bg-[#07111f] text-white">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 opacity-[0.4]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(96,165,250,0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(96,165,250,0.12) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_18%,rgba(37,99,235,0.32),transparent_38%),linear-gradient(180deg,rgba(7,17,31,0.08),#07111f_92%)]" />
        </div>

        <div className="container mx-auto px-6 pt-24 pb-16 max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_340px] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-blue-200/70">
                Veyra by Silken Reason
              </p>
              <h1 className="mb-5 text-4xl font-semibold leading-[1.02] tracking-tight text-white md:text-5xl lg:text-[58px]">
                <span className="block">
                  When <span className="whitespace-nowrap text-blue-300">Physical AI</span>
                </span>
                <span className="block">
                  meets the <span className="text-[#84d7b0]">real world</span>,
                </span>
                <span className="block">things stop being predictable.</span>
              </h1>

              <p className="mb-7 max-w-2xl text-base leading-relaxed text-blue-50/68 md:text-lg">
                Veyra helps teams reconstruct what happened, narrow down why,
                decide what to check next, and learn from what actually worked.
              </p>

              <a
                href="https://veyra-demo.onrender.com/cinematic"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md bg-blue-400 px-5 py-3 text-[13px] font-semibold text-[#06101f] transition-colors hover:bg-blue-300"
              >
                Replay a field case
                <ArrowRight size={14} />
              </a>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em] text-blue-100/60">
                <span>Read-only</span>
                <span>Existing systems</span>
                <span>No control path</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.6 }}
              className="relative hidden h-[300px] overflow-hidden border border-blue-300/20 bg-white/[0.035] p-5 backdrop-blur lg:block"
            >
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(147,197,253,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(147,197,253,0.1) 1px, transparent 1px)",
                  backgroundSize: "42px 42px",
                }}
              />
              <div className="relative z-10 flex h-full flex-col">
                <div className="mb-4 flex items-start justify-between border-b border-blue-200/15 pb-3">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-blue-200/65">
                      Live robot case
                    </p>
                    <p className="mt-1 text-[15px] font-semibold text-blue-50">
                      Safe-stop after autonomy 2.7
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 font-mono text-[10px] uppercase tracking-[0.1em]">
                    <span className="border border-red-300/45 bg-red-300/12 px-2 py-1 text-red-100">3 affected</span>
                    <span className="border border-[#84d7b0]/45 bg-[#84d7b0]/10 px-2 py-1 text-[#b9f2d3]">1 watch</span>
                    <span className="border border-blue-200/20 bg-blue-100/[0.04] px-2 py-1 text-blue-100/70">8 healthy</span>
                  </div>
                </div>

                <div className="grid flex-1 grid-cols-[1fr_1.05fr] gap-5">
                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="mb-3 flex items-center justify-between">
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-blue-200/65">
                          Fleet view
                        </p>
                        <span className="font-mono text-[10px] text-blue-100/45">12 robots</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          ["EX01", "healthy"],
                          ["EX02", "healthy"],
                          ["EX03", "affected"],
                          ["EX04", "healthy"],
                          ["EX05", "affected"],
                          ["EX06", "healthy"],
                          ["EX07", "healthy"],
                          ["EX08", "affected"],
                          ["EX09", "healthy"],
                          ["EX10", "healthy"],
                          ["EX11", "watch"],
                          ["EX12", "healthy"],
                        ].map(([id, state]) => (
                          <div
                            key={id}
                            className={`flex h-9 items-center justify-center border font-mono text-[9px] ${
                              state === "affected"
                                ? "border-red-300/60 bg-red-300/18 text-red-100"
                                : state === "watch"
                                  ? "border-[#84d7b0]/75 bg-[#84d7b0]/18 text-[#c8f7dc]"
                                  : "border-blue-200/16 bg-blue-100/[0.035] text-blue-100/42"
                            }`}
                          >
                            {id}
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="text-[12px] leading-snug text-blue-50/58">
                      Veyra separates affected robots from healthy robots that received the same release.
                    </p>
                  </div>

                  <div className="flex flex-col justify-between border-l border-blue-200/15 pl-5">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-blue-200/65">
                        What could explain it?
                      </p>
                      <div className="mt-3 space-y-2">
                        {[
                          ["01", "Localization L4", "supported by cohort"],
                          ["02", "LiDAR firmware 5.3", "still possible"],
                          ["03", "Loading zone B", "most useful next check"],
                        ].map(([label, text, state]) => (
                          <div key={label} className="grid grid-cols-[28px_1fr] border border-blue-200/12 bg-[#07111f]/55 px-3 py-2">
                            <span className="font-mono text-[10px] text-[#84d7b0]">{label}</span>
                            <span>
                              <span className="block text-[13px] font-medium leading-tight text-blue-50">{text}</span>
                              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-blue-100/38">{state}</span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border border-[#84d7b0]/35 bg-[#84d7b0]/10 px-4 py-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#84d7b0]">
                        Next check
                      </p>
                      <p className="mt-2 text-[14px] font-semibold leading-snug text-blue-50">
                        Test EX11 in zone B before sending a technician.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WORKFLOWS */}
      <section id="workflows" className="border-t border-[#c8d5e8] bg-[#f8fbff]">
        <div className="container mx-auto px-6 py-20 max-w-6xl">
          <div className="mb-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-4">
                Workflows
              </p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.08]">
                Five questions decide what happens next.
              </h2>
            </div>
            <div className="rounded-lg border border-[#c8d5e8] bg-background p-5 shadow-sm">
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  "What changed?",
                  "Where else is it happening?",
                  "What could explain it?",
                  "What should we check or change next?",
                  "What happened after we acted?",
                ].map((question, index) => (
                  <div key={question} className="rounded-md border border-[#d8e2f1] bg-[#fbfdff] px-4 py-3">
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
                className="rounded-lg border border-[#c8d5e8] bg-background p-5 transition-colors hover:border-[#2563eb]/50 hover:bg-[#fbfdff]"
              >
                <div className="mb-6 flex items-center justify-between">
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

      {/* CASE MEMORY */}
      <section id="how" className="border-t border-[#c8d5e8] bg-background">
        <div className="container mx-auto px-6 py-16 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border-l border-[#2563eb]/40 pl-6 md:pl-10"
          >
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-5">
              Memory
            </p>
            <h2 className="max-w-3xl text-3xl font-semibold leading-[1.08] tracking-tight text-foreground md:text-5xl">
              Every case makes the next one easier to resolve.
            </h2>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
              Veyra preserves the evidence, intervention and outcome so the
              next investigation does not start from zero.
            </p>
          </motion.div>
        </div>
      </section>

      {/* PRODUCT */}
      <section id="product" className="border-t border-[#c8d5e8] bg-[#f8fbff]">
        <div className="container mx-auto px-6 py-20 max-w-7xl">
          <div className="mb-12">
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-4">
              Product
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.1] max-w-3xl">
              From machine issue to proven action.
            </h2>
            <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
              Veyra follows the case from the first signal through competing
              explanations, the next useful check, intervention and outcome.
            </p>
          </div>

          <ProductWorkspace />

          {/* Deployment & privacy note */}
          <p className="mt-6 max-w-3xl text-[13px] leading-relaxed text-muted-foreground">
            Designed for read-only integration with existing operational systems.
            <span className="block mt-3">
              <Link to="/engineering" className="text-foreground underline decoration-border underline-offset-4 hover:text-primary transition-colors">
                Read the engineering note
              </Link>
            </span>
          </p>
        </div>
      </section>

      {/* PILOT CTA */}
      <section className="border-t border-[#c8d5e8] bg-background">
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
                className="rounded-lg border border-[#c8d5e8] bg-background p-6 transition-colors hover:border-[#2563eb]/45"
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
            className="inline-flex items-center gap-1.5 rounded-md bg-[#0f172a] px-6 py-3 text-[13px] font-medium text-background transition-colors hover:bg-[#1e293b]"
          >
            Request a Design Partner Pilot <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#c8d5e8] bg-[#f8fbff]">
        <div className="container mx-auto px-6 py-14 max-w-6xl">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-foreground" />
              <span className="text-[15px] font-semibold tracking-tight text-foreground">Veyra</span>
              <span className="ml-2 text-[11px] text-muted-foreground">by Silken Reason</span>
            </div>
            <ul className="flex items-center gap-6 text-[13px]">
              <li><Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
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
