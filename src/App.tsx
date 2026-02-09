import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TheLogic from "./pages/TheLogic";
import TheSilk from "./pages/TheSilk";
import TheEther from "./pages/TheEther";
import Advisory from "./pages/Advisory";
import ArticlePage from "./pages/ArticlePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/the-logic" element={<TheLogic />} />
          <Route path="/the-silk" element={<TheSilk />} />
          <Route path="/the-ether" element={<TheEther />} />
          <Route path="/advisory" element={<Advisory />} />
          <Route path="/:section/:slug" element={<ArticlePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
