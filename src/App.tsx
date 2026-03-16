import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Index from "./pages/Index.tsx";
import ProgramDetail from "./pages/ProgramDetail.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import UpdateSeat from "./pages/UpdateSeat.tsx";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/program/:slug" element={<ProgramDetail />} />
            <Route path="/tentang" element={<AboutPage />} />
            <Route path="/kontak" element={<ContactPage />} />
            <Route path="/update-seat" element={<UpdateSeat />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <WhatsAppButton />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
