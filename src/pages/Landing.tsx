import { motion } from "framer-motion";
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

const workflows = [
  { tag: "Industrial Deployment", title: "Deployment Readiness" },
  { tag: "Physical AI Operations", title: "Operational Review" },
  { tag: "Machine Finance", title: "Financing Readiness" },
];

/* ---------- How it works: living flow visualization ---------- */
const FlowVisualization = () => {
  // 6 source paths on the left → converge to Veyra core → 6 workflow paths on the right
  const leftPaths = [
    "M 40 60  C 180 60,  260 260, 400 260",
    "M 40 120 C 200 120, 280 260, 400 260",
    "M 40 180 C 220 180, 320 260, 400 260",
    "M 40 240 C 240 240, 340 260, 400 260",
    "M 40 320 C 240 320, 340 260, 400 260",
    "M 40 400 C 220 400, 300 260, 400 260",
    "M 40 460 C 200 460, 280 260, 400 260",
  ];
  const rightPaths = [
    "M 400 260 C 540 260, 620 60,  760 60",
    "M 400 260 C 560 260, 640 120, 760 120",
    "M 400 260 C 580 260, 660 180, 760 180",
    "M 400 260 C 600 260, 700 260, 760 260",
    "M 400 260 C 580 260, 660 340, 760 340",
    "M 400 260 C 560 260, 640 400, 760 400",
    "M 400 260 C 540 260, 620 460, 760 460",
  ];

  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 800 520"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.35" />
            <stop offset="60%" stopColor="hsl(var(--primary))" stopOpacity="0.06" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="particle" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Soft core glow */}
        <circle cx="400" cy="260" r="180" fill="url(#coreGlow)" />

        {/* Left endpoints (Systems) — quiet dots */}
        {[60, 120, 180, 240, 320, 400, 460].map((y) => (
          <circle key={`ls-${y}`} cx="40" cy={y} r="2" fill="hsl(var(--muted-foreground))" opacity="0.5" />
        ))}
        {/* Right endpoints (Workflows) */}
        {[60, 120, 180, 260, 340, 400, 460].map((y) => (
          <circle key={`rs-${y}`} cx="760" cy={y} r="2" fill="hsl(var(--muted-foreground))" opacity="0.5" />
        ))}

        {/* Paths */}
        {[...leftPaths, ...rightPaths].map((d, i) => (
          <path
            key={i}
            id={`p${i}`}
            d={d}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="1"
          />
        ))}

        {/* Core node */}
        <circle cx="400" cy="260" r="6" fill="hsl(var(--primary))" />
        <circle cx="400" cy="260" r="14" fill="none" stroke="hsl(var(--primary))" strokeOpacity="0.35" strokeWidth="1">
          <animate attributeName="r" values="12;22;12" dur="6s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.4;0;0.4" dur="6s" repeatCount="indefinite" />
        </circle>

        {/* Flowing particles — desynchronized so no visible loop */}
        {[...leftPaths, ...rightPaths].map((_, i) => {
          const dur = 7 + (i % 5) * 1.7;
          const delay = -(i * 0.9);
          return (
            <g key={`pt-${i}`}>
              <circle r="2.2" fill="hsl(var(--primary))">
                <animateMotion dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite">
                  <mpath href={`#p${i}`} />
                </animateMotion>
                <animate attributeName="opacity" values="0;1;1;0" dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" />
              </circle>
            </g>
          );
        })}
        {/* Second wave particles */}
        {[...leftPaths, ...rightPaths].map((_, i) => {
          const dur = 9 + (i % 4) * 1.3;
          const delay = -(i * 1.6 + 3);
          return (
            <circle key={`pt2-${i}`} r="1.6" fill="hsl(var(--primary))" opacity="0.7">
              <animateMotion dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite">
                <mpath href={`#p${i}`} />
              </animateMotion>
              <animate attributeName="opacity" values="0;0.8;0.8;0" dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" />
            </circle>
          );
        })}
      </svg>

      {/* Labels */}
      <div className="absolute inset-0 flex items-center justify-between px-2 md:px-6 pointer-events-none">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Systems</span>
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-foreground">Veyra</span>
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Workflows</span>
      </div>
    </div>
  );
};

/* ---------- Product workspace mock ---------- */
const ProductWorkspace = () => {
  const events = [
    { t: "14:32:08", id: "run_9f4a", label: "Autonomous yard truck · Fleet A", tag: "nominal", dur: "42m" },
    { t: "14:18:51", id: "run_9f3c", label: "Sorting cell · Line 3", tag: "review", dur: "1h 12m" },
    { t: "13:47:22", id: "run_9f2b", label: "Perception stack · rev 218", tag: "nominal", dur: "26m" },
    { t: "13:11:04", id: "run_9f1a", label: "Autonomous yard truck · Fleet A", tag: "incident", dur: "8m" },
    { t: "12:44:39", id: "run_9f09", label: "Warehouse robot · WR-14", tag: "nominal", dur: "3h 04m" },
    { t: "12:02:17", id: "run_9ef7", label: "Delivery drone · DR-002", tag: "nominal", dur: "51m" },
    { t: "11:38:55", id: "run_9ee4", label: "Sorting cell · Line 3", tag: "nominal", dur: "1h 22m" },
    { t: "10:51:20", id: "run_9ed1", label: "Perception stack · rev 217", tag: "review", dur: "18m" },
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
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="ml-3 font-mono text-[11px] text-muted-foreground">veyra · workspace</span>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <Search size={13} />
          <Bell size={13} />
          <Settings size={13} />
        </div>
      </div>

      <div className="grid grid-cols-[180px_1fr_260px] min-h-[520px]">
        {/* Left nav */}
        <div className="border-r border-border py-4 px-3 text-[12px]">
          <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground px-2 mb-2">Workspace</div>
          <ul className="space-y-0.5 mb-6">
            {[
              { icon: Activity, label: "Timeline", active: true },
              { icon: LayoutGrid, label: "Fleets" },
              { icon: GitBranch, label: "Runs" },
              { icon: FileText, label: "Reviews" },
            ].map((n) => (
              <li key={n.label}>
                <div className={`flex items-center gap-2 px-2 py-1.5 rounded-md ${n.active ? "bg-foreground/[0.06] text-foreground" : "text-muted-foreground"}`}>
                  <n.icon size={13} />
                  <span>{n.label}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground px-2 mb-2">Workflows</div>
          <ul className="space-y-0.5 text-muted-foreground">
            {["Deployment Readiness", "Operational Review", "Financing Readiness"].map((w) => (
              <li key={w} className="flex items-center gap-2 px-2 py-1.5">
                <CircleDot size={11} />
                <span className="truncate">{w}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Timeline */}
        <div className="min-w-0">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <div>
              <div className="text-[13px] font-semibold text-foreground">Operational history</div>
              <div className="font-mono text-[11px] text-muted-foreground">Today · 240 runs · 3 under review</div>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
              <span className="px-2 py-1 rounded-md bg-foreground/[0.05] text-foreground">24h</span>
              <span className="px-2 py-1">7d</span>
              <span className="px-2 py-1">30d</span>
            </div>
          </div>

          {/* Sparkline */}
          <div className="px-5 pt-4">
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
                className={`grid grid-cols-[80px_1fr_90px_60px_20px] items-center gap-3 px-5 py-2.5 text-[12px] border-t border-border ${i === 1 ? "bg-primary/[0.04]" : ""}`}
              >
                <span className="font-mono text-[11px] text-muted-foreground">{e.t}</span>
                <div className="min-w-0">
                  <div className="text-foreground truncate">{e.label}</div>
                  <div className="font-mono text-[10px] text-muted-foreground">{e.id}</div>
                </div>
                <span className={`justify-self-start rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${tagStyles[e.tag]}`}>{e.tag}</span>
                <span className="font-mono text-[11px] text-muted-foreground tabular-nums">{e.dur}</span>
                <ChevronRight size={13} className="text-muted-foreground justify-self-end" />
              </li>
            ))}
          </ul>
        </div>

        {/* Right details panel */}
        <div className="border-l border-border p-5 text-[12px]">
          <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-2">Run</div>
          <div className="text-[13px] font-semibold text-foreground mb-1">run_9f3c</div>
          <div className="text-muted-foreground mb-5">Sorting cell · Line 3</div>

          <dl className="space-y-3 mb-5">
            {[
              ["Duration", "1h 12m"],
              ["Uptime", "99.2%"],
              ["Interventions", "2"],
              ["Signals", "1,284"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="text-foreground font-mono tabular-nums">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-2">Evidence</div>
          <ul className="space-y-1.5 text-muted-foreground">
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />telemetry · normalized</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />deployment · rev 218</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />events · 34 recorded</li>
          </ul>

          <button className="mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-foreground text-background px-3 py-2 text-[11px] font-medium">
            Open review <ArrowRight size={12} />
          </button>
        </div>
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
              Operational evidence for{" "}
              <span className="text-primary">Physical AI</span>.
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
              An operational workspace for understanding systems in production.
            </p>

            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-5 py-3 text-[13px] font-medium hover:bg-foreground/90 transition-colors"
            >
              Request Pilot
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* WORKFLOWS */}
      <section id="workflows" className="border-t border-border">
        <div className="container mx-auto px-6 py-28 max-w-6xl">
          <div className="mb-16">
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-4">
              Workflows
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

      {/* HOW IT WORKS */}
      <section id="how" className="border-t border-border bg-surface/50">
        <div className="container mx-auto px-6 py-28 max-w-6xl">
          <div className="mb-16 max-w-2xl">
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-4">
              How Veyra works
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
          <ProductWorkspace />
        </div>
      </section>

      {/* PILOT CTA */}
      <section className="border-t border-border">
        <div className="container mx-auto px-6 py-32 max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.1] mb-10">
            Looking for early design partners building Physical AI systems.
          </h2>
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