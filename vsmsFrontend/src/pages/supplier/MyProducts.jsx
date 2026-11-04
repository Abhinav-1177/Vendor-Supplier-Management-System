import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Button, Card, DataTable, Modal, PageHeader } from '../../components/ui';
import { useSupplierProducts } from '../../hooks/useSupplierProducts';
import { CATEGORY_EMOJI, LOW_STOCK_LIMIT } from '../../data/supplierData';
import ProductForm from './ProductForm';

export default function MyProducts() {
  const navigate = useNavigate();
  const { products, loading, error, updateProduct, removeProduct } = useSupplierProducts();
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [editError, setEditError] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleEditSubmit = async (data) => {
    setEditError('');
    setSaving(true);
    try {
      await updateProduct(editing.id, data);
      setEditing(null);
    } catch (err) {
      setEditError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleteError('');
    setSaving(true);
    try {
      await removeProduct(deleting.id);
      setDeleting(null);
    } catch (err) {
      setDeleteError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    {
      key: 'name', header: 'Product',
      render: (p) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 24 }}>{CATEGORY_EMOJI[p.category] || '📦'}</span>
          <div>
            <div style={{ fontWeight: 600 }}>{p.name}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>ID: {p.id}</div>
          </div>
        </div>
      ),
    },
    { key: 'category', header: 'Category' },
    { key: 'price', header: 'Price', render: (p) => `₹${p.price}/unit` },
    {
      key: 'stock', header: 'Stock',
      render: (p) => (
        <span style={{ fontWeight: 600, color: p.stock < LOW_STOCK_LIMIT ? 'var(--warning)' : 'var(--success)' }}>
          {p.stock.toLocaleString('en-IN')} units
        </span>
      ),
    },
    { key: 'status', header: 'Status', render: (p) => <Badge status={p.stock < LOW_STOCK_LIMIT ? 'Low Stock' : 'Live'} /> },
    {
      key: 'actions', header: 'Actions',
      render: (p) => (
        <div style={{ display: 'flex', gap: 6 }}>
          <Button variant="outline" size="sm" icon="bi-pencil" aria-label={`Edit ${p.name}`} onClick={() => { setEditing(p); setEditError(''); }} />
          <Button variant="danger" size="sm" icon="bi-trash" aria-label={`Delete ${p.name}`} onClick={() => { setDeleting(p); setDeleteError(''); }} />
        </div>
      ),
    },
  ];

  if (loading) return <p>Loading products…</p>;
  if (error) return <div className="alert-box alert-error" role="alert">{error}</div>;

  return (
    <>
      <PageHeader
        title="My products"
        actions={<Button variant="accent" icon="bi-plus-lg" onClick={() => navigate('/supplier/products/new')}>Add product</Button>}
      />

      <Card padded={false}>
        <DataTable columns={columns} rows={products} empty="You have not listed any products yet." />
      </Card>

      <Modal
        open={!!editing}
        title="Edit product"
        onClose={() => setEditing(null)}
        footer={
          <>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button variant="accent" type="submit" form="edit-product-form" disabled={saving}>
              {saving ? 'Saving…' : 'Save changes'}
            </Button>
          </>
        }
      >
        {editing && (
          <>
            {editError && <div className="alert-box alert-error" role="alert">{editError}</div>}
            <ProductForm
              key={editing.id}
              formId="edit-product-form"
              initial={editing}
              onSubmit={handleEditSubmit}
            />
          </>
        )}
      </Modal>

      <Modal
        open={!!deleting}
        title="Delete product"
        onClose={() => setDeleting(null)}
        footer={
          <>
            <Button variant="outline" onClick={() => setDeleting(null)}>Cancel</Button>
            <Button variant="danger" icon="bi-trash" onClick={handleDelete} disabled={saving}>
              {saving ? 'Deleting…' : 'Delete'}
            </Button>
          </>
        }
      >
        {deleteError && <div className="alert-box alert-error" role="alert">{deleteError}</div>}
        <p style={{ fontSize: 14 }}>
          Delete <b>{deleting?.name}</b>? Vendors will no longer see it, and this cannot be undone.
        </p>
      </Modal>
    </>
  );
}