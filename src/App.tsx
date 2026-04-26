import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/AuthContext";
import { AuthModals } from "@/components/auth/AuthModals";
import { ProfileDrawer } from "@/components/profile/ProfileDrawer";
import { CheckoutModal } from "@/components/payments/CheckoutModal";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Perfil from "./pages/Perfil";
import MyBookings from "./pages/MyBookings";
import { SearchPage } from "@/components/search/search-page";
import { SignupPage } from "@/components/auth/signup-page";
import { ChatPage } from "@/components/chat/chat-page";
import { UserDashboardPage } from "@/components/dashboard/user-dashboard-page";
import { CompanionDashboardPage } from "@/components/dashboard/companion-dashboard-page";
import { PaymentsPage } from "@/components/payments/payments-page";
import { VerificationPage } from "@/components/verification/verification-page";
import { PrivacyPage } from "@/components/legal/privacy-page";
import { TermsPage } from "@/components/legal/terms-page";
import { ReportPage } from "@/components/legal/report-page";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/busca" element={<SearchPage />} />
            <Route path="/cadastro" element={<SignupPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/painel" element={<UserDashboardPage />} />
            <Route path="/painel/namorada" element={<CompanionDashboardPage />} />
            <Route path="/perfil/:id" element={<Perfil />} />
            <Route path="/pagamentos" element={<PaymentsPage />} />
            <Route path="/verificacao" element={<VerificationPage />} />
            <Route path="/privacidade" element={<PrivacyPage />} />
            <Route path="/termos" element={<TermsPage />} />
            <Route path="/denuncias" element={<ReportPage />} />
            <Route path="/meus-agendamentos" element={<MyBookings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* Global overlays */}
          <AuthModals />
          <ProfileDrawer />
          <CheckoutModal />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
