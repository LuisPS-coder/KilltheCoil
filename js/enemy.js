class Enemy {
    constructor(name, maxHealth, actions) {
        this.name = name;
        this.health = maxHealth;
        this.maxHealth = maxHealth;
        this.actions = actions;
        this.currentTurn = 0;
    }

    takeDamage(damage) {
        this.health -= damage;
        if (this.health < 0) this.health = 0;
    }

    performAction() {
        const action = this.actions[this.currentTurn];
        this.currentTurn = (this.currentTurn + 1) % this.actions.length;
        return action;
    }

    isDefeated() {
        return this.health <= 0;
    }
}

