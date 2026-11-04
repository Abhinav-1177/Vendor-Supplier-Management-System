import api, { getErrorMessage } from './api';

const titleCase = (s) => s.charAt(0) + s.slice(1).toLowerCase();

function fromApi(o) {
  return {
    id: o.id,
    productId: o.productId,
    product: o.productName,
    city: o.city,
    supplierId: o.supplierId,
    supplier: o.supplierBusinessName,
    vendorId: o.vendorId,
    vendor: o.vendorBusinessName,
    qty: o.quantity,
    price: o.pricePerUnit,
    days: o.deliveryDays,
    note: o.note || '',
    status: titleCase(o.status), // PENDING -> Pending
    sent: new Date(o.createdAt).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
  };
}

export async function getVendorOptions() {
  try {
    const { data } = await api.get('/supplier/vendors');
    return data; // [{ id, businessName, city }]
  } catch (err) {
    throw new Error(getErrorMessage(err));
  }
}

export async function createOffer({ productId, vendorId, qty, price, days, note }) {
  try {
    const { data } = await api.post('/supplier/offers', {
      productId,
      vendorId,
      quantity: qty,
      pricePerUnit: price,
      deliveryDays: days,
      note,
    });
    return fromApi(data);
  } catch (err) {
    throw new Error(getErrorMessage(err));
  }
}

export async function getSentOffers() {
  try {
    const { data } = await api.get('/supplier/offers');
    return data.map(fromApi);
  } catch (err) {
    throw new Error(getErrorMessage(err));
  }
}

export async function getReceivedOffers() {
  try {
    const { data } = await api.get('/vendor/offers');
    return data.map(fromApi);
  } catch (err) {
    throw new Error(getErrorMessage(err));
  }
}

export async function respondToOffer(id, status) {
  try {
    const { data } = await api.patch(`/vendor/offers/${id}/status`, { status: status.toUpperCase() });
    return fromApi(data);
  } catch (err) {
    throw new Error(getErrorMessage(err));
  }
}