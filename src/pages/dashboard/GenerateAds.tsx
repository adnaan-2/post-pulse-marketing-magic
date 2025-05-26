
import { PlusCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const GenerateAds = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Generate Ads</h1>
        <p className="text-muted-foreground">
          Create optimized ad campaigns for your platforms
        </p>
      </div>
      
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            The Ad Generation feature is under development
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <PlusCircle className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-center max-w-md">
            Generate optimized ad campaigns across all your social media platforms.
            This feature will be available soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default GenerateAds;
