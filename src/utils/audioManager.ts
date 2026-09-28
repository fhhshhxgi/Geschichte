/**
 * Centralized Ambient Audio & Soundtrack Manager
 * 
 * Generates gentle, dignified 19th-century atmospheric ambient music and subtle chamber acoustics
 * using the Web Audio API without annoying low hums, harsh drones, or blowing wind noise.
 * Starts in a clean muted state and allows graceful user-controlled playback.
 */

export type AudioScene =
  | 'intro'
  | 'conference-room'
  | 'africa-map'
  | 'imperialism'
  | 'dossier'
  | 'africa-absence';

interface SoundscapeNodes {
  masterGain: GainNode;
  sources: (AudioNode | number)[];
  stop: () => void;
}

class CentralizedAudioManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private isMusicEnabled: boolean = true;
  private masterVolume: number = 0.35;
  private currentScene: AudioScene = 'conference-room';
  private activeSoundscape: SoundscapeNodes | null = null;
  private listeners: Set<() => void> = new Set();

  public init() {
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
      // AudioContext not supported
    }
  }

  public subscribe(cb: () => void): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  private notify() {
    this.listeners.forEach((cb) => cb());
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public getMusicEnabled(): boolean {
    return this.isMusicEnabled;
  }

  public getMasterVolume(): number {
    return this.masterVolume;
  }

  public getCurrentScene(): AudioScene {
    return this.currentScene;
  }

  public setMasterVolume(vol: number) {
    this.masterVolume = Math.max(0, Math.min(1, vol));
    if (this.activeSoundscape && this.ctx) {
      this.activeSoundscape.masterGain.gain.setValueAtTime(
        this.isMuted ? 0 : this.masterVolume,
        this.ctx.currentTime
      );
    }
    this.notify();
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  public toggleMusic(): boolean {
    this.isMusicEnabled = !this.isMusicEnabled;
    if (!this.isMusicEnabled) {
      this.fadeOutCurrent(0.6);
    } else if (!this.isMuted) {
      this.crossfadeToScene(this.currentScene, 1.0);
    }
    this.notify();
    return this.isMusicEnabled;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    this.init();

    if (this.ctx && this.ctx.state === 'suspended' && !muted) {
      this.ctx.resume();
    }

    if (muted) {
      this.fadeOutCurrent(0.6);
    } else if (this.isMusicEnabled) {
      this.crossfadeToScene(this.currentScene, 1.2);
    }
    this.notify();
  }

  public changeScene(newScene: AudioScene) {
    if (this.currentScene === newScene && this.activeSoundscape) return;
    this.currentScene = newScene;
    this.notify();

    if (!this.isMuted && this.isMusicEnabled) {
      this.crossfadeToScene(newScene, 1.5);
    }
  }

  private fadeOutCurrent(durationSec: number = 0.8) {
    if (!this.activeSoundscape || !this.ctx) return;
    const old = this.activeSoundscape;
    this.activeSoundscape = null;

    try {
      const now = this.ctx.currentTime;
      old.masterGain.gain.cancelScheduledValues(now);
      old.masterGain.gain.setValueAtTime(old.masterGain.gain.value, now);
      old.masterGain.gain.linearRampToValueAtTime(0.0001, now + durationSec);
      setTimeout(() => {
        try {
          old.stop();
        } catch {}
      }, durationSec * 1000 + 100);
    } catch {
      try {
        old.stop();
      } catch {}
    }
  }

  private crossfadeToScene(scene: AudioScene, durationSec: number = 1.5) {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.fadeOutCurrent(durationSec);

    if (!this.isMusicEnabled) return;

    const newSoundscape = this.buildSoundscape(scene);
    if (!newSoundscape) return;

    this.activeSoundscape = newSoundscape;
    const now = this.ctx.currentTime;
    newSoundscape.masterGain.gain.setValueAtTime(0.0001, now);
    newSoundscape.masterGain.gain.linearRampToValueAtTime(
      this.masterVolume,
      now + durationSec
    );
  }

  /**
   * Helper: Plays a soft, warm ambient musical note (pure sine / acoustic harp / celesta)
   * Absolutely NO wind noise, NO brown noise, NO hum.
   */
  private playSoftTone(
    ctx: AudioContext,
    targetGain: GainNode,
    freq: number,
    time: number,
    duration: number = 3.2,
    gainLevel: number = 0.035
  ) {
    try {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Soft warm lowpass to remove any harsh highs
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650, time);
      filter.frequency.exponentialRampToValueAtTime(180, time + duration);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      // Gentle curved envelope with soft attack & smooth fade
      noteGain.gain.setValueAtTime(0.0001, time);
      noteGain.gain.linearRampToValueAtTime(gainLevel, time + 0.12);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(targetGain);

      osc.start(time);
      osc.stop(time + duration + 0.1);
    } catch {}
  }

  /**
   * Generates dignified, calming ambient background music tailored to each scene.
   * Completely clean: pure tones only, peaceful salon harmony.
   */
  private buildSoundscape(scene: AudioScene): SoundscapeNodes | null {
    if (!this.ctx) return null;
    const ctx = this.ctx;
    const masterGain = ctx.createGain();
    masterGain.connect(ctx.destination);

    const activeNodes: (AudioNode | number)[] = [];
    const timers: NodeJS.Timeout[] = [];

    const stop = () => {
      timers.forEach((t) => clearInterval(t));
      activeNodes.forEach((node) => {
        if (typeof node !== 'number') {
          try {
            if ('stop' in node && typeof (node as any).stop === 'function') {
              (node as any).stop();
            }
            node.disconnect();
          } catch {}
        }
      });
      try {
        masterGain.disconnect();
      } catch {}
    };

    // Soft music bus
    const musicBus = ctx.createGain();
    musicBus.gain.setValueAtTime(0.28, ctx.currentTime);
    musicBus.connect(masterGain);
    activeNodes.push(musicBus);

    switch (scene) {
      // 1. CONFERENCE ROOM: Elegant 19th-century salon piano arpeggios (D minor / F major)
      case 'conference-room': {
        const chordProgression = [
          [293.66, 440.0, 523.25, 659.25], // D4, A4, C5, E5 (Dm9)
          [261.63, 329.63, 392.0, 523.25], // C4, E4, G4, C5 (C)
          [220.0, 349.23, 440.0, 587.33],  // A3, F4, A4, D5 (F/A)
          [246.94, 329.63, 392.0, 493.88], // B3, E4, G4, B4 (Em7)
        ];

        let chordIdx = 0;
        const playNextChord = () => {
          if (this.isMuted || !this.isMusicEnabled || !this.ctx) return;
          const now = this.ctx.currentTime;
          const chord = chordProgression[chordIdx];
          chord.forEach((freq, i) => {
            // Very soft, staggered notes (piano/chime feel)
            this.playSoftTone(this.ctx!, musicBus, freq, now + i * 0.22, 4.2, 0.03);
          });
          chordIdx = (chordIdx + 1) % chordProgression.length;
        };

        playNextChord();
        const musicTimer = setInterval(playNextChord, 5200);
        timers.push(musicTimer);
        break;
      }

      // 2. AFRICA MAP: Meditative, gentle acoustic harp tones (No wind, no rumbling)
      case 'africa-map': {
        const peacefulScale = [
          220.0,  // A3
          261.63, // C4
          293.66, // D4
          329.63, // E4
          392.0,  // G4
          440.0,  // A4
          523.25, // C5
        ];

        let step = 0;
        const playMapChime = () => {
          if (this.isMuted || !this.isMusicEnabled || !this.ctx) return;
          const now = this.ctx.currentTime;
          const note1 = peacefulScale[step % peacefulScale.length];
          const note2 = peacefulScale[(step + 2) % peacefulScale.length];
          this.playSoftTone(this.ctx!, musicBus, note1, now, 4.0, 0.026);
          this.playSoftTone(this.ctx!, musicBus, note2, now + 0.35, 3.8, 0.022);
          step = (step + 1) % peacefulScale.length;
        };

        playMapChime();
        const mapMusicTimer = setInterval(playMapChime, 4600);
        timers.push(mapMusicTimer);
        break;
      }

      // 3. IMPERIALISM: Solemn, reflective chamber chords
      case 'imperialism': {
        const solemnChords = [
          [220.0, 261.63, 349.23], // A3, C4, F4 (Dm/A)
          [196.0, 261.63, 329.63], // G3, C4, E4 (C/G)
          [174.61, 220.0, 293.66], // F3, A3, D4 (Bb/F)
          [164.81, 220.0, 329.63], // E3, A3, E4 (Am)
        ];

        let solemnIdx = 0;
        const playSolemn = () => {
          if (this.isMuted || !this.isMusicEnabled || !this.ctx) return;
          const now = this.ctx.currentTime;
          const chord = solemnChords[solemnIdx];
          chord.forEach((freq, i) => {
            this.playSoftTone(this.ctx!, musicBus, freq, now + i * 0.28, 4.8, 0.028);
          });
          solemnIdx = (solemnIdx + 1) % solemnChords.length;
        };

        playSolemn();
        const solemnTimer = setInterval(playSolemn, 5800);
        timers.push(solemnTimer);
        break;
      }

      // 4. DOSSIER & ZEITLEISTE: Peaceful archival library tones
      case 'dossier':
      case 'africa-absence':
      default: {
        const archivalNotes = [261.63, 329.63, 392.0, 440.0];
        let idx = 0;
        const playArchival = () => {
          if (this.isMuted || !this.isMusicEnabled || !this.ctx) return;
          const now = this.ctx.currentTime;
          const note = archivalNotes[idx % archivalNotes.length];
          this.playSoftTone(this.ctx!, musicBus, note, now, 3.6, 0.024);
          idx++;
        };

        playArchival();
        const archTimer = setInterval(playArchival, 4400);
        timers.push(archTimer);
        break;
      }
    }

    return {
      masterGain,
      sources: activeNodes,
      stop,
    };
  }
}

export const audioManager = new CentralizedAudioManager();
