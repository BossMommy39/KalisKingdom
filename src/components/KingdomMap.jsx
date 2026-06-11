import { twixImg, twixLineForMood } from '../data/kingdom';
import Icon from './Icon';

const R = 40;
const CIRC = 2 * Math.PI * R;

function ProgressRing({ done, total }) {
  const pct = total ? done / total : 0;
  return (
    <svg className="ring" viewBox="0 0 92 92">
      <circle className="track" cx="46" cy="46" r={R} />
      <circle
        className="fill" cx="46" cy="46" r={R}
        strokeDasharray={CIRC}
        strokeDashoffset={CIRC * (1 - pct)}
      />
    </svg>
  );
}

function MapNode({ node, index, isCurrent, isToday, onOpen }) {
  const { name, bible, art, done, total, unlocked, complete } = node;
  return (
    <button
      className={`map-node ${unlocked ? '' : 'locked'} ${isCurrent ? 'current' : ''} ${isToday ? 'today' : ''}`}
      onClick={() => unlocked && onOpen(name)}
      disabled={!unlocked}
    >
      <div className="node-art">
        <ProgressRing done={done} total={total} />
        {unlocked
          ? <img src={twixImg(art)} alt="" />
          : <span className="lock-pill"><span><Icon name="lock" size={20} /></span></span>}
      </div>
      <div className="node-body">
        <div className="node-eyebrow">Chapter {index + 1}{bible ? '' : ' · cluster'}</div>
        <div className="node-name">{name}</div>
        {unlocked ? (
          <>
            <div className="node-meta">{done}/{total} quests {complete ? '· complete ✨' : 'done'}</div>
            <span className={`node-chip ${bible ? '' : 'cluster'}`}>
              {complete ? <Icon name="star" size={14} /> : <Icon name="sparkles" size={14} />}
              {complete ? 'World complete' : (bible ? 'Open chapter' : 'Quest cluster')}
            </span>
          </>
        ) : (
          <span className="node-chip locked"><Icon name="lock" size={13} /> Finish the last chapter to unlock</span>
        )}
      </div>
    </button>
  );
}

// The kingdom journey: Twix greeting + a winding path of world nodes that unlock in order.
export default function KingdomMap({ nodes, level, totalDone, todayWorlds, currentIndex, onOpenWorld }) {
  const todaySet = new Set(todayWorlds || []);
  return (
    <div className="fade-in">
      <div className="map-greet">
        <img className="mg-twix" src={twixImg('welcome')} alt="Twix" />
        <div className="mg-copy">
          <div className="eyebrow">Twix · your kingdom guide</div>
          <div className="mg-line">{twixLineForMood(null)}</div>
          <div className="mg-level">★ {level.title} · {totalDone} quest{totalDone === 1 ? '' : 's'} done</div>
        </div>
      </div>

      <div className="section-head"><h2>The Kingdom Map</h2><span className="count">{nodes.length} worlds</span></div>
      <div className="section-sub">Travel world to world. Finish a quest to light up the path to the next chapter.</div>

      <div className="map-scroll">
        <div className="map-path">
          {nodes.map((node, i) => (
            <MapNode
              key={node.name}
              node={node}
              index={i}
              isCurrent={i === currentIndex}
              isToday={todaySet.has(node.name)}
              onOpen={onOpenWorld}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
