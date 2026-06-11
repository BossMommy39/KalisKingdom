const ITEMS = [
  { key: 'home',    label: 'Home',    ico: '🏠' },
  { key: 'worlds',  label: 'Worlds',  ico: '🏰' },
  { key: 'quests',  label: 'Quests',  ico: '✨' },
  { key: 'gallery', label: 'Gallery', ico: '🖼️' },
  { key: 'mommy',   label: 'Mommy',   ico: '💗' },
];

export default function SoftNav({ active, onNavigate }) {
  return (
    <nav className="softnav">
      {ITEMS.map(it => (
        <button
          key={it.key}
          className={`nav-item ${active === it.key ? 'active' : ''}`}
          onClick={() => onNavigate(it.key)}
        >
          <span className="ni-ico">{it.ico}</span>
          {it.label}
        </button>
      ))}
    </nav>
  );
}
