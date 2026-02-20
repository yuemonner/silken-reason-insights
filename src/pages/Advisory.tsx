import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const Advisory = () => {
  return (
    <Layout>
      <section className="container mx-auto px-6 py-24 max-w-3xl min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-6">
            Strategic insight, delivered with precision.
          </p>
          <h1 className="font-serif text-6xl md:text-8xl tracking-wide text-foreground leading-[0.9] mb-8">
            ADVISORY
          </h1>
          <div className="divider w-16 mb-16" />

          <p className="font-mono text-xs text-muted-foreground leading-relaxed max-w-lg mb-16">
            Consulting, deep-dive reports, and technical advisory for organizations navigating the intersection of emerging technology, digital infrastructure, and strategic positioning.
          </p>

          <a
            href="mailto:hello@silkenreason.com"
            className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase text-foreground hover:text-primary transition-colors duration-300"
          >
            <Mail size={14} />
            Get in touch
          </a>
        </motion.div>
      </section>
    </Layout>
  );
};

export default Advisory;
