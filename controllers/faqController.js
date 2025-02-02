const FAQ = require('../models/FAQ');
const redis = require('redis');
const { translateText } = require('../utils/translate');

// Initialize Redis client
const client = redis.createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

// Connect to Redis
client.connect();

// Get FAQs with caching and translation
const getFAQs = async (req, res) => {
  const { lang = 'en' } = req.query;

  try {
    // Check Redis cache first
    const cachedData = await client.get(`faqs_${lang}`);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    // Fetch FAQs from the database
    const faqs = await FAQ.find();
    const translatedFAQs = faqs.map((faq) => faq.getTranslatedText(lang));

    // Cache the result in Redis
    await client.setEx(`faqs_${lang}`, 3600, JSON.stringify(translatedFAQs));

    // Send the response
    res.json(translatedFAQs);
  } catch (err) {
    console.error('Error fetching FAQs:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Create a new FAQ with translations
const createFAQ = async (req, res) => {
  const { question, answer } = req.body;

  try {
    // Translate the question and answer
    const translations = {
      hi: {
        question: await translateText(question, 'hi'),
        answer: await translateText(answer, 'hi'),
      },
      bn: {
        question: await translateText(question, 'bn'),
        answer: await translateText(answer, 'bn'),
      },
    };

    // Save the FAQ to the database
    const faq = new FAQ({ question, answer, translations });
    await faq.save();

    // Send the response
    res.status(201).json(faq);
  } catch (err) {
    console.error('Error creating FAQ:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Export the controller methods
module.exports = { getFAQs, createFAQ };