import { createContext, useContext, useEffect, useState } from "react";
import { computeComputerMove } from "../logic/computeComputerMove";
import { getEmptyBoard } from "../logic/getEmptyBoard";
import { hasGameEnded } from "../logic/hasGameEnded";

const getNewBoard = () => getEmptyBoard(3, null);

const TicTacToeContext = createContext();

/**
 * Komponent przechowujący stan rozgrywki
 */
export const TicTacToeContextProvider = ({ children }) => {
  const [board, setBoard] = useState(getNewBoard());
  const [locked, setLocked] = useState(false);
  const [playerMove, setPlayerMove] = useState(true);

  return (
    <TicTacToeContext.Provider
      value={{
        board,
        setBoard,
        locked,
        setLocked,
        playerMove,
        setPlayerMove
      }}
    >
      {children}
    </TicTacToeContext.Provider>
  );
};

/**
 * Hook zwracający planszę oraz logikę naciskania komórki
 */
export const useBoard = () => {
  const {
    board,
    locked,
    playerMove,
    setBoard,
    setLocked,
    setPlayerMove
  } = useContext(TicTacToeContext);

  const handleCellClick = (x, y) => () => {
    if (!playerMove || board[x][y] != null) {
      return;
    }
    const newBoard = JSON.parse(JSON.stringify(board));
    newBoard[x][y] = "X";
    setBoard(newBoard);
    setPlayerMove(false);
  };

  useEffect(() => {
    const result = hasGameEnded(board);
    if (result && !locked) {
      setLocked(true);
      alert(`Wygrał ${result}`);
      return;
    }
    if (playerMove || locked) {
      return;
    }
    const computerMove = computeComputerMove(board);
    if (!computerMove) {
      return;
    }
    const [x, y] = computerMove;
    const newBoard = JSON.parse(JSON.stringify(board));
    newBoard[x][y] = "O";
    setBoard(newBoard);
    setPlayerMove(true);
  }, [board, playerMove, locked, setLocked, setPlayerMove, setBoard]);

  return { board, handleCellClick };
};

/**
 * Hook zwracający informację, czy komórki powinny być zablokowane
 */
export const useIsLocked = () => {
  return useContext(TicTacToeContext).locked;
};

/**
 * Hook zwracający logikę dla kontrolek spod planszy
 */
export const useFieldControls = () => {
  const { setBoard, setLocked, setPlayerMove } = useContext(TicTacToeContext);

  const reset = () => {
    setPlayerMove(true);
    setLocked(false);
    setBoard(getNewBoard());
  };

  return { reset };
};
