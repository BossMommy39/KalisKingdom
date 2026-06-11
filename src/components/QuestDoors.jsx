import { useState } from 'react';
import { twixImg, worldArtKey } from '../data/kingdom';

// A door that animates open on first tap to reveal the quest behind it,
// then opens the full quest on the second tap.
function Door({ activity, onOpen }) {
  const [open, setOpen] = useState(false);

  function handle() {
    if (!open) { setOpen(true); return; }
    onOpen(activity);
  }

  return (
    <button className={`door ${open ? 'open' : ''}`} onClick={handle} aria-label={`Quest door: ${activity.name}`}>
      <div className="door-inner">
        <div className="door-front">
          <div className="door-label">{activity.world}</div>
          <div className="door-emoji"><img src={twixImg(worldArtKey(activity.world))} alt="" /></div>
          <div className="door-cta">Tap to open</div>
          <span className="knob" />
        </div>
      </div>
      <div className="door-reveal">
        <div className="dr-world">{activity.category}</div>
        <div className="dr-name">{activity.name}</div>
        <div className="dr-quick">{activity.quick}</div>
        <div className="dr-go"><span className="btn-mini">Start quest →</span></div>
      </div>
    </button>
  );
}

export default function QuestDoors({ items, onOpen }) {
  return (
    <div className="door-grid">
      {items.map(a => <Door key={a.id} activity={a} onOpen={onOpen} />)}
    </div>
  );
}
