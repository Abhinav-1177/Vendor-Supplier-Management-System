// One source of truth for sidebar links AND routes (App.jsx builds routes from this).
// `icon` is a bootstrap-icons class name. `badge` is static for now; later it comes from the API.

export const ROLE_PREFIX = {
  ADMIN: '/admin',
  VENDOR: '/vendor',
  SUPPLIER: '/supplier',
};

export const ROLE_LABEL = {
  ADMIN: 'Admin panel',
  VENDOR: 'Vendor',
  SUPPLIER: 'Supplier',
};

export const NAV = {
  ADMIN: [
    {
      section: 'Overview',
      items: [
        { label: 'Dashboard', to: '/admin/dashboard', icon: 'bi-grid-1x2-fill' },
        { label: 'Analytics', to: '/admin/analytics', icon: 'bi-bar-chart-fill' },
      ],
    },
    {
      section: 'Management',
      items: [
        { label: 'User Management', to: '/admin/users', icon: 'bi-people-fill', badge: 3 },
        { label: 'Product Moderation', to: '/admin/products', icon: 'bi-box-seam-fill' },
        { label: 'Dispute Center', to: '/admin/disputes', icon: 'bi-shield-exclamation', badge: 2 },
        { label: 'Advertisement', to: '/admin/advertisements', icon: 'bi-megaphone-fill' },
      ],
    },
  ],
  VENDOR: [
    {
      section: 'Overview',
      items: [{ label: 'Dashboard', to: '/vendor/dashboard', icon: 'bi-grid-1x2-fill' }],
    },
    {
      section: 'Marketplace',
      items: [
        { label: 'Browse Products', to: '/vendor/browse', icon: 'bi-shop' },
        { label: 'Compare Suppliers', to: '/vendor/compare', icon: 'bi-arrow-left-right' },
      ],
    },
    {
      section: 'Orders',
      items: [
        { label: 'Incoming Requests', to: '/vendor/requests', icon: 'bi-inbox-fill', badge: 4 },
        { label: 'Order History', to: '/vendor/orders', icon: 'bi-clock-history' },
        { label: 'Sales Report', to: '/vendor/sales', icon: 'bi-graph-up-arrow' },
      ],
    },
  ],
  SUPPLIER: [
    {
      section: 'Overview',
      items: [{ label: 'Dashboard', to: '/supplier/dashboard', icon: 'bi-grid-1x2-fill' }],
    },
    {
      section: 'Products',
      items: [
        { label: 'My Products', to: '/supplier/products', icon: 'bi-box-seam-fill' },
        { label: 'Add Product', to: '/supplier/products/new', icon: 'bi-plus-square-fill' },
      ],
    },
    {
      section: 'Business',
      items: [
        { label: 'Sent Requests', to: '/supplier/requests', icon: 'bi-send-fill', badge: 5 },
        { label: 'Accepted Orders', to: '/supplier/orders', icon: 'bi-check-circle-fill' },
        { label: 'Revenue Summary', to: '/supplier/revenue', icon: 'bi-cash-stack' },
      ],
    },
  ],
};

export const flatNav = (role) => NAV[role].flatMap((s) => s.items);

export const notificationsPath = (role) => `${ROLE_PREFIX[role]}/notifications`;