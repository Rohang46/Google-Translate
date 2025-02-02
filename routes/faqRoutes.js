// routes/faqRoutes.js
const express = require('express');
const FAQ = require('../models/FAQ');
const redisClient = require('../config/redis');
const router = express.Router();

router.get('/', async (req, res) => {
  const { lang = 'en' } = req.query;
  const cacheKey = `faqs-${lang}`;

  try {
    const cachedFAQs = await redisClient.get(cacheKey);

    if (cachedFAQs) {
      console.log('Returning cached FAQs');
      return res.json(JSON.parse(cachedFAQs));  // Return cached FAQs
    } else {
      const faqs = await FAQ.find();
      const translatedFAQs = faqs.map((faq) => faq.getTranslatedText(lang));  // Use the method

      await redisClient.setEx(cacheKey, 3600, JSON.stringify(translatedFAQs));  // Cache for 1 hour
      res.json(translatedFAQs);  // Return the FAQs
    }
  } catch (err) {
    console.error('Error in Redis or DB:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
