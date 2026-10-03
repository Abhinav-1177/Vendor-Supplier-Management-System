export default function Card({ title, actions, padded = true, className = '', children }) {
  return (
    <section className={`sb-card ${className}`}>
      {(title || actions) && (
        <header className="sb-card__header">
          {typeof title === 'string' ? <h3 className="sb-card__title">{title}</h3> : <div>{title}</div>}
          {actions}
        </header>
      )}
      <div className={padded ? 'sb-card__body' : ''}>{children}</div>
    </section>
  );
}