//    BOTÃO ACESSIBILIDADE
document.getElementById("btn-acessibilidade").addEventListener("click", function(e){
	e.preventDefault();
	this.nextElementSibling.classList.toggle("aberto");

	const seta = document.getElementById("seta-ac");
	if(this.nextElementSibling.classList.contains("aberto"))
	{	seta.innerHTML = '<i class="fa-solid fa-caret-up"></i>';	}
	else
	{	seta.innerHTML = '<i class="fa-solid fa-caret-down"></i>';	}
});

//    BOTÃO IDIOMA
document.getElementById("btn-idioma").addEventListener("click", function(e){
	e.preventDefault();
	this.nextElementSibling.classList.toggle("aberto");

	const seta = document.getElementById("seta-idioma");
	if(this.nextElementSibling.classList.contains("aberto"))
	{	seta.innerHTML = '<i class="fa-solid fa-caret-up"></i>';	}
	else
	{	seta.innerHTML = '<i class="fa-solid fa-caret-down"></i>';	}
});

//    OPÇÕES DROPDOWN (A+ / A- / MODO ESCURO)
let escala = 1;
const elementosAjustaveis = document.querySelectorAll(".ac");

// guarda o tamanho original de cada texto
elementosAjustaveis.forEach(function(elemento){
	const tamanhoOriginal = window.getComputedStyle(elemento).fontSize;
	elemento.dataset.tamanhoOriginal = parseFloat(tamanhoOriginal);
});

document.getElementById("a+").addEventListener("click", function(e){
	e.preventDefault();
	if(escala < 1.5){ escala += 0.1; }
	aplicarEscala();
});
document.getElementById("a-").addEventListener("click", function(e){
	e.preventDefault();
	if(escala > 0.8){ escala -= 0.1; }
	aplicarEscala();
});
function aplicarEscala(){
	elementosAjustaveis.forEach(function(elemento){
		const original = parseFloat(elemento.dataset.tamanhoOriginal);
		elemento.style.fontSize = (original * escala) + "px";
	});
}
document.getElementById("dark").addEventListener("click", function(e){
	e.preventDefault();
	document.body.classList.toggle("alto-contraste");
});

//    FECHAR DROPDOWN AO ESCOLHER UMA OPÇÃO
document.querySelectorAll(".dropdown-content .btn-dd").forEach(function(item){
	item.addEventListener("click", function(){
		const caixa = this.closest(".dropdown-content");
		caixa.classList.remove("aberto");

		// volta a seta para baixo
		const seta = caixa.previousElementSibling.querySelector("span");
		seta.innerHTML = '<i class="fa-solid fa-caret-down"></i>';
	});
});

//    BOTÃO UP
window.addEventListener("scroll", function(){
	const topo = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
	if(topo > 400){
		document.getElementById("botao-up").classList.add("visivel");
	} else {
		document.getElementById("botao-up").classList.remove("visivel");
	}
});

//    MENU LATERAL (MOBILE)
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

// fecha o menu ao clicar em um link normal (menos os dropdowns)
document.querySelectorAll(".menu-principal li a.btn:not(.dropdown-btn-ac)").forEach(function(link){
	link.addEventListener("click", fecharMenu);
});

//    ANIMAÇÃO DE ENTRADA AO ROLAR A PÁGINA
const itensAnimados = document.querySelectorAll(".card, .rede, .formulario, .topo-texto, .topo-imagem");

if("IntersectionObserver" in window){
	const observador = new IntersectionObserver(function(entradas){
		entradas.forEach(function(entrada){
			if(entrada.isIntersecting){
				entrada.target.classList.add("visivel");
				observador.unobserve(entrada.target);
			}
		});
	}, { threshold: 0.15 });

	itensAnimados.forEach(function(item){
		item.classList.add("revelar");
		observador.observe(item);
	});
}

//    FORMULÁRIO DE CONTATO
const formContato = document.getElementById("form-contato");
const avisoForm = document.getElementById("aviso-form");

function mostrarAviso(texto, tipo){
	avisoForm.textContent = texto;
	avisoForm.className = "aviso-form " + tipo;
}

formContato.addEventListener("submit", function(e){
	e.preventDefault();

	const campos = ["nome", "email", "assunto", "mensagem"];
	let valido = true;

	// limpa os erros anteriores
	campos.forEach(function(id){
		document.getElementById(id).parentElement.classList.remove("erro");
	});

	// confere se está tudo preenchido
	campos.forEach(function(id){
		const campo = document.getElementById(id);
		if(campo.value.trim() === ""){
			campo.parentElement.classList.add("erro");
			valido = false;
		}
	});

	// confere o formato do e-mail
	const email = document.getElementById("email");
	const modeloEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if(email.value.trim() !== "" && !modeloEmail.test(email.value.trim())){
		email.parentElement.classList.add("erro");
		valido = false;
	}

	if(!valido){
		mostrarAviso("Preencha todos os campos corretamente.", "erro");
		return;
	}

	// como é um projeto acadêmico, só simula o envio
	mostrarAviso("Mensagem enviada! Obrigado pelo contato.", "sucesso");
	formContato.reset();
});

//    GOOGLE TRADUTOR
window.googleTranslateElementInit = function () {
	new google.translate.TranslateElement({
		pageLanguage: 'pt',
		includedLanguages: 'pt,en,es',
		autoDisplay: false
	}, 'google_translate_element');
};

// script
const scriptGoogle = document.createElement('script');
	scriptGoogle.type = 'text/javascript';
	scriptGoogle.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
	document.body.appendChild(scriptGoogle);

// função
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