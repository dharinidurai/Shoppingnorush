const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Product = require('../models/Product');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const groceries = [
  { name: 'Organic Bananas', price: 0.99, sku: 'GRO-001', category: 'Fruits', quantity: 150, stock: 150, description: 'Fresh organic bananas from Ecuador.' },
  { name: 'Whole Milk 1L', price: 1.50, sku: 'GRO-002', category: 'Dairy', quantity: 45, stock: 45, description: 'Pasteurized whole milk.' },
  { name: 'Sourdough Bread', price: 3.25, sku: 'GRO-003', category: 'Bakery', quantity: 12, stock: 12, description: 'Artisan sourdough bread baked fresh daily.' },
  { name: 'Avocados', price: 1.20, sku: 'GRO-004', category: 'Vegetables', quantity: 30, stock: 30, description: 'Ripe Hass avocados.' },
  { name: 'Greek Yogurt 500g', price: 2.75, sku: 'GRO-005', category: 'Dairy', quantity: 20, stock: 20, description: 'Natural high-protein Greek yogurt.' },
  { name: 'Coffee Beans 250g', price: 8.50, sku: 'GRO-006', category: 'Pantry', quantity: 60, stock: 60, description: 'Medium roast Arabica beans.' },
  { name: 'Organic Eggs 12pk', price: 4.50, sku: 'GRO-007', category: 'Dairy', quantity: 25, stock: 25, description: 'Farm-fresh organic eggs.' },
  { name: 'Pasta Spaghetti 500g', price: 1.10, sku: 'GRO-008', category: 'Pantry', quantity: 100, stock: 100, description: 'Italian durum wheat pasta.' },
  { name: 'Olive Oil 500ml', price: 9.00, sku: 'GRO-009', category: 'Pantry', quantity: 15, stock: 15, description: 'Extra virgin cold-pressed olive oil.' },
  { name: 'Spinach 250g', price: 2.00, sku: 'GRO-010', category: 'Vegetables', quantity: 40, stock: 40, description: 'Pre-washed baby spinach leaves.' }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for grocery seeding...');

    // Clear existing products to avoid SKU conflicts
    await Product.deleteMany({});

    await Product.insertMany(groceries);
    console.log('Successfully seeded 10 grocery items!');
    
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
