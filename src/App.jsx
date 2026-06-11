import { useState, useMemo, useCallback } from 'react';
import { activities, MOODS, twixImg, activitiesByMood, drawRandom, activityById } from './data/kingdom';
import { useGallery, useTodayDoors } from './hooks/useStorage';
import { useProgress, nextWorldName } from './hooks/useProgress';
import KingdomMap from './components/KingdomMap';
import WorldChapter from './components/WorldChapter';
import QuestCard from './components/QuestCard';
import QuestModal from './components/QuestModal';
import CelebrationOverlay from './components/CelebrationOverlay';
import GalleryView from './components/GalleryView';
import MommyMode from './components/MommyMode';
import SoftNav from './components/SoftNav';
import Icon from './components/Icon';

function Clouds() {
  const clouds = [
    { top: '8%',  w: 120, h: 36, dur: 80, delay: 0 },
    { top: '24%', w: 80,  h: 26, dur: 110, delay: -30 },
    { top: '52%', w: 150, h: 44, dur: 95, delay: -60 },
    { top: '74%', w: 90,  h: 28, dur: 130, delay: -10 },
  ];
  return (
    <div className="sky-clouds" aria-hidden>
      {clouds.map((c, i) => (
        <span key={i} className="cloud" style={{
          top: c.top, width: c.w, height: c.h,
          animationDuration: `${c.dur}s`, animationDelay: `${c.delay}s`,
        }} />
      ))}
    </div>
  );
}

export default function App() {
  const [view, setView] = useState('map');
  const [selectedWorld, setSelectedWorld] = useState(null);
  const [questFilter, setQuestFilter] = useState(null);
  const [openQuest, setOpenQuest] = useState(null);
  const [celebrating, setCelebrating] = useState(null);

  const { items: gallery, addItem, removeItem, clearGallery } = useGallery();
  const { doors, setTodayDoors, mommyMood, setMommyMood } = useTodayDoors();
  const progress = useProgress(gallery);

  const todayWorlds = useMemo(
    () => [...new Set(doors.map(id => activityById(id)?.world).filter(Boolean))],
    [doors]
  );

  const unlockedPool = useMemo(
    () => progress.nodes.filter(n => n.unlocked).flatMap(n => n.items),
    [progress.nodes]
  );

  const filteredQuests = useMemo(
    () => (questFilter ? activitiesByMood(questFilter) : activities),
    [questFilter]
  );

  const drawQuest = useCallback(() => {
    const pool = unlockedPool.length ? unlockedPool : activities;
    setOpenQuest(drawRandom(pool));
  }, [unlockedPool]);

  const completeQuest = useCallback((activity, tier) => {
    // Will this completion unlock the next chapter? (true when it's the first finish in its world)
    const node = progress.nodes.find(n => n.name === activity.world);
    const firstInWorld = node && node.done === 0;
    const nextName = nextWorldName(progress.nodes, activity.world);
    const nextNode = progress.nodes.find(n => n.name === nextName);
    const unlockedWorld = firstInWorld && nextNode && !nextNode.unlocked ? nextName : null;

    setOpenQuest(null);
    addItem(activity, tier);
    setCelebrating({ activity, tier, unlockedWorld });
  }, [addItem, progress.nodes]);

  const openWorld = (name) => { setSelectedWorld(name); window.scrollTo(0, 0); };
  const goView = (v) => { setSelectedWorld(null); setView(v); window.scrollTo(0, 0); };

  const chapterNode = selectedWorld ? progress.nodes.find(n => n.name === selectedWorld) : null;

  return (
    <div className="app-shell">
      <Clouds />

      <header className="topbar">
        <div className="brand">
          <span className="brand-badge"><img src={twixImg('crown')} alt="" /></span>
          <div>
            <h1>Kali’s Kingdom</h1>
            <p>Hosted by Twix</p>
          </div>
        </div>
        <span className="spacer" />
        <button className="pill-btn ghost" onClick={() => goView('mommy')}>
          <Icon name="heart" size={18} /> Parent
        </button>
      </header>

      {view === 'map' && (chapterNode
        ? <WorldChapter node={chapterNode} onBack={() => setSelectedWorld(null)} onOpenQuest={setOpenQuest} />
        : <KingdomMap
            nodes={progress.nodes}
            level={progress.level}
            totalDone={progress.totalDone}
            todayWorlds={todayWorlds}
            currentIndex={progress.currentIndex}
            onOpenWorld={openWorld}
          />
      )}

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
          onSetDoors={(ids) => { setTodayDoors(ids); goView('map'); }}
          onClose={() => goView('map')}
          galleryItems={gallery}
          mommyMood={mommyMood}
          onSetMood={setMommyMood}
        />
      )}

      {(view === 'map' && !chapterNode) || view === 'quests' ? (
        <button className="fab-draw" onClick={drawQuest}><Icon name="dice" size={20} /> Draw a Quest</button>
      ) : null}

      {openQuest && (
        <QuestModal activity={openQuest} onClose={() => setOpenQuest(null)} onComplete={completeQuest} />
      )}

      {celebrating && (
        <CelebrationOverlay
          activity={celebrating.activity}
          tier={celebrating.tier}
          unlockedWorld={celebrating.unlockedWorld}
          onDone={() => setCelebrating(null)}
        />
      )}

      <SoftNav active={view} onNavigate={goView} />
    </div>
  );
}
