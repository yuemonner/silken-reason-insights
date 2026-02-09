import Layout from "@/components/Layout";
import SectionHeader from "@/components/SectionHeader";
import ArticleCard from "@/components/ArticleCard";
import { getArticlesBySection } from "@/data/articles";
import { motion } from "framer-motion";

const TheEther = () => {
  const articles = getArticlesBySection("the-ether");

  return (
    <Layout>
      <section className="container mx-auto px-6 py-20">
        <SectionHeader title="THE ETHER" slogan="Where vibration meets vision." />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              title={article.title}
              date={article.date}
              excerpt={article.excerpt}
              slug={article.slug}
              section="the-ether"
              tags={article.tags}
            />
          ))}
        </motion.div>
      </section>
    </Layout>
  );
};

export default TheEther;
