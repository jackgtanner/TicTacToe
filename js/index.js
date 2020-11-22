//JS for the newgame button
const newGame = document.querySelector(".newGame button")
var newGameSound = new Audio(("./assets/NewGame.wav"))
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
    const showBoard = (marker) => {
        var container = document.querySelector(".container");
        var board = document.createElement("div");
        board.classList.add("board");

        //loop to go through and display 9 cells
        for (var i = 0; i < gameBoard.game.length; i++) {
            var cell = document.createElement("cell");

            if (game[i] === "X"){
                cell.innerText = player1.marker;
                cell.classList.add("cellX");
            } else if (game[i] === "O"){
                cell.innerText = player2.marker;
                cell.classList.add("cellO");
            } else cell.classList.add("cell");


            if (marker === "X"){
                cell.setAttribute('data-after', `${player1.marker}`)
            } else cell.setAttribute('data-after', `${player2.marker}`)
            board.appendChild(cell);
        }
        container.appendChild(board);

        //add event listener to each cell
        var cells = document.querySelectorAll("cell");
        cells.forEach((element, index) => {
            element.addEventListener('click', () => {
                container.innerHTML = '';
                game[index] = `${marker}`
                checkWin();
                startGame();
            })
        });
        scores();
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

        Player_1.innerText = `${player1.name} (${player1.marker})`;
        Tied.innerText = "TIE";
        Player_2.innerText = `${player2.name} (${player2.marker})`;
        score1.innerText = player1.score;
        score2.innerText = 0;
        score3.innerText = player2.score;

        gameInfo.appendChild(Player_1);
        gameInfo.appendChild(Tied);
        gameInfo.appendChild(Player_2);
        gameInfo.appendChild(score1);
        gameInfo.appendChild(score2);
        gameInfo.appendChild(score3);
    };

    //checks if there's a win on the board
    const checkWin = () => {
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

        
    }

    //reset the board back to its original state
    const reset = () => {
        gameBoard.game = ["", "", "", "", "", "", "", "", ""];
    }

    //return the public methods
    return {
        game,
        showBoard,
        scores,
    };
})();



//PLayer object
function Player(name, marker, score) {
    this.name = name;
    this.marker = marker;
    this.score = score;
}

const player1 = new Player("PLAYER 1", "X", 0);
const player2 = new Player("COMPUTER", "O", 0);
var moves = 0;

function startGame() {
    var gameOver = false;
    moves++;
    console.log(moves);
    if (moves%2 === 1){
        gameBoard.showBoard(player1.marker)
    } else gameBoard.showBoard(player2.marker)
}