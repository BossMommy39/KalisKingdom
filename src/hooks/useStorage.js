import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEYS = {
  gallery: 'kk_gallery',
  todayDoors: 'kk_today_doors',
  todayDate: 'kk_today_date',
  mommyMood: 'kk_mommy_mood',
};

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

// Gallery: completed quests with timestamps — persists across days.
export function useGallery() {
  const [items, setItems] = useState(() => load(STORAGE_KEYS.gallery, []));

  useEffect(() => { save(STORAGE_KEYS.gallery, items); }, [items]);

  const addItem = useCallback((activity, tier, title) => {
    setItems(prev => [{
      id: `gal-${Date.now()}`,
      activityId: activity.id,
      activityName: activity.name,
      badge: activity.badge,
      tier,
      title: title || activity.name,
      caption: activity.galleryCaption,
      world: activity.world,
      completedAt: new Date().toISOString(),
    }, ...prev]);
  }, []);

  const removeItem = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const clearGallery = useCallback(() => setItems([]), []);

  return { items, addItem, removeItem, clearGallery };
}

// Today's doors (the activity IDs Mommy picked) + the suggestion mood.
// Resets automatically when the calendar day changes.
export function useTodayDoors() {
  const today = new Date().toDateString();

  const [doors, setDoors] = useState(() => {
    const savedDate = load(STORAGE_KEYS.todayDate, '');
    return savedDate === today ? load(STORAGE_KEYS.todayDoors, []) : [];
  });

  const [mommyMood, setMommyMoodState] = useState(() => {
    const savedDate = load(STORAGE_KEYS.todayDate, '');
    return savedDate === today ? load(STORAGE_KEYS.mommyMood, null) : null;
  });

  useEffect(() => {
    save(STORAGE_KEYS.todayDoors, doors);
    save(STORAGE_KEYS.mommyMood, mommyMood);
    save(STORAGE_KEYS.todayDate, new Date().toDateString());
  }, [doors, mommyMood]);

  const setTodayDoors = useCallback((ids) => setDoors(ids), []);
  const setMommyMood = useCallback((mood) => setMommyMoodState(mood), []);
  const clearDoors = useCallback(() => { setDoors([]); setMommyMoodState(null); }, []);

  return { doors, setTodayDoors, mommyMood, setMommyMood, clearDoors, hasDoors: doors.length > 0 };
}
