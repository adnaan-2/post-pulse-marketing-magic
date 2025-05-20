
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold">SocialFuse</Link>
          <nav className="hidden md:block ml-10">
            <ul className="flex space-x-8">
              <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#pricing" className="hover:text-primary transition-colors">Pricing</a></li>
            </ul>
          </nav>
        </div>

        <div className="hidden md:flex items-center space-x-3">
          <Button variant="ghost" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/signup">Start Free</Link>
          </Button>
        </div>

        <button 
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile menu */}
      <div 
        className={`fixed inset-0 bg-background z-40 transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        } md:hidden`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <a href="#features" className="text-xl" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
          <a href="#about" className="text-xl" onClick={() => setIsMobileMenuOpen(false)}>About</a>
          <a href="#pricing" className="text-xl" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
          <div className="flex flex-col space-y-3 mt-4">
            <Button variant="ghost" asChild>
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
            </Button>
            <Button asChild>
              <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>Start Free</Link>
            </Button>
          </div>
          <button 
            className="absolute top-6 right-6 flex items-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={24} /> <span className="ml-1">Close</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
