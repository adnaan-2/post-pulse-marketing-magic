import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";

const Subscription = () => {
  const [currentPlan, setCurrentPlan] = useState("basic");
  
  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: "$9.99",
      interval: "month",
      description: "Perfect for individuals and small projects",
      features: [
        "5 social media accounts",
        "50 scheduled posts per month",
        "Basic analytics",
        "Standard support"
      ],
      isPopular: false
    },
    {
      id: "pro",
      name: "Professional",
      price: "$19.99",
      interval: "month",
      description: "Ideal for growing businesses",
      features: [
        "15 social media accounts",
        "Unlimited scheduled posts",
        "Advanced analytics",
        "Priority support",
        "Content calendar",
        "Team collaboration (up to 3 members)"
      ],
      isPopular: true
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "$49.99",
      interval: "month",
      description: "For large teams and organizations",
      features: [
        "Unlimited social media accounts",
        "Unlimited scheduled posts",
        "Custom analytics reports",
        "24/7 premium support",
        "Content calendar and planning",
        "Unlimited team members",
        "White labeling",
        "API access"
      ],
      isPopular: false
    }
  ];

  return (
    <div className="container mx-auto py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Subscription Plans</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className={`relative ${
            plan.isPopular ? "border-primary shadow-lg" : ""
          }`}>
            {plan.isPopular && (
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <Badge className="bg-primary text-primary-foreground">
                  <Star className="h-3 w-3 mr-1" fill="currentColor" />
                  Popular
                </Badge>
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">/{plan.interval}</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {currentPlan === plan.id ? (
                <Button variant="outline" className="w-full">Current Plan</Button>
              ) : (
                <Button className={`w-full ${plan.isPopular ? "bg-primary" : ""}`}>
                  {currentPlan ? "Switch Plan" : "Subscribe"}
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Billing Information</CardTitle>
            <CardDescription>Manage your payment methods and billing history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Current Plan</h3>
                <p className="text-sm text-muted-foreground">You are currently on the {plans.find(p => p.id === currentPlan)?.name} plan.</p>
              </div>
              
              <div>
                <h3 className="font-medium">Payment Method</h3>
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-8 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <p>•••• •••• •••• 4242</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium">Billing History</h3>
                <div className="mt-2 border rounded-md overflow-hidden">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-secondary/50">
                        <th className="px-4 py-2 text-left text-sm font-medium">Date</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Amount</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="px-4 py-2 text-sm">May 1, 2023</td>
                        <td className="px-4 py-2 text-sm">{plans.find(p => p.id === currentPlan)?.price}</td>
                        <td className="px-4 py-2 text-sm">
                          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                            Paid
                          </Badge>
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-4 py-2 text-sm">Apr 1, 2023</td>
                        <td className="px-4 py-2 text-sm">{plans.find(p => p.id === currentPlan)?.price}</td>
                        <td className="px-4 py-2 text-sm">
                          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                            Paid
                          </Badge>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <Button variant="outline" className="flex-1">
                Update Payment Method
              </Button>
              <Button variant="destructive" className="flex-1">
                Cancel Subscription
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Subscription;