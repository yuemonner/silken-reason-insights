import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  slogan: string;
  children?: ReactNode;
}

const SectionHeader = ({ title, slogan, children }: SectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <h1 className="font-serif text-5xl md:text-6xl tracking-wider gold-gradient mb-4">{title}</h1>
      <p className="font-mono text-sm text-muted-foreground tracking-wide italic">{slogan}</p>
      {children}
    </motion.div>
  );
};

export default SectionHeader;
