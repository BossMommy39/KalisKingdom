import { useEffect, useState } from 'react';
import { moodTwix, twixImg, twixLineForMood, moodByKey } from '../data/kingdom';

// Twix is a character: she changes pose + says something new whenever the mood
// changes (or when nudged), and pops on entrance.
export default function TwixHero({ mood, onDraw }) {
  const [pop, setPop] = useState(false);
  const [line, setLine] = useState(() => twixLineForMood(mood));

  useEffect(() => {
    setLine(twixLineForMood(mood));
    setPop(true);
    const t = setTimeout(() => setPop(false), 650);
    return () => clearTimeout(t);
  }, [mood]);

  const img = mood ? moodTwix(mood) : twixImg('welcome');
  const moodLabel = mood ? (moodByKey[mood]?.label || mood) : 'Welcome';

  function nudge() {
    setLine(twixLineForMood(mood));
    setPop(true);
    setTimeout(() => setPop(false), 650);
  }

  return (
    <section className="hero fade-in">
      <button className={`twix-stage ${pop ? 'pop' : ''}`} onClick={nudge} aria-label="Twix says something new">
        <img src={img} alt="Twix the host puppy" />
      </button>
      <div className="hero-copy">
        <div className="eyebrow">Twix · {moodLabel} mode</div>
        <div className="speech" onClick={nudge}>{line}</div>
        <div className="hero-actions">
          <button className="pill-btn solid" onClick={onDraw}>🎲 Draw a Quest</button>
          <button className="pill-btn" onClick={nudge}>💬 Twix, again</button>
        </div>
      </div>
    </section>
  );
}
