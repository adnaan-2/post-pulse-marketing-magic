import { useState } from "react";
import { Bell, User, ChevronDown, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Define the proper props interface with toggleSidebar
interface DashboardHeaderProps {
  toggleSidebar: () => void;
}

const DashboardHeader = ({ toggleSidebar }: DashboardHeaderProps) => {
  const [notificationCount, setNotificationCount] = useState(3);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/login");
  };

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";
  };
  
  return (
    <header className="bg-background border-b py-3 px-4 flex items-center justify-between">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleSidebar}
        className="md:hidden"
      >
        <Menu className="h-5 w-5" />
      </Button>
      
      <div className="flex-1" />
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 h-5 w-5 flex items-center justify-center text-xs bg-primary text-white rounded-full">
                {notificationCount}
              </span>
            )}
          </Button>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 px-2">
              <Avatar className="h-8 w-8">
                {user?.profileImage ? (
                  <AvatarImage 
                    src={user.profileImage} 
                    alt={user?.name || "User"} 
                  />
                ) : (
                  <AvatarFallback>{getInitials(user?.name || "User")}</AvatarFallback>
                )}
              </Avatar>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem className="flex flex-col items-start">
              <span className="font-medium">{user?.name || "User Name"}</span>
              <span className="text-xs text-muted-foreground">{user?.email || "user@example.com"}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/dashboard/profile" className="w-full cursor-pointer">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/dashboard/subscription" className="w-full cursor-pointer">Subscription</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/dashboard/settings" className="w-full cursor-pointer">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;