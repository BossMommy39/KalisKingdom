import { twixImg, themeWeekFor, storyCardsFor } from '../data/kingdom';
import QuestCard from './QuestCard';
import Icon from './Icon';

// A single world as a story chapter: Arrival (fantasy/how-it-works) → Quests → Boss & Payoff.
// Cluster worlds (no bible) get light framing with NO invented narrative.
export default function WorldChapter({ node, onBack, onOpenQuest }) {
  const { name, bible, art, items, done, total } = node;
  const week = themeWeekFor(name);
  const cards = storyCardsFor(name);

  return (
    <div className="fade-in">
      <button className="back-link" onClick={onBack}><Icon name="back" size={18} /> Kingdom map</button>

      <div className="chapter-hero">
        <div className="ch-eyebrow">{bible ? 'World Bible' : 'Quest Cluster'} · {done}/{total} done</div>
        <h1>{name}</h1>
        {bible
          ? <div className="ch-fantasy">{bible.fantasy}</div>
          : <div className="ch-fantasy">A corner of the kingdom where these quests gather by name.</div>}
        <img src={twixImg(art)} alt="" />
      </div>

      {bible && (
        <>
          <div className="chapter-block">
            <div className="cb-k">How this world works</div>
            <div className="cb-v">{bible.setup}</div>
            <div className="cb-v" style={{ marginTop: 6, color: 'var(--ink-soft)' }}>{bible.mechanism}</div>
          </div>
          <div className="bible-grid">
            <div className="bible-cell"><div className="bc-k">You'll make</div><div className="bc-v">{bible.maker}</div></div>
            <div className="bible-cell"><div className="bc-k">The payoff</div><div className="bc-v">{bible.payoff}</div></div>
          </div>
        </>
      )}

      {week && (
        <div className="chapter-block">
          <div className="cb-k">{week.name}</div>
          <div className="cb-v" style={{ marginBottom: 10 }}>{week.hook}</div>
          <div className="arc-days">
            {week.days.map((d, i) => (
              <div className="arc-day" key={i}><span className="ad-n">{i + 1}</span><span>{d.replace(/^Day \d+:\s*/, '')}</span></div>
            ))}
          </div>
        </div>
      )}

      {cards.length > 0 && (
        <div className="section">
          <div className="section-head"><h2>Story cards</h2><span className="count">{cards.length}</span></div>
          {cards.map(c => (
            <div className="story-card" key={c.id}>
              <div className="sc-name">{c.name}</div>
              <div className="sc-say">{c.say}</div>
              <div className="sc-sub">If stuck: {c.stall} · Done when: {c.done}</div>
            </div>
          ))}
        </div>
      )}

      {!bible && (
        <div className="cluster-note">
          This world doesn't have a full story bible yet — so there's no fantasy or payoff written for it.
          Its quests still count toward your kingdom.
        </div>
      )}

      <div className="section">
        <div className="section-head"><h2>Quests</h2><span className="count">{items.length}</span></div>
        <div className="card-grid">
          {items.map(a => <QuestCard key={a.id} activity={a} onOpen={onOpenQuest} />)}
        </div>
      </div>
    </div>
  );
}
