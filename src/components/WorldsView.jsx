import { useState } from 'react';
import { groupedWorlds, twixImg } from '../data/kingdom';
import QuestCard from './QuestCard';

const BANNER_PAIRS = [
  ['#FFD9B3', '#F7C6D2'],
  ['#D9CBF2', '#C6D9F2'],
  ['#BFE9D6', '#D9F2CB'],
  ['#F7C6D2', '#FFD9B3'],
  ['#C9E4F2', '#D9CBF2'],
];

function WorldCard({ world, index, onOpen }) {
  const [c1, c2] = BANNER_PAIRS[index % BANNER_PAIRS.length];
  return (
    <button className="world-card" onClick={() => onOpen(world)}>
      <div className="world-banner" style={{ '--c1': c1, '--c2': c2 }}>
        <img src={twixImg(world.art)} alt="" />
        <div className="wb-text">
          <div className="wb-eyebrow">{world.bible ? 'World Bible' : 'Quest Cluster'}</div>
          <h3>{world.name}</h3>
          <div className="wb-count">{world.items.length} quest{world.items.length === 1 ? '' : 's'}</div>
        </div>
        <span className="wb-badge">{world.bible ? '📖 Full bible' : 'Quests only'}</span>
      </div>
      {world.bible
        ? <div className="wb-bible">{world.bible.fantasy}</div>
        : <div className="no-bible-note">A quest cluster — these activities gather here by world, with no bible yet.</div>}
    </button>
  );
}

function WorldDetail({ world, onBack, onOpenQuest }) {
  const b = world.bible;
  return (
    <div className="fade-in">
      <button className="back-link" onClick={onBack}>← All worlds</button>
      <div className="world-detail-head">
        <img src={twixImg(world.art)} alt="" />
        <div>
          <div className="sh-cat">{b ? 'World Bible' : 'Quest Cluster'}</div>
          <h2>{world.name}</h2>
          <div className="sh-world">{world.items.length} quest{world.items.length === 1 ? '' : 's'}</div>
        </div>
      </div>

      {b ? (
        <div className="bible">
          <div className="b-row"><div className="b-k">Fantasy</div><div className="b-v">{b.fantasy}</div></div>
          <div className="b-row"><div className="b-k">Setup</div><div className="b-v">{b.setup}</div></div>
          <div className="b-row"><div className="b-k">Mechanism</div><div className="b-v">{b.mechanism}</div></div>
          <div className="b-row"><div className="b-k">Maker</div><div className="b-v">{b.maker}</div></div>
          <div className="b-row"><div className="b-k">Payoff</div><div className="b-v">{b.payoff}</div></div>
        </div>
      ) : (
        <div className="mommy-note">
          This world groups its quests by name. It doesn’t have a full world bible —
          so there’s no fantasy or payoff written for it yet.
        </div>
      )}

      <div className="section-head"><h2>Quests</h2><span className="count">{world.items.length}</span></div>
      <div className="card-grid">
        {world.items.map(a => <QuestCard key={a.id} activity={a} onOpen={onOpenQuest} />)}
      </div>
    </div>
  );
}

export default function WorldsView({ onOpenQuest }) {
  const [groups] = useState(() => groupedWorlds());
  const [selected, setSelected] = useState(null);

  if (selected) {
    const fresh = groups.find(g => g.name === selected) || null;
    if (fresh) {
      return <WorldDetail world={fresh} onBack={() => setSelected(null)} onOpenQuest={onOpenQuest} />;
    }
  }

  const bibleCount = groups.filter(g => g.bible).length;

  return (
    <div className="fade-in">
      <div className="section-head"><h2>The Kingdom’s Worlds</h2><span className="count">{groups.length} worlds</span></div>
      <div className="section-sub">{bibleCount} have a full world bible · the rest are quest clusters grouped by name.</div>
      <div className="card-grid">
        {groups.map((g, i) => <WorldCard key={g.name} world={g} index={i} onOpen={(w) => setSelected(w.name)} />)}
      </div>
    </div>
  );
}
