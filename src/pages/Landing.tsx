import { motion, useReducedMotion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Layout from "@/components/Layout";
import { DEMO_URL } from "@/components/VeyraDemo";

/* Veyra's product page sells the vision and the product. Evidence lives on the case study, technical depth on
   Technology, rigour on Evaluation. Case-specific numbers (thresholds, rates, which causes stayed open, how the
   manufacturer confirmed) stay off this page on purpose. Palette: graphite ink on white, one indigo accent. */

const INK = "text-[#0b1220]";
const SUB = "text-[#475467]";
const EYEBROW = "text-[13px] font-medium text-[#3d3ac8]";
const H2 = "mt-3 text-[30px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#0b1220] md:text-[42px]";

const enterProps = (reduce: boolean | null) =>
  reduce ? {} : { initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" }, transition: { duration: 0.5 } };

/* ---------------- proof numbers: Veyra's time falls from the manufacturer's two days ---------------- */
const TWO_DAYS = 2 * 86400;
const proof: { v: string; k: string; muted?: boolean; drop?: number; count?: number }[] = [
  { v: "16 s", k: "to surface the decisive inconsistency in the logs", drop: 16 },
  { v: "7 min", k: "for the full AI investigation, 33 engineering tool calls", drop: 7 * 60 },
  { v: "≈ 2 days", k: "the manufacturer's own investigation, with its supplier", muted: true },
  { v: "4 of 4", k: "findings consistent with what the manufacturer later confirmed", count: 4 },
];
const fmtDuration = (sec: number) =>
  sec >= 1.5 * 86400 ? `${(sec / 86400).toFixed(1).replace(/\.0$/, "")} days` : sec >= 5400 ? `${Math.round(sec / 3600)} h` : sec >= 90 ? `${Math.round(sec / 60)} min` : `${Math.round(sec)} s`;

const useProgress = (delay: number, duration: number, go: boolean) => {
  const reduce = useReducedMotion();
  const [p, setP] = useState(reduce ? 1 : 0);
  useEffect(() => {
    if (reduce) { setP(1); return; }
    if (!go) return;
    let raf = 0;
    const t0 = performance.now() + delay;
    const tick = (now: number) => {
      const x = Math.min(1, Math.max(0, (now - t0) / duration));
      setP(x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
      if (x < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce, delay, duration, go]);
  return p;
};

const ProofValue = ({ m, i, go }: { m: (typeof proof)[number]; i: number; go: boolean }) => {
  const p = useProgress(300 + i * 200, 2600, go);
  if (m.drop) {
    const v = Math.exp(Math.log(TWO_DAYS) + (Math.log(m.drop) - Math.log(TWO_DAYS)) * p);
    return <span className={p < 1 ? "text-[#98a2b3]" : "text-[#0b1220] transition-colors duration-500"}>{p < 1 ? fmtDuration(v) : m.v}</span>;
  }
  if (m.count) return <span>{p < 1 ? `${Math.round(m.count * p)} of ${m.count}` : m.v}</span>;
  return <span>{m.v}</span>;
};

/* ---------------- content ---------------- */
const differentiators = [
  {
    title: "System-level investigation",
    dot: "bg-[#f79009]",
    items: [
      "Follows the causal sequence across software, controls, electrical systems and protections.",
      "Checks the reported symptom against what the machine actually recorded.",
      "Reasons across resets and state changes, not single alarms.",
    ],
  },
  {
    title: "Physics-grounded reasoning",
    dot: "bg-[#12b76a]",
    items: [
      "Holds every explanation to what physics allows: energy, motion, timing and the limits of each sensor.",
      "Separates what triggered a protection from the upstream cause.",
      "States what the evidence cannot separate, and names the check that would.",
    ],
  },
];

const domains = [
  ["Power and energy", "Batteries, protections, power distribution"],
  ["Control and actuation", "Commands against response, modes, failsafes"],
  ["Localization and estimation", "Redundant sensors that disagree"],
  ["Communication and timing", "Lost links, middleware sessions, clocks"],
  ["Software and configuration", "Parameters, versions, state machines"],
  ["Operating conditions", "Load, temperature, site and environment"],
];

const runOn = [
  ["Autonomous vehicles", "Real field failures, with a manufacturer"],
  ["Fixed-wing aircraft", "Public flight data with control-surface and engine failures"],
  ["Multicopters", "PX4 flight logs from public issue reports"],
  ["Robots and embedded ROS", "Real failure logs from public issue threads"],
];

const loop = [
  ["Read", "Start from the machine's own logs, read-only."],
  ["Rebuild", "Reconstruct what happened across subsystems."],
  ["Reason", "Hold each explanation to physics."],
  ["Test", "Name what is open and the check that settles it."],
  ["Keep", "Retain what was verified, for the next case."],
];

const outputs = [
  { img: "/veyra/report-pub.webp", title: "Evidence-backed report", text: "What happened, which explanations can still hold, and what to verify next." },
  { img: "/veyra/knowledge-pub.webp", title: "Verified engineering knowledge", text: "The mechanism your engineers confirm, and where it applies, kept as a private record." },
  { img: "/veyra/checks-pub.webp", title: "Reusable checks", text: "The checks that found it run on every new record of the same kind." },
];

const horizon = [
  ["Performance degradation and abnormal behaviour", "before it becomes a failure"],
  ["Deviation from design intent", "how a deployed system behaves against what it was built to do"],
  ["Interactions across the machine", "between controls, software and physical systems"],
  ["Engineering decisions", "validation results and experience your team can reuse"],
];

const security = [
  ["Read-only", "No control path into your machines."],
  ["Private by default", "Your data and the knowledge built from it stay in your workspace."],
  ["Nothing published without you", "Only anonymised, and only with your written agreement."],
  ["Every claim traceable", "Each finding points to the data or calculation behind it."],
];

const Landing = () => {
  const reduce = useReducedMotion();
  const enter = enterProps(reduce);
  const proofRef = useRef<HTMLDListElement | null>(null);
  const proofInView = useInView(proofRef, { once: true, amount: 0.6 });
  useEffect(() => {
    document.title = "Veyra | The engineering intelligence for physical AI";
  }, []);

  return (
    <Layout>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-white">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: "linear-gradient(#eef0f4 1px, transparent 1px), linear-gradient(90deg, #eef0f4 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "linear-gradient(to bottom, black, transparent 85%)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent 85%)",
          }}
        />
        <div className="container mx-auto max-w-6xl px-6 pb-14 pt-10 md:pt-14">
          <motion.div initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#e4e7ec] bg-white px-3 py-1 text-[12.5px] text-[#475467]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#12b76a]" /> Working on real field cases with an autonomous-vehicle manufacturer
            </p>
            <h1 className={`mt-5 max-w-4xl text-[36px] font-semibold leading-[1.02] tracking-[-0.04em] md:text-[54px] ${INK}`}>
              The engineering intelligence for physical AI.
            </h1>
            <p className={`mt-4 text-[19px] font-medium leading-snug tracking-[-0.01em] md:text-[22px] ${INK}`}>
              When machines behave unexpectedly, find out why.
            </p>
            <p className={`mt-2 max-w-3xl text-[16px] leading-relaxed ${SUB}`}>
              Veyra investigates failures across the entire machine by connecting software, controls, electrical systems
              and physical behavior to reconstruct what happened, test explanations and identify the next decisive check.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#3d3ac8] px-5 py-3 text-[14px] font-semibold text-white shadow-sm transition-colors hover:bg-[#2f2ca6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3d3ac8]"
              >
                Book a technical briefing <ArrowRight size={15} />
              </Link>
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#d0d5dd] bg-white px-5 py-3 text-[14px] font-medium text-[#0b1220] transition-colors hover:bg-[#f9fafb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3d3ac8]"
              >
                Watch a real investigation <ArrowUpRight size={15} />
              </a>
            </div>
          </motion.div>

          <motion.dl
            ref={proofRef}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[#e4e7ec] bg-[#e4e7ec] md:grid-cols-4"
          >
            {proof.map((m, i) => (
              <div key={m.v} className="bg-white px-4 py-3.5">
                <dt className={`text-[24px] font-semibold leading-none tracking-[-0.03em] tabular-nums ${m.muted ? "text-[#98a2b3]" : "text-[#0b1220]"}`} aria-label={m.v}>
                  <ProofValue m={m} i={i} go={proofInView} />
                </dt>
                <dd className="mt-2 text-[12.5px] leading-snug text-[#475467]">{m.k}</dd>
              </div>
            ))}
          </motion.dl>
          <p className="mt-2.5 text-[12px] leading-relaxed text-[#667085]">
            One real field failure on an autonomous vehicle, from its raw logs, without access to the vehicle or supplier
            data. Time to the decisive finding, not a measured saving.{" "}
            <Link to="/veyra/field-case" className="font-medium text-[#3d3ac8] hover:underline">Read the case study</Link>
          </p>

          <motion.figure initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="mt-12">
            <div className="overflow-hidden rounded-xl border border-[#e4e7ec] bg-[#f5f7fa] shadow-[0_1px_2px_rgba(16,24,40,0.05),0_40px_80px_-40px_rgba(16,24,40,0.35)]">
              <div className="flex items-center gap-1.5 border-b border-[#e4e7ec] bg-white px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#e4e7ec]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#e4e7ec]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#e4e7ec]" />
                <span className="ml-3 truncate text-[12px] text-[#98a2b3]">Veyra · investigation workspace</span>
              </div>
              <img src="/veyra/run-pub.webp" width={2000} height={1250} alt="Veyra's investigation workspace: the agent's activity, the signals and the findings as they appear" className="block h-auto w-full" />
            </div>
            <figcaption className="mt-3 text-[12.5px] text-[#667085]">
              The Veyra agent at work on a real case.{" "}
              <a href={DEMO_URL} target="_blank" rel="noreferrer" className="font-medium text-[#3d3ac8] hover:underline">Watch it live</a>
            </figcaption>
          </motion.figure>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-[#e4e7ec] bg-[#f9fafb]">
        <div className="container mx-auto flex max-w-6xl flex-col gap-5 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[13.5px] text-[#475467]">
            <span className="font-medium text-[#0b1220]">Working with an autonomous-vehicle manufacturer</span> on real field cases ·
            run on real data from vehicles, aircraft, drones and robots
          </p>
          <div className="flex shrink-0 items-center gap-3">
            <span className="text-[12.5px] text-[#667085]">Member of</span>
            <img src="/badges/nvidia-inception-program-badge-rgb-for-screen.svg" alt="NVIDIA Inception Program" className="h-auto w-[120px]" />
          </div>
        </div>
      </section>

      {/* DIFFERENTIATION */}
      <section id="differentiation" className="scroll-mt-16 bg-white">
        <div className="container mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
            <motion.div {...enter}>
              <p className={EYEBROW}>Technical differentiation</p>
              <h2 className={H2}>System-level investigation. Physics-grounded reasoning.</h2>
              <p className={`mt-5 text-[16px] leading-relaxed ${SUB}`}>
                Not just anomalies in logs. Veyra follows causal sequences across subsystems, checks explanations against
                physical constraints, and makes uncertainty explicit when evidence cannot distinguish competing causes.
              </p>
              <Link to="/veyra/technology" className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#3d3ac8] hover:underline">
                How the technology works <ArrowRight size={14} />
              </Link>
            </motion.div>
            <div className="grid gap-4 sm:grid-cols-2">
              {differentiators.map((c) => (
                <motion.div key={c.title} {...enter} className="rounded-xl border border-[#e4e7ec] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${c.dot}`} />
                    <h3 className={`text-[16px] font-semibold ${INK}`}>{c.title}</h3>
                  </div>
                  <ul className="mt-4 space-y-3">
                    {c.items.map((x) => (
                      <li key={x} className="text-[14px] leading-relaxed text-[#475467]">{x}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ACROSS THE MACHINE */}
      <section id="scope" className="scroll-mt-16 border-t border-[#e4e7ec] bg-[#f9fafb]">
        <div className="container mx-auto max-w-6xl px-6 py-20">
          <motion.div {...enter} className="max-w-2xl">
            <p className={EYEBROW}>Across the machine</p>
            <h2 className={H2}>Not tied to one subsystem.</h2>
            <p className={`mt-4 text-[16px] leading-relaxed ${SUB}`}>
              Veyra reads what the machine recorded and reasons across every layer that could explain it.
            </p>
          </motion.div>
          <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <motion.ul {...enter} className="grid gap-px overflow-hidden rounded-xl border border-[#e4e7ec] bg-[#e4e7ec] sm:grid-cols-2">
              {domains.map(([t, d]) => (
                <li key={t} className="bg-white p-5">
                  <p className={`text-[15px] font-semibold ${INK}`}>{t}</p>
                  <p className="mt-1 text-[13.5px] leading-snug text-[#475467]">{d}</p>
                </li>
              ))}
            </motion.ul>
            <motion.div {...enter} className="rounded-xl border border-[#e4e7ec] bg-white p-6">
              <p className={`text-[15px] font-semibold ${INK}`}>Run so far on real data from</p>
              <ul className="mt-4 divide-y divide-[#eaecf0]">
                {runOn.map(([t, d]) => (
                  <li key={t} className="py-3 first:pt-0">
                    <p className="text-[14.5px] font-medium text-[#0b1220]">{t}</p>
                    <p className="mt-0.5 text-[13px] text-[#667085]">{d}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[12.5px] leading-relaxed text-[#667085]">
                How far Veyra goes differs by domain. We walk through results by domain, including where it is not yet
                strong, in a{" "}
                <Link to="/contact" className="font-medium text-[#3d3ac8] hover:underline">technical briefing</Link>.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="today" className="scroll-mt-16 bg-white">
        <div className="container mx-auto max-w-6xl px-6 py-20">
          <motion.div {...enter} className="max-w-2xl">
            <p className={EYEBROW}>How it works</p>
            <h2 className={H2}>From the first log line to the check that settles it.</h2>
          </motion.div>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-xl border border-[#e4e7ec] bg-[#e4e7ec] sm:grid-cols-2 lg:grid-cols-5">
            {loop.map(([verb, text], i) => (
              <motion.li key={verb} {...enter} className="bg-white p-5">
                <span className="font-mono text-[12px] text-[#98a2b3]">0{i + 1}</span>
                <p className={`mt-2 text-[16px] font-semibold ${INK}`}>{verb}</p>
                <p className="mt-1 text-[13.5px] leading-snug text-[#475467]">{text}</p>
              </motion.li>
            ))}
          </ol>
          <p className="mt-4 text-[13px] text-[#667085]">Read-only. No control path into your machines.</p>
        </div>
      </section>

      {/* OUTPUTS */}
      <section id="outputs" className="scroll-mt-16 border-t border-[#e4e7ec] bg-[#f9fafb]">
        <div className="container mx-auto max-w-6xl px-6 py-20">
          <motion.div {...enter} className="max-w-2xl">
            <p className={EYEBROW}>From one investigation</p>
            <h2 className={H2}>A failure solved. Engineering knowledge retained.</h2>
            <p className={`mt-4 text-[16px] leading-relaxed ${SUB}`}>
              Your team does not walk the whole investigation again when the same behaviour returns.
            </p>
          </motion.div>
          <div className="mt-10 space-y-4">
            {outputs.map((o, i) => (
              <motion.figure
                key={o.title}
                {...enter}
                className="grid overflow-hidden rounded-xl border border-[#e4e7ec] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)] lg:grid-cols-[minmax(0,0.36fr)_minmax(0,1fr)]"
              >
                <figcaption className="flex flex-col justify-center p-6">
                  <span className="font-mono text-[12px] text-[#98a2b3]">0{i + 1}</span>
                  <p className={`mt-2 text-[17px] font-semibold ${INK}`}>{o.title}</p>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-[#475467]">{o.text}</p>
                </figcaption>
                <div className="flex items-center border-t border-[#e4e7ec] bg-[#f5f7fa] p-4 lg:border-l lg:border-t-0">
                  <img src={o.img} alt={`${o.title}, as Veyra shows it`} loading="lazy" className="block h-auto w-full rounded-md border border-[#e4e7ec] shadow-sm" />
                </div>
              </motion.figure>
            ))}
          </div>
          <p className="mt-4 text-[12.5px] text-[#667085]">From a real case, with the details generalised for publication. Records and checks stay private to each customer.</p>
        </div>
      </section>

      {/* EVIDENCE */}
      <section id="evidence" className="scroll-mt-16 bg-white">
        <div className="container mx-auto max-w-6xl px-6 py-20">
          <motion.div {...enter} className="max-w-2xl">
            <p className={EYEBROW}>Evidence</p>
            <h2 className={H2}>Choose your depth.</h2>
          </motion.div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[
              { to: "/veyra/field-case", t: "Case study", d: "A real field failure on an autonomous vehicle: what Veyra found, step by step, against what the manufacturer confirmed." },
              { to: "/veyra/technology", t: "Technology", d: "How the agent, the engine and the system-level and physics methods work together, and how your data is handled." },
            ].map((c) => (
              <motion.div key={c.t} {...enter}>
                <Link to={c.to} className="group flex h-full flex-col rounded-xl border border-[#e4e7ec] bg-white p-6 transition-colors hover:border-[#c7c6f5]">
                  <p className={`text-[17px] font-semibold ${INK}`}>{c.t}</p>
                  <p className="mt-2 flex-1 text-[14px] leading-relaxed text-[#475467]">{c.d}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#3d3ac8]">
                    Read <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHERE IT LEADS */}
      <section id="direction" className="scroll-mt-16 bg-[#0b1220] text-white">
        <div className="container mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
            <motion.div {...enter}>
              <p className="text-[13px] font-medium text-[#a5b4fc]">Where it starts, and where it leads</p>
              <h2 className="mt-3 text-[30px] font-semibold leading-[1.08] tracking-[-0.03em] md:text-[42px]">
                Engineering intelligence from how physical systems actually behave.
              </h2>
              <p className="mt-5 text-[16px] leading-relaxed text-white/65">
                Field failures are where Veyra starts: the moment a machine&apos;s real behaviour is examined most closely.
                The same foundation applies wherever a deployed system needs to be understood.
              </p>
            </motion.div>
            <motion.ul {...enter} className="divide-y divide-white/10 rounded-xl border border-white/10">
              {horizon.map(([t, d]) => (
                <li key={t} className="p-5">
                  <p className="text-[15.5px] font-medium text-white">{t}</p>
                  <p className="mt-1 text-[13.5px] text-white/55">{d}</p>
                </li>
              ))}
              <li className="p-5 text-[12.5px] text-white/45">Today Veyra is in use on field failures. The rest is where the same foundation is heading, not yet a product.</li>
            </motion.ul>
          </div>
        </div>
      </section>

      {/* SECURITY SUMMARY */}
      <section id="trust" className="scroll-mt-16 bg-white">
        <div className="container mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {security.map(([t, d]) => (
              <div key={t} className="rounded-xl border border-[#e4e7ec] p-5">
                <p className={`text-[15px] font-semibold ${INK}`}>{t}</p>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#475467]">{d}</p>
              </div>
            ))}
          </div>
          <Link to="/veyra/technology#security" className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#3d3ac8] hover:underline">
            Security and data handling <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* START */}
      <section id="start" className="scroll-mt-16 border-t border-[#e4e7ec] bg-[#f9fafb]">
        <div className="container mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
            <motion.div {...enter}>
              <p className={EYEBROW}>How teams start</p>
              <h2 className={H2}>Start with cases you have already solved.</h2>
              <p className={`mt-4 text-[16px] leading-relaxed ${SUB}`}>No production access to begin. Each step is measured against how your team works today.</p>
              <Link
                to="/contact"
                className="mt-7 inline-flex items-center gap-1.5 rounded-lg bg-[#3d3ac8] px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#2f2ca6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3d3ac8]"
              >
                Book a technical briefing <ArrowRight size={15} />
              </Link>
            </motion.div>
            <ol className="grid gap-4 sm:grid-cols-3">
              {[
                ["Your closed cases", "Veyra investigates solved incidents without the answer, and is checked against what your engineers confirmed."],
                ["Your rules, reviewed", "Your engineers review the machine expectations Veyra checks against."],
                ["Live, read-only", "New incidents as they happen, on one class of issue you already chase."],
              ].map(([what, body], k) => (
                <motion.li key={what} {...enter} className="rounded-xl border border-[#e4e7ec] bg-white p-5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#eeedfc] font-mono text-[12px] font-medium text-[#3d3ac8]">{k + 1}</span>
                  <p className={`mt-3 text-[15px] font-semibold ${INK}`}>{what}</p>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#475467]">{body}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <VeyraFooter />
    </Layout>
  );
};

export const VeyraFooter = () => (
  <footer className="border-t border-[#e4e7ec] bg-white">
    <div className="container mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[#3d3ac8]" />
          <span className={`text-[15px] font-semibold tracking-tight ${INK}`}>Veyra</span>
          <span className="ml-2 text-[12px] text-[#667085]">by Silken Reason</span>
        </div>
        <ul className="flex flex-wrap items-center gap-6 text-[13px]">
          {[
            ["/veyra/field-case", "Case study"],
            ["/veyra/technology", "Technology"],
            ["/contact", "Contact"],
          ].map(([to, l]) => (
            <li key={to}><Link to={to} className="text-[#667085] transition-colors hover:text-[#0b1220]">{l}</Link></li>
          ))}
        </ul>
        <span className="text-[12px] text-[#667085]">© 2026 Silken Reason</span>
      </div>
    </div>
  </footer>
);

export default Landing;
