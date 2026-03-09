class Card {
    element;
    front;
    back;
    imagePath;
    isFlipped = false;
    isMatched = false;
    constructor(imagePath) {
        this.imagePath = imagePath;
        this.element = document.createElement("div");
        this.element.classList.add("card");
        this.front = document.createElement("div");
        this.front.classList.add("front");
        this.front.style.backgroundImage = `url(${this.imagePath})`;
        this.back = document.createElement("div");
        this.back.classList.add("background");
        this.back.style.backgroundImage = `url(assets/images/background.jpg)`;
        this.element.appendChild(this.front);
        this.element.appendChild(this.back);
    }
    flip() {
        if (!this.isMatched) {
            this.isFlipped = true;
            this.element.classList.add("flipped");
        }
    }
    hide() {
        if (!this.isMatched) {
            this.isFlipped = false;
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
    lockBoard = false;
    // Imagens das cartas
    images = [
        "assets/images/desenvolvimento.png",
        "assets/images/design.png",
        "assets/images/redes.png",
        "assets/images/seguranca.png",
        "assets/images/dados.png",
        "assets/images/php.png",
        "assets/images/php.png",
        "assets/images/php.png"
    ];
    constructor(boardId) {
        this.board = document.getElementById(boardId);
        this.startGame();
    }
    startGame() {
        this.board.innerHTML = "";
        this.cards = [];
        this.firstCard = null;
        this.secondCard = null;
        this.lockBoard = false;
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
        if (this.lockBoard)
            return;
        if (card.isFlipped)
            return;
        if (card.isMatched)
            return;
        card.flip();
        if (!this.firstCard) {
            this.firstCard = card;
            return;
        }
        this.secondCard = card;
        this.checkMatch();
    }
    checkMatch() {
        if (!this.firstCard || !this.secondCard)
            return;
        if (this.firstCard.imagePath === this.secondCard.imagePath) {
            this.firstCard.match();
            this.secondCard.match();
            this.resetTurn();
        }
        else {
            this.lockBoard = true;
            setTimeout(() => {
                this.firstCard?.hide();
                this.secondCard?.hide();
                this.resetTurn();
            }, 1000);
        }
    }
    resetTurn() {
        this.firstCard = null;
        this.secondCard = null;
        this.lockBoard = false;
    }
}
new MemoryGame("gameBoard");
export {};
//# sourceMappingURL=index.js.map