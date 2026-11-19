//    BOTÃO UP

window.addEventListener("scroll", function(){
    const topo = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if(topo > 400){
        document.getElementById("botao-up").classList.add("visivel");
    } else {
        document.getElementById("botao-up").classList.remove("visivel");
    }
});
/* =========================================================
   ÁREA DO LEITOR
   Precisa de livros.js e estado.js carregados ANTES deste arquivo
   ========================================================= */

// PROTEÇÃO: só entra quem está logado
if (localStorage.getItem('logado') !== 'true') {
	sessionStorage.setItem('paginaAntesLogin', 'leitura.html');
	window.location.href = 'login.html';
}

// DADOS DO USUÁRIO 
const contaDaPagina = contaAtual();
const nomeFormatado = contaDaPagina ? contaDaPagina.nome.split(' ')[0] : 'Leitor';

document.getElementById('saudacao').textContent = 'Olá, ' + nomeFormatado + '. Vamos continuar?';
/* =========================================================
   LIVROS
   Os livros vêm do livros.js (LIVROS e buscarLivro).
   Não existe mais lista de livros neste arquivo.
   ========================================================= */

// ids dos livros que aparecem em "Recomendados para você"
const idsRecomendados = [18, 21, 24, 9, 6, 37];

/* =========================================================
   ESTADO DO LEITOR (salvo no localStorage, um por usuário)
   As funções de estado ficam no estado.js (lerEstado, salvarEstado...)
   favoritos / salvos / baixados: lista de ids de livros
   anotacoes: { id, livroId, capitulo, texto, data }
   progresso: { idDoLivro: percentual }
   capituloAtual: { idDoLivro: índice do capítulo (começa em 0) }
   concluidos: { livroId, data }
   ========================================================= */
function hoje() {
	return new Date().toISOString().slice(0, 10);
}

// dados de exemplo para a primeira vez que a pessoa abre a página
function estadoInicial() {
	return {
		favoritos: [18, 9],
		salvos: [3, 21, 37],
		baixados: [18],
		anotacoes: [
			{ id: 1, livroId: 1, capitulo: 1, texto: 'Revisar os princípios fundamentais antes da prova.', data: '2026-11-10' },
			{ id: 2, livroId: 9, capitulo: 2, texto: 'Comparar aprendizado supervisionado e não supervisionado.', data: '2026-11-12' },
			{ id: 3, livroId: 3, capitulo: 1, texto: 'Resumo do sistema nervoso central para estudar.', data: '2026-11-15' }
		],
		progresso: { 1: 33, 9: 67, 18: 33 },
		capituloAtual: { 1: 1, 9: 2, 18: 1 },
		concluidos: [
			{ livroId: 5, data: '2026-09-04' },
			{ livroId: 37, data: '2026-09-21' },
			{ livroId: 22, data: '2026-10-02' },
			{ livroId: 11, data: '2026-10-19' },
			{ livroId: 13, data: '2026-10-30' },
			{ livroId: 16, data: '2026-11-08' }
		]
	};
}

// primeira vez neste navegador: grava os exemplos
if (localStorage.getItem(chaveEstado()) === null) {
	salvarEstado(estadoInicial());
}

let estado = lerEstado();

// aceita data simples (2026-11-10) e data completa (2026-11-10T14:30:00.000Z)
function formatarData(iso) {
	const data = iso.length > 10 ? new Date(iso) : new Date(iso + 'T00:00:00');
	return data.toLocaleDateString('pt-BR');
}

// evita que texto digitado vire HTML
function escapar(texto) {
	return texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// imagem da capa por cima do bloco colorido (se não existir, ela some sozinha)
function capaImg(livro) {
	return `<img class="capa-img" src="${livro.capa}" alt="Capa de ${livro.titulo}" loading="lazy" onerror="this.remove()">`;
}

/* =========================================================
   BOTÕES DE FAVORITAR E SALVAR
   ========================================================= */
const titulosAcao = { favoritos: 'Favoritar', salvos: 'Salvar para ler depois' };
const iconesAcao = { favoritos: 'fa-heart', salvos: 'fa-bookmark' };

function btnIcone(tipo, id) {
	const ativo = estado[tipo].includes(id);
	return `
		<button type="button" class="btn-icone ${ativo ? 'ativo' : ''}" data-acao="${tipo}" data-id="${id}"
			title="${titulosAcao[tipo]}" aria-label="${titulosAcao[tipo]}" aria-pressed="${ativo}">
			<i class="${ativo ? 'fa-solid' : 'fa-regular'} ${iconesAcao[tipo]}"></i>
		</button>
	`;
}

function botoesAcao(id) {
	return `<div class="acoes-card">${btnIcone('favoritos', id)}${btnIcone('salvos', id)}</div>`;
}

// liga ou desliga um livro de uma lista (favoritos, salvos ou baixados)
function alternarItem(tipo, id) {
	const lista = estado[tipo];
	const posicao = lista.indexOf(id);
	if (posicao === -1) { lista.push(id); } else { lista.splice(posicao, 1); }
	salvarEstado(estado);
	atualizarTudo();
	if (modal.classList.contains('aberto')) { renderModal(); }
}

// atualiza a aparência de todos os botões da página
function atualizarBotoes() {
	document.querySelectorAll('.btn-icone[data-acao]').forEach(botao => {
		const ativo = estado[botao.dataset.acao].includes(Number(botao.dataset.id));
		const icone = botao.querySelector('i');
		botao.classList.toggle('ativo', ativo);
		botao.setAttribute('aria-pressed', ativo);
		icone.classList.toggle('fa-solid', ativo);
		icone.classList.toggle('fa-regular', !ativo);
	});
}

document.addEventListener('click', (e) => {
	const botao = e.target.closest('[data-acao]');
	if (botao) { alternarItem(botao.dataset.acao, Number(botao.dataset.id)); }
});

/* =========================================================
   CONTADORES (SUA BIBLIOTECA E BAIXADOS)
   ========================================================= */
function atualizarContadores() {
	document.getElementById('qtd-salvos').textContent = estado.salvos.length;
	document.getElementById('qtd-favoritos').textContent = estado.favoritos.length;
	document.getElementById('qtd-anotacoes').textContent = estado.anotacoes.length;

	const baixados = estado.baixados.length;
	document.getElementById('resumo-baixados').textContent = baixados === 0
		? 'Nenhum livro baixado ainda.'
		: baixados + (baixados === 1 ? ' livro disponível offline' : ' livros disponíveis offline');
}

function atualizarTudo() {
	atualizarContadores();
	atualizarBotoes();
}

/* =========================================================
   LER UM LIVRO
   Os botões "Ler", "Ler Agora", "Retomar leitura" e "Reler" já são
   links diretos para livro.html?id=ID. Esta função fica disponível
   caso você precise abrir um livro pelo JS.
   ========================================================= */
function abrirLivro(id) {
	window.location.href = 'livro.html?id=' + id;
}

/* =========================================================
   CONTINUE LENDO (CARROSSEL)
   ========================================================= */
const carrossel = document.getElementById('carrossel');
const pontos = document.getElementById('pontos');
let lendo = [];

// livros com leitura em andamento (entre 1% e 99%), com o capítulo onde parou
function livrosLendo() {
	return Object.keys(estado.progresso)
		.map(Number)
		.filter(id => buscarLivro(id) && estado.progresso[id] > 0 && estado.progresso[id] < 100)
		.map(id => {
			const livro = buscarLivro(id);
			const i = Math.min(estado.capituloAtual[id] || 0, livro.capitulos.length - 1);
			return {
				...livro,
				progresso: estado.progresso[id],
				capitulo: 'Capítulo ' + (i + 1) + ' · ' + livro.capitulos[i].titulo
			};
		});
}

function criarCardLendo(livro) {
	return `
		<article class="card-lendo">
			${botoesAcao(livro.id)}
			<div class="capa-lendo" style="background-color: ${livro.cor}">
				<span>${livro.titulo}</span>
				${capaImg(livro)}
			</div>
			<div class="info-lendo">
				<h3>${livro.titulo}</h3>
				<p class="info-autor">${livro.autor}</p>
				<p class="info-capitulo">${livro.capitulo}</p>
				<div class="barra"><span style="width: ${livro.progresso}%"></span></div>
				<p class="info-percentual">${livro.progresso}% concluído</p>
				<div class="acoes-lendo">
					<a href="livro.html?id=${livro.id}" class="btn-ler">Ler</a>
					<a href="livro.html?id=${livro.id}" class="link-retomar">Retomar leitura <i class="fa-solid fa-arrow-right"></i></a>
				</div>
			</div>
		</article>
	`;
}

function renderCarrossel() {
	lendo = livrosLendo();

	if (lendo.length === 0) {
		carrossel.innerHTML = '<p class="vazio">Você ainda não começou nenhuma leitura. Que tal explorar o acervo?</p>';
		pontos.innerHTML = '';
		return;
	}

	carrossel.innerHTML = lendo.map(criarCardLendo).join('');
	pontos.innerHTML = lendo.map((_, i) =>
		`<button type="button" class="ponto" data-i="${i}" aria-label="Livro ${i + 1}"></button>`
	).join('');
	carrossel.scrollLeft = 0;
	atualizarPontos();
}

// quanto o carrossel anda por clique (largura do card + espaço entre eles)
function passoCarrossel() {
	const card = carrossel.querySelector('.card-lendo');
	if (!card) { return 0; }
	const espaco = parseFloat(getComputedStyle(carrossel).columnGap) || 16;
	return card.offsetWidth + espaco;
}

function atualizarPontos() {
	if (lendo.length === 0) { return; }
	const noFim = carrossel.scrollLeft + carrossel.clientWidth >= carrossel.scrollWidth - 2;
	const indice = noFim ? lendo.length - 1 : Math.round(carrossel.scrollLeft / passoCarrossel());
	pontos.querySelectorAll('.ponto').forEach((ponto, i) => {
		ponto.classList.toggle('ativo', i === indice);
	});
}

document.getElementById('car-anterior').addEventListener('click', () => {
	carrossel.scrollBy({ left: -passoCarrossel(), behavior: 'smooth' });
});
document.getElementById('car-proximo').addEventListener('click', () => {
	carrossel.scrollBy({ left: passoCarrossel(), behavior: 'smooth' });
});
pontos.addEventListener('click', (e) => {
	const ponto = e.target.closest('.ponto');
	if (ponto) {
		carrossel.scrollTo({ left: ponto.dataset.i * passoCarrossel(), behavior: 'smooth' });
	}
});
carrossel.addEventListener('scroll', atualizarPontos);

/* =========================================================
   PROGRESSO
   O progresso é gravado pela tela de leitura (livro.js), usando
   atualizarProgresso(id, percentual) do estado.js:
     atualizarProgresso(3, 40)  -> 40% lido (aparece em "Continue Lendo")
     atualizarProgresso(3, 100) -> sai de "Continue Lendo" e vai para o histórico
   ========================================================= */

/* =========================================================
   RECOMENDADOS
   ========================================================= */
function criarCardReco(livro) {
	return `
		<article class="card-reco">
			<div class="capa-reco">
				${botoesAcao(livro.id)}
				<div class="mini-capa" style="background-color: ${livro.cor}">
					<span>${livro.titulo}</span>
					${capaImg(livro)}
				</div>
			</div>
			<h3>${livro.titulo}</h3>
			<p class="reco-autor">${livro.autor}</p>
			<a href="livro.html?id=${livro.id}" class="btn-ler">Ler Agora</a>
		</article>
	`;
}

document.getElementById('grade-reco').innerHTML = idsRecomendados
	.filter(id => buscarLivro(id))
	.map(id => criarCardReco(buscarLivro(id))).join('');

/* =========================================================
   PAINEL (HISTÓRICO, SALVOS, FAVORITOS, ANOTAÇÕES, BAIXADOS)
   ========================================================= */
const modal = document.getElementById('modal');
const modalTitulo = document.getElementById('modal-titulo');
const modalConteudo = document.getElementById('modal-conteudo');
const modalCorpo = document.getElementById('modal-corpo');
const modalExtra = document.getElementById('modal-extra');
const modalPaginas = document.getElementById('modal-paginas');
const formAnotacao = document.getElementById('form-anotacao');
const selectLivro = document.getElementById('select-livro-anotacao');
const textoAnotacao = document.getElementById('texto-anotacao');
const formErro = document.getElementById('form-erro');

const POR_PAGINA = 3; // itens por página no painel
let listaAtual = '';
let paginaAtual = 1;

const titulosLista = {
	historico: 'Histórico de leitura',
	salvos: 'Livros salvos',
	favoritos: 'Favoritos',
	anotacoes: 'Minhas anotações',
	baixados: 'Livros baixados'
};

const textosVazio = {
	historico: 'Você ainda não concluiu nenhum livro.',
	salvos: 'Você ainda não salvou nenhum livro. Use o marcador nos cards para salvar.',
	favoritos: 'Você ainda não favoritou nenhum livro. Use o coração nos cards.',
	anotacoes: 'Você ainda não fez nenhuma anotação.',
	baixados: 'Nenhum livro baixado ainda.'
};

// opções do formulário de anotação
selectLivro.innerHTML = LIVROS.map(l => `<option value="${l.id}">${l.titulo}</option>`).join('');

/*---- ABRIR E FECHAR ----*/
function abrirModal(tipo) {
	listaAtual = tipo;
	paginaAtual = 1;
	modal.classList.add('aberto');
	document.body.classList.add('modal-aberto');
	renderModal();
	modalConteudo.scrollTop = 0;
	document.getElementById('modal-fechar').focus();
}

function fecharModal() {
	modal.classList.remove('aberto');
	document.body.classList.remove('modal-aberto');
}

/*---- ITENS DE CADA LISTA ----*/
function itensDaLista(tipo) {
	if (tipo === 'historico') {
		return estado.concluidos
			.filter(c => buscarLivro(c.livroId))
			.sort((a, b) => b.data.localeCompare(a.data))
			.map(c => ({ livro: buscarLivro(c.livroId), extra: 'Concluído em ' + formatarData(c.data) }));
	}

	return estado[tipo]
		.filter(id => buscarLivro(id))
		.map(id => {
			const livro = buscarLivro(id);
			let extra = livro.categoria;
			if (tipo === 'baixados') { extra = 'Disponível offline'; }
			else if (estado.progresso[id]) { extra = estado.progresso[id] + '% lido'; }
			return { livro, extra };
		});
}

function acoesDoItem(tipo, livro) {
	// "Reler" começa de novo, pelo capítulo 1
	const botaoLer = tipo === 'historico'
		? `<a href="livro.html?id=${livro.id}&cap=1" class="btn-ler">Reler</a>`
		: `<a href="livro.html?id=${livro.id}" class="btn-ler">Ler</a>`;

	if (tipo === 'baixados') {
		return botaoLer + `<button type="button" class="btn-texto" data-acao="baixados" data-id="${livro.id}">Remover</button>`;
	}
	if (tipo === 'salvos' || tipo === 'favoritos') {
		return botaoLer + btnIcone(tipo, livro.id);
	}
	return botaoLer;
}

function criarItem(livro, extra, acoes) {
	return `
		<div class="item-lista">
			<div class="mini-capa-lista" style="background-color: ${livro.cor}">${capaImg(livro)}</div>
			<div class="item-info">
				<h3>${livro.titulo}</h3>
				<p>${livro.autor}</p>
				<small>${extra}</small>
			</div>
			<div class="item-acoes">${acoes}</div>
		</div>
	`;
}

function criarAnotacao(nota) {
	const livro = buscarLivro(nota.livroId);
	const local = nota.capitulo ? ' · Capítulo ' + nota.capitulo : '';
	return `
		<article class="anotacao">
			<div class="anotacao-topo">
				<h3>${livro ? livro.titulo : 'Livro'}${local}</h3>
				<button type="button" class="btn-texto" data-del-anotacao="${nota.id}">Excluir</button>
			</div>
			<p>${escapar(nota.texto)}</p>
			<small>${formatarData(nota.data)}</small>
		</article>
	`;
}

/*---- BAIXAR LIVROS (SIMULAÇÃO, NÃO BAIXA NADA) ----*/
function htmlBaixar() {
	const disponiveis = LIVROS.filter(l => !estado.baixados.includes(l.id)).slice(0, 3);
	if (disponiveis.length === 0) { return ''; }

	const itens = disponiveis.map(livro => criarItem(livro, livro.categoria,
		`<button type="button" class="btn-baixar" data-baixar="${livro.id}"><i class="fa-solid fa-download"></i> Baixar</button>`
	)).join('');

	return `
		<div class="bloco-baixar">
			<h3>Disponíveis para baixar</h3>
			<p class="aviso-sim">Simulação: nenhum arquivo é baixado de verdade.</p>
			${itens}
		</div>
	`;
}

function simularDownload(id, botao) {
	botao.classList.add('carregando');
	botao.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Baixando...';

	setTimeout(() => {
		if (!estado.baixados.includes(id)) { estado.baixados.push(id); }
		salvarEstado(estado);
		atualizarTudo();
		if (modal.classList.contains('aberto')) { renderModal(); }
	}, 1200);
}

/*---- DESENHAR O PAINEL ----*/
function renderModal() {
	modalTitulo.textContent = titulosLista[listaAtual];
	formAnotacao.hidden = listaAtual !== 'anotacoes';
	modalExtra.innerHTML = '';

	// monta a lista de itens já em HTML
	let itens;
	if (listaAtual === 'anotacoes') {
		itens = estado.anotacoes.slice().sort((a, b) => b.id - a.id).map(criarAnotacao);
	} else {
		itens = itensDaLista(listaAtual).map(item => criarItem(item.livro, item.extra, acoesDoItem(listaAtual, item.livro)));
	}

	// paginação
	const totalPaginas = Math.max(1, Math.ceil(itens.length / POR_PAGINA));
	if (paginaAtual > totalPaginas) { paginaAtual = totalPaginas; }
	const inicio = (paginaAtual - 1) * POR_PAGINA;

	modalCorpo.innerHTML = itens.length === 0
		? `<p class="vazio">${textosVazio[listaAtual]}</p>`
		: itens.slice(inicio, inicio + POR_PAGINA).join('');

	modalPaginas.innerHTML = totalPaginas > 1 ? `
		<button type="button" class="pag-btn" data-pag="-1" ${paginaAtual === 1 ? 'disabled' : ''}>Anterior</button>
		<span>Página ${paginaAtual} de ${totalPaginas}</span>
		<button type="button" class="pag-btn" data-pag="1" ${paginaAtual === totalPaginas ? 'disabled' : ''}>Próxima</button>
	` : '';

	if (listaAtual === 'baixados') { modalExtra.innerHTML = htmlBaixar(); }
}

/*---- CLIQUES DENTRO DO PAINEL ----*/
modal.addEventListener('click', (e) => {
	// clicou fora da caixa: fecha
	if (e.target === modal) { fecharModal(); return; }

	const pagina = e.target.closest('[data-pag]');
	if (pagina) {
		paginaAtual += Number(pagina.dataset.pag);
		renderModal();
		modalConteudo.scrollTop = 0;
		return;
	}

	const baixar = e.target.closest('[data-baixar]');
	if (baixar) {
		simularDownload(Number(baixar.dataset.baixar), baixar);
		return;
	}

	const excluir = e.target.closest('[data-del-anotacao]');
	if (excluir) {
		const idNota = Number(excluir.dataset.delAnotacao);
		estado.anotacoes = estado.anotacoes.filter(nota => nota.id !== idNota);
		salvarEstado(estado);
		atualizarTudo();
		renderModal();
	}
});

document.getElementById('modal-fechar').addEventListener('click', fecharModal);
document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape' && modal.classList.contains('aberto')) { fecharModal(); }
});

/*---- ADICIONAR ANOTAÇÃO ----*/
formAnotacao.addEventListener('submit', (e) => {
	e.preventDefault();
	const texto = textoAnotacao.value.trim();

	if (!texto) {
		formErro.textContent = 'Escreva a anotação antes de adicionar.';
		return;
	}

	formErro.textContent = '';
	estado.anotacoes.push({ id: Date.now(), livroId: Number(selectLivro.value), texto: texto, data: hoje() });
	salvarEstado(estado);
	textoAnotacao.value = '';
	paginaAtual = 1;
	atualizarTudo();
	renderModal();
});

/*---- O QUE ABRE O PAINEL ----*/
document.getElementById('ver-historico').addEventListener('click', (e) => {
	e.preventDefault();
	abrirModal('historico');
});

document.querySelectorAll('[data-lista]').forEach(elemento => {
	elemento.addEventListener('click', () => abrirModal(elemento.dataset.lista));
	elemento.addEventListener('keydown', (e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			abrirModal(elemento.dataset.lista);
		}
	});
});

/* =========================================================
   INÍCIO (desenha a tela com os dados salvos)
   ========================================================= */
renderCarrossel();
atualizarTudo();

/* =========================================================
   BUSCA
   ========================================================= */
// Enter na busca leva para o acervo já filtrado
document.getElementById('busca-leitor').addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		const termo = e.target.value.trim();
		window.location.href = 'acervo.html' + (termo ? '?busca=' + encodeURIComponent(termo) : '');
	}
});

/* =========================================================
   MENU: DROPDOWNS (IDIOMA E ACESSIBILIDADE)
   ========================================================= */
function alternarDropdown(botao, idSeta) {
	botao.addEventListener('click', function (e) {
		e.preventDefault();
		this.nextElementSibling.classList.toggle('aberto');
		const seta = document.getElementById(idSeta);
		if (this.nextElementSibling.classList.contains('aberto')) {
			seta.innerHTML = '<i class="fa-solid fa-caret-up"></i>';
		} else {
			seta.innerHTML = '<i class="fa-solid fa-caret-down"></i>';
		}
	});
}
alternarDropdown(document.getElementById('btn-acessibilidade'), 'seta-ac');
alternarDropdown(document.getElementById('btn-idioma'), 'seta-idioma');

// fecha o dropdown ao escolher uma opção
document.querySelectorAll('.dropdown-content .btn-dd').forEach(function (item) {
	item.addEventListener('click', function () {
		const caixa = this.closest('.dropdown-content');
		caixa.classList.remove('aberto');
		caixa.previousElementSibling.querySelector('span').innerHTML = '<i class="fa-solid fa-caret-down"></i>';
	});
});

/* =========================================================
   MENU: A+ / A- / MODO ESCURO
   ========================================================= */
// como o CSS usa rem, mudar o tamanho da fonte do html aumenta a tela toda
let escala = 1;
function aplicarEscala() {
	document.documentElement.style.fontSize = (escala * 100) + '%';
}
document.getElementById('a+').addEventListener('click', function (e) {
	e.preventDefault();
	if (escala < 1.5) { escala += 0.1; }
	aplicarEscala();
});
document.getElementById('a-').addEventListener('click', function (e) {
	e.preventDefault();
	if (escala > 0.8) { escala -= 0.1; }
	aplicarEscala();
});
document.getElementById('dark').addEventListener('click', function (e) {
	e.preventDefault();
	document.body.classList.toggle('alto-contraste');
});

/* =========================================================
   MENU LATERAL (CELULAR)
   ========================================================= */
const menuPrincipal = document.querySelector('.menu-principal');
const menuOverlay = document.querySelector('.menu-overlay');

function abrirMenu() {
	menuPrincipal.classList.add('aberto');
	menuOverlay.classList.add('aberto');
	document.body.classList.add('menu-travado');
}
function fecharMenu() {
	menuPrincipal.classList.remove('aberto');
	menuOverlay.classList.remove('aberto');
	document.body.classList.remove('menu-travado');
}
document.getElementById('menu').addEventListener('click', abrirMenu);
document.querySelector('.menu-fechar').addEventListener('click', fecharMenu);
menuOverlay.addEventListener('click', fecharMenu);

/* =========================================================
   GOOGLE TRADUTOR
   ========================================================= */
window.googleTranslateElementInit = function () {
	new google.translate.TranslateElement({
		pageLanguage: 'pt',
		includedLanguages: 'pt,en,es',
		autoDisplay: false
	}, 'google_translate_element');
};

const scriptGoogle = document.createElement('script');
scriptGoogle.type = 'text/javascript';
scriptGoogle.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
document.body.appendChild(scriptGoogle);

function mudarIdioma(sigla) {
	if (sigla === 'pt') {
		document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
		location.reload();
		return;
	}
	const combo = document.querySelector('.goog-te-combo');
	if (combo) {
		combo.value = sigla;
		combo.dispatchEvent(new Event('change'));
	} else {
		console.warn('O tradutor ainda está carregando...');
	}
}