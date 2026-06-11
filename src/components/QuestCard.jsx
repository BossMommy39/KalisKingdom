import { twixImg, worldArtKey, messColor } from '../data/kingdom';
import Icon from './Icon';

// A single quest in a grid. Always shows the YouTube "Watch" link.
export default function QuestCard({ activity, onOpen }) {
  const mc = messColor[activity.mess] || messColor.Green;
  return (
    <article className="qcard">
      <div className="qcard-top">
        <div className="qcard-thumb"><img src={twixImg(worldArtKey(activity.world))} alt="" /></div>
        <div>
          <div className="qc-cat">{activity.category}</div>
          <div className="qc-name">{activity.name}</div>
        </div>
      </div>
      <div className="qcard-body">
        <div className="qc-quick">{activity.quick}</div>
        <div className="qc-meta">
          <span className="tag world">{activity.world}</span>
          <span className="tag mess" style={{ background: mc.bg, color: mc.fg }}>
            <span className="dot" style={{ background: mc.dot }} />{mc.label}
          </span>
          <span className="tag">{activity.dopamine}</span>
        </div>
        <div className="qc-actions">
          <a
            className="btn btn-watch"
            href={activity.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          ><Icon name="play" size={16} /> Watch</a>
          <button className="btn btn-open" onClick={() => onOpen(activity)}>
            <Icon name="sparkles" size={16} /> Open
          </button>
        </div>
      </div>
    </article>
  );
}
