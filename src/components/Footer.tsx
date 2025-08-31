import { Sparkles, Star, Moon, Sun, Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-border bg-background/80 backdrop-blur relative z-10">
      <div className="container mx-auto px-6 py-12 grid md:grid-cols-4 gap-12">
        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold gold-gradient bg-clip-text text-transparent mb-4">
            AstroGuide
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Unlock the secrets of the cosmos with AI-powered Vedic astrology.
            Your personalized guide for clarity, growth, and cosmic wisdom.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <button
                onClick={() => navigate("/")}
                className="hover:text-primary transition"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/learn")}
                className="hover:text-primary transition"
              >
                Learn More
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/chat")}
                className="hover:text-primary transition"
              >
                Chat
              </button>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-primary" />
              <a
                href="mailto:modamorphtech@gmail.com"
                className="hover:text-primary transition"
              >
                modamorphtech@gmail.com
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-primary" />
              <a
                href="tel:9934550016"
                className="hover:text-primary transition"
              >
                +91 99345 50016
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Subscribe to get cosmic insights and astrology updates.
          </p>
          <form
            className="flex space-x-2"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Subscribed successfully! 🌟");
            }}
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        <div className="flex justify-center space-x-4 mb-2">
          <Sparkles className="w-4 h-4" />
          <Star className="w-4 h-4" />
          <Moon className="w-4 h-4" />
          <Sun className="w-4 h-4" />
        </div>
        <p>© {new Date().getFullYear()} AstroGuide. All rights reserved.</p>
        <p className="mt-1 text-[11px]">
          Powered by <span className="font-semibold text-primary">Modamorph</span>
        </p>
      </div>
    </footer>
  );
}
