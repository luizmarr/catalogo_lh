const produtos = [];

const containerProdutos = document.getElementById("produtos");

function carregarProdutos() {

    if (!containerProdutos) return;

    containerProdutos.innerHTML = `
        <div class="catalogo-vazio">
            <p>NOVOS PRODUTOS EM BREVE.</p>
        </div>
    `;
}

carregarProdutos();


