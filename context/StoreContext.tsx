'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { mockRacks as initialRacks, Product, Rack } from '../data/mockStore';

interface StoreContextType {
  racks: Rack[];
  allProducts: Product[];
  addProduct: (rackId: string, product: Omit<Product, 'id'>) => void;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
  updateStock: (productId: string, newQuantity: number) => void;
  addRack: (rack: Omit<Rack, 'id' | 'products'>) => void;
  deleteRack: (rackId: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

let nextProductId = 100;
let nextRackId = 100;

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [racks, setRacks] = useState<Rack[]>(initialRacks);

  const allProducts = racks.flatMap(r => r.products);

  const addProduct = useCallback((rackId: string, product: Omit<Product, 'id'>) => {
    const newId = `p_${nextProductId++}`;
    setRacks(prev => prev.map(r => {
      if (r.id === rackId) {
        return { ...r, products: [...r.products, { ...product, id: newId }] };
      }
      return r;
    }));
  }, []);

  const updateProduct = useCallback((productId: string, updates: Partial<Product>) => {
    setRacks(prev => prev.map(r => ({
      ...r,
      products: r.products.map(p => p.id === productId ? { ...p, ...updates } : p)
    })));
  }, []);

  const deleteProduct = useCallback((productId: string) => {
    setRacks(prev => prev.map(r => ({
      ...r,
      products: r.products.filter(p => p.id !== productId)
    })));
  }, []);

  const updateStock = useCallback((productId: string, newQuantity: number) => {
    const qty = Math.max(0, newQuantity);
    const availability: Product['availability'] = qty === 0 ? 'Out of Stock' : qty <= 10 ? 'Low Stock' : 'In Stock';
    setRacks(prev => prev.map(r => ({
      ...r,
      products: r.products.map(p => p.id === productId ? { ...p, quantity: qty, availability } : p)
    })));
  }, []);

  const addRack = useCallback((rack: Omit<Rack, 'id' | 'products'>) => {
    const newId = `r_${nextRackId++}`;
    setRacks(prev => [...prev, { ...rack, id: newId, products: [] }]);
  }, []);

  const deleteRack = useCallback((rackId: string) => {
    setRacks(prev => prev.filter(r => r.id !== rackId));
  }, []);

  return (
    <StoreContext.Provider value={{ racks, allProducts, addProduct, updateProduct, deleteProduct, updateStock, addRack, deleteRack }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
