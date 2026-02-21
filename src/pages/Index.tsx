import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import profileImg from "@/assets/profile.jpeg";
import { articles } from "@/data/articles";

const sections = [
  { to: "/the-logic", label: "THE LOGIC" },
  { to: "/the-silk", label: "THE SILK" },
  { to: "/the-ether", label: "THE ETHER" },
  { to: "/advisory", label: "ADVISORY" },
];

const Index = () => {
  // Show latest articles across all sections
  const latestArticles = [...articles]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  return (
    <Layout>
      {/* Hero — Asymmetric Editorial */}
      <section className="min-h-[85vh] flex items-end px-6 pb-24">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="grid md:grid-cols-2 gap-16 items-end"
          >
            {/* Left — Identity */}
            <div>
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-8">
                Founder & Principal Analyst
              </p>
              <h1 className="font-serif text-7xl md:text-9xl tracking-[0.06em] text-foreground leading-[0.9] mb-8">
                Yue H.
              </h1>
              <div className="divider w-16 mb-8" />
              <div className="font-mono text-xs text-muted-foreground leading-relaxed max-w-sm space-y-3">
                <p>Building cathedrals of logic in a world of entropy.</p>
                <p>Bridging the finite world of hardware with the infinite resonance of art.</p>
                <p>Structuring the void. Translating the invisible into the inevitable.</p>
              </div>
            </div>

            {/* Right — Portrait */}
            <div className="flex justify-center md:justify-end mt-10 md:mt-0">
              <div className="w-56 h-72 md:w-80 md:h-[420px] border border-border relative overflow-hidden">
                <img
                  src={profileImg}
                  alt="Yue H. — Founder of Silken Reason"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation — Inline text, no boxes */}
      <section className="px-6 py-16">
        <div className="container mx-auto">
          <div className="divider mb-16" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-wrap gap-x-16 gap-y-6"
          >
            {sections.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                className="font-serif text-3xl md:text-4xl text-foreground hover:text-primary transition-colors duration-500 tracking-wide"
              >
                {s.label}
              </Link>
            ))}
          </motion.div>
          <div className="divider mt-16" />
        </div>
      </section>

      {/* Intelligence Briefing — Editorial List */}
      <section className="px-6 py-16">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-12">
              Latest Intelligence
            </p>

            <div className="space-y-0">
              {latestArticles.map((article, i) => (
                <Link
                  key={article.slug}
                  to={`/${article.section}/${article.slug}`}
                  className="block group"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.08, duration: 0.5 }}
                    className="py-8 border-b border-border hover:border-primary/40 transition-colors duration-500"
                  >
                    <div className="flex items-baseline gap-6 mb-3">
                      <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
                        {article.date}
                      </span>
                      <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-primary/60">
                        {article.section.replace("-", " ")}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors duration-500 mb-3 leading-snug">
                      {article.title}
                    </h3>
                    <p className="font-mono text-xs text-muted-foreground leading-relaxed max-w-2xl">
                      {article.excerpt}
                    </p>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quiet footer */}
      <footer className="px-6 py-20">
        <div className="container mx-auto max-w-4xl">
          <div className="divider mb-8" />
          <div className="flex justify-between items-center">
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground">
              © 2026 Silken Reason
            </span>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default Index;
