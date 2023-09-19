

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

   function update(index, value) {

        board[index] = value;

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

    function indexOf (e) {

        let index = e.target.id.split("-").splice(2,1).toString()
        console.log(index)

        gameBoard.update(index, players[currentPlayerIndex].mark);

        console.log(players[currentPlayerIndex].mark)



        //gameBoard.render();

    }


    return {start, indexOf, players}
    
})()

let btn = document.querySelector(".start")
btn.addEventListener("click", Game.start) 

