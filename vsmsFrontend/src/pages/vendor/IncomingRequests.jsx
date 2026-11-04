import { useEffect, useState } from 'react';
import { Avatar, Badge, Button, PageHeader } from '../../components/ui';
import { getReceivedOffers, respondToOffer } from '../../services/offerService';

const rupees = (n) => `₹${n.toLocaleString('en-IN')}`;

export default function IncomingRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionError, setActionError] = useState('');
  const [respondingId, setRespondingId] = useState(null);

  useEffect(() => {
    getReceivedOffers()
      .then(setRequests)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const pending = requests.filter((r) => r.status === 'Pending').length;

  const setStatus = async (id, status) => {
    setActionError('');
    setRespondingId(id);
    try {
      const updated = await respondToOffer(id, status);
      setRequests((list) => list.map((r) => (r.id === id ? updated : r)));
    } catch (err) {
      setActionError(err.message);
    } finally {
      setRespondingId(null);
    }
  };

  if (loading) return <p>Loading…</p>;
  if (error) return <div className="alert-box alert-error" role="alert">{error}</div>;

  return (
    <>
      <PageHeader
        title="Incoming supplier requests"
        actions={pending > 0 && <Badge tone="warning">{pending} awaiting reply</Badge>}
      />

      {actionError && <div className="alert-box alert-error" role="alert">{actionError}</div>}

      <div className="request-list">
        {requests.length === 0 && <p className="empty-note">No offers yet.</p>}
        {requests.map((r) => (
          <article key={r.id} className={`request-card ${r.status !== 'Pending' ? 'request-card--done' : ''}`}>
            <Avatar name={r.supplier} size={48} />

            <div className="request-card__body">
              <div className="request-card__head">
                <h3>{r.supplier} · {r.product}</h3>
                <Badge status={r.status === 'Pending' ? 'New' : r.status} />
              </div>
              <p className="request-card__desc">
                {r.qty.toLocaleString('en-IN')} units at {rupees(r.price)}/unit. Total {rupees(r.qty * r.price)}.
                Delivery in {r.days} day{r.days > 1 ? 's' : ''}. {r.note}
              </p>
              <div className="request-card__meta">
                <span><i className="bi bi-geo-alt" /> {r.city}</span>
                <span><i className="bi bi-clock" /> Sent {r.sent}</span>
              </div>
            </div>

            {r.status === 'Pending' && (
              <div className="request-card__actions">
                <Button variant="accent" icon="bi-check-circle" disabled={respondingId === r.id} onClick={() => setStatus(r.id, 'Accepted')}>Accept</Button>
                <Button variant="danger" icon="bi-x-circle" disabled={respondingId === r.id} onClick={() => setStatus(r.id, 'Rejected')}>Reject</Button>
              </div>
            )}
          </article>
        ))}
      </div>
    </>
  );
}