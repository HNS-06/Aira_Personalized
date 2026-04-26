import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Zap, Send, Mic, MicOff, AlertCircle, Play, Loader2, Sparkles, Network, CheckSquare } from 'lucide-react';
import { useFocus } from '../FocusContext';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function AiraAssistant({ onClose }: { onClose: () => void }) {
  const { startFocus } = useFocus();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'assistant',
      content: "I'm Aira, your AI Coach. I can help with doubt clearance, mind mapping, task creation, or voice assistance to supercharge your study session. What do you need?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const callGroqAPI = async (userMessage: string, contextPrompt?: string) => {
    setIsTyping(true);
    
    const systemPrompt = "You are Aira, a high-performance AI Study Coach and Assistant. You help users clear doubts, create mind maps, manage tasks, and optimize their study workflow. Be concise, highly professional, encouraging, and use a modern, slightly futuristic tone. Keep responses formatted clearly.";
    
    const apiMessages = [
      { role: 'system', content: contextPrompt ? `${systemPrompt}\nContext: ${contextPrompt}` : systemPrompt },
      ...messages.map(m => ({ role: m.role, content: m.content })),
      { role: 'user', content: userMessage }
    ];

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192',
          messages: apiMessages,
          temperature: 0.7,
          max_tokens: 1024,
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const assistantMessage = data.choices[0].message.content;
      
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: assistantMessage
      }]);
    } catch (error) {
      console.error('Failed to fetch from Groq', error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: "System alert: Unable to reach neural network. Please check your connection and try again."
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = async (text: string = input, context?: string) => {
    if (!text.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsListening(false);
    
    await callGroqAPI(text, context);
  };

  const handleAction = (action: string) => {
    let promptText = "";
    let context = "";
    
    if (action === 'doubt') {
      promptText = "I need help clearing a doubt about a topic I'm studying.";
      context = "The user is asking for doubt clearance. Briefly ask them what topic they are struggling with and guide them.";
    } else if (action === 'mindmap') {
      promptText = "Help me generate a mind map for my current subject.";
      context = "The user wants a mind map. Ask for the central topic, then provide a structured, hierarchical list representing a mind map.";
    } else if (action === 'tasks') {
      promptText = "Help me break down my study goals into actionable tasks.";
      context = "The user wants task creation. Ask for their main goal, then provide a checklist of small, actionable steps.";
    }
    
    handleSend(promptText, context);
  };

  const toggleListen = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Voice assistance is not supported in this browser.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      // Actual stopping handled by the recognition instance if stored in a ref, 
      // for simplicity here we just update state and let it timeout or we can just start a new one.
    } else {
      setIsListening(true);
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };
      
      recognition.onerror = () => {
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    }
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed top-0 right-0 h-full w-full max-w-md bg-slate-950 border-l border-white/10 z-[70] shadow-2xl flex flex-col"
    >
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-white/5 shrink-0 bg-slate-900">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary text-black rounded">
            <Zap size={20} fill="currentColor" />
          </div>
          <h3 className="text-xl font-black font-display uppercase italic text-white">Aira Intelligence</h3>
        </div>
        <button 
          onClick={onClose}
          className="p-2 text-slate-400 hover:text-white hover:bg-white/5 border border-white/10 rounded transition-all"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Quick Actions (only show if few messages to save space) */}
        {messages.length < 3 && (
          <div className="grid grid-cols-1 gap-3 mb-6">
            <button onClick={() => handleAction('doubt')} className="flex items-center justify-between p-4 bg-primary text-black rounded font-black text-xs uppercase tracking-widest shadow-[4px_4px_0_0_#000] group hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all">
              <span className="flex items-center gap-2"><Sparkles size={16} /> Doubt Clearance</span>
            </button>
            <button onClick={() => handleAction('mindmap')} className="flex items-center justify-between p-4 bg-secondary text-black rounded font-black text-xs uppercase tracking-widest shadow-[4px_4px_0_0_#000] group hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all">
              <span className="flex items-center gap-2"><Network size={16} /> Generate Mind Map</span>
            </button>
            <button onClick={() => handleAction('tasks')} className="flex items-center justify-between p-4 bg-warning text-black rounded font-black text-xs uppercase tracking-widest shadow-[4px_4px_0_0_#000] group hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all">
              <span className="flex items-center gap-2"><CheckSquare size={16} /> Tasks Creation</span>
            </button>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded ${
              msg.role === 'user' 
                ? 'bg-primary text-black rounded-br-none shadow-[4px_4px_0_0_#000]' 
                : 'bg-slate-800 text-white rounded-bl-none shadow-[4px_4px_0_0_#000] border border-white/10'
            }`}>
              {msg.role === 'assistant' && (
                <div className="text-[9px] font-black uppercase tracking-widest text-primary mb-2 flex items-center gap-1">
                  <Zap size={10} fill="currentColor" /> Aira Core
                </div>
              )}
              <div className="font-sans text-sm whitespace-pre-wrap font-medium">
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[85%] p-4 rounded bg-slate-800 text-white rounded-bl-none shadow-[4px_4px_0_0_#000] border border-white/10 flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-primary" />
              <span className="text-xs font-bold text-slate-400">Processing...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-slate-900 border-t border-white/5 shrink-0">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex gap-2"
        >
          <button 
            type="button"
            onClick={toggleListen}
            className={`p-3 rounded border-2 transition-all flex items-center justify-center shrink-0 ${
              isListening 
                ? 'bg-error text-black border-error shadow-[2px_2px_0_0_#000] animate-pulse' 
                : 'bg-black/40 text-slate-400 border-white/10 hover:text-white hover:border-white/30'
            }`}
          >
            {isListening ? <Mic size={20} /> : <MicOff size={20} />}
          </button>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Aira to clear doubts, create tasks..."
            className="flex-1 bg-black/40 text-white font-sans text-sm px-4 py-3 rounded border-2 border-white/10 focus:border-primary/50 outline-none transition-all placeholder:text-slate-600 font-medium"
          />
          
          <button 
            type="submit"
            disabled={!input.trim() || isTyping}
            className="p-3 bg-primary text-black rounded border-2 border-primary shadow-[4px_4px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shrink-0"
          >
            <Send size={20} />
          </button>
        </form>
        <div className="mt-3 text-center">
           <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Powered by Groq Intelligence</span>
        </div>
      </div>
    </motion.div>
  );
}
