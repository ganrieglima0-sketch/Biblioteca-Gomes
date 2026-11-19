// ===== CONTAS DE TESTE (simulação, nada é cadastrado de verdade) =====
const contas = {
    "basico@gmail.com": {
        nome: "Rodrigo Cesar",
        senha: "basico14",
        plano: "basico",
        foto: "perfil_basico.png"
    },
    "premium@gmail.com": {
        nome: "Gabriel Gomes",
        senha: "premium14",
        plano: "premium",
        foto: "perfil_premium.png"
    }
};

const CHAVE_CONTA = "contaLogada";

// Devolve a conta que está logada (ou null se ninguém logou)
function contaAtual() {
    const email = localStorage.getItem(CHAVE_CONTA);
    return contas[email] || null;
}

// Tenta entrar: devolve true se e-mail e senha estiverem certos
function entrar(email, senha) {
    const chave = email.trim().toLowerCase();
    const conta = contas[chave];
    if (!conta || conta.senha !== senha) return false;
    localStorage.setItem(CHAVE_CONTA, chave);
    // Mantidos para o resto do site que já lê esses valores
    localStorage.setItem('logado', 'true');
    localStorage.setItem('usuario', chave);
    return true;
}

// Sai da conta e volta para o início
function sair() {
    localStorage.removeItem(CHAVE_CONTA);
    localStorage.removeItem('logado');
    localStorage.removeItem('usuario');
    location.href = "index.html";
}

// Mostra o menu certo: deslogado (Criar/Entrar) ou logado (foto)
function atualizarMenu() {
    const conta = contaAtual();
    const botoesLogin = document.getElementById("botoes-login");
    const usuario = document.getElementById("usuario");

    if (conta) {
        if (botoesLogin) botoesLogin.classList.add("oculto");
        if (usuario) usuario.classList.remove("oculto");

        document.getElementById("foto-usuario").src = conta.foto;
        document.getElementById("nome-usuario").textContent = conta.nome;

        const plano = document.getElementById("plano-usuario");
        if (conta.plano === "premium") {
            plano.innerHTML = '<i class="fa-solid fa-crown"></i> Premium';
            plano.classList.add("premium");
        } else {
            plano.textContent = "Básico";
            plano.classList.remove("premium");
        }
    } else {
        if (botoesLogin) botoesLogin.classList.remove("oculto");
        if (usuario) usuario.classList.add("oculto");
    }
}

// Abre/fecha o dropdown do usuário e liga o botão Sair
function ligarMenuUsuario() {
    const botao = document.getElementById("btn-usuario");
    const menu = document.getElementById("menu-usuario");
    const botaoSair = document.getElementById("btn-sair");
    if (!botao || !menu) return;

    // Clicar na bolinha abre ou fecha as opções
    botao.addEventListener("click", function (e) {
        e.stopPropagation();
        menu.classList.toggle("usuario-aberto");
    });

    // Clicar dentro do painel não fecha
    menu.addEventListener("click", function (e) {
        e.stopPropagation();
    });

    // Clicar fora fecha o painel
    document.addEventListener("click", function () {
        menu.classList.remove("usuario-aberto");
    });

    if (botaoSair) botaoSair.addEventListener("click", sair);
}

// Guarda a página atual quando a pessoa clica em Entrar, para voltar nela depois do login
function ligarBotaoEntrar() {
    const botao = document.querySelector(".btn-entrar");
    if (!botao) return;

    const pagina = location.pathname.split("/").pop() || "index.html";

    // Nas telas de login e cadastro não guarda nada
    if (pagina === "login.html" || pagina === "criar.html") return;

    botao.addEventListener("click", function () {
        sessionStorage.setItem("paginaAntesLogin", pagina + location.search);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    atualizarMenu();
    ligarMenuUsuario();
    ligarBotaoEntrar();
});