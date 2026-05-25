export default function AskMommy({ suggestions, onOpenMommy, mood }) {
  return (
    <div className="kk-card kk-ask-mommy stagger-in">
      <div className="kk-ask-mommy__emoji">🐾</div>
      <h3 className="kk-ask-mommy__title">Ask Mommy!</h3>
      <p className="kk-ask-mommy__text">
        Twix is waiting for Mommy to open today&apos;s doors.
        <br />
        Show her your phone and she&apos;ll pick your quests!
      </p>

      <button
        className="kk-btn kk-btn--primary"
        onClick={onOpenMommy}
        type="button"
        style={{ width: '100%', marginBottom: 16 }}
      >
        👑 Open Mommy Mode
      </button>

      {suggestions.length > 0 && (
        <div className="kk-ask-mommy__suggestions">
          <h4>Twix&apos;s {mood} mood picks to suggest:</h4>
          {suggestions.map(a => (
            <div key={a.id} className="kk-ask-mommy__suggestion">
              <strong>{a.name}</strong> — {a.category}
              <div style={{ fontSize: '0.78rem', color: 'var(--ink-faint)', marginTop: 2 }}>
                {a.quick}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
