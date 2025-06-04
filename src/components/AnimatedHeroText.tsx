
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
      }, 400);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center space-y-10 max-w-6xl mx-auto relative z-10">
      <div className="space-y-6">
        <div className="text-6xl md:text-7xl lg:text-8xl font-light leading-none tracking-tight">
          <div className="relative inline-block">
            <span 
              className={`text-gradient-accent transition-all duration-500 ${
                isAnimating ? 'opacity-0 transform translate-y-3' : 'opacity-100 transform translate-y-0'
              }`}
            >
              {descriptors[currentWordIndex]}
            </span>
          </div>
          <br />
          <span className="text-white font-semibold">Design</span>
          <br />
          <span className="text-zinc-300 font-light">Solutions</span>
        </div>
      </div>
      
      <div className="space-y-8">
        <p className="text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto leading-relaxed font-light">
          Creating distinctive digital experiences and brand identities that drive measurable business growth through 
          <span className="accent-orange font-medium"> thoughtful design strategy</span>.
        </p>
        
        <div className="flex items-center justify-center gap-2 text-sm text-zinc-400">
          <span className="font-medium">Est. 2024</span>
          <div className="w-1.5 h-1.5 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full mx-3" />
          <span className="font-medium">Bangalore</span>
          <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mx-3" />
          <span className="font-medium">Independent Studio</span>
        </div>
      </div>
      
      <div className="pt-12">
        <Link 
          to="/contact"
          className="group inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 text-zinc-200 font-semibold rounded-xl transition-all duration-300 hover:border-zinc-600 hover:text-white hover:shadow-2xl hover:shadow-orange-500/20 hover-lift"
        >
          Let's work together
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  );
};

export default AnimatedHeroText;
