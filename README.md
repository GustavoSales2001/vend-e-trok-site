# Vend e Trok — site demonstrativo de vitrine comercial

Projeto criado para apresentar uma proposta de site para a **Vend e Trok Comércio de Usados**, localizada na Rua Fidalgo, 69, Centro, Mogi das Cruzes, SP. Telefone público: **(11) 4791-2391**.

## Como abrir agora (sem instalar nada)

1. Extraia a pasta `vend-e-trok-site` do ZIP.
2. Mantenha `index.html`, `css`, `js` e `assets` **juntos**, dentro da mesma pasta.
3. Clique duas vezes em `index.html` para abrir no navegador.
4. Para editar no VS Code: **Arquivo > Abrir Pasta... > vend-e-trok-site**.

O site funciona localmente sem servidor, extensões, pacotes ou dependências externas.

## Estrutura do projeto

```text
vend-e-trok-site/
├── index.html                # Página principal
├── css/
│   └── styles.css            # Cores, layout, animações e responsividade
├── js/
│   ├── products.js           # Catálogo demonstrativo (edite aqui)
│   └── main.js               # Filtros, busca, lista e modal
├── assets/
│   ├── icons/favicon.svg     # Ícone da aba do navegador
│   └── images/               # Imagens SVG locais criadas para o modelo
├── README.md
└── LEIA-PRIMEIRO.txt
```

## O que já funciona

- Página responsiva para computador e celular.
- Filtros de produtos por categoria.
- Busca instantânea por nome, descrição ou categoria.
- Detalhes individuais dos itens em janela/modal.
- Botão de favoritos, com lista de interesse salva no navegador (`localStorage`).
- Copiar uma lista para pedir informações à loja.
- Botão **Ligar** usando o telefone público informado.
- Botão de endereço que abre o Google Maps.
- Animações suaves e variadas conforme o conteúdo entra na tela, com suporte à preferência de redução de movimento.
- WhatsApp do proprietário com mensagem específica para cada produto e para a lista de interesse.
- Menu mobile e navegação pelas seções.
- Acessibilidade básica, textos alternativos e redução de movimento.
- Imagens e estilos locais: não depende de imagens remotas ou de Google Fonts.

## IMPORTANTE — antes de publicar em nome da loja

**Este é um PROTÓTIPO comercial, não uma loja virtual em funcionamento.**

- As 8 peças do catálogo e suas ilustrações são fictícias, **não foram verificadas em estoque**.
- Não há preços, formas de pagamento, garantias, promessa de entrega nem afirmação de que a loja vende online.
- Substitua fotos e produtos por itens reais, com autorização da loja, e confirme preço, estado de conservação e disponibilidade.
- Confirme com o proprietário endereço e telefone atualizados, identidade visual e horário de atendimento.
- O WhatsApp informado pelo proprietário está configurado como **(11) 98887-5052**.
- Não há checkout, pagamento integrado, gestão de estoque, área administrativa, banco de dados ou formulário enviando dados a servidor.
- A lista de interesse funciona apenas no navegador do visitante; **não chega automaticamente ao estabelecimento**.

## Como atualizar o catálogo

Abra `js/products.js`. Cada item possui os campos:

```js
{
  id: 'sofa-2',
  title: 'Sofá de 2 lugares',
  category: 'sala',
  categoryLabel: 'Sala de estar',
  image: 'assets/images/sofa.svg',
  badge: 'Inspiração',
  description: 'Descrição curta',
  details: 'Detalhes e estado real, após confirmação'
}
```

1. Coloque a foto real em `assets/images/` (ex.: `sofa-real.jpg`).
2. Troque o caminho do `image` para `assets/images/sofa-real.jpg`.
3. Troque `title`, `description`, `details` e `badge` com informações aprovadas.
4. Para adicionar um produto, copie um objeto e crie um `id` único.
5. Se o site for publicado, retire ou reescreva todos os avisos de "vitrine demonstrativa" **somente depois** de fornecer um catálogo real.

## Próxima etapa recomendada

Ao validar a proposta com a loja, é possível construir um painel privado para cadastrar fotos, preços e estoque, com API, banco de dados e fluxo de orçamentos. Essa fase precisa de backend e hospedagem e não faz parte desta versão estática.

---

Proposta de apresentação independente. A marca e os dados públicos da empresa foram usados apenas para demonstrar o conceito. A aprovação e publicação dependem de autorização do estabelecimento.
