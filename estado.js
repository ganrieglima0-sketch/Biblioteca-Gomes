/* =========================================================
   ESTADO.JS - DADOS DO USUÁRIO (localStorage)
   Usado por: leitura.js e livro.js
   Chave: 'estado_' + e-mail do usuário (ou 'visitante')
   ========================================================= */

function chaveEstado() {
	const email = localStorage.getItem('usuario') || 'visitante';
	return 'estado_' + email;
}

// lê o estado e garante que todas as chaves existam
function lerEstado() {
	let estado = {};
	try {
		estado = JSON.parse(localStorage.getItem(chaveEstado())) || {};
	} catch (erro) {
		estado = {};
	}
	estado.favoritos = estado.favoritos || [];
	estado.salvos = estado.salvos || [];
	estado.baixados = estado.baixados || [];
	estado.anotacoes = estado.anotacoes || [];
	estado.progresso = estado.progresso || {};
	estado.concluidos = estado.concluidos || [];
	estado.capituloAtual = estado.capituloAtual || {};   // NOVO: { idDoLivro: índice do capítulo (começa em 0) }
	return estado;
}

function salvarEstado(estado) {
	localStorage.setItem(chaveEstado(), JSON.stringify(estado));
}

// liga/desliga um id em 'favoritos', 'salvos' ou 'baixados'. Devolve true se ficou ligado
function alternarLista(nomeLista, id) {
	const estado = lerEstado();
	id = Number(id);
	const posicao = estado[nomeLista].indexOf(id);
	if (posicao === -1) {
		estado[nomeLista].push(id);
	} else {
		estado[nomeLista].splice(posicao, 1);
	}
	salvarEstado(estado);
	return posicao === -1;
}

// 1% a 99%: aparece em "Continue Lendo". 100%: sai de lá e vai para "concluidos"
function atualizarProgresso(id, percentual) {
	const estado = lerEstado();
	id = Number(id);
	if (percentual >= 100) {
		delete estado.progresso[id];
		delete estado.capituloAtual[id];
		estado.concluidos = estado.concluidos.filter(function (c) { return c.livroId !== id; });
		estado.concluidos.push({ livroId: id, data: new Date().toISOString() });
	} else {
		estado.progresso[id] = Math.max(1, Math.round(percentual));
	}
	salvarEstado(estado);
}

// guarda o capítulo onde a pessoa parou (índice começando em 0)
function salvarCapituloAtual(id, indice) {
	const estado = lerEstado();
	estado.capituloAtual[Number(id)] = indice;
	salvarEstado(estado);
}

// ANOTAÇÕES: { id, livroId, capitulo (começa em 1), texto, data }
function adicionarAnotacao(livroId, capitulo, texto) {
	const estado = lerEstado();
	estado.anotacoes.push({
		id: Date.now() + Math.floor(Math.random() * 1000),
		livroId: Number(livroId),
		capitulo: capitulo,
		texto: texto,
		data: new Date().toISOString()
	});
	salvarEstado(estado);
}

function removerAnotacao(idNota) {
	const estado = lerEstado();
	estado.anotacoes = estado.anotacoes.filter(function (nota) { return nota.id !== idNota; });
	salvarEstado(estado);
}

function listarAnotacoes(livroId) {
	return lerEstado().anotacoes.filter(function (nota) { return nota.livroId === Number(livroId); });
}