let playerText = document.getElementById("playertext");
let restartBtn = document.getElementById("restartBtn");
let boxes = Array.from(document.getElementsByClassName("box"))
let winnerIndicator = getComputedStyle(document.body).getPropertyValue("--winning-blocks")
const O_text = "O"
const X_text = "X"
let currentPlayer = X_text
let spaces = Array(9).fill(null)

const startGame = () => {
    boxes.forEach(box => box.addEventListener("click", boxClicked))
}






function boxClicked(e) {
    const id = e.target.id
    if(!spaces[id]) {
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer
       
        if(playerHasWon() !==false){
            playerText.innerText = currentPlayer + " has won!"
            let winning_blocks = playerHasWon()
            winning_blocks.map( box => boxes[box].style.backgroundColor = winnerIndicator)
            boxes.forEach(box => box.removeEventListener("click", boxClicked))
          
          
            return
        }

        currentPlayer = currentPlayer == X_text ? O_text : X_text
    }
}

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon() {
   for(const condition of winningCombos){
    let [a, b, c] = condition

    if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])){
        return [a, b, c]
    }

   }
   return false
}

restartBtn.addEventListener('click', restart)
function restart() {
    spaces.fill(null)
    
    boxes.forEach(box => {
        box.innerText = ""
        box.style.backgroundColor = ""
        
    })
    boxes.forEach(box => box.addEventListener("click", boxClicked))
    playerText.innerText = 'TIC TAC TOE'

    currentPlayer = X_text
}


startGame()
