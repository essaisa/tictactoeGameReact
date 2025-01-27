import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i){
    // IF THERE IS A WINNER OR IF A SQUARE IS FILLED
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    
    const nextSquares = squares.slice();
    if (xIsNext)
      {
        nextSquares[i] = "X";
      }  
    else
      {
        nextSquares[i] = "O";
      }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>

      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>

      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    // ALL WINNING COMBINATIONS

    // TOP, MIDDLE, BOTTOM
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // LEFT, MIDDLE, RIGHT COLUMN
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // DIAGONALS
    [0, 4, 8],
    [2, 4, 6],
  ];
  // ITERATE THROUGH ALL OF COMBINATIONS
  for (let i = 0; i < lines.length; i++) {
    // DESTRUCTURE ARRAY SO EACH GET VALUE OF EACH SQUARE SO WE CAN SO IF THEY ARE EQUAL TO EACH OTHER; EG IF WE ARE LOOKING AT LINES[5], A = 2, B = 5, C = 8
    const [a, b, c] = lines[i];
    // IF SQUARES[A] IS FILLED AND A = B AND A = C
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

