import { useEffect, useState } from 'react';
import { Badge, Button, Card, DataTable, PageHeader } from '../../components/ui';
import { getSupplierOrders, markDelivered } from '../../services/orderService';
import { exportCsv } from '../../utils/exportCsv';

export default function AcceptedOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    getSupplierOrders()
      .then(setOrders)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleMarkDelivered = async (id) => {
    setUpdatingId(id);
    try {
      const updated = await markDelivered(id);
      setOrders((list) => list.map((o) => (o.id === id ? updated : o)));
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleExport = () =>
    exportCsv('accepted-orders.csv', [
      { header: 'Order ID', value: (o) => o.id },
      { header: 'Vendor', value: (o) => o.vendor },
      { header: 'Product', value: (o) => o.product },
      { header: 'Amount (INR)', value: (o) => o.amount },
      { header: 'Date', value: (o) => o.date },
      { header: 'Status', value: (o) => o.status },
    ], orders);

  const columns = [
    { key: 'id', header: 'Order ID', render: (o) => `#${o.id}` },
    { key: 'vendor', header: 'Vendor' },
    { key: 'product', header: 'Product' },
    { key: 'amount', header: 'Amount', render: (o) => `₹${o.amount.toLocaleString('en-IN')}` },
    { key: 'date', header: 'Date' },
    { key: 'status', header: 'Status', render: (o) => <Badge status={o.status} /> },
    {
      key: 'action', header: 'Action',
      render: (o) =>
        o.status === 'In Transit'
          ? <Button variant="accent" size="sm" icon="bi-check-lg" disabled={updatingId === o.id} onClick={() => handleMarkDelivered(o.id)}>Mark delivered</Button>
          : '—',
    },
  ];

  if (loading) return <p>Loading orders…</p>;

  return (
    <>
      <PageHeader
        title="Accepted orders"
        actions={<Button variant="outline" icon="bi-download" onClick={handleExport}>Export CSV</Button>}
      />
      {error && <div className="alert-box alert-error" role="alert">{error}</div>}
      <Card padded={false}>
        <DataTable columns={columns} rows={orders} empty="No orders yet — they appear here once you accept an offer." />
      </Card>
    </>
  );
}