import { MOODS } from '../data/kingdom';

// How is Kali feeling today? Picking a mood re-themes Twix and the quest doors.
export default function MoodPicker({ activeMood, onChangeMood }) {
  return (
    <div className="mood-grid">
      {MOODS.map(m => (
        <button
          key={m.key}
          className={`mood-chip ${activeMood === m.key ? 'active' : ''}`}
          style={{ '--c': m.color }}
          onClick={() => onChangeMood(activeMood === m.key ? null : m.key)}
        >
          <div className="m-name">{m.label}</div>
          <div className="m-blurb">{m.blurb}</div>
        </button>
      ))}
    </div>
  );
}
