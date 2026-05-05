export interface Product {
  id: string;
  name: string;
  category: string;
  rack: string;
  availability: 'In Stock' | 'Low Stock' | 'Out of Stock';
  quantity: number;
  price: number;
  unit: string;
  emoji: string;
}

export interface Rack {
  id: string;
  number: string;
  department: string;
  aisle: string;
  products: Product[];
}

export const mockRacks: Rack[] = [
  {
    id: 'r1', number: 'A1', department: 'Groceries', aisle: 'A',
    products: [
      { id: 'p1', name: 'Premium Basmati Rice', category: 'Grains', rack: 'A1', availability: 'In Stock', quantity: 45, price: 180, unit: 'kg', emoji: '🍚' },
      { id: 'p2', name: 'Refined Sunflower Oil', category: 'Oils', rack: 'A1', availability: 'Low Stock', quantity: 12, price: 155, unit: 'L', emoji: '🫒' },
      { id: 'p3', name: 'Organic Turmeric Powder', category: 'Spices', rack: 'A1', availability: 'In Stock', quantity: 28, price: 65, unit: '200g', emoji: '🌿' },
    ]
  },
  {
    id: 'r2', number: 'A2', department: 'Groceries', aisle: 'A',
    products: [
      { id: 'p4', name: 'Whole Wheat Flour', category: 'Grains', rack: 'A2', availability: 'In Stock', quantity: 30, price: 52, unit: 'kg', emoji: '🌾' },
      { id: 'p5', name: 'Masala Oats', category: 'Breakfast', rack: 'A2', availability: 'Out of Stock', quantity: 0, price: 40, unit: 'pkt', emoji: '🥣' },
      { id: 'p6', name: 'Iodized Salt', category: 'Essentials', rack: 'A2', availability: 'In Stock', quantity: 100, price: 20, unit: 'kg', emoji: '🧂' },
    ]
  },
  {
    id: 'r3', number: 'A3', department: 'Groceries', aisle: 'A',
    products: [
      { id: 'p15', name: 'Pasta (Penne)', category: 'Pasta', rack: 'A3', availability: 'In Stock', quantity: 18, price: 85, unit: 'pkt', emoji: '🍝' },
      { id: 'p16', name: 'Tomato Ketchup', category: 'Sauces', rack: 'A3', availability: 'Out of Stock', quantity: 0, price: 120, unit: 'btl', emoji: '🍅' },
      { id: 'p17', name: 'Olive Oil', category: 'Oils', rack: 'A3', availability: 'In Stock', quantity: 14, price: 450, unit: '500ml', emoji: '🫒' },
    ]
  },
  {
    id: 'r4', number: 'B1', department: 'Beverages', aisle: 'B',
    products: [
      { id: 'p7', name: 'Instant Coffee', category: 'Coffee', rack: 'B1', availability: 'In Stock', quantity: 50, price: 350, unit: 'jar', emoji: '☕' },
      { id: 'p8', name: 'Green Tea Bags', category: 'Tea', rack: 'B1', availability: 'In Stock', quantity: 34, price: 180, unit: '25pcs', emoji: '🍵' },
      { id: 'p9', name: 'Fruit Juice (1L)', category: 'Juice', rack: 'B1', availability: 'Low Stock', quantity: 8, price: 120, unit: 'L', emoji: '🧃' },
    ]
  },
  {
    id: 'r5', number: 'B2', department: 'Beverages', aisle: 'B',
    products: [
      { id: 'p18', name: 'Mineral Water (1L)', category: 'Water', rack: 'B2', availability: 'In Stock', quantity: 200, price: 20, unit: 'btl', emoji: '💧' },
      { id: 'p19', name: 'Energy Drink', category: 'Drinks', rack: 'B2', availability: 'In Stock', quantity: 60, price: 125, unit: 'can', emoji: '⚡' },
      { id: 'p20', name: 'Coconut Water', category: 'Natural', rack: 'B2', availability: 'Low Stock', quantity: 6, price: 45, unit: 'pkt', emoji: '🥥' },
    ]
  },
  {
    id: 'r6', number: 'C1', department: 'Personal Care', aisle: 'C',
    products: [
      { id: 'p10', name: 'Moisturizing Cream', category: 'Skincare', rack: 'C1', availability: 'In Stock', quantity: 15, price: 250, unit: 'tube', emoji: '🧴' },
      { id: 'p11', name: 'Herbal Shampoo', category: 'Haircare', rack: 'C1', availability: 'Low Stock', quantity: 5, price: 220, unit: 'btl', emoji: '🧴' },
      { id: 'p12', name: 'Charcoal Face Wash', category: 'Skincare', rack: 'C1', availability: 'In Stock', quantity: 22, price: 180, unit: 'tube', emoji: '🫧' },
    ]
  },
  {
    id: 'r7', number: 'C2', department: 'Personal Care', aisle: 'C',
    products: [
      { id: 'p21', name: 'Bamboo Toothbrush', category: 'Oral', rack: 'C2', availability: 'In Stock', quantity: 45, price: 80, unit: 'pc', emoji: '🪥' },
      { id: 'p22', name: 'Hand Sanitizer (500ml)', category: 'Hygiene', rack: 'C2', availability: 'In Stock', quantity: 30, price: 120, unit: 'btl', emoji: '🧼' },
    ]
  },
  {
    id: 'r8', number: 'D1', department: 'Electronics', aisle: 'D',
    products: [
      { id: 'p13', name: 'AA Batteries (4pk)', category: 'Batteries', rack: 'D1', availability: 'In Stock', quantity: 40, price: 160, unit: 'pk', emoji: '🔋' },
      { id: 'p14', name: 'USB-C Cable', category: 'Cables', rack: 'D1', availability: 'In Stock', quantity: 25, price: 299, unit: 'pc', emoji: '🔌' },
      { id: 'p23', name: 'LED Bulb (9W)', category: 'Lighting', rack: 'D1', availability: 'Low Stock', quantity: 8, price: 85, unit: 'pc', emoji: '💡' },
    ]
  },
  {
    id: 'r9', number: 'E1', department: 'Snacks', aisle: 'E',
    products: [
      { id: 'p24', name: 'Mixed Nuts (250g)', category: 'Dry Fruits', rack: 'E1', availability: 'In Stock', quantity: 35, price: 380, unit: 'pkt', emoji: '🥜' },
      { id: 'p25', name: 'Dark Chocolate Bar', category: 'Chocolate', rack: 'E1', availability: 'In Stock', quantity: 50, price: 120, unit: 'bar', emoji: '🍫' },
      { id: 'p26', name: 'Protein Cookies', category: 'Health', rack: 'E1', availability: 'In Stock', quantity: 44, price: 60, unit: 'pkt', emoji: '🍪' },
    ]
  },
  {
    id: 'r10', number: 'E2', department: 'Snacks', aisle: 'E',
    products: [
      { id: 'p27', name: 'Potato Chips', category: 'Chips', rack: 'E2', availability: 'In Stock', quantity: 75, price: 30, unit: 'pkt', emoji: '🥔' },
      { id: 'p28', name: 'Corn Nachos', category: 'Chips', rack: 'E2', availability: 'Low Stock', quantity: 10, price: 50, unit: 'pkt', emoji: '🌽' },
    ]
  },
];
