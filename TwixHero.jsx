export default function SoftNav({ active, onNavigate, galleryCount }) {
  const items = [
    { id: 'today', icon: '🏠', label: 'Today' },
    { id: 'gallery', icon: '🖼️', label: `Gallery${galleryCount > 0 ? ` (${galleryCount})` : ''}` },
    { id: 'mommy', icon: '👑', label: 'Mommy' },
  ];

  return (
    <nav className="kk-nav">
      {items.map(item => (
        <button
          key={item.id}
          className={`kk-nav__item ${active === item.id ? 'active' : ''}`}
          onClick={() => onNavigate(item.id)}
          type="button"
        >
          <span className="kk-nav__icon">{item.icon}</span>
          {item.label}
        </button>
      ))}
    </nav>
  );
}
