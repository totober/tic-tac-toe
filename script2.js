

const gameBoard = (() => {

   let container = document.querySelector("section"); 

   let board = ["","","","","","","","",""];

   function render () {
        board.forEach((item, index) => {
        let box = document.createElement("article");
        box.classList.add("square");
        box.id = `data-index-${index}`;
        box.addEventListener("click", Game.indexOf);
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

        let p1 = () => {
            if(document.querySelector(".player-one").value !== ""){
               return document.querySelector(".player-one").value
            } else {
              return  "Player one"
            }
        } 
        let p2 = () => {
            if(document.querySelector(".player-two").value !== ""){
              return  document.querySelector(".player-two").value
            } else {
               return "Player two"
            }
        }

        players.push(playerFactory(p1(), "X"));
        players.push(playerFactory(p2(), "O"));
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
          

        if(gameBoard.getBoard()[index] === ""){
            displayController.displayMark(index, playerMark)
            gameBoard.update(index, playerMark);
        }
        
    }

    function winner (board) {

        if ((board[0] === "X" && board[1] === "X" && board[2] === "X") ||
            (board[3] === "X" && board[4] === "X" && board[5] === "X") ||
            (board[6] === "X" && board[7] === "X" && board[8] === "X") ||
            (board[0] === "X" && board[4] === "X" && board[8] === "X") ||
            (board[2] === "X" && board[4] === "X" && board[6] === "X") ||
            (board[0] === "X" && board[3] === "X" && board[6] === "X") ||
            (board[1] === "X" && board[4] === "X" && board[7] === "X") ||
            (board[2] === "X" && board[5] === "X" && board[8] === "X") ) 
            {
                displayController.msgOutput(`${players[0].name} wins!`);
               // Game.reset();
               // displayController.cleanMark();
                
            }
        else if((board[0] === "O" && board[1] === "O" && board[2] === "O") ||
                (board[3] === "O" && board[4] === "O" && board[5] === "O") ||
                (board[6] === "O" && board[7] === "O" && board[8] === "O") ||
                (board[0] === "O" && board[4] === "O" && board[8] === "O") ||
                (board[2] === "O" && board[4] === "O" && board[6] === "O") ||
                (board[0] === "O" && board[3] === "O" && board[6] === "O") ||
                (board[1] === "O" && board[4] === "O" && board[7] === "O") ||
                (board[2] === "O" && board[5] === "O" && board[8] === "O") )
                {
                    displayController.msgOutput(`${players[1].name} wins!`);
                    //Game.reset();
                   // displayController.cleanMark();
                    
                }
        else if (board.every(item => item !== "")) {

            displayController.msgOutput("its a tie!")
           // Game.reset();
           // displayController.cleanMark();       
        }
    }

    function reset() {

        for (let i = 0; i < 9; i++) {
            gameBoard.update(i, "")
        }

        currentPlayerIndex = 0;
        displayController.cleanMark();
        displayController.msgOutput("");

    }

    return {start, indexOf, nextPlayer, winner, reset}
    
})()

displayController = (() => {
    

    function displayMark (index, playerMark) {

      let art = document.querySelectorAll("article");

      art.forEach((item) => {
         if(item.id.includes(index)){
            item.classList.add(`mark-${playerMark}`)
      }
      })

    }

    function cleanMark () {
        let art = document.querySelectorAll("article");

        art.forEach( (item) => {
            if(item.classList.contains("mark-X")){
                item.classList.remove("mark-X");
            } else if (item.classList.contains("mark-O")){
                item.classList.remove("mark-O");
            }  
        })
    }

    function msgOutput (message){
    
        let msg = document.querySelector("output"); 
        msg.textContent = message
    }

 

return {displayMark, cleanMark, msgOutput}

})()



let btn = document.querySelector(".start")
btn.addEventListener("click", Game.start)

let btn2 = document.querySelector(".reset")
btn2.addEventListener("click", Game.reset)

