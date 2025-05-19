
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl max-h-5xl bg-brand-blue/10 rounded-full filter blur-[120px] animate-pulse-slow" />
      
      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue to-brand-pink rounded-2xl opacity-20 blur-lg transform scale-105"></div>
              <div className="glass-card rounded-2xl overflow-hidden animate-scale-in">
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&h=400" 
                  alt="Person using social media management platform" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
          
          <div className="animate-fade-in">
            <Badge className="mb-4">About Us</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Simplify Your <span className="text-gradient-primary">Social Media</span> Strategy
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              SocialFuse was created to solve the challenges of modern social media management. Our mission is to help businesses and creators thrive across all platforms without the complexity or time investment.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Whether you're a solo creator, small business, or enterprise marketing team, our intuitive platform streamlines your workflow and amplifies your social media impact.
            </p>
            <Button size="lg">Learn More</Button>
          </div>
        </div>

        {/* Stats section */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: "10K+", label: "Active Users" },
            { number: "50M+", label: "Posts Published" },
            { number: "4.9", label: "Average Rating" },
            { number: "24/7", label: "Customer Support" }
          ].map((stat, index) => (
            <div key={index} className="glass-card p-6 rounded-xl text-center animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <h3 className="text-3xl sm:text-4xl font-bold mb-2 text-gradient-primary">{stat.number}</h3>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
