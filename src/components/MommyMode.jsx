import { useState, useMemo } from 'react';
import { activities, MOODS, messColor } from '../data/kingdom';

// Parent picks today's quest doors from the full 49-quest pool. Optional mood
// sets the suggestion vibe shown to Kali when no doors are chosen.
export default function MommyMode({ currentDoors, onSetDoors, onClose, galleryItems, mommyMood, onSetMood }) {
  const [selected, setSelected] = useState(() => new Set(currentDoors));
  const [cat, setCat] = useState('All');

  const categories = useMemo(() => {
    const set = new Set(activities.map(a => a.category));
    return ['All', ...Array.from(set).sort()];
  }, []);

  const filtered = useMemo(
    () => (cat === 'All' ? activities : activities.filter(a => a.category === cat)),
    [cat]
  );

  const completedIds = useMemo(() => new Set(galleryItems.map(g => g.activityId)), [galleryItems]);

  const toggle = (id) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="fade-in">
      <button className="back-link" onClick={onClose}>← Done</button>
      <div className="section-head"><h2>Mommy Mode</h2><span className="count">{selected.size} picked</span></div>
      <div className="mommy-note">
        Choose the quest doors Kali sees today. Pick a few from any world. If you skip this,
        Kali gets mood-based suggestions and an “Ask Mommy” button instead. Doors reset each new day.
      </div>

      <div className="section-sub">Suggestion mood (optional)</div>
      <div className="filter-row">
        <button className={`chip-mini ${!mommyMood ? 'active' : ''}`} onClick={() => onSetMood(null)}>None</button>
        {MOODS.map(m => (
          <button
            key={m.key}
            className={`chip-mini ${mommyMood === m.key ? 'active' : ''}`}
            onClick={() => onSetMood(mommyMood === m.key ? null : m.key)}
          >{m.label}</button>
        ))}
      </div>

      <div className="section-sub">Filter quests</div>
      <div className="filter-row">
        {categories.map(c => (
          <button key={c} className={`chip-mini ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>

      <div className="mommy-bar">
        <span className="count-chip">{selected.size} door{selected.size === 1 ? '' : 's'}</span>
        <button className="pill-btn solid" onClick={() => onSetDoors(Array.from(selected))} disabled={selected.size === 0}>
          ✅ Set today’s doors
        </button>
        {selected.size > 0 && <button className="back-link" onClick={() => setSelected(new Set())}>Reset</button>}
      </div>

      {filtered.map(a => {
        const checked = selected.has(a.id);
        const mc = messColor[a.mess] || messColor.Green;
        const done = completedIds.has(a.id);
        return (
          <button key={a.id} className={`picker-row ${checked ? 'checked' : ''}`} onClick={() => toggle(a.id)}>
            <span className="pr-check">{checked ? '✓' : ''}</span>
            <span style={{ flex: 1 }}>
              <span className="pr-name">{a.name}{done ? ' ✅' : ''}</span>
              <span className="pr-sub" style={{ display: 'block' }}>
                {a.world} · {a.category} · <span style={{ color: mc.fg }}>{mc.label}</span> · {a.adultHelp}
                {a.momFlags?.length ? ` · ⚠ ${a.momFlags.filter(f => f !== 'none').join(', ') || 'ok'}` : ''}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
