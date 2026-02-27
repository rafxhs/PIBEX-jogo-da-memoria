class Card {
    public element: HTMLDivElement;
    private front: HTMLDivElement;
    private back: HTMLDivElement;
    public imagePath: string;
    public isFlipped: boolean = false;
    public isMatched: boolean = false;

    constructor(imagePath: string) {
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
    private board: HTMLElement;
    private cards: Card[] = [];
    private firstCard: Card | null = null;
    private secondCard: Card | null = null;
    private lockBoard: boolean = false;

    // Imagens das cartas
    private images: string[] = [
        "assets/images/desenvolvimento.png",
        "assets/images/design.png",
        "assets/images/redes.png",
        "assets/images/seguranca.png",
        "assets/images/dados.png",
        "assets/images/php.png",
        "assets/images/php.png",
        "assets/images/php.png"
    ];

    constructor(boardId: string) {
        this.board = document.getElementById(boardId)!;
        this.startGame();
    }

    private startGame() {
        this.board.innerHTML = "";
        this.cards = [];
        this.firstCard = null;
        this.secondCard = null;
        this.lockBoard = false;

        const duplicated = [...this.images, ...this.images];
        const shuffled = duplicated.sort(() => Math.random() - 0.5);

        shuffled.forEach(path => {
            const card = new Card(path);

            card.element.addEventListener("click", () =>
                this.handleClick(card)
            );

            this.cards.push(card);
            this.board.appendChild(card.element);
        });
    }

    private handleClick(card: Card): void {
        if (this.lockBoard) return;
        if (card.isFlipped) return;
        if (card.isMatched) return;

        card.flip();

        if (!this.firstCard) {
            this.firstCard = card;
            return;
        }

        this.secondCard = card;
        this.checkMatch();
    }

    private checkMatch(): void {
        if (!this.firstCard || !this.secondCard) return;

        if (this.firstCard.imagePath === this.secondCard.imagePath) {
            this.firstCard.match();
            this.secondCard.match();
            this.resetTurn();
        } else {
            this.lockBoard = true;

            setTimeout(() => {
                this.firstCard?.hide();
                this.secondCard?.hide();
                this.resetTurn();
            }, 1000);
        }
    }

    private resetTurn(): void {
        this.firstCard = null;
        this.secondCard = null;
        this.lockBoard = false;
    }
}

new MemoryGame("gameBoard");