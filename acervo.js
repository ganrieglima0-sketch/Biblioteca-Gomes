/* =========================================================
  DROPDOWN FILTRO (abre/fecha com clique)
========================================================= */
const btnOrdenar   = document.getElementById("btn-ordenar");
const caixaOrdenar = document.getElementById("ordenar");
const setaOrdenar  = document.getElementById("seta-ordenar");
const textoOrdenar = document.getElementById("texto-ordenar");

function abrirOrdenar() {
    caixaOrdenar.classList.add("aberto");
    btnOrdenar.classList.add("ativo");
    setaOrdenar.innerHTML = '<i class="fa-solid fa-caret-up"></i>';
}

function fecharOrdenar() {
    caixaOrdenar.classList.remove("aberto");
    btnOrdenar.classList.remove("ativo");
    setaOrdenar.innerHTML = '<i class="fa-solid fa-caret-down"></i>';
}

// clica no botão: abre/fecha
btnOrdenar.addEventListener("click", function (e) {
    e.stopPropagation();
    caixaOrdenar.classList.contains("aberto") ? fecharOrdenar() : abrirOrdenar();
});

// clica numa opção: ordena, atualiza o texto e fecha
caixaOrdenar.querySelectorAll("a").forEach(function (item) {
    item.addEventListener("click", function (e) {
        e.preventDefault();
        ordenarPor(this.dataset.valor);
        textoOrdenar.textContent = this.textContent;
        fecharOrdenar();
    });
});

// clica fora: fecha
document.addEventListener("click", function (e) {
    if (!e.target.closest(".dropdown-customizado")) {
        fecharOrdenar();
    }
});

/* =========================================================
   ACERVO: LISTA, BUSCA, CATEGORIAS E ORDENAÇÃO
   Os livros vêm do livros.js (variável LIVROS). Não existe
   lista de livros neste arquivo.
   ========================================================= */
const grade = document.getElementById('grade-livros');
const contador = document.getElementById('contador');
const rodapeLista = document.getElementById('rodape-lista');
const campoBusca = document.getElementById('busca');

let categoriaAtual = 'Todos';
let criterioOrdenacao = 'relevantes'; // ordenação escolhida no dropdown

// a busca ignora acento e maiúscula
function normalizar(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

// card do livro
// premium (selo) e botão dependem da conta: Ler para quem pode, Assinar para Ler para quem não pode
function criarCard(livro) {
    const conta = contaAtual();
    const ehPremium = conta && conta.plano === 'premium';
    const bloqueado = livro.premium && !ehPremium;

    const selo = livro.premium
        ? '<span class="selo-premium"><i class="fa-solid fa-crown"></i> Premium</span>'
        : '';

    const botao = bloqueado
        ? '<a href="index.html#plano2" class="btn-assinar">Assinar para Ler</a>'
        : '<a href="livro.html?id=' + livro.id + '" class="btn-ler">Ler</a>';

    return `
        <article class="card-livro">
            <div class="capa-wrap">
                <div class="capa" style="background-color: ${livro.cor}">
                    <span>${livro.titulo}</span>
                    <img class="capa-img" src="${livro.capa}" alt="Capa de ${livro.titulo}" loading="lazy" onerror="this.remove()">
                </div>
                ${selo}
            </div>
            <p class="card-cat">${livro.generos.join(' · ')}</p>
            <h3>${livro.titulo}</h3>
            <p class="card-autor">${livro.autor}</p>
            ${botao}
        </article>
    `;
}

// o livro entra no botão escolhido?
function combinaComCategoria(livro) {
    if (categoriaAtual === 'Todos') return true;
    if (categoriaAtual === 'Acadêmico') return livro.tipo === 'estudos';
    if (categoriaAtual === 'Lazer') return livro.tipo === 'lazer';
    return livro.generos.includes(categoriaAtual);
}

function atualizarLista() {
    const termo = normalizar(campoBusca.value.trim());

    const lista = LIVROS.filter(livro => {
        const textoLivro = normalizar(
            livro.titulo + ' ' + livro.autor + ' ' + livro.generos.join(' ')
        );
        return combinaComCategoria(livro) && textoLivro.includes(termo);
    });

    // ordenação
    if (criterioOrdenacao === 'titulo') {
        lista.sort((a, b) => a.titulo.localeCompare(b.titulo, 'pt-BR'));
    } else if (criterioOrdenacao === 'autor') {
        lista.sort((a, b) => a.autor.localeCompare(b.autor, 'pt-BR'));
    }
    // 'relevantes', 'recentes', 'populares' e 'avaliados' mantêm a ordem do livros.js.
    // Para ordenar de verdade, crie campos novos nos livros (ex.: ano, nota).

    if (lista.length === 0) {
        grade.innerHTML = '<p class="sem-resultado">Nenhum livro encontrado.</p>';
    } else {
        grade.innerHTML = lista.map(criarCard).join('');
    }

    contador.textContent = lista.length + ' livros selecionados para você';
    rodapeLista.textContent = 'Exibindo ' + lista.length + ' de ' + LIVROS.length + ' livros';
}

// chamada pelo dropdown "Ordenar por"
function ordenarPor(criterio) {
    criterioOrdenacao = criterio;
    atualizarLista();
}

// Categorias (chips)
document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
        document.querySelector('.chip.ativo').classList.remove('ativo');
        chip.classList.add('ativo');
        categoriaAtual = chip.dataset.cat;
        atualizarLista();
    });
});

// Busca (filtra enquanto digita e também ao clicar em Buscar)
if (campoBusca) {
    campoBusca.addEventListener('input', atualizarLista);

    // vindo da Área do Leitor: acervo.html?busca=termo
    const buscaDaUrl = new URLSearchParams(window.location.search).get('busca');
    if (buscaDaUrl) {
        campoBusca.value = buscaDaUrl;
    }
}
const btnPesquisa = document.getElementById('btn-pesquisa');
if (btnPesquisa) {
    btnPesquisa.addEventListener('click', atualizarLista);
}

// Inicializa a listagem ao carregar a página
atualizarLista();
