import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const moods = {
  Sparkly: { accent: '#F9C8D8', line: 'Sparkle first, explain later.', boost: ['Nursery Sign Mini Quest', 'Scene Builder Stickers'] },
  Cozy: { accent: '#DCCDF7', line: 'Low chaos. High charm.', boost: ['Kingdom Mailroom', 'Scene Builder Stickers'] },
  Builder: { accent: '#F8E58C', line: 'The kingdom needs infrastructure.', boost: ['Scene Builder Stickers', 'Nursery Sign Mini Quest'] },
  'Business Boss': { accent: '#8FE9D7', line: 'If it has a tag, it is official.', boost: ['Kingdom Mailroom', 'Nursery Sign Mini Quest'] },
  'Heist Crew': { accent: '#BFD3FF', line: 'Allegedly, we were never here.', boost: ['Kingdom Mailroom', 'Scene Builder Stickers'] },
  'Tech Sorceress': { accent: '#C8F4EF', line: 'Screen time, but make it spellwork.', boost: ['Scene Builder Stickers'] },
  Science: { accent: '#8FE9D7', line: 'Tiny hypothesis. Big discovery.', boost: ['Nursery Sign Mini Quest'] },
  'Puppy/Twix': { accent: '#F8E58C', line: 'Twix has inspected the vibes.', boost: ['Kingdom Mailroom'] },
  'Surprise Me': { accent: '#F9C8D8', line: 'Twix opened three doors today.', boost: [] }
};

const todayInvitations = [
  {
    title: 'Scene Builder Stickers',
    tag: 'Open Today',
    story: 'Build one tiny scene from Kali’s Kingdom, then tell what happened right before it.',
    supplies: ['Scene sticker set'],
    quick: 'Build one scene.',
    boss: 'Add a title and make up the next scene.',
    reset: ['Sticker sheets back in tray', 'Finished scene to Gallery Ready'],
    worlds: ['Gallery Row', 'K.O. Heist Crew HQ', 'Cookie Café', 'Kingdom Library']
  },
  {
    title: 'Kingdom Mailroom',
    tag: 'Open Today',
    story: 'The kingdom mail desk is open. Someone needs a note, label, clue, card, or invitation.',
    supplies: ['Note cards', 'Markers', 'A few sticker options'],
    quick: 'Make one message.',
    boss: 'Make three messages for three different worlds.',
    reset: ['Markers capped', 'Cards stacked', 'Stickers back in tray'],
    worlds: ['Creation Station', 'K.O. Heist Crew HQ', 'Kingdom Library', 'Product Drop']
  },
  {
    title: 'Nursery Sign Mini Quest',
    tag: 'Open Today',
    story: 'The nursery needs one tiny royal sign before opening day.',
    supplies: ['One wood blank', 'Rhinestone sticker sheets'],
    quick: 'Decorate the sign with a border and a name.',
    boss: 'Photograph it, place it in the nursery, and add it to the Gallery.',
    reset: ['Rhinestones back in tray', 'Sign to Gallery Ready', 'Bin closed'],
    worlds: ['Dollhouse District', 'Sparkle Studio', 'Gallery Row']
  }
];

const worlds = [
  { name: 'Barbie World', role: 'Town founder', note: 'Sunday build, story cards, calm layer, build moment, Ice Cream Social payoff.' },
  { name: 'Cookie Café Baby Bistro', role: 'Operator', note: 'Tinkercad, scrapbook, STEM, sewing, kitchen, and story prompts run as rails.' },
  { name: 'Lego Land', role: 'Mayor', note: 'Minifig stories come first; builds happen because characters need places.' },
  { name: 'Cookie Café Gallery', role: 'Curator', note: 'Art Week creates the gallery and loot for Heist Week.' },
  { name: 'K.O. Heist Crew HQ', role: 'Mastermind', note: 'Kali and friends are the burglars. Twix saw nothing.' },
  { name: 'Tech Sorceress Tower', role: 'Spell coder', note: 'Tech quests become spellwork, animation, design, and game magic.' }
];

const inventoryGroups = [
  { title: 'Today Trays', items: ['Scene Builder Stickers', 'Kingdom Mailroom', 'Nursery Sign Mini Quest'] },
  { title: 'Access Bins', items: ['Paint supplies', 'Mini canvases + wood blanks', 'Bead pen supplies', 'Shrinky dinks', 'Air-dry clay', 'Seed beads', 'Diamond art', 'Acrylic blanks — Mom Shield', 'Camera kit', 'Sewing sets', 'Punch needle supplies', 'Fort supplies bin'] },
  { title: 'Vault', items: ['Science Vault', 'Tech Vault', 'Grow & Glow Vault', 'Dig Site Vault', 'Big Mess Art Vault', 'Fiber Vault', 'Build Vault', 'Party / Playdate Vault'] }
];

function App() {
  const [mood, setMood] = useState('Surprise Me');
  const [momMode, setMomMode] = useState(false);
  const activeMood = moods[mood];

  const invitations = useMemo(() => {
    const boost = activeMood.boost || [];
    return [...todayInvitations].sort((a, b) => {
      const ar = boost.includes(a.title) ? boost.indexOf(a.title) : 99;
      const br = boost.includes(b.title) ? boost.indexOf(b.title) : 99;
      return ar - br;
    });
  }, [activeMood]);

  if (momMode) return <MomMode onClose={() => setMomMode(false)} />;

  return (
    <main className="app" style={{ '--accent': activeMood.accent }}>
      <header className="hero">
        <div className="badge">🐾</div>
        <div>
          <p className="eyebrow">Hosted by Twix, Chief Inspiration Pup</p>
          <h1>Kali’s Kingdom</h1>
          <p className="lede">Twix opened three doors today. Which one are you entering?</p>
        </div>
      </header>

      <section className="twix-card">
        <div className="twix-face">🐶</div>
        <div>
          <p className="eyebrow">Today Twix says</p>
          <h2>{activeMood.line}</h2>
          <p>Pick a mood, start a quest, then earn the Twix Approved stamp.</p>
        </div>
      </section>

      <section className="panel">
        <div className="section-head">
          <p className="eyebrow">Mood magic</p>
          <h2>Pick today’s vibe</h2>
        </div>
        <div className="moods">
          {Object.keys(moods).map((name) => (
            <button key={name} className={name === mood ? 'active' : ''} onClick={() => setMood(name)}>{name}</button>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="section-head">
          <p className="eyebrow">Open today</p>
          <h2>Today’s Invitations</h2>
          <p>Small choices. Big worlds behind each door.</p>
        </div>
        <div className="cards">
          {invitations.map((item) => <InvitationCard key={item.title} item={item} />)}
        </div>
      </section>

      <section className="cta-grid">
        <button className="big-cta">🎲 Draw a Quest</button>
        <button className="big-cta">🏰 Enter the Map</button>
        <button className="big-cta">🏷️ Launch a Product</button>
        <button className="big-cta">📸 Capture for Gallery</button>
      </section>

      <section className="panel">
        <div className="section-head">
          <p className="eyebrow">Kingdom Map</p>
          <h2>Worlds this summer</h2>
        </div>
        <div className="worlds">
          {worlds.slice(0, 4).map((world) => (
            <article className="world" key={world.name}>
              <h3>{world.name}</h3>
              <p><strong>Kali’s role:</strong> {world.role}</p>
              <p>{world.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel mom-entry">
        <div>
          <p className="eyebrow">Mom Shield</p>
          <h2>Ann’s command center</h2>
          <p>Full inventory, worlds, vault, shop, gallery, and prep live here.</p>
        </div>
        <button onClick={() => setMomMode(true)}>Open Mom Mode</button>
      </section>
    </main>
  );
}

function InvitationCard({ item }) {
  return (
    <article className="invitation">
      <span>{item.tag}</span>
      <h3>{item.title}</h3>
      <p>{item.story}</p>
      <div className="quest-row"><strong>Quick:</strong> {item.quick}</div>
      <div className="quest-row"><strong>Boss:</strong> {item.boss}</div>
      <details>
        <summary>Supplies + Reset Spell</summary>
        <p>{item.supplies.join(', ')}</p>
        <ul>{item.reset.map((r) => <li key={r}>{r}</li>)}</ul>
      </details>
    </article>
  );
}

function MomMode({ onClose }) {
  const [tab, setTab] = useState('Today');
  const tabs = ['Today', 'Inventory', 'Worlds', 'Vault', 'Shop', 'Gallery', 'Prep'];
  return (
    <main className="app mom-app">
      <header className="mom-header">
        <div>
          <p className="eyebrow">Mom Shield</p>
          <h1>Kali Summer Command Center</h1>
          <p className="lede">Kali sees the doors. Ann sees the whole kingdom.</p>
        </div>
        <button onClick={onClose}>Back to Kali Mode</button>
      </header>
      <nav className="tabs">{tabs.map((t) => <button className={tab === t ? 'active' : ''} onClick={() => setTab(t)} key={t}>{t}</button>)}</nav>
      <section className="panel mom-panel">
        {tab === 'Today' && <TodayTab />}
        {tab === 'Inventory' && <InventoryTab />}
        {tab === 'Worlds' && <WorldsTab />}
        {tab === 'Vault' && <VaultTab />}
        {tab === 'Shop' && <ShopTab />}
        {tab === 'Gallery' && <Placeholder title="Gallery" text="Completed quests, product photos, captions, and Twix Approved stamps will live here." />}
        {tab === 'Prep' && <PrepTab />}
      </section>
    </main>
  );
}

function TodayTab() {
  return <div><h2>Today Control Panel</h2><p>Active invitations: Scene Builder Stickers, Kingdom Mailroom, Nursery Sign Mini Quest.</p><p>Future controls: featured world, featured bin, calm backup, big energy option, and Mom Unlock.</p></div>;
}
function InventoryTab() {
  return <div className="mom-list">{inventoryGroups.map((g) => <article key={g.title} className="mom-card"><h3>{g.title}</h3><ul>{g.items.map((i) => <li key={i}>{i}</li>)}</ul></article>)}</div>;
}
function WorldsTab() {
  return <div className="mom-list">{worlds.map((w) => <article key={w.name} className="mom-card"><h3>{w.name}</h3><p><strong>Role:</strong> {w.role}</p><p>{w.note}</p></article>)}</div>;
}
function VaultTab() { return <Placeholder title="Supply Vault" text="Closet inventory grouped by Science, Tech, Grow & Glow, Dig Site, Big Mess Art, Fiber, Build, and Party / Playdate Vaults." />; }
function ShopTab() { return <Placeholder title="Product Drop" text="Make it → Name it → Package it → Price it → Photograph it → Twix Approved." />; }
function PrepTab() { return <Placeholder title="Prep" text="Adult-required items, setup windows, supplies arriving, print queues, charging reminders, and reset notes." />; }
function Placeholder({ title, text }) { return <div><h2>{title}</h2><p>{text}</p></div>; }

createRoot(document.getElementById('root')).render(<App />);
