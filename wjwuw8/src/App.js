import React from 'react';
import { useState } from 'react';
function Square({ value, onSquareClick }) {
  return (
   <button className="square" onClick = {onSquareClick}>
    {value}
    </button>
    );
} 

function Board( {xIsNext, squares, onPlay}) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext){
      nextSquares[i] = "X";
    }
    else {
      nextSquares[i] = "O";
    }
    
    onPlay(nextSquares);
  }
  const winner = calculateWinner(squares);
  let status;
  if (winner === 'Tie') {
    status = "The game is a tie";
  }
  else if (winner) {
    status = "Winner: " + winner;
  }
  
  else if (winner === null) {
    status = "Next player: " + (xIsNext ? "X": "O")
  }
  return (
  <React.Fragment>
    <div className = "status">{status}</div>
    <div className = "board-row">
        <Square value = {squares[0]} onSquareClick = {() => handleClick(0)}/>
        <Square value = {squares[1]} onSquareClick = {() => handleClick(1)}/>
        <Square value = {squares[2]} onSquareClick = {() => handleClick(2)}/>
    </div>
    <div className = "board-row">
        <Square value = {squares[3]} onSquareClick = {() => handleClick(3)}/>
        <Square value = {squares[4]} onSquareClick = {() => handleClick(4)}/>
        <Square value = {squares[5]} onSquareClick = {() => handleClick(5)}/>
    </div>
    <div className = "board-row">
        <Square value = {squares[6]} onSquareClick = {() => handleClick(6)}/>
        <Square value = {squares[7]} onSquareClick = {() => handleClick(7)}/>
        <Square value = {squares[8]} onSquareClick = {() => handleClick(8)}/>
    </div>
  </React.Fragment>
  );
}
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove %2 ===0;
  const [isBold, setIsBold] = useState(false);
  const bold = {
    fontWeight: 'bold'
  };
  const notBold = {
    fontWeight: 'normal'
  };
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove +1), nextSquares]
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length-1);
  }
  function jumpTo(nextMove){
    setIsBold(isBold => !isBold);
    setCurrentMove(nextMove);
    console.log('btn click');
 
  }
  const moves = history.map((squares,move) => {
    let description;
    if (move>0) {
      description = 'Go to move #' + move;
    }
    else {
      description = 'Go to game start';
    }
    return (
      <li key = {move}>
        {/* <span style = {{fontWeight: isBold ? 'bold' : 'normal'}}>  */}
        {/* <button onClick = {() => jumpTo(move)}>{description}</button> */}
        <button style={isBold ? bold : notBold} onClick = {() => jumpTo(move)}>{description}</button>
        {/* </span> */}
      </li>
    );
  });
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext = {xIsNext} squares = {currentSquares} onPlay = {handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  if(squares[0] && squares[1] && squares[2] && squares[3] && squares[4] && squares[5] && squares[6] && squares[7] && squares[8]) {
    return 'Tie';
  }
  return null;
}
