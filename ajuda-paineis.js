/* =========================================================
   TROCA DE PAINÉIS DA CENTRAL DE AJUDA
   (carregar depois do ajuda.js)
   ========================================================= */
const paineis = document.querySelectorAll('.painel');
const linksLateral = document.querySelectorAll('.lateral-link');

function mostrarPainel() {
	let id = location.hash.slice(1);
	const alvo = document.getElementById(id);

	// sem # ou # inválido: mostra o FAQ
	if (!alvo || !alvo.classList.contains('painel')) {
		id = 'faq';
	}

	paineis.forEach(function (painel) {
		painel.classList.toggle('ativo', painel.id === id);
	});
	linksLateral.forEach(function (link) {
		link.classList.toggle('ativo', link.getAttribute('href') === '#' + id);
	});
}

window.addEventListener('hashchange', mostrarPainel);
mostrarPainel();
