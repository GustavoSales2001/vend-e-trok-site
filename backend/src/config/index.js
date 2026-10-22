'use strict';
const path = require('node:path');
module.exports = { host: '127.0.0.1', port: Number(process.env.PORT || 3030), dataFile: path.join(__dirname, '..', '..', 'data', 'demo-products.json'), allowedOrigins: new Set(['http://127.0.0.1:5500','http://localhost:5500','http://127.0.0.1:8080','http://localhost:8080']) };
