import React, { useCallback, useEffect, useState } from 'react';
import { Button, Typography, Grid } from '@mui/material';
import Cell from './Cell';

const cellType = {
  UNKNOWN_CELL: -1,
  BOMB_CELL: -2
};

const neighbors = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1], [0, 1],
  [1, -1], [1, 0], [1, 1]
];

const Board = ({ rows, columns, mines }) => {
  const [cellCounterReveal, setCellCounterReveal] = useState((rows * columns) - mines);
  const [win, setWin] = useState(false);
  const [board, setBoard] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [reset, setReset] = useState(true);

  const initBoard = (rows, columns, mines) => {
    const initialBoard = Array(rows)
      .fill(null)
      .map(() => Array(columns).fill(cellType.UNKNOWN_CELL));

    let mineCount = 0;
    while (mineCount < mines) {
      const randomRow = Math.floor(Math.random() * rows);
      const randomCol = Math.floor(Math.random() * columns);

      if (initialBoard[randomRow][randomCol] === cellType.UNKNOWN_CELL) {
        initialBoard[randomRow][randomCol] = cellType.BOMB_CELL;
        mineCount++;
      }
    }

    setBoard(initialBoard);
  };

  const countBombAroundCell = (newBoard, newRow, newCol) => {
    let numBombAround = 0;
    for (let i = 0; i < neighbors.length; i++) {
      const [x, y] = neighbors[i];
      const newRow1 = newRow + x;
      const newCol1 = newCol + y;
      if (
        newRow1 >= 0 &&
        newRow1 < rows &&
        newCol1 >= 0 &&
        newCol1 < columns &&
        newBoard[newRow1][newCol1] === cellType.BOMB_CELL) {
        numBombAround++;
      }
    }
    return numBombAround;
  };

  const checkBoundary = (newRow, newCol) => {
    return newRow >= 0 && newRow < rows && newCol >= 0 && newCol < columns
  };

  const revealCell = (row, col) => {
    const newBoard = [...board];
    newBoard[row][col] = 0;
    let remove = 1;

    neighbors.map(([x, y]) => {
      const newRow = row + x;
      const newCol = col + y;
      if (checkBoundary(newRow, newCol)) {
        if (newBoard[newRow][newCol] === cellType.BOMB_CELL) {
          newBoard[row][col]++;
        }
        else if(newBoard[newRow][newCol] === cellType.UNKNOWN_CELL){
          const count = countBombAroundCell(newBoard, newRow, newCol);
          newBoard[newRow][newCol] = count;
          remove++;
        }
      }
      return null; // Returning null to satisfy the map function
    });
    setCellCounterReveal(cellCounterReveal - remove);
    setBoard(newBoard);
  };

  const handleCellClick = (rowIndex, colIndex) => {
    const cell = board[rowIndex][colIndex];
    if (cell === cellType.BOMB_CELL) {
      setIsGameOver(true);
    } else if (cell === cellType.UNKNOWN_CELL) {
      revealCell(rowIndex, colIndex);
    }
  };

  const checkWin = useCallback(() => {
    if (cellCounterReveal === 0) {
      setWin(true);
    }
  }, [cellCounterReveal]);

  const checkResetOrGameOver = useCallback(() => {
    if (isGameOver || reset) {
      initBoard(rows, columns, mines);
      setReset(false);
      setIsGameOver(false);
      setWin(false);
      setCellCounterReveal(rows * columns - mines);
    }
  }, [columns, isGameOver, mines, reset, rows]);

  useEffect(() => {
    checkWin();
    checkResetOrGameOver();
  }, [checkResetOrGameOver, checkWin]);

  return (
    <Grid container direction="column" justifyContent="center" alignItems="center">
      <Typography variant="h2" className="game-label" fontWeight="bold" disable={win}>
        Minesweeper Game
      </Typography><br />
      {board.map((row, rowIndex) => (
        <Grid container item key={rowIndex} className="table" justifyContent="center" alignItems="center">
          {row.map((cell, colIndex) => (
            <Cell key={colIndex} value={cell} win={win} onClick={() => handleCellClick(rowIndex, colIndex)} />
          ))}
        </Grid>
      ))}<br />
      {win && <Typography className="game-over">You Win!</Typography>}
      {isGameOver && (<Typography className="game-over">{alert("Game Over")}</Typography>) && (
        <Button variant="contained" color="primary" onClick={() => setIsGameOver(false)}>
          Restart
        </Button>
      )}
      {!reset && !isGameOver ? (<Button variant="contained" color="primary" onClick={() => setReset(true)}>
          Reset
        </Button>) : (<></>)
      }
    </Grid>
  );
};

export default Board;
