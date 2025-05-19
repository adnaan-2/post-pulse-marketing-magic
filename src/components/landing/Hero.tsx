
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, Twitter, Linkedin } from "lucide-react";

const SocialIcon = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${className} animate-float`}>
    {children}
  </div>
);

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center section-padding pt-32">
      {/* Background gradient effects */}
      <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-brand-purple/20 rounded-full filter blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-brand-blue/20 rounded-full filter blur-[120px] animate-pulse-slow" />
      
      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Manage All Your <span className="text-gradient-primary">Social Media</span> In One Place
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8">
              Post, schedule, analyze, and create AI-powered content for all your social platforms with one powerful tool.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button size="lg" className="w-full sm:w-auto">Get Started Free</Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">Book a Demo</Button>
            </div>

            <div className="mt-12">
              <p className="text-sm text-muted-foreground mb-4">Works with all major platforms</p>
              <div className="flex space-x-4">
                <SocialIcon className="bg-gradient-to-br from-[#405DE6] to-[#5851DB]">
                  <Instagram size={20} className="text-white" />
                </SocialIcon>
                <SocialIcon className="bg-[#1877F2]">
                  <Facebook size={20} className="text-white" />
                </SocialIcon>
                <SocialIcon className="bg-[#1DA1F2]">
                  <Twitter size={20} className="text-white" />
                </SocialIcon>
                <SocialIcon className="bg-[#0A66C2]">
                  <Linkedin size={20} className="text-white" />
                </SocialIcon>
              </div>
            </div>
          </div>

          <div className="relative order-1 md:order-2 animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-purple to-brand-blue rounded-2xl opacity-20 blur-lg transform scale-105"></div>
              <div className="glass-card rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&h=400" 
                  alt="Dashboard preview" 
                  className="w-full h-auto rounded-2xl"
                />
              </div>
              
              {/* Floating UI elements for visual effect */}
              <div className="absolute -bottom-6 -right-6 glass-card p-4 rounded-lg animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-brand-pink flex items-center justify-center">
                    <Instagram size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-medium">Post scheduled</p>
                    <p className="text-xs text-muted-foreground">Today, 4:30 PM</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-6 -left-6 glass-card p-3 rounded-lg animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center">
                    <Twitter size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-medium">+43% Engagement</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
