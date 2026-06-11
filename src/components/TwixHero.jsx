import { useState, useEffect, useRef } from 'react';

export default function TwixHero({ mood, message, imageSrc, accentColor }) {
  const [animating, setAnimating] = useState(false);
  const prevMood = useRef(mood);

  useEffect(() => {
    if (prevMood.current !== mood) {
      setAnimating(true);
      prevMood.current = mood;
      const t = setTimeout(() => setAnimating(false), 500);
      return () => clearTimeout(t);
    }
  }, [mood]);

  return (
    <section
      className="kk-card kk-hero stagger-in"
      style={{
        background: `linear-gradient(145deg, ${accentColor}40, var(--cloud))`,
        borderColor: `${accentColor}30`,
      }}
    >
      <div className="kk-hero__inner">
        <div className="kk-hero__img-wrap">
          <img
            className={`kk-hero__img ${animating ? 'entering' : ''}`}
            src={imageSrc}
            alt={`Twix in ${mood} mood`}
            loading="eager"
          />
        </div>
        <div className="kk-hero__text">
          <p className="kk-hero__says">Twix says...</p>
          <h2 className="kk-hero__line">{message.line}</h2>
          <p className="kk-hero__subtitle">{message.subtitle}</p>
          <span className="kk-pill kk-pill--apricot">{mood} mood</span>
        </div>
      </div>
    </section>
  );
}
