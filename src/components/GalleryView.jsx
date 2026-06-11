const badgeEmoji = {
  'Tech Sorceress': '🔮',
  'Tiny CEO': '👑',
  'Twix Approved': '🐾',
  'Studio Founder': '✨',
  'Heist Crew': '🕵️',
};

export default function GalleryView({ items }) {
  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--ink-faint)' }}>
        <p style={{ fontSize: '2rem', margin: '0 0 8px' }}>🐾</p>
        <p style={{ fontFamily: 'var(--font-handwritten)', fontSize: '1.1rem', margin: 0 }}>
          No quests completed yet. Your gallery is waiting!
        </p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: 12 }}>
      {items.map((item, i) => {
        const emoji = badgeEmoji[item.badge] || '⭐';
        const date = new Date(item.completedAt);
        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const tierLabel = { quick: '⚡ Quick', stretch: '🔥 Stretch', boss: '👑 Boss' }[item.tier] || item.tier;

        return (
          <div key={item.id} className="kk-gallery-item stagger-in" style={{ animationDelay: `${i * 0.06}s` }}>
            <div
              className="kk-gallery-item__badge"
              style={{ background: 'var(--peach)' }}
            >
              {emoji}
            </div>
            <div className="kk-gallery-item__info">
              <p className="kk-gallery-item__name">{item.activityName}</p>
              <p className="kk-gallery-item__caption">{item.caption}</p>
              <p className="kk-gallery-item__date">{dateStr} · {tierLabel}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
