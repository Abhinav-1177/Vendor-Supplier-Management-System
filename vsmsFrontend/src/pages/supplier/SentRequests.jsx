import { useEffect, useState } from 'react';
import { Avatar, Badge, Button, Modal, PageHeader } from '../../components/ui';
import { useSupplierProducts } from '../../hooks/useSupplierProducts';
import { createOffer, getSentOffers, getVendorOptions } from '../../services/offerService';

const emptyForm = { vendorId: '', productId: '', qty: '', price: '', days: '', note: '' };
const rupees = (n) => `₹${n.toLocaleString('en-IN')}`;
const STATUS_LABEL = { Pending: 'Awaiting response', Accepted: 'Accepted', Rejected: 'Rejected' };

function validate(f) {
  const e = {};
  if (!f.vendorId) e.vendorId = 'Select a vendor.';
  if (!f.productId) e.productId = 'Select a product.';
  if (!(Number.isInteger(Number(f.qty)) && Number(f.qty) > 0)) e.qty = 'Enter a whole quantity above 0.';
  if (!(Number(f.price) > 0)) e.price = 'Enter a price above 0.';
  if (!(Number.isInteger(Number(f.days)) && Number(f.days) >= 1 && Number(f.days) <= 30)) e.days = 'Enter 1 to 30 days.';
  return e;
}

export default function SentRequests() {
  const { products } = useSupplierProducts();
  const [requests, setRequests] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    Promise.all([getSentOffers(), getVendorOptions()])
      .then(([offers, vendorList]) => { setRequests(offers); setVendors(vendorList); })
      .catch((err) => setLoadError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const openModal = () => { setForm(emptyForm); setErrors({}); setSubmitError(''); setModalOpen(true); };
  const closeModal = () => setModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...form, [name]: value };
    // Choosing a product pre-fills its listed price
    if (name === 'productId') {
      const p = products.find((x) => String(x.id) === value);
      next.price = p ? String(p.price) : '';
    }
    setForm(next);
    if (errors[name]) setErrors({ ...errors, [name]: undefined });
  };

  const send = async (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;

    setSubmitError('');
    setSending(true);
    try {
      const created = await createOffer({
        productId: form.productId,
        vendorId: form.vendorId,
        qty: Number(form.qty),
        price: Number(form.price),
        days: Number(form.days),
        note: form.note.trim(),
      });
      setRequests((list) => [created, ...list]);
      closeModal();
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSending(false);
    }
  };

  const cls = (n) => `field ${errors[n] ? 'invalid' : ''}`;
  const err = (n) => errors[n] && <div className="field-error">{errors[n]}</div>;
  const total = Number(form.qty) > 0 && Number(form.price) > 0 ? Number(form.qty) * Number(form.price) : null;

  if (loading) return <p>Loading…</p>;
  if (loadError) return <div className="alert-box alert-error" role="alert">{loadError}</div>;

  return (
    <>
      <PageHeader
        title="Sent requests"
        actions={<Button variant="accent" icon="bi-send" onClick={openModal}>New offer</Button>}
      />

      <div className="request-list">
        {requests.length === 0 && <p className="empty-note">You have not sent any offers yet.</p>}
        {requests.map((r) => (
          <article key={r.id} className="request-card">
            <Avatar name={r.vendor} size={48} />
            <div className="request-card__body">
              <div className="request-card__head">
                <h3>{r.vendor} · {r.product}</h3>
              </div>
              <p className="request-card__desc">
                Offer: {r.qty.toLocaleString('en-IN')} units at {rupees(r.price)}/unit. Total {rupees(r.qty * r.price)}.
                Delivery in {r.days} day{r.days > 1 ? 's' : ''}. {r.note}
              </p>
              <div className="request-card__meta">
                <span><i className="bi bi-clock" /> Sent {r.sent}</span>
                <span><i className="bi bi-geo-alt" /> {r.city}</span>
              </div>
            </div>
            <Badge status={r.status}>{STATUS_LABEL[r.status]}</Badge>
          </article>
        ))}
      </div>

      <Modal
        open={modalOpen}
        title="Send offer to vendor"
        onClose={closeModal}
        footer={
          <>
            <Button variant="outline" onClick={closeModal}>Cancel</Button>
            <Button variant="accent" type="submit" form="offer-form" icon="bi-send" disabled={sending}>
              {sending ? 'Sending…' : 'Send offer'}
            </Button>
          </>
        }
      >
        <form id="offer-form" onSubmit={send} noValidate>
          {submitError && <div className="alert-box alert-error" role="alert">{submitError}</div>}

          <div className={cls('vendorId')}>
            <label htmlFor="vendorId">Vendor</label>
            <select id="vendorId" name="vendorId" value={form.vendorId} onChange={handleChange}>
              <option value="">{vendors.length ? 'Select vendor' : 'No active vendors yet'}</option>
              {vendors.map((v) => <option key={v.id} value={v.id}>{v.businessName} · {v.city}</option>)}
            </select>
            {err('vendorId')}
          </div>

          <div className={cls('productId')}>
            <label htmlFor="productId">Product</label>
            <select id="productId" name="productId" value={form.productId} onChange={handleChange}>
              <option value="">{products.length ? 'Select product' : 'Add a product first'}</option>
              {products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            {err('productId')}
          </div>

          <div className="field-row">
            <div className={cls('qty')}>
              <label htmlFor="qty">Quantity</label>
              <input id="qty" name="qty" type="number" min="1" value={form.qty} onChange={handleChange} />
              {err('qty')}
            </div>
            <div className={cls('price')}>
              <label htmlFor="price">Price per unit (₹)</label>
              <input id="price" name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} />
              {err('price')}
            </div>
          </div>

          <div className={cls('days')}>
            <label htmlFor="days">Delivery time (days)</label>
            <input id="days" name="days" type="number" min="1" max="30" value={form.days} onChange={handleChange} />
            {err('days')}
          </div>

          <div className="field">
            <label htmlFor="note">Note (optional)</label>
            <input id="note" name="note" placeholder="e.g. Weekly recurring deal" value={form.note} onChange={handleChange} />
          </div>

          {total && <p style={{ fontSize: 13, fontWeight: 600 }}>Offer total: {rupees(total)}</p>}
        </form>
      </Modal>
    </>
  );
}