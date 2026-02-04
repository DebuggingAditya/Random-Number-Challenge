let randomNumber = parseInt(Math.random()*100 + 1);
const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const loworHigh = document.querySelector('.loworHigh');
const startOver = document.querySelector('.resultParas');
const p = document.createElement('p');
let prevGuess = [];
let numGuess = 0;
let playGame = true;

if(playGame){
    submit.addEventListener('click',function(e){
        e.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess)
    });
}

function validateGuess(guess){
    if(isNaN(guess)){
        alert('Please enter the valid number');
    }
    else if(guess < 1){
        alert('Please enter the number greater than 1');
    }
    else if(guess > 100){
        alert('Please enter the number less than 100');
    }
    else{
        prevGuess.push(guess);
        if(numGuess >= 5){
            displayGuess(guess);
            displayMessage(`Game Over. and Random number was ${randomNumber}`);
            endGame();
        }
        else{
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    if(guess===randomNumber){
        displayMessage(`You got the right guess.`);
        endGame();
    }
    else if(guess < randomNumber){
        displayMessage(`Your guess is too less.`);
    }
    else if(guess > randomNumber){
        displayMessage(`Your guess is too more.`);
    }
}

function displayGuess(guess) {
    userInput.value='';
    guessSlot.innerHTML += `${guess}  `;
    numGuess++;
    remaining.innerHTML = `${5 - numGuess}`;
}

function displayMessage(message){
    loworHigh.innerHTML= `<h3>${message}</h3>`
}

function endGame() {
    userInput.value = '';
    userInput.setAttribute('disabled','');
    p.classList.add('button');
    p.innerHTML = `<button id="newGame">New Game</button>`;
    startOver.appendChild(p);
    playGame = false;
    newGame();
}

function newGame() {
    const newGamebtn = document.querySelector('#newGame');
    newGamebtn.addEventListener('click',function(e){
    randomNumber = parseInt(Math.random()*100 + 1);
    prevGuess = [];
    numGuess = 0;
    guessSlot.innerHTML = '';
    remaining.innerHTML = `${5 - numGuess}`;
    userInput.removeAttribute('disabled');
    startOver.removeChild(p);
    playGame = true;
    })
}