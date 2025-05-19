
import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PricingCard = ({ 
  title, 
  price, 
  description, 
  features, 
  isPopular = false,
  isBilledAnnually = false
}: { 
  title: string;
  price: { monthly: string; annual: string };
  description: string;
  features: string[];
  isPopular?: boolean;
  isBilledAnnually: boolean;
}) => (
  <div className={`
    glass-card rounded-xl p-6 border 
    ${isPopular 
      ? 'border-brand-purple relative md:scale-105 z-10' 
      : 'border-white/10'}
  `}>
    {isPopular && (
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-purple text-white text-xs px-3 py-1 rounded-full">
        Most Popular
      </span>
    )}
    <div className="text-center mb-6">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <div className="mb-2">
        <span className="text-3xl font-bold">{isBilledAnnually ? price.annual : price.monthly}</span>
        <span className="text-muted-foreground">/{isBilledAnnually ? 'year' : 'month'}</span>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
    
    <div className="space-y-3 mb-6">
      {features.map((feature, i) => (
        <div key={i} className="flex items-start">
          <div className="mt-1 mr-3 flex-shrink-0">
            <Check className={`h-4 w-4 ${isPopular ? 'text-brand-purple' : 'text-brand-blue'}`} />
          </div>
          <p className="text-sm">{feature}</p>
        </div>
      ))}
    </div>
    
    <Button 
      className={`w-full ${isPopular ? 'bg-brand-purple hover:bg-brand-purple/90' : ''}`}
      variant={isPopular ? 'default' : 'outline'}
    >
      Get Started
    </Button>
  </div>
);

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');

  return (
    <section id="pricing" className="section-padding">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge className="mb-4">Pricing</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Choose the Right <span className="text-gradient-primary">Plan</span> for You
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Whether you're just starting out or managing multiple clients, we have a plan that fits your needs.
          </p>

          <div className="flex items-center justify-center space-x-4 mb-12">
            <button
              className={`px-4 py-2 rounded-lg ${billingCycle === 'monthly' ? 'bg-primary text-white' : 'bg-secondary'}`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${billingCycle === 'annually' ? 'bg-primary text-white' : 'bg-secondary'}`}
              onClick={() => setBillingCycle('annually')}
            >
              Annually <span className="text-xs opacity-80">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-4">
          <PricingCard
            title="Starter"
            price={{ monthly: "$29", annual: "$279" }}
            description="Perfect for individuals and creators"
            features={[
              "Connect 5 social accounts",
              "30 scheduled posts per month",
              "Basic analytics",
              "Content calendar",
              "Mobile app access"
            ]}
            isBilledAnnually={billingCycle === 'annually'}
          />
          
          <PricingCard
            title="Professional"
            price={{ monthly: "$79", annual: "$759" }}
            description="Ideal for growing businesses"
            features={[
              "Connect 15 social accounts",
              "Unlimited scheduled posts",
              "Advanced analytics & reports",
              "AI content suggestions",
              "Hashtag recommendations",
              "Priority support"
            ]}
            isPopular={true}
            isBilledAnnually={billingCycle === 'annually'}
          />
          
          <PricingCard
            title="Enterprise"
            price={{ monthly: "$199", annual: "$1,899" }}
            description="For agencies and large teams"
            features={[
              "Unlimited social accounts",
              "Unlimited scheduled posts",
              "Premium analytics & reports",
              "Advanced AI content creation",
              "Custom branded reports",
              "Dedicated account manager",
              "API access"
            ]}
            isBilledAnnually={billingCycle === 'annually'}
          />
        </div>

        <div className="mt-12 text-center glass-card p-8 rounded-xl max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Need a custom plan?</h3>
          <p className="text-muted-foreground mb-6">
            Contact our team for a tailored solution that fits your specific requirements.
          </p>
          <Button variant="outline" size="lg">Contact Sales</Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
