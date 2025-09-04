import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { AppLayout } from "@/components/layout/AppLayout";
import Index from "./pages/Index";
import IntakeAssessment from "./pages/IntakeAssessment";
import DailyProgramPage from "./pages/DailyProgram";
import ActivitiesPage from "./pages/ActivitiesPage";
import ResourcesPage from "./pages/ResourcesPage";
import ProgressPage from "./pages/ProgressPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AppLayout />}>
                <Route index element={<Index />} />
                <Route path="daily" element={<DailyProgramPage />} />
                <Route path="activities" element={<ActivitiesPage />} />
                <Route path="resources" element={<ResourcesPage />} />
                <Route path="progress" element={<ProgressPage />} />
              </Route>
              <Route path="/intake" element={<IntakeAssessment />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AppProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
