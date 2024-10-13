import React, { useState } from 'react';
import './App.css';

const initialBoardState = () => Array(9).fill(null).map(() => Array(9).fill(null));

const checkWinner = (board) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

const SmallGrid = ({ squares, onClick }) => {
  return (
    <div className="small-grid">
      {squares.map((square, i) => (
        <button key={i} className="square" onClick={() => onClick(i)}>
          {square}
        </button>
      ))}
    </div>
  );
};

const App = () => {
  const [bigBoard, setBigBoard] = useState(initialBoardState());
  const [isXNext, setIsXNext] = useState(true);
  const [activeSmallGrid, setActiveSmallGrid] = useState(null); // Track active grid

  const handleClick = (bigIndex, smallIndex) => {
    if (bigBoard[bigIndex][smallIndex] || checkWinner(bigBoard[bigIndex])) return;

    const newBoard = bigBoard.map((grid, index) => (
      index === bigIndex ? grid.map((square, i) => (i === smallIndex ? (isXNext ? 'X' : 'O') : square)) : grid
    ));

    setBigBoard(newBoard);
    setIsXNext(!isXNext);

    const nextActiveSmallGrid = newBoard[smallIndex].some(sq => sq === null) ? smallIndex : null;
    setActiveSmallGrid(nextActiveSmallGrid);
  };

  const renderSmallGrid = (bigIndex) => {
    const winner = checkWinner(bigBoard[bigIndex]);
    return winner ? (
      <div className="small-grid-winner">{winner}</div>
    ) : (
      <SmallGrid squares={bigBoard[bigIndex]} onClick={(i) => handleClick(bigIndex, i)} />
    );
  };

  return (
    <div className="big-grid">
      {bigBoard.map((_, i) => (
        <div key={i} className={`big-grid-item ${activeSmallGrid === null || activeSmallGrid === i ? 'active' : 'inactive'}`}>
          {renderSmallGrid(i)}
        </div>
      ))}
    </div>
  );
};

export default App;

