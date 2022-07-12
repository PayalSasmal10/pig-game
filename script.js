'use strict';

// selecting element
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore, activePlayer, score, play;


const initial = function(){

    currentScore = 0;
    activePlayer = 0;
    score = [0,0];
    play = true;

    // setting score elements
    score0El.textContent = 0;
    score1El.textContent = 0;

    // hide dice
    diceEl.classList.add('hidden');

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}

initial();

const switchNextPlay = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (play){

    
        // 1. Generate random dice roll.
        const randomDice = Math.trunc(Math.random()*6)+1;

        // 2. Display dice roll.
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${randomDice}.png`;

        // dice r0ll number is 1 or not.
        if (randomDice !== 1){
            // add dice to current score
            currentScore += randomDice;

            // add current score to players.
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            
            // current0El.textContent = currentScore;
        }else
        {
            // Switch to next player
            
            switchNextPlay();
        }
    }
})

// holding scoire feature
const holdScore = function() {
    // 1.Add current score to total
    
    score[activePlayer] += currentScore;
    
    document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];
    
    // 2. check if score is > 100
    if (score[activePlayer] >= 100){
        play = false;
        diceEl.classList.add('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    }

    // switch to next player.
    switchNextPlay();
} 

btnHold.addEventListener('click', holdScore);

btnNew.addEventListener('click', initial);
    
