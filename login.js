/* =========================================================
   INPUTS (ERROR)
   ========================================================= */
const form = document.getElementById('form-login');

function validarCampo(input, mensagem) {
    const grupo = input.closest('.input-group');

    if (!input.dataset.placeholderOriginal) {
        input.dataset.placeholderOriginal = input.placeholder;
    }

    if (!input.value.trim()) {
        input.placeholder = mensagem;
        grupo.classList.add('invalido');
        return false;
    }

    input.placeholder = input.dataset.placeholderOriginal;
    grupo.classList.remove('invalido');
    return true;
}

// remove o erro assim que a pessoa começa a digitar
document.querySelectorAll('.input-group input').forEach(input => {
    input.addEventListener('input', () => {
        input.closest('.input-group').classList.remove('invalido');
        if (input.dataset.placeholderOriginal) {
            input.placeholder = input.dataset.placeholderOriginal;
        }
        document.getElementById('erro-login').textContent = '';
    });
});

/* =========================================================
   INPUTS (MOSTRAR SENHA)
   ========================================================= */
const botaoOlho = document.querySelector('.toggle-senha');
const inputSenha = document.getElementById('senha');

botaoOlho.addEventListener('click', () => {
    const mostrando = inputSenha.type === 'text';

    inputSenha.type = mostrando ? 'password' : 'text';

    const icone = botaoOlho.querySelector('i');
    icone.classList.toggle('fa-eye', mostrando);
    icone.classList.toggle('fa-eye-slash', !mostrando);

    botaoOlho.setAttribute('aria-label', mostrando ? 'Mostrar senha' : 'Ocultar senha');
});

/* =========================================================
   ENTRAR (usa as contas do conta.js)
   ========================================================= */
// Contas de teste (tirar antes de publicar)
console.log("Básico: basico@gmail.com / basico14");
console.log("Premium: premium@gmail.com / premium14");

form.addEventListener('submit', function (e) {
    e.preventDefault(); // a conferência é feita aqui, sem recarregar a página

    const erroLogin = document.getElementById('erro-login');
    erroLogin.textContent = '';

    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');

    const emailOk = validarCampo(emailInput, 'Digite seu e-mail.');
    const senhaOk = validarCampo(senhaInput, 'Digite sua senha.');

    if (!emailOk || !senhaOk) return; // campos vazios

    // entrar() confere e-mail e senha e guarda o plano da conta
    if (entrar(emailInput.value, senhaInput.value)) {
        // Volta para a página de onde a pessoa veio (ou index.html se não houver)
        const destino = sessionStorage.getItem('paginaAntesLogin') || 'index.html';
        sessionStorage.removeItem('paginaAntesLogin');
        window.location.href = destino;
    } else {
        erroLogin.textContent = 'E-mail ou senha incorretos.';
        emailInput.closest('.input-group').classList.add('invalido');
        senhaInput.closest('.input-group').classList.add('invalido');
    }
});

/* =========================================================
   POP-UP (GOOGLE, APPLE)
   ========================================================= */
function abrirPopup(url, nome, largura, altura) {
    const esquerda = (screen.width - largura) / 2;
    const topo = (screen.height - altura) / 2;
    window.open(
        url,
        nome,
        `width=${largura},height=${altura},top=${topo},left=${esquerda},scrollbars=yes,resizable=yes`
    );
}

function loginGoogle() { abrirPopup("https://google.com", "LoginGoogle", 500, 600); }
function loginApple()  { abrirPopup("https://apple.com", "LoginApple", 550, 650); }