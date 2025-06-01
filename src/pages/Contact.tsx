
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project: '',
    timeline: '',
    budget: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct mailto URL
    const subject = encodeURIComponent(`Project Inquiry from ${formData.name}`);
    const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company}
Project Type: ${formData.project}
Timeline: ${formData.timeline}
Budget: ${formData.budget}

Message:
${formData.message}
    `);
    
    window.location.href = `mailto:aniketh@optra.me?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Navigation />
        <div className="text-center glass p-12 rounded-3xl max-w-md mx-4">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gradient mb-4">Thank You!</h2>
          <p className="text-foreground/70 mb-6">
            Your message has been sent. You'll hear back within 48 hours.
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="px-6 py-3 bg-optra-gradient text-white rounded-full hover:scale-105 transition-transform duration-300"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-6">
              Let's Create Together
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Ready to transform your vision into extraordinary reality? 
              Let's discuss your project and explore the possibilities.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="glass p-8 rounded-3xl">
              <h2 className="text-2xl font-bold text-gradient mb-6">Project Details</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 bg-white/5 border border-white/20 rounded-lg focus:border-white/40 focus:outline-none transition-colors duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 bg-white/5 border border-white/20 rounded-lg focus:border-white/40 focus:outline-none transition-colors duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full p-3 bg-white/5 border border-white/20 rounded-lg focus:border-white/40 focus:outline-none transition-colors duration-300"
                    placeholder="Your company name"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Project Type</label>
                    <select
                      name="project"
                      value={formData.project}
                      onChange={handleChange}
                      className="w-full p-3 bg-white/5 border border-white/20 rounded-lg focus:border-white/40 focus:outline-none transition-colors duration-300"
                    >
                      <option value="">Select type</option>
                      <option value="brand-identity">Brand Identity</option>
                      <option value="web-design">Web Design</option>
                      <option value="app-design">App Design</option>
                      <option value="consultation">Consultation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Timeline</label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full p-3 bg-white/5 border border-white/20 rounded-lg focus:border-white/40 focus:outline-none transition-colors duration-300"
                    >
                      <option value="">Select timeline</option>
                      <option value="asap">ASAP</option>
                      <option value="1-month">Within 1 month</option>
                      <option value="2-3-months">2-3 months</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Budget Range</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full p-3 bg-white/5 border border-white/20 rounded-lg focus:border-white/40 focus:outline-none transition-colors duration-300"
                  >
                    <option value="">Select range</option>
                    <option value="5k-10k">$5k - $10k</option>
                    <option value="10k-25k">$10k - $25k</option>
                    <option value="25k-50k">$25k - $50k</option>
                    <option value="50k+">$50k+</option>
                    <option value="discuss">Let's discuss</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Project Details *</label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-3 bg-white/5 border border-white/20 rounded-lg focus:border-white/40 focus:outline-none transition-colors duration-300 resize-none"
                    placeholder="Tell us about your project, goals, and vision..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full group flex items-center justify-center gap-2 p-4 bg-optra-gradient text-white font-semibold rounded-lg hover:scale-105 transition-all duration-300 glow-hover"
                >
                  Send Message
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="glass p-8 rounded-3xl">
                <h3 className="text-2xl font-bold text-gradient mb-6">Get in Touch</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-optra-gradient rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:aniketh@optra.me" className="text-foreground/70 hover:text-gradient transition-colors duration-300">
                        aniketh@optra.me
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-optra-gradient rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-foreground/70">Bangalore, India</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-optra-gradient rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Response Time</p>
                      <p className="text-foreground/70">Within 48 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass p-8 rounded-3xl">
                <h3 className="text-xl font-bold text-gradient mb-4">What to Expect</h3>
                <ul className="space-y-3 text-foreground/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Detailed project discussion and requirement analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Custom proposal with timeline and pricing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Collaborative design process with regular updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Exceptional results that exceed expectations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
