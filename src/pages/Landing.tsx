import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Layout from "@/components/Layout";

const DEMO_URL = "https://frontend-livid-seven-41.vercel.app/field-case";
const CASE_SOURCE = "https://github.com/micro-ROS/micro_ros_stm32cubemx_utils/issues/139";

/* ------------------------------------------------------------------ */
/* Real data: Veyra's recorded investigation of a public micro-ROS     */
/* failure log (recording v3). Nothing below is invented.              */
/* ------------------------------------------------------------------ */

type Status = "leading" | "open" | "weakened" | "ruled out";

const rounds: {
  label: string;
  headline: string;
  areas: { area: string; status: Status }[];
  next: string;
  branches: string[];
}[] = [
  {
    label: "Round 1 · from the log",
    headline:
      "Session opened correctly, then the board sent a 36-byte all-zero packet and the agent closed the session.",
    areas: [
      { area: "Board firmware / client buffers", status: "leading" },
      { area: "Board Ethernet / lwIP DMA", status: "open" },
      { area: "Network path", status: "weakened" },
      { area: "Host / agent side", status: "weakened" },
      { area: "Agent port configuration", status: "ruled out" },
    ],
    next: "Dump the board's transport write buffer at the 36-byte send",
    branches: [
      "Buffer is zeros at the write call",
      "Buffer is valid at write, zeros on wire",
      "No 36-byte write happens at all",
    ],
  },
  {
    label: "Round 2 · after the engineer's result",
    headline:
      "The packet reaches the wire as zeros after a good create. Likely H7 D-cache and DMA coherency.",
    areas: [
      { area: "Board Ethernet / lwIP DMA", status: "leading" },
      { area: "Board firmware / client buffers", status: "weakened" },
      { area: "Network path", status: "weakened" },
      { area: "Host / agent side", status: "weakened" },
      { area: "Agent port configuration", status: "ruled out" },
    ],
    next: "Make the Tx buffer and lwIP pools non-cacheable, then retest",
    branches: ["Payload valid on wire, session stays up", "Still zeros with D-cache off"],
  },
];

const statusStyle: Record<Status, string> = {
  leading: "bg-[#84d7b0] text-[#062016]",
  open: "bg-[#93c5fd]/20 text-[#bcdcff] ring-1 ring-inset ring-[#93c5fd]/40",
  weakened: "bg-white/[0.06] text-white/55 ring-1 ring-inset ring-white/15",
  "ruled out": "bg-transparent text-white/35 ring-1 ring-inset ring-white/10 line-through",
};

const CaseCard = () => {
  const reduce = useReducedMotion();
  const [round, setRound] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setRound(1), 5200);
    return () => clearTimeout(t);
  }, [reduce]);

  const r = rounds[round];

  return (
    <div className="relative rounded-xl border border-white/12 bg-[#0d1a2e]/90 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)] backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-3.5">
        <div className="min-w-0">
          <p className="text-[12px] text-white/50">Real case · micro-ROS on STM32H7</p>
          <p className="text-[14px] font-medium text-white">Session drops right after it opens</p>
        </div>
        <div className="flex shrink-0 rounded-full bg-white/[0.06] p-0.5 text-[11px]" role="tablist" aria-label="Investigation round">
          {["Round 1", "Round 2"].map((l, i) => (
            <button
              key={l}
              role="tab"
              aria-selected={round === i}
              onClick={() => setRound(i)}
              className={`rounded-full px-3 py-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#84d7b0] ${
                round === i ? "bg-white text-[#0a1424]" : "text-white/60 hover:text-white"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={round}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="px-5 pb-5 pt-4"
        >
          <p className="text-[11.5px] text-[#84d7b0]">{r.label}</p>
          <p className="mt-1.5 text-[13.5px] leading-snug text-white/85">{r.headline}</p>

          <p className="mt-5 text-[11.5px] text-white/45">Fault space</p>
          <ul className="mt-2 space-y-1.5">
            {r.areas.map((a) => (
              <motion.li
                layout={!reduce}
                key={a.area}
                className="flex items-center justify-between gap-3 rounded-md bg-white/[0.03] px-3 py-2"
              >
                <span className={`truncate text-[12.5px] ${a.status === "ruled out" ? "text-white/40" : "text-white/85"}`}>
                  {a.area}
                </span>
                <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10.5px] font-medium ${statusStyle[a.status]}`}>
                  {a.status}
                </span>
              </motion.li>
            ))}
          </ul>

          <p className="mt-5 text-[11.5px] text-white/45">Next experiment</p>
          <p className="mt-1.5 text-[13.5px] font-medium leading-snug text-white">{r.next}</p>
          <ul className="mt-2.5 space-y-1">
            {r.branches.map((b) => (
              <li key={b} className="flex gap-2 text-[12px] leading-snug text-white/60">
                <span className="mt-[7px] h-px w-3 shrink-0 bg-white/30" aria-hidden />
                {b}
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between gap-3 border-t border-white/10 px-5 py-3 text-[11.5px] text-white/45">
        <span>Recorded output of Veyra's investigator on a public failure log</span>
        <a href={CASE_SOURCE} target="_blank" rel="noreferrer" className="shrink-0 text-white/70 underline decoration-white/25 underline-offset-2 hover:text-white">
          Source
        </a>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */

const loop = [
  {
    verb: "Read",
    title: "Start from what the machine actually did.",
    body: "Upload a log or connect read-only. Veyra finds the events that matter and separates cause, consequence and coincidence.",
    real: "“Session opened correctly, then the board sent a 36-byte all-zero packet.”",
  },
  {
    verb: "Map",
    title: "Lay out every place the fault could live.",
    body: "Each area is leading, open, weakened or ruled out, and only data can rule one out. An engineer's report can only weaken it.",
    real: "Ruled out: agent port configuration, because the log shows the session was established.",
  },
  {
    verb: "Test",
    title: "Choose the experiment that settles the most.",
    body: "Not ten guesses. One check, with what each possible result would keep, weaken or rule out.",
    real: "Dump the transport write buffer at the 36-byte send: zeros before, or only on the wire?",
  },
  {
    verb: "Learn",
    title: "Update from the result, then close honestly.",
    body: "What the engineer observed stays separate from Veyra's interpretation. A closed case becomes a candidate lesson until the fix is shown to hold.",
    real: "Board Ethernet / lwIP DMA moves to leading. Next: make the buffers non-cacheable, then retest.",
  },
];

const stacks = [
  "ROS 2 and ros2_control",
  "MoveIt 2",
  "Autoware",
  "PX4",
  "ArduPilot",
  "micro-ROS",
  "Zephyr RTOS",
  "Crazyflie",
  "Lidar drivers",
];

const audiences = [
  {
    who: "Robot makers' field and support engineering",
    moment: "A machine at a customer site behaves in a way nobody can reproduce in the lab.",
  },
  {
    who: "Teams deploying robot foundation models and world models",
    moment: "A model that worked in the demo stalls on a new machine, task or site.",
  },
  {
    who: "System integrators commissioning robots",
    moment: "Commissioning runs long because every fault becomes days of trial and error.",
  },
  {
    who: "Drone and autonomy teams",
    moment: "A flight or a run fails, and the only witness is the log.",
  },
];

const horizons = [
  {
    when: "Today",
    state: "Live",
    title: "Suggests the decisive next experiment",
    body: "From real logs, across robotics, drone and embedded stacks, with every claim tied to evidence.",
  },
  {
    when: "Next",
    state: "Planned",
    title: "Chooses and runs experiments",
    body: "Ranks experiments by how much each one settles, and runs safe tests in simulation and through robot software.",
  },
  {
    when: "Then",
    state: "Research",
    title: "Carries experience between machines",
    body: "What one deployment learned shortens the next, so new models and new machines need fewer tries to work.",
  },
];

const fade = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

const Landing = () => {
  const reduce = useReducedMotion();
  const enter = reduce ? {} : fade;

  return (
    <Layout>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#0a1424] text-white">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(132,215,176,0.12), transparent 70%), radial-gradient(ellipse 50% 60% at 10% 90%, rgba(147,197,253,0.10), transparent 70%)",
          }}
        />
        <div className="container mx-auto max-w-6xl px-6 pb-20 pt-20 md:pt-24">
          <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[minmax(0,1fr)_440px]">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="min-w-0"
            >
              <p className="mb-5 text-[13px] text-white/55">Veyra, by Silken Reason</p>
              <h1 className="text-[40px] font-semibold leading-[1.02] tracking-[-0.03em] md:text-[56px] lg:text-[64px]">
                The AI field engineer for physical AI.
              </h1>
              <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/70">
                Veyra reads what a machine actually did, maps every place the fault could live, and picks the next
                experiment that settles it. Today it gets failing machines working again. Next, it gets new AI models
                working on real machines in fewer tries.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={DEMO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md bg-[#84d7b0] px-5 py-3 text-[14px] font-semibold text-[#062016] transition-colors hover:bg-[#a3e4c5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Watch a real investigation <ArrowUpRight size={15} />
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 rounded-md px-5 py-3 text-[14px] font-medium text-white ring-1 ring-inset ring-white/25 transition-colors hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Request a pilot
                </Link>
              </div>
              <dl className="mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-6">
                <div>
                  <dt className="text-[12px] text-white/45">Product</dt>
                  <dd className="mt-1 text-[14px] text-white/85">Live on real failure logs</dd>
                </div>
                <div>
                  <dt className="text-[12px] text-white/45">Evaluation</dt>
                  <dd className="mt-1 text-[14px] text-white/85">14 sealed real-world cases</dd>
                </div>
                <div>
                  <dt className="text-[12px] text-white/45">Ecosystem</dt>
                  <dd className="mt-1 text-[14px] text-white/85">NVIDIA Inception member</dd>
                </div>
              </dl>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="min-w-0"
            >
              <CaseCard />
            </motion.div>
          </div>
        </div>
      </section>

      {/* TODAY */}
      <section id="today" className="scroll-mt-16 bg-background">
        <div className="container mx-auto max-w-6xl px-6 py-24">
          <motion.div {...enter} className="max-w-3xl">
            <p className="text-[13px] text-primary">Working today</p>
            <h2 className="mt-3 text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] text-foreground md:text-[44px]">
              One loop, from the first log line to a lesson the team can trust.
            </h2>
            <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-muted-foreground">
              Each step below comes from the same real investigation shown above: a public micro-ROS failure where an
              STM32H7 board's session dropped seconds after it opened.
            </p>
          </motion.div>

          <ol className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
            {loop.map((s, i) => (
              <motion.li
                key={s.verb}
                {...enter}
                transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.06 }}
                className="flex flex-col bg-background p-6"
              >
                <span className="text-[13px] font-medium text-muted-foreground">
                  {i + 1}. {s.verb}
                </span>
                <h3 className="mt-3 text-[19px] font-semibold leading-snug text-foreground">{s.title}</h3>
                <p className="mt-3 flex-1 text-[14px] leading-relaxed text-muted-foreground">{s.body}</p>
                <p className="mt-6 border-l-2 border-[#84d7b0] pl-3 text-[13px] leading-snug text-foreground/80">
                  {s.real}
                </p>
              </motion.li>
            ))}
          </ol>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px]">
            <a href={DEMO_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-medium text-foreground underline decoration-border underline-offset-4 hover:text-primary">
              Step through it yourself in the live demo <ArrowUpRight size={14} />
            </a>
            <span className="text-muted-foreground">Read-only. No control path into your machines.</span>
          </div>
        </div>
      </section>

      {/* EVIDENCE */}
      <section id="evidence" className="scroll-mt-16 border-t border-border bg-[#f6f8fb]">
        <div className="container mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <motion.div {...enter}>
              <p className="text-[13px] text-primary">Evidence</p>
              <h2 className="mt-3 text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] text-foreground md:text-[44px]">
                Measured on real failures, not staged demos.
              </h2>
              <p className="mt-5 text-[16px] leading-relaxed text-muted-foreground">
                We ran Veyra blind on 14 failure logs that engineers posted in public issue threads. The answer keys,
                taken from the fixes and maintainer conclusions in those threads, were sealed before anything ran.
                Three of the cases are still unresolved upstream, to test whether Veyra admits what a log cannot show.
              </p>
            </motion.div>

            <motion.div {...enter} className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
              <div className="bg-background p-6">
                <p className="text-[44px] font-semibold leading-none tracking-[-0.03em] text-foreground">16/16</p>
                <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                  Full marks for concrete, actionable next steps across the latest 8 cases. The same AI model working
                  alone scored 8 of 16.
                </p>
              </div>
              <div className="bg-background p-6">
                <p className="text-[44px] font-semibold leading-none tracking-[-0.03em] text-foreground">14</p>
                <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                  real logs from public robotics, drone and embedded projects. No synthetic cases.
                </p>
              </div>
              <div className="bg-background p-6">
                <p className="text-[19px] font-semibold leading-snug text-foreground">Every claim points to a log line</p>
                <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                  Quotes and line numbers are checked mechanically. A claim that cites the wrong line is rejected.
                </p>
              </div>
              <div className="bg-background p-6">
                <p className="text-[19px] font-semibold leading-snug text-foreground">Observed is kept apart from inferred</p>
                <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                  The record shows what an engineer saw separately from what Veyra concluded, on a tamper-evident case history.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div {...enter} className="mt-14">
            <p className="text-[13px] text-muted-foreground">Stacks covered in the evaluation</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {stacks.map((s) => (
                <li key={s} className="rounded-full border border-border bg-background px-3.5 py-1.5 text-[13px] text-foreground">
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...enter} className="mt-14 flex flex-col gap-5 rounded-xl border border-border bg-background px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[16px] font-medium text-foreground">Member of NVIDIA Inception</p>
            <img
              src="/badges/nvidia-inception-program-badge-rgb-for-screen.svg"
              alt="NVIDIA Inception Program"
              className="h-auto w-[140px] shrink-0"
            />
          </motion.div>
        </div>
      </section>

      {/* WHO */}
      <section id="who" className="scroll-mt-16 border-t border-border bg-background">
        <div className="container mx-auto max-w-6xl px-6 py-24">
          <motion.div {...enter} className="max-w-3xl">
            <p className="text-[13px] text-primary">Built for</p>
            <h2 className="mt-3 text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] text-foreground md:text-[44px]">
              Teams who own the moment a machine meets the real world.
            </h2>
          </motion.div>
          <ul className="mt-12 divide-y divide-border border-y border-border">
            {audiences.map((a) => (
              <motion.li {...enter} key={a.who} className="grid gap-2 py-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-10">
                <span className="text-[18px] font-semibold leading-snug text-foreground">{a.who}</span>
                <span className="text-[15px] leading-relaxed text-muted-foreground">{a.moment}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* NEXT */}
      <section id="next" className="scroll-mt-16 bg-[#0a1424] text-white">
        <div className="container mx-auto max-w-6xl px-6 py-24">
          <motion.div {...enter} className="max-w-3xl">
            <p className="text-[13px] text-[#84d7b0]">Where Veyra is going</p>
            <h2 className="mt-3 text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] md:text-[44px]">
              Every physical AI model has to meet reality. We make that take fewer tries.
            </h2>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/70">
              World models and robot foundation models are getting better at predicting the physical world. Getting one
              to work on a specific machine, task and site still takes rounds of physical experiments, chosen by hand by
              senior engineers. That is the gap Veyra is built for: the fewest experiments between an intelligent model
              and a machine that works.
            </p>
          </motion.div>

          <ol className="mt-14 grid gap-4 md:grid-cols-3">
            {horizons.map((h, i) => (
              <motion.li
                key={h.when}
                {...enter}
                transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.08 }}
                className={`rounded-xl p-6 ${i === 0 ? "bg-[#84d7b0]/[0.09] ring-1 ring-inset ring-[#84d7b0]/50" : "bg-white/[0.04] ring-1 ring-inset ring-white/10"}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[15px] font-semibold">{h.when}</span>
                  <span className={`text-[12px] ${i === 0 ? "text-[#84d7b0]" : "text-white/50"}`}>{h.state}</span>
                </div>
                <h3 className="mt-6 text-[19px] font-semibold leading-snug">{h.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-white/65">{h.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* PILOT */}
      <section id="pilot" className="scroll-mt-16 bg-background">
        <div className="container mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
            <motion.div {...enter}>
              <p className="text-[13px] text-primary">Design partner pilot</p>
              <h2 className="mt-3 text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] text-foreground md:text-[44px]">
                Six to eight weeks on your own failures.
              </h2>
              <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
                Pick one class of issue your engineers already chase. Connect read-only. Use Veyra on real incidents as
                they happen, and measure it against how your team works today.
              </p>
              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-1.5 rounded-md bg-[#0a1424] px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-[#16243b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Request a pilot <ArrowRight size={15} />
              </Link>
            </motion.div>
            <motion.dl {...enter} className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border">
              {[
                ["Time to cause", "from first report to a supported explanation"],
                ["Experiments run", "how many checks it took to settle it"],
                ["Engineer hours", "senior time spent per case"],
                ["Repeat cases", "how often a past lesson shortened a new one"],
              ].map(([k, v]) => (
                <div key={k} className="bg-background p-5">
                  <dt className="text-[15px] font-semibold text-foreground">{k}</dt>
                  <dd className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{v}</dd>
                </div>
              ))}
            </motion.dl>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-[#f6f8fb]">
        <div className="container mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-foreground" />
              <span className="text-[15px] font-semibold tracking-tight text-foreground">Veyra</span>
              <span className="ml-2 text-[12px] text-muted-foreground">by Silken Reason</span>
            </div>
            <ul className="flex items-center gap-6 text-[13px]">
              <li><Link to="/blog" className="text-muted-foreground transition-colors hover:text-foreground">Blog</Link></li>
              <li><Link to="/contact" className="text-muted-foreground transition-colors hover:text-foreground">Contact</Link></li>
            </ul>
            <span className="text-[12px] text-muted-foreground">© 2026 Silken Reason</span>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default Landing;
