import { useMemo, useState } from 'react';
import { Avatar, Badge, Button, Card, DataTable, MiniTabs, PageHeader } from '../../components/ui';
import { initialUsers } from '../../data/adminData';

const TABS = ['All users', 'Vendors', 'Suppliers', 'Blocked'];

const matchesTab = (user, tab) => {
  if (tab === 'Vendors') return user.role === 'Vendor';
  if (tab === 'Suppliers') return user.role === 'Supplier';
  if (tab === 'Blocked') return user.status === 'Blocked';
  return true;
};

export default function UserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [tab, setTab] = useState(TABS[0]);
  const [query, setQuery] = useState('');

  // Later: call the API first, then update local state on success
  const setStatus = (id, status) =>
    setUsers((list) => list.map((u) => (u.id === id ? { ...u, status } : u)));

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return users.filter(
      (u) => matchesTab(u, tab) && (!q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
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
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{u.email}</div>
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
          {u.status === 'Pending' && (
            <>
              <Button variant="accent" size="sm" icon="bi-check-lg" onClick={() => setStatus(u.id, 'Active')}>Approve</Button>
              <Button variant="danger" size="sm" icon="bi-x-lg" aria-label={`Reject ${u.name}`} onClick={() => setStatus(u.id, 'Rejected')} />
            </>
          )}
          {u.status === 'Active' && (
            <>
              <Button variant="outline" size="sm" icon="bi-eye" aria-label={`View ${u.name}`} />
              <Button variant="danger" size="sm" icon="bi-slash-circle" aria-label={`Block ${u.name}`} onClick={() => setStatus(u.id, 'Blocked')} />
            </>
          )}
          {u.status === 'Blocked' && (
            <>
              <Button variant="outline" size="sm" icon="bi-eye" aria-label={`View ${u.name}`} />
              <Button variant="success" size="sm" icon="bi-unlock" onClick={() => setStatus(u.id, 'Active')}>Unblock</Button>
            </>
          )}
        </div>
      ),
    },
  ];

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
              placeholder="Search name or email"
              aria-label="Search users"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        }
      >
        <DataTable columns={columns} rows={rows} empty="No users match this filter." />
      </Card>
    </>
  );
}