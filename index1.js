//PLAYER ELEMENTS:

//array to store player's cards
let playerCards = [];

//initialize player's sum to zero
let playerSum = 0;

let playerCardsEl = document.querySelector("#cards-el");

let playerSumEl = document.getElementById("sum-el")

//player's name and chip amount (object)
let playerEl = document.querySelector("#player-el");
let player = {
    name: 'Felix',
    chips: 200
};
//player name and chip HTML element
playerEl.textContent = `${player.name}: $${player.chips}`

// game message
let message = "";
let messageEl = document.getElementById("message-el");

/*************************************************/

//DEALER ELEMENTS:

//array to store dealer cards
let dealerCards = [];

//initialize dealer's sum to zero
let dealerSum = 0;

//dealer card HTML element
let dealerEl = document.getElementById("dealer-cards");
//dealer sum HTML element
let dealerSumEl = document.getElementById("dealer-sum")

/*************************************************/

let hasBlackJack = false;
let isAlive = false;

/*************************************************/

//function for generating random card

function getRandomCard() {
    let randomNum = Math.floor(Math.random()*10) + 1
    if(randomNum === 1){
        randomNum = 11;
    }
    // if(randomNum > 10  ){
    //     randomNum = 10
    // }
    return randomNum;
}

/*************************************************/

// STARTING THE GAME

function startGame() {
    //player is alive at very start of play
    isAlive = true;

    //generate the player's first two cards
    let playerCardOne = getRandomCard();
    let playerCardTwo = getRandomCard();

    //put cards into player's cards array
    playerCards = [playerCardOne, playerCardTwo];

    //get sum of player's two cards
    if(playerCardOne == 11 & playerCardTwo == 11){
        playerSum = 2;
        playerCardsEl.textContent = 'Your cards: 1 1';

    }else{
    playerSum = playerCardOne + playerCardTwo;
    };

    /*generate dealer's first card...second comes after player decides to hold (or never if player busts on drawing new card)*/
    let dealerCardOne = getRandomCard();

    //move dealer's first card into dealer's card array
    dealerCards = [dealerCardOne];

    //set dealer's card sum 
    dealerSum = dealerCardOne;

    //conditions to reset the game go below...

    //resets the game 
    if(playerSum > 21 && cards.length >= 3){
        playerSum = 0;
        playerCards = [];
        hasBlackJack = false;
        dealerSum = 0;
        dealerCards = [];
    }
    renderGame();
}

/*************************************************/

// RENDERING THE GAME
function renderGame() {
    //display player's cards in HTML
    playerCardsEl.textContent = 'Your cards: ';
    //loop through playerCards array to get each card
    for(let i = 0; i < playerCards.length; i++){
        playerCardsEl.textContent += playerCards[i] + ' ';
    }

    //display sum of player's cards
    playerSumEl.textContent = 'Your sum: ' + playerSum;
    console.log(playerSum)

    //display dealer's cards
    dealerEl.textContent = 'Dealer\'s Cards: ';
    for(let i = 0; i < dealerCards.length; i++){
        dealerEl.textContent += dealerCards[i] + ' ';
    }
    
    //display dealer sum
    dealerSumEl.textContent = "Dealer Sum: " + dealerSum;

    //EVALUATE CONDITIONALS

    if(playerSum <= 20){
        //prompt player to draw another card
        message = 'Draw another card?'
    }else if (playerSum === 21){
        message = 'You\'ve got Blackjack!'
        hasBlackJack = true;
        player.chips += 50;
        hasBlackJack = false;
    }else{
        message = "Sorry... You're out of the game!";
        isAlive = false;
        hasBlackJack = false;
        player.chips -= 50;

    }
    messageEl.textContent = message;
    playerEl.textContent = `${player.name}: $${player.chips}`
}

/*************************************************/

// DRAWING A NEW CARD (PLAYER)

function newCard() {
    if(isAlive && !hasBlackJack && playerSum <=  20){
        let card = getRandomCard();
        playerSum += card;
        //push the card to the cards array
        playerCards.push(card);
        renderGame();
    }else{
        alert('Click START GAME to start a new game!')
        messageEl.textContent = 'Start a new game!'; 
    }
}

/*************************************************/

// STAND() & DEALER DRAW

function stand(){
    //stand() is going to draw another card for the dealer
    isAlive = false;

    let dealerCardTwo = getRandomCard()

    
    //push new card to dealer cards array
    dealerCards.push(dealerCardTwo)

    //display updated dealer's cards
    dealerEl.textContent = 'Dealer\'s Cards: ';
    for(let i = 0; i < dealerCards.length; i++){
        dealerEl.textContent += dealerCards[i] + ' ';
    }
    
    //update dealer sum
    dealerSum += dealerCardTwo;
    //update dealer HTML
    dealerSumEl.textContent = "Dealer Sum: " + dealerSum;

    //checking dealer sum against player sum
    if(dealerSum > playerSum && !hasBlackJack && dealerSum <= 21){
       //dealer sum greater than player sum 
       player.chips -= 50;
       playerEl.textContent = `${player.name}: $${player.chips}`;
       messageEl.textContent = 'House wins...play again'
    }else if(dealerSum === playerSum){
        //dealer sum equal to play sum
        player.chips += 50;
        playerEl.textContent = `${player.name}: $${player.chips}`;
        messageEl.textContent = 'It\'s a draw... Click START GAME to keep playing.'
    }else if(dealerSum > 21 && playerSum <= 20){
        //dealer goes over 21 and player has sum 20 or less
        player.chips += 50;
        playerEl.textContent = `${player.name}: $${player.chips}`;
        messageEl.textContent = `${player.name} wins!`
    }else if(dealerSum < playerSum){
        stand();
    }
    console.log(dealerCards);
    console.log(dealerSum);
    console.log(playerSum);
    console.log(dealerSum >= playerSum)
    console.log('hasBlackJack = ' + hasBlackJack)
}

if(player.chips === 0){
    messageEl.textContent = 'You\'re out of chips! ';
    alert('Click START GAME to start a new game!');
    player.chips = 200;
}
console.log('hasBlackJack = ' + hasBlackJack)
