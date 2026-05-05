const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/User');

const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function seed() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI not found in .env');
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing users if any (optional, but good for fresh start)
    // await User.deleteMany({});

    const users = [
      {
        name: 'Admin User',
        email: 'admin@norush.pay',
        password: 'Admin@123',
        role: 'admin',
        phone: '+91 99999 88888',
        nfcToken: 'ADMIN_NFC_001'
      },
      {
        name: 'John Doe',
        email: 'user@norush.pay',
        password: 'User@123',
        role: 'user',
        phone: '+91 88888 77777',
        nfcToken: 'USER_NFC_001'
      }
    ];

    for (let u of users) {
      const existing = await User.findOne({ email: u.email });
      if (existing) {
        console.log(`User ${u.email} already exists, skipping.`);
        continue;
      }
      u.password = await bcrypt.hash(u.password, 10);
      await User.create(u);
      console.log(`Created user: ${u.email}`);
    }

    console.log('Seeding complete!');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
