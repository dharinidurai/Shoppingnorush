'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, MapPin, Box, X, ChevronRight, ChevronDown, 
  Plus, ShoppingBag, Minus, Navigation, CheckCircle2,
  Clock, Zap, Route, PackageCheck, ArrowRight, Eye,
  Truck, Store, Radio
} from 'lucide-react';
import { Product, Rack } from '../data/mockStore';
import { useStore } from '../context/StoreContext';

// ─── TYPES ───
interface CartItem { product: Product; count: number; }
type ViewTab = 'browse' | 'list' | 'route';

// ─── COMPONENT ───
const StoreMap = () => {
  const { racks } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('');
  const [activeTab, setActiveTab] = useState<ViewTab>('browse');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [collapsedRacks, setCollapsedRacks] = useState<Set<string>>(new Set());
  const [showShoppingMode, setShowShoppingMode] = useState(false);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [takeawayNumber, setTakeawayNumber] = useState<string | null>(null);
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [deliveryData, setDeliveryData] = useState({
    address: '',
    phone: '',
    pincode: '',
    city: ''
  });

  // ─── STORE CONFIG ───
  const rackOrder = ['A1','A2','A3','B1','B2','C1','C2','D1','E1','E2'];
  const departments = ['All', ...new Set(racks.map((r: Rack) => r.department))];
  const deptEmojis: Record<string,string> = { 'All':'🏪', 'Groceries':'🥬', 'Beverages':'☕', 'Personal Care':'🧴', 'Electronics':'🔌', 'Snacks':'🍿' };

  // ─── CART LOGIC ───
  const addToCart = useCallback((product: Product) => {
    if (product.availability === 'Out of Stock') return;
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) return prev.map(i => i.product.id === product.id ? { ...i, count: Math.min(i.count + 1, product.quantity) } : i);
      return [...prev, { product, count: 1 }];
    });
    setActiveTab('browse');
  }, []);

  const updateQty = useCallback((id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.product.id === id) {
        const nc = Math.max(0, Math.min(i.count + delta, i.product.quantity));
        return { ...i, count: nc };
      }
      return i;
    }).filter(i => i.count > 0));
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(i => i.product.id !== id));
  }, []);

  // ─── ROUTE OPTIMIZATION ───
  const optimizedRoute = useMemo(() => {
    const sorted = [...cart].sort((a, b) => rackOrder.indexOf(a.product.rack) - rackOrder.indexOf(b.product.rack));
    // Group by rack
    const groups: { rack: string; items: CartItem[] }[] = [];
    sorted.forEach(item => {
      const last = groups[groups.length - 1];
      if (last && last.rack === item.product.rack) {
        last.items.push(item);
      } else {
        groups.push({ rack: item.product.rack, items: [item] });
      }
    });
    return groups;
  }, [cart]);

  const totalCartValue = useMemo(() => cart.reduce((s, i) => s + i.product.price * i.count, 0), [cart]);
  const totalItems = useMemo(() => cart.reduce((s, i) => s + i.count, 0), [cart]);

  // ─── FILTERED DATA ───
  const allProducts = useMemo(() => {
    const products: Product[] = [];
    racks.forEach((r: Rack) => products.push(...r.products));
    return products;
  }, [racks]);

  const filteredProducts = useMemo(() => {
    let result = allProducts;
    if (selectedDept !== 'All') result = result.filter(p => {
      const rack = racks.find((r: Rack) => r.number === p.rack);
      return rack?.department === selectedDept;
    });
    if (searchTerm) result = result.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return result;
  }, [searchTerm, selectedDept, allProducts]);

  // ─── AVAILABILITY COLORS ───
  const getStatusColor = (s: Product['availability']) => {
    if (s === 'In Stock') return '#0F6E56';
    if (s === 'Low Stock') return '#D85A30';
    return '#888780';
  };

  const getStatusBg = (s: Product['availability']) => {
    if (s === 'In Stock') return '#E1F5EE';
    if (s === 'Low Stock') return '#FEF3E8';
    return '#F1F1F0';
  };

  // ─── NAVIGATION LOGIC ───
  const handleStartShopping = () => {
    setShowShoppingMode(true);
    setShowDeliveryForm(false);
    setTakeawayNumber(null);
    setSelectedMode(null);
  };

  const handleModeSelect = (mode: string) => {
    setSelectedMode(mode);
    if (mode === 'live') {
      setShowShoppingMode(false);
      setActiveTab('list');
    } else if (mode === 'delivery') {
      setShowDeliveryForm(true);
    } else if (mode === 'takeaway') {
      const orderNum = 'TW-' + Math.floor(1000 + Math.random() * 9000);
      setTakeawayNumber(orderNum);
    }
  };

  const markStepDone = () => {
    setCompletedSteps(prev => [...prev, currentStep]);
    if (currentStep < optimizedRoute.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Shopping complete
      setIsNavigating(false);
      setActiveTab('browse');
      setCart([]);
      setCurrentStep(0);
      setCompletedSteps([]);
    }
  };

  // ─── RENDER ───
  return (
    <div className="smap">
      {/* === CART PILL === */}
      {cart.length > 0 && (
        <div className="stats-bar">
          <div className="stat-pill cart-stat" onClick={() => setActiveTab('list')}>
            <ShoppingBag size={16} />
            <span>{totalItems} items · ₹{totalCartValue.toLocaleString()}</span>
          </div>
        </div>
      )}

      {/* === SEARCH === */}
      <div className="search-area">
        <div className="search-input-wrap">
          <Search size={20} className="s-icon" />
          <input
            type="text"
            placeholder="Search any product..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          {searchTerm && <button className="s-clear" onClick={() => setSearchTerm('')}><X size={16} /></button>}
        </div>
      </div>

      {/* === DEPARTMENT FILTERS === */}
      <div className="dept-scroll">
        {departments.filter(d => d !== 'All').map(d => (
          <button
            key={d}
            className={`dept-chip ${selectedDept === d ? 'active' : ''}`}
            onClick={() => setSelectedDept(selectedDept === d ? '' : d)}
          >
            <span className="dept-emoji">{deptEmojis[d] || '📦'}</span>
            {d}
          </button>
        ))}
      </div>

      {/* === TAB NAVIGATION === */}
      {cart.length > 0 && !isNavigating && (
        <div className="tab-bar">
          <button className={`tab ${activeTab === 'browse' ? 'active' : ''}`} onClick={() => setActiveTab('browse')}>
            <Eye size={16} /> Browse Products
          </button>
          <button className={`tab ${activeTab === 'list' ? 'active' : ''}`} onClick={() => setActiveTab('list')}>
            <ShoppingBag size={16} /> My List ({totalItems})
          </button>
          <button className={`tab ${activeTab === 'route' ? 'active' : ''}`} onClick={() => setActiveTab('route')}>
            <Route size={16} /> Route Preview
          </button>
        </div>
      )}

      {/* ══════════════════════════════════════════ */}
      {/* === BROWSE TAB: Rack Selection === */}
      {/* ══════════════════════════════════════════ */}
      {(activeTab === 'browse' || cart.length === 0) && !isNavigating && (() => {
        const filteredRacks = selectedDept ? racks.filter((r: Rack) => r.department === selectedDept) : racks;
        const rackGroups = filteredRacks.map(rack => {
          const matchingProducts = searchTerm
            ? rack.products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
            : rack.products;
          return { rack, products: matchingProducts };
        }).filter(g => searchTerm ? g.products.length > 0 : true);

        const deptGroups: { department: string; racks: typeof rackGroups }[] = [];
        rackGroups.forEach(rg => {
          const existing = deptGroups.find(d => d.department === rg.rack.department);
          if (existing) { existing.racks.push(rg); }
          else { deptGroups.push({ department: rg.rack.department, racks: [rg] }); }
        });

        return (
          <div className="rack-sections">
            <div className="rack-select-header">
              <h3 className="rsh-title">{selectedDept ? `${selectedDept} Racks` : 'All Racks'}</h3>
              <p className="rsh-sub">Tap a rack to browse its products</p>
            </div>

            {deptGroups.map((dg, dgIdx) => (
              <motion.div
                key={dg.department}
                className="dept-group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: dgIdx * 0.08 }}
              >
                <div className="dg-header">
                  <span className="dg-emoji">{deptEmojis[dg.department] || '📦'}</span>
                  <span className="dg-name">{dg.department}</span>
                  <span className="dg-count">{dg.racks.length} rack{dg.racks.length > 1 ? 's' : ''}</span>
                </div>

                <div className="rack-buttons-grid">
                  {dg.racks.map(rg => {
                    const isExpanded = !collapsedRacks.has(rg.rack.id);
                    const inStockCount = rg.rack.products.filter(p => p.availability === 'In Stock').length;
                    const lowStockCount = rg.rack.products.filter(p => p.availability === 'Low Stock').length;
                    const cartItemsInRack = cart.filter(c => c.product.rack === rg.rack.number);

                    return (
                      <div key={rg.rack.id} className={`rack-selector-card ${isExpanded ? 'expanded' : ''}`}>
                        <button
                          className={`rack-btn ${isExpanded ? 'active' : ''}`}
                          onClick={() => setCollapsedRacks(prev => { const next = new Set(prev); if (isExpanded) next.add(rg.rack.id); else next.delete(rg.rack.id); return next; })}
                        >
                          <div className="rb-left">
                            <span className="rb-rack-num">{rg.rack.number}</span>
                            <span className="rb-aisle">Aisle {rg.rack.aisle}</span>
                          </div>
                          <div className="rb-right">
                            <div className="rb-stock-dots">
                              {inStockCount > 0 && <span className="rb-sdot green">{inStockCount}</span>}
                              {lowStockCount > 0 && <span className="rb-sdot orange">{lowStockCount}</span>}
                            </div>
                            {cartItemsInRack.length > 0 && (
                              <span className="rb-cart-badge">{cartItemsInRack.reduce((s, c) => s + c.count, 0)}</span>
                            )}
                            <ChevronDown size={16} className={`rb-chevron ${isExpanded ? 'rotated' : ''}`} />
                          </div>
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              className="rb-products"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                            >
                              <div className="rb-products-inner">
                                {rg.products.map((p, idx) => {
                                  const cartItem = cart.find(i => i.product.id === p.id);
                                  const isOOS = p.availability === 'Out of Stock';
                                  return (
                                    <motion.div
                                      key={p.id}
                                      className={`product-card ${cartItem ? 'in-cart' : ''} ${isOOS ? 'oos' : ''}`}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: idx * 0.04 }}
                                    >
                                      <div className="pc-top">
                                        <div className="pc-emoji">{p.emoji}</div>
                                        <div className="pc-badge" style={{ color: getStatusColor(p.availability), background: getStatusBg(p.availability) }}>
                                          {p.availability}
                                        </div>
                                      </div>
                                      <h4 className="pc-name">{p.name}</h4>
                                      <p className="pc-meta">{p.unit}</p>
                                      <div className="pc-bottom">
                                        <span className="pc-price">₹{p.price}</span>
                                        {isOOS ? (
                                          <span className="oos-label">Unavailable</span>
                                        ) : cartItem ? (
                                          <div className="qty-inline">
                                            <button onClick={() => updateQty(p.id, -1)}><Minus size={12} /></button>
                                            <span>{cartItem.count}</span>
                                            <button onClick={() => updateQty(p.id, 1)}><Plus size={12} /></button>
                                          </div>
                                        ) : (
                                          <button className="add-btn" onClick={() => addToCart(p)}>
                                            <Plus size={14} /> Add
                                          </button>
                                        )}
                                      </div>
                                      {cartItem && <div className="cart-indicator"><CheckCircle2 size={14} /></div>}
                                    </motion.div>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}

            {deptGroups.length === 0 && (
              <div className="empty-state">
                <Search size={48} />
                <h3>No racks found</h3>
                <p>Try a different search term or filter.</p>
              </div>
            )}
          </div>
        );
      })()}

      {/* ══════════════════════════════════════════ */}
      {/* === LIST TAB: Shopping List Review === */}
      {/* ══════════════════════════════════════════ */}
      {activeTab === 'list' && cart.length > 0 && !isNavigating && (
        <div className="list-view">
          <div className="list-summary">
            <div className="ls-left">
              <h3>{totalItems} items</h3>
              <p>from {optimizedRoute.length} racks</p>
            </div>
            <div className="ls-right">
              <span className="ls-total">₹{totalCartValue.toLocaleString()}</span>
            </div>
          </div>

          <div className="list-items">
            {cart.map(item => (
              <div key={item.product.id} className="list-item">
                <span className="li-emoji">{item.product.emoji}</span>
                <div className="li-info">
                  <h5>{item.product.name}</h5>
                  <p>Rack {item.product.rack} · ₹{item.product.price} × {item.count}</p>
                </div>
                <div className="li-actions">
                  <div className="qty-inline dark">
                    <button onClick={() => updateQty(item.product.id, -1)}><Minus size={12} /></button>
                    <span>{item.count}</span>
                    <button onClick={() => updateQty(item.product.id, 1)}><Plus size={12} /></button>
                  </div>
                  <span className="li-sub">₹{(item.product.price * item.count).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>

          <button className="clear-list-btn" onClick={() => { setCart([]); setActiveTab('browse'); }}>
            <X size={16} /> Clear Entire List
          </button>
        </div>
      )}

      {/* ══════════════════════════════════════════ */}
      {/* === ROUTE TAB: Route Preview === */}
      {/* ══════════════════════════════════════════ */}
      {activeTab === 'route' && cart.length > 0 && !isNavigating && (
        <div className="route-preview">
          <div className="route-header">
            <div>
              <h3>Optimized Shopping Route</h3>
              <p>{optimizedRoute.length} stops · Visit each aisle once</p>
            </div>
            <div className="route-stats">
              <div className="rs"><Clock size={14} /> ~{optimizedRoute.length * 2} min</div>
              <div className="rs"><Zap size={14} /> Fastest path</div>
            </div>
          </div>

          <div className="route-timeline">
            <div className="tl-start">
              <div className="tl-dot start"></div>
              <span>Entrance</span>
            </div>

            {optimizedRoute.map((stop, idx) => (
              <div key={stop.rack} className="tl-stop">
                <div className="tl-line"></div>
                <div className="tl-dot"></div>
                <div className="tl-content">
                  <div className="tl-rack">
                    <span className="tl-num">Stop {idx + 1}</span>
                    <h4>Rack {stop.rack}</h4>
                    <span className="tl-dept">{racks.find((r: Rack) => r.number === stop.rack)?.department}</span>
                  </div>
                  <div className="tl-items">
                    {stop.items.map(item => (
                      <div key={item.product.id} className="tl-item">
                        <span>{item.product.emoji}</span>
                        <span>{item.product.name}</span>
                        <span className="tl-qty">×{item.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div className="tl-start">
              <div className="tl-line"></div>
              <div className="tl-dot end"></div>
              <span>Checkout</span>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════ */}
      {/* === BOTTOM ACTION BAR === */}
      {/* ══════════════════════════════════════════ */}
      {cart.length > 0 && !isNavigating && (
        <motion.div
          className="action-bar"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', damping: 20 }}
        >
          <div className="ab-left">
            <ShoppingBag size={20} />
            <div>
              <p className="ab-count">{totalItems} items · {optimizedRoute.length} stops</p>
              <p className="ab-total">₹{totalCartValue.toLocaleString()}</p>
            </div>
          </div>
          {selectedMode === 'live' ? (
            <button className="ab-start" onClick={() => {
              setIsNavigating(true);
              setCurrentStep(0);
              setCompletedSteps([]);
              setActiveTab('route');
            }}>
              <Navigation size={18} />
              Start Navigation
            </button>
          ) : (
            <button className="ab-start" onClick={handleStartShopping}>
              <Navigation size={18} />
              Start Shopping
            </button>
          )}
        </motion.div>
      )}

      {/* ══════════════════════════════════════════ */}
      {/* === SHOPPING MODE SELECTOR === */}
      {/* ══════════════════════════════════════════ */}
      {typeof document !== 'undefined' && createPortal(
      <AnimatePresence>
        {showShoppingMode && (
          <motion.div
            className="mode-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="mode-panel"
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="mode-header">
                <div>
                  <h3 className="mode-title">{showDeliveryForm ? 'Delivery Details' : takeawayNumber ? 'Takeaway Confirmed' : 'How would you like to shop?'}</h3>
                  <p className="mode-sub">{showDeliveryForm ? 'Enter your details for door delivery' : takeawayNumber ? 'Your order is ready for pickup' : 'Choose your preferred shopping experience'}</p>
                </div>
                <button className="mode-close" onClick={() => { setShowShoppingMode(false); setShowDeliveryForm(false); setTakeawayNumber(null); }}>
                  <X size={18} />
                </button>
              </div>

              {showDeliveryForm ? (
                <div className="delivery-form">
                  <input type="text" placeholder="Full Address" value={deliveryData.address} onChange={e => setDeliveryData({...deliveryData, address: e.target.value})} />
                  <input type="text" placeholder="Phone Number" value={deliveryData.phone} onChange={e => setDeliveryData({...deliveryData, phone: e.target.value})} />
                  <div className="df-row">
                    <input type="text" placeholder="PIN Code" value={deliveryData.pincode} onChange={e => setDeliveryData({...deliveryData, pincode: e.target.value})} />
                    <input type="text" placeholder="City" value={deliveryData.city} onChange={e => setDeliveryData({...deliveryData, city: e.target.value})} />
                  </div>
                  <div className="df-actions">
                    <button className="df-back" onClick={() => setShowDeliveryForm(false)}>Back</button>
                    <button className="df-submit" disabled={!deliveryData.address || !deliveryData.phone || !deliveryData.pincode} onClick={() => {
                        alert('Delivery Confirmed!');
                        setShowShoppingMode(false);
                        setShowDeliveryForm(false);
                        setCart([]);
                        setActiveTab('browse');
                    }}>Confirm Delivery</button>
                  </div>
                </div>
              ) : takeawayNumber ? (
                <div className="takeaway-success">
                  <div className="ts-icon"><Store size={40} /></div>
                  <h4>Your Takeaway Order is Confirmed</h4>
                  <div className="ts-number">{takeawayNumber}</div>
                  <p>Please show this number at the store counter to pick up your order.</p>
                  <button className="ts-btn" onClick={() => {
                    setShowShoppingMode(false);
                    setTakeawayNumber(null);
                    setCart([]);
                    setActiveTab('browse');
                  }}>Done</button>
                </div>
              ) : (
                <div className="mode-options">
                <button
                  className={`mode-card ${selectedMode === 'takeaway' ? 'selected' : ''}`}
                  onClick={() => handleModeSelect('takeaway')}
                >
                  <div className="mc-icon takeaway"><Store size={28} /></div>
                  <div className="mc-info">
                    <h4>Takeaway</h4>
                    <p>Pick up your order from the store counter</p>
                  </div>
                  <ChevronRight size={18} className="mc-arrow" />
                </button>

                <button
                  className={`mode-card ${selectedMode === 'delivery' ? 'selected' : ''}`}
                  onClick={() => handleModeSelect('delivery')}
                >
                  <div className="mc-icon delivery"><Truck size={28} /></div>
                  <div className="mc-info">
                    <h4>Door Delivery</h4>
                    <p>Get your order delivered to your doorstep</p>
                  </div>
                  <ChevronRight size={18} className="mc-arrow" />
                </button>

                <button
                  className={`mode-card ${selectedMode === 'live' ? 'selected' : ''}`}
                  onClick={() => handleModeSelect('live')}
                >
                  <div className="mc-icon live"><Radio size={28} /></div>
                  <div className="mc-info">
                    <h4>Live Shopping</h4>
                    <p>Navigate the store with real-time aisle guidance</p>
                  </div>
                  <ChevronRight size={18} className="mc-arrow" />
                </button>
              </div>
              )}

              <div className="mode-footer">
                <div className="mf-summary">
                  <ShoppingBag size={16} />
                  <span>{totalItems} items · ₹{totalCartValue.toLocaleString()}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
      )}

      {/* ══════════════════════════════════════════ */}
      {/* === LIVE NAVIGATION OVERLAY === */}
      {/* ══════════════════════════════════════════ */}
      {typeof document !== 'undefined' && createPortal(
      <AnimatePresence>
        {isNavigating && optimizedRoute.length > 0 && (
          <motion.div
            className="nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="nav-panel">
              {/* Header */}
              <div className="np-header">
                <div className="np-badge">
                  <div className="live-dot"></div> NAVIGATING
                </div>
                <button className="np-close" onClick={() => setIsNavigating(false)}>
                  <X size={18} />
                </button>
              </div>

              {/* Progress */}
              <div className="np-progress">
                {optimizedRoute.map((_, idx) => (
                  <div key={idx} className={`prog-dot ${completedSteps.includes(idx) ? 'done' : ''} ${idx === currentStep ? 'current' : ''}`}></div>
                ))}
              </div>

              {/* Current Stop */}
              {optimizedRoute[currentStep] && (
                <div className="np-current">
                  <p className="np-step">Stop {currentStep + 1} of {optimizedRoute.length}</p>
                  <h2>Rack <span className="rack-hl">{optimizedRoute[currentStep].rack}</span></h2>
                  <p className="np-dept">{racks.find((r: Rack) => r.number === optimizedRoute[currentStep].rack)?.department} Department · Aisle {optimizedRoute[currentStep].rack.charAt(0)}</p>

                  <div className="np-items">
                    {optimizedRoute[currentStep].items.map(item => (
                      <div key={item.product.id} className="np-item">
                        <span className="npi-emoji">{item.product.emoji}</span>
                        <div className="npi-info">
                          <h5>{item.product.name}</h5>
                          <p>₹{item.product.price} × {item.count}</p>
                        </div>
                        <span className="npi-qty">×{item.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="np-actions">
                <button
                  className="npa-back"
                  disabled={currentStep === 0}
                  onClick={() => {
                    setCompletedSteps(prev => prev.filter(s => s !== currentStep - 1));
                    setCurrentStep(prev => prev - 1);
                  }}
                >
                  Back
                </button>
                <button className="npa-next" onClick={markStepDone}>
                  <PackageCheck size={18} />
                  {currentStep === optimizedRoute.length - 1 ? 'Complete & Checkout' : 'Items Collected'}
                </button>
              </div>

              {/* Upcoming */}
              {currentStep < optimizedRoute.length - 1 && (
                <div className="np-upcoming">
                  <p className="np-up-label">Next Stop</p>
                  <div className="np-up-rack">
                    <ArrowRight size={14} />
                    <span>Rack {optimizedRoute[currentStep + 1].rack}</span>
                    <span className="np-up-items">{optimizedRoute[currentStep + 1].items.length} item(s)</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
      )}

      {/* ═══ STYLES ═══ */}
      <style jsx>{`
        .smap { color: var(--ink); position: relative; padding-bottom: 100px; }

        /* STATS BAR */
        .stats-bar { display: flex; gap: 12px; margin-bottom: 28px; flex-wrap: wrap; }
        .stat-pill { display: flex; align-items: center; gap: 8px; padding: 8px 16px; background: #fff; border: 1px solid var(--border); border-radius: 100px; font-size: 12px; font-weight: 700; color: var(--ink2); }
        .stat-pill.live { background: #E1F5EE; color: #0F6E56; border-color: #0F6E56; }
        .stat-pill.cart-stat { background: #064e3b; color: #fff; border-color: #064e3b; cursor: pointer; }
        .live-dot { width: 6px; height: 6px; background: #4ADE80; border-radius: 50%; animation: pulse-glow 2s infinite; }
        @keyframes pulse-glow { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.5); } }

        /* SEARCH */
        .search-area { margin-bottom: 20px; }
        .search-input-wrap { display: flex; align-items: center; gap: 14px; background: #fff; padding: 16px 24px; border-radius: 18px; border: 1.5px solid var(--border); transition: 0.2s; }
        .search-input-wrap:focus-within { border-color: var(--accent); box-shadow: 0 0 0 4px rgba(15,110,86,0.08); }
        .search-input-wrap input { flex: 1; border: none; outline: none; background: none; font-family: inherit; font-size: 15px; }
        .s-icon { color: var(--ink3); flex-shrink: 0; }
        .s-clear { background: none; border: none; cursor: pointer; color: var(--ink3); }

        /* DEPARTMENTS */
        .dept-scroll { display: flex; gap: 10px; overflow-x: auto; padding-bottom: 8px; margin-bottom: 20px; scrollbar-width: none; }
        .dept-scroll::-webkit-scrollbar { display: none; }
        .dept-chip { display: flex; align-items: center; gap: 8px; padding: 10px 20px; border-radius: 100px; border: 1.5px solid var(--border); background: #fff; font-family: inherit; font-size: 13px; font-weight: 700; cursor: pointer; white-space: nowrap; transition: 0.2s; }
        .dept-chip:hover { border-color: var(--accent); }
        .dept-chip.active { background: var(--accent); color: #fff; border-color: var(--accent); }
        .dept-emoji { font-size: 16px; }

        /* TAB BAR */
        .tab-bar { display: flex; gap: 4px; background: #fff; padding: 4px; border-radius: 16px; border: 1px solid var(--border); margin-bottom: 28px; }
        .tab { flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; border: none; border-radius: 12px; background: none; font-family: inherit; font-size: 13px; font-weight: 700; cursor: pointer; color: var(--ink3); transition: 0.2s; }
        .tab:hover { background: var(--bg); color: var(--ink); }
        .tab.active { background: var(--accent); color: #fff; box-shadow: 0 4px 12px rgba(15,110,86,0.2); }

        /* RACK SECTIONS */
        .rack-sections { display: flex; flex-direction: column; gap: 24px; }

        .rack-select-header { margin-bottom: 4px; }
        .rsh-title { font-size: 20px; font-weight: 800; letter-spacing: -0.5px; color: var(--ink); }
        .rsh-sub { font-size: 13px; color: var(--ink3); margin-top: 4px; }

        /* DEPARTMENT GROUP */
        .dept-group { }

        /* DEPARTMENT PROMPT */
        .select-dept-prompt { text-align: center; padding: 60px 20px; }
        .sdp-icon { font-size: 56px; margin-bottom: 16px; }
        .select-dept-prompt h3 { font-size: 20px; font-weight: 800; color: var(--ink); letter-spacing: -0.5px; margin-bottom: 8px; }
        .select-dept-prompt p { font-size: 14px; color: var(--ink3); }
        .dg-header { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; padding: 0 4px; }
        .dg-emoji { font-size: 20px; }
        .dg-name { font-size: 15px; font-weight: 800; color: var(--ink); letter-spacing: -0.3px; }
        .dg-count { font-size: 11px; font-weight: 700; color: var(--ink3); background: var(--bg3); padding: 3px 10px; border-radius: 100px; }

        .rack-buttons-grid { display: flex; flex-direction: column; gap: 10px; }

        /* RACK SELECTOR CARD */
        .rack-selector-card {
          background: #fff;
          border: 1.5px solid var(--border);
          border-radius: 18px;
          overflow: hidden;
          transition: all 0.25s cubic-bezier(0.4,0,0.2,1);
        }
        .rack-selector-card:hover { border-color: rgba(15,110,86,0.25); box-shadow: 0 4px 16px rgba(0,0,0,0.04); }
        .rack-selector-card.expanded { border-color: var(--accent); box-shadow: 0 8px 32px rgba(15,110,86,0.08); }

        .rack-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 22px;
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
          transition: background 0.2s;
        }
        .rack-btn:hover { background: rgba(15,110,86,0.02); }
        .rack-btn.active { background: var(--accent3); }

        .rb-left { display: flex; align-items: center; gap: 14px; }
        .rb-rack-num { font-size: 22px; font-weight: 800; color: var(--ink); letter-spacing: -0.5px; background: var(--bg3); width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; }
        .rack-btn.active .rb-rack-num { background: var(--accent); color: #fff; }
        .rb-aisle { font-size: 13px; font-weight: 700; color: var(--ink2); }

        .rb-right { display: flex; align-items: center; gap: 12px; }
        .rb-stock-dots { display: flex; gap: 6px; }
        .rb-sdot { font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 100px; }
        .rb-sdot.green { background: #E1F5EE; color: #0F6E56; }
        .rb-sdot.orange { background: #FEF3E8; color: #D85A30; }
        .rb-cart-badge { font-size: 10px; font-weight: 800; background: var(--accent); color: #fff; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .rb-chevron { color: var(--ink3); transition: transform 0.3s cubic-bezier(0.4,0,0.2,1); }
        .rb-chevron.rotated { transform: rotate(180deg); }

        .rb-products { overflow: hidden; }
        .rb-products-inner {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 16px;
          padding: 4px 20px 20px;
          border-top: 1px solid var(--border);
        }

        /* PRODUCT GRID (kept for reference if needed) */
        .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }

        .product-card {
          background: #fff;
          border: 1.5px solid var(--border);
          border-radius: 20px;
          padding: 20px;
          transition: all 0.25s cubic-bezier(0.4,0,0.2,1);
          position: relative;
          cursor: default;
        }
        .product-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.06); border-color: rgba(15,110,86,0.3); }
        .product-card.in-cart { border-color: var(--accent); background: #FAFFFE; }
        .product-card.oos { opacity: 0.5; }

        .pc-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; }
        .pc-emoji { font-size: 32px; }
        .pc-badge { font-size: 9px; font-weight: 800; padding: 3px 10px; border-radius: 100px; text-transform: uppercase; letter-spacing: 0.5px; }

        .pc-name { font-size: 14px; font-weight: 800; color: var(--ink); margin-bottom: 4px; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .pc-meta { font-size: 11px; color: var(--ink3); font-weight: 600; margin-bottom: 16px; }

        .pc-bottom { display: flex; justify-content: space-between; align-items: center; }
        .pc-price { font-size: 18px; font-weight: 800; color: var(--ink); }
        .oos-label { font-size: 11px; font-weight: 700; color: var(--ink3); }

        .cart-indicator { position: absolute; top: 12px; right: 12px; color: var(--accent); }

        /* QTY INLINE */
        .qty-inline { display: flex; align-items: center; gap: 0; background: #E1F5EE; border-radius: 10px; border: 1px solid var(--accent); overflow: hidden; }
        .qty-inline button { width: 28px; height: 28px; border: none; background: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--accent); transition: 0.15s; }
        .qty-inline button:hover { background: var(--accent); color: #fff; }
        .qty-inline span { min-width: 24px; text-align: center; font-size: 13px; font-weight: 800; color: var(--accent); }
        .qty-inline.dark { background: #064e3b; border-color: #064e3b; }
        .qty-inline.dark button { color: #4ADE80; }
        .qty-inline.dark button:hover { background: rgba(255,255,255,0.1); color: #fff; }
        .qty-inline.dark span { color: #fff; }

        .add-btn { display: flex; align-items: center; gap: 6px; background: var(--accent); color: #fff; border: none; padding: 7px 16px; border-radius: 10px; font-size: 12px; font-weight: 800; cursor: pointer; transition: 0.2s; }
        .add-btn:hover { background: #085041; transform: scale(1.02); }

        .empty-state { grid-column: 1 / -1; text-align: center; padding: 80px 20px; color: var(--ink3); }
        .empty-state h3 { font-size: 20px; margin: 16px 0 6px; color: var(--ink); }

        /* LIST VIEW */
        .list-view { display: flex; flex-direction: column; gap: 16px; }
        .list-summary { display: flex; justify-content: space-between; align-items: center; background: #064e3b; color: #fff; padding: 24px 28px; border-radius: 20px; }
        .ls-left h3 { font-size: 22px; font-weight: 800; }
        .ls-left p { font-size: 13px; opacity: 0.7; margin-top: 2px; }
        .ls-total { font-size: 28px; font-weight: 800; }

        .list-items { display: flex; flex-direction: column; gap: 8px; }
        .list-item { display: flex; align-items: center; gap: 16px; background: #fff; border: 1px solid var(--border); padding: 16px 20px; border-radius: 16px; transition: 0.2s; }
        .list-item:hover { border-color: var(--accent); }
        .li-emoji { font-size: 28px; }
        .li-info { flex: 1; }
        .li-info h5 { font-size: 15px; font-weight: 800; }
        .li-info p { font-size: 12px; color: var(--ink3); margin-top: 2px; }
        .li-actions { display: flex; align-items: center; gap: 16px; }
        .li-sub { font-size: 15px; font-weight: 800; color: var(--ink); min-width: 60px; text-align: right; }
        .clear-list-btn { display: flex; align-items: center; justify-content: center; gap: 8px; background: none; border: 1.5px solid var(--coral); color: var(--coral); padding: 12px; border-radius: 14px; font-size: 14px; font-weight: 700; cursor: pointer; margin-top: 8px; transition: 0.2s; }
        .clear-list-btn:hover { background: var(--coral); color: #fff; }

        /* ROUTE PREVIEW */
        .route-preview { display: flex; flex-direction: column; gap: 24px; }
        .route-header { display: flex; justify-content: space-between; align-items: flex-start; }
        .route-header h3 { font-size: 20px; font-weight: 800; }
        .route-header p { font-size: 13px; color: var(--ink3); margin-top: 4px; }
        .route-stats { display: flex; gap: 16px; }
        .rs { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; color: var(--accent); background: #E1F5EE; padding: 6px 12px; border-radius: 8px; }

        .route-timeline { position: relative; padding-left: 32px; }
        .tl-start { display: flex; align-items: center; gap: 14px; padding: 12px 0; font-size: 13px; font-weight: 700; color: var(--ink3); position: relative; }
        .tl-dot { width: 12px; height: 12px; border-radius: 50%; background: var(--border); border: 2px solid #fff; box-shadow: 0 0 0 2px var(--border); position: absolute; left: -38px; }
        .tl-dot.start { background: var(--accent); box-shadow: 0 0 0 2px var(--accent); }
        .tl-dot.end { background: var(--coral); box-shadow: 0 0 0 2px var(--coral); }
        .tl-line { position: absolute; left: -33px; top: -24px; width: 2px; height: 24px; background: var(--border); }

        .tl-stop { position: relative; padding: 16px 0; }
        .tl-stop .tl-line { top: 0; height: 100%; }
        .tl-content { background: #fff; border: 1px solid var(--border); border-radius: 18px; padding: 20px; margin-left: 8px; }
        .tl-rack { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; flex-wrap: wrap; }
        .tl-num { font-size: 10px; font-weight: 800; color: var(--ink3); text-transform: uppercase; letter-spacing: 1px; }
        .tl-rack h4 { font-size: 18px; font-weight: 800; }
        .tl-dept { font-size: 11px; font-weight: 700; color: var(--accent); background: #E1F5EE; padding: 3px 10px; border-radius: 100px; }
        .tl-items { display: flex; flex-direction: column; gap: 8px; }
        .tl-item { display: flex; align-items: center; gap: 10px; font-size: 13px; font-weight: 600; color: var(--ink2); padding: 6px 10px; background: var(--bg); border-radius: 10px; }
        .tl-qty { margin-left: auto; font-weight: 800; color: var(--accent); }

        /* ACTION BAR */
        .action-bar { position: fixed; bottom: 0; left: 260px; right: 0; background: #064e3b; color: #fff; padding: 16px 40px; display: flex; align-items: center; justify-content: space-between; z-index: 200; border-top: 1px solid rgba(255,255,255,0.1); }
        .ab-left { display: flex; align-items: center; gap: 16px; }
        .ab-count { font-size: 13px; font-weight: 600; opacity: 0.8; }
        .ab-total { font-size: 20px; font-weight: 800; }
        .ab-start { display: flex; align-items: center; gap: 10px; background: #10b981; color: #fff; border: none; padding: 14px 32px; border-radius: 14px; font-size: 15px; font-weight: 800; cursor: pointer; transition: 0.2s; box-shadow: 0 4px 16px rgba(16,185,129,0.3); }
        .ab-start:hover { background: #059669; transform: scale(1.02); }

        @media (max-width: 900px) {
          .action-bar { left: 80px; padding: 16px 20px; }
        }

        @media (max-width: 768px) {
          .smap { padding-bottom: 120px; }

          .search-input-wrap { padding: 12px 16px; border-radius: 14px; }
          .search-input-wrap input { font-size: 14px; }

          .dept-scroll { gap: 8px; margin-bottom: 16px; }
          .dept-chip { padding: 8px 14px; font-size: 12px; }

          .tab-bar { flex-wrap: wrap; }
          .tab { font-size: 12px; padding: 10px 8px; }

          .rack-select-header { margin-bottom: 0; }
          .rsh-title { font-size: 18px; }

          .dg-header { margin-bottom: 10px; }
          .dg-name { font-size: 14px; }

          .rack-btn { padding: 14px 16px; }
          .rb-rack-num { width: 40px; height: 40px; font-size: 18px; border-radius: 12px; }
          .rb-aisle { font-size: 12px; }

          .rb-products-inner {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 12px;
            padding: 4px 14px 14px;
          }

          .product-card { padding: 14px; border-radius: 16px; }
          .pc-emoji { font-size: 26px; }
          .pc-name { font-size: 13px; }
          .pc-price { font-size: 15px; }
          .pc-badge { font-size: 8px; }

          .action-bar { left: 0; padding: 14px 16px; bottom: 70px; border-radius: 20px 20px 0 0; }
          .ab-start { padding: 10px 16px; font-size: 13px; }

          .list-item { padding: 14px; }
          .li-emoji { font-size: 24px; }

          .select-dept-prompt { padding: 40px 16px; }
          .sdp-icon { font-size: 44px; }
          .select-dept-prompt h3 { font-size: 18px; }

          /* ROUTE VIEW */
          .route-preview { gap: 16px; }
        }

        @media (max-width: 480px) {
          .rb-products-inner {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            padding: 4px 10px 10px;
          }
          .product-card { padding: 12px; }
          .pc-emoji { font-size: 22px; }
          .pc-name { font-size: 12px; }
          .qty-inline button { width: 22px; height: 22px; }
          .add-btn { font-size: 11px; padding: 5px 10px; }
        }
      `}</style>
    </div>
  );
};

export default StoreMap;
