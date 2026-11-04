import { useEffect, useMemo, useState } from 'react';
import { Badge, Button, Modal, PageHeader } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';
import { useProductReports } from '../../hooks/useProductReports';
import { getMarketProducts } from '../../services/productService';
import { CATEGORIES, CATEGORY_EMOJI } from '../../data/supplierData';
import { CITIES } from '../../config/roles';

const REASONS = ['Misleading listing', 'Suspected spam', 'Wrong category', 'Quality issue', 'Other'];

export default function BrowseProducts() {
  const { user } = useAuth();
  const { hiddenIds, addReport } = useProductReports();

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');
  const [requested, setRequested] = useState(() => new Set());

  const [reporting, setReporting] = useState(null);
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const [reasonError, setReasonError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    setLoading(true);
    getMarketProducts({ city: city || undefined, category: category ? category.toUpperCase() : undefined })
      .then(setAllProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [city, category]);

  // Reported or removed products are hidden from vendors (still local-only)
  const products = useMemo(
    () => allProducts.filter((p) => !hiddenIds.has(p.id)),
    [allProducts, hiddenIds]
  );

  // Not yet backed by the API — offer requests come next
  const requestOffer = (id) => setRequested((s) => new Set(s).add(id));

  const openReport = (p) => { setReporting(p); setReason(''); setDetails(''); setReasonError(''); };
  const closeReport = () => setReporting(null);

  const submitReport = (e) => {
    e.preventDefault();
    if (!reason) { setReasonError('Choose a reason.'); return; }
    addReport({
      product: reporting,
      reason: details.trim() ? `${reason}: ${details.trim()}` : reason,
      reportedBy: user.businessName || user.name,
    });
    setNotice(`Thanks. ${reporting.name} is hidden while an admin reviews your report.`);
    closeReport();
  };

  return (
    <>
      <PageHeader
        title="Browse products"
        actions={
          <div className="filter-row">
            <select className="filter-select" aria-label="Filter by city" value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="">All cities</option>
              {CITIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <select className="filter-select" aria-label="Filter by category" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">All categories</option>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        }
      />

      {notice && <div className="alert-box alert-success" role="status">{notice}</div>}
      {error && <div className="alert-box alert-error" role="alert">{error}</div>}

      {loading ? (
        <p className="empty-note">Loading products…</p>
      ) : products.length === 0 ? (
        <p className="empty-note">No products match these filters.</p>
      ) : (
        <div className="product-grid">
          {products.map((p) => {
            const done = requested.has(p.id);
            return (
              <div className="product-card" key={p.id}>
                <div className="product-img">{CATEGORY_EMOJI[p.category] || '📦'}</div>
                <div className="product-name">{p.name}</div>
                <div className="product-supplier">{p.supplierBusinessName} · {p.city}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                  <div className="product-price">₹{p.price}</div>
                </div>
                <div className="product-meta" style={{ marginTop: 2 }}>Stock: {p.stock.toLocaleString('en-IN')} units</div>
                <div className="product-actions">
                  {done ? (
                    <Badge tone="success">Offer requested</Badge>
                  ) : (
                    <Button variant="accent" icon="bi-send" className="flex-1" onClick={() => requestOffer(p.id)}>Request offer</Button>
                  )}
                  <Button variant="outline" icon="bi-flag" title="Report this product" aria-label={`Report ${p.name}`} onClick={() => openReport(p)} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Modal
        open={!!reporting}
        title={reporting ? `Report ${reporting.name}` : ''}
        onClose={closeReport}
        footer={
          <>
            <Button variant="outline" onClick={closeReport}>Cancel</Button>
            <Button variant="danger" type="submit" form="report-form" icon="bi-flag">Submit report</Button>
          </>
        }
      >
        <form id="report-form" onSubmit={submitReport} noValidate>
          <div className={`field ${reasonError ? 'invalid' : ''}`}>
            <label htmlFor="report-reason">Reason</label>
            <select id="report-reason" value={reason} onChange={(e) => { setReason(e.target.value); setReasonError(''); }}>
              <option value="">Select a reason</option>
              {REASONS.map((r) => <option key={r}>{r}</option>)}
            </select>
            {reasonError && <div className="field-error">{reasonError}</div>}
          </div>
          <div className="field" style={{ marginBottom: 0 }}>
            <label htmlFor="report-details">Details (optional)</label>
            <textarea
              id="report-details" rows={3} value={details}
              placeholder="Anything that helps the admin check this listing"
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>
        </form>
      </Modal>
    </>
  );
}