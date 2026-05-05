'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { motion } from 'framer-motion';
import { ShieldCheck, Fingerprint, Lock, ShieldAlert, Key, Smartphone, ChevronRight } from 'lucide-react';

export default function SecurityPage() {
  const [biometricEnabled, setBiometricEnabled] = useState(true);

  return (
    <DashboardLayout 
      title="Security Settings" 
      subtitle="Manage your authentication methods and monitor your account activity."
    >
      <div className="security-grid">
        <div className="security-main">
          <div className="sec-card hero-sec">
            <div className="hero-head">
              <div className="shield-icon"><ShieldCheck size={32} color="#fff" /></div>
              <div>
                <h4>Account Protection is High</h4>
                <p>256-bit AES encryption is active for all transactions.</p>
              </div>
            </div>
          </div>

          <div className="sec-card">
            <h3>Authentication Methods</h3>
            <div className="auth-methods">
              <div className="method-item">
                <div className="m-icon"><Fingerprint size={24} /></div>
                <div className="m-info">
                  <h4>Biometric Login</h4>
                  <p>Securely sign in using your fingerprint or FaceID.</p>
                </div>
                <div 
                  className={`switch-toggle ${biometricEnabled ? 'active' : ''}`}
                  onClick={() => setBiometricEnabled(!biometricEnabled)}
                >
                  <div className="toggle-dot"></div>
                </div>
              </div>

              <div className="method-item">
                <div className="m-icon"><Lock size={24} /></div>
                <div className="m-info">
                  <h4>Two-Factor Authentication</h4>
                  <p>Additional layer of security via SMS or Auth App.</p>
                </div>
                <button className="btn-setup">Manage</button>
              </div>

              <div className="method-item">
                <div className="m-icon"><Smartphone size={24} /></div>
                <div className="m-info">
                  <h4>NFC Card Pairing</h4>
                  <p>Login physical tap using your NoRush card.</p>
                </div>
                <button className="btn-setup primary">Pair Now</button>
              </div>
            </div>
          </div>

          <div className="sec-card">
            <div className="card-header">
              <h3>Recent Security Activity</h3>
              <button className="view-all">View Log <ChevronRight size={14} /></button>
            </div>
            <div className="activity-list">
              <div className="act-item">
                <div className="act-icon"><Smartphone size={18} /></div>
                <div className="act-details">
                  <p className="a-title">New Device Logged In</p>
                  <p className="a-meta">iPhone 15 Pro · Mumbai, India · 2h ago</p>
                </div>
                <span className="a-tag warning">Verify</span>
              </div>
              <div className="act-item">
                <div className="act-icon"><Key size={18} /></div>
                <div className="act-details">
                  <p className="a-title">Password Successfully Changed</p>
                  <p className="a-meta">Mar 28, 10:15 AM</p>
                </div>
                <span className="a-tag success">Safe</span>
              </div>
            </div>
          </div>
        </div>

        <div className="security-side">
          <div className="sec-tip">
            <div className="tip-head">
              <ShieldAlert size={20} color="var(--coral)" />
              <h5>Security Tip</h5>
            </div>
            <p>Avoid using simple patterns for your wallet PIN. Use a combination that only you can identify.</p>
          </div>

          <div className="audit-card">
            <h4>Safety Audit</h4>
            <div className="audit-score">
              <svg viewBox="0 0 36 36" className="circular-chart green">
                <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="circle" strokeDasharray="85, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <text x="18" y="20.35" className="percentage">85%</text>
              </svg>
            </div>
            <p>Your security health is excellent. Set up 2FA to reach 100%.</p>
            <button className="btn-audit">Improve Score</button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .security-grid { display: grid; grid-template-columns: 1fr 300px; gap: 32px; }
        .sec-card { background: #fff; border: 1px solid var(--border); border-radius: 24px; padding: 28px; margin-bottom: 24px; }
        
        .hero-sec { background: var(--accent); color: #fff; border: none; box-shadow: 0 12px 30px rgba(15,110,86,0.22); }
        .hero-head { display: flex; align-items: center; gap: 20px; }
        .shield-icon { width: 64px; height: 64px; background: rgba(255,255,255,0.2); border-radius: 18px; display: flex; align-items: center; justify-content: center; }
        .hero-head h4 { font-size: 18px; font-weight: 800; margin-bottom: 4px; }
        .hero-head p { font-size: 13px; opacity: 0.8; font-weight: 600; }

        .sec-card h3 { font-size: 18px; font-weight: 800; margin-bottom: 24px; }
        
        .auth-methods { display: flex; flex-direction: column; gap: 4px; }
        .method-item { display: flex; align-items: center; gap: 20px; padding: 16px; border-radius: 16px; transition: 0.2s; border: 1px solid transparent; }
        .method-item:hover { background: var(--bg); border: 1px solid var(--border); }
        .m-icon { width: 44px; height: 44px; background: var(--bg3); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--ink); }
        .m-info { flex: 1; }
        .m-info h4 { font-size: 15px; font-weight: 700; margin-bottom: 2px; }
        .m-info p { font-size: 12px; color: var(--ink3); font-weight: 600; }

        .switch-toggle { width: 44px; height: 24px; background: var(--border); border-radius: 100px; padding: 3px; cursor: pointer; transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .switch-toggle.active { background: var(--accent); }
        .toggle-dot { width: 18px; height: 18px; background: #fff; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.3s; transform: translateX(0); }
        .switch-toggle.active .toggle-dot { transform: translateX(20px); }

        .btn-setup { background: none; border: 1.5px solid var(--border2); padding: 8px 16px; border-radius: 10px; font-size: 13px; font-weight: 700; cursor: pointer; transition: 0.2s; }
        .btn-setup:hover { border-color: var(--accent); color: var(--accent); background: var(--accent3); }
        .btn-setup.primary { background: var(--accent); color: #fff; border-color: var(--accent); }

        .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .view-all { background: none; border: none; color: var(--accent); font-size: 13px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 4px; }

        .activity-list { display: flex; flex-direction: column; gap: 16px; }
        .act-item { display: flex; align-items: center; gap: 16px; padding: 12px 0; border-bottom: 1px solid rgba(0,0,0,0.03); }
        .act-icon { width: 36px; height: 36px; background: var(--bg); border-radius: 10px; display: flex; align-items: center; justify-content: center; }
        .act-details { flex: 1; }
        .a-title { font-size: 14px; font-weight: 700; }
        .a-meta { font-size: 11px; color: var(--ink3); }
        .a-tag { font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 100px; text-transform: uppercase; }
        .a-tag.warning { background: rgba(216, 90, 48, 0.1); color: var(--coral); }
        .a-tag.success { background: var(--accent3); color: var(--accent); }

        .sec-tip { background: #fff; border: 1px solid var(--border); border-radius: 20px; padding: 20px; margin-bottom: 24px; }
        .tip-head { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
        .tip-head h5 { font-size: 14px; font-weight: 800; color: var(--coral); }
        .sec-tip p { font-size: 12px; color: var(--ink2); line-height: 1.5; font-weight: 600; }

        .audit-card { background: #fff; border: 1px solid var(--border); border-radius: 20px; padding: 24px; text-align: center; }
        .audit-card h4 { font-size: 16px; font-weight: 800; margin-bottom: 24px; }
        .audit-score { width: 120px; margin: 0 auto 20px; }
        .circular-chart { display: block; margin: 10px auto; max-width: 100%; max-height: 250px; }
        .circle-bg { fill: none; stroke: var(--bg3); stroke-width: 2.8; }
        .circle { fill: none; stroke: var(--accent); stroke-width: 2.8; stroke-linecap: round; }
        .percentage { fill: var(--ink); font-family: var(--font-sora); font-size: 8px; font-weight: 800; text-anchor: middle; }
        .audit-card p { font-size: 12px; color: var(--ink2); margin-bottom: 20px; font-weight: 600; }
        .btn-audit { width: 100%; padding: 12px; border-radius: 12px; background: var(--bg3); border: none; font-size: 13px; font-weight: 800; cursor: pointer; transition: 0.2s; }
        .btn-audit:hover { background: var(--accent); color: #fff; }
      `}</style>
    </DashboardLayout>
  );
}
