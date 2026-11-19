/* =========================================================
   LIVRO.JS - TELA DE LEITURA (livro.html?id=3)
   Precisa de livros.js e estado.js carregados antes.
   ========================================================= */

//    BOTÃO UP
window.addEventListener("scroll", function(){
	const topo = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
	if(topo > 400){
		document.getElementById("botao-up").classList.add("visivel");
	} else {
		document.getElementById("botao-up").classList.remove("visivel");
	}
});

// PROTEÇÃO: só entra quem está logado
if (localStorage.getItem('logado') !== 'true') {
	sessionStorage.setItem('paginaAntesLogin', 'livro.html' + location.search);
	window.location.href = 'login.html';
}

/* =========================================================
   LIVRO PELO ID DA URL
   ========================================================= */
const parametros = new URLSearchParams(window.location.search);
const livro = buscarLivro(parametros.get('id'));
// PLANO DO LEITOR (conta.js vem antes deste arquivo)
const contaDoLeitor = contaAtual();
const ehPremium = !!contaDoLeitor && contaDoLeitor.plano === 'premium';

const telaErro = document.getElementById('livro-erro');
const telaLivro = document.getElementById('livro-conteudo');
const telaBloqueado = document.getElementById('livro-bloqueado');
const caixaIndice = document.getElementById('caixa-indice');
const listaCapitulos = document.getElementById('lista-capitulos');
const capituloTitulo = document.getElementById('capitulo-titulo');
const capituloTexto = document.getElementById('capitulo-texto');
const btnAnterior = document.getElementById('btn-anterior');
const btnProximo = document.getElementById('btn-proximo');
const avisoLivro = document.getElementById('aviso-livro');

let capituloAtual = 0;
let tamanhoFonte = Number(localStorage.getItem('fonte_leitura')) || 1.05;

// evita que texto digitado quebre o HTML
function escapar(texto) {
	return String(texto)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

function mostrarAviso(mensagem) {
	avisoLivro.textContent = mensagem;
}

function iniciarLivro() {
	document.title = livro.titulo + ' · Biblioteca Gomes';
	montarCabecalho();
	montarIndice();
	aplicarFonte();
	atualizarBotoes();
	mostrarCapitulo(capituloInicial(), false);
	// no celular o índice começa fechado
	if (window.innerWidth <= 900) {
		caixaIndice.removeAttribute('open');
	}
}

/* =========================================================
   CABEÇALHO DO LIVRO
   ========================================================= */
function montarCabecalho() {
	const capa = document.getElementById('livro-capa');
	capa.style.backgroundColor = livro.cor;
	// se a imagem não existir, ela some e fica o bloco colorido com o título
	capa.innerHTML =
		'<span>' + escapar(livro.titulo) + '</span>' +
		'<img src="' + livro.capa + '" alt="Capa de ' + escapar(livro.titulo) + '" onerror="this.remove()">';

	document.getElementById('livro-cat').textContent = livro.generos.join(' · ');
	document.getElementById('livro-titulo').textContent = livro.titulo;
	document.getElementById('livro-autor').textContent = livro.autor;
	document.getElementById('livro-sinopse-texto').textContent = livro.sinopse;
}

/* =========================================================
   ÍNDICE DE CAPÍTULOS
   ========================================================= */
function montarIndice() {
	listaCapitulos.innerHTML = livro.capitulos.map(function (cap, i) {
		return '<li><button type="button" class="item-capitulo" data-i="' + i + '">' +
			(i + 1) + '. ' + escapar(cap.titulo) + '</button></li>';
	}).join('');

	listaCapitulos.querySelectorAll('.item-capitulo').forEach(function (botao) {
		botao.addEventListener('click', function () {
			mostrarCapitulo(Number(botao.dataset.i), true);
			if (window.innerWidth <= 900) {
				caixaIndice.removeAttribute('open');
			}
		});
	});
}

/* =========================================================
   CAPÍTULOS E PROGRESSO
   ========================================================= */
// onde começar: ?cap=1 (botão "Reler") > capítulo onde parou > primeiro
function capituloInicial() {
	const cap = Number(parametros.get('cap'));
	if (cap >= 1 && cap <= livro.capitulos.length) {
		return cap - 1;
	}
	const salvo = lerEstado().capituloAtual[livro.id];
	if (salvo >= 0 && salvo < livro.capitulos.length) {
		return salvo;
	}
	return 0;
}

// capítulo 1 de 3 = 1%, capítulo 2 = 33%, capítulo 3 = 67% (100% só em "Concluir livro")
function percentualDoCapitulo(indice) {
	return Math.max(1, Math.round((indice / livro.capitulos.length) * 100));
}

function mostrarCapitulo(indice, rolar) {
	capituloAtual = indice;
	const cap = livro.capitulos[indice];
	const total = livro.capitulos.length;
	const ultimo = indice === total - 1;

	capituloTitulo.textContent = 'Capítulo ' + (indice + 1) + ' · ' + cap.titulo;
	// uma linha em branco no texto separa os parágrafos
	capituloTexto.innerHTML = cap.texto.split('\n\n').map(function (paragrafo) {
		return '<p>' + escapar(paragrafo) + '</p>';
	}).join('');
	document.getElementById('posicao-capitulo').textContent = 'Capítulo ' + (indice + 1) + ' de ' + total;

	btnAnterior.disabled = indice === 0;
	btnProximo.disabled = false;
	btnProximo.innerHTML = ultimo
		? 'Concluir livro <i class="fa-solid fa-check"></i>'
		: 'Próximo <i class="fa-solid fa-arrow-right"></i>';

	listaCapitulos.querySelectorAll('.item-capitulo').forEach(function (botao, i) {
		botao.classList.toggle('ativo', i === indice);
		botao.classList.toggle('lido', i < indice);
	});

	// grava onde parou (usado pelo "Continue Lendo")
	salvarCapituloAtual(livro.id, indice);
	atualizarProgresso(livro.id, percentualDoCapitulo(indice));
	mostrarProgresso();
	montarNotas();

	if (rolar) {
		document.getElementById('livro-leitura').scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
}

function mostrarProgresso() {
	const estado = lerEstado();
	const concluido = estado.concluidos.some(function (c) { return c.livroId === livro.id; });
	const percentual = estado.progresso[livro.id] || (concluido ? 100 : 0);
	document.getElementById('barra-progresso').style.width = percentual + '%';
	document.getElementById('texto-progresso').textContent = percentual + '% concluído';
}

function concluirLivro() {
	atualizarProgresso(livro.id, 100);
	mostrarProgresso();
	btnProximo.disabled = true;
	btnProximo.textContent = 'Livro concluído';
	mostrarAviso('Parabéns! Você concluiu este livro. Ele foi para o seu histórico.');
}

btnAnterior.addEventListener('click', function () {
	if (capituloAtual > 0) {
		mostrarCapitulo(capituloAtual - 1, true);
	}
});
btnProximo.addEventListener('click', function () {
	if (capituloAtual < livro.capitulos.length - 1) {
		mostrarCapitulo(capituloAtual + 1, true);
	} else {
		concluirLivro();
	}
});

/* =========================================================
   FONTE MAIOR / MENOR (vale para todos os livros)
   ========================================================= */
function aplicarFonte() {
	capituloTexto.style.fontSize = tamanhoFonte + 'rem';
	localStorage.setItem('fonte_leitura', tamanhoFonte);
}
document.getElementById('fonte-mais').addEventListener('click', function () {
	if (tamanhoFonte < 1.75) {
		tamanhoFonte = Math.round((tamanhoFonte + 0.1) * 100) / 100;
		aplicarFonte();
	}
});
document.getElementById('fonte-menos').addEventListener('click', function () {
	if (tamanhoFonte > 0.85) {
		tamanhoFonte = Math.round((tamanhoFonte - 0.1) * 100) / 100;
		aplicarFonte();
	}
});

/* =========================================================
   FAVORITAR / SALVAR / BAIXAR (OFFLINE SIMULADO)
   ========================================================= */
function definirBotao(idBotao, ativo, textoAtivo, textoNormal, iconeAtivo, iconeNormal) {
	const botao = document.getElementById(idBotao);
	botao.classList.toggle('ativo', ativo);
	botao.querySelector('span').textContent = ativo ? textoAtivo : textoNormal;
	botao.querySelector('i').className = ativo ? iconeAtivo : iconeNormal;
}

function atualizarBotoes() {
	const estado = lerEstado();
	definirBotao('btn-favoritar', estado.favoritos.includes(livro.id), 'Favoritado', 'Favoritar', 'fa-solid fa-heart', 'fa-regular fa-heart');
	definirBotao('btn-salvar', estado.salvos.includes(livro.id), 'Salvo', 'Salvar', 'fa-solid fa-bookmark', 'fa-regular fa-bookmark');
	definirBotao('btn-baixar', estado.baixados.includes(livro.id), 'Baixado · remover', 'Baixar para ler offline', 'fa-solid fa-circle-check', 'fa-solid fa-download');
	// plano básico: leitura offline é exclusiva do Premium
	if (!ehPremium) {
		const botaoBaixar = document.getElementById('btn-baixar');
		botaoBaixar.classList.remove('ativo');
		botaoBaixar.classList.add('travado');
		botaoBaixar.querySelector('span').textContent = 'Baixar offline · Premium';
		botaoBaixar.querySelector('i').className = 'fa-solid fa-lock';
	}
}

document.getElementById('btn-favoritar').addEventListener('click', function () {
	const ligado = alternarLista('favoritos', livro.id);
	atualizarBotoes();
	mostrarAviso(ligado ? 'Livro adicionado aos favoritos.' : 'Livro removido dos favoritos.');
});
document.getElementById('btn-salvar').addEventListener('click', function () {
	const ligado = alternarLista('salvos', livro.id);
	atualizarBotoes();
	mostrarAviso(ligado ? 'Livro salvo na sua biblioteca.' : 'Livro removido dos salvos.');
});
document.getElementById('btn-baixar').addEventListener('click', function () {
	const botao = this;
	if (lerEstado().baixados.includes(livro.id)) {
		alternarLista('baixados', livro.id);
		atualizarBotoes();
		mostrarAviso('Download removido (simulação).');
		return;
	}

	// ===== NOVO: começa aqui =====
	if (!ehPremium) {
		mostrarAviso('A leitura offline é exclusiva do plano Premium. Assine para baixar seus livros.');
		return;
	}
	// ===== NOVO: termina aqui =====

	// simulação: espera um pouco e marca como baixado   <- JÁ EXISTIA (o seu trecho)
	botao.disabled = true;
	botao.querySelector('span').textContent = 'Baixando...';
	setTimeout(function () {
		alternarLista('baixados', livro.id);
		botao.disabled = false;
		atualizarBotoes();
		mostrarAviso('Livro disponível offline. (Download simulado: nada é salvo de verdade.)');
	}, 1500);
});
	

/* =========================================================
   ANOTAÇÕES (ligadas ao livro e ao capítulo)
   ========================================================= */
const campoNota = document.getElementById('nota-texto');
const listaNotas = document.getElementById('lista-notas');
const soCapitulo = document.getElementById('nota-so-capitulo');

function montarNotas() {
	let notas = listarAnotacoes(livro.id);
	if (soCapitulo.checked) {
		notas = notas.filter(function (nota) { return nota.capitulo === capituloAtual + 1; });
	}

	listaNotas.innerHTML = '';
	if (notas.length === 0) {
		const vazia = document.createElement('li');
		vazia.className = 'nota-vazia';
		vazia.textContent = 'Nenhuma anotação por aqui ainda.';
		listaNotas.appendChild(vazia);
		return;
	}

	notas.forEach(function (nota) {
		const item = document.createElement('li');
		item.className = 'nota';

		const topo = document.createElement('div');
		topo.className = 'nota-topo';
		const data = new Date(nota.data);
		const dataTexto = isNaN(data) ? '' : ' · ' + data.toLocaleDateString('pt-BR');
		const rotulo = document.createElement('span');
		rotulo.textContent = (nota.capitulo ? 'Capítulo ' + nota.capitulo : 'Livro') + dataTexto;

		const apagar = document.createElement('button');
		apagar.type = 'button';
		apagar.className = 'btn-apagar';
		apagar.textContent = 'Apagar';
		apagar.addEventListener('click', function () {
			removerAnotacao(nota.id);
			montarNotas();
		});

		const texto = document.createElement('p');
		texto.className = 'nota-texto';
		texto.textContent = nota.texto;     // textContent: seguro contra HTML digitado

		topo.appendChild(rotulo);
		topo.appendChild(apagar);
		item.appendChild(topo);
		item.appendChild(texto);
		listaNotas.appendChild(item);
	});
}

document.getElementById('btn-nota').addEventListener('click', function () {
	const texto = campoNota.value.trim();
	if (texto === '') {
		campoNota.focus();
		return;
	}
	adicionarAnotacao(livro.id, capituloAtual + 1, texto);
	campoNota.value = '';
	montarNotas();
});
soCapitulo.addEventListener('change', montarNotas);

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

if (!livro) {
	telaErro.hidden = false;           // id inexistente: mostra a mensagem
} else if (livro.premium && !ehPremium) {
	document.title = livro.titulo + ' · Biblioteca Gomes';
	telaBloqueado.hidden = false;      // livro premium para o plano básico
} else {
	telaLivro.hidden = false;
	iniciarLivro();
}