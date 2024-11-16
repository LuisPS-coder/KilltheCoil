class Player {
    constructor() {
        this.health = 50;
        this.energy = 3;
        this.deck = [];
        this.graveyard = [];
        this.hand = [];
        this.maxEnergy = 3;
        this.gold = 5;
        this.mazoInicial();
        this.shuffleDeck();
    }

    mazoInicial() {
        this.deck = [];
        for (let i = 0; i < 4; i++) {
            this.añadirCarta({ ...allCards.golpe });
            this.añadirCarta({ ...allCards.cura });
        }
    }

    añadirCarta(card) {
        this.deck.push(card);
    }

    quitarCarta(card) {
        const index = this.deck.indexOf(card);
        if (index > -1) {
            this.deck.splice(index, 1);
        } 
    }

    añadirOro() {
        this.gold += 5;
    }

    resetMazo() {
        if (this.graveyard.length > 0) {
            this.deck = [...this.graveyard];
            this.graveyard = [];
            this.shuffleDeck();
        }
    }
    
    shuffleDeck() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }

    drawCard() {
        if (this.deck.length === 0) {
            this.resetMazo();
        }
        if (this.deck.length > 0) {
            const card = this.deck.pop();
            this.hand.push(card);
            return card;
        } else {
            return null;
        }
    }

    resetEnergy() {
        this.energy = this.maxEnergy;
    }

    useEnergy(cost) {
        if (this.energy >= cost) {
            this.energy -= cost;
            return true;
        } else {
            return false;
        }
    }

    takeDamage(damage) {
        this.health -= damage;
        if (this.health <= 0) {
            this.health = 0;
            return true;
        }
        return false;
    }

    reiniciarCombate() {
        this.deck = [...this.deck, ...this.hand, ...this.graveyard];
        this.hand = [];
        this.graveyard = [];
        this.shuffleDeck();
        this.resetEnergy();
    }
    
    endTurn() {
        this.energy = 0;
    }
}