
import React, { useState, useEffect } from 'react';
import { Settings, Palette, Layout, Zap } from 'lucide-react';

const SudoMode = () => {
  const [isActive, setIsActive] = useState(false);
  const [theme, setTheme] = useState('default');
  const [layout, setLayout] = useState('default');

  useEffect(() => {
    const handleSudoToggle = () => {
      setIsActive(prev => !prev);
    };

    document.addEventListener('sudo-mode-toggle', handleSudoToggle);
    return () => document.removeEventListener('sudo-mode-toggle', handleSudoToggle);
  }, []);

  const themes = [
    { id: 'default', name: 'Optra', class: '' },
    { id: 'neon', name: 'Neon', class: 'filter hue-rotate-180' },
    { id: 'mono', name: 'Mono', class: 'filter grayscale' },
    { id: 'vibrant', name: 'Vibrant', class: 'filter saturate-150 brightness-110' }
  ];

  const layouts = [
    { id: 'default', name: 'Default', class: '' },
    { id: 'compact', name: 'Compact', class: 'text-sm' },
    { id: 'spacious', name: 'Spacious', class: 'text-lg' }
  ];

  const applyTheme = (themeId: string) => {
    const themeObj = themes.find(t => t.id === themeId);
    if (themeObj) {
      document.body.className = themeObj.class;
      setTheme(themeId);
    }
  };

  const applyLayout = (layoutId: string) => {
    const layoutObj = layouts.find(l => l.id === layoutId);
    if (layoutObj) {
      const main = document.querySelector('main') || document.body;
      main.className = layoutObj.class;
      setLayout(layoutId);
    }
  };

  if (!isActive) return null;

  return (
    <div className="fixed top-4 left-4 z-50 bg-background/95 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5 text-gradient" />
        <h3 className="font-bold text-gradient">SUDO MODE</h3>
        <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">EXPERIMENTAL</span>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Palette className="w-4 h-4" />
            <span className="text-sm font-medium">Theme</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {themes.map(themeObj => (
              <button
                key={themeObj.id}
                onClick={() => applyTheme(themeObj.id)}
                className={`p-2 text-xs rounded border transition-all duration-200 ${
                  theme === themeObj.id 
                    ? 'border-white/40 bg-white/10' 
                    : 'border-white/20 hover:border-white/30'
                }`}
              >
                {themeObj.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Layout className="w-4 h-4" />
            <span className="text-sm font-medium">Layout</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {layouts.map(layoutObj => (
              <button
                key={layoutObj.id}
                onClick={() => applyLayout(layoutObj.id)}
                className={`p-2 text-xs rounded border transition-all duration-200 ${
                  layout === layoutObj.id 
                    ? 'border-white/40 bg-white/10' 
                    : 'border-white/20 hover:border-white/30'
                }`}
              >
                {layoutObj.name}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            document.body.className = '';
            setTheme('default');
            setLayout('default');
          }}
          className="w-full p-2 text-xs bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors duration-200"
        >
          Reset All
        </button>
      </div>

      <p className="text-xs text-foreground/50 mt-4">
        Changes are temporary and reset on page reload.
      </p>
    </div>
  );
};

export default SudoMode;
