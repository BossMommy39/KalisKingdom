import { useState, useMemo } from 'react';

const CATEGORIES = ['All', 'Art & Optics', 'Business & Maker', 'Focus Craft', 'Tech & Film', 'Tech & Code',
  'Digital Art', 'Textiles', 'Wearables', 'Forensics', 'Engineering', 'Art & Decor'];

export default function MommyMode({ activities, currentDoors, onSetDoors, onClose, galleryItems }) {
  const [selected, setSelected] = useState(new Set(currentDoors));
  const [filter, setFilter] = useState('All');
  const [tab, setTab] = useState('pick'); // pick | stats

  const filtered = useMemo(() => {
    if (filter === 'All') return activities;
    return activities.filter(a => a.category === filter);
  }, [activities, filter]);

  const availableCategories = useMemo(() => {
    const cats = new Set(activities.map(a => a.category));
    return CATEGORIES.filter(c => c === 'All' || cats.has(c));
  }, [activities]);

  const toggle = (id) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSave = () => {
    onSetDoors(Array.from(selected));
  };

  // Stats
  const completedIds = new Set(galleryItems.map(g => g.activityId));
  const totalCompleted = completedIds.size;
  const badgeCounts = {};
  galleryItems.forEach(g => {
    badgeCounts[g.badge] = (badgeCounts[g.badge] || 0) + 1;
  });

  return (
    <div className="kk-mommy">
      <div className="kk-mommy__header">
        <div>
          <h2 className="kk-title" style={{ fontSize: '1.4rem' }}>Mommy Mode</h2>
          <p className="kk-subtitle">Pick today&apos;s quest doors for Kali</p>
        </div>
        <button className="kk-btn kk-btn--secondary kk-btn--small" onClick={onClose} type="button">
          ← Back
        </button>
      </div>

      <div className="kk-mommy__tabs">
        <button
          className={`kk-mommy__tab ${tab === 'pick' ? 'active' : ''}`}
          onClick={() => setTab('pick')}
          type="button"
        >
          🚪 Pick Doors
        </button>
        <button
          className={`kk-mommy__tab ${tab === 'stats' ? 'active' : ''}`}
          onClick={() => setTab('stats')}
          type="button"
        >
          📊 Stats
        </button>
      </div>

      {tab === 'pick' ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '8px 0 12px' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.88rem', color: 'var(--ink-light)' }}>
              {selected.size} selected
            </span>
            <button
              className="kk-btn kk-btn--primary kk-btn--small"
              onClick={handleSave}
              disabled={selected.size === 0}
              type="button"
              style={{ opacity: selected.size > 0 ? 1 : 0.5 }}
            >
              ✅ Set {selected.size} Door{selected.size !== 1 ? 's' : ''}
            </button>
          </div>

          <div className="kk-moods" style={{ marginBottom: 12 }}>
            {availableCategories.map(cat => (
              <button
                key={cat}
                className={`kk-btn kk-btn--mood ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
                type="button"
                style={{ fontSize: '0.78rem', padding: '8px 12px' }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="kk-mommy-picker">
            {filtered.map(activity => {
              const isSelected = selected.has(activity.id);
              const isDone = completedIds.has(activity.id);
              return (
                <div
                  key={activity.id}
                  className={`kk-mommy-picker__item ${isSelected ? 'selected' : ''}`}
                  onClick={() => toggle(activity.id)}
                >
                  <div className="kk-mommy-picker__check">
                    {isSelected ? '✓' : ''}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="kk-mommy-picker__name">
                      {activity.name}
                      {isDone && <span style={{ marginLeft: 6, fontSize: '0.75rem', color: 'var(--ink-faint)' }}>✅ done</span>}
                    </div>
                    <div className="kk-mommy-picker__meta">
                      {activity.category} · {activity.mess} mess · {activity.adultHelp}
                      {activity.momFlags?.length > 0 && (
                        <span style={{ marginLeft: 6, color: '#c44' }}>
                          ⚠️ {activity.momFlags.join(', ')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="kk-card" style={{ marginTop: 8 }}>
          <h3 className="kk-title" style={{ fontSize: '1.1rem' }}>Kingdom Stats</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, margin: '16px 0' }}>
            <div style={{ textAlign: 'center', padding: 16, borderRadius: 16, background: 'var(--cream)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800 }}>
                {galleryItems.length}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--ink-light)' }}>Quests Done</div>
            </div>
            <div style={{ textAlign: 'center', padding: 16, borderRadius: 16, background: 'var(--cream)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800 }}>
                {totalCompleted}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--ink-light)' }}>Unique Activities</div>
            </div>
          </div>
          {Object.keys(badgeCounts).length > 0 && (
            <>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', margin: '12px 0 8px' }}>
                Badges Earned
              </h4>
              {Object.entries(badgeCounts).map(([badge, count]) => (
                <div key={badge} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '8px 12px', borderRadius: 12, background: 'var(--cream)', marginBottom: 6,
                  fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.88rem'
                }}>
                  <span>{badge}</span>
                  <span className="kk-pill kk-pill--apricot" style={{ fontSize: '0.72rem' }}>×{count}</span>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
