import { useMemo } from 'react';
import { groupedWorlds } from '../data/kingdom';

// Twix "levels up" as the kingdom grows — purely cosmetic, derived from completions.
const LEVELS = [
  { at: 0,  title: 'New Royal Maker' },
  { at: 3,  title: 'Studio Apprentice' },
  { at: 6,  title: 'Quest Knight' },
  { at: 10, title: 'World Builder' },
  { at: 16, title: 'Kingdom Hero' },
  { at: 24, title: 'Legendary Founder' },
];

// Derives the kingdom journey from the gallery's completed quests. Worlds unlock in
// order (by priority, then clusters): the first is always open; each next world opens
// once the previous one has at least one finished quest. No extra storage needed.
export function useProgress(galleryItems) {
  return useMemo(() => {
    const worlds = groupedWorlds(); // ordered: bible worlds (by priority) then clusters
    const doneIds = new Set(galleryItems.map(g => g.activityId));

    let prevHadOne = true; // first world always unlocked
    const nodes = worlds.map((w) => {
      const total = w.items.length;
      const done = w.items.filter(a => doneIds.has(a.id)).length;
      const unlocked = prevHadOne;
      prevHadOne = done >= 1; // gate the next world on this one having ≥1 done
      return { ...w, total, done, complete: total > 0 && done >= total, unlocked };
    });

    const totalDone = galleryItems.length;
    const level = [...LEVELS].reverse().find(l => totalDone >= l.at) || LEVELS[0];
    const currentIndex = Math.max(0, nodes.findIndex(n => n.unlocked && !n.complete));
    const nextLocked = nodes.find(n => !n.unlocked) || null;

    return { nodes, totalDone, level, currentIndex, nextLocked };
  }, [galleryItems]);
}

// Given the node list + a world name, was the *next* world just unlocked by finishing
// a quest here? Used to show a celebratory "world unlocked" moment.
export function nextWorldName(nodes, worldName) {
  const i = nodes.findIndex(n => n.name === worldName);
  return i >= 0 && i + 1 < nodes.length ? nodes[i + 1].name : null;
}
