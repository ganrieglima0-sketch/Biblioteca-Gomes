/* =========================================================
   DROPDOWNS (ACESSIBILIDADE E IDIOMA)
========================================================= */

// abre/fecha o dropdown e troca a seta
function alternarDropdown(botao, idSeta){
	const caixa = botao.nextElementSibling;
	const seta = document.getElementById(idSeta);

	caixa.classList.toggle("aberto");

	if(caixa.classList.contains("aberto")){
		seta.innerHTML = '<i class="fa-solid fa-caret-up"></i>';
	}else{
		seta.innerHTML = '<i class="fa-solid fa-caret-down"></i>';
	}
}

/*---- BOTÃO ACESSIBILIDADE ----*/
document.getElementById("btn-acessibilidade").addEventListener("click", function(e){
	e.preventDefault();
	alternarDropdown(this, "seta-ac");
});

/*---- BOTÃO IDIOMA ----*/
document.getElementById("btn-idioma").addEventListener("click", function(e){
	e.preventDefault();
	alternarDropdown(this, "seta-idioma");
});

/*---- FECHAR AO ESCOLHER UMA OPÇÃO ----*/
document.querySelectorAll(".dropdown-content .btn-dd").forEach(function(item){
	item.addEventListener("click", function(){
		const caixa = this.closest(".dropdown-content");
		caixa.classList.remove("aberto");

		// volta a seta para baixo
		const seta = caixa.previousElementSibling.querySelector("span");
		seta.innerHTML = '<i class="fa-solid fa-caret-down"></i>';
	});
});

/* =========================================================
   ACESSIBILIDADE (A+, A- E CONTRASTE)
========================================================= */

let escala = 1;

// elementos de texto da página que mudam de tamanho com A+ e A-
const elementosAjustaveis = document.querySelectorAll(
	".ajuda h1, .ajuda h2, .ajuda h3, .ajuda p, .ajuda a, .ajuda label, .ajuda button, " +
	".ajuda input, .ajuda select, .ajuda textarea, .ajuda small, .ajuda span"
);

// guarda o tamanho original de cada elemento
elementosAjustaveis.forEach(function(elemento){
	const tamanhoOriginal = window.getComputedStyle(elemento).fontSize;
	elemento.dataset.tamanhoOriginal = parseFloat(tamanhoOriginal);
});

function aplicarEscala(){
	elementosAjustaveis.forEach(function(elemento){
		const original = parseFloat(elemento.dataset.tamanhoOriginal);
		elemento.style.fontSize = (original * escala) + "px";
	});
}

document.getElementById("a+").addEventListener("click", function(e){
	e.preventDefault();
	if(escala < 1.5){
		escala += 0.1;
		aplicarEscala();
	}
});

document.getElementById("a-").addEventListener("click", function(e){
	e.preventDefault();
	if(escala > 0.8){
		escala -= 0.1;
		aplicarEscala();
	}
});

/*---- MODO CONTRASTE ----*/
document.getElementById("dark").addEventListener("click", function(e){
	e.preventDefault();
	document.body.classList.toggle("alto-contraste");
});

/* =========================================================
   MENU LATERAL (MOBILE)
========================================================= */

const menuPrincipal = document.querySelector(".menu-principal");
const menuOverlay = document.querySelector(".menu-overlay");
const btnAbrirMenu = document.getElementById("menu");
const btnFecharMenu = document.querySelector(".menu-fechar");

function abrirMenu(){
	menuPrincipal.classList.add("aberto");
	menuOverlay.classList.add("aberto");
	document.body.classList.add("menu-travado");
}

function fecharMenu(){
	menuPrincipal.classList.remove("aberto");
	menuOverlay.classList.remove("aberto");
	document.body.classList.remove("menu-travado");
}

btnAbrirMenu.addEventListener("click", abrirMenu);
btnFecharMenu.addEventListener("click", fecharMenu);
menuOverlay.addEventListener("click", fecharMenu);

// fecha o menu ao clicar em um link normal (os dropdowns ficam de fora)
document.querySelectorAll(".menu-principal li a.btn:not(.dropdown-btn-ac)").forEach(function(link){
	link.addEventListener("click", fecharMenu);
});

/* =========================================================
   BOTÃO UP
========================================================= */

window.addEventListener("scroll", function(){
	const topo = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
	const botaoUp = document.getElementById("botao-up");

	if(topo > 400){
		botaoUp.classList.add("visivel");
	}else{
		botaoUp.classList.remove("visivel");
	}
});

/* =========================================================
   GOOGLE TRADUTOR
========================================================= */

window.googleTranslateElementInit = function(){
	new google.translate.TranslateElement({
		pageLanguage: "pt",
		includedLanguages: "pt,en,es",
		autoDisplay: false
	}, "google_translate_element");
};

// carrega o script do Google
const scriptGoogle = document.createElement("script");
scriptGoogle.type = "text/javascript";
scriptGoogle.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
document.body.appendChild(scriptGoogle);

// troca o idioma (chamada pelo onclick do HTML)
function mudarIdioma(sigla){
	if(sigla === "pt"){
		document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		location.reload();
		return;
	}
	const combo = document.querySelector(".goog-te-combo");
	if(combo){
		combo.value = sigla;
		combo.dispatchEvent(new Event("change"));
	}else{
		console.warn("O tradutor ainda está carregando...");
	}
}

/* =========================================================
   FAQ (ABRIR E FECHAR PERGUNTAS)
========================================================= */

const itensFaq = document.querySelectorAll(".faq-item");

itensFaq.forEach(function(item){
	const botao = item.querySelector(".pergunta");

	botao.addEventListener("click", function(){
		const estaAberto = item.classList.contains("aberto");

		// fecha todas as perguntas
		itensFaq.forEach(function(outro){
			outro.classList.remove("aberto");
			outro.querySelector(".pergunta").setAttribute("aria-expanded", "false");
		});

		// abre a clicada (se ela estava fechada)
		if(!estaAberto){
			item.classList.add("aberto");
			botao.setAttribute("aria-expanded", "true");
		}
	});
});

/* =========================================================
   BUSCA NO FAQ
========================================================= */

const campoBuscaFaq = document.getElementById("busca-faq");
const semFaq = document.getElementById("sem-faq");

// tira acentos e deixa minúsculo para comparar
function normalizar(texto){
	return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

campoBuscaFaq.addEventListener("input", function(){
	const termo = normalizar(campoBuscaFaq.value.trim());
	let encontrados = 0;

	itensFaq.forEach(function(item){
		const conteudo = normalizar(item.textContent);

		if(conteudo.includes(termo)){
			item.style.display = "";
			encontrados++;
		}else{
			item.style.display = "none";
		}
	});

	// mostra aviso se nada foi encontrado
	semFaq.classList.toggle("visivel", encontrados === 0);
});

/* =========================================================
   FORMULARIO DE CONTATO
========================================================= */

const formContato = document.getElementById("form-contato");
const campoNome = document.getElementById("nome");
const campoEmail = document.getElementById("email");
const campoAssunto = document.getElementById("assunto");
const campoMensagem = document.getElementById("mensagem");
const contadorMsg = document.getElementById("contador-msg");
const sucesso = document.getElementById("sucesso");

/*---- CONTADOR DE CARACTERES ----*/
campoMensagem.addEventListener("input", function(){
	contadorMsg.textContent = campoMensagem.value.length + "/800";
});

/*---- MOSTRAR / LIMPAR ERRO ----*/
function mostrarErro(campo, texto){
	const caixa = campo.closest(".campo");
	caixa.classList.add("invalido");
	caixa.querySelector(".erro").textContent = texto;
}

function limparErro(campo){
	const caixa = campo.closest(".campo");
	caixa.classList.remove("invalido");
	caixa.querySelector(".erro").textContent = "";
}

// limpa o erro quando o usuário volta a digitar
[campoNome, campoEmail, campoAssunto, campoMensagem].forEach(function(campo){
	campo.addEventListener("input", function(){
		limparErro(campo);
	});
});

/*---- ENVIO ----*/
formContato.addEventListener("submit", function(evento){
	evento.preventDefault();
	let valido = true;
	sucesso.classList.remove("visivel");

	if(campoNome.value.trim().length < 3){
		mostrarErro(campoNome, "Digite seu nome completo.");
		valido = false;
	}

	const modeloEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if(!modeloEmail.test(campoEmail.value.trim())){
		mostrarErro(campoEmail, "Digite um e-mail válido.");
		valido = false;
	}

	if(campoAssunto.value === ""){
		mostrarErro(campoAssunto, "Selecione um assunto.");
		valido = false;
	}

	if(campoMensagem.value.trim().length < 10){
		mostrarErro(campoMensagem, "Escreva pelo menos 10 caracteres.");
		valido = false;
	}

	if(valido){
		// aqui entraria o envio para o servidor (projeto acadêmico: só simula)
		formContato.reset();
		contadorMsg.textContent = "0/500";
		sucesso.classList.add("visivel");
	}
});