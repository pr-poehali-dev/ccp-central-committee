
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Structure from "./pages/Structure";
import News from "./pages/News";
import Lubertsy from "./pages/Lubertsy";
import Metro from "./pages/Metro";
import Army from "./pages/Army";
import Construction from "./pages/Construction";
import Roles from "./pages/Roles";
import Admin from "./pages/Admin";
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
          <Route path="/structure" element={<Structure />} />
          <Route path="/news" element={<News />} />
          <Route path="/lubertsy" element={<Lubertsy />} />
          <Route path="/metro" element={<Metro />} />
          <Route path="/army" element={<Army />} />
          <Route path="/construction" element={<Construction />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;