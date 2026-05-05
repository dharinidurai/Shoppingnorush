'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<'email' | 'phone'>('email');
  const [nfcStatus, setNfcStatus] = useState<'idle' | 'scanning' | 'complete'>('idle');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginRole, setLoginRole] = useState<'user' | 'admin'>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    setError('');
    setIsLoggingIn(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Check if role matches selected role (optional security check)
      if (data.user.role !== loginRole) {
        console.warn(`User is logged in as ${data.user.role}, but selected role was ${loginRole}`);
      }

      router.push(data.user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err: any) {
      setError(err.message);
      setIsLoggingIn(false);
    }
  };

  const handleNfcLogin = async () => {
    setNfcStatus('scanning');
    setError('');

    // Simulate NFC tap - in a real app this would interface with WebNFC or a hardware listener
    setTimeout(async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/nfc-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nfcToken: loginRole === 'admin' ? 'ADMIN_NFC_001' : 'USER_NFC_001' }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'NFC recognition failed');
        }

        setNfcStatus('complete');
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        setTimeout(() => {
          router.push(data.user.role === 'admin' ? '/admin' : '/dashboard');
        }, 1000);
      } catch (err: any) {
        setError(err.message);
        setNfcStatus('idle');
      }
    }, 2000);
  };

  return (
    <main>
      <nav>
        <div className="logo" onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>
          <div className="logo-mark">
            <svg viewBox="0 0 24 24"><path d="M12 4v8l4 4M5 12a7 7 0 1 0 14 0 7 7 0 0 0-14 0" /></svg>
          </div>
          NoRush Pay
        </div>
        <div className="nav-right">
          <button className="btn-ghost" onClick={() => router.push('/')}>← Back to Home</button>
        </div>
      </nav>

      <section className="login-section" style={{ paddingTop: '120px' }}>
        <div className="login-inner">
          <div className="login-card">
            <h3>Sign in to NoRush Pay</h3>
            <p className="sub">Access your smart wallet and payment history.</p>

            {error && (
              <div className="error-alert" style={{ 
                background: 'rgba(255, 0, 0, 0.1)', 
                color: 'red', 
                padding: '12px', 
                borderRadius: '8px', 
                marginBottom: '16px',
                fontSize: '14px',
                border: '1px solid rgba(255, 0, 0, 0.2)'
              }}>
                {error}
              </div>
            )}

            {/* ROLE SELECTOR */}
            <div className="role-selector">
              <button
                className={`role-btn ${loginRole === 'user' ? 'active' : ''}`}
                onClick={() => setLoginRole('user')}
              >
                <span className="role-icon">👤</span>
                <span className="role-label">User</span>
                <span className="role-desc">Shopping & Payments</span>
              </button>
              <button
                className={`role-btn ${loginRole === 'admin' ? 'active' : ''}`}
                onClick={() => setLoginRole('admin')}
              >
                <span className="role-icon">🛡️</span>
                <span className="role-label">Admin</span>
                <span className="role-desc">Store Management</span>
              </button>
            </div>

            <div className="tabs">
              <button
                className={`tab ${activeTab === 'email' ? 'active' : ''}`}
                onClick={() => setActiveTab('email')}
              >
                Email
              </button>
              <button
                className={`tab ${activeTab === 'phone' ? 'active' : ''}`}
                onClick={() => setActiveTab('phone')}
              >
                Phone / UPI
              </button>
            </div>

            {activeTab === 'email' ? (
              <div id="tab-email">
                <div className="input-group">
                  <label>Email address</label>
                  <input 
                    className="inp" 
                    type="email" 
                    placeholder="you@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-group">
                  <label>Password</label>
                  <input 
                    className="inp" 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <div id="tab-phone">
                <div className="input-group">
                  <label>Mobile number / UPI ID</label>
                  <input className="inp" type="tel" placeholder="+91 98765 43210 or name@upi" />
                </div>
                <div className="input-group">
                  <label>OTP will be sent via SMS</label>
                  <input className="inp" type="text" placeholder="Enter 6-digit OTP" maxLength={6} />
                </div>
              </div>
            )}

            <div className="divider">or sign in with</div>

            <button className="nfc-btn" onClick={handleNfcLogin}>
              <div className="nfc-icon">
                {nfcStatus === 'complete' ? (
                  <span>✓</span>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round">
                    {nfcStatus === 'idle' ? (
                      <path d="M6 12a6 6 0 0 1 12 0M4 12a8 8 0 0 1 16 0M2 12a10 10 0 0 1 20 0" />
                    ) : (
                      <>
                        <circle cx="12" cy="12" r="3" />
                        <path d="M6 12a6 6 0 0 1 12 0M4 12a8 8 0 0 1 16 0" />
                      </>
                    )}
                  </svg>
                )}
              </div>
              {nfcStatus === 'idle' && 'Tap NFC Card / Device to Login'}
              {nfcStatus === 'scanning' && 'Scanning NFC... Hold device near reader'}
              {nfcStatus === 'complete' && 'NFC Device Recognized — Auth Complete'}
            </button>

            <button className="btn-full g" onClick={handleLogin}>
              {isLoggingIn ? 'Logging you in safely...' : 'Continue →'}
            </button>
            <p style={{ fontSize: '12px', color: 'var(--ink3)', textAlign: 'center', marginTop: '16px' }}>
              By continuing you agree to our <a href="#" style={{ color: 'var(--accent)' }}>Terms</a> & <a href="#" style={{ color: 'var(--accent)' }}>Privacy Policy</a>
            </p>
          </div>

          <div className="login-info">
            <h3>Secure. Instant.<br />Always NoRush.</h3>
            <p>Your account is protected by biometric authentication, end-to-end encryption, and real-time fraud detection — so you can pay without slowing down.</p>
            <div className="security-chips">
              {['256-bit Encryption', 'Biometric Auth', 'PCI-DSS Level 1', 'NPCI Certified', 'RBI Compliant', 'OTP Verification', 'NFC Token Login', 'Zero Card Storage'].map(chip => (
                <div key={chip} className="chip">{chip}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
