import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { Beaker, Zap, Palette, Code, Sparkles, Waves, Grid3X3, Triangle, Music, Gamepad2, Orbit, Atom } from 'lucide-react';

const Lab = () => {
  const [activeExperiment, setActiveExperiment] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [funLevel, setFunLevel] = useState(0);
  const [labClicks, setLabClicks] = useState(0);
  const [secretMode, setSecretMode] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const experiments = [
    {
      title: "Rainbow Harmonics",
      description: "Explosive color theory magic ✨",
      icon: <Palette className="w-6 h-6" />,
      component: <RainbowHarmonics />
    },
    {
      title: "Hypnotic Motion",
      description: "Mind-bending fluid animations 🌀",
      icon: <Orbit className="w-6 h-6" />,
      component: <HypnoticMotion />
    },
    {
      title: "Glitch Typography",
      description: "Digital text chaos generator 🔥",
      icon: <Code className="w-6 h-6" />,
      component: <GlitchTypography />
    },
    {
      title: "Particle Storm",
      description: "Interactive physics mayhem ⚡",
      icon: <Atom className="w-6 h-6" />,
      component: <ParticleStorm mousePosition={mousePosition} />
    },
    {
      title: "Bass Wave Generator",
      description: "Audio-visual earthquake machine 🎵",
      icon: <Waves className="w-6 h-6" />,
      component: <BassWaveGenerator />
    },
    {
      title: "Reality Grid",
      description: "Matrix-bending transformations 🕳️",
      icon: <Grid3X3 className="w-6 h-6" />,
      component: <RealityGrid />
    },
    {
      title: "Dimensional Geometry",
      description: "Impossible 4D shape madness 🔮",
      icon: <Triangle className="w-6 h-6" />,
      component: <DimensionalGeometry />
    },
    {
      title: "Beat Visualizer",
      description: "Rave-level audio visualization 🎉",
      icon: <Music className="w-6 h-6" />,
      component: <BeatVisualizer />
    },
    {
      title: "Chaos Simulator",
      description: "Butterfly effect playground 🦋",
      icon: <Gamepad2 className="w-6 h-6" />,
      component: <ChaosSimulator />
    }
  ];

  const playExperimentSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.3);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const handleExperimentChange = (index: number) => {
    setActiveExperiment(index);
    playExperimentSound();
    setLabClicks(prev => prev + 1);
    
    // Secret mode after 10 clicks
    if (labClicks >= 9) {
      setSecretMode(true);
      console.log('🔬 LAB SECRET MODE ACTIVATED! You are now a master scientist! 🧪');
    }
    
    // Add screen shake effect
    document.body.style.animation = 'shake 0.3s ease-in-out';
    setTimeout(() => {
      document.body.style.animation = '';
    }, 300);
  };

  const handleLabClick = (e: React.MouseEvent) => {
    // Create click effect
    const clickEffect = document.createElement('div');
    clickEffect.className = 'fixed pointer-events-none z-50 text-2xl animate-ping';
    clickEffect.innerHTML = '🧪';
    clickEffect.style.left = e.clientX - 12 + 'px';
    clickEffect.style.top = e.clientY - 12 + 'px';
    document.body.appendChild(clickEffect);
    setTimeout(() => clickEffect.remove(), 1000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" onClick={handleLabClick}>
      <Navigation />
      
      {/* Enhanced fun background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            left: `${Math.sin(funLevel * 0.1) * 20 + 10}%`,
            top: `${Math.cos(funLevel * 0.1) * 20 + 10}%`,
          }}
        />
        <div 
          className="absolute w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-bounce"
          style={{
            right: `${Math.sin(funLevel * 0.08) * 15 + 5}%`,
            bottom: `${Math.cos(funLevel * 0.08) * 15 + 5}%`,
          }}
        />
        {secretMode && (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 animate-pulse" />
        )}
      </div>
      
      <div className="pt-24 pb-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Hero with secret mode */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Beaker className={`w-12 h-12 text-gradient ${secretMode ? 'animate-spin' : 'animate-bounce'}`} />
              <h1 className={`text-5xl md:text-7xl font-bold text-gradient ${secretMode ? 'animate-pulse' : ''}`}>
                {secretMode ? 'SECRET LAB' : 'FUN LAB'}
              </h1>
              <Sparkles className="w-8 h-8 text-yellow-400 animate-bounce" />
            </div>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto animate-fade-in">
              {secretMode ? 
                '🔬 MASTER SCIENTIST MODE! You\'ve unlocked the lab\'s hidden potential! 🧬' :
                '🚀 WHERE CREATIVITY MEETS CHAOS! 🎨 Interactive experiments that\'ll blow your mind!'
              }
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <span className="bg-pink-500/20 text-pink-400 px-4 py-2 rounded-full animate-pulse font-bold">
                🔥 MAXIMUM FUN MODE
              </span>
              <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full animate-bounce font-bold">
                🎮 INTERACTIVE
              </span>
              <span className="bg-purple-500/20 text-purple-400 px-4 py-2 rounded-full animate-pulse font-bold">
                🌈 MIND-BENDING
              </span>
              {secretMode && (
                <span className="bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full animate-bounce font-bold">
                  🔬 SECRET MODE
                </span>
              )}
            </div>
            <div className="mt-4 text-sm text-foreground/50">
              Lab Clicks: {labClicks} {labClicks >= 10 && '🏆'}
            </div>
          </div>

          {/* Interactive experiment navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {experiments.map((experiment, index) => (
              <button
                key={index}
                onClick={() => handleExperimentChange(index)}
                onMouseEnter={() => {
                  // Play hover sound
                  try {
                    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    oscillator.frequency.setValueAtTime(600 + index * 50, audioContext.currentTime);
                    gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                    
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.1);
                  } catch (e) {
                    console.log('Audio not supported');
                  }
                }}
                className={`group relative flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-110 transform ${
                  activeExperiment === index
                    ? `bg-gradient-to-r from-pink-500 to-purple-600 text-white scale-110 shadow-2xl ${secretMode ? 'animate-pulse' : ''}`
                    : 'bg-white/10 text-foreground/70 hover:bg-white/20 border-2 border-white/20 hover:border-white/40'
                } hover:rotate-1 hover:shadow-2xl`}
                style={{
                  filter: activeExperiment === index ? 'drop-shadow(0 0 20px rgba(236, 72, 153, 0.5))' : '',
                }}
              >
                <span className="group-hover:rotate-12 group-hover:scale-125 transition-all duration-300">
                  {experiment.icon}
                </span>
                <span className="relative">
                  {experiment.title}
                  {activeExperiment === index && (
                    <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full animate-ping" />
                  )}
                </span>
                {/* Hidden easter egg */}
                <div 
                  className="absolute -bottom-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(`🎯 Easter egg found in ${experiment.title}! +50 XP bonus!`);
                  }}
                />
              </button>
            ))}
          </div>

          {/* Enhanced Active Experiment with interactive elements */}
          <div className={`glass p-8 rounded-3xl mb-8 min-h-[500px] transition-all duration-500 hover:scale-[1.02] relative overflow-hidden ${secretMode ? 'border-2 border-cyan-400/50' : ''}`}>
            {/* Interactive background effect */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-600/5 transition-opacity duration-300"
              style={{ 
                opacity: secretMode ? 0.3 : 0.1,
                background: secretMode ? 'linear-gradient(45deg, #ff0066, #6600ff, #00ffff)' : undefined
              }}
            />
            
            {/* Hidden clickable areas */}
            <div className="absolute top-4 left-4 w-8 h-8 opacity-0 hover:opacity-50 hover:bg-yellow-400/30 rounded-full cursor-pointer transition-all"
                 onClick={() => console.log('🎯 Secret lab corner discovered! +25 XP!')}>
            </div>
            <div className="absolute top-4 right-4 w-8 h-8 opacity-0 hover:opacity-50 hover:bg-green-400/30 rounded-full cursor-pointer transition-all"
                 onClick={() => console.log('🔬 Lab equipment activated! Science bonus +15 XP!')}>
            </div>
            
            <div className="text-center mb-8 relative z-10">
              <h2 className="text-4xl font-black text-gradient mb-3 animate-fade-in">
                {experiments[activeExperiment].title}
                {secretMode && <span className="text-cyan-400 ml-2">🔬</span>}
              </h2>
              <p className="text-lg text-foreground/80 font-medium">
                {experiments[activeExperiment].description}
              </p>
              <div className="mt-4 text-sm text-yellow-400 animate-pulse">
                ⚡ Click, hover, and explore for hidden surprises! ⚡
              </div>
            </div>
            
            <div className="flex items-center justify-center h-96 relative z-10">
              {experiments[activeExperiment].component}
            </div>
          </div>

          {/* Enhanced Lab Info with interactive elements */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass p-6 rounded-2xl text-center hover:scale-110 transition-all duration-300 hover:rotate-1 animate-fade-in relative overflow-hidden cursor-pointer"
                 onClick={() => console.log('🔓 Open source magic activated! Knowledge +10 XP!')}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 animate-pulse" />
              <Code className="w-10 h-10 text-gradient mx-auto mb-4 animate-bounce" />
              <h3 className="font-black text-gradient mb-2 text-lg">OPEN SOURCE</h3>
              <p className="text-sm text-foreground/70 relative z-10">
                🔓 Built with cutting-edge web tech magic
              </p>
            </div>
            
            <div className="glass p-6 rounded-2xl text-center hover:scale-110 transition-all duration-300 hover:rotate-1 animate-fade-in relative overflow-hidden cursor-pointer" 
                 style={{ animationDelay: '0.1s' }}
                 onClick={() => console.log('⚡ Real-time power unleashed! Speed +20 XP!')}>
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-red-500/10 animate-pulse" />
              <Zap className="w-10 h-10 text-gradient mx-auto mb-4 animate-pulse" />
              <h3 className="font-black text-gradient mb-2 text-lg">REAL-TIME</h3>
              <p className="text-sm text-foreground/70 relative z-10">
                ⚡ Lightning-fast interactive experiences
              </p>
            </div>
            
            <div className="glass p-6 rounded-2xl text-center hover:scale-110 transition-all duration-300 hover:rotate-1 animate-fade-in relative overflow-hidden cursor-pointer" 
                 style={{ animationDelay: '0.2s' }}
                 onClick={() => console.log('🤯 Mind-blowing innovation discovered! Creativity +30 XP!')}>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 animate-pulse" />
              <Sparkles className="w-10 h-10 text-gradient mx-auto mb-4 animate-spin" style={{ animationDuration: '2s' }} />
              <h3 className="font-black text-gradient mb-2 text-lg">MIND-BLOWING</h3>
              <p className="text-sm text-foreground/70 relative z-10">
                🤯 Pushing reality's boundaries daily
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px) rotate(-0.5deg); }
          75% { transform: translateX(2px) rotate(0.5deg); }
        }
      `}</style>
    </div>
  );
};

// Enhanced Experiment Components with more interactivity
const RainbowHarmonics = () => {
  const [hue, setHue] = useState(0);
  const [pattern, setPattern] = useState(0);
  const [clicked, setClicked] = useState<number[]>([]);
  const [explosions, setExplosions] = useState<Array<{id: number, x: number, y: number}>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHue(prev => (prev + 1) % 360);
      setPattern(prev => (prev + 0.5) % 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleColorClick = (index: number, event: React.MouseEvent) => {
    setClicked(prev => [...prev, index]);
    
    // Create explosion effect
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const explosion = {
      id: Date.now() + index,
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
    setExplosions(prev => [...prev, explosion]);
    
    setTimeout(() => {
      setClicked(prev => prev.filter(i => i !== index));
      setExplosions(prev => prev.filter(e => e.id !== explosion.id));
    }, 800);

    // Play color sound
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(200 + index * 50, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
      console.log('Audio not supported');
    }
  };

  return (
    <>
      <div className="w-full h-full flex items-center justify-center">
        <div className="grid grid-cols-6 gap-3 p-4">
          {Array.from({ length: 36 }, (_, i) => (
            <div
              key={i}
              className="w-14 h-14 rounded-xl transition-all duration-300 hover:scale-125 cursor-pointer shadow-2xl relative overflow-hidden"
              onClick={(e) => handleColorClick(i, e)}
              style={{
                backgroundColor: `hsl(${(hue + i * 10) % 360}, ${80 + Math.sin(pattern + i) * 20}%, ${60 + Math.cos(pattern + i) * 15}%)`,
                transform: `rotate(${hue + i * 3}deg) scale(${clicked.includes(i) ? 1.5 : 1 + Math.sin(pattern + i) * 0.2})`,
                boxShadow: `0 0 30px hsla(${(hue + i * 10) % 360}, 80%, 60%, 0.8)`,
                filter: clicked.includes(i) ? 'brightness(1.5) saturate(2)' : '',
              }}
            >
              {clicked.includes(i) && (
                <div className="absolute inset-0 bg-white/50 animate-ping rounded-xl" />
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Explosion effects */}
      {explosions.map(explosion => (
        <div
          key={explosion.id}
          className="fixed pointer-events-none z-50 text-4xl animate-ping"
          style={{
            left: explosion.x - 20,
            top: explosion.y - 20,
          }}
        >
          💥
        </div>
      ))}
    </>
  );
};

const HypnoticMotion = () => {
  const [time, setTime] = useState(0);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 0.15 * speed);
    }, 30);
    return () => clearInterval(interval);
  }, [speed]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <div className="relative mb-4">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="absolute border-4 rounded-full animate-pulse"
            style={{
              width: `${80 + i * 25}px`,
              height: `${80 + i * 25}px`,
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) rotate(${time * (i + 1) * 8}deg) scale(${1 + Math.sin(time + i) * 0.4})`,
              opacity: 0.9 - i * 0.06,
              borderColor: `hsl(${(time * 30 + i * 30) % 360}, 90%, 70%)`,
              filter: `drop-shadow(0 0 15px hsla(${(time * 30 + i * 30) % 360}, 90%, 70%, 0.8)) blur(${i * 0.5}px)`,
              mixBlendMode: 'screen'
            }}
          />
        ))}
        <div 
          className="w-12 h-12 bg-white rounded-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl animate-pulse z-10"
          style={{
            boxShadow: '0 0 30px rgba(255, 255, 255, 0.8)'
          }}
        />
      </div>
      
      <div className="flex gap-4 z-20">
        <button
          onClick={() => setSpeed(prev => Math.max(0.1, prev - 0.5))}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-bold"
        >
          SLOWER 🐌
        </button>
        <button
          onClick={() => setSpeed(prev => Math.min(3, prev + 0.5))}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-bold"
        >
          FASTER 🚀
        </button>
      </div>
    </div>
  );
};

const GlitchTypography = () => {
  const [currentText, setCurrentText] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const [intensity, setIntensity] = useState(1);
  const texts = ['CHAOS', 'GLITCH', 'MATRIX', 'CYBER', 'NEON', 'FUTURE', 'DIGITAL', 'HACK'];

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => {
        setCurrentText(prev => (prev + 1) % texts.length);
        setGlitch(false);
      }, 300);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const glitchStyle = {
    textShadow: glitch ? `${intensity * 3}px ${intensity * 3}px 0px #ff0000, -${intensity * 3}px -${intensity * 3}px 0px #00ff00, ${intensity * 2}px -${intensity * 2}px 0px #0000ff` : '0 0 40px rgba(255, 107, 53, 0.8)',
    transform: glitch ? `skew(${intensity * 2}deg) scale(${1 + intensity * 0.1})` : 'skew(0deg) scale(1)',
    filter: glitch ? `hue-rotate(${intensity * 90}deg) contrast(${1 + intensity * 0.5})` : 'none',
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-6">
      <div 
        className={`text-6xl font-black text-gradient transition-all duration-200 cursor-pointer hover:scale-110 ${
          glitch ? 'animate-pulse' : ''
        }`}
        style={glitchStyle}
        onClick={() => setGlitch(!glitch)}
      >
        {texts[currentText]}
      </div>
      
      <div className="flex gap-4">
        <button
          onClick={() => setIntensity(prev => Math.max(0.5, prev - 0.5))}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-bold"
        >
          LESS CHAOS 😌
        </button>
        <button
          onClick={() => setIntensity(prev => Math.min(3, prev + 0.5))}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-bold"
        >
          MORE CHAOS 🔥
        </button>
      </div>
    </div>
  );
};

const ParticleStorm = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number; size: number; color: string }>>([]);

  useEffect(() => {
    const initialParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 400,
      y: Math.random() * 300,
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3,
      size: Math.random() * 8 + 4,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`
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
          const force = (150 - distance) / 150 * 0.003;
          newVx += dx * force;
          newVy += dy * force;
        }
        
        return {
          ...particle,
          x: (particle.x + newVx + 400) % 400,
          y: (particle.y + newVy + 300) % 300,
          vx: newVx * 0.98,
          vy: newVy * 0.98,
        };
      }));
    };

    const interval = setInterval(animateParticles, 16);
    return () => clearInterval(interval);
  }, [mousePosition]);

  return (
    <div className="relative w-96 h-72 border border-white/20 rounded-lg overflow-hidden bg-black/20 shadow-2xl">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-pulse"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: particle.color,
            boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
            transition: 'all 0.1s ease-out'
          }}
        />
      ))}
    </div>
  );
};

const BassWaveGenerator = () => {
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
      <svg width="400" height="300" className="border border-white/20 rounded-lg bg-black/20 mb-4 shadow-2xl">
        <polyline
          fill="none"
          stroke="url(#waveGradient)"
          strokeWidth="3"
          points={generateWavePoints()}
        />
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="25%" stopColor="#E91E63" />
            <stop offset="50%" stopColor="#9C27B0" />
            <stop offset="75%" stopColor="#3F51B5" />
            <stop offset="100%" stopColor="#00BCD4" />
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
            className="w-20 ml-2 accent-pink-500"
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
            className="w-20 ml-2 accent-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

const RealityGrid = () => {
  const [morph, setMorph] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMorph(prev => (prev + 0.05) % (Math.PI * 2));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="grid grid-cols-8 gap-2 p-4 bg-black/20 rounded-lg shadow-2xl">
        {Array.from({ length: 64 }, (_, i) => {
          const row = Math.floor(i / 8);
          const col = i % 8;
          const distance = Math.sqrt((row - 3.5) ** 2 + (col - 3.5) ** 2);
          const scale = 1 + 0.4 * Math.sin(morph + distance * 0.5);
          const rotation = morph * 25 + distance * 20;
          const hue = (morph * 50 + distance * 30) % 360;
          
          return (
            <div
              key={i}
              className="w-6 h-6 rounded-sm shadow-lg"
              style={{
                background: `hsl(${hue}, 70%, 60%)`,
                transform: `scale(${scale}) rotate(${rotation}deg)`,
                transition: 'transform 0.1s ease-out',
                boxShadow: `0 0 10px hsla(${hue}, 70%, 60%, 0.7)`
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

const DimensionalGeometry = () => {
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
        className="relative shadow-2xl"
        style={{
          transform: `rotateX(${rotation * 0.5}deg) rotateY(${rotation}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="absolute w-20 h-20 border-2 border-gradient flex items-center justify-center text-white font-bold shadow-lg"
            style={{
              backgroundColor: `hsla(${i * 60 + rotation}, 80%, 60%, 0.4)`,
              boxShadow: `0 0 20px hsla(${i * 60 + rotation}, 80%, 60%, 0.6)`,
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

const BeatVisualizer = () => {
  const [bars, setBars] = useState<number[]>(Array.from({ length: 20 }, () => Math.random() * 100));

  useEffect(() => {
    const interval = setInterval(() => {
      setBars(prev => prev.map(() => Math.random() * 100 + 20));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex items-end gap-2 h-64 bg-black/20 p-4 rounded-lg shadow-2xl">
        {bars.map((height, i) => (
          <div
            key={i}
            className="w-6 rounded-t-lg transition-all duration-150"
            style={{
              height: `${height}%`,
              background: `linear-gradient(to top, hsl(${height + i * 18}, 80%, 60%), hsl(${height + i * 18 + 60}, 80%, 80%))`,
              boxShadow: `0 0 10px hsla(${height + i * 18}, 80%, 60%, 0.7)`
            }}
          />
        ))}
      </div>
    </div>
  );
};

const ChaosSimulator = () => {
  const [balls, setBalls] = useState<Array<{ x: number; y: number; vx: number; vy: number; color: string }>>([]);
  
  useEffect(() => {
    const initialBalls = Array.from({ length: 8 }, () => ({
      x: Math.random() * 350 + 25,
      y: Math.random() * 250 + 25,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`
    }));
    setBalls(initialBalls);
  }, []);

  useEffect(() => {
    const simulate = () => {
      setBalls(prev => prev.map(ball => {
        let newX = ball.x + ball.vx;
        let newY = ball.y + ball.vy;
        let newVx = ball.vx;
        let newVy = ball.vy + 0.2; // gravity

        // Bounce off walls
        if (newX <= 10 || newX >= 390) {
          newVx = -newVx * 0.8;
          newX = newX <= 10 ? 10 : 390;
        }
        if (newY <= 10 || newY >= 290) {
          newVy = -newVy * 0.8;
          newY = newY <= 10 ? 10 : 290;
        }

        return { ...ball, x: newX, y: newY, vx: newVx, vy: newVy };
      }));
    };

    const interval = setInterval(simulate, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-96 h-72 border border-white/20 rounded-lg bg-black/20 shadow-2xl overflow-hidden">
      {balls.map((ball, i) => (
        <div
          key={i}
          className="absolute w-6 h-6 rounded-full shadow-lg animate-pulse"
          style={{
            left: `${ball.x}px`,
            top: `${ball.y}px`,
            background: ball.color,
            boxShadow: `0 0 15px ${ball.color}`,
            transition: 'all 0.02s linear'
          }}
        />
      ))}
    </div>
  );
};

export default Lab;

</edits_to_apply>
