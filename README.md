# Hackathon Enext 2021
  

**Sobre o desafio**
<br/>
Nesse desafio, vocês terão que implementar uma loja do zero, utilizando ReactJS ou Vue.js. O desafio é uma aplicação que irá se conectar à fakeAPIs que vão servir informações de produtos, usuários e pedidos. O objetivo é criar uma loja navegável a partir das informações disponíveis.

**API**
<br/>
Antes de tudo, para que vocês tenham os dados para exibir em tela, iremos consumir a [Fake Store API]('https://fakestoreapi.com/'). A Fake Store API é uma API REST que simula algumas das principais rotas presentes em um e-commerce. Não é possível criar/atualizar nenhuma das informações, portanto, iremos apenas consumir as informações das rotas de produtos e usuários.

Para a criação dos pedidos iremos utilizar o serviço de fake Gateway, um endpoint REST que irá receber as informações do carrinho de compras, do usuário que está comprando e do pagamento selecionado. A documentação desse endpoint está disponível no [final do arquivo](###fake-api).

**Requisitos Mínimos**
<br/>
Definimos um escopo mínimo do projeto, montando o esqueleto básico de um e-commerce, mas sintam-se desafiados a inovar! O escopo mínimo do projeto é o seguinte:
<br/>
- Página Inicial (Home)
> Como qualquer loja de e-commerce, a de vocês deverá ter uma página inicial onde o usuário terá o seu primeiro contato com a loja, alguns dos componentes essenciais dessa página são: um header, um footer, banners e vitrines exibição para os produtos. O header e o footer, devem estar presentes em todas as páginas da aplicação, pra facilitar a navegação  do usuário pelo site. Na home vocês podem consumir as rotas de produto para popular as informações necessárias.
- Página de Produto (PDP)
> Ao selecionar algum produto no site, o usuário deve ser direcionado para a página do produto selecionado. Nessa página, ele deve conseguir ver mais informações sobre o produto selecionado, além da opção de adicionar o produto ao carrinho. Vocês podem consumir as rotas de produto para popular as informações necessárias.
- Carrinho (Cart)
> O carrinho é onde ficam armazenados todos os produtos escolhidos pelo usuário até o momento da finalização da compra. No carrinho, o usuário pode interagir com os produtos, removendo-os, mudando as quantidades desejadas de cada unidade, o valor total da compra, e o botão para ir até o checkout. É essencial que o cart possa ser acessado em qualquer página do site. No cart vocês devem interagir com os produtos escolhidos pelo usuário, uma dica é persistir as informações escolhidas por ele no localStorage, dessa forma, ao atualizar a página o carrinho continuará existindo.
- Finalização do pedido (Checkout)
> A página de checkout é onde o usuário finalizará sua compra após escolher todos os produtos. Nessa página, o usuário pode realizar o seu login, e escolher o seu método de pagamento. Para o login, vocês podem utilizar as informações da rota de usuários, e para o pagamento, podem consumir o serviço fake de gateway. Se tudo estiver correto a compra é finalizada e o usuário deve ser levado até a página de confirmação do pedido.
- Confirmação do Pedido (Confirmation)
> Quando a compra é efetuada com sucesso, uma página com as informações do pedido (id, data, valor total...) e os seus produtos são exibidas para o usuário, além disso, ele também pode voltar ao início do site. Nessa página, vocês podem utilizar as informações persistidas no localStorage, caso tenham optado por essa alternativa, ou então consumirem a rota de cart da API e exibirem essas informações (mesmo que as informações da confirmação não coincidam com o pedido originalmente realizado).

Bom desafio a todos!

### Fake API
