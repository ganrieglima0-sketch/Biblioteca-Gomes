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

// BOTÃO IDIOMA
document.getElementById("btn-idioma").addEventListener("click", function(e){
	e.preventDefault();
	this.nextElementSibling.classList.toggle("aberto");
	
	const seta = document.getElementById("seta-idioma");
	if(this.nextElementSibling.classList.contains("aberto"))
	{	seta.innerHTML = '<i class="fa-solid fa-caret-up"></i>';	} 
	else
	{	seta.innerHTML = '<i class="fa-solid fa-caret-down"></i>';	}
});

//    OPÇÕES DROPDOWN
let escala = 1; 
	const elementosAjustaveis = document.querySelectorAll(".ac");
		elementosAjustaveis.forEach(function(elemento){
	const tamanhoOriginal = window.getComputedStyle(elemento).fontSize;
		elemento.dataset.tamanhoOriginal = parseFloat(tamanhoOriginal);
});
document.getElementById("a+").addEventListener("click", function(e){
	e.preventDefault();
	escala += 0.1;
	aplicarEscala();
});
document.getElementById("a-").addEventListener("click", function(e){
	e.preventDefault();
	escala -= 0.1;
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

// DROPDOWN
document.querySelectorAll(".menu-principal li a.btn:not(.dropdown-btn-ac)").forEach(function(link){
    link.addEventListener("click", fecharMenu);
});
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
//    RECURSOS/Ñ SCROLLAR
document.querySelectorAll('.recurso a').forEach(link => {
	link.addEventListener('click', function(e){
		e.preventDefault();
		const scrollPos = window.scrollY;
		window.location.hash = this.getAttribute('href').slice(1);
		window.scrollTo(0, scrollPos);
	});
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

// fecha o menu lateral se a tela voltar a ficar grande
window.addEventListener("resize", function(){
	if(window.innerWidth > 1300){ fecharMenu(); }
});


const openBtn = document.getElementById('open_btn');
if (openBtn) {
    openBtn.addEventListener('click', function () {
        document.getElementById('sidebar').classList.toggle('open-sidebar');
    });
}

// Google tradutor
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

// Função
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