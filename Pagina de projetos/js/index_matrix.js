// Configuração do Canvas Matrix
const canvas = document.getElementById("matrix-canvas");
const ctx = canvas.getContext("2d");

// Ajustar tamanho do canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Caracteres para o efeito Matrix
const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?~`!";
const katakana = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const nums = "0123456789";
const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?~`";

const alphabet = matrixChars + katakana + latin + nums + symbols;

const fontSize = 14;
let columns = Math.floor(canvas.width / fontSize);

// Array para armazenar as gotas
const drops = [];

// Inicializar as gotas
function initializeDrops() {
    columns = Math.floor(canvas.width / fontSize);
    drops.length = columns;
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
}

initializeDrops();
window.addEventListener("resize", initializeDrops);

// Cores roxas para o efeito Matrix
const purpleColors = [
    "#9333ea",
    "#7c3aed",
    "#c084fc",
    "#e879f9",
    "#a855f7",
    "#8b5cf6",
    "#d946ef"
];

// Define a velocidade da animação em milissegundos.
// Um valor maior torna a animação mais lenta.
const animationSpeed = 30; // Altere este valor para controlar a velocidade.

// Função para desenhar o Matrix
function drawMatrix() {
    // Criar efeito de fade com transparência
    ctx.fillStyle = "rgba(10, 10, 10, 0.04)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + "px monospace";

    // Desenhar cada gota
    for (let i = 0; i < drops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillStyle = purpleColors[Math.floor(Math.random() * purpleColors.length)];

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Mover a gota para baixo e resetar
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        } else {
            drops[i]++;
        }
    }
}

// Função principal de animação
function animate() {
    drawMatrix();
    // Usa setTimeout para controlar a velocidade da animação
    setTimeout(animate, animationSpeed);
}

// Iniciar a animação
animate();

// Otimização para dispositivos móveis
if (window.innerWidth < 768) {
    const mobileColumns = Math.floor(columns * 0.7);
    drops.length = mobileColumns;
    for (let x = 0; x < mobileColumns; x++) {
        if (drops[x] === undefined) {
            drops[x] = 1;
        }
    }
}

console.log("Matrix effect initialized with purple theme! 🟣");