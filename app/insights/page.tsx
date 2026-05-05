'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowUp, ArrowDown, PieChart, BarChart3, TrendingDown } from 'lucide-react';

export default function InsightsPage() {
  const spendingData = [
    { label: 'Groceries', value: 45, color: '#0F6E56' },
    { label: 'Food & Drinks', value: 25, color: '#1D9E75' },
    { label: 'Transport', value: 15, color: '#FFD700' },
    { label: 'Utilities', value: 10, color: '#D85A30' },
    { label: 'Other', value: 5, color: '#888780' },
  ];

  return (
    <DashboardLayout 
      title="Financial Insights" 
      subtitle="Analyze your spending patterns and maximize your savings."
    >
      <div className="insights-grid">
        <div className="stat-card">
          <div className="stat-icon"><TrendingUp size={24} color="var(--accent)" /></div>
          <div className="stat-info">
            <p>Total Spendings</p>
            <h3>₹12,450.00</h3>
            <span className="change up"><ArrowUp size={12} /> 12% vs last month</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon"><TrendingDown size={24} color="var(--coral)" /></div>
          <div className="stat-info">
            <p>Average Daily</p>
            <h3>₹415.00</h3>
            <span className="change down"><ArrowDown size={12} /> 5% vs last week</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon"><PieChart size={24} color="#FFBC1F" /></div>
          <div className="stat-info">
            <p>Max Category</p>
            <h3>Groceries</h3>
            <span className="change neutral">Consistent with target</span>
          </div>
        </div>
      </div>

      <div className="charts-row">
        <div className="chart-card">
          <div className="card-header">
            <h4>Spending Distribution</h4>
            <PieChart size={20} color="var(--ink3)" />
          </div>
          <div className="chart-container">
            <div className="pie-sim">
              {spendingData.map((d, i) => (
                <div key={i} className="pie-segment" style={{ flex: d.value, background: d.color }}></div>
              ))}
            </div>
            <div className="pie-legend">
              {spendingData.map((d, i) => (
                <div key={i} className="legend-item">
                  <span className="dot" style={{ background: d.color }}></span>
                  <span className="label">{d.label}</span>
                  <span className="val">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="chart-card">
          <div className="card-header">
            <h4>Monthly Spending Trend</h4>
            <BarChart3 size={20} color="var(--ink3)" />
          </div>
          <div className="bar-chart-sim">
            {[65, 45, 85, 35, 75, 55, 95].map((val, i) => (
              <motion.div 
                key={i} 
                className="bar-wrap"
                initial={{ height: 0 }}
                animate={{ height: `${val}%` }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="bar-label">M{i+1}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="spending-insights">
        <h3>Smart Recommendations</h3>
        <div className="insight-item">
          <div className="ii-icon">💡</div>
          <div className="ii-content">
            <h4>Cut back on Transport</h4>
            <p>You spent 15% more on ride-sharing this week compared to your average. Consider using public transport to save ₹1,200/mo.</p>
          </div>
          <button className="btn-action">Plan Routes</button>
        </div>
        <div className="insight-item">
          <div className="ii-icon">🎁</div>
          <div className="ii-content">
            <h4>Upgrade to Premium</h4>
            <p>Based on your current spending levels, a Premium membership would earn you ₹450 more in cashback every month.</p>
          </div>
          <button className="btn-action">Upgrade Now</button>
        </div>
      </div>

      <style jsx>{`
        .insights-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 40px; }
        .stat-card { background: #fff; border: 1px solid var(--border); border-radius: 20px; padding: 24px; display: flex; align-items: start; gap: 20px; }
        .stat-icon { width: 48px; height: 48px; background: var(--bg); border-radius: 14px; display: flex; align-items: center; justify-content: center; }
        .stat-info p { font-size: 13px; color: var(--ink3); font-weight: 600; margin-bottom: 4px; }
        .stat-info h3 { font-size: 24px; font-weight: 800; letter-spacing: -1px; }
        .change { font-size: 11px; font-weight: 800; display: flex; align-items: center; gap: 4px; margin-top: 8px; padding: 4px 8px; border-radius: 6px; width: fit-content; }
        .change.up { background: var(--accent3); color: var(--accent); }
        .change.down { background: rgba(216, 90, 48, 0.1); color: var(--coral); }
        .change.neutral { background: var(--bg3); color: var(--ink3); }

        .charts-row { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-bottom: 48px; }
        .chart-card { background: #fff; border: 1px solid var(--border); border-radius: 24px; padding: 28px; display: flex; flex-direction: column; }
        .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
        .card-header h4 { font-size: 16px; font-weight: 800; }

        .chart-container { display: flex; gap: 40px; align-items: center; }
        .pie-sim { width: 120px; height: 120px; border-radius: 50%; display: flex; overflow: hidden; transform: rotate(-90deg); border: 8px solid #fff; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
        .pie-segment { height: 100%; transition: 1s; }
        .pie-legend { flex: 1; display: grid; gap: 12px; }
        .legend-item { display: flex; align-items: center; gap: 10px; font-size: 13px; font-weight: 600; }
        .legend-item .dot { width: 8px; height: 8px; border-radius: 50%; }
        .legend-item .label { flex: 1; color: var(--ink2); }
        .legend-item .val { font-weight: 800; color: var(--ink); }

        .bar-chart-sim { height: 180px; display: flex; align-items: flex-end; gap: 12px; margin-top: auto; padding-top: 20px; border-bottom: 1.5px solid var(--border); }
        .bar-wrap { flex: 1; background: linear-gradient(to top, var(--accent) 0%, var(--accent2) 100%); border-radius: 8px 8px 0 0; position: relative; min-width: 30px; }
        .bar-label { position: absolute; bottom: -28px; width: 100%; text-align: center; font-size: 10px; font-weight: 800; color: var(--ink3); }

        .spending-insights { display: flex; flex-direction: column; gap: 20px; }
        .spending-insights h3 { font-size: 20px; font-weight: 800; margin-bottom: 12px; }
        .insight-item { background: #fff; border: 1px solid var(--border); border-radius: 20px; padding: 24px; display: flex; align-items: center; gap: 24px; transition: 0.2s; }
        .insight-item:hover { border-color: var(--accent); background: var(--bg); }
        .ii-icon { font-size: 28px; width: 60px; height: 60px; background: var(--bg); border-radius: 16px; display: flex; align-items: center; justify-content: center; }
        .ii-content { flex: 1; }
        .ii-content h4 { font-size: 16px; font-weight: 800; margin-bottom: 4px; }
        .ii-content p { font-size: 13px; color: var(--ink2); line-height: 1.6; }
        .btn-action { background: none; border: 1.5px solid var(--border2); padding: 10px 20px; border-radius: 12px; font-size: 13px; font-weight: 800; cursor: pointer; transition: 0.2s; }
        .btn-action:hover { border-color: var(--accent); color: var(--accent); background: var(--accent3); }
      `}</style>
    </DashboardLayout>
  );
}
