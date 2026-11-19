/* =========================================================
   INPUTS (ERROR)
   ========================================================= */
const form = document.getElementById('form-login');

//VALIDACAO EMAIL
const erroLogin = document.getElementById('erro-login');

function emailValido(valor) {
    return /^[a-zA-Z0-9._-]+@gmail\.com$/i.test(valor.trim());
}

// msg de erro
function mostrarErro(input, idMsg, mensagem) {
    input.closest('.input-group').classList.add('invalido');
    const msg = document.getElementById(idMsg);
    msg.textContent = mensagem;
    msg.style.display = 'block';
}

// esconde o <p>
function limparErro(idMsg) {
    const msg = document.getElementById(idMsg);
    msg.textContent = '';
    msg.style.display = 'none';
}
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

//    TERMOS
function validarCheckbox(checkbox) {
    const grupo = checkbox.closest('.form-options');

    if (!checkbox.checked) {
        grupo.classList.add('invalido');
        return false;
    }

    grupo.classList.remove('invalido');
    return true;
}

form.addEventListener('submit', function (e) {
    e.preventDefault(); // bloqueia o envio normal

    erroLogin.textContent = '';

    //limpa as mensagens sntes de validar dnv
    limparErro('erro-email');
    limparErro('erro-senha2');

    const emailInput = document.getElementById('email');

    const emailOk = validarCampo(emailInput, 'Digite seu e-mail');
    const senhaOk = validarCampo(document.getElementById('senha'), 'Digite sua senha');
    const nomeOk = validarCampo(document.getElementById('nome'), 'Digite seu nome');
    const senha2Ok = validarCampo(document.getElementById('senha2FA'), 'Confirme sua senha');
    const termosOk = validarCheckbox(document.getElementById('termos'));

/* =========================================================
    VALIDACAO DE SENHA (2FA)/ VALIDACAO DE EMAIL
   ========================================================= */
    let senhasIguais = true; //  SENHA

    const campoSenha = document.getElementById('senha');
    const campoSenha2 = document.getElementById('senha2FA');

    if (senhaOk && senha2Ok && campoSenha.value !== campoSenha2.value) {
        campoSenha.closest('.input-group').classList.add('invalido');
        mostrarErro(campoSenha2, 'erro-senha2', 'As senhas não coincidem.');
        senhasIguais = false;
    }

   let formatoOk = true; //  EMAIL
    if (emailOk && !emailValido(emailInput.value)) {
        mostrarErro(emailInput, 'erro-email', 'E-mail inválido. Use um endereço @gmail.com.');
        formatoOk = false;
    }

    if (!emailOk || !senhaOk || !nomeOk || !senha2Ok || !termosOk || !senhasIguais || !formatoOk) {
        return;
    }

    // CADASTRO CONCLUIDO
    localStorage.setItem('logado', 'true');
    localStorage.setItem('usuario', emailInput.value.trim());
    window.location.href = '/html/index.html';
});

// remove o erro assim que a pessoa começa a digitar
//      TERMOS
document.getElementById('termos').addEventListener('change', (e) => {
    if (e.target.checked) {
        e.target.closest('.form-options').classList.remove('invalido');
    }
});

// email
document.querySelectorAll('.input-group input').forEach(input => {
    input.addEventListener('input', () => {
        input.closest('.input-group').classList.remove('invalido');
        erroLogin.textContent = '';
        if (input.id === 'email') limparErro('erro-email');
        if (input.id === 'senha2FA') limparErro('erro-senha2');

        // senha
        if (input.id === 'senha') {
            const grupo2 = document.getElementById('senha2FA').closest('.input-group');
            grupo2.classList.remove('invalido');
            limparErro('erro-senha2');
        }

        if (input.dataset.placeholderOriginal) {
            input.placeholder = input.dataset.placeholderOriginal;
        }
    });
});

/* =========================================================
   CADASTRO: MOSTRAR SENHA
   ========================================================= */
document.querySelectorAll('.toggle-senha').forEach(botao => {
    botao.addEventListener('click', () => {
        const input = botao.closest('.input-group').querySelector('input');
        const icone = botao.querySelector('i');

        const mostrando = input.type === 'text';

        input.type = mostrando ? 'password' : 'text';
        icone.classList.toggle('fa-eye', mostrando);
        icone.classList.toggle('fa-eye-slash', !mostrando);

        botao.setAttribute('aria-label', mostrando ? 'Mostrar senha' : 'Ocultar senha');
    });
});

/* =========================================================
   POP-UP (GOOGLE, APPLE)
   ========================================================= */
   // URL Google
   function loginGoogle() {

    const url = "https://google.com";
    
    const largura = 500;
    const altura = 600;
    const esquerda = (screen.width - largura) / 2;
    const topo = (screen.height - altura) / 2;

    //position
    window.open(
        url, 
        "LoginGoogle", 
        `width=${largura},height=${altura},top=${topo},left=${esquerda},scrollbars=yes,resizable=yes`
    );
}
    function loginApple() {
    // URL Apple
    const url = "https://apple.com";
    
    //pop-up
    const largura = 550;
    const altura = 650;
    const esquerda = (screen.width - largura) / 2;
    const topo = (screen.height - altura) / 2;

    //position
    window.open(
        url, 
        "LoginApple", 
        `width=${largura},height=${altura},top=${topo},left=${esquerda},scrollbars=yes,resizable=yes`
    );
}