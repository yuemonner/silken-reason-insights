import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Layout from "@/components/Layout";

const DEMO_URL = "https://frontend-livid-seven-41.vercel.app/field-case";
const CASE_SOURCE = "https://github.com/micro-ROS/micro_ros_stm32cubemx_utils/issues/139";

/* ------------------------------------------------------------------ */
/* Everything in the console below is real: the public micro-ROS log   */
/* (issue #139) and Veyra's recorded investigation of it (v3).         */
/* ------------------------------------------------------------------ */

type Tone = "routine" | "cause" | "effect";
const logLines: { n: number; text: string; tone: Tone }[] = [
  { n: 6, text: "info  Root.cpp  create_client      create             client_key: 0x2A2ED975", tone: "routine" },
  { n: 7, text: "info  SessionManager  establish_session  session established", tone: "routine" },
  { n: 10, text: "debug UDPv4Agent  recv_message  [==>> UDP <<==]  len: 36, data:", tone: "cause" },
  { n: 11, text: "0000: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ...", tone: "cause" },
  { n: 13, text: "info  Root.cpp  delete_client      delete             client_key: 0x2A2ED975", tone: "effect" },
  { n: 14, text: "info  SessionManager  destroy_session  session closed", tone: "effect" },
  { n: 15, text: "warn  Root.cpp  create_client      invalid client key  client_key: 0x00000000", tone: "effect" },
];

type Status = "leading" | "open" | "weakened" | "ruled out";
const round1: { area: string; status: Status }[] = [
  { area: "Board firmware / client buffers", status: "leading" },
  { area: "Board Ethernet / lwIP DMA", status: "open" },
  { area: "Network path", status: "weakened" },
  { area: "Host / agent side", status: "weakened" },
  { area: "Agent port configuration", status: "ruled out" },
];
const round2: { area: string; status: Status }[] = [
  { area: "Board Ethernet / lwIP DMA", status: "leading" },
  { area: "Board firmware / client buffers", status: "weakened" },
  { area: "Network path", status: "weakened" },
  { area: "Host / agent side", status: "weakened" },
  { area: "Agent port configuration", status: "ruled out" },
];

const chip: Record<Status, string> = {
  leading: "bg-[#84d7b0] text-[#062016]",
  open: "text-[#bcdcff] ring-1 ring-inset ring-[#93c5fd]/45",
  weakened: "text-white/50 ring-1 ring-inset ring-white/15",
  "ruled out": "text-white/30 ring-1 ring-inset ring-white/10 line-through",
};

const toneStyle: Record<Tone, string> = {
  routine: "text-white/40",
  cause: "text-[#84d7b0] bg-[#84d7b0]/[0.08]",
  effect: "text-[#f2c46d]/90",
};

/* stage: 0 nothing, 1 log read, 2 fault space, 3 experiment, 4 engineer result, 5 round 2 */
const Console = () => {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState(reduce ? 5 : 0);

  useEffect(() => {
    if (reduce) return;
    const times = [500, 1900, 3300, 6200, 7600];
    const ids = times.map((t, i) => setTimeout(() => setStage(i + 1), t));
    return () => ids.forEach(clearTimeout);
  }, [reduce]);

  const areas = stage >= 5 ? round2 : round1;
  const replay = () => {
    if (reduce) return;
    setStage(0);
    [300, 1500, 2700, 5000, 6200].forEach((t, i) => setTimeout(() => setStage(i + 1), t));
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#08111f] shadow-[0_0_0_1px_rgba(132,215,176,0.04),0_60px_140px_-50px_rgba(0,0,0,0.9)]">
      {/* title bar */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-white/[0.07] px-4 py-3 sm:px-5">
        <span className="flex items-center gap-2 text-[12px] text-white/70">
          <span className="relative flex h-2 w-2">
            <span className={`absolute inline-flex h-full w-full rounded-full bg-[#84d7b0] ${stage < 5 && !reduce ? "animate-ping opacity-60" : "opacity-0"}`} />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#84d7b0]" />
          </span>
          {stage < 5 ? "Investigating" : "Updated from the engineer's result"}
        </span>
        <span className="text-[12px] text-white/35">micro-ROS on STM32H7 · session drops right after it opens</span>
        <span className="ml-auto flex items-center gap-3 text-[12px]">
          <a href={CASE_SOURCE} target="_blank" rel="noreferrer" className="text-white/45 underline decoration-white/20 underline-offset-2 hover:text-white">
            Public log
          </a>
          {!reduce && (
            <button onClick={replay} className="text-white/45 hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#84d7b0]">
              Replay
            </button>
          )}
        </span>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        {/* log */}
        <div className="min-w-0 border-b border-white/[0.07] p-4 sm:p-5 lg:border-b-0 lg:border-r">
          <p className="mb-3 text-[11.5px] text-white/40">Agent log from the engineer's post, condensed</p>
          <ol className="space-y-[3px] font-mono text-[11.5px] leading-[1.55]">
            {logLines.map((l, i) => (
              <motion.li
                key={l.n}
                initial={reduce ? false : { opacity: 0, x: -6 }}
                animate={stage >= 1 ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: reduce ? 0 : i * 0.12, duration: 0.3 }}
                className={`flex gap-3 rounded px-2 py-0.5 transition-colors duration-500 ${stage >= 2 ? toneStyle[l.tone] : "text-white/55"}`}
              >
                <span className="w-5 shrink-0 text-right text-white/25">{l.n}</span>
                <span className="truncate">{l.text}</span>
              </motion.li>
            ))}
          </ol>
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={stage >= 2 ? { opacity: 1 } : {}}
            className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[11.5px]"
          >
            <span className="text-[#84d7b0]">Earliest abnormal data</span>
            <span className="text-[#f2c46d]/90">Consequences</span>
            <span className="text-white/40">Routine</span>
          </motion.div>
          <AnimatePresence>
            {stage >= 4 && (
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 rounded-lg border border-white/10 bg-white/[0.03] p-3"
              >
                <p className="text-[11.5px] text-white/40">Engineer observed</p>
                <p className="mt-1 text-[13px] leading-snug text-white/85">
                  Tx buffer holds the correct bytes at sendto. tcpdump shows the 36-byte datagram as all zeros on the
                  wire. D-cache is enabled.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* reasoning */}
        <div className="min-w-0 p-4 sm:p-5">
          <p className="mb-3 text-[11.5px] text-white/40">Fault space</p>
          <ul className="space-y-1.5">
            {areas.map((a) => (
              <motion.li
                layout={!reduce}
                key={a.area}
                initial={reduce ? false : { opacity: 0 }}
                animate={stage >= 2 ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="flex items-center justify-between gap-3 rounded-md bg-white/[0.025] px-3 py-[7px]"
              >
                <span className={`truncate text-[12.5px] ${a.status === "ruled out" ? "text-white/35" : "text-white/85"}`}>{a.area}</span>
                <span className={`shrink-0 rounded-full px-2 py-[1px] text-[10.5px] font-medium ${chip[a.status]}`}>{a.status}</span>
              </motion.li>
            ))}
          </ul>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={stage >= 3 ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-5"
          >
            <p className="text-[11.5px] text-white/40">Next decisive check</p>
            <AnimatePresence mode="wait">
              <motion.div key={stage >= 5 ? "r2" : "r1"} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <p className="mt-1.5 text-[14px] font-medium leading-snug text-white">
                  {stage >= 5
                    ? "Make the Tx buffer and lwIP pools non-cacheable, then retest"
                    : "Dump the board's transport write buffer at the 36-byte send"}
                </p>
                <ul className="mt-3 space-y-1.5 border-l border-white/15 pl-3">
                  {(stage >= 5
                    ? ["Payload valid on wire, session stays up", "Still zeros with D-cache off"]
                    : ["Buffer is zeros at the write call", "Buffer is valid at write, zeros on wire", "No 36-byte write happens at all"]
                  ).map((b) => (
                    <li
                      key={b}
                      className={`text-[12px] leading-snug ${stage === 4 && b === "Buffer is valid at write, zeros on wire" ? "text-[#84d7b0]" : "text-white/55"}`}
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Working today: the loop, each step showing the real artifact        */
/* ------------------------------------------------------------------ */

const steps = [
  {
    verb: "Read",
    title: "Start from what the machine actually did.",
    body: "Upload a log or connect read-only. Veyra finds the events that matter and separates cause, consequence and coincidence, citing the exact lines.",
  },
  {
    verb: "Map",
    title: "Lay out every place the fault could live.",
    body: "Each area is leading, open, weakened or ruled out. Only data can rule one out. An engineer's report can only weaken it.",
  },
  {
    verb: "Test",
    title: "Choose the check that settles the most.",
    body: "Not ten guesses. One check, with what each possible result would keep, weaken or rule out.",
  },
  {
    verb: "Learn",
    title: "Update from the result, and close honestly.",
    body: "What the engineer observed stays separate from Veyra's interpretation. A closed case is a candidate lesson until the fix is shown to hold.",
  },
];

const StepArtifact = ({ i }: { i: number }) => {
  if (i === 0)
    return (
      <div className="font-mono text-[12px] leading-[1.7]">
        <p className="text-white/35">lines 10 to 12 · earliest abnormal data</p>
        <p className="mt-2 text-[#84d7b0]">recv_message  [==&gt;&gt; UDP &lt;&lt;==]  len: 36, data:</p>
        <p className="text-[#84d7b0]">0000: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ...</p>
        <p className="mt-4 text-white/35">lines 13 to 15 · consequences</p>
        <p className="mt-2 text-[#f2c46d]/90">delete_client · destroy_session · invalid client key</p>
        <p className="mt-4 text-white/35">lines 1 to 2 · routine</p>
        <p className="mt-2 text-white/50">port 457879 wrapped to 64663, handshake still succeeded</p>
      </div>
    );
  if (i === 1)
    return (
      <ul className="space-y-1.5">
        {round1.map((a) => (
          <li key={a.area} className="flex items-center justify-between gap-3 rounded-md bg-white/[0.03] px-3 py-2">
            <span className={`truncate text-[13px] ${a.status === "ruled out" ? "text-white/35" : "text-white/85"}`}>{a.area}</span>
            <span className={`shrink-0 rounded-full px-2 py-[1px] text-[11px] font-medium ${chip[a.status]}`}>{a.status}</span>
          </li>
        ))}
        <li className="pt-2 text-[12.5px] leading-snug text-white/50">
          Ruled out on data: the log shows the session was established, so the port was not the problem.
        </li>
      </ul>
    );
  if (i === 2)
    return (
      <svg viewBox="0 0 440 210" className="h-auto w-full" role="img" aria-label="One check with three possible results, each pointing to a different part of the system">
        <rect x="1" y="80" width="150" height="50" rx="8" fill="rgba(132,215,176,0.1)" stroke="#84d7b0" />
        <text x="76" y="101" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="600">Dump write buffer</text>
        <text x="76" y="118" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="11">at the 36-byte send</text>
        {[
          { y: 28, a: "Zeros at the write call", b: "→ client buffers" },
          { y: 105, a: "Valid at write, zeros on wire", b: "→ Ethernet / DMA" },
          { y: 182, a: "No 36-byte write at all", b: "→ another sender" },
        ].map((o) => (
          <g key={o.a}>
            <path d={`M151 105 C 190 105, 190 ${o.y}, 228 ${o.y}`} fill="none" stroke="rgba(255,255,255,0.25)" />
            <circle cx="230" cy={o.y} r="3" fill="#84d7b0" />
            <text x="242" y={o.y - 3} fill="rgba(255,255,255,0.85)" fontSize="12">{o.a}</text>
            <text x="242" y={o.y + 13} fill="rgba(255,255,255,0.45)" fontSize="11">{o.b}</text>
          </g>
        ))}
      </svg>
    );
  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-white/10 p-3">
        <p className="text-[11.5px] text-white/40">Engineer observed</p>
        <p className="mt-1 text-[13px] leading-snug text-white/85">Correct bytes in the Tx buffer at sendto. All zeros on the wire. D-cache enabled.</p>
      </div>
      <div className="rounded-lg border border-[#84d7b0]/30 bg-[#84d7b0]/[0.05] p-3">
        <p className="text-[11.5px] text-[#84d7b0]">Veyra's interpretation</p>
        <p className="mt-1 text-[13px] leading-snug text-white/85">Board Ethernet / lwIP DMA now leading. Likely H7 D-cache and DMA coherency.</p>
      </div>
      <div className="flex items-center justify-between rounded-lg border border-white/10 p-3">
        <p className="text-[13px] text-white/85">Lesson saved</p>
        <span className="rounded-full px-2 py-[1px] text-[11px] text-[#f2c46d] ring-1 ring-inset ring-[#f2c46d]/40">candidate</span>
      </div>
    </div>
  );
};

const Loop = () => {
  const [i, setI] = useState(0);
  return (
    <div className="grid overflow-hidden rounded-2xl border border-white/10 bg-[#08111f] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div role="tablist" aria-label="Investigation loop" className="border-b border-white/[0.07] lg:border-b-0 lg:border-r">
        {steps.map((s, k) => (
          <button
            key={s.verb}
            role="tab"
            aria-selected={i === k}
            onClick={() => setI(k)}
            onMouseEnter={() => setI(k)}
            className={`group relative block w-full border-b border-white/[0.07] px-5 py-5 text-left transition-colors last:border-b-0 focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-[#84d7b0] sm:px-6 ${
              i === k ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"
            }`}
          >
            <span className={`absolute left-0 top-0 h-full w-[2px] transition-colors ${i === k ? "bg-[#84d7b0]" : "bg-transparent"}`} />
            <span className="flex items-baseline gap-3">
              <span className={`font-mono text-[12px] ${i === k ? "text-[#84d7b0]" : "text-white/35"}`}>{s.verb}</span>
              <span className={`text-[16px] font-semibold leading-snug ${i === k ? "text-white" : "text-white/60"}`}>{s.title}</span>
            </span>
            {i === k && <span className="mt-2 block pl-[calc(3ch+12px)] text-[13.5px] leading-relaxed text-white/55">{s.body}</span>}
          </button>
        ))}
      </div>
      <div className="flex min-h-[300px] items-center p-5 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="w-full">
            <StepArtifact i={i} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */

const stacks = ["ROS 2", "ros2_control", "MoveIt 2", "Autoware", "PX4", "ArduPilot", "micro-ROS", "Zephyr RTOS", "Crazyflie", "RPLIDAR", "Livox"];

const audiences = [
  { who: "Robot makers' field and support engineering", moment: "A machine at a customer site behaves in a way nobody can reproduce in the lab." },
  { who: "Teams deploying robot foundation models and world models", moment: "A model that worked in the demo stalls on a new machine, task or site." },
  { who: "System integrators commissioning robots", moment: "Commissioning runs long because every fault turns into days of trial and error." },
  { who: "Drone and autonomy teams", moment: "A flight or a run fails, and the only witness is the log." },
];

const horizons = [
  { when: "Today", state: "Live", title: "Finds the next decisive check", body: "From real logs across robotics, drone and embedded stacks, with every claim tied to evidence." },
  { when: "Next", state: "Planned", title: "Chooses and runs experiments", body: "Ranks checks by how much each one settles, and runs safe tests in simulation and through robot software." },
  { when: "Then", state: "Research", title: "Carries experience between machines", body: "What one deployment learned shortens the next, so new models and machines need fewer tries to work." },
];

/* A narrowing fault space: 5 open areas collapse as experiments land. Illustrative of the goal, labelled as such. */
const Narrowing = () => {
  const cols = [5, 3, 1];
  return (
    <svg viewBox="0 0 520 220" className="h-auto w-full" role="img" aria-label="With each experiment, fewer explanations remain, until one is left">
      {cols.map((n, c) => {
        const x = 20 + c * 190;
        return (
          <g key={c}>
            {Array.from({ length: 5 }).map((_, r) => {
              const alive = r < n;
              return (
                <rect
                  key={r}
                  x={x}
                  y={20 + r * 34}
                  width="110"
                  height="22"
                  rx="11"
                  fill={alive ? (n === 1 ? "#84d7b0" : "rgba(147,197,253,0.14)") : "transparent"}
                  stroke={alive ? (n === 1 ? "#84d7b0" : "rgba(147,197,253,0.45)") : "rgba(255,255,255,0.1)"}
                  strokeDasharray={alive ? undefined : "3 4"}
                />
              );
            })}
            <text x={x + 55} y="208" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="11">
              {n === 1 ? "1 explanation" : `${n} explanations`}
            </text>
            {c < 2 && (
              <g>
                <path d={`M${x + 120} 105 H${x + 180}`} stroke="rgba(255,255,255,0.3)" markerEnd="url(#arr)" />
                <text x={x + 150} y="96" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="11">experiment</text>
              </g>
            )}
          </g>
        );
      })}
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0L10 5L0 10z" fill="rgba(255,255,255,0.4)" />
        </marker>
      </defs>
    </svg>
  );
};

const enterProps = (reduce: boolean | null) =>
  reduce
    ? {}
    : { initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" }, transition: { duration: 0.55 } };

const Landing = () => {
  const reduce = useReducedMotion();
  const enter = enterProps(reduce);

  return (
    <Layout>
      <div className="bg-[#0a1424] text-white">
        {/* HERO */}
        <section className="relative isolate overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage: "radial-gradient(ellipse 80% 70% at 50% 20%, black, transparent 75%)",
              WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 20%, black, transparent 75%)",
            }}
          />
          <div aria-hidden className="absolute left-1/2 top-[-20%] -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[#84d7b0]/[0.07] blur-[120px]" />

          <div className="container mx-auto max-w-6xl px-6 pb-16 pt-16 md:pt-20">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-4xl text-center"
            >
              <p className="text-[13px] text-white/50">Veyra, by Silken Reason</p>
              <h1 className="mt-5 text-[42px] font-semibold leading-[0.98] tracking-[-0.04em] md:text-[68px] lg:text-[80px]">
                The AI field engineer for physical AI.
              </h1>
              <p className="mx-auto mt-7 max-w-2xl text-[17px] leading-relaxed text-white/65 md:text-[18px]">
                Today, it helps engineers investigate failures and find the next decisive check. Next, we're building
                toward fewer experiments to get new models working on real machines.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={DEMO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#84d7b0] px-6 py-3 text-[14px] font-semibold text-[#062016] transition-colors hover:bg-[#a3e4c5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Watch a real investigation <ArrowUpRight size={15} />
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-[14px] font-medium text-white ring-1 ring-inset ring-white/20 transition-colors hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Request a pilot
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mt-12 md:mt-14"
            >
              <Console />
              <p className="mt-3 text-center text-[12px] text-white/35">
                A real public failure log and Veyra's recorded investigation of it, replayed. Nothing staged.
              </p>
            </motion.div>
          </div>
        </section>

        {/* PAIN */}
        <section className="border-t border-white/[0.07]">
          <div className="container mx-auto max-w-6xl px-6 py-24 md:py-32">
            <motion.p {...enter} className="max-w-5xl text-[28px] font-medium leading-[1.2] tracking-[-0.02em] text-white/45 md:text-[44px]">
              <span className="text-white">When robots fail in the field, senior engineers spend days</span> reconstructing logs,
              testing hypotheses, and deciding what to check next.{" "}
              <span className="text-white">Veyra makes that loop faster and repeatable.</span>
            </motion.p>
          </div>
        </section>

        {/* TODAY */}
        <section id="today" className="scroll-mt-16 border-t border-white/[0.07]">
          <div className="container mx-auto max-w-6xl px-6 py-24">
            <motion.div {...enter} className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <p className="text-[13px] text-[#84d7b0]">Working today</p>
                <h2 className="mt-3 text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] md:text-[48px]">
                  One loop, from the first log line to a lesson you can trust.
                </h2>
              </div>
              <a href={DEMO_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[14px] text-white/70 underline decoration-white/20 underline-offset-4 hover:text-white">
                Step through it in the live demo <ArrowUpRight size={14} />
              </a>
            </motion.div>
            <motion.div {...enter}>
              <Loop />
            </motion.div>
            <p className="mt-4 text-[13px] text-white/40">Read-only. No control path into your machines.</p>
          </div>
        </section>
      </div>

      {/* EVIDENCE */}
      <section id="evidence" className="scroll-mt-16 bg-[#f4f6f9]">
        <div className="container mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center">
            <motion.div {...enter}>
              <p className="text-[13px] text-primary">Evidence</p>
              <h2 className="mt-3 text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground md:text-[48px]">
                Measured on real failures, not staged demos.
              </h2>
              <p className="mt-6 text-[16px] leading-relaxed text-muted-foreground">
                We ran Veyra blind on 14 failure logs that engineers posted in public issue threads. The answer keys,
                taken from the fixes and maintainer conclusions, were sealed before anything ran. Three cases are still
                unresolved upstream, to test whether Veyra admits what a log cannot show.
              </p>
            </motion.div>

            <motion.div {...enter} className="rounded-2xl bg-background p-6 shadow-[0_1px_0_rgba(15,23,42,0.06),0_20px_60px_-30px_rgba(15,23,42,0.25)] sm:p-8">
              <p className="text-[14px] font-medium text-foreground">Concrete, actionable next step</p>
              <p className="mt-1 text-[13px] text-muted-foreground">Graded blind, latest batch of 8 real cases, out of 16 points</p>
              <div className="mt-6 space-y-4">
                {[
                  { label: "Veyra", v: 16, strong: true },
                  { label: "Same AI model, working alone", v: 8, strong: false },
                ].map((b) => (
                  <div key={b.label}>
                    <div className="flex items-baseline justify-between text-[13px]">
                      <span className={b.strong ? "font-medium text-foreground" : "text-muted-foreground"}>{b.label}</span>
                      <span className={`font-mono ${b.strong ? "text-foreground" : "text-muted-foreground"}`}>{b.v}/16</span>
                    </div>
                    <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-[#e7ebf1]">
                      <motion.div
                        initial={reduce ? false : { width: 0 }}
                        whileInView={{ width: `${(b.v / 16) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        style={reduce ? { width: `${(b.v / 16) * 100}%` } : undefined}
                        className={`h-full rounded-full ${b.strong ? "bg-[#0a1424]" : "bg-[#b9c3d1]"}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 grid gap-6 border-t border-border pt-6 sm:grid-cols-2">
                <div>
                  <p className="text-[14px] font-medium text-foreground">Every claim points to a log line</p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">Quotes and line numbers are checked mechanically. A wrong citation is rejected.</p>
                </div>
                <div>
                  <p className="text-[14px] font-medium text-foreground">Observed is kept apart from inferred</p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">On a tamper-evident case history, so the record holds up later.</p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div {...enter} className="mt-16 flex flex-col gap-6 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[13px] text-muted-foreground">Real logs from public issue threads, in projects including</p>
              <p className="mt-2 font-mono text-[13px] leading-relaxed text-foreground">{stacks.join("  /  ")}</p>
            </div>
            <div className="flex shrink-0 items-center gap-4">
              <span className="text-[13px] text-muted-foreground">Member of</span>
              <img src="/badges/nvidia-inception-program-badge-rgb-for-screen.svg" alt="NVIDIA Inception Program" className="h-auto w-[130px]" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHO */}
      <section id="who" className="scroll-mt-16 bg-background">
        <div className="container mx-auto max-w-6xl px-6 py-24">
          <motion.h2 {...enter} className="max-w-3xl text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground md:text-[48px]">
            Built for the teams who own the moment a machine meets the real world.
          </motion.h2>
          <ul className="mt-12 border-t border-border">
            {audiences.map((a) => (
              <motion.li
                {...enter}
                key={a.who}
                className="group grid gap-2 border-b border-border py-7 transition-colors md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-10"
              >
                <span className="text-[19px] font-semibold leading-snug text-foreground">{a.who}</span>
                <span className="text-[16px] leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground">“{a.moment}”</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* NEXT */}
      <section id="next" className="scroll-mt-16 overflow-hidden bg-[#0a1424] text-white">
        <div className="container mx-auto max-w-6xl px-6 py-24 md:py-28">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center">
            <motion.div {...enter}>
              <p className="text-[13px] text-[#84d7b0]">Where Veyra is going</p>
              <h2 className="mt-3 text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] md:text-[48px]">
                Every physical AI model has to meet reality. We want that to take fewer tries.
              </h2>
              <p className="mt-6 text-[16px] leading-relaxed text-white/65">
                World models and robot foundation models are getting better at predicting the physical world. Getting one
                to work on a specific machine, task and site still takes rounds of physical experiments, chosen by hand by
                senior engineers. Veyra is built for that gap: the fewest experiments between an intelligent model and a
                machine that works.
              </p>
            </motion.div>
            <motion.div {...enter}>
              <Narrowing />
              <p className="mt-2 text-center text-[12px] text-white/35">The goal, drawn: each experiment should leave fewer explanations standing.</p>
            </motion.div>
          </div>

          <ol className="relative mt-20 grid gap-10 md:grid-cols-3 md:gap-8">
            <span aria-hidden className="absolute left-0 right-0 top-[7px] hidden h-px bg-gradient-to-r from-[#84d7b0] via-white/20 to-white/5 md:block" />
            {horizons.map((h, i) => (
              <motion.li key={h.when} {...enter} transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.1 }} className="relative">
                <span className={`relative z-10 block h-[15px] w-[15px] rounded-full border-2 ${i === 0 ? "border-[#84d7b0] bg-[#84d7b0]" : "border-white/30 bg-[#0a1424]"}`} />
                <div className="mt-5 flex items-baseline gap-3">
                  <span className="text-[15px] font-semibold">{h.when}</span>
                  <span className={`text-[12px] ${i === 0 ? "text-[#84d7b0]" : "text-white/45"}`}>{h.state}</span>
                </div>
                <h3 className="mt-3 text-[20px] font-semibold leading-snug">{h.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/60">{h.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* PILOT */}
      <section id="pilot" className="scroll-mt-16 bg-background">
        <div className="container mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-end">
            <motion.div {...enter}>
              <p className="text-[13px] text-primary">Design partner pilot</p>
              <h2 className="mt-3 text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground md:text-[48px]">
                Six to eight weeks on your own failures.
              </h2>
              <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
                Pick one class of issue your engineers already chase. Connect read-only. Use Veyra on real incidents as
                they happen, and measure it against how your team works today.
              </p>
              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-[#0a1424] px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-[#16243b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Request a pilot <ArrowRight size={15} />
              </Link>
            </motion.div>
            <motion.dl {...enter} className="divide-y divide-border border-y border-border">
              {[
                ["Time to cause", "From first report to a supported explanation"],
                ["Checks run", "How many it took to settle the question"],
                ["Senior engineer hours", "Time spent per case by the people who know the system"],
                ["Repeat cases", "How often a past lesson shortened a new one"],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-4 py-4">
                  <dt className="text-[15px] font-semibold text-foreground">{k}</dt>
                  <dd className="text-[14px] leading-relaxed text-muted-foreground">{v}</dd>
                </div>
              ))}
            </motion.dl>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-[#f4f6f9]">
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
