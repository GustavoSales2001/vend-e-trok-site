'use strict';

const PRODUCTS = window.VEND_TROK_PRODUCTS || [];
const WHATSAPP_NUMBER = '5511988875052';
const STORAGE_KEY = 'vend-e-trok-lista-v1';
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const icon = (name) => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
const state = { category: 'todos', query: '', saved: new Set() };
let lastFocus = null;
let toastTimer = null;
let revealObserver = null;

function whatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

try {
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  if (Array.isArray(stored)) state.saved = new Set(stored.filter(id => PRODUCTS.some(p => p.id === id)));
} catch (_) { /* Storage indisponível: lista funciona nesta sessão. */ }

function saveList() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...state.saved])); } catch (_) {}
  $('#list-count').textContent = state.saved.size;
  $('#drawer-title-count').textContent = `(${state.saved.size})`;
}

function normalize(value) { return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); }
function filteredProducts() {
  return PRODUCTS.filter(p =>
    (state.category === 'todos' || p.category === state.category) &&
    normalize([p.title, p.categoryLabel, p.description].join(' ')).includes(normalize(state.query))
  );
}

function productCard(product, index) {
  const saved = state.saved.has(product.id);
  return `<article class="product-card" style="--delay:${Math.min(index, 6) * 45}ms">
    <div class="product-image">
      <img loading="eager" src="${product.image}" alt="Ilustração demonstrativa de ${product.title.toLowerCase()}" width="900" height="680">
      <span class="product-badge">✳ ${product.badge}</span>
      <button type="button" class="favorite-button ${saved ? 'is-saved' : ''}" data-save="${product.id}" aria-label="${saved ? 'Remover' : 'Salvar'} ${product.title} na lista" aria-pressed="${saved}">${icon('heart')}</button>
    </div>
    <div class="product-info"><span class="product-category">${product.categoryLabel}</span><h3>${product.title}</h3><p>${product.description}</p>
      <div class="product-bottom"><span>Valor sob consulta</span><button class="product-detail-button" type="button" data-detail="${product.id}" aria-label="Ver detalhes de ${product.title}">${icon('arrow-up-right')}</button></div>
    </div>
  </article>`;
}

function renderProducts() {
  const items = filteredProducts();
  $('#product-grid').innerHTML = items.map(productCard).join('');
  $('#result-count').textContent = `${items.length} ${items.length === 1 ? 'ideia encontrada' : 'ideias encontradas'}`;
  $('#empty-state').hidden = items.length !== 0;
  $$('.filter-chip').forEach(btn => {
    const active = btn.dataset.category === state.category;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', String(active));
  });
  saveList();
  prepareProductReveals();
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 3000);
}

function toggleSaved(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  if (state.saved.has(id)) { state.saved.delete(id); showToast('Removido da sua lista.'); }
  else { state.saved.add(id); showToast('Ideia adicionada à sua lista!'); }
  renderProducts();
  renderDrawer();
  if ($('#product-modal').open) {
    const modalButton = $('#modal-save');
    if (modalButton) {
      modalButton.innerHTML = icon('heart') + (state.saved.has(id) ? ' Remover da lista' : ' Adicionar à minha lista');
      modalButton.classList.toggle('is-saved', state.saved.has(id));
    }
  }
}

function renderDrawer() {
  saveList();
  const list = [...state.saved].map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  $('#drawer-items').innerHTML = list.length ? list.map(p => `
    <div class="drawer-item"><img src="${p.image}" alt="" width="84" height="74"><div><small>${p.categoryLabel}</small><strong>${p.title}</strong><span>Consultar na loja</span></div><button class="icon-button remove-item" type="button" data-save="${p.id}" aria-label="Remover ${p.title}">${icon('x')}</button></div>
  `).join('') : '<div class="drawer-empty"><span>♡</span><strong>Sua lista está vazia</strong><p>Gostou de alguma ideia? Toque no coração para guardar aqui.</p></div>';
  $('#copy-list').disabled = list.length === 0;
  const whatsappButton = $('#send-list-whatsapp');
  whatsappButton.classList.toggle('is-disabled', list.length === 0);
  whatsappButton.setAttribute('aria-disabled', String(list.length === 0));
  whatsappButton.href = list.length ? whatsappUrl(listMessage()) : '#';
}

function openDrawer() {
  lastFocus = document.activeElement;
  renderDrawer();
  $('#drawer-overlay').hidden = false;
  $('#shortlist-drawer').hidden = false;
  document.body.classList.add('has-overlay');
  $('#shortlist-drawer').focus();
}
function closeDrawer() {
  $('#shortlist-drawer').hidden = true;
  $('#drawer-overlay').hidden = true;
  document.body.classList.remove('has-overlay');
  lastFocus?.focus();
}

function openProduct(id) {
  const p = PRODUCTS.find(item => item.id === id);
  if (!p) return;
  lastFocus = document.activeElement;
  const productMessage = `Olá! Vi o item “${p.title}” na vitrine da Vend e Trok e gostaria de saber se há uma peça como essa disponível. Podem informar o estado de conservação e o valor?`;
  $('#modal-content').innerHTML = `<div class="modal-grid"><div class="modal-image"><img src="${p.image}" alt="Ilustração demonstrativa de ${p.title.toLowerCase()}" width="900" height="680"></div><div class="modal-info"><span class="eyebrow eyebrow-dark">PEÇA ILUSTRATIVA</span><span class="modal-category">${p.categoryLabel}</span><h2 id="modal-title">${p.title}</h2><p class="modal-desc">${p.description}</p><div class="modal-detail-note"><strong>Sobre esta peça</strong><p>${p.details}</p></div><strong class="modal-price">Valor sob consulta</strong><a class="button button-whatsapp full-width" href="${whatsappUrl(productMessage)}" target="_blank" rel="noopener noreferrer">${icon('whatsapp')} Consultar este item</a><button id="modal-save" class="button button-outline full-width ${state.saved.has(id) ? 'is-saved' : ''}" type="button" data-save="${id}">${icon('heart')} ${state.saved.has(id) ? 'Remover da lista' : 'Adicionar à minha lista'}</button><small class="modal-warning">Imagem criada para demonstração. Este produto não foi confirmado no estoque da loja.</small></div></div>`;
  $('#product-modal').showModal();
}

function listMessage() {
  const titles = [...state.saved].map(id => PRODUCTS.find(p => p.id === id)?.title).filter(Boolean);
  return `Olá! Conheci a vitrine demonstrativa da Vend e Trok e gostaria de saber se vocês têm itens como estes disponíveis:\n\n${titles.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\nPoderiam informar disponibilidade, estado de conservação e valor?\n\n*Esta lista é de modelos ilustrativos, não de produtos anunciados em estoque.*`;
}

async function copyList() {
  const message = listMessage();
  try {
    if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(message);
    else {
      const area = document.createElement('textarea'); area.value = message; area.style.position = 'fixed'; area.style.opacity = '0'; document.body.appendChild(area); area.select();
      if (!document.execCommand('copy')) throw new Error('Sem suporte a cópia');
      area.remove();
    }
    showToast('Lista copiada! Cole a mensagem no canal que preferir.');
  } catch (_) { showToast('Não foi possível copiar automaticamente neste navegador.'); }
}

function setupScrollReveals() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const groups = [
    ['.catalog-heading > div', 'reveal-up'], ['.small-stamp', 'reveal-scale'],
    ['.catalog-toolbar', 'reveal-up'], ['.catalog-callout', 'reveal-scale'],
    ['.mission-visual', 'reveal-left'], ['.mission-copy', 'reveal-right'],
    ['.steps-heading > div', 'reveal-left'], ['.steps-heading > p', 'reveal-right'],
    ['.step-card', 'reveal-up'], ['.cta-inner > :not(.cta-decor)', 'reveal-up'],
    ['.location-copy', 'reveal-left'], ['.map-panel', 'reveal-right'],
    ['.footer-top > div', 'reveal-up']
  ];

  groups.forEach(([selector, variant]) => {
    $$(selector).forEach((element, index) => {
      element.classList.add('scroll-reveal', variant);
      element.style.setProperty('--reveal-delay', `${Math.min(index, 4) * 90}ms`);
    });
  });

  if (reduceMotion || !('IntersectionObserver' in window)) {
    $$('.scroll-reveal').forEach(element => element.classList.add('is-visible'));
    return;
  }

  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -7% 0px' });

  $$('.scroll-reveal').forEach(element => revealObserver.observe(element));
}

function prepareProductReveals() {
  $$('.product-card').forEach((element, index) => {
    element.classList.add('scroll-reveal', index % 2 ? 'reveal-scale' : 'reveal-up');
    element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 70}ms`);
    if (revealObserver) revealObserver.observe(element);
    else element.classList.add('is-visible');
  });
}

$('#category-filters').addEventListener('click', e => {
  const btn = e.target.closest('[data-category]');
  if (!btn) return;
  state.category = btn.dataset.category;
  renderProducts();
});
$('#product-search').addEventListener('input', e => { state.query = e.target.value.trim(); renderProducts(); });
$('#clear-filters').addEventListener('click', () => {
  state.category = 'todos'; state.query = ''; $('#product-search').value = ''; renderProducts(); $('#product-search').focus();
});
$('#product-grid').addEventListener('click', e => {
  const save = e.target.closest('[data-save]');
  const detail = e.target.closest('[data-detail]');
  if (save) toggleSaved(save.dataset.save);
  else if (detail) openProduct(detail.dataset.detail);
});
$('#open-list').addEventListener('click', openDrawer);
$('#close-list').addEventListener('click', closeDrawer);
$('#drawer-overlay').addEventListener('click', closeDrawer);
$('#drawer-items').addEventListener('click', e => {
  const btn = e.target.closest('[data-save]');
  if (btn) toggleSaved(btn.dataset.save);
});
$('#copy-list').addEventListener('click', copyList);
$('#send-list-whatsapp').addEventListener('click', e => {
  if (state.saved.size === 0) {
    e.preventDefault();
    showToast('Adicione pelo menos um item antes de enviar.');
  }
});
$('#product-modal').addEventListener('click', e => {
  const btn = e.target.closest('[data-save]');
  if (btn) toggleSaved(btn.dataset.save);
  if (e.target === $('#product-modal')) $('#product-modal').close();
});
$('#modal-close').addEventListener('click', () => $('#product-modal').close());
$('#product-modal').addEventListener('close', () => lastFocus?.focus());
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !$('#shortlist-drawer').hidden) closeDrawer();
  if (e.key === 'Tab' && !$('#shortlist-drawer').hidden) {
    const focusables = $$('button:not(:disabled), a[href]', $('#shortlist-drawer'));
    if (!focusables.length) return;
    const first = focusables[0], last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
    else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
  }
});
$('#menu-toggle').addEventListener('click', () => {
  const open = $('.main-nav').classList.toggle('is-open');
  $('#menu-toggle').setAttribute('aria-expanded', String(open));
  $('#menu-toggle').setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
$$('.main-nav a').forEach(a => a.addEventListener('click', () => {
  $('.main-nav').classList.remove('is-open'); $('#menu-toggle').setAttribute('aria-expanded', 'false');
}));
$('#copyright-year').textContent = String(new Date().getFullYear());
setupScrollReveals();
renderProducts();
renderDrawer();
