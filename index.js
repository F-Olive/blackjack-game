let deck = [
    { value: "A", suit: "S", numValue: 11},
    { value: "A", suit: "D", numValue: 11},
    { value: "A", suit: "C", numValue: 11},
    { value: "A", suit: "H", numValue: 11},
    { value: "2", suit: "S", numValue: 2},
    { value: "2", suit: "D", numValue: 2},
    { value: "2", suit: "C", numValue: 2},
    { value: "2", suit: "H", numValue: 2},
    { value: "3", suit: "S", numValue: 3},
    { value: "3", suit: "D", numValue: 3},
    { value: "3", suit: "C", numValue: 3},
    { value: "3", suit: "H", numValue: 3},
    { value: "4", suit: "S", numValue: 4},
    { value: "4", suit: "D", numValue: 4},
    { value: "4", suit: "C", numValue: 4},
    { value: "4", suit: "H", numValue: 4},
    { value: "5", suit: "S", numValue: 5},
    { value: "5", suit: "D", numValue: 5},
    { value: "5", suit: "C", numValue: 5},
    { value: "5", suit: "H", numValue: 5},
    { value: "6", suit: "S", numValue: 6},
    { value: "6", suit: "D", numValue: 6},
    { value: "6", suit: "C", numValue: 6},
    { value: "6", suit: "H", numValue: 6},
    { value: "7", suit: "S", numValue: 7},
    { value: "7", suit: "D", numValue: 7},
    { value: "7", suit: "C", numValue: 7},
    { value: "7", suit: "H", numValue: 7},
    { value: "8", suit: "S", numValue: 8},
    { value: "8", suit: "D", numValue: 8},
    { value: "8", suit: "C", numValue: 8},
    { value: "8", suit: "H", numValue: 8},
    { value: "9", suit: "S", numValue: 9},
    { value: "9", suit: "D", numValue: 9},
    { value: "9", suit: "C", numValue: 9},
    { value: "9", suit: "H", numValue: 9},
    { value: "10", suit: "S", numValue: 10},
    { value: "10", suit: "D", numValue: 10},
    { value: "10", suit: "C", numValue: 10},
    { value: "10", suit: "H", numValue: 10},
    { value: "J", suit: "S", numValue: 10},
    { value: "J", suit: "D", numValue: 10},
    { value: "J", suit: "C", numValue: 10},
    { value: "J", suit: "H", numValue: 10},
    { value: "Q", suit: "S", numValue: 10},
    { value: "Q", suit: "D", numValue: 10},
    { value: "Q", suit: "C", numValue: 10},
    { value: "Q", suit: "H", numValue: 10},
    { value: "K", suit: "S", numValue: 10},
    { value: "K", suit: "D", numValue: 10},
    { value: "K", suit: "C", numValue: 10},
    { value: "K", suit: "H", numValue: 10},
]

let player = {
    name: "Per",
    chips: 200
}
    //General variables
let dealerCards = []
let dealerSum = 0
let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("playerCards-el")
let playerEl = document.getElementById("player-el")
let dealerEl = document.getElementById("dealer-el")

playerEl.textContent = player.name + ": $" + player.chips

    //Pick a random card
function getRandomCard() {
    let randomDeckObj = Math.floor( Math.random()*52 )
        deck.splice(randomDeckObj, 1)
        return deck[randomDeckObj]
    }
        // Render the sum of the cards
    function getSum(cardsArr) {
        let cardSum = 0
        for (let i = 0; i < cardsArr.length; i++) {
        cardSum += cardsArr[i].numValue
        }
        return cardSum
    }
            
     //Initialises the game   
function startGame() {
    isAlive = true
    let firstCard = getRandomCard() 
    let secondCard = getRandomCard()
    let dealCards = getRandomCard()
    
    cards = [firstCard, secondCard]
    dealerCards = [dealCards]
    
    sum = getSum(cards)
    dealerSum = getSum(dealCards)
    
    renderGame()
    }
    
    //Renders out the player and dealer cards through a template string
function renderGame() {
    cardsEl.innerHTML = `${player.name}` + " "
            for (let i = 0; i < cards.length; i++) {
            cardsEl.innerHTML += `<img src="images/${cards[i].value}${cards[i].suit}.png">`
            } 
     
    dealerEl.innerHTML = "Dealer: "
    for (let i = 0; i < dealerCards.length; i++) {
    dealerEl.innerHTML += `<img src="images/${dealerCards[i].value}${dealerCards[i].suit}.png">`  
            }
    //Player sum of cards and message
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message
}

        //Deals a new card, if conditions are met
function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        cards.push(card)
        sum = getSum(cards)
        renderGame()        
    }
}
