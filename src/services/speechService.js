// Speech & Sound Service for HanziHub
// Uses Web Speech API (Chinese zh-CN) with speech rate control (0.75x, 1.0x, 1.25x)
// + Web Audio API synthesizer for clean sound effects (correct answer, wrong answer, card flip)
// Strictly NO microphone, NO voice recording, NO speaking test!

class AudioService {
  constructor() {
    this.speechSynth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.audioCtx = null;
    this.selectedVoice = null;
    this.defaultRate = 1.0;
    this.initVoice();
  }

  setDefaultRate(rate) {
    this.defaultRate = rate;
    try {
      localStorage.setItem('nacha_audio_speed', String(rate));
    } catch (e) {}
  }

  getDefaultRate() {
    try {
      const saved = localStorage.getItem('nacha_audio_speed');
      if (saved) return parseFloat(saved);
    } catch (e) {}
    return this.defaultRate;
  }

  initVoice() {
    if (!this.speechSynth) return;
    const findVoice = () => {
      const voices = this.speechSynth.getVoices();
      // Look for standard Mandarin zh-CN voices
      const zhVoice = voices.find(v => v.lang === 'zh-CN' || v.lang === 'zh_CN' || v.lang.startsWith('zh'));
      if (zhVoice) {
        this.selectedVoice = zhVoice;
      }
    };

    findVoice();
    if (this.speechSynth.onvoiceschanged !== undefined) {
      this.speechSynth.onvoiceschanged = findVoice;
    }
  }

  playMandarin(text, rate = null, onStart, onEnd) {
    if (!this.speechSynth) {
      console.warn('Speech synthesis not supported');
      if (onEnd) onEnd();
      return;
    }

    try {
      this.speechSynth.cancel(); // Stop current speech
      const cleanText = text.replace(/[\(\)\[\]（）]/g, '').trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'zh-CN';
      const effectiveRate = rate !== null ? rate : this.getDefaultRate();
      utterance.rate = Math.max(0.5, Math.min(effectiveRate, 1.5));
      utterance.pitch = 1.0;

      if (this.selectedVoice) {
        utterance.voice = this.selectedVoice;
      }

      if (onStart) utterance.onstart = onStart;
      if (onEnd) {
        utterance.onend = onEnd;
        utterance.onerror = onEnd;
      }

      this.speechSynth.speak(utterance);
    } catch (e) {
      console.error('Error playing Mandarin audio:', e);
      if (onEnd) onEnd();
    }
  }

  stop() {
    if (this.speechSynth) {
      this.speechSynth.cancel();
    }
  }

  getAudioContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  // Synthesized chime for correct answer
  playSuccessSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = 'triangle';
    osc2.type = 'sine';

    osc1.frequency.setValueAtTime(523.25, now); // C5
    osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5
    osc1.frequency.exponentialRampToValueAtTime(783.99, now + 0.2); // G5

    osc2.frequency.setValueAtTime(1046.50, now + 0.2); // C6

    gainNode.gain.setValueAtTime(0.2, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now + 0.2);
    osc1.stop(now + 0.45);
    osc2.stop(now + 0.45);
  }

  // Synthesized bump for incorrect answer
  playErrorSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.25);

    gainNode.gain.setValueAtTime(0.2, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  // Subtle tap sound for click / card flip
  playTapSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);

    gainNode.gain.setValueAtTime(0.1, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }
}

export const audioService = new AudioService();
export default audioService;
