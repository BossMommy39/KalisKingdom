import { useState } from 'react';

export default function QuestModal({ activity, onClose, onComplete, accentColor }) {
  const [selectedTier, setSelectedTier] = useState(null);

  const tiers = [
    { key: 'quick', label: '⚡ Quick Win', desc: activity.quick },
    { key: 'stretch', label: '🔥 Bigger Build', desc: activity.stretch },
    { key: 'boss', label: '👑 Boss Quest', desc: activity.boss },
  ];

  return (
    <div className="kk-quest-overlay" onClick={onClose}>
      <article className="kk-quest" onClick={e => e.stopPropagation()}>
        <button className="kk-quest__close" onClick={onClose} type="button">×</button>

        <p className="kk-quest__world">{activity.world}</p>
        <h2 className="kk-quest__title">{activity.name}</h2>

        <div
          className="kk-quest__story-box"
          style={{ background: `${accentColor}20`, border: `2px solid ${accentColor}30` }}
        >
          <p className="kk-quest__story-label">📖 Story Card</p>
          <p className="kk-quest__story-text">{activity.storyPrompt}</p>
          <p className="kk-quest__story-text">
            <strong>Your role:</strong> {activity.role}
          </p>
          <p className="kk-quest__story-text">
            <strong>Mission:</strong> {activity.mission}
          </p>
          <p className="kk-quest__story-text" style={{ color: 'var(--ink-faint)' }}>
            <strong>Plot twist:</strong> {activity.plotTwist}
          </p>
        </div>

        <p className="kk-quest__story-label" style={{ margin: '0 0 8px' }}>Pick your quest tier:</p>
        <div className="kk-quest__tiers">
          {tiers.map(tier => (
            <div
              key={tier.key}
              className={`kk-quest__tier ${selectedTier === tier.key ? 'selected' : ''}`}
              onClick={() => setSelectedTier(tier.key)}
            >
              <p className="kk-quest__tier-label">{tier.label}</p>
              <p className="kk-quest__tier-desc">{tier.desc}</p>
            </div>
          ))}
        </div>

        <div className="kk-quest__protip">
          <p className="kk-quest__protip-label">🐾 Pro Tip</p>
          <p className="kk-quest__protip-text">{activity.proTip}</p>
        </div>

        <p className="kk-quest__twix">&ldquo;{activity.twixSays}&rdquo;</p>

        <div style={{ fontSize: '0.82rem', color: 'var(--ink-light)', margin: '8px 0' }}>
          <strong>Supplies:</strong> {activity.supplies}
          {activity.safety !== 'None' && (
            <span style={{ marginLeft: 8, color: '#c44' }}>⚠️ {activity.safety}</span>
          )}
        </div>

        <div className="kk-quest__actions">
          {activity.videoUrl && (
            <a
              href={activity.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="kk-btn kk-btn--secondary"
              style={{ textDecoration: 'none', textAlign: 'center' }}
            >
              📺 Watch
            </a>
          )}
          <button
            className="kk-btn kk-btn--primary"
            onClick={() => selectedTier && onComplete(activity, selectedTier)}
            disabled={!selectedTier}
            type="button"
            style={{ opacity: selectedTier ? 1 : 0.5 }}
          >
            ✅ Mark Complete
          </button>
        </div>
      </article>
    </div>
  );
}
