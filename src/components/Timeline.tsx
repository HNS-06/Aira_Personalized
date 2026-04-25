import { motion } from 'motion/react';
import { Trophy, Flame, Crown, Terminal, Coffee, BrainCircuit, PlusCircle, BookText, Activity, AlertCircle } from 'lucide-react';
import { useFocus } from '../FocusContext';

export default function Timeline() {
  const { events, stats } = useFocus();

  return (
    <div className="grid grid-cols-12 gap-8 pb-12">
      {/* Gamification Sidebar */}
      <aside className="col-span-12 lg:col-span-4 space-y-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="comic-panel p-10 rounded-lg bg-slate-900 overflow-hidden shadow-[10px_10px_0_0_#000]"
        >
          <span className="label-tag bg-secondary text-black">Progression Tracking</span>
          <div className="flex justify-between items-start mb-8 mt-4">
            <div>
              <p className="font-display text-[9px] font-black text-slate-500 tracking-widest uppercase mb-1">Current Sync Level</p>
              <h2 className="font-display text-4xl font-black text-white uppercase italic">Level {stats.level}</h2>
            </div>
            <div className="bg-secondary text-black p-4 rounded shadow-[4px_4px_0_0_#000]">
              <Trophy size={20} />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between font-display text-[10px] font-black text-slate-500 uppercase tracking-widest">
              <span>XP: {stats.xp.toLocaleString()} / {stats.xpToNextLevel.toLocaleString()}</span>
              <span className="text-secondary">{Math.floor((stats.xp / stats.xpToNextLevel) * 100)}%</span>
            </div>
            <div className="w-full h-8 bg-black border-2 border-black p-1 flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`h-full flex-1 transition-colors duration-500 ${
                    i < (stats.xp / stats.xpToNextLevel) * 5 ? 'bg-secondary' : 'bg-slate-900'
                  }`} 
                />
              ))}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4">
            <div className="bg-black/40 p-6 rounded border-2 border-black flex flex-col items-center shadow-[4px_4px_0_0_#000]">
              <p className="font-display text-[9px] font-black text-slate-500 mb-2 uppercase tracking-widest">STREAK</p>
              <div className="flex items-center gap-3">
                <Flame className="text-error" fill="currentColor" size={16} />
                <span className="font-display text-xl font-black text-white italic uppercase tracking-tighter">{stats.streak} DAYS</span>
              </div>
            </div>
            <div className="bg-black/40 p-6 rounded border-2 border-black flex flex-col items-center shadow-[4px_4px_0_0_#000]">
              <p className="font-display text-[9px] font-black text-slate-500 mb-2 uppercase tracking-widest">RANK</p>
              <div className="flex items-center gap-3">
                <Crown className="text-primary" fill="currentColor" size={16} />
                <span className="font-display text-xl font-black text-white italic uppercase tracking-tighter">{stats.rank}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Achievements Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="comic-panel p-10 rounded-lg bg-slate-900"
        >
          <span className="label-tag bg-primary text-black">Medal Gallery</span>
          <h3 className="font-display text-xl font-black text-white mb-10 flex items-center gap-3 uppercase italic mt-2">
            Achievements
          </h3>
          <div className="grid grid-cols-3 gap-6">
            {[
              { icon: Terminal, color: 'text-primary', label: 'CODE MASTER', bg: 'bg-primary/20' },
              { icon: BookText, color: 'text-secondary', label: 'SCHOLAR', bg: 'bg-secondary/20' },
              { icon: Activity, color: 'text-slate-700', label: 'LOCKED', lock: true, bg: 'bg-black' },
            ].map((a, i) => (
              <div key={i} className={`flex flex-col items-center gap-3 group ${a.lock ? 'opacity-30' : ''}`}>
                <div className={`w-16 h-16 rounded shadow-[4px_4px_0_0_#000] flex items-center justify-center border-2 border-black ${a.bg} ${a.color} group-hover:scale-105 transition-transform`}>
                  <a.icon size={28} strokeWidth={2} />
                </div>
                <span className="font-display text-[8px] font-black text-center uppercase tracking-widest leading-tight">{a.label}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-4 bg-slate-800 border-2 border-black text-white font-display text-[10px] font-black uppercase tracking-widest rounded shadow-[4px_4px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all">
            EXPAND TROPHY CASE
          </button>
        </motion.div>
      </aside>

      {/* Main Timeline Column */}
      <section className="col-span-12 lg:col-span-8 space-y-8">
        <div className="comic-panel p-10 rounded-lg bg-slate-900 min-h-[600px]">
          <span className="label-tag bg-secondary text-black font-black uppercase tracking-widest">Temporal Log</span>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 mt-4">
            <h2 className="font-display text-3xl font-black text-white uppercase italic flex items-center gap-4 tracking-tighter">
              Activity History
            </h2>
            <div className="flex flex-wrap gap-2">
              {['ALL', 'CODING', 'STUDY', 'HEALTH'].map((filter) => (
                <button 
                  key={filter} 
                  className={`px-4 py-1.5 border-2 transition-all font-display text-[9px] font-black tracking-widest uppercase ${
                    filter === 'ALL' 
                    ? 'border-black bg-primary text-black shadow-[2px_2px_0_0_#000]' 
                    : 'border-black bg-slate-800 text-slate-500 hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="relative space-y-12 pl-4 md:pl-12 before:absolute before:inset-0 before:ml-[1.45rem] md:before:ml-[2.45rem] before:h-full before:w-1.5 before:-translate-x-px before:bg-black before:border before:border-white/10">
            {events.map((event, i) => (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative flex items-start group"
              >
                <div className={`absolute left-0 mt-1 w-10 h-10 border-3 border-black shadow-[3px_3px_0_0_#000] flex items-center justify-center z-10 transition-all duration-500 ${
                  event.type === 'coding' ? 'bg-primary' :
                  event.type === 'rest' ? 'bg-slate-700' :
                  'bg-secondary'
                }`}>
                  {event.type === 'coding' && <Terminal className="text-black" size={20} />}
                  {event.type === 'rest' && <Coffee className="text-white" size={20} />}
                  {event.type === 'study' && <BrainCircuit className="text-black" size={20} />}
                </div>
                
                <div className={`ml-20 w-full p-6 border-2 border-black bg-black/30 shadow-[4px_4px_0_0_#000] hover:translate-x-1 transition-all ${
                  event.type === 'coding' ? 'border-l-6 border-l-primary' :
                  event.type === 'rest' ? 'border-l-6 border-l-slate-700' :
                  'border-l-6 border-l-secondary'
                }`}>
                  <div className="flex flex-col md:flex-row justify-between md:items-center mb-3 gap-2">
                    <h4 className="font-display text-lg font-black text-white uppercase italic tracking-tighter">{event.title}</h4>
                    <span className={`font-display text-[10px] font-black uppercase tracking-widest ${
                      event.type === 'coding' ? 'text-primary' :
                      event.type === 'rest' ? 'text-slate-500' :
                      'text-secondary'
                    }`}>{event.time}</span>
                  </div>
                  <p className="font-sans text-[11px] text-slate-400 font-bold uppercase mb-6 leading-relaxed opacity-80">{event.description}</p>
                  
                  {event.xp && (
                    <div className="flex gap-4 items-center">
                      <div className="flex items-center gap-2 text-secondary">
                        <PlusCircle size={14} />
                        <span className="font-display text-[10px] font-black uppercase italic tracking-widest">+{event.xp} XP</span>
                      </div>
                      <div className="bg-black/60 px-3 py-1 text-[9px] font-display font-black border border-white/5 uppercase tracking-widest text-slate-600">
                        {event.highlight}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
