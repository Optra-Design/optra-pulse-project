
import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

const OptraBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey there! I'm OptraBot ✨ I can help you discover our services, share the founder's story, or schedule a meeting. What interests you?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickReplies = [
    "Tell me about your services",
    "Who's the founder?",
    "Schedule a meeting",
    "Show me your work",
    "Pricing information"
  ];

  const botResponses: { [key: string]: string } = {
    "services": "Optra specializes in premium digital design and branding! We offer brand identity design, digital experiences, creative direction, and strategic consultation. Each project is crafted with meticulous attention to detail. What specific service interests you? 🎨",
    "founder": "Optra is the passion project of a solo founder based in Bangalore! Our founder believes in the power of exceptional design to transform businesses and create lasting impact. The studio was born from a vision to deliver hyper-premium experiences that truly matter. ✨",
    "meeting": "I'd love to help you schedule a meeting! For the fastest response, reach out to aniketh@optra.me - you'll hear back within 48 hours. Or feel free to share your project details here and I'll make sure they reach the right person! 📅",
    "work": "Our portfolio showcases transformative brand identities and digital experiences that drive results. Each project tells a unique story of creativity meeting strategy. Check out our Work page to see how we've helped brands shape, style, and scale! 🚀",
    "pricing": "Every project is unique, so we provide custom quotes based on your specific needs and goals. Reach out to aniketh@optra.me with your project details for a personalized proposal. Premium quality deserves premium attention! 💎"
  };

  useEffect(() => {
    // Re-engage inactive users
    const timer = setTimeout(() => {
      if (!isOpen) {
        setIsOpen(true);
        addBotMessage("Still there? I noticed you might need some design inspiration. How can Optra help bring your vision to life? 🌟");
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const addBotMessage = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text,
        isBot: true,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSendMessage = (text: string) => {
    const userMessage = {
      id: Date.now(),
      text,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simple keyword matching for responses
    const lowercaseText = text.toLowerCase();
    let responseKey = '';

    if (lowercaseText.includes('service') || lowercaseText.includes('what') || lowercaseText.includes('do')) {
      responseKey = 'services';
    } else if (lowercaseText.includes('founder') || lowercaseText.includes('who') || lowercaseText.includes('about')) {
      responseKey = 'founder';
    } else if (lowercaseText.includes('meeting') || lowercaseText.includes('schedule') || lowercaseText.includes('contact')) {
      responseKey = 'meeting';
    } else if (lowercaseText.includes('work') || lowercaseText.includes('portfolio') || lowercaseText.includes('project')) {
      responseKey = 'work';
    } else if (lowercaseText.includes('price') || lowercaseText.includes('cost') || lowercaseText.includes('quote')) {
      responseKey = 'pricing';
    } else {
      addBotMessage("That's a great question! For detailed information, I'd recommend reaching out to aniketh@optra.me. Meanwhile, feel free to explore our services or check out our portfolio. How else can I help you today? 😊");
      return;
    }

    addBotMessage(botResponses[responseKey]);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-optra-gradient text-white shadow-lg transition-all duration-300 hover:scale-110 glow-hover ${
          isOpen ? 'rotate-180' : ''
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 h-96 bg-background/95 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl flex flex-col animate-slide-in-right">
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <div>
              <h3 className="font-semibold text-gradient">OptraBot</h3>
              <p className="text-xs text-foreground/60">Always here to help</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-2xl ${
                    message.isBot
                      ? 'bg-white/10 text-foreground'
                      : 'bg-optra-gradient text-white'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 p-3 rounded-2xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Replies */}
          <div className="p-2 border-t border-white/10">
            <div className="flex flex-wrap gap-1 mb-2">
              {quickReplies.slice(0, 3).map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(reply)}
                  className="text-xs px-2 py-1 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-200"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && inputText.trim() && handleSendMessage(inputText)}
                placeholder="Ask me anything..."
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-white/40"
              />
              <button
                onClick={() => inputText.trim() && handleSendMessage(inputText)}
                className="w-10 h-10 bg-optra-gradient rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-200"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OptraBot;
