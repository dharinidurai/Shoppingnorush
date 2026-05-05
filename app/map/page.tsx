'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import StoreMap from '@/components/StoreMap';

export default function StoreMapPage() {
  return (
    <DashboardLayout 
      title="Shopping" 
      subtitle="Browse products, build your cart, and find items across all departments."
    >
      <StoreMap />
    </DashboardLayout>
  );
}
