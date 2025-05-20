
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Link as LinkIcon, 
  Calendar, 
  Upload, 
  PlusCircle, 
  BarChart3, 
  Settings
} from "lucide-react";

interface DashboardSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const DashboardSidebar = ({ isOpen, toggleSidebar }: DashboardSidebarProps) => {
  const location = useLocation();
  
  const navItems = [
    { label: "Dashboard", icon: Home, path: "/dashboard" },
    { label: "Link Accounts", icon: LinkIcon, path: "/dashboard/link-accounts" },
    { label: "Schedule Posts", icon: Calendar, path: "/dashboard/schedule" },
    { label: "Upload Posts", icon: Upload, path: "/dashboard/upload" },
    { label: "Generate Ads", icon: PlusCircle, path: "/dashboard/generate-ads" },
    { label: "Analytics", icon: BarChart3, path: "/dashboard/analytics" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside 
      className={`${
        isOpen ? "w-64" : "w-0 md:w-16"
      } transition-width duration-300 ease-in-out fixed md:relative inset-y-0 left-0 z-50 
      bg-white dark:bg-gray-900 border-r shadow-sm overflow-y-auto`}
    >
      <div className="p-4 flex items-center justify-center md:justify-start">
        {isOpen ? (
          <Link to="/dashboard" className="flex items-center gap-2 text-primary font-bold text-xl">
            <div className="flex flex-col items-center">
              <div className="flex">
                <div className="w-3 h-3 bg-primary"></div>
                <div className="w-3 h-3 bg-primary ml-1"></div>
              </div>
              <div className="flex mt-1">
                <div className="w-3 h-3 bg-primary"></div>
                <div className="w-3 h-3 bg-primary ml-1"></div>
              </div>
            </div>
            <span>ContentFlow</span>
          </Link>
        ) : (
          <Link to="/dashboard" className="flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="flex">
                <div className="w-2 h-2 bg-primary"></div>
                <div className="w-2 h-2 bg-primary ml-0.5"></div>
              </div>
              <div className="flex mt-0.5">
                <div className="w-2 h-2 bg-primary"></div>
                <div className="w-2 h-2 bg-primary ml-0.5"></div>
              </div>
            </div>
          </Link>
        )}
      </div>
      
      <nav className="mt-6 px-2">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path) 
                    ? "bg-primary/10 text-primary" 
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <item.icon className={`${isOpen ? "mr-3" : "mx-auto"} h-5 w-5`} />
                {isOpen && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="mt-6 px-4">
        <Button 
          variant="default" 
          className="w-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2"
        >
          <Upload className="h-4 w-4" />
          {isOpen && <span>Transfer Media</span>}
        </Button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
