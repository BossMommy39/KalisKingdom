import { useState, useMemo, useCallback } from 'react';
import { activities, twixMessagesByMood, moodTwixImage, moodColors, MOODS, moodEmoji } from './data/activities';
import { useGallery, useTodayDoors } from './hooks/useStorage';
import Header from './components/Header';
import TwixHero from './components/TwixHero';
import MoodPicker from './components/MoodPicker';
import QuestDoors from './components/QuestDoors';
import QuestModal from './components/QuestModal';
import CelebrationOverlay from './components/CelebrationOverlay';
import GalleryView from './components/GalleryView';
import AskMommy from './components/AskMommy';
import MommyMode from './components/MommyMode';
import SoftNav from './components/SoftNav';

export default function App() {
  const [activeMood, setActiveMood] = useState('Sparkly');
  const [activeView, setActiveView] = useState('today'); // today | gallery | mommy
  const [openQuest, setOpenQuest] = useState(null);
  const [celebrating, setCelebrating] = useState(null);

  const { items: galleryItems, addItem: addGalleryItem } = useGallery();
  const { doors, setTodayDoors, hasDoors } = useTodayDoors();

  const twixMsg = twixMessagesByMood[activeMood] ?? twixMessagesByMood.Sparkly;
  const twixImg = moodTwixImage[activeMood] ?? moodTwixImage.Sparkly;
  const colors = moodColors[activeMood] ?? moodColors.Sparkly;

  // Get today's activities from the doors mommy picked
  const todayActivities = useMemo(() => {
    if (!hasDoors) return [];
    return doors
      .map(id => activities.find(a => a.id === id))
      .filter(Boolean);
  }, [doors, hasDoors]);

  // Rank by current mood
  const rankedActivities = useMemo(() => {
    return [...todayActivities].sort((a, b) => {
      const aMatch = a.moods.includes(activeMood) ? 0 : 1;
      const bMatch = b.moods.includes(activeMood) ? 0 : 1;
      return aMatch - bMatch;
    });
  }, [todayActivities, activeMood]);

  // Suggested activities for "Ask Mommy" mode
  const suggestedActivities = useMemo(() => {
    return activities
      .filter(a => a.moods.includes(activeMood))
      .slice(0, 5);
  }, [activeMood]);

  // Draw a random quest from today's doors
  const drawQuest = useCallback(() => {
    if (rankedActivities.length === 0) return;
    const random = rankedActivities[Math.floor(Math.random() * rankedActivities.length)];
    setOpenQuest(random);
  }, [rankedActivities]);

  // Complete a quest
  const completeQuest = useCallback((activity, tier) => {
    setOpenQuest(null);
    addGalleryItem(activity, tier);
    setCelebrating({ activity, tier });
    setTimeout(() => setCelebrating(null), 3000);
  }, [addGalleryItem]);

  // Handle mood change with Mommy Mode suggestion flow
  const handleSetDoors = useCallback((ids) => {
    setTodayDoors(ids);
    setActiveView('today');
  }, [setTodayDoors]);

  const bgStyle = {
    '--mood-accent': colors.accent,
    '--mood-bg': colors.bg,
  };

  return (
    <div className="kingdom" style={bgStyle}>
      {activeView === 'mommy' ? (
        <MommyMode
          activities={activities}
          currentDoors={doors}
          onSetDoors={handleSetDoors}
          onClose={() => setActiveView('today')}
          galleryItems={galleryItems}
        />
      ) : activeView === 'gallery' ? (
        <>
          <Header />
          <div className="kk-card">
            <h2 className="kk-title" style={{ fontSize: '1.3rem' }}>Gallery</h2>
            <p className="kk-subtitle">Every completed quest lives here forever.</p>
            <GalleryView items={galleryItems} />
          </div>
        </>
      ) : (
        <>
          <Header />
          <TwixHero
            mood={activeMood}
            message={twixMsg}
            imageSrc={twixImg}
            accentColor={colors.accent}
          />
          <MoodPicker
            moods={MOODS}
            activeMood={activeMood}
            onChangeMood={setActiveMood}
            moodEmoji={moodEmoji}
          />

          {hasDoors ? (
            <QuestDoors
              activities={rankedActivities}
              onOpenQuest={setOpenQuest}
              onDrawQuest={drawQuest}
              accentColor={colors.accent}
            />
          ) : (
            <AskMommy
              suggestions={suggestedActivities}
              onOpenMommy={() => setActiveView('mommy')}
              mood={activeMood}
            />
          )}

          {galleryItems.length > 0 && (
            <div className="kk-card stagger-in">
              <h3 className="kk-title" style={{ fontSize: '1.1rem' }}>Recent Creations</h3>
              <GalleryView items={galleryItems.slice(0, 3)} />
              {galleryItems.length > 3 && (
                <button
                  className="kk-btn kk-btn--secondary kk-btn--small"
                  onClick={() => setActiveView('gallery')}
                  style={{ marginTop: 8, width: '100%' }}
                >
                  See all {galleryItems.length} creations
                </button>
              )}
            </div>
          )}
        </>
      )}

      {openQuest && (
        <QuestModal
          activity={openQuest}
          onClose={() => setOpenQuest(null)}
          onComplete={completeQuest}
          accentColor={colors.accent}
        />
      )}

      {celebrating && (
        <CelebrationOverlay
          activity={celebrating.activity}
          tier={celebrating.tier}
          onDone={() => setCelebrating(null)}
        />
      )}

      <SoftNav
        active={activeView}
        onNavigate={setActiveView}
        galleryCount={galleryItems.length}
      />
    </div>
  );
}
