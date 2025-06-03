
import React, { useState, useEffect } from 'react';
import { Star, Heart, Zap, Crown, Gem, Gift, Sparkles } from 'lucide-react';

const FloatingElements = () => {
  const [elements, setElements] = useState<Array<{
    id: number;
    x: number;
    y: number;
    icon: React.ReactNode;
    color: string;
    speed: number;
    rotation: number;
  }>>([]);

  const icons = [
    { icon: <Star className="w-6 h-6" />, color: 'text-yellow-400' },
    { icon: <Heart className="w-6 h-6" />, color: 'text-pink-400' },
    { icon: <Zap className="w-6 h-6" />, color: 'text-blue-400' },
    { icon: <Crown className="w-6 h-6" />, color: 'text-purple-400' },
    { icon: <Gem className="w-6 h-6" />, color: 'text-cyan-400' },
    { icon: <Gift className="w-6 h-6" />, color: 'text-green-400' },
    { icon: <Sparkles className="w-6 h-6" />, color: 'text-orange-400' }
  ];

  useEffect(() => {
    const createElements = () => {
      const newElements = Array.from({ length: 15 }, (_, i) => {
        const iconData = icons[Math.floor(Math.random() * icons.length)];
        return {
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          icon: iconData.icon,
          color: iconData.color,
          speed: Math.random() * 2 + 1,
          rotation: 0
        };
      });
      setElements(newElements);
    };

    createElements();
    window.addEventListener('resize', createElements);
    return () => window.removeEventListener('resize', createElements);
  }, []);

  useEffect(() => {
    const animate = () => {
      setElements(prev => prev.map(element => ({
        ...element,
        y: element.y - element.speed,
        rotation: element.rotation + 2,
        // Reset position when element goes off screen
        ...(element.y < -50 ? {
          y: window.innerHeight + 50,
          x: Math.random() * window.innerWidth
        } : {})
      })));
    };

    const interval = setInterval(animate, 100);
    return () => clearInterval(interval);
  }, []);

  const handleElementClick = (id: number) => {
    // Play sound effect
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800 + Math.random() * 400, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
      console.log('Audio not supported');
    }

    // Remove clicked element and create particle effect
    setElements(prev => prev.filter(element => element.id !== id));
    
    // Add particle explosion effect
    console.log('✨ Metaverse element collected! +10 XP');
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {elements.map(element => (
        <div
          key={element.id}
          className={`absolute cursor-pointer pointer-events-auto hover:scale-125 transition-transform duration-200 ${element.color} opacity-60 hover:opacity-100`}
          style={{
            left: `${element.x}px`,
            top: `${element.y}px`,
            transform: `rotate(${element.rotation}deg)`,
            filter: 'drop-shadow(0 0 10px currentColor)'
          }}
          onClick={() => handleElementClick(element.id)}
          title="Click me for XP!"
        >
          {element.icon}
        </div>
      ))}
    </div>
  );
};

export default FloatingElements;
