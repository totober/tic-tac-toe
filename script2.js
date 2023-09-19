

const gameBoard = (() => {

   let container = document.querySelector("section"); 

   let board = ["","","","","","","","",""];
   console.log(board);

   function render () {
        board.forEach((item, index) => {
        let box = document.createElement("div");
        box.classList.add("square");
        box.id = `data-index-${index}`;
        box.addEventListener("click", Game.indexOf);
        console.log(box);
        container.appendChild(box);
    })
   }

   function update(index, playerMark) {

    if((board[index].valueOf() === "X") || (board[index].valueOf() === "O")){
        console.log(board[index].valueOf())
        alert("already marked! Choose another square!")

    } else {
        board[index] = playerMark;
        Game.nextPlayer()
    }

        

   }

    return {render, update, board}
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
    let gameOver = false;

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

        gameBoard.update(index, playerMark);

        

        gameBoard.render();

    }


    return {start, indexOf, nextPlayer, players}
    
})()

let btn = document.querySelector(".start")
btn.addEventListener("click", Game.start) 

