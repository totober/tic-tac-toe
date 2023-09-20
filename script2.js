

const gameBoard = (() => {

   let container = document.querySelector("section"); 

   let board = ["","","","","","","","",""];

   function render () {
        board.forEach((item, index) => {
        let box = document.createElement("article");
        box.classList.add("square");
        box.id = `data-index-${index}`;
        box.addEventListener("click", Game.indexOf);
        console.log(box);
        container.appendChild(box);
    })
   }

   function getBoard () {
     return board
   }

   function update(index, playerMark) {

    board[index] = playerMark;
    Game.nextPlayer();
    Game.winner(board);
    
   }

    return {render, update, getBoard, board}
})()



let playerFactory = (name, mark) => {
    return {name, mark}
}


let Game = (() => {

    let players = [];

    const start = () => {

        players.push(playerFactory(document.querySelector(".player-one").value, "X"));
        players.push(playerFactory(document.querySelector(".player-two").value, "O"));
        gameBoard.render()
    }

    let currentPlayerIndex = 0;

    function nextPlayer () {
        if(currentPlayerIndex === 0) {
            currentPlayerIndex = 1
        } else {
            currentPlayerIndex = 0
        }
    }

    function indexOf (e) {

        let index = e.target.id.split("-").splice(2,1).toString()
        console.log(index)

        let playerMark = players[currentPlayerIndex].mark;
        console.log(playerMark)

        if(gameBoard.getBoard()[index].valueOf() === ""){
            gameBoard.update(index, playerMark);
        }

            gameBoard.render();
        

    }

    function winner (board) {
        if ((board[0] === "X" && board[1] === "X" && board[2] === "X") ||
            (board[3] === "X" && board[4] === "X" && board[5] === "X") ||
            (board[6] === "X" && board[7] === "X" && board[8] === "X") ||
            (board[0] === "X" && board[4] === "X" && board[8] === "X") ||
            (board[2] === "X" && board[4] === "X" && board[6] === "X")) 
            {
                alert("Player 1 wins!");
                Game.reset();
            }
        else if ((board[0] === "O" && board[1] === "O" && board[2] === "O") ||
                (board[3] === "O" && board[4] === "O" && board[5] === "O") ||
                (board[6] === "O" && board[7] === "O" && board[8] === "O") ||
                (board[0] === "O" && board[4] === "O" && board[8] === "O") ||
                (board[2] === "O" && board[4] === "O" && board[6] === "O"))
                {
                    alert("Player 2 wins!");
                    Game.reset();
                }
    }

    function reset() {

        for (let i = 0; i < 9; i++) {
            gameBoard.update(i, "")
        }

        gameBoard.render();
    }

    return {start, indexOf, nextPlayer, winner, reset, players}
    
})()



let btn = document.querySelector(".start")
btn.addEventListener("click", Game.start)

let btn2 = document.querySelector(".reset")
btn2.addEventListener("click", Game.reset)





