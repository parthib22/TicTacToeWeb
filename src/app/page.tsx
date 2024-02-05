"use client";
import React, { useState } from "react";

function Square({ value, onSquareClick, onBgCheck }: any) {
  // console.log(onBgCheck);
  return (
    <button
      className="square"
      onClick={onSquareClick}
      style={{ background: onBgCheck }}
    >
      {value}
    </button>
  );
}

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [check, setCheck] = useState(true);

  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const [background, setBackground] = useState(Array(9).fill("white"));

  function calculateWinner(squares: number[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
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
        return squares[a];
      }
    }
    return null;
  }

  function handleClick(index: any) {
    if (squares[index] || calculateWinner(squares) || !player1 || !player2)
      return;
    const nextSquares = squares.slice();
    const nextBackground = background.slice();
    if (check) {
      nextSquares[index] = "X";
      nextBackground[index] = "orangered";
    } else {
      nextSquares[index] = "O";
      nextBackground[index] = "teal";
    }
    setCheck(!check);
    setSquares(nextSquares);
    setBackground(nextBackground);
  }

  const winner = calculateWinner(squares);
  let status;
  if (player1 && player2) {
    if (winner && typeof winner != "number") {
      status = "Winner: " + (winner === "X" ? player1 : player2);
    } else {
      status = "Next Turn: " + (check ? player1 : player2);
    }
  } else {
    status = "write player names to start...";
  }

  return (
    <div className="ttt">
      <div className="ttt-status">
        <span>
          <label
            htmlFor="playerX"
            className=""
            style={{ background: "orangered" }}
          >
            X
          </label>
          <input
            id="playerX"
            value={player1}
            placeholder="Player X"
            spellCheck={false}
            onChange={(e) => setPlayer1(e.target.value)}
          />
        </span>
        <span>
          <label htmlFor="playerO" className="" style={{ background: "teal" }}>
            O
          </label>
          <input
            id="playerO"
            value={player2}
            placeholder="Player O"
            spellCheck={false}
            onChange={(e) => setPlayer2(e.target.value)}
          />
        </span>
        <div className="status">{status}</div>
      </div>
      <div className="ttt-board">
        <div className="board-row">
          <Square
            value={squares[0]}
            onSquareClick={() => handleClick(0)}
            onBgCheck={background[0]}
          />
          <Square
            value={squares[1]}
            onSquareClick={() => handleClick(1)}
            onBgCheck={background[1]}
          />
          <Square
            value={squares[2]}
            onSquareClick={() => handleClick(2)}
            onBgCheck={background[2]}
          />
        </div>
        <div className="board-row">
          <Square
            value={squares[3]}
            onSquareClick={() => handleClick(3)}
            onBgCheck={background[3]}
          />
          <Square
            value={squares[4]}
            onSquareClick={() => handleClick(4)}
            onBgCheck={background[4]}
          />
          <Square
            value={squares[5]}
            onSquareClick={() => handleClick(5)}
            onBgCheck={background[5]}
          />
        </div>
        <div className="board-row">
          <Square
            value={squares[6]}
            onSquareClick={() => handleClick(6)}
            onBgCheck={background[6]}
          />
          <Square
            value={squares[7]}
            onSquareClick={() => handleClick(7)}
            onBgCheck={background[7]}
          />
          <Square
            value={squares[8]}
            onSquareClick={() => handleClick(8)}
            onBgCheck={background[8]}
          />
        </div>
        <div className="ttt-reset-parent">
          <button
            className={`ttt-reset ${
              squares.some((element) => element !== null) ? "reset-active" : ""
            }`}
            onClick={() => {
              setSquares(Array(9).fill(null));
              setBackground(Array(9).fill("white"));
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Board;
