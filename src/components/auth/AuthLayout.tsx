import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="starfield" />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 gold-gradient bg-clip-text text-transparent">
              AstroGuide
            </h1>
            <div className="w-16 h-1 gold-gradient mx-auto mb-4 rounded-full" />
            <h2 className="text-2xl font-semibold mb-2">{title}</h2>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>
          
          <div className="stellar-gradient p-8 rounded-2xl border border-border cosmic-glow">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}