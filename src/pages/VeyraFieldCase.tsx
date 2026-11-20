import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Layout from "@/components/Layout";

/* Case study: a real field failure on an autonomous vehicle. Real data, not public, published anonymised with the
   manufacturer's agreement: no company, vehicle or supplier identity. Every number comes from Veyra's recorded run on
   this case, the same one the live demo replays. */

const DEMO_URL = "https://demo.silkenreason.com/field-case";
const INK = "text-[#0b1220]";

const Section = ({ id, kicker, title, children }: { id: string; kicker: string; title: string; children: ReactNode }) => (
  <section id={id} className="scroll-mt-20 border-t border-[#e4e7ec] py-14">
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.32fr)_minmax(0,1fr)]">
      <div>
        <p className="text-[13px] font-medium text-[#3d3ac8]">{kicker}</p>
        <h2 className={`mt-2 text-[24px] font-semibold leading-[1.15] tracking-[-0.02em] ${INK}`}>{title}</h2>
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  </section>
);

const P = ({ children }: { children: ReactNode }) => <p className="text-[15.5px] leading-relaxed text-[#475467]">{children}</p>;

const facts = [
  ["Machine", "Autonomous vehicle, battery-electric"],
  ["Symptom", "Lost high voltage while parked; could not drive"],
  ["Data", "The vehicle's own BMS and VCU logs, three time windows, 2.2 million values"],
  ["Not given to Veyra", "Vehicle access, supplier data, battery chemistry, manufacturer rules, the answer"],
];

const timeline = [
  ["16 Nov", "First run", "Before the cause was known, Veyra flags an SOC drop the measured current cannot explain, lists every high-voltage re-closure, and keeps SOC estimation among three open causes."],
  ["19 Nov", "Cause confirmed", "The manufacturer shares its confirmed cause after about two days of investigation, including its battery supplier."],
  ["20 Nov", "Full agent run", "The Veyra agent investigates the case end to end in 7 minutes, calling 33 engineering checks, and is checked against the confirmed cause."],
];

const system = [
  ["Checked the complaint against the record", "Reported: the vehicle could not drive. Recorded: no drive request at all. The real question became why a parked vehicle reached a protective shutdown."],
  ["Rebuilt the shutdown across subsystems", "BMS, VCU, DC/DC and contactors: 8 state changes in 5.5 s. Current kept flowing after the DC/DC switched off, so another load was drawing it."],
  ["Inferred the protection thresholds", "No specification was given. The three protection levels triggered at about 2.9, 2.7 and 2.5 V on the weakest cell, inferred from timing."],
  ["Reasoned across state resets", "After each reset the BMS cleared its fault state and the system allowed high voltage again, 5 times, with the weakest cell at 2.51–2.68 V, below the 2.70 V where level 2 first appeared. 3 ended in another shutdown. A cleared fault state is not a safe battery: Veyra raised a safety hold."],
];
const physics = [
  ["Counted the charge", "The displayed charge fell from 47 % to 7 % in 40 seconds while only 0.08 Ah flowed. A real drop of that size needs tens of ampere-hours: the battery was not emptied, its estimate was corrected. Found in 16 seconds."],
  ["Read the dynamic voltage behaviour", "Before the trip, the weakest cell's voltage fall sped up from about 9 to 112 mV per minute while the strongest cell's went from 7 to 20. The spread grew from 58 to 319 mV at a constant 0.92 Ah charge gap: the weakest cell reaching the steep end of its discharge curve tripped the protection."],
  ["Kept the trigger apart from the cause", "The weakest cell explains when the protection tripped, about 2 % of the shortfall. Why the pack was nearly empty while showing 47 % is the upstream question: the SOC estimate."],
  ["Said what the logs cannot separate", "SOC drift, low usable capacity and a current sensor reading low all remained possible. The agent tested its own predictions, weakened a hidden load and sensing faults, and named the check that would separate the rest."],
];

const hypotheses: [string, "open" | "weakened" | "not enough alone", string][] = [
  ["SOC estimate drifted", "open", "The displayed charge overstated what was available: a 40-point drop while 0.08 Ah flowed. Confirming it needs the charge and calibration history."],
  ["Usable capacity low", "open", "Would also leave the pack nearly empty while showing charge. Needs an independently metered charge record."],
  ["Current sensor reads low", "open", "A scale error would hide real discharge from the charge count. Needs an independent current measurement."],
  ["Load bypassing the current sensor", "weakened", "At 6 of 9 DC/DC transitions the measured current stepped with the matching voltage step: that load passes the sensor."],
  ["Cell sensing or harness fault", "weakened", "A smooth decline, a pack-wide fall and physical rest recovery point against it. No inspection has excluded it."],
  ["Contactor, VCU or insulation event first", "weakened", "The recorded order runs from cell under-voltage to contactor opening, not the reverse."],
  ["Weak cell or imbalance", "not enough alone", "The highest cell was depleted too. The weak cell sets when the protection tripped, not the shortfall."],
];
const hypTone = {
  open: "bg-[#eeedfc] text-[#3d3ac8]",
  weakened: "bg-[#fef0c7] text-[#93370d]",
  "not enough alone": "bg-[#f2f4f7] text-[#475467]",
} as const;

const VeyraFieldCase = () => {
  useEffect(() => {
    document.title = "Case study: a high-voltage loss on an autonomous vehicle | Veyra";
  }, []);
  return (
    <Layout>
      <article className="bg-white">
        <header className="border-b border-[#e4e7ec] bg-[#f9fafb]">
          <div className="container mx-auto max-w-6xl px-6 pb-14 pt-12">
            <Link to="/veyra" className="inline-flex items-center gap-1.5 text-[13px] text-[#667085] hover:text-[#0b1220]">
              <ArrowLeft size={14} /> Veyra
            </Link>
            <p className="mt-8 text-[13px] font-medium text-[#3d3ac8]">Case study · real field data, not public, anonymised</p>
            <h1 className={`mt-3 max-w-4xl text-[36px] font-semibold leading-[1.05] tracking-[-0.035em] md:text-[52px] ${INK}`}>
              A parked autonomous vehicle lost high voltage. Veyra found the decisive inconsistency in 16 seconds.
            </h1>
            <p className="mt-5 max-w-3xl text-[17px] leading-relaxed text-[#475467]">
              The manufacturer&apos;s investigation took about two days across after-sales, on-site operations, engineering and
              the battery supplier. Veyra worked from the vehicle&apos;s own logs alone, without seeing the vehicle and without
              supplier knowledge.
            </p>
            <dl className="mt-10 grid gap-px overflow-hidden rounded-xl border border-[#e4e7ec] bg-[#e4e7ec] sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["16 s", "to surface the decisive SOC inconsistency"],
                ["7 min", "full AI investigation, 33 engineering tool calls"],
                ["≈ 2 days", "the manufacturer's investigation, with its battery supplier"],
                ["4 of 4", "findings consistent with what the manufacturer confirmed"],
              ].map(([v, k], i) => (
                <div key={v} className="bg-white p-5">
                  <dt className={`text-[30px] font-semibold leading-none tracking-[-0.03em] tabular-nums ${i === 2 ? "text-[#98a2b3]" : INK}`}>{v}</dt>
                  <dd className="mt-2 text-[13px] leading-snug text-[#475467]">{k}</dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        <div className="container mx-auto max-w-6xl px-6">
          <Section id="context" kicker="The failure" title="What was reported, and what Veyra was given">
            <dl className="divide-y divide-[#f2f4f7] rounded-xl border border-[#e4e7ec] px-5">
              {facts.map(([k, v]) => (
                <div key={k} className="grid gap-1 py-3.5 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-4">
                  <dt className="text-[13.5px] text-[#667085]">{k}</dt>
                  <dd className={`text-[14.5px] ${INK}`}>{v}</dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section id="investigation" kicker="The investigation" title="System-level investigation and physics reasoning">
            <figure className="overflow-hidden rounded-xl border border-[#e4e7ec] bg-[#f5f7fa]">
              <img src="/veyra/run.webp" width={2000} height={1250} alt="The Veyra agent investigating the case: activity, signals and findings" className="block h-auto w-full" />
            </figure>
            <p className="mt-3 text-[12.5px] text-[#667085]">
              The Veyra agent mid-investigation.{" "}
              <a href={DEMO_URL} target="_blank" rel="noreferrer" className="font-medium text-[#3d3ac8] hover:underline">
                Replay the whole run <ArrowUpRight size={12} className="inline" />
              </a>
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {[
                { t: "System-level investigation", s: "What the vehicle actually did", items: system, dot: "bg-[#f79009]" },
                { t: "Physics-grounded reasoning", s: "What physics allows", items: physics, dot: "bg-[#12b76a]" },
              ].map((c) => (
                <div key={c.t} className="rounded-xl border border-[#e4e7ec] p-5">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${c.dot}`} />
                    <h3 className={`text-[16px] font-semibold ${INK}`}>{c.t}</h3>
                  </div>
                  <p className="mt-1 text-[13px] text-[#667085]">{c.s}</p>
                  <ol className="mt-4 space-y-4">
                    {c.items.map(([t, d]) => (
                      <li key={t}>
                        <p className={`text-[14.5px] font-medium ${INK}`}>{t}</p>
                        <p className="mt-1 text-[13.5px] leading-relaxed text-[#475467]">{d}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </Section>

          <Section id="hypotheses" kicker="Competing explanations" title="Seven explanations, held to the record">
            <P>
              Veyra kept every explanation that could produce the symptom and weighed what each would physically require.
              The logs alone could not separate three of them, and Veyra said so, naming the check that would.
            </P>
            <ul className="mt-6 divide-y divide-[#eaecf0] overflow-hidden rounded-xl border border-[#e4e7ec]">
              {hypotheses.map(([t, st, d]) => (
                <li key={t} className="grid gap-2 p-4 sm:grid-cols-[minmax(0,0.36fr)_8.5rem_minmax(0,1fr)] sm:items-start sm:gap-4">
                  <p className={`text-[14.5px] font-medium ${INK}`}>{t}</p>
                  <span className={`w-fit rounded-full px-2.5 py-0.5 text-[12px] font-medium ${hypTone[st]}`}>{st}</span>
                  <p className="text-[13.5px] leading-relaxed text-[#475467]">{d}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[14px] leading-relaxed text-[#475467]">
              <span className={`font-medium ${INK}`}>Next decisive check, read-only:</span> the BMS calibration history and charger
              log since the last full charge. This is where the manufacturer found the cause.
            </p>
          </Section>

          <Section id="result" kicker="The result" title="Veyra's findings against what the manufacturer confirmed">
            <div className="overflow-x-auto rounded-xl border border-[#e4e7ec]">
              <table className="w-full min-w-[560px] border-collapse text-left text-[14px]">
                <thead className="bg-[#f9fafb]">
                  <tr>
                    <th className="px-4 py-3 text-[12.5px] font-medium text-[#667085]">Veyra found</th>
                    <th className="px-4 py-3 text-[12.5px] font-medium text-[#667085]">The manufacturer confirmed</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["The SOC fell about 40 points that the measured current cannot explain", "An SOC estimation correction, not a real discharge"],
                    ["First check: the charge and calibration history since the last full charge", "No full charge for a long time: small standby currents below the sensor's resolution accumulated an SOC error"],
                    ["The weakest cell sets the timing of the trip, not the size of the shortfall", "Cell balance normal after a full charge"],
                    ["Lost capacity still to be verified", "The full-charge test did not support it as the main cause"],
                  ].map(([a, b]) => (
                    <tr key={a} className="border-t border-[#f2f4f7] align-top">
                      <td className={`px-4 py-3.5 leading-snug ${INK}`}>{a}</td>
                      <td className="px-4 py-3.5 leading-snug text-[#475467]">
                        <span className="mr-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#ecfdf3] text-[10px] text-[#039855]">✓</span>
                        {b}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-5 rounded-xl border border-[#fecdca] bg-[#fef3f2] p-5">
              <p className="text-[14px] font-semibold text-[#b42318]">Beyond the reported failure</p>
              <p className="mt-1 text-[14px] leading-relaxed text-[#0b1220]">
                After each reset the system allowed high voltage again, 5 times, while the weakest cell was still below the
                voltage where the second protection level first appeared. Veyra raised it as a safety hold and for the
                manufacturer&apos;s own review.
              </p>
            </div>
            <p className="mt-5 text-[14px] leading-relaxed text-[#475467]">
              <span className="font-medium text-[#0b1220]">Fix confirmed by the manufacturer:</span> fully charge every one to
              two weeks so the BMS recalibrates its SOC estimate.
            </p>
          </Section>

          <Section id="timeline" kicker="Timeline" title="Before and after the answer was known">
            <ol className="relative space-y-6 border-l border-[#e4e7ec] pl-6">
              {timeline.map(([d, t, x]) => (
                <li key={d} className="relative">
                  <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-[#3d3ac8] bg-white" />
                  <p className="text-[12.5px] font-medium text-[#667085]">{d} 2026</p>
                  <p className={`mt-0.5 text-[15px] font-semibold ${INK}`}>{t}</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-[#475467]">{x}</p>
                </li>
              ))}
            </ol>
          </Section>

          <Section id="kept" kicker="What the customer kept" title="A failure solved. Engineering knowledge retained.">
            <P>Every investigation leaves three things in the customer&apos;s private workspace.</P>
            <div className="mt-6 space-y-5">
              {[
                ["/veyra/report.webp", "The report", "What happened, which explanations can still hold, and what to verify next."],
                ["/veyra/knowledge.webp", "A knowledge record", "The confirmed mechanism, its signature in the logs, where it applies and what is not yet established. Private to the customer."],
                ["/veyra/checks.webp", "Saved checks", "Charge accounting, restart after a protective shutdown, and protection thresholds from timing: they run on every new record of this kind. How widely they apply, and how often they raise a false alarm, is measured as they run."],
              ].map(([img, t, d]) => (
                <figure key={t} className="overflow-hidden rounded-xl border border-[#e4e7ec]">
                  <div className="border-b border-[#e4e7ec] bg-[#f5f7fa] p-3">
                    <img src={img} alt={`${t}, as Veyra shows it`} loading="lazy" className="block h-auto w-full rounded-md border border-[#e4e7ec]" />
                  </div>
                  <figcaption className="p-4">
                    <p className={`text-[15px] font-semibold ${INK}`}>{t}</p>
                    <p className="mt-1 text-[14px] leading-relaxed text-[#475467]">{d}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </Section>

          <Section id="limits" kicker="Limits" title="What this case does not prove">
            <ul className="space-y-3">
              {[
                "It is one case. Parts of the system-level and physics methods were refined on this case's data after the cause was known; the first run, before it was known, had already flagged the unexplained SOC drop.",
                "The logs alone could not separate SOC drift from low capacity and a current sensor reading low. Veyra said so; the separating evidence was the manufacturer's charge history.",
                "The two days include work Veyra does not do, such as talking to the supplier. The comparison is time to the decisive finding, not a measured saving.",
              ].map((x) => (
                <li key={x} className="grid grid-cols-[12px_minmax(0,1fr)] gap-2 text-[15px] leading-relaxed text-[#475467]">
                  <span className="mt-[10px] h-1.5 w-1.5 rounded-full bg-[#98a2b3]" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </Section>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#e4e7ec] py-10">
            <p className="text-[15px] text-[#475467]">See how Veyra would handle a failure your team has already solved.</p>
            <div className="flex flex-wrap gap-3">
              <a href={DEMO_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-[#d0d5dd] px-5 py-3 text-[14px] font-medium text-[#0b1220] hover:bg-[#f9fafb]">
                Replay the investigation <ArrowUpRight size={15} />
              </a>
              <Link to="/contact" className="inline-flex items-center gap-1.5 rounded-lg bg-[#3d3ac8] px-5 py-3 text-[14px] font-semibold text-white hover:bg-[#2f2ca6]">
                Book a technical briefing <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default VeyraFieldCase;
