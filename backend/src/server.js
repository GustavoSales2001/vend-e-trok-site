'use strict';
const http = require('node:http');
const { URL } = require('node:url');
const config = require('./config');
const { securityHeaders } = require('./middleware/security-headers');
const routes = require('./routes');
function send(res, status, body) { res.writeHead(status, { 'Content-Type':'application/json; charset=utf-8' }); res.end(JSON.stringify(body)); }
const server = http.createServer((req,res)=>{
  securityHeaders(req,res);
  if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }
  let url;
  try { url = new URL(req.url, `http://${req.headers.host || '127.0.0.1'}`); } catch (_) { return send(res,400,{error:'Requisição inválida.'}); }
  try {
    if (req.method === 'GET' && url.pathname === '/api/health') return send(res,200,{status:'ok',mode:'demo'});
    if (routes.route(req,{json:body=>send(res,200,body)},url)) return;
    send(res,404,{error:'Rota não encontrada.'});
  } catch (error) { const status = Number.isInteger(error.status) ? error.status : 500; console.error(`[api] ${status} ${req.method} ${url.pathname}: ${error.message}`); send(res,status,{error:status===500?'Falha interna.':error.message}); }
});
server.listen(config.port,config.host,()=>console.log(`API demonstrativa em http://${config.host}:${config.port}`));
