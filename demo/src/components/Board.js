/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { useBoard } from "./TicTacToeContext";
import { Cell } from "./Cell";

/**
 * Komponent wyświetlający planszę
 */
export const Board = () => {
  const { board, handleCellClick } = useBoard();

  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: repeat(${board.length}, 1fr);
        grid-column-gap: 1px;
        grid-row-gap: 1px;
        width: calc((2em + 4px) * ${board.length});
      `}
    >
      {board.map((row, x) =>
        row.map((cell, y) => (
          <Cell
            content={cell}
            onClick={handleCellClick(x, y)}
            key={`${x}${y}`}
          />
        ))
      )}
    </div>
  );
};
