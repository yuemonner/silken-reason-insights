import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Layout from "@/components/Layout";

const DEMO_URL = "https://demo.silkenreason.com/field-case";
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
/* Expected vs observed: Veyra's engine output on the demo shuttle      */
/* case (SYNTHETIC data, labelled as such on the page).                 */
/* ------------------------------------------------------------------ */

type Beat = { t: string; kind: "first" | "divergence" | "protection" | "symptom"; layer: string; text: string; line: number };
const shuttleChain: Beat[] = [
  { t: "+0.25 s", kind: "first", layer: "Controller", text: "Torque command 93 N·m, above the battery's limit of 80.2", line: 1385 },
  { t: "+0.25 s", kind: "divergence", layer: "Power", text: "Pack current 174 A, above its 150 A discharge limit", line: 1386 },
  { t: "+0.35 s", kind: "divergence", layer: "Power", text: "Front-right inverter voltage falls below 55 V", line: 1410 },
  { t: "+0.40 s", kind: "protection", layer: "Protection", text: "Inverter cuts torque on under-voltage, as designed", line: 1424 },
  { t: "+0.50 s", kind: "symptom", layer: "Symptom", text: "Emergency stop on the ramp, remote code 7", line: 1438 },
];
const beatStyle: Record<Beat["kind"], { dot: string; tag: string; label: string }> = {
  first: { dot: "bg-[#84d7b0]", tag: "bg-[#84d7b0] text-[#062016]", label: "First divergence" },
  divergence: { dot: "bg-[#f2c46d]", tag: "text-[#f2c46d] ring-1 ring-inset ring-[#f2c46d]/40", label: "Divergence" },
  protection: { dot: "bg-[#93c5fd]", tag: "text-[#bcdcff] ring-1 ring-inset ring-[#93c5fd]/45", label: "Worked as designed" },
  symptom: { dot: "bg-white/60", tag: "text-white/70 ring-1 ring-inset ring-white/25", label: "What was reported" },
};

const ShuttleConsole = () => {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? shuttleChain.length + 1 : 0);
  useEffect(() => {
    if (reduce) return;
    const ids = Array.from({ length: shuttleChain.length + 1 }).map((_, i) => setTimeout(() => setN(i + 1), 500 + i * 700));
    return () => ids.forEach(clearTimeout);
  }, [reduce]);
  return (
    <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      <div className="min-w-0 border-b border-white/[0.07] p-4 sm:p-5 lg:border-b-0 lg:border-r">
        <p className="mb-3 text-[11.5px] text-white/40">What should have happened, against what did · cold morning launch on an 8 % ramp</p>
        <ol className="relative space-y-2.5 border-l border-white/15 pl-4">
          {shuttleChain.map((b, i) => (
            <motion.li
              key={b.line}
              initial={reduce ? false : { opacity: 0, x: -6 }}
              animate={n > i ? { opacity: 1, x: 0 } : { opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <span className={`absolute -left-[21px] top-[6px] h-2.5 w-2.5 rounded-full ${beatStyle[b.kind].dot}`} />
              <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                <span className="font-mono text-[11.5px] text-white/40">{b.t}</span>
                <span className={`rounded-full px-2 py-[1px] text-[10.5px] font-medium ${beatStyle[b.kind].tag}`}>{beatStyle[b.kind].label}</span>
                <span className="text-[11px] text-white/35">{b.layer} · line {b.line}</span>
              </div>
              <p className={`mt-0.5 text-[13px] leading-snug ${b.kind === "first" ? "text-white" : "text-white/75"}`}>{b.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={n > shuttleChain.length ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="min-w-0 space-y-4 p-4 sm:p-5"
      >
        <div>
          <p className="text-[11.5px] text-white/40">Same vehicle, same software, warm afternoon</p>
          <p className="mt-1 text-[13px] leading-snug text-white/85">Every expectation held. The command only crossed the battery's limit on the cold launch.</p>
        </div>
        <div>
          <p className="text-[11.5px] text-white/40">What the data cannot tell</p>
          <p className="mt-1 text-[13px] leading-snug text-white/85">Whether the parking-brake calipers physically opened. No signal records it, so Veyra says so instead of assuming it.</p>
        </div>
        <div>
          <p className="text-[11.5px] text-white/40">Next decisive check</p>
          <p className="mt-1 text-[14px] font-medium leading-snug text-white">Measure the resistance of each front-right cable segment at the depot</p>
          <p className="mt-1 text-[12px] leading-snug text-white/50">Instead of swapping the inverter, which did not fix it.</p>
        </div>
      </motion.div>
    </div>
  );
};

const cases = [
  { id: "real", label: "Real public log", sub: "micro-ROS on STM32H7 · session drops right after it opens" },
  { id: "shuttle", label: "Expected vs observed", sub: "Autonomous shuttle stops on a ramp · synthetic demo data" },
] as const;

const HeroConsole = () => {
  const [tab, setTab] = useState<(typeof cases)[number]["id"]>("real");
  return (
    <div>
      <div role="tablist" aria-label="Example investigations" className="mb-3 flex flex-wrap justify-center gap-2">
        {cases.map((c) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={tab === c.id}
            onClick={() => setTab(c.id)}
            className={`rounded-full px-4 py-1.5 text-[12.5px] transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#84d7b0] ${
              tab === c.id ? "bg-white/[0.1] text-white ring-1 ring-inset ring-white/20" : "text-white/50 hover:text-white"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
      {tab === "real" ? (
        <Console />
      ) : (
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#08111f] shadow-[0_0_0_1px_rgba(132,215,176,0.04),0_60px_140px_-50px_rgba(0,0,0,0.9)]">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-white/[0.07] px-4 py-3 sm:px-5">
            <span className="flex items-center gap-2 text-[12px] text-white/70">
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#84d7b0]" />
              Expected vs observed
            </span>
            <span className="text-[12px] text-white/35">{cases[1].sub}</span>
          </div>
          <ShuttleConsole />
        </div>
      )}
      <p className="mt-3 text-center text-[12px] text-white/35">
        {tab === "real"
          ? "A real public failure log and Veyra's recorded investigation of it, replayed. Nothing staged."
          : "Veyra's engine output on a synthetic demo case: the vehicle and its log are generated, the analysis is real."}
      </p>
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
    verb: "Expect",
    title: "Compare it with what it should have done.",
    body: "From the command, through the controller, to motors, power and brakes. Veyra finds the first moment behaviour left the expected path, and keeps protections that fired as designed apart from the fault.",
  },
  {
    verb: "Separate",
    title: "Measured, inferred, and what no signal shows.",
    body: "Every claim points to a line or a computed relation. An inferred number carries its assumptions. What the data cannot tell apart stays open, and is named.",
  },
  {
    verb: "Test",
    title: "Choose the cheapest check that settles it.",
    body: "Each check shows what every remaining explanation predicts, what it costs, and where it can mislead. The data is asked first; only what it cannot answer goes to the field.",
  },
  {
    verb: "Learn",
    title: "Replay how it was solved, and keep what holds.",
    body: "Each step your engineers took is replayed against only the data recorded before it: which checks that data shows were avoidable, which are only estimates, and where the evidence cannot say. A lesson stays a candidate until the fix holds.",
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
      <div>
        <p className="text-[11.5px] text-white/40">Cold morning launch, synthetic demo case</p>
        <ol className="mt-3 space-y-2 border-l border-white/15 pl-4">
          {shuttleChain.map((b) => (
            <li key={b.line} className="relative">
              <span className={`absolute -left-[21px] top-[6px] h-2.5 w-2.5 rounded-full ${beatStyle[b.kind].dot}`} />
              <span className="font-mono text-[11.5px] text-white/40">{b.t}</span>
              <span className={`ml-2 text-[13px] ${b.kind === "first" ? "text-white" : "text-white/70"}`}>{b.text}</span>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-[12.5px] leading-snug text-white/50">The code said "front-right motor fault". The first thing to go wrong was the torque command.</p>
      </div>
    );
  if (i === 2)
    return (
      <div className="space-y-2.5">
        {[
          { tag: "Measured", c: "text-[#84d7b0] ring-[#84d7b0]/40", text: "Front-right voltage drop grows 3.2× faster with current than the other wheels', in 3 of 3 launches" },
          { tag: "Inferred", c: "text-[#bcdcff] ring-[#93c5fd]/45", text: "22–32 mΩ of branch resistance, if it carries 21–29 % of the current as the torques suggest" },
          { tag: "Not recorded", c: "text-white/60 ring-white/20", text: "Each branch's current. So a bad connector, a bad cable and an inverter drawing too much current stay open" },
        ].map((r) => (
          <div key={r.tag} className="flex gap-3 rounded-lg bg-white/[0.03] p-3">
            <span className={`h-fit shrink-0 rounded-full px-2 py-[1px] text-[11px] font-medium ring-1 ring-inset ${r.c}`}>{r.tag}</span>
            <span className="text-[13px] leading-snug text-white/85">{r.text}</span>
          </div>
        ))}
      </div>
    );
  if (i === 3)
    return (
      <div>
        <svg viewBox="0 0 440 210" className="h-auto w-full" role="img" aria-label="One depot check with three possible results, each pointing to a different cause">
          <rect x="1" y="74" width="150" height="62" rx="8" fill="rgba(132,215,176,0.1)" stroke="#84d7b0" />
          <text x="76" y="97" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="600">Resistance of each</text>
          <text x="76" y="113" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="600">cable segment</text>
          <text x="76" y="128" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="11">parked, at the depot</text>
          {[
            { y: 28, a: "Connector segment high", b: "→ contact" },
            { y: 105, a: "Cable or fuse high", b: "→ conductor" },
            { y: 182, a: "All normal", b: "→ inverter, or a load-only contact" },
          ].map((o) => (
            <g key={o.a}>
              <path d={`M151 105 C 190 105, 190 ${o.y}, 228 ${o.y}`} fill="none" stroke="rgba(255,255,255,0.25)" />
              <circle cx="230" cy={o.y} r="3" fill="#84d7b0" />
              <text x="242" y={o.y - 3} fill="rgba(255,255,255,0.85)" fontSize="12">{o.a}</text>
              <text x="242" y={o.y + 13} fill="rgba(255,255,255,0.45)" fontSize="11">{o.b}</text>
            </g>
          ))}
        </svg>
        <p className="mt-2 text-[12.5px] leading-snug text-white/50">About an hour with a meter at the depot separates the three, before anyone commits to a €1,800 inverter swap.</p>
      </div>
    );
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {[
          ["5", "steps engineers took"],
          ["2", "were not the issue"],
          ["0", "verified avoidable"],
        ].map(([v, k]) => (
          <div key={k} className="rounded-lg border border-white/10 p-3">
            <p className="text-[22px] font-semibold text-white">{v}</p>
            <p className="text-[11.5px] leading-snug text-white/50">{k}</p>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-[#84d7b0]/30 bg-[#84d7b0]/[0.05] p-3">
        <p className="text-[11.5px] text-[#84d7b0]">Replayed against the data</p>
        <p className="mt-1 text-[13px] leading-snug text-white/85">After the inverter swap, the front-right drop was unchanged: the swap never touched the cause. A cheaper meter check could have come first, but the data before it was 12 days old: an estimate, not a saving.</p>
      </div>
      <div className="flex items-center justify-between rounded-lg border border-white/10 p-3">
        <p className="text-[13px] text-white/85">Lesson saved</p>
        <span className="rounded-full px-2 py-[1px] text-[11px] text-[#f2c46d] ring-1 ring-inset ring-[#f2c46d]/40">candidate until the fix holds</span>
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
  { when: "Today", state: "Live", title: "Checks behaviour against explicit, reviewable expectations", body: "Engineering rules your team can read and correct, applied to every log. Every claim is tied to evidence, and every blind spot is named." },
  { when: "Next", state: "Building", title: "Builds verified machine knowledge", body: "Learns from specifications, healthy operations and engineers' confirmed findings, so investigations become more machine-specific over time." },
  { when: "Then", state: "Research", title: "Carries verified knowledge between machines", body: "A failure confirmed on one machine, recognised on another with different error codes, so new machines and new models need fewer tries to work." },
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

/* One field issue pulls in five teams, each rebuilding the same evidence. */
const teams = ["Controls", "Software", "Hardware", "Suppliers", "Site operations"];
const FanOut = () => (
  <svg viewBox="0 0 460 256" className="h-auto w-full" role="img" aria-label="One field issue pulls in controls, software, hardware, suppliers and site operations">
    <rect x="1" y="100" width="140" height="50" rx="10" fill="#0a1424" />
    <text x="71" y="122" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="600">One field issue</text>
    <text x="71" y="139" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11">emergency stop, code 7</text>
    {teams.map((t, i) => {
      const y = 14 + i * 50;
      return (
        <g key={t}>
          <path d={`M141 125 C 200 125, 210 ${y + 14}, 262 ${y + 14}`} fill="none" stroke="#b9c3d1" strokeWidth="1.2" />
          <rect x="264" y={y} width="180" height="28" rx="14" fill="#f4f6f9" stroke="#d7dde6" />
          <text x="280" y={y + 18} fill="#0a1424" fontSize="12.5" fontWeight="500">{t}</text>
          <text x="432" y={y + 18} textAnchor="end" fill="#8a94a3" fontSize="11">same logs</text>
        </g>
      );
    })}
  </svg>
);

const enterProps = (reduce: boolean | null) =>
  reduce
    ? {}
    : { initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" }, transition: { duration: 0.55 } };

const Landing = () => {
  const reduce = useReducedMotion();
  const enter = enterProps(reduce);
  useEffect(() => {
    document.title = "Veyra | The AI field engineer for physical AI";
  }, []);

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
                Veyra knows what your machine should have done, finds the moment it stopped doing it, and picks the
                cheapest check that settles why. When the data cannot tell, it says so.
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
              <HeroConsole />
            </motion.div>
          </div>
        </section>

        {/* PAIN */}
        <section className="border-t border-white/[0.07]">
          <div className="container mx-auto max-w-6xl px-6 py-24 md:py-32">
            <motion.p {...enter} className="max-w-5xl text-[28px] font-medium leading-[1.2] tracking-[-0.02em] text-white/45 md:text-[44px]">
              <span className="text-white">When a machine fails in the field, engineers swap parts, call the site and wait for it
              to happen again.</span> Many of those checks turn out not to be the issue.{" "}
              <span className="text-white">Veyra starts from the data, so the first check is the one that settles the most.</span>
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
                  From the first log line to the check that settles it.
                </h2>
              </div>
              <a href={DEMO_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[14px] text-white/70 underline decoration-white/20 underline-offset-4 hover:text-white">
                Step through it in the live demo <ArrowUpRight size={14} />
              </a>
            </motion.div>
            <motion.div {...enter}>
              <Loop />
            </motion.div>
            <p className="mt-4 text-[13px] text-white/40">
              Read-only. No control path into your machines. Examples: a real public micro-ROS log, and a synthetic demo vehicle.
            </p>
          </div>
        </section>
      </div>

      {/* BOTTLENECK */}
      <section id="bottleneck" className="scroll-mt-16 bg-background">
        <div className="container mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
            <motion.div {...enter}>
              <p className="text-[13px] text-primary">The operational bottleneck</p>
              <h2 className="mt-3 text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground md:text-[48px]">
                Finding the cause often costs more than fixing it.
              </h2>
              <p className="mt-6 text-[16px] leading-relaxed text-muted-foreground">
                A single field issue can pull engineers across controls, software, hardware, suppliers and on-site
                operations. Each team reconstructs the same evidence, checks are repeated, and parts get replaced before
                anyone understands the cause.
              </p>
              <p className="mt-5 text-[17px] font-medium leading-relaxed text-foreground">
                Veyra is built to cut the work between the first report and a defensible next decision.
              </p>
            </motion.div>
            <motion.div {...enter}>
              <FanOut />
              <div className="mt-8 flex items-baseline gap-4 border-t border-border pt-6">
                <span className="shrink-0 font-mono text-[36px] font-semibold leading-none tracking-[-0.02em] text-foreground">2–3</span>
                <span className="text-[14px] leading-relaxed text-muted-foreground">
                  complex cross-team investigations every week, reported by one autonomous-vehicle maker we
                  interviewed.
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* EVIDENCE */}
      <section id="evidence" className="scroll-mt-16 bg-[#f4f6f9]">
        <div className="container mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center">
            <motion.div {...enter}>
              <p className="text-[13px] text-primary">Evidence</p>
              <h2 className="mt-3 text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground md:text-[48px]">
                Tested blind. Misses published.
              </h2>
              <p className="mt-6 text-[16px] leading-relaxed text-muted-foreground">
                On real failure logs from public issue threads, answer keys were sealed before anything ran. Veyra's
                physics checks were run once on held-out simulated vehicles, with the pass criteria written down first.
                The full design, the results it did not win, and the limits are published.
              </p>
              <Link
                to="/veyra/evaluation"
                className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
              >
                What works, what doesn&apos;t, and the evidence <ArrowRight size={14} />
              </Link>
            </motion.div>

            <motion.div {...enter} className="rounded-2xl bg-background p-6 shadow-[0_1px_0_rgba(15,23,42,0.06),0_20px_60px_-30px_rgba(15,23,42,0.25)] sm:p-8">
              <p className="text-[14px] font-medium text-foreground">A next step an engineer can act on right away</p>
              <p className="mt-1 text-[13px] text-muted-foreground">8 held-out real failure logs, graded blind, out of 16 points</p>
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
                  <p className="font-mono text-[22px] font-semibold text-foreground">0 of 120</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">healthy simulated vehicles wrongly flagged by the physics checks</p>
                </div>
                <div>
                  <p className="text-[14px] font-medium text-foreground">Every claim points to a log line</p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">Quotes and line numbers are checked mechanically. A wrong citation is rejected.</p>
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
                Today, Veyra investigates field failures. The same discipline, explicit expectations, measured evidence and
                the fewest checks that settle a question, is what it takes to get world models and robot foundation models
                working on a specific machine, task and site. That is where we are headed: the fewest experiments between an
                intelligent model and a machine that works.
              </p>
              <p className="mt-5 text-[17px] font-medium leading-relaxed text-white">
                To get there, AI must understand how machines work, what they are expected to do, what actually happens,
                and what the available evidence cannot yet explain.
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
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <motion.div {...enter}>
              <p className="text-[13px] text-primary">Design partner pilot</p>
              <h2 className="mt-3 text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground md:text-[48px]">
                Six to eight weeks, starting with failures you have already solved.
              </h2>
              <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
                No production access to begin. We earn it in three steps, and measure each one against how your team works today.
              </p>
              <ol className="mt-7 max-w-xl space-y-4">
                {[
                  ["Weeks 1–2", "Your closed cases", "Exported logs from five to eight solved incidents, and how your engineers debugged them. Veyra replays each one against the data recorded before each step: what it already showed, which checks it shows were avoidable, and where it cannot say."],
                  ["Weeks 2–4", "Your rules, reviewed", "Your engineers review and correct the machine expectations Veyra checks against. Nothing it uses is hidden."],
                  ["Weeks 4–8", "Live, read-only", "New incidents as they happen, on one class of issue your team already chases."],
                ].map(([when, what, body], k) => (
                  <li key={when} className="grid grid-cols-[28px_minmax(0,1fr)] gap-3">
                    <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#0a1424] font-mono text-[12px] text-white">{k + 1}</span>
                    <div>
                      <p className="text-[15px] font-semibold text-foreground">{what} <span className="ml-1 text-[12.5px] font-normal text-muted-foreground">{when}</span></p>
                      <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">{body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-[#0a1424] px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-[#16243b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Request a pilot <ArrowRight size={15} />
              </Link>
            </motion.div>
            <motion.div {...enter}>
            <p className="mb-3 text-[13px] text-muted-foreground">What the pilot measures</p>
            <dl className="divide-y divide-border border-y border-border">
              {[
                ["Time to cause", "From first report to a supported explanation"],
                ["Checks run", "How many it took to settle the question"],
                ["Senior engineer hours", "Time spent per case by the people who know the system"],
                ["Avoidable work", "Checks that were not the issue, split into verified from the data recorded before them, estimated, and undecidable. Only verified ones count hours and cost."],
                ["Repeat cases", "How often a past lesson shortened a new one"],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-4 py-4">
                  <dt className="text-[15px] font-semibold text-foreground">{k}</dt>
                  <dd className="text-[14px] leading-relaxed text-muted-foreground">{v}</dd>
                </div>
              ))}
            </dl>
            </motion.div>
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
              <li><Link to="/veyra/evaluation" className="text-muted-foreground transition-colors hover:text-foreground">Evaluation</Link></li>
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
