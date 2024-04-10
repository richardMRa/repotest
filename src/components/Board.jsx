import { useState } from "react"
import Square from "./Square"
import { WinnerModal } from "./WinnerModal"
import confetti from "canvas-confetti"
const TURNS = {
    x: '✖️',
    o: '⭕'
}



export default function Board() {
     
    const [boardState, setBoardState] = useState(()=> {
        const boardFromStorage = localStorage.getItem('board')
        if (boardFromStorage) return JSON.parse(boardFromStorage)
        return Array(9).fill(null)
    })

    const [turn, setTurn] = useState(()=> {
        const turnFromStorage = localStorage.getItem('turn')
        return turnFromStorage ?? TURNS.x
    })

    const [winner, setWinner] = useState(null)

    const WINNER_COMBOS = [
        [0,1,2], 
        [3,4,5], 
        [6,7,8],
        [0,3,6], 
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    
    const checkWinner = (board) => {
        for (const combo of WINNER_COMBOS) {
            const [a,b,c] = combo
            if (
                board[a] && 
                board[a] === board[b] &&
                board[a] === board[c]
            ) {
                return board[a] 
            }
        }

        return null
    }

    const checkEndGame = (newBoard) => {
        return newBoard.every((square) => square !== null)
    }

    const updateBoard = (index) => {

        if(boardState[index] || winner) return 
                
        //Update board
        const newBoard = [...boardState]
        newBoard[index] = turn
        setBoardState(newBoard)
        //Update turn
        const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x
        setTurn(newTurn)
        //Save game to localstorage
        window.localStorage.setItem('board', JSON.stringify(newBoard))
        window.localStorage.setItem('turn', newTurn)
        
        //check winner
        const newWinner = checkWinner(newBoard)

        if(newWinner !== null) {
            setWinner(newWinner)
            confetti()
        } else if (checkEndGame(newBoard)){
            setWinner(false)
        }
    }

    const resetBoard = () => {
        setBoardState(Array(9).fill(null))
        setWinner(null)
        setTurn(TURNS.x)
        window.localStorage.removeItem('turn')
        window.localStorage.removeItem('board')
    }

    return (
        <main className="board">
            <h1>Tic Tac Toe</h1>
            <button onClick={resetBoard}>Reset</button>
            <section className="game">
                {
                    boardState.map((_, index) => {
                        return (
                            <Square
                                key={`square:${index}`}
                                index={index}
                                updateBoard={updateBoard}
                            >
                                {boardState[index]}
                            </Square>
                        )
                    })
                }

            </section>
            <section className="turn">
                <Square isSelected={turn === TURNS.x}>{TURNS.x}</Square>
                <Square isSelected={turn === TURNS.o}>{TURNS.o}</Square>
            </section>
            <WinnerModal winner={winner} resetBoard={resetBoard}/>
        </main>
    )
}