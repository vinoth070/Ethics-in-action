import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  MUSIC_PLAYLISTS,
  MUSIC_TRACKS,
  MusicPlaylist,
  MusicTrack,
} from '../data/musicLibrary';

const STORAGE_VOLUME = 'ethics_music_volume_v2';
const STORAGE_TRACK = 'ethics_music_track_v2';
const STORAGE_PLAYLIST = 'ethics_music_playlist_v2';
const STORAGE_REPEAT = 'ethics_music_repeat_v2';
const STORAGE_SHUFFLE = 'ethics_music_shuffle_v2';

export type RepeatMode = 'all' | 'one' | 'off';
export type AudioLoadState = 'idle' | 'loading' | 'ready' | 'playing' | 'paused' | 'stopped' | 'error';

interface AudioContextValue {
  enabled: boolean;
  isPlaying: boolean;
  isPaused: boolean;
  isLoading: boolean;
  loadState: AudioLoadState;
  volume: number; // 0 to 1
  isMuted: boolean;
  repeatMode: RepeatMode;
  shuffle: boolean;
  currentTrack: MusicTrack;
  activePlaylist: MusicPlaylist;
  playlistTracks: MusicTrack[];
  currentTime: number;
  duration: number;
  errorMessage: string | null;
  autoplayNotice: string | null;
  setMusicEnabled: (enabled: boolean) => void;
  playTrack: (trackId?: string) => Promise<void>;
  pauseMusic: () => void;
  resumeMusic: () => Promise<void>;
  stopMusic: () => void;
  togglePlayPause: () => Promise<void>;
  nextTrack: () => Promise<void>;
  previousTrack: () => Promise<void>;
  selectTrack: (trackId: string, autoPlay?: boolean) => Promise<void>;
  selectPlaylist: (playlistId: string, startPlaying?: boolean) => Promise<void>;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  cycleRepeatMode: () => void;
  toggleShuffle: () => void;
  retryCurrentTrack: () => Promise<void>;
}

const AmbientAudioContext = createContext<AudioContextValue | null>(null);

function loadNumber(key: string, fallback: number): number {
  try {
    const raw = localStorage.getItem(key);
    if (raw !== null) {
      const n = parseFloat(raw);
      if (!Number.isNaN(n) && n >= 0 && n <= 1) return n;
    }
  } catch {
    // ignore
  }
  return fallback;
}

function loadString(key: string, fallback: string): string {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

export const AmbientAudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Music is ALWAYS OFF by default — never autoplays without user gesture
  const [enabled, setEnabled] = useState<boolean>(false);
  const [loadState, setLoadState] = useState<AudioLoadState>('idle');
  const [volume, setVolumeState] = useState<number>(() => loadNumber(STORAGE_VOLUME, 0.65));
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>(() => {
    const saved = loadString(STORAGE_REPEAT, 'one');
    return saved === 'all' || saved === 'one' || saved === 'off' ? saved : 'one';
  });
  const [shuffle, setShuffle] = useState<boolean>(() => loadString(STORAGE_SHUFFLE, 'false') === 'true');
  const [playlistId, setPlaylistId] = useState<string>(() => {
    const saved = loadString(STORAGE_PLAYLIST, MUSIC_PLAYLISTS[0].id);
    return MUSIC_PLAYLISTS.some((p) => p.id === saved) ? saved : MUSIC_PLAYLISTS[0].id;
  });
  const [currentTrackId, setCurrentTrackId] = useState<string>(() => {
    const saved = loadString(STORAGE_TRACK, MUSIC_TRACKS[0].id);
    return MUSIC_TRACKS.some((t) => t.id === saved) ? saved : MUSIC_TRACKS[0].id;
  });
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(MUSIC_TRACKS[0].durationSec);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [autoplayNotice, setAutoplayNotice] = useState<string | null>(null);

  // Singleton HTMLAudioElement — lives across all page navigations without recreating
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeTimerRef = useRef<number | null>(null);
  const volumeRef = useRef<number>(volume);
  const mutedRef = useRef<boolean>(isMuted);
  const repeatRef = useRef<RepeatMode>(repeatMode);
  const shuffleRef = useRef<boolean>(shuffle);
  const playlistTracksRef = useRef<MusicTrack[]>(MUSIC_TRACKS);
  const currentTrackIdRef = useRef<string>(currentTrackId);

  const activePlaylist = useMemo(
    () => MUSIC_PLAYLISTS.find((p) => p.id === playlistId) ?? MUSIC_PLAYLISTS[0],
    [playlistId]
  );

  const playlistTracks = useMemo(() => {
    const map = new Map(MUSIC_TRACKS.map((t) => [t.id, t]));
    return activePlaylist.trackIds
      .map((id) => map.get(id))
      .filter((t): t is MusicTrack => Boolean(t));
  }, [activePlaylist]);

  const currentTrack = useMemo(
    () => MUSIC_TRACKS.find((t) => t.id === currentTrackId) ?? MUSIC_TRACKS[0],
    [currentTrackId]
  );

  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);
  useEffect(() => {
    mutedRef.current = isMuted;
  }, [isMuted]);
  useEffect(() => {
    repeatRef.current = repeatMode;
  }, [repeatMode]);
  useEffect(() => {
    shuffleRef.current = shuffle;
  }, [shuffle]);
  useEffect(() => {
    playlistTracksRef.current = playlistTracks;
  }, [playlistTracks]);
  useEffect(() => {
    currentTrackIdRef.current = currentTrackId;
  }, [currentTrackId]);

  const clearFade = useCallback(() => {
    if (fadeTimerRef.current !== null) {
      window.clearInterval(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
  }, []);

  const fadeVolume = useCallback(
    (audio: HTMLAudioElement, targetVol: number, durationMs: number, onDone?: () => void) => {
      clearFade();
      const clampedTarget = Math.max(0, Math.min(1, targetVol));
      const startVol = audio.volume;
      const steps = Math.max(1, Math.round(durationMs / 25));
      let step = 0;

      fadeTimerRef.current = window.setInterval(() => {
        step += 1;
        const ratio = Math.min(1, step / steps);
        audio.volume = Math.max(0, Math.min(1, startVol + (clampedTarget - startVol) * ratio));
        if (step >= steps) {
          clearFade();
          audio.volume = clampedTarget;
          if (onDone) onDone();
        }
      }, 25);
    },
    [clearFade]
  );

  const getOrCreateAudio = useCallback((): HTMLAudioElement => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.preload = 'metadata';
      audio.crossOrigin = 'anonymous';
      audioRef.current = audio;
    }
    return audioRef.current;
  }, []);

  const loadAndPlayTrack = useCallback(
    async (track: MusicTrack) => {
      const audio = getOrCreateAudio();
      clearFade();
      setErrorMessage(null);
      setAutoplayNotice(null);
      setLoadState('loading');

      const resolvedUrl = new URL(track.src, window.location.origin).href;
      const isDifferentSrc = audio.src !== resolvedUrl;

      if (isDifferentSrc) {
        audio.pause();
        audio.src = track.src;
        audio.load();
      }

      audio.loop = repeatRef.current === 'one';
      audio.muted = mutedRef.current;
      // Start slightly soft then smoothly ramp to user volume (never sudden loud jump)
      const targetVol = mutedRef.current ? 0 : Math.max(0.05, volumeRef.current);
      audio.volume = Math.min(0.08, targetVol);

      try {
        await audio.play();
        setEnabled(true);
        setLoadState('playing');
        fadeVolume(audio, mutedRef.current ? 0 : volumeRef.current, 420);
      } catch (err) {
        const domErr = err as { name?: string };
        if (domErr?.name === 'NotAllowedError') {
          setLoadState('paused');
          setAutoplayNotice(
            'Your browser paused automatic playback. Click Play again to start audible background music.'
          );
        } else if (domErr?.name === 'AbortError') {
          // Track switch superseded this play request — ignore cleanly
        } else {
          setLoadState('error');
          setErrorMessage(
            `Unable to play "${track.title}". The audio file may have been interrupted. Click Retry or choose another track.`
          );
        }
      }
    },
    [getOrCreateAudio, clearFade, fadeVolume]
  );

  // Wire singleton audio event listeners once
  useEffect(() => {
    const audio = getOrCreateAudio();

    const onLoadedMetadata = () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
      }
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const onCanPlay = () => {
      setErrorMessage(null);
    };

    const onError = () => {
      const activeTrack =
        MUSIC_TRACKS.find((t) => t.id === currentTrackIdRef.current) ?? MUSIC_TRACKS[0];
      setLoadState('error');
      setErrorMessage(
        `Could not load "${activeTrack.title}" (${activeTrack.src}). Please click Retry or select a different track.`
      );
    };

    const onEnded = () => {
      const mode = repeatRef.current;
      const list = playlistTracksRef.current;
      if (mode === 'one') {
        audio.currentTime = 0;
        void audio.play().catch(() => {});
        return;
      }
      if (list.length === 0) {
        setLoadState('stopped');
        return;
      }

      const idx = list.findIndex((t) => t.id === currentTrackIdRef.current);
      let nextIdx = idx + 1;
      if (shuffleRef.current && list.length > 1) {
        do {
          nextIdx = Math.floor(Math.random() * list.length);
        } while (nextIdx === idx);
      } else if (nextIdx >= list.length) {
        if (mode === 'all') {
          nextIdx = 0;
        } else {
          setLoadState('stopped');
          setCurrentTime(0);
          return;
        }
      }

      const nextT = list[nextIdx];
      if (nextT) {
        setCurrentTrackId(nextT.id);
        try {
          localStorage.setItem(STORAGE_TRACK, nextT.id);
        } catch {
          // ignore
        }
        void loadAndPlayTrack(nextT);
      }
    };

    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('canplay', onCanPlay);
    audio.addEventListener('error', onError);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('canplay', onCanPlay);
      audio.removeEventListener('error', onError);
      audio.removeEventListener('ended', onEnded);
      clearFade();
      audio.pause();
    };
  }, [getOrCreateAudio, clearFade, loadAndPlayTrack]);

  // Keep native loop property synced with repeatMode
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = repeatMode === 'one';
    }
    try {
      localStorage.setItem(STORAGE_REPEAT, repeatMode);
    } catch {
      // ignore
    }
  }, [repeatMode]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_SHUFFLE, String(shuffle));
    } catch {
      // ignore
    }
  }, [shuffle]);

  const playTrack = useCallback(
    async (trackId?: string) => {
      const target = trackId
        ? MUSIC_TRACKS.find((t) => t.id === trackId) ?? currentTrack
        : currentTrack;
      if (target.id !== currentTrackIdRef.current) {
        setCurrentTrackId(target.id);
        setDuration(target.durationSec);
        setCurrentTime(0);
        try {
          localStorage.setItem(STORAGE_TRACK, target.id);
        } catch {
          // ignore
        }
      }
      await loadAndPlayTrack(target);
    },
    [currentTrack, loadAndPlayTrack]
  );

  const pauseMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setAutoplayNotice(null);
    fadeVolume(audio, 0, 220, () => {
      audio.pause();
      setLoadState('paused');
    });
  }, [fadeVolume]);

  const resumeMusic = useCallback(async () => {
    await playTrack(currentTrackIdRef.current);
  }, [playTrack]);

  const stopMusic = useCallback(() => {
    const audio = audioRef.current;
    setAutoplayNotice(null);
    setErrorMessage(null);
    if (!audio) {
      setLoadState('stopped');
      setCurrentTime(0);
      return;
    }
    fadeVolume(audio, 0, 200, () => {
      audio.pause();
      audio.currentTime = 0;
      setCurrentTime(0);
      setLoadState('stopped');
    });
  }, [fadeVolume]);

  const setMusicEnabled = useCallback(
    (nextEnabled: boolean) => {
      setEnabled(nextEnabled);
      if (nextEnabled) {
        void playTrack(currentTrackIdRef.current);
      } else {
        stopMusic();
      }
    },
    [playTrack, stopMusic]
  );

  const togglePlayPause = useCallback(async () => {
    if (loadState === 'playing') {
      pauseMusic();
    } else {
      await playTrack(currentTrackIdRef.current);
    }
  }, [loadState, pauseMusic, playTrack]);

  const selectTrack = useCallback(
    async (trackId: string, autoPlay = true) => {
      const target = MUSIC_TRACKS.find((t) => t.id === trackId);
      if (!target) return;
      setCurrentTrackId(target.id);
      setDuration(target.durationSec);
      setCurrentTime(0);
      setErrorMessage(null);
      try {
        localStorage.setItem(STORAGE_TRACK, target.id);
      } catch {
        // ignore
      }
      if (autoPlay || loadState === 'playing') {
        await loadAndPlayTrack(target);
      } else {
        const audio = getOrCreateAudio();
        audio.pause();
        audio.src = target.src;
        audio.load();
        setLoadState('ready');
      }
    },
    [loadState, loadAndPlayTrack, getOrCreateAudio]
  );

  const nextTrack = useCallback(async () => {
    const list = playlistTracks.length > 0 ? playlistTracks : MUSIC_TRACKS;
    const idx = list.findIndex((t) => t.id === currentTrackIdRef.current);
    let nextIdx = (idx + 1) % list.length;
    if (shuffleRef.current && list.length > 1) {
      do {
        nextIdx = Math.floor(Math.random() * list.length);
      } while (nextIdx === idx);
    }
    await selectTrack(list[nextIdx].id, true);
  }, [playlistTracks, selectTrack]);

  const previousTrack = useCallback(async () => {
    const list = playlistTracks.length > 0 ? playlistTracks : MUSIC_TRACKS;
    const idx = list.findIndex((t) => t.id === currentTrackIdRef.current);
    const prevIdx = (idx - 1 + list.length) % list.length;
    await selectTrack(list[prevIdx].id, true);
  }, [playlistTracks, selectTrack]);

  const selectPlaylist = useCallback(
    async (nextPlaylistId: string, startPlaying = false) => {
      const pl = MUSIC_PLAYLISTS.find((p) => p.id === nextPlaylistId);
      if (!pl) return;
      setPlaylistId(pl.id);
      try {
        localStorage.setItem(STORAGE_PLAYLIST, pl.id);
      } catch {
        // ignore
      }
      const firstId = pl.trackIds[0];
      if (firstId && (!pl.trackIds.includes(currentTrackIdRef.current) || startPlaying)) {
        await selectTrack(firstId, startPlaying || loadState === 'playing');
      }
    },
    [loadState, selectTrack]
  );

  const setVolume = useCallback(
    (vol: number) => {
      const clamped = Math.max(0, Math.min(1, vol));
      setVolumeState(clamped);
      volumeRef.current = clamped;
      if (clamped > 0 && mutedRef.current) {
        setIsMuted(false);
        mutedRef.current = false;
      }
      try {
        localStorage.setItem(STORAGE_VOLUME, String(clamped));
      } catch {
        // ignore
      }
      if (audioRef.current) {
        audioRef.current.muted = clamped === 0;
        clearFade();
        audioRef.current.volume = clamped;
      }
    },
    [clearFade]
  );

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      mutedRef.current = next;
      if (audioRef.current) {
        audioRef.current.muted = next;
        clearFade();
        audioRef.current.volume = next ? 0 : volumeRef.current;
      }
      return next;
    });
  }, [clearFade]);

  const cycleRepeatMode = useCallback(() => {
    setRepeatMode((prev) => (prev === 'one' ? 'all' : prev === 'all' ? 'off' : 'one'));
  }, []);

  const toggleShuffle = useCallback(() => {
    setShuffle((prev) => !prev);
  }, []);

  const retryCurrentTrack = useCallback(async () => {
    const audio = getOrCreateAudio();
    audio.src = '';
    await loadAndPlayTrack(currentTrack);
  }, [getOrCreateAudio, loadAndPlayTrack, currentTrack]);

  const value = useMemo<AudioContextValue>(
    () => ({
      enabled,
      isPlaying: loadState === 'playing',
      isPaused: loadState === 'paused',
      isLoading: loadState === 'loading',
      loadState,
      volume,
      isMuted,
      repeatMode,
      shuffle,
      currentTrack,
      activePlaylist,
      playlistTracks,
      currentTime,
      duration,
      errorMessage,
      autoplayNotice,
      setMusicEnabled,
      playTrack,
      pauseMusic,
      resumeMusic,
      stopMusic,
      togglePlayPause,
      nextTrack,
      previousTrack,
      selectTrack,
      selectPlaylist,
      setVolume,
      toggleMute,
      cycleRepeatMode,
      toggleShuffle,
      retryCurrentTrack,
    }),
    [
      enabled,
      loadState,
      volume,
      isMuted,
      repeatMode,
      shuffle,
      currentTrack,
      activePlaylist,
      playlistTracks,
      currentTime,
      duration,
      errorMessage,
      autoplayNotice,
      setMusicEnabled,
      playTrack,
      pauseMusic,
      resumeMusic,
      stopMusic,
      togglePlayPause,
      nextTrack,
      previousTrack,
      selectTrack,
      selectPlaylist,
      setVolume,
      toggleMute,
      cycleRepeatMode,
      toggleShuffle,
      retryCurrentTrack,
    ]
  );

  return <AmbientAudioContext.Provider value={value}>{children}</AmbientAudioContext.Provider>;
};

export function useAmbientAudio(): AudioContextValue {
  const ctx = useContext(AmbientAudioContext);
  if (!ctx) {
    throw new Error('useAmbientAudio must be used within AmbientAudioProvider');
  }
  return ctx;
}
