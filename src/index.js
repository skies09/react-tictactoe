import React, { useState } from 'react';
import ReactDom from 'react-dom';
import './index.css';


// const squareStyles = {
//   backgroundColor: 'purple',
//   margin: 10,
//   padding: 20,
// };

const Square = (props) => {
  // const [value, setValue] = useState(null);

  return (
    // <div style={squareStyles}>
    <button className='square'
      onClick={props.onClickEvent}
    >
      {props.value}
    </button>
  );
};

// function, board component
// this is jsx
const Board = () => {
  const initialSquares = Array(9).fill(null);
  const [squares, setSquares] = useState(initialSquares);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClickEvent = (i) => {
    const newSquares = [...squares];
    const winnerDeclared = Boolean(calculateWinner(newSquares));
    const squareFilled = Boolean(newSquares[i]);
    if (winnerDeclared || squareFilled){
      return;
    }

    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares)
    setXIsNext(!xIsNext);
  }

  const renderSquare = (i) => {
    return (
      <Square value={squares[i]}
        onClickEvent={() => handleClickEvent(i)}
      />
    );
  };
  const winner = calculateWinner(squares);
  const status = winner ?
    `Winner: ${winner}` :
    `Next Player: ${xIsNext ? 'X' : 'O'}`
  return (
    <div style={{
      backgroundColor: 'skyblue',
      margin: 10,
      padding: 20,
    }}>
      <div className='status'>
        {status}
      </div>
      <div className='board-row'>
        {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
        {/* <Square /><Square /><Square /> */}
      </div>
      <div className='board-row'>
        {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
        {/* <Square /><Square /><Square /> */}
      </div>
      <div className='board-row'>
        {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
        {/* <Square /><Square /><Square /> */}
      </div>
    </div>
  );
};

// Header
const Game = () => {
  return (
    <div className='game'>
      Tic-Tac-Toe
      <Board />
    </div>
  );
};

// target container
ReactDom.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6], // diagonals
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}