const request = require('supertest');
const { expect } = require('chai'); // ✅ Import `expect` from Chai
const app = require('../index'); // ✅ Ensure the correct path to index.js

describe('FAQ API', () => {
  it('should fetch FAQs in English', async () => {
    const res = await request(app).get('/api/faqs?lang=en');

    expect(res.status).to.equal(200);  // ✅ Correct `expect` usage
    expect(res.body).to.be.an('array'); // ✅ Ensure response is an array
  });
});
