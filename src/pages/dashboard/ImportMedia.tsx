import React, { useState, useEffect, useRef } from 'react';
import { FaCloudUploadAlt, FaTrashAlt, FaSpinner, FaExclamationTriangle, FaServer, FaImage } from 'react-icons/fa';
import { mediaService } from '@/services/api'; // Updated import
import { useToast } from "@/hooks/use-toast";

// Define Media type
interface Media {
  _id: string;
  url: string;
  originalname: string;
  createdAt: string;
  publicId?: string;
  mimetype?: string;
  size?: number;
}

const ImportMedia = () => {
  const [mediaFiles, setMediaFiles] = useState<Media[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [success, setSuccess] = useState('');
  const [connectionError, setConnectionError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    fetchMedia();
  }, []);
  
  const fetchMedia = async () => {
    setIsLoading(true);
    setError('');
    setConnectionError(false);
    
    try {
      const response = await mediaService.getAllMedia();
      setMediaFiles(response.data.media);
    } catch (err: any) {
      console.error('Error fetching media files:', err);
      if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
        setConnectionError(true);
      } else {
        setError('Failed to load media files. Please try again later.');
        toast({
          title: "Error",
          description: "Failed to load media files",
          variant: "destructive"
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleRetry = () => {
    fetchMedia();
  };
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    setError('');
    setSuccess('');
    setConnectionError(false);
    
    // For demo purposes - create fake Cloudinary URLs when API is unavailable
    if (connectionError) {
      setTimeout(() => {
        const fakeMediaFiles = files.map((file, index) => ({
          _id: `fake-${Date.now()}-${index}`,
          url: URL.createObjectURL(file),
          originalname: file.name,
          createdAt: new Date().toISOString()
        }));
        
        setMediaFiles(prev => [...fakeMediaFiles, ...prev]);
        setSuccess(`Successfully uploaded ${files.length} file${files.length > 1 ? 's' : ''} (Demo Mode)`);
        toast({
          title: "Success",
          description: `Successfully uploaded ${files.length} file${files.length > 1 ? 's' : ''} (Demo Mode)`,
        });
        setIsUploading(false);
        if (e.target) e.target.value = '';
      }, 2000);
      return;
    }
    
    // Create FormData for upload
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('media', file);
    });
    
    try {
      // Upload with progress tracking
      const response = await mediaService.uploadMedia(formData, (progressEvent: any) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(percentCompleted);
      });
      
      setSuccess(`Successfully uploaded ${files.length} file${files.length > 1 ? 's' : ''}`);
      toast({
        title: "Success",
        description: `Successfully uploaded ${files.length} file${files.length > 1 ? 's' : ''}`,
      });
      
      // Add the newly uploaded media to the state
      if (response.data.media) {
        setMediaFiles(prevFiles => [...response.data.media, ...prevFiles]);
      } else {
        // Refresh the whole list
        fetchMedia();
      }
      
      if (e.target) e.target.value = ''; // Clear the file input
    } catch (err: any) {
      console.error('Error uploading media:', err);
      if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
        setConnectionError(true);
      } else {
        const errorMsg = err.response?.data?.message || 'Failed to upload media. Please try again.';
        setError(errorMsg);
        toast({
          title: "Upload failed",
          description: errorMsg,
          variant: "destructive"
        });
      }
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleDelete = async (mediaId: string) => {
    if (!window.confirm('Are you sure you want to delete this media? This action cannot be undone.')) {
      return;
    }
    
    setError('');
    setSuccess('');
    
    // For demo mode when API is unavailable
    if (connectionError || mediaId.startsWith('fake-')) {
      setMediaFiles(prevFiles => prevFiles.filter(file => file._id !== mediaId));
      setSuccess('Media deleted successfully (Demo Mode)');
      toast({
        title: "Deleted",
        description: "Media deleted successfully (Demo Mode)",
      });
      return;
    }
    
    try {
      await mediaService.deleteMedia(mediaId);
      setSuccess('Media deleted successfully');
      toast({
        title: "Deleted",
        description: "Media deleted successfully",
      });
      setMediaFiles(prevFiles => prevFiles.filter(file => file._id !== mediaId));
    } catch (err: any) {
      console.error('Error deleting media:', err);
      const errorMsg = err.response?.data?.message || 'Failed to delete media. Please try again.';
      setError(errorMsg);
      toast({
        title: "Error",
        description: errorMsg,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto py-6 animate-fade-in">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Media Library</h1>
        </div>
        
        {success && (
          <div className="bg-green-500/10 text-green-500 p-4 rounded-lg border border-green-500/20">
            {success}
          </div>
        )}
        
        {error && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg border border-destructive/20">
            {error}
          </div>
        )}
        
        {connectionError && (
          <div className="bg-amber-500/10 text-amber-500 p-4 rounded-lg border border-amber-500/20 flex gap-4">
            <FaServer className="text-3xl" />
            <div>
              <h3 className="font-semibold text-lg">Server Connection Error</h3>
              <p>Cannot connect to the media server. Working in demo mode with limited functionality.</p>
              <button 
                className="mt-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-600 px-4 py-2 rounded-md transition-colors"
                onClick={handleRetry}
              >
                Try Again
              </button>
            </div>
          </div>
        )}
        
        <div className="bg-card border rounded-lg p-6 shadow-sm">
          <div className="text-center">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden"
              accept="image/*"
              multiple
            />
            
            <button 
              className={`px-6 py-4 rounded-lg flex items-center justify-center gap-2 w-full md:w-auto mx-auto font-medium text-lg ${
                isUploading 
                  ? 'bg-primary/50 cursor-not-allowed'
                  : 'bg-primary hover:bg-primary/90'
              } text-primary-foreground transition-all`}
              onClick={handleUploadClick}
              disabled={isUploading}
            >
              {isUploading ? (
                <span className="flex items-center gap-2">
                  <FaSpinner className="animate-spin" /> 
                  Uploading... {uploadProgress}%
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <FaCloudUploadAlt className="text-xl" /> Upload Media
                </span>
              )}
            </button>
            
            {isUploading && (
              <div className="w-full bg-secondary/50 rounded-full h-2 mt-4 overflow-hidden">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-card border rounded-lg p-6 shadow-sm">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <FaSpinner className="animate-spin text-4xl text-primary mb-4" />
              <p className="text-muted-foreground">Loading your media files...</p>
            </div>
          ) : mediaFiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <FaExclamationTriangle className="text-4xl text-amber-500 mb-4" />
              <p className="text-muted-foreground">Your media library is empty. Upload some files to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {mediaFiles.map(file => (
                <div className="border rounded-lg overflow-hidden bg-card" key={file._id}>
                  <div className="relative aspect-square bg-muted">
                    <img 
                      src={file.url} 
                      alt={file.originalname || 'Media file'}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder-image.png";
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        className="bg-destructive text-destructive-foreground p-2 rounded-full hover:bg-destructive/90 transition-colors"
                        onClick={() => handleDelete(file._id)}
                        aria-label="Delete media"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="font-medium truncate" title={file.originalname}>
                      {file.originalname || 'Untitled'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(file.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImportMedia;