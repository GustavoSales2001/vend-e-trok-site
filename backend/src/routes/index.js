'use strict';
const controller = require('../controllers/catalog-controller');
function route(req, res, url) {
  if (req.method !== 'GET') return false;
  if (url.pathname === '/api/products') { controller.products(req, res, url); return true; }
  if (url.pathname === '/api/categories') { controller.categories(req, res); return true; }
  return false;
}
module.exports = { route };
