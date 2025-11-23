import React, { useState, useEffect, useRef } from 'react';
// Removed external dependencies (gsap, three) to ensure compilation in preview
import { 
  Zap, 
  Palette, 
  Gamepad2, 
  TrendingUp, 
  ShieldCheck, 
  Globe, 
  ChevronRight, 
  Layers, 
  Cpu, 
  DollarSign,
  Menu,
  X,
  Wallet,
  Sparkles,
  RotateCcw,
  Flame,
  Crosshair,
  Target,
  LogOut,
  Code,
  Database
} from 'lucide-react';

// --- NATIVE CANVAS STARFIELD (No Three.js needed) ---
const StarField = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const stars = Array.from({ length: 150 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2,
      speed: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.5 ? '#10B981' : '#8B5CF6' // Green or Purple
    }));

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      stars.forEach(star => {
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        star.y += star.speed;
        if (star.y > height) star.y = 0;
      });
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-60" />;
};

// --- Reusable UI Components ---
const Button = ({ children, primary = false, onClick, className = "" }) => (
  <button 
    onClick={onClick}
    className={`
      px-6 py-3 rounded-lg font-bold tracking-wider transition-all duration-300 flex items-center gap-2 relative overflow-hidden group
      ${primary 
        ? 'bg-gradient-to-r from-purple-600 to-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]' 
        : 'bg-white/5 border border-white/10 text-white backdrop-blur-md'}
      ${className}
    `}
  >
    <span className="relative z-10 flex items-center gap-2">{children}</span>
    {/* Hover Shine Effect */}
    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
  </button>
);

const Badge = ({ text }) => (
  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 uppercase tracking-widest backdrop-blur-md">
    {text}
  </span>
);

const Section = ({ title, subtitle, children, id, dark = false }) => (
  <section id={id} className={`py-20 px-6 relative z-10 ${dark ? 'bg-black/40 backdrop-blur-sm' : ''}`}>
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 font-display uppercase tracking-tight">
          {title}
        </h2>
        {subtitle && <p className="text-gray-400 max-w-2xl mx-auto text-lg">{subtitle}</p>}
      </div>
      {children}
    </div>
  </section>
);

// --- ADVANCED WEAPON ENGINE WITH CSS ANIMATIONS ---
const GunPreview = ({ skinConfig, weaponType }) => {
  // We use a key to trigger CSS animations when weaponType changes
  const animationKey = weaponType; 

  const renderWeaponGeometry = () => {
    switch(weaponType) {
      case 'sniper':
        return (
          <g transform="translate(50, 50) scale(0.9)">
            <path className="animate-fly-in-left" style={{animationDelay: '0.1s'}} d="M0,200 L100,200 L120,170 L100,140 L0,140 Z" fill={skinConfig.stock} stroke="#111" strokeWidth="3" />
            <path className="animate-fly-in-top" style={{animationDelay: '0s'}} d="M100,140 L400,140 L420,190 L120,190 Z" fill={skinConfig.body} stroke="#111" strokeWidth="3" />
            <path className="animate-fly-in-bottom" style={{animationDelay: '0.2s'}} d="M130,190 L140,260 L180,260 L200,190 Z" fill={skinConfig.grip} stroke="#111" strokeWidth="3" />
            <path className="animate-fly-in-right" style={{animationDelay: '0.3s'}} d="M400,150 L800,150 L800,170 L400,170 Z" fill={skinConfig.barrel} stroke="#111" strokeWidth="3" />
            <rect className="animate-fade-scale" style={{animationDelay: '0.4s'}} x="180" y="90" width="200" height="40" rx="5" fill="#111" stroke="#333" />
            <path className="animate-fly-in-bottom" style={{animationDelay: '0.3s'}} d="M250,190 L240,240 L300,240 L310,190 Z" fill="#1a1a1a" stroke="#333" />
          </g>
        );
      case 'smg':
        return (
          <g transform="translate(150, 80)">
             <path className="animate-fly-in-left" style={{animationDelay: '0.1s'}} d="M0,150 L50,150 L50,220 L0,220 Z" fill={skinConfig.stock} stroke="#111" strokeWidth="3" />
             <path className="animate-fly-in-top" style={{animationDelay: '0s'}} d="M50,120 L300,120 L300,200 L50,200 Z" fill={skinConfig.body} stroke="#111" strokeWidth="3" />
             <path className="animate-fly-in-bottom" style={{animationDelay: '0.2s'}} d="M80,200 L90,280 L130,280 L120,200 Z" fill={skinConfig.grip} stroke="#111" strokeWidth="3" />
             <path className="animate-fly-in-bottom" style={{animationDelay: '0.3s'}} d="M220,200 L230,260 L260,260 L250,200 Z" fill={skinConfig.grip} stroke="#111" strokeWidth="3" />
             <path className="animate-fly-in-right" style={{animationDelay: '0.3s'}} d="M300,130 L400,130 L400,160 L300,160 Z" fill={skinConfig.barrel} stroke="#111" strokeWidth="3" />
             <rect className="animate-fly-in-bottom" style={{animationDelay: '0.4s'}} x="150" y="200" width="40" height="120" fill="#1a1a1a" stroke="#333" />
          </g>
        );
      case 'pistol':
        return (
          <g transform="translate(200, 50) scale(1.2)">
             <path className="animate-fly-in-bottom" style={{animationDelay: '0s'}} d="M50,150 L70,280 L130,280 L150,150 Z" fill={skinConfig.grip} stroke="#111" strokeWidth="3" />
             <path className="animate-fly-in-top" style={{animationDelay: '0.1s'}} d="M40,100 L300,100 L300,160 L40,160 Z" fill={skinConfig.body} stroke="#111" strokeWidth="3" />
             <rect className="animate-fly-in-right" style={{animationDelay: '0.2s'}} x="300" y="110" width="20" height="30" fill={skinConfig.barrel} stroke="#111" />
             <path className="animate-fade-scale" style={{animationDelay: '0.3s'}} d="M110,160 L110,200 L150,160 Z" fill="none" stroke="#333" strokeWidth="3" />
          </g>
        );
      case 'shotgun':
        return (
          <g transform="translate(50, 80)">
             <path className="animate-fly-in-left" style={{animationDelay: '0.1s'}} d="M0,200 L100,200 L120,160 L0,160 Z" fill={skinConfig.stock} stroke="#111" strokeWidth="3" />
             <path className="animate-fly-in-top" style={{animationDelay: '0s'}} d="M120,140 L350,140 L350,200 L120,200 Z" fill={skinConfig.body} stroke="#111" strokeWidth="3" />
             <path className="animate-fly-in-bottom" style={{animationDelay: '0.2s'}} d="M130,200 L150,260 L190,260 L170,200 Z" fill={skinConfig.grip} stroke="#111" strokeWidth="3" />
             <path className="animate-fly-in-right" style={{animationDelay: '0.3s'}} d="M350,150 L700,150 L700,170 L350,170 Z" fill={skinConfig.barrel} stroke="#111" strokeWidth="3" />
             <path className="animate-fly-in-bottom" style={{animationDelay: '0.4s'}} d="M350,175 L650,175 L650,190 L350,190 Z" fill="#222" stroke="#111" strokeWidth="2" />
          </g>
        );
      case 'ar':
      default:
        return (
          <g>
            <path className="animate-fly-in-left" style={{animationDelay: '0.1s'}} d="M50,250 L150,250 L180,200 L150,150 L50,150 C30,150 20,180 20,200 C20,220 30,250 50,250 Z" fill={skinConfig.stock} stroke="#111" strokeWidth="3" />
            <path className="animate-fly-in-top" style={{animationDelay: '0s'}} d="M150,150 L500,150 L520,220 L180,220 L150,150 Z" fill={skinConfig.body} stroke="#111" strokeWidth="3" />
            <path className="animate-fly-in-bottom" style={{animationDelay: '0.2s'}} d="M200,220 L220,300 L260,300 L280,220 Z" fill={skinConfig.grip} stroke="#111" strokeWidth="3" />
            <path className="animate-fly-in-bottom" style={{animationDelay: '0.3s'}} d="M350,220 L340,320 L400,330 L420,220 Z" fill="#1a1a1a" stroke="#333" strokeWidth="3" />
            <path className="animate-fly-in-right" style={{animationDelay: '0.4s'}} d="M500,160 L750,160 L750,180 L510,180 Z" fill={skinConfig.barrel} stroke="#111" strokeWidth="3" />
            <rect className="animate-fade-scale" style={{animationDelay: '0.5s'}} x="200" y="130" width="300" height="20" fill="#0f0f0f" stroke="#333" strokeWidth="2" />
            <rect className="animate-fade-scale" style={{animationDelay: '0.5s'}} x="220" y="110" width="10" height="20" fill="#333" />
            <rect className="animate-fade-scale" style={{animationDelay: '0.5s'}} x="480" y="110" width="10" height="20" fill="#333" />
          </g>
        );
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* Key forces re-render of animation when weapon changes */}
      <svg key={animationKey} viewBox="0 0 800 400" className="w-full h-auto drop-shadow-[0_0_30px_rgba(16,185,129,0.2)]">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          {/* PATTERNS */}
          <pattern id="carbonFiber" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
             <rect width="10" height="10" fill="#1f2937"/>
             <path d="M0 10L10 0M-2 2L2 -2M8 12L12 8" stroke="#374151" strokeWidth="1"/>
          </pattern>
          <pattern id="thunderPat" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
             <rect width="40" height="40" fill="#1e3a8a"/>
             <path d="M20,0 L10,20 L25,20 L15,40 L30,20 L15,20 L25,0 Z" fill="#facc15" opacity="0.8">
               <animate attributeName="opacity" values="0.8;0.4;0.8" duration="2s" repeatCount="indefinite" />
             </path>
          </pattern>
          <pattern id="scalesPat" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
             <rect width="20" height="20" fill="#7f1d1d"/>
             <circle cx="10" cy="10" r="8" fill="none" stroke="#ea580c" strokeWidth="1" opacity="0.6"/>
             <circle cx="20" cy="20" r="8" fill="none" stroke="#ea580c" strokeWidth="1" opacity="0.6"/>
          </pattern>
          <pattern id="camoPat" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
             <rect width="30" height="30" fill="#3f6212"/>
             <rect x="0" y="0" width="10" height="10" fill="#14532d"/>
             <rect x="10" y="10" width="10" height="10" fill="#84cc16" opacity="0.3"/>
             <rect x="20" y="20" width="5" height="5" fill="#14532d"/>
          </pattern>
        </defs>
        {renderWeaponGeometry()}
        <text x="750" y="380" textAnchor="end" fill="rgba(255,255,255,0.3)" fontSize="12" fontFamily="monospace">GUNMINT PROTOTYPE // {weaponType.toUpperCase()}</text>
      </svg>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // State
  const [currentWeapon, setCurrentWeapon] = useState('ar');
  const [activeTab, setActiveTab] = useState('presets');
  const [manualPart, setManualPart] = useState('body');
  
  const defaultSkin = { body: 'url(#carbonFiber)', stock: '#1f2937', barrel: '#111827', grip: '#374151', name: 'Default Issue' };
  const [currentSkin, setCurrentSkin] = useState(defaultSkin);

  const weapons = [
    { id: 'ar', name: 'Assault Rifle' },
    { id: 'sniper', name: 'Sniper AWP' },
    { id: 'smg', name: 'Vector SMG' },
    { id: 'shotgun', name: 'Heavy Shotgun' },
    { id: 'pistol', name: 'Tac Pistol' },
  ];

  const presets = [
    { id: 'thunder', name: "Zeus's Wrath", desc: "Animated Lightning", icon: <Zap className="text-yellow-400" />, config: { body: 'url(#thunderPat)', stock: '#1e3a8a', barrel: '#facc15', grip: '#1e3a8a', name: "Zeus's Wrath" } },
    { id: 'ninja', name: "Dragon's Breath", desc: "Ancient Scales", icon: <Flame className="text-orange-500" />, config: { body: 'url(#scalesPat)', stock: '#7f1d1d', barrel: '#450a0a', grip: '#ea580c', name: "Dragon's Breath" } },
    { id: 'military', name: "Forest Phantom", desc: "Digital Camo", icon: <ShieldCheck className="text-green-500" />, config: { body: 'url(#camoPat)', stock: '#14532d', barrel: '#3f6212', grip: '#14532d', name: "Forest Phantom" } },
    { id: 'tech', name: "Cyber Protocol", desc: "Carbon Fiber", icon: <Cpu className="text-cyan-400" />, config: { body: 'url(#carbonFiber)', stock: '#1f2937', barrel: '#06b6d4', grip: '#111827', name: "Cyber Protocol" } }
  ];

  const manualColors = [
    { name: 'Matte Black', hex: '#111827' }, { name: 'Titanium White', hex: '#F3F4F6' },
    { name: 'Gold', hex: '#F59E0B' }, { name: 'Ruby Red', hex: '#DC2626' },
    { name: 'Neon Green', hex: '#10B981' }, { name: 'Cyber Blue', hex: '#2563EB' },
    { name: 'Hot Pink', hex: '#EC4899' }, { name: 'Purple Haze', hex: '#9333EA' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden selection:bg-emerald-500 selection:text-black">
      {/* 3D BACKGROUND LAYER (Native Canvas) */}
      <StarField />

      {/* Global CSS for Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&family=Orbitron:wght@400;700;900&display=swap');
        .font-display { font-family: 'Orbitron', sans-serif; }
        .glass-panel { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.05); }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #111; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }

        /* Custom Animations usually handled by GSAP */
        @keyframes flyInLeft { from { transform: translateX(-50px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes flyInRight { from { transform: translateX(50px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes flyInTop { from { transform: translateY(-50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes flyInBottom { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes fadeScale { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }

        .animate-fly-in-left { animation: flyInLeft 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; opacity: 0; }
        .animate-fly-in-right { animation: flyInRight 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; opacity: 0; }
        .animate-fly-in-top { animation: flyInTop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; opacity: 0; }
        .animate-fly-in-bottom { animation: flyInBottom 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; opacity: 0; }
        .animate-fade-scale { animation: fadeScale 0.6s ease-out forwards; opacity: 0; }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#050505]/90 backdrop-blur-lg border-b border-white/10 py-4' : 'py-6 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-emerald-400 rounded flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)]">
              <Crosshair size={24} className="text-white" />
            </div>
            <span className="text-2xl font-display font-bold tracking-tighter">GUN<span className="text-emerald-400">MINT</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-300">
            <a href="#demo" className="hover:text-white transition-colors">Forge</a>
            <a href="#system" className="hover:text-white transition-colors">System</a>
            <a href="#business" className="hover:text-white transition-colors">Rewards</a>
          </div>
          <div className="hidden md:block">
            <Button className="text-sm px-4 py-2 bg-white/5 hover:bg-purple-600/20 border-purple-500/30">
              <Wallet size={16} className="mr-2" /> Connect Wallet
            </Button>
          </div>
          <button className="md:hidden z-50" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl pt-24 px-6 flex flex-col gap-6">
           <a href="#demo" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-display">Forge</a>
           <a href="#system" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-display">System</a>
           <a href="#business" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-display">Rewards</a>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-6 overflow-hidden min-h-[60vh] flex items-center z-10">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-scale" style={{animationDelay: '0s'}}>
            <div className="hero-text"><Badge text="Powered by Solana" /></div>
            <h1 className="hero-text text-5xl md:text-7xl font-display font-black leading-[0.9]">
              MINT YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-emerald-400">ARSENAL</span>
            </h1>
            <p className="hero-text text-xl text-gray-400 leading-relaxed max-w-lg">
              The ultimate decentralized foundry. Choose from 5 weapon classes, apply legendary textures, or hand-paint your loadout.
            </p>
            <div className="hero-text flex flex-col sm:flex-row gap-4">
              <Button primary onClick={() => document.getElementById('demo').scrollIntoView({behavior: 'smooth'})} className="hero-btn">
                Start Forging <ChevronRight size={20} />
              </Button>
              <Button className="hero-btn">View Whitepaper</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Foundry Section */}
      <Section id="demo" title="The Foundry" subtitle="Select your weapon chassis and apply custom finishes.">
        <div className="bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row h-auto lg:h-[750px]">
          
          {/* Interactive Canvas */}
          <div className="flex-1 p-8 lg:p-12 flex flex-col bg-gradient-to-b from-gray-900/50 to-black/80 relative min-h-[400px]">
             
             {/* HEADER ROW: Info & Reset (Now using Flexbox to prevent overlap) */}
             <div className="w-full flex justify-between items-start mb-6 z-10">
               <div className="text-xs font-mono text-emerald-500 opacity-70 leading-relaxed">
                 SYSTEM: ONLINE <span className="hidden sm:inline">//</span> <br className="sm:hidden" />
                 WEAPON: {currentWeapon.toUpperCase()} <span className="hidden sm:inline">//</span> <br className="sm:hidden" />
                 SKIN: {currentSkin.name.toUpperCase()}
               </div>
               
               <button onClick={() => setCurrentSkin(defaultSkin)} className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors" title="Reset">
                  <RotateCcw size={20} />
               </button>
             </div>

             {/* Weapon Selector */}
             <div className="w-full flex justify-start md:justify-center gap-2 mb-8 z-10 overflow-x-auto pb-4 custom-scrollbar">
                {weapons.map(w => (
                  <button 
                    key={w.id}
                    onClick={() => setCurrentWeapon(w.id)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex-shrink-0 ${currentWeapon === w.id ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 scale-105' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                  >
                    {w.name}
                  </button>
                ))}
             </div>
             
             {/* GUN PREVIEW (Animated via CSS) */}
             <div className="flex-1 flex items-center justify-center relative z-0">
               <GunPreview skinConfig={currentSkin} weaponType={currentWeapon} />
             </div>
          </div>

          {/* Controls Panel */}
          <div className="w-full lg:w-[450px] bg-[#111] p-8 border-l border-white/10 flex flex-col gap-6 overflow-y-auto custom-scrollbar">
            
            {/* Tabs */}
            <div className="flex p-1 bg-black/40 rounded-lg shrink-0">
              <button onClick={() => setActiveTab('presets')} className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'presets' ? 'bg-gray-800 text-white shadow' : 'text-gray-500 hover:text-gray-300'}`}>Legendary Presets</button>
              <button onClick={() => setActiveTab('manual')} className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'manual' ? 'bg-gray-800 text-white shadow' : 'text-gray-500 hover:text-gray-300'}`}>Manual Paint</button>
            </div>

            {/* Panel Content */}
            {activeTab === 'presets' ? (
              <div className="grid gap-4">
                <div className="flex items-center gap-2 mb-2"><Sparkles className="text-purple-400" size={18} /><h3 className="text-sm font-bold text-gray-400 uppercase">Apply Texture Pack</h3></div>
                {presets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setCurrentSkin({...preset.config})}
                    className={`relative overflow-hidden group p-1 rounded-xl transition-all duration-300 text-left border ${currentSkin.name === preset.name ? 'border-emerald-500 bg-white/5' : 'border-white/5 hover:border-white/20'}`}
                  >
                    <div className="flex items-center gap-4 p-3 relative z-10">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 bg-[#050505] border border-white/10 group-hover:scale-110 transition-transform`}>{preset.icon}</div>
                      <div>
                        <h4 className="font-bold text-white group-hover:text-emerald-400 transition-colors font-display tracking-wide">{preset.name}</h4>
                        <p className="text-xs text-gray-500 uppercase tracking-wider">{preset.desc}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                 <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">1. Select Component</label>
                    <div className="grid grid-cols-2 gap-2">{['body', 'barrel', 'stock', 'grip'].map(part => (<button key={part} onClick={() => setManualPart(part)} className={`p-3 rounded text-sm font-medium uppercase transition-all ${manualPart === part ? 'bg-white text-black' : 'bg-white/5 text-gray-400'}`}>{part}</button>))}</div>
                 </div>
                 <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">2. Apply Paint</label>
                    <div className="grid grid-cols-4 gap-3">{manualColors.map((color) => (<button key={color.name} onClick={() => setCurrentSkin(prev => ({...prev, [manualPart]: color.hex, name: 'Custom Forged'}))} className="w-full pt-[100%] rounded-lg relative overflow-hidden ring-1 ring-white/10 hover:ring-white transition-all" style={{backgroundColor: color.hex}}></button>))}</div>
                 </div>
              </div>
            )}

            <div className="pt-6 mt-auto border-t border-white/10">
              <div className="flex justify-between items-end mb-4">
                <div><p className="text-xs text-gray-500">Mint Price</p><p className="text-lg font-bold text-white">0.0001 SOL</p></div>
                <div className="text-right"><p className="text-xs text-gray-500">Pattern</p><p className="text-lg font-bold text-purple-400">{currentSkin.name === 'Custom Forged' ? 'CUSTOM' : 'LEGENDARY'}</p></div>
              </div>
              <Button primary className="w-full justify-center">Mint {currentWeapon.toUpperCase()} Skin</Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Ecosystem Section */}
      <Section id="system" title="The Ecosystem" subtitle="How GunMint connects creativity to earnings.">
        <div className="grid md:grid-cols-4 gap-6">
           {[
             { title: "1. Forge", icon: <Zap size={32} className="text-yellow-400"/>, desc: "Design skins using our on-chain SVGs." },
             { title: "2. Mint", icon: <Database size={32} className="text-emerald-400"/>, desc: "Mint as Compressed NFT (cNFT) for $0.0005." },
             { title: "3. Integrate", icon: <Code size={32} className="text-blue-400"/>, desc: "Use Unity SDK to load skin into games." },
             { title: "4. Earn", icon: <DollarSign size={32} className="text-purple-400"/>, desc: "Rent or Sell your assets on the open market." },
           ].map((step, i) => (
             <div key={i} className="bg-[#111]/80 backdrop-blur-md p-6 rounded-2xl border border-white/5 relative group hover:-translate-y-2 transition-transform duration-300">
               <div className="absolute top-4 right-4 text-4xl font-black text-white/5 group-hover:text-white/10 transition-colors">{i+1}</div>
               <div className="mb-4 bg-white/5 w-14 h-14 rounded-xl flex items-center justify-center">{step.icon}</div>
               <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
               <p className="text-gray-400 text-sm">{step.desc}</p>
             </div>
           ))}
        </div>
      </Section>

      <footer className="border-t border-white/10 py-12 bg-black relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center md:text-left">
          <span className="text-2xl font-display font-bold tracking-tighter block mb-2">GUN<span className="text-emerald-400">MINT</span></span>
          <p className="text-gray-500 text-sm">Decentralized Asset Foundry. Built on Solana.</p>
        </div>
      </footer>
    </div>
  );
}