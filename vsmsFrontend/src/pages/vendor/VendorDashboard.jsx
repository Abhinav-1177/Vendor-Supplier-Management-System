import { Avatar, Card, PageHeader, ProgressBar, StatCard, Stars } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';
import { recentActivity, topSuppliers, vendorStats } from '../../data/vendorData';

export default function VendorDashboard() {
  const { user } = useAuth();

  return (
    <>
      <PageHeader title="Vendor dashboard" subtitle={`Welcome back, ${user.name}`} />

      <div className="stat-grid">
        <StatCard featured icon="bi-bag-check" value={vendorStats.totalOrders} label="Total orders" trend="8 this week" trendDir="up" />
        <StatCard icon="bi-currency-rupee" tone="success" value={vendorStats.totalPurchases} label="Total purchases" trend="12% this month" trendDir="up" />
        <StatCard icon="bi-inbox" tone="info" value={vendorStats.pendingRequests} label="Pending requests" trend="From suppliers" />
        <StatCard icon="bi-star-fill" tone="warning" value={vendorStats.avgSupplierRating} label="Avg supplier rating" trend="Great network" trendDir="up" />
      </div>

      <div className="grid-3-2">
        <Card title="Top suppliers">
          <div className="supplier-list">
            {topSuppliers.map((s) => (
              <div className="supplier-row" key={s.id}>
                <Avatar name={s.name} size={48} />
                <div className="supplier-row__info">
                  <div className="supplier-row__name">{s.name}</div>
                  <Stars value={s.rating} />
                  <ProgressBar value={s.score} label={`${s.name} score`} />
                </div>
                <div className="supplier-row__score">{s.score}%</div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Recent activity">
          <div className="timeline">
            {recentActivity.map((a) => (
              <div className="timeline__item" key={a.id}>
                <div className="timeline__time">{a.time}</div>
                <div className="timeline__text">{a.text}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}