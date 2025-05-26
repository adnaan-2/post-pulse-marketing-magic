
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Separator } from "@/components/ui/separator";

// Mock data for charts
const weeklyData = [
  { name: "Mon", facebook: 4000, instagram: 2400, twitter: 1800, tiktok: 3200 },
  { name: "Tue", facebook: 3000, instagram: 1398, twitter: 2800, tiktok: 3600 },
  { name: "Wed", facebook: 2000, instagram: 9800, twitter: 2200, tiktok: 5200 },
  { name: "Thu", facebook: 2780, instagram: 3908, twitter: 1500, tiktok: 4100 },
  { name: "Fri", facebook: 1890, instagram: 4800, twitter: 1700, tiktok: 3700 },
  { name: "Sat", facebook: 2390, instagram: 3800, twitter: 2100, tiktok: 4500 },
  { name: "Sun", facebook: 3490, instagram: 4300, twitter: 3100, tiktok: 5100 },
];

const monthlyData = [
  { name: "Jan", facebook: 4000, instagram: 2400, twitter: 1800, tiktok: 3200 },
  { name: "Feb", facebook: 3000, instagram: 4000, twitter: 2800, tiktok: 3600 },
  { name: "Mar", facebook: 2000, instagram: 9800, twitter: 2200, tiktok: 5200 },
  { name: "Apr", facebook: 2780, instagram: 3908, twitter: 1500, tiktok: 4100 },
  { name: "May", facebook: 1890, instagram: 4800, twitter: 1700, tiktok: 3700 },
  { name: "Jun", facebook: 2390, instagram: 3800, twitter: 2100, tiktok: 4500 },
];

const engagementData = [
  { name: "Facebook", value: 4000, fill: "#4267B2" },
  { name: "Instagram", value: 3000, fill: "#E1306C" },
  { name: "Twitter", value: 2000, fill: "#1DA1F2" },
  { name: "TikTok", value: 2780, fill: "#000000" },
];

const platformColors = {
  facebook: "#4267B2",
  instagram: "#E1306C",
  twitter: "#1DA1F2",
  tiktok: "#000000",
};

const platformConfig = {
  facebook: { label: "Facebook", theme: { light: "#4267B2", dark: "#4267B2" } },
  instagram: { label: "Instagram", theme: { light: "#E1306C", dark: "#E1306C" } },
  twitter: { label: "Twitter", theme: { light: "#1DA1F2", dark: "#1DA1F2" } },
  tiktok: { label: "TikTok", theme: { light: "#000000", dark: "#000000" } },
};

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("weekly");
  
  const chartData = timeRange === "weekly" ? weeklyData : monthlyData;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Button
              variant={timeRange === "weekly" ? "default" : "outline"} 
              size="sm"
              onClick={() => setTimeRange("weekly")}
            >
              Weekly
            </Button>
            <Button
              variant={timeRange === "monthly" ? "default" : "outline"}  
              size="sm"
              onClick={() => setTimeRange("monthly")}
            >
              Monthly
            </Button>
          </div>
        </div>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
                <div className="h-4 w-4 text-primary">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45,231</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                <div className="h-4 w-4 text-primary">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.5%</div>
                <p className="text-xs text-muted-foreground">+1.2% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Impressions</CardTitle>
                <div className="h-4 w-4 text-destructive">
                  <ArrowDownRight className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">245.8K</div>
                <p className="text-xs text-muted-foreground">-3.2% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <div className="h-4 w-4 text-primary">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.4%</div>
                <p className="text-xs text-muted-foreground">+0.4% from last month</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>Platform engagement metrics over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={platformConfig}
                  className="aspect-[4/3] sm:aspect-[16/9]"
                >
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip>
                      <ChartTooltipContent />
                    </ChartTooltip>
                    <Line
                      type="monotone"
                      dataKey="facebook"
                      stroke={platformColors.facebook}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="instagram"
                      stroke={platformColors.instagram}
                    />
                    <Line
                      type="monotone"
                      dataKey="twitter"
                      stroke={platformColors.twitter}
                    />
                    <Line
                      type="monotone"
                      dataKey="tiktok"
                      stroke={platformColors.tiktok}
                    />
                    <ChartLegend />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Platform Engagement</CardTitle>
                <CardDescription>Engagement distribution by platform</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={platformConfig}
                  className="aspect-[4/3] sm:aspect-[16/9]"
                >
                  <BarChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip>
                      <ChartTooltipContent />
                    </ChartTooltip>
                    <Bar dataKey="value" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Growth Trends</CardTitle>
                <CardDescription>Followers growth over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={platformConfig}
                  className="aspect-[4/3] sm:aspect-[16/9]"
                >
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip>
                      <ChartTooltipContent />
                    </ChartTooltip>
                    <Area
                      type="monotone"
                      dataKey="facebook"
                      stackId="1"
                      stroke={platformColors.facebook}
                      fill={platformColors.facebook}
                      opacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="instagram"
                      stackId="1"
                      stroke={platformColors.instagram}
                      fill={platformColors.instagram}
                      opacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="twitter"
                      stackId="1"
                      stroke={platformColors.twitter}
                      fill={platformColors.twitter}
                      opacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="tiktok"
                      stackId="1"
                      stroke={platformColors.tiktok}
                      fill={platformColors.tiktok}
                      opacity={0.6}
                    />
                    <ChartLegend />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest platform activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary text-xl font-bold">F</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Facebook post published</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-[#E1306C]/10 flex items-center justify-center">
                      <span className="text-[#E1306C] text-xl font-bold">I</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Instagram story viewed</p>
                      <p className="text-xs text-muted-foreground">3 hours ago</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-[#1DA1F2]/10 flex items-center justify-center">
                      <span className="text-[#1DA1F2] text-xl font-bold">T</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Twitter post scheduled</p>
                      <p className="text-xs text-muted-foreground">5 hours ago</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-black/10 flex items-center justify-center">
                      <span className="text-black dark:text-white text-xl font-bold">T</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">TikTok video uploaded</p>
                      <p className="text-xs text-muted-foreground">Yesterday</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="flex h-96 items-center justify-center rounded-md border border-dashed">
            <p className="text-sm text-muted-foreground">Analytics content will appear here</p>
          </div>
        </TabsContent>
        
        <TabsContent value="reports">
          <div className="flex h-96 items-center justify-center rounded-md border border-dashed">
            <p className="text-sm text-muted-foreground">Reports content will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
