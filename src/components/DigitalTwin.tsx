import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Zap, Activity, Info, AlertOctagon, Sparkles, Ghost, ZapOff, MessageSquare } from 'lucide-react';
import { useFocus } from '../FocusContext';

type Emotion = 'focused' | 'overwhelmed' | 'distracted' | 'idle' | 'determined' | 'sighing';

interface EmotionConfig {
  label: string;
  color: string;
  bg: string;
  glow: string;
  message: string;
  icon: any;
  animationItems: string[];
}

const EMOTIONS: Record<Emotion, EmotionConfig> = {
  focused: {
    label: 'Deep Focus',
    color: 'text-secondary',
    bg: 'bg-secondary',
    glow: 'shadow-[0_0_30px_rgba(52,211,153,0.4)]',
    message: "Protocol Horizon is 100% synchronized. Your cognitive flow is at its peak.",
    icon: Sparkles,
    animationItems: ['bg-secondary/40', 'bg-secondary/20', 'bg-secondary/10']
  },
  determined: {
    label: 'Initializing Flow',
    color: 'text-secondary',
    bg: 'bg-secondary',
    glow: 'shadow-[0_0_40px_#00f5ff]',
    message: "Optimal window detected. Let's maximize this session. Protocol active.",
    icon: Zap,
    animationItems: ['bg-secondary/60', 'bg-secondary/30']
  },
  sighing: {
    label: 'Flow Interrupted',
    color: 'text-error',
    bg: 'bg-error',
    glow: 'shadow-[0_0_20px_#ff2d55]',
    message: "Neural link severed early. Efficiency loss recorded. Ready to recalibrate?",
    icon: ZapOff,
    animationItems: ['bg-error/20']
  },
  idle: {
    label: 'Standby',
    color: 'text-primary',
    bg: 'bg-primary',
    glow: 'shadow-[0_0_30px_rgba(124,58,237,0.4)]',
    message: "Systems ready. Standing by for neural focus command.",
    icon: Brain,
    animationItems: ['bg-primary/20', 'bg-primary/10']
  },
  overwhelmed: {
    label: 'Neural Overload',
    color: 'text-error',
    bg: 'bg-error',
    glow: 'shadow-[0_0_30px_rgba(255,45,85,0.4)]',
    message: "Warning: Cognitive buffers saturated. Efficiency dropping. Neural rest advised.",
    icon: ZapOff,
    animationItems: ['bg-error/40', 'bg-error/20', 'bg-error/10']
  },
  distracted: {
    label: 'Attention Drift',
    color: 'text-warning',
    bg: 'bg-warning',
    glow: 'shadow-[0_0_30px_rgba(251,191,36,0.4)]',
    message: "Irrelevant stimulus detected. Attention variance increasing. Anchor your focus.",
    icon: Ghost,
    animationItems: ['bg-warning/40', 'bg-warning/20', 'bg-warning/10']
  }
};

export default function DigitalTwin() {
  const { activeState, stats, startFocus, extendBreak } = useFocus();
  const [emotion, setEmotion] = useState<Emotion>('idle');
  const [insight, setInsight] = useState<string>('');
  const prevActiveState = useRef(activeState);

  useEffect(() => {
    // Micro-interactions based on state transitions
    if (prevActiveState.current === 'idle' && activeState === 'focus') {
      // Session Started - Determined reaction
      setEmotion('determined');
      setTimeout(() => setEmotion('focused'), 3000);
    } else if (prevActiveState.current === 'focus' && activeState === 'idle') {
      // Session Aborted/Stopped - Sigh reaction
      setEmotion('sighing');
      setTimeout(() => setEmotion('idle'), 4000);
    } else {
      if (activeState === 'focus') setEmotion('focused');
      else if (activeState === 'break') setEmotion('idle');
      else if (emotion !== 'sighing' && emotion !== 'determined') setEmotion('idle');
    }
    
    prevActiveState.current = activeState;
  }, [activeState, emotion]);

  // Generate context-aware insights
  useEffect(() => {
    const insights = [
      "Your focus score is 12% higher than yesterday. You're in a growth arc.",
      "Most distractions occur in the first 5 minutes. Push through the friction.",
      "Aira detected a 28% efficiency boost during your last morning session.",
      "Neural synchronization is highest when you maintain a hydration lock.",
      "You've completed 4 focus sprints today. One more for ELITE status."
    ];
    setInsight(insights[Math.floor(Math.random() * insights.length)]);
  }, [activeState]);

  const config = EMOTIONS[emotion] || EMOTIONS.idle;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
      {/* Left Avatar Column */}
      <section className="md:col-span-5 space-y-8">
        <motion.div 
          animate={{ borderColor: emotion === 'overwhelmed' ? 'rgba(251, 113, 133, 0.4)' : 'rgba(255, 255, 255, 0.05)' }}
          className="comic-panel p-10 rounded-lg bg-gradient-to-t from-slate-900 to-transparent flex flex-col items-center transition-colors duration-1000"
        >
          <span className={`label-tag ${config.bg} text-black font-black transition-colors duration-1000`}>
            Aira Avatar Status: {config.label}
          </span>
          <h2 className="font-display text-2xl font-black text-white mb-10 w-full italic uppercase">Neural Interface</h2>
          
          {/* Avatar Container */}
          <div className="relative group p-4 border-2 border-dashed border-white/5 rounded-full">
            {/* Background Particles/Cues */}
            <AnimatePresence>
              {config.animationItems.map((color, idx) => (
                <motion.div
                  key={`${emotion}-${idx}`}
                  initial={{ scale: 0.8, opacity: 0, x: 0, y: 0 }}
                  animate={{ 
                    scale: emotion === 'overwhelmed' ? [1, 1.5, 1.2, 1.8, 1] : [0.8, 1.2, 0.8], 
                    opacity: emotion === 'focused' ? [0, 0.2, 0] : [0, 0.4, 0],
                    x: emotion === 'distracted' ? [0, (idx - 1) * 30, (idx - 1) * -20, 0] : 0,
                    y: emotion === 'distracted' ? [0, (idx - 1) * -20, (idx - 1) * 30, 0] : 0,
                    rotate: emotion === 'overwhelmed' ? [0, 45, -45, 90, 0] : 0,
                  }}
                  transition={{ 
                    duration: emotion === 'overwhelmed' ? 0.5 : emotion === 'distracted' ? 5 : 3, 
                    repeat: Infinity, 
                    delay: idx * 0.4,
                    ease: "easeInOut"
                  }}
                  className={`absolute inset-0 rounded-full ${color} transition-all duration-1000 ${
                    emotion === 'focused' ? 'blur-2xl' : 
                    emotion === 'overwhelmed' ? 'blur-xl' : 'blur-3xl'
                  }`}
                />
              ))}
            </AnimatePresence>

            {/* Dialogue Bubble */}
            <AnimatePresence>
              {emotion === 'distracted' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0, y: 20 }}
                  className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white border-4 border-black p-4 rounded-xl shadow-[8px_8px_0_0_#000] z-40 w-max max-w-[220px]"
                >
                  <p className="font-display text-[11px] font-black text-black uppercase italic leading-tight text-center">
                    Attention drift detected. Re-anchoring focus now.
                  </p>
                  <div className="absolute -bottom-[10px] left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r-4 border-b-4 border-black rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              animate={{ 
                y: emotion === 'distracted' ? [0, -15, 5, -10, 0] : 
                   emotion === 'determined' ? [0, -20, 0, -10, 0] : // Nod/determined bounce
                   emotion === 'sighing' ? [0, 10, 0, 5, 0] : // Sigh sink
                   [0, -10, 0],
                x: emotion === 'overwhelmed' ? [-2, 2, -2, 2, 0] : 0,
                rotate: emotion === 'distracted' ? [0, 2, -2, 0] : 
                        emotion === 'sighing' ? [0, -2, 2, 0] :
                        [0, 1, 0, -1, 0],
                scale: emotion === 'determined' ? [1, 1.05, 1] :
                       emotion === 'sighing' ? [1, 0.98, 1] : 1
              }}
              transition={{ 
                duration: emotion === 'overwhelmed' ? 0.2 : 
                          emotion === 'determined' ? 0.5 :
                          emotion === 'sighing' ? 2 : 6, 
                repeat: (emotion === 'determined' || emotion === 'sighing') ? 1 : Infinity, 
                ease: "easeInOut" 
              }}
              className="relative z-10"
            >
              <img 
                alt="Active Digital Twin" 
                className={`w-56 h-56 object-contain transition-all duration-1000 ${
                  emotion === 'overwhelmed' ? 'invert sepia saturate-[5] hue-rotate-[320deg]' : 
                  emotion === 'distracted' ? 'sepia saturate-[0.5] hue-rotate-[20deg]' : 
                  emotion === 'determined' ? 'brightness-125' :
                  emotion === 'sighing' ? 'opacity-70 contrast-75' :
                  'grayscale'
                }`} 
                src="/aira-avatar.png" 
              />
            </motion.div>
          </div>

          {/* Comic Dialogue Bubble */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={emotion}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className="mt-12 bg-white text-black px-6 py-5 rounded shadow-[8px_8px_0_0_#000] relative border-3 border-black w-full"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-white border-t-3 border-l-3 border-black rotate-45" />
              <div className="flex gap-4 items-start">
                <config.icon className="shrink-0 mt-1" size={20} />
                <p className="font-display font-black text-black italic tracking-tighter text-sm uppercase leading-tight">
                  {config.message}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="w-full mt-12 space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-display text-[9px] font-black text-slate-500 uppercase tracking-widest">Focus Energy</span>
                <span className={`font-display text-[10px] font-black transition-colors duration-1000 ${config.color}`}>
                  {emotion === 'focused' ? '88%' : emotion === 'overwhelmed' ? '12%' : emotion === 'determined' ? '100%' : '45%'}
                </span>
              </div>
              <div className="w-full h-3 bg-black border border-white/10 p-0.5 rounded flex gap-0.5">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                  <motion.div 
                    key={s} 
                    animate={{ 
                      backgroundColor: (emotion === 'focused' && s <= 7) ? '#34d399' : 
                                      (emotion === 'overwhelmed' && s <= 1) ? '#fb7185' : 
                                      (emotion === 'determined' && s <= 8) ? '#00f5ff' :
                                      (emotion === 'distracted' && s <= 4) ? '#fbbf24' : '#1e293b'
                    }}
                    className="flex-1 rounded-sm transition-colors duration-1000" 
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Context Card */}
        <motion.div 
          animate={{ 
            backgroundColor: emotion === 'overwhelmed' ? 'rgba(251, 113, 133, 0.1)' : 'rgba(11, 14, 20, 0.6)',
            borderColor: emotion === 'overwhelmed' ? '#fb7185' : 'rgba(0, 245, 255, 0.2)'
          }}
          className={`comic-panel p-8 rounded-lg border-l-6 ${emotion === 'overwhelmed' ? 'border-l-error' : 'border-l-secondary'} bg-black/40 relative overflow-hidden shadow-[10px_10px_0_0_#000]`}
        >
          <span className={`label-tag ${emotion === 'overwhelmed' ? 'bg-error' : 'bg-secondary'} text-black border-2 border-black uppercase`}>
            {emotion === 'overwhelmed' ? 'Conflict Alert' : 'Neural Insight'}
          </span>
          <div className="flex items-start gap-4">
            <div className={`p-4 ${emotion === 'overwhelmed' ? 'bg-error' : 'bg-secondary'} text-black rounded shadow-[4px_4px_0_0_#000] transition-colors duration-1000`}>
              {emotion === 'overwhelmed' ? <AlertOctagon size={24} /> : <MessageSquare size={24} fill="currentColor" />}
            </div>
            <div className="flex-1">
              <h3 className="font-display text-lg font-black text-white mb-2 uppercase italic leading-none">
                {emotion === 'overwhelmed' ? 'Burnout Pattern Found' : 'Cognitive Behavioral Audit'}
              </h3>
              <AnimatePresence mode="wait">
                <motion.p 
                  key={insight}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="font-sans text-xs text-slate-400 font-bold leading-relaxed uppercase tracking-wide"
                >
                  {emotion === 'overwhelmed' ? 'Heart rate variability drop: 12% / Immediate rest recommended.' : insight}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
          <div className="mt-8 flex gap-3">
            <button onClick={() => extendBreak(5 * 60)} className="flex-1 py-3 bg-error text-black font-display text-[10px] font-black uppercase tracking-widest rounded shadow-[4px_4px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all">EXECUTE REST</button>
            <button className="flex-1 py-3 bg-slate-800 border-2 border-black text-white font-display text-[10px] font-black uppercase tracking-widest rounded shadow-[4px_4px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all">DENY</button>
          </div>
        </motion.div>
      </section>

      {/* Right Content Column */}
      <section className="md:col-span-7 space-y-8">
        <h2 className="font-display text-4xl font-black text-white italic uppercase tracking-tighter">Activity Stream</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <motion.div 
            whileHover={{ y: -2 }}
            className="comic-panel p-6 rounded-lg border-l-6 border-l-primary bg-slate-900"
          >
            <span className="label-tag bg-primary text-black">Neural Pattern</span>
            <h3 className="font-display text-lg font-black text-white mb-3 uppercase italic leading-none underline decoration-primary/40 underline-offset-4">Nocturnal Peak</h3>
            <p className="font-sans text-[11px] text-slate-400 font-bold uppercase leading-relaxed mb-4">Error reduction: 40% / Context: 10PM - 1AM window.</p>
            <div className="flex items-center gap-2 text-primary">
              <Activity size={12} />
              <span className="font-display text-[9px] font-black uppercase tracking-widest">Sync Efficiency Peak</span>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -2 }}
            className="comic-panel p-6 rounded-lg border-l-6 border-l-secondary bg-slate-900"
          >
            <span className="label-tag bg-secondary text-black">Bio Interaction</span>
            <h3 className="font-display text-lg font-black text-white mb-3 uppercase italic leading-none underline decoration-secondary/40 underline-offset-4">Hydration Link</h3>
            <p className="font-sans text-[11px] text-slate-400 font-bold uppercase leading-relaxed mb-4">Flow session delta: +15m / Correlation: Water intake 2L+.</p>
            <div className="flex items-center gap-2 text-secondary">
              <Zap size={12} />
              <span className="font-display text-[9px] font-black uppercase tracking-widest">Logic Correlated</span>
            </div>
          </motion.div>
        </div>

        {/* Strategic Actions Panel */}
        <div className="comic-panel p-10 rounded-lg bg-slate-900 relative">
          <span className="label-tag bg-primary text-black uppercase">Protocol Queue</span>
          <div className="flex items-center gap-5 mb-10">
            <div className="p-3 bg-primary text-black rounded shadow-[6px_6px_0_0_#000]">
              <Brain size={28} />
            </div>
            <h2 className="font-display text-2xl font-black text-white tracking-tighter uppercase italic">Initialized Commands</h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-black/40 rounded border-2 border-black hover:border-primary/50 transition-all flex flex-col sm:flex-row items-center justify-between gap-6 group">
              <div>
                <h4 className="font-display text-lg font-black text-white mb-1 uppercase italic">Deep Work: Horizon</h4>
                <p className="font-sans text-[11px] text-slate-400 font-bold uppercase">Predicted Optimal Window: T-45 Minutes.</p>
              </div>
              <button onClick={() => startFocus()} className="whitespace-nowrap px-8 py-4 bg-primary text-black font-display text-[10px] font-black uppercase tracking-widest rounded shadow-[6px_6px_0_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-3">
                INITIALIZE <Zap size={14} fill="currentColor" />
              </button>
            </div>

            <div className="p-6 bg-black/40 rounded border-2 border-black hover:border-secondary/50 transition-all flex flex-col sm:flex-row items-center justify-between gap-6 group">
              <div>
                <h4 className="font-display text-lg font-black text-white mb-1 uppercase italic">Mindfulness Reset</h4>
                <p className="font-sans text-[11px] text-slate-400 font-bold uppercase">Cortisol Delta Detected / High Load Alert.</p>
              </div>
              <button className="whitespace-nowrap px-8 py-4 bg-slate-800 border-2 border-black text-white font-display text-[10px] font-black uppercase tracking-widest rounded shadow-[6px_6px_0_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                RUN SEQUENCE
              </button>
            </div>
          </div>
          
          <div className="mt-10 pt-8 border-t border-slate-800 flex items-center gap-3 text-slate-600 uppercase font-black text-[9px] tracking-widest italic">
            <Info size={14} />
            <span>Logic: Pattern match "Flow Catalyst" enabled / Session: {emotion === 'overwhelmed' ? '999' : '382'}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
