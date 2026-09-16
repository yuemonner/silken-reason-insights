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
    tag: "LEARN",
    title: "Know what worked",
    description:
      "Record what the team actually did, what happened afterwards, and reuse that history when a similar case appears again.",
  },
];

const FlowVisualization = () => {
  const flow = [
    { label: "ISSUE", detail: "Something changed" },
    { label: "UNDERSTAND", detail: "What changed? Where else?" },
    { label: "DECIDE", detail: "What do we do now?" },
    { label: "ACT", detail: "What did the team actually do?" },
    { label: "OUTCOME", detail: "Did it work?" },
    { label: "REUSE", detail: "What should we do next time?" },
  ];

  return (
    <div className="w-full">
      <svg
        viewBox="0 0 960 260"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="10" stdDeviation="16" floodColor="hsl(var(--foreground))" floodOpacity="0.07" />
          </filter>
        </defs>

        {flow.map((item, i) => {
          const x = 34 + i * 150;
          const active = i === 4 || i === 5;
          return (
            <g key={item.label}>
              <rect x={x} y="82" width="128" height="92" rx="18" fill={active ? "hsl(var(--primary) / 0.06)" : "hsl(var(--background))"} stroke={active ? "hsl(var(--primary) / 0.35)" : "hsl(var(--border))"} filter="url(#softShadow)" />
              <text x={x + 64} y="113" textAnchor="middle" className="font-mono" fontSize="10" letterSpacing="1.4" fill={active ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}>
                {item.label}
              </text>
              {item.detail.split(" ").length > 3 ? (
                <>
                  <text x={x + 64} y="139" textAnchor="middle" fontSize="12" fill="hsl(var(--foreground))">{item.detail.split(" ").slice(0, 3).join(" ")}</text>
                  <text x={x + 64} y="158" textAnchor="middle" fontSize="12" fill="hsl(var(--foreground))">{item.detail.split(" ").slice(3).join(" ")}</text>
                </>
              ) : (
                <text x={x + 64} y="148" textAnchor="middle" fontSize="12" fill="hsl(var(--foreground))">{item.detail}</text>
              )}
              {i < flow.length - 1 && (
                <>
                  <path d={`M ${x + 128} 128 L ${x + 146} 128`} stroke="hsl(var(--border))" strokeWidth="1.4" />
                  <path d={`M ${x + 144} 122 L ${x + 151} 128 L ${x + 144} 134`} fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.4" />
                </>
              )}
            </g>
          );
        })}

        <path d="M 856 178 C 790 238, 174 238, 96 178" fill="none" stroke="hsl(var(--primary) / 0.38)" strokeDasharray="5 8" strokeWidth="1.4" />
        <text x="480" y="230" textAnchor="middle" className="font-mono" fontSize="10" letterSpacing="1.6" fill="hsl(var(--primary))">
          EVERY CASE MAKES THE NEXT ONE EASIER TO HANDLE
        </text>
      </svg>

      <p className="mt-6 border-t border-border pt-4 text-[13px] leading-relaxed text-muted-foreground">
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
      detail: "R03 and R05 begin showing abnormal grip pose drift after the same software update.",
      focus: ["2 affected machines", "first signal 14:11", "engineer note 14:26"],
    },
    {
      n: "02",
      label: "Reconstruct",
      title: "See the relevant machine context.",
      detail: "Veyra brings software, configuration, machine state and service history into one case.",
      focus: ["policy v0.8 → v0.9", "camera calibration B → C", "gripper firmware 7.2 → 7.3"],
    },
    {
      n: "03",
      label: "Compare",
      title: "Understand what differs between affected and healthy machines.",
      detail: "The same software ran everywhere. Calibration C and gripper firmware 7.3 concentrate on the affected machines.",
      focus: ["2 affected", "4 healthy", "R06 exposed but healthy"],
    },
    {
      n: "04",
      label: "Decide",
      title: "See what is known, uncertain and actionable.",
      detail: "The team can act while preserving what was known and what remained unresolved.",
      focus: ["known: R03/R05 affected", "unknown: R06 later behavior", "option: pause rollout"],
    },
    {
      n: "05",
      label: "Act",
      title: "Record what the team actually does.",
      detail: "Decision and execution are separated: pause rollout, roll back affected machines, monitor exposed machines.",
      focus: ["roll back R03/R05", "monitor R06", "support notified"],
    },
    {
      n: "06",
      label: "Measure",
      title: "Track whether the action worked.",
      detail: "The case follows recovery, recurrence, field visits and rollout impact after the action.",
      focus: ["R03 recovered", "R05 recovered", "field visit avoided"],
    },
    {
      n: "07",
      label: "Reuse",
      title: "Bring back what worked before.",
      detail: "When a similar case appears again, Veyra surfaces the previous action, outcome and missing evidence.",
      focus: ["similar case found", "rollback worked", "check config before dispatch"],
    },
  ];
  const [active, setActive] = useState(0);
  const current = steps[active];

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-[0_1px_0_hsl(var(--border)),0_30px_60px_-30px_hsl(var(--foreground)/0.15)]">
      <div className="border-b border-border px-4 py-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Case workspace
            </div>
            <div className="mt-1 text-[13px] text-muted-foreground">
              Post-update machine behavior · live operational case
            </div>
          </div>
          <nav className="flex flex-wrap gap-2">
            {steps.map((step, index) => (
              <button
                key={step.label}
                onClick={() => setActive(index)}
                className={`rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${
                  active === index
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                }`}
              >
                {step.n} {step.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="grid min-h-[620px] lg:grid-cols-[250px_1fr_320px]">
        <aside className="border-b border-border bg-surface/40 p-5 lg:border-b-0 lg:border-r">
          <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Active cases
          </div>
          <div className="mt-4 space-y-3">
            {[
              ["R03 / R05", "Post-update anomaly", "OPEN · HIGH"],
              ["R12", "Similar drift pattern", "WATCH"],
              ["Line B", "Outcome follow-up", "DUE"],
            ].map(([asset, title, status], index) => (
              <button
                key={asset}
                onClick={() => index === 0 && setActive(0)}
                className={`w-full rounded-xl border p-4 text-left transition-colors ${
                  index === 0
                    ? "border-foreground/30 bg-background"
                    : "border-border bg-background/60 hover:border-foreground/20"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[13px] font-semibold text-foreground">{asset}</span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">{status}</span>
                </div>
                <p className="mt-2 text-[12px] text-muted-foreground">{title}</p>
              </button>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-primary/25 bg-primary/[0.035] p-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary/80">
              Needs attention
            </div>
            <p className="mt-3 text-[12px] leading-relaxed text-muted-foreground">
              R06 shares the exposure and needs follow-up after the first action.
            </p>
          </div>
        </aside>

        <main className="p-5 sm:p-7">
          <div className="mb-5 rounded-2xl border border-border bg-surface/40 p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  Operational case
                </div>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                  R03 / R05 anomaly after release v0.9
                </h3>
                <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-muted-foreground">
                  R03 and R05 began showing abnormal behavior within 20 minutes of release v0.9. Both share camera calibration C and gripper firmware 7.3. Four comparable machines remain healthy.
                </p>
              </div>
              <div className="rounded-full border border-border bg-background px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground">
                Open · action pending
              </div>
            </div>
          </div>

          <div className="grid gap-5 xl:grid-cols-[1fr_280px]">
            <section className="rounded-2xl border border-border bg-background p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground font-mono text-[11px] text-background">
                  {current.n}
                </span>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {current.label}
                  </div>
                  <h4 className="text-[22px] font-semibold tracking-tight text-foreground">
                    {current.title}
                  </h4>
                </div>
              </div>
              <p className="mt-5 max-w-2xl text-[14px] leading-relaxed text-muted-foreground">
                {current.detail}
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {current.focus.map((item) => (
                  <div key={item} className="rounded-xl border border-border bg-surface/50 p-4">
                    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                      Evidence
                    </div>
                    <div className="mt-2 text-[13px] font-medium leading-snug text-foreground">
                      {item}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 overflow-hidden rounded-xl border border-border">
                <div className="grid grid-cols-4 border-b border-border bg-surface/50 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  <span>Machine</span>
                  <span>Status</span>
                  <span>Release</span>
                  <span>Profile</span>
                </div>
                {[
                  ["R03", "affected", "v0.9", "C · fw 7.3"],
                  ["R05", "affected", "v0.9", "C · fw 7.3"],
                  ["R06", "healthy / exposed", "v0.9", "C · fw 7.3"],
                  ["R01", "healthy", "v0.9", "B · fw 7.2"],
                  ["R02", "healthy", "v0.9", "B · fw 7.2"],
                ].map((row) => (
                  <div key={row[0]} className="grid grid-cols-4 border-b border-border px-4 py-3 text-[12px] last:border-b-0">
                    <span className="font-mono text-foreground">{row[0]}</span>
                    <span className={row[1].includes("affected") ? "text-destructive" : "text-muted-foreground"}>{row[1]}</span>
                    <span className="text-muted-foreground">{row[2]}</span>
                    <span className="text-foreground">{row[3]}</span>
                  </div>
                ))}
              </div>
            </section>

            <aside className="space-y-4">
              <div className="rounded-2xl border border-border bg-background p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  Fleet overview
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {Array.from({ length: 18 }).map((_, index) => {
                    const affected = index === 2 || index === 4;
                    const exposed = index === 5 || index === 11 || index === 15;
                    return (
                      <span
                        key={index}
                        className={`h-8 rounded-md border ${
                          affected
                            ? "border-destructive/40 bg-destructive/15"
                            : exposed
                              ? "border-primary/35 bg-primary/10"
                              : "border-border bg-surface"
                        }`}
                      />
                    );
                  })}
                </div>
                <div className="mt-4 space-y-2 text-[12px] text-muted-foreground">
                  <div className="flex justify-between"><span>affected</span><b className="text-foreground">2</b></div>
                  <div className="flex justify-between"><span>same profile</span><b className="text-foreground">5</b></div>
                  <div className="flex justify-between"><span>same release</span><b className="text-foreground">17</b></div>
                </div>
              </div>

              <div className="rounded-2xl border border-primary/25 bg-primary/[0.035] p-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary/80">
                  Memory layer
                </div>
                <p className="mt-3 text-[13px] leading-relaxed text-foreground">
                  Similar case 12 days ago: rollback recovered affected machines and avoided a field visit.
                </p>
                <div className="mt-4 rounded-xl border border-primary/20 bg-background/70 p-3 text-[12px] text-muted-foreground">
                  Next case starts with the prior action and outcome, not a blank investigation.
                </div>
              </div>
            </aside>
          </div>
        </main>
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
              and learn from what actually worked across deployed physical
              systems.
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
          <div className="mb-16 max-w-2xl">
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-4">
              Workflows
            </p>
            <p className="text-[17px] text-muted-foreground leading-relaxed">
              When a machine changes, the team has to answer four questions.
            </p>
            <div className="mt-6 grid gap-2 font-mono text-[12px] uppercase tracking-[0.14em] text-foreground">
              <span>What changed?</span>
              <span>Where else is this happening?</span>
              <span>What should we do?</span>
              <span>Did it work?</span>
            </div>
            <p className="mt-6 text-[17px] text-muted-foreground leading-relaxed">
              Today, those answers are usually spread across telemetry,
              deployments, configuration, service systems, tickets and people.
            </p>
            <p className="mt-3 text-[17px] text-muted-foreground leading-relaxed">
              Veyra brings them into one operational case.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {workflows.map((w, i) => (
              <motion.div
                key={w.tag}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="rounded-2xl border border-border bg-background p-8 hover:border-foreground/30 transition-colors"
              >
                <div className="text-[11px] font-mono tracking-[0.15em] uppercase text-muted-foreground mb-6">
                  {w.tag}
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

          {/* Workflow banner */}
          <div className="mb-8 rounded-2xl border border-border bg-surface/50 p-4 sm:p-6">
            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
              {[
                ["01", "Detect"],
                ["02", "Reconstruct"],
                ["03", "Compare"],
                ["04", "Decide"],
                ["05", "Act"],
                ["06", "Measure"],
                ["07", "Reuse"],
              ].map(([n, step]) => (
                <li key={step} className="rounded-xl border border-border bg-background px-3 py-3">
                  <span className="font-mono text-[9px] tracking-[0.16em] uppercase text-muted-foreground">
                    {n}
                  </span>
                  <div className="mt-2 text-[12px] font-medium leading-snug text-foreground">
                    {step}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <ProductWorkspace />

          {/* Deployment & privacy note */}
          <p className="mt-6 max-w-3xl text-[13px] leading-relaxed text-muted-foreground">
            Veyra runs alongside your existing operational systems. Raw operational
            data stays in your environment.
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
            6–8 week design partner deployment
          </h2>

          <ol className="grid gap-4 md:grid-cols-5 mb-12">
            {[
              { n: "01", t: "Choose one recurring operational problem", d: "Pick one class of machine issue your team already investigates repeatedly." },
              { n: "02", t: "Connect the minimum data", d: "Read-only access to the few sources needed to understand the case — deployment, configuration, machine state and service data." },
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
            If Veyra becomes part of the team's real operational workflow, we
            move into a production deployment.
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
