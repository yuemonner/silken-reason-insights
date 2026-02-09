import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface ArticleCardProps {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  section: string;
  tags?: string[];
  coverImage?: string;
}

const ArticleCard = ({ title, date, excerpt, slug, section, tags }: ArticleCardProps) => {
  return (
    <Link to={`/${section}/${slug}`}>
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="glass glass-hover rounded-lg p-6 h-full flex flex-col gap-4 cursor-pointer transition-all"
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-muted-foreground">{date}</span>
          {tags?.map((tag) => (
            <span key={tag} className="font-mono text-[10px] tracking-wider uppercase text-primary/70 border border-primary/20 rounded px-2 py-0.5">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-serif text-xl text-foreground leading-snug">{title}</h3>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed flex-1">{excerpt}</p>
        <span className="font-mono text-xs text-primary tracking-wider uppercase">Read more →</span>
      </motion.article>
    </Link>
  );
};

export default ArticleCard;
