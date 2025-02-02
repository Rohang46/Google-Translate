// models/FAQ.js
const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  question_hi: { type: String },  // Hindi translation
  question_bn: { type: String },  // Bengali translation
  // Add other language translations as needed
});

faqSchema.methods.getTranslatedText = function (lang) {
  // Return the translation based on the language provided
  if (lang === 'hi' && this.question_hi) {
    return { question: this.question_hi, answer: this.answer };  // Use Hindi translation if available
  } else if (lang === 'bn' && this.question_bn) {
    return { question: this.question_bn, answer: this.answer };  // Use Bengali translation if available
  } else {
    return { question: this.question, answer: this.answer };  // Fallback to default (English)
  }
};

const FAQ = mongoose.model('FAQ', faqSchema);

module.exports = FAQ;
