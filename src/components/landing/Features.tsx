
import { useState } from "react";
import { Check, Instagram, MessageSquare, Calendar, ChartBar, Facebook, Twitter, Linkedin } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const FeatureCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: JSX.Element, 
  title: string, 
  description: string 
}) => (
  <div className="glass-card p-6 rounded-xl animate-scale-in">
    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const Features = () => {
  const [platform, setPlatform] = useState<string>("instagram");

  return (
    <section id="features" className="section-padding">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
          <Badge className="mb-4">Features</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Everything You Need For <span className="text-gradient-primary">Social Success</span></h2>
          <p className="text-lg text-muted-foreground">
            Our all-in-one platform gives you the tools to conquer social media without the complexity.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12 md:mb-20">
          <FeatureCard
            icon={<MessageSquare className="text-brand-purple" />}
            title="Multi-Platform Publishing"
            description="Post to all your social accounts from one dashboard. Draft, preview, and publish with ease."
          />
          <FeatureCard
            icon={<Calendar className="text-brand-blue" />}
            title="Smart Scheduling"
            description="Plan and schedule your content in advance for the perfect posting times."
          />
          <FeatureCard
            icon={<ChartBar className="text-brand-pink" />}
            title="Analytics & Reports"
            description="Track performance with detailed insights and metrics across all platforms."
          />
        </div>

        <div className="bg-secondary/50 rounded-2xl p-6 md:p-10">
          <Tabs defaultValue="publishing" className="w-full">
            <TabsList className="w-full max-w-lg mx-auto grid grid-cols-3 mb-8">
              <TabsTrigger value="publishing">Publishing</TabsTrigger>
              <TabsTrigger value="ai_content">AI Content</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="publishing" className="mt-0">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4">Post to all platforms simultaneously</h3>
                  <p className="text-muted-foreground mb-6">Save time by creating and scheduling content for all your social channels from one intuitive interface.</p>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      "Connect unlimited social accounts",
                      "Schedule posts for optimal times",
                      "Preview posts before publishing",
                      "Bulk upload and schedule content"
                    ].map((item, i) => (
                      <div key={i} className="flex items-start">
                        <div className="mt-1 mr-3 flex-shrink-0">
                          <Check className="h-5 w-5 text-brand-purple" />
                        </div>
                        <p>{item}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: "Instagram", value: "instagram", icon: Instagram, color: "bg-gradient-to-br from-[#405DE6] to-[#5851DB]" },
                      { name: "Facebook", value: "facebook", icon: Facebook, color: "bg-[#1877F2]" },
                      { name: "Twitter", value: "twitter", icon: Twitter, color: "bg-[#1DA1F2]" },
                      { name: "LinkedIn", value: "linkedin", icon: Linkedin, color: "bg-[#0A66C2]" }
                    ].map((item) => (
                      <button
                        key={item.value}
                        onClick={() => setPlatform(item.value)}
                        className={`flex items-center space-x-1 px-3 py-1 rounded-full transition-all ${
                          platform === item.value 
                            ? `${item.color} text-white` 
                            : 'bg-secondary/50 hover:bg-secondary'
                        }`}
                      >
                        <item.icon size={14} />
                        <span>{item.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <div className="glass-card rounded-xl overflow-hidden animate-fade-in">
                    <img 
                      src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&h=400" 
                      alt="Publishing dashboard" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="ai_content">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4">AI-Powered Content Creation</h3>
                  <p className="text-muted-foreground mb-6">Generate engaging content, design eye-catching graphics, and get smart recommendations tailored to your audience.</p>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      "Create custom graphics and posters with AI",
                      "Generate captions and hashtag suggestions",
                      "Get content ideas based on trending topics",
                      "Optimize posts with engagement predictions"
                    ].map((item, i) => (
                      <div key={i} className="flex items-start">
                        <div className="mt-1 mr-3 flex-shrink-0">
                          <Check className="h-5 w-5 text-brand-blue" />
                        </div>
                        <p>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <div className="glass-card rounded-xl overflow-hidden animate-fade-in">
                    <img 
                      src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=600&h=400" 
                      alt="AI content creation" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="analytics">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4">Comprehensive Analytics</h3>
                  <p className="text-muted-foreground mb-6">Track your performance across all platforms with detailed metrics and actionable insights.</p>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      "Real-time performance metrics",
                      "Cross-platform comparison reports",
                      "Audience growth and engagement analytics",
                      "Custom report generation and exports"
                    ].map((item, i) => (
                      <div key={i} className="flex items-start">
                        <div className="mt-1 mr-3 flex-shrink-0">
                          <Check className="h-5 w-5 text-brand-pink" />
                        </div>
                        <p>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <div className="glass-card rounded-xl overflow-hidden animate-fade-in">
                    <img 
                      src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&h=400" 
                      alt="Analytics dashboard" 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Features;
