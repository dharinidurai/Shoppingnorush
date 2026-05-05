'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [buyingId, setBuyingId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const handleBuy = async (product: any) => {
    setBuyingId(product._id);
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!user.id) {
      alert('Please login first to purchase items.');
      router.push('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          items: [{ productId: product._id, quantity: 1, price: product.price }],
          totalAmount: product.price,
          paymentMethod: 'digital_wallet'
        }),
      });

      if (response.ok) {
        alert(`Successfully purchased ${product.name}!`);
        // Refresh products to show updated quantity (if backend handled it)
        const updatedRes = await fetch('http://localhost:5000/api/products');
        const updatedData = await updatedRes.json();
        setProducts(updatedData);
      } else {
        alert('Purchase failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during purchase.');
    } finally {
      setBuyingId(null);
    }
  };

  if (loading) return <div className="loading">Loading fresh groceries...</div>;

  return (
    <main className="products-container" style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', background: 'linear-gradient(to right, #00c6ff, #0072ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          NoRush Marketplace
        </h1>
        <p style={{ color: '#666' }}>Fresh groceries, instantly delivered to your digital wallet.</p>
      </header>

      <div className="product-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '30px' 
      }}>
        {products.map((p) => (
          <div key={p._id} className="product-card" style={{ 
            background: 'white', 
            borderRadius: '20px', 
            padding: '24px', 
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            border: '1px solid #eee',
            transition: 'transform 0.3s ease',
            cursor: 'pointer'
          }}>
            <div className="category-tag" style={{ 
              fontSize: '10px', 
              textTransform: 'uppercase', 
              letterSpacing: '1px', 
              color: '#0072ff',
              fontWeight: '700',
              marginBottom: '8px'
            }}>{p.category}</div>
            
            <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>{p.name}</h3>
            <p style={{ color: '#888', fontSize: '14px', marginBottom: '20px', height: '40px', overflow: 'hidden' }}>
              {p.description}
            </p>
            
            <div className="product-footer" style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginTop: 'auto'
            }}>
              <div>
                <span style={{ fontSize: '1.2rem', fontWeight: '800' }}>${p.price.toFixed(2)}</span>
                <div style={{ fontSize: '12px', color: p.quantity > 0 ? '#4CAF50' : '#F44336' }}>
                  {p.quantity > 0 ? `${p.quantity} in stock` : 'Out of stock'}
                </div>
              </div>
              
              <button 
                onClick={() => handleBuy(p)}
                disabled={buyingId === p._id || p.quantity <= 0}
                style={{ 
                  background: 'black', 
                  color: 'white', 
                  padding: '12px 24px', 
                  borderRadius: '12px', 
                  border: 'none',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  opacity: (buyingId === p._id || p.quantity <= 0) ? 0.5 : 1
                }}
              >
                {buyingId === p._id ? 'Processing...' : 'Buy Now'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
