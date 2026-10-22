'use strict';
const config = require('../config');
function securityHeaders(req, res) {
  res.setHeader('X-Content-Type-Options','nosniff'); res.setHeader('X-Frame-Options','DENY'); res.setHeader('Referrer-Policy','no-referrer'); res.setHeader('Cache-Control','no-store');
  const origin = req.headers.origin;
  if (origin && config.allowedOrigins.has(origin)) { res.setHeader('Access-Control-Allow-Origin', origin); res.setHeader('Vary','Origin'); res.setHeader('Access-Control-Allow-Methods','GET, OPTIONS'); res.setHeader('Access-Control-Allow-Headers','Content-Type'); }
}
module.exports = { securityHeaders };
