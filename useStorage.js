import { useState, useCallback } from 'react';
import { messColors } from '../data/activities';

export default function QuestDoors({ activities, onOpenQuest, onDrawQuest, accentColor }) {
  const [sparkles, setSparkles] = useState([]);

  const handleDraw = useCallback((e) => {
    // Create sparkle particles
    const rect = e.currentTarget.getBoundingClientRect();
    const newSparkles = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      emoji: ['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)]
    }));
    setSparkles(newSparkles);
    setTimeout(() => setSparkles([]), 700);
    onDrawQuest();
  }, [onDrawQuest]);

  return (
    <section className="kk-card stagger-in">
      <h3 className="kk-doors__title">Today&apos;s Doors</h3>
      <p className="kk-doors__subtitle">Twix picked these just for today. Tap to peek inside.</p>

      <div>
        {activities.map((activity, i) => (
          <article
            key={activity.id}
            className="kk-door"
            onClick={() => onOpenQuest(activity)}
            style={{
              '--door-accent': accentColor,
              animationDelay: `${i * 0.08}s`,
            }}
          >
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 4,
              borderRadius: '28px 28px 0 0',
              background: accentColor,
              opacity: 0.6
            }} />
            <div className="kk-door__top">
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                  <span
                    className="kk-door__mess"
                    style={{ background: messColors[activity.mess] || '#ccc' }}
                    title={`${activity.mess} mess level`}
                  />
                  <span className="kk-pill kk-pill--apricot" style={{ fontSize: '0.7rem', padding: '3px 8px' }}>
                    {activity.world}
                  </span>
                </div>
                <h4 className="kk-door__name">{activity.name}</h4>
              </div>
            </div>
            <p className="kk-door__story">{activity.storyPrompt}</p>
            <p className="kk-door__role">Your role: {activity.role}</p>
          </article>
        ))}
      </div>

      <button
        className="kk-btn kk-btn--primary kk-draw-quest"
        onClick={handleDraw}
        style={{ width: '100%', marginTop: 8, fontSize: '1rem' }}
        type="button"
      >
        🎲 Draw a Quest
        {sparkles.map(s => (
          <span
            key={s.id}
            className="sparkle"
            style={{ left: s.x, top: s.y, fontSize: '1.2rem' }}
          >
            {s.emoji}
          </span>
        ))}
      </button>
    </section>
  );
}
