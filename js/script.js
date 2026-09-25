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


const containerProdutos = document.getElementById("produtos");


function formatarPreco(preco) {
    return preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


function carregarProdutos() {

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

                    <h3>
                        ${produto.nome}
                    </h3>

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
   PÁGINA DO PRODUTO
========================= */

const containerDetalhes = document.getElementById("produto-detalhes");

if (containerDetalhes) {

    const parametros = new URLSearchParams(window.location.search);

    const idProduto = Number(parametros.get("id"));

    const produto = produtos.find(item => item.id === idProduto);

    if (produto) {

        document.title = `${produto.nome} | LH Streetwear`;

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

                    <a
    href="https://wa.me/5511987524040?text=${encodeURIComponent(`Olá! Tenho interesse no produto ${produto.nome}.`)}"
    target="_blank"
    class="btn btn-whatsapp"
>
    FALAR PELO WHATSAPP
</a>

                    <a
                        href="index.html#catalogo"
                        class="voltar-catalogo"
                    >
                        ← Voltar para o catálogo
                    </a>

                </div>

            </div>

        `;

    } else {

        containerDetalhes.innerHTML = `

            <div class="produto-nao-encontrado">

                <h1>Produto não encontrado</h1>

                <a href="index.html" class="btn">
                    VOLTAR AO CATÁLOGO
                </a>

            </div>

        `;
    }
}