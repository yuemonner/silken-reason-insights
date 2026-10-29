import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Shown on the lab's pages (not on Veyra's own), so the product is the first thing visitors see.
const ProductBar = () => {
  const { pathname } = useLocation();
  if (["/veyra", "/engineering", "/contact"].includes(pathname)) return null;
  return (
    <Link to="/veyra" className="group block bg-[#0a1424] text-white transition-colors hover:bg-[#101d33]">
      <div className="container mx-auto flex max-w-6xl items-center justify-center gap-3 px-6 py-2.5 text-center text-[13px]">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#84d7b0]" />
        <span className="text-white/80">
          <span className="font-medium text-white">Veyra</span> is live: an AI field engineer for physical AI, tested on real failure logs.
        </span>
        <span className="hidden items-center gap-1 text-[#84d7b0] sm:inline-flex">
          See it <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
};

export default ProductBar;
