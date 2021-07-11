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
let dealerArray = []
let dealerSum = 0
let playerArray = []
let playerSum = 0
let hasBlackJack = false
let isAlive = false
let dealerAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("playerCards-el")
let playerEl = document.getElementById("player-el")
let dealerEl = document.getElementById("dealer-el")
let standEl = document.getElementById("stand-el")
let dealerSumEl = document.getElementById("dealerSum-el")

playerEl.textContent = player.name + ": $" + player.chips

    //Pick a random card
function getRandomCard() {
    let randomDeckObj = Math.floor( Math.random()*52 )
        deck.splice(randomDeckObj, 1)
        return deck[randomDeckObj]
    }
        // Render a card sum value from the relevant array
    function getSum(cardsArr) {
        let cardSum = 0
        for (let i = 0; i < cardsArr.length; i++) {
        cardSum += cardsArr[i].numValue
        }
        return cardSum
    }
            
     //Initialises the game. Loads card variables and arrays with random cards and their .numvalues  
function startGame() {
    isAlive = true
    dealerAlive = true
    
    let firstCard = getRandomCard() 
    let secondCard = getRandomCard()
    let dealCards = getRandomCard()
    
    playerArray = [firstCard, secondCard]
    dealerArray = [dealCards]
    
    // getSum function needs .numvalue from an array and not a variable!
    playerSum = getSum(playerArray)

    dealerSum = getSum(dealerArray)
    
    renderGame()
    }
    
    //Renders out the player and dealer card images and card .numvalues, through template strings // etc.
function renderGame() {
    cardsEl.innerHTML = `${player.name}` + ": "
            for (let i = 0; i < playerArray.length; i++) {
            cardsEl.innerHTML += `<img src="images/${playerArray[i].value}${playerArray[i].suit}.png">`
            } 
     
    dealerEl.innerHTML = "Dealer: "
    for (let i = 0; i < dealerArray.length; i++) {
    dealerEl.innerHTML += `<img src="images/${dealerArray[i].value}${dealerArray[i].suit}.png">`  
            }
        dealerSumEl.innerHTML = "Dealer Sum: " + dealerSum
    
    sumEl.textContent = "Player Sum: " + playerSum
    if (playerSum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (playerSum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
        dealerAlive = false
        isAlive = false
    } else {
        message = "You're out of the game!"
        isAlive = false
        dealerAlive = false
    }
    messageEl.textContent = message
}

        //Deals a new card, if conditions are met
function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        playerArray.push(card)
        playerSum = getSum(playerArray)
        renderGame()        
    }
}

 function declareWinner() {
    if (playerSum > dealerSum || dealerSum > 21) {
        
        messageEl.textContent = player.name + " Won!"   
    } else if (dealerSum > playerSum) {

        messageEl.textContent = "Dealer Won!"
    } else {

        messageEl.textContent = "It's a tie!"
    }
    dealerAlive = false
    isAlive = false
}
     
function stand () {
    if (isAlive || dealerAlive) {
        let newDealerCard = getRandomCard()
        dealerArray.push(newDealerCard)
        dealerSum = getSum(dealerArray)
        renderGame()
        if (dealerSum < 17) {
            stand() 
        }
        else if (dealerSum > 21) {
            declareWinner()
        } 
    }      
}
    
