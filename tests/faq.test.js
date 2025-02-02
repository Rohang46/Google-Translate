const { expect } = require('chai');
const request = require('supertest');
const app = require('../index');
const FAQ = require('../models/FAQ');

describe('FAQ API', () => {
  it('should fetch FAQs in English', async () => {
    const res = await request(app).get('/api/faqs');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});