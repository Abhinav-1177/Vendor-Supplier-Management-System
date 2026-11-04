import { useMemo, useState } from 'react';
import { seedReports } from '../data/reportData';

// Shared by the vendor Browse page (report a product) and the admin Product Moderation page.
// Kept in localStorage for now. Later: replace these functions with API calls.
// status: 'Flagged' (hidden from vendors, waiting for the admin) | 'Removed' (taken down by the admin)
// A product that is restored simply has its report deleted and becomes visible again.
const KEY = 'sb_product_reports';

function load() {
  try {
    const stored = JSON.parse(localStorage.getItem(KEY));
    if (Array.isArray(stored)) return stored;
  } catch { /* fall back to seed data */ }
  return seedReports;
}

export function useProductReports() {
  const [reports, setReports] = useState(load);

  const persist = (next) => {
    setReports(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* storage unavailable */ }
  };

  // Products with an open report or a removal must not show up in the vendor marketplace
  const hiddenIds = useMemo(() => new Set(reports.map((r) => r.productId)), [reports]);

  return {
    reports,
    hiddenIds,
    addReport: ({ product, reason, reportedBy }) => {
      if (reports.some((r) => r.productId === product.id)) return;
      persist([
        {
          productId: product.id, emoji: product.emoji, name: product.name, supplier: product.supplier,
          city: product.city, price: product.price, unit: product.unit || 'unit', stock: product.stock,
          reason, reportedBy, reportedAt: 'Just now', status: 'Flagged',
        },
        ...reports,
      ]);
    },
    remove: (productId) => persist(reports.map((r) => (r.productId === productId ? { ...r, status: 'Removed' } : r))),
    restore: (productId) => persist(reports.filter((r) => r.productId !== productId)),
  };
}