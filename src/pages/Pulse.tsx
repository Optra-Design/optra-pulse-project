
import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { Activity, TrendingUp, Zap, BarChart3 } from 'lucide-react';

const Pulse = () => {
  const [metrics, setMetrics] = useState({
    projects: 0,
    clients: 0,
    satisfaction: 0,
    growth: 0
  });

  useEffect(() => {
    // Animate counters
    const animateValue = (key: keyof typeof metrics, end: number, duration: number = 2000) => {
      const start = 0;
      const increment = end / (duration / 16);
      let current = start;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          current = end;
          clearInterval(timer);
        }
        setMetrics(prev => ({ ...prev, [key]: Math.round(current) }));
      }, 16);
    };

    setTimeout(() => animateValue('projects', 47), 200);
    setTimeout(() => animateValue('clients', 23), 400);
    setTimeout(() => animateValue('satisfaction', 100), 600);
    setTimeout(() => animateValue('growth', 250), 800);
  }, []);

  const pulseData = [
    {
      icon: <Activity className="w-8 h-8" />,
      label: "Active Projects",
      value: metrics.projects,
      suffix: "+",
      color: "text-blue-400"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      label: "Happy Clients",
      value: metrics.clients,
      suffix: "+",
      color: "text-green-400"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      label: "Satisfaction Rate",
      value: metrics.satisfaction,
      suffix: "%",
      color: "text-yellow-400"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      label: "Growth Rate",
      value: metrics.growth,
      suffix: "%",
      color: "text-purple-400"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Activity className="w-12 h-12 text-gradient animate-pulse" />
              <h1 className="text-5xl md:text-7xl font-bold text-gradient">
                Studio Pulse
              </h1>
            </div>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              📊 Real-time insights into our studio's heartbeat. 
              Track our journey, growth, and impact in the design world.
            </p>
            <div className="mt-4 text-sm text-foreground/50">
              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                ✅ Live Data
              </span>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {pulseData.map((metric, index) => (
              <div 
                key={index}
                className="glass p-8 rounded-3xl text-center hover:bg-white/10 transition-all duration-500 glow-hover animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`${metric.color} mb-4 flex justify-center`}>
                  {metric.icon}
                </div>
                <div className="text-4xl font-bold text-gradient mb-2">
                  {metric.value}{metric.suffix}
                </div>
                <div className="text-foreground/70 text-sm">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Current Status */}
          <div className="glass p-8 rounded-3xl mb-16">
            <h2 className="text-3xl font-bold text-gradient mb-8 text-center">
              Current Status
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gradient mb-4">🎯 Focus Areas</h3>
                <ul className="space-y-3 text-foreground/80">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Premium brand identity projects</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Interactive web experiences</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Design system development</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>Creative consultation services</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gradient mb-4">🚀 Recent Milestones</h3>
                <ul className="space-y-3 text-foreground/80">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full"></div>
                    <span>Launched 3 major rebrands this quarter</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                    <span>Expanded service offerings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
                    <span>100% client satisfaction maintained</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                    <span>New studio processes implemented</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="text-center glass p-12 rounded-3xl">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              <h2 className="text-3xl font-bold text-gradient">
                Currently Available
              </h2>
            </div>
            <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
              We're actively taking on new projects and would love to hear about your vision. 
              Let's create something extraordinary together.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="mailto:aniketh@optra.me"
                className="group flex items-center gap-2 px-8 py-4 bg-optra-gradient text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 glow-hover"
              >
                Get in Touch
                <Zap className="w-5 h-5 group-hover:animate-bounce" />
              </a>
              
              <div className="text-sm text-foreground/50">
                Response time: Within 48 hours
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pulse;
