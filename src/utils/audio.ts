export function playAudioCue(type: 'start' | 'complete' | 'warning' | 'click' | 'alarm') {
  if (typeof window === 'undefined' || !window.AudioContext && !(window as any).webkitAudioContext) return;
  
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    if (type === 'start') {
      // Ascending major third (Aira boot sequence)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime); // A4
      osc.frequency.exponentialRampToValueAtTime(554.37, ctx.currentTime + 0.1); // C#5
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.5);
    } else if (type === 'complete') {
      // Triumphant chord arpeggio
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.8);
    } else if (type === 'warning') {
      // Descending low beep
      osc.type = 'square';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.3);
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'click') {
      // Sharp, short UI pop
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === 'alarm') {
      // Three pulsing beeps — break reminder alarm
      osc.type = 'sine';
      const beepFreq = 880; // A5 — attention-grabbing
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      // Beep 1
      osc.frequency.setValueAtTime(beepFreq, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.02);
      gainNode.gain.setValueAtTime(0.18, ctx.currentTime + 0.15);
      gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.2);
      // Beep 2
      osc.frequency.setValueAtTime(beepFreq, ctx.currentTime + 0.35);
      gainNode.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.37);
      gainNode.gain.setValueAtTime(0.18, ctx.currentTime + 0.5);
      gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.55);
      // Beep 3 (slightly higher)
      osc.frequency.setValueAtTime(1046.5, ctx.currentTime + 0.7); // C6
      gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.72);
      gainNode.gain.setValueAtTime(0.2, ctx.currentTime + 0.95);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 1.2);
    }
  } catch (e) {
    console.warn("Audio Context failed or was blocked by browser policy.");
  }
}
