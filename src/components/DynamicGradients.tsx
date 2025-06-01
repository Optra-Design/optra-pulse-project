
import React, { useEffect, useState, useCallback } from 'react';

const DynamicGradients = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    setIsMoving(true);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const throttledMouseMove = (e: MouseEvent) => {
      handleMouseMove(e);
      clearTimeout(timeout);
      // Increased timeout for slower, more gradual dimming
      timeout = setTimeout(() => setIsMoving(false), 800);
    };

    window.addEventListener('mousemove', throttledMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', throttledMouseMove);
      clearTimeout(timeout);
    };
  }, [handleMouseMove]);

  const gradientStyle = {
    background: `
      radial-gradient(900px circle at ${mousePosition.x}px ${mousePosition.y}px, 
        rgba(255, 107, 53, ${isMoving ? 0.25 : 0.12}) 0%, 
        rgba(233, 30, 99, ${isMoving ? 0.2 : 0.1}) 25%, 
        rgba(156, 39, 176, ${isMoving ? 0.15 : 0.08}) 50%, 
        rgba(63, 81, 181, ${isMoving ? 0.12 : 0.06}) 75%, 
        transparent 100%),
      radial-gradient(500px circle at ${mousePosition.x + 300}px ${mousePosition.y - 150}px,
        rgba(255, 193, 7, ${isMoving ? 0.18 : 0.08}) 0%,
        rgba(76, 175, 80, ${isMoving ? 0.15 : 0.06}) 40%,
        transparent 80%),
      radial-gradient(700px circle at ${mousePosition.x - 200}px ${mousePosition.y + 100}px,
        rgba(3, 169, 244, ${isMoving ? 0.2 : 0.07}) 0%,
        rgba(139, 69, 19, ${isMoving ? 0.12 : 0.05}) 60%,
        transparent 90%),
      linear-gradient(135deg, 
        rgba(255, 107, 53, 0.04) 0%, 
        rgba(233, 30, 99, 0.06) 20%, 
        rgba(156, 39, 176, 0.05) 40%, 
        rgba(63, 81, 181, 0.04) 60%, 
        rgba(0, 150, 136, 0.03) 80%,
        rgba(255, 193, 7, 0.02) 100%)
    `,
    // Slower, smoother transition for more gradual dimming
    transition: isMoving ? 'none' : 'background 2.5s cubic-bezier(0.4, 0, 0.2, 1)',
    willChange: isMoving ? 'background' : 'auto',
  };

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-10"
      style={gradientStyle}
    />
  );
};

export default DynamicGradients;
