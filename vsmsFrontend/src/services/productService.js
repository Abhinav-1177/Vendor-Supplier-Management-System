import api, { getErrorMessage } from './api';

// 'Dairy' (frontend) <-> 'DAIRY' (backend enum)
const toApiCategory = (c) => c.toUpperCase();
const fromApiCategory = (c) => c.charAt(0) + c.slice(1).toLowerCase();

function fromApi(p) {
  return {
    id: p.id,
    name: p.name,
    price: p.price,
    stock: p.stock,
    category: fromApiCategory(p.category),
    city: p.city,
    description: p.description || '',
  };
}

export async function createProduct(data) {
  try {
    const { data: created } = await api.post('/supplier/products', {
      name: data.name,
      price: data.price,
      stock: data.stock,
      category: toApiCategory(data.category),
      city: data.city,
      description: data.description,
    });
    return fromApi(created);
  } catch (err) {
    throw new Error(getErrorMessage(err));
  }
}

export async function getMyProducts() {
  try {
    const { data } = await api.get('/supplier/products');
    return data.map(fromApi);
  } catch (err) {
    throw new Error(getErrorMessage(err));
  }
}
export async function getMarketProducts(filters = {}) {
  try {
    const { data } = await api.get('/vendor/products', { params: filters });
    return data.map(fromApi);
  } catch (err) {
    throw new Error(getErrorMessage(err));
  }
}
export async function updateProduct(id, data) {
  try {
    const { data: updated } = await api.put(`/supplier/products/${id}`, {
      name: data.name,
      price: data.price,
      stock: data.stock,
      category: toApiCategory(data.category),
      city: data.city,
      description: data.description,
    });
    return fromApi(updated);
  } catch (err) {
    throw new Error(getErrorMessage(err));
  }
}

export async function deleteProduct(id) {
  try {
    await api.delete(`/supplier/products/${id}`);
  } catch (err) {
    throw new Error(getErrorMessage(err));
  }
}