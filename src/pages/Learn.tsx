import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Moon, Sparkles, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Footer from "@/components/Footer";

export default function Learn() {
  const navigate = useNavigate();
  const [expandedSign, setExpandedSign] = useState<string | null>(null);

  const zodiacSigns = [
    { name: "Aries", dates: "Mar 21 – Apr 19", element: "Fire", traits: "Courageous, confident, energetic" },
    { name: "Taurus", dates: "Apr 20 – May 20", element: "Earth", traits: "Reliable, patient, practical" },
    { name: "Gemini", dates: "May 21 – Jun 20", element: "Air", traits: "Adaptable, curious, witty" },
    { name: "Cancer", dates: "Jun 21 – Jul 22", element: "Water", traits: "Emotional, caring, protective" },
    { name: "Leo", dates: "Jul 23 – Aug 22", element: "Fire", traits: "Generous, warm-hearted, leader" },
    { name: "Virgo", dates: "Aug 23 – Sep 22", element: "Earth", traits: "Analytical, hardworking, loyal" },
    { name: "Libra", dates: "Sep 23 – Oct 22", element: "Air", traits: "Diplomatic, fair-minded, charming" },
    { name: "Scorpio", dates: "Oct 23 – Nov 21", element: "Water", traits: "Passionate, resourceful, brave" },
    { name: "Sagittarius", dates: "Nov 22 – Dec 21", element: "Fire", traits: "Optimistic, adventurous, honest" },
    { name: "Capricorn", dates: "Dec 22 – Jan 19", element: "Earth", traits: "Disciplined, responsible, ambitious" },
    { name: "Aquarius", dates: "Jan 20 – Feb 18", element: "Air", traits: "Innovative, independent, humanitarian" },
    { name: "Pisces", dates: "Feb 19 – Mar 20", element: "Water", traits: "Compassionate, artistic, intuitive" },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated starfield background */}
      <div className="starfield" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-bold gold-gradient bg-clip-text text-transparent animate-pulse">
            About Astrology
          </h1>
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
        </div>

        {/* Astrology Intro */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-primary animate-spin-slow" />
            <span>What is Astrology?</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Astrology is the ancient study of how the positions and movements of celestial
            bodies—stars, planets, the Sun, and the Moon—affect human life and events.
            Vedic Astrology emphasizes birth charts and planetary alignments to reveal
            insights about personality, destiny, and life cycles.
          </p>
        </section>

        {/* Zodiac Signs */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 flex items-center space-x-2">
            <Star className="w-5 h-5 text-primary animate-bounce" />
            <span>The 12 Zodiac Signs</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {zodiacSigns.map((sign) => (
              <div
                key={sign.name}
                className="p-6 rounded-xl border border-border stellar-gradient hover:shadow-xl hover:scale-105 transition cursor-pointer"
                onClick={() => setExpandedSign(expandedSign === sign.name ? null : sign.name)}
              >
                <h3 className="text-xl font-semibold">{sign.name}</h3>
                <p className="text-sm text-muted-foreground">{sign.dates}</p>
                <p className="text-sm">Element: <span className="font-medium">{sign.element}</span></p>

                {expandedSign === sign.name && (
                  <div className="mt-3 p-3 rounded-lg bg-primary/10 text-sm">
                    <strong>Traits:</strong> {sign.traits}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Other Concepts */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center space-x-2">
            <Moon className="w-5 h-5 text-primary animate-ping" />
            <span>Other Astrological Concepts</span>
          </h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li><strong>Birth Chart (Kundli):</strong> Snapshot of the cosmos at your birth moment.</li>
            <li><strong>Planets (Grahas):</strong> Each planet influences love, career, wisdom.</li>
            <li><strong>Houses (Bhavas):</strong> Represent aspects of life from relationships to spirituality.</li>
            <li><strong>Transits:</strong> Planetary movements affecting life events.</li>
            <li><strong>Dasha System:</strong> Planetary time periods shaping life phases.</li>
          </ul>
        </section>
      </div>
            <Footer />
    </div>
  );
}
