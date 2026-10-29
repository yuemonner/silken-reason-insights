import { ReactNode } from "react";
import Navbar from "./Navbar";
import ProductBar from "./ProductBar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <ProductBar />
        {children}
      </main>
    </div>
  );
};

export default Layout;
