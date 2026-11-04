// Dummy vendor data. Each export maps to one API call later.

export const vendorStats = {
  totalOrders: 142,
  totalPurchases: '₹8.4L',
  pendingRequests: 4,
  avgSupplierRating: '4.8',
};

export const topSuppliers = [
  { id: 1, name: 'PureFresh', rating: 5, score: 92 },
  { id: 2, name: 'AgriPlus', rating: 4, score: 78 },
  { id: 3, name: 'GreenLeaf', rating: 4, score: 71 },
];

export const recentActivity = [
  { id: 1, time: 'Today, 10:30 AM', text: 'Order #ORD-1042 marked as delivered by PureFresh' },
  { id: 2, time: 'Today, 9:15 AM', text: 'New offer request from AgriPlus for Basmati Rice' },
  { id: 3, time: 'Yesterday, 3:45 PM', text: 'Order #ORD-1041 accepted and in transit' },
  { id: 4, time: 'Apr 5, 2026', text: 'Rated PureFresh 5 stars: excellent quality' },
];

export const marketProducts = [
  { id: 1, emoji: '🥛', name: 'Fresh Milk (1L)', supplier: 'PureFresh', city: 'Delhi', category: 'Dairy', price: 48, rating: 5, stock: 500 },
  { id: 2, emoji: '🌾', name: 'Basmati Rice 5kg', supplier: 'AgriPlus', city: 'Punjab', category: 'Grains', price: 340, rating: 4, stock: 1200 },
  { id: 3, emoji: '🥦', name: 'Organic Broccoli', supplier: 'GreenLeaf', city: 'Mumbai', category: 'Vegetables', price: 85, rating: 4, stock: 320 },
  { id: 4, emoji: '🧂', name: 'Premium Spice Mix', supplier: 'SpiceLane', city: 'Pune', category: 'Spices', price: 120, rating: 5, stock: 800 },
];

export const compareSuppliers = [
  { id: 1, name: 'PureFresh', city: 'Delhi', rating: 5.0, products: 48, avgPrice: 92, delivery: '1-2 days', onTime: 96, minOrder: 2000 },
  { id: 2, name: 'AgriPlus', city: 'Punjab', rating: 4.2, products: 35, avgPrice: 78, delivery: '2-3 days', onTime: 82, minOrder: 1500 },
  { id: 3, name: 'GreenLeaf', city: 'Mumbai', rating: 4.0, products: 29, avgPrice: 105, delivery: '1-3 days', onTime: 79, minOrder: 2500 },
];

// ── Incoming requests (offers sent to this vendor by suppliers) ──
export const incomingRequests = [
  { id: 1, supplier: 'AgriPlus', city: 'Punjab', received: '2h ago', stock: '1,200 in stock', status: 'Pending',
    description: 'Offering Basmati Rice 5kg at ₹320/bag (bulk discount). Min order: 50 bags. Delivery in 2 days.' },
  { id: 2, supplier: 'GreenLeaf Organics', city: 'Mumbai', received: '5h ago', stock: 'Seasonal stock', status: 'Pending',
    description: 'Fresh organic vegetables assortment. Weekly supply deal available. ₹85/kg avg. Min ₹5,000 order.' },
  { id: 3, supplier: 'PureFresh', city: 'Delhi', received: 'Yesterday', stock: '500 in stock', status: 'Pending',
    description: 'Fresh Milk 1L at ₹45/unit for orders above 300 units. Next-day delivery.' },
  { id: 4, supplier: 'SpiceLane', city: 'Pune', received: '2 days ago', stock: '800 in stock', status: 'Pending',
    description: 'Premium Spice Mix at ₹110/pack. Free delivery on orders above ₹5,000.' },
];

// ── Order history ──
export const orderHistory = [
  { id: 'ORD-1042', product: 'Fresh Milk 1L', supplier: 'PureFresh', qty: 200, amount: 9600, date: 'Apr 5, 2026', status: 'Delivered' },
  { id: 'ORD-1041', product: 'Basmati Rice 5kg', supplier: 'AgriPlus', qty: 50, amount: 17000, date: 'Apr 4, 2026', status: 'In Transit' },
  { id: 'ORD-1040', product: 'Organic Broccoli', supplier: 'GreenLeaf', qty: 80, amount: 6800, date: 'Apr 3, 2026', status: 'Pending' },
  { id: 'ORD-1039', product: 'Spice Mix', supplier: 'SpiceLane', qty: 30, amount: 3600, date: 'Mar 30, 2026', status: 'Rejected' },
];

// ── Sales report (vendor spending) ──
export const salesStats = {
  totalSpend: '₹8.4L',
  ordersCompleted: 142,
  avgOrderValue: '₹5,915',
};

export const spendingTrend = {
  labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
  data: [62, 78, 95, 71, 88, 102, 84], // ₹K
};