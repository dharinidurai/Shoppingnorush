'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Wallet, 
  History, 
  Star, 
  TrendingUp, 
  ShieldCheck, 
  User, 
  LogOut,
  ShoppingBag,
  ChevronRight,
  Settings,
  LayoutGrid
} from "lucide-react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

const NavItem = ({ icon, label, href, active }: NavItemProps) => (
  <Link href={href} className={`nav-item ${active ? 'active' : ''}`}>
    {icon}
    <span>{label}</span>
    {active && <ChevronRight size={14} className="active-arrow" />}
  </Link>
);

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-mark">
            <svg viewBox="0 0 24 24"><path d="M12 4v8l4 4M5 12a7 7 0 1 0 14 0 7 7 0 0 0-14 0"/></svg>
          </div>
          <span>NoRush</span>
        </div>
      </div>

      <div className="sidebar-nav">
        <NavItem icon={<Wallet size={20} />} label="Wallet" href="/dashboard" active={pathname === '/dashboard'} />
        <NavItem icon={<ShoppingBag size={20} />} label="Shopping" href="/map" active={pathname === '/map'} />
        <NavItem icon={<History size={20} />} label="Transactions" href="/transactions" active={pathname === '/transactions'} />
        <NavItem icon={<Star size={20} />} label="Rewards" href="/rewards" active={pathname === '/rewards'} />
        <NavItem icon={<TrendingUp size={20} />} label="Insights" href="/insights" active={pathname === '/insights'} />
        <NavItem icon={<LayoutGrid size={20} />} label="Blueprint" href="/blueprint" active={pathname === '/blueprint'} />
        
        <div className="nav-divider">Settings</div>
        
        <NavItem icon={<ShieldCheck size={20} />} label="Security" href="/security" active={pathname === '/security'} />
        <NavItem icon={<User size={20} />} label="Account" href="/account" active={pathname === '/account'} />

        <div className="nav-divider">Management</div>

        <NavItem icon={<Settings size={20} />} label="Admin Portal" href="/admin" active={pathname === '/admin'} />
      </div>

      <div className="sidebar-footer">
        <div className="user-mini-profile">
          <div className="mini-avatar">AK</div>
          <div className="mini-info">
            <p className="m-name">Aryan Kumar</p>
            <p className="m-status">Premium</p>
          </div>
        </div>
        <Link href="/" className="logout-btn">
          <LogOut size={18} />
          <span>Sign Out</span>
        </Link>
      </div>

      <style jsx global>{`
        .sidebar {
          width: 260px;
          flex-shrink: 0;
          border-right: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.82);
          backdrop-filter: blur(20px);
          display: flex;
          flex-direction: column;
          z-index: 100;
          height: 100vh;
          position: sticky;
          top: 0;
        }

        .sidebar-header {
          padding: 32px 24px;
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }

        .sidebar-header .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 800;
          font-size: 20px;
          color: var(--ink);
          letter-spacing: -0.5px;
        }

        .sidebar-nav {
          padding: 24px 16px;
          flex: 1;
          overflow-y: auto;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 12px;
          color: var(--ink2);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          margin-bottom: 4px;
          text-decoration: none;
          position: relative;
        }

        .nav-item:hover {
          background: rgba(15, 110, 86, 0.05);
          color: var(--accent);
          transform: translateX(4px);
        }

        .nav-item.active {
          background: var(--accent);
          color: #fff;
          box-shadow: 0 8px 20px rgba(15, 110, 86, 0.2);
        }

        .active-arrow {
          position: absolute;
          right: 12px;
          opacity: 0.6;
        }

        .nav-divider {
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--ink3);
          margin: 28px 14px 12px;
        }

        .sidebar-footer {
          padding: 24px;
          border-top: 1px solid rgba(0,0,0,0.05);
          background: rgba(0,0,0,0.02);
        }

        .user-mini-profile {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          padding: 12px;
          background: #fff;
          border-radius: 14px;
          border: 1px solid var(--border);
        }

        .mini-avatar {
          width: 36px;
          height: 36px;
          background: var(--accent);
          color: #fff;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 12px;
        }

        .mini-info .m-name {
          font-size: 13px;
          font-weight: 700;
          color: var(--ink);
        }

        .mini-info .m-status {
          font-size: 10px;
          font-weight: 600;
          color: var(--accent);
          text-transform: uppercase;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--coral);
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          padding: 8px 12px;
          border-radius: 10px;
          transition: all 0.2s;
        }

        .logout-btn:hover {
          background: rgba(216, 90, 48, 0.08);
          transform: translateX(4px);
        }

        @media (max-width: 900px) {
          .sidebar { width: 80px; }
          .sidebar span, .sidebar .nav-divider, .sidebar .mini-info { display: none; }
          .sidebar-header .logo { justify-content: center; }
          .user-mini-profile { padding: 6px; justify-content: center; border: none; background: none; }
          .logout-btn span { display: none; }
        }

        @media (max-width: 768px) {
          .sidebar {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            top: auto;
            width: 100% !important;
            height: auto;
            flex-direction: row;
            border-right: none;
            border-top: 1px solid var(--border);
            z-index: 1000;
            background: rgba(255,255,255,0.96);
            backdrop-filter: blur(20px);
          }

          .sidebar-header { display: none; }
          .sidebar-footer { display: none; }

          .sidebar-nav {
            display: flex;
            flex-direction: row;
            padding: 8px 4px;
            overflow-x: auto;
            gap: 2px;
            scrollbar-width: none;
          }
          .sidebar-nav::-webkit-scrollbar { display: none; }

          .sidebar span, .sidebar .nav-divider { display: none; }

          .nav-item {
            flex-direction: column;
            padding: 8px 12px;
            gap: 4px;
            font-size: 10px;
            margin-bottom: 0;
            border-radius: 10px;
            min-width: 52px;
            align-items: center;
            justify-content: center;
          }
          .nav-item.active {
            box-shadow: 0 2px 8px rgba(15,110,86,0.15);
          }
          .active-arrow { display: none; }
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
