import api, { getErrorMessage } from './api';

const STATUS_LABEL = { IN_TRANSIT: 'In Transit', DELIVERED: 'Delivered' };

function fromApi(o) {
  return {
    id: o.id,
    product: o.productName,
    supplier: o.supplierBusinessName,
    vendor: o.vendorBusinessName,
    qty: o.quantity,
    amount: Number(o.totalAmount),
    date: new Date(o.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
    status: STATUS_LABEL[o.status] || o.status,
  };
}

export async function getSupplierOrders() {
  try {
    const { data } = await api.get('/supplier/orders');
    return data.map(fromApi);
  } catch (err) {
    throw new Error(getErrorMessage(err));
  }
}

export async function markDelivered(id) {
  try {
    const { data } = await api.patch(`/supplier/orders/${id}/deliver`);
    return fromApi(data);
  } catch (err) {
    throw new Error(getErrorMessage(err));
  }
}

export async function getVendorOrders() {
  try {
    const { data } = await api.get('/vendor/orders');
    return data.map(fromApi);
  } catch (err) {
    throw new Error(getErrorMessage(err));
  }
}