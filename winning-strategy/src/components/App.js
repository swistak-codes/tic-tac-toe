/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Board } from "./Board";
import { TicTacToeContextProvider } from "./TicTacToeContext";
import { Controls } from "./Controls";
import { Console } from "./Console";

/**
 * Główny komponent aplikacji
 */
export const App = () => {
  return (
    <TicTacToeContextProvider>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: sans-serif;
          text-align: center;
        `}
      >
        <h1>Kółko i krzyżyk</h1>
        <Board />
        <Controls />
        <Console />
      </div>
    </TicTacToeContextProvider>
  );
};
