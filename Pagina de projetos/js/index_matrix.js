// Configuração do Canvas Matrix
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

// Ajustar tamanho do canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Caracteres para o efeito Matrix (incluindo caracteres especiais, números e letras)
const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?~`!';
const katakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?~`';

const alphabet = matrixChars + katakana + latin + nums + symbols;

const fontSize = 14;
const columns = canvas.width / fontSize;

// Array para armazenar as gotas
const drops = [];

// Inicializar as gotas
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

// Cores roxas para o efeito Matrix
const purpleColors = [
    '#9333ea',  // Roxo principal
    '#7c3aed',  // Roxo escuro
    '#c084fc',  // Roxo claro
    '#e879f9',  // Rosa roxo
    '#a855f7',  // Roxo médio
    '#8b5cf6',  // Roxo suave
    '#d946ef'   // Magenta roxo
];

// Função para desenhar o Matrix
function drawMatrix() {
    // Criar efeito de fade com transparência
    ctx.fillStyle = 'rgba(10, 10, 10, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = fontSize + 'px monospace';
    
    // Desenhar cada gota
    for (let i = 0; i < drops.length; i++) {
        // Escolher caractere aleatório
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        
        // Escolher cor roxa aleatória com intensidade variável
        const colorIndex = Math.floor(Math.random() * purpleColors.length);
        const opacity = Math.random() * 0.8 + 0.2; // Opacidade entre 0.2 e 1
        
        // Aplicar cor com opacidade
        ctx.fillStyle = purpleColors[colorIndex];
        
        // Adicionar brilho para algumas letras
        if (Math.random() > 0.98) {
            ctx.shadowColor = purpleColors[colorIndex];
            ctx.shadowBlur = 10;
        } else {
            ctx.shadowBlur = 0;
        }
        
        // Desenhar o caractere
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Resetar a gota se ela passou da tela ou aleatoriamente
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        
        // Mover a gota para baixo
        drops[i]++;
    }
}

// Função para adicionar efeitos especiais
function addSpecialEffects() {
    // Adicionar algumas linhas mais brilhantes ocasionalmente
    if (Math.random() > 0.99) {
        const x = Math.floor(Math.random() * columns);
        const y = Math.floor(Math.random() * (canvas.height / fontSize));
        
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#9333ea';
        ctx.shadowBlur = 20;
        
        const specialChar = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(specialChar, x * fontSize, y * fontSize);
        
        ctx.shadowBlur = 0;
    }
}

// Função principal de animação
function animate() {
    drawMatrix();
    addSpecialEffects();
    requestAnimationFrame(animate);
}

// Iniciar a animação
animate();

// Adicionar interatividade aos botões principais
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        // Efeito de clique
        this.style.transform = 'translateY(-2px) scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'translateY(-2px) scale(1)';
        }, 150);
        
        // Adicionar efeito especial no Matrix
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const x = Math.floor(Math.random() * columns);
                const y = Math.floor(Math.random() * (canvas.height / fontSize));
                
                ctx.fillStyle = '#ffffff';
                ctx.shadowColor = '#9333ea';
                ctx.shadowBlur = 15;
                
                const char = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                ctx.fillText(char, x * fontSize, y * fontSize);
                
                ctx.shadowBlur = 0;
            }, i * 50);
        }
    });
});

// Otimização para dispositivos móveis
if (window.innerWidth < 768) {
    // Reduzir densidade em dispositivos móveis para melhor performance
    const mobileColumns = Math.floor(columns * 0.7);
    drops.length = mobileColumns;
    
    for (let x = 0; x < mobileColumns; x++) {
        if (drops[x] === undefined) {
            drops[x] = 1;
        }
    }
}

// Pausar animação quando a aba não está visível (otimização)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pausar seria implementado aqui se necessário
    }
});

console.log('Matrix effect initialized with purple theme! 🟣');