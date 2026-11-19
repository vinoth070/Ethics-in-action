import React, { useMemo, useState } from 'react';
import {
  Music,
  Play,
  Pause,
  Square,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  Repeat1,
  Shuffle,
  RotateCcw,
  ListMusic,
  AlertCircle,
  Loader2,
  Check,
} from 'lucide-react';
import { useAmbientAudio } from '../context/AudioContext';
import {
  MUSIC_CATEGORIES,
  MUSIC_PLAYLISTS,
  MUSIC_TRACKS,
  MusicCategory,
} from '../data/musicLibrary';

function formatSec(sec: number): string {
  const safe = Math.max(0, Math.floor(sec || 0));
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export const MusicStudioPanel: React.FC = () => {
  const {
    enabled,
    isPlaying,
    isPaused,
    isLoading,
    loadState,
    volume,
    isMuted,
    repeatMode,
    shuffle,
    currentTrack,
    activePlaylist,
    currentTime,
    duration,
    errorMessage,
    autoplayNotice,
    setMusicEnabled,
    togglePlayPause,
    stopMusic,
    nextTrack,
    previousTrack,
    selectTrack,
    selectPlaylist,
    setVolume,
    toggleMute,
    cycleRepeatMode,
    toggleShuffle,
    retryCurrentTrack,
  } = useAmbientAudio();

  const [selectedCategory, setSelectedCategory] = useState<'All' | MusicCategory>('All');

  const filteredTracks = useMemo(() => {
    if (selectedCategory === 'All') return MUSIC_TRACKS;
    return MUSIC_TRACKS.filter((t) => t.category === selectedCategory);
  }, [selectedCategory]);

  const progressPct = duration > 0 ? Math.min(100, Math.round((currentTime / duration) * 100)) : 0;

  const statusLabel =
    loadState === 'loading'
      ? 'Loading audio file...'
      : loadState === 'playing'
      ? isMuted
        ? 'Playing (Muted)'
        : 'Playing audibly'
      : loadState === 'paused'
      ? 'Paused'
      : loadState === 'stopped'
      ? 'Stopped'
      : loadState === 'error'
      ? 'Audio error'
      : 'Off (Default)';

  return (
    <div className="space-y-8">
      {/* MASTER PLAYER DECK */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F1A2E] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-[#2563EB] dark:text-[#EAB308]">
              <Music className="w-4 h-4" aria-hidden="true" />
              <span>Background Music Settings · Ethics Music Studio</span>
            </div>
            <h2 className="mt-1.5 font-editorial text-2xl sm:text-3xl font-semibold text-[#0B162C] dark:text-white">
              Instrumental Background Music
            </h2>
            <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              14 original, locally bundled royalty-free MP3 instrumental tracks across 7 moods.
              Music starts OFF by default and continues uninterrupted as you navigate between pages.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              Music {enabled ? 'ON' : 'OFF'}
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={enabled}
              onClick={() => setMusicEnabled(!enabled)}
              aria-label="Enable Background Music"
              className={`relative w-14 h-8 rounded-full transition-colors cursor-pointer ${
                enabled
                  ? 'bg-[#2563EB] dark:bg-[#EAB308]'
                  : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <span
                className={`block w-6 h-6 rounded-full bg-white dark:bg-[#070D1A] shadow transition-transform ${
                  enabled ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Notices & Error Recovery */}
        {autoplayNotice && (
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 text-xs sm:text-sm text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
            <span>{autoplayNotice}</span>
          </div>
        )}

        {errorMessage && (
          <div className="p-4 rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 text-xs sm:text-sm text-red-800 dark:text-red-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
              <span>{errorMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => void retryCurrentTrack()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-700 text-white hover:bg-red-800 cursor-pointer whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Active Deck Console */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B1426] p-5 sm:p-6 space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-mono text-[#2563EB] dark:text-[#EAB308]">
                {currentTrack.category} · Playlist: {activePlaylist.name}
              </p>
              <h3 className="mt-1 font-editorial text-xl font-bold text-[#0B162C] dark:text-white">
                {currentTrack.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {currentTrack.mood}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-300 shrink-0">
              {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />}
              <span>Status: {statusLabel}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#2563EB] to-[#B47B1B] dark:from-[#60A5FA] dark:to-[#EAB308] transition-all duration-200"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className="mt-1.5 flex items-center justify-between text-[11px] font-mono tabular-nums text-slate-500 dark:text-slate-400">
              <span>{formatSec(currentTime)}</span>
              <span>{formatSec(duration)}</span>
            </div>
          </div>

          {/* Transport Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => void previousTrack()}
                aria-label="Previous track"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0F1A2E] text-[#0B162C] dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => void togglePlayPause()}
                className="inline-flex items-center gap-2 px-5 h-10 rounded-lg text-sm font-semibold text-white bg-[#0B162C] hover:bg-[#192C52] dark:bg-[#EAB308] dark:text-[#070D1A] dark:hover:bg-[#FACC15] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    <span>Loading</span>
                  </>
                ) : isPlaying ? (
                  <>
                    <Pause className="w-4 h-4" aria-hidden="true" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" aria-hidden="true" />
                    <span>{isPaused ? 'Resume' : 'Play'}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={stopMusic}
                aria-label="Stop music"
                className="inline-flex items-center gap-1.5 px-3.5 h-10 rounded-lg text-xs sm:text-sm font-medium border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0F1A2E] text-[#0B162C] dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Square className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Stop</span>
              </button>

              <button
                type="button"
                onClick={() => void nextTrack()}
                aria-label="Next track"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0F1A2E] text-[#0B162C] dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={cycleRepeatMode}
                className={`inline-flex items-center gap-1.5 px-3 h-10 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  repeatMode !== 'off'
                    ? 'border-[#2563EB] dark:border-[#EAB308] text-[#2563EB] dark:text-[#EAB308] bg-white dark:bg-[#132240]'
                    : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 bg-white dark:bg-[#0F1A2E]'
                }`}
              >
                {repeatMode === 'one' ? (
                  <Repeat1 className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Repeat className="w-4 h-4" aria-hidden="true" />
                )}
                <span>
                  Repeat: {repeatMode === 'one' ? 'Track' : repeatMode === 'all' ? 'Playlist' : 'Off'}
                </span>
              </button>

              <button
                type="button"
                onClick={toggleShuffle}
                aria-pressed={shuffle}
                className={`inline-flex items-center gap-1.5 px-3 h-10 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  shuffle
                    ? 'border-[#2563EB] dark:border-[#EAB308] text-[#2563EB] dark:text-[#EAB308] bg-white dark:bg-[#132240]'
                    : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 bg-white dark:bg-[#0F1A2E]'
                }`}
              >
                <Shuffle className="w-4 h-4" aria-hidden="true" />
                <span>Shuffle {shuffle ? 'On' : 'Off'}</span>
              </button>
            </div>
          </div>

          {/* Volume Slider & Mute */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center gap-4">
            <button
              type="button"
              onClick={toggleMute}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0F1A2E] text-[#0B162C] dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 whitespace-nowrap shrink-0 cursor-pointer"
            >
              {isMuted || volume === 0 ? (
                <>
                  <VolumeX className="w-4 h-4 text-red-600 dark:text-red-400" aria-hidden="true" />
                  <span>Unmute</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-[#2563EB] dark:text-[#EAB308]" aria-hidden="true" />
                  <span>Mute</span>
                </>
              )}
            </button>

            <div className="flex-1 flex items-center gap-3">
              <label
                htmlFor="studio-volume-slider"
                className="text-xs font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap"
              >
                Volume
              </label>
              <input
                id="studio-volume-slider"
                type="range"
                min={0}
                max={100}
                value={isMuted ? 0 : Math.round(volume * 100)}
                onChange={(e) => setVolume(Number(e.target.value) / 100)}
                className="w-full accent-[#2563EB] dark:accent-[#EAB308] cursor-pointer"
              />
              <span className="font-mono tabular-nums text-xs font-semibold text-slate-700 dark:text-slate-200 w-10 text-right">
                {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CURATED PLAYLISTS */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F1A2E] p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-2">
          <ListMusic className="w-5 h-5 text-[#2563EB] dark:text-[#EAB308]" aria-hidden="true" />
          <h3 className="font-editorial text-xl sm:text-2xl font-semibold text-[#0B162C] dark:text-white">
            Curated Playlists
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MUSIC_PLAYLISTS.map((pl) => {
            const isSelected = pl.id === activePlaylist.id;
            return (
              <button
                key={pl.id}
                type="button"
                onClick={() => void selectPlaylist(pl.id, true)}
                className={`text-left p-4 rounded-xl border transition-all flex flex-col justify-between gap-3 cursor-pointer ${
                  isSelected
                    ? 'border-[#2563EB] dark:border-[#EAB308] bg-[#EFF6FF]/60 dark:bg-[#152440]'
                    : 'border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0B1426] hover:border-slate-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      {pl.trackIds.length} tracks
                    </span>
                    {isSelected && (
                      <span className="text-xs font-semibold text-[#2563EB] dark:text-[#EAB308]">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 font-semibold text-sm text-[#0B162C] dark:text-white">
                    {pl.name}
                  </p>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {pl.description}
                  </p>
                </div>
                <span className="text-xs font-semibold text-[#2563EB] dark:text-[#EAB308]">
                  Play Playlist
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 7-CATEGORY TRACK LIBRARY */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F1A2E] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h3 className="font-editorial text-xl sm:text-2xl font-semibold text-[#0B162C] dark:text-white">
              Instrumental Track Library ({MUSIC_TRACKS.length} Tracks)
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Filter by mood category, preview any track immediately, or select it for continuous
              study playback.
            </p>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {(['All', ...MUSIC_CATEGORIES] as ('All' | MusicCategory)[]).map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#0B162C] text-white border-[#0B162C] dark:bg-[#EAB308] dark:text-[#070D1A] dark:border-[#EAB308]'
                    : 'bg-white dark:bg-[#0B1426] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-400'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Track Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTracks.map((track) => {
            const isCurrent = track.id === currentTrack.id;
            const isThisPlaying = isCurrent && isPlaying;
            return (
              <div
                key={track.id}
                className={`p-4 sm:p-5 rounded-xl border transition-all flex flex-col justify-between gap-4 ${
                  isCurrent
                    ? 'border-[#2563EB] dark:border-[#EAB308] bg-[#EFF6FF]/50 dark:bg-[#142340]'
                    : 'border-slate-200 dark:border-slate-800 bg-[#F8FAFC] dark:bg-[#0B1426]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      {track.category} · {track.durationLabel}
                    </span>
                    {isThisPlaying ? (
                      <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                        Now Playing
                      </span>
                    ) : isCurrent ? (
                      <span className="text-xs font-semibold text-[#2563EB] dark:text-[#EAB308]">
                        Selected
                      </span>
                    ) : null}
                  </div>
                  <h4 className="mt-1.5 font-semibold text-base text-[#0B162C] dark:text-white">
                    {track.title}
                  </h4>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {track.mood}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-200/70 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      if (isThisPlaying) {
                        void togglePlayPause();
                      } else {
                        void selectTrack(track.id, true);
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-[#0B162C] hover:bg-[#192C52] dark:bg-[#EAB308] dark:text-[#070D1A] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {isThisPlaying ? (
                      <>
                        <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Play Preview</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => void selectTrack(track.id, false)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0F1A2E] text-[#0B162C] dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {isCurrent && <Check className="w-3.5 h-3.5" aria-hidden="true" />}
                    <span>{isCurrent ? 'Selected' : 'Select Track'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
