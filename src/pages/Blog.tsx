import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { articles } from "@/data/articles";

const sections = [
  { to: "/blog/the-logic", label: "The Logic", slogan: "Decoding the algorithm of the future." },
  { to: "/blog/the-silk", label: "The Silk", slogan: "The texture of a life well-lived." },
  { to: "/blog/the-ether", label: "The Ether", slogan: "Where vibration meets vision." },
];

const Blog = () => {
  const latest = [...articles]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 8);

  return (
    <Layout>
      <section className="container mx-auto px-6 pt-32 pb-16 max-w-4xl">
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-6">
          Silken Reason · Journal
        </p>
        <h1 className="font-editorial text-5xl md:text-7xl text-foreground leading-[0.95] mb-8">
          Notes from the operator.
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          Long-form writing by Yue H. on physical infrastructure, autonomous systems and the
          aesthetics of a technical life.
        </p>
      </section>

      <section className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          {sections.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="group rounded-2xl border border-border p-6 hover:border-foreground/40 transition-colors"
            >
              <div className="font-editorial text-2xl text-foreground mb-2 group-hover:text-primary transition-colors">
                {s.label}
              </div>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{s.slogan}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 py-16 max-w-4xl">
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-10">
          Latest
        </p>
        <div>
          {latest.map((article, i) => (
            <Link key={article.slug} to={`/blog/${article.section}/${article.slug}`} className="block group">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="py-7 border-b border-border group-hover:border-foreground/40 transition-colors"
              >
                <div className="flex items-baseline gap-4 mb-3">
                  <span className="font-mono text-[11px] text-muted-foreground tabular-nums">{article.date}</span>
                  <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground">
                    {article.section.replace("-", " ")}
                  </span>
                </div>
                <h3 className="font-editorial text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors mb-2 leading-snug">
                  {article.title}
                </h3>
                <p className="text-[14px] text-muted-foreground leading-relaxed max-w-2xl">{article.excerpt}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;