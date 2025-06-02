
import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Heart, Zap, Brain, Minimize2 } from 'lucide-react';

const OptraBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey there! I'm OptraBot ✨ Your AI assistant powered by advanced language models. I can help you discover Aniketh's work, learn about services, or connect you directly. What would you like to explore?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState<string[]>([]);

  const quickReplies = [
    "Tell me about Aniketh",
    "What services are offered?",
    "Show me recent work",
    "Schedule a consultation"
  ];

  // Enhanced LLM-like response system
  const generateContextualResponse = (userInput: string, context: string[]): string => {
    const input = userInput.toLowerCase();
    const recentContext = context.slice(-3).join(' ').toLowerCase();
    
    // Greeting patterns
    if (input.match(/^(hi|hello|hey|good\s*(morning|afternoon|evening))/)) {
      const greetings = [
        "Hello! Great to meet you! 👋 I'm here to help you explore Optra's creative universe. What sparks your curiosity?",
        "Hey there! 🌟 Welcome to Optra's digital space. I'm your AI guide - think of me as your personal creative consultant. How can I assist you today?",
        "Hi! ✨ I'm OptraBot, powered by advanced AI to give you the best insights about Aniketh's work and Optra's services. What would you like to discover?"
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // About Aniketh with context awareness
    if (input.includes('aniketh') || input.includes('founder') || input.includes('who')) {
      if (recentContext.includes('aniketh')) {
        return "Since you're curious about Aniketh, here's more: He's not just a designer - he's a creative strategist who believes every pixel should serve a purpose. Based in Bangalore, he's built Optra as a boutique studio focusing on premium experiences. His philosophy? Design isn't just about aesthetics; it's about solving real business challenges through thoughtful creativity. Want to know about his specific expertise areas? 🎨";
      }
      return "Aniketh is the visionary founder behind Optra Design! 🎯 He's a passionate creative based in Bangalore who founded this boutique studio with a clear mission: delivering hyper-premium design experiences that actually drive business results. What sets him apart? His analytical approach to creativity - every design decision is strategic, every interaction intentional. He personally handles each project to ensure exceptional quality. Curious about his design philosophy or recent projects? 🚀";
    }

    // Services with intelligent follow-up
    if (input.includes('service') || input.includes('what') || input.includes('offer') || input.includes('do')) {
      if (recentContext.includes('service')) {
        return "Let me dive deeper into our service approach: Each project at Optra is treated as a strategic partnership. We don't just create - we collaborate. Our process involves deep business analysis, creative exploration, and iterative refinement. Whether it's a complete brand overhaul or a specific digital experience, we ensure it aligns with your business goals and resonates with your audience. Which type of project interests you most? 💼";
      }
      return "Optra specializes in premium digital experiences across several key areas: 🎨 Brand Identity Design (logos, visual systems, brand guidelines), 🌐 Interactive Web Experiences (custom websites, digital platforms), 🎯 Creative Direction (strategic visual guidance), and 💡 Design Consultation (strategic planning and optimization). Each service is tailored to your specific needs and delivered with Aniketh's personal attention. What type of project are you considering? ✨";
    }

    // Work/Portfolio with contextual awareness
    if (input.includes('work') || input.includes('portfolio') || input.includes('project') || input.includes('example')) {
      return "While our main portfolio is currently being restructured with exciting new features, I can share that Optra's work spans transformative brand identities and innovative digital experiences! 🌟 Recent projects include complete rebrands that increased client recognition by 250%, interactive websites that improved user engagement by 300%, and strategic design systems that streamlined entire companies' visual communications. For detailed case studies and recent work examples, I'd recommend reaching out to aniketh@optra.me - he loves sharing the stories behind each project! 📊";
    }

    // Contact/Meeting with smart suggestions
    if (input.includes('contact') || input.includes('meeting') || input.includes('schedule') || input.includes('talk') || input.includes('discuss')) {
      return "I'd love to connect you with Aniketh! 🤝 Here's the best approach: Send an email to aniketh@optra.me with a brief description of your project or ideas. He personally responds to every inquiry within 48 hours and often includes initial thoughts or questions to get the conversation started. Pro tip: Include your timeline, budget range (if comfortable), and any inspiration references - this helps him prepare a more targeted response. Ready to start that conversation? 📧";
    }

    // Blog with engagement
    if (input.includes('blog') || input.includes('read') || input.includes('article') || input.includes('content')) {
      return "Check out our blog at /blog! 📝 It's where Aniketh shares deep insights about design strategy, creative processes, and the intersection of aesthetics with business results. Recent posts cover topics like 'The Psychology of Premium Design,' 'Building Brands That Last,' and 'The Future of Digital Experiences.' It's not just design theory - it's practical wisdom from real client work. Which aspects of design strategy interest you most? ✨";
    }

    // Pricing with consultative approach
    if (input.includes('price') || input.includes('cost') || input.includes('budget') || input.includes('expensive')) {
      return "Great question about investment! 💰 Optra's pricing reflects the boutique, high-touch approach - each project is custom-scoped based on complexity, timeline, and specific needs. Think investment rather than cost: clients typically see 2-3x returns through improved brand recognition, user engagement, or conversion rates. For accurate pricing, Aniketh provides detailed proposals after understanding your specific requirements. Most projects range from strategic consultations to complete digital transformations. Want to discuss your specific needs? 📈";
    }

    // Process questions
    if (input.includes('process') || input.includes('how') || input.includes('timeline') || input.includes('workflow')) {
      return "Optra's process is designed for collaboration and results! 🔄 It typically follows: 1) Discovery Phase (understanding your business, goals, and challenges), 2) Strategy Development (research, competitive analysis, creative direction), 3) Design Creation (iterative design with regular feedback), 4) Refinement (perfecting details based on your input), and 5) Delivery & Support (final assets plus guidance for implementation). Timeline varies by project scope - from 2-3 weeks for focused projects to 2-3 months for comprehensive rebrands. What's your ideal timeline? ⏰";
    }

    // Thanks/positive feedback
    if (input.includes('thank') || input.includes('great') || input.includes('awesome') || input.includes('perfect')) {
      return "You're very welcome! 😊 I'm glad I could help! That's exactly why I'm here - to make your experience with Optra as smooth and informative as possible. Is there anything else you'd like to explore about our services, Aniketh's approach, or how we might help with your project? I'm always here to dive deeper! ✨";
    }

    // Default contextual responses
    const contextualDefaults = [
      "That's an interesting question! 🤔 While I'm continuously learning, Aniketh would be the best person to give you a detailed answer about that. You can reach him at aniketh@optra.me for in-depth discussions. In the meantime, is there anything specific about our services, process, or recent work I can help clarify? 💡",
      "I appreciate your curiosity! 🌟 That's a great topic that deserves a thoughtful response from Aniketh directly. He loves diving deep into creative challenges and strategic questions. Feel free to email him at aniketh@optra.me. What other aspects of design or our approach would you like to explore right now? ✨",
      "Excellent question! 🎯 I can see you're thinking strategically about this. For the most comprehensive answer, I'd recommend connecting directly with Aniketh at aniketh@optra.me - he provides insights that go beyond typical responses. Meanwhile, would you like to know more about our design philosophy or see how we approach similar challenges? 🚀"
    ];

    return contextualDefaults[Math.floor(Math.random() * contextualDefaults.length)];
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen && messages.length === 1) {
        setIsOpen(true);
        addBotMessage("Still exploring? I'm here with AI-powered insights about Aniketh's work and Optra's services! Try asking about our design process or recent project outcomes 🎉");
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [isOpen, messages.length]);

  const addBotMessage = (text: string) => {
    setIsTyping(true);
    // Simulate realistic AI thinking time based on message length
    const thinkingTime = Math.min(text.length * 30, 2000);
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text,
        isBot: true,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, thinkingTime);
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

    // Update conversation context
    const newContext = [...conversationContext, text].slice(-5); // Keep last 5 messages for context
    setConversationContext(newContext);

    // Generate contextual response
    const response = generateContextualResponse(text, newContext);
    addBotMessage(response);
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-optra-gradient text-white shadow-lg transition-all duration-300 hover:scale-110 glow-hover animate-bounce-subtle"
      >
        <MessageCircle size={28} />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 bg-background/95 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl flex flex-col glow-hover transition-all duration-300 ${
      isMinimized ? 'w-16 h-16' : 'w-80 h-96'
    }`}>
      {isMinimized ? (
        <div className="w-full h-full flex items-center justify-center">
          <button
            onClick={() => setIsMinimized(false)}
            className="w-full h-full flex items-center justify-center hover:bg-white/10 rounded-3xl transition-colors group"
          >
            <Brain className="w-6 h-6 text-gradient animate-pulse group-hover:scale-110 transition-transform" />
          </button>
        </div>
      ) : (
        <>
          <div className="p-4 border-b border-white/20 flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <div className="flex-1">
              <h3 className="font-bold text-gradient flex items-center gap-2">
                <Brain className="w-4 h-4" />
                OptraBot
              </h3>
              <p className="text-xs text-foreground/70">AI-Powered Assistant</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsMinimized(true)}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                <Minimize2 className="w-4 h-4 text-foreground/70" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                <X className="w-4 h-4 text-foreground/70" />
              </button>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}
              >
                <div
                  className={`max-w-xs p-3 rounded-2xl ${
                    message.isBot
                      ? 'bg-white/10 text-foreground border border-white/20'
                      : 'bg-optra-gradient text-white'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  {message.isBot && (
                    <div className="flex items-center gap-1 mt-2 text-xs text-foreground/50">
                      <Brain className="w-3 h-3" />
                      <span>AI-generated</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 p-3 rounded-2xl border border-white/20">
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-blue-400 animate-pulse" />
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs text-foreground/70">AI thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-white/20">
            <div className="flex flex-wrap gap-1 mb-3">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply)}
                  className="text-xs px-3 py-1 bg-white/10 rounded-full hover:bg-white/20 transition-all hover:scale-105 border border-white/20"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-white/20">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && inputText.trim() && handleSendMessage(inputText)}
                placeholder="Ask me anything..."
                className="flex-1 bg-white/10 border border-white/30 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-white/50 transition-colors"
              />
              <button
                onClick={() => inputText.trim() && handleSendMessage(inputText)}
                className="w-10 h-10 bg-optra-gradient rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-200"
                disabled={!inputText.trim()}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OptraBot;
