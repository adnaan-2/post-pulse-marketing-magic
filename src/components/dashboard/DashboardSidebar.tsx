import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Link as LinkIcon, 
  Calendar, 
  Upload, 
  PlusCircle, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface DashboardSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const DashboardSidebar = ({ isOpen, toggleSidebar }: DashboardSidebarProps) => {
  const location = useLocation();
  
  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
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
        isOpen ? "w-64" : "w-20"
      } transition-all duration-300 ease-in-out fixed top-0 left-0 z-50 
      h-screen bg-background/80 backdrop-blur-md border-r shadow-lg flex flex-col`}
    >
      <div className="p-4 flex items-center justify-between">
        <Link to="/dashboard" className={`flex items-center gap-2 text-primary font-bold ${isOpen ? 'text-xl' : 'text-sm justify-center w-full'}`}>
          <div className="flex flex-col items-center">
            <div className="flex">
              <div className="w-3 h-3 bg-primary rounded-sm"></div>
              <div className="w-3 h-3 bg-primary/70 ml-1 rounded-sm"></div>
            </div>
            <div className="flex mt-1">
              <div className="w-3 h-3 bg-primary/70 rounded-sm"></div>
              <div className="w-3 h-3 bg-primary rounded-sm ml-1"></div>
            </div>
          </div>
          {isOpen && <span className="text-gradient-primary">ContentFlow</span>}
        </Link>
        
        <Button
          variant="ghost"
          size="icon"
          className={`${isOpen ? '' : 'hidden'} rounded-full h-8 w-8 hover:bg-primary/20 transition-colors`}
          onClick={toggleSidebar}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="mt-6 px-3 flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-xl transition-all ${
                  isActive(item.path) 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "hover:bg-primary/10 text-foreground/80 hover:text-foreground"
                }`}
              >
                <item.icon className={`${isOpen ? "mr-3" : "mx-auto"} h-5 w-5 ${isActive(item.path) ? "" : "text-muted-foreground"}`} />
                {isOpen && <span className="font-medium">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      {!isOpen && (
        <div className="mt-auto pb-5 flex justify-center">
          <Button
            variant="ghost" 
            size="icon"
            className="rounded-full h-10 w-10 hover:bg-primary/20 transition-colors"
            onClick={toggleSidebar}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      {isOpen && (
        <div className="mt-auto pb-6 px-4">
          <Button 
            variant="default" 
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2 rounded-xl shadow-md"
          >
            <Upload className="h-4 w-4" />
            <span>Transfer Media</span>
          </Button>
        </div>
      )}
    </aside>
  );
};

export default DashboardSidebar;