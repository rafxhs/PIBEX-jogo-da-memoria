class Card {
    element;
    imagePath;
    isFlipped = false;
    isMatched = false;
    constructor(imagePath) {
        this.imagePath = imagePath;
        this.element = document.createElement("div");
        this.element.classList.add("card");
    }
    flip() {
        if (!this.isMatched) {
            this.isFlipped = true;
            this.element.innerHTML = `<img src="${this.imagePath}" alt="card">`;
            this.element.classList.add("flipped");
        }
    }
    hide() {
        if (!this.isMatched) {
            this.isFlipped = false;
            this.element.innerHTML = "";
            this.element.classList.remove("flipped");
        }
    }
    match() {
        this.isMatched = true;
    }
}
class MemoryGame {
    board;
    cards = [];
    firstCard = null;
    secondCard = null;
    // Imagens das cartas
    images = [
        "assets/images/html.png",
        "assets/images/javascript.png",
        "assets/images/redes.png",
        "assets/images/seguranca.png",
        "assets/images/cloud.png",
        "assets/images/php.png"
    ];
    constructor(boardId) {
        this.board = document.getElementById(boardId);
        this.startGame();
    }
    startGame() {
        const duplicated = [...this.images, ...this.images];
        const shuffled = duplicated.sort(() => Math.random() - 0.5);
        shuffled.forEach(path => {
            const card = new Card(path);
            card.element.addEventListener("click", () => this.handleClick(card));
            this.cards.push(card);
            this.board.appendChild(card.element);
        });
    }
    handleClick(card) {
        if (card.isFlipped || this.secondCard)
            return;
        card.flip();
        if (!this.firstCard) {
            this.firstCard = card;
        }
        else {
            this.secondCard = card;
            this.checkMatch();
        }
    }
    checkMatch() {
        if (!this.firstCard || !this.secondCard)
            return;
        if (this.firstCard.imagePath === this.secondCard.imagePath) {
            this.firstCard.match();
            this.secondCard.match();
        }
        else {
            setTimeout(() => {
                this.firstCard?.hide();
                this.secondCard?.hide();
            }, 1000);
        }
        this.firstCard = null;
        this.secondCard = null;
    }
}
new MemoryGame("gameBoard");
export {};
//# sourceMappingURL=index.js.map