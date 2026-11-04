import { useNavigate } from 'react-router-dom';
import { Button, Card, PageHeader, StatCard } from '../../components/ui';
import { ChartCard, LineChart } from '../../components/charts';
import { useAuth } from '../../context/AuthContext';
import { useSupplierProducts } from '../../hooks/useSupplierProducts';
import { revenueTrend, supplierStats } from '../../data/supplierData';

export default function SupplierDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { products } = useSupplierProducts();

  return (
    <>
      <PageHeader
        title="Supplier dashboard"
        subtitle={`Welcome, ${user.businessName || user.name}`}
        actions={<Button variant="accent" icon="bi-plus-lg" onClick={() => navigate('/supplier/products/new')}>Add product</Button>}
      />

      <div className="stat-grid">
        <StatCard featured icon="bi-box-seam" value={products.length} label="Products listed" />
        <StatCard icon="bi-send" tone="info" value={supplierStats.requestsSent} label="Requests sent" trend="Awaiting response" />
        <StatCard icon="bi-check-circle" tone="success" value={supplierStats.acceptedOrders} label="Accepted orders" trend="6 this week" trendDir="up" />
        <StatCard icon="bi-currency-rupee" tone="orange" value={supplierStats.revenueMonth} label="Revenue (month)" trend="23% growth" trendDir="up" />
      </div>

      <div className="grid-2-1">
        <ChartCard title="Revenue summary">
          <LineChart labels={revenueTrend.labels} data={revenueTrend.data} label="Revenue (₹L)" color="#ff6b35" />
        </ChartCard>

        <Card title="Quick actions">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Button variant="primary" icon="bi-plus-square" block onClick={() => navigate('/supplier/products/new')}>Add new product</Button>
            <Button variant="outline" icon="bi-send" block onClick={() => navigate('/supplier/requests')}>Send offer to vendor</Button>
            <Button variant="outline" icon="bi-box-seam" block onClick={() => navigate('/supplier/products')}>Manage stock</Button>
            <Button variant="outline" icon="bi-file-bar-graph" block onClick={() => navigate('/supplier/revenue')}>View revenue report</Button>
          </div>
        </Card>
      </div>
    </>
  );
}