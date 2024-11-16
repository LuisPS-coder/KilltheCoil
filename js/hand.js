class Hand {
    constructor(player) {
        this.player = player;
        this.cardsInHand = [];
        this.handContainer = document.getElementById('playerHand');
    }

    addCard(card) {
        if (this.cardsInHand.length < 5) {
            this.cardsInHand.push(card);
            this.renderHand();
        }
    }

    renderHand() {
        this.handContainer.innerHTML = '';

        this.cardsInHand.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.innerText = `${card.name}\nCost: ${card.cost}`;

            cardElement.onclick = () => {
                if (this.player.useEnergy(card.cost)) {
                    this.playCard(card, index);
                }
            };

            this.handContainer.appendChild(cardElement);
        });
    }

    playCard(card, index) {
        this.cardsInHand.splice(index, 1);
        this.player.quitarCarta(card);
        this.renderHand();
    }
}
