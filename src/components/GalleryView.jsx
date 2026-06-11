import { twixImg, worldArtKey } from '../data/kingdom';

const TIER_LABEL = { quick: '⚡ Quick', stretch: '🌱 Stretch', boss: '👑 Boss' };

// Persistent gallery of completed quests (localStorage). Supports remove + clear.
export default function GalleryView({ items, onRemove, onClear }) {
  if (!items.length) {
    return (
      <div className="empty">
        <img src={twixImg('peek')} alt="Twix" />
        <h3>No quests finished yet</h3>
        <p>Complete a quest and Twix stamps it into your gallery — it stays here forever.</p>
      </div>
    );
  }

  return (
    <>
      {onClear && (
        <div className="section-head">
          <span className="count">{items.length} stamped</span>
          <span className="spacer" />
          <button className="back-link" onClick={onClear}>Clear all</button>
        </div>
      )}
      <div className="gallery-grid">
        {items.map((item, i) => {
          const date = new Date(item.completedAt);
          const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          return (
            <div key={item.id} className="gal-card fade-in" style={{ animationDelay: `${i * 0.04}s` }}>
              <div className="g-badge"><img src={twixImg(worldArtKey(item.world))} alt="" /></div>
              <div>
                <div className="g-title">{item.title || item.activityName}</div>
                <div className="g-cap">{item.caption}</div>
                <div className="g-meta">🐾 {item.badge} · {dateStr} · {TIER_LABEL[item.tier] || item.tier}</div>
              </div>
              {onRemove && <button className="g-x" onClick={() => onRemove(item.id)} aria-label="Remove">×</button>}
            </div>
          );
        })}
      </div>
    </>
  );
}
