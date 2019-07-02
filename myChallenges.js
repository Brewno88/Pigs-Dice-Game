/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, roundScore, activePlayer, gamePlaying, lastDice;

init();


//* when click the Hold Button
document.querySelector('.btn-roll').addEventListener('click', function() {

    if (gamePlaying) {
        //* 1. Generate a random number for two dice
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        console.log('dice1 = ' + dice1 + ' ---- dice2 = ' + dice2);

        //*2. Display the result and the dice imgs
        var dice1DOM = document.querySelector('.dice1', '.dice2');
        var dice2DOM = document.querySelector('.dice2')
        dice1DOM.style.display = 'block';
        dice2DOM.style.display = 'block';
        dice1DOM.src = '/dice-' + dice1 +'.png';
        dice2DOM.src = '/dice-' + dice2 +'.png';

        //*3. Update the current score IF the rolled number is NOT a 1
        if (dice1 === 1 && dice2 === 1) {
            //* Player looses total score
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        } else if (dice1 !== 1 && dice2 !== 1) {
            //* Add the two dice scores to the total
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }

        lastDice = dice1 + dice2;
    }
});

//* add the current score to the player's total score
document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying) {
        //* add current score to total score
        scores[activePlayer] += roundScore;

        //* update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //* check what's in the points input field
        var input = document.querySelector('#input-pts').value;
        var winningPoints;

        if (input){
            winningPoints = input;
        } else(
            winningPoints = 100
        );

        //* check if player won the game
        if (scores[activePlayer] >= winningPoints){

            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
            // document.querySelector('.dice1', 'dice2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');


            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

function nextPlayer(){
    //* next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    //* UPDATE visually the current class in HTML  score when we get 1
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';

    //* remove the 'active' class and move it to the other player's style when we get 1
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');

    //* hide the dice when the turn change
    // document.querySelector('.dice1').style.display = 'none';
    // document.querySelector('.dice2').style.display = 'none';
};

//* Initial state when we hit NEW GAME button
document.querySelector('.btn-new').addEventListener('click', init); // we are passing the 'init' function and not calling it ('init()')

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;


    //* manipulate an HTML element (known as 'setter' because set the value)
    //document.querySelector('#current-' + activePlayer).textContent = dice;
    //document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

    //* read an element and store it to a variable (known as 'getter' because get the value)
    //var x = document.querySelector('#score-0').textContent;
    //console.log(x);

    //* manipulate a CSS element
    // document.querySelector('.dice1').style.display = 'none';
    // document.querySelector('.dice2').style.display = 'none';
    // document.querySelector('class').cssFile.selector = 'property'

    //* Update the HTML elements
    document.querySelector('#score-0').textContent = '0';
    document.querySelector('#score-1').textContent = '0';
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
};

