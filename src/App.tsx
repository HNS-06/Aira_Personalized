/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  BarChart3, 
  UserCircle2, 
  History, 
  Settings,
  MessageSquare,
  X,
  Zap,
  Play,
  Pause,
  AlertCircle,
  Shield
} from 'lucide-react';
import { TabState } from './types.ts';
import { FocusProvider, useFocus } from './FocusContext';

import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import DigitalTwin from './components/DigitalTwin';
import Timeline from './components/Timeline';
import Onboarding from './components/Onboarding';
import Privacy from './components/Privacy';
import AiraNotification from './components/AiraNotification';
import AiraAssistant from './components/AiraAssistant';

function AppContent() {
  const [activeTab, setActiveTab] = useState<TabState>('dashboard');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const { isFocusMode, activeState, timeLeft, totalWorkTimeLeft, stopFocus, setFocusMode, stats } = useFocus();

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'twin', icon: UserCircle2, label: 'Avatar' },
    { id: 'timeline', icon: History, label: 'History' },
    { id: 'privacy', icon: Shield, label: 'Privacy' },
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`min-h-screen bg-background selection:bg-primary/30 selection:text-white transition-all duration-1000 ${isFocusMode ? 'focus-mode-active' : ''}`}>
      {/* Onboarding Overlay */}
      {stats.isFirstRun && <Onboarding />}

      {/* Focus Mode Overlay */}
      <AnimatePresence>
        {isFocusMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center pointer-events-none"
          >
            <div className="absolute inset-0 bg-primary/5 animate-pulse overflow-hidden">
               <div className="absolute inset-0 halftone opacity-20" />
            </div>
            <div className="text-center z-10 mb-8">
               <p className="text-primary/60 font-display text-[10px] font-black uppercase tracking-[0.6em] mb-2">Workspace Remaining</p>
               <h3 className="text-white font-display text-2xl font-black italic uppercase tracking-tighter">
                {formatTime(totalWorkTimeLeft)}
               </h3>
            </div>
            <motion.div 
               animate={{ scale: [1, 1.05, 1] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="text-primary font-display text-[120px] font-black italic tracking-tighter drop-shadow-[0_0_50px_rgba(96,165,250,0.5)] z-10"
            >
              {formatTime(timeLeft)}
            </motion.div>
            <p className="text-white/40 font-display text-xs font-black uppercase tracking-[0.5em] mt-4 z-10">Neural Flow Active</p>
            <div className="pointer-events-auto mt-12 z-10">
               <button 
                onClick={() => setFocusMode(false)}
                className="px-8 py-3 border-2 border-white/10 text-white/50 hover:text-white hover:border-white/40 font-display text-[10px] font-black uppercase tracking-widest rounded transition-all"
               >
                 Exit Focus Space
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AiraNotification />

      {/* Top Bar */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 h-16 bg-slate-900 border-b-3 border-black flex justify-between items-center shadow-[0_4px_0_0_#000]">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-black tracking-tighter italic font-display flex items-center gap-3">
            AIRA <span className="text-primary font-mono text-xs not-italic tracking-normal">AI CORE v1.0</span>
          </div>
          <div className="h-4 w-px bg-slate-700 hidden md:block"></div>
          <div className="hidden md:flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
            <span className="text-[10px] font-black text-secondary uppercase tracking-widest">System Online: Synced</span>
          </div>
        </div>

        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as TabState)}
              className={`font-display font-black text-[10px] uppercase tracking-[0.2em] transition-all border-b-2 pb-1 ${
                activeTab === item.id ? 'text-primary border-primary' : 'text-slate-500 border-transparent hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex gap-4 items-center">
          <div className="hidden lg:block text-right">
             <div className="text-[9px] opacity-50 uppercase font-black tracking-tighter">Primary Mode</div>
             <div className="text-xs font-bold text-warning">HIGH-ENERGY FOCUS</div>
          </div>
          <button 
            onClick={() => setActiveTab('privacy')}
            className="text-slate-400 hover:text-primary transition-all p-2 bg-black/20 border border-white/5 rounded"
          >
            <Settings size={18} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-24 pb-32 px-6 max-w-7xl mx-auto min-h-screen grid">
        <AnimatePresence>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="col-start-1 row-start-1 w-full"
          >
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'analytics' && <Analytics />}
            {activeTab === 'twin' && <DigitalTwin />}
            {activeTab === 'timeline' && <Timeline />}
            {activeTab === 'privacy' && <Privacy />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Assistant Trigger */}
      <button 
        onClick={() => setIsAssistantOpen(true)}
        className="fixed right-6 bottom-24 w-14 h-14 bg-primary text-on-primary rounded-full shadow-[0_0_30px_rgba(183,109,255,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 border-2 border-background"
      >
        <MessageSquare size={24} />
      </button>

      {/* Assistant Modal/Panel */}
      <AnimatePresence>
        {isAssistantOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAssistantOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <AiraAssistant onClose={() => setIsAssistantOpen(false)} />
          </>
        )}
      </AnimatePresence>

      {/* Bottom Mobile Nav */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-3 bg-slate-950/90 backdrop-blur-2xl border-t border-black md:hidden">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as TabState)}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === item.id ? 'text-primary' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <item.icon size={20} />
            <span className="font-display text-[10px] font-black uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <FocusProvider>
      <AppContent />
    </FocusProvider>
  );
}
