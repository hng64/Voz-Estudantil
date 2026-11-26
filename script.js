const formulario = document.getElementById("formulario");
const lista = document.getElementById("lista-publicacoes");

// Carregar publicações
async function mostrarPublicacoes() {
    const resposta = await fetch("/listar");
    const publicacoes = await resposta.json();

    lista.innerHTML = "";

    publicacoes.forEach(item => {
        const card = document.createElement("article");
        card.className = "publicacao";

        card.innerHTML = `
            <span class="categoria">${item.tipo}</span>
            <h3></h3>
            <p></p>
            <p class="aviso">Publicação anônima</p>
        `;

        card.querySelector("h3").textContent = item.titulo;
        card.querySelector("p").textContent = item.descricao;

        lista.appendChild(card);
    });
}


// Cadastrar publicação
formulario.addEventListener("submit", async function(event) {
    event.preventDefault();

    const tipo = document.getElementById("tipo").value;
    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;

    await fetch("/salvar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            tipo: tipo,
            titulo: titulo,
            descricao: descricao
        })
    });

    formulario.reset();

    mostrarPublicacoes();

    alert("Publicação criada!");
});


// Carregar ao abrir o site
mostrarPublicacoes();