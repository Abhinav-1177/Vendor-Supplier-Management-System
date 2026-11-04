// Dummy notifications per role. Later: GET /api/notifications for the logged-in user.
// tone: success | info | warning | accent | orange (icon colour, same names as StatCard)

export const NOTIFICATIONS = {
  ADMIN: [
    { id: 1, tone: 'warning', icon: 'bi-person-plus-fill', title: 'New vendor awaiting approval', text: 'RajFoods Pvt. Ltd. (Delhi) has registered and needs review.', time: '10 minutes ago', read: false },
    { id: 2, tone: 'danger', icon: 'bi-shield-exclamation', title: 'New dispute filed', text: 'Dispute #D-041: order #ORD-1042 was delivered with missing items.', time: '1 hour ago', read: false },
    { id: 3, tone: 'warning', icon: 'bi-flag-fill', title: 'Product flagged as spam', text: '"Mystery Product" by UnknownSeller was flagged for review.', time: '3 hours ago', read: false },
    { id: 4, tone: 'info', icon: 'bi-megaphone-fill', title: 'Campaign ending soon', text: 'The Premium Rice Collection banner ends on Apr 20.', time: 'Yesterday, 4:30 PM', read: true },
    { id: 5, tone: 'success', icon: 'bi-graph-up-arrow', title: 'Monthly revenue up 19%', text: 'Platform revenue reached ₹42.6L this month.', time: 'Apr 5, 2026', read: true },
  ],
  VENDOR: [
    { id: 1, tone: 'success', icon: 'bi-check-circle-fill', title: 'Order #ORD-1042 delivered', text: 'PureFresh has marked your order as delivered.', time: '2 minutes ago', read: false },
    { id: 2, tone: 'info', icon: 'bi-inbox-fill', title: 'New offer from AgriPlus', text: 'Basmati Rice 5kg at a special price of ₹320/bag.', time: '1 hour ago', read: false },
    { id: 3, tone: 'info', icon: 'bi-inbox-fill', title: 'New offer from GreenLeaf Organics', text: 'Weekly organic vegetable supply from ₹85/kg.', time: '5 hours ago', read: false },
    { id: 4, tone: 'accent', icon: 'bi-star-fill', title: 'Rating submitted', text: 'Your 5 star rating for PureFresh was recorded.', time: 'Yesterday, 4:30 PM', read: true },
    { id: 5, tone: 'orange', icon: 'bi-person-check-fill', title: 'Account approved', text: 'Your vendor account has been verified by an admin.', time: 'Apr 5, 2026', read: true },
  ],
  SUPPLIER: [
    { id: 1, tone: 'success', icon: 'bi-check-circle-fill', title: 'Offer accepted', text: 'Metro Mart accepted your Farm Eggs offer (₹8,500).', time: '2 minutes ago', read: false },
    { id: 2, tone: 'warning', icon: 'bi-exclamation-triangle-fill', title: 'Low stock alert', text: 'Paneer 500g is running low (42 packs remaining).', time: '3 hours ago', read: false },
    { id: 3, tone: 'accent', icon: 'bi-star-fill', title: 'New review received', text: 'RajFoods gave you 5 stars: "Excellent quality, fast delivery."', time: 'Yesterday, 4:30 PM', read: true },
    { id: 4, tone: 'info', icon: 'bi-truck', title: 'Order in transit', text: 'Order #ORD-1041 is waiting to be marked as delivered.', time: 'Yesterday, 9:00 AM', read: true },
    { id: 5, tone: 'orange', icon: 'bi-person-check-fill', title: 'Account approved', text: 'Your supplier account has been verified by an admin.', time: 'Apr 5, 2026', read: true },
  ],
};