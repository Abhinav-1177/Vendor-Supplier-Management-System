import { useState } from 'react';
import { Badge, Button, MiniTabs, PageHeader } from '../../components/ui';
import { useProductReports } from '../../hooks/useProductReports';

const TABS = ['Flagged', 'Removed'];

export default function ProductModeration() {
  const { reports, remove, restore } = useProductReports();
  const [tab, setTab] = useState(TABS[0]);

  const flaggedCount = reports.filter((r) => r.status === 'Flagged').length;
  const shown = reports.filter((r) => r.status === tab);

  return (
    <>
      <PageHeader
        title="Product moderation"
        subtitle="Products go live as soon as suppliers add them. Reported products are hidden from vendors until you decide."
        actions={
          <>
            <MiniTabs tabs={TABS} value={tab} onChange={setTab} />
            <Badge tone={flaggedCount ? 'danger' : 'success'}>{flaggedCount} flagged</Badge>
          </>
        }
      />

      {shown.length === 0 ? (
        <p className="empty-note">
          {tab === 'Flagged' ? 'No flagged products. Nothing needs your attention.' : 'No removed products.'}
        </p>
      ) : (
        <div className="product-grid">
          {shown.map((r) => (
            <div key={r.productId} className={`product-card ${r.status === 'Flagged' ? 'product-card--flagged' : ''}`}>
              <div className="product-img">{r.emoji}</div>

              <div className="product-top">
                <div>
                  <div className="product-name">{r.name}</div>
                  <div className="product-supplier">by {r.supplier}{r.city && ` · ${r.city}`}</div>
                </div>
                <Badge status={r.status} />
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 10 }}>
                <div className="product-price">{r.price ? `₹${r.price}` : '₹ ?'}</div>
                <div className="product-meta">
                  {r.price ? `/ ${r.unit} · Stock: ${r.stock.toLocaleString('en-IN')}` : 'No price or stock listed'}
                </div>
              </div>

              <div className="report-box">
                <b>Reported by {r.reportedBy}</b> · {r.reportedAt}
                <div>{r.reason}</div>
              </div>

              <div className="product-actions">
                <Button variant="accent" icon="bi-arrow-counterclockwise" className="flex-1" onClick={() => restore(r.productId)}>
                  Restore
                </Button>
                {r.status === 'Flagged' && (
                  <Button variant="danger" icon="bi-trash" onClick={() => remove(r.productId)}>Remove</Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}