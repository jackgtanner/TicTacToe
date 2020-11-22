//JS for the newgame button
const newGame = document.querySelector(".newGame button")
var newGameSound = new Audio(("./assets/NewGame.wav"))
newGame.addEventListener("click", () => {

    //remove the button & play sound
    newGame.style.display=("none");
    newGameSound.play();
    //call function to show board
    gameBoard.showBoard();
    gameBoard.scores();

})


//Gameboard object module
const gameBoard = (() => {
    //initialize the board with 9 blank cells
    const game = ["", "", "", "", "", "", "", "", ""];
    //
    const showBoard = () => {
        var container = document.querySelector(".container");
        var board = document.createElement("div");
        board.classList.add("board");

        //loop to go through and display 9 cells
        for (var i=0; i < gameBoard.game.length; i++){
            var cell = document.createElement("cell");
            cell.classList.add("cell")
            board.appendChild(cell);  
        }
        container.appendChild(board);

        //add event listener to each cell
        var cells = document.querySelectorAll("cell");
        cells.forEach((element, index) => {
            element.addEventListener('click', () => {

            })
        });
    };

    //set up and display the scores for each player
    const scores = () => {
        var gameInfo = document.querySelector(".gameInfo");
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
function Player (name, marker, score){
    this.name = name;
    this.marker = marker;
    this.score = score;
}

const player1 = new Player ("PLAYER 1", "X", 0);
const player2 = new Player ("PLAYER 2", "O", 0);
