import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Check if we're in the dashboard route
  const isDashboard = location.pathname.includes('/dashboard');
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Don't show the header in dashboard routes
  if (isDashboard) return null;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold">SocialFuse</Link>
            <nav className="hidden md:block ml-10">
              <ul className="flex space-x-8">
                <li><Link to="/#features" className="hover:text-primary transition-colors">Features</Link></li>
                <li><Link to="/#pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </nav>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
          
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t py-4 px-4">
          <nav className="flex flex-col space-y-4">
            <Link to="/#features" className="hover:text-primary transition-colors py-2" onClick={toggleMenu}>Features</Link>
            <Link to="/#pricing" className="hover:text-primary transition-colors py-2" onClick={toggleMenu}>Pricing</Link>
            <Link to="/about" className="hover:text-primary transition-colors py-2" onClick={toggleMenu}>About</Link>
            <Link to="/contact" className="hover:text-primary transition-colors py-2" onClick={toggleMenu}>Contact</Link>
            <hr className="border-muted" />
            <Link to="/login" onClick={toggleMenu}>
              <Button variant="ghost" className="w-full justify-start">Log In</Button>
            </Link>
            <Link to="/signup" onClick={toggleMenu}>
              <Button className="w-full">Sign Up</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
