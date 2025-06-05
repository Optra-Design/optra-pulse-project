
import React, { useEffect } from 'react';
import Navigation from '../components/Navigation';
import AnimatedHeroText from '../components/AnimatedHeroText';
import SecretSudoButton from '../components/SecretSudoButton';
import { ArrowRight, Eye, Code2, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  useEffect(() => {
    // SEO meta tags
    document.title = 'Optra Design - Premium Design Studio by Aniketh | Brand Identity & Digital Experiences';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Optra Design is a premium design studio founded by Aniketh in Bangalore. We create distinctive brand identities, interactive digital experiences, and strategic creative direction that elevates your business.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Optra Design is a premium design studio founded by Aniketh in Bangalore. We create distinctive brand identities, interactive digital experiences, and strategic creative direction that elevates your business.';
      document.head.appendChild(meta);
    }

    // Keywords meta tag
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = 'design studio, brand identity, UI UX design, digital experiences, creative direction, Bangalore designer, Aniketh, Optra Design, web design, graphic design';
      document.head.appendChild(meta);
    }

    console.log(`
    🎨 Welcome to Optra Design's console!
    
    ╔═══════════════════════════════════════╗
    ║           OPTRA DESIGN               ║
    ║        Shape. Style. Scale.          ║
    ║         Founded by Aniketh           ║
    ╚═══════════════════════════════════════╝
    
    Try typing:
    - optra.sudo() for hidden features
    - optra.magic() for something special
    - optra.contact() for quick contact
    
    Built with ❤️ by Aniketh in Bangalore
    `);

    (window as any).optra = {
      sudo: () => {
        document.dispatchEvent(new CustomEvent('sudo-mode-toggle'));
        console.log('🔓 Sudo mode toggled! Welcome to the admin zone, Aniketh!');
      },
      magic: () => {
        document.body.classList.add('glitch');
        setTimeout(() => document.body.classList.remove('glitch'), 2000);
        console.log('✨ Magic activated by the founder!');
      },
      contact: () => {
        window.location.href = 'mailto:aniketh@optra.me';
        console.log('📧 Opening contact to Aniketh...');
      }
    };
  }, []);

  const capabilities = [
    {
      icon: <Eye className="w-7 h-7" />,
      title: "Visual Identity",
      description: "Comprehensive brand systems that capture essence and drive market recognition through strategic design."
    },
    {
      icon: <Code2 className="w-7 h-7" />,
      title: "Digital Products",
      description: "User-centered interfaces and interactions that convert visitors into customers through thoughtful UX."
    },
    {
      icon: <Layers className="w-7 h-7" />,
      title: "Creative Strategy",
      description: "Data-driven creative direction that aligns design decisions with measurable business outcomes."
    }
  ];

  return (
    <div className="min-h-screen relative bg-zinc-950">
      <Navigation />
      <SecretSudoButton />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 relative">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px'
          }} />
        </div>
        
        <AnimatedHeroText />
        
        {/* Minimal accent element */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="w-px h-16 bg-gradient-to-b from-zinc-600 to-transparent" />
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-gradient-to-r from-zinc-600 to-transparent" />
              <span className="text-sm font-medium text-zinc-400 tracking-wider uppercase">Capabilities</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-white leading-tight mb-6 max-w-3xl">
              Precision-crafted solutions that bridge the gap between 
              <span className="font-medium italic text-zinc-300"> vision and reality</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {capabilities.map((capability, index) => (
              <div 
                key={index}
                className="group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg group-hover:border-zinc-700 transition-colors">
                    <div className="text-zinc-400 group-hover:text-zinc-300 transition-colors">
                      {capability.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white mb-3 group-hover:text-zinc-200 transition-colors">
                      {capability.title}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed text-sm">
                      {capability.description}
                    </p>
                  </div>
                </div>
                <div className="h-px bg-gradient-to-r from-zinc-800 to-transparent group-hover:from-zinc-700 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Preview Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-px bg-gradient-to-r from-zinc-600 to-transparent" />
                <span className="text-sm font-medium text-zinc-400 tracking-wider uppercase">Recent Work</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-light text-white leading-tight mb-8">
                Projects that demonstrate our commitment to 
                <span className="font-medium italic text-zinc-300"> exceptional craft</span>
              </h2>
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-zinc-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Shriniketana School</h4>
                    <p className="text-zinc-400 text-sm">Complete brand identity and digital presence for educational institution</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-zinc-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Nyve Design</h4>
                    <p className="text-zinc-400 text-sm">
                      Social media marketing strategy - 
                      <a href="https://www.nyvedesign.com" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 transition-colors ml-1">
                        www.nyvedesign.com
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-zinc-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Enterprise Rebrand</h4>
                    <p className="text-zinc-400 text-sm">Complete visual identity overhaul resulting in 40% increase in brand recognition</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50" />
                
                {/* Nyve Design Screenshot Mockup */}
                <div className="absolute inset-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border border-zinc-700 overflow-hidden">
                  <div className="h-8 bg-zinc-800 border-b border-zinc-700 flex items-center px-4">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="ml-4 text-xs text-zinc-400">nyvedesign.com</div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-gradient-to-r from-orange-400 to-pink-400 rounded w-32"></div>
                    <div className="h-2 bg-zinc-600 rounded w-full"></div>
                    <div className="h-2 bg-zinc-700 rounded w-3/4"></div>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="h-16 bg-zinc-700 rounded"></div>
                      <div className="h-16 bg-zinc-700 rounded"></div>
                    </div>
                    <div className="h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded w-24 mt-4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 px-6 relative border-t border-zinc-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />
            <span className="text-sm font-medium text-zinc-400 tracking-wider uppercase">Get Started</span>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-light text-white leading-tight mb-8">
            Ready to elevate your brand?
          </h2>
          <p className="text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Let's discuss how we can transform your vision into a compelling digital presence that drives results.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              to="/contact"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-zinc-950 font-medium rounded-lg transition-all duration-200 hover:bg-zinc-100"
            >
              Start a Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            
            <Link 
              to="/services"
              className="inline-flex items-center gap-3 px-8 py-4 border border-zinc-800 text-zinc-300 font-medium rounded-lg transition-all duration-200 hover:border-zinc-700 hover:text-white"
            >
              View Services
            </Link>
          </div>

          <div className="mt-16 pt-8 border-t border-zinc-900">
            <p className="text-sm text-zinc-500">
              Aniketh • Bangalore • Response within 24 hours
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
