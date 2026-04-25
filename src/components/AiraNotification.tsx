import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useFocus } from '../FocusContext';
import { Zap, Bell, Coffee, Clock } from 'lucide-react';

const AiraNotification: React.FC = () => {
  const { notification, showBreakPrompt, extendBreak, closeBreakPrompt } = useFocus();

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[300] w-full max-w-md px-4 pointer-events-none">
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ height: 40, width: 200, opacity: 0, scale: 0.8 }}
            animate={{ height: 'auto', width: '100%', opacity: 1, scale: 1 }}
            exit={{ height: 40, width: 200, opacity: 0, scale: 0.8 }}
            className="comic-panel bg-black border-2 border-primary rounded-full p-4 flex items-center gap-4 shadow-[10px_10px_0_0_#000] pointer-events-auto overflow-hidden mx-auto"
          >
            <div className={`p-2 rounded-full ${
              notification.type === 'success' ? 'bg-secondary' : 'bg-primary'
            } text-black`}>
              <Zap size={16} fill="currentColor" />
            </div>
            <span className="font-display text-sm font-black text-white uppercase italic tracking-tight">
              {notification.message}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBreakPrompt && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="comic-panel bg-slate-900 border-2 border-secondary rounded-lg p-6 mt-4 shadow-[10px_10px_0_0_#000] pointer-events-auto"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-secondary text-black rounded shadow-[4px_4px_0_0_#000]">
                <Coffee size={24} />
              </div>
              <div>
                <h3 className="font-display text-lg font-black text-white italic uppercase tracking-tighter">Neural Recharge Protocol</h3>
                <p className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">Current Break Expired</p>
              </div>
            </div>
            
            <p className="text-sm font-black text-slate-400 mb-6 uppercase italic">
              "Do you want extra 5 more minutes for neural recalibration?"
            </p>

            <div className="flex gap-4">
              <button 
                onClick={() => extendBreak(5 * 60)}
                className="flex-1 bg-secondary text-black font-display font-black text-[10px] py-4 rounded border-2 border-black shadow-[4px_4px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all uppercase tracking-widest"
              >
                Yes (5m)
              </button>
              <button 
                onClick={closeBreakPrompt}
                className="flex-1 bg-black text-white font-display font-black text-[10px] py-4 rounded border-2 border-black shadow-[4px_4px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all uppercase tracking-widest"
              >
                No (Return)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AiraNotification;
