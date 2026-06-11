export default function MoodPicker({ moods, activeMood, onChangeMood, moodEmoji }) {
  return (
    <section className="kk-card stagger-in" style={{ paddingBottom: 12 }}>
      <p className="kk-moods__label">Pick your mood</p>
      <div className="kk-moods">
        {moods.map(mood => (
          <button
            key={mood}
            type="button"
            className={`kk-btn kk-btn--mood ${mood === activeMood ? 'active' : ''}`}
            onClick={() => onChangeMood(mood)}
          >
            {moodEmoji[mood]} {mood}
          </button>
        ))}
      </div>
    </section>
  );
}
