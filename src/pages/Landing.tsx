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
/* A real field failure (real data, not public, anonymised): Veyra's   */
/* recorded investigation of an autonomous vehicle's high-voltage loss. */
/* ------------------------------------------------------------------ */

type Lane = "system" | "physics";
const fieldBeats: { lane: Lane; title: string; text: string; tag?: string }[] = [
  { lane: "system", title: "Complaint against the record", text: "Reported: the vehicle could not drive. Recorded: no drive request at all. It was parked." },
  { lane: "physics", title: "Charge counted", text: "Displayed charge fell 47 % → 7 % in 40 s while only 0.08 Ah flowed. The battery was not empty: the estimate was wrong.", tag: "16 s" },
  { lane: "system", title: "Shutdown rebuilt across subsystems", text: "BMS, VCU, DC/DC and contactors: 8 state changes in 5.5 s. Protection thresholds inferred from timing: 2.9 / 2.7 / 2.5 V." },
  { lane: "physics", title: "Trigger kept apart from cause", text: "The weakest cell's voltage fall sped up from 9 to 112 mV/min and the spread grew from 58 to 319 mV at a constant charge gap: the end of its discharge curve tripped the protection, not a new fault." },
  { lane: "system", title: "Safety across resets", text: "After each reset the system allowed high voltage again, 5 times, with the weakest cell still below the level-2 voltage. Hold.", tag: "safety" },
];
const fieldCauses: { area: string; status: Status }[] = [
  { area: "SOC estimate drifted", status: "open" },
  { area: "Usable capacity low", status: "open" },
  { area: "Current sensor reads low", status: "open" },
  { area: "Load bypassing the sensor", status: "weakened" },
  { area: "Cell sensing or harness fault", status: "weakened" },
  { area: "Weak cell alone", status: "ruled out" },
];
const laneStyle: Record<Lane, { label: string; c: string }> = {
  system: { label: "System-level", c: "text-[#f2c46d] ring-[#f2c46d]/40" },
  physics: { label: "Physics", c: "text-[#84d7b0] ring-[#84d7b0]/40" },
};

const FieldConsole = () => {
  const reduce = useReducedMotion();
  const total = fieldBeats.length + 2;
  const [n, setN] = useState(reduce ? total : 0);
  const [round, setRound] = useState(0);
  useEffect(() => {
    if (reduce) return;
    setN(0);
    const ids = Array.from({ length: total }).map((_, i) => setTimeout(() => setN(i + 1), 500 + i * 1100));
    return () => ids.forEach(clearTimeout);
  }, [reduce, round, total]);
  const done = n >= total;
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#08111f] shadow-[0_0_0_1px_rgba(132,215,176,0.04),0_60px_140px_-50px_rgba(0,0,0,0.9)]">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-white/[0.07] px-4 py-3 sm:px-5">
        <span className="flex items-center gap-2 text-[12px] text-white/70">
          <span className="relative flex h-2 w-2">
            <span className={`absolute inline-flex h-full w-full rounded-full bg-[#84d7b0] ${!done && !reduce ? "animate-ping opacity-60" : "opacity-0"}`} />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#84d7b0]" />
          </span>
          {done ? "Investigation complete" : "Investigating"}
        </span>
        <span className="text-[12px] text-white/35">Autonomous vehicle · lost high voltage while parked · real field data, not public</span>
        {!reduce && (
          <button onClick={() => setRound((r) => r + 1)} className="ml-auto text-[12px] text-white/45 hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#84d7b0]">
            Replay
          </button>
        )}
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="min-w-0 border-b border-white/[0.07] p-4 sm:p-5 lg:border-b-0 lg:border-r">
          <p className="mb-3 text-[11.5px] text-white/40">From the vehicle&apos;s own BMS and VCU logs · 2.2 million recorded values</p>
          <ol className="space-y-2.5">
            {fieldBeats.map((b, i) => (
              <motion.li
                key={b.title}
                initial={reduce ? false : { opacity: 0, x: -6 }}
                animate={n > i ? { opacity: 1, x: 0 } : { opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="rounded-lg bg-white/[0.025] px-3 py-2.5"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-2 py-[1px] text-[10.5px] font-medium ring-1 ring-inset ${laneStyle[b.lane].c}`}>{laneStyle[b.lane].label}</span>
                  <span className="text-[13px] font-medium text-white">{b.title}</span>
                  {b.tag && (
                    <span className={`rounded-full px-2 py-[1px] text-[10.5px] font-semibold ${b.tag === "safety" ? "bg-[#f87171] text-[#2a0707]" : "bg-[#84d7b0] text-[#062016]"}`}>{b.tag}</span>
                  )}
                </div>
                <p className="mt-1 text-[12.5px] leading-snug text-white/65">{b.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="min-w-0 p-4 sm:p-5">
          <motion.div initial={reduce ? false : { opacity: 0 }} animate={n > fieldBeats.length ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.4 }}>
            <p className="mb-3 text-[11.5px] text-white/40">Explanations, held to the record</p>
            <ul className="space-y-1.5">
              {fieldCauses.map((a) => (
                <li key={a.area} className="flex items-center justify-between gap-3 rounded-md bg-white/[0.025] px-3 py-[7px]">
                  <span className={`truncate text-[12.5px] ${a.status === "ruled out" ? "text-white/35" : "text-white/85"}`}>{a.area}</span>
                  <span className={`shrink-0 rounded-full px-2 py-[1px] text-[10.5px] font-medium ${chip[a.status]}`}>{a.status}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[11.5px] leading-snug text-white/40">The logs alone cannot separate the three open causes. Veyra says so.</p>
          </motion.div>
          <motion.div initial={reduce ? false : { opacity: 0, y: 6 }} animate={done ? { opacity: 1, y: 0 } : { opacity: 0 }} transition={{ duration: 0.4 }} className="mt-5">
            <p className="text-[11.5px] text-white/40">Next decisive check</p>
            <p className="mt-1.5 text-[14px] font-medium leading-snug text-white">Read the BMS calibration history and charger log since the last full charge</p>
            <p className="mt-2 border-l border-[#84d7b0]/50 pl-3 text-[12px] leading-snug text-white/60">
              Confirmed afterwards by the manufacturer: SOC drift after a long time without a full charge, found exactly there.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const cases = [
  { id: "field", label: "Real field case" },
  { id: "public", label: "Real public log" },
] as const;

const HeroConsole = () => {
  const [tab, setTab] = useState<(typeof cases)[number]["id"]>("field");
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
      {tab === "field" ? <FieldConsole /> : <Console />}
      <p className="mt-3 text-center text-[12px] text-white/35">
        {tab === "field"
          ? "A real field failure on an autonomous vehicle. Real data, not public, anonymised. Veyra's recorded investigation, replayed."
          : "A real public failure log and Veyra's recorded investigation of it, replayed. Nothing staged."}
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
    title: "Start from the machine's own logs.",
    body: "Upload exported logs or connect read-only. Veyra decides which signals are real measurements before it trusts any of them: copies are not counted twice, and a field that never moves is set aside.",
  },
  {
    verb: "Rebuild",
    title: "Reconstruct what happened, across subsystems.",
    body: "Software, controls, electrical systems and protections, in one sequence. Veyra checks the complaint against the record, infers thresholds from timing, and follows the system through every reset.",
  },
  {
    verb: "Reason",
    title: "Hold every explanation to physics.",
    body: "Charge, voltage and their rates of change. Veyra separates what directly triggered a protection from the upstream cause, and says when a datasheet or a chemistry would be needed to go further.",
  },
  {
    verb: "Test",
    title: "Name what is still open, and the check that settles it.",
    body: "Each explanation is weighed against what it would require. The agent writes down predictions before testing them. What the data cannot separate stays open, and the next decisive check is the one that separates it.",
  },
  {
    verb: "Keep",
    title: "Turn one investigation into lasting knowledge.",
    body: "The mechanism your engineers confirm becomes a private knowledge record, and the checks that found it run on every new record of the same kind. How widely they apply is measured as they run.",
  },
];

const StepArtifact = ({ i }: { i: number }) => {
  if (i === 0)
    return (
      <div className="space-y-2.5">
        {[
          { tag: "Trusted", c: "text-[#84d7b0] ring-[#84d7b0]/40", text: "Lowest and highest cell voltage, pack current, displayed SOC, fault level, contactor states" },
          { tag: "Copy", c: "text-[#bcdcff] ring-[#93c5fd]/45", text: "The VCU's fault level and pack current repeat the BMS's: used once, not as extra evidence" },
          { tag: "Set aside", c: "text-white/60 ring-white/20", text: "A 'post-contactor voltage' that equals pack voltage even with the contactors open: it does not measure what its name says" },
        ].map((r) => (
          <div key={r.tag} className="flex gap-3 rounded-lg bg-white/[0.03] p-3">
            <span className={`h-fit shrink-0 rounded-full px-2 py-[1px] text-[11px] font-medium ring-1 ring-inset ${r.c}`}>{r.tag}</span>
            <span className="text-[13px] leading-snug text-white/85">{r.text}</span>
          </div>
        ))}
        <p className="pt-1 text-[12px] text-white/40">Real field case, autonomous vehicle: BMS and VCU logs from three time windows.</p>
      </div>
    );
  if (i === 1)
    return (
      <div>
        <p className="text-[11.5px] text-white/40">The shutdown, rebuilt in order</p>
        <ol className="mt-3 space-y-2 border-l border-white/15 pl-4 font-mono text-[12px]">
          {[
            ["820.08 s", "BMS fault level 2 → 3, high voltage not allowed"],
            ["820.18 s", "Vehicle READY → ACC"],
            ["824.48 s", "DC/DC off, yet 5.9 A still flows"],
            ["825.59 s", "Main contactors open"],
            ["+5 resets", "High voltage allowed again each time, weakest cell still below 2.70 V"],
          ].map(([t, x], k) => (
            <li key={t} className="relative">
              <span className={`absolute -left-[21px] top-[5px] h-2.5 w-2.5 rounded-full ${k === 4 ? "bg-[#f87171]" : "bg-[#f2c46d]"}`} />
              <span className="text-white/40">{t}</span>
              <span className={`ml-2 font-sans text-[13px] ${k === 4 ? "text-white" : "text-white/75"}`}>{x}</span>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-[12.5px] leading-snug text-white/50">Reported: "could not drive". Recorded: no drive request at all. The question became why a parked vehicle reached a protective shutdown.</p>
      </div>
    );
  if (i === 2)
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          {[
            ["40 pts", "SOC drop"],
            ["0.08 Ah", "charge that flowed"],
            ["16 s", "to surface it"],
          ].map(([v, k]) => (
            <div key={k} className="rounded-lg border border-white/10 p-3">
              <p className="text-[20px] font-semibold text-white">{v}</p>
              <p className="text-[11.5px] leading-snug text-white/50">{k}</p>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-[#84d7b0]/30 bg-[#84d7b0]/[0.05] p-3">
          <p className="text-[11.5px] text-[#84d7b0]">Trigger, kept apart from the cause</p>
          <p className="mt-1 text-[13px] leading-snug text-white/85">The weakest cell's voltage fall sped up from 9 to 112 mV per minute and the spread grew from 58 to 319 mV, at a constant 0.92 Ah charge gap: the end of its discharge curve tripped the protection. Why the pack was nearly empty while showing 47 % is the upstream question.</p>
        </div>
      </div>
    );
  if (i === 3)
    return (
      <div className="space-y-2">
        {fieldCauses.map((a) => (
          <div key={a.area} className="flex items-center justify-between gap-3 rounded-md bg-white/[0.03] px-3 py-[7px]">
            <span className={`text-[13px] ${a.status === "ruled out" ? "text-white/35" : "text-white/85"}`}>{a.area}</span>
            <span className={`shrink-0 rounded-full px-2 py-[1px] text-[11px] font-medium ${chip[a.status]}`}>{a.status}</span>
          </div>
        ))}
        <div className="mt-3 rounded-lg border border-white/10 p-3">
          <p className="text-[11.5px] text-white/40">Next decisive check · read-only, no vehicle contact</p>
          <p className="mt-1 text-[13.5px] font-medium leading-snug text-white">BMS calibration history and charger log since the last full charge</p>
        </div>
      </div>
    );
  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-white/10 p-3">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-[13px] font-medium text-white">Knowledge record</p>
          <span className="rounded-full px-2 py-[1px] text-[11px] text-[#84d7b0] ring-1 ring-inset ring-[#84d7b0]/40">verified by the manufacturer</span>
          <span className="text-[11px] text-white/40">private to the customer</span>
        </div>
        <p className="mt-2 text-[13px] leading-snug text-white/85">SOC estimate drift after long periods without a full charge: mechanism, signature in the logs, where it applies, what is not yet established.</p>
      </div>
      {[
        ["Charge accounting", "flags an SOC change the measured current cannot explain"],
        ["Restart after a protective shutdown", "flags high voltage allowed again while the hazard remains"],
        ["Protection thresholds from timing", "infers each level's trigger voltage and delay"],
      ].map(([k, v]) => (
        <div key={k} className="flex items-center justify-between gap-3 rounded-lg border border-white/10 p-3">
          <p className="text-[13px] text-white/85"><span className="font-medium text-white">{k}</span> · {v}</p>
          <span className="shrink-0 rounded-full px-2 py-[1px] text-[11px] text-[#f2c46d] ring-1 ring-inset ring-[#f2c46d]/40">saved</span>
        </div>
      ))}
      <p className="text-[12px] text-white/40">Saved checks run on every new record of this kind; how widely they apply is measured, not assumed.</p>
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

const methodLoop = [
  { title: "Real field validation", tag: "First case", body: "Veyra investigates a real failure from the customer's own logs, and is then checked against the cause their engineers confirmed." },
  { title: "Expert method extraction", tag: "From that case", body: "Where experienced engineers reasoned further, their method is written down step by step: trace restarts and control states, ask which signals are truly independent, check whether a load could bypass the sensor." },
  { title: "Reusable engineering intelligence", tag: "Built into Veyra", body: "Each method becomes a system-level check that runs on every new case, linking physical evidence, control sequences, the customer's own rules and the next engineering decision." },
  { title: "New-case benchmarking", tag: "Every upgrade", body: "Each upgrade is tested on cases it has not seen, with pass criteria fixed before the run. A method stays only if it never argues against the true cause." },
];

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
    document.title = "Veyra | The engineering intelligence for physical AI";
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
                The engineering intelligence for physical AI.
              </h1>
              <p className="mx-auto mt-7 max-w-2xl text-[21px] font-medium leading-snug tracking-[-0.01em] text-white md:text-[24px]">
                When machines behave unexpectedly, find out why.
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-[17px] leading-relaxed text-white/65 md:text-[18px]">
                Veyra investigates failures across the entire machine by connecting software, controls, electrical systems
                and physical behavior to reconstruct what happened, test explanations and identify the next decisive check.
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

        {/* TECHNICAL DIFFERENTIATION */}
        <section id="differentiation" className="scroll-mt-16 border-t border-white/[0.07]">
          <div className="container mx-auto max-w-6xl px-6 py-24 md:py-28">
            <motion.div {...enter} className="max-w-4xl">
              <p className="text-[13px] text-[#84d7b0]">Technical differentiation</p>
              <h2 className="mt-3 text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] md:text-[52px]">
                System-level investigation.
                <br />
                <span className="text-white/60">Physics-grounded reasoning.</span>
              </h2>
              <p className="mt-6 max-w-3xl text-[17px] leading-relaxed text-white/65 md:text-[18px]">
                Not just anomalies in logs. Veyra follows causal sequences across subsystems, checks explanations against
                physical constraints, and makes uncertainty explicit when evidence cannot distinguish competing causes.
              </p>
            </motion.div>
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
              Read-only. No control path into your machines. Example: a real field failure on an autonomous vehicle (real data, not public, anonymised).
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
              <p className="text-[13px] text-primary">Real-world field validation</p>
              <h2 className="mt-3 text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground md:text-[48px]">
                Two days of engineering investigation. 16 seconds to the decisive inconsistency.
              </h2>
              <p className="mt-6 text-[16px] leading-relaxed text-muted-foreground">
                We&apos;re working with an autonomous vehicle manufacturer to evaluate Veyra on real field failures. In the
                first case, Veyra surfaced the decisive SOC inconsistency in 16 seconds and completed its full AI
                investigation in 7 minutes: a failure that had taken two days of cross-functional engineering
                investigation, including the battery supplier.
              </p>
              <Link
                to="/veyra/evaluation"
                className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground"
              >
                What works, what doesn&apos;t, and the evidence <ArrowRight size={14} />
              </Link>
            </motion.div>

            <motion.div {...enter} className="rounded-2xl bg-background p-6 shadow-[0_1px_0_rgba(15,23,42,0.06),0_20px_60px_-30px_rgba(15,23,42,0.25)] sm:p-8">
              <p className="text-[14px] font-medium text-foreground">The first field case</p>
              <p className="mt-1 text-[13px] text-muted-foreground">A battery shutdown on an autonomous vehicle, from the vehicle&apos;s own logs</p>
              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                {[
                  { v: "~2 days", label: "Original customer investigation", strong: false },
                  { v: "16 s", label: "To surface the decisive SOC inconsistency", strong: true },
                  { v: "40 pp", label: "Unexplained SOC drop identified", strong: true },
                ].map((m) => (
                  <div key={m.label}>
                    <p className={`font-mono text-[28px] font-semibold leading-none tracking-[-0.02em] ${m.strong ? "text-foreground" : "text-muted-foreground"}`}>{m.v}</p>
                    <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{m.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 space-y-5 border-t border-border pt-6">
                {[
                  {
                    t: "The investigation",
                    b: "Veyra identified an SOC collapse that measured current could not explain, kept SOC estimation drift among the leading hypotheses, and put the charge history since the last full charge first in line to check. The manufacturer\u2019s subsequent findings confirmed SOC estimation drift associated with prolonged operation without a full charge.",
                  },
                  {
                    t: "Beyond the reported failure",
                    b: "The investigation also reconstructed repeated high-voltage re-energization attempts and deep-discharge events, exposing additional system behaviour for engineering review.",
                  },
                  {
                    t: "Why it matters",
                    b: "Veyra connects physical evidence, competing explanations and decisive next checks, and makes clear what the available data cannot prove.",
                  },
                ].map((x) => (
                  <div key={x.t}>
                    <p className="text-[14px] font-medium text-foreground">{x.t}</p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{x.b}</p>
                  </div>
                ))}
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

      {/* METHOD */}
      <section id="method" className="scroll-mt-16 overflow-hidden bg-[#0a1424] text-white">
        <div className="container mx-auto max-w-6xl px-6 py-24 md:py-28">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end">
            <motion.div {...enter}>
              <p className="text-[13px] text-[#84d7b0]">How Veyra improves</p>
              <h2 className="mt-3 text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] md:text-[48px]">
                Engineering expertise, made executable.
              </h2>
            </motion.div>
            <motion.p {...enter} className="text-[16px] leading-relaxed text-white/65">
              Veyra translates expert investigation methods into reusable system-level checks, connecting physical
              evidence, control sequences, customer-specific rules and engineering decisions.
            </motion.p>
          </div>

          <ol className="relative mt-16 grid gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <span aria-hidden className="absolute left-0 right-0 top-[7px] hidden h-px bg-gradient-to-r from-[#84d7b0] via-[#84d7b0]/40 to-white/10 lg:block" />
            {methodLoop.map((m, i) => (
              <motion.li key={m.title} {...enter} transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.12 }} className="relative">
                <span className={`relative z-10 block h-[15px] w-[15px] rounded-full border-2 ${i < 3 ? "border-[#84d7b0] bg-[#84d7b0]" : "border-[#84d7b0] bg-[#0a1424]"}`} />
                <div className="mt-5 flex items-baseline gap-3">
                  <span className="font-mono text-[13px] text-white/40">{i + 1}</span>
                  <span className="text-[12px] text-[#84d7b0]">{m.tag}</span>
                </div>
                <h3 className="mt-2 text-[20px] font-semibold leading-snug">{m.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/60">{m.body}</p>
              </motion.li>
            ))}
          </ol>
          <motion.p {...enter} className="mt-12 border-t border-white/[0.07] pt-6 text-[14px] text-white/45">
            Each new field case starts the loop again, and what it teaches is tested before Veyra keeps it.
          </motion.p>
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
