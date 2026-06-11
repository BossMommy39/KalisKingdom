import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEYS = {
  gallery: 'kk_gallery',
  todayDoors: 'kk_today_doors',
  todayDate: 'kk_today_date',
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

// Gallery: completed quests with timestamps
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

  const clearGallery = useCallback(() => setItems([]), []);

  return { items, addItem, clearGallery };
}

// Today's doors: which activity IDs mommy picked
export function useTodayDoors() {
  const today = new Date().toDateString();
  const [doors, setDoors] = useState(() => {
    const savedDate = load(STORAGE_KEYS.todayDate, '');
    if (savedDate === today) return load(STORAGE_KEYS.todayDoors, []);
    return [];
  });

  useEffect(() => {
    save(STORAGE_KEYS.todayDoors, doors);
    save(STORAGE_KEYS.todayDate, new Date().toDateString());
  }, [doors]);

  const setTodayDoors = useCallback((ids) => {
    setDoors(ids);
  }, []);

  const hasDoors = doors.length > 0;

  return { doors, setTodayDoors, hasDoors };
}
