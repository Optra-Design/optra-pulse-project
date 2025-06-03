import React, { useEffect, useState } from 'react';
import { Sparkles, Zap, Heart, Star, Target, Gamepad2 } from 'lucide-react';

const EasterEggs = () => {
  const [konami, setKonami] = useState('');
  const [showSecret, setShowSecret] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [rainbowMode, setRainbowMode] = useState(false);
  const [discoBall, setDiscoBall] = useState(false);
  const [showMiniGame, setShowMiniGame] = useState('');
  const [gameScore, setGameScore] = useState(0);

  useEffect(() => {
    const konamiCode = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightKeyBKeyA';
    
    const handleKeyPress = (e: KeyboardEvent) => {
      const newKonami = konami + e.code;
      if (konamiCode.startsWith(newKonami)) {
        setKonami(newKonami);
        if (newKonami === konamiCode) {
          setShowSecret(true);
          console.log('🎉 KONAMI CODE ACTIVATED! Welcome to the secret zone!');
          setTimeout(() => setShowSecret(false), 5000);
          setKonami('');
        }
      } else {
        setKonami('');
      }

      // Mini-game shortcuts
      if (e.key === 'g' && e.ctrlKey && e.shiftKey) {
        setShowMiniGame('shooter');
        console.log('🎮 SPACE SHOOTER ACTIVATED! Use arrow keys and spacebar!');
      }
      if (e.key === 'c' && e.ctrlKey && e.shiftKey) {
        setShowMiniGame('catch');
        console.log('⭐ STAR CATCHER ACTIVATED! Catch the falling stars!');
      }
    };

    const handleTripleClick = (e: MouseEvent) => {
      setClickCount(prev => prev + 1);
      if (clickCount >= 2) {
        const newParticles = Array.from({length: 15}, (_, i) => ({
          id: Date.now() + i,
          x: e.clientX,
          y: e.clientY
        }));
        setParticles(prev => [...prev, ...newParticles]);
        setTimeout(() => setParticles([]), 2000);
        setClickCount(0);
        
        // Play party sound
        try {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const notes = [523, 659, 784, 1047, 1319]; // C major scale
          notes.forEach((freq, i) => {
            setTimeout(() => {
              const oscillator = audioContext.createOscillator();
              const gainNode = audioContext.createGain();
              
              oscillator.connect(gainNode);
              gainNode.connect(audioContext.destination);
              
              oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
              gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
              gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
              
              oscillator.start(audioContext.currentTime);
              oscillator.stop(audioContext.currentTime + 0.3);
            }, i * 100);
          });
        } catch (e) {
          console.log('Audio not supported');
        }
      }
      setTimeout(() => setClickCount(0), 1000);
    };

    const handleMagicKey = (e: KeyboardEvent) => {
      if (e.key === 'm' && e.ctrlKey && e.shiftKey) {
        setRainbowMode(!rainbowMode);
        document.body.style.filter = rainbowMode ? '' : 'hue-rotate(180deg) saturate(1.5)';
        setTimeout(() => {
          if (!rainbowMode) document.body.style.filter = '';
        }, 3000);
      }
      
      if (e.key === 'd' && e.ctrlKey && e.shiftKey) {
        setDiscoBall(!discoBall);
        console.log('🪩 DISCO MODE ACTIVATED! Let\'s party!');
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('click', handleTripleClick);
    document.addEventListener('keydown', handleMagicKey);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('click', handleTripleClick);
      document.removeEventListener('keydown', handleMagicKey);
    };
  }, [konami, clickCount, rainbowMode, discoBall]);

  return (
    <>
      {/* Secret SUDO Access */}
      <div 
        className="fixed top-0 left-0 w-12 h-12 z-50 cursor-pointer opacity-0 hover:opacity-30 hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-500 rounded-full transition-all duration-300"
        onClick={() => {
          document.dispatchEvent(new CustomEvent('sudo-mode-toggle'));
          console.log('🔓 SUDO MODE ACTIVATED! Use Ctrl+Shift+S for quick access');
        }}
        title="🔓 Secret SUDO Access"
      />

      {/* Mini-game Triggers */}
      <div className="fixed bottom-4 left-4 flex flex-col gap-2 z-40">
        <div
          className="w-12 h-12 bg-purple-500/20 hover:bg-purple-500/40 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110"
          onClick={() => setShowMiniGame('shooter')}
          title="🚀 Space Shooter (Ctrl+Shift+G)"
        >
          <Target className="w-6 h-6 text-purple-400" />
        </div>
        <div
          className="w-12 h-12 bg-yellow-500/20 hover:bg-yellow-500/40 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110"
          onClick={() => setShowMiniGame('catch')}
          title="⭐ Star Catcher (Ctrl+Shift+C)"
        >
          <Star className="w-6 h-6 text-yellow-400" />
        </div>
        <div
          className="w-12 h-12 bg-green-500/20 hover:bg-green-500/40 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110"
          onClick={() => setShowMiniGame('clicker')}
          title="💎 Diamond Clicker"
        >
          <Gamepad2 className="w-6 h-6 text-green-400" />
        </div>
      </div>

      {/* Mini-Games */}
      {showMiniGame === 'shooter' && (
        <SpaceShooter onClose={() => setShowMiniGame('')} onScore={setGameScore} />
      )}
      {showMiniGame === 'catch' && (
        <StarCatcher onClose={() => setShowMiniGame('')} onScore={setGameScore} />
      )}
      {showMiniGame === 'clicker' && (
        <DiamondClicker onClose={() => setShowMiniGame('')} onScore={setGameScore} />
      )}

      {/* Disco Ball */}
      {discoBall && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-40 animate-spin">
          <div className="w-16 h-16 bg-gradient-to-br from-silver to-white rounded-full relative">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full opacity-50 animate-pulse"></div>
            <span className="absolute inset-0 flex items-center justify-center text-2xl animate-bounce">🪩</span>
          </div>
        </div>
      )}

      {/* Konami Secret */}
      {showSecret && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center backdrop-blur-sm">
          <div className="glass p-12 rounded-3xl text-center animate-scale-in glow-hover">
            <Sparkles className="w-20 h-20 text-gradient mx-auto mb-6 animate-spin" />
            <h2 className="text-5xl font-bold text-gradient mb-4 animate-pulse">🎊 KONAMI MASTER! 🎊</h2>
            <p className="text-2xl text-foreground/90 mb-2">You unlocked the legendary code!</p>
            <p className="text-lg text-foreground/70 mb-4">The ancient ways still work ✨</p>
            <p className="text-sm text-foreground/60 mb-2">Try Ctrl+Shift+G for Space Shooter!</p>
            <p className="text-sm text-foreground/60 mb-2">Or Ctrl+Shift+C for Star Catcher! ⭐</p>
            <p className="text-sm text-foreground/60">Ctrl+Shift+D for disco mode! 🪩</p>
          </div>
        </div>
      )}

      {/* Triple Click Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-40"
          style={{ 
            left: particle.x - 12, 
            top: particle.y - 12,
            animation: 'explode 2s ease-out forwards'
          }}
        >
          <Sparkles className="w-6 h-6 text-yellow-400 animate-spin" />
        </div>
      ))}

      {/* Enhanced Interactive Elements */}
      <div className="fixed bottom-6 right-24 animate-bounce-subtle opacity-70 hover:opacity-100 transition-all cursor-pointer hover:scale-125">
        <span className="text-3xl" onClick={() => {
          console.log('🎨 Aniketh says: Design is everywhere! Click me for XP!');
          document.body.style.animation = 'pulse 1s ease-in-out';
          setTimeout(() => document.body.style.animation = '', 1000);
        }}>🎨</span>
      </div>
      
      <div className="fixed top-1/3 right-8 animate-float opacity-60 hover:opacity-100 transition-all cursor-pointer hover:scale-125">
        <span className="text-2xl" onClick={() => {
          console.log('✨ Magic happens when design meets passion! +5 XP gained!');
          setShowMiniGame('clicker');
        }}>✨</span>
      </div>

      <div className="fixed top-16 left-1/4 animate-pulse opacity-50 hover:opacity-100 transition-all cursor-pointer hover:scale-125">
        <span className="text-xl" onClick={() => {
          console.log('🚀 Ready to launch something amazing? Blast off with +10 XP!');
          setShowMiniGame('shooter');
        }}>🚀</span>
      </div>

      <div className="fixed bottom-1/3 left-8 animate-bounce opacity-60 hover:opacity-100 transition-all cursor-pointer hover:scale-125">
        <span className="text-2xl" onClick={() => {
          console.log('👑 You found the crown! Royal +15 XP bonus!');
          document.body.style.filter = 'sepia(0.5) hue-rotate(45deg)';
          setTimeout(() => document.body.style.filter = '', 2000);
        }}>👑</span>
      </div>

      <div className="fixed top-2/3 left-1/3 animate-float opacity-50 hover:opacity-100 transition-all cursor-pointer hover:scale-125">
        <span className="text-xl" onClick={() => {
          console.log('💎 Diamond discovered! Precious +20 XP!');
          setShowMiniGame('catch');
        }}>💎</span>
      </div>

      <div className="fixed bottom-1/2 right-1/3 animate-pulse opacity-40 hover:opacity-100 transition-all cursor-pointer hover:scale-125">
        <span className="text-xl" onClick={() => {
          console.log('🎮 Gaming time! Mini-games activated!');
          setShowMiniGame('clicker');
        }}>🎮</span>
      </div>
    </>
  );
};

// Mini-Game Components
const SpaceShooter = ({ onClose, onScore }: { onClose: () => void, onScore: (score: number) => void }) => {
  const [playerX, setPlayerX] = useState(200);
  const [bullets, setBullets] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [enemies, setEnemies] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setPlayerX(prev => Math.max(0, prev - 20));
      if (e.key === 'ArrowRight') setPlayerX(prev => Math.min(380, prev + 20));
      if (e.key === ' ') {
        setBullets(prev => [...prev, { id: Date.now(), x: playerX, y: 280 }]);
      }
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [playerX, onClose]);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      setBullets(prev => prev.map(b => ({ ...b, y: b.y - 10 })).filter(b => b.y > 0));
      setEnemies(prev => {
        const updated = prev.map(e => ({ ...e, y: e.y + 3 })).filter(e => e.y < 300);
        if (Math.random() < 0.1) {
          updated.push({ id: Date.now(), x: Math.random() * 380, y: 0 });
        }
        return updated;
      });
    }, 100);

    return () => clearInterval(gameLoop);
  }, []);

  useEffect(() => {
    bullets.forEach(bullet => {
      enemies.forEach(enemy => {
        if (Math.abs(bullet.x - enemy.x) < 20 && Math.abs(bullet.y - enemy.y) < 20) {
          setBullets(prev => prev.filter(b => b.id !== bullet.id));
          setEnemies(prev => prev.filter(e => e.id !== enemy.id));
          setScore(prev => {
            const newScore = prev + 10;
            onScore(newScore);
            return newScore;
          });
        }
      });
    });
  }, [bullets, enemies, onScore]);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-black border-2 border-white/20 rounded-lg p-4 w-96 h-80 relative overflow-hidden">
        <div className="text-white text-center mb-2">Score: {score} | ESC to exit</div>
        
        {/* Player */}
        <div 
          className="absolute bottom-4 w-6 h-6 bg-blue-500 rounded"
          style={{ left: playerX }}
        />
        
        {/* Bullets */}
        {bullets.map(bullet => (
          <div
            key={bullet.id}
            className="absolute w-2 h-4 bg-yellow-400 rounded"
            style={{ left: bullet.x + 12, top: bullet.y }}
          />
        ))}
        
        {/* Enemies */}
        {enemies.map(enemy => (
          <div
            key={enemy.id}
            className="absolute w-6 h-6 bg-red-500 rounded"
            style={{ left: enemy.x, top: enemy.y }}
          />
        ))}
      </div>
    </div>
  );
};

const StarCatcher = ({ onClose, onScore }: { onClose: () => void, onScore: (score: number) => void }) => {
  const [playerX, setPlayerX] = useState(200);
  const [stars, setStars] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setPlayerX(prev => Math.max(0, prev - 15));
      if (e.key === 'ArrowRight') setPlayerX(prev => Math.min(370, prev + 15));
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [onClose]);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      setStars(prev => {
        const updated = prev.map(s => ({ ...s, y: s.y + 5 })).filter(s => s.y < 300);
        if (Math.random() < 0.15) {
          updated.push({ id: Date.now(), x: Math.random() * 370, y: 0 });
        }
        return updated;
      });
    }, 100);

    return () => clearInterval(gameLoop);
  }, []);

  useEffect(() => {
    stars.forEach(star => {
      if (Math.abs(star.x - playerX) < 25 && star.y > 250) {
        setStars(prev => prev.filter(s => s.id !== star.id));
        setScore(prev => {
          const newScore = prev + 5;
          onScore(newScore);
          return newScore;
        });
      }
    });
  }, [stars, playerX, onScore]);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-gradient-to-b from-purple-900 to-black border-2 border-white/20 rounded-lg p-4 w-96 h-80 relative overflow-hidden">
        <div className="text-white text-center mb-2">Stars: {score} | Use ← → arrows | ESC to exit</div>
        
        {/* Player */}
        <div 
          className="absolute bottom-4 w-8 h-8 bg-yellow-400 rounded-full animate-pulse"
          style={{ left: playerX }}
        />
        
        {/* Stars */}
        {stars.map(star => (
          <div
            key={star.id}
            className="absolute w-6 h-6 text-yellow-400 animate-spin"
            style={{ left: star.x, top: star.y }}
          >
            ⭐
          </div>
        ))}
      </div>
    </div>
  );
};

const DiamondClicker = ({ onClose, onScore }: { onClose: () => void, onScore: (score: number) => void }) => {
  const [diamonds, setDiamonds] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [autoClickers, setAutoClickers] = useState(0);

  useEffect(() => {
    if (autoClickers > 0) {
      const interval = setInterval(() => {
        setDiamonds(prev => prev + autoClickers);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [autoClickers]);

  useEffect(() => {
    onScore(diamonds);
  }, [diamonds, onScore]);

  const handleClick = () => {
    setDiamonds(prev => prev + clickPower);
  };

  const buyUpgrade = (type: 'power' | 'auto') => {
    if (type === 'power' && diamonds >= 50) {
      setDiamonds(prev => prev - 50);
      setClickPower(prev => prev + 1);
    } else if (type === 'auto' && diamonds >= 100) {
      setDiamonds(prev => prev - 100);
      setAutoClickers(prev => prev + 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="glass p-6 rounded-2xl w-80 text-center">
        <h3 className="text-2xl font-bold text-gradient mb-4">💎 Diamond Clicker</h3>
        <div className="text-3xl mb-4">Diamonds: {diamonds}</div>
        
        <div 
          className="w-24 h-24 mx-auto mb-6 text-6xl cursor-pointer hover:scale-110 transition-transform animate-pulse"
          onClick={handleClick}
        >
          💎
        </div>
        
        <div className="space-y-2 mb-4">
          <button
            onClick={() => buyUpgrade('power')}
            disabled={diamonds < 50}
            className="w-full px-4 py-2 bg-blue-500 disabled:bg-gray-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            +1 Click Power (50 💎)
          </button>
          <button
            onClick={() => buyUpgrade('auto')}
            disabled={diamonds < 100}
            className="w-full px-4 py-2 bg-green-500 disabled:bg-gray-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Auto Clicker (100 💎)
          </button>
        </div>
        
        <div className="text-sm text-foreground/70 mb-4">
          Power: {clickPower} | Auto: {autoClickers}/sec
        </div>
        
        <button 
          onClick={onClose}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EasterEggs;
