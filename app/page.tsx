"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main>
      {/* HERO */}
      <section className="hero" style={{ paddingTop: '80px' }}>
        <div className="hero-text">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Now Live · India's Fastest Retail Checkout
          </div>
          <h1>Pay in the<br /><em>blink</em> of an<br />eye. NoRush.</h1>
          <p className="hero-sub">Skip every queue. Scan, tap, and walk out. NoRush Pay combines UPI, biometrics, and AI into the world's most frictionless in-store payment experience.</p>

          <div className="hero-trust">
            <div className="trust-avatars">
              <span>AK</span><span>SR</span><span>MV</span><span>PL</span><span>+9</span>
            </div>
            <div className="trust-text"><strong>2,400+ stores</strong> already onboarded</div>
          </div>
        </div>
        <div className="phone-wrap">
          <div className="phone-glow"></div>

          {/* Floating badges */}
          <motion.div 
            className="float-badge fb1"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="fb-label">Transaction speed</div>
            <div className="fb-val" style={{ color: "var(--accent)" }}>0.8s</div>
            <div className="fb-sub">avg checkout time</div>
          </motion.div>
          
          <motion.div 
            className="float-badge fb2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <div className="fb-row">
              <div className="fb-icon">🔒</div>
              <div>
                <div className="fb-label">Security</div>
                <div className="fb-val">PCI-DSS</div>
                <div className="fb-sub" style={{ color: "var(--accent)" }}>Compliant</div>
              </div>
            </div>
          </motion.div>

          <div className="phone">
            <div className="phone-notch"></div>
            <div className="phone-screen">
              <div className="phone-header">
                <span>NoRush Pay</span>
                <span style={{ color: "var(--accent)", fontSize: "11px" }}>● Live</span>
              </div>

              {/* AUTH INSIDE PHONE */}
              <div className="phone-auth">
                <div className="pa-logo">
                  <div className="pa-logo-mark">
                    <svg viewBox="0 0 24 24"><path d="M12 4v8l4 4M5 12a7 7 0 1 0 14 0 7 7 0 0 0-14 0" /></svg>
                  </div>
                </div>
                <h3 className="pa-title">Welcome to<br />NoRush Pay</h3>
                <p className="pa-sub">India's fastest retail checkout experience</p>
                
                <button className="pa-btn pa-login" onClick={() => router.push('/login')}>
                  Login
                </button>
                <button className="pa-btn pa-signup" onClick={() => router.push('/login')}>
                  Create Account
                </button>

                <div className="pa-divider">
                  <span>Trusted by 2,400+ stores</span>
                </div>

                <div className="pa-features">
                  <div className="pa-feat">🔒 256-bit</div>
                  <div className="pa-feat">⚡ 0.8s</div>
                  <div className="pa-feat">🇮🇳 UPI</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-strip">
        <div><div className="stat-val">0.8<span>s</span></div><div className="stat-label">Avg checkout time</div></div>
        <div><div className="stat-val">₹2<span>Cr+</span></div><div className="stat-label">Daily transactions</div></div>
        <div><div className="stat-val">99.9<span>%</span></div><div className="stat-label">Payment success rate</div></div>
        <div><div className="stat-val">256<span>-bit</span></div><div className="stat-label">End-to-end encryption</div></div>
      </div>

      {/* FEATURES */}
      <div style={{ background: "var(--bg)" }}>
        <section className="section">
          <div className="section-tag">Core Features</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", alignItems: "start" }}>
            <div>
              <h2 className="section-title">Everything retail<br />payments need.</h2>
            </div>
            <div>
              <p className="section-sub">From AI-powered cart prediction to walk-and-pay checkout, NoRush Pay is the only payment platform built specifically for physical retail.</p>
            </div>
          </div>
          <div className="features-grid">
            <FeatureCard icon="⚡" title="One-tap Payment" desc="Biometric-authenticated instant checkout. No PIN, no OTP friction. Just pay and walk." />
            <FeatureCard icon="🧠" title="AI Bill Prediction" desc="Smart combo suggestions, personalized offers, and dynamic pricing in real-time." />
            <FeatureCard icon="📱" title="UPI Native" desc="Google Pay, PhonePe, Paytm, and BHIM integrations with sub-second settlement." />
            <FeatureCard icon="🔐" title="Tokenized Security" desc="PCI-DSS compliant tokenization. Card data never stored on device or our servers." />
            <FeatureCard icon="📍" title="Smart Store Mapping" desc="Live rack navigation. Find any product instantly with aisle-accurate GPS and real-time inventory sync." />
            <FeatureCard icon="🎁" title="Loyalty & Cashback" desc="Automatic reward detection and application. NoRush points on every purchase." />
          </div>
        </section>
      </div>

      {/* PAYMENT FLOW */}
      <section className="flow-section">
        <div className="flow-inner">
          <div style={{ display: "inline-block", background: "rgba(29,158,117,.15)", color: "var(--accent2)", fontSize: "11px", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", padding: "6px 14px", borderRadius: "100px", marginBottom: "16px" }}>Checkout Flow</div>
          <h2 className="flow-title">4 screens.<br />One seamless exit.</h2>
          <p className="flow-sub">The complete NoRush Pay journey — from cart to door, under 5 seconds.</p>
          <div className="flow-steps">
            <FlowStep num="STEP 01" icon="🛒" title="Cart Summary" desc="Auto-generated from QR scans. Shows items, GST, subtotal, cashback and final total." arrow />
            <FlowStep num="STEP 02" icon="💳" title="Payment Method" desc="Choose UPI, Card, NoRush Wallet, or QR Pay. Saved methods surface automatically." arrow />
            <FlowStep num="STEP 03" icon="🔒" title="Auth & Processing" desc="Biometric confirmation, tokenized payment dispatch, real-time gateway processing." arrow />
            <FlowStep num="STEP 04" icon="🎉" title="Digital Receipt" desc="Instant receipt with QR verification code, transaction ID, and loyalty update." />
          </div>
        </div>
      </section>

      {/* PAYMENT METHODS */}
      <section className="methods-section">
        <div className="methods-inner">
          <div className="section-tag">Payment Methods</div>
          <h2 className="section-title">Every way Indians pay.<br />Supported natively.</h2>
          <div className="methods-grid">
            <MethodCard icon="⟁" iconClass="mi-blue" title="UPI Payments" desc="Native integration with Google Pay, PhonePe, Paytm & all BHIM-compatible apps. Real-time NPCI rails with T+0 settlement." badge="NPCI Certified" />
            <MethodCard icon="▬" iconClass="mi-amber" title="Debit & Credit Cards" desc="Visa, Mastercard, RuPay. Tokenized card-on-file for one-tap recurring payments. 3D Secure 2.0 compliant." badge="PCI-DSS Level 1" />
            <MethodCard icon="◈" iconClass="mi-green" title="NoRush Wallet" desc="Pre-loaded in-app wallet with instant top-up via UPI. Earns 2x loyalty points. Works offline for small transactions." badge="RBI Compliant" />
            <MethodCard icon="◫" iconClass="mi-ink" title="QR Exit Pay" desc="Scan QR at exit gate. Full cart auto-imported. Single tap confirmation. Walk-and-pay flow — no cashier needed." badge="Walk & Pay™" />
          </div>
        </div>
      </section>

      {/* ARCHITECTURE / API */}
      <section className="arch-section">
        <div className="arch-inner">
          <div style={{ display: "inline-block", background: "rgba(29,158,117,.15)", color: "var(--accent2)", fontSize: "11px", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", padding: "6px 14px", borderRadius: "100px", marginBottom: "16px" }}>Developer API</div>
          <h2 className="arch-title">Built for scale.<br />Designed for speed.</h2>
          <p className="arch-sub">RESTful payment APIs, webhook support, and UPI gateway integration out of the box.</p>
          <div className="arch-grid">
            <div className="arch-card">
              <h4>Payment Initiation</h4>
              <div className="code-block">
                <span className="key">POST</span> <span className="str">/api/v2/payments/initiate</span><br /><br />{"{"}<br />
                &nbsp;&nbsp;<span className="key">"order_id"</span>: <span className="str">"ORD_2024_9821"</span>,<br />
                &nbsp;&nbsp;<span className="key">"amount"</span>: <span className="num">921.88</span>,<br />
                &nbsp;&nbsp;<span className="key">"currency"</span>: <span className="str">"INR"</span>,<br />
                &nbsp;&nbsp;<span className="key">"method"</span>: <span className="str">"UPI"</span>,<br />
                &nbsp;&nbsp;<span className="key">"vpa"</span>: <span className="str">"user@oksbi"</span>,<br />
                &nbsp;&nbsp;<span className="key">"store_id"</span>: <span className="str">"STR_0042"</span>,<br />
                &nbsp;&nbsp;<span className="key">"biometric"</span>: <span className="val">true</span>,<br />
                &nbsp;&nbsp;<span className="key">"token"</span>: <span className="str">"tok_live_x9Kz..."</span><br />
                {"}"}
              </div>
            </div>
            <div className="arch-card">
              <h4>Transaction Schema</h4>
              <div className="code-block">
                <span className="key">transactions</span> {"{"}<br />
                &nbsp;&nbsp;<span className="key">id</span>: <span className="str">UUID</span>,<br />
                &nbsp;&nbsp;<span className="key">order_id</span>: <span className="str">VARCHAR(32)</span>,<br />
                &nbsp;&nbsp;<span className="key">user_id</span>: <span className="str">UUID</span>,<br />
                &nbsp;&nbsp;<span className="key">store_id</span>: <span className="str">VARCHAR(16)</span>,<br />
                &nbsp;&nbsp;<span className="key">amount</span>: <span className="str">DECIMAL(10,2)</span>,<br />
                &nbsp;&nbsp;<span className="key">gst</span>: <span className="str">DECIMAL(10,2)</span>,<br />
                &nbsp;&nbsp;<span className="key">method</span>: <span className="str">ENUM(UPI,CARD,WALLET,QR)</span>,<br />
                &nbsp;&nbsp;<span className="key">status</span>: <span className="str">ENUM(INIT,PROC,SUCCESS,FAIL)</span>,<br />
                &nbsp;&nbsp;<span className="key">gateway_ref</span>: <span className="str">VARCHAR(64)</span>,<br />
                &nbsp;&nbsp;<span className="key">created_at</span>: <span className="str">TIMESTAMP</span><br />
                {"}"}
              </div>
            </div>
            <div className="arch-card">
              <h4>Webhook Event</h4>
              <div className="code-block">
                <span className="key">POST</span> <span className="str">/webhooks/payment</span><br /><br />{"{"}<br />
                &nbsp;&nbsp;<span className="key">"event"</span>: <span className="str">"payment.success"</span>,<br />
                &nbsp;&nbsp;<span className="key">"txn_id"</span>: <span className="str">"TXN_9F2K8X"</span>,<br />
                &nbsp;&nbsp;<span className="key">"gateway_ref"</span>: <span className="str">"NPCI_UPI_98X1"</span>,<br />
                &nbsp;&nbsp;<span className="key">"amount"</span>: <span className="num">921.88</span>,<br />
                &nbsp;&nbsp;<span className="key">"settled"</span>: <span className="val">true</span>,<br />
                &nbsp;&nbsp;<span className="key">"cashback"</span>: <span className="num">41.00</span>,<br />
                &nbsp;&nbsp;<span className="key">"stock_sync"</span>: <span className="val">true</span>,<br />
                &nbsp;&nbsp;<span className="key">"receipt_url"</span>: <span className="str">"https://norush.pay/r/..."</span><br />
                {"}"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <div style={{ background: "var(--bg)" }}>
        <section className="section innov-section">
          <div className="innov-inner">
            <div className="section-tag">Future Roadmap</div>
            <h2 className="section-title">What comes next.</h2>
            <div className="innov-grid">
              <InnovCard emoji="🚶" title="Walk & Pay™" desc="BLE beacons at store exit auto-detect your cart and charge NoRush Wallet the moment you walk through the door — zero interaction checkout." tag="Q2 2025" />
              <InnovCard emoji="🎙️" title="Voice Pay" desc="Say 'Pay now' to confirm checkout. Natural language understands split requests, tip amounts, and preferred payment method switches." tag="Q3 2025" />
              <InnovCard emoji="🕶️" title="AR Checkout Button" desc="Point your camera at the exit gate to see a floating AR 'Pay & Go' button overlay — tap it to confirm payment via spatial UI." tag="Q4 2025" />
              <InnovCard emoji="⛓️" title="Blockchain Receipt" desc="Immutable payment proof anchored on-chain. Every receipt is verifiable, tamper-proof, and shareable with a QR code for warranty claims." tag="2026" />
            </div>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer>
        <div className="logo" style={{ color: "#fff" }}>
          <div className="logo-mark">
            <svg viewBox="0 0 24 24"><path d="M12 4v8l4 4M5 12a7 7 0 1 0 14 0 7 7 0 0 0-14 0" /></svg>
          </div>
          NoRush Pay
        </div>
        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">API Docs</a>
          <a href="#">Support</a>
          <a href="#">Careers</a>
        </div>
        <div className="footer-copy">© 2025 NoRush Technologies Pvt Ltd · Made in India 🇮🇳</div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, desc }: { icon: string, title: string, desc: string }) {
  return (
    <div className="feat-card">
      <div className="feat-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

function FlowStep({ num, icon, title, desc, arrow }: { num: string, icon: string, title: string, desc: string, arrow?: boolean }) {
  return (
    <div className="flow-step">
      <div className="step-num">{num}</div>
      <div className="step-icon">{icon}</div>
      <h4>{title}</h4>
      <p>{desc}</p>
      {arrow && <div className="flow-arrow"></div>}
    </div>
  );
}

function MethodCard({ icon, iconClass, title, desc, badge }: { icon: string, iconClass: string, title: string, desc: string, badge: string }) {
  return (
    <div className="method-card">
      <div className={`method-icon-wrap ${iconClass}`}>{icon}</div>
      <div>
        <h4>{title}</h4>
        <p>{desc}</p>
        <span className="method-badge">{badge}</span>
      </div>
    </div>
  );
}

function InnovCard({ emoji, title, desc, tag }: { emoji: string, title: string, desc: string, tag: string }) {
  return (
    <div className="innov-card">
      <div className="innov-accent"></div>
      <div className="innov-content">
        <span className="innov-emoji">{emoji}</span>
        <h4>{title}</h4>
        <p>{desc}</p>
        <span className="innov-tag">{tag}</span>
      </div>
    </div>
  );
}
