
let playerCards = [];
let dealerCards = [];

let dealerEl = document.getElementById("dealer-cards")
let dealerSumEl = document.getElementById("dealer-sum")
let dealerSum = 0;

let sum = 0;
let sumEl = document.querySelector("#sum-el")

let hasBlackJack = false;
let isAlive = false;

let message = "";
let messageEl = document.getElementById("message-el");

let cardsEl = document.querySelector("#cards-el");

let playerEl = document.querySelector("#player-el");
let player = {
    name: 'Felix',
    chips: 0
}
playerEl.textContent = `${player.name}: $${player.chips}`

function getRandomCard() {
    let randomNum = Math.floor(Math.random()*13) + 1
    if(randomNum === 1){
        randomNum = 11;
    }
    if(randomNum > 10  ){
        randomNum = 10
    }
    return randomNum;
}

function startGame(){
    isAlive = true;

    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    
    playerCards = [firstCard, secondCard];
    sum = firstCard + secondCard;

    //dealer's cards
    let dealerCardOne = getRandomCard()
    dealerCards = [dealerCardOne]

    //resets the game 
    if(sum > 21 && cards.length >= 3){
        sum = 0;
        playerCards = [];
        hasBlackJack = false;
        dealerSum = 0;
        dealerCards = [];
    }
    console.log(dealerCards);
    renderGame();
}

function renderGame(){
    //display cards
    cardsEl.textContent = 'Your Cards: ';
    for(let i = 0; i < playerCards.length; i++){
        cardsEl.textContent += playerCards[i] + ' ';
    }

    //display dealer's cards
    dealerEl.textContent = 'Dealer\'s Cards: ';
    for(let i = 0; i < dealerCards.length; i++){
        dealerEl.textContent += dealerCards[i] + ' ';
    }

    //display dealer sum
    dealerSum += dealerCards[0];
    dealerSumEl.textContent = "Dealer Sum: " + dealerSum;

    //display sum of cards
    sumEl.textContent = "Sum: " + sum;

    if(sum <= 20){
        message = "Do you want to draw a card?";
    }else if(sum === 21){
        message = "Congrats, you've got Blackjack!"
        hasBlackJack = true;
        player.chips += 50;
        console.log(hasBlackJack)
    }else{
        message = "Sorry... You're out of the game!";
        isAlive = false;
        hasBlackJack = false;
        player.chips -= 50;
        console.log(isAlive);
        }
        playerEl.textContent = `${player.name}: $${player.chips}`
        messageEl.textContent = message;
}

//generates a new card
function newCard() {
    if(isAlive && !hasBlackJack && sum <=  20){
        let card = getRandomCard();
        sum += card;
        //push the card to the cards array
        playerCards.push(card);
        renderGame();
    }else{
        alert('Click START GAME to start a new game!')
        messageEl.textContent = 'Start a new game!'; 
    }
}

 