import React from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, EyeOff, Server, HardDrive, CheckCircle2 } from 'lucide-react';

const Privacy: React.FC = () => {
  const securityFeatures = [
    { 
      title: 'Local Storage', 
      desc: 'All cognitive logs and behavior data are stored exclusively on your device.', 
      icon: HardDrive,
      status: 'Verified'
    },
    { 
      title: 'Neural Encryption', 
      desc: 'Local databases are encrypted with AES-256 at rest.', 
      icon: Lock,
      status: 'Active'
    },
    { 
      title: 'Zero Tracker Policy', 
      desc: 'Aira contains no third-party tracers or analytics SDKs.', 
      icon: EyeOff,
      status: 'Enforced'
    },
    { 
      title: 'Offline Sync', 
      desc: 'All features operate without cloud dependency for maximum sovereignty.', 
      icon: Server,
      status: 'Stable'
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      <section>
        <span className="inline-block px-4 py-1 bg-primary text-black rounded font-display text-[10px] font-black uppercase tracking-widest mb-4 border-2 border-black shadow-[2px_2px_0_0_#000]">SECURITY PROTOCOLS</span>
        <h1 className="font-display text-5xl font-black text-white mb-2 tracking-tighter uppercase italic leading-none">Trust & Privacy</h1>
        <p className="font-sans text-sm text-slate-400 max-w-2xl font-bold uppercase tracking-tight">Your cognitive sovereignty is our primary directive.</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-1 md:col-span-2 comic-panel bg-primary p-8 rounded border-4 border-black shadow-[10px_10px_0_0_#000]"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-black text-primary rounded shadow-[4px_4px_0_0_#000]">
                <Shield size={40} fill="currentColor" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-black text-black uppercase italic leading-none mb-2">Neural Link Sovereignty</h3>
                <p className="text-[11px] font-black text-black/60 uppercase tracking-widest max-w-md">Aira operates as a closed-loop system. We cannot see, access, or sell your behavior data because it never leaves your hardware.</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-black/10 px-4 py-2 rounded-full border border-black/20">
               <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
               <span className="font-display text-[10px] font-black text-black uppercase tracking-widest">System Sovereign</span>
            </div>
          </div>
        </motion.div>

        {securityFeatures.map((f, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className="comic-panel bg-slate-900 p-8 rounded border-4 border-black shadow-[8px_8px_0_0_#000]"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-slate-800 text-primary rounded border border-white/5">
                <f.icon size={24} />
              </div>
              <div className="flex items-center gap-2 text-secondary font-display text-[9px] font-black uppercase tracking-widest">
                <CheckCircle2 size={12} />
                {f.status}
              </div>
            </div>
            <h4 className="font-display text-xl font-black text-white mb-2 uppercase italic">{f.title}</h4>
            <p className="text-[11px] font-bold text-slate-500 uppercase leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="col-span-1 md:col-span-2 comic-panel bg-slate-900/50 p-8 rounded border-4 border-black border-dashed"
        >
          <div className="flex flex-col items-center text-center max-w-xl mx-auto">
            <h4 className="font-display text-lg font-black text-slate-500 mb-4 uppercase italic">"Why this decision?"</h4>
            <p className="text-[11px] font-bold text-slate-600 uppercase mb-8 leading-relaxed">
              Every Aira suggestion includes an audit trail. You can click any insight to see the specific data points used for that adaptation. No black-box behavior tracking.
            </p>
            <button className="px-8 py-3 bg-slate-800 border-2 border-black text-white font-display text-[10px] font-black uppercase tracking-widest rounded shadow-[4px_4px_0_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
              REQUEST SYSTEM AUDIT
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
