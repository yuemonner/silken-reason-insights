import Layout from "@/components/Layout";
import SectionHeader from "@/components/SectionHeader";
import ArticleCard from "@/components/ArticleCard";
import { getArticlesBySection } from "@/data/articles";
import { motion } from "framer-motion";

const TheLogic = () => {
  const articles = getArticlesBySection("the-logic");

  return (
    <Layout>
      <section className="container mx-auto px-6 py-20">
        <SectionHeader title="THE LOGIC" slogan="Decoding the algorithm of the future." />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              title={article.title}
              date={article.date}
              excerpt={article.excerpt}
              slug={article.slug}
              section="the-logic"
              tags={article.tags}
            />
          ))}
        </motion.div>
      </section>
    </Layout>
  );
};

export default TheLogic;
