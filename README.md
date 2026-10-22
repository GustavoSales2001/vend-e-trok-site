# Vend e Trok — vitrine e demonstração local

Projeto local de apresentação da Vend e Trok Comércio de Usados, em Mogi das Cruzes (SP). O catálogo contém ilustrações e valores fictícios; não representa estoque, preço ou oferta confirmada pela loja.

## Dados comerciais preservados

- Endereço: Rua Fidalgo, 69 — Centro, Mogi das Cruzes — SP
- Telefone: (11) 4791-2391
- WhatsApp: (11) 98887-5052

Confirme esses dados com a loja antes de uma publicação futura.

## Abrir localmente

Abra `index.html` no navegador. Não há dependências de frontend. Node.js 24.13.0 e npm 11.6.2 estão disponíveis no ambiente; nenhuma dependência foi instalada. Para iniciar a API local demonstrativa, execute `cd backend` e `npm start`. O projeto não usa Docker.

## Estrutura

```text
index.html                 Vitrine e carrinho demonstrativo
admin.html                 Painel administrativo de demonstração
css/styles.css             Estilos da vitrine
css/admin.css              Estilos do painel
js/products.js             Catálogo fictício centralizado
js/main.js                 Busca, filtros, favoritos, carrinho e checkout simulado
js/admin.js                CRUD local demonstrativo no navegador
assets/images/             Ilustrações SVG locais
backend/                   API demonstrativa somente de leitura e modelo SQL
backups/pre-redesign/      Cópias locais dos arquivos alterados antes da edição
```

## O que funciona nesta demonstração

- Vitrine responsiva com busca, filtros de categoria e ordenação por preço ou ordem recente.
- Detalhes do produto, favoritos mantidos no navegador e consulta pelo WhatsApp.
- Preços e dados do catálogo claramente marcados como demonstrativos.
- Carrinho local com quantidades, remoção, subtotal e persistência em `localStorage`.
- Checkout cenográfico com dados de contato, retirada ou coleta de endereço para cotação de entrega. A tela de resumo declara que nenhum pedido foi enviado e nenhuma cobrança ocorreu.
- Painel demonstrativo em `admin.html`, com indicadores e pedidos estáticos fictícios. É possível adicionar/remover itens locais; isso não altera o catálogo da vitrine nem um estoque real.
- API local somente de leitura: `GET /api/health`, `GET /api/products` (parâmetros opcionais `category` e `q`) e `GET /api/categories`. Respostas identificam `mode: demo`.

## Limites e próximos passos para uma loja real

O backend implementado serve apenas o catálogo demonstrativo; não há banco conectado, autenticação ou autorização, armazenamento de imagens, controle de estoque, pedidos reais, cálculo automático de frete ou integração de pagamento. Não existem endpoints de escrita/administração. O painel é apenas um protótipo no navegador e não deve ser usado para administrar dados reais. Nenhuma senha ou credencial foi criada. O modelo SQL em `backend/database/schema.sql` é referência, não uma migração executada.

Para evoluir com segurança, será necessário decidir provedor e ambiente de banco, serviço de armazenamento, política de autenticação/permissões, logística e provedor de pagamento. Implementar essas integrações requer credenciais válidas no servidor e autorização antes de qualquer cobrança. O modelo de dados precisa contemplar produtos, imagens, estoque, clientes, pedidos, endereço, frete, pagamentos e histórico. Produtos e preços da demonstração devem ser substituídos por dados e imagens confirmados pela loja.

## Site publicado

As alterações desta tarefa foram feitas somente nesta cópia local. Não houve deploy, publicação, commit ou envio para o repositório remoto. Não execute `git push` para apresentar esta demonstração localmente.
