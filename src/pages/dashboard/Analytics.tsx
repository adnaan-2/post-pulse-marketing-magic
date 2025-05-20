
import { BarChart3 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Track performance metrics across your social platforms
        </p>
      </div>
      
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            The Advanced Analytics feature is under development
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <BarChart3 className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-center max-w-md">
            Comprehensive analytics and reporting tools for all your social media accounts.
            This feature will be available soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
