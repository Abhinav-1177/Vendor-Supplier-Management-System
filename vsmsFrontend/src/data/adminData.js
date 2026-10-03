// Dummy data. Each export maps to one API call later (see the Axios step).

export const adminStats = {
  totalUsers: '1,284',
  totalOrders: '3,847',
  totalRevenue: '₹42.6L',
  openDisputes: 2,
};

export const revenueByPeriod = {
  Monthly: { labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'], data: [28, 35, 42, 38, 46, 52, 42.6] },
  Weekly: { labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'], data: [8.2, 9.6, 10.1, 9.4, 11.3, 10.8] },
  Yearly: { labels: ['2022', '2023', '2024', '2025', '2026'], data: [96, 148, 212, 305, 262] },
};

export const topCities = {
  labels: ['Delhi', 'Mumbai', 'Bangalore', 'Pune', 'Others'],
  data: [32, 24, 18, 14, 12],
  colors: ['#0a2540', '#00d4aa', '#3b82f6', '#ff6b35', '#e2e8f8'],
};

export const recentOrders = [
  { id: 'ORD-1042', vendor: 'RajFoods', supplier: 'PureFresh', amount: '₹14,200', status: 'Delivered' },
  { id: 'ORD-1041', vendor: 'Metro Mart', supplier: 'AgriPlus', amount: '₹8,750', status: 'Accepted' },
  { id: 'ORD-1040', vendor: 'FreshMart', supplier: 'GreenLeaf', amount: '₹22,400', status: 'Pending' },
  { id: 'ORD-1039', vendor: 'CityGrocer', supplier: 'PureFresh', amount: '₹5,600', status: 'Rejected' },
  { id: 'ORD-1038', vendor: 'QuickBuy', supplier: 'AgriPlus', amount: '₹18,900', status: 'Delivered' },
];

export const pendingApprovals = [
  { id: 1, name: 'RajFoods Pvt. Ltd.', meta: 'New Vendor · Delhi' },
  { id: 2, name: 'GreenLeaf Suppliers', meta: 'New Supplier · Mumbai' },
  { id: 3, name: 'MetroShop Inc.', meta: 'New Vendor · Pune' },
];

// ── Analytics ──
export const analyticsStats = {
  activeSuppliers: '284',
  activeVendors: '1,000',
  totalProducts: '4,200',
  avgRating: '4.7',
};

export const supplierPerformance = {
  labels: ['PureFresh', 'AgriPlus', 'GreenLeaf', 'SpiceLane', 'FarmDirect'],
  orders: [84, 62, 48, 35, 29],
  revenue: [128, 94, 72, 48, 41], // ₹K
};

export const orderStatus = {
  labels: ['Delivered', 'Accepted', 'Pending', 'Rejected'],
  data: [68, 18, 10, 4],
  colors: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'],
};

// ── User management ──
export const initialUsers = [
  { id: 1, name: 'Rahul Gupta', email: 'rahul@mail.com', role: 'Vendor', city: 'Delhi', joined: 'Jan 12, 2026', status: 'Active' },
  { id: 2, name: 'Priya Mehta', email: 'priya@supply.com', role: 'Supplier', city: 'Mumbai', joined: 'Feb 3, 2026', status: 'Pending' },
  { id: 3, name: 'Amit Sharma', email: 'amit@mart.com', role: 'Vendor', city: 'Bangalore', joined: 'Mar 17, 2026', status: 'Blocked' },
  { id: 4, name: 'Neha Verma', email: 'neha@greenleaf.com', role: 'Supplier', city: 'Pune', joined: 'Mar 22, 2026', status: 'Active' },
];

// ── Product moderation ──
export const initialProducts = [
  { id: 1, emoji: '🥛', name: 'Fresh Milk (1L)', supplier: 'PureFresh', city: 'Delhi', price: 48, unit: 'unit', stock: 500, status: 'Review' },
  { id: 2, emoji: '🌾', name: 'Basmati Rice (5kg)', supplier: 'AgriPlus', city: 'Punjab', price: 340, unit: 'bag', stock: 1200, status: 'Review' },
  { id: 3, emoji: '🧴', name: 'Mystery Product', supplier: 'UnknownSeller', city: '', price: null, unit: '', stock: null, status: 'Flagged', note: 'Suspected spam' },
];

// ── Disputes ──
export const resolvedDisputeCount = 14;

export const initialDisputes = [
  {
    id: 'D-041', title: 'Order delivered with missing items',
    description: 'RajFoods reports that supplier PureFresh delivered only 80% of the ordered quantity. Missing 40kg of rice.',
    vendor: 'RajFoods', supplier: 'PureFresh', order: 'ORD-1042', filed: 'Apr 5, 2026', status: 'Open',
  },
  {
    id: 'D-040', title: 'Wrong product category listed',
    description: 'Metro Mart claims GreenLeaf listed products under the wrong category. Products listed as "Organic" were not certified.',
    vendor: 'Metro Mart', supplier: 'GreenLeaf', order: 'ORD-1039', filed: 'Apr 6, 2026', status: 'Open',
  },
];

// ── Advertisements ── (dates are ISO strings: yyyy-mm-dd)
export const initialCampaigns = [
  { id: 1, title: 'Summer Fresh Deals', supplier: 'PureFresh', placement: 'Homepage Hero', start: '2026-04-01', end: '2026-04-30', budget: 12000, status: 'Active' },
  { id: 2, title: 'Premium Rice Collection', supplier: 'AgriPlus', placement: 'Product Spotlight', start: '2026-04-05', end: '2026-04-20', budget: 5000, status: 'Active' },
];