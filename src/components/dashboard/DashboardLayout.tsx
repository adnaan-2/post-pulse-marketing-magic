<<<<<<< HEAD
=======

>>>>>>> 70f60395989c162ae0b54d6224742801a2693e16
import { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <DashboardSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main content */}
      <div 
        className={`flex flex-col ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'} transition-all duration-300`}
      >
        {/* Header */}
        <DashboardHeader toggleSidebar={toggleSidebar} />
        
        {/* Main scrollable content */}
=======
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader toggleSidebar={toggleSidebar} />
>>>>>>> 70f60395989c162ae0b54d6224742801a2693e16
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
