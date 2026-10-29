import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import {
  falsifiers,
  hardParts,
  hypothesis,
  measures,
  method,
  mission,
  programs,
  researchQuestion,
  researchQuestionPrecise,
} from "@/data/research";

const ink = "#053f31";

const Research = () => {
  const reduce = useReducedMotion();
  const enter = reduce
    ? {}
    : { initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" }, transition: { duration: 0.5 } };

  return (
    <Layout>
      {/* HEADER */}
      <section className="border-b border-border bg-[#fbfbf8]">
        <div className="container mx-auto max-w-6xl px-6 pb-20 pt-20 md:pt-28">
          <p className="text-[13px]" style={{ color: ink }}>Research</p>
          <h1 className="mt-5 max-w-5xl font-serif text-[44px] leading-[1.04] tracking-[-0.01em] md:text-[72px]" style={{ color: ink }}>
            {researchQuestion}
          </h1>
          <p className="mt-8 max-w-2xl text-[18px] leading-relaxed text-muted-foreground">{researchQuestionPrecise}</p>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{mission}</p>
        </div>
      </section>

      {/* PROGRAM */}
      <section className="border-b border-border bg-background">
        <div className="container mx-auto max-w-6xl px-6 py-20">
          <motion.h2 {...enter} className="text-[30px] font-semibold tracking-[-0.03em] md:text-[40px]" style={{ color: ink }}>
            The program
          </motion.h2>
          <div className="mt-10 border-t border-border">
            {programs.map((p, i) => (
              <motion.article
                key={p.id}
                {...enter}
                className="grid gap-4 border-b border-border py-8 md:grid-cols-[90px_minmax(0,1fr)_200px] md:items-baseline md:gap-8"
              >
                <span className="font-mono text-[14px]" style={{ color: ink }}>{p.id}</span>
                <div>
                  <h3 className="text-[24px] font-semibold tracking-[-0.02em] md:text-[28px]" style={{ color: ink }}>{p.name}</h3>
                  <p className="mt-2 max-w-2xl text-[16px] leading-relaxed text-foreground/75">{p.question}</p>
                  <p className="mt-2 text-[14px] text-muted-foreground">{p.link}</p>
                </div>
                <p className="text-[13px] md:text-right">
                  <span className={i === 0 ? "font-medium" : "text-muted-foreground"} style={i === 0 ? { color: ink } : undefined}>
                    {p.horizon}
                  </span>
                  <span className="block text-muted-foreground">{p.status}</span>
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 001 IN DETAIL */}
      <section className="border-b border-border bg-[#fbfbf8]">
        <div className="container mx-auto max-w-6xl px-6 py-24">
          <motion.div {...enter}>
            <p className="font-mono text-[13px]" style={{ color: ink }}>Program 001</p>
            <h2 className="mt-3 text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] md:text-[52px]" style={{ color: ink }}>
              Learning through experiments
            </h2>
          </motion.div>

          <motion.div {...enter} className="mt-12 border-l-2 pl-6 md:pl-8" style={{ borderColor: ink }}>
            <p className="text-[13px] text-muted-foreground">Hypothesis</p>
            <p className="mt-3 max-w-4xl text-[22px] leading-[1.35] tracking-[-0.01em] md:text-[28px]" style={{ color: ink }}>
              {hypothesis}
            </p>
          </motion.div>

          <motion.div {...enter} className="mt-20">
            <h3 className="text-[22px] font-semibold tracking-[-0.02em]" style={{ color: ink }}>Not a new formula</h3>
            <p className="mt-3 max-w-3xl text-[16px] leading-relaxed text-muted-foreground">
              Choosing experiments by expected information gain is established work. What we want to show is a single
              system that generates open-ended physical hypotheses, selects experiments, and updates from real feedback.
              The hard parts are these three:
            </p>
            <ol className="mt-8 grid gap-8 md:grid-cols-3">
              {hardParts.map((h, i) => (
                <li key={h.title}>
                  <span className="font-mono text-[13px]" style={{ color: ink }}>{i + 1}</span>
                  <p className="mt-2 text-[17px] font-semibold leading-snug" style={{ color: ink }}>{h.title}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{h.body}</p>
                </li>
              ))}
            </ol>
          </motion.div>

          <div className="mt-20 grid gap-16 lg:grid-cols-2">
            <motion.div {...enter}>
              <h3 className="text-[22px] font-semibold tracking-[-0.02em]" style={{ color: ink }}>Method</h3>
              <ol className="mt-6 space-y-4">
                {method.map((m, i) => (
                  <li key={i} className="grid grid-cols-[28px_minmax(0,1fr)] gap-2 text-[15px] leading-relaxed text-foreground/80">
                    <span className="font-mono text-[13px] leading-[1.75]" style={{ color: ink }}>{i + 1}</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-[14px] leading-relaxed text-muted-foreground">
                Baselines are built and run first, so the test is not designed around the AI agent.
              </p>
            </motion.div>

            <motion.div {...enter}>
              <h3 className="text-[22px] font-semibold tracking-[-0.02em]" style={{ color: ink }}>What we measure</h3>
              <dl className="mt-6 divide-y divide-border border-y border-border">
                {measures.map((m) => (
                  <div key={m.name} className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-4 py-4">
                    <dt className="text-[15px] font-semibold" style={{ color: ink }}>{m.name}</dt>
                    <dd className="text-[14px] leading-relaxed text-muted-foreground">{m.def}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>

          <motion.div {...enter} className="mt-20 rounded-2xl bg-background p-6 ring-1 ring-border md:p-10">
            <h3 className="text-[22px] font-semibold tracking-[-0.02em]" style={{ color: ink }}>What would prove us wrong</h3>
            <p className="mt-2 text-[15px] text-muted-foreground">Written down before the first run. Any one of these and the hypothesis fails.</p>
            <ul className="mt-6 space-y-3">
              {falsifiers.map((f) => (
                <li key={f} className="flex gap-3 text-[16px] leading-relaxed text-foreground/85">
                  <span aria-hidden className="mt-[11px] h-px w-4 shrink-0" style={{ background: ink }} />
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* TO PRODUCT */}
      <section className="bg-[#0a1424] text-white">
        <div className="container mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="text-[13px] text-[#84d7b0]">Where the research meets real engineering</p>
            <p className="mt-3 text-[26px] font-semibold leading-[1.15] tracking-[-0.02em] md:text-[32px]">
              Veyra already helps engineers find the next decisive check on real failures.
            </p>
          </div>
          <Link
            to="/veyra"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#84d7b0] px-6 py-3 text-[14px] font-semibold text-[#062016] transition-colors hover:bg-[#a3e4c5]"
          >
            Explore Veyra <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Research;
