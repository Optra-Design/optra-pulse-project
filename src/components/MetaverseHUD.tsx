
import React, { useState, useEffect } from 'react';
import { User, Star, Trophy, Zap, Gift, Crown } from 'lucide-react';

const MetaverseHUD = () => {
  const [userStats, setUserStats] = useState({
    level: 1,
    xp: 0,
    xpToNext: 100,
    coins: 0,
    achievements: 0
  });

  const [notifications, setNotifications] = useState<Array<{
    id: number;
    message: string;
    type: 'xp' | 'achievement' | 'coin';
  }>>([]);

  useEffect(() => {
    // Listen for metaverse events
    const handleXPGain = () => {
      setUserStats(prev => {
        const newXP = prev.xp + 10;
        const newLevel = Math.floor(newXP / 100) + 1;
        
        if (newLevel > prev.level) {
          addNotification(`Level Up! You're now level ${newLevel}!`, 'achievement');
        }
        
        return {
          ...prev,
          xp: newXP,
          level: newLevel,
          coins: prev.coins + 5
        };
      });
      
      addNotification('+10 XP earned!', 'xp');
    };

    const handleAchievement = () => {
      setUserStats(prev => ({ ...prev, achievements: prev.achievements + 1 }));
      addNotification('Achievement Unlocked!', 'achievement');
    };

    // Add event listeners for clicks and interactions
    document.addEventListener('click', handleXPGain);
    
    return () => {
      document.removeEventListener('click', handleXPGain);
    };
  }, []);

  const addNotification = (message: string, type: 'xp' | 'achievement' | 'coin') => {
    const newNotification = {
      id: Date.now(),
      message,
      type
    };
    
    setNotifications(prev => [...prev, newNotification]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 3000);
  };

  return (
    <>
      {/* HUD Panel */}
      <div className="fixed top-4 right-4 z-50 glass p-4 rounded-2xl min-w-64">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-optra-gradient rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="font-bold text-gradient">Metaverse Explorer</div>
            <div className="text-sm text-foreground/70">Level {userStats.level}</div>
          </div>
        </div>
        
        {/* XP Bar */}
        <div className="mb-3">
          <div className="flex justify-between text-sm text-foreground/70 mb-1">
            <span>XP</span>
            <span>{userStats.xp % 100}/{userStats.xpToNext}</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-optra-gradient h-2 rounded-full transition-all duration-300"
              style={{ width: `${(userStats.xp % 100)}%` }}
            />
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white/10 rounded-lg p-2">
            <Star className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
            <div className="text-xs text-foreground/70">Coins</div>
            <div className="font-bold text-yellow-400">{userStats.coins}</div>
          </div>
          <div className="bg-white/10 rounded-lg p-2">
            <Trophy className="w-4 h-4 text-purple-400 mx-auto mb-1" />
            <div className="text-xs text-foreground/70">Achievements</div>
            <div className="font-bold text-purple-400">{userStats.achievements}</div>
          </div>
          <div className="bg-white/10 rounded-lg p-2">
            <Zap className="w-4 h-4 text-blue-400 mx-auto mb-1" />
            <div className="text-xs text-foreground/70">Power</div>
            <div className="font-bold text-blue-400">{userStats.level * 10}</div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="fixed top-4 left-4 z-50 space-y-2">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`glass p-3 rounded-lg animate-fade-in flex items-center gap-2 ${
              notification.type === 'xp' ? 'border-l-4 border-blue-400' :
              notification.type === 'achievement' ? 'border-l-4 border-purple-400' :
              'border-l-4 border-yellow-400'
            }`}
          >
            {notification.type === 'xp' && <Zap className="w-4 h-4 text-blue-400" />}
            {notification.type === 'achievement' && <Trophy className="w-4 h-4 text-purple-400" />}
            {notification.type === 'coin' && <Star className="w-4 h-4 text-yellow-400" />}
            <span className="text-sm font-medium">{notification.message}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default MetaverseHUD;
