/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePLayer, dice;

init();

document.querySelector(".btn-new").addEventListener('click', init);  // calling the new game function

document.querySelector('.btn-roll').addEventListener('click', function() {

    // 1. Random Number
    dice = Math.floor(Math.random() * 6 + 1);

    // 2. Display the result
    var diceDom = document.querySelector('.dice');
    diceDom.style.display = 'block';
    diceDom.src = 'dice-' + dice + '.png';

    //3. Update the scores
    if(dice !== 1)
    {   
        roundScore += dice;
        document.querySelector("#current-" + activePLayer).textContent = roundScore;
    }

    else{
        // next player
        nextPlayer();
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {

    // Add current score to the global score score
    scores[activePLayer] += roundScore;  

    // Update the UI
    document.querySelector('#score-' + activePLayer).textContent = scores[activePLayer];

    
    // Check if player won the game
    if(scores[activePLayer] >= 20) {
        document.querySelector('#name-' + activePLayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'block';
        document.querySelector('.player-' + activePLayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePLayer + '-panel').classList.remove('active');
    }

    else {
        // next player
        nextPlayer();
	}

    
});

function init() {
    scores = [0, 0];
	roundScore = 0;
    activePLayer = 0;
    
    document.querySelector(".dice").style.display = "none";
	document.getElementById("score-0").textContent = "0";
	document.getElementById("score-1").textContent = "0";
	document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";

    document.querySelector(".player-0-panel").classList.remove("winner");
	document.querySelector(".player-0-panel").classList.remove("active");
        
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("active");
    
    document.querySelector(".player-0-panel").classList.add("active");
}

function nextPlayer() {

    activePLayer === 0 ? (activePLayer = 1) : (activePLayer = 0);
	roundScore = 0;

	document.getElementById("current-0").textContent = "0";
	document.getElementById("current-1").textContent = "0";

	// document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');
    
	document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
    document.querySelector('.dice').style.display = 'none';
}