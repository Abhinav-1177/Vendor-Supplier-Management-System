// Seed data for the product-report queue (mock only).
// Later: GET /admin/products?status=FLAGGED, plus POST /vendor/products/{id}/report.
export const seedReports = [
  {
    productId: 99, emoji: '🧴', name: 'Mystery Product', supplier: 'UnknownSeller', city: '',
    price: null, unit: '', stock: null,
    reason: 'Suspected spam: no price or description', reportedBy: 'Metro Mart', reportedAt: '2 days ago', status: 'Flagged',
  },
  {
    productId: 98, emoji: '🌿', name: 'Saffron Threads 5g', supplier: 'SpiceDirect', city: 'Mumbai',
    price: 90, unit: 'pack', stock: 60,
    reason: 'Misleading listing: the price looks too low to be genuine saffron', reportedBy: 'RajFoods', reportedAt: 'Yesterday', status: 'Flagged',
  },
];