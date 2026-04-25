import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useFocus } from '../FocusContext';
import { Zap, ArrowRight, CheckCircle2, Moon, Target, ShieldAlert } from 'lucide-react';

const Onboarding: React.FC = () => {
  const { stats, nextOnboarding, completeOnboarding } = useFocus();
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<{ text: string; sender: 'aira' | 'user' }[]>([
    { text: "Hi, I'm Aira. I'm your neural performance partner.", sender: 'aira' },
    { text: "I'll help you reclaim your focus and optimize your cognitive flow.", sender: 'aira' },
    { text: "To start, what's your typical sleep schedule? (e.g., 11 PM - 7 AM)", sender: 'aira' }
  ]);

  const handleNext = () => {
    if (stats.onboardingStep === 'intro') {
      setMessages(prev => [
        ...prev, 
        { text: inputValue, sender: 'user' },
        { text: "Understood. Biorhythm tracking initialized.", sender: 'aira' },
        { text: "What's your primary goal for this week? (e.g., Finish Project X, Study for Exams)", sender: 'aira' }
      ]);
      nextOnboarding('goals');
    } else if (stats.onboardingStep === 'goals') {
      setMessages(prev => [
        ...prev, 
        { text: inputValue, sender: 'user' },
        { text: "Goal captured in neural buffer. High priority assigned.", sender: 'aira' },
        { text: "Final question: What's your biggest distraction right now?", sender: 'aira' }
      ]);
      nextOnboarding('distractions');
    } else if (stats.onboardingStep === 'distractions') {
      setMessages(prev => [
        ...prev, 
        { text: inputValue, sender: 'user' },
        { text: "Noise cancellation protocols updated. I'll watch out for those.", sender: 'aira' },
        { text: "System parity reached. You're ready to enter the flow.", sender: 'aira' }
      ]);
      nextOnboarding('ready');
    }
    setInputValue('');
  };

  return (
    <div className="fixed inset-0 z-[200] bg-slate-950 flex flex-col items-center justify-center p-6 bg-[radial-gradient(circle_at_50%_50%,rgba(96,165,250,0.1),transparent)] pointer-events-auto">
      <div className="absolute inset-0 halftone opacity-10 pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full comic-panel bg-slate-900/80 p-8 rounded-lg shadow-[20px_20px_0_0_#000] border-2 border-black flex flex-col h-[600px]"
      >
        <div className="flex items-center gap-4 mb-8">
           <div className="p-3 bg-primary text-black rounded shadow-[4px_4px_0_0_#000]">
              <Zap size={24} fill="currentColor" />
           </div>
           <div>
              <h2 className="font-display text-2xl font-black text-white italic uppercase tracking-tighter">Aira Initialization</h2>
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Neural Link Status: Syncing...</p>
           </div>
        </div>

        <div className="flex-1 overflow-y-auto mb-6 space-y-4 scrollbar-hide">
          <AnimatePresence mode="popLayout">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: msg.sender === 'aira' ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex ${msg.sender === 'aira' ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[80%] px-4 py-3 rounded relative ${
                  msg.sender === 'aira' 
                    ? 'bg-white text-black border-2 border-black shadow-[4px_4px_0_0_#000]' 
                    : 'bg-primary text-black font-bold border-2 border-black shadow-[4px_4px_0_0_#000]'
                }`}>
                  {msg.sender === 'aira' && (
                    <div className="absolute -left-2 top-4 w-4 h-4 bg-white border-l-2 border-b-2 border-black rotate-45" />
                  )}
                  <p className="text-sm font-black uppercase tracking-tight italic">{msg.text}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {stats.onboardingStep !== 'ready' ? (
          <div className="relative">
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && inputValue && handleNext()}
              placeholder="Type your response..."
              className="w-full bg-black border-4 border-black p-4 text-white font-display text-sm focus:outline-none placeholder:text-slate-600 rounded"
            />
            <button 
              onClick={handleNext}
              disabled={!inputValue}
              className="absolute right-3 top-3 p-2 bg-primary text-black rounded disabled:opacity-50 transition-all"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        ) : (
          <motion.button 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={completeOnboarding}
            className="w-full bg-secondary text-black font-display font-black text-lg p-5 rounded border-4 border-black shadow-[8px_8px_0_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-3"
          >
            INITIALIZE FLOW SPACE <Zap size={20} fill="currentColor" />
          </motion.button>
        )}
      </motion.div>

      {/* Trust Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 flex items-center gap-2 text-slate-500 font-black text-[10px] uppercase tracking-widest"
      >
        <ShieldAlert size={14} />
        <span>Your data is processed locally / End-to-end neural encryption active</span>
      </motion.div>
    </div>
  );
};

export default Onboarding;
