import { Button, PageHeader, StatCard } from '../../components/ui';
import { BarChart, ChartCard, DoughnutChart } from '../../components/charts';
import { analyticsStats, orderStatus, supplierPerformance } from '../../data/adminData';

export default function Analytics() {
  return (
    <>
      <PageHeader
        title="Analytics"
        actions={<Button variant="primary" icon="bi-file-earmark-bar-graph">Generate report</Button>}
      />

      <div className="stat-grid">
        <StatCard icon="bi-truck" tone="info" value={analyticsStats.activeSuppliers} label="Active suppliers" trend="5 new this week" trendDir="up" />
        <StatCard icon="bi-shop" tone="success" value={analyticsStats.activeVendors} label="Active vendors" trend="22 new this week" trendDir="up" />
        <StatCard icon="bi-box-seam" tone="warning" value={analyticsStats.totalProducts} label="Total products" trend="135 added" trendDir="up" />
        <StatCard icon="bi-star-fill" tone="orange" value={analyticsStats.avgRating} label="Average rating" trend="0.2 improved" trendDir="up" />
      </div>

      <div className="grid-2-1">
        <ChartCard title="Supplier performance" height={260}>
          <BarChart
            labels={supplierPerformance.labels}
            datasets={[
              { label: 'Orders', data: supplierPerformance.orders, color: '#0a2540' },
              { label: 'Revenue (₹K)', data: supplierPerformance.revenue, color: '#00d4aa' },
            ]}
          />
        </ChartCard>

        <ChartCard title="Order status breakdown" height={260}>
          <DoughnutChart labels={orderStatus.labels} data={orderStatus.data} colors={orderStatus.colors} />
        </ChartCard>
      </div>
    </>
  );
}