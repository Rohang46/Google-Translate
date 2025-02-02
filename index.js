require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const faqRoutes = require('./routes/faqRoutes');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Redis Connection
const redisClient = redis.createClient({ url: 'redis://localhost:6379' });
redisClient.connect()
  .then(() => console.log('✅ Redis connected'))
  .catch(err => console.error('❌ Redis connection error:', err));

// Default Route
app.get('/', (req, res) => {
  res.send('Welcome to the FAQ API 🚀');
});

// API Routes
app.use('/api/faqs', faqRoutes);

// Export for testing
module.exports = app;

// Start Server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}
