/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LifeEvent {
  id: string;
  time: string;
  duration?: string;
  title: string;
  description: string;
  type: 'focus' | 'rest' | 'study' | 'coding' | 'health' | 'distraction';
  xp?: number;
  highlight?: string;
}

export type TabState = 'dashboard' | 'analytics' | 'twin' | 'timeline' | 'privacy';

export type PomodoroState = 'idle' | 'focus' | 'break' | 'recovery';

export type OnboardingStep = 'name' | 'intro' | 'goals' | 'distractions' | 'ready';

export interface UserStats {
  name: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  rank: string;
  focusScore: number;
  isFirstRun: boolean;
  onboardingStep: OnboardingStep;
}
