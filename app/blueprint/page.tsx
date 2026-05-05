'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { motion } from 'framer-motion';
import { ZoomIn, ZoomOut, Maximize2, Download, MapPin } from 'lucide-react';

export default function BlueprintPage() {
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  const zoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const zoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));
  const resetZoom = () => setZoom(1);

  const rackInfo = [
    { id: 'A1', dept: 'Groceries', aisle: 'A', color: '#0F6E56' },
    { id: 'A2', dept: 'Groceries', aisle: 'A', color: '#0F6E56' },
    { id: 'A3', dept: 'Groceries', aisle: 'A', color: '#0F6E56' },
    { id: 'B1', dept: 'Beverages', aisle: 'B', color: '#2563EB' },
    { id: 'B2', dept: 'Beverages', aisle: 'B', color: '#2563EB' },
    { id: 'C1', dept: 'Personal Care', aisle: 'C', color: '#9333EA' },
    { id: 'C2', dept: 'Personal Care', aisle: 'C', color: '#9333EA' },
    { id: 'D1', dept: 'Electronics', aisle: 'D', color: '#DC2626' },
    { id: 'E1', dept: 'Snacks', aisle: 'E', color: '#D97706' },
    { id: 'E2', dept: 'Snacks', aisle: 'E', color: '#D97706' },
  ];

  return (
    <DashboardLayout title="Store Blueprint" subtitle="Interactive floor plan with rack locations and department mapping.">
      
      {/* CONTROLS */}
      <div className="bp-controls">
        <div className="bp-zoom-group">
          <button className="bp-ctrl-btn" onClick={zoomOut}><ZoomOut size={18} /></button>
          <span className="bp-zoom-level">{Math.round(zoom * 100)}%</span>
          <button className="bp-ctrl-btn" onClick={zoomIn}><ZoomIn size={18} /></button>
          <button className="bp-ctrl-btn" onClick={resetZoom}><Maximize2 size={18} /></button>
        </div>
      </div>

      {/* BLUEPRINT VIEWER */}
      <motion.div 
        className="bp-viewer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div 
          className="bp-canvas"
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
        >
          <div className="bp-image-wrap" style={{ transform: `scale(${zoom})` }}>
            <img 
              src="/store-blueprint.png" 
              alt="Store Blueprint" 
              className="bp-image"
              draggable={false}
            />
          </div>
        </div>
      </motion.div>

      {/* RACK LEGEND */}
      <motion.div
        className="bp-legend"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <h3 className="legend-title">
          <MapPin size={18} />
          Rack Directory
        </h3>
        <div className="legend-grid">
          {rackInfo.map(rack => (
            <div key={rack.id} className="legend-item">
              <div className="li-badge" style={{ background: rack.color }}>{rack.id}</div>
              <div className="li-detail">
                <span className="li-dept">{rack.dept}</span>
                <span className="li-aisle">Aisle {rack.aisle}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <style jsx>{`
        .bp-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .bp-zoom-group {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #fff;
          padding: 6px 8px;
          border-radius: 14px;
          border: 1px solid var(--border);
        }

        .bp-ctrl-btn {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: 1px solid var(--border);
          background: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--ink2);
          transition: all 0.2s;
        }

        .bp-ctrl-btn:hover {
          background: var(--accent3);
          color: var(--accent);
          border-color: var(--accent);
        }

        .bp-zoom-level {
          font-size: 13px;
          font-weight: 800;
          color: var(--ink);
          min-width: 48px;
          text-align: center;
          font-family: var(--font-dm-mono);
        }

        /* VIEWER */
        .bp-viewer {
          background: #fff;
          border: 1.5px solid var(--border);
          border-radius: 24px;
          overflow: hidden;
          margin-bottom: 24px;
        }

        .bp-canvas {
          overflow: auto;
          max-height: 65vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: 
            linear-gradient(90deg, rgba(15,110,86,0.03) 1px, transparent 1px),
            linear-gradient(rgba(15,110,86,0.03) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        .bp-image-wrap {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: center center;
        }

        .bp-image {
          max-width: 100%;
          height: auto;
          border-radius: 12px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.08);
          user-select: none;
          pointer-events: none;
        }

        /* LEGEND */
        .bp-legend {
          background: #fff;
          border: 1.5px solid var(--border);
          border-radius: 24px;
          padding: 28px;
        }

        .legend-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 16px;
          font-weight: 800;
          color: var(--ink);
          letter-spacing: -0.3px;
          margin-bottom: 20px;
        }

        .legend-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 12px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          background: var(--bg);
          border-radius: 14px;
          border: 1px solid var(--border);
          transition: all 0.2s;
        }

        .legend-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.04);
          border-color: rgba(15,110,86,0.2);
        }

        .li-badge {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          color: #fff;
          font-size: 14px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          letter-spacing: -0.3px;
        }

        .li-detail {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .li-dept {
          font-size: 13px;
          font-weight: 700;
          color: var(--ink);
        }

        .li-aisle {
          font-size: 11px;
          font-weight: 600;
          color: var(--ink3);
        }

        @media (max-width: 768px) {
          .bp-canvas { padding: 12px; max-height: 50vh; }
          .bp-viewer { border-radius: 18px; margin-bottom: 16px; }
          .bp-legend { padding: 20px; border-radius: 18px; }
          .legend-title { font-size: 15px; margin-bottom: 16px; }
          .legend-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
          .legend-item { padding: 10px 12px; gap: 10px; border-radius: 12px; }
          .li-badge { width: 36px; height: 36px; font-size: 12px; border-radius: 10px; }
          .li-dept { font-size: 12px; }
          .bp-zoom-level { font-size: 12px; }
          .bp-ctrl-btn { width: 32px; height: 32px; }
        }

        @media (max-width: 480px) {
          .legend-grid { grid-template-columns: 1fr 1fr; gap: 8px; }
          .legend-item { padding: 8px 10px; }
          .bp-canvas { max-height: 40vh; }
        }
      `}</style>
    </DashboardLayout>
  );
}
