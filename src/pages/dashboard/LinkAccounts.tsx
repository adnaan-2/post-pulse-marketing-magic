
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Plus, ExternalLink, RefreshCcw } from "lucide-react";

// Platform types
type SocialPlatform = {
  id: string;
  name: string;
  icon: string;
  color: string;
  connected: boolean;
  accountName?: string;
  followers?: number;
};

const LinkAccounts = () => {
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([
    {
      id: "facebook",
      name: "Facebook",
      icon: "F",
      color: "#4267B2",
      connected: true,
      accountName: "SocialFuse Page",
      followers: 12503
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: "I",
      color: "#E1306C",
      connected: true,
      accountName: "@socialfuse",
      followers: 34280
    },
    {
      id: "twitter",
      name: "Twitter",
      icon: "T",
      color: "#1DA1F2",
      connected: false
    },
    {
      id: "tiktok",
      name: "TikTok",
      icon: "T",
      color: "#000000",
      connected: false
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: "L",
      color: "#0077B5",
      connected: false
    },
    {
      id: "pinterest",
      name: "Pinterest",
      icon: "P",
      color: "#E60023",
      connected: false
    }
  ]);

  const toggleConnection = (platformId: string) => {
    setPlatforms(platforms.map(platform => {
      if (platform.id === platformId) {
        if (platform.connected) {
          // Disconnect
          return {
            ...platform,
            connected: false,
            accountName: undefined,
            followers: undefined
          };
        } else {
          // Connect (mock data)
          return {
            ...platform,
            connected: true,
            accountName: platform.id === "twitter" ? "@socialfuse" : "SocialFuse Account",
            followers: Math.floor(Math.random() * 50000)
          };
        }
      }
      return platform;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Link Accounts</h1>
          <p className="text-muted-foreground">
            Connect your social media accounts to manage them all in one place.
          </p>
        </div>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <RefreshCcw className="h-4 w-4" />
          <span>Refresh Connections</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map((platform) => (
          <Card key={platform.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="h-10 w-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${platform.color}20` }}
                  >
                    <span style={{ color: platform.color }} className="text-xl font-bold">
                      {platform.icon}
                    </span>
                  </div>
                  <div>
                    <CardTitle>{platform.name}</CardTitle>
                    {platform.connected && platform.accountName && (
                      <CardDescription>{platform.accountName}</CardDescription>
                    )}
                  </div>
                </div>
                {platform.connected && (
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                    <CheckCircle className="h-3 w-3 mr-1" /> Connected
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {platform.connected ? (
                <div className="py-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Followers</span>
                    <span className="font-medium">{platform.followers?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <span className="text-sm text-green-500">Active</span>
                  </div>
                </div>
              ) : (
                <div className="py-6 flex flex-col items-center justify-center text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    Connect your {platform.name} account to start managing your content
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t bg-muted/50 flex justify-between items-center">
              {platform.connected ? (
                <>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <ExternalLink className="h-4 w-4 mr-1" /> View Profile
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-destructive hover:text-destructive/90"
                    onClick={() => toggleConnection(platform.id)}
                  >
                    Disconnect
                  </Button>
                </>
              ) : (
                <Button 
                  className="w-full" 
                  onClick={() => toggleConnection(platform.id)}
                >
                  <Plus className="h-4 w-4 mr-1" /> Connect {platform.name}
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LinkAccounts;
