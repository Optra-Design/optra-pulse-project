
import React, { useEffect, useState } from 'react';

const DynamicGradients = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsMoving(true);
      
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsMoving(false), 150);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  const gradientStyle = {
    background: `
      radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, 
        rgba(255, 107, 53, ${isMoving ? 0.3 : 0.15}) 0%, 
        rgba(233, 30, 99, ${isMoving ? 0.25 : 0.12}) 25%, 
        rgba(156, 39, 176, ${isMoving ? 0.2 : 0.08}) 50%, 
        rgba(63, 81, 181, ${isMoving ? 0.15 : 0.06}) 75%, 
        transparent 100%),
      radial-gradient(400px circle at ${mousePosition.x + 200}px ${mousePosition.y - 100}px,
        rgba(255, 193, 7, ${isMoving ? 0.2 : 0.08}) 0%,
        transparent 70%)
    `,
    transition: isMoving ? 'none' : 'background 0.8s ease-out',
  };

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-10"
      style={gradientStyle}
    />
  );
};

export default DynamicGradients;
