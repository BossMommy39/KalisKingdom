// Derived config + selectors built on top of appData.js (the source of truth).
import { appData } from './appData';

export const { activities, worlds, themeWeeks, storyCards, twixSays, assetMap } = appData;

// Resolve a world "twix" key -> public image URL (public/ is served at root by Vite).
export function twixImg(key) {
  const file = assetMap[key] || assetMap.welcome;
  return `/${file}`;
}

// The eight child-facing moods used across activities.
export const MOODS = [
  { key: 'Business Boss',   label: 'Business Boss',   blurb: 'Tiny CEO energy',        twix: 'royal',  color: '#2FBFD4' },
  { key: 'Sparkly',         label: 'Sparkly',         blurb: 'Make it shimmer',        twix: 'dreamy', color: '#EF82B6' },
  { key: 'Cozy',            label: 'Cozy',            blurb: 'Soft + slow',            twix: 'crown',  color: '#FF9E8C' },
  { key: 'Builder',         label: 'Builder',         blurb: 'Hands need a job',       twix: 'maker',  color: '#54CBA7' },
  { key: 'Tech Sorceress',  label: 'Tech Sorceress',  blurb: 'Screen time = power',    twix: 'maker',  color: '#A98CE6' },
  { key: 'Science',         label: 'Science',         blurb: 'Test a theory',          twix: 'cloud',  color: '#1B9BB0' },
  { key: 'Puppy/Twix',      label: 'Puppy / Twix',    blurb: 'For the puppy council',  twix: 'meadow', color: '#FFC247' },
  { key: 'Heist Crew',      label: 'Heist Crew',      blurb: 'Allegedly nothing',      twix: 'peek',   color: '#C8B6F2' },
];

export const moodByKey = Object.fromEntries(MOODS.map(m => [m.key, m]));

export function moodTwix(moodKey) {
  return twixImg(moodByKey[moodKey]?.twix || 'welcome');
}

export function moodColor(moodKey) {
  return moodByKey[moodKey]?.color || '#F6A06A';
}

// Mess-level traffic light.
export const messColor = {
  Green:  { bg: '#E4F6EC', fg: '#2E9367', dot: '#46C088', label: 'Tidy' },
  Yellow: { bg: '#FFF4DA', fg: '#C98A12', dot: '#F4B838', label: 'Some mess' },
  Red:    { bg: '#FFE3E3', fg: '#C8503F', dot: '#F1685A', label: 'Big mess' },
};

// A short Twix line that fits the chosen mood (falls back to a default voice line).
export function twixLineForMood(moodKey) {
  const m = (moodKey || '').toLowerCase();
  const hit = twixSays.find(t => (t.mood || '').toLowerCase().includes(m) && m.length > 2);
  if (hit) return hit.message;
  const home = twixSays.filter(t => t.home);
  return (home[Math.floor(Math.random() * home.length)] || twixSays[0]).message;
}

// World bible lookup (only the 10 fully-defined worlds exist here).
export const worldBibleByName = Object.fromEntries(worlds.map(w => [w.name, w]));

// Decorative art for world names that have NO bible (imagery only — never invented text).
const extraWorldArt = {
  "Kali’s Creations Shop": 'royal',
  "Cozy Craft Cabin": 'crown',
  "Builder Bay": 'maker',
  "Heist Crew HQ": 'peek',
  "Heavy Work Goblin Reset": 'cloud',
  "World Builder": 'dreamy',
  "Grow & Glow": 'meadow',
};

export function worldArtKey(worldName) {
  return worldBibleByName[worldName]?.twix || extraWorldArt[worldName] || 'welcome';
}

// Group every activity under its world name. Worlds with a bible come first (by
// priority); world-name-only groups follow alphabetically. No bible text invented.
export function groupedWorlds() {
  const byName = {};
  for (const a of activities) {
    (byName[a.world] ||= []).push(a);
  }
  const withBible = worlds
    .slice()
    .sort((x, y) => (x.priority || 99) - (y.priority || 99))
    .filter(w => byName[w.name])
    .map(w => ({ name: w.name, bible: w, art: worldArtKey(w.name), items: byName[w.name] }));

  const bibleNames = new Set(worlds.map(w => w.name));
  const withoutBible = Object.keys(byName)
    .filter(n => !bibleNames.has(n))
    .sort((a, b) => a.localeCompare(b))
    .map(n => ({ name: n, bible: null, art: worldArtKey(n), items: byName[n] }));

  return [...withBible, ...withoutBible];
}

export function activitiesByMood(moodKey) {
  if (!moodKey) return activities;
  return activities.filter(a => (a.moods || []).includes(moodKey));
}

export function activityById(id) {
  return activities.find(a => a.id === id);
}

export function drawRandom(pool = activities) {
  return pool[Math.floor(Math.random() * pool.length)];
}

// Narrative beats attached to a world (no invented content — straight from appData).
export function themeWeekFor(worldName) {
  return themeWeeks.find(t => t.world === worldName) || null;
}

export function storyCardsFor(worldName) {
  return storyCards.filter(s => s.world === worldName);
}
