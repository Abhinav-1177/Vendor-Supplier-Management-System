// tone: accent | orange | info | success | warning | danger (icon colour)
// trend: text like "+12% this month"; trendDir: 'up' | 'down' | undefined
export default function StatCard({ icon, tone = 'accent', value, label, trend, trendDir, featured }) {
  return (
    <div className={`stat-card ${featured ? 'stat-card--featured' : ''}`}>
      <div className={`stat-icon tone-${tone}`}><i className={`bi ${icon}`} /></div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      {trend && (
        <div className={`stat-trend ${trendDir || ''}`}>
          {trendDir && <i className={`bi bi-arrow-${trendDir}-short`} />}
          {trend}
        </div>
      )}
    </div>
  );
}