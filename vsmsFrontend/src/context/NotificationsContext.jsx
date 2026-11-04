import { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';
import { NOTIFICATIONS } from '../data/notificationData';

const NotificationsContext = createContext(null);

// Shared by the Topbar (unread dot) and the Notifications page.
// Later: load from the API and call PATCH endpoints inside markRead / markAllRead.
export function NotificationsProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState(() => NOTIFICATIONS[user.role] || []);

  const markRead = (id) => setItems((list) => list.map((n) => (n.id === id ? { ...n, read: true } : n)));
  const markAllRead = () => setItems((list) => list.map((n) => ({ ...n, read: true })));
  const unreadCount = items.filter((n) => !n.read).length;

  return (
    <NotificationsContext.Provider value={{ items, unreadCount, markRead, markAllRead }}>
      {children}
    </NotificationsContext.Provider>
  );
}

export const useNotifications = () => {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error('useNotifications must be used inside <NotificationsProvider>');
  return ctx;
};