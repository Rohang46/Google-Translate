const AdminBro = require('admin-bro');
const AdminBroExpressjs = require('@admin-bro/express');
const mongoose = require('mongoose');
const express = require('express');
const FAQ = require('./models/FAQ');
const app = express();

const adminBro = new AdminBro({
  resources: [{
    resource: FAQ,
    options: { listProperties: ['question', 'answer'] },
  }],
  rootPath: '/admin',
});

const router = AdminBroExpressjs.buildRouter(adminBro);
app.use(adminBro.options.rootPath, router);

app.listen(8000, () => console.log('Admin panel is running at http://localhost:8000/admin'));
