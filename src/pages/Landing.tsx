import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import Layout from "@/components/Layout";

const workflows = [
  {
    tag: "RECONSTRUCT",
    title: "Understand What Changed",
    description:
      "Bring together machine state, software/config changes, service actions and what the team knew at the time.",
  },
  {
    tag: "COMPARE",
    title: "Find Where Else",
    description:
      "See where the same conditions appear across other deployed systems and environments.",
  },
  {
    tag: "LEARN",
    title: "Carry Decisions Forward",
    description:
      "Preserve what the team decided, what happened afterwards, and which context may matter the next time a similar case appears.",
  },
];

const FlowVisualization = () => {
  const machineContext = ["Runtime state", "Software", "Configuration", "Environment"];
  const humanContext = ["Service actions", "Operator interventions", "Team observations", "Hypotheses / decisions"];
  const flow = [
    { label: "RECONSTRUCT", detail: "what changed" },
    { label: "DECISION CONTEXT", detail: "what was known / missing" },
    { label: "HUMAN DECISION", detail: "hold · inspect · rollback" },
    { label: "OUTCOME", detail: "fixed · recurring · unrelated" },
    { label: "OPERATIONAL MEMORY", detail: "reusable context" },
    { label: "WHERE ELSE?", detail: "similar cases across systems and deployments" },
  ];

  return (
    <div className="w-full">
      <svg
        viewBox="0 0 920 620"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="10" stdDeviation="16" floodColor="hsl(var(--foreground))" floodOpacity="0.07" />
          </filter>
        </defs>

        <text x="160" y="48" textAnchor="middle" className="font-mono" fontSize="11" letterSpacing="2" fill="hsl(var(--muted-foreground))">
          MACHINE CONTEXT
        </text>
        <text x="760" y="48" textAnchor="middle" className="font-mono" fontSize="11" letterSpacing="2" fill="hsl(var(--muted-foreground))">
          HUMAN / OPERATIONAL CONTEXT
        </text>

        {machineContext.map((label, i) => (
          <g key={label}>
            <rect x="64" y={80 + i * 58} width="192" height="38" rx="11" fill="hsl(var(--background))" stroke="hsl(var(--border))" />
            <text x="160" y={104 + i * 58} textAnchor="middle" fontSize="12" fill="hsl(var(--foreground))">{label}</text>
            <path id={`machine-${i}`} d={`M 256 ${99 + i * 58} C 340 ${99 + i * 58}, 338 170, 432 170`} fill="none" stroke="hsl(var(--border))" strokeWidth="1" />
            <circle r="2.4" fill="hsl(var(--primary) / 0.75)">
              <animateMotion dur={`${7 + i}s`} begin={`${-i * 0.6}s`} repeatCount="indefinite">
                <mpath href={`#machine-${i}`} />
              </animateMotion>
            </circle>
          </g>
        ))}

        {humanContext.map((label, i) => (
          <g key={label}>
            <rect x="664" y={80 + i * 58} width="208" height="38" rx="11" fill="hsl(var(--background))" stroke="hsl(var(--border))" />
            <text x="768" y={104 + i * 58} textAnchor="middle" fontSize="12" fill="hsl(var(--foreground))">{label}</text>
            <path id={`human-${i}`} d={`M 664 ${99 + i * 58} C 580 ${99 + i * 58}, 582 170, 488 170`} fill="none" stroke="hsl(var(--border))" strokeWidth="1" />
            <circle r="2.4" fill="hsl(var(--primary) / 0.75)">
              <animateMotion dur={`${8 + i}s`} begin={`${-i * 0.7}s`} repeatCount="indefinite">
                <mpath href={`#human-${i}`} />
              </animateMotion>
            </circle>
          </g>
        ))}

        <rect x="342" y="132" width="236" height="76" rx="18" fill="hsl(var(--background))" stroke="hsl(var(--foreground) / 0.4)" filter="url(#softShadow)" />
        <text x="460" y="164" textAnchor="middle" className="font-mono" fontSize="11" letterSpacing="1.8" fill="hsl(var(--muted-foreground))">
          COSTLY MACHINE DECISION
        </text>
        <text x="460" y="187" textAnchor="middle" fontSize="20" fontWeight="600" fill="hsl(var(--foreground))">
          Decision Context
        </text>

        {flow.map((item, i) => {
          const y = 250 + i * 55;
          return (
            <g key={item.label}>
              {i > 0 && <path d={`M 460 ${y - 17} L 460 ${y - 2}`} stroke="hsl(var(--border))" strokeWidth="1" />}
              <rect x="304" y={y} width="312" height="42" rx="13" fill={i === 4 ? "hsl(var(--primary) / 0.06)" : "hsl(var(--surface))"} stroke={i === 4 ? "hsl(var(--primary) / 0.35)" : "hsl(var(--border))"} />
              <text x="382" y={y + 26} textAnchor="middle" className="font-mono" fontSize="10" letterSpacing="1.4" fill={i === 4 ? "hsl(var(--primary))" : "hsl(var(--foreground))"}>
                {item.label}
              </text>
              <text x="510" y={y + 26} textAnchor="middle" fontSize="11" fill="hsl(var(--muted-foreground))">
                {item.detail}
              </text>
            </g>
          );
        })}

        <path d="M 616 567 C 760 560, 812 410, 620 384" fill="none" stroke="hsl(var(--primary) / 0.45)" strokeDasharray="5 8" strokeWidth="1.4" />
        <text x="736" y="490" textAnchor="middle" className="font-mono" fontSize="10" letterSpacing="1.6" fill="hsl(var(--primary))">
          LEARNING LOOP
        </text>
      </svg>

      <p className="mt-6 border-t border-border pt-4 text-[13px] leading-relaxed text-muted-foreground">
        Every reviewed decision becomes structured context for the next one.
      </p>
    </div>
  );
};

/* ---------- Product episode canvas mock ---------- */
const ProductWorkspace = () => {
  const events = [
    { t: "09:13", title: "Runtime anomaly detected", kind: "OBSERVED", side: "left" },
    { t: "09:14", title: "Runtime snapshot captured", kind: "OBSERVED", side: "right" },
    { t: "09:17", title: "Maintenance intervention", kind: "INTERVENTION", side: "left" },
    { t: "09:18", title: "Engineer observation added", kind: "HUMAN", side: "right", active: true },
    { t: "09:26", title: "Vibration returned within baseline", kind: "DERIVED", side: "left" },
    { t: "09:31", title: "Inspection completed", kind: "OBSERVED", side: "right" },
    { t: "09:34", title: "Working hypothesis weakened", kind: "COUNTEREVIDENCE", side: "left" },
    { t: "09:44", title: "Continue operation under observation", kind: "DECISION", side: "right" },
    { t: "13:44", title: "No recurrence after four hours", kind: "OUTCOME", side: "left" },
  ];
  const kindStyles: Record<string, string> = {
    OBSERVED: "border-foreground/30 text-foreground",
    INTERVENTION: "border-primary/40 text-primary",
    HUMAN: "border-foreground bg-foreground text-background",
    DERIVED: "border-primary/40 text-primary",
    COUNTEREVIDENCE: "border-destructive/40 text-destructive",
    DECISION: "border-foreground/40 text-foreground",
    OUTCOME: "border-primary/40 bg-primary/[0.06] text-primary",
  };

  return (
    <div className="rounded-2xl border border-border bg-background overflow-hidden shadow-[0_1px_0_hsl(var(--border)),0_30px_60px_-30px_hsl(var(--foreground)/0.15)]">
      <div className="border-b border-border px-4 sm:px-6 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
              Line A Conveyor · Decision Review
            </div>
            <div className="mt-1 text-[13px] text-muted-foreground">
              Today · 11 evidence records · 218 days of related history
            </div>
          </div>
          <nav className="flex gap-4 font-mono text-[10px] tracking-[0.14em] uppercase text-muted-foreground">
            {["Timeline", "Context", "Similar Cases", "Decisions", "History"].map((item, index) => (
              <span key={item} className={index === 0 ? "text-foreground" : ""}>{item}</span>
            ))}
          </nav>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-4 border-b border-border">
        <ol className="flex flex-wrap items-center gap-x-3 gap-y-2">
          {["Runtime", "Evidence", "Context", "Decision", "Memory"].map((step, i, arr) => (
            <li key={step} className="flex items-center gap-3">
              <span className={`font-mono text-[10px] tracking-[0.15em] uppercase ${i === 2 ? "text-foreground" : "text-muted-foreground"}`}>
                {step}
              </span>
              {i < arr.length - 1 && <ChevronRight size={12} className="text-muted-foreground/50" />}
            </li>
          ))}
        </ol>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-0">
        <div className="min-h-[620px] p-6 sm:p-8 overflow-hidden">
          <div className="grid gap-5 lg:grid-cols-[220px_1fr_240px]">
            <div className="rounded-2xl border border-border bg-background p-4 self-start">
              <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-3">
                Context constellation
              </div>
              {[
                "Machine state · autonomous mode",
                "Software rev 218 · config C17",
                "Inspection WO-4471",
                "Vibration RMS 0.31 mm/s",
              ].map((item) => (
                <div key={item} className="border-t border-border py-2 text-[12px] text-muted-foreground first:border-t-0">
                  {item}
                </div>
              ))}
            </div>

            <div className="relative min-h-[560px]">
          <div className="absolute left-1/2 top-8 bottom-8 w-px bg-border" />
          <div className="absolute left-1/2 top-[300px] -translate-x-1/2 h-3 w-3 rounded-full bg-foreground ring-8 ring-background" />

          <div className="relative mx-auto max-w-3xl">
            {events.map((event, index) => (
              <div
                key={`${event.t}-${event.title}`}
                className={`relative grid grid-cols-[1fr_34px_1fr] items-center min-h-[58px] ${
                  event.active ? "my-3" : ""
                }`}
              >
                <div className={event.side === "left" ? "pr-5 text-right" : "col-start-3 pl-5"}>
                  <div
                    className={`inline-block rounded-xl border bg-background px-4 py-3 text-left ${
                      event.active ? "border-foreground shadow-[0_16px_40px_-28px_hsl(var(--foreground))]" : "border-border"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] tabular-nums text-muted-foreground">{event.t}</span>
                      <span className={`rounded-full border px-2 py-0.5 font-mono text-[8.5px] tracking-[0.12em] ${kindStyles[event.kind]}`}>
                        {event.kind}
                      </span>
                    </div>
                    <div className="mt-1 text-[13px] leading-snug text-foreground">{event.title}</div>
                  </div>
                </div>
                <div className="col-start-2 flex justify-center">
                  <span className={`h-2.5 w-2.5 rounded-full border bg-background ${event.active ? "border-foreground" : "border-muted-foreground/40"}`} />
                </div>
              </div>
            ))}
          </div>
            </div>

          <div className="rounded-2xl border border-primary/30 bg-primary/[0.035] p-4 self-start">
            <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-primary/70 mb-3">
              Engineering note
            </div>
            <p className="text-[12px] leading-relaxed text-foreground/80">
              Elevated vibration appeared after restart. Belt tension suspected; not established.
            </p>
            <div className="mt-3 space-y-1.5 font-mono text-[10px] text-muted-foreground">
              <div>OBSERVATION → elevated vibration</div>
              <div>HYPOTHESIS → belt tension involvement</div>
              <div>INTERVENTION → inspection</div>
              <div>OUTCOME → returned to baseline</div>
            </div>
          </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-5 text-[11px] text-muted-foreground">
            {[
              ["19 May", "similar signal"],
              ["27 Apr", "tension arm reseated"],
              ["14 Mar", "four-hour stoppage"],
              ["02 Feb", "belt adjusted"],
              ["11 Jan", "housing inspected"],
            ].map(([date, detail]) => (
              <div key={date} className="rounded-xl border border-border bg-surface/50 px-3 py-3">
                <div className="font-mono text-[10px] text-foreground">{date}</div>
                <div className="mt-1">{detail}</div>
              </div>
            ))}
          </div>
        </div>

        <aside className="border-t xl:border-t-0 xl:border-l border-border p-6">
          <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-5">
            What was known at 09:18
          </div>
          <div className="space-y-5">
            <div>
              <div className="text-[12px] font-medium text-foreground mb-2">Established</div>
              <ul className="space-y-1.5 text-[12px] leading-relaxed text-muted-foreground">
                <li>abnormal vibration occurred</li>
                <li>software rev 218 active</li>
              </ul>
            </div>
            <div>
              <div className="text-[12px] font-medium text-foreground mb-2">Working hypothesis</div>
              <p className="text-[12px] leading-relaxed text-muted-foreground">belt tension may be involved</p>
            </div>
            <div>
              <div className="text-[12px] font-medium text-foreground mb-2">Unknown</div>
              <p className="text-[12px] leading-relaxed text-muted-foreground">whether restart caused the behavior</p>
            </div>
            <div>
              <div className="text-[12px] font-medium text-foreground mb-2">Counterevidence</div>
              <p className="text-[12px] leading-relaxed text-muted-foreground">
                same vibration profile previously occurred without belt tension fault
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface/60 px-4 py-3">
              <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-3">
                Last known good
              </div>
              <div className="space-y-2 text-[12px]">
                {[
                  ["Revision", "rev 217"],
                  ["Config", "C16"],
                  ["Validated", "08:42"],
                  ["Tests", "3 successful cycles"],
                  ["Exceptions", "no Redis storm"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-3">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-mono text-foreground text-right">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-primary/30 bg-primary/[0.035] px-4 py-3">
              <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-primary/70 mb-3">
                Preserve for next time
              </div>
              <div className="grid gap-4 text-[12px] leading-relaxed">
                <div>
                  <div className="mb-2 font-medium text-foreground">Already available</div>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>software version</li>
                    <li>configuration</li>
                    <li>runtime alarm</li>
                  </ul>
                </div>
                <div className="border-t border-primary/20 pt-3">
                  <div className="mb-2 font-medium text-foreground">Should be preserved next time</div>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>pre-event controller state</li>
                    <li>intervention reason</li>
                    <li>config diff</li>
                    <li>local state during connectivity loss</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="border-t border-border pt-5">
              <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-3">
                Review state
              </div>
              <div className="text-[13px] text-foreground">Under review</div>
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-3">
                Evidence coverage
              </div>
              <div className="space-y-2 text-[12px]">
                {[
                  ["Runtime", "complete"],
                  ["Software/config", "complete"],
                  ["Engineering context", "partial"],
                  ["Outcome", "observed"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-3 border-b border-border pb-2 last:border-b-0">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-mono text-foreground">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-border pt-5">
              <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-2">
                Current understanding
              </div>
              <p className="text-[13px] text-foreground">Cause not established</p>
            </div>
          </div>
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
              Operational context for{" "}
              <span className="text-primary">Physical AI</span>.
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
              Veyra reconstructs what machines did, what changed, what people
              knew, and what happened next, giving teams better context for
              every decision.
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-5 py-3 text-[13px] font-medium hover:bg-foreground/90 transition-colors"
            >
              Request Pilot
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
              Operational context is fragmented across systems, teams and time.
              Veyra turns those fragments into a working history teams can
              review, compare and carry forward.
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
              From one costly machine decision to reusable operational memory.
            </h2>
          </div>

          {/* Workflow banner */}
          <div className="mb-8 rounded-2xl border border-border bg-surface/50 p-4 sm:p-6">
            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
              {[
                ["01", "A costly decision appears"],
                ["02", "Reconstruct"],
                ["03", "Challenge the conclusion"],
                ["04", "Where else?"],
                ["05", "Team decision"],
                ["06", "Outcome"],
                ["07", "Learn"],
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
            4-week design partner pilot
          </h2>

          <ol className="grid gap-4 md:grid-cols-4 mb-12">
            {[
              { n: "01", t: "Choose one costly machine decision", d: "Pick one recurring review your team already spends too much time piecing together." },
              { n: "02", t: "Map today’s decision workflow", d: "Where does the team look? What gets lost? What is only known by people?" },
              { n: "03", t: "Connect the minimum sources and reconstruct one real case", d: "Read-only access or exports from the few systems that actually matter." },
              { n: "04", t: "Design what should happen next time", d: "Identify what could not be reconstructed, what should be captured, and what Veyra should make easier in production." },
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
            If the workflow proves useful, we scope a production deployment
            together.
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-6 py-3 text-[13px] font-medium hover:bg-foreground/90 transition-colors"
          >
            Request Pilot <ArrowRight size={14} />
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
