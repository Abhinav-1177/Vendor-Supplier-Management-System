// Pass `status` for the common order/user states, or `tone` to set the colour directly.
const STATUS_TONE = {
  pending: 'warning',
  new: 'warning',
  review: 'warning',
  'low stock': 'warning',
  accepted: 'success',
  active: 'success',
  live: 'success',
  approved: 'success',
  'in transit': 'success',
  rejected: 'danger',
  blocked: 'danger',
  flagged: 'danger',
  delivered: 'info',
  open: 'warning',
  resolved: 'info',
};

export default function Badge({ status, tone, children }) {
  const resolved = tone || STATUS_TONE[String(status).toLowerCase()] || 'neutral';
  return <span className={`sb-badge sb-badge--${resolved}`}>{children ?? status}</span>;
}