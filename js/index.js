//JS for the newgame button
const newGame = document.querySelector(".newGame button")
const newGameSound = new Audio(("./assets/NewGame.wav"));
const player_1_move = new Audio("assets/Player1Move.wav");
const player_2_move = new Audio("assets/Player2Move.wav");
newGame.addEventListener("click", () => {

    //remove the button & play sound
    newGame.style.display = ("none");
    newGameSound.play();

    //call startGame function
    startGame();

})


//Gameboard object module
const gameBoard = (() => {
    //initialize the board with 9 blank cells
    const game = ["", "", "", "", "", "", "", "", ""];
    //
    const showBoard = (player) => {
        var container = document.querySelector(".container");
        container.innerHTML = ""
        var board = document.createElement("div");
        board.classList.add("board");

        //loop to go through and display 9 cells
        for (var i = 0; i < gameBoard.game.length; i++) {
            var cell = document.createElement("cell");

            if (game[i] === `${player1.marker}`){
                cell.innerHTML = player1.marker;
                cell.classList.add("cellX");
            } else if (game[i] === `${player2.marker}`){
                cell.innerHTML = player2.marker;
                cell.classList.add("cellO");
            } else cell.classList.add("cell");
            
            //set hover marker to the one assigned to the current player
            cell.setAttribute('data-after', `${player.marker}`);
            board.appendChild(cell);
        }
        container.appendChild(board);

        //add event listener to each cell
        var cells = document.querySelectorAll("cell");
        cells.forEach((element, index) => {

            if (game[index] === ""){
                element.addEventListener('click', () => {
                    player_1_move.play();
                    container.innerHTML = '';
                    game[index] = `${player.marker}`;
                    hasPlayerWon(player);
                    startGame();
                })
            }
        });
        scores();
        return
    };

    //set up and display the scores for each player
    const scores = () => {
        var container = document.querySelector(".container");
        var gameInfo = document.createElement("div");
        gameInfo.classList.add('gameInfo');
        container.appendChild(gameInfo);
        var Player_1 = document.createElement('h5');
        var Tied = document.createElement('h5');
        var Player_2 = document.createElement('h5');

        var score1 = document.createElement('h5');
        var score2 = document.createElement('h5');
        var score3 = document.createElement('h5');

        Player_1.innerHTML = `${player1.name}  ${player1.marker}`;
        Tied.innerText = "TIE";
        Player_2.innerHTML = `${player2.name}  ${player2.marker}`;
        score1.innerText = player1.score;
        score2.innerText = tied;
        score3.innerText = player2.score;

        gameInfo.appendChild(Player_1);
        gameInfo.appendChild(Tied);
        gameInfo.appendChild(Player_2);
        gameInfo.appendChild(score1);
        gameInfo.appendChild(score2);
        gameInfo.appendChild(score3);
        return
    };


    //checks if there's a win on the board
    const checkWin = (player) => {
        var winConditions =[
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        for (i = 0; i < winConditions.length; i++){
            var total = 0;
            for (j = 0; j < winConditions[i].length; j++){

                if (game[(winConditions[i][j])] === player.marker) total++;
                
            }
            if (total === 3) {
                return 1;
            }
        }
        var draw = 0;
        for (i = 0; i < game.length; i++){
            if (game[i] != "") draw++;
            if (draw === 9){
                return 0;
            }
        }
    }

    const hasPlayerWon = (player) =>{
        if (checkWin(player) === 1) {
            console.log(`${player.name} won`);
            player.win(player);
            player.score++
            reset();
            startGame();
        } else if(checkWin(player) === 0){
            console.log("Tied Game")
            player.tied(player);
            tied++;
            reset();
            startGame();
        }
        return
    }

    //reset the board back to its original state
    const reset = () => {
        for (i = 0; i < game.length; i++){
            game[i] = "";
        }
        moves = getRandomIntInclusive(-1, 0);
    }

    const computerPlay = (player) => {
        var i =getRandomIntInclusive(0, 8);
        cell = game[i];

        if (cell != ""){
            computerPlay(player);
        } else {
            game[i] = player.marker;
            hasPlayerWon(player);
            startGame();
            return;
        }
    }

    //return the public methods
    return {
        game,
        showBoard,
        scores,
        reset,
        computerPlay,
    };
})();



//PLayer object
const Player = (name, marker, score) => {

    const win = (player) => {
        alert(`${player.name} won!`);
    };

    const tied = (player) => {
        alert(`The game was a Tie`);
    }

    return {name, marker, score, win, tied};
}


//Function to start the game and handles the game functionality
function startGame() {
    moves++;
    console.log("moves", moves)
    if ((moves%2 === 1) || (moves === 0)){
        console.log("X")
        gameBoard.showBoard(player1);
    } else {
        console.log("O")
        gameBoard.showBoard(player2);
        if(player2.name === "COMPUTER") gameBoard.computerPlay(player2); //Easy mode Computer AI function.
    }
    console.log(gameBoard.game);
    return
}

function getRandomIntInclusive(min, max){
    var min = Math.ceil(min);
    var max = Math.floor(max);
    return Math.floor(Math.random() * (max-min + 1) + min); 
}

function newIcon(newMarker, oldIcon){
    for (i = 0; i<gameBoard.game.length; i++){
        if (gameBoard.game[i] === oldIcon){
            gameBoard.game[i] = newMarker;
        }
    }
    return
}

function hasGameStarted(){

    if (newGame.style.display != "none"){
        //remove the button & play sound
        newGame.style.display = ("none");
        newGameSound.play();

        //call startGame function
        startGame();
    }
    return
}


const picker = document.querySelectorAll('emoji-picker')
picker[0].addEventListener('emoji-click', emoji => {
    hasGameStarted();
    var oldIcon = player1.marker;
    player1.marker = emoji.detail.unicode;
    newIcon(player1.marker, oldIcon);
    gameBoard.showBoard(player1);
});
picker[1].addEventListener('emoji-click', emoji => {
    hasGameStarted();
    oldIcon = player2.marker
    player2.marker = emoji.detail.unicode;
    newIcon(player2.marker, oldIcon);
    gameBoard.showBoard(player1);
});


//global code
var player1 = Player("PLAYER 1", 'X', 0);
var player2 = Player("COMPUTER", 'O', 0);
var moves = getRandomIntInclusive(0, 1);
var tied = 0;

