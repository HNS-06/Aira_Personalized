import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PomodoroState, UserStats, LifeEvent, OnboardingStep } from './types';

interface Notification {
  message: string;
  type: 'info' | 'success' | 'warning';
}

interface FocusContextType {
  activeState: PomodoroState;
  timeLeft: number;
  totalDuration: number;
  stats: UserStats;
  events: LifeEvent[];
  isFocusMode: boolean;
  totalWorkTime: number;
  totalWorkTimeLeft: number;
  notification: Notification | null;
  showBreakPrompt: boolean;
  startFocus: (customDuration?: number) => void;
  stopFocus: () => void;
  triggerDistraction: () => void;
  addXP: (amount: number) => void;
  setFocusMode: (active: boolean) => void;
  setTotalWorkTime: (seconds: number) => void;
  extendBreak: (seconds: number) => void;
  closeBreakPrompt: () => void;
  completeOnboarding: () => void;
  nextOnboarding: (step: OnboardingStep) => void;
}

const FocusContext = createContext<FocusContextType | undefined>(undefined);

export const FocusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeState, setActiveState] = useState<PomodoroState>('idle');
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [totalWorkTime, setTotalWorkTimeState] = useState(0);
  const [totalWorkTimeLeft, setTotalWorkTimeLeft] = useState(0);
  const [notification, setNotification] = useState<Notification | null>(null);
  const [showBreakPrompt, setShowBreakPrompt] = useState(false);
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('aira_stats');
    if (saved) return JSON.parse(saved);
    return {
      level: 42,
      xp: 12450,
      xpToNextLevel: 15000,
      streak: 14,
      rank: 'ELITE',
      focusScore: 82,
      isFirstRun: true,
      onboardingStep: 'intro'
    };
  });

  const completeOnboarding = useCallback(() => {
    setStats(prev => {
      const next = { ...prev, isFirstRun: false };
      localStorage.setItem('aira_stats', JSON.stringify(next));
      return next;
    });
  }, []);

  const nextOnboarding = useCallback((step: OnboardingStep) => {
    setStats(prev => {
      const next = { ...prev, onboardingStep: step };
      localStorage.setItem('aira_stats', JSON.stringify(next));
      return next;
    });
  }, []);
  const [events, setEvents] = useState<LifeEvent[]>([
    {
      id: '1',
      time: '09:00 - 11:30',
      title: 'Deep Work: LifeOS UI Engine',
      description: 'Implementing the activity timeline module using the Premium Comic-SaaS design tokens.',
      type: 'coding',
      xp: 450,
      highlight: '#Productivity'
    },
    {
      id: '2',
      time: '11:30 - 12:15',
      title: 'System Maintenance (Rest)',
      description: 'Hydration and neural recalibration. No active data processing recorded.',
      type: 'rest',
    }
  ]);

  const addXP = useCallback((amount: number) => {
    setStats(prev => {
      const newXP = prev.xp + amount;
      let next;
      if (newXP >= prev.xpToNextLevel) {
        next = {
          ...prev,
          level: prev.level + 1,
          xp: newXP - prev.xpToNextLevel,
          xpToNextLevel: prev.xpToNextLevel + 2000
        };
      } else {
        next = { ...prev, xp: newXP };
      }
      localStorage.setItem('aira_stats', JSON.stringify(next));
      return next;
    });
  }, []);

  const addEvent = useCallback((event: Partial<LifeEvent>) => {
    const newEvent: LifeEvent = {
      id: Date.now().toString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title: event.title || 'Unknown Event',
      description: event.description || '',
      type: event.type || 'focus',
      xp: event.xp,
      highlight: event.highlight
    };
    setEvents(prev => [newEvent, ...prev].slice(0, 20));
  }, []);

  const setTotalWorkTime = useCallback((seconds: number) => {
    setTotalWorkTimeState(seconds);
    setTotalWorkTimeLeft(seconds);
  }, []);

  const showAiraNotification = useCallback((message: string, type: 'info' | 'success' | 'warning' = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  }, []);

  const closeBreakPrompt = useCallback(() => {
    setShowBreakPrompt(false);
    // If user says no to extra time, we start next session if total time left
    if (totalWorkTimeLeft > 0) {
      startFocus();
    } else {
      stopFocus();
    }
  }, [totalWorkTimeLeft]);

  const extendBreak = useCallback((seconds: number) => {
    setShowBreakPrompt(false);
    setTimeLeft(seconds);
    setTotalDuration(seconds);
    setActiveState('break');
  }, []);

  const startFocus = useCallback((customDuration?: number) => {
    // Adaptive duration: 25 mins base, adjusted by focus score
    const baseDuration = customDuration || 25 * 60;
    const adjustment = (stats.focusScore - 80) * 10; 
    const duration = Math.max(15 * 60, baseDuration + adjustment);

    setActiveState('focus');
    setTimeLeft(duration);
    setTotalDuration(duration);
    setIsFocusMode(true);
    addEvent({ 
      title: 'Aira Focus Protocol', 
      description: `Optimized session: ${Math.floor(duration / 60)} minutes based on behavior patterns.`, 
      type: 'focus' 
    });
  }, [addEvent, stats.focusScore]);

  const stopFocus = useCallback(() => {
    setActiveState('idle');
    setTimeLeft(0);
    setTotalWorkTimeLeft(0);
    setIsFocusMode(false);
    addEvent({ title: 'Focus Protocol Terminated', description: 'Session ended manually.', type: 'rest' });
  }, [addEvent]);

  const triggerDistraction = useCallback(() => {
    if (activeState === 'focus') {
      addXP(-50);
      addEvent({ title: 'System Distraction', description: 'Unauthorized attention drift detected.', type: 'distraction' });
    }
  }, [activeState, addXP, addEvent]);

  useEffect(() => {
    let timer: number;
    if (activeState !== 'idle' && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft(prev => prev - 1);
        if (activeState === 'focus') {
          setTotalWorkTimeLeft(prev => Math.max(0, prev - 1));
        }
      }, 1000);
    } else if (timeLeft === 0 && activeState === 'focus') {
      setActiveState('break');
      setTimeLeft(5 * 60); // 5 min break
      setTotalDuration(5 * 60);
      addXP(500);
      showAiraNotification("You can take a break", "success");
      addEvent({ title: 'Session Complete', description: 'Focus goal reached. Initializing break.', type: 'rest', xp: 500 });
    } else if (timeLeft === 0 && activeState === 'break') {
      if (totalWorkTimeLeft > 0) {
        setShowBreakPrompt(true);
      } else {
        setActiveState('idle');
        setIsFocusMode(false);
        showAiraNotification("Total Work Session Complete!", "success");
      }
    }
    return () => clearInterval(timer);
  }, [activeState, timeLeft, addXP, addEvent, totalWorkTimeLeft, showAiraNotification]);

  return (
    <FocusContext.Provider value={{
      activeState,
      timeLeft,
      totalDuration,
      stats,
      events,
      isFocusMode,
      totalWorkTime,
      totalWorkTimeLeft,
      notification,
      showBreakPrompt,
      startFocus,
      stopFocus,
      triggerDistraction,
      addXP,
      setFocusMode: setIsFocusMode,
      setTotalWorkTime,
      extendBreak,
      closeBreakPrompt,
      completeOnboarding,
      nextOnboarding
    }}>
      {children}
    </FocusContext.Provider>
  );
};

export const useFocus = () => {
  const context = useContext(FocusContext);
  if (context === undefined) {
    throw new Error('useFocus must be used within a FocusProvider');
  }
  return context;
};
