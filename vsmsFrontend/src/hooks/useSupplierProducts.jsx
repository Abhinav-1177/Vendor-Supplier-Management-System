import { useEffect, useState } from 'react';
import { createProduct, deleteProduct, getMyProducts, updateProduct as updateProductApi } from '../services/productService';

export function useSupplierProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getMyProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const addProduct = async (data) => {
    const created = await createProduct(data);
    setProducts((prev) => [...prev, created]);
  };

  const updateProduct = async (id, data) => {
    const updated = await updateProductApi(id, data);
    setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
  };

  const removeProduct = async (id) => {
    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return { products, loading, error, addProduct, updateProduct, removeProduct };
}