# Vend e Trok — vitrine digital de móveis e artigos usados

Site institucional e catálogo demonstrativo desenvolvido para a **Vend e Trok Comércio de Usados**, em Mogi das Cruzes (SP).

O projeto apresenta a loja, sua proposta de reaproveitamento, exemplos de produtos e formas de contato. O visitante pode explorar a vitrine, pesquisar itens, salvar seus favoritos e enviar uma consulta personalizada diretamente pelo WhatsApp.

## Repositório

Código-fonte disponível em:

<https://github.com/GustavoSales2001/vend-e-trok-site>

## Funcionalidades

- Layout responsivo para computadores, tablets e celulares.
- Navegação por seções com rolagem suave.
- Animações variadas quando os conteúdos entram na área visível.
- Compatibilidade com a preferência de redução de movimento do dispositivo.
- Catálogo demonstrativo organizado por categorias.
- Filtros para sala, quarto, cozinha, escritório e outros itens.
- Busca instantânea por nome, descrição ou categoria.
- Modal com detalhes de cada produto.
- Lista de interesse salva no navegador com `localStorage`.
- Envio da lista completa de favoritos pelo WhatsApp.
- Consulta de um produto específico com mensagem personalizada.
- Botão flutuante e outros atalhos de contato pelo WhatsApp.
- Link direto para a localização da loja no Google Maps.
- Menu adaptado para dispositivos móveis.
- Elementos básicos de acessibilidade, navegação por teclado e textos alternativos.

## Contato configurado

- **WhatsApp:** [(11) 98887-5052](https://wa.me/5511988875052)
- **Telefone:** (11) 4791-2391
- **Endereço:** Rua Fidalgo, 69 — Centro, Mogi das Cruzes — SP

As mensagens do WhatsApp mudam conforme a ação do visitante. Ao consultar uma peça, o nome do item é incluído automaticamente. Ao enviar a lista de interesse, todos os produtos salvos são adicionados à mensagem.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript puro
- SVG para ilustrações e ícones
- `localStorage` para manter a lista de interesse
- `IntersectionObserver` para ativar as animações durante a rolagem

O projeto não utiliza frameworks, bibliotecas externas, banco de dados ou processo de instalação.

## Como executar localmente

### Opção 1 — abrir diretamente

1. Baixe ou clone este repositório.
2. Abra a pasta `vend-e-trok-site`.
3. Clique duas vezes no arquivo `index.html`.

### Opção 2 — usar o VS Code

```bash
git clone https://github.com/GustavoSales2001/vend-e-trok-site.git
cd vend-e-trok-site
code .
```

Depois, abra o `index.html` no navegador. Também é possível usar uma extensão de servidor local, como o Live Server, mas ela não é obrigatória.

## Estrutura do projeto

```text
vend-e-trok-site/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── main.js
│   └── products.js
├── assets/
│   ├── icons/
│   │   └── favicon.svg
│   └── images/
│       ├── aparador.svg
│       ├── cadeira.svg
│       ├── comoda.svg
│       ├── estante.svg
│       ├── geladeira.svg
│       ├── hero-room.svg
│       ├── mesa.svg
│       ├── poltrona.svg
│       └── sofa.svg
├── LEIA-PRIMEIRO.txt
└── README.md
```

## Como atualizar o catálogo

Os produtos demonstrativos ficam no arquivo `js/products.js`. Cada item segue esta estrutura:

```js
{
  id: 'sofa-2',
  title: 'Sofá de 2 lugares',
  category: 'sala',
  categoryLabel: 'Sala de estar',
  image: 'assets/images/sofa.svg',
  badge: 'Inspiração',
  description: 'Descrição curta',
  details: 'Informações adicionais sobre a peça'
}
```

Para cadastrar um item:

1. Adicione a imagem em `assets/images/`.
2. Copie um dos objetos existentes em `js/products.js`.
3. Defina um `id` único.
4. Atualize nome, categoria, imagem, descrição e detalhes.
5. Abra o site e teste a busca, o filtro, o modal e a mensagem do WhatsApp.

## Como enviar novas alterações ao GitHub

Depois de modificar os arquivos, execute no terminal do VS Code:

```bash
git add .
git commit -m "Descreva a alteração realizada"
git push
```

## Status do projeto

Esta versão funciona como uma **vitrine demonstrativa**. Os produtos e ilustrações atuais são exemplos e não representam estoque confirmado.

Antes de utilizar o site como catálogo oficial da loja, é necessário substituir os exemplos por fotos e informações reais, confirmando disponibilidade, estado de conservação e valores.

O projeto não possui checkout, pagamentos, reserva automática, painel administrativo ou controle de estoque. A lista de interesse permanece no navegador do visitante e somente é enviada à loja quando ele toca no botão do WhatsApp.

## Próximas melhorias possíveis

- Publicação do site com GitHub Pages.
- Cadastro de produtos reais e preços atualizados.
- Painel administrativo para gerenciar o catálogo.
- Integração com banco de dados e controle de estoque.
- Recebimento e acompanhamento de solicitações de orçamento.

---

Projeto desenvolvido como apresentação digital da Vend e Trok Comércio de Usados.
