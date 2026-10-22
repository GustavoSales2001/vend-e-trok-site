'use strict';
const repository = require('../repositories/product-repository');
class CatalogService {
  products(filters = {}) { return repository.list().filter(p => (!filters.category || p.category === filters.category) && (!filters.q || `${p.title} ${p.categoryLabel}`.toLocaleLowerCase('pt-BR').includes(filters.q.toLocaleLowerCase('pt-BR')))); }
  categories() { return [...new Map(repository.list().map(p => [p.category, { id: p.category, name: p.categoryLabel }])).values()]; }
}
module.exports = new CatalogService();
