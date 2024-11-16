function startGame() {
    hideAllScreens();
    showScreen('theRoad');
    setupNodes(); 
}

function startCombat() {
    player.reiniciarCombate();

    enemy = new Enemy("Goblin", 20, [
        { type: "attack", value: 5 },
        { type: "attack", value: 10 },
    ]);

    hideAllScreens();
    showScreen("combatScreen");

    for (let i = 0; i < 5; i++) {
        player.drawCard();
    }

    updateHandUI();
    updateBattleUI();
}

function navigateToNode(type) {
    hideAllScreens();
    if (type === "combat") {
        showScreen("combatScreen");
        startCombat();
    } else if (type === "camp") {
        showScreen("campScreen");
    } else if (type === "shop") {
        showScreen("shopScreen");
        setupShop(); 
    }
}


function obtenerOro() {
    player.añadirOro(5); 
    showScreen("theRoad"); 
    setupNodes();}

const nodeTypes = ['Combate', 'Campamento', 'Tienda'];

function setupNodes() {
    const nodes = document.querySelectorAll('#road-options button');
    nodes.forEach(node => {
        const randomType = nodeTypes[Math.floor(Math.random() * nodeTypes.length)];
        node.dataset.type = randomType; 
        node.textContent = `${randomType}`; 

        node.onclick = () => {
            elegirCamino(randomType);
        };
    });
}

function elegirCamino(type) {
    hideAllScreens();
    if (type === 'Combate') {
        startCombat();
    } else if (type === 'Campamento') {
        setupCamp();
        showScreen('campScreen');
    } else if (type === 'Tienda') {
        setupShop();
        showScreen('shopScreen');
    }
}

function rest() {
    player.health += 10; 
    updateBattleUI(); 
    showScreen("theRoad"); 
    setupNodes();
}

function setupShop() {
    updateShopUI();
    const shopItemsContainer = document.getElementById('shop-items');
    shopItemsContainer.innerHTML = ''; 

    const allCardKeys = Object.keys(allCards);
    for (let i = 0; i < 3; i++) {
        const randomKey = allCardKeys[Math.floor(Math.random() * allCardKeys.length)];
        const card = allCards[randomKey];

        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.innerHTML = `
            <div class="card-name">${card.name}</div>
            <div class="card-cost">Costo: ${card.cost}</div>
            <div class="card-description">${card.description}</div>
        `;

        cardElement.addEventListener('click', () => buyCard(card));
        shopItemsContainer.appendChild(cardElement);
    }
}

function buyCard(card) {
    if (player.gold >= 5) {
        player.gold -= 5; 
        player.añadirCarta(card); 
        updateShopUI
        leaveShop(); 
    }
}

function leaveShop() {
    showScreen("theRoad");
    setupNodes();
}

function setupCamp() {
    showScreen("campScreen"); 
}

function eliminarCarta() {
    const campDeckDisplay = document.getElementById("campDeckDisplay");

    campDeckDisplay.innerHTML = "";

    player.deck.forEach((card, index) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");

        const nameElement = document.createElement("p");
        nameElement.textContent = card.name;

        const costElement = document.createElement("p");
        costElement.textContent = `Costo: ${card.cost}`;

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = card.description;

        cardElement.appendChild(nameElement);
        cardElement.appendChild(costElement);
        cardElement.appendChild(descriptionElement);

        cardElement.style.color = "#333";
        cardElement.style.backgroundColor = "#fff";

        cardElement.addEventListener("click", () => {
            player.quitarCarta(card); 
            showScreen("theRoad"); 
        });

        campDeckDisplay.appendChild(cardElement);
    });
}

function regresarATienda() {
    hideAllScreens();
    showScreen("theRoad");
}

function updateShopUI() {
    document.getElementById('playerGold').textContent = player.gold;
}

function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function hideAllScreens() {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
}

window.onload = () => {
    showScreen('start-screen');
};

