import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { TooltipProvider } from "@/components/ui/tooltip";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

// Dashboard pages
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import LinkAccounts from "./pages/dashboard/LinkAccounts";
import UploadMedia from "./pages/dashboard/UploadMedia";
import SchedulePosts from "./pages/dashboard/SchedulePost"; 
import GenerateAds from "./pages/dashboard/GenerateAds";
import Analytics from "./pages/dashboard/Analytics";
import Profile from "./pages/dashboard/Profile";
import Settings from "./pages/dashboard/Settings";
import Subscription from "./pages/dashboard/Subscription";
import ImportMedia from './pages/dashboard/ImportMedia';

function App() {
  return (
    <AuthProvider>
      <TooltipProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected Dashboard Routes with Layout */}
            <Route 
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="link-accounts" element={<LinkAccounts />} />
              <Route path="upload" element={<UploadMedia />} />
              <Route path="schedule" element={<SchedulePosts />} />
              <Route path="generate-ads" element={<GenerateAds />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
              <Route path="subscription" element={<Subscription />} />
              <Route path="import-media" element={<ImportMedia />} />
            </Route>
            
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </TooltipProvider>
    </AuthProvider>
  );
}

export default App;