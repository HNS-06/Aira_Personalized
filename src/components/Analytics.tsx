import { motion } from 'motion/react';
import { TrendingUp, BookText, ArrowRight, Activity, AlertTriangle, Zap } from 'lucide-react';
import { useFocus } from '../FocusContext';

export default function Analytics() {
  const { stats } = useFocus();

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Header */}
      <section>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="inline-block px-4 py-1 bg-secondary text-black rounded font-display text-[10px] font-black uppercase tracking-widest mb-4 border-2 border-black shadow-[2px_2px_0_0_#000]">INTELLIGENCE REPORT: {new Date().getFullYear()}</span>
            <h1 className="font-display text-5xl font-black text-white mb-2 tracking-tighter uppercase italic leading-none">Cognitive Analytics</h1>
            <p className="font-sans text-sm text-slate-400 max-w-2xl font-bold uppercase tracking-tight">Systematic review of your deep work arc / Aira Sync active</p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-3 bg-secondary text-black font-display text-[10px] font-black uppercase tracking-widest rounded shadow-[4px_4px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all">WEEKLY SUMMARY</button>
            <button className="px-6 py-3 bg-slate-800 border-2 border-black text-white font-display text-[10px] font-black uppercase tracking-widest rounded shadow-[4px_4px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all">SHARE PERFORMANCE</button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Chart Panel */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="col-span-12 lg:col-span-8 comic-panel rounded-lg p-8 bg-slate-900 border-l-6 border-l-primary shadow-[10px_10px_0_0_#000]"
        >
          <span className="label-tag bg-primary text-black italic font-black uppercase">Deep Flow Analytics</span>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 mt-6 gap-4">
            <h2 className="font-display text-2xl font-black text-white uppercase italic tracking-tight">Focus Mastery Gradient</h2>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-secondary rounded-full shadow-[0_0_10px_#34d399]" />
                <span className="font-display text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Aira Optimized Path</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_#60a5fa]" />
                <span className="font-display text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Baseline Noise</span>
              </div>
            </div>
          </div>
          
          {/* SVG Graph Placeholder */}
          <div className="h-64 flex items-end justify-between gap-2 border-b-2 border-black relative mt-12 bg-black/60 rounded-lg p-4 shadow-inner overflow-hidden">
            <div className="absolute inset-0 halftone opacity-10 pointer-events-none" />
            <svg className="absolute inset-0 w-full h-full p-4" preserveAspectRatio="none">
              <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                d="M0 180 Q 200 120, 400 160 T 800 80 T 1200 120" 
                fill="none" 
                stroke="#34d399" 
                strokeWidth="10" 
                strokeLinecap="round" 
                className="opacity-80"
              />
              <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.2, ease: "easeInOut" }}
                d="M0 220 Q 250 180, 500 200 T 1000 240 T 1200 210" 
                fill="none" 
                stroke="#60a5fa" 
                strokeWidth="4" 
                strokeLinecap="round" 
                className="opacity-40"
              />
            </svg>
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
              <span key={day} className="font-display text-[9px] font-black text-slate-600 tracking-widest relative z-10">{day}</span>
            ))}
          </div>
        </motion.div>

        {/* Narrative Side Card */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="col-span-12 lg:col-span-4 comic-panel rounded-lg p-8 border-l-6 border-l-secondary bg-slate-900 shadow-[10px_10px_0_0_#000]"
        >
          <span className="label-tag bg-secondary text-black italic uppercase font-black">Aira Behavioral Audit</span>
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-secondary p-3 rounded text-black shadow-[4px_4px_0_0_#000]">
                 <BookText size={24} fill="currentColor" />
              </div>
              <h3 className="font-display text-xl font-black text-white uppercase italic tracking-tighter">Growth Trajectory</h3>
            </div>
            <div className="relative mb-8 aspect-video rounded border-3 border-black overflow-hidden group shadow-[6px_6px_0_0_#000]">
               <div className="absolute inset-0 bg-secondary/10 z-10" />
              <img 
                className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-110" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnszTVb4_B8UmrHPVlivz5UcMXkd4Yx44knuYertahX-H3c9RsFb-jHsh40q3fzx3I5TzCCOfRYZMgmFFpILMN46qHvSCrThkrrV8Z2TaabkApWyDEIDG1V3c4M0G3q91eeTf3rLGJGEveL0gbHEArXO6zB1euolDwgyotDkri3W4D5G72ywCD7w45xjE196uuZbGHLcs8nFYS3kj3XKnyslqVXLVeyntinLIkAoEF2ZWwQE3ds6bZETCd9qha9zT53eCeo5WRSkJP" 
                alt="Narrative style" 
              />
            </div>
            <div className="bg-black/60 p-6 rounded border-2 border-black">
               <p className="font-sans text-[11px] text-slate-300 font-bold italic uppercase leading-relaxed tracking-wider">
                "System identified a 32% creative efficiency gain during your nocturnal window. Aira recommends shifting heavy synthesis tasks to 10 PM."
              </p>
            </div>
          </div>
          <button className="w-full mt-10 py-5 bg-primary text-black transition-all font-display text-[11px] font-black uppercase tracking-widest rounded shadow-[6px_6px_0_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none flex items-center justify-center gap-3 group">
            GENERAL NEURAL REPORT
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" strokeWidth={3} />
          </button>
        </motion.div>

        {/* Small Metrics Row */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="comic-panel rounded-lg p-6 flex flex-col items-center text-center bg-slate-900 border-t-6 border-t-secondary">
            <span className="label-tag bg-secondary text-black">Restore State</span>
            <div className="text-4xl font-display font-black text-secondary mb-3 italic">84%</div>
            <div className="h-4 w-full bg-black p-1 border border-white/10 rounded flex">
              <div className="h-full bg-secondary" style={{ width: '84%', backgroundImage: 'linear-gradient(90deg, transparent 75%, rgba(0,0,0,0.3) 75%)', backgroundSize: '8px 100%' }} />
            </div>
            <p className="font-display text-[9px] font-black text-slate-500 mt-4 uppercase tracking-widest leading-none">Sleep Efficiency Optimized</p>
          </div>

          <div className="comic-panel rounded-lg p-6 border-t-6 border-t-error flex flex-col items-center text-center bg-error/10">
            <span className="label-tag bg-error text-black">System Alert</span>
            <div className="text-4xl font-display font-black text-error mb-3 italic uppercase tracking-tighter">Critical</div>
            <div className="h-4 w-full bg-black p-1 border border-white/10 rounded flex">
              <div className="h-full bg-error" style={{ width: '92%', backgroundImage: 'linear-gradient(90deg, transparent 75%, rgba(0,0,0,0.3) 75%)', backgroundSize: '8px 100%' }} />
            </div>
            <p className="font-display text-[9px] font-black text-error/80 mt-4 uppercase tracking-widest leading-none flex items-center gap-2">
              <AlertTriangle size={10} /> Stress threshold reached
            </p>
          </div>

          <div className="comic-panel rounded-lg p-6 flex flex-col items-center text-center bg-slate-900 border-t-6 border-t-primary">
            <span className="label-tag bg-primary text-black">Consistency</span>
            <div className="text-4xl font-display font-black text-primary mb-3 italic">+12%</div>
            <div className="h-6 w-full flex gap-1 items-end pt-2">
              {[40, 55, 45, 70, 60, 85].map((v, i) => (
                <div key={i} className={`flex-1 ${i === 5 ? 'bg-primary' : 'bg-slate-700'}`} style={{ height: `${v}%` }} />
              ))}
            </div>
            <p className="font-display text-[9px] font-black text-slate-500 mt-4 uppercase tracking-widest leading-none">Protagonist Journey Trends</p>
          </div>
        </div>
      </div>
    </div>
  );
}
