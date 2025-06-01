
import React, { useEffect } from 'react';
import Navigation from '../components/Navigation';
import AnimatedHeroText from '../components/AnimatedHeroText';
import { ArrowRight, Sparkles, Zap, Palette, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  useEffect(() => {
    // Console easter egg
    console.log(`
    🎨 Welcome to Optra Design's console!
    
    ╔═══════════════════════════════════════╗
    ║           OPTRA DESIGN               ║
    ║        Shape. Style. Scale.          ║
    ╚═══════════════════════════════════════╝
    
    Try typing:
    - optra.sudo() for hidden features
    - optra.magic() for something special
    - optra.contact() for quick contact
    
    Built with ❤️ in Bangalore
    `);

    // Global sudo mode function
    (window as any).optra = {
      sudo: () => {
        document.dispatchEvent(new CustomEvent('sudo-mode-toggle'));
        console.log('🔓 Sudo mode toggled!');
      },
      magic: () => {
        document.body.classList.add('glitch');
        setTimeout(() => document.body.classList.remove('glitch'), 2000);
        console.log('✨ Magic activated!');
      },
      contact: () => {
        window.location.href = 'mailto:aniketh@optra.me';
        console.log('📧 Opening contact...');
      }
    };
  }, []);

  const features = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Brand Identity",
      description: "Distinctive visual systems that capture essence and drive recognition."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Digital Experiences",
      description: "Interactive interfaces that engage, delight, and convert users."
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Creative Direction",
      description: "Strategic vision that aligns creativity with business objectives."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Consultation",
      description: "Expert guidance to elevate your design and brand strategy."
    }
  ];

  return (
    <div className="min-h-screen relative">
      <Navigation />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 relative">
        <AnimatedHeroText />
        
        {/* Caution Button - Hidden Easter Egg */}
        <Link 
          to="/404" 
          className="absolute bottom-8 right-8 opacity-10 hover:opacity-100 transition-opacity duration-300 text-xs text-foreground/50 hover:text-gradient"
        >
          ⚠️
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gradient mb-6">
              Crafted Excellence
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Every pixel purposeful. Every interaction intentional. 
              Every design decision driven by insight and innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-8 glass rounded-2xl hover:bg-white/10 transition-all duration-500 glow-hover animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-gradient mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-gradient transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative">
        <div className="max-w-4xl mx-auto text-center glass p-12 rounded-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Ready to Transform?
          </h2>
          <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
            Let's create something extraordinary together. 
            Premium design solutions that elevate your brand and captivate your audience.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/contact"
              className="group flex items-center gap-2 px-8 py-4 bg-optra-gradient text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 glow-hover"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <Link 
              to="/work"
              className="px-8 py-4 border border-white/20 text-foreground font-semibold rounded-full hover:bg-white/5 transition-all duration-300 hover:border-white/40"
            >
              View Portfolio
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-sm text-foreground/50">
              Based in Bangalore • Response within 48 hours • Premium quality guaranteed
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
