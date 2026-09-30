import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import LabHome from "./pages/LabHome";
import Landing from "./pages/Landing";
import Research from "./pages/Research";
import Conversations from "./pages/Conversations";
import About from "./pages/About";
import Engineering from "./pages/Engineering";
import Blog from "./pages/Blog";
import BlogSection from "./pages/BlogSection";
import ArticlePage from "./pages/ArticlePage";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LabHome />} />
          <Route path="/veyra" element={<Landing />} />
          <Route path="/research" element={<Research />} />
          <Route path="/conversations" element={<Conversations />} />
          <Route path="/about" element={<About />} />
          <Route path="/engineering" element={<Engineering />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:section" element={<BlogSection />} />
          <Route path="/blog/:section/:slug" element={<ArticlePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
