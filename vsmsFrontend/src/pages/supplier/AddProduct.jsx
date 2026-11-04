import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, PageHeader } from '../../components/ui';
import { useSupplierProducts } from '../../hooks/useSupplierProducts';
import ProductForm from './ProductForm';

export default function AddProduct() {
  const navigate = useNavigate();
  const { addProduct } = useSupplierProducts();
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (data) => {
    setError('');
    setSaving(true);
    try {
      await addProduct(data);
      navigate('/supplier/products');
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Add new product"
        actions={<Button variant="outline" icon="bi-arrow-left" onClick={() => navigate('/supplier/products')}>Back to products</Button>}
      />

      <Card title="Product details" className="form-card">
        {error && <div className="alert-box alert-error" role="alert">{error}</div>}
        <ProductForm
          onSubmit={handleSubmit}
          actions={
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="accent" type="submit" icon="bi-plus-circle" className="flex-1" disabled={saving}>
                {saving ? 'Adding…' : 'Add product'}
              </Button>
              <Button variant="outline" onClick={() => navigate('/supplier/products')}>Cancel</Button>
            </div>
          }
        />
      </Card>
    </>
  );
}