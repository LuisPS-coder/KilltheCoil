class Card {
    constructor(name, cost, description, image, effect) {
        this.name = name;
        this.cost = cost;
        this.description = description;
        this.image = image;
        this.effect = effect;
    }

    use(target) {
        this.effect(target);
    }
}

