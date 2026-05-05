'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { motion } from 'framer-motion';
import { 
  Search, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Filter, 
  Download,
  Calendar
} from 'lucide-react';

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const transactions = [
    { id: 1, name: "Organic Store #42", type: "out", amount: "921.88", date: "Today, 4:12 PM", category: "Groceries", status: "Completed" },
    { id: 2, name: "Wallet Top-up", type: "in", amount: "5,000.00", date: "Yesterday, 11:20 AM", category: "UPI Transfer", status: "Completed" },
    { id: 3, name: "Uber India", type: "out", amount: "450.00", date: "Mar 28, 9:30 PM", category: "Transport", status: "Completed" },
    { id: 4, name: "Zomato", type: "out", amount: "1,280.00", date: "Mar 28, 8:15 PM", category: "Food", status: "Completed" },
    { id: 5, name: "Airtel Bill", type: "out", amount: "749.00", date: "Mar 25, 2:45 PM", category: "Utilities", status: "Completed" },
    { id: 6, name: "Netflix Subscription", type: "out", amount: "499.00", date: "Mar 22, 12:00 AM", category: "Entertainment", status: "Processing" },
  ];

  return (
    <DashboardLayout 
      title="Transaction History" 
      subtitle="View and manage your recent payments and wallet top-ups."
    >
      <div className="tx-header">
        <div className="search-box">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search by name, category or amount..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="tx-controls">
          <button className="control-btn"><Calendar size={16} /> Last 30 Days</button>
          <button className="control-btn"><Filter size={16} /> Filters</button>
          <button className="control-btn primary"><Download size={16} /> Export CSV</button>
        </div>
      </div>

      <div className="tx-table-card">
        <table className="tx-table">
          <thead>
            <tr>
              <th>Entity</th>
              <th>Category</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th className="text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, idx) => (
              <motion.tr 
                key={t.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <td>
                  <div className="entity-cell">
                    <div className={`tx-icon ${t.type}`}>
                      {t.type === 'in' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                    </div>
                    <span>{t.name}</span>
                  </div>
                </td>
                <td><span className="cat-pill">{t.category}</span></td>
                <td className="date-cell">{t.date}</td>
                <td>
                  <span className={`status-pill ${t.status.toLowerCase()}`}>
                    {t.status}
                  </span>
                </td>
                <td className={`text-right amount-cell ${t.type}`}>
                  {t.type === 'in' ? '+' : '-'}₹{t.amount}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .tx-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          gap: 20px;
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #fff;
          border: 1px solid var(--border);
          padding: 12px 20px;
          border-radius: 14px;
          flex: 1;
          max-width: 500px;
        }

        .search-box input {
          border: none;
          outline: none;
          background: none;
          font-family: inherit;
          font-size: 14px;
          width: 100%;
        }

        .tx-controls {
          display: flex;
          gap: 12px;
        }

        .control-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #fff;
          border: 1.5px solid var(--border2);
          padding: 10px 18px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.2s;
        }

        .control-btn:hover {
          border-color: var(--accent);
          color: var(--accent);
          background: var(--accent3);
        }

        .control-btn.primary {
          background: var(--accent);
          border-color: var(--accent);
          color: #fff;
        }

        .tx-table-card {
          background: #fff;
          border-radius: 24px;
          border: 1px solid var(--border);
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
        }

        .tx-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .tx-table th {
          padding: 20px 24px;
          font-size: 12px;
          font-weight: 800;
          color: var(--ink3);
          text-transform: uppercase;
          letter-spacing: 1px;
          border-bottom: 1px solid var(--border);
          background: #fafafa;
        }

        .tx-table td {
          padding: 18px 24px;
          font-size: 14px;
          border-bottom: 1px solid rgba(0,0,0,0.03);
        }

        .entity-cell {
          display: flex;
          align-items: center;
          gap: 14px;
          font-weight: 700;
        }

        .tx-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tx-icon.out { background: rgba(216, 90, 48, 0.08); color: var(--coral); }
        .tx-icon.in { background: rgba(15, 110, 86, 0.08); color: var(--accent); }

        .cat-pill {
          padding: 4px 12px;
          background: var(--bg);
          border-radius: 100px;
          font-size: 12px;
          font-weight: 600;
          color: var(--ink2);
        }

        .date-cell { color: var(--ink3); font-size: 13px; }

        .status-pill {
          padding: 4px 12px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 800;
        }

        .status-pill.completed { background: var(--accent3); color: var(--accent); }
        .status-pill.processing { background: #fff8e1; color: #f57c00; }

        .amount-cell { font-weight: 800; font-size: 15px; }
        .amount-cell.in { color: var(--accent); }
        .text-right { text-align: right; }
      `}</style>
    </DashboardLayout>
  );
}
