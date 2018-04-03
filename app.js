document.addEventListener("DOMContentLoaded", (e) => {
   const startButton = document.getElementById("startButton")
   const gameBoardArea = document.getElementById("gameBoardArea")
   const row1 = document.getElementById("row1")
   const row2 = document.getElementById("row2")
   const row3 = document.getElementById("row3")


   const gameBoard = (() => {
      let squareArray = []
      const createBoard = () => {
         for(let i = 0; i < 3; i++) {
            let newSquare = Square(`a${i + 1}`) //creates row a
            squareArray.push(newSquare)
            console.log(`Created square ${newSquare.id}, mark: ${newSquare.mark}`) //debug
         }
         for(let i = 0; i < 3; i++) {
            let newSquare = Square(`b${i + 1}`) //row b
            squareArray.push(newSquare)
            console.log(`Created square ${newSquare.id}, mark: ${newSquare.mark}`) //debug
         }
         for(let i = 0; i < 3; i++) {
            let newSquare = Square(`c${i + 1}`) // row c
            squareArray.push(newSquare)
            console.log(`Created square ${newSquare.id}, mark: ${newSquare.mark}`) //debug

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
            } else if (squareArray.indexOf(square) < 6 && squareArray.indexOf(square) > 2) {
               row2.appendChild(newDomSquare)
            } else {
               row3.appendChild(newDomSquare)
            }
         })
      }
      //adds an X or O to both the DOM and to the internal value of the square in the squareArray
      const addMark = (domSquare, mark) => {
         const squareMark = document.createElement('h1')
         squareMark.textContent = mark
         domSquare.appendChild(squareMark)
         let clickedSquare = squareArray.find( square => square.id === domSquare.id)
         clickedSquare.mark = mark
         console.log(`Clicked Square ID: ${domSquare.id}, Mark: ${clickedSquare.mark}`) //debug
      }

      return {squareArray, renderBoard, addMark}
   })()

   const Player = (name, number) => {
      return {name, number}
   }

   const Square = (id) => {
      let mark = ""
      return {id, mark}
   }

   const gameLogic = (() => {
      const isWin = () => {}
      const isTie = () => {}
      const isValidMove = () => {}
      let turnCount = 1

      return {isWin, isTie, isValidMove, turnCount}
   })()

   // BEGIN THE GAME
   startButton.addEventListener("click", (e) => {
      startButton.setAttribute("disabled", "")
      player1 = Player(prompt("Enter Player 1's name"), 1)
      console.log(`Created Player ${player1.number}, ${player1.name}`) //debug
      player2 = Player(prompt("Enter Player 2's name"), 2)
      console.log(`Created Player ${player2.number}, ${player2.name}`) //debug
      gameBoard.renderBoard()
      console.log(`Turn count: ${gameLogic.turnCount}`) //debug
      const gameSquares = document.querySelectorAll('.gameSquare')
      gameSquares.forEach((domSquare) => {
         domSquare.addEventListener('mouseenter', (e) => {domSquare.style.background = 'green'})
         domSquare.addEventListener('mouseleave', (e) => {domSquare.style.background = 'white'})

         // this is each move of the game
         domSquare.addEventListener('click', (e) => {
            if (gameLogic.turnCount % 2 === 0) { //if turn count is even, it's player 2's turn (i.e.: Os get placed). if not, it's player 1's turn (i.e.: Xs get placed)
               gameBoard.addMark(domSquare, 'O')
               gameLogic.turnCount++
               console.log(`Turn count: ${gameLogic.turnCount}`) //debug
            } else {
               gameBoard.addMark(domSquare, 'X')
               gameLogic.turnCount++
               console.log(`Turn count: ${gameLogic.turnCount}`) //debug
            }
         })
      })


   })



})
