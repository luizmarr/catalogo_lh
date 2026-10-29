
/* ========================================
   LH MULTIMARCAS — CATÁLOGO
======================================== */

// Cadastre os produtos da loja neste array.
// Enquanto estiver vazio, será exibida uma mensagem.
const produtos = [
    /*
    Exemplo de produto:

    {
        nome: "Camiseta Streetwear",
        descricao: "Camiseta preta oversized",
        imagem: "imagens/camiseta.jpg"
    }
    */
];

const containerProdutos = document.getElementById("produtos");

function criarProduto(produto) {
    const card = document.createElement("article");
    card.className = "produto-card";

    const imagem = document.createElement("img");
    imagem.src = produto.imagem;
    imagem.alt = produto.nome;
    imagem.loading = "lazy";

    // Se a imagem não existir, esconde somente a imagem quebrada.
    imagem.addEventListener("error", () => {
        imagem.style.display = "none";
    });

    const informacoes = document.createElement("div");
    informacoes.className = "produto-info";

    const nome = document.createElement("h3");
    nome.textContent = produto.nome;

    const descricao = document.createElement("p");
    descricao.textContent = produto.descricao || "";

    const botao = document.createElement("a");
    botao.className = "botao botao-contorno";
    botao.href =
        "https://wa.me/5511987524040?text=" +
        encodeURIComponent(
            `Olá! Tenho interesse no produto: ${produto.nome}`
        );
    botao.target = "_blank";
    botao.rel = "noopener noreferrer";
    botao.textContent = "Consultar produto";

    informacoes.append(nome, descricao, botao);
    card.append(imagem, informacoes);

    return card;
}

function carregarProdutos() {
    if (!containerProdutos) {
        console.error('Não encontrei o elemento com id="produtos".');
        return;
    }

    containerProdutos.replaceChildren();

    if (produtos.length === 0) {
        const mensagem = document.createElement("div");
        mensagem.className = "catalogo-vazio";

        const texto = document.createElement("p");
        texto.textContent = "NOVOS PRODUTOS EM BREVE.";

        mensagem.appendChild(texto);
        containerProdutos.appendChild(mensagem);
        return;
    }

    produtos.forEach((produto) => {
        containerProdutos.appendChild(criarProduto(produto));
    });
}

document.addEventListener("DOMContentLoaded", carregarProdutos);
