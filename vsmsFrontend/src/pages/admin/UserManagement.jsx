import { useEffect, useMemo, useState } from 'react';
import { Avatar, Badge, Button, Card, DataTable, MiniTabs, Modal, PageHeader } from '../../components/ui';
import { listUsers, updateUserStatus } from '../../services/adminService';

const TABS = ['All users', 'Vendors', 'Suppliers', 'Pending', 'Blocked'];

const matchesTab = (user, tab) => {
  if (tab === 'Vendors') return user.role === 'Vendor';
  if (tab === 'Suppliers') return user.role === 'Supplier';
  if (tab === 'Pending') return user.status === 'Pending';
  if (tab === 'Blocked') return user.status === 'Blocked';
  return true;
};

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tab, setTab] = useState(TABS[0]);
  const [query, setQuery] = useState('');

  const [reviewing, setReviewing] = useState(null);
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState('');
  const [reasonError, setReasonError] = useState('');
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState('');

  useEffect(() => {
    listUsers()
      .then(setUsers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const applyUpdate = async (id, status, reasonText) => {
    setSaving(true);
    setActionError('');
    try {
      const updated = await updateUserStatus(id, status, reasonText);
      setUsers((list) => list.map((u) => (u.id === id ? updated : u)));
      return updated;
    } catch (err) {
      setActionError(err.message);
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const openReview = (u) => { setReviewing(u); setRejecting(false); setReason(''); setReasonError(''); setActionError(''); };
  const closeReview = () => setReviewing(null);

  const approve = async () => {
    try {
      await applyUpdate(reviewing.id, 'Active');
      closeReview();
    } catch { /* error shown in modal */ }
  };

  const confirmReject = async () => {
    const trimmed = reason.trim();
    if (!trimmed) { setReasonError('Give a reason so the user knows what to fix.'); return; }
    try {
      await applyUpdate(reviewing.id, 'Rejected', trimmed);
      closeReview();
    } catch { /* error shown in modal */ }
  };

  const block = (u) => applyUpdate(u.id, 'Blocked').catch(() => {});
  const unblock = (u) => applyUpdate(u.id, 'Active').catch(() => {});

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return users.filter(
      (u) => matchesTab(u, tab) &&
        (!q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.businessName.toLowerCase().includes(q))
    );
  }, [users, tab, query]);

  const columns = [
    {
      key: 'user', header: 'User',
      render: (u) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Avatar name={u.name} size={34} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{u.name}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{u.businessName} · {u.email}</div>
          </div>
        </div>
      ),
    },
    { key: 'role', header: 'Role', render: (u) => <Badge tone={u.role === 'Vendor' ? 'info' : 'warning'}>{u.role}</Badge> },
    { key: 'city', header: 'City' },
    { key: 'joined', header: 'Joined' },
    { key: 'status', header: 'Status', render: (u) => <Badge status={u.status} /> },
    {
      key: 'actions', header: 'Actions',
      render: (u) => (
        <div style={{ display: 'flex', gap: 6 }}>
          {u.status === 'Pending' ? (
            <Button variant="accent" size="sm" icon="bi-clipboard-check" onClick={() => openReview(u)}>Review</Button>
          ) : (
            <Button variant="outline" size="sm" icon="bi-eye" aria-label={`View ${u.name}`} onClick={() => openReview(u)} />
          )}
          {u.status === 'Active' && (
            <Button variant="danger" size="sm" icon="bi-slash-circle" aria-label={`Block ${u.name}`} onClick={() => block(u)} />
          )}
          {u.status === 'Blocked' && (
            <Button variant="success" size="sm" icon="bi-unlock" onClick={() => unblock(u)}>Unblock</Button>
          )}
        </div>
      ),
    },
  ];

  const isPending = reviewing?.status === 'Pending';

  let footer = <Button variant="outline" onClick={closeReview}>Close</Button>;
  if (isPending && !rejecting) {
    footer = (
      <>
        <Button variant="danger" icon="bi-x-circle" onClick={() => setRejecting(true)}>Reject</Button>
        <Button variant="accent" icon="bi-check-circle" onClick={approve} disabled={saving}>Approve</Button>
      </>
    );
  } else if (isPending && rejecting) {
    footer = (
      <>
        <Button variant="outline" onClick={() => setRejecting(false)}>Back</Button>
        <Button variant="danger" icon="bi-x-circle" onClick={confirmReject} disabled={saving}>Confirm rejection</Button>
      </>
    );
  }

  if (loading) return <p>Loading users…</p>;
  if (error) return <div className="alert-box alert-error" role="alert">{error}</div>;

  return (
    <>
      <PageHeader
        title="User management"
        actions={<Button variant="primary" icon="bi-person-plus-fill">Add user</Button>}
      />

      <Card
        padded={false}
        title={<MiniTabs tabs={TABS} value={tab} onChange={setTab} />}
        actions={
          <div className="search-bar" style={{ maxWidth: 240 }}>
            <i className="bi bi-search" />
            <input
              placeholder="Search name, email, business"
              aria-label="Search users"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        }
      >
        <DataTable columns={columns} rows={rows} empty="No users match this filter." />
      </Card>

      <Modal
        open={!!reviewing}
        title={isPending ? 'Review signup' : 'User details'}
        onClose={closeReview}
        footer={footer}
      >
        {reviewing && (
          <>
            {isPending && (
              <div className="alert-box alert-info">
                Check the GSTIN on the official GST portal before approving.
              </div>
            )}
            {actionError && <div className="alert-box alert-error" role="alert">{actionError}</div>}

            <dl className="detail-list">
              <dt>Name</dt><dd>{reviewing.name}</dd>
              <dt>Business</dt><dd>{reviewing.businessName}</dd>
              <dt>Role</dt><dd>{reviewing.role}</dd>
              <dt>Email</dt><dd>{reviewing.email}</dd>
              <dt>Phone</dt><dd>{reviewing.phone}</dd>
              <dt>City</dt><dd>{reviewing.city}</dd>
              <dt>GSTIN</dt><dd style={{ fontFamily: 'monospace', letterSpacing: 0.5 }}>{reviewing.gstin}</dd>
              <dt>Joined</dt><dd>{reviewing.joined}</dd>
              <dt>Status</dt><dd><Badge status={reviewing.status} /></dd>
              {reviewing.status === 'Rejected' && reviewing.rejectionReason && (
                <>
                  <dt>Rejection reason</dt><dd>{reviewing.rejectionReason}</dd>
                </>
              )}
            </dl>

            {isPending && rejecting && (
              <div className={`field ${reasonError ? 'invalid' : ''}`} style={{ marginTop: 18, marginBottom: 0 }}>
                <label htmlFor="reason">Reason for rejection</label>
                <textarea
                  id="reason" rows={3} value={reason}
                  placeholder="e.g. GSTIN could not be verified"
                  onChange={(e) => { setReason(e.target.value); setReasonError(''); }}
                />
                {reasonError
                  ? <div className="field-error">{reasonError}</div>
                  : <div className="field-hint">The user sees this message when they try to log in.</div>}
              </div>
            )}
          </>
        )}
      </Modal>
    </>
  );
}