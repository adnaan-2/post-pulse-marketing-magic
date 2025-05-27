
import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

import { Upload, Plus, X, ImageIcon, Video, CheckCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

type MediaType = "image" | "video";

interface MediaFile {
  id: string;
  file: File;
  type: MediaType;
  preview: string;
}

const UploadMedia = () => {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [caption, setCaption] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const files = Array.from(e.target.files);
    const newMediaFiles: MediaFile[] = [];
    
    files.forEach(file => {
      // Check if file is an image or video
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");
      
      if (isImage || isVideo) {
        const id = `${Date.now()}-${file.name}`;
        const type: MediaType = isImage ? "image" : "video";
        const preview = URL.createObjectURL(file);
        
        newMediaFiles.push({
          id,
          file,
          type,
          preview
        });
      }
    });
    
    setMediaFiles([...mediaFiles, ...newMediaFiles]);
  };
  
  const removeMedia = (id: string) => {
    setMediaFiles(mediaFiles.filter(media => media.id !== id));
  };
  
  const togglePlatformSelection = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };
  
  const handleSubmit = () => {
    if (mediaFiles.length === 0) {
      toast({
        title: "No media selected",
        description: "Please upload at least one image or video.",
        variant: "destructive"
      });
      return;
    }
    
    if (selectedPlatforms.length === 0) {
      toast({
        title: "No platforms selected",
        description: "Please select at least one platform to post to.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Content prepared for upload!",
      description: `Content will be published to ${selectedPlatforms.join(", ")}.`,
    });
    
    // Reset form (in a real app, you'd likely upload the files to a server here)
    setMediaFiles([]);
    setCaption("");
    setSelectedPlatforms([]);
  };
  
  const platforms = [
    { id: "facebook", name: "Facebook", color: "#4267B2" },
    { id: "instagram", name: "Instagram", color: "#E1306C" },
    { id: "twitter", name: "Twitter", color: "#1DA1F2" },
    { id: "tiktok", name: "TikTok", color: "#000000" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Upload Media</h1>
        <p className="text-muted-foreground">
          Create and publish content across your social media platforms
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Media</CardTitle>
              <CardDescription>
                Upload images or videos to share on your social platforms
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div 
                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <Upload className="h-10 w-10 text-muted-foreground" />
                  <h3 className="font-medium">Drag & Drop or Click to Upload</h3>
                  <p className="text-xs text-muted-foreground">
                    Support for images (PNG, JPG) and videos (MP4) up to 100MB
                  </p>
                </div>
                <input 
                  type="file" 
                  id="file-upload" 
                  className="hidden" 
                  multiple 
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                />
              </div>
              
              {mediaFiles.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {mediaFiles.map(media => (
                    <div key={media.id} className="relative group">
                      <div className="aspect-square rounded-md overflow-hidden border bg-muted">
                        {media.type === "image" ? (
                          <img 
                            src={media.preview} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Video className="h-10 w-10 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <button
                        className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeMedia(media.id)}
                      >
                        <X className="h-4 w-4" />
                      </button>
                      <div className="mt-1 text-xs truncate">
                        {media.file.name}
                      </div>
                    </div>
                  ))}
                  <div 
                    className="border-2 border-dashed rounded-md flex items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors aspect-square"
                    onClick={() => document.getElementById("file-upload")?.click()}
                  >
                    <Plus className="h-6 w-6 text-muted-foreground" />
                  </div>
                </div>
              )}
              
              <Textarea
                placeholder="Write a caption for your post..."
                className="min-h-32"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Post Settings</CardTitle>
              <CardDescription>
                Configure additional settings for your post
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Schedule Post
                </label>
                <div className="flex gap-4">
                  <Select defaultValue="now">
                    <SelectTrigger>
                      <SelectValue placeholder="When to publish" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="now">Publish now</SelectItem>
                      <SelectItem value="schedule">Schedule for later</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Input type="datetime-local" className="w-auto" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Add Location
                </label>
                <Input placeholder="Add a location" />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Hashtags
                </label>
                <Input placeholder="Enter hashtags separated by spaces" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Select Platforms</CardTitle>
              <CardDescription>
                Choose where to publish your content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {platforms.map((platform) => (
                <div key={platform.id}>
                  <button
                    className={`flex items-center gap-3 w-full p-3 rounded-md transition-colors ${
                      selectedPlatforms.includes(platform.id) 
                        ? "bg-primary/10" 
                        : "hover:bg-muted"
                    }`}
                    onClick={() => togglePlatformSelection(platform.id)}
                  >
                    <div 
                      className="h-8 w-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${platform.color}20` }}
                    >
                      <span style={{ color: platform.color }} className="text-lg font-bold">
                        {platform.name[0]}
                      </span>
                    </div>
                    <span className="font-medium">{platform.name}</span>
                    {selectedPlatforms.includes(platform.id) && (
                      <CheckCircle className="ml-auto h-4 w-4 text-primary" />
                    )}
                  </button>
                  {platform.id !== platforms[platforms.length - 1].id && <Separator className="my-2" />}
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                disabled={mediaFiles.length === 0 || selectedPlatforms.length === 0}
                onClick={handleSubmit}
              >
                {selectedPlatforms.length === 0 
                  ? "Select Platforms to Post" 
                  : `Post to ${selectedPlatforms.length} Platform${selectedPlatforms.length > 1 ? "s" : ""}`}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UploadMedia;
