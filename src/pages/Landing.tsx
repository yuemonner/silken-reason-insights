import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Search,
  Activity,
  LayoutGrid,
  GitBranch,
  FileText,
  Settings,
  Bell,
  ChevronRight,
  CircleDot,
} from "lucide-react";
import Layout from "@/components/Layout";
import EvidenceInvestigation from "@/components/EvidenceInvestigation";

const workflows = [
  { tag: "Industrial Deployment", title: "Deployment Readiness" },
  { tag: "Physical AI Operations", title: "Operational Review" },
  { tag: "Machine Finance", title: "Financing Readiness" },
];

/* ---------- Continuous Operations ---------- */
const OPERATIONAL_EVENTS = [
  "Deployment completed",
  "Maintenance scheduled",
  "Runtime recovered",
  "Inspection finished",
  "Charging cycle closed",
  "Firmware revision applied",
  "Mission completed",
  "Intervention resolved",
  "Battery health recorded",
  "Route re-planned",
  "Sensor recalibrated",
  "Shift handover logged",
  "Anomaly cleared",
  "Uptime restored",
];

const LIFECYCLE = {
  inactive: "hsl(var(--muted-foreground) / 0.30)",
  active: "hsl(var(--primary) / 0.7)",
  fresh: "hsl(220 90% 32%)",
} as const;

const FlowVisualization = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  const leftY = [60, 120, 180, 240, 300, 370, 440];
  const rightY = [70, 130, 190, 250, 310, 375, 440];

  const leftPaths = leftY.map(
    (y, i) => `M 40 ${y} C ${170 + i * 12} ${y}, ${280 + i * 8} 250, 400 250`,
  );
  const rightPaths = rightY.map(
    (y, i) => `M 400 250 C ${540 - i * 8} 250, ${640 - i * 12} ${y}, 760 ${y}`,
  );
  const paths = [...leftPaths, ...rightPaths];

  const signals = paths.flatMap((_, i) =>
    [0, 1].map((w) => {
      const seed = i * 7 + w * 13;
      const dur = 10 + ((seed * 5) % 11) + (w ? 3.4 : 0);
      const delay = -((seed * 1.37) % 17);
      const kind =
        seed % 11 === 0 ? "fresh" : seed % 3 === 0 ? "inactive" : "active";
      return { pathIndex: i, key: `${i}-${w}`, dur, delay, kind } as const;
    }),
  );

  const hintY =
    hovered === null
      ? 0
      : hovered < leftPaths.length
        ? leftY[hovered]
        : rightY[hovered - leftPaths.length];

  return (
    <div className="w-full">
      <svg
        viewBox="0 0 800 500"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.09" />
            <stop offset="70%" stopColor="hsl(var(--primary))" stopOpacity="0.02" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="400" cy="250" r="150" fill="url(#coreGlow)" />

        {leftY.map((y) => (
          <circle key={`ls-${y}`} cx="40" cy={y} r="2" fill="hsl(var(--muted-foreground))" opacity="0.4" />
        ))}
        {rightY.map((y) => (
          <circle key={`rs-${y}`} cx="760" cy={y} r="2" fill="hsl(var(--muted-foreground))" opacity="0.4" />
        ))}

        {paths.map((d, i) => (
          <path
            key={i}
            id={`p${i}`}
            d={d}
            fill="none"
            stroke={hovered === i ? "hsl(var(--primary) / 0.4)" : "hsl(var(--border))"}
            strokeWidth="1"
            className="transition-[stroke] duration-500"
          />
        ))}

        {paths.map((d, i) => (
          <path
            key={`h${i}`}
            d={d}
            fill="none"
            stroke="transparent"
            strokeWidth="16"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
          />
        ))}

        <circle cx="400" cy="250" r="5" fill="hsl(var(--foreground))" />
        <circle
          cx="400"
          cy="250"
          r="14"
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeOpacity="0.15"
          strokeWidth="1"
        >
          <animate attributeName="r" values="13;24;13" dur="9s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.18;0;0.18" dur="9s" repeatCount="indefinite" />
        </circle>

        {signals.map((s) => (
          <circle
            key={s.key}
            r={s.kind === "inactive" ? 1.5 : s.kind === "fresh" ? 2.6 : 2.1}
            fill={LIFECYCLE[s.kind]}
          >
            <animateMotion dur={`${s.dur}s`} begin={`${s.delay}s`} repeatCount="indefinite">
              <mpath href={`#p${s.pathIndex}`} />
            </animateMotion>
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.12;0.85;1"
              dur={`${s.dur}s`}
              begin={`${s.delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {hovered !== null && (
          <text
            x={hovered < leftPaths.length ? 40 : 760}
            y={hintY - 14}
            textAnchor={hovered < leftPaths.length ? "start" : "end"}
            className="font-mono"
            fontSize="12"
            fill="hsl(var(--muted-foreground))"
          >
            {OPERATIONAL_EVENTS[hovered % OPERATIONAL_EVENTS.length]}
          </text>
        )}
      </svg>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Systems</span>
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-foreground">Veyra</span>
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Workspace</span>
      </div>
    </div>
  );
};

/* ---------- Product workspace mock ---------- */
const ProductWorkspace = () => {
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const events = [
    { t: "14:32", id: "Inspection Mission #219", label: "Solar Node 017", tag: "nominal", dur: "42m" },
    { t: "14:18", id: "Sorting shift · Line A", label: "Line A Conveyor", tag: "review", dur: "1h 12m" },
    { t: "13:47", id: "Perception rev 218", label: "Robot-21", tag: "nominal", dur: "26m" },
    { t: "13:11", id: "Charging cycle", label: "Charging Station 04", tag: "incident", dur: "8m" },
    { t: "12:44", id: "Warehouse run", label: "AMR-07", tag: "nominal", dur: "3h 04m" },
    { t: "12:02", id: "Survey mission", label: "Drone-14", tag: "nominal", dur: "51m" },
    { t: "11:38", id: "Battery pack B2", label: "Robot Fleet · North", tag: "nominal", dur: "1h 22m" },
    { t: "10:51", id: "Environment scan", label: "Solar Node 022", tag: "review", dur: "18m" },
  ];
  const tagStyles: Record<string, string> = {
    nominal: "bg-foreground/5 text-foreground",
    review: "bg-primary/10 text-primary",
    incident: "bg-destructive/10 text-destructive",
  };

  return (
    <div className="rounded-2xl border border-border bg-background overflow-hidden shadow-[0_1px_0_hsl(var(--border)),0_30px_60px_-30px_hsl(var(--foreground)/0.15)]">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <div className="flex items-center gap-2 min-w-0">
          <span className="h-2.5 w-2.5 rounded-full bg-border shrink-0" />
          <span className="h-2.5 w-2.5 rounded-full bg-border shrink-0" />
          <span className="h-2.5 w-2.5 rounded-full bg-border shrink-0" />
          <span className="ml-3 font-mono text-[11px] text-muted-foreground truncate">veyra · workspace</span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground shrink-0">
          <Search size={13} />
          <Bell size={13} />
          <Settings size={13} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr_280px]">
        {/* Left nav */}
        <div className="hidden lg:block border-r border-border py-4 px-3 text-[12px]">
          <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground px-2 mb-2">Workspace</div>
          <ul className="space-y-0.5 mb-6">
            {[
              { icon: Activity, label: "Timeline", active: true },
              { icon: LayoutGrid, label: "Fleets" },
              { icon: GitBranch, label: "Missions" },
              { icon: FileText, label: "Evidence" },
            ].map((n) => (
              <li key={n.label}>
                <div className={`flex items-center gap-2 px-2 py-1.5 rounded-md ${n.active ? "bg-foreground/[0.06] text-foreground" : "text-muted-foreground"}`}>
                  <n.icon size={13} />
                  <span>{n.label}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground px-2 mb-2">Assets</div>
          <ul className="space-y-0.5 text-muted-foreground">
            {["Robot Fleet · North", "AMR-07", "Solar Node 017", "Charging Station 04", "Drone-14"].map((w) => (
              <li key={w} className="flex items-center gap-2 px-2 py-1.5">
                <CircleDot size={11} className="shrink-0" />
                <span className="truncate">{w}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Timeline */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 sm:px-5 py-3">
            <div className="min-w-0">
              <div className="text-[13px] font-semibold text-foreground">Operational history</div>
              <div className="font-mono text-[11px] text-muted-foreground">Today · 240 records · 3 under review</div>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground shrink-0">
              <span className="px-2 py-1 rounded-md bg-foreground/[0.05] text-foreground">24h</span>
              <span className="px-2 py-1">7d</span>
              <span className="px-2 py-1">30d</span>
            </div>
          </div>

          {/* Sparkline */}
          <div className="px-4 sm:px-5 pt-4">
            <div className="flex items-end gap-[3px] h-14">
              {Array.from({ length: 56 }).map((_, i) => {
                const h = 20 + Math.round(Math.sin(i * 0.4) * 22 + ((i * 37) % 30));
                const isPrimary = i % 9 === 0;
                return (
                  <div
                    key={i}
                    className={`flex-1 rounded-sm ${isPrimary ? "bg-primary/80" : "bg-foreground/15"}`}
                    style={{ height: `${Math.max(8, h)}%` }}
                  />
                );
              })}
            </div>
          </div>

          {/* Event rows */}
          <ul className="mt-4">
            {events.map((e, i) => (
              <li
                key={e.id}
                onClick={() => setEvidenceOpen(true)}
                className={`flex cursor-pointer items-center gap-3 px-4 sm:px-5 py-2.5 text-[12px] border-t border-border transition-colors hover:bg-foreground/[0.03] ${i === 1 ? "bg-primary/[0.04]" : ""}`}
              >
                <span className="font-mono text-[11px] text-muted-foreground shrink-0 tabular-nums">{e.t}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-foreground truncate">{e.label}</div>
                  <div className="font-mono text-[10px] text-muted-foreground truncate">{e.id}</div>
                </div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${tagStyles[e.tag]}`}>{e.tag}</span>
                <span className="hidden sm:inline font-mono text-[11px] text-muted-foreground tabular-nums w-[60px] text-right shrink-0">{e.dur}</span>
                <ChevronRight size={13} className="text-muted-foreground shrink-0" />
              </li>
            ))}
          </ul>
        </div>

        {/* Right evidence panel */}
        <div className="border-t lg:border-t-0 lg:border-l border-border p-5 text-[12px]">
          <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-2">Selected</div>
          <div className="text-[13px] font-semibold text-foreground mb-1">Line A Conveyor</div>
          <div className="text-muted-foreground mb-5">Sorting shift · Line A</div>

          <div className="rounded-xl border border-border p-4 mb-5">
            <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-3">
              Evidence Summary
            </div>
            <dl className="space-y-2.5">
              {[
                ["Verified", "8"],
                ["Missing", "2"],
                ["Confidence", "Medium"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between gap-3">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="text-foreground font-mono tabular-nums">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 border-t border-border pt-3">
              <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-1.5">
                Assessment
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Deployment Ready
              </div>
            </div>
          </div>

          <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-2">Records</div>
          <ul className="space-y-1.5 text-muted-foreground mb-5">
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />Runtime telemetry · normalized</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />Deployment · rev 218</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />Maintenance · 34 events</li>
            <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground/40 shrink-0" />Inspection report · missing</li>
          </ul>

          <dl className="space-y-3 mb-5">
            {[
              ["Uptime", "99.2%"],
              ["Interventions", "2"],
              ["Signals", "1,284"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-3">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="text-foreground font-mono tabular-nums">{v}</dd>
              </div>
            ))}
          </dl>

          <button
            onClick={() => setEvidenceOpen(true)}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-foreground text-background px-3 py-2 text-[11px] font-medium hover:bg-foreground/90 transition-colors"
          >
            Open evidence <ArrowRight size={12} />
          </button>
        </div>
      </div>

      <EvidenceInvestigation open={evidenceOpen} onClose={() => setEvidenceOpen(false)} />
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
              Operational evidence for{" "}
              <span className="text-primary">Physical AI</span>.
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
              An operational workspace for Physical AI and autonomous systems.
              Turn operational history into trusted evidence.
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
              Operational decisions depend on evidence spread across systems, teams and time. Veyra reconstructs that evidence into a decision-ready workflow, so teams can review high-consequence decisions with confidence.
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
              Continuous Operations
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
          </div>

          {/* Workflow banner */}
          <div className="mb-8 rounded-2xl border border-border bg-surface/50 px-4 sm:px-6 py-4">
            <ol className="flex flex-wrap items-center gap-x-3 gap-y-2">
              {[
                "Operational Systems",
                "Connector",
                "Operational History",
                "Evidence",
                "Decision",
              ].map((step, i, arr) => (
                <li key={step} className="flex items-center gap-3">
                  <span
                    className={`font-mono text-[10px] sm:text-[11px] tracking-[0.15em] uppercase ${
                      i === arr.length - 1 ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step}
                  </span>
                  {i < arr.length - 1 && (
                    <ChevronRight size={12} className="text-muted-foreground/60 shrink-0" />
                  )}
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
            We partner with teams operating Physical AI systems at production scale.
          </h2>

          <ol className="grid gap-4 md:grid-cols-4 mb-12">
            {[
              { n: "01", t: "Introduction", d: "30 minutes. Identify one operational decision and the systems behind it." },
              { n: "02", t: "Connect one workflow", d: "Connect the operational systems involved using read-only access. No changes to existing operations." },
              { n: "03", t: "Build operational history", d: "Organize the history, events and records behind that decision." },
              { n: "04", t: "Review one decision", d: "Review one real operational decision together using verified evidence." },
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
