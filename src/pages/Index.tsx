import { Button } from '@/components/ui/button';
import { Sparkles, Star, Moon, Sun } from 'lucide-react';
import ZodiacSphere from '@/components/ZodiacSphere';
import { useNavigate } from "react-router-dom";
import { account } from "@/lib/appwrite";
import Footer from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();

  const handleBeginJourney = async () => {
    try {
      await account.get(); // ✅ Check if session exists
      navigate("/chat"); // If logged in → chat
    } catch {
      navigate("/auth"); // If not logged in → auth
    }
  };

  return (
    <div className="relative overflow-hidden flex flex-col min-h-screen">
      <div className="starfield" />

      {/* Main Content */}
      <main className="relative z-10 flex-1">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <h1 className="text-6xl font-bold mb-6">
                  <span className="gold-gradient bg-clip-text text-transparent">
                    AstroGuide
                  </span>
                </h1>
                <p className="text-xl mb-8 text-muted-foreground leading-relaxed">
                  Unlock the secrets of the cosmos with AI-powered Vedic astrology. 
                  Get personalized predictions and guidance based on your birth chart.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button 
                    size="lg" 
                    className="cosmic-glow animate-pulse-glow"
                    onClick={handleBeginJourney}
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Begin Your Journey
                  </Button>
                  
                </div>
                
                <div className="flex items-center justify-center lg:justify-start space-x-6 mt-8">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-primary" />
                    <span className="text-sm">Vedic Astrology</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Moon className="w-5 h-5 text-primary" />
                    <span className="text-sm">AI Powered</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sun className="w-5 h-5 text-primary" />
                    <span className="text-sm">Personalized</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="w-96 h-96 animate-float">
                  <ZodiacSphere />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                <span className="gold-gradient bg-clip-text text-transparent">
                  Cosmic Features
                </span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Discover the power of ancient wisdom combined with modern AI
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Sparkles className="w-8 h-8" />,
                  title: "Personalized Readings",
                  description: "Get detailed astrological insights based on your exact birth time and location"
                },
                {
                  icon: <Moon className="w-8 h-8" />,
                  title: "Continuous Chat",
                  description: "Engage in ongoing conversations with our AI astrologer for deeper guidance"
                },
                {
                  icon: <Star className="w-8 h-8" />,
                  title: "3D Visualization",
                  description: "Interactive cosmic sphere showing your zodiac signs and planetary positions"
                }
              ].map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full stellar-gradient flex items-center justify-center cosmic-glow">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ✅ Footer always at the bottom */}
      <Footer />
    </div>
  );
};


export default Index;
