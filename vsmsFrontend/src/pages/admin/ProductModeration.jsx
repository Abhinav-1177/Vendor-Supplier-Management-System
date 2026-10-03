import { useState } from 'react';
import { Badge, Button, PageHeader } from '../../components/ui';
import { initialProducts } from '../../data/adminData';

export default function ProductModeration() {
  const [products, setProducts] = useState(initialProducts);

  const pending = products.filter((p) => p.status === 'Review' || p.status === 'Flagged').length;

  // Later: call the moderation API first, then update state on success
  const approve = (id) => setProducts((l) => l.map((p) => (p.id === id ? { ...p, status: 'Live' } : p)));
  const remove = (id) => setProducts((l) => l.filter((p) => p.id !== id));

  return (
    <>
      <PageHeader
        title="Product moderation"
        actions={<Badge tone="warning">{pending} pending review</Badge>}
      />

      {products.length === 0 ? (
        <p className="empty-note">No products to moderate.</p>
      ) : (
        <div className="product-grid">
          {products.map((p) => (
            <div key={p.id} className={`product-card ${p.status === 'Flagged' ? 'product-card--flagged' : ''}`}>
              <div className="product-img">{p.emoji}</div>

              <div className="product-top">
                <div>
                  <div className="product-name">{p.name}</div>
                  <div className="product-supplier">
                    by {p.supplier}{p.city && ` · ${p.city}`}
                  </div>
                </div>
                <Badge status={p.status} />
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 10 }}>
                <div className="product-price">{p.price ? `₹${p.price}` : '₹ ?'}</div>
                <div className="product-meta" style={p.note ? { color: 'var(--danger)' } : undefined}>
                  {p.note || `/ ${p.unit} · Stock: ${p.stock.toLocaleString('en-IN')}`}
                </div>
              </div>

              <div className="product-actions">
                {p.status === 'Review' && (
                  <Button variant="accent" icon="bi-check-lg" className="flex-1" onClick={() => approve(p.id)}>Approve</Button>
                )}
                <Button
                  variant="danger" icon="bi-trash"
                  aria-label={`Remove ${p.name}`}
                  onClick={() => remove(p.id)}
                >
                  {p.status === 'Flagged' ? 'Remove' : undefined}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}