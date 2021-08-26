import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState
} from "react";
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
  const [console, setConsole] = useState([]);

  const addToConsole = useCallback(
    (value) => setConsole((val) => [...val, value]),
    [setConsole]
  );

  return (
    <TicTacToeContext.Provider
      value={{
        board,
        setBoard,
        locked,
        setLocked,
        playerMove,
        setPlayerMove,
        console,
        addToConsole,
        setConsole
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
    setPlayerMove,
    addToConsole
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
    const computerMove = computeComputerMove(board, addToConsole);
    if (!computerMove) {
      return;
    }
    const [x, y] = computerMove;
    const newBoard = JSON.parse(JSON.stringify(board));
    newBoard[x][y] = "O";
    setBoard(newBoard);
    setPlayerMove(true);
  }, [
    board,
    playerMove,
    locked,
    setLocked,
    setPlayerMove,
    setBoard,
    addToConsole
  ]);

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
  const { setBoard, setLocked, setPlayerMove, setConsole } = useContext(
    TicTacToeContext
  );

  const reset = () => {
    setPlayerMove(true);
    setLocked(false);
    setConsole([]);
    setBoard(getNewBoard());
  };

  return { reset };
};

/**
 * Hook zwracający zawartość konsoli
 */
export const useConsole = () => {
  return useContext(TicTacToeContext).console;
};
