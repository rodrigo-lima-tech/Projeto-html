const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points"),
    },
    cardSprites: {
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCards: {
        player: document.getElementById("player-card"),
        computer: document.getElementById("computer-card"),
        playerSides: {
            player1: "player-card",
            player1BOX: document.querySelector("#player-cards"),
            computer: "computer-card",
            computerBOX: document.querySelector("#computer-cards"),
        },
        actions: {
            button: document.getElementById("next-duel"),
        },
    },
};

const pathImages = "./src/assets/icons/";
const cardData = [
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: `${pathImages}dragon.png`,
        WinOf: [1],
        LossOf: [2],
    },
    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        img: `${pathImages}magician.png`,
        WinOf: [2],
        LossOf: [0],
    },
    {
        id: 2,
        name: "Exodia",
        type: "Scissors",
        img: `${pathImages}exodia.png`,
        WinOf: [0],
        LossOf: [1],
    },
];

async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
}

async function createCardImage(cardId, fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", cardId);
    cardImage.classList.add("card");

    console.log(`Criando carta: ${cardData[cardId].name} para o campo ${fieldSide}`);

    if (fieldSide === state.fieldCards.playerSides.player1) {
        cardImage.addEventListener("click", () => {
            setCardsField(cardImage.getAttribute("data-id"));
        });
        cardImage.addEventListener("mouseover", () => {
            drawSelectorCard(cardId);
        });
    }

    return cardImage;
}

async function setCardsField(cardId) {
    console.log(`Definindo as cartas para o campo. Jogador: ${cardId}`);
    await removeAllCardsImages();

    let computerCardId = await getRandomCardId();
    console.log(`Carta do computador: ${computerCardId}`);

    state.fieldCards.player.style.display = "block";
    state.fieldCards.computer.style.display = "block";

    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;

    let duelResults = await checkDuelResults(cardId, computerCardId);

    await updateScore();
    await drawButton(duelResults);
}

async function removeAllCardsImages() {
    console.log("Removendo todas as cartas...");
    let playerBox = state.fieldCards.playerSides.player1BOX;
    let computerBox = state.fieldCards.playerSides.computerBOX;

    let playerImages = playerBox.querySelectorAll("img");
    playerImages.forEach((img) => img.remove());

    let computerImages = computerBox.querySelectorAll("img");
    computerImages.forEach((img) => img.remove());
}

async function drawSelectorCard(index) {
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = "Attribute: " + cardData[index].type;
}

async function drawCards(cardNumbers, fieldSide) {
    console.log(`Desenhando ${cardNumbers} cartas no campo: ${fieldSide}`);

    const fieldBox = document.getElementById(fieldSide);
    if (!fieldBox) {
        console.error(`Campo não encontrado: ${fieldSide}`);
        return;
    }

    for (let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);
        fieldBox.appendChild(cardImage);
    }
}

async function resetDuel() {
    state.cardSprites.avatar.src = "";
    state.actions.button.style.display = "none";

    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";
    init();
}

async function playAudio(status) {
    const audio = new Audio(`./src/assets/audios/${status}.wav`);
    audio.play();
}

async function updateScore() {
    state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`;
}

async function checkDuelResults(playerCardId, computerCardId) {
    let duelResults = "DRAW";
    let playerCard = cardData[playerCardId];

    if (playerCard.WinOf.includes(computerCardId)) {
        duelResults = "WIN";
        state.score.playerScore++;
    }

    if (playerCard.LossOf.includes(computerCardId)) {
        duelResults = "LOSE";
        state.score.computerScore++;
    }

    await playAudio(duelResults);
    return duelResults;
}

async function init() {
    console.log("Iniciando o jogo...");
    await drawCards(5, state.fieldCards.playerSides.player1);
    await drawCards(5, state.fieldCards.playerSides.computer);

    const bgm = document.getElementById("bgm");
    bgm.play();
}

init();