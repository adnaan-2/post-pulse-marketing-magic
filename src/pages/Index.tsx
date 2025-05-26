
import React, { useEffect } from "react";
import Header from "../components/landing/Header";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import {About,MarqueeDemo} from "../components/landing/About";
import Pricing from "../components/landing/Pricing";
import Footer from "../components/landing/Footer";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    toast({
      title: "Welcome to SocialFuse!",
      description: "Your all-in-one social media management platform",
      duration: 5000,
    });
  }, [toast]);
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <About />
      <MarqueeDemo />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Index;
