import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowRight } from "lucide-react";

const themes = [
  ["01", "Distributed Intelligence", "Human judgment, machine perception and organizational routines acting as one system."],
  ["02", "Decision Systems", "How action forms when evidence is incomplete and responsibility is shared."],
  ["03", "Physical Intelligence", "Robots, embodied systems and machine fleets meeting the real world."],
  ["04", "Memory & Adaptation", "How prior outcomes become usable context for the next decision."],
];

const LabHome = () => {
  return (
    <Layout>
      <section className="relative overflow-hidden border-b border-border bg-[#fbfbf8]">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 opacity-[0.38]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(5,63,49,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(5,63,49,0.07) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
        </div>

        <div className="container mx-auto max-w-6xl px-6 pb-20 pt-20 md:pb-28 md:pt-28">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="max-w-5xl"
            >
              <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                Independent Research Lab
              </p>
              <h1 className="mb-7 bg-[linear-gradient(112deg,#053f31_0%,#0b6b55_46%,#14352f_100%)] bg-clip-text text-[64px] font-semibold leading-[0.86] tracking-[-0.085em] text-transparent md:text-[96px] lg:text-[116px] [font-variant-ligatures:common-ligatures]">
                Silken Reason
              </h1>
              <p className="max-w-3xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
                Silken Reason is an independent research lab studying how intelligence emerges, acts and adapts in real-world systems.
              </p>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.55 }}
              className="border-l border-[#0b6b55]/25 pl-6"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0b6b55]">Working frame</p>
              <p className="mt-6 text-[15px] leading-relaxed text-foreground/75">
                Intelligence is studied here as something that moves through people, machines, institutions and memory.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Method</p>
                  <p className="mt-2 text-sm font-medium text-foreground">Research into product</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Field</p>
                  <p className="mt-2 text-sm font-medium text-foreground">Real-world systems</p>
                </div>
              </div>
            </motion.aside>
          </div>

          <div className="mt-16 grid border-y border-[#0b6b55]/20 md:grid-cols-4">
            {themes.map(([number, title, detail], index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * index, duration: 0.4 }}
                className="group border-b border-[#0b6b55]/20 bg-background/65 p-5 backdrop-blur transition-colors hover:bg-white/90 md:border-b-0 md:border-r md:last:border-r-0"
              >
                <span className="font-mono text-[11px] text-muted-foreground">{number}</span>
                <h2 className="mt-10 min-h-[64px] text-[21px] font-semibold leading-tight tracking-tight text-[#053f31]">{title}</h2>
                <p className="mt-7 text-[14px] leading-relaxed text-muted-foreground">{detail}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="container mx-auto max-w-6xl px-6 py-16">
          <div className="grid border-y border-border md:grid-cols-3">
            <Link to="/research" className="group border-b border-border p-6 transition-colors hover:bg-surface/70 md:border-b-0 md:border-r">
              <p className="mb-14 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Research</p>
              <h2 className="text-2xl font-semibold leading-tight tracking-tight text-foreground">
              How intelligence emerges across humans, machines and the systems around them.
              </h2>
            </Link>
            <Link to="/veyra" className="group border-b border-border p-6 transition-colors hover:bg-surface/70 md:border-b-0 md:border-r">
              <p className="mb-14 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Products</p>
              <h2 className="text-2xl font-semibold leading-tight tracking-tight text-foreground">
              What we build from the questions we pursue.
              </h2>
            </Link>
            <Link to="/conversations" className="group p-6 transition-colors hover:bg-surface/70">
              <p className="mb-14 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Conversations</p>
              <h2 className="text-2xl font-semibold leading-tight tracking-tight text-foreground">
              How people and machines think, act and make sense of uncertain worlds.
              </h2>
            </Link>
          </div>
        </div>
      </section>

      <section id="products" className="border-b border-border bg-surface/50">
        <div className="container mx-auto max-w-6xl px-6 py-24">
          <div className="relative overflow-hidden border border-border bg-background p-8 md:flex md:items-end md:justify-between md:gap-12 md:p-10">
            <div>
              <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                From the lab · 01
              </p>
              <h2 className="text-6xl font-semibold tracking-tight text-[#2563eb] md:text-8xl">Veyra</h2>
              <p className="mt-5 max-w-2xl text-xl leading-relaxed text-muted-foreground">
                Operational Intelligence for Physical AI.
              </p>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                Veyra helps teams understand what changed, decide what to do and learn from what worked across deployed physical systems.
              </p>
            </div>
            <Link
              to="/veyra"
              className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-foreground px-5 py-3 text-[13px] font-medium text-background transition-colors hover:bg-foreground/90 md:mt-0"
            >
              Explore Veyra <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="container mx-auto max-w-6xl px-6 py-20">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">About</p>
          <p className="max-w-3xl text-2xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
            Silken Reason uses research, product experiments and conversations to study how intelligence becomes action in the physical world.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default LabHome;
