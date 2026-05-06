const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', (req, res) => {
  const state = mongoose.connection.readyState; // 0 disconnected,1 connected,2 connecting,3 disconnecting
  res.json({
    ok: true,
    mongooseReadyState: state,
    hasMongoUri: !!process.env.MONGODB_URI,
    nodeEnv: process.env.NODE_ENV || 'unknown',
    time: new Date().toISOString()
  });
});

module.exports = router;
