import api, { getErrorMessage } from './api';

const titleCase = (s) => s.charAt(0) + s.slice(1).toLowerCase();

function fromApi(u) {
  return {
    id: u.id,
    name: u.name,
    businessName: u.businessName,
    email: u.email,
    phone: u.phone,
    city: u.city,
    gstin: u.gstin,
    role: titleCase(u.role),       // VENDOR -> Vendor
    status: titleCase(u.status),   // PENDING -> Pending
    rejectionReason: u.rejectionReason || '',
    joined: new Date(u.joinedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
  };
}

export async function listUsers() {
  try {
    const { data } = await api.get('/admin/users');
    return data.map(fromApi);
  } catch (err) {
    throw new Error(getErrorMessage(err));
  }
}

export async function updateUserStatus(id, status, reason) {
  try {
    const { data } = await api.patch(`/admin/users/${id}/status`, {
      status: status.toUpperCase(),
      reason,
    });
    return fromApi(data);
  } catch (err) {
    throw new Error(getErrorMessage(err));
  }
}