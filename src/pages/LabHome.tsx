import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowRight } from "lucide-react";

const themes = [
  ["Distributed Intelligence", "Human judgment, machine perception and organizational routines acting as one system.", "01"],
  ["Decision Systems", "How action forms when evidence is incomplete and responsibility is shared.", "02"],
  ["Physical Intelligence", "Robots, embodied systems and machine fleets meeting the real world.", "03"],
  ["Memory & Adaptation", "How prior outcomes become usable context for the next decision.", "04"],
];

const LabHome = () => {
  return (
    <Layout>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.08),transparent_58%)]" />
          <div
            className="absolute inset-0 opacity-[0.28]"
            style={{
              backgroundImage:
                "linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage: "radial-gradient(ellipse at center, black 35%, transparent 78%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, black 35%, transparent 78%)",
            }}
          />
        </div>

        <div className="container mx-auto max-w-6xl px-6 pb-28 pt-32 md:pb-36 md:pt-44">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-4xl"
          >
            <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Independent Research Lab
            </p>
            <h1 className="mb-7 bg-[linear-gradient(112deg,#053f31_0%,#0b6b55_42%,#14352f_100%)] bg-clip-text text-6xl font-semibold tracking-[-0.08em] text-transparent md:text-8xl lg:text-[112px] leading-[0.9] [font-variant-ligatures:common-ligatures]">
              Silken Reason
            </h1>
            <p className="max-w-2xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
              Silken Reason is an independent research lab studying how intelligence emerges, acts and adapts in real-world systems.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-3 md:grid-cols-12">
            {themes.map(([title, detail, number], index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * index, duration: 0.4 }}
                className={`group relative overflow-hidden rounded-lg border border-border bg-background/80 p-5 backdrop-blur transition-colors hover:border-[#0b6b55]/35 ${
                  index === 0 || index === 3 ? "md:col-span-7" : "md:col-span-5"
                }`}
              >
                <div className="pointer-events-none absolute -right-10 -top-12 h-28 w-28 rounded-full border border-[#0b6b55]/15 transition-transform duration-500 group-hover:scale-125" />
                <div className="flex items-start justify-between gap-8">
                  <h2 className="max-w-[280px] text-[22px] font-semibold leading-tight tracking-tight text-[#053f31]">{title}</h2>
                  <span className="font-mono text-[11px] text-muted-foreground">{number}</span>
                </div>
                <p className="mt-10 max-w-xl text-[14px] leading-relaxed text-muted-foreground">{detail}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="container mx-auto grid max-w-6xl gap-4 px-6 py-20 md:grid-cols-3">
          <Link to="/research" className="group rounded-lg border border-border bg-background p-6 transition-colors hover:border-foreground/30">
            <p className="mb-16 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Research</p>
            <h2 className="text-2xl font-semibold leading-tight tracking-tight text-foreground">
              Human-machine cognition, distributed intelligence, memory, adaptation and real-world systems.
            </h2>
          </Link>
          <Link to="/veyra" className="group rounded-lg border border-border bg-background p-6 transition-colors hover:border-foreground/30">
            <p className="mb-16 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Products</p>
            <h2 className="text-2xl font-semibold leading-tight tracking-tight text-foreground">
              What we build from the questions we pursue.
            </h2>
          </Link>
          <Link to="/conversations" className="group rounded-lg border border-border bg-background p-6 transition-colors hover:border-foreground/30">
            <p className="mb-16 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Conversations</p>
            <h2 className="text-2xl font-semibold leading-tight tracking-tight text-foreground">
              How people and machines think, act and make sense of uncertain worlds.
            </h2>
          </Link>
        </div>
      </section>

      <section id="products" className="border-b border-border bg-surface/50">
        <div className="container mx-auto max-w-6xl px-6 py-24">
          <div className="rounded-lg border border-border bg-background p-8 md:flex md:items-end md:justify-between md:gap-12 md:p-10">
            <div>
              <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                From the lab · 01
              </p>
              <h2 className="text-6xl font-semibold tracking-tight text-foreground md:text-8xl">Veyra</h2>
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
