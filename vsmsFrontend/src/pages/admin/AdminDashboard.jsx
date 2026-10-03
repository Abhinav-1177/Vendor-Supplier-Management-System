import { useState } from 'react';
import { Avatar, Badge, Button, Card, DataTable, MiniTabs, PageHeader, StatCard } from '../../components/ui';
import { ChartCard, DoughnutChart, LineChart } from '../../components/charts';
import {
  adminStats, pendingApprovals as initialApprovals, recentOrders, revenueByPeriod, topCities,
} from '../../data/adminData';

const orderColumns = [
  { key: 'id', header: 'Order ID', render: (r) => `#${r.id}` },
  { key: 'vendor', header: 'Vendor' },
  { key: 'supplier', header: 'Supplier' },
  { key: 'amount', header: 'Amount' },
  { key: 'status', header: 'Status', render: (r) => <Badge status={r.status} /> },
];

export default function AdminDashboard() {
  const [period, setPeriod] = useState('Monthly');
  const [approvals, setApprovals] = useState(initialApprovals);

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  // Later: call the approve/reject API here, then remove the row on success
  const resolve = (id) => setApprovals((list) => list.filter((a) => a.id !== id));

  const revenue = revenueByPeriod[period];

  return (
    <>
      <PageHeader
        title="Admin overview"
        subtitle={today}
        actions={<Button variant="accent" icon="bi-download">Export report</Button>}
      />

      <div className="stat-grid">
        <StatCard featured icon="bi-people-fill" value={adminStats.totalUsers} label="Total users" trend="+12% this month" trendDir="up" />
        <StatCard icon="bi-bag-check-fill" value={adminStats.totalOrders} label="Total orders" trend="+8.3% this week" trendDir="up" />
        <StatCard icon="bi-currency-rupee" tone="orange" value={adminStats.totalRevenue} label="Total revenue" trend="+19% this month" trendDir="up" />
        <StatCard icon="bi-shield-exclamation" tone="danger" value={adminStats.openDisputes} label="Open disputes" trend="Needs resolution" trendDir="down" />
      </div>

      <div className="grid-2-1">
        <ChartCard
          title="Revenue trends"
          actions={<MiniTabs tabs={Object.keys(revenueByPeriod)} value={period} onChange={setPeriod} />}
        >
          <LineChart labels={revenue.labels} data={revenue.data} label="Revenue (₹L)" />
        </ChartCard>

        <ChartCard title="Top cities">
          <DoughnutChart labels={topCities.labels} data={topCities.data} colors={topCities.colors} />
        </ChartCard>
      </div>

      <div className="grid-3-2">
        <Card title="Recent orders" padded={false} actions={<Button variant="outline" size="sm">View all</Button>}>
          <DataTable columns={orderColumns} rows={recentOrders} />
        </Card>

        <Card title="Pending approvals" actions={<Badge tone="warning">{approvals.length} new</Badge>}>
          {approvals.length === 0 ? (
            <p className="empty-note">All caught up. No pending approvals.</p>
          ) : (
            <div className="approval-list">
              {approvals.map((a) => (
                <div className="approval-row" key={a.id}>
                  <Avatar name={a.name} size={38} />
                  <div className="approval-row__info">
                    <div className="approval-row__name">{a.name}</div>
                    <div className="approval-row__meta">{a.meta}</div>
                  </div>
                  <div className="approval-row__actions">
                    <Button variant="accent" size="sm" icon="bi-check-lg" aria-label={`Approve ${a.name}`} onClick={() => resolve(a.id)} />
                    <Button variant="danger" size="sm" icon="bi-x-lg" aria-label={`Reject ${a.name}`} onClick={() => resolve(a.id)} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </>
  );
}