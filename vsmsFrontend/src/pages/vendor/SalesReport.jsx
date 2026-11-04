import { PageHeader, StatCard } from '../../components/ui';
import { BarChart, ChartCard } from '../../components/charts';
import { salesStats, spendingTrend } from '../../data/vendorData';

export default function SalesReport() {
  return (
    <>
      <PageHeader title="Sales report" />

      <div className="stat-grid">
        <StatCard featured icon="bi-currency-rupee" value={salesStats.totalSpend} label="Total spend" trend="12% vs last month" trendDir="up" />
        <StatCard icon="bi-bag-check" tone="success" value={salesStats.ordersCompleted} label="Orders completed" trend="18 more this month" trendDir="up" />
        <StatCard icon="bi-currency-rupee" tone="warning" value={salesStats.avgOrderValue} label="Average order value" />
      </div>

      <ChartCard title="Monthly spending trend" height={260}>
        <BarChart
          labels={spendingTrend.labels}
          datasets={[{ label: 'Spend (₹K)', data: spendingTrend.data, color: '#0a2540' }]}
        />
      </ChartCard>
    </>
  );
}