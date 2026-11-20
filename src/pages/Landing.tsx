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
  leading: "bg-[#a5b4fc] text-[#0b1220]",
  open: "text-[#bcdcff] ring-1 ring-inset ring-[#93c5fd]/45",
  weakened: "text-white/50 ring-1 ring-inset ring-white/15",
  "ruled out": "text-white/30 ring-1 ring-inset ring-white/10 line-through",
};

const toneStyle: Record<Tone, string> = {
  routine: "text-white/40",
  cause: "text-[#a5b4fc] bg-[#a5b4fc]/[0.08]",
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
            <span className={`absolute inline-flex h-full w-full rounded-full bg-[#a5b4fc] ${stage < 5 && !reduce ? "animate-ping opacity-60" : "opacity-0"}`} />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#a5b4fc]" />
          </span>
          {stage < 5 ? "Investigating" : "Updated from the engineer's result"}
        </span>
        <span className="text-[12px] text-white/35">micro-ROS on STM32H7 · session drops right after it opens</span>
        <span className="ml-auto flex items-center gap-3 text-[12px]">
          <a href={CASE_SOURCE} target="_blank" rel="noreferrer" className="text-white/45 underline decoration-white/20 underline-offset-2 hover:text-white">
            Public log
          </a>
          {!reduce && (
            <button onClick={replay} className="text-white/45 hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#a5b4fc]">
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
            <span className="text-[#a5b4fc]">Earliest abnormal data</span>
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
                      className={`text-[12px] leading-snug ${stage === 4 && b === "Buffer is valid at write, zeros on wire" ? "text-[#a5b4fc]" : "text-white/55"}`}
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
  physics: { label: "Physics", c: "text-[#a5b4fc] ring-[#a5b4fc]/40" },
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
            <span className={`absolute inline-flex h-full w-full rounded-full bg-[#a5b4fc] ${!done && !reduce ? "animate-ping opacity-60" : "opacity-0"}`} />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#a5b4fc]" />
          </span>
          {done ? "Investigation complete" : "Investigating"}
        </span>
        <span className="text-[12px] text-white/35">Autonomous vehicle · lost high voltage while parked · real field data, not public</span>
        {!reduce && (
          <button onClick={() => setRound((r) => r + 1)} className="ml-auto text-[12px] text-white/45 hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#a5b4fc]">
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
                    <span className={`rounded-full px-2 py-[1px] text-[10.5px] font-semibold ${b.tag === "safety" ? "bg-[#f87171] text-[#2a0707]" : "bg-[#a5b4fc] text-[#0b1220]"}`}>{b.tag}</span>
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
            <p className="mt-2 border-l border-[#a5b4fc]/50 pl-3 text-[12px] leading-snug text-white/60">
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
            className={`rounded-full px-4 py-1.5 text-[12.5px] transition-colors focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#a5b4fc] ${
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
          { tag: "Trusted", c: "text-[#a5b4fc] ring-[#a5b4fc]/40", text: "Lowest and highest cell voltage, pack current, displayed SOC, fault level, contactor states" },
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
        <div className="rounded-lg border border-[#a5b4fc]/30 bg-[#a5b4fc]/[0.05] p-3">
          <p className="text-[11.5px] text-[#a5b4fc]">Trigger, kept apart from the cause</p>
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
          <span className="rounded-full px-2 py-[1px] text-[11px] text-[#a5b4fc] ring-1 ring-inset ring-[#a5b4fc]/40">verified by the manufacturer</span>
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
            className={`group relative block w-full border-b border-white/[0.07] px-5 py-5 text-left transition-colors last:border-b-0 focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-[#a5b4fc] sm:px-6 ${
              i === k ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"
            }`}
          >
            <span className={`absolute left-0 top-0 h-full w-[2px] transition-colors ${i === k ? "bg-[#a5b4fc]" : "bg-transparent"}`} />
            <span className="flex items-baseline gap-3">
              <span className={`font-mono text-[12px] ${i === k ? "text-[#a5b4fc]" : "text-white/35"}`}>{s.verb}</span>
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
    <text x="71" y="139" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="11">high-voltage loss, parked</text>
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

/* Palette for the product page: graphite ink on white, one indigo accent (the product's own), dark only for product
   surfaces. */
const INK = "text-[#0b1220]";
const SUB = "text-[#475467]";
const EYEBROW = "text-[13px] font-medium text-[#3d3ac8]";
const H2 = "mt-3 text-[32px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#0b1220] md:text-[44px]";

const TWO_DAYS = 2 * 86400;
const proof: { v: string; k: string; muted?: boolean; drop?: number; count?: number }[] = [
  { v: "16 s", k: "to surface the decisive SOC inconsistency on a real field failure", drop: 16 },
  { v: "7 min", k: "for the full AI investigation, with 33 engineering tool calls", drop: 7 * 60 },
  { v: "≈ 2 days", k: "the manufacturer's own investigation, including its battery supplier", muted: true },
  { v: "4 of 4", k: "findings consistent with what the manufacturer later confirmed", count: 4 },
];

/* A duration shown falling from the manufacturer's two days to Veyra's time, on a log scale so it passes through
   days, hours and minutes on the way. Ends on the exact value; reduced motion shows the value at once. */
const fmtDuration = (sec: number) =>
  sec >= 1.5 * 86400 ? `${(sec / 86400).toFixed(1).replace(/\.0$/, "")} days` : sec >= 5400 ? `${Math.round(sec / 3600)} h` : sec >= 90 ? `${Math.round(sec / 60)} min` : `${Math.round(sec)} s`;

const useProgress = (delay: number, duration: number) => {
  const reduce = useReducedMotion();
  const [p, setP] = useState(reduce ? 1 : 0);
  useEffect(() => {
    if (reduce) { setP(1); return; }
    let raf = 0;
    const t0 = performance.now() + delay;
    const tick = (now: number) => {
      const x = Math.min(1, Math.max(0, (now - t0) / duration));
      setP(x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
      if (x < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce, delay, duration]);
  return p;
};

const ProofValue = ({ m, i }: { m: (typeof proof)[number]; i: number }) => {
  const p = useProgress(700 + i * 200, 2600);
  if (m.drop) {
    const v = Math.exp(Math.log(TWO_DAYS) + (Math.log(m.drop) - Math.log(TWO_DAYS)) * p);
    return (
      <span className={p < 1 ? "text-[#98a2b3]" : "text-[#0b1220] transition-colors duration-500"}>
        {p < 1 ? fmtDuration(v) : m.v}
      </span>
    );
  }
  if (m.count) return <span>{p < 1 ? `${Math.round(m.count * p)} of ${m.count}` : m.v}</span>;
  return <span>{m.v}</span>;
};

const systemLevel = [
  ["Checks the complaint against the record", "Reported: could not drive. Recorded: no drive request at all. The question became why a parked vehicle shut down."],
  ["Rebuilds the sequence across subsystems", "BMS, VCU, DC/DC and contactors in one timeline; protection thresholds inferred from timing when no specification is given."],
  ["Reasons across state resets", "A cleared fault state is not a safe machine: high voltage allowed again 5 times with the hazard still present became a safety hold."],
  ["Decides which signals to trust", "Copies are not counted twice; a field that does not measure what its name says is set aside."],
];
const physics = [
  ["Counts the charge", "40 points of displayed charge lost while 0.08 Ah flowed: the battery was not empty, the estimate was wrong."],
  ["Reads dynamic behaviour", "Voltage rates and cell spread separate what tripped the protection from the upstream cause."],
  ["Asks what each cause would require", "Each explanation predicts a different trace; the ones the record contradicts are weakened, not hidden."],
  ["Says what it cannot know", "No chemistry, no datasheet, no cell count: where physics needs them, Veyra names the check that would settle it."],
];

const outputs = [
  { img: "/veyra/report.webp", title: "Evidence-backed report", text: "What happened, which explanations can still hold, and what to verify next." },
  { img: "/veyra/knowledge.webp", title: "Verified engineering knowledge", text: "The mechanism your engineers confirm, and where it applies, kept as a private knowledge record." },
  { img: "/veyra/checks.webp", title: "Reusable checks", text: "The checks that found it run on every new record of the same kind; how widely they apply is measured as they run." },
];

const reliability = [
  { v: "20 of 20", k: "agent runs on the field case finished in under 8 minutes" },
  { v: "0 of 120", k: "sealed cases where the system-level and physics methods weakened the true cause" },
  { v: "0 of 120", k: "healthy simulated vehicles wrongly flagged" },
  { v: "178 of 178", k: "flagged faults where the true cause stayed among the open explanations" },
  { v: "16 of 16", k: "directly actionable first steps on held-out real public failure logs, against 8 for the same model alone" },
  { v: "Frozen", k: "pass criteria and code before every evaluation; misses published next to wins" },
];

const security = [
  ["Read-only", "Veyra reads exported logs or a read-only connection. There is no control path into your machines."],
  ["Private by default", "Your data, your investigations and the knowledge built from them stay in your workspace."],
  ["Nothing published without you", "A case appears outside your company only anonymised, and only with your written agreement."],
  ["Every claim traceable", "Each finding points to the log rows or the calculation behind it, and uncertainty is stated, not hidden."],
];

const Landing = () => {
  const reduce = useReducedMotion();
  const enter = enterProps(reduce);
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
        <div className="container mx-auto max-w-6xl px-6 pb-14 pt-14 md:pt-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:items-end">
            <motion.div initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="inline-flex items-center gap-2 rounded-full border border-[#e4e7ec] bg-white px-3 py-1 text-[12.5px] text-[#475467]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#12b76a]" /> Working on real field failures with an autonomous-vehicle manufacturer
              </p>
              <h1 className={`mt-6 text-[42px] font-semibold leading-[1.0] tracking-[-0.045em] md:text-[64px] ${INK}`}>
                The engineering intelligence for physical AI.
              </h1>
              <p className={`mt-6 text-[21px] font-medium leading-snug tracking-[-0.01em] md:text-[23px] ${INK}`}>
                When machines behave unexpectedly, find out why.
              </p>
              <p className={`mt-3 max-w-2xl text-[16.5px] leading-relaxed ${SUB}`}>
                Veyra investigates failures across the entire machine by connecting software, controls, electrical systems
                and physical behavior to reconstruct what happened, test explanations and identify the next decisive check.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
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
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[#e4e7ec] bg-[#e4e7ec]"
            >
              {proof.map((m, i) => (
                <div key={m.v} className="bg-white p-4">
                  <dt className={`text-[26px] font-semibold leading-none tracking-[-0.03em] tabular-nums ${m.muted ? "text-[#98a2b3]" : "text-[#0b1220]"}`} aria-label={m.v}>
                    <ProofValue m={m} i={i} />
                  </dt>
                  <dd className="mt-2 text-[12.5px] leading-snug text-[#475467]">{m.k}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.figure
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-14"
          >
            <div className="overflow-hidden rounded-xl border border-[#e4e7ec] bg-[#f5f7fa] shadow-[0_1px_2px_rgba(16,24,40,0.05),0_40px_80px_-40px_rgba(16,24,40,0.35)]">
              <div className="flex items-center gap-1.5 border-b border-[#e4e7ec] bg-white px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#e4e7ec]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#e4e7ec]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#e4e7ec]" />
                <span className="ml-3 truncate text-[12px] text-[#98a2b3]">Veyra · investigation workspace</span>
              </div>
              <img
                src="/veyra/run.webp"
                width={2000}
                height={1250}
                alt="Veyra's investigation workspace: the agent's activity, the signals around the shutdown and the findings as they appear"
                className="block h-auto w-full"
              />
            </div>
            <figcaption className="mt-3 text-[12.5px] text-[#667085]">
              The Veyra agent investigating a real field failure on an autonomous vehicle. Real data, not public, anonymised.{" "}
              <a href={DEMO_URL} target="_blank" rel="noreferrer" className="font-medium text-[#3d3ac8] hover:underline">
                Open it live
              </a>
            </figcaption>
          </motion.figure>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-[#e4e7ec] bg-[#f9fafb]">
        <div className="container mx-auto flex max-w-6xl flex-col gap-5 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[13.5px] text-[#475467]">
            <span className="font-medium text-[#0b1220]">Working with an autonomous-vehicle manufacturer</span> on real field failures ·
            tested on real logs from ROS 2, Autoware, PX4, micro-ROS and more
          </p>
          <div className="flex shrink-0 items-center gap-3">
            <span className="text-[12.5px] text-[#667085]">Member of</span>
            <img src="/badges/nvidia-inception-program-badge-rgb-for-screen.svg" alt="NVIDIA Inception Program" className="h-auto w-[120px]" />
          </div>
        </div>
      </section>

      {/* TECHNICAL DIFFERENTIATION */}
      <section id="differentiation" className="scroll-mt-16 bg-white">
        <div className="container mx-auto max-w-6xl px-6 py-24">
          <motion.div {...enter} className="max-w-3xl">
            <p className={EYEBROW}>Technical differentiation</p>
            <h2 className={H2}>System-level investigation. Physics-grounded reasoning.</h2>
            <p className={`mt-5 text-[16.5px] leading-relaxed ${SUB}`}>
              Not just anomalies in logs. Veyra follows causal sequences across subsystems, checks explanations against
              physical constraints, and makes uncertainty explicit when evidence cannot distinguish competing causes.
            </p>
          </motion.div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {[
              { title: "System-level investigation", sub: "What the machine actually did", items: systemLevel, dot: "bg-[#f79009]" },
              { title: "Physics-grounded reasoning", sub: "What physics allows", items: physics, dot: "bg-[#12b76a]" },
            ].map((c) => (
              <motion.div key={c.title} {...enter} className="rounded-xl border border-[#e4e7ec] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${c.dot}`} />
                  <h3 className={`text-[17px] font-semibold ${INK}`}>{c.title}</h3>
                </div>
                <p className="mt-1 text-[13px] text-[#667085]">{c.sub}</p>
                <ul className="mt-5 divide-y divide-[#f2f4f7]">
                  {c.items.map(([t, d]) => (
                    <li key={t} className="py-3.5 first:pt-0 last:pb-0">
                      <p className={`text-[14.5px] font-medium ${INK}`}>{t}</p>
                      <p className="mt-1 text-[13.5px] leading-relaxed text-[#475467]">{d}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <p className="mt-4 text-[12.5px] text-[#667085]">Examples from a real field failure on an autonomous vehicle (real data, not public, anonymised).</p>
        </div>
      </section>

      {/* LIVE */}
      <section id="live" className="scroll-mt-16 bg-[#0b1220] text-white">
        <div className="container mx-auto max-w-6xl px-6 py-24">
          <motion.div {...enter} className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-[13px] font-medium text-[#a5b4fc]">See it work</p>
              <h2 className="mt-3 text-[32px] font-semibold leading-[1.08] tracking-[-0.03em] md:text-[44px]">A real investigation, replayed step by step.</h2>
            </div>
            <a href={DEMO_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[14px] text-white/70 underline decoration-white/20 underline-offset-4 hover:text-white">
              Open the full investigation <ArrowUpRight size={14} />
            </a>
          </motion.div>
          <motion.div {...enter}>
            <HeroConsole />
          </motion.div>
        </div>
      </section>

      {/* WORKING TODAY */}
      <section id="today" className="scroll-mt-16 bg-[#f9fafb]">
        <div className="container mx-auto max-w-6xl px-6 py-24">
          <motion.div {...enter} className="mb-10 max-w-2xl">
            <p className={EYEBROW}>How it works</p>
            <h2 className={H2}>From the first log line to the check that settles it.</h2>
          </motion.div>
          <motion.div {...enter}>
            <Loop />
          </motion.div>
          <p className="mt-4 text-[13px] text-[#667085]">
            Read-only. No control path into your machines. Example: a real field failure on an autonomous vehicle (real data, not public, anonymised).
          </p>
        </div>
      </section>

      {/* OUTPUTS */}
      <section id="outputs" className="scroll-mt-16 bg-white">
        <div className="container mx-auto max-w-6xl px-6 py-24">
          <motion.div {...enter} className="max-w-2xl">
            <p className={EYEBROW}>From one investigation</p>
            <h2 className={H2}>A failure solved. Engineering knowledge retained.</h2>
            <p className={`mt-5 text-[16.5px] leading-relaxed ${SUB}`}>
              Every investigation leaves three things in your workspace, so your team does not walk the whole investigation
              again when the same failure returns.
            </p>
          </motion.div>
          <div className="mt-12 space-y-5">
            {outputs.map((o, i) => (
              <motion.figure
                key={o.title}
                {...enter}
                className="grid overflow-hidden rounded-xl border border-[#e4e7ec] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)] lg:grid-cols-[minmax(0,0.38fr)_minmax(0,1fr)]"
              >
                <figcaption className="flex flex-col justify-center p-6">
                  <span className="font-mono text-[12px] text-[#98a2b3]">0{i + 1}</span>
                  <p className={`mt-2 text-[18px] font-semibold ${INK}`}>{o.title}</p>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-[#475467]">{o.text}</p>
                </figcaption>
                <div className="flex items-center border-t border-[#e4e7ec] bg-[#f5f7fa] p-4 lg:border-l lg:border-t-0">
                  <img src={o.img} alt={`${o.title}, as Veyra shows it`} loading="lazy" className="block h-auto w-full rounded-md border border-[#e4e7ec] shadow-sm" />
                </div>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* EVIDENCE */}
      <section id="evidence" className="scroll-mt-16 border-t border-[#e4e7ec] bg-[#f9fafb]">
        <div className="container mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
            <motion.div {...enter}>
              <p className={EYEBROW}>Real-world field validation</p>
              <h2 className={H2}>Two days of engineering investigation. 16 seconds to the decisive inconsistency.</h2>
              <p className={`mt-5 text-[16px] leading-relaxed ${SUB}`}>
                An autonomous vehicle lost high voltage while parked. The manufacturer&apos;s investigation took about two
                days across after-sales, on-site operations, engineering and the battery supplier. From the vehicle&apos;s own
                logs alone, Veyra surfaced the decisive SOC inconsistency in 16 seconds and completed its full AI
                investigation in 7 minutes.
              </p>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
                <Link to="/veyra/field-case" className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#3d3ac8] hover:underline">
                  Read the case study <ArrowRight size={14} />
                </Link>
                <Link to="/veyra/evaluation" className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#475467] hover:text-[#0b1220]">
                  All evaluations <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>

            <motion.div {...enter} className="overflow-hidden rounded-xl border border-[#e4e7ec] bg-white">
              <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] border-b border-[#e4e7ec] bg-[#f9fafb] px-5 py-3 text-[12px] font-medium text-[#667085]">
                <span>Veyra found</span>
                <span>The manufacturer confirmed</span>
              </div>
              {[
                ["The SOC fell 40 points while 0.08 Ah flowed (16 s)", "An SOC estimation correction, not a real discharge"],
                ["First check: the history since the last full charge", "No full charge for a long time"],
                ["The weakest cell sets the timing, not the size", "Cell balance normal after a full charge"],
                ["Lost capacity still to be verified", "Not supported as the main cause"],
              ].map(([a, b]) => (
                <div key={a} className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-4 border-b border-[#f2f4f7] px-5 py-4 last:border-b-0">
                  <p className={`text-[14px] leading-snug ${INK}`}>{a}</p>
                  <p className="flex gap-2 text-[14px] leading-snug text-[#475467]">
                    <span className="mt-[3px] inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#ecfdf3] text-[10px] text-[#039855]">✓</span>
                    {b}
                  </p>
                </div>
              ))}
              <div className="border-t border-[#e4e7ec] bg-[#fef3f2] px-5 py-4">
                <p className="text-[13.5px] leading-snug text-[#0b1220]">
                  <span className="font-semibold text-[#b42318]">Beyond the reported failure:</span> after each reset the system
                  allowed high voltage again, 5 times, with the hazard still present. Raised as a safety hold.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BOTTLENECK */}
      <section id="bottleneck" className="scroll-mt-16 bg-white">
        <div className="container mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
            <motion.div {...enter}>
              <p className={EYEBROW}>The operational bottleneck</p>
              <h2 className={H2}>Finding the cause often costs more than fixing it.</h2>
              <p className={`mt-5 text-[16px] leading-relaxed ${SUB}`}>
                A single field issue can pull engineers across controls, software, hardware, suppliers and on-site
                operations. Each team reconstructs the same evidence, checks are repeated, and parts get replaced before
                anyone understands the cause.
              </p>
              <p className={`mt-5 text-[16.5px] font-medium leading-relaxed ${INK}`}>
                Veyra cuts the work between the first report and a defensible next decision.
              </p>
            </motion.div>
            <motion.div {...enter}>
              <FanOut />
            </motion.div>
          </div>
        </div>
      </section>

      {/* RELIABILITY & SECURITY */}
      <section id="trust" className="scroll-mt-16 border-t border-[#e4e7ec] bg-[#f9fafb]">
        <div className="container mx-auto max-w-6xl px-6 py-24">
          <motion.div {...enter} className="max-w-2xl">
            <p className={EYEBROW}>Reliability and security</p>
            <h2 className={H2}>Measured before it is trusted.</h2>
            <p className={`mt-5 text-[16.5px] leading-relaxed ${SUB}`}>
              Every capability is tested against criteria fixed before the run. What Veyra does not win is published next to
              what it does.
            </p>
          </motion.div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-[#e4e7ec] bg-[#e4e7ec] sm:grid-cols-2 lg:grid-cols-3">
            {reliability.map((r) => (
              <div key={r.k} className="bg-white p-6">
                <p className={`text-[28px] font-semibold leading-none tracking-[-0.03em] tabular-nums ${INK}`}>{r.v}</p>
                <p className="mt-2.5 text-[13.5px] leading-snug text-[#475467]">{r.k}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {security.map(([t, d]) => (
              <div key={t} className="rounded-xl border border-[#e4e7ec] bg-white p-5">
                <p className={`text-[15px] font-semibold ${INK}`}>{t}</p>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#475467]">{d}</p>
              </div>
            ))}
          </div>
          <Link to="/veyra/evaluation" className="mt-8 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#3d3ac8] hover:underline">
            What works, what doesn&apos;t, and the evidence <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* METHOD */}
      <section id="method" className="scroll-mt-16 bg-white">
        <div className="container mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end">
            <motion.div {...enter}>
              <p className={EYEBROW}>How Veyra improves</p>
              <h2 className={H2}>Engineering expertise, made executable.</h2>
            </motion.div>
            <motion.p {...enter} className={`text-[16px] leading-relaxed ${SUB}`}>
              Veyra translates expert investigation methods into reusable system-level checks, connecting physical
              evidence, control sequences, customer-specific rules and engineering decisions.
            </motion.p>
          </div>
          <ol className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {methodLoop.map((m, i) => (
              <motion.li key={m.title} {...enter} className="rounded-xl border border-[#e4e7ec] bg-white p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-[12px] text-[#98a2b3]">0{i + 1}</span>
                  <span className="rounded-full bg-[#eeedfc] px-2 py-[2px] text-[11.5px] font-medium text-[#3d3ac8]">{m.tag}</span>
                </div>
                <h3 className={`mt-4 text-[17px] font-semibold leading-snug ${INK}`}>{m.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-[#475467]">{m.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* WHO */}
      <section id="who" className="scroll-mt-16 border-t border-[#e4e7ec] bg-[#f9fafb]">
        <div className="container mx-auto max-w-6xl px-6 py-24">
          <motion.h2 {...enter} className={`max-w-3xl ${H2.replace("mt-3 ", "")}`}>
            Built for the teams who own the moment a machine meets the real world.
          </motion.h2>
          <ul className="mt-12 grid gap-5 md:grid-cols-2">
            {audiences.map((a) => (
              <motion.li {...enter} key={a.who} className="rounded-xl border border-[#e4e7ec] bg-white p-6">
                <p className={`text-[16.5px] font-semibold leading-snug ${INK}`}>{a.who}</p>
                <p className="mt-2 text-[14.5px] leading-relaxed text-[#475467]">“{a.moment}”</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* START */}
      <section id="start" className="scroll-mt-16 bg-white">
        <div className="container mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <motion.div {...enter}>
              <p className={EYEBROW}>How teams start</p>
              <h2 className={H2}>Start with failures you have already solved.</h2>
              <p className={`mt-5 max-w-xl text-[16px] leading-relaxed ${SUB}`}>
                No production access to begin. Each step is measured against how your team works today.
              </p>
              <ol className="mt-7 max-w-xl space-y-4">
                {[
                  ["Your closed cases", "Exported logs from solved incidents. Veyra investigates each one without the answer, and is checked against what your engineers confirmed."],
                  ["Your rules, reviewed", "Your engineers review and correct the machine expectations Veyra checks against. Nothing it uses is hidden."],
                  ["Live, read-only", "New incidents as they happen, on one class of issue your team already chases."],
                ].map(([what, body], k) => (
                  <li key={what} className="grid grid-cols-[28px_minmax(0,1fr)] gap-3">
                    <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#eeedfc] font-mono text-[12px] font-medium text-[#3d3ac8]">{k + 1}</span>
                    <div>
                      <p className={`text-[15px] font-semibold ${INK}`}>{what}</p>
                      <p className="mt-1 text-[14px] leading-relaxed text-[#475467]">{body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <Link
                to="/contact"
                className="mt-8 inline-flex items-center gap-1.5 rounded-lg bg-[#3d3ac8] px-5 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-[#2f2ca6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3d3ac8]"
              >
                Book a technical briefing <ArrowRight size={15} />
              </Link>
            </motion.div>
            <motion.div {...enter}>
              <p className="mb-3 text-[13px] font-medium text-[#667085]">What we measure with you</p>
              <dl className="divide-y divide-[#e4e7ec] rounded-xl border border-[#e4e7ec] px-5">
                {[
                  ["Time to the decisive finding", "From first report to a supported explanation"],
                  ["Checks run", "How many it took to settle the question"],
                  ["Senior engineer hours", "Time spent per case by the people who know the system"],
                  ["Avoidable work", "Checks that were not the issue, counted only when the data recorded before them shows it"],
                  ["Repeat cases", "How often retained knowledge shortened a new one"],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-4 py-4">
                    <dt className={`text-[14.5px] font-semibold ${INK}`}>{k}</dt>
                    <dd className="text-[14px] leading-relaxed text-[#475467]">{v}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#e4e7ec] bg-[#f9fafb]">
        <div className="container mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[#3d3ac8]" />
              <span className={`text-[15px] font-semibold tracking-tight ${INK}`}>Veyra</span>
              <span className="ml-2 text-[12px] text-[#667085]">by Silken Reason</span>
            </div>
            <ul className="flex flex-wrap items-center gap-6 text-[13px]">
              <li><Link to="/veyra/field-case" className="text-[#667085] transition-colors hover:text-[#0b1220]">Case study</Link></li>
              <li><Link to="/veyra/evaluation" className="text-[#667085] transition-colors hover:text-[#0b1220]">Evaluation</Link></li>
              <li><Link to="/blog" className="text-[#667085] transition-colors hover:text-[#0b1220]">Blog</Link></li>
              <li><Link to="/contact" className="text-[#667085] transition-colors hover:text-[#0b1220]">Contact</Link></li>
            </ul>
            <span className="text-[12px] text-[#667085]">© 2026 Silken Reason</span>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default Landing;
