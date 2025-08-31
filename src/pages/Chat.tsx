import { useNavigate } from "react-router-dom";
import ChatInterface from '@/components/chat/ChatInterface';
import ZodiacSphere from '@/components/ZodiacSphere';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Chat() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="starfield" />
      
      <div className="relative z-10 h-screen flex">
        {/* Chat Section */}
        <div className="w-2/3 flex flex-col">
          <header className="p-6 border-b border-border flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold gold-gradient bg-clip-text text-transparent">
                AstroGuide
              </h1>
              <p className="text-muted-foreground">Your cosmic conversation continues</p>
            </div>

            {/* Back to Home Button */}
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center space-x-2"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Button>
          </header>
          
          <div className="flex-1">
            <ChatInterface />
          </div>
        </div>
        
        {/* 3D Visualization Section */}
        <div className="w-1/3 border-l border-border">
          <div className="h-full flex flex-col">
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-semibold">Cosmic Sphere</h2>
              <p className="text-sm text-muted-foreground">Interactive zodiac visualization</p>
            </div>
            
            <div className="flex-1 p-4">
              <div className="h-full rounded-2xl overflow-hidden stellar-gradient border border-border">
                <ZodiacSphere />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
