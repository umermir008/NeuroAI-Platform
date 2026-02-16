import { useState, useEffect, useRef } from 'react';
import {
  Bot, Zap, Globe, Shield, Activity, MessageSquare,
  ChevronRight, Play, Check, Menu, X, ArrowRight,
  Cpu, LayoutDashboard, Settings, User, BarChart3,
  Sparkles, Command, Mic, Send
} from 'lucide-react';

/**
 * NEXUS AI - ULTRA PREMIUM SAAS LANDING PAGE
 * * Architecture:
 * - Single file React component
 * - Tailwind CSS for utility classes
 * - Custom CSS injected via <style> for complex animations/glassmorphism
 * - No external CSS dependencies other than Tailwind CDN (assumed)
 */

// --- CUSTOM HOOKS ---

// Hook for scroll animations
const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
};

// Hook for mouse position (used for tilt cards and cursor)
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return mousePosition;
};

// --- SUB-COMPONENTS ---

const GlowingButton = ({ children, primary = false, icon: Icon, onClick }) => (
  <button
    onClick={onClick}
    className={`
      relative group overflow-hidden px-8 py-4 rounded-full font-semibold transition-all duration-300
      ${primary
        ? 'bg-white text-black hover:scale-105 shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]'
        : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/10 hover:border-white/30'}
    `}
  >
    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
    <span className="relative flex items-center gap-2">
      {children}
      {Icon && <Icon className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
    </span>
  </button>
);

const FeatureCard = ({ icon: Icon, title, description, delay }) => {
  return (
    <div
      className="group relative p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-cyan-500/50 hover:to-purple-500/50 transition-all duration-500 hover:-translate-y-2"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative h-full bg-slate-950/90 backdrop-blur-xl p-8 rounded-xl border border-white/5 group-hover:border-transparent transition-colors overflow-hidden">

        <div className="absolute -right-10 -top-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-400/20 transition-all" />

        <div className="mb-6 inline-flex p-3 rounded-lg bg-white/5 text-cyan-400 group-hover:scale-110 group-hover:text-white group-hover:bg-cyan-500 transition-all duration-300">
          <Icon size={24} />
        </div>

        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-200 transition-colors">{title}</h3>
        <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{description}</p>
      </div>
    </div>
  );
};

const ChatSimulator = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hello! I am Nexus. How can I optimize your workflow today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI processing
    setTimeout(() => {
      let response = "I've deployed a new agent to handle that task. It's running at 99.9% efficiency.";
      if (userMsg.toLowerCase().includes('data')) response = "Analyzing your datasets... I've identified a 40% growth opportunity in sector 7.";
      if (userMsg.toLowerCase().includes('code')) response = "Generating React components... Done. The clean code architecture is ready for review.";

      setMessages(prev => [...prev, { role: 'ai', text: response }]);
      setIsTyping(false);
    }, 1500);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px]">
      {/* Header */}
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-2 h-2 absolute top-0 right-0 bg-green-500 rounded-full animate-pulse" />
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center">
              <Sparkles size={14} className="text-white" />
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Nexus Core</h4>
            <p className="text-xs text-cyan-400">Online • v4.0.1</p>
          </div>
        </div>
        <Settings size={16} className="text-slate-400 hover:text-white cursor-pointer transition-colors" />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`
              max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed
              ${m.role === 'user'
                ? 'bg-blue-600 text-white rounded-br-none'
                : 'bg-white/10 text-slate-200 rounded-bl-none border border-white/5'}
            `}>
              {m.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/10 p-3 rounded-2xl rounded-bl-none border border-white/5 flex gap-1 items-center h-10">
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/5 bg-slate-900/50">
        <div className="relative flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Nexus to build something..."
            className="w-full bg-slate-950 border border-white/10 rounded-full py-3 pl-4 pr-24 text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-slate-600"
          />
          <div className="absolute right-2 flex items-center gap-1">
            <button className="p-2 hover:bg-white/10 rounded-full text-slate-400 transition-colors">
              <Mic size={16} />
            </button>
            <button
              onClick={handleSend}
              className="p-2 bg-blue-600 hover:bg-blue-500 rounded-full text-white transition-colors shadow-lg shadow-blue-500/20"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardPreview = () => (
  <div className="w-full max-w-5xl mx-auto bg-slate-900 border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-black/50">
    <div className="flex border-b border-white/5">
      <div className="w-64 border-r border-white/5 p-4 hidden md:block bg-slate-900/50">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-6 h-6 bg-cyan-500 rounded-md" />
          <span className="font-bold text-white">Workspace</span>
        </div>
        <div className="space-y-1">
          {['Overview', 'Agents', 'Analytics', 'Settings'].map((item, i) => (
            <div key={item} className={`p-2 rounded-lg text-sm cursor-pointer flex items-center gap-3 ${i === 0 ? 'bg-white/5 text-white' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>
              {[<LayoutDashboard size={16} />, <Bot size={16} />, <BarChart3 size={16} />, <Settings size={16} />][i]}
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 bg-slate-950/50">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-white font-medium">System Performance</h3>
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500" />
          </div>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Active Agents', val: '24', change: '+12%', color: 'text-cyan-400' },
            { label: 'Tasks Completed', val: '8.4k', change: '+32%', color: 'text-green-400' },
            { label: 'Processing Time', val: '1.2ms', change: '-5%', color: 'text-purple-400' }
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/5">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">{stat.label}</p>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-white">{stat.val}</span>
                <span className={`text-xs ${stat.color} bg-white/5 px-2 py-1 rounded`}>{stat.change}</span>
              </div>
              {/* Fake Chart */}
              <div className="mt-4 flex items-end gap-1 h-8">
                {[40, 60, 30, 80, 50, 90, 70].map((h, j) => (
                  <div key={j} className="flex-1 bg-white/10 rounded-t-sm hover:bg-cyan-500/50 transition-colors" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 pb-6">
          <div className="bg-white/5 rounded-xl p-4 border border-white/5 h-32 flex items-center justify-center text-slate-500 text-sm">
            Activity Graph Visualization
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---

const App = () => {
  const [loading, setLoading] = useState(true);
  const scrollY = useScrollAnimation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pricingYearly, setPricingYearly] = useState(true);
  const { x, y } = useMousePosition();

  // Initial Loader Effect
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-slate-950 flex items-center justify-center z-50">
        <div className="relative">
          <div className="w-16 h-16 border-t-2 border-b-2 border-cyan-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-cyan-500/20 rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="absolute mt-24 text-cyan-500 font-mono tracking-[0.2em] animate-pulse">INITIALIZING NEXUS...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 min-h-screen text-slate-300 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">

      {/* Styles for complex animations */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .glass-panel {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .text-gradient {
          background: linear-gradient(to right, #fff, #38bdf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .grid-bg {
          background-size: 50px 50px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
        }
      `}</style>

      {/* --- PROGRESS BAR --- */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 z-[100] transition-all duration-100"
        style={{ width: `${Math.min((scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)}%` }}
      />

      {/* --- BACKGROUND FX --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute inset-0 grid-bg opacity-20" />
      </div>

      {/* --- CURSOR FX (Desktop Only) --- */}
      <div
        className="fixed w-8 h-8 border border-cyan-500/50 rounded-full pointer-events-none z-[60] hidden md:block transition-transform duration-100 ease-out mix-blend-screen"
        style={{
          left: x - 16,
          top: y - 16,
          transform: `scale(${1 + (scrollY * 0.0005)})`
        }}
      >
        <div className="absolute inset-0 bg-cyan-500/20 blur-sm rounded-full" />
      </div>

      {/* --- NAVBAR --- */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'glass-panel py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-10 h-10 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-cyan-500/50 transition-all duration-300">
              <Bot className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">NEXUS</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {['Features', 'Solutions', 'Pricing', 'Docs'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium hover:text-cyan-400 transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm font-medium hover:text-white transition-colors">Log In</button>
            <GlowingButton primary icon={ChevronRight}>Get Started</GlowingButton>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full glass-panel border-t border-white/10 p-6 flex flex-col gap-4 animate-in slide-in-from-top-10">
            {['Features', 'Solutions', 'Pricing', 'Docs'].map((item) => (
              <a key={item} href="#" className="text-lg font-medium text-white py-2 border-b border-white/5">{item}</a>
            ))}
            <button className="w-full bg-cyan-600 text-white py-3 rounded-lg font-semibold mt-4">Get Started</button>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div className="space-y-8 animate-in fade-in slide-in-from-left-10 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-medium mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              Nexus 2.0 is live
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] tracking-tight">
              Build Intelligent <br />
              <span className="text-gradient">AI Agents</span> <br />
              in Minutes.
            </h1>

            <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
              Deploy autonomous multi-modal agents that understand, reason, and execute complex workflows. No Ph.D. required.
            </p>

            <div className="flex flex-wrap gap-4">
              <GlowingButton primary icon={Zap}>Start Building Free</GlowingButton>
              <GlowingButton icon={Play}>Watch Demo</GlowingButton>
            </div>

            <div className="pt-8 flex items-center gap-4 text-sm text-slate-500">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center text-xs text-white">
                    <User size={14} />
                  </div>
                ))}
              </div>
              <p>Trusted by 10,000+ developers</p>
            </div>
          </div>

          {/* Right Visual (Chat Mockup) */}
          <div className="relative animate-float lg:h-[600px] flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 to-purple-500/30 blur-[80px] rounded-full" />
            <ChatSimulator />

            {/* Floating Elements */}
            <div className="absolute -left-12 top-20 glass-panel p-4 rounded-xl flex items-center gap-3 animate-bounce shadow-xl hidden md:flex" style={{ animationDuration: '3s' }}>
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                <Check size={20} />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Task Completed</p>
                <p className="text-xs text-slate-400">0.4s response time</p>
              </div>
            </div>

            <div className="absolute -right-8 bottom-32 glass-panel p-4 rounded-xl flex items-center gap-3 animate-bounce shadow-xl hidden md:flex" style={{ animationDuration: '4s' }}>
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                <Activity size={20} />
              </div>
              <div>
                <p className="text-white font-bold text-sm">System Healthy</p>
                <p className="text-xs text-slate-400">99.9% uptime</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- LOGO STRIP --- */}
      <div className="border-y border-white/5 bg-black/20 backdrop-blur-sm py-10 overflow-hidden relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center mb-8 text-sm text-slate-500 font-medium tracking-widest uppercase">
          Powering the next generation of Tech
        </div>
        <div className="flex gap-16 justify-center opacity-40 grayscale hover:grayscale-0 transition-all duration-500 flex-wrap px-6">
          {/* Mock Logos */}
          {['ACME Corp', 'GlobalBank', 'Nebula', 'Vertex', 'Oculus'].map((logo, i) => (
            <span key={i} className="text-2xl font-bold font-mono tracking-tighter hover:text-white cursor-default transition-colors">{logo}</span>
          ))}
        </div>
      </div>

      {/* --- FEATURES GRID --- */}
      <section id="features" className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-cyan-400 font-bold tracking-wider uppercase text-sm mb-4">Features</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Intelligence beyond limits.</h3>
            <p className="text-slate-400 text-lg">Everything you need to build, deploy, and scale autonomous agents without managing infrastructure.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Cpu}
              title="Neural Engine"
              description="Proprietary large language models optimized for logical reasoning and code generation."
              delay={0}
            />
            <FeatureCard
              icon={Globe}
              title="Global Edge"
              description="Deploy your agents to 300+ edge locations instantly for sub-50ms latency worldwide."
              delay={100}
            />
            <FeatureCard
              icon={Shield}
              title="Enterprise Security"
              description="SOC2 Type II certified. End-to-end encryption for all memory and vector embeddings."
              delay={200}
            />
            <FeatureCard
              icon={MessageSquare}
              title="Multi-Modal Memory"
              description="Agents recall context from text, images, and audio across infinite session lengths."
              delay={300}
            />
            <FeatureCard
              icon={Command}
              title="API Integration"
              description="Connect to Notion, Slack, Linear, and Gmail with a single click via our marketplace."
              delay={400}
            />
            <FeatureCard
              icon={BarChart3}
              title="Real-time Analytics"
              description="Monitor token usage, cost, and agent success rates with granular observability."
              delay={500}
            />
          </div>
        </div>
      </section>

      {/* --- DASHBOARD PREVIEW --- */}
      <section className="py-20 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-slate-950 skew-y-3 transform origin-bottom-right z-0" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-16 md:flex justify-between items-end">
            <div className="max-w-2xl">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Complete observability.</h3>
              <p className="text-slate-400">Track every thought chain, tool execution, and token consumed.</p>
            </div>
            <div className="mt-6 md:mt-0">
              <button className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 font-medium">
                View Documentation <ArrowRight size={16} />
              </button>
            </div>
          </div>
          <DashboardPreview />
        </div>
      </section>

      {/* --- HOW IT WORKS (Carousel-ish) --- */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-4xl font-bold text-white mb-8">From idea to <br /> deployment in seconds.</h3>
              <div className="space-y-8">
                {[
                  { step: '01', title: 'Define Persona', desc: 'Set the tone, expertise, and constraints using natural language.' },
                  { step: '02', title: 'Connect Tools', desc: 'Grant access to your APIs, databases, or third-party SaaS apps.' },
                  { step: '03', title: 'Deploy & Scale', desc: 'Push to production with one click. We handle the GPU scaling.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group cursor-pointer">
                    <div className="text-4xl font-bold text-white/10 group-hover:text-cyan-500 transition-colors font-mono">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{item.title}</h4>
                      <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-l from-cyan-500/20 to-transparent blur-3xl" />
              <div className="glass-panel rounded-2xl p-8 relative border border-white/10 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <pre className="font-mono text-sm text-slate-300 overflow-x-auto">
                  {`const agent = new Nexus.Agent({
  name: "DevRel Bot",
  model: "nexus-gpt-4",
  tools: [Github, Discord, Linear],
  systemPrompt: \`
    You are a helpful assistant monitoring 
    community channels. Triage bugs 
    and draft responses.
  \`
});

await agent.deploy();
// 🚀 Agent is live at api.nexus.ai/devrel`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PRICING --- */}
      <section id="pricing" className="py-32 relative z-10 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Simple, transparent pricing.</h2>
            <div className="flex items-center justify-center gap-4">
              <span className={`text-sm ${!pricingYearly ? 'text-white font-medium' : 'text-slate-500'}`}>Monthly</span>
              <button
                onClick={() => setPricingYearly(!pricingYearly)}
                className="w-14 h-8 bg-white/10 rounded-full relative p-1 transition-colors hover:bg-white/20"
              >
                <div className={`w-6 h-6 bg-cyan-500 rounded-full shadow-lg transform transition-transform duration-300 ${pricingYearly ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
              <span className={`text-sm ${pricingYearly ? 'text-white font-medium' : 'text-slate-500'}`}>
                Yearly <span className="text-cyan-400 text-xs ml-1">(Save 20%)</span>
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Starter */}
            <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-all hover:-translate-y-2">
              <h3 className="text-xl font-bold text-white mb-2">Hobby</h3>
              <div className="text-4xl font-bold text-white mb-6">$0<span className="text-lg text-slate-500 font-normal">/mo</span></div>
              <ul className="space-y-4 mb-8 text-slate-400 text-sm">
                <li className="flex items-center gap-3"><Check size={16} className="text-cyan-500" /> 2 Agents</li>
                <li className="flex items-center gap-3"><Check size={16} className="text-cyan-500" /> 10k Tokens/mo</li>
                <li className="flex items-center gap-3"><Check size={16} className="text-cyan-500" /> Community Support</li>
              </ul>
              <button className="w-full py-3 rounded-lg bg-white/5 text-white font-medium hover:bg-white/10 transition-colors border border-white/5">Start Free</button>
            </div>

            {/* Pro */}
            <div className="relative p-[1px] rounded-2xl bg-gradient-to-b from-cyan-500 to-purple-600 transform md:-translate-y-4 shadow-[0_0_50px_-12px_rgba(6,182,212,0.3)]">
              <div className="bg-slate-950 p-8 rounded-2xl h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
                <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
                <div className="text-4xl font-bold text-white mb-6">
                  ${pricingYearly ? '39' : '49'}
                  <span className="text-lg text-slate-500 font-normal">/mo</span>
                </div>
                <ul className="space-y-4 mb-8 text-slate-300 text-sm">
                  <li className="flex items-center gap-3"><Check size={16} className="text-cyan-500" /> Unlimited Agents</li>
                  <li className="flex items-center gap-3"><Check size={16} className="text-cyan-500" /> 1M Tokens/mo</li>
                  <li className="flex items-center gap-3"><Check size={16} className="text-cyan-500" /> Priority Support</li>
                  <li className="flex items-center gap-3"><Check size={16} className="text-cyan-500" /> Advanced Analytics</li>
                </ul>
                <button className="w-full py-3 rounded-lg bg-cyan-500 text-white font-bold hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/25">Get Started</button>
              </div>
            </div>

            {/* Enterprise */}
            <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-all hover:-translate-y-2">
              <h3 className="text-xl font-bold text-white mb-2">Enterprise</h3>
              <div className="text-4xl font-bold text-white mb-6">Custom</div>
              <ul className="space-y-4 mb-8 text-slate-400 text-sm">
                <li className="flex items-center gap-3"><Check size={16} className="text-cyan-500" /> Custom Models</li>
                <li className="flex items-center gap-3"><Check size={16} className="text-cyan-500" /> On-Premise Deployment</li>
                <li className="flex items-center gap-3"><Check size={16} className="text-cyan-500" /> 24/7 Dedicated Support</li>
              </ul>
              <button className="w-full py-3 rounded-lg bg-white/5 text-white font-medium hover:bg-white/10 transition-colors border border-white/5">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-950 border-t border-white/10 pt-20 pb-10 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-cyan-600 rounded-lg flex items-center justify-center">
                  <Bot className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-bold text-white">NEXUS</span>
              </div>
              <p className="text-slate-400 max-w-sm">
                Empowering the next generation of automation. Built for developers who demand control, speed, and intelligence.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Product</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Agents</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Integrations</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Pricing</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Changelog</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">About</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Blog</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Careers</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors">Contact</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">© 2024 Nexus AI Inc. All rights reserved.</p>
            <div className="flex gap-6">
              {/* Social placeholders */}
              <div className="w-5 h-5 bg-slate-800 rounded-sm hover:bg-cyan-500 cursor-pointer transition-colors"></div>
              <div className="w-5 h-5 bg-slate-800 rounded-sm hover:bg-cyan-500 cursor-pointer transition-colors"></div>
              <div className="w-5 h-5 bg-slate-800 rounded-sm hover:bg-cyan-500 cursor-pointer transition-colors"></div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
