import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User, Key, Camera, Loader2 } from "lucide-react";
import { authService } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [imageUploading, setImageUploading] = useState(false);
  const fileInputRef = useRef(null);
  
  // Use auth context to update the user globally
  const { updateUser } = useAuth();
  
  const [formData, setFormData] = useState({
    name: ''
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Load user data on component mount
  useEffect(() => {
    // Get user from localStorage
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
      setFormData({ name: userData.name });
    }
    
    // Then fetch fresh data from server
    fetchUserData();
  }, []);
  
  const fetchUserData = async () => {
    try {
      const response = await authService.getProfile();
      const userData = response.data;
      setUser(userData);
      setFormData({ name: userData.name });
      
      // Update localStorage with fresh data
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (err) {
      console.error("Error fetching user data:", err);
      // We don't set error here as we might still have data from localStorage
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await authService.updateProfile(formData);
      
      // Update local storage and auth context with new user data
      const updatedUser = response.data;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      updateUser(updatedUser);
      
      setSuccessMessage('Profile updated successfully!');
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
      
      // Clear error after 3 seconds
      setTimeout(() => {
        setError('');
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    // Reset states
    setPasswordError('');
    setPasswordSuccess('');
    
    // Form validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords don't match");
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters");
      return;
    }
    
    setPasswordLoading(true);
    
    try {
      await authService.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      
      setPasswordSuccess('Password changed successfully!');
      // Clear the form
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setPasswordSuccess('');
      }, 3000);
    } catch (err) {
      setPasswordError(err.response?.data?.message || 'Failed to change password. Please check your current password.');
      
      // Clear error after 3 seconds
      setTimeout(() => {
        setPasswordError('');
      }, 3000);
    } finally {
      setPasswordLoading(false);
    }
  };
  
  // Image upload handling
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type. Please upload a JPG, PNG, GIF, or WEBP image.');
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File too large. Maximum size is 5MB.');
      return;
    }
    
    setImageUploading(true);
    setError('');
    
    try {
      const formData = new FormData();
      formData.append('profileImage', file);
      
      const response = await authService.uploadProfileImage(formData);
      
      // Update user data with new profile image
      const updatedUser = response.data;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      updateUser(updatedUser);
      
      setSuccessMessage('Profile image updated successfully!');
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.message || 'Failed to upload profile image');
      
      setTimeout(() => {
        setError('');
      }, 3000);
    } finally {
      setImageUploading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-5rem)]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      
      {successMessage && (
        <Alert className="mb-6 bg-green-500/10 text-green-500 border-green-500/20">
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}
      
      {error && (
        <Alert className="mb-6 bg-destructive/10 text-destructive border-destructive/20">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <Card className="overflow-hidden">
        {/* Top section with profile picture */}
        <div className="flex justify-center p-8 bg-gradient-to-r from-primary/20 to-secondary/20">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
              {user?.profileImage ? (
                <AvatarImage 
                  src={user.profileImage} 
                  alt="Profile" 
                />
              ) : (
                <AvatarFallback className="bg-primary/10 text-primary">
                  <User className="h-12 w-12" />
                </AvatarFallback>
              )}
            </Avatar>
            
            {/* Image upload button */}
            <button 
              className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 shadow-md hover:bg-primary/90 transition-colors"
              onClick={handleImageClick}
              disabled={imageUploading}
              type="button"
              aria-label="Upload profile image"
            >
              {imageUploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Camera className="h-4 w-4" />
              )}
            </button>
            
            {/* Hidden file input */}
            <input 
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </div>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left section - Profile details */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Profile Details</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    className="bg-secondary/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    type="email" 
                    id="email" 
                    value={user.email} 
                    disabled 
                    className="bg-secondary/50 opacity-70"
                  />
                  <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></span>
                      Saving...
                    </span>
                  ) : 'Save Changes'}
                </Button>
              </form>
            </div>
            
            {/* Right section - Password change */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Key className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Change Password</h2>
              </div>
              
              {passwordSuccess && (
                <Alert className="bg-green-500/10 text-green-500 border-green-500/20">
                  <AlertDescription>{passwordSuccess}</AlertDescription>
                </Alert>
              )}
              
              {passwordError && (
                <Alert className="bg-destructive/10 text-destructive border-destructive/20">
                  <AlertDescription>{passwordError}</AlertDescription>
                </Alert>
              )}
              
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input 
                    type="password" 
                    id="currentPassword" 
                    name="currentPassword" 
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    required 
                    className="bg-secondary/50"
                    autoComplete="current-password"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input 
                    type="password" 
                    id="newPassword" 
                    name="newPassword" 
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    required 
                    className="bg-secondary/50"
                    autoComplete="new-password"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input 
                    type="password" 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    required 
                    className="bg-secondary/50"
                    autoComplete="new-password"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  variant="outline"
                  className="w-full"
                  disabled={passwordLoading}
                >
                  {passwordLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></span>
                      Changing Password...
                    </span>
                  ) : 'Change Password'}
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;