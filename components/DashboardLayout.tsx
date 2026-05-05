'use client';

import React from 'react';
import Sidebar from './Sidebar';
import { Bell } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const DashboardLayout = ({ children, title, subtitle }: DashboardLayoutProps) => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <main className="dashboard-main">
        <header className="dash-header">
          <div className="header-title">
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <div className="header-actions">
            <div className="notif-badge">
              <Bell size={20} />
              <span className="dot"></span>
            </div>
            <div className="user-profile">
              <div className="avatar">AK</div>
              <div className="user-info">
                <p className="u-name">Aryan Kumar</p>
                <p className="u-tier">Premium User</p>
              </div>
            </div>
          </div>
        </header>

        <div className="dash-content-scrollable">
          {children}
        </div>
      </main>

      <style jsx global>{`
        .dashboard-container {
          display: flex;
          min-height: 100vh;
          background: rgba(248, 247, 244, 1);
        }

        .dashboard-main { 
          flex: 1; 
          display: flex; 
          flex-direction: column; 
          min-width: 0;
          position: relative;
        }

        .dash-header {
          height: 80px;
          background: rgba(255,100,100, 0); /* Invisible but present */
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(0,0,0,0.05);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          position: sticky;
          top: 0;
          z-index: 90;
        }

        .header-title h1 {
          font-size: 24px;
          font-weight: 800;
          color: var(--ink);
          letter-spacing: -1px;
        }

        .header-title p {
          font-size: 13px;
          color: var(--ink2);
          margin-top: 2px;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .notif-badge {
          position: relative;
          color: var(--ink2);
          cursor: pointer;
          width: 44px;
          height: 44px;
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .notif-badge .dot {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 8px;
          height: 8px;
          background: var(--coral);
          border-radius: 50%;
          border: 2px solid #fff;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-left: 20px;
          border-left: 1px solid rgba(0,0,0,0.05);
        }

        .avatar {
          width: 44px;
          height: 44px;
          background: var(--accent);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: 800;
          font-size: 14px;
          box-shadow: 0 4px 12px rgba(15, 110, 86, 0.2);
        }

        .user-info .u-name { font-size: 14px; font-weight: 700; color: var(--ink); }
        .user-info .u-tier { font-size: 11px; font-weight: 600; color: var(--accent); opacity: 0.8; }

        .dash-content-scrollable { 
          padding: 40px;
          flex: 1;
          overflow-y: auto;
        }

        @media (max-width: 768px) {
          .dashboard-container { flex-direction: column; }
          
          .dash-header {
            padding: 0 16px;
            height: 64px;
          }

          .header-title h1 { font-size: 20px; }
          .header-title p { font-size: 12px; }

          .user-info { display: none; }
          .user-profile { padding-left: 12px; gap: 8px; }
          .avatar { width: 36px; height: 36px; font-size: 12px; }
          .notif-badge { width: 36px; height: 36px; }

          .dash-content-scrollable {
            padding: 20px 16px 100px;
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;
