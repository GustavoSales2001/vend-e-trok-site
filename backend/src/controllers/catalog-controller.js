'use strict';
const service = require('../services/catalog-service');
const { catalogQuery } = require('../validation/catalog-validation');
function products(_req, res, url) { res.json({ mode: 'demo', items: service.products(catalogQuery(url)) }); }
function categories(_req, res) { res.json({ mode: 'demo', items: service.categories() }); }
module.exports = { products, categories };
