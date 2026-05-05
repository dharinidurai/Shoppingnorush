'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { motion } from 'framer-motion';
import { Star, Gift, ShoppingBag, Coffee, Ticket, ChevronRight } from 'lucide-react';

export default function RewardsPage() {
  const vouchers = [
    { id: 1, title: '₹100 Starbucks Voucher', points: 1500, emoji: '☕', brand: 'Starbucks', category: 'Food' },
    { id: 2, title: '20% OFF Amazon Shopping', points: 3000, emoji: '🛒', brand: 'Amazon', category: 'Shopping' },
    { id: 3, title: '₹500 Zomato Pro Credit', points: 4500, emoji: '🍔', brand: 'Zomato', category: 'Food' },
    { id: 4, title: '1 Month Netflix Premium', points: 6000, emoji: '🍿', brand: 'Netflix', category: 'Entertainment' },
    { id: 5, title: '₹200 Uber Ride Credit', points: 2000, emoji: '🚗', brand: 'Uber', category: 'Travel' },
    { id: 6, title: '₹100 McDonald\'s Meal', points: 1200, emoji: '🍟', brand: 'McDonald\'s', category: 'Food' },
  ];

  return (
    <DashboardLayout 
      title="Rewards & Offers" 
      subtitle="Redeem your NoRush points for exclusive vouchers and cashbacks."
    >
      <div className="rewards-hero">
        <div className="rh-left">
          <div className="points-display">
            <Star size={28} className="star-icon" />
            <div>
              <h3>2,450 Points</h3>
              <p>Available Balance</p>
            </div>
          </div>
          <p className="rh-sub">You've earned 450 points this week. Keep shopping to reach <strong>Gold Tier</strong>!</p>
          <button className="btn-primary">View Earning History</button>
        </div>
        <div className="rh-right">
          <div className="tier-card">
            <h4>Silver Tier</h4>
            <div className="tier-progress">
              <div className="progress-fill" style={{ width: '65%' }}></div>
            </div>
            <p>550 pts until Gold</p>
          </div>
        </div>
      </div>

      <div className="section-header">
        <h2>Recommended Vouchers</h2>
        <p>Hand-picked offers based on your spending habits.</p>
      </div>

      <div className="vouchers-grid">
        {vouchers.map((v, idx) => (
          <motion.div 
            key={v.id}
            className="voucher-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
          >
            <div className="vc-icon">
              <span className="emoji">{v.emoji}</span>
            </div>
            <div className="vc-details">
              <h4>{v.title}</h4>
              <p className="vc-brand">{v.brand} · {v.category}</p>
              <div className="vc-footer">
                <span className="pts">{v.points} pts</span>
                <button className="btn-redeem">Redeem Now</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .rewards-hero {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 32px;
          background: linear-gradient(135deg, #0F6E56 0%, #1D9E75 100%);
          border-radius: 28px;
          padding: 40px;
          color: #fff;
          margin-bottom: 48px;
          box-shadow: 0 20px 48px rgba(15, 110, 86, 0.22);
        }

        .points-display { display: flex; align-items: center; gap: 20px; margin-bottom: 24px; }
        .star-icon { color: #FFD700; filter: drop-shadow(0 0 10px rgba(255,215,0,0.4)); }
        .points-display h3 { font-size: 36px; font-weight: 800; letter-spacing: -1.5px; }
        .points-display p { opacity: 0.8; font-size: 14px; font-weight: 600; margin-top: -4px; }

        .rh-sub { font-size: 15px; opacity: 0.9; line-height: 1.6; margin-bottom: 32px; max-width: 480px; }
        .btn-primary { background: #fff; color: var(--accent); border: none; padding: 12px 24px; border-radius: 12px; font-weight: 800; cursor: pointer; transition: 0.2s; font-size: 14px; }
        .btn-primary:hover { background: var(--accent3); transform: translateY(-2px); }

        .tier-card { background: rgba(255,255,255,0.15); backdrop-filter: blur(8px); border-radius: 20px; padding: 24px; border: 1px solid rgba(255,255,255,0.1); }
        .tier-card h4 { font-size: 18px; font-weight: 800; margin-bottom: 16px; }
        .tier-progress { height: 10px; background: rgba(0,0,0,0.1); border-radius: 5px; overflow: hidden; margin-bottom: 12px; }
        .progress-fill { height: 100%; background: #FFD700; border-radius: 5px; }

        .section-header { margin-bottom: 32px; }
        .section-header h2 { font-size: 24px; font-weight: 800; letter-spacing: -1px; }
        .section-header p { color: var(--ink2); margin-top: 4px; font-size: 14px; }

        .vouchers-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 24px; }

        .voucher-card { background: #fff; border: 1px solid var(--border); border-radius: 22px; padding: 24px; display: flex; gap: 20px; transition: 0.2s; position: relative; overflow: hidden; }
        .voucher-card:hover { border-color: var(--accent); transform: translateY(-4px); box-shadow: 0 12px 30px rgba(0,0,0,0.05); }

        .vc-icon { width: 64px; height: 64px; background: var(--bg); border-radius: 18px; display: flex; align-items: center; justify-content: center; font-size: 32px; }
        .vc-details { flex: 1; display: flex; flex-direction: column; }
        .vc-details h4 { font-size: 16px; font-weight: 800; color: var(--ink); margin-bottom: 4px; }
        .vc-brand { font-size: 12px; color: var(--ink3); font-weight: 600; margin-bottom: 12px; }

        .vc-footer { display: flex; justify-content: space-between; align-items: center; margin-top: auto; }
        .vc-footer .pts { font-size: 15px; font-weight: 800; color: var(--accent); }
        .btn-redeem { background: none; border: 1.5px solid var(--border); padding: 8px 16px; border-radius: 10px; font-size: 12px; font-weight: 700; cursor: pointer; transition: 0.2s; }
        .btn-redeem:hover { border-color: var(--accent); color: var(--accent); background: var(--accent3); }
      `}</style>
    </DashboardLayout>
  );
}
