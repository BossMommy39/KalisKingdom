import { twixImg, twixLineForMood } from '../data/kingdom';
import Icon from './Icon';

// ---- Map geometry (viewBox is 100 x VH; the frame keeps the same aspect, so no distortion) ----
const PAD_TOP = 8;
const PAD_BOTTOM = 12;
const STEP = 32;       // vertical distance between stops
const AMP = 31;        // how far the road swings side to side
const CENTER = 50;

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const xFor = (i) => clamp(CENTER + AMP * Math.sin(i * 0.9), 16, 84);
const yFor = (i) => PAD_TOP + i * STEP;

// Smooth S-curve path through a list of points (vertical control points).
function pathThrough(pts) {
  if (!pts.length) return '';
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1], b = pts[i];
    const my = (a.y + b.y) / 2;
    d += ` C ${a.x} ${my} ${b.x} ${my} ${b.x} ${b.y}`;
  }
  return d;
}

const R = 33;
const CIRC = 2 * Math.PI * R;

function MapNode({ node, index, pt, vh, isCurrent, isToday, onOpen }) {
  const { name, bible, art, done, total, unlocked, complete } = node;
  const pct = total ? done / total : 0;
  const labelSide = pt.x <= 50 ? 'right' : 'left';
  return (
    <button
      className={`mapstop ${unlocked ? '' : 'locked'} ${isCurrent ? 'current' : ''} ${isToday ? 'today' : ''} lab-${labelSide}`}
      style={{ left: `${pt.x}%`, top: `${(pt.y / vh) * 100}%` }}
      onClick={() => unlocked && onOpen(name)}
      disabled={!unlocked}
      aria-label={`${name}, chapter ${index + 1}, ${done} of ${total} quests done${unlocked ? '' : ', locked'}`}
    >
      <span className="stop-medal">
        <svg className="stop-ring" viewBox="0 0 80 80" aria-hidden>
          <circle className="track" cx="40" cy="40" r={R} />
          <circle className="fill" cx="40" cy="40" r={R}
            strokeDasharray={CIRC} strokeDashoffset={CIRC * (1 - pct)} />
        </svg>
        {unlocked
          ? <img src={twixImg(art)} alt="" />
          : <span className="stop-lock"><Icon name="lock" size={18} /></span>}
        {complete && <span className="stop-star"><Icon name="star" size={13} /></span>}
        {isToday && <span className="stop-today" aria-hidden>✨</span>}
      </span>
      <span className="stop-label">
        <span className="sl-name">{name}</span>
        <span className="sl-meta">{unlocked ? `${done}/${total}` : 'Locked'}</span>
      </span>
    </button>
  );
}

// The kingdom journey as a real map: a winding road through the worlds, a glowing trail
// for the ground you've covered, paw-prints behind you, and Twix walking to where you are.
export default function KingdomMap({ nodes, level, totalDone, todayWorlds, currentIndex, onOpenWorld }) {
  const todaySet = new Set(todayWorlds || []);
  const pts = nodes.map((_, i) => ({ x: xFor(i), y: yFor(i) }));
  const vh = PAD_TOP + (nodes.length - 1) * STEP + PAD_BOTTOM;

  const road = pathThrough(pts);
  const trail = pathThrough(pts.slice(0, currentIndex + 1));
  const twixPt = pts[currentIndex] || pts[0] || { x: 50, y: PAD_TOP };

  // Paw-prints along the covered ground (midpoints of traveled segments).
  const paws = [];
  for (let i = 1; i <= currentIndex && i < pts.length; i++) {
    const a = pts[i - 1], b = pts[i];
    paws.push({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, r: i * 47 });
  }

  // A castle goal just past the last stop.
  const last = pts[pts.length - 1] || { x: 50, y: PAD_TOP };
  const goal = { x: 50, y: last.y + PAD_BOTTOM * 0.7 };

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
      <div className="section-sub">Follow the road with Twix. Finish a quest to light up the path to the next stop.</div>

      <div className="map-frame">
        <div className="map-canvas" style={{ paddingBottom: `${vh}%` }}>
          <svg className="map-svg" viewBox={`0 0 100 ${vh}`} preserveAspectRatio="none" aria-hidden>
            <defs>
              <linearGradient id="trailGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#54CBA7" />
                <stop offset="100%" stopColor="#2FBFD4" />
              </linearGradient>
            </defs>

            {/* terrain decor */}
            <ellipse className="terrain pond" cx="78" cy={yFor(1)} rx="13" ry="6" />
            <ellipse className="terrain grove" cx="20" cy={yFor(3) + 4} rx="11" ry="6" />
            <ellipse className="terrain pond" cx="24" cy={yFor(6)} rx="12" ry="6" />
            <ellipse className="terrain grove" cx="80" cy={yFor(8) + 3} rx="10" ry="6" />
            <ellipse className="terrain pond" cx="74" cy={yFor(11)} rx="12" ry="6" />

            {/* the road */}
            <path className="road-base" d={road} />
            <path className="road-dash" d={road} />
            {/* covered ground */}
            {trail && <path className="road-trail" d={trail} />}

            {/* paw-prints */}
            {paws.map((p, i) => (
              <g key={i} transform={`rotate(${p.r} ${p.x} ${p.y})`}>
                <circle className="paw" cx={p.x - 0.9} cy={p.y} r="0.7" />
                <circle className="paw" cx={p.x + 0.9} cy={p.y} r="0.7" />
              </g>
            ))}
          </svg>

          {/* world stops */}
          {nodes.map((node, i) => (
            <MapNode
              key={node.name}
              node={node}
              index={i}
              pt={pts[i]}
              vh={vh}
              isCurrent={i === currentIndex}
              isToday={todaySet.has(node.name)}
              onOpen={onOpenWorld}
            />
          ))}

          {/* the goal */}
          <div className="map-goal" style={{ left: `${goal.x}%`, top: `${(goal.y / vh) * 100}%` }}>
            <img src={twixImg('crown')} alt="" />
            <span>The Crown</span>
          </div>

          {/* Twix, walking to where you are */}
          <div
            className="map-twix"
            style={{ left: `${twixPt.x}%`, top: `${(twixPt.y / vh) * 100}%` }}
          >
            <img src={twixImg('meadow')} alt="Twix" />
          </div>
        </div>
      </div>
    </div>
  );
}
