<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Pages
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Dashboard from "@/pages/dashboard/Dashboard";
=======

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
>>>>>>> 70f60395989c162ae0b54d6224742801a2693e16
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/dashboard/DashboardLayout";
<<<<<<< HEAD
import LinkAccounts from "./pages/dashboard/LinkAccounts";
import UploadMedia from "./pages/dashboard/UploadMedia";
import SchedulePosts from "./pages/dashboard/SchedulePost";
import GenerateAds from "./pages/dashboard/GenerateAds";
import Analytics from "./pages/dashboard/Analytics";
import Profile from "./pages/dashboard/Profile";
import Settings from "./pages/dashboard/Settings";
import Subscription from "./pages/dashboard/Subscription";
import ImportMedia from './pages/dashboard/ImportMedia';  
=======
import Dashboard from "./pages/dashboard/Dashboard";
import LinkAccounts from "./pages/dashboard/LinkAccounts";
import UploadMedia from "./pages/dashboard/UploadMedia";
import SchedulePosts from "./pages/dashboard/SchedulePosts";
import GenerateAds from "./pages/dashboard/GenerateAds";
import Analytics from "./pages/dashboard/Analytics";
>>>>>>> 70f60395989c162ae0b54d6224742801a2693e16

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
<<<<<<< HEAD
          {/* Protected Dashboard Routes with Layout */}
          <Route 
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
=======
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
>>>>>>> 70f60395989c162ae0b54d6224742801a2693e16
            <Route index element={<Dashboard />} />
            <Route path="link-accounts" element={<LinkAccounts />} />
            <Route path="upload" element={<UploadMedia />} />
            <Route path="schedule" element={<SchedulePosts />} />
            <Route path="generate-ads" element={<GenerateAds />} />
            <Route path="analytics" element={<Analytics />} />
<<<<<<< HEAD
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="subscription" element={<Subscription />} />
            <Route path="import-media" element={<ImportMedia />} />
          </Route>
          
          {/* Catch-all route for 404 */}
=======
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
>>>>>>> 70f60395989c162ae0b54d6224742801a2693e16
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </AuthProvider>
  );
}

export default App;