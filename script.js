
const formulario = document.getElementById("formulario");
const lista = document.getElementById("lista-publicacoes");

let publicacoes = [];

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const tipo = document.getElementById("tipo").value;
    const titulo = document.getElementById("titulo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();

    if (!tipo || !titulo || !descricao) {
        alert("Preencha todos os campos!");
        return;
    }

    const publicacao = {
        id: Date.now(),
        tipo: tipo,
        titulo: titulo,
        descricao: descricao,
        apoios: 0
    };

    publicacoes.unshift(publicacao);

    mostrarPublicacoes();
    formulario.reset();

    alert("Publicação criada com sucesso! 💗");
});

function mostrarPublicacoes() {
    lista.replaceChildren();

    publicacoes.forEach(function(item) {
        const card = document.createElement("article");
        card.className = "publicacao";

        const categoria = document.createElement("span");
        categoria.className = "categoria";
        categoria.textContent = item.tipo;

        const titulo = document.createElement("h3");
        titulo.textContent = item.titulo;

        const descricao = document.createElement("p");
        descricao.textContent = item.descricao;

        const autor = document.createElement("p");
        autor.textContent = "♡ Publicação anônima";
        autor.className = "aviso";

        const botao = document.createElement("button");
        botao.className = "apoiar";
        botao.textContent = `♡ Apoiar (${item.apoios})`;

        botao.addEventListener("click", function() {
            item.apoios++;
            mostrarPublicacoes();
        });

        card.append(categoria, titulo, descricao, autor, botao);
        lista.appendChild(card);
    });
}
