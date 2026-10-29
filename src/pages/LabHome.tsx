import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { mission, programs, researchQuestion, researchQuestionPrecise } from "@/data/research";

const ink = "#053f31";

const VeyraCard = () => (
  <Link
    to="/veyra"
    className="group relative block overflow-hidden rounded-2xl bg-[#0a1424] p-6 text-white shadow-[0_40px_100px_-40px_rgba(5,30,40,0.7)] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#053f31] sm:p-8"
  >
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-70"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 70% 60% at 85% 0%, rgba(132,215,176,0.18), transparent 70%), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "100% 100%, 40px 40px, 40px 40px",
      }}
    />
    <div className="relative">
      <div className="flex items-center justify-between gap-4">
        <span className="inline-flex items-center gap-2 text-[12px] text-[#84d7b0]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#84d7b0]" />
          Our first product · live
        </span>
        <span className="text-[12px] text-white/40">by Silken Reason</span>
      </div>
      <p className="mt-6 text-[52px] font-semibold leading-none tracking-[-0.04em] sm:text-[64px]">Veyra</p>
      <p className="mt-3 text-[19px] font-medium leading-snug text-white/90">The AI field engineer for physical AI.</p>
      <p className="mt-3 max-w-md text-[14px] leading-relaxed text-white/60">
        Helps engineers investigate machine failures from real logs and find the next decisive check.
      </p>

      <div className="mt-6 space-y-1.5 rounded-xl border border-white/10 bg-white/[0.03] p-3" aria-hidden>
        {[
          ["Board Ethernet / lwIP DMA", "leading"],
          ["Board firmware / client buffers", "weakened"],
          ["Agent port configuration", "ruled out"],
        ].map(([a, s]) => (
          <div key={a} className="flex items-center justify-between gap-3 px-1">
            <span className={`truncate text-[12px] ${s === "ruled out" ? "text-white/35" : "text-white/80"}`}>{a}</span>
            <span
              className={`shrink-0 rounded-full px-2 py-[1px] text-[10px] font-medium ${
                s === "leading" ? "bg-[#84d7b0] text-[#062016]" : s === "weakened" ? "text-white/50 ring-1 ring-inset ring-white/15" : "text-white/30 ring-1 ring-inset ring-white/10 line-through"
              }`}
            >
              {s}
            </span>
          </div>
        ))}
        <p className="px-1 pt-1 text-[11px] text-white/35">From a real investigation on a public micro-ROS failure log</p>
      </div>

      <span className="mt-7 inline-flex items-center gap-1.5 rounded-full bg-[#84d7b0] px-5 py-2.5 text-[14px] font-semibold text-[#062016] transition-colors group-hover:bg-[#a3e4c5]">
        Explore Veyra <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
      </span>
    </div>
  </Link>
);

const LabHome = () => {
  const reduce = useReducedMotion();
  const enter = reduce
    ? {}
    : { initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" }, transition: { duration: 0.5 } };

  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border bg-[#fbfbf8]">
        <div
          aria-hidden
          className="absolute inset-0 -z-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(5,63,49,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(5,63,49,0.07) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "linear-gradient(to bottom, black, transparent 90%)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent 90%)",
          }}
        />
        <div className="container relative mx-auto max-w-6xl px-6 pb-20 pt-14 md:pt-20">
          <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:items-center">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="min-w-0"
            >
              <p className="text-[13px]" style={{ color: ink }}>Silken Reason · independent research lab</p>
              <h1
                className="mt-5 text-[38px] font-semibold leading-[0.98] tracking-[-0.045em] md:text-[58px]"
                style={{ color: ink }}
              >
                We study how machines learn what to do next in an unfamiliar physical world.
              </h1>
              <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-muted-foreground md:text-[18px]">
                Research into deliberate experimentation: how an intelligent system chooses the test that teaches it the
                most, and carries what it learned to the next machine. Veyra is where that research meets real
                engineering.
              </p>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[14px]">
                <a href="#program" className="inline-flex items-center gap-1 font-medium underline decoration-[#053f31]/30 underline-offset-4 hover:decoration-[#053f31]" style={{ color: ink }}>
                  The research program
                </a>
                <Link to="/conversations" className="text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground">
                  Conversations
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.6 }}
              className="order-first min-w-0 lg:order-none"
            >
              <VeyraCard />
            </motion.div>
          </div>
        </div>
      </section>

      {/* QUESTION */}
      <section className="border-b border-border bg-background">
        <div className="container mx-auto max-w-6xl px-6 py-24 md:py-32">
          <motion.div {...enter}>
            <p className="text-[13px] text-muted-foreground">The question we are working on</p>
            <p className="mt-6 max-w-5xl font-serif text-[40px] leading-[1.08] tracking-[-0.01em] md:text-[64px]" style={{ color: ink }}>
              {researchQuestion}
            </p>
            <p className="mt-8 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
              Made precise: {researchQuestionPrecise.charAt(0).toLowerCase() + researchQuestionPrecise.slice(1)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* PROGRAM */}
      <section id="program" className="scroll-mt-16 border-b border-border bg-[#fbfbf8]">
        <div className="container mx-auto max-w-6xl px-6 py-24">
          <motion.div {...enter} className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-2xl text-[32px] font-semibold leading-[1.05] tracking-[-0.03em] md:text-[44px]" style={{ color: ink }}>
              One program, three stages, each building on the last.
            </h2>
            <Link to="/research" className="inline-flex items-center gap-1 text-[14px] font-medium underline decoration-[#053f31]/30 underline-offset-4 hover:decoration-[#053f31]" style={{ color: ink }}>
              Read the full program <ArrowRight size={14} />
            </Link>
          </motion.div>

          <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            <span aria-hidden className="absolute left-0 right-0 top-[7px] hidden h-px bg-gradient-to-r from-[#053f31] via-[#053f31]/25 to-[#053f31]/5 md:block" />
            {programs.map((p, i) => (
              <motion.li key={p.id} {...enter} transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.08 }} className="relative">
                <span
                  className={`relative z-10 block h-[15px] w-[15px] rounded-full border-2 ${i === 0 ? "border-[#053f31] bg-[#053f31]" : "border-[#053f31]/35 bg-[#fbfbf8]"}`}
                />
                <p className="mt-5 flex items-baseline gap-3 text-[13px]">
                  <span className="font-mono" style={{ color: ink }}>{p.id}</span>
                  <span className="text-muted-foreground">{p.horizon}</span>
                </p>
                <h3 className="mt-2 text-[22px] font-semibold leading-snug tracking-[-0.01em]" style={{ color: ink }}>{p.name}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-foreground/75">{p.question}</p>
                <p className="mt-4 text-[13px] text-muted-foreground">{p.link}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* RESEARCH INTO PRODUCT */}
      <section className="border-b border-border bg-background">
        <div className="container mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-center">
            <motion.p {...enter} className="text-[26px] font-semibold leading-[1.15] tracking-[-0.02em] md:text-[34px]" style={{ color: ink }}>
              {mission}
            </motion.p>
            <motion.div {...enter} className="space-y-4 text-[15px] leading-relaxed text-muted-foreground">
              <p>
                Research questions are tested where they matter: on real machines, real logs and real engineering
                decisions. Veyra is the first engineering application of this program.
              </p>
              <Link
                to="/veyra"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#0a1424] px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#16243b]"
              >
                Explore Veyra <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="bg-[#fbfbf8]">
        <div className="container mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-10 text-[13px]">
          <span className="font-semibold" style={{ color: ink }}>Silken Reason</span>
          <ul className="flex flex-wrap gap-6 text-muted-foreground">
            <li><Link to="/research" className="hover:text-foreground">Research</Link></li>
            <li><Link to="/veyra" className="hover:text-foreground">Veyra</Link></li>
            <li><Link to="/conversations" className="hover:text-foreground">Conversations</Link></li>
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
          <span className="text-[12px] text-muted-foreground">© 2026 Silken Reason</span>
        </div>
      </footer>
    </Layout>
  );
};

export default LabHome;
