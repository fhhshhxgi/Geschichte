import { audioManager } from './audioManager';

class EnhancedSoundSystem {
  private ctx: AudioContext | null = null;

  public init() {
    audioManager.init();
    if (this.ctx) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    } catch {
      // AudioContext not supported or blocked
    }
  }

  public setMuted(muted: boolean) {
    audioManager.setMuted(muted);
  }

  public getMuted(): boolean {
    return audioManager.getMuted();
  }

  public toggleMute(): boolean {
    return audioManager.toggleMute();
  }

  // Soft subtle click / quill on antique parchment
  public playSubtleTick() {
    if (this.getMuted()) return;
    this.init();
    if (!this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(240, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.07);
    } catch {
      // ignore
    }
  }

  // Antique gavel strike / imperial hammer
  public playGavelStrike() {
    if (this.getMuted()) return;
    this.init();
    if (!this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const now = this.ctx.currentTime;

      // Heavy wood impact
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, now);
      filter.frequency.exponentialRampToValueAtTime(80, now + 0.4);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.35);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(now + 0.5);

      // Wood resonance echo
      const oscEcho = this.ctx.createOscillator();
      const gainEcho = this.ctx.createGain();
      oscEcho.type = 'triangle';
      oscEcho.frequency.setValueAtTime(85, now + 0.04);
      gainEcho.gain.setValueAtTime(0.08, now + 0.04);
      gainEcho.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

      oscEcho.connect(gainEcho);
      gainEcho.connect(this.ctx.destination);
      oscEcho.start(now + 0.04);
      oscEcho.stop(now + 0.65);
    } catch {
      // ignore
    }
  }

  // Solemn bell / bronze conference gong
  public playChamberTone(deep: boolean = false) {
    if (this.getMuted()) return;
    this.init();
    if (!this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(deep ? 380 : 650, now);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(deep ? 110 : 261.63, now); // A2 or C4
      osc.frequency.exponentialRampToValueAtTime(deep ? 108 : 258, now + 1.8);

      gain.gain.setValueAtTime(deep ? 0.08 : 0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(now + 2.1);
    } catch {
      // ignore
    }
  }

  // Paper rustle effect for document inspection
  public playPaperRustle() {
    if (this.getMuted()) return;
    this.init();
    if (!this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.15;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, now);
      filter.Q.setValueAtTime(2.5, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
      noise.stop(now + 0.15);
    } catch {
      // ignore
    }
  }

  // Map decade transition whoosh/sweep
  public playEpochTransition() {
    if (this.getMuted()) return;
    this.init();
    if (!this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(150, now);
      filter.frequency.exponentialRampToValueAtTime(450, now + 0.2);
      filter.frequency.exponentialRampToValueAtTime(90, now + 0.6);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(80, now);
      osc.frequency.linearRampToValueAtTime(160, now + 0.25);
      osc.frequency.linearRampToValueAtTime(70, now + 0.6);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.07, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(now + 0.65);
    } catch {
      // ignore
    }
  }
}

export const soundFx = new EnhancedSoundSystem();
