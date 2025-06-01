
import React, { useState, useEffect } from 'react';

const AnimatedHeroText = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const motionVerbs = ['Shape', 'Flow', 'Pulse', 'Rise', 'Form', 'Flex'];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % motionVerbs.length);
        setIsAnimating(false);
      }, 300);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center space-y-4">
      <div className="text-6xl md:text-8xl lg:text-9xl font-black leading-none">
        <div className="relative inline-block">
          <span 
            className={`text-gradient transition-all duration-300 ${
              isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
            }`}
          >
            {motionVerbs[currentWordIndex]}.
          </span>
        </div>
        <br />
        <span className="text-gradient">Style.</span>
        <br />
        <span className="text-gradient">Scale.</span>
      </div>
      
      <p className="text-xl md:text-2xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
        Hyper-premium digital design and branding that shapes experiences, 
        styles interactions, and scales ambitions.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
        <button className="group relative px-8 py-4 bg-optra-gradient text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 glow-hover">
          <span className="relative z-10">Start Your Project</span>
          <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </button>
        
        <button className="px-8 py-4 border border-white/20 text-foreground font-semibold rounded-full hover:bg-white/5 transition-all duration-300 hover:border-white/40">
          View Our Work
        </button>
      </div>
    </div>
  );
};

export default AnimatedHeroText;
