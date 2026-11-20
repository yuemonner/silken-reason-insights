import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/* Veyra's product insets, shared by the product, case study and technology pages: the real-case console, the public-log
   console and the how-it-works loop. Every value is from a recorded Veyra investigation. */

export const DEMO_URL = "https://demo.silkenreason.com/field-case";
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

export type Status = "leading" | "open" | "weakened" | "ruled out";
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

export const chip: Record<Status, string> = {
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
export const Console = () => {
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
export const fieldCauses: { area: string; status: Status }[] = [
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

export const FieldConsole = () => {
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

export const HeroConsole = () => {
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

export const Loop = () => {
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

