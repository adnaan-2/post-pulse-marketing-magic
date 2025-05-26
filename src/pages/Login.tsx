<<<<<<< HEAD
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
=======

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
>>>>>>> 70f60395989c162ae0b54d6224742801a2693e16
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EyeIcon, EyeOffIcon, LogInIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
<<<<<<< HEAD
import { authService } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Check for success message from signup
  const message = location.state?.message;
  
  if (message) {
    // Show success toast if redirected from signup
    toast({
      title: "Success",
      description: message,
    });
    // Clear the message after showing it
    window.history.replaceState({}, document.title);
  }
=======

// Note: In a real implementation, you'd use your API utility
// This is a placeholder until the backend is connected
const mockLogin = async (credentials: { email: string; password: string }) => {
  // This would be replaced with actual API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // For demo purposes - in real app this would check with backend
      if (credentials.email && credentials.password) {
        resolve({
          data: {
            success: true,
            token: "sample-token-12345",
            user: { id: 1, email: credentials.email, name: "User" }
          }
        });
      } else {
        reject({ response: { data: { message: "Invalid credentials" } } });
      }
    }, 800);
  });
};

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Set success message from location state if it exists
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      toast({
        title: "Success",
        description: location.state.message,
        duration: 5000,
      });
      // Clear the message after toast is shown
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [location.state, toast]);
>>>>>>> 70f60395989c162ae0b54d6224742801a2693e16

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
<<<<<<< HEAD

    try {
      const response = await authService.login(formData);
      
      // Use the auth context to store user data
      login(response.data.token, response.data.user);
      
      toast({
        title: "Login successful!",
        description: "Welcome back!",
      });
      
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Login failed. Please check your credentials.";
      
=======
    setError("");

    try {
      // In real implementation, replace with your actual API call
      const response: any = await mockLogin(formData);
      
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        toast({
          title: "Login successful!",
          description: "Welcome back to SocialFuse",
        });
        
        // Navigate to dashboard or previous attempted page
        const from = location.state?.from?.pathname || "/dashboard";
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Invalid credentials";
      setError(errorMessage);
>>>>>>> 70f60395989c162ae0b54d6224742801a2693e16
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
<<<<<<< HEAD
=======
      setFormData({ ...formData, password: "" });
>>>>>>> 70f60395989c162ae0b54d6224742801a2693e16
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
=======
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

>>>>>>> 70f60395989c162ae0b54d6224742801a2693e16
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md animate-fade-in">
        <Card className="glass-card border-primary/10">
          <CardHeader className="space-y-1">
            <CardTitle className="text-center text-2xl font-bold">
<<<<<<< HEAD
              Welcome Back
            </CardTitle>
            <CardDescription className="text-center">
              Sign in to <span className="text-gradient-primary font-semibold">SocialFuse</span> to manage your accounts
=======
              Sign In to <span className="text-gradient-primary">SocialFuse</span>
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
>>>>>>> 70f60395989c162ae0b54d6224742801a2693e16
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-secondary/50"
                />
              </div>
<<<<<<< HEAD
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                    Forgot Password?
=======
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
>>>>>>> 70f60395989c162ae0b54d6224742801a2693e16
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="pr-10 bg-secondary/50"
                  />
                  <button
                    type="button"
<<<<<<< HEAD
                    onClick={() => setShowPassword(!showPassword)}
=======
                    onClick={togglePasswordVisibility}
>>>>>>> 70f60395989c162ae0b54d6224742801a2693e16
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                  </button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></span>
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <LogInIcon size={16} />
                    Sign In
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="mt-2 text-center text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
