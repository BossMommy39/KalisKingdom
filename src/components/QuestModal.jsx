import { useState } from 'react';
import { twixImg, worldArtKey, messColor } from '../data/kingdom';
import Icon from './Icon';

const TIERS = [
  { key: 'quick',   label: 'Quick Win',  color: '#54CBA7', field: 'quick' },
  { key: 'stretch', label: 'Stretch',    color: '#2FBFD4', field: 'stretch' },
  { key: 'boss',    label: 'Boss Quest', color: '#EF82B6', field: 'boss' },
];

// Full quest as a story arc: the call → role → mission → twist → boss climax → reward.
// Kid picks which tier of the path she completed, then marks it done.
export default function QuestModal({ activity, onClose, onComplete }) {
  const [tier, setTier] = useState('quick');
  if (!activity) return null;
  const mc = messColor[activity.mess] || messColor.Green;
  const safety = (activity.safety && activity.safety !== 'None')
    ? activity.safety.split(',').map(s => s.trim()).filter(Boolean)
    : [];

  return (
    <div className="scrim" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="grab" />

        <div className="sheet-hero">
          <div className="sh-thumb"><img src={twixImg(worldArtKey(activity.world))} alt="" /></div>
          <div>
            <div className="sh-cat">{activity.category}</div>
            <h2>{activity.name}</h2>
            <div className="sh-world">{activity.world}</div>
          </div>
        </div>

        <div className="twix-bar">
          <img src={twixImg('peek')} alt="Twix" />
          <span>“{activity.twixSays}”</span>
        </div>

        <div className="arc">
          <div className="arc-step"><div className="as-k">The story</div><div className="as-v">{activity.storyPrompt}</div></div>
          <div className="arc-step"><div className="as-k">Your role</div><div className="as-v">{activity.role}</div></div>
          <div className="arc-step"><div className="as-k">Your mission</div><div className="as-v">{activity.mission}</div></div>
          <div className="arc-step"><div className="as-k">Plot twist</div><div className="as-v">{activity.plotTwist}</div></div>
          <div className="arc-step climax"><div className="as-k">Boss level</div><div className="as-v">{activity.bossLevel}</div></div>
        </div>

        <div className="path-head">Pick your path</div>
        <div className="tiers">
          {TIERS.map(t => (
            <button
              key={t.key}
              className={`tier ${tier === t.key ? 'sel' : ''}`}
              style={{ '--c': t.color }}
              onClick={() => setTier(t.key)}
            >
              <span className="t-pick">{tier === t.key ? <Icon name="check" size={16} /> : ''}</span>
              <span>
                <span className="t-label">{t.label}</span>
                <span className="t-text">{activity[t.field]}</span>
              </span>
            </button>
          ))}
        </div>

        <div className="protip">💡 <b>Pro tip:</b> {activity.proTip}</div>

        <div className="info-grid">
          <div className="info"><div className="i-k">Supplies</div><div className="i-v">{activity.supplies}</div></div>
          <div className="info"><div className="i-k">Where</div><div className="i-v">{activity.location}</div></div>
          <div className="info"><div className="i-k">Setup</div><div className="i-v">{activity.setup}</div></div>
          <div className="info"><div className="i-k">Cleanup</div><div className="i-v">{activity.cleanup}</div></div>
          <div className="info"><div className="i-k">Grown-up</div><div className="i-v">{activity.adultHelp}</div></div>
          <div className="info"><div className="i-k">Mess level</div><div className="i-v" style={{ color: mc.fg }}>● {mc.label}</div></div>
        </div>

        <div className="safety-row">
          {safety.length
            ? safety.map((s, i) => <span key={i} className="safety-flag"><Icon name="flag" size={13} /> {s}</span>)
            : <span className="safety-flag ok"><Icon name="check" size={13} /> No special safety</span>}
        </div>

        <div className="sheet-cta">
          <a className="cta-big cta-watch" href={activity.videoUrl} target="_blank" rel="noopener noreferrer">
            <Icon name="play" size={18} /> Watch
          </a>
          <button className="cta-big cta-done" onClick={() => onComplete(activity, tier)}>
            <Icon name="check" size={18} /> Mark complete
          </button>
        </div>
      </div>
    </div>
  );
}
