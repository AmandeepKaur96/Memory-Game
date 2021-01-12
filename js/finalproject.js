const cards = document.querySelectorAll('.memory-card');
const startbuttons = document.querySelectorAll('.startbutton');
const resetbuttons = document.querySelectorAll('.resetbutton');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let pair = 0;
let newRecord = 0;
let oldRecord = 0;


let startTime = 50
let currentTime = 0
let myTimer
let myTimerSpeed = 1000 // 1 sec

resetTimer()
startbuttons.forEach(startbutton => startbutton.addEventListener('click', startTimer));
resetbuttons.forEach(resetbutton => resetbutton.addEventListener('click', resetTimer));


function resetTimer() {
    stopTimer();
    currentTime = startTime;
    document.getElementById("timer").innerHTML = currentTime;
}

function startTimer() {
    if (currentTime <= 0) {
        resetTimer()
        startTimer()
        resetNewGame()
    } else {
        myTimer = setInterval(timerTick, myTimerSpeed);
    }
}

function stopTimer() {
    clearInterval(myTimer)
}

function timerTick() {
    currentTime--
    document.getElementById("timer").innerHTML = currentTime
    if (currentTime == 0) {
        stopTimer()
        alert("time's Up");

    }
}

function flipCard() {
    if (lockBoard) return;

    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.style.backgroundColor = "#33CC33";
    secondCard.style.backgroundColor = "#33CC33";
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    checkScore();
    resetBoard();
}

function checkScore() {
    pair++
    if (pair == 6) {
        stopTimer();
        if (newRecord < oldRecord) {
            oldRecord = newRecord;
            newRecord = currentTime;
            document.getElementById("newrecord").innerHTML = newRecord
        }
        resetNewGame();
    }
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetNewGame() {
    cards.forEach(card => {
        let ramdomPos = Math.ceil(Math.random() * 12);
        card.style.order = ramdomPos;
        card.classList.remove('flip');
    });
    cards.forEach(card => card.addEventListener('click', flipCard));
}

function resetBoard() {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}

(function shuffle() {
    cards.forEach(card => {
        let ramdomPos = Math.ceil(Math.random() * 12);
        card.style.order = ramdomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));