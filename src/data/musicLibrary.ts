export type MusicCategory =
  | 'Calm & Focus'
  | 'Inspirational'
  | 'Ambient'
  | 'Cinematic'
  | 'Soft Piano'
  | 'Nature & Relaxation'
  | 'Deep Concentration';

export interface MusicTrack {
  id: string;
  title: string;
  category: MusicCategory;
  durationSec: number;
  durationLabel: string;
  src: string;
  mood: string;
}

export interface MusicPlaylist {
  id: string;
  name: string;
  description: string;
  trackIds: string[];
}

export const MUSIC_CATEGORIES: MusicCategory[] = [
  'Calm & Focus',
  'Inspirational',
  'Ambient',
  'Cinematic',
  'Soft Piano',
  'Nature & Relaxation',
  'Deep Concentration',
];

export const MUSIC_TRACKS: MusicTrack[] = [
  {
    id: 'morning-courtyard',
    title: 'Morning Courtyard Study',
    category: 'Calm & Focus',
    durationSec: 24,
    durationLabel: '0:24 · Seamless Loop',
    src: '/audio/morning-courtyard.mp3',
    mood: 'Warm felt piano & gentle strings for steady reading',
  },
  {
    id: 'clear-horizon',
    title: 'Clear Horizon',
    category: 'Calm & Focus',
    durationSec: 24,
    durationLabel: '0:24 · Seamless Loop',
    src: '/audio/clear-horizon.mp3',
    mood: 'Balanced acoustic chords for unhurried clarity',
  },
  {
    id: 'rising-compass',
    title: 'Rising Compass',
    category: 'Inspirational',
    durationSec: 24,
    durationLabel: '0:24 · Seamless Loop',
    src: '/audio/rising-compass.mp3',
    mood: 'Uplifting harp arpeggios and warm major harmonies',
  },
  {
    id: 'new-horizons',
    title: 'New Horizons',
    category: 'Inspirational',
    durationSec: 24,
    durationLabel: '0:24 · Seamless Loop',
    src: '/audio/new-horizons.mp3',
    mood: 'Bright optimistic cadence for fresh beginnings',
  },
  {
    id: 'pavilion-stillness',
    title: 'Pavilion Stillness',
    category: 'Ambient',
    durationSec: 26,
    durationLabel: '0:26 · Seamless Loop',
    src: '/audio/pavilion-stillness.mp3',
    mood: 'Airy museum-hall pad with delicate glass chimes',
  },
  {
    id: 'sapphire-drift',
    title: 'Sapphire Drift',
    category: 'Ambient',
    durationSec: 26,
    durationLabel: '0:26 · Seamless Loop',
    src: '/audio/sapphire-drift.mp3',
    mood: 'Slow-moving stereo harmonic wash for quiet thought',
  },
  {
    id: 'hall-of-principles',
    title: 'Hall of Principles',
    category: 'Cinematic',
    durationSec: 24,
    durationLabel: '0:24 · Seamless Loop',
    src: '/audio/hall-of-principles.mp3',
    mood: 'Noble chamber piano & deep string foundation',
  },
  {
    id: 'the-turning-point',
    title: 'The Turning Point',
    category: 'Cinematic',
    durationSec: 24,
    durationLabel: '0:24 · Seamless Loop',
    src: '/audio/the-turning-point.mp3',
    mood: 'Reflective cinematic progression for dilemma deliberation',
  },
  {
    id: 'quiet-reflections',
    title: 'Quiet Reflections',
    category: 'Soft Piano',
    durationSec: 24,
    durationLabel: '0:24 · Seamless Loop',
    src: '/audio/quiet-reflections.mp3',
    mood: 'Intimate solo felt piano in F major',
  },
  {
    id: 'evening-nocturne',
    title: 'Evening Nocturne',
    category: 'Soft Piano',
    durationSec: 24,
    durationLabel: '0:24 · Seamless Loop',
    src: '/audio/evening-nocturne.mp3',
    mood: 'Expressive twilight piano ballad for journaling',
  },
  {
    id: 'rain-on-stone-arches',
    title: 'Rain on Stone Arches',
    category: 'Nature & Relaxation',
    durationSec: 26,
    durationLabel: '0:26 · Seamless Loop',
    src: '/audio/rain-on-stone-arches.mp3',
    mood: 'Soft stereo rainfall blended with gentle harp',
  },
  {
    id: 'coastal-breeze',
    title: 'Coastal Breeze',
    category: 'Nature & Relaxation',
    durationSec: 26,
    durationLabel: '0:26 · Seamless Loop',
    src: '/audio/coastal-breeze.mp3',
    mood: 'Rolling ocean surf with warm acoustic overtones',
  },
  {
    id: 'theta-flow',
    title: 'Theta Flow',
    category: 'Deep Concentration',
    durationSec: 24,
    durationLabel: '0:24 · Seamless Loop',
    src: '/audio/theta-flow.mp3',
    mood: 'Minimal rhythmic marimba pulse for deep study',
  },
  {
    id: 'steady-cadence',
    title: 'Steady Cadence',
    category: 'Deep Concentration',
    durationSec: 24,
    durationLabel: '0:24 · Seamless Loop',
    src: '/audio/steady-cadence.mp3',
    mood: 'Clean, focused rhythmic pulse for quizzes & case studies',
  },
];

export const MUSIC_PLAYLISTS: MusicPlaylist[] = [
  {
    id: 'all-studio',
    name: 'Complete Ethics Studio',
    description: 'All 14 original royalty-free instrumental tracks across every mood.',
    trackIds: MUSIC_TRACKS.map((t) => t.id),
  },
  {
    id: 'study-focus',
    name: 'Deep Study & Reading',
    description: 'Calm piano, minimal concentration pulses, and quiet ambient pads.',
    trackIds: ['morning-courtyard', 'clear-horizon', 'theta-flow', 'steady-cadence', 'quiet-reflections'],
  },
  {
    id: 'reflection-journal',
    name: 'Journaling & Calm Nature',
    description: 'Intimate piano nocturnes paired with rainfall and coastal calm.',
    trackIds: ['quiet-reflections', 'evening-nocturne', 'rain-on-stone-arches', 'coastal-breeze', 'pavilion-stillness'],
  },
  {
    id: 'decision-theatre',
    name: 'Deliberation & Inspiration',
    description: 'Cinematic and uplifting instrumental themes for dilemmas and paths.',
    trackIds: ['hall-of-principles', 'the-turning-point', 'rising-compass', 'new-horizons', 'sapphire-drift'],
  },
];
