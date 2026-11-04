import { Avatar, Badge, Card, PageHeader, Stars } from '../../components/ui';
import { compareSuppliers as suppliers } from '../../data/vendorData';

// value + best: the best cell in the row is highlighted (max = highest wins, min = lowest wins)
const rows = [
  { label: 'City', render: (s) => s.city },
  { label: 'Rating', value: (s) => s.rating, best: 'max', render: (s) => <><Stars value={s.rating} /> {s.rating.toFixed(1)}</> },
  { label: 'Products', value: (s) => s.products, best: 'max', render: (s) => s.products },
  { label: 'Average price', value: (s) => s.avgPrice, best: 'min', render: (s) => `₹${s.avgPrice}/unit` },
  { label: 'Delivery time', render: (s) => s.delivery },
  { label: 'On-time rate', value: (s) => s.onTime, best: 'max', render: (s) => `${s.onTime}%` },
  { label: 'Minimum order', value: (s) => s.minOrder, best: 'min', render: (s) => `₹${s.minOrder.toLocaleString('en-IN')}` },
];

const bestValue = (row) => {
  const values = suppliers.map(row.value);
  return row.best === 'max' ? Math.max(...values) : Math.min(...values);
};

export default function CompareSuppliers() {
  const topRated = Math.max(...suppliers.map((s) => s.rating));

  return (
    <>
      <PageHeader title="Compare suppliers" />

      <Card padded={false}>
        <div className="table-scroll">
          <table className="table-modern" style={{ minWidth: 640 }}>
            <thead>
              <tr>
                <th>Feature</th>
                {suppliers.map((s) => (
                  <th key={s.id} className="compare-head">
                    <Avatar name={s.name} size={32} />
                    <div style={{ marginTop: 6 }}>{s.name}</div>
                    {s.rating === topRated && <Badge tone="success">Top rated</Badge>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const best = row.best ? bestValue(row) : null;
                return (
                  <tr key={row.label}>
                    <td><b>{row.label}</b></td>
                    {suppliers.map((s) => (
                      <td key={s.id} className={`compare-cell ${row.best && row.value(s) === best ? 'compare-best' : ''}`}>
                        {row.render(s)}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="compare-note">Green marks the best value in each row.</p>
      </Card>
    </>
  );
}