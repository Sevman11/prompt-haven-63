import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Index from "./pages/Index";
import PromptCatalog from "./pages/PromptCatalog";
import PromptDetail from "./pages/PromptDetail";
import AIChat from "./pages/AIChat";
import Photo from "./pages/Photo";
import Video from "./pages/Video";
import Assistants from "./pages/Assistants";
import Generations from "./pages/Generations";
import Training from "./pages/Training";
import Subscription from "./pages/Subscription";
import Profile from "./pages/Profile";
import Support from "./pages/Support";
import ContentFactorySources from "./pages/ContentFactorySources";
import ContentFactoryCollection from "./pages/ContentFactoryCollection";
import ContentFactoryCheck from "./pages/ContentFactoryCheck";
import ContentFactoryBasePost from "./pages/ContentFactoryBasePost";
import ContentFactoryVerification from "./pages/ContentFactoryVerification";
import ContentFactoryPublications from "./pages/ContentFactoryPublications";
import ContentFactoryPublicationsList from "./pages/ContentFactoryPublicationsList";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/chat" element={<AIChat />} />
            <Route path="/photo" element={<Photo />} />
            <Route path="/video" element={<Video />} />
            <Route path="/prompts" element={<PromptCatalog />} />
            <Route path="/prompt/:id" element={<PromptDetail />} />
            <Route path="/assistants" element={<Assistants />} />
            <Route path="/generations" element={<Generations />} />
            <Route path="/training" element={<Training />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/support" element={<Support />} />
            <Route path="/content-factory/sources" element={<ContentFactorySources />} />
            <Route path="/content-factory/collection" element={<ContentFactoryCollection />} />
            <Route path="/content-factory/check" element={<ContentFactoryCheck />} />
            <Route path="/content-factory/base-post" element={<ContentFactoryBasePost />} />
            <Route path="/content-factory/verification" element={<ContentFactoryVerification />} />
            <Route path="/content-factory/publications" element={<ContentFactoryPublicationsList />} />
            <Route path="/content-factory/publications/edit" element={<ContentFactoryPublications />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
