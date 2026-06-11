import { twixImg, worldArtKey, messColor } from '../data/kingdom';

const TIER_COLORS = { quick: '#7FD1B9', stretch: '#F6A06A', boss: '#B69CE6' };

// Full quest detail. Watch button + tiered missions + story bible + mark complete.
export default function QuestModal({ activity, onClose, onComplete }) {
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
            <div className="sh-world">🏰 {activity.world}</div>
          </div>
        </div>

        <div className="twix-bar">
          <img src={twixImg('peek')} alt="Twix" />
          <span>“{activity.twixSays}”</span>
        </div>

        <div className="tiers">
          <div className="tier" style={{ '--c': TIER_COLORS.quick }}>
            <div className="t-label">⚡ Quick Win</div>
            <div className="t-text">{activity.quick}</div>
          </div>
          <div className="tier" style={{ '--c': TIER_COLORS.stretch }}>
            <div className="t-label">🌱 Stretch</div>
            <div className="t-text">{activity.stretch}</div>
          </div>
          <div className="tier" style={{ '--c': TIER_COLORS.boss }}>
            <div className="t-label">👑 Boss Quest</div>
            <div className="t-text">{activity.boss}</div>
          </div>
        </div>

        <div className="protip">💡 <b>Pro tip:</b> {activity.proTip}</div>

        <div className="story-block">
          <div className="sb-row"><div className="sb-k">The story</div><div className="sb-v">{activity.storyPrompt}</div></div>
          <div className="sb-row"><div className="sb-k">Your role</div><div className="sb-v">{activity.role}</div></div>
          <div className="sb-row"><div className="sb-k">Mission</div><div className="sb-v">{activity.mission}</div></div>
          <div className="sb-row"><div className="sb-k">Plot twist</div><div className="sb-v">{activity.plotTwist}</div></div>
          <div className="sb-row"><div className="sb-k">Boss level</div><div className="sb-v">{activity.bossLevel}</div></div>
        </div>

        <div className="info-grid">
          <div className="info"><div className="i-k">Supplies</div><div className="i-v">{activity.supplies}</div></div>
          <div className="info"><div className="i-k">Where</div><div className="i-v">{activity.location}</div></div>
          <div className="info"><div className="i-k">Setup</div><div className="i-v">{activity.setup}</div></div>
          <div className="info"><div className="i-k">Cleanup</div><div className="i-v">{activity.cleanup}</div></div>
          <div className="info"><div className="i-k">Grown-up</div><div className="i-v">{activity.adultHelp}</div></div>
          <div className="info"><div className="i-k">Mess level</div><div className="i-v" style={{ color: mc.fg }}>● {activity.mess}</div></div>
        </div>

        <div className="safety-row">
          {safety.length
            ? safety.map((s, i) => <span key={i} className="safety-flag">⚠ {s}</span>)
            : <span className="safety-flag ok">✓ No special safety</span>}
        </div>

        <div className="sheet-cta">
          <a className="cta-big cta-watch" href={activity.videoUrl} target="_blank" rel="noopener noreferrer">
            ▶ {activity.videoLabel || 'Watch tutorial'}
          </a>
          <button className="cta-big cta-done" onClick={() => onComplete(activity)}>
            ✓ Mark complete
          </button>
        </div>
      </div>
    </div>
  );
}
