'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { motion } from 'framer-motion';
import { Wallet, QrCode, Send, Plus, ArrowUpRight, ArrowDownLeft, ChevronRight, ShieldCheck, Star } from 'lucide-react';

export default function Dashboard() {
  const transactions = [
    { id: 1, name: "Organic Store #42", type: "out", amount: "921.88", date: "Today, 4:12 PM", category: "Groceries" },
    { id: 2, name: "Wallet Top-up", type: "in", amount: "5,000.00", date: "Yesterday, 11:20 AM", category: "UPI Transfer" },
    { id: 3, name: "Uber India", type: "out", amount: "450.00", date: "Mar 28, 9:30 PM", category: "Transport" },
    { id: 4, name: "Zomato", type: "out", amount: "1,280.00", date: "Mar 28, 8:15 PM", category: "Food" },
  ];

  return (
    <DashboardLayout 
      title="Welcome back, Aryan! 👋" 
      subtitle="Your account is looking healthy today. You saved ₹410 in cashback this month."
    >
      <div className="dash-grid">
        <div className="col-left">
          {/* WALLET CARD */}
          <motion.div 
            className="main-wallet-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="wc-top">
              <div>
                <span>Total Balance</span>
                <h2>₹4,250.00</h2>
              </div>
              <div className="visa-logo">NoRush</div>
            </div>
            <div className="wc-middle">
              <div className="wc-chip-visual"></div>
              <p>4891 •••• •••• 9021</p>
            </div>
            <div className="wc-bottom">
              <div>
                <span>Card Holder</span>
                <p>Aryan Kumar</p>
              </div>
              <div>
                <span>Expires</span>
                <p>12/28</p>
              </div>
            </div>
          </motion.div>

          {/* QUICK ACTIONS */}
          <div className="quick-actions">
            <ActionButton icon={<QrCode />} label="Scan & Pay" primary />
            <ActionButton icon={<Send />} label="Send Money" />
            <ActionButton icon={<Plus />} label="Add Money" />
          </div>

          {/* RECENT TRANSACTIONS */}
          <div className="transactions-section">
            <div className="sec-header">
              <h3>Recent activity</h3>
              <button className="view-all">View all <ChevronRight size={14} /></button>
            </div>
            <div className="transactions-list">
              {transactions.map((t, idx) => (
                <motion.div 
                  key={t.id} 
                  className="txn-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className={`txn-icon ${t.type}`}>
                    {t.type === 'in' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                  </div>
                  <div className="txn-details">
                    <p className="t-name">{t.name}</p>
                    <p className="t-meta">{t.date} · {t.category}</p>
                  </div>
                  <div className={`txn-amount ${t.type}`}>
                    {t.type === 'in' ? '+' : '-'}₹{t.amount}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-right">
          <div className="side-card security-status">
            <div className="card-icon"><ShieldCheck size={24} color="var(--accent)" /></div>
            <h4>Security Active</h4>
            <p>Biometric auth active · 256-bit encryption</p>
            <div className="auth-pill active">Biometric Enabled</div>
          </div>

          <div className="side-card rewards-card">
            <div className="card-header">
              <h4>NoRush Points</h4>
              <span className="pts">2,450 pts</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '65%' }}></div>
            </div>
            <p className="progress-label">550 pts until next reward tier</p>
            <button className="btn-rewards">Open Rewards Hub</button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dash-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 32px;
        }

        .col-left { display: flex; flex-direction: column; gap: 32px; }
        .col-right { display: flex; flex-direction: column; gap: 24px; }

        .main-wallet-card {
           background: linear-gradient(135deg, #0F6E56 0%, #085041 100%);
           border-radius: 28px;
           padding: 36px;
           color: #fff;
           box-shadow: 0 24px 48px rgba(15, 110, 86, 0.2);
           position: relative;
        }

        .wc-top { display: flex; justify-content: space-between; margin-bottom: 40px; }
        .wc-top span { font-size: 13px; opacity: 0.6; }
        .wc-top h2 { font-size: 32px; margin-top: 4px; letter-spacing: -1px; }
        .visa-logo { font-weight: 800; font-size: 20px; color: var(--accent2); }

        .wc-chip-visual { width: 44px; height: 32px; background: linear-gradient(135deg, #FFD700 0%, #DAA520 100%); border-radius: 6px; margin-bottom: 16px; }
        .wc-middle p { font-size: 18px; letter-spacing: 2px; opacity: 0.9; }
        .wc-bottom { display: flex; gap: 48px; }
        .wc-bottom span { font-size: 10px; opacity: 0.5; }
        .wc-bottom p { font-size: 14px; font-weight: 600; margin-top: 4px; }

        .quick-actions { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }

        .action-btn { background: #fff; border: 1px solid var(--border); border-radius: 18px; padding: 20px; cursor: pointer; transition: all 0.2s; display: flex; flex-direction: column; align-items: center; gap: 12px; }
        .action-btn:hover { border-color: var(--accent); transform: translateY(-2px); }
        .action-btn .icon-box { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; background: var(--bg3); }
        .action-btn.primary { background: var(--accent); border: none; color: #fff; }
        .action-btn.primary .icon-box { background: rgba(255,255,255,0.2); }
        .action-btn label { font-size: 13px; font-weight: 700; color: var(--ink); cursor: inherit; }
        .action-btn.primary label { color: #fff; }

        .transactions-section { background: #fff; border: 1px solid var(--border); border-radius: 24px; padding: 28px; }
        .sec-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .sec-header h3 { font-size: 18px; font-weight: 800; letter-spacing: -0.5px; }
        .view-all { background: none; border: none; color: var(--accent); font-size: 13px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 4px; }

        .txn-item { display: flex; align-items: center; gap: 16px; padding: 16px 0; border-bottom: 1px solid rgba(0,0,0,0.05); }
        .txn-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .txn-icon.out { background: rgba(216, 90, 48, 0.1); color: var(--coral); }
        .txn-icon.in { background: rgba(15, 110, 86, 0.1); color: var(--accent); }
        .txn-details { flex: 1; }
        .t-name { font-size: 15px; font-weight: 700; }
        .t-meta { font-size: 12px; color: var(--ink3); margin-top: 4px; }
        .txn-amount { font-size: 16px; font-weight: 800; }
        .txn-amount.in { color: var(--accent); }

        .side-card { background: #fff; border: 1px solid var(--border); border-radius: 24px; padding: 24px; }
        .side-card h4 { font-size: 16px; font-weight: 800; margin-bottom: 8px; }
        .side-card p { font-size: 13px; color: var(--ink2); }
        .auth-pill { display: inline-block; padding: 6px 14px; border-radius: 100px; font-size: 12px; font-weight: 800; margin-top: 20px; background: var(--accent3); color: var(--accent); }

        .rewards-card .pts { font-size: 18px; font-weight: 800; color: var(--accent); }
        .progress-bar { height: 8px; background: rgba(0,0,0,0.05); border-radius: 4px; margin: 16px 0 10px; overflow: hidden; }
        .progress-fill { height: 100%; background: var(--accent); border-radius: 4px; }
        .btn-rewards { width: 100%; margin-top: 16px; padding: 12px; border-radius: 12px; border: 1.5px solid var(--border); background: none; font-size: 14px; font-weight: 700; cursor: pointer; transition: 0.2s; }
        .btn-rewards:hover { background: var(--accent); color: #fff; border-color: var(--accent); }
      `}</style>
    </DashboardLayout>
  );
}

function ActionButton({ icon, label, primary = false }: { icon: any, label: string, primary?: boolean }) {
  return (
    <button className={`action-btn ${primary ? 'primary' : ''}`}>
      <div className="icon-box">{icon}</div>
      <label>{label}</label>
    </button>
  );
}
