import { useState } from 'react';
import { Badge, Button, PageHeader } from '../../components/ui';
import { initialDisputes, resolvedDisputeCount } from '../../data/adminData';

export default function DisputeCenter() {
  const [disputes, setDisputes] = useState(initialDisputes);

  const open = disputes.filter((d) => d.status === 'Open').length;
  const resolved = resolvedDisputeCount + (disputes.length - open);

  // Later: call the resolve API, then update state on success
  const resolve = (id) => setDisputes((l) => l.map((d) => (d.id === id ? { ...d, status: 'Resolved' } : d)));

  return (
    <>
      <PageHeader
        title="Dispute center"
        actions={
          <>
            <Badge tone="warning">{open} open</Badge>
            <Badge tone="info">{resolved} resolved</Badge>
          </>
        }
      />

      <div className="dispute-list">
        {disputes.map((d) => (
          <article key={d.id} className={`dispute-card ${d.status === 'Resolved' ? 'dispute-card--resolved' : ''}`}>
            <div>
              <div className="dispute-id">Dispute #{d.id} · {d.status}</div>
              <h3 className="dispute-title">{d.title}</h3>
              <p className="dispute-desc">{d.description}</p>
              <div className="dispute-facts">
                <span><b>Vendor:</b> {d.vendor}</span>
                <span><b>Supplier:</b> {d.supplier}</span>
                <span><b>Order:</b> #{d.order}</span>
                <span><b>Filed:</b> {d.filed}</span>
              </div>
            </div>

            {d.status === 'Open' && (
              <div className="dispute-actions">
                <Button variant="accent" icon="bi-chat-left-dots">Mediate</Button>
                <Button variant="primary" icon="bi-check-circle" onClick={() => resolve(d.id)}>Resolve</Button>
              </div>
            )}
          </article>
        ))}
      </div>
    </>
  );
}