
import React, { useEffect, useState } from 'react';

const BackgroundParticles = () => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    emoji: string;
    size: number;
    speed: number;
    mouseInfluence: number;
  }>>([]);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mix of conventional emojis (more common) and line art emojis (rarer)
  const conventionalEmojis = ['✨', '🎨', '💫', '🌟', '⭐', '🔥', '💎', '🚀', '⚡', '💝', '🎉', '🌈', '💖', '🎯', '🎪', '🎭', '🎨', '🎵', '🎸', '🍕', '🍰', '☕', '🎮'];
  const lineArtEmojis = ['☾', '☽', '◐', '◑', '◒', '◓', '△', '▽', '◯', '◊', '※', '⟡', '⬟', '⬢', '⬡'];

  useEffect(() => {
    const createEmoji = (id: number) => {
      // 80% chance for conventional emoji, 20% for line art
      const useConventional = Math.random() < 0.8;
      const emojiArray = useConventional ? conventionalEmojis : lineArtEmojis;
      
      return {
        id,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        emoji: emojiArray[Math.floor(Math.random() * emojiArray.length)],
        size: Math.random() * 15 + 12,
        speed: Math.random() * 1.5 + 0.8,
        mouseInfluence: Math.random() * 0.5 + 0.3,
      };
    };

    const initialParticles = Array.from({ length: 18 }, (_, i) => createEmoji(i));
    setParticles(initialParticles);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => {
        const distanceFromMouse = Math.sqrt(
          Math.pow(particle.x - mousePosition.x, 2) + 
          Math.pow(particle.y - mousePosition.y, 2)
        );
        
        // More responsive mouse influence
        const maxInfluenceDistance = 200;
        const influence = Math.max(0, maxInfluenceDistance - distanceFromMouse) / maxInfluenceDistance;
        const mouseEffect = influence * particle.mouseInfluence * 25;
        
        // Calculate direction away from mouse
        const dx = particle.x - mousePosition.x;
        const dy = particle.y - mousePosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        let newX = particle.x;
        let newY = particle.y;
        
        if (distance > 0 && influence > 0) {
          // Move away from mouse
          newX += (dx / distance) * mouseEffect * 0.3;
          newY += (dy / distance) * mouseEffect * 0.3;
        }
        
        // Normal movement
        newX += particle.speed;
        newY += Math.sin(Date.now() * 0.001 + particle.id) * 0.8;
        
        // Wrap around screen
        if (newX > window.innerWidth + 50) newX = -50;
        if (newY > window.innerHeight + 50) newY = -50;
        if (newY < -50) newY = window.innerHeight + 50;
        
        return {
          ...particle,
          x: newX,
          y: newY,
        };
      }));
    }, 30); // Faster update for more responsive movement

    return () => clearInterval(interval);
  }, [mousePosition]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute particle opacity-25 hover:opacity-50 transition-opacity duration-300"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            fontSize: `${particle.size}px`,
            animationDelay: `${particle.id * 0.3}s`,
            filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.1))',
          }}
        >
          {particle.emoji}
        </div>
      ))}
    </div>
  );
};

export default BackgroundParticles;
