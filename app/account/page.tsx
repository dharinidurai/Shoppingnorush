'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Edit3, Camera, Bell, Languages, HelpCircle } from 'lucide-react';

export default function AccountPage() {
  return (
    <DashboardLayout 
      title="Account Settings" 
      subtitle="Update your personal information and manage your preferences."
    >
      <div className="account-grid">
        <div className="profile-section">
          <div className="profile-card">
            <div className="avatar-wrap">
              <div className="main-avatar">AK</div>
              <button className="edit-avatar"><Camera size={16} /></button>
            </div>
            <div className="profile-info">
              <h2>Aryan Kumar</h2>
              <p>Premium Member since Dec 2023</p>
              <span className="badge">Verified Profile</span>
            </div>
          </div>

          <div className="settings-card">
            <h3>Personal Information</h3>
            <div className="info-list">
              <div className="info-item">
                <div className="ii-icon"><User size={18} /></div>
                <div className="ii-content">
                  <label>Full Name</label>
                  <p>Aryan Kumar</p>
                </div>
                <button className="btn-edit"><Edit3 size={14} /></button>
              </div>
              <div className="info-item">
                <div className="ii-icon"><Mail size={18} /></div>
                <div className="ii-content">
                  <label>Email Address</label>
                  <p>aryan.k@example.com</p>
                </div>
                <button className="btn-edit"><Edit3 size={14} /></button>
              </div>
              <div className="info-item">
                <div className="ii-icon"><Phone size={18} /></div>
                <div className="ii-content">
                  <label>Phone Number</label>
                  <p>+91 98765 43210</p>
                </div>
                <button className="btn-edit"><Edit3 size={14} /></button>
              </div>
              <div className="info-item">
                <div className="ii-icon"><MapPin size={18} /></div>
                <div className="ii-content">
                  <label>Default Store</label>
                  <p>Organic Store #42, Mumbai</p>
                </div>
                <button className="btn-edit"><Edit3 size={14} /></button>
              </div>
            </div>
          </div>
        </div>

        <div className="preferences-section">
          <div className="settings-card">
            <h3>Preferences</h3>
            <div className="pref-list">
              <div className="pref-item">
                <div className="pi-icon"><Bell size={18} /></div>
                <div className="pi-content">
                  <h4>Push Notifications</h4>
                  <p>Transaction alerts and offers</p>
                </div>
                <div className="switch-toggle active"><div className="toggle-dot"></div></div>
              </div>
              <div className="pref-item">
                <div className="pi-icon"><Languages size={18} /></div>
                <div className="pi-content">
                  <h4>Language</h4>
                  <p>English (United Kingdom)</p>
                </div>
                <button className="btn-setup">Change</button>
              </div>
              <div className="pref-item">
                <div className="pi-icon"><HelpCircle size={18} /></div>
                <div className="pi-content">
                  <h4>Support</h4>
                  <p>Get help or report an issue</p>
                </div>
                <button className="btn-setup primary">Get Help</button>
              </div>
            </div>
          </div>

          <div className="danger-zone">
            <h3>Danger Zone</h3>
            <div className="danger-card">
              <div>
                <h4>Deactivate Account</h4>
                <p>Temporarily disable your profile and wallet.</p>
              </div>
              <button className="btn-danger">Deactivate</button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .account-grid { display: grid; grid-template-columns: 1fr 400px; gap: 32px; }
        .settings-card { background: #fff; border: 1px solid var(--border); border-radius: 24px; padding: 28px; margin-bottom: 24px; }
        .settings-card h3 { font-size: 18px; font-weight: 800; margin-bottom: 24px; }

        .profile-card { background: #fff; border: 1px solid var(--border); border-radius: 24px; padding: 40px; text-align: center; margin-bottom: 24px; display: flex; flex-direction: column; align-items: center; }
        .avatar-wrap { position: relative; margin-bottom: 24px; }
        .main-avatar { width: 100px; height: 100px; background: var(--accent); color: #fff; border-radius: 32px; display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: 800; box-shadow: 0 12px 30px rgba(15,110,86,0.22); }
        .edit-avatar { position: absolute; bottom: -8px; right: -8px; width: 36px; height: 36px; background: #fff; border: 1px solid var(--border); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--accent); cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }

        .profile-info h2 { font-size: 24px; font-weight: 800; letter-spacing: -1px; margin-bottom: 4px; }
        .profile-info p { font-size: 14px; color: var(--ink3); font-weight: 600; margin-bottom: 16px; }
        .badge { background: var(--accent3); color: var(--accent); padding: 4px 12px; border-radius: 100px; font-size: 11px; font-weight: 800; text-transform: uppercase; }

        .info-list { display: flex; flex-direction: column; gap: 8px; }
        .info-item { display: flex; align-items: center; gap: 20px; padding: 16px; border-radius: 16px; transition: 0.2s; }
        .info-item:hover { background: var(--bg); }
        .ii-icon { width: 44px; height: 44px; background: var(--bg); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--ink2); }
        .ii-content { flex: 1; }
        .ii-content label { display: block; font-size: 11px; font-weight: 800; color: var(--ink3); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px; }
        .ii-content p { font-size: 15px; font-weight: 700; color: var(--ink); }
        .btn-edit { background: none; border: none; color: var(--ink3); cursor: pointer; padding: 8px; transition: 0.2s; }
        .btn-edit:hover { color: var(--accent); }

        .pref-list { display: flex; flex-direction: column; gap: 12px; }
        .pref-item { display: flex; align-items: center; gap: 20px; padding: 16px; border-radius: 16px; background: var(--bg); }
        .pi-icon { width: 40px; height: 40px; background: #fff; border: 1px solid var(--border); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: var(--ink); }
        .pi-content { flex: 1; }
        .pi-content h4 { font-size: 15px; font-weight: 800; margin-bottom: 2px; }
        .pi-content p { font-size: 12px; color: var(--ink3); font-weight: 600; }
        
        .switch-toggle { width: 40px; height: 22px; background: var(--border); border-radius: 100px; padding: 2px; cursor: pointer; transition: 0.3s; }
        .switch-toggle.active { background: var(--accent); }
        .toggle-dot { width: 18px; height: 18px; background: #fff; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: 0.3s; }
        .switch-toggle.active .toggle-dot { transform: translateX(18px); }

        .btn-setup { background: none; border: 1.5px solid var(--border2); padding: 8px 16px; border-radius: 10px; font-size: 12px; font-weight: 800; cursor: pointer; transition: 0.2s; }
        .btn-setup:hover { border-color: var(--accent); color: var(--accent); background: var(--accent3); }
        .btn-setup.primary { background: var(--accent); color: #fff; border-color: var(--accent); }

        .danger-zone h3 { font-size: 18px; font-weight: 800; color: var(--coral); margin-bottom: 16px; padding-left: 12px; }
        .danger-card { background: rgba(216, 90, 48, 0.05); border: 1px solid rgba(216, 90, 48, 0.1); border-radius: 20px; padding: 24px; display: flex; align-items: center; justify-content: space-between; gap: 20px; }
        .danger-card h4 { font-size: 15px; font-weight: 800; color: var(--ink); margin-bottom: 4px; }
        .danger-card p { font-size: 12px; color: var(--ink2); font-weight: 600; }
        .btn-danger { background: none; border: 1.5px solid var(--coral); color: var(--coral); padding: 10px 20px; border-radius: 12px; font-size: 13px; font-weight: 800; cursor: pointer; transition: 0.2s; }
        .btn-danger:hover { background: var(--coral); color: #fff; }
      `}</style>
    </DashboardLayout>
  );
}
