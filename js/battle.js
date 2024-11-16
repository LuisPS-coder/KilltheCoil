const player = new Player();

function updateBattleUI() {
    document.getElementById("playerHealth").textContent = player.health;
    document.getElementById("playerEnergy").textContent = player.energy;

    if (typeof enemy !== "undefined") {
        document.getElementById("enemyHealth").textContent = enemy.health;
        document.getElementById("nextEnemyAction").textContent = 
            enemy.actions[enemy.currentTurn]?.type || "Desconocido";
    } else {
    }

    document.getElementById("deckCount").textContent = player.deck.length;
    document.getElementById("graveyardCount").textContent = player.graveyard.length;
}


function playerTurn() {
    player.resetEnergy();
    for (let i = 0; i < 2; i++) {
        player.drawCard(); 
    }
    updateHandUI(); 
    updateBattleUI(); 
}

function enemyTurn() {
    const action = enemy.performAction();
    if (action.type === 'attack') {
        const playerIsDefeated = player.takeDamage(action.value);
        if (playerIsDefeated) {
            endBattle("defeat");
            return;
        }
    }

    updateBattleUI();
    checkBattleStatus();

    setTimeout(() => {
        playerTurn();
    }, 1000);
}

function checkBattleStatus() {
    if (enemy.health <= 0) {
        endBattle("victory");
    }
}

function endBattle(result) {
    if (result === "victory") {
        showScreen("rewardsScreen"); 
        
    } else if (result === "defeat") {
        showScreen("gameOverScreen");
    }
}

window.endTurn = function () {
    player.endTurn();
    enemyTurn();
};

function updateHandUI() {
    const handContainer = document.getElementById('playerHand');
    handContainer.innerHTML = ''; 

    player.hand.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';

        cardElement.innerHTML = `
            <div class="card-name">${card.name}</div>
            <div class="card-cost">Cost: ${card.cost}</div>
            <div class="card-description">${card.description}</div>
        `;

        cardElement.onclick = () => {
            playCard(card);
        };

        handContainer.appendChild(cardElement);
    });
}


function playCard(card) {
    if (!player.useEnergy(card.cost)) {
        return;
    }

    card.effect(enemy); 

    player.hand = player.hand.filter(c => c !== card);
    player.graveyard.push(card);

    updateHandUI();
    updateBattleUI();

    checkBattleStatus();
}
