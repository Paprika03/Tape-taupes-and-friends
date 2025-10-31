// ==========================================================
// 1. CONFIGURATION DES AMIS
// ==========================================================
const friendImages = [
    'images/onyankopon.jpg',
    'images/claire.jpg',
    'images/mael.jpeg',
    'images/corentin.jpg',
    'images/benshrek.png',
    'images/lyxday.jpg',
    'images/nathanchad.jpg',
    'images/arabe.jpg',
    "images/pervers.jpg",
    "images/frontnational.jpg",
    "images/hentaimaincharacter.jpg",
    "images/jenesaispasquic.jpg",
    "images/jepeuxtouchertescheveux.jpg",
    "images/kikiculotte.jpg",
    "images/kikiburger.jpg",
    "images/kpopeur.jpg",
    "images/mathieuxhugo.jpg",
    "images/noir.jpg",
    "images/powerxreze.jpg",
    "images/smile.jpg"    
];

// ==========================================================
// 1.5. PHRASES DE FIN DE PARTIE
// ==========================================================
const endPhrases = [
    "c'est pété du cul",
    "elle est où la grosse moula?",
    "tu as gagné un câlin du soir",
    "tu préfères Liaro ou mettre une Olive à Magalie?",
    "Hey mais cl'est vous Onyankopon?"
];

// ==========================================================
// 2. LOGIQUE DU JEU (Pas besoin de toucher)
// ==========================================================
const holes = document.querySelectorAll('.hole');
const scoreBoard = document.getElementById('score');
const timeLeftBoard = document.getElementById('time-left');
const startButton = document.getElementById('start-button');

let score = 0;
let timeLeft = 30;
let gameTimerId = null;
let moleTimerId = null;
let lastHole;

// Fonction pour faire sortir un ami aléatoire
function popUp() {
    // 1. Choisir un trou aléatoire
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];
    
    // Empêche le même trou d'affilée
    if (hole === lastHole) {
        return popUp();
    }
    lastHole = hole;

    // 2. Choisir une image d'ami aléatoire
    const friendImgSrc = friendImages[Math.floor(Math.random() * friendImages.length)];
    
    // 3. Créer l'élément image
    const moleImg = document.createElement('img');
    moleImg.classList.add('mole');
    moleImg.src = friendImgSrc;
    moleImg.addEventListener('click', bonk); // Ajoute le clic
    
    hole.appendChild(moleImg);

    // 4. Le fait "sortir"
    setTimeout(() => {
        moleImg.classList.add('up');
    }, 100); // Délai avant de sortir

    // 5. Le fait "rentrer" après un moment
    setTimeout(() => {
        moleImg.classList.remove('up');
        // Nettoie l'image du trou après l'animation
        setTimeout(() => {
            // Vérifie si l'image existe toujours avant de la supprimer
            if (hole.contains(moleImg)) {
                hole.removeChild(moleImg);
            }
        }, 300);
    }, 1000); // Reste visible 1 seconde
}

// Fonction appelée quand on clique sur un ami
function bonk(e) {
    if (!e.isTrusted) return; // Empêche les faux clics
    score++;
    scoreBoard.textContent = score;
    
    // Fait disparaître l'image cliquée
    const img = this;
    img.classList.remove('up');
    img.removeEventListener('click', bonk); // Empêche de marquer 2x
}

// Fonction pour démarrer le jeu
function startGame() {
    score = 0;
    timeLeft = 30;
    scoreBoard.textContent = score;
    timeLeftBoard.textContent = timeLeft;
    startButton.disabled = true;

    // Fait sortir les taupes
    moleTimerId = setInterval(popUp, 800); // Fait sortir une nouvelle taupe toutes les 0.8s

    // Minuteur du jeu
    gameTimerId = setInterval(() => {
        timeLeft--;
        timeLeftBoard.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(gameTimerId);
            clearInterval(moleTimerId);
            
            // --- C'EST LA PARTIE QUE J'AI MODIFIÉE ---
            // 1. Choisir une phrase au hasard
            const randomIndex = Math.floor(Math.random() * endPhrases.length);
            const randomPhrase = endPhrases[randomIndex];
            
            // 2. Afficher la nouvelle alerte
            alert(`Jeu terminé ! Votre score est de ${score}\n\n${randomPhrase}`);
            // --- FIN DE LA MODIFICATION ---

            startButton.disabled = false;
        }
    }, 1000);
}


startButton.addEventListener('click', startGame);
