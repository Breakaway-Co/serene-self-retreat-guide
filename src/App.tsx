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
import RetreatsPage from "./pages/RetreatsPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";
import Auth from "./pages/Auth";
import TestAccountsPage from "./pages/TestAccountsPage";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/common/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <AppProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<AppLayout />}>
                  <Route index element={<Index />} />
                  <Route path="retreats" element={<ProtectedRoute><RetreatsPage /></ProtectedRoute>} />
                  <Route path="daily" element={<ProtectedRoute><DailyProgramPage /></ProtectedRoute>} />
                  <Route path="activities" element={<ProtectedRoute><ActivitiesPage /></ProtectedRoute>} />
                  <Route path="resources" element={<ProtectedRoute><ResourcesPage /></ProtectedRoute>} />
                  <Route path="progress" element={<ProtectedRoute><ProgressPage /></ProtectedRoute>} />
                  <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                </Route>
                <Route path="/auth" element={<Auth />} />
                <Route path="/intake" element={<IntakeAssessment />} />
                <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
                <Route path="/test-accounts" element={<TestAccountsPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AppProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
