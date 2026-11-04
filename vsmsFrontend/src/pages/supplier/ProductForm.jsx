import { useState } from 'react';
import { CITIES } from '../../config/roles';
import { CATEGORIES } from '../../data/supplierData';

const blank = { name: '', price: '', stock: '', category: '', city: '', description: '' };

function validate(f) {
  const e = {};
  if (!f.name.trim()) e.name = 'Enter a product name.';
  if (!(Number(f.price) > 0)) e.price = 'Enter a price above 0.';
  if (!(Number.isInteger(Number(f.stock)) && Number(f.stock) >= 0 && f.stock !== '')) e.stock = 'Enter a whole number of units.';
  if (!f.category) e.category = 'Select a category.';
  if (!f.city) e.city = 'Select a city.';
  return e;
}

// Used by the Add Product page and the Edit modal.
// `formId` lets a button outside the form (e.g. a modal footer) submit it. `actions` renders inside the form.
export default function ProductForm({ initial, formId, onSubmit, actions }) {
  const [form, setForm] = useState(initial ? { ...blank, ...initial, price: String(initial.price), stock: String(initial.stock) } : blank);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;
    onSubmit({
      name: form.name.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
      category: form.category,
      city: form.city,
      description: form.description.trim(),
    });
  };

  const cls = (n) => `field ${errors[n] ? 'invalid' : ''}`;
  const err = (n) => errors[n] && <div className="field-error">{errors[n]}</div>;

  return (
    <form id={formId} onSubmit={handleSubmit} noValidate>
      <div className={cls('name')}>
        <label htmlFor="name">Product name</label>
        <input id="name" name="name" placeholder="e.g. Fresh Milk 1L" value={form.name} onChange={handleChange} />
        {err('name')}
      </div>

      <div className="field-row">
        <div className={cls('price')}>
          <label htmlFor="price">Price (₹)</label>
          <input id="price" name="price" type="number" min="0" step="0.01" placeholder="0.00" value={form.price} onChange={handleChange} />
          {err('price')}
        </div>
        <div className={cls('stock')}>
          <label htmlFor="stock">Quantity (units)</label>
          <input id="stock" name="stock" type="number" min="0" placeholder="0" value={form.stock} onChange={handleChange} />
          {err('stock')}
        </div>
      </div>

      <div className="field-row">
        <div className={cls('category')}>
          <label htmlFor="category">Category</label>
          <select id="category" name="category" value={form.category} onChange={handleChange}>
            <option value="">Select category</option>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          {err('category')}
        </div>
        <div className={cls('city')}>
          <label htmlFor="city">City</label>
          <select id="city" name="city" value={form.city} onChange={handleChange}>
            <option value="">Select city</option>
            {CITIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          {err('city')}
        </div>
      </div>

      <div className="field">
        <label htmlFor="description">Description (optional)</label>
        <textarea
          id="description" name="description" rows={3} value={form.description} onChange={handleChange}
          placeholder="Quality standards, packaging, anything vendors should know"
          style={{ width: '100%', border: '1.5px solid var(--border)', borderRadius: 10, padding: '11px 14px', font: "400 14px 'Plus Jakarta Sans', sans-serif", resize: 'vertical' }}
        />
      </div>

      {actions}
    </form>
  );
}