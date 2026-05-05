'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { useStore } from '@/context/StoreContext';
import { Product } from '@/data/mockStore';
import { 
  Plus, Minus, Trash2, Package, Search, Edit3, 
  Save, X, Box, AlertTriangle, CheckCircle2, 
  ArrowUpDown, BarChart3
} from 'lucide-react';

type AdminTab = 'products' | 'stock' | 'racks';

interface NewProductForm {
  name: string;
  category: string;
  rack: string;
  price: number;
  unit: string;
  emoji: string;
  quantity: number;
}

const emptyProduct: NewProductForm = {
  name: '', category: '', rack: '', price: 0, unit: 'pkt', emoji: '📦', quantity: 10
};

const emojiOptions = ['📦','🍚','🫒','🌿','🌾','🥣','🧂','🍝','🍅','☕','🍵','🧃','💧','⚡','🥥','🧴','🫧','🪥','🧼','🔋','🔌','💡','🥜','🍫','🍪','🥔','🌽'];

export default function AdminPage() {
  const { racks, allProducts, addProduct, updateProduct, deleteProduct, updateStock, addRack, deleteRack } = useStore();
  const [activeTab, setActiveTab] = useState<AdminTab>('products');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<Product>>({});
  const [newProduct, setNewProduct] = useState<NewProductForm>(emptyProduct);
  const [newRackNum, setNewRackNum] = useState('');
  const [newRackDept, setNewRackDept] = useState('');
  const [newRackAisle, setNewRackAisle] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'stock' | 'price'>('name');

  const filteredProducts = allProducts
    .filter(p => !searchTerm || p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'stock') return a.quantity - b.quantity;
      if (sortBy === 'price') return b.price - a.price;
      return a.name.localeCompare(b.name);
    });

  const lowStockCount = allProducts.filter(p => p.availability === 'Low Stock').length;
  const outOfStockCount = allProducts.filter(p => p.availability === 'Out of Stock').length;
  const totalValue = allProducts.reduce((s, p) => s + p.price * p.quantity, 0);

  const handleAddProduct = () => {
    const targetRack = racks.find(r => r.number === newProduct.rack);
    if (!targetRack || !newProduct.name) return;
    const availability: Product['availability'] = newProduct.quantity === 0 ? 'Out of Stock' : newProduct.quantity <= 10 ? 'Low Stock' : 'In Stock';
    addProduct(targetRack.id, {
      name: newProduct.name,
      category: newProduct.category,
      rack: newProduct.rack,
      price: newProduct.price,
      unit: newProduct.unit,
      emoji: newProduct.emoji,
      quantity: newProduct.quantity,
      availability,
    });
    setNewProduct(emptyProduct);
    setShowAddForm(false);
  };

  const startEdit = (p: Product) => {
    setEditingId(p.id);
    setEditValues({ name: p.name, price: p.price, category: p.category, emoji: p.emoji, unit: p.unit });
  };

  const saveEdit = (id: string) => {
    updateProduct(id, editValues);
    setEditingId(null);
    setEditValues({});
  };

  const handleAddRack = () => {
    if (!newRackNum || !newRackDept || !newRackAisle) return;
    addRack({ number: newRackNum, department: newRackDept, aisle: newRackAisle });
    setNewRackNum('');
    setNewRackDept('');
    setNewRackAisle('');
  };

  return (
    <DashboardLayout 
      title="Admin Portal" 
      subtitle="Manage inventory, stocks, and store configuration."
    >
      <div className="admin-wrap">
        {/* OVERVIEW CARDS */}
        <div className="overview-row">
          <div className="ov-card">
            <div className="ov-icon"><Package size={20} /></div>
            <div>
              <p className="ov-val">{allProducts.length}</p>
              <p className="ov-label">Total Products</p>
            </div>
          </div>
          <div className="ov-card">
            <div className="ov-icon"><Box size={20} /></div>
            <div>
              <p className="ov-val">{racks.length}</p>
              <p className="ov-label">Active Racks</p>
            </div>
          </div>
          <div className="ov-card warn">
            <div className="ov-icon"><AlertTriangle size={20} /></div>
            <div>
              <p className="ov-val">{lowStockCount}</p>
              <p className="ov-label">Low Stock</p>
            </div>
          </div>
          <div className="ov-card danger">
            <div className="ov-icon"><X size={20} /></div>
            <div>
              <p className="ov-val">{outOfStockCount}</p>
              <p className="ov-label">Out of Stock</p>
            </div>
          </div>
          <div className="ov-card accent">
            <div className="ov-icon"><BarChart3 size={20} /></div>
            <div>
              <p className="ov-val">₹{(totalValue / 1000).toFixed(0)}K</p>
              <p className="ov-label">Inventory Value</p>
            </div>
          </div>
        </div>

        {/* TAB BAR */}
        <div className="admin-tabs">
          <button className={`atab ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>
            <Package size={16} /> Products
          </button>
          <button className={`atab ${activeTab === 'stock' ? 'active' : ''}`} onClick={() => setActiveTab('stock')}>
            <ArrowUpDown size={16} /> Stock Management
          </button>
          <button className={`atab ${activeTab === 'racks' ? 'active' : ''}`} onClick={() => setActiveTab('racks')}>
            <Box size={16} /> Racks
          </button>
        </div>

        {/* ═══ PRODUCTS TAB ═══ */}
        {activeTab === 'products' && (
          <div className="tab-content">
            <div className="tab-header">
              <div className="th-search">
                <Search size={18} />
                <input placeholder="Search products..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
              <div className="th-actions">
                <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value as any)}>
                  <option value="name">Sort: Name</option>
                  <option value="stock">Sort: Stock (Low first)</option>
                  <option value="price">Sort: Price (High first)</option>
                </select>
                <button className="add-new-btn" onClick={() => setShowAddForm(true)}>
                  <Plus size={16} /> Add Product
                </button>
              </div>
            </div>

            {/* ADD PRODUCT FORM */}
            {showAddForm && (
              <div className="add-form">
                <div className="af-header">
                  <h4>Add New Product</h4>
                  <button className="af-close" onClick={() => setShowAddForm(false)}><X size={18} /></button>
                </div>
                <div className="af-grid">
                  <div className="af-field">
                    <label>Emoji</label>
                    <div className="emoji-picker">
                      {emojiOptions.map(e => (
                        <button key={e} className={`emoji-opt ${newProduct.emoji === e ? 'active' : ''}`} onClick={() => setNewProduct({...newProduct, emoji: e})}>{e}</button>
                      ))}
                    </div>
                  </div>
                  <div className="af-field">
                    <label>Product Name</label>
                    <input value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} placeholder="e.g. Brown Rice" />
                  </div>
                  <div className="af-field">
                    <label>Category</label>
                    <input value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} placeholder="e.g. Grains" />
                  </div>
                  <div className="af-field">
                    <label>Assign to Rack</label>
                    <select value={newProduct.rack} onChange={e => setNewProduct({...newProduct, rack: e.target.value})}>
                      <option value="">Select Rack</option>
                      {racks.map(r => <option key={r.id} value={r.number}>{r.number} — {r.department}</option>)}
                    </select>
                  </div>
                  <div className="af-field">
                    <label>Price (₹)</label>
                    <input type="number" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})} />
                  </div>
                  <div className="af-field">
                    <label>Unit</label>
                    <input value={newProduct.unit} onChange={e => setNewProduct({...newProduct, unit: e.target.value})} placeholder="kg, L, pkt..." />
                  </div>
                  <div className="af-field">
                    <label>Initial Stock</label>
                    <input type="number" value={newProduct.quantity} onChange={e => setNewProduct({...newProduct, quantity: Number(e.target.value)})} />
                  </div>
                </div>
                <button className="af-submit" onClick={handleAddProduct} disabled={!newProduct.name || !newProduct.rack}>
                  <CheckCircle2 size={16} /> Add Product to Store
                </button>
              </div>
            )}

            {/* PRODUCTS TABLE */}
            <div className="products-table">
              <div className="pt-head">
                <span className="pt-col w-emoji"></span>
                <span className="pt-col w-name">Product</span>
                <span className="pt-col w-rack">Rack</span>
                <span className="pt-col w-cat">Category</span>
                <span className="pt-col w-price">Price</span>
                <span className="pt-col w-stock">Stock</span>
                <span className="pt-col w-status">Status</span>
                <span className="pt-col w-actions">Actions</span>
              </div>
              {filteredProducts.map(p => (
                <div key={p.id} className={`pt-row ${p.availability === 'Out of Stock' ? 'oos' : ''}`}>
                  <span className="pt-col w-emoji">
                    {editingId === p.id ? (
                      <select value={editValues.emoji} onChange={e => setEditValues({...editValues, emoji: e.target.value})} className="inline-select">
                        {emojiOptions.map(em => <option key={em} value={em}>{em}</option>)}
                      </select>
                    ) : p.emoji}
                  </span>
                  <span className="pt-col w-name">
                    {editingId === p.id ? (
                      <input className="inline-edit" value={editValues.name || ''} onChange={e => setEditValues({...editValues, name: e.target.value})} />
                    ) : <strong>{p.name}</strong>}
                  </span>
                  <span className="pt-col w-rack">{p.rack}</span>
                  <span className="pt-col w-cat">
                    {editingId === p.id ? (
                      <input className="inline-edit sm" value={editValues.category || ''} onChange={e => setEditValues({...editValues, category: e.target.value})} />
                    ) : p.category}
                  </span>
                  <span className="pt-col w-price">
                    {editingId === p.id ? (
                      <input className="inline-edit sm" type="number" value={editValues.price || 0} onChange={e => setEditValues({...editValues, price: Number(e.target.value)})} />
                    ) : `₹${p.price}`}
                  </span>
                  <span className="pt-col w-stock">{p.quantity}</span>
                  <span className="pt-col w-status">
                    <span className={`status-tag ${p.availability === 'In Stock' ? 'green' : p.availability === 'Low Stock' ? 'orange' : 'gray'}`}>
                      {p.availability}
                    </span>
                  </span>
                  <span className="pt-col w-actions">
                    {editingId === p.id ? (
                      <>
                        <button className="icon-btn save" onClick={() => saveEdit(p.id)}><Save size={14} /></button>
                        <button className="icon-btn" onClick={() => setEditingId(null)}><X size={14} /></button>
                      </>
                    ) : (
                      <>
                        <button className="icon-btn" onClick={() => startEdit(p)}><Edit3 size={14} /></button>
                        <button className="icon-btn del" onClick={() => deleteProduct(p.id)}><Trash2 size={14} /></button>
                      </>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ STOCK TAB ═══ */}
        {activeTab === 'stock' && (
          <div className="tab-content">
            <h3 className="stock-title">Quick Stock Adjustment</h3>
            <p className="stock-sub">Update quantities instantly. Status auto-updates based on stock level.</p>
            <div className="stock-grid">
              {allProducts.map(p => (
                <div key={p.id} className={`stock-card ${p.availability === 'Out of Stock' ? 'oos' : p.availability === 'Low Stock' ? 'low' : ''}`}>
                  <div className="sc-top">
                    <span className="sc-emoji">{p.emoji}</span>
                    <span className={`sc-status ${p.availability === 'In Stock' ? 'green' : p.availability === 'Low Stock' ? 'orange' : 'gray'}`}>
                      {p.availability}
                    </span>
                  </div>
                  <h5>{p.name}</h5>
                  <p className="sc-rack">Rack {p.rack}</p>
                  <div className="sc-controls">
                    <button onClick={() => updateStock(p.id, Math.max(0, p.quantity - 5))}><Minus size={14} /> 5</button>
                    <button onClick={() => updateStock(p.id, Math.max(0, p.quantity - 1))}><Minus size={14} /></button>
                    <span className="sc-qty">{p.quantity}</span>
                    <button onClick={() => updateStock(p.id, p.quantity + 1)}><Plus size={14} /></button>
                    <button onClick={() => updateStock(p.id, p.quantity + 5)}><Plus size={14} /> 5</button>
                  </div>
                  <input 
                    type="range" 
                    className="stock-slider" 
                    min="0" max="200" 
                    value={p.quantity} 
                    onChange={e => updateStock(p.id, Number(e.target.value))} 
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ RACKS TAB ═══ */}
        {activeTab === 'racks' && (
          <div className="tab-content">
            <h3 className="stock-title">Store Racks Configuration</h3>
            <p className="stock-sub">Add new racks or remove empty ones.</p>
            
            <div className="add-rack-row">
              <input placeholder="Rack Number (e.g. F1)" value={newRackNum} onChange={e => setNewRackNum(e.target.value)} />
              <input placeholder="Department" value={newRackDept} onChange={e => setNewRackDept(e.target.value)} />
              <input placeholder="Aisle Letter" value={newRackAisle} onChange={e => setNewRackAisle(e.target.value)} />
              <button className="add-new-btn" onClick={handleAddRack} disabled={!newRackNum || !newRackDept || !newRackAisle}>
                <Plus size={16} /> Add Rack
              </button>
            </div>

            <div className="racks-grid">
              {racks.map(r => (
                <div key={r.id} className="rack-admin-card">
                  <div className="rac-head">
                    <div>
                      <h4>{r.number}</h4>
                      <span className="rac-dept">{r.department}</span>
                    </div>
                    <span className="rac-aisle">Aisle {r.aisle}</span>
                  </div>
                  <div className="rac-body">
                    <p>{r.products.length} products assigned</p>
                    {r.products.length === 0 && (
                      <button className="remove-rack-btn" onClick={() => deleteRack(r.id)}>
                        <Trash2 size={14} /> Remove Rack
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .admin-wrap { color: var(--ink); }

        /* OVERVIEW */
        .overview-row { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px; margin-bottom: 32px; }
        .ov-card { display: flex; align-items: center; gap: 16px; background: #fff; border: 1px solid var(--border); border-radius: 18px; padding: 20px; }
        .ov-icon { width: 44px; height: 44px; background: var(--bg); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--ink2); }
        .ov-val { font-size: 24px; font-weight: 800; }
        .ov-label { font-size: 11px; color: var(--ink3); font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
        .ov-card.warn { border-color: #f59e0b; }
        .ov-card.warn .ov-icon { background: #FEF3E8; color: #D85A30; }
        .ov-card.danger { border-color: #ef4444; }
        .ov-card.danger .ov-icon { background: #FEE2E2; color: #ef4444; }
        .ov-card.accent .ov-icon { background: #E1F5EE; color: var(--accent); }

        /* TABS */
        .admin-tabs { display: flex; gap: 4px; background: #fff; padding: 4px; border-radius: 16px; border: 1px solid var(--border); margin-bottom: 28px; }
        .atab { flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; border: none; border-radius: 12px; background: none; font-family: inherit; font-size: 13px; font-weight: 700; cursor: pointer; color: var(--ink3); transition: 0.2s; }
        .atab:hover { background: var(--bg); }
        .atab.active { background: #064e3b; color: #fff; }

        /* TAB CONTENT */
        .tab-content { }
        .tab-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; gap: 16px; flex-wrap: wrap; }
        .th-search { display: flex; align-items: center; gap: 10px; background: #fff; border: 1px solid var(--border); padding: 10px 16px; border-radius: 12px; flex: 1; max-width: 400px; }
        .th-search input { border: none; outline: none; background: none; font-family: inherit; font-size: 14px; flex: 1; }
        .th-actions { display: flex; align-items: center; gap: 12px; }
        .sort-select { padding: 10px 14px; border: 1px solid var(--border); border-radius: 10px; font-family: inherit; font-size: 13px; font-weight: 600; background: #fff; cursor: pointer; }
        .add-new-btn { display: flex; align-items: center; gap: 8px; background: var(--accent); color: #fff; border: none; padding: 10px 20px; border-radius: 12px; font-size: 13px; font-weight: 800; cursor: pointer; transition: 0.2s; }
        .add-new-btn:hover { background: #085041; }
        .add-new-btn:disabled { opacity: 0.5; cursor: default; }

        /* ADD FORM */
        .add-form { background: #fff; border: 1.5px solid var(--accent); border-radius: 24px; padding: 28px; margin-bottom: 28px; }
        .af-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .af-header h4 { font-size: 18px; font-weight: 800; }
        .af-close { background: none; border: none; cursor: pointer; color: var(--ink3); }
        .af-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 24px; }
        .af-field { display: flex; flex-direction: column; gap: 6px; }
        .af-field:first-child { grid-column: 1 / -1; }
        .af-field label { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: var(--ink3); }
        .af-field input, .af-field select { padding: 10px 14px; border: 1px solid var(--border); border-radius: 10px; font-family: inherit; font-size: 14px; }
        .emoji-picker { display: flex; flex-wrap: wrap; gap: 6px; }
        .emoji-opt { width: 36px; height: 36px; border: 1px solid var(--border); border-radius: 8px; background: #fff; font-size: 18px; cursor: pointer; transition: 0.15s; display: flex; align-items: center; justify-content: center; }
        .emoji-opt:hover { border-color: var(--accent); }
        .emoji-opt.active { border-color: var(--accent); background: #E1F5EE; box-shadow: 0 0 0 2px rgba(15,110,86,0.2); }
        .af-submit { display: flex; align-items: center; gap: 8px; background: var(--accent); color: #fff; border: none; padding: 14px 32px; border-radius: 14px; font-size: 14px; font-weight: 800; cursor: pointer; transition: 0.2s; }
        .af-submit:disabled { opacity: 0.4; }
        .af-submit:hover:not(:disabled) { background: #085041; }

        /* PRODUCTS TABLE */
        .products-table { background: #fff; border: 1px solid var(--border); border-radius: 20px; overflow: hidden; }
        .pt-head { display: flex; align-items: center; padding: 14px 20px; background: var(--bg); border-bottom: 1px solid var(--border); font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: var(--ink3); }
        .pt-row { display: flex; align-items: center; padding: 14px 20px; border-bottom: 1px solid rgba(0,0,0,0.03); transition: 0.15s; }
        .pt-row:hover { background: #FAFFFE; }
        .pt-row.oos { opacity: 0.5; }
        .pt-col { display: flex; align-items: center; }
        .w-emoji { width: 50px; font-size: 22px; justify-content: center; }
        .w-name { flex: 2; font-size: 14px; }
        .w-rack { width: 60px; font-size: 13px; font-weight: 700; color: var(--accent); }
        .w-cat { width: 100px; font-size: 12px; color: var(--ink3); }
        .w-price { width: 80px; font-size: 14px; font-weight: 800; }
        .w-stock { width: 60px; font-size: 14px; font-weight: 700; }
        .w-status { width: 100px; }
        .w-actions { width: 80px; gap: 8px; justify-content: flex-end; }
        .status-tag { font-size: 10px; font-weight: 800; padding: 3px 10px; border-radius: 100px; text-transform: uppercase; }
        .status-tag.green { background: #E1F5EE; color: #0F6E56; }
        .status-tag.orange { background: #FEF3E8; color: #D85A30; }
        .status-tag.gray { background: #F1F1F0; color: #888; }

        .icon-btn { width: 28px; height: 28px; border: 1px solid var(--border); border-radius: 8px; background: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--ink3); transition: 0.2s; }
        .icon-btn:hover { border-color: var(--accent); color: var(--accent); }
        .icon-btn.del:hover { border-color: #ef4444; color: #ef4444; }
        .icon-btn.save { background: var(--accent); color: #fff; border-color: var(--accent); }

        .inline-edit { border: 1px solid var(--accent); border-radius: 6px; padding: 4px 8px; font-family: inherit; font-size: 13px; width: 100%; }
        .inline-edit.sm { width: 80px; }
        .inline-select { border: 1px solid var(--accent); border-radius: 4px; font-size: 16px; padding: 2px; }

        /* STOCK MANAGEMENT */
        .stock-title { font-size: 20px; font-weight: 800; margin-bottom: 4px; }
        .stock-sub { font-size: 13px; color: var(--ink3); margin-bottom: 28px; }
        .stock-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }

        .stock-card { background: #fff; border: 1.5px solid var(--border); border-radius: 20px; padding: 20px; transition: 0.2s; }
        .stock-card.low { border-color: #f59e0b; }
        .stock-card.oos { border-color: #ef4444; opacity: 0.7; }
        .sc-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
        .sc-emoji { font-size: 28px; }
        .sc-status { font-size: 9px; font-weight: 800; padding: 3px 8px; border-radius: 100px; text-transform: uppercase; }
        .sc-status.green { background: #E1F5EE; color: #0F6E56; }
        .sc-status.orange { background: #FEF3E8; color: #D85A30; }
        .sc-status.gray { background: #F1F1F0; color: #888; }
        .stock-card h5 { font-size: 14px; font-weight: 800; margin-bottom: 4px; }
        .sc-rack { font-size: 11px; color: var(--ink3); font-weight: 600; margin-bottom: 16px; }
        .sc-controls { display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 12px; }
        .sc-controls button { border: 1px solid var(--border); border-radius: 8px; background: #fff; padding: 6px 10px; cursor: pointer; display: flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 700; transition: 0.15s; color: var(--ink2); }
        .sc-controls button:hover { border-color: var(--accent); color: var(--accent); }
        .sc-qty { font-size: 20px; font-weight: 800; min-width: 40px; text-align: center; color: var(--ink); }
        .stock-slider { width: 100%; accent-color: var(--accent); }

        /* RACKS */
        .add-rack-row { display: flex; gap: 12px; margin-bottom: 28px; align-items: center; flex-wrap: wrap; }
        .add-rack-row input { padding: 10px 14px; border: 1px solid var(--border); border-radius: 10px; font-family: inherit; font-size: 14px; width: 160px; }
        .racks-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
        .rack-admin-card { background: #fff; border: 1px solid var(--border); border-radius: 20px; overflow: hidden; }
        .rac-head { display: flex; justify-content: space-between; align-items: center; padding: 20px; background: var(--bg); border-bottom: 1px solid var(--border); }
        .rac-head h4 { font-size: 22px; font-weight: 800; }
        .rac-dept { font-size: 10px; font-weight: 800; text-transform: uppercase; background: #E1F5EE; color: #0F6E56; padding: 3px 10px; border-radius: 100px; margin-left: 8px; }
        .rac-aisle { font-size: 12px; font-weight: 700; color: var(--ink3); }
        .rac-body { padding: 20px; }
        .rac-body p { font-size: 13px; color: var(--ink2); font-weight: 600; }
        .remove-rack-btn { display: flex; align-items: center; gap: 8px; background: none; border: 1px solid #ef4444; color: #ef4444; padding: 8px 14px; border-radius: 10px; font-size: 12px; font-weight: 700; cursor: pointer; margin-top: 12px; transition: 0.2s; }
        .remove-rack-btn:hover { background: #ef4444; color: #fff; }
      `}</style>
    </DashboardLayout>
  );
}
