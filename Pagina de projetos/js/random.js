// Lista de frases para o título principal
const frases = [
    "Criar é transformar ideias em realidade.",
    "O impossível é só uma opinião.",
    "Cada linha de código conta uma história.",
    "Persistência hoje, sucesso amanhã.",
    "A curiosidade move o mundo.",
    "Erre rápido, aprenda mais rápido.",
    "O caos é o playground da criatividade.",
    "Se não testar, nunca vai saber.",
    "Menos perfeição, mais progresso.",
    "Transformo café em código e ideias em projetos.",
    "O desafio é o combustível do crescimento.",
    "Pequenos passos geram grandes conquistas.",
    "A inovação nasce da ousadia.",
    "Faça com paixão ou nem comece.",
    "O futuro pertence aos que criam hoje.",
    "O Guinas é vadio"
];

// Encontre o elemento do título usando o ID
const titulo = document.getElementById("hero-title");

// Selecione uma frase aleatória da lista
const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];

// Altere o texto do título
titulo.textContent = fraseAleatoria;