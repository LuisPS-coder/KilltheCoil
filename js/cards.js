const allCards = {
    golpe: new Card(
        'Golpe de novato',
        1,
        'Haz 5 puntos de daño.',
        null,
        (target) => {
            target.takeDamage(5);
        }
    ),
    cura: new Card(
        'Curación básica',
        1,
        'Recupera 3 puntos de vida.',
        null,
        (target) => {
            player.health += 3);
        }
    ),
    garrote: new Card(
        'GARROTE',
        2,
        'Haz 12 puntos de daño',
        null,
        (target) => {
            target.takeDamage(12);
        }
    ),
    mochila: new Card(
        '¿Que hay en la mochila?',
        1,
        'Roba 2 cartas',
        null,
        (target) => {
            for (let i = 0; i < 2; i++) {
                player.drawCard(); 
            }
        }
    ),
    comida: new Card(
        'Carne cruda',
        0,
        'Recupera 2 puntos de energia',
        null,
        (target) => {
            player.energy += 2;
        }
    )
}

