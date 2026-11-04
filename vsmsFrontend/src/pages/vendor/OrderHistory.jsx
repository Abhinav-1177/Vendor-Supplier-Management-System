import { useEffect, useState } from 'react';
import { Badge, Button, Card, DataTable, Modal, PageHeader, Stars } from '../../components/ui';
import { getVendorOrders } from '../../services/orderService';
import { exportCsv } from '../../utils/exportCsv';

const rupees = (n) => `₹${n.toLocaleString('en-IN')}`;

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [ratings, setRatings] = useState({}); // { [orderId]: 1-5 } — local only for now, no ratings API yet
  const [rating, setRating] = useState(0);
  const [rateOrder, setRateOrder] = useState(null);

  useEffect(() => {
    getVendorOrders()
      .then(setOrders)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const openRate = (order) => { setRating(0); setRateOrder(order); };
  const closeRate = () => setRateOrder(null);

  // Later: POST the rating to the API, then store it on success
  const submitRating = () => {
    setRatings((r) => ({ ...r, [rateOrder.id]: rating }));
    closeRate();
  };

  const handleExport = () =>
    exportCsv('order-history.csv', [
      { header: 'Order ID', value: (o) => o.id },
      { header: 'Product', value: (o) => o.product },
      { header: 'Supplier', value: (o) => o.supplier },
      { header: 'Quantity', value: (o) => o.qty },
      { header: 'Amount (INR)', value: (o) => o.amount },
      { header: 'Date', value: (o) => o.date },
      { header: 'Status', value: (o) => o.status },
    ], orders);

  const columns = [
    { key: 'id', header: 'Order ID', render: (o) => `#${o.id}` },
    { key: 'product', header: 'Product' },
    { key: 'supplier', header: 'Supplier' },
    { key: 'qty', header: 'Qty' },
    { key: 'amount', header: 'Amount', render: (o) => rupees(o.amount) },
    { key: 'date', header: 'Date' },
    { key: 'status', header: 'Status', render: (o) => <Badge status={o.status} /> },
    {
      key: 'action', header: 'Action',
      render: (o) => {
        if (o.status === 'Delivered') {
          return ratings[o.id]
            ? <Stars value={ratings[o.id]} />
            : <Button variant="outline" size="sm" icon="bi-star" onClick={() => openRate(o)}>Rate</Button>;
        }
        if (o.status === 'In Transit') return <Button variant="outline" size="sm" icon="bi-eye">Track</Button>;
        return '—';
      },
    },
  ];

  if (loading) return <p>Loading orders…</p>;

  return (
    <>
      <PageHeader
        title="Order history"
        actions={<Button variant="outline" icon="bi-download" onClick={handleExport}>Export CSV</Button>}
      />

      {error && <div className="alert-box alert-error" role="alert">{error}</div>}

      <Card padded={false}>
        <DataTable columns={columns} rows={orders} empty="No orders yet — they'll appear here once a supplier accepts your offer." />
      </Card>

      <Modal
        open={!!rateOrder}
        title={rateOrder ? `Rate ${rateOrder.supplier}` : ''}
        onClose={closeRate}
        footer={
          <>
            <Button variant="outline" onClick={closeRate}>Cancel</Button>
            <Button variant="accent" disabled={!rating} onClick={submitRating}>Submit rating</Button>
          </>
        }
      >
        {rateOrder && (
          <>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center' }}>
              How was order #{rateOrder.id} ({rateOrder.product})?
            </p>
            <div className="rate-stars" role="radiogroup" aria-label="Rating">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n} type="button" role="radio" aria-checked={rating === n}
                  aria-label={`${n} star${n > 1 ? 's' : ''}`}
                  className={n <= rating ? 'on' : ''}
                  onClick={() => setRating(n)}
                >
                  ★
                </button>
              ))}
            </div>
          </>
        )}
      </Modal>
    </>
  );
}