import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useState } from "react";

const Advisory = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      const existing = JSON.parse(localStorage.getItem("newsletter_subscribers") || "[]");
      existing.push({ email, date: new Date().toISOString() });
      localStorage.setItem("newsletter_subscribers", JSON.stringify(existing));
      setSubscribed(true);
      setEmail("");
    }
  };

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
            className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase text-foreground hover:text-primary transition-colors duration-300 mb-20"
          >
            <Mail size={14} />
            Get in touch
          </a>

          <div className="divider mb-16" />

          {/* Newsletter */}
          <div>
            <h2 className="font-serif text-2xl text-foreground mb-2">Newsletter</h2>
            <p className="font-mono text-[10px] text-muted-foreground tracking-wide mb-8">
              Occasional dispatches on technology, aesthetics, and capital flows.
            </p>

            {subscribed ? (
              <p className="font-mono text-xs text-primary">Thank you. You're in.</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 bg-transparent border-b border-border px-0 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                />
                <button
                  type="submit"
                  className="font-mono text-[10px] tracking-[0.2em] uppercase text-foreground hover:text-primary transition-colors duration-300"
                >
                  Subscribe →
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </section>
    </Layout>
  );
};

export default Advisory;
