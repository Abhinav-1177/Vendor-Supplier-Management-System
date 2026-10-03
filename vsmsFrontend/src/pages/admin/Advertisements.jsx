import { useState } from 'react';
import { Button, Modal, PageHeader } from '../../components/ui';
import { initialCampaigns } from '../../data/adminData';

const PLACEMENTS = ['Homepage Hero', 'Product Spotlight', 'Sidebar'];
const emptyForm = { title: '', supplier: '', start: '', end: '', placement: PLACEMENTS[0], budget: '' };

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

function validate(f) {
  const e = {};
  if (!f.title.trim()) e.title = 'Enter a campaign title.';
  if (!f.supplier.trim()) e.supplier = 'Enter the supplier or brand.';
  if (!f.start) e.start = 'Pick a start date.';
  if (!f.end) e.end = 'Pick an end date.';
  if (f.start && f.end && f.end < f.start) e.end = 'End date must be after the start date.';
  if (!(Number(f.budget) > 0)) e.budget = 'Enter a budget above 0.';
  return e;
}

export default function Advertisements() {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const openModal = () => { setForm(emptyForm); setErrors({}); setModalOpen(true); };
  const closeModal = () => setModalOpen(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: undefined });
  };

  const launch = (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;
    // Later: POST to the API, then add the returned campaign
    setCampaigns((l) => [...l, { id: Date.now(), ...form, budget: Number(form.budget), status: 'Active' }]);
    closeModal();
  };

  const stop = (id) => setCampaigns((l) => l.map((c) => (c.id === id ? { ...c, status: 'Stopped' } : c)));

  const err = (name) => errors[name] && <div className="field-error">{errors[name]}</div>;

  return (
    <>
      <PageHeader
        title="Advertisement control"
        actions={<Button variant="accent" icon="bi-plus-lg" onClick={openModal}>Add banner</Button>}
      />

      <div className="ad-grid">
        {campaigns.map((c) => (
          <article
            key={c.id}
            className={`ad-card ${c.placement === 'Homepage Hero' ? 'ad-card--hero' : ''} ${c.status === 'Stopped' ? 'ad-card--stopped' : ''}`}
          >
            <div className="ad-label">{c.status} · {c.placement}</div>
            <h3 className="ad-title">{c.title} · {c.supplier}</h3>
            <p className="ad-meta">
              {fmtDate(c.start)} to {fmtDate(c.end)} · ₹{c.budget.toLocaleString('en-IN')} budget
            </p>
            {c.status === 'Active' && (
              <div className="ad-actions">
                <Button variant="outline" size="sm" icon="bi-pencil">Edit</Button>
                <Button variant="danger" size="sm" icon="bi-stop-circle" onClick={() => stop(c.id)}>Stop</Button>
              </div>
            )}
          </article>
        ))}

        <button className="ad-add" onClick={openModal}>
          <i className="bi bi-plus-circle" />
          Add new advertisement slot
          <span style={{ fontSize: 12, fontWeight: 400 }}>Promote a supplier or product</span>
        </button>
      </div>

      <Modal
        open={modalOpen}
        title="Add new banner"
        onClose={closeModal}
        footer={
          <>
            <Button variant="outline" onClick={closeModal}>Cancel</Button>
            <Button variant="accent" type="submit" form="banner-form" icon="bi-megaphone">Launch campaign</Button>
          </>
        }
      >
        <form id="banner-form" onSubmit={launch} noValidate>
          <div className={`field ${errors.title ? 'invalid' : ''}`}>
            <label htmlFor="title">Campaign title</label>
            <input id="title" name="title" placeholder="e.g. Summer Fresh Deals" value={form.title} onChange={handleChange} />
            {err('title')}
          </div>
          <div className={`field ${errors.supplier ? 'invalid' : ''}`}>
            <label htmlFor="supplier">Supplier / brand</label>
            <input id="supplier" name="supplier" placeholder="Supplier name" value={form.supplier} onChange={handleChange} />
            {err('supplier')}
          </div>
          <div className="field-row">
            <div className={`field ${errors.start ? 'invalid' : ''}`}>
              <label htmlFor="start">Start date</label>
              <input id="start" name="start" type="date" value={form.start} onChange={handleChange} />
              {err('start')}
            </div>
            <div className={`field ${errors.end ? 'invalid' : ''}`}>
              <label htmlFor="end">End date</label>
              <input id="end" name="end" type="date" value={form.end} onChange={handleChange} />
              {err('end')}
            </div>
          </div>
          <div className="field">
            <label htmlFor="placement">Placement</label>
            <select id="placement" name="placement" value={form.placement} onChange={handleChange}>
              {PLACEMENTS.map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div className={`field ${errors.budget ? 'invalid' : ''}`}>
            <label htmlFor="budget">Budget (₹)</label>
            <input id="budget" name="budget" type="number" min="0" placeholder="e.g. 5000" value={form.budget} onChange={handleChange} />
            {err('budget')}
          </div>
        </form>
      </Modal>
    </>
  );
}