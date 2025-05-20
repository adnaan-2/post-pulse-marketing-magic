
import { Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SchedulePosts = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Schedule Posts</h1>
        <p className="text-muted-foreground">
          Plan and schedule your content across platforms
        </p>
      </div>
      
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            The Schedule Posts feature is under development
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Calendar className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-center max-w-md">
            Schedule your posts in advance across multiple platforms.
            This feature will be available soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchedulePosts;
