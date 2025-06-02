
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, Search, ArrowLeft, Zap } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();
  const [glitchText, setGlitchText] = useState('404');
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    console.error(
      "🚨 404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    // Glitch effect for 404 text
    const glitchInterval = setInterval(() => {
      const glitchOptions = ['404', '4∅4', '4Ø4', '₄0₄', '404'];
      setGlitchText(glitchOptions[Math.floor(Math.random() * glitchOptions.length)]);
    }, 200);

    // Generate floating particles
    const particleArray = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 800),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 600),
    }));
    setParticles(particleArray);

    return () => clearInterval(glitchInterval);
  }, [location.pathname]);

  const suggestions = [
    { path: '/', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { path: '/about', label: 'About', icon: <Search className="w-4 h-4" /> },
    { path: '/services', label: 'Services', icon: <Zap className="w-4 h-4" /> },
    { path: '/contact', label: 'Contact', icon: <ArrowLeft className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Animated background particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute opacity-20 animate-bounce"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            animationDelay: `${particle.id * 0.1}s`,
            animationDuration: '3s',
          }}
        >
          💫
        </div>
      ))}

      <div className="text-center z-10 max-w-2xl mx-auto px-4">
        {/* Glitching 404 */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-black text-gradient mb-4">
            {glitchText}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#FF6B35] via-[#E91E63] to-[#9C27B0] mx-auto animate-pulse"></div>
        </div>

        {/* Error message */}
        <div className="glass p-8 rounded-3xl mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold text-gradient mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-xl text-foreground/70 mb-4">
            Looks like you've ventured into uncharted territory. 
            This page doesn't exist in our design universe.
          </p>
          <p className="text-sm text-foreground/50">
            Attempted route: <code className="bg-white/10 px-2 py-1 rounded">{location.pathname}</code>
          </p>
        </div>

        {/* Interactive suggestions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground/80 mb-4">
            Try these instead:
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {suggestions.map((suggestion, index) => (
              <Link
                key={suggestion.path}
                to={suggestion.path}
                className="group p-4 glass rounded-xl hover:bg-white/10 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-gradient mb-2 group-hover:scale-110 transition-transform duration-300">
                  {suggestion.icon}
                </div>
                <span className="text-sm font-medium">{suggestion.label}</span>
              </Link>
            ))}
          </div>

          {/* Fun interactive element */}
          <div className="glass p-6 rounded-2xl mb-6">
            <p className="text-sm text-foreground/60 mb-4">
              🎮 <strong>Easter Egg Activated!</strong> You found the creative 404 page!
            </p>
            <Link
              to="/test-404"
              className="px-4 py-2 text-xs bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500/30 transition-colors duration-300 mr-2"
            >
              Test 404 Page
            </Link>
            <button
              onClick={() => {
                if (typeof document !== 'undefined') {
                  document.body.classList.add('animate-pulse');
                  setTimeout(() => document.body.classList.remove('animate-pulse'), 1000);
                }
              }}
              className="px-4 py-2 text-xs bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/30 transition-colors duration-300"
            >
              Trigger Effect
            </button>
          </div>

          {/* Back to safety */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF6B35] via-[#E91E63] to-[#9C27B0] text-white font-semibold rounded-full hover:scale-105 transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            Take Me Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
