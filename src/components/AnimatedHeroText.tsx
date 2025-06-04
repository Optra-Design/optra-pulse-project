
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const AnimatedHeroText = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const descriptors = ['Strategic', 'Purposeful', 'Thoughtful', 'Precise', 'Intentional'];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % descriptors.length);
        setIsAnimating(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center space-y-8 max-w-5xl mx-auto relative z-10">
      <div className="space-y-4">
        <div className="text-6xl md:text-7xl lg:text-8xl font-light leading-none tracking-tight">
          <div className="relative inline-block">
            <span 
              className={`text-white transition-all duration-500 ${
                isAnimating ? 'opacity-0 transform translate-y-2' : 'opacity-100 transform translate-y-0'
              }`}
            >
              {descriptors[currentWordIndex]}
            </span>
          </div>
          <br />
          <span className="text-white font-medium">Design</span>
          <br />
          <span className="text-zinc-400 font-light">Solutions</span>
        </div>
      </div>
      
      <div className="space-y-6">
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
          Creating distinctive digital experiences and brand identities that drive measurable business growth through thoughtful design strategy.
        </p>
        
        <div className="flex items-center justify-center gap-1 text-sm text-zinc-500">
          <span>Est. 2024</span>
          <span className="w-1 h-1 bg-zinc-600 rounded-full mx-2" />
          <span>Bangalore</span>
          <span className="w-1 h-1 bg-zinc-600 rounded-full mx-2" />
          <span>Independent Studio</span>
        </div>
      </div>
      
      <div className="pt-8">
        <Link 
          to="/contact"
          className="group inline-flex items-center gap-3 px-6 py-3 bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium rounded-lg transition-all duration-200 hover:border-zinc-700 hover:text-white hover:bg-zinc-800"
        >
          Let's work together
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </div>
  );
};

export default AnimatedHeroText;
