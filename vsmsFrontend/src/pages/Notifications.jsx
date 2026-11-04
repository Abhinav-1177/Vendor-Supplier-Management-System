import { useState } from 'react';
import { Button, Card, MiniTabs, PageHeader } from '../components/ui';
import { useNotifications } from '../context/NotificationsContext';

const TABS = ['All', 'Unread'];

export default function Notifications() {
  const { items, unreadCount, markRead, markAllRead } = useNotifications();
  const [tab, setTab] = useState(TABS[0]);

  const visible = tab === 'Unread' ? items.filter((n) => !n.read) : items;

  return (
    <>
      <PageHeader
        title="Notifications"
        subtitle={unreadCount ? `${unreadCount} unread` : 'You are all caught up'}
        actions={
          <>
            <MiniTabs tabs={TABS} value={tab} onChange={setTab} />
            <Button variant="outline" icon="bi-check2-all" disabled={!unreadCount} onClick={markAllRead}>Mark all read</Button>
          </>
        }
      />

      <Card padded={false}>
        {visible.length === 0 ? (
          <p className="empty-note">{tab === 'Unread' ? 'No unread notifications.' : 'No notifications yet.'}</p>
        ) : (
          visible.map((n) => (
            <button
              key={n.id}
              className={`notif-item ${n.read ? '' : 'unread'}`}
              onClick={() => markRead(n.id)}
              aria-label={`${n.read ? '' : 'Unread: '}${n.title}`}
            >
              <div className={`notif-icon tone-${n.tone}`}><i className={`bi ${n.icon}`} /></div>
              <div className="notif-body">
                <div className="notif-title">{n.title}</div>
                <div className="notif-text">{n.text}</div>
                <div className="notif-time">{n.time}</div>
              </div>
              {!n.read && <span className="notif-unread-dot" aria-hidden="true" />}
            </button>
          ))
        )}
      </Card>
    </>
  );
}