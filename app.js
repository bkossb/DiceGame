var scores, roundScore, activePlayer, gamePlaying, scoreToGame;
var lastDice;

init();

document.querySelector(".btn-roll").addEventListener('click', function () {
        if (gamePlaying) {


            var dice = Math.floor(Math.random() * 6 + 1);
            var dice2 = Math.floor(Math.random() * 6 + 1);

            var diceDom = document.querySelectorAll(".dice")[0];
            var diceDom2 = document.querySelectorAll(".dice")[1];


            diceDom.style.display = 'block';
            diceDom2.style.display = 'block';

            diceDom.src = 'dice-' + dice + '.png';
            diceDom2.src = 'dice-' + dice2 + '.png';


            if (dice === 6 && lastDice === 6) {
                scores[activePlayer] = 0;
                document.querySelector('#score-' + activePlayer).textContent = "0";
                nextPlayer();
            }
            else if (dice !== 1 && dice2 !== 1) {
                roundScore += dice + dice2;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            } else {
                nextPlayer();
            }
            lastDice = dice;
            console.log(lastDice);
        }
    }
);

function winningPlayer() {
    document.querySelector('#name-' + activePlayer).textContent = 'Winner';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    document.querySelectorAll('.dice')[0].style.display = 'none';
    document.querySelectorAll('.dice')[1].style.display = 'none';

    gamePlaying = false;
}

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelectorAll(".dice")[0].style.display = "none";
    document.querySelectorAll(".dice")[1].style.display = "none";

}

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        var input = parseInt(document.querySelector(".final-score").value);


        if (input) {
            scoreToGame = input;
        } else {
            scoreToGame = 100;
        }


        if (scores[activePlayer] >= scoreToGame) {
            winningPlayer();

        } else {
            nextPlayer();
        }
    }
});


function init() {
    document.querySelector('.btn-new').addEventListener("click", init);

    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;

    document.querySelectorAll(".dice")[0].style.display = "none";
    document.querySelectorAll(".dice")[1].style.display = "none";


    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
    document.querySelector('#score-0').textContent = '0';
    document.querySelector('#score-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    gamePlaying = true;

}