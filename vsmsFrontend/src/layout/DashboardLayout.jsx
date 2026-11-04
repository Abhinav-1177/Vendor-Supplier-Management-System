import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { NotificationsProvider } from '../context/NotificationsContext';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <NotificationsProvider>
      <div className="dash-shell">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="main-wrap">
          <Topbar onMenuClick={() => setSidebarOpen(true)} />
          <main className="page-content">
            <Outlet />
          </main>
        </div>
      </div>
    </NotificationsProvider>
  );
}