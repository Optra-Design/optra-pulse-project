
import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { Beaker, Zap, Palette, Code, Sparkles, Waves, Grid3X3, Triangle } from 'lucide-react';

const Lab = () => {
  const [activeExperiment, setActiveExperiment] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const experiments = [
    {
      title: "Color Harmonics",
      description: "Experimental color theory applications",
      component: <ColorHarmonics />
    },
    {
      title: "Motion Studies",
      description: "Fluid animation explorations",
      component: <MotionStudies />
    },
    {
      title: "Typography Lab",
      description: "Dynamic text transformations",
      component: <TypographyLab />
    },
    {
      title: "Interactive Particles",
      description: "Physics-based particle systems",
      component: <InteractiveParticles mousePosition={mousePosition} />
    },
    {
      title: "Wave Generator",
      description: "Audio-visual wave patterns",
      component: <WaveGenerator />
    },
    {
      title: "Grid Morphing",
      description: "Dynamic grid transformations",
      component: <GridMorphing />
    },
    {
      title: "3D Geometry",
      description: "Interactive 3D shape experiments",
      component: <GeometryLab />
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Beaker className="w-12 h-12 text-gradient animate-bounce-subtle" />
              <h1 className="text-5xl md:text-7xl font-bold text-gradient">
                Design Lab
              </h1>
            </div>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              🧪 Experimental design concepts and interactive explorations. 
              A playground for creative innovation and technical artistry.
            </p>
            <div className="mt-4 text-sm text-foreground/50">
              <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full">
                ⚠️ Experimental Features
              </span>
            </div>
          </div>

          {/* Experiment Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {experiments.map((experiment, index) => (
              <button
                key={index}
                onClick={() => setActiveExperiment(index)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeExperiment === index
                    ? 'bg-optra-gradient text-white scale-105 shadow-lg'
                    : 'bg-white/10 text-foreground/70 hover:bg-white/20 hover:scale-105'
                }`}
              >
                {experiment.title}
              </button>
            ))}
          </div>

          {/* Active Experiment */}
          <div className="glass p-8 rounded-3xl mb-8 min-h-[500px]">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gradient mb-2">
                {experiments[activeExperiment].title}
              </h2>
              <p className="text-foreground/70">
                {experiments[activeExperiment].description}
              </p>
            </div>
            
            <div className="flex items-center justify-center h-96">
              {experiments[activeExperiment].component}
            </div>
          </div>

          {/* Lab Info */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass p-6 rounded-2xl text-center hover:scale-105 transition-transform">
              <Code className="w-8 h-8 text-gradient mx-auto mb-3" />
              <h3 className="font-bold text-gradient mb-2">Open Source</h3>
              <p className="text-sm text-foreground/70">
                All experiments are built with modern web technologies
              </p>
            </div>
            
            <div className="glass p-6 rounded-2xl text-center hover:scale-105 transition-transform">
              <Zap className="w-8 h-8 text-gradient mx-auto mb-3" />
              <h3 className="font-bold text-gradient mb-2">Real-time</h3>
              <p className="text-sm text-foreground/70">
                Interactive experiences that respond to user input
              </p>
            </div>
            
            <div className="glass p-6 rounded-2xl text-center hover:scale-105 transition-transform">
              <Sparkles className="w-8 h-8 text-gradient mx-auto mb-3" />
              <h3 className="font-bold text-gradient mb-2">Innovative</h3>
              <p className="text-sm text-foreground/70">
                Pushing boundaries of digital design possibilities
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Experiment Components
const ColorHarmonics = () => {
  const [hue, setHue] = useState(0);
  const [pattern, setPattern] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHue(prev => (prev + 1) % 360);
      setPattern(prev => (prev + 0.5) % 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="grid grid-cols-5 gap-4">
        {Array.from({ length: 25 }, (_, i) => (
          <div
            key={i}
            className="w-12 h-12 rounded-lg transition-all duration-1000 hover:scale-110 cursor-pointer"
            style={{
              backgroundColor: `hsl(${(hue + i * 15) % 360}, ${70 + Math.sin(pattern + i) * 20}%, ${60 + Math.cos(pattern + i) * 10}%)`,
              transform: `rotate(${hue + i * 5}deg) scale(${1 + Math.sin(pattern + i) * 0.1})`
            }}
          />
        ))}
      </div>
    </div>
  );
};

const MotionStudies = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 0.1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className="absolute border-2 border-gradient rounded-full"
          style={{
            width: `${80 + i * 40}px`,
            height: `${80 + i * 40}px`,
            transform: `rotate(${time * (i + 1) * 10}deg) scale(${1 + Math.sin(time + i) * 0.2})`,
            opacity: 0.7 - i * 0.1,
            borderColor: `hsl(${(time * 50 + i * 60) % 360}, 70%, 60%)`
          }}
        />
      ))}
      <div className="w-8 h-8 bg-optra-gradient rounded-full animate-bounce-subtle" />
    </div>
  );
};

const TypographyLab = () => {
  const [currentText, setCurrentText] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const texts = ['OPTRA', 'DESIGN', 'LAB', 'EXPERIMENT', 'CREATE', 'INNOVATE'];

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => {
        setCurrentText(prev => (prev + 1) % texts.length);
        setGlitch(false);
      }, 200);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div 
        className={`text-6xl font-black text-gradient transition-all duration-200 ${
          glitch ? 'animate-pulse filter blur-sm' : ''
        }`}
        style={{
          textShadow: glitch ? '2px 2px 0px #ff0000, -2px -2px 0px #00ff00' : 'none'
        }}
      >
        {texts[currentText]}
      </div>
    </div>
  );
};

const InteractiveParticles = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number; size: number }>>([]);

  useEffect(() => {
    const initialParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 400,
      y: Math.random() * 300,
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3,
      size: Math.random() * 8 + 4,
    }));
    setParticles(initialParticles);
  }, []);

  useEffect(() => {
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => {
        const dx = mousePosition.x - (particle.x + 200);
        const dy = mousePosition.y - (particle.y + 200);
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        let newVx = particle.vx;
        let newVy = particle.vy;
        
        if (distance < 150) {
          const force = (150 - distance) / 150 * 0.002;
          newVx += dx * force;
          newVy += dy * force;
        }
        
        return {
          ...particle,
          x: (particle.x + newVx + 400) % 400,
          y: (particle.y + newVy + 300) % 300,
          vx: newVx * 0.99,
          vy: newVy * 0.99,
        };
      }));
    };

    const interval = setInterval(animateParticles, 16);
    return () => clearInterval(interval);
  }, [mousePosition]);

  return (
    <div className="relative w-96 h-72 border border-white/20 rounded-lg overflow-hidden bg-black/20">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute bg-optra-gradient rounded-full"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            boxShadow: `0 0 ${particle.size * 2}px rgba(255, 107, 53, 0.5)`,
            transition: 'all 0.1s ease-out'
          }}
        />
      ))}
    </div>
  );
};

const WaveGenerator = () => {
  const [frequency, setFrequency] = useState(1);
  const [amplitude, setAmplitude] = useState(50);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 0.1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const generateWavePoints = () => {
    const points = [];
    for (let x = 0; x <= 400; x += 4) {
      const y = 150 + amplitude * Math.sin((x * frequency * 0.02) + time);
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <svg width="400" height="300" className="border border-white/20 rounded-lg bg-black/20 mb-4">
        <polyline
          fill="none"
          stroke="url(#waveGradient)"
          strokeWidth="3"
          points={generateWavePoints()}
        />
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="50%" stopColor="#E91E63" />
            <stop offset="100%" stopColor="#9C27B0" />
          </linearGradient>
        </defs>
      </svg>
      
      <div className="flex gap-4">
        <div>
          <label className="text-sm text-foreground/70">Frequency</label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={frequency}
            onChange={(e) => setFrequency(Number(e.target.value))}
            className="w-20 ml-2"
          />
        </div>
        <div>
          <label className="text-sm text-foreground/70">Amplitude</label>
          <input
            type="range"
            min="20"
            max="80"
            step="5"
            value={amplitude}
            onChange={(e) => setAmplitude(Number(e.target.value))}
            className="w-20 ml-2"
          />
        </div>
      </div>
    </div>
  );
};

const GridMorphing = () => {
  const [morph, setMorph] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMorph(prev => (prev + 0.05) % (Math.PI * 2));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="grid grid-cols-8 gap-2">
        {Array.from({ length: 64 }, (_, i) => {
          const row = Math.floor(i / 8);
          const col = i % 8;
          const distance = Math.sqrt((row - 3.5) ** 2 + (col - 3.5) ** 2);
          const scale = 1 + 0.3 * Math.sin(morph + distance * 0.5);
          const rotation = morph * 20 + distance * 15;
          
          return (
            <div
              key={i}
              className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-600 rounded-sm"
              style={{
                transform: `scale(${scale}) rotate(${rotation}deg)`,
                transition: 'transform 0.1s ease-out'
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

const GeometryLab = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center perspective-1000">
      <div 
        className="relative"
        style={{
          transform: `rotateX(${rotation * 0.5}deg) rotateY(${rotation}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Cube faces */}
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="absolute w-20 h-20 border-2 border-gradient flex items-center justify-center text-white font-bold"
            style={{
              backgroundColor: `hsla(${i * 60}, 70%, 50%, 0.3)`,
              transform: 
                i === 0 ? 'translateZ(40px)' :
                i === 1 ? 'rotateY(180deg) translateZ(40px)' :
                i === 2 ? 'rotateY(90deg) translateZ(40px)' :
                i === 3 ? 'rotateY(-90deg) translateZ(40px)' :
                i === 4 ? 'rotateX(90deg) translateZ(40px)' :
                'rotateX(-90deg) translateZ(40px)'
            }}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lab;
