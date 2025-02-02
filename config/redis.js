// services/redisService.js
const { createClient } = require('redis');

// Create Redis client with new API
const client = createClient({
  url: 'redis://localhost:6379', // Adjust if your Redis server is running on a different host/port
});

client.on('error', (err) => {
  console.error('Redis error:', err);
});

client.on('connect', () => {
  console.log('Redis connected');
});

client.connect(); // Important: explicitly call .connect() for Redis v4.x+

module.exports = client;
