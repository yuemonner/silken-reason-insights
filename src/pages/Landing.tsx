import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Cpu,
  Database,
  ShieldCheck,
  Activity,
  Layers,
  Factory,
  Banknote,
  Boxes,
  CheckCircle2,
  Zap,
} from "lucide-react";
import Layout from "@/components/Layout";
import { articles } from "@/data/articles";

const stats = [
  { k: "3", v: "Evidence layers", d: "Telemetry, deployment, event" },
  { k: "24/7", v: "Runtime signals", d: "Structured, decision-ready" },
  { k: "1", v: "Machine identity", d: "Persistent across systems" },
];

const solutions = [
  {
    icon: Banknote,
    tag: "Machine Finance",
    title: "Underwrite equipment on its actual operating record.",
    body:
      "Replace static PDFs and quarterly reports with continuous, verifiable runtime evidence. Price risk against how machines actually behave.",
  },
  {
    icon: Factory,
    tag: "Industrial Deployment",
    title: "Compare, qualify and deploy physical systems with confidence.",
    body:
      "See how a fleet is performing in the field before you sign. Compress procurement, warranty and rollout cycles from months to weeks.",
  },
  {
    icon: Cpu,
    tag: "Autonomous Operations",
    title: "Give autonomous systems an operating history that can be trusted.",
    body:
      "For AVs, drones, mobile robots and industrial autonomy — a durable identity that survives across operators, jurisdictions and generations.",
  },
];

const principles = [
  {
    title: "Evidence over narrative.",
    body:
      "We move decisions from marketing decks into structured, machine-readable operating records.",
  },
  {
    title: "Operators, not observers.",
    body:
      "Built by engineers who deploy real infrastructure — not analysts describing it from the outside.",
  },
  {
    title: "Durable identity.",
    body:
      "A machine's operating history should outlast any single owner, vendor or software generation.",
  },
  {
    title: "Aesthetic clarity.",
    body:
      "Complex systems deserve calm interfaces. Precision is a design choice, not a graph density.",
  },
];

const platformLayers = [
  {
    icon: Activity,
    title: "Signal ingestion",
    body: "Telemetry, sensor streams, deployment logs and operational events, normalized into one substrate.",
  },
  {
    icon: Database,
    title: "Evidence graph",
    body: "A persistent, queryable record of how each machine, unit and fleet has actually behaved.",
  },
  {
    icon: ShieldCheck,
    title: "Decision workflow",
    body: "Underwriting, procurement and operations flows built directly on top of the evidence graph.",
  },
  {
    icon: Layers,
    title: "Decision Pack API",
    body: "Signed, structured artifacts consumable by lenders, insurers, operators and regulators.",
  },
];

const Landing = () => {
  const latest = [...articles]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

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

        <div className="container mx-auto px-6 pt-40 pb-28 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 mb-8">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[11px] font-mono tracking-[0.15em] uppercase text-muted-foreground">
                Now onboarding design partners
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[80px] font-semibold tracking-tight text-foreground leading-[1.02] mb-8">
              Operational evidence for{" "}
              <span className="text-primary">Physical AI</span>.
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
              Veyra turns telemetry, deployment history and operational events into structured
              evidence for the highest-cost decisions in machine finance, industrial deployment and
              autonomous operations.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-5 py-3 text-[13px] font-medium hover:bg-foreground/90 transition-colors"
              >
                Request Pilot
                <ArrowRight size={14} />
              </Link>
              <a
                href="#platform"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-3 text-[13px] font-medium text-foreground hover:border-foreground/40 transition-colors"
              >
                See the platform
                <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>

          {/* Stats strip */}
          <div className="mt-24 grid sm:grid-cols-3 gap-6 border-t border-border pt-10">
            {stats.map((s) => (
              <div key={s.v}>
                <div className="text-[11px] font-mono tracking-[0.15em] uppercase text-muted-foreground mb-2">
                  {s.k}
                </div>
                <div className="text-[15px] font-medium text-foreground">{s.v}</div>
                <div className="text-[13px] text-muted-foreground mt-1">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARCHITECTURE / DIAGRAM */}
      <section id="platform" className="border-t border-border">
        <div className="container mx-auto px-6 py-28 max-w-6xl">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
            <div>
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-4">
                The evidence engine
              </p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.05] mb-6">
                One substrate between machines and the decisions made about them.
              </h2>
              <p className="text-[15px] text-muted-foreground leading-relaxed mb-6">
                Every physical system produces a stream of signals — telemetry, deployment records,
                operational events. Today those signals are fragmented across dashboards, vendor
                portals and PDF reports.
              </p>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                Veyra unifies them into a single evidence graph, then makes that graph directly
                consumable by the workflows that finance, deploy and operate real infrastructure.
              </p>
            </div>

            {/* Diagram */}
            <div className="relative rounded-3xl border border-border bg-surface p-8 md:p-10">
              <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.06),transparent_60%)] pointer-events-none" />
              <div className="relative space-y-5">
                {/* Row: sources */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: Activity, label: "Telemetry" },
                    { icon: Boxes, label: "Deployment" },
                    { icon: Zap, label: "Events" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl border border-border bg-background p-3 flex items-center gap-2"
                    >
                      <s.icon size={14} className="text-primary" />
                      <span className="text-[12px] font-medium text-foreground">{s.label}</span>
                    </div>
                  ))}
                </div>

                {/* Connectors */}
                <div className="flex justify-center">
                  <svg width="100%" height="40" viewBox="0 0 400 40" className="max-w-md">
                    <path d="M60 0 L200 40" stroke="hsl(var(--border))" strokeWidth="1" />
                    <path d="M200 0 L200 40" stroke="hsl(var(--border))" strokeWidth="1" />
                    <path d="M340 0 L200 40" stroke="hsl(var(--border))" strokeWidth="1" />
                    <circle cx="200" cy="40" r="3" fill="hsl(var(--primary))" />
                  </svg>
                </div>

                {/* Middle: Evidence graph */}
                <div className="rounded-xl border border-foreground/20 bg-background p-5 relative">
                  <div className="absolute -top-2.5 left-5 bg-background px-2 text-[10px] font-mono tracking-[0.15em] uppercase text-muted-foreground">
                    Veyra core
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <Database size={16} className="text-foreground" />
                    <span className="text-[14px] font-semibold text-foreground">Evidence graph</span>
                  </div>
                  <p className="text-[12px] text-muted-foreground leading-relaxed">
                    A persistent, cryptographically anchored record of how each machine actually
                    behaves in the field.
                  </p>
                  <div className="mt-3 grid grid-cols-3 gap-1.5">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-1.5 rounded-sm"
                        style={{
                          background:
                            i % 5 === 0
                              ? "hsl(var(--primary))"
                              : "hsl(var(--border))",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Connectors */}
                <div className="flex justify-center">
                  <svg width="100%" height="40" viewBox="0 0 400 40" className="max-w-md">
                    <circle cx="200" cy="0" r="3" fill="hsl(var(--primary))" />
                    <path d="M200 0 L60 40" stroke="hsl(var(--border))" strokeWidth="1" />
                    <path d="M200 0 L200 40" stroke="hsl(var(--border))" strokeWidth="1" />
                    <path d="M200 0 L340 40" stroke="hsl(var(--border))" strokeWidth="1" />
                  </svg>
                </div>

                {/* Row: consumers */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: Banknote, label: "Underwriting" },
                    { icon: ShieldCheck, label: "Procurement" },
                    { icon: Factory, label: "Operations" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl border border-border bg-background p-3 flex items-center gap-2"
                    >
                      <s.icon size={14} className="text-foreground" />
                      <span className="text-[12px] font-medium text-foreground">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section id="solutions" className="border-t border-border bg-surface/50">
        <div className="container mx-auto px-6 py-28 max-w-6xl">
          <div className="max-w-3xl mb-16">
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-4">
              Solutions
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.05]">
              Three decisions Veyra was built to make defensible.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {solutions.map((s, i) => (
              <motion.div
                key={s.tag}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group rounded-2xl border border-border bg-background p-8 flex flex-col hover:border-foreground/30 transition-colors"
              >
                <s.icon size={20} className="text-foreground mb-6" />
                <div className="text-[11px] font-mono tracking-[0.15em] uppercase text-muted-foreground mb-3">
                  {s.tag}
                </div>
                <h3 className="text-[19px] font-semibold text-foreground leading-snug mb-4">
                  {s.title}
                </h3>
                <p className="text-[14px] text-muted-foreground leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PLATFORM LAYERS */}
      <section className="border-t border-border">
        <div className="container mx-auto px-6 py-28 max-w-6xl">
          <div className="grid lg:grid-cols-[0.9fr_1.3fr] gap-16">
            <div>
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-4">
                Platform
              </p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.05] mb-6">
                Four layers. One accountable record.
              </h2>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                From signal to signed artifact. Veyra is the missing infrastructure between the
                machines you operate and the counterparties that need to trust them.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {platformLayers.map((l) => (
                <div key={l.title} className="rounded-2xl border border-border p-6">
                  <l.icon size={18} className="text-primary mb-5" />
                  <div className="text-[15px] font-semibold text-foreground mb-2">{l.title}</div>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">{l.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DECISION PACK PREVIEW */}
      <section className="border-t border-border bg-foreground text-background">
        <div className="container mx-auto px-6 py-28 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-background/60 mb-4">
                Decision Pack
              </p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05] mb-6">
                Not a dashboard. A signed artifact.
              </h2>
              <p className="text-[15px] text-background/70 leading-relaxed mb-8 max-w-md">
                Every high-cost decision on Veyra produces a Decision Pack — a structured,
                verifiable summary of the operating evidence that justified it. Portable across
                lenders, insurers and regulators.
              </p>
              <ul className="space-y-3">
                {[
                  "Structured runtime evidence, not screenshots",
                  "Cryptographically anchored, tamper-evident",
                  "Machine-readable and human-legible",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-3 text-[14px] text-background/85">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-primary" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mock pack */}
            <div className="rounded-2xl border border-background/15 bg-background/[0.04] p-6 backdrop-blur">
              <div className="flex items-center justify-between border-b border-background/10 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <span className="font-mono text-[11px] tracking-widest uppercase text-background/70">
                    Decision Pack · VYR-0294
                  </span>
                </div>
                <span className="font-mono text-[10px] text-background/50">Signed</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-background/50 mb-1">
                    Asset
                  </div>
                  <div className="text-[13px] text-background">Fleet · Autonomous Yard Truck</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-background/50 mb-1">
                    Window
                  </div>
                  <div className="text-[13px] text-background">2025-11 → 2026-02</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-background/50 mb-1">
                    Uptime
                  </div>
                  <div className="text-[13px] text-background">98.7%</div>
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-background/50 mb-1">
                    Incidents
                  </div>
                  <div className="text-[13px] text-background">0 critical · 3 nominal</div>
                </div>
              </div>

              <div className="rounded-xl bg-background/[0.06] p-3 mb-4">
                <div className="text-[10px] font-mono uppercase tracking-wider text-background/50 mb-2">
                  Runtime signal · 90d
                </div>
                <div className="flex items-end gap-1 h-16">
                  {Array.from({ length: 32 }).map((_, i) => {
                    const h = 20 + Math.round(Math.sin(i * 0.55) * 18 + Math.random() * 20);
                    return (
                      <div
                        key={i}
                        className="flex-1 rounded-sm bg-primary/70"
                        style={{ height: `${h}%` }}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-background/60">
                <span>sha256:9f4a…c2b1</span>
                <span>veyra.io/pack/0294</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY / PRINCIPLES */}
      <section id="why" className="border-t border-border">
        <div className="container mx-auto px-6 py-28 max-w-6xl">
          <div className="max-w-3xl mb-16">
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-4">
              Why Veyra
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.05]">
              Physical AI cannot be underwritten with the tools built for software.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            {principles.map((p) => (
              <div key={p.title} className="border-t border-border pt-6">
                <h3 className="text-[19px] font-semibold text-foreground mb-3">{p.title}</h3>
                <p className="text-[14px] text-muted-foreground leading-relaxed max-w-md">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-t border-border bg-surface/60">
        <div className="container mx-auto px-6 py-28 max-w-6xl">
          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-16 items-start">
            <div>
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-4">
                About
              </p>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.05]">
                Built by operators, for operators.
              </h2>
            </div>
            <div className="space-y-6 text-[15px] text-muted-foreground leading-relaxed">
              <p>
                Veyra is a product of <span className="text-foreground font-medium">Silken Reason</span>,
                an infrastructure studio founded by Yue H. The team ships production systems across
                deep-tech, industrial telemetry and machine finance.
              </p>
              <p>
                We build tools for a world where trillions of dollars of decisions will be made about
                machines that operate autonomously — and where none of the current infrastructure is
                designed for that scale of accountability.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-5 py-2.5 text-[13px] font-medium hover:bg-foreground/90 transition-colors"
                >
                  Request Pilot <ArrowRight size={14} />
                </Link>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-[13px] font-medium hover:border-foreground/40 transition-colors"
                >
                  Read the journal <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="border-t border-border">
        <div className="container mx-auto px-6 py-28 max-w-6xl">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
                Journal
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
                From the Silken Reason desk.
              </h2>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              All writing <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {latest.map((a) => (
              <Link
                key={a.slug}
                to={`/blog/${a.section}/${a.slug}`}
                className="group rounded-2xl border border-border p-6 flex flex-col hover:border-foreground/30 transition-colors"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
                    {a.section.replace("-", " ")}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
                    {a.date}
                  </span>
                </div>
                <h3 className="font-editorial text-[22px] text-foreground leading-snug mb-3 group-hover:text-primary transition-colors">
                  {a.title}
                </h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed line-clamp-3">
                  {a.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border">
        <div className="container mx-auto px-6 py-16 max-w-6xl">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block h-2.5 w-2.5 rounded-sm bg-foreground" />
                <span className="text-[15px] font-semibold tracking-tight text-foreground">Veyra</span>
                <span className="ml-2 text-[11px] text-muted-foreground">by Silken Reason</span>
              </div>
              <p className="text-[13px] text-muted-foreground leading-relaxed max-w-sm">
                Operational evidence for Physical AI. Machine finance, industrial deployment and
                autonomous operations — built on one substrate.
              </p>
            </div>
            <div>
              <div className="text-[11px] font-mono tracking-[0.15em] uppercase text-muted-foreground mb-3">
                Platform
              </div>
              <ul className="space-y-2 text-[13px]">
                <li><a href="#platform" className="text-foreground hover:text-primary transition-colors">Architecture</a></li>
                <li><a href="#solutions" className="text-foreground hover:text-primary transition-colors">Solutions</a></li>
                <li><a href="#why" className="text-foreground hover:text-primary transition-colors">Why Veyra</a></li>
              </ul>
            </div>
            <div>
              <div className="text-[11px] font-mono tracking-[0.15em] uppercase text-muted-foreground mb-3">
                Company
              </div>
              <ul className="space-y-2 text-[13px]">
                <li><a href="#about" className="text-foreground hover:text-primary transition-colors">About</a></li>
                <li><Link to="/blog" className="text-foreground hover:text-primary transition-colors">Blog</Link></li>
                <li><Link to="/contact" className="text-foreground hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-6 flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
              © 2026 Silken Reason — Veyra
            </span>
            <span className="font-mono text-[11px] text-muted-foreground">
              silkenreason.com
            </span>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default Landing;