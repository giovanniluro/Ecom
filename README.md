# Hackathon Enext 2021
  

**Sobre o desafio**
<br/>
Nesse desafio, vocês terão que implementar uma loja do zero, utilizando ReactJS ou Vue.js. O desafio é uma aplicação que irá se conectar à fakeAPIs que vão fornecer informações de produtos, usuários e pedidos. O objetivo é criar uma loja navegável a partir das informações disponíveis.

**API**
<br/>
Antes de tudo, para que vocês tenham os dados para exibir em tela, iremos consumir a [Fake Store API](https://fakestoreapi.com/docs). A Fake Store API é uma API REST que simula algumas das principais rotas presentes em um e-commerce. Não é possível criar/atualizar nenhuma das informações, portanto, iremos apenas consumir as informações das rotas de produtos e usuários.

Para a criação dos pedidos iremos utilizar o serviço de fake Gateway, um endpoint REST que irá receber as informações do carrinho de compras do usuário que está comprando e do pagamento selecionado. A documentação desse endpoint está disponível no [final do arquivo](#gateway).

**Requisitos Mínimos**
<br/>
Definimos um escopo mínimo do projeto, montando o esqueleto básico de um e-commerce, mas sintam-se desafiados a inovar! O escopo mínimo do projeto é o seguinte:
<br/>
- Página Inicial (Home)
> Como qualquer loja de e-commerce, a de vocês deverá ter uma página inicial onde o usuário terá o seu primeiro contato com a loja, alguns dos componentes essenciais dessa página são: um header, um footer, banners e vitrines de exibição para os produtos. O header e o footer, devem estar presentes em todas as páginas da aplicação, pra facilitar a navegação  do usuário pelo site. Na home vocês podem consumir as rotas de produto para popular as informações necessárias.
- Página de Produto (PDP)
> Ao selecionar algum produto no site, o usuário deve ser direcionado para a página do produto selecionado. Nessa página, ele deve conseguir ver mais informações sobre o produto selecionado, além da opção de adicionar o produto ao carrinho. Vocês podem consumir as rotas de produto para popular as informações necessárias.
- Carrinho (Cart)
> O carrinho é onde ficam armazenados todos os produtos escolhidos pelo usuário até o momento da finalização da compra. No carrinho, o usuário pode interagir com os produtos, removendo-os, mudando as quantidades desejadas de cada unidade, o valor total da compra, e o botão para ir até o checkout. É essencial que o cart possa ser acessado em qualquer página do site. No cart vocês devem interagir com os produtos escolhidos pelo usuário, uma dica é persistir as informações escolhidas por ele no localStorage, dessa forma, ao atualizar a página o carrinho continuará existindo.
- Finalização do pedido (Checkout)
> A página de checkout é onde o usuário finalizará sua compra após escolher todos os produtos. Nessa página, o usuário pode realizar o seu login, e escolher o seu método de pagamento. Para o login, vocês podem utilizar as informações da rota de usuários, e para o pagamento, podem consumir o serviço fake de gateway. Se tudo estiver correto a compra é finalizada e o usuário deve ser levado até a página de confirmação do pedido.
- Confirmação do Pedido (Confirmation)
> Quando a compra é efetuada com sucesso, uma página com as informações do pedido (id, data, valor total...) e os seus produtos são exibidas para o usuário, além disso, ele também pode voltar ao início do site. Nessa página, vocês podem utilizar as informações persistidas no localStorage, caso tenham optado por essa alternativa, ou então consumirem a rota de cart da API e exibirem essas informações (mesmo que as informações da confirmação não coincidam com o pedido originalmente realizado).

Bom desafio a todos!

<a name="gateway"></a>
### GatewayAPI

Para finalizar um pedido, iremos utilizar a fake API de Gateway, ela é acessada a partir do recurso:

```
POST https://ha409pwkmf.execute-api.us-east-1.amazonaws.com/prod/payment
```

Ao finalizar o pedido nessa rota, vocês devem enviar no body da requisição as informações do pedido no seguinte formato:

```
{
products: [], //Array de produtos
userId: 1, //Número associado ao id do usuário que está realizando o pedido,
payment: {}, //Objeto contendo as informações de pagamento,
shippingAddress: {}, //Objeto contendo as informações do endereço de entrega
}
```

O array de produtos pode ser preenchido com as informações dos produtos do carrinho, não existe nenhuma formatação obrigatória pra esse campo, ele só não pode ir vazio, a mesma regra se aplica ao shippingAddress, ele não tem nenhum formato obrigatório, mas precisa ir preenchido com alguma informação. O userId é um valor númerico associado ao usuário que está realizando o pedido. O payment é o campo onde serão enviadas as informações de pagamento. O gateway aceita 3 tipos de pagamento, que são: "cash" (boleto), "creditCard" (cartão de crétdito) e "debitCard". (cartão de débito). Os payloads de cada tipo devem ser preenchidos das seguintes maneiras:

<br/>

**Cash (boleto)**

<br/>

```
payment: {
 type: "cash",
 total: 1234.50, //valor total da compra
}
```
<br>

**creditCard (cartão de crédito)**

<br/>

```
payment: {
 type: "creditCard",
 cardNumber: "4444555566667777"//número do cartão de crédito
 cvv: "123" //cvv do cartão de crédito
 nameOnCard: "John Doe"//nome impresso no cartão de crédito
 expiryDate: "22/04/2024"//data de expiração do cartão de crédito
 brand: "visa" //bandeira do cartão de crédito 
 total: 1234.50, //valor total da compra
}
```
<br/>

**debitCard (cartão de débito)**

<br/>

```
payment: {
 type: "debitCard",
 cardNumber: "4444555566667777"//número do cartão de débito 
 nameOnCard: "John Doe"//nome impresso no cartão de débito
 total: 1234.50, //valor total da compra
}
```
<br/>

O endpoint irá validar todos os campos e retornará uma mensagem de erro, caso alguma informação esteja errada, no seguinte formato:

```
status: 400 data: {
    "error": "Property 'userId' must be a number"
}
```
Para os casos de sucesso o endpoint irá retornar como resposta as informações enviadas inicialmente, junto com um id único do pedido, e a data de criação do pedido. Essas informações não são persistidas em nenhum banco de dados, e irão servir apenas para a exibição das informações na página de confirmação de pedido.

**Exemplo de requisição correta**
```
{
    "products": [
        {
            "product": {
                "id": 3,
                "title": "Mens Cotton Jacket",
                "price": 55.99,
                "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
                "category": "men's clothing",
                "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"
            },
            "quantity": 3
        }
    ],
    "userId": 1,
    "payment": {
        "type": "creditCard",
        "cardNumber": "12345678",
        "cvv": "1234",
        "expiryDate": "22/04/1992",
        "brand": "visa",
        "nameOnCard": "John Doe",
        "total": 167.98
    },
    "shippingAddress": {
        "cepCode": "13466460",
        "address": "Rua Tamoio",
        "number": "40",
        "county": "Vila Santa Catarina",
        "city": "Americana",
        "state": "SP"
    }
}
```

**Exemplo de retorno com sucesso**
```
{
    "products": [
        {
            "product": {
                "id": 3,
                "title": "Mens Cotton Jacket",
                "price": 55.99,
                "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
                "category": "men's clothing",
                "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"
            },
            "quantity": 3
        }
    ],
    "userId": 1,
    "payment": {
        "type": "creditCard",
        "cardNumber": "12345678",
        "cvv": "1234",
        "expiryDate": "22/04/1992",
        "brand": "visa",
        "nameOnCard": "John Doe",
        "total": 167.98
    },
    "shippingAddress": {
        "cepCode": "13466460",
        "address": "Rua Tamoio",
        "number": "40",
        "county": "Vila Santa Catarina",
        "city": "Americana",
        "state": "SP"
    },
    "id": "b878715c-a5a1-4b8a-b009-aee6ba827d46",
    "creationDate": "2021-08-26T16:44:29.244Z"
}
```


