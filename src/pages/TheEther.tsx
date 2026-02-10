import Layout from "@/components/Layout";
import SectionHeader from "@/components/SectionHeader";
import ArticleCard from "@/components/ArticleCard";
import { getArticlesBySection } from "@/data/articles";

const TheEther = () => {
  const articles = getArticlesBySection("the-ether");

  return (
    <Layout>
      <section className="container mx-auto px-6 py-24 max-w-4xl">
        <SectionHeader title="THE ETHER" slogan="Where vibration meets vision." />
        <div>
          {articles.map((article, i) => (
            <ArticleCard
              key={article.slug}
              title={article.title}
              date={article.date}
              excerpt={article.excerpt}
              slug={article.slug}
              section="the-ether"
              tags={article.tags}
              index={i}
            />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default TheEther;
