import { PageHeader, StatCard } from '../../components/ui';
import { BarChart, ChartCard } from '../../components/charts';
import { revenueByProduct, revenueStats } from '../../data/supplierData';

export default function RevenueSummary() {
  return (
    <>
      <PageHeader title="Revenue summary" />

      <div className="stat-grid">
        <StatCard featured icon="bi-currency-rupee" value={revenueStats.thisMonth} label="This month" trend="23% growth" trendDir="up" />
        <StatCard icon="bi-currency-rupee" tone="success" value={revenueStats.thisYear} label="This year" trend="31% year on year" trendDir="up" />
        <StatCard icon="bi-bag-check" tone="orange" value={revenueStats.ordersFulfilled} label="Orders fulfilled" trend="100% acceptance rate" trendDir="up" />
      </div>

      <ChartCard title="Revenue breakdown by product (this month)" height={260}>
        <BarChart
          labels={revenueByProduct.labels}
          datasets={[{ label: 'Revenue (₹L)', data: revenueByProduct.data, color: revenueByProduct.colors }]}
        />
      </ChartCard>
    </>
  );
}