import { useEffect } from 'react';

// Controlled modal: parent owns `open`. Closes on Escape and on backdrop click.
export default function Modal({ open, title, onClose, footer, children }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="sb-modal-backdrop" onMouseDown={onClose}>
      <div
        className="sb-modal" role="dialog" aria-modal="true" aria-label={title}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <header className="sb-modal__header">
          <h3>{title}</h3>
          <button className="sb-modal__close" onClick={onClose} aria-label="Close">
            <i className="bi bi-x-lg" />
          </button>
        </header>
        <div className="sb-modal__body">{children}</div>
        {footer && <footer className="sb-modal__footer">{footer}</footer>}
      </div>
    </div>
  );
}