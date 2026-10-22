'use strict';
const allowed = new Set(['sala','quarto','cozinha','escritorio','eletronicos','outros']);
function catalogQuery(url) {
  const category = url.searchParams.get('category') || '';
  const q = (url.searchParams.get('q') || '').trim();
  if (category && !allowed.has(category)) { const error = new Error('Categoria inválida.'); error.status = 400; throw error; }
  if (q.length > 80 || /[<>]/.test(q)) { const error = new Error('Busca inválida.'); error.status = 400; throw error; }
  return { category, q };
}
module.exports = { catalogQuery };
