// Dummy supplier data. Each export maps to one API call later.

export const CATEGORIES = ['Dairy', 'Grains', 'Vegetables', 'Fruits', 'Spices', 'Poultry', 'Beverages'];

export const CATEGORY_EMOJI = {
  Dairy: '🥛', Grains: '🌾', Vegetables: '🥦', Fruits: '🍎', Spices: '🧂', Poultry: '🥚', Beverages: '🥤',
};

export const LOW_STOCK_LIMIT = 50;

export const seedProducts = [
  { id: 'PRD-001', name: 'Fresh Milk 1L', category: 'Dairy', price: 48, stock: 500, city: 'Delhi', description: '' },
  { id: 'PRD-002', name: 'Paneer 500g', category: 'Dairy', price: 140, stock: 42, city: 'Delhi', description: '' },
  { id: 'PRD-003', name: 'Farm Eggs (12)', category: 'Poultry', price: 90, stock: 800, city: 'Delhi', description: '' },
];

export const supplierStats = {
  requestsSent: 5,
  acceptedOrders: 34,
  revenueMonth: '₹12.8L',
};

export const revenueTrend = {
  labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
  data: [6.2, 7.8, 9.4, 8.1, 10.4, 11.2, 12.8], // ₹L
};

// ── Sent requests (offers this supplier sent to vendors) ──
// status: 'Pending' | 'Accepted' | 'Rejected'
export const initialSentRequests = [
  { id: 1, vendor: 'RajFoods', product: 'Fresh Milk 1L', qty: 200, price: 48, days: 1, city: 'Delhi', sent: '4h ago', status: 'Pending', note: '' },
  { id: 2, vendor: 'Metro Mart', product: 'Farm Eggs (12)', qty: 100, price: 85, days: 2, city: 'Mumbai', sent: 'Yesterday', status: 'Accepted', note: 'Weekly recurring deal proposed.' },
  { id: 3, vendor: 'FreshMart', product: 'Paneer 500g', qty: 40, price: 135, days: 2, city: 'Pune', sent: '2 days ago', status: 'Pending', note: '' },
  { id: 4, vendor: 'CityGrocer', product: 'Fresh Milk 1L', qty: 150, price: 47, days: 1, city: 'Delhi', sent: '3 days ago', status: 'Rejected', note: '' },
  { id: 5, vendor: 'QuickBuy', product: 'Paneer 500g', qty: 80, price: 140, days: 3, city: 'Bangalore', sent: '4 days ago', status: 'Accepted', note: '' },
];

// ── Accepted orders ──
export const initialAcceptedOrders = [
  { id: 'ORD-1042', vendor: 'RajFoods', product: 'Fresh Milk (200 units)', amount: 9600, date: 'Apr 5, 2026', status: 'Delivered' },
  { id: 'ORD-1041', vendor: 'Metro Mart', product: 'Farm Eggs (100 dozen)', amount: 8500, date: 'Apr 4, 2026', status: 'In Transit' },
  { id: 'ORD-1038', vendor: 'QuickBuy', product: 'Paneer (80 packs)', amount: 11200, date: 'Apr 1, 2026', status: 'Delivered' },
];

// ── Revenue summary ──
export const revenueStats = {
  thisMonth: '₹12.8L',
  thisYear: '₹96.4L',
  ordersFulfilled: 34,
};

export const revenueByProduct = {
  labels: ['Fresh Milk', 'Farm Eggs', 'Paneer', 'Butter', 'Curd', 'Cheese'],
  data: [4.2, 2.8, 2.2, 1.6, 1.2, 0.8], // ₹L, adds up to this month's ₹12.8L
  colors: ['#00d4aa', '#3b82f6', '#ff6b35', '#f59e0b', '#10b981', '#8b5cf6'],
};