const produtos = [
    {
        id: 1,
        nome: "Camiseta Oversized Preta",
        preco: 89.90,
        imagem: "imagens/camiseta-preta.jpg",
        categoria: "Camisetas"
    },

    {
        id: 2,
        nome: "Camiseta Oversized Branca",
        preco: 89.90,
        imagem: "imagens/camiseta-branca.jpg",
        categoria: "Camisetas"
    },

    {
        id: 3,
        nome: "Calça Cargo Preta",
        preco: 149.90,
        imagem: "imagens/calca-cargo.jpg",
        categoria: "Calças"
    },

    {
        id: 4,
        nome: "Moletom Streetwear",
        preco: 179.90,
        imagem: "imagens/moletom.jpg",
        categoria: "Moletons"
    }
];

const WHATSAPP = "5511987524040";


/* =========================
   PREÇO
========================= */

function formatarPreco(preco) {
    return preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


/* =========================
   PRODUTOS
========================= */

const containerProdutos = document.getElementById("produtos");

function carregarProdutos() {

    if (!containerProdutos) return;

    containerProdutos.innerHTML = "";

    produtos.forEach(produto => {

        const card = document.createElement("article");

        card.classList.add("produto-card");

        card.innerHTML = `
            <a href="produto.html?id=${produto.id}" class="produto-link">

                <div class="produto-imagem">
                    <img
                        src="${produto.imagem}"
                        alt="${produto.nome}"
                    >
                </div>

                <div class="produto-info">

                    <span class="produto-categoria">
                        ${produto.categoria}
                    </span>

                    <h3>${produto.nome}</h3>

                    <strong>
                        ${formatarPreco(produto.preco)}
                    </strong>

                </div>

            </a>
        `;

        containerProdutos.appendChild(card);
    });
}

carregarProdutos();


/* =========================
   CARRINHO
========================= */

function obterCarrinho() {
    return JSON.parse(localStorage.getItem("lh_carrinho")) || [];
}


function salvarCarrinho(carrinho) {
    localStorage.setItem("lh_carrinho", JSON.stringify(carrinho));
}


function adicionarAoCarrinho(produto, tamanho, quantidade) {

    const carrinho = obterCarrinho();

    const itemExistente = carrinho.find(item =>
        item.id === produto.id &&
        item.tamanho === tamanho
    );

    if (itemExistente) {

        itemExistente.quantidade += quantidade;

    } else {

        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            imagem: produto.imagem,
            tamanho: tamanho,
            quantidade: quantidade
        });

    }

    salvarCarrinho(carrinho);

    atualizarCarrinho();

    abrirCarrinho();
}


/* =========================
   TOTAL
========================= */

function calcularTotal() {

    const carrinho = obterCarrinho();

    return carrinho.reduce((total, item) => {
        return total + (item.preco * item.quantidade);
    }, 0);
}


/* =========================
   QUANTIDADE DO CARRINHO
========================= */

function quantidadeCarrinho() {

    const carrinho = obterCarrinho();

    return carrinho.reduce((total, item) => {
        return total + item.quantidade;
    }, 0);
}


/* =========================
   CARRINHO HTML
========================= */

function criarCarrinho() {

    if (document.getElementById("carrinho-overlay")) return;

    const carrinhoHTML = `

        <div id="carrinho-overlay" class="carrinho-overlay">

            <div class="carrinho">

                <div class="carrinho-header">

                    <div>
                        <span class="carrinho-label">
                            SEU PEDIDO
                        </span>

                        <h2>
                            CARRINHO
                        </h2>
                    </div>

                    <button
                        id="fechar-carrinho"
                        class="fechar-carrinho"
                    >
                        ×
                    </button>

                </div>


                <div
                    id="carrinho-itens"
                    class="carrinho-itens"
                >
                </div>


                <div class="carrinho-footer">

                    <div class="carrinho-total">

                        <span>TOTAL</span>

                        <strong id="carrinho-total">
                            R$ 0,00
                        </strong>

                    </div>

                    <button
                        id="finalizar-whatsapp"
                        class="btn btn-finalizar"
                    >
                        FINALIZAR PELO WHATSAPP
                    </button>

                    <button
                        id="limpar-carrinho"
                        class="limpar-carrinho"
                    >
                        Limpar carrinho
                    </button>

                </div>

            </div>

        </div>

        <button
            id="abrir-carrinho"
            class="botao-carrinho"
        >
            🛒
            <span id="contador-carrinho">0</span>
        </button>
    `;

    document.body.insertAdjacentHTML("beforeend", carrinhoHTML);


    document
        .getElementById("fechar-carrinho")
        .addEventListener("click", fecharCarrinho);


    document
        .getElementById("carrinho-overlay")
        .addEventListener("click", function(event) {

            if (event.target.id === "carrinho-overlay") {
                fecharCarrinho();
            }

        });


    document
        .getElementById("abrir-carrinho")
        .addEventListener("click", abrirCarrinho);


    document
        .getElementById("limpar-carrinho")
        .addEventListener("click", function() {

            localStorage.removeItem("lh_carrinho");

            atualizarCarrinho();

        });


    document
        .getElementById("finalizar-whatsapp")
        .addEventListener("click", finalizarWhatsApp);
}


/* =========================
   ATUALIZAR CARRINHO
========================= */

function atualizarCarrinho() {

    criarCarrinho();

    const carrinho = obterCarrinho();

    const container = document.getElementById("carrinho-itens");

    const total = document.getElementById("carrinho-total");

    const contador = document.getElementById("contador-carrinho");

    contador.textContent = quantidadeCarrinho();

    total.textContent = formatarPreco(calcularTotal());


    if (carrinho.length === 0) {

        container.innerHTML = `
            <div class="carrinho-vazio">

                <div class="carrinho-vazio-icon">
                    🛒
                </div>

                <h3>
                    Seu carrinho está vazio
                </h3>

                <p>
                    Adicione alguns produtos para começar.
                </p>

            </div>
        `;

        return;
    }


    container.innerHTML = "";


    carrinho.forEach((item, index) => {

        const elemento = document.createElement("div");

        elemento.classList.add("item-carrinho");

        elemento.innerHTML = `

            <img
                src="${item.imagem}"
                alt="${item.nome}"
            >

            <div class="item-carrinho-info">

                <h3>
                    ${item.nome}
                </h3>

                <span>
                    Tamanho: ${item.tamanho}
                </span>

                <strong>
                    ${formatarPreco(item.preco)}
                </strong>


                <div class="controle-quantidade">

                    <button
                        onclick="alterarQuantidade(${index}, -1)"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantidade}
                    </span>

                    <button
                        onclick="alterarQuantidade(${index}, 1)"
                    >
                        +
                    </button>

                </div>

            </div>


            <button
                class="remover-item"
                onclick="removerDoCarrinho(${index})"
            >
                ×
            </button>
        `;

        container.appendChild(elemento);
    });
}


/* =========================
   ALTERAR QUANTIDADE
========================= */

function alterarQuantidade(index, valor) {

    const carrinho = obterCarrinho();

    carrinho[index].quantidade += valor;

    if (carrinho[index].quantidade <= 0) {

        carrinho.splice(index, 1);

    }

    salvarCarrinho(carrinho);

    atualizarCarrinho();
}


/* =========================
   REMOVER
========================= */

function removerDoCarrinho(index) {

    const carrinho = obterCarrinho();

    carrinho.splice(index, 1);

    salvarCarrinho(carrinho);

    atualizarCarrinho();
}


/* =========================
   ABRIR / FECHAR
========================= */

function abrirCarrinho() {

    criarCarrinho();

    atualizarCarrinho();

    document
        .getElementById("carrinho-overlay")
        .classList.add("ativo");

    document.body.classList.add("carrinho-aberto");
}


function fecharCarrinho() {

    const overlay = document.getElementById("carrinho-overlay");

    if (overlay) {
        overlay.classList.remove("ativo");
    }

    document.body.classList.remove("carrinho-aberto");
}


/* =========================
   WHATSAPP
========================= */

function finalizarWhatsApp() {

    const carrinho = obterCarrinho();

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio.");

        return;
    }


    let mensagem = "Olá! Gostaria de fazer um pedido na LH Streetwear.%0A%0A";

    carrinho.forEach(item => {

        mensagem +=
            `• ${item.quantidade}x ${item.nome}%0A` +
            `  Tamanho: ${item.tamanho}%0A` +
            `  Valor: ${formatarPreco(item.preco * item.quantidade)}%0A%0A`;

    });


    mensagem += `*Total: ${formatarPreco(calcularTotal())}*%0A%0A`;

    mensagem += "Aguardo confirmação do pedido!";


    const url = `https://wa.me/${WHATSAPP}?text=${mensagem}`;

    window.open(url, "_blank");
}


/* =========================
   PÁGINA DO PRODUTO
========================= */

const containerDetalhes = document.getElementById("produto-detalhes");


if (containerDetalhes) {

    const parametros =
        new URLSearchParams(window.location.search);

    const idProduto =
        Number(parametros.get("id"));

    const produto =
        produtos.find(item => item.id === idProduto);


    if (produto) {

        document.title =
            `${produto.nome} | LH Streetwear`;


        containerDetalhes.innerHTML = `

            <div class="produto-detalhes">

                <div class="produto-detalhes-imagem">

                    <img
                        src="${produto.imagem}"
                        alt="${produto.nome}"
                    >

                </div>


                <div class="produto-detalhes-info">

                    <span class="produto-detalhes-categoria">
                        ${produto.categoria}
                    </span>


                    <h1>
                        ${produto.nome}
                    </h1>


                    <div class="produto-detalhes-preco">
                        ${formatarPreco(produto.preco)}
                    </div>


                    <p class="produto-detalhes-descricao">
                        Peça selecionada para quem busca estilo,
                        qualidade e personalidade.
                    </p>


                    <div class="selecao-produto">

                        <label>
                            TAMANHO
                        </label>

                        <div class="tamanhos">

                            <button class="tamanho" data-tamanho="P">
                                P
                            </button>

                            <button class="tamanho" data-tamanho="M">
                                M
                            </button>

                            <button class="tamanho" data-tamanho="G">
                                G
                            </button>

                            <button class="tamanho" data-tamanho="GG">
                                GG
                            </button>

                        </div>


                        <label>
                            QUANTIDADE
                        </label>

                        <div class="quantidade-produto">

                            <button id="diminuir">
                                −
                            </button>

                            <span id="quantidade">
                                1
                            </span>

                            <button id="aumentar">
                                +
                            </button>

                        </div>

                    </div>


                    <button
                        id="adicionar-carrinho"
                        class="btn btn-whatsapp"
                    >
                        ADICIONAR AO CARRINHO
                    </button>


                    <button
                        id="comprar-agora"
                        class="btn btn-comprar-agora"
                    >
                        COMPRAR AGORA PELO WHATSAPP
                    </button>


                    <a
                        href="index.html#catalogo"
                        class="voltar-catalogo"
                    >
                        ← Voltar para o catálogo
                    </a>

                </div>

            </div>
        `;


        let tamanhoSelecionado = null;

        let quantidade = 1;


        /* TAMANHO */

        document
            .querySelectorAll(".tamanho")
            .forEach(botao => {

                botao.addEventListener("click", function() {

                    document
                        .querySelectorAll(".tamanho")
                        .forEach(item => {
                            item.classList.remove("selecionado");
                        });

                    this.classList.add("selecionado");

                    tamanhoSelecionado =
                        this.dataset.tamanho;

                });

            });


        /* QUANTIDADE */

        const quantidadeElemento =
            document.getElementById("quantidade");


        document
            .getElementById("aumentar")
            .addEventListener("click", function() {

                quantidade++;

                quantidadeElemento.textContent =
                    quantidade;

            });


        document
            .getElementById("diminuir")
            .addEventListener("click", function() {

                if (quantidade > 1) {

                    quantidade--;

                    quantidadeElemento.textContent =
                        quantidade;

                }

            });


        /* ADICIONAR AO CARRINHO */

        document
            .getElementById("adicionar-carrinho")
            .addEventListener("click", function() {

                if (!tamanhoSelecionado) {

                    alert("Selecione um tamanho antes de adicionar ao carrinho.");

                    return;
                }


                adicionarAoCarrinho(
                    produto,
                    tamanhoSelecionado,
                    quantidade
                );

            });


        /* COMPRAR AGORA */

        document
            .getElementById("comprar-agora")
            .addEventListener("click", function() {

                if (!tamanhoSelecionado) {

                    alert("Selecione um tamanho antes de continuar.");

                    return;
                }


                const mensagem =
                    `Olá! Tenho interesse em fazer um pedido na LH Streetwear.%0A%0A` +
                    `Produto: ${produto.nome}%0A` +
                    `Tamanho: ${tamanhoSelecionado}%0A` +
                    `Quantidade: ${quantidade}%0A` +
                    `Total: ${formatarPreco(produto.preco * quantidade)}`;


                const url =
                    `https://wa.me/${WHATSAPP}?text=${mensagem}`;

                window.open(url, "_blank");

            });

    } else {

        containerDetalhes.innerHTML = `

            <div class="produto-nao-encontrado">

                <h1>
                    Produto não encontrado
                </h1>

                <a
                    href="index.html"
                    class="btn"
                >
                    VOLTAR AO CATÁLOGO
                </a>

            </div>
        `;
    }
}


/* =========================
   INICIALIZAR CARRINHO
========================= */

criarCarrinho();

atualizarCarrinho();