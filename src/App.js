import { useState } from "react";

// Square component to represent each cell of the board
function Square({ value, onSquareClick, highlights }) {
  return (
    <button className={"square " + highlights} onClick={onSquareClick}>
      {value}
    </button>
  );
}

// Board component to represent the entire board
function Board({ squares, xIsNext, onPlay, toggle, winnerInfo }) {
  // Handles the click event for each square
  function handleClick(i) {
    const nextSquares = squares.slice();
    // Ignore the click if the square is already filled or there's a winner
    if (nextSquares[i] || (winnerInfo && winnerInfo[0])) {
      return;
    }
    nextSquares[i] = xIsNext ? "X" : "O";
    let row = Math.floor(i / 3);
    let col = i % 3;
    onPlay(nextSquares, [row, col]);
  }

  // Builds the board with Square components and highlights winning squares
  function buildBoard() {
    let winningLines = [];
    if (winnerInfo && winnerInfo[0]) {
      winningLines = winnerInfo[1];
    }
    const theBoard = [];
    theBoard.push(<div className="status">{status}</div>);
    for (let i = 0; i < 3; i++) {
      const row = [];
      for (let j = 0; j < 3; j++) {
        let index = i * 3 + j;
        if (winningLines.includes(index)) {
          row.push(
            <Square
              value={squares[index]}
              onSquareClick={() => handleClick(index)}
              highlights={"highlight"}
            />
          );
        } else {
          row.push(
            <Square
              value={squares[index]}
              onSquareClick={() => handleClick(index)}
              highlights={""}
            />
          );
        }
      }
      theBoard.push(<div className="board-row">{row}</div>);
    }
    return theBoard;
  }

  // Determine the status message
  let status;
  let winner = winnerInfo ? winnerInfo[0] : null;
  if (winner === "D") {
    status = "Game is a draw.";
  } else if (winner) {
    status = winner + " is the winner.";
  } else {
    status = "Player " + (xIsNext ? "X" : "O") + " turn";
  }

  return <>{buildBoard()}</>;
}

// Main Game component to manage state and render the game
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [locationHistory, setLocationHistory] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  // Generate the list of moves
  const moves = history.map((squares, move) => {
    const actualMove = isAscending ? move : history.length - 1 - move;
    let description;
    if (actualMove === 0 && currentMove === actualMove) {
      // At game start
      description = "You are at game start ";
      return <li key={actualMove}>{description}</li>;
    } else if (currentMove === actualMove) {
      // Somewhere in the middle
      description = "You are at move " + actualMove;
      return <li key={actualMove}>{description}</li>;
    } else if (actualMove === 0) {
      // If not at game start and in some other move
      description = "Go to game start";
    } else {
      let [row, col] = locationHistory[actualMove - 1];
      description =
        "Go to move " + actualMove + " Location: ( " + row + "," + col + " )";
    }
    return (
      <li key={actualMove}>
        <button onClick={() => jumpTo(actualMove)}>{description}</button>
      </li>
    );
  });

  // Calculate the winner
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return [squares[a], lines[i]]; // a b c are the winning squares
      }
    }
    const notNull = (currentSquare) => currentSquare != null;
    if (squares.every(notNull)) {
      return ["D", []]; // Return "D" for draw
    }
    return null;
  }

  // Handle play action
  function handlePlay(nextSquares, location) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    const nextLocationHistory = [
      ...locationHistory.slice(0, currentMove),
      location,
    ];
    setLocationHistory(nextLocationHistory);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  // Jump to a specific move
  function jumpTo(move) {
    setCurrentMove(move);
  }

  // Toggle move history sorting
  function toggleHistory() {
    setIsAscending(!isAscending);
  }

  // Reset the game
  function resetGame() {
    setCurrentMove(0);
    setHistory([Array(9).fill(null)]);
    setLocationHistory([]);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={currentSquares}
          xIsNext={xIsNext}
          onPlay={handlePlay}
          toggle={toggleHistory}
          winnerInfo={calculateWinner(currentSquares)}
          locations={locationHistory}
        />
      </div>
      <div className="game-info">
        <button onClick={toggleHistory}>
          {isAscending ? "Sort Descending" : "Sort Ascending"}
        </button>
        <button onClick={resetGame}>Reset Game</button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
