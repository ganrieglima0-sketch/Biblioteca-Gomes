/* =========================================================
   LIVROS.JS - ÚNICO CATÁLOGO DO SITE
   Carregado por: acervo.html, leitura.html e livro.html
   =========================================================

   COMO ADICIONAR / TROCAR UM LIVRO
   - id:        número único (não repita e não mude depois que o livro for usado)
   - tipo:      'estudos' (acadêmico) ou 'lazer' (hobby)
   - generos:   lista de gêneros/temas (a "categoria" é o primeiro da lista)
   - capa:      caminho da imagem (pasta "capas" do repositório)
   - cor:       cor de reserva se a imagem ainda não existir
   - capitulos: lista de { titulo, texto }.
                Parágrafos: separe com uma linha em branco dentro do texto.
                Se o livro NÃO tiver "capitulos", o código gera
                3 capítulos de EXEMPLO automaticamente (veja o fim do arquivo).

   MODELO DE CAPÍTULOS REAIS (veja o livro id 10 mais abaixo):
   capitulos: [
       { titulo: 'Título do capítulo 1', texto: 'Parágrafo 1\n\nParágrafo 2' },
       { titulo: 'Título do capítulo 2', texto: 'Parágrafo 1\n\nParágrafo 2' }
   ]

   IDs 1 a 17: estudos | IDs 18 a 38: lazer
   ========================================================= */

// TEXTO DE EXEMPLO (troque pelos capítulos reais quando tiver o conteúdo)
const PARAGRAFOS_EXEMPLO = [
	'Este é um texto de exemplo para demonstrar a tela de leitura. Ele ocupa o lugar do conteúdo real do livro e serve para testar a rolagem, o tamanho da fonte, as anotações e o progresso de leitura.',
	'Cada capítulo pode ter quantos parágrafos você quiser. Para separar um parágrafo do outro, basta deixar uma linha em branco dentro do texto do capítulo.',
	'Use os botões acima do texto para aumentar ou diminuir a fonte. A sua escolha fica salva neste navegador e vale para todos os livros.',
	'Escreva uma anotação logo abaixo: ela fica ligada a este livro e a este capítulo, e continua aqui quando você voltar.',
	'Quando o conteúdo definitivo estiver pronto, troque o campo "capitulos" deste livro no arquivo livros.js por uma lista com o título e o texto de cada capítulo.'
];

function exemplo(titulo, nomes) {
	nomes = nomes || ['Apresentação', 'Desenvolvimento', 'Conclusão'];
	return nomes.map(function (nome, i) {
		return {
			titulo: nome,
			texto: 'Capítulo de exemplo ' + (i + 1) + ' de «' + titulo + '».\n\n' + PARAGRAFOS_EXEMPLO.join('\n\n')
		};
	});
}

const LIVROS = [

	/* ---------- ESTUDOS ---------- */
	{ id: 1,  tipo: 'estudos', titulo: 'Curso de Direito Constitucional', autor: 'Gilmar Mendes e Paulo Gonet Branco', generos: ['Direito'], capa: 'direito-constitucional.jpeg'},
	{ id: 2,  tipo: 'estudos', titulo: 'Manual de Direito Civil', autor: 'Flávio Tartuce', generos: ['Direito'], capa: 'manual-direito.jpg'},
	{ id: 3,  tipo: 'estudos', titulo: 'Atlas de Anatomia Humana', autor: 'Frank H. Netter', generos: ['Medicina'], capa: 'atlas-anatomia.jpg'},
	{ id: 4,  tipo: 'estudos', titulo: 'Tratado de Fisiologia Médica', autor: 'Arthur C. Guyton e John E. Hall', generos: ['Medicina'], capa: 'tratado-fisiologia.jpg'},
	{ id: 5,  tipo: 'estudos', titulo: 'Introdução à Administração', autor: 'Idalberto Chiavenato', generos: ['Administração'], capa: 'introducao-administracao.jpg'},
	{ id: 6,  tipo: 'estudos', titulo: 'Pedagogia do Oprimido', autor: 'Paulo Freire', generos: ['Educação'], capa: 'pedagogia-oprimido.jpg'},
	{ id: 7,  tipo: 'estudos', titulo: 'Didática', autor: 'José Carlos Libâneo', generos: ['Educação'], capa: 'didatica.jpg'},
	{ id: 8,  tipo: 'estudos', titulo: 'Introdução à Psicologia de Hilgard', autor: 'Rita L. Atkinson et al.', generos: ['Psicologia'], capa: 'introducao-psicologia.jpg'},
	{ id: 9,  tipo: 'estudos', titulo: 'Inteligência Artificial', autor: 'Stuart Russell e Peter Norvig', generos: ['Tecnologia'], capa: 'inteligencia-artificial.jpg'},
	{ id: 10, tipo: 'estudos', titulo: 'Código Limpo', autor: 'Robert C. Martin', generos: ['Tecnologia'], capa: 'codigo-limpo.jpg',
		// EXEMPLO DE CAPÍTULOS ESCRITOS À MÃO (modelo para os outros livros)
		capitulos: [
			{ titulo: 'Nomes que revelam intenção', texto: 'Um bom nome responde a três perguntas: por que a variável existe, o que ela faz e como é usada. Quando o nome precisa de um comentário para ser entendido, ele ainda não está bom.\n\nEscolha palavras que possam ser pronunciadas e pesquisadas, e evite abreviações misteriosas.' },
			{ titulo: 'Funções pequenas', texto: 'Funções menores são mais fáceis de ler, testar e reaproveitar. Uma função deve fazer uma coisa só e fazê-la bem.\n\nSe você precisa de uma seção com título dentro da função, ela provavelmente deveria ser duas.' },
			{ titulo: 'Comentários e formatação', texto: 'O melhor comentário é o código que se explica sozinho. Use comentários para o que o código não consegue dizer, como o motivo de uma decisão.\n\nUma formatação consistente ajuda quem lê a encontrar o que procura sem esforço.' }
		]
	},
	{ id: 11, tipo: 'estudos', titulo: 'Princípios de Economia', autor: 'N. Gregory Mankiw', generos: ['Economia'], capa: 'introducao-economia.jpg'},
	{ id: 12, tipo: 'estudos', titulo: 'História Concisa da Literatura Brasileira', autor: 'Alfredo Bosi', generos: ['Literatura'], capa: 'historia-concisa.jpg'},
	{ id: 13, tipo: 'estudos', titulo: 'Convite à Filosofia', autor: 'Marilena Chauí', generos: ['Filosofia'], capa: 'convite-filosofia.jpg'},
	{ id: 14, tipo: 'estudos', titulo: 'O Design do Dia a Dia', autor: 'Donald A. Norman', generos: ['Design'], capa: 'design-dia-dia.jpg'},
	{ id: 15, tipo: 'estudos', titulo: 'Estatística Básica', autor: 'Wilton Bussab e Pedro Morettin', generos: ['Estatística'], capa: 'estatistica-basica.jpg'},
	{ id: 16, tipo: 'estudos', titulo: 'História do Brasil', autor: 'Boris Fausto', generos: ['História'], capa: 'historia-brasil.jpg'},
	{ id: 17, tipo: 'estudos', titulo: 'Cálculo – Volume 1', autor: 'James Stewart', generos: ['Matemática'], capa: 'calculo1.jpeg'},

	/* ---------- LAZER ---------- */
	{ id: 18, tipo: 'lazer', titulo: 'Percy Jackson e o Ladrão de Raios', autor: 'Rick Riordan', generos: ['Fantasia', 'Aventura'], capa: 'percy-jackson.jpeg'},
	{ id: 19, tipo: 'lazer', titulo: 'O Hobbit', autor: 'J.R.R. Tolkien', generos: ['Fantasia', 'Aventura'], capa: 'hobbit.jpg'},
	{ id: 20, tipo: 'lazer', titulo: 'As Crônicas de Nárnia', autor: 'C.S. Lewis', generos: ['Fantasia', 'Aventura'], capa: 'cronicas-de-narnia.jpg'},
	{ id: 21, tipo: 'lazer', titulo: 'Jogos Vorazes', autor: 'Suzanne Collins', generos: ['Distopia', 'Ação'], capa: 'jogos-vorazes.jpg'},
	{ id: 22, tipo: 'lazer', titulo: '1984', autor: 'George Orwell', generos: ['Distopia', 'Clássicos'], capa: '1984.jpg'},
	{ id: 23, tipo: 'lazer', titulo: 'Um Estudo em Vermelho', autor: 'Arthur Conan Doyle', generos: ['Mistério', 'Clássicos'], capa: 'estudo-vermelho.jpg'},
	{ id: 24, tipo: 'lazer', titulo: 'Manual de Assassinato para Boas Garotas', autor: 'Holly Jackson', generos: ['Mistério', 'Thriller'], capa: 'manual-assassinato.jpg'},
	{ id: 25, tipo: 'lazer', titulo: 'Verity', autor: 'Colleen Hoover', generos: ['Thriller'], capa: 'verity.jpg'},
	{ id: 26, tipo: 'lazer', titulo: 'O Colecionador', autor: 'John Fowles', generos: ['Thriller'], capa: 'colecionador.jpg'},
	{ id: 27, tipo: 'lazer', titulo: 'It: A Coisa', autor: 'Stephen King', generos: ['Terror'], capa: 'it.jpg'},
	{ id: 28, tipo: 'lazer', titulo: 'O Iluminado', autor: 'Stephen King', generos: ['Terror'], capa: 'iluminado.jpg'},
	{ id: 29, tipo: 'lazer', titulo: 'O Exorcista', autor: 'William Peter Blatty', generos: ['Terror'], capa: 'exorcista.jpg'},
	{ id: 30, tipo: 'lazer', titulo: 'Frankenstein', autor: 'Mary Shelley', generos: ['Terror', 'Clássicos'], capa: 'frankenstein.jpg'},
	{ id: 31, tipo: 'lazer', titulo: 'Vermelho, Branco e Sangue Azul', autor: 'Casey McQuiston', generos: ['Romance'], capa: 'vermelho-branco.jpg'},
	{ id: 32, tipo: 'lazer', titulo: 'É Assim que Acaba', autor: 'Colleen Hoover', generos: ['Romance', 'Drama'], capa: 'assim-que-acaba.jpg'},
	{ id: 33, tipo: 'lazer', titulo: 'Os Três Mosqueteiros', autor: 'Alexandre Dumas', generos: ['Ação', 'Aventura', 'Clássicos'], capa: 'tres-mosqueteiros.jpg'},
	{ id: 34, tipo: 'lazer', titulo: 'Viagem ao Centro da Terra', autor: 'Júlio Verne', generos: ['Aventura', 'Clássicos'], capa: 'viagem-centro.jpg'},
	{ id: 35, tipo: 'lazer', titulo: 'A Culpa é das Estrelas', autor: 'John Green', generos: ['Drama', 'Romance'], capa: 'culpa-estrelas.jpg'},
	{ id: 36, tipo: 'lazer', titulo: 'O Diário de Anne Frank', autor: 'Anne Frank', generos: ['Drama'], capa: 'diario-anne.jpg'},
	{ id: 37, tipo: 'lazer', titulo: 'O Pequeno Príncipe', autor: 'Antoine de Saint-Exupéry', generos: ['Clássicos'], capa: 'pequeno-principe.jpg'},
	{ id: 38, tipo: 'lazer', titulo: 'Dom Quixote', autor: 'Miguel de Cervantes', generos: ['Clássicos', 'Aventura'], capa: 'dom-quixote.jpg'},
	{ id: 39, tipo: 'lazer', titulo: 'Insurgente', autor: 'Veronica Roth', generos: ['Distopia', 'Aventura'], capa: 'insurgente.jpg'},
	{ id: 40, tipo: 'lazer', titulo: 'Harry Potter e A Pedra Filosofal', autor: 'J.K. Rowling', generos: ['Fantasia', 'Aventura'], capa: 'harry-potter.jpg'},
	{ id: 41, tipo: 'lazer', titulo: 'Revolução dos Bichos', autor: 'George Orwell', generos: ['Clássicos'], capa: 'revolucao-bichos.jpg'},
	{ id: 42, tipo: 'lazer', titulo: 'A Guerra dos Tronos', autor: 'George R.R. Martin', generos: ['Fantasia', 'Drama'], capa: 'guerra-tronos.jpg'},
	{ id: 43, tipo: 'lazer', titulo: 'O Senhor dos Anéis', autor: 'J.R.R. Tolkien', generos: ['Fantasia', 'Aventura'], capa: 'senhor-aneis.jpg'},
	{ id: 44, tipo: 'lazer', titulo: 'O Olho do Mundo', autor: 'Robert Jordan', generos: ['Fantasia', 'Aventura'], capa: 'olho-mundo.jpg'},
	{ id: 45, tipo: 'lazer', titulo: 'O Nome do Vento', autor: 'Patrick Rothfuss', generos: ['Fantasia', 'Aventura'], capa: 'nome-vento.jpg'},
	{ id: 46, tipo: 'lazer', titulo: 'O Ceifador', autor: 'Neal Shusterman', generos: ['Distopia'], capa: 'ceifador.jpg'},
	{ id: 47, tipo: 'lazer', titulo: 'Entre o Submundo', autor: 'Aléxia Guidetti', generos: ['Distopia', 'Fantasia'], capa: 'submundo.jpg'},
	{ id: 48, tipo: 'lazer', titulo: 'Viúva de Ferro', autor: 'Xiran Jay Zhao', generos: ['Fantasia'], capa: 'viuva-ferro.jpg'},
	{ id: 49, tipo: 'lazer', titulo: 'Correr ou Morrer: Mazer Runner', autor: 'James Dashner', generos: ['Distopia'], capa: 'maze-runner.jpg'},
	{ id: 50, tipo: 'lazer', titulo: 'Os Miseráveis', autor: 'Victor Hugo', generos: ['Romance', 'Drama'], capa: 'miseraveis.jpg'},
	{ id: 51, tipo: 'lazer', titulo: 'A Paciente Silenciosa', autor: 'Alex Michaelides', generos: ['Thriller', 'Mistério'], capa: 'paciente-silenciosa.jpg'},
	{ id: 52, tipo: 'lazer', titulo: 'Rastro de Sangue: Jack, o Estripador', autor: 'Kerri Maniscalco', generos: ['Thriller', 'Mistério'], capa: 'jack-estripador.jpg'},
	{ id: 53, tipo: 'lazer', titulo: 'A Garota do Lago', autor: 'Charlie Donlea', generos: ['Thriller', 'Mistério'], capa: 'garota-lago.jpg'},
	{ id: 54, tipo: 'lazer', titulo: 'A Cirurgiã', autor: 'Leslie Wolfe', generos: ['Thriller', 'Suspense'], capa: 'cirugia.jpg'},
	{ id: 55, tipo: 'lazer', titulo: 'A Empregada', autor: 'Freida McFadden', generos: ['Thriller', 'Suspense'], capa: 'empregada.jpg'},
	{ id: 56, tipo: 'lazer', titulo: 'O Apartamento de Paris', autor: 'Lucy Foley', generos: ['Mistério', 'Thriller'], capa: 'apartamento-paris.jpg'},
	{ id: 57, tipo: 'lazer', titulo: 'Em Queda', autor: 'T.J. Newman', generos: ['Thriller', 'Ação'], capa: 'queda.jpg'},
	{ id: 58, tipo: 'lazer', titulo: 'O Que Está Lá Fora', autor: 'Kate Alice Marshall', generos: ['Thriller', 'Mistério'], capa: 'la-fora.jpg'},
	{ id: 59, tipo: 'lazer', titulo: 'Sem Saída', autor: 'Taylor Adams', generos: ['Thriller', 'Suspense'], capa: 'sem-saida.jpg'},
	{ id: 60, tipo: 'lazer', titulo: 'Pedra, Papel, Tesoura', autor: 'Alice Feeney', generos: ['Thriller', 'Mistério'], capa: 'pedra-papel.jpg'},
	{ id: 61, tipo: 'lazer', titulo: 'O Fio do Bisturi', autor: 'Tess Gerritsen', generos: ['Thriller', 'Suspense'], capa: 'fio-bisturi.jpg'},
	{ id: 62, tipo: 'lazer', titulo: 'O Paciente', autor: 'Jasper DeWitt', generos: ['Terror', 'Suspense'], capa: 'paciente.jpg'},
	{ id: 63, tipo: 'lazer', titulo: 'O Massacre', autor: 'Luciano Lambert', generos: ['Terror', 'Suspense'], capa: 'massacre.jpg'},
	{ id: 64, tipo: 'lazer', titulo: 'Saboroso Cadáver', autor: 'Agustina Bazterrica', generos: ['Terror', 'Distopia'], capa: 'saboroso-cadaver.jpg'},
	{ id: 65, tipo: 'lazer', titulo: 'Psicopata Vitoriana', autor: 'Virginia Feito', generos: ['Terror', 'Thriller'], capa: 'psicopata-vitoriana.jpg'},
	{ id: 66, tipo: 'lazer', titulo: 'A Casa dos Pesadelos', autor: 'Marcos DeBrito', generos: ['Terror', 'Suspense'], capa: 'casa-pesadelos.jpg'},
	{ id: 67, tipo: 'lazer', titulo: 'A Filha Perfeita', autor: 'Lucinda Berry', generos: ['Thriller', 'Drama'], capa: 'filha-perfeita.jpg'},
	{ id: 68, tipo: 'lazer', titulo: 'O Amor Está no Ar', autor: 'B.K. Borison', generos: ['Romance'], capa: 'amor-ar.jpg'},
	{ id: 69, tipo: 'lazer', titulo: 'Tempestade do Sul', autor: 'Brittainy C.Cherry', generos: ['Romance', 'Drama'], capa: 'tempestade-sul.jpg'},
	{ id: 70, tipo: 'lazer', titulo: 'Verão em Nova York', autor: 'Alex Aster', generos: ['Romance', 'Drama'], capa: 'verao-ny.jpg'},
	{ id: 71, tipo: 'lazer', titulo: 'A Muralha de Winnipeg e Eu', autor: 'Mariana Zapata', generos: ['Romance'], capa: 'muralha-winiipeg.jpg'},
	{ id: 72, tipo: 'lazer', titulo: 'Parte do Seu Mundo', autor: 'Abbey Jimenez', generos: ['Romance'], capa: 'parte-mundo.jpeg'},
	{ id: 73, tipo: 'lazer', titulo: 'Duna', autor: 'Frank Herbert', generos: ['Aventura', 'Ação'], capa: 'duna.jpg'},
	{ id: 74, tipo: 'lazer', titulo: 'First Blood', autor: 'David Morrell', generos: ['Ação', 'Thriller'], capa: 'first-blood.jpg'},
	{ id: 75, tipo: 'lazer', titulo: 'The Witcher', autor: 'Andrzej Sapkowski', generos: ['Fantasia', 'Aventura'], capa: 'the-witcher.jpg'},
	{ id: 76, tipo: 'lazer', titulo: 'O Cavaleiro dos Sete Reinos', autor: 'George R.R. Martin', generos: ['Fantasia', 'Aventura'], capa: 'sete-reinos.jpg'},
	{ id: 77, tipo: 'lazer', titulo: 'O Sétimo Continente', autor: 'Thalita Ferreira', generos: ['Fantasia', 'Aventura'], capa: 'setimo-continente.jpg'},
	{ id: 78, tipo: 'lazer', titulo: 'O Pistoleiro', autor: 'Stephen King', generos: ['Fantasia', 'Ação'], capa: 'pistoleiro.jpg'},
	{ id: 79, tipo: 'lazer', titulo: 'O Inferno de Dante', autor: 'Paul & Gaëtan Brizzi', generos: ['Fantasia', 'Clássicos'], capa: 'inferno-dante.jpg'},
	{ id: 80, tipo: 'lazer', titulo: 'Os Quatro Ventos', autor: 'Kristin Hannah', generos: ['Drama',], capa: 'quatros-ventos.jpeg'},
	{ id: 81, tipo: 'lazer', titulo: 'A Mulher com a Estrela Azul', autor: 'Pam Jenoff', generos: ['Drama'], capa: 'estrela-azul.jpeg'},
	{ id: 82, tipo: 'lazer', titulo: 'Uma Segunda Chance', autor: 'Colleen Hoover', generos: ['Romance', 'Drama'], capa: 'segunda-chance.jpeg'},
	{ id: 83, tipo: 'lazer', titulo: 'Cinquenta Tons de Cinza', autor: 'E.L. James', generos: ['Romance'], capa: 'tons-cinza.jpg'},
	{ id: 84, tipo: 'lazer', titulo: 'Massacre da Família Hope', autor: 'Riley Sager', generos: ['Thriller', 'Mistério'], capa: 'massacre-hope.jpeg'}

];

// LIVROS PREMIUM (só do lazer). Para mudar, é só editar esta lista de ids.
const IDS_PREMIUM = [21, 24, 25, 27, 28, 29, 31, 32, 35, 42, 43, 44, 45, 46, 51, 55, 57, 60, 73, 75, 80];

// SINOPSES (por id). Livro sem sinopse aqui mostra um texto padrão.
const SINOPSES = {
	18: 'Percy Jackson tem doze anos e uma vida cheia de problemas: troca de escola o tempo todo e coisas estranhas acontecem ao redor dele. Quando descobre que os deuses da mitologia grega são reais e que ele faz parte desse mundo, vira o principal suspeito do roubo do raio de Zeus. Para evitar uma guerra entre os deuses, precisa atravessar os Estados Unidos em uma missão perigosa.',
	19: 'Bilbo Bolseiro adora sua toca confortável e sua rotina tranquila. Até que o mago Gandalf e treze anões batem à sua porta com um convite para uma aventura: recuperar um tesouro guardado por um dragão. Entre trolls, goblins e criaturas misteriosas, o pequeno hobbit descobre que tem mais coragem e esperteza do que imaginava.',
	22: 'Em um futuro sombrio, a sociedade vive sob o controle do Partido e do onipresente Grande Irmão, que vigia cada gesto, palavra e até pensamento. Winston Smith trabalha reescrevendo a história para o governo, mas começa a duvidar do sistema que serve. Um clássico sobre vigilância, manipulação da verdade e a luta pela liberdade individual.',
	33: 'O jovem d\'Artagnan chega a Paris com o sonho de se tornar mosqueteiro do rei. Logo conhece Athos, Porthos e Aramis, e os quatro formam uma amizade inseparável. Entre duelos, intrigas da corte e conspirações, lutam por honra e lealdade sob o lema "um por todos, todos por um".',
	36: 'Durante a Segunda Guerra Mundial, a adolescente Anne Frank e sua família se escondem dos nazistas em um anexo secreto em Amsterdã. Nesse período, ela registra no diário seus sonhos, medos e descobertas, e a rotina de viver em silêncio por mais de dois anos. Um testemunho sensível e humano de uma jovem que nunca deixou de acreditar na vida.',
	37: 'Um piloto cai com seu avião no deserto do Saara e encontra um menino de cabelos dourados que veio de um asteroide muito pequeno. Aos poucos, o pequeno príncipe conta sobre os planetas que visitou e as pessoas estranhas que conheceu. Uma fábula poética sobre amizade, amor e o que realmente importa na vida.',
	40: 'Harry Potter cresce em uma casa onde ninguém gosta dele, sem saber quem realmente é. No dia em que completa onze anos, recebe uma carta que revela a verdade: ele é um bruxo e já é famoso no mundo mágico. Em Hogwarts, faz amigos, descobre segredos e se vê no centro de um mistério envolvendo a Pedra Filosofal.',
	21: 'Na nação de Panem, todo ano os distritos precisam enviar um menino e uma menina para os Jogos Vorazes, uma competição transmitida ao vivo da qual só um sai vivo. Katniss Everdeen se oferece no lugar da irmã e entra na arena. Para voltar para casa, vai precisar de coragem, estratégia e decidir até onde está disposta a ir.',
	35: 'Hazel Grace é uma adolescente que convive com um câncer e já aprendeu a não esperar muito da vida. Em um grupo de apoio, conhece Augustus Waters, um garoto carismático que muda sua forma de ver o mundo. Juntos, vivem um romance intenso e uma busca por respostas, entre humor, afeto e emoção.',
	73: 'No árido planeta Arrakis, único lugar onde existe a especiaria mais valiosa do universo, o jovem Paul Atreides chega com sua família nobre para assumir o governo. Traições e disputas por poder mudam o seu destino e o aproximam dos povos do deserto. Uma épica ficção científica sobre política, religião, ecologia e o peso de um destino.'
};

// CAPÍTULOS ESCRITOS À MÃO (por id). Livro que não estiver aqui usa os capítulos de exemplo.
// Parágrafos: separe com uma linha em branco (\n\n) dentro do texto.
const CAPITULOS = {

	/* ---------- 18: Percy Jackson e o Ladrão de Raios ---------- */
	18: [
		{ titulo: 'Um passeio ao museu que deu errado', texto: 'Percy Jackson tem doze anos e já perdeu a conta das escolas de onde foi expulso. Sempre que ele está por perto, coisas estranhas acontecem, e ninguém parece acreditar que ele não faz de propósito. Seu único refúgio é a mãe, que o ama de um jeito protetor e misterioso.\n\nNuma excursão ao museu, a professora de matemática começa a agir de modo esquisito e ataca Percy diante de todos. Num instante, ele descobre que ela não é quem diz ser. Quando tudo termina, os colegas parecem nem lembrar do que aconteceu.\n\nA partir daí, Percy percebe que o mundo é bem maior e mais perigoso do que imaginava. Sua mãe decide levá-lo para um lugar seguro, e a viagem faz com que ele comece a juntar peças sobre a própria história.' },
		{ titulo: 'O Acampamento Meio-Sangue', texto: 'O lugar seguro é um acampamento escondido, onde vivem jovens que têm um pai ou uma mãe entre os deuses da mitologia grega. Lá, Percy conhece o centauro Quíron, que cuida dos acampantes, e aprende que os monstros das lendas são reais e caçam esses jovens.\n\nPercy faz amizades, treina com espada e descobre que ainda ninguém sabe quem é seu pai divino. A espera pelo sinal que revelará essa resposta o deixa inquieto, porque ele quer saber de onde vem e por que sempre se sentiu diferente.\n\nEnquanto isso, uma notícia assusta todo o acampamento: o raio de Zeus, a arma mais poderosa do rei dos deuses, foi roubado. As suspeitas caem sobre Percy, e o prazo para devolvê-lo é curto.' },
		{ titulo: 'Uma missão pelo país', texto: 'Para provar sua inocência e evitar uma guerra entre os deuses, Percy aceita uma missão: recuperar o raio antes que seja tarde demais. Ele parte acompanhado de dois amigos, Annabeth, uma garota esperta e determinada, e Grover, um sátiro leal e atrapalhado.\n\nA viagem atravessa os Estados Unidos e se transforma numa sequência de perigos. Os três enfrentam monstros disfarçados em lugares comuns, resolvem enigmas e aprendem a confiar uns nos outros quando a situação aperta.\n\nQuanto mais se aproxima do destino, mais Percy percebe que nem tudo é o que parece. Há alguém jogando nas sombras, e descobrir quem é vai testar sua coragem como nunca.' }
	],

	/* ---------- 19: O Hobbit ---------- */
	19: [
		{ titulo: 'Uma visita inesperada', texto: 'Bilbo Bolseiro é um hobbit de hábitos tranquilos. Gosta de sua toca confortável, de boas refeições e de nunca ser incomodado por aventuras, que ele considera coisa desagradável e atrasada para o jantar.\n\nTudo muda quando o mago Gandalf marca sua porta com um sinal e, na noite seguinte, treze anões aparecem, um atrás do outro, esvaziando a despensa. Eles contam seu plano: recuperar o tesouro e o reino perdidos para um dragão, e precisam de um ladrão para ajudar.\n\nBilbo protesta, mas algo dentro dele, a parte mais curiosa da sua família, começa a despertar. Na manhã seguinte, ele sai correndo de casa sem lenço e sem chapéu, em direção ao desconhecido.' },
		{ titulo: 'Trolls, goblins e um anel', texto: 'A viagem logo mostra que o mundo lá fora é bem mais perigoso do que as histórias de lareira. Os viajantes caem nas mãos de trolls famintos, e Bilbo precisa usar a cabeça para ganhar tempo até o amanhecer.\n\nDepois, nas profundezas de uma montanha, ele se perde de seus companheiros e encontra uma criatura estranha e solitária chamada Gollum. Entre os dois acontece um jogo de adivinhações em que a aposta é a vida de Bilbo.\n\nNo escuro, o hobbit encontra um pequeno anel de ouro e o guarda no bolso sem imaginar o quanto ele será útil. Com sorte e esperteza, consegue escapar e se reunir ao grupo.' },
		{ titulo: 'A Montanha Solitária', texto: 'Após florestas assombradas, aranhas gigantes e uma fuga inventiva dentro de barris, os viajantes chegam, enfim, à Montanha Solitária. Lá fica o antigo reino dos anões, agora silencioso e guardado por Smaug, o dragão.\n\nBilbo é enviado para dentro da montanha e descobre que a coragem não é a ausência de medo, mas fazer o que precisa ser feito apesar dele. A conversa com o dragão é uma das mais tensas de toda a jornada.\n\nO tesouro, porém, desperta ambição em muita gente, e logo outros povos aparecem de olho no ouro. Bilbo percebe que o maior desafio talvez não seja o dragão, e sim o que a cobiça faz com as pessoas.' }
	],

	/* ---------- 22: 1984 ---------- */
	22: [
		{ titulo: 'Um dia de abril, em Londres', texto: 'Num dia frio de abril, os relógios marcam treze horas. Winston Smith volta para casa, num prédio decadente, enquanto cartazes de um rosto de olhar severo o acompanham por toda parte, com a frase de que o Grande Irmão está de olho em você.\n\nWinston vive num país governado por um Partido que controla tudo: o que se fala, o que se escreve e até o que se pensa. Em casa, uma teletela transmite propaganda e, ao mesmo tempo, observa cada movimento.\n\nNo trabalho, ele altera registros do passado para que sempre combinem com o que o Partido afirma no presente. É um serviço silencioso e burocrático, mas Winston começa a sentir que há algo muito errado com essa ideia de que a verdade pode ser reescrita.' },
		{ titulo: 'O caderno proibido', texto: 'Num gesto de rebeldia, Winston compra um caderno e começa a escrever seus pensamentos. Num mundo em que pensar diferente é crime, esse simples ato já pode custar a vida.\n\nEle passa a notar pequenos sinais de desconfiança em volta e se pergunta se existe mais alguém que enxerga a farsa. Uma jovem de seu local de trabalho chama sua atenção, e ele não sabe se ela é uma aliada ou uma ameaça.\n\nAos poucos, entre receios e descobertas, Winston encontra um jeito de se aproximar dessa pessoa. A relação lhe dá uma sensação nova de liberdade, ainda que vivida às escondidas.' },
		{ titulo: 'Quem controla o passado', texto: 'Quanto mais Winston questiona, mais vê como o Partido molda a linguagem e a memória das pessoas. Palavras desaparecem do vocabulário, e com elas as ideias que poderiam servir de resistência.\n\nEle sonha com a existência de uma organização secreta que combata o regime e passa a procurar quem possa levá-lo a ela. A esperança o anima, mas também o coloca em risco a cada passo.\n\nO livro mostra como o poder absoluto depende de controlar o que as pessoas acreditam. Por isso, a pergunta que fica é quanto de verdade resiste quando todos à volta repetem a mesma mentira.' }
	],

	/* ---------- 33: Os Três Mosqueteiros ---------- */
	33: [
		{ titulo: 'Rumo a Paris', texto: 'D\'Artagnan é um jovem gascão de dezoito anos, de sangue quente e coragem de sobra. Seu pai o manda para Paris com um cavalo magro, pouco dinheiro e uma carta de recomendação para entrar na companhia dos mosqueteiros do rei.\n\nNo caminho, ele se envolve numa briga com um desconhecido de aspecto arrogante e acaba ferido, perdendo a carta. A partir desse momento, ele passa a procurar o homem para acertar contas.\n\nSem a carta, d\'Artagnan chega à capital com sonhos grandes e poucas portas abertas. Mas, antes de o dia acabar, ele já terá se comprometido em três duelos marcados para a mesma hora.' },
		{ titulo: 'Um por todos', texto: 'Os três adversários dos duelos são, justamente, Athos, Porthos e Aramis, os mosqueteiros mais famosos de Paris. Quando os guardas do cardeal Richelieu surgem para prender os mosqueteiros, d\'Artagnan toma partido sem pensar e luta ao lado deles.\n\nDa luta nasce uma amizade. Os quatro passam a andar juntos, divididos entre festas, dívidas e confusões, mas unidos por uma lealdade que se resume numa frase famosa: um por todos, todos por um.\n\nEnquanto isso, nos bastidores da corte, o cardeal e o rei disputam influência, e os mosqueteiros, fiéis ao rei, tornam-se alvos de armações e perseguições.' },
		{ titulo: 'Os diamantes da rainha', texto: 'Um segredo delicado coloca a reputação da rainha em perigo. Ela deu de presente a um admirador um colar de diamantes que pertence ao rei, e o monarca decide que a joia deve aparecer num baile que se aproxima.\n\nD\'Artagnan recebe a missão de atravessar o mar, buscar o colar e voltar a tempo da festa. Os amigos o acompanham, mas o caminho está cheio de armadilhas armadas pelos inimigos.\n\nA aventura reúne perseguições, emboscadas e uma corrida contra o relógio, e mostra o que cada um dos quatro está disposto a sacrificar pela honra e pela amizade.' }
	],

	/* ---------- 36: O Diário de Anne Frank ---------- */
	36: [
		{ titulo: 'Um presente de aniversário', texto: 'No dia em que completa treze anos, Anne Frank ganha um diário. Ela é uma menina alegre, curiosa e falante, que vive em Amsterdã e gosta de escola, de amigas e de passeios.\n\nEla decide tratar o caderno como uma amiga de confiança, a quem pode contar tudo o que não diz em voz alta. Nas primeiras páginas, escreve sobre a família, os colegas e as pequenas alegrias do cotidiano.\n\nMas a vida em volta está mudando. A guerra chegou à Holanda, e as regras impostas aos judeus ficam mais rígidas a cada mês, afastando Anne de lugares e pessoas que ela amava.' },
		{ titulo: 'O Anexo Secreto', texto: 'Quando a situação se torna perigosa demais, a família Frank decide se esconder num anexo secreto, escondido atrás de uma estante, num prédio onde o pai de Anne trabalhava. Outras pessoas se juntam a eles, e todos passam a dividir um espaço pequeno.\n\nA rotina exige silêncio durante o dia, cuidado com cada barulho e muita paciência. Os moradores contam com a ajuda de amigos corajosos, que trazem alimentos e notícias do mundo exterior.\n\nA convivência forçada traz atritos, risos, medos e momentos de ternura. No diário, Anne descreve tudo com humor e sinceridade, mostrando o que sente em relação a cada pessoa.' },
		{ titulo: 'Dias de espera', texto: 'Com o passar do tempo, Anne vai crescendo entre as paredes do esconderijo. Ela escreve sobre os sonhos de se tornar escritora, as dúvidas sobre si mesma e a saudade da liberdade de andar pela rua.\n\nO mundo lá fora continua em guerra, e as notícias do rádio alternam esperança e preocupação. Dentro do anexo, cada pequena alegria, como um aniversário ou um livro novo, ganha um valor enorme.\n\nAs páginas do diário se tornam um retrato íntimo de uma adolescente que, mesmo em circunstâncias difíceis, continua acreditando na bondade das pessoas e no valor de sonhar.' }
	],

	/* ---------- 37: O Pequeno Príncipe ---------- */
	37: [
		{ titulo: 'Um desenho e um pedido', texto: 'O narrador conta que, quando era criança, desenhou uma figura que os adultos entenderam como um chapéu, mas que era uma jiboia que engoliu um elefante. Desde então, aprendeu que os adultos precisam de explicações para tudo.\n\nJá adulto, tornou-se piloto e, certo dia, seu avião quebra no meio do deserto do Saara, longe de qualquer socorro. Na primeira noite, adormece sobre a areia.\n\nAo amanhecer, uma voz fina o acorda. É um menino de cabelos dourados, que faz um pedido inesperado: que o piloto desenhe um carneiro para ele.' },
		{ titulo: 'O pequeno asteroide', texto: 'Aos poucos, o piloto descobre que o menino vem de um planeta minúsculo, pouco maior que uma casa. Lá, ele cuidava de três vulcões e arrancava, todos os dias, as sementes de baobás antes que crescessem demais.\n\nNesse planeta havia também uma rosa vaidosa e delicada, que ele regava e protegia com muito carinho. Mas as exigências e as palavras confusas da flor o deixaram inseguro, e ele decidiu partir.\n\nSó depois de se afastar o pequeno príncipe começa a entender o quanto sentia falta da rosa, e o quanto o tempo dedicado a ela era o que a tornava especial.' },
		{ titulo: 'Planetas e adultos estranhos', texto: 'Em sua viagem, o menino visita vários asteroides e conhece personagens curiosos: um rei que só dá ordens razoáveis, um vaidoso que só quer aplausos e um homem de negócios que passa os dias contando estrelas.\n\nCada encontro deixa no pequeno príncipe a mesma impressão de que os adultos são muito esquisitos e se preocupam com coisas que não têm importância de verdade.\n\nA jornada o leva até a Terra, onde ele aprende, com uma raposa, o significado de criar laços com alguém. A lição muda a forma como ele vê a rosa que deixou e o que realmente importa na vida.' }
	],

	/* ---------- 40: Harry Potter e a Pedra Filosofal ---------- */
	40: [
		{ titulo: 'Uma vida debaixo da escada', texto: 'Harry Potter é um menino de onze anos que mora com os tios e o primo, que o tratam com frieza. Seu quarto é um armário embaixo da escada, e coisas estranhas acontecem perto dele sem que ele saiba explicar.\n\nO que Harry não sabe é que seus pais faziam parte de um mundo secreto, o dos bruxos, e que ele é famoso nesse mundo por motivos que ele ainda desconhece.\n\nAs semanas que antecedem seu aniversário se enchem de cartas misteriosas que chegam por todos os cantos da casa, e o tio faz de tudo para impedir que o menino as leia.' },
		{ titulo: 'A carta que mudou tudo', texto: 'No dia do aniversário, um gigante gentil chamado Hagrid aparece e entrega a Harry a carta que ele tanto procurava. Ela o convida para estudar na Escola de Magia e Bruxaria de Hogwarts.\n\nHarry descobre a verdade sobre seus pais e sobre a razão de ser tão conhecido. Em seguida, visita um beco mágico escondido no meio de Londres, onde compra uma varinha, uma coruja e todo o material para o novo ano.\n\nNa estação de trem, encontra a plataforma secreta de onde parte o expresso para Hogwarts. Lá, conhece Ron Weasley, que se torna seu primeiro grande amigo.' },
		{ titulo: 'Hogwarts e o mistério da pedra', texto: 'Em Hogwarts, Harry é selecionado para uma das casas da escola, faz novos amigos, aprende feitiços e descobre que tem talento para voar numa vassoura. Ao lado de Ron e de Hermione, uma colega muito estudiosa, ele logo se vê no meio de aventuras.\n\nUm dia, os três descobrem que um objeto muito valioso está escondido no castelo, protegido por criaturas e armadilhas. Eles suspeitam que alguém dentro da escola esteja tentando roubá-lo.\n\nDecididos a descobrir a verdade, os amigos desafiam as regras e enfrentam obstáculos que testam a inteligência, a amizade e a coragem de cada um.' }
	],

	/* ---------- 21: Jogos Vorazes ---------- */
	21: [
		{ titulo: 'O dia da colheita', texto: 'Katniss Everdeen vive no Distrito 12, uma região pobre da nação de Panem, onde a fome é parte da rotina. Para sustentar a mãe e a irmã mais nova, Prim, ela caça escondida na floresta, atividade proibida pelas regras do governo.\n\nTodo ano acontece a colheita, um sorteio cruel em que cada distrito precisa entregar um menino e uma menina para participar dos Jogos Vorazes, um espetáculo televisionado em que os jovens lutam até restar apenas um.\n\nQuando o nome de Prim é sorteado, Katniss não pensa duas vezes e se oferece no lugar da irmã. Naquele momento, ela sabe que sua vida nunca mais será a mesma.' },
		{ titulo: 'A viagem à Capital', texto: 'Junto com o garoto escolhido, Peeta, Katniss viaja para a Capital, uma cidade luxuosa e distante da realidade dos distritos. Lá, os dois recebem treinamento e conselhos de um mentor que já passou pelos Jogos.\n\nOs competidores desfilam diante da multidão e são avaliados pelo público e pelos patrocinadores, que podem fazer diferença na sobrevivência de cada um. Katniss aprende que, além de força, precisa saber conquistar a simpatia de quem assiste.\n\nEntre treinos e entrevistas, ela e Peeta formam uma aliança incerta, e Katniss não sabe até que ponto pode confiar nele.' },
		{ titulo: 'A arena', texto: 'Chega o momento em que os competidores são levados para a arena, um território enorme cheio de perigos naturais e armadilhas criadas pelos organizadores. Tudo é filmado e transmitido ao vivo.\n\nNo início, a disputa é caótica e muitos não resistem aos primeiros dias. Katniss usa o que aprendeu na floresta para encontrar água, se esconder e se proteger.\n\nCom o avançar dos dias, ela percebe que o jogo não é só físico. Cada decisão pode cair bem ou mal diante das câmeras, e a cada passo ela se pergunta até onde está disposta a ir para voltar para casa.' }
	],

	/* ---------- 35: A Culpa é das Estrelas ---------- */
	35: [
		{ titulo: 'Um grupo de apoio', texto: 'Hazel Grace tem dezesseis anos e convive com um câncer há bastante tempo. Ela leva consigo um tubo de oxigênio para todo lado e faz questão de não ter ilusões sobre a própria situação.\n\nPara agradar a mãe, que se preocupa com sua tristeza, Hazel aceita frequentar um grupo de apoio para jovens em tratamento. As reuniões são cansativas e um pouco constrangedoras, e ela vai sem muita vontade.\n\nNuma dessas tardes, algo diferente acontece: um garoto desconhecido a observa do outro lado da sala, com um sorriso confiante que a deixa sem saber como reagir.' },
		{ titulo: 'Augustus Waters', texto: 'O garoto se chama Augustus Waters, e é divertido, simpático e cheio de opiniões. Ele conversa com Hazel como se a conhecesse há muito tempo e logo mostra interesse em saber do que ela gosta.\n\nHazel fala do livro que ama e que já leu várias vezes. Augustus decide ler também, e os dois passam a trocar mensagens, empréstimos e longas conversas sobre o que a história significa para cada um.\n\nA amizade rapidamente vira algo maior, e Hazel, que se protegia de criar vínculos, se vê tentada a viver o que sentia ser impossível.' },
		{ titulo: 'Um livro e uma viagem', texto: 'O livro que une os dois termina de forma abrupta, deixando muitas perguntas sem resposta. Hazel sonha em conhecer o autor para entender o que acontece com os personagens depois da última página.\n\nAugustus se empenha em realizar esse desejo, e os dois acabam planejando uma viagem cheia de expectativas, na qual esperam finalmente encontrar respostas.\n\nA jornada traz momentos de alegria, ansiedade e descobertas sobre si mesmos. Entre humor e emoção, a história fala de amor, de perdas e do que significa deixar uma marca no mundo.' }
	],

	/* ---------- 73: Duna ---------- */
	73: [
		{ titulo: 'Rumo a Arrakis', texto: 'Num futuro distante, a humanidade se espalhou por muitos planetas, governados por casas nobres que disputam poder sob a autoridade de um imperador. Paul Atreides é o jovem herdeiro de uma dessas casas, criado para liderar, mas ainda inseguro do que o espera.\n\nSua família recebe uma ordem inesperada: assumir o controle de Arrakis, um planeta desértico e hostil. Apesar da aparência de lugar sem valor, é o único ponto do universo onde se encontra a especiaria, uma substância preciosa que permite viagens espaciais e prolonga a vida.\n\nPaul se prepara para a mudança ao lado dos pais, de mestres que o treinaram e de uma educação que mistura combate, estratégia e disciplina mental. Ele sente que algo maior o aguarda.' },
		{ titulo: 'O planeta das areias', texto: 'Arrakis é um mundo de calor extremo, tempestades e criaturas gigantes que vivem sob a areia. A água é tão rara que cada gota importa, e os moradores desenvolveram costumes e tecnologias próprios para sobreviver.\n\nA chegada dos Atreides é recebida com desconfiança. Os antigos governantes tinham interesses fortes na especiaria, e a mudança de comando gera tensões que se espalham pelos corredores do poder.\n\nPaul começa a ter sonhos estranhos e a perceber habilidades que não entende bem. Ele sente que o planeta o chama, e que há razões profundas para essa conexão.' },
		{ titulo: 'Os povos do deserto', texto: 'Nas regiões mais afastadas vivem os fremen, um povo que aprendeu a viver no deserto com muita disciplina e respeito por cada gota de água. Poucos forasteiros conhecem seus costumes.\n\nQuando uma disputa política muda de rumo e coloca a vida de sua família em perigo, Paul precisa recorrer a esse povo para sobreviver. A aproximação exige humildade e a disposição de aprender com quem conhece o deserto.\n\nEntre alianças e desconfianças, ele descobre que seu destino tem a ver com muito mais do que o poder de uma casa nobre. A história se torna uma reflexão sobre liderança, religião e responsabilidade.' }
	]

};

// COMPLEMENTOS AUTOMÁTICOS
LIVROS.forEach(function (livro) {
	livro.categoria = livro.generos[0];                       // categoria principal
	livro.premium = IDS_PREMIUM.includes(livro.id);           // true ou false
	livro.sinopse = SINOPSES[livro.id] || 'A sinopse deste livro estará disponível em breve.';
	if (!livro.capitulos) {                                   // capítulos escritos à mão ou, se não houver, os de exemplo
		livro.capitulos = CAPITULOS[livro.id] || exemplo(livro.titulo);
	}
});

// BUSCA UM LIVRO PELO ID (devolve null se não existir)
function buscarLivro(id) {
	return LIVROS.find(function (livro) { return livro.id === Number(id); }) || null;
}
