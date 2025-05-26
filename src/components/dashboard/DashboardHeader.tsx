<<<<<<< HEAD
import { useState } from "react";
import { Bell, User, ChevronDown, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
=======

import { useState } from "react";
import { Bell, User, ChevronDown, Menu } from "lucide-react";
>>>>>>> 70f60395989c162ae0b54d6224742801a2693e16
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
<<<<<<< HEAD
import { useToast } from "@/hooks/use-toast";
=======
>>>>>>> 70f60395989c162ae0b54d6224742801a2693e16

interface DashboardHeaderProps {
  toggleSidebar: () => void;
}

const DashboardHeader = ({ toggleSidebar }: DashboardHeaderProps) => {
  const [notificationCount, setNotificationCount] = useState(3);
<<<<<<< HEAD
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
=======
>>>>>>> 70f60395989c162ae0b54d6224742801a2693e16
  
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
<<<<<<< HEAD
                {user?.profileImage ? (
                  <AvatarImage 
                    src={user.profileImage} 
                    alt={user.name} 
                  />
                ) : (
                  <AvatarFallback>{getInitials(user?.name || "User")}</AvatarFallback>
                )}
=======
                <AvatarImage src="" />
                <AvatarFallback>U</AvatarFallback>
>>>>>>> 70f60395989c162ae0b54d6224742801a2693e16
              </Avatar>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem className="flex flex-col items-start">
<<<<<<< HEAD
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
=======
              <span className="font-medium">User Name</span>
              <span className="text-xs text-muted-foreground">user@example.com</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
>>>>>>> 70f60395989c162ae0b54d6224742801a2693e16
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
