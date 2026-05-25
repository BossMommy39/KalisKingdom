import { useEffect, useState } from 'react';

const CONFETTI_COLORS = ['#ffb88c', '#ffd4b8', '#e8daf8', '#c8f4ef', '#ffc4d6', '#fff3c4', '#d4e7ff'];

function Confetti() {
  const [pieces] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      size: 6 + Math.random() * 8,
      duration: 1 + Math.random() * 1,
    }))
  );

  return (
    <div className="confetti">
      {pieces.map(p => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            top: -20,
            width: p.size,
            height: p.size,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  );
}

export default function CelebrationOverlay({ activity, tier, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);

  const tierLabel = { quick: 'Quick Win', stretch: 'Bigger Build', boss: 'Boss Quest' }[tier] || tier;

  return (
    <>
      <Confetti />
      <div className="kk-celebrate" onClick={onDone}>
        <div className="kk-celebrate__inner">
          <div className="kk-celebrate__stamp">🐾</div>
          <h2 className="kk-celebrate__title">Twix Approved!</h2>
          <div className="kk-celebrate__badge">{activity.badge}</div>
          <p className="kk-celebrate__caption">{activity.galleryCaption}</p>
          <p style={{ fontSize: '0.82rem', color: 'var(--ink-faint)' }}>
            {tierLabel} completed
          </p>
        </div>
      </div>
    </>
  );
}
