import Icon from './Icon';

const ITEMS = [
  { key: 'map',     label: 'Map',     icon: 'map' },
  { key: 'quests',  label: 'Quests',  icon: 'sparkles' },
  { key: 'gallery', label: 'Gallery', icon: 'gallery' },
  { key: 'mommy',   label: 'Parent',  icon: 'heart' },
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
          <Icon name={it.icon} size={22} />
          {it.label}
        </button>
      ))}
    </nav>
  );
}
