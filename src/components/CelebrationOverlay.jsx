import { useEffect, useState } from 'react';
import { twixImg } from '../data/kingdom';

const CONFETTI_COLORS = ['#2FBFD4', '#EF82B6', '#54CBA7', '#A98CE6', '#FFC247', '#FF9E8C', '#BDEDF3'];
const TIER_LABEL = { quick: 'Quick Win', stretch: 'Stretch', boss: 'Boss Quest' };

function Confetti() {
  const [pieces] = useState(() =>
    Array.from({ length: 42 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.6,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      duration: 1.6 + Math.random() * 1.4,
      round: Math.random() > 0.5,
    }))
  );
  return (
    <div className="confetti" aria-hidden>
      {pieces.map(p => (
        <i
          key={p.id}
          style={{
            left: `${p.left}%`,
            background: p.color,
            borderRadius: p.round ? '50%' : '3px',
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

// Confetti + Twix badge stamp on quest completion. Calls out a newly-unlocked world.
export default function CelebrationOverlay({ activity, tier, unlockedWorld, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3400);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="celebrate-scrim" onClick={onDone}>
      <Confetti />
      <div className="celebrate-card" onClick={(e) => e.stopPropagation()}>
        <img className="cc-twix" src={twixImg('crown')} alt="Twix" />
        <h2>Twix Approved!</h2>
        <div className="cc-badge">{activity.badge}</div>
        <p>{activity.galleryCaption}<br /><b>{TIER_LABEL[tier] || tier} completed</b></p>
        {unlockedWorld && (
          <div className="cc-unlock">✨ New chapter unlocked: {unlockedWorld}</div>
        )}
        <button className="pill-btn solid" style={{ marginTop: 16 }} onClick={onDone}>Add to gallery</button>
      </div>
    </div>
  );
}
