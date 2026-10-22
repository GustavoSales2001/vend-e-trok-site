'use strict';
const $=s=>document.querySelector(s), products=window.VEND_TROK_PRODUCTS||[], key='vend-e-trok-admin-demo-v1';
let local=[];try{const v=JSON.parse(localStorage.getItem(key)||'[]');if(Array.isArray(v))local=v;}catch(_){}
const all=()=>[...products,...local];
function esc(v){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function render(){const rows=all();$('#metric-products').textContent=rows.length;$('#admin-products').innerHTML=rows.map((p,i)=>`<tr><td><strong>${esc(p.title)}</strong><small>DEMONSTRATIVO</small></td><td>${esc(p.categoryLabel||p.category)}</td><td>${esc(p.condition||'Bom estado')}</td><td>${new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(p.price)}</td><td>${i>=products.length?`<button class="text-action" data-remove="${esc(p.id)}">Remover</button>`:'—'}</td></tr>`).join('');}
$('#today').textContent=new Intl.DateTimeFormat('pt-BR',{dateStyle:'long'}).format(new Date());
$('#add-product').addEventListener('click',()=>$('#product-dialog').showModal());$('#dialog-close').addEventListener('click',()=>$('#product-dialog').close());
$('#product-form').addEventListener('submit',e=>{e.preventDefault();const d=new FormData(e.currentTarget), category=d.get('category'),labels={sala:'Sala de estar',cozinha:'Cozinha e jantar',quarto:'Quarto',escritorio:'Escritório',eletronicos:'Eletrônicos',outros:'Outros'};local.push({id:`local-${Date.now()}`,title:d.get('title'),category,categoryLabel:labels[category],price:Number(d.get('price')),condition:d.get('condition')});localStorage.setItem(key,JSON.stringify(local));e.currentTarget.reset();$('#product-dialog').close();render();$('#toast').textContent='Item demonstrativo salvo neste navegador.';$('#toast').classList.add('visible');setTimeout(()=>$('#toast').classList.remove('visible'),2400);});
$('#admin-products').addEventListener('click',e=>{const b=e.target.closest('[data-remove]');if(!b)return;local=local.filter(p=>p.id!==b.dataset.remove);localStorage.setItem(key,JSON.stringify(local));render();});render();

