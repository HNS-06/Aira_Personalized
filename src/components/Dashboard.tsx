import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Terminal, BookOpen, Smartphone, LayoutGrid, Zap, Play, Square, RefreshCcw } from 'lucide-react';
import { useFocus } from '../FocusContext';

export default function Dashboard() {
  const { 
    activeState, 
    timeLeft, 
    totalDuration, 
    startFocus, 
    stopFocus, 
    stats,
    totalWorkTime,
    setTotalWorkTime
  } = useFocus();

  const [customTimeInput, setCustomTimeInput] = useState('');

  const handleSetTime = (mins: number) => {
    if (totalWorkTime === mins * 60) {
      setTotalWorkTime(0);
    } else {
      setTotalWorkTime(mins * 60);
      setCustomTimeInput('');
    }
  };

  const handleCustomTimeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mins = parseInt(customTimeInput);
    if (!isNaN(mins) && mins > 0) {
      setTotalWorkTime(mins * 60);
      setCustomTimeInput('');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = totalDuration > 0 ? ((totalDuration - timeLeft) / totalDuration) * 100 : 0;

  const getStateColor = () => {
    if (activeState === 'focus') return 'text-primary';
    if (activeState === 'break') return 'text-secondary';
    if (activeState === 'recovery') return 'text-warning';
    return 'text-slate-800';
  };

  const getStateLabel = () => {
    if (activeState === 'focus') return 'DEEP FOCUS ACTIVE';
    if (activeState === 'break') return 'NEURAL RECHARGE';
    if (activeState === 'recovery') return 'ADAPTIVE RECOVERY';
    return 'SYSTEM STANDBY';
  };

  return (
    <div className="grid grid-cols-12 gap-8">
      {/* Hero: AI Twin & Summary */}
      <section className="col-span-12 lg:col-span-7 flex flex-col gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="comic-panel rounded-lg p-8 bg-gradient-to-t from-slate-900 to-transparent shadow-[10px_10px_0_0_#000]"
        >
          <span className="label-tag bg-primary text-black">Aira Core v1.0</span>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="relative">
              <div className="w-48 h-48 rounded-full border-4 border-primary flex items-center justify-center bg-primary/10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/5 halftone opacity-30 group-hover:opacity-50 transition-opacity" />
                <div className="w-32 h-32 bg-primary/20 rounded-full border-2 border-white/40 flex items-center justify-center z-10 overflow-hidden">
                  <img 
                    alt="Aira Avatar" 
                    className="w-full h-full object-cover scale-110 grayscale rounded-full" 
                    src="/aira-avatar.png" 
                  />
                </div>
                <div className="absolute w-4 h-4 bg-white rounded-full animate-ping top-6 right-6" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                 <span className="px-2 py-0.5 bg-black text-secondary font-display text-[10px] font-black border border-secondary shadow-[2px_2px_0_0_#000]">LEVEL {stats.level}</span>
                 <h1 className="font-display text-4xl font-black text-white tracking-tighter uppercase italic leading-none">{stats.name || 'THE PROTAGONIST'}</h1>
              </div>
              <p className="font-sans text-[11px] text-slate-500 mb-6 font-black uppercase tracking-widest leading-relaxed">Neural Sync: 94% / Optimization Active / Biorhythm: High Peak</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="comic-panel bg-black/40 px-4 py-3 border border-white/10 rounded flex flex-col">
                  <span className="font-display text-[9px] uppercase font-black text-slate-500 mb-1">CUMULATIVE XP</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-xl font-black text-primary italic">{stats.xp.toLocaleString()}</span>
                    <span className="text-[10px] font-bold text-slate-600">/ {stats.xpToNextLevel.toLocaleString()}</span>
                  </div>
                </div>
                <div className="comic-panel bg-black/40 px-4 py-3 border border-white/10 rounded flex flex-col">
                  <span className="font-display text-[9px] uppercase font-black text-slate-500 mb-1">FOCUS STREAK</span>
                  <span className="font-display text-xl font-black text-secondary italic uppercase">{stats.streak} DAYS</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI Assistant Context Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="comic-panel rounded-lg p-6 flex items-center justify-between border-l-8 border-l-primary bg-slate-900 shadow-[10px_10px_0_0_#000]"
        >
          <span className="label-tag bg-primary text-black">Aira Context Engine</span>
          <div className="flex gap-4 items-center">
             <div className="w-12 h-12 bg-primary/20 border border-primary/40 rounded flex items-center justify-center text-primary">
                <Zap size={24} fill="currentColor" />
             </div>
             <div>
                <h3 className="font-display text-lg text-white font-black uppercase italic tracking-tight leading-none mb-1">"Peak Cognitive Window"</h3>
                <p className="text-[10px] font-bold text-primary font-sans uppercase tracking-[0.2em] leading-tight">Reduced session duration by 10m based on recent fatigue patterns.</p>
             </div>
          </div>
          <div className="hidden md:block text-right">
            <span className="font-display text-4xl font-black text-primary leading-none">+28%</span>
            <span className="block text-[8px] font-black text-slate-600 uppercase mt-1">focus efficiency</span>
          </div>
        </motion.div>
      </section>

      {/* Pomodoro Piece - Large Circular Timer */}
      <section className="col-span-12 lg:col-span-5">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="comic-panel rounded-lg p-10 flex flex-col items-center justify-center text-center h-full bg-slate-900 shadow-[10px_10px_0_0_#000]"
        >
          <span className="label-tag bg-secondary text-black italic">Aira Pomodoro Engine</span>
          
          <div className="relative w-72 h-72 flex items-center justify-center group mt-4">
            <div className={`absolute inset-0 blur-[50px] rounded-full transition-all duration-1000 ${
              activeState === 'focus' ? 'bg-primary/20' : activeState === 'break' ? 'bg-secondary/20' : 'bg-slate-900/10'
            }`} />
            <svg className="w-full h-full -rotate-90 drop-shadow-[0_0_20px_#000]">
              <circle 
                className="text-black" 
                cx="144" cy="144" r="130" 
                fill="transparent" 
                stroke="currentColor" strokeWidth="16" 
              />
              <motion.circle 
                initial={{ strokeDashoffset: 816.8 }}
                animate={{ strokeDashoffset: 816.8 - (816.8 * progress) / 100 }}
                transition={{ duration: 1, ease: "linear" }}
                className={getStateColor()} 
                cx="144" cy="144" r="130" 
                fill="transparent" 
                stroke="currentColor" strokeWidth="16" 
                strokeDasharray="816.8"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="font-display text-[10px] tracking-[0.4em] font-black text-slate-500 uppercase mb-4 leading-none">
                {getStateLabel()}
              </span>
              <span className="font-display text-7xl font-black text-white leading-none tracking-tighter drop-shadow-md italic">
                {activeState === 'idle' ? '25:00' : formatTime(timeLeft)}
              </span>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 w-full px-6">
            {activeState === 'idle' && (
              <div className="flex flex-col gap-2 mb-2">
                <div className="grid grid-cols-3 gap-2">
                  {[60, 120, 180].map((mins) => (
                    <button
                      key={mins}
                      onClick={() => handleSetTime(mins)}
                      className={`py-2 px-1 rounded border-2 font-display text-[9px] font-black uppercase tracking-widest transition-all ${
                        totalWorkTime === mins * 60 
                          ? 'bg-primary text-black border-black shadow-[2px_2px_0_0_#000]' 
                          : 'bg-black/40 text-slate-500 border-white/5 hover:border-primary/40'
                      }`}
                    >
                      {mins / 60} HOUR{mins > 60 ? 'S' : ''}
                    </button>
                  ))}
                </div>
                <form onSubmit={handleCustomTimeSubmit} className="flex gap-2 w-full mt-2">
                  <input
                    type="number"
                    min="1"
                    placeholder="CUSTOM MINS"
                    value={customTimeInput}
                    onChange={(e) => setCustomTimeInput(e.target.value)}
                    className="flex-1 bg-black/40 text-white font-display text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded border-2 border-white/5 focus:border-primary/40 outline-none w-full"
                  />
                  <button type="submit" className="bg-primary text-black font-display text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded shadow-[2px_2px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all">
                    SET
                  </button>
                </form>
              </div>
            )}
            {activeState === 'idle' ? (
              <button 
                onClick={() => startFocus()}
                className="bg-primary text-black font-display text-[12px] font-black uppercase tracking-[0.2em] py-5 rounded shadow-[6px_6px_0_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-3"
              >
                <Play size={18} fill="currentColor" /> START FOCUS SESSION
              </button>
            ) : (
              <button 
                onClick={stopFocus}
                className="bg-error text-black font-display text-[12px] font-black uppercase tracking-[0.2em] py-5 rounded shadow-[6px_6px_0_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-3"
              >
                <Square size={18} fill="currentColor" /> TERMINATE PROTOCOL
              </button>
            )}
            <div className="flex gap-4">
               <div className="flex-1 bg-black/40 border border-white/5 p-3 rounded flex flex-col">
                  <span className="text-[9px] font-black text-slate-600 uppercase">Aira Prediction</span>
                  <span className="text-sm font-black text-white italic">40m Deep Work</span>
               </div>
               <div className="flex-1 bg-black/40 border border-white/5 p-3 rounded flex flex-col">
                  <span className="text-[9px] font-black text-slate-600 uppercase">Focus Gain</span>
                  <span className="text-sm font-black text-secondary italic">+22% Efficiency</span>
               </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Grid Panels */}
      {[
        { label: 'Deep Work Hours', value: '6h 12m', progress: 70, color: 'text-primary', icon: Terminal, level: 'IMPROVED', bg: 'bg-primary' },
        { label: 'Cognitive Load', value: 'Moderate', progress: 45, color: 'text-secondary', icon: BookOpen, level: 'STABLE', bg: 'bg-secondary' },
        { label: 'Neural Recovery', value: 'High', progress: 90, color: 'text-error', icon: Smartphone, level: 'OPTIMAL', bg: 'bg-error' },
        { label: 'Weekly Growth', value: '+28%', progress: 82, color: 'text-warning', icon: LayoutGrid, level: 'TRENDING', bg: 'bg-warning' },
      ].map((panel, i) => (
        <motion.section 
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.1 }}
          className="col-span-12 md:col-span-6 lg:col-span-3"
        >
          <div className="comic-panel rounded-lg p-6 h-full bg-slate-900 shadow-[6px_6px_0_0_#000]">
            <span className={`label-tag ${panel.bg} text-black`}>{panel.level}</span>
            <div className="flex items-center justify-between mb-4 mt-2">
              <panel.icon className={panel.color} size={20} />
              <div className="w-20 h-1.5 p-0.5 bg-black overflow-hidden flex items-center border border-white/5">
                 <div className={`h-full ${panel.bg}`} style={{ width: `${panel.progress}%` }} />
              </div>
            </div>
            <h4 className="font-display text-[10px] font-black text-slate-600 mb-1 uppercase tracking-widest leading-none">{panel.label}</h4>
            <div className="font-display text-2xl font-black text-white uppercase italic tracking-tight">{panel.value}</div>
          </div>
        </motion.section>
      ))}

      {/* Action Item Overlay/Footer */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="col-span-12 bg-primary p-8 rounded border-4 border-black shadow-[10px_10px_0_0_#000] group cursor-pointer active:scale-[0.98] transition-all flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-full bg-black/5 halftone opacity-20" />
        <div className="bg-black text-primary p-5 rounded shadow-[6px_6px_0_0_#000] relative z-10">
          <Zap size={36} fill="currentColor" />
        </div>
        <div className="flex-1 relative z-10 text-center md:text-left">
          <h4 className="font-display text-xs font-black text-black/40 uppercase tracking-[0.3em] mb-2 leading-none">AIRA INTELLIGENCE HUB</h4>
          <p className="font-display text-3xl font-black text-black italic leading-none uppercase tracking-tighter">Enter deep flow session now for +28% efficiency gain?</p>
          <p className="text-[10px] font-bold text-black/60 uppercase mt-3 tracking-widest">Optimized duration: 35m / suggested based on recent behavior patterns</p>
        </div>
        <div className="flex gap-4 relative z-10">
           <button onClick={startFocus} className="bg-black text-white font-display text-[12px] font-black uppercase tracking-widest px-10 py-5 rounded shadow-[6px_6px_0_0_rgba(255,255,255,0.1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">INITIALIZE</button>
           <button className="bg-transparent border-2 border-black/20 text-black/60 font-display text-[12px] font-black uppercase tracking-widest px-10 py-5 rounded hover:bg-black/5 transition-all">DISMISS</button>
        </div>
      </motion.div>
    </div>
  );
}
