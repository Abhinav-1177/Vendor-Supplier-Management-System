// tabs: ['Monthly', 'Weekly'] ; controlled with value + onChange
export default function MiniTabs({ tabs, value, onChange }) {
  return (
    <div className="mini-tabs" role="tablist">
      {tabs.map((t) => (
        <button
          key={t} role="tab" aria-selected={value === t}
          className={`mini-tab ${value === t ? 'active' : ''}`}
          onClick={() => onChange(t)}
        >
          {t}
        </button>
      ))}
    </div>
  );
}