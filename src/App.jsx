import { useState, useMemo, useCallback } from 'react';
import {
  activities, MOODS, twixImg, activitiesByMood, drawRandom, activityById,
} from './data/kingdom';
import { useGallery, useTodayDoors } from './hooks/useStorage';
import TwixHero from './components/TwixHero';
import MoodPicker from './components/MoodPicker';
import QuestDoors from './components/QuestDoors';
import QuestCard from './components/QuestCard';
import QuestModal from './components/QuestModal';
import CelebrationOverlay from './components/CelebrationOverlay';
import GalleryView from './components/GalleryView';
import WorldsView from './components/WorldsView';
import MommyMode from './components/MommyMode';
import SoftNav from './components/SoftNav';

export default function App() {
  const [view, setView] = useState('home');
  const [mood, setMood] = useState(null);
  const [openQuest, setOpenQuest] = useState(null);
  const [celebrating, setCelebrating] = useState(null);
  const [questFilter, setQuestFilter] = useState(null);

  const { items: gallery, addItem, removeItem, clearGallery } = useGallery();
  const { doors, setTodayDoors, mommyMood, setMommyMood, hasDoors } = useTodayDoors();

  // Today's quests (the doors Mommy picked), ranked by the kid's current mood.
  const todayQuests = useMemo(() => {
    const list = doors.map(activityById).filter(Boolean);
    if (!mood) return list;
    return [...list].sort((a, b) => {
      const am = a.moods?.includes(mood) ? 0 : 1;
      const bm = b.moods?.includes(mood) ? 0 : 1;
      return am - bm;
    });
  }, [doors, mood]);

  // Mood-based suggestions for when Mommy hasn't set any doors.
  const suggestions = useMemo(() => {
    const base = activitiesByMood(mommyMood || mood);
    return base.slice(0, 6);
  }, [mood, mommyMood]);

  const filteredQuests = useMemo(
    () => (questFilter ? activitiesByMood(questFilter) : activities),
    [questFilter]
  );

  const drawQuest = useCallback(() => {
    const pool = hasDoors ? todayQuests : (suggestions.length ? suggestions : activities);
    setOpenQuest(drawRandom(pool));
  }, [hasDoors, todayQuests, suggestions]);

  const completeQuest = useCallback((activity) => {
    setOpenQuest(null);
    addItem(activity, 'quick');
    setCelebrating({ activity, tier: 'quick' });
  }, [addItem]);

  const goMommy = () => setView('mommy');

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-badge"><img src={twixImg('crown')} alt="" /></span>
          <div>
            <h1>Kali’s Kingdom</h1>
            <p>Hosted by Twix 🐾</p>
          </div>
        </div>
        <span className="spacer" />
        <button className="pill-btn" onClick={goMommy}>💗 Mommy</button>
      </header>

      {view === 'home' && (
        <div className="fade-in">
          <TwixHero mood={mood} onDraw={drawQuest} />
          <div className="section">
            <div className="section-head"><h2>How’s Kali feeling?</h2></div>
            <MoodPicker activeMood={mood} onChangeMood={setMood} />
          </div>

          <div className="section">
            {hasDoors ? (
              <>
                <div className="section-head"><h2>Today’s Quest Doors</h2><span className="count">{todayQuests.length}</span></div>
                <QuestDoors items={todayQuests} onOpen={setOpenQuest} />
              </>
            ) : (
              <>
                <div className="section-head"><h2>Twix’s picks for you</h2></div>
                <div className="mommy-note">
                  No doors set for today yet. Here are some quests that match the mood —
                  or tap “Ask Mommy” to have a grown-up choose today’s doors.
                </div>
                <div className="hero-actions" style={{ marginBottom: 14 }}>
                  <button className="pill-btn solid" onClick={goMommy}>💗 Ask Mommy</button>
                </div>
                <div className="card-grid">
                  {suggestions.map(a => <QuestCard key={a.id} activity={a} onOpen={setOpenQuest} />)}
                </div>
              </>
            )}
          </div>

          {gallery.length > 0 && (
            <div className="section">
              <div className="section-head"><h2>Recent creations</h2><span className="count">{gallery.length}</span></div>
              <GalleryView items={gallery.slice(0, 3)} />
              <div className="hero-actions" style={{ marginTop: 12 }}>
                <button className="pill-btn" onClick={() => setView('gallery')}>See all {gallery.length} →</button>
              </div>
            </div>
          )}
        </div>
      )}

      {view === 'worlds' && <WorldsView onOpenQuest={setOpenQuest} />}

      {view === 'quests' && (
        <div className="fade-in">
          <div className="section-head"><h2>All Quests</h2><span className="count">{filteredQuests.length} of {activities.length}</span></div>
          <div className="filter-row">
            <button className={`chip-mini ${!questFilter ? 'active' : ''}`} onClick={() => setQuestFilter(null)}>All</button>
            {MOODS.map(m => (
              <button
                key={m.key}
                className={`chip-mini ${questFilter === m.key ? 'active' : ''}`}
                onClick={() => setQuestFilter(questFilter === m.key ? null : m.key)}
              >{m.label}</button>
            ))}
          </div>
          <div className="card-grid">
            {filteredQuests.map(a => <QuestCard key={a.id} activity={a} onOpen={setOpenQuest} />)}
          </div>
        </div>
      )}

      {view === 'gallery' && (
        <div className="fade-in">
          <div className="section-head"><h2>Kali’s Gallery</h2></div>
          <div className="section-sub">Every quest you finish gets stamped here — and stays, day after day.</div>
          <GalleryView items={gallery} onRemove={removeItem} onClear={clearGallery} />
        </div>
      )}

      {view === 'mommy' && (
        <MommyMode
          currentDoors={doors}
          onSetDoors={(ids) => { setTodayDoors(ids); setView('home'); }}
          onClose={() => setView('home')}
          galleryItems={gallery}
          mommyMood={mommyMood}
          onSetMood={setMommyMood}
        />
      )}

      {(view === 'home' || view === 'quests') && (
        <button className="fab-draw" onClick={drawQuest}>🎲 Draw a Quest</button>
      )}

      {openQuest && (
        <QuestModal activity={openQuest} onClose={() => setOpenQuest(null)} onComplete={completeQuest} />
      )}

      {celebrating && (
        <CelebrationOverlay
          activity={celebrating.activity}
          tier={celebrating.tier}
          onDone={() => setCelebrating(null)}
        />
      )}

      <SoftNav active={view} onNavigate={setView} />
    </div>
  );
}
