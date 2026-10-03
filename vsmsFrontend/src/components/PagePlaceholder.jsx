import { StatCard, Badge, Button, PageHeader } from './ui';
import { ChartCard, LineChart } from './charts';

export default function PagePlaceholder({ title }) {
  return (
    <>
      <PageHeader title={title} actions={<Button variant="accent" icon="bi-download">Export</Button>} />
      <div className="stat-grid">
        <StatCard featured icon="bi-people-fill" value="1,284" label="Total Users" trend="+12% this month" trendDir="up" />
        <StatCard icon="bi-shield-exclamation" tone="danger" value="2" label="Open Disputes" />
      </div>
      <ChartCard title="Revenue">
        <LineChart labels={['Jan', 'Feb', 'Mar']} data={[28, 35, 42]} />
      </ChartCard>
      <Badge status="Delivered" />
    </>
  );
}