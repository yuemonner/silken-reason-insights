import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const sections = [
  {
    to: "/the-logic",
    title: "THE LOGIC",
    slogan: "Decoding the algorithm of the future.",
  },
  {
    to: "/the-silk",
    title: "THE SILK",
    slogan: "The texture of a life well-lived.",
  },
  {
    to: "/the-ether",
    title: "THE ETHER",
    slogan: "Where vibration meets vision.",
  },
  {
    to: "/advisory",
    title: "ADVISORY",
    slogan: "Strategic insight, delivered with precision.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="min-h-[90vh] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl"
        >
          {/* Profile placeholder */}
          <div className="w-28 h-28 rounded-full border-2 border-primary/30 mx-auto mb-8 flex items-center justify-center overflow-hidden">
            <span className="font-serif text-3xl text-primary">Y</span>
          </div>

          <h1 className="font-serif text-6xl md:text-8xl tracking-wide gold-gradient mb-6">
            Yue H.
          </h1>

          <div className="glass rounded-xl p-8 max-w-xl mx-auto">
            <p className="font-mono text-sm text-muted-foreground leading-relaxed">
              Founder of <span className="text-primary">Silken Reason</span>. Senior Software Engineer by trade, Web3 Explorer by design.
            </p>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed mt-2">
              Tracking the flow of Energy, Capital, and Aesthetics across Europe.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Section Cards */}
      <section className="container mx-auto px-6 pb-24">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {sections.map((s) => (
            <motion.div key={s.to} variants={item}>
              <Link to={s.to}>
                <div className="glass glass-hover rounded-lg p-8 text-center transition-all group">
                  <h2 className="font-serif text-2xl tracking-widest text-foreground group-hover:text-primary transition-colors mb-3">
                    {s.title}
                  </h2>
                  <p className="font-mono text-xs text-muted-foreground italic tracking-wide">
                    {s.slogan}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </Layout>
  );
};

export default Index;
