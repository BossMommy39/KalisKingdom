import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const moods = {
  Sparkly: { icon: '✨', accent: '#F9C8D8', line: 'Sparkle first. Explain later.', boost: ['Nursery Sign Mini Quest', 'Scene Builder Stickers'] },
  Cozy: { icon: '💙', accent: '#DCCDF7', line: 'Low chaos. High charm.', boost: ['Kingdom Mailroom', 'Scene Builder Stickers'] },
  Builder: { icon: '🔨', accent: '#F8E58C', line: 'The kingdom needs infrastructure.', boost: ['Nursery Sign Mini Quest'] },
  'Business Boss': { icon: '🏷️', accent: '#8FE9D7', line: 'If it has a tag, it is official.', boost: ['Kingdom Mailroom'] },
  'Caper Crew': { icon: '🥷', accent: '#BFD3FF', line: 'Twix saw nothing. Obviously.', boost: ['Kingdom Mailroom', 'Scene Builder Stickers'] },
  'Tech Sorceress': { icon: '🪄', accent: '#C8F4EF', line: 'Screen time, but make it spellwork.', boost: ['Scene Builder Stickers'] },
  Science: { icon: '🧪', accent: '#8FE9D7', line: 'Tiny hypothesis. Big discovery.', boost: ['Nursery Sign Mini Quest'] },
  'Puppy/Twix': { icon: '🐾', accent: '#F8E58C', line: 'Twix has inspected the vibes.', boost: ['Kingdom Mailroom'] },
  'Surprise Me': { icon: '🎲', accent: '#F9C8D8', line: 'Twix opened three doors today.', boost: [] }
};

const invitations = [
  { title: 'Scene Builder Stickers', tag: 'Open Today', icon: '🖼️', story: 'Build one tiny scene from Kali’s Kingdom, then tell what happened right before it.', quick: 'Build one scene and name it.', boss: 'Add the scene that happens next.', reset: ['Sticker sheets back in tray', 'Finished scene to Gallery Ready'] },
  { title: 'Kingdom Mailroom', tag: 'Open Today', icon: '💌', story: 'The kingdom mail desk is open. Someone needs a note, label, clue, card, or invitation.', quick: 'Make one message for one world.', boss: 'Make three messages: sweet, official, and mysterious.', reset: ['Markers capped', 'Cards stacked', 'Stickers back in tray'] },
  { title: 'Nursery Sign Mini Quest', tag: 'Open Today', icon: '💎', story: 'The nursery is opening, but the door still has no name. Make one sparkly sign so the tiniest residents know where they belong.', quick: 'Decorate the sign with a border and a name.', boss: 'Place it in the nursery and add it to the Gallery.', reset: ['Rhinestones back in tray', 'Sign to Gallery Ready', 'Bin closed'] }
];

const worlds = [
  ['🏡', 'Dollhouse District', 'Kali is the town founder. Twix is the real estate inspector.'],
  ['🍼', 'Cookie Café Baby Bistro', 'A café world with tiny menus, service stories, and baby doll operations.'],
  ['🧱', 'Lego Land', 'Minifig stories come first; builds happen because characters need places.'],
  ['🎨', 'Cookie Café Gallery', 'Art Week creates the gallery, labels, and later mystery-caper props.'],
  ['🥷', 'K.O. Caper Crew HQ', 'The crew plans a playful gallery caper. Twix is the lookout.'],
  ['🪄', 'Tech Sorceress Tower', 'Coding, animation, stop-motion, and digital design become spellwork.']
];

const inventory = [
  ['Today Trays', ['Scene Builder Stickers', 'Kingdom Mailroom', 'Nursery Sign Mini Quest']],
  ['Access Bins', ['Paint supplies', 'Mini canvases + wood blanks', 'Bead pen supplies', 'Air-dry clay', 'Seed beads', 'Diamond art', 'Camera kit', 'Sewing sets', 'Fort supplies']],
  ['Mom Shield', ['Acrylic blanks', 'Aromatherapy bottles', 'Shrinky dinks heat step', 'Punch needle setup']],
  ['Vault', ['Science Vault', 'Tech Vault', 'Grow & Glow Vault', 'Dig Site Vault', 'Big Mess Art Vault', 'Fiber Vault', 'Build Vault']]
];

function useGallery() {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('kali-gallery') || '[]'); } catch { return []; }
  });
  const save = (next) => { setItems(next); localStorage.setItem('kali-gallery', JSON.stringify(next)); };
  return { items, add: (entry) => save([{ ...entry, id: Date.now(), date: new Date().toLocaleDateString() }, ...items]), clear: () => save([]) };
}

function App() {
  const [mood, setMood] = useState('Surprise Me');
  const [mom, setMom] = useState(false);
  const [quest, setQuest] = useState(null);
  const [product, setProduct] = useState(false);
  const gallery = useGallery();
  const active = moods[mood];
  const ordered = useMemo(() => [...invitations].sort((a,b) => (active.boost.includes(a.title) ? active.boost.indexOf(a.title) : 99) - (active.boost.includes(b.title) ? active.boost.indexOf(b.title) : 99)), [active]);
  if (mom) return <MomMode onClose={() => setMom(false)} gallery={gallery} mood={mood} />;
  return <main className="app" style={{ '--accent': active.accent }}>
    <header className="hero"><div className="badge">🐾</div><div><p className="eyebrow">Hosted by Twix, Chief Inspiration Pup</p><h1>Kali’s Kingdom</h1><p className="lede">Twix opened three doors today. Which one are you entering?</p></div></header>
    <section className="twix-card"><div className="twix-face">{active.icon}</div><div><p className="eyebrow">Today Twix says</p><h2>{active.line}</h2><p>Pick a mood, start a quest, then earn the Twix Approved stamp.</p></div></section>
    <section className="panel"><div className="section-head"><p className="eyebrow">Mood magic</p><h2>Pick today’s vibe</h2></div><div className="moods">{Object.entries(moods).map(([name,data]) => <button key={name} className={name===mood?'active':''} onClick={() => setMood(name)}>{data.icon} {name}</button>)}</div></section>
    <section className="panel"><div className="section-head"><p className="eyebrow">Open today</p><h2>Today’s Invitations</h2><p>Small choices. Big worlds behind each door.</p></div><div className="cards">{ordered.map(item => <Invitation key={item.title} item={item} onOpen={() => setQuest(item)} />)}</div></section>
    <section className="cta-grid"><button className="big-cta" onClick={() => setQuest(ordered[Math.floor(Math.random()*ordered.length)])}>🎲 Draw a Quest</button><a className="big-cta" href="#map">🏰 Enter the Map</a><button className="big-cta" onClick={() => setProduct(true)}>🏷️ Launch a Product</button><a className="big-cta" href="#gallery">📸 Gallery</a></section>
    <section id="map" className="panel"><div className="section-head"><p className="eyebrow">Kingdom Map</p><h2>Worlds this summer</h2></div><div className="worlds">{worlds.map(([icon,name,note]) => <article className="world" key={name}><h3>{icon} {name}</h3><p>{note}</p></article>)}</div></section>
    <section id="gallery" className="panel"><div className="section-head"><p className="eyebrow">Twix Approved</p><h2>Gallery</h2></div>{gallery.items.length ? <div className="worlds">{gallery.items.map(g => <article className="world" key={g.id}><h3>{g.title}</h3><p>{g.type} · {g.status}</p><p>{g.caption}</p><small>{g.date}</small></article>)}</div> : <p>No treasures yet. Launch a product or finish a quest to earn the first stamp.</p>}</section>
    <section className="panel mom-entry"><div><p className="eyebrow">Mom Shield</p><h2>Ann’s Command Center</h2><p>Full inventory, worlds, vault, shop, gallery, and prep live here.</p></div><button onClick={() => setMom(true)}>Open Mom Mode</button></section>
    {quest && <QuestModal item={quest} onClose={() => setQuest(null)} onDone={() => { gallery.add({ title: quest.title, type: 'Quest', status: 'Twix Approved', caption: quest.boss }); setQuest(null); }} />}
    {product && <ProductDrop onClose={() => setProduct(false)} onSave={(entry) => { gallery.add(entry); setProduct(false); }} />}
  </main>;
}

function Invitation({ item, onOpen }) { return <article className="invitation"><span>{item.tag}</span><h3>{item.icon} {item.title}</h3><p>{item.story}</p><div className="quest-row"><strong>Quick:</strong> {item.quick}</div><div className="quest-row"><strong>Boss:</strong> {item.boss}</div><button onClick={onOpen}>Start Quest</button></article>; }
function QuestModal({ item, onClose, onDone }) { return <div className="modal-backdrop"><article className="modal"><button className="close" onClick={onClose}>×</button><p className="eyebrow">Quest briefing</p><h2>{item.icon} {item.title}</h2><p>{item.story}</p><div className="world"><h3>Quick Quest</h3><p>{item.quick}</p></div><div className="world"><h3>Boss Quest</h3><p>{item.boss}</p></div><div className="world"><h3>Reset Spell</h3><ul>{item.reset.map(r => <li key={r}>{r}</li>)}</ul></div><button className="primary" onClick={onDone}>Stamp it Twix Approved</button></article></div>; }
function ProductDrop({ onClose, onSave }) { const [name,setName]=useState(''); const [status,setStatus]=useState('display'); return <div className="modal-backdrop"><article className="modal"><button className="close" onClick={onClose}>×</button><p className="eyebrow">Product Drop</p><h2>Make it official</h2><p>Twix says: If it has a tag, it is official. I do not make the rules.</p><label>Product name<input value={name} onChange={e=>setName(e.target.value)} placeholder="Royal Nursery Sign" /></label><label>Status<select value={status} onChange={e=>setStatus(e.target.value)}><option>display</option><option>gift</option><option>sell</option><option>keep</option></select></label><ol className="steps"><li>Make it</li><li>Name it</li><li>Package it</li><li>Price it</li><li>Photograph it</li><li>Twix Approved</li></ol><button className="primary" onClick={() => onSave({ title: name || 'Mystery Product', type: 'Product Drop', status, caption: 'Official Kali’s Kingdom product drop.' })}>Add to Gallery</button></article></div>; }
function MomMode({ onClose, gallery, mood }) { const [tab,setTab]=useState('Today'); const tabs=['Today','Inventory','Worlds','Vault','Shop','Gallery','Prep']; return <main className="app"><header className="mom-header"><div><p className="eyebrow">Mom Shield</p><h1>Kali Summer Command Center</h1><p className="lede">Kali sees the doors. Ann sees the whole kingdom.</p></div><button onClick={onClose}>Back to Kali Mode</button></header><nav className="tabs">{tabs.map(t => <button className={tab===t?'active':''} onClick={() => setTab(t)} key={t}>{t}</button>)}</nav><section className="panel mom-panel">{tab==='Today' && <div><h2>Today Control Panel</h2><p>Active mood: {mood}</p><p>Open doors: Scene Builder Stickers, Kingdom Mailroom, Nursery Sign Mini Quest.</p></div>}{tab==='Inventory' && <List groups={inventory}/>} {tab==='Worlds' && <div className="mom-list">{worlds.map(([icon,name,note]) => <article className="mom-card" key={name}><h3>{icon} {name}</h3><p>{note}</p></article>)}</div>} {tab==='Vault' && <p>Closet inventory stays remembered here without becoming child-facing clutter.</p>} {tab==='Shop' && <p>Make it → Name it → Package it → Price it → Photograph it → Twix Approved.</p>} {tab==='Gallery' && (gallery.items.length ? <div className="mom-list">{gallery.items.map(g => <article className="mom-card" key={g.id}><h3>{g.title}</h3><p>{g.caption}</p></article>)}</div> : <p>No records yet.</p>)} {tab==='Prep' && <ul><li>Acrylic blanks require adult help.</li><li>Shrinky dinks need heat supervision.</li><li>Art/Gallery should happen before Caper Week.</li></ul>}</section></main>; }
function List({groups}) { return <div className="mom-list">{groups.map(([title,items]) => <article className="mom-card" key={title}><h3>{title}</h3><ul>{items.map(i => <li key={i}>{i}</li>)}</ul></article>)}</div>; }

createRoot(document.getElementById('root')).render(<App />);
