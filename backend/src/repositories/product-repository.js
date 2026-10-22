'use strict';
const fs = require('node:fs');
const config = require('../config');
class ProductRepository { list() { return JSON.parse(fs.readFileSync(config.dataFile, 'utf8').replace(/^\uFEFF/, '')); } }
module.exports = new ProductRepository();
