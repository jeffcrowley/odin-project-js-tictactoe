document.addEventListener("DOMContentLoaded", (e) => {
   const startButton = document.getElementById("startButton")
   const gameBoardArea = document.getElementById("gameBoardArea")
   const row1 = document.getElementById("row1")
   const row2 = document.getElementById("row2")
   const row3 = document.getElementById("row3")
   const leftCol = document.getElementById('leftCol')
   const rightCol = document.getElementById('rightCol')
   let player1 = ""
   let player2 = ""
   let gameEnded = false
   let squareArray = []

   const gameBoard = (() => {
      const createBoard = () => {
         for(let i = 0; i < 3; i++) {
            let newSquare = Square(`a${i + 1}`) //creates row a
            squareArray.push(newSquare)
            console.log(`Created square ${newSquare.id}, mark: ${newSquare.mark}`) //debug
            console.log(squareArray) //debug
         }
         for(let i = 0; i < 3; i++) {
            let newSquare = Square(`b${i + 1}`) //row b
            squareArray.push(newSquare)
            console.log(`Created square ${newSquare.id}, mark: ${newSquare.mark}`) //debug
            console.log(squareArray) //debug
         }
         for(let i = 0; i < 3; i++) {
            let newSquare = Square(`c${i + 1}`) // row c
            squareArray.push(newSquare)
            console.log(`Created square ${newSquare.id}, mark: ${newSquare.mark}`) //debug
            console.log(squareArray) //debug

         }
      }
      const renderBoard = () => {
         createBoard()
         squareArray.forEach((square) => {
            let newDomSquare = document.createElement('div')
            newDomSquare.setAttribute("id", square.id)
            newDomSquare.setAttribute("class", "col-md-4 h-100 text-center gameSquare")
            console.log(squareArray.indexOf(square)) //debug
            if (squareArray.indexOf(square) < 3) {
               row1.appendChild(newDomSquare)
               console.log(square) //debug
            } else if (squareArray.indexOf(square) < 6 && squareArray.indexOf(square) > 2) {
               row2.appendChild(newDomSquare)
               console.log(square) //debug
            } else {
               row3.appendChild(newDomSquare)
               console.log(square) //debug
            }
         })
      }
      //adds an X or O to both the DOM and to the internal value of the square in the squareArray
      const addMark = (domSquare, mark) => {
         const squareMark = document.createElement('h1')
         squareMark.setAttribute("class", "display-1 h-100 pt-4")
         squareMark.textContent = mark
         domSquare.appendChild(squareMark)
         let clickedSquare = squareArray.find( square => square.id === domSquare.id)
         clickedSquare.mark = mark
         console.log(`Clicked Square ID: ${domSquare.id}, Mark: ${clickedSquare.mark}`) //debug
      }
      //resets board when game ends
      const resetBoard = () => {
         squareArray = []
         let existingSquares = document.querySelectorAll('.gameSquare')
         existingSquares.forEach((square) => {
            square.parentNode.removeChild(square)
         })
         gameLogic.turnCount = 1
      }

      return {renderBoard, addMark, resetBoard}
   })()


   // Factory functions
   const Player = (name, number) => {
      let winCount = 0
      return {name, number, winCount}
   }

   const Square = (id) => {
      let mark = undefined
      return {id, mark}
   }

   //Module
   const gameLogic = (() => {
      const isWin = () => { // probably could be more efficient, but checks for 3 in a row.
         if (squareArray[0].mark === squareArray[1].mark && squareArray[0].mark === squareArray[2].mark) {
            gameOver(squareArray[0].mark)
         } else if (squareArray[0].mark === squareArray[3].mark && squareArray[0].mark === squareArray[6].mark) {
            gameOver(squareArray[0].mark)
         } else if (squareArray[0].mark === squareArray[4].mark && squareArray[0].mark === squareArray[8].mark) {
            gameOver(squareArray[0].mark)
         } else if (squareArray[3].mark === squareArray[4].mark && squareArray[3].mark === squareArray[5].mark) {
            gameOver(squareArray[3].mark)
         } else if (squareArray[6].mark === squareArray[4].mark && squareArray[6].mark === squareArray[2].mark) {
            gameOver(squareArray[6].mark)
         } else if (squareArray[6].mark === squareArray[7].mark && squareArray[6].mark === squareArray[8].mark) {
            gameOver(squareArray[6].mark)
         } else if (squareArray[1].mark === squareArray[4].mark && squareArray[1].mark === squareArray[7].mark) {
            gameOver(squareArray[1].mark)
         } else if (squareArray[2].mark === squareArray[5].mark && squareArray[2].mark === squareArray[8].mark) {
            gameOver(squareArray[2].mark)
         } else {
            isTie()
         }
      }
      const isTie = () => {
         if (gameLogic.turnCount === 10) {
            gameOver('tie')
         }
      }

      // it's a valid move if the square in question isn't currently marked
      const isValidMove = (domSquare) => {
         if (gameEnded) {
            return false
         } else {
         let actualSquare = squareArray.find(square => square.id === domSquare.id)
         return actualSquare.mark ? false : true
         }
      }

      const gameOver = result => {
         if (result === 'X') {
            alert(`Game over! ${player1.name} wins!`)
            player1.winCount++
            nextRoundButton.removeAttribute("disabled", "")
            gameEnded = true
            updateWin()
         } else if (result === 'O') {
            alert(`Game over! ${player2.name} wins!`)
            player2.winCount++
            nextRoundButton.removeAttribute("disabled", "")
            gameEnded = true
            updateWin()
         } else if (result === undefined) {
         } else if (result === 'tie') {
            alert(`Game over! It's a tie!`)
            nextRoundButton.removeAttribute("disabled", "")
            gameEnded = true
         }

         //update win counts
         function updateWin () {
            let oldWin1 = document.getElementById("win1")
            let oldWin2 = document.getElementById("win2")
            leftCol.removeChild(oldWin1)
            rightCol.removeChild(oldWin2)
            let win1 = document.createElement('p')
            win1.setAttribute("id", "win1")
            win1.textContent = player1.winCount
            leftCol.appendChild(win1)
            let win2 = document.createElement('p')
            win2.setAttribute("id", "win2")
            win2.textContent = player2.winCount
            rightCol.appendChild(win2)
         }
      }

      let turnCount = 1

      return {isWin, isTie, isValidMove, turnCount}
   })()

   // BEGIN THE GAME
   startButton.addEventListener("click", (e) => {
      startButton.setAttribute("disabled", "")
      player1 = Player(prompt("Enter X's name"), 1)
      let name1 = document.createElement('p')
      name1.textContent = player1.name
      leftCol.appendChild(name1)
      let win1 = document.createElement('p')
      win1.setAttribute("id", "win1")
      win1.textContent = player1.winCount
      leftCol.appendChild(win1)
      console.log(`Created Player ${player1.number}, ${player1.name}, ${player1.winCount}`) //debug
      player2 = Player(prompt("Enter O's name"), 2)
      let name2 = document.createElement('p')
      name2.textContent = player2.name
      rightCol.appendChild(name2)
      let win2 = document.createElement('p')
      win2.setAttribute("id", "win2")
      win2.textContent = player2.winCount
      rightCol.appendChild(win2)
      console.log(`Created Player ${player2.number}, ${player2.name}, ${player2.winCount}`) //debug
      runGame()
   })

   //NEW ROUND
   nextRoundButton.addEventListener('click', (e) => {
      nextRoundButton.setAttribute("disabled", "")
      gameEnded = false
      gameBoard.resetBoard()
      console.log(`${player1.name}: ${player1.winCount}, ${player2.name}: ${player2.winCount}`)
      runGame()
   })

   //game flow
   function runGame() {
      gameBoard.renderBoard()
      console.log(squareArray) //debug
      console.log(`Turn count: ${gameLogic.turnCount}`) //debug
      const gameSquares = document.querySelectorAll('.gameSquare')
      gameSquares.forEach((domSquare) => {
         console.log(domSquare.id + domSquare.mark + gameLogic.isValidMove(domSquare)) // debug
         domSquare.addEventListener('mouseenter', (e) => {gameLogic.isValidMove(domSquare) ? domSquare.style.background = 'green' : domSquare.style.background = 'red'}) //changes moused-over square color based on if the move is valid or not
         domSquare.addEventListener('mouseleave', (e) => {domSquare.style.background = 'white'})
         domSquare.addEventListener('mouseover', (e) => {
            console.log('DOM' + domSquare.id + domSquare.mark)
            let actualSquare = squareArray.find(square => square.id === domSquare.id)
            console.log('Actual' + actualSquare.id + actualSquare.mark)
         })

         // this is each move of the game
         domSquare.addEventListener('click', (e) => {
            if (!gameLogic.isValidMove(domSquare)) { // doesn't let you mark squares that are already marked.
               if (gameEnded) {alert('The game is over. Start a new round.')} else {
               alert('Not a valid move! You can only mark blank spaces.')
               }
            }   else if (gameLogic.turnCount % 2 === 0) { //if turn count is even, it's player 2's turn (i.e.: Os get placed). if not, it's player 1's turn (i.e.: Xs get placed)
               gameBoard.addMark(domSquare, 'O')
               gameLogic.turnCount++
               gameLogic.isWin()
               console.log(`Turn count: ${gameLogic.turnCount}`) //debug
            } else {
               gameBoard.addMark(domSquare, 'X')
               gameLogic.turnCount++
               gameLogic.isWin()
               console.log(`Turn count: ${gameLogic.turnCount}`) //debug
            }
         })
      })
   }



})
