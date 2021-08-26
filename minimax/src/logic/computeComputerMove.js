import { hasGameEnded } from "./hasGameEnded";

/**
 * Funkcja obliczająca ruch komputerowego gracza. Powinna zwrócić współrzędne, gdzie połozyć symbol.
 * @param {*[][]} board - tablica przechowująca zawartość planszy
 * @param {*} log - funkcja do logowania informacji w konsoli
 */
export function computeComputerMove(board, log) {
  log("-- Szukam nowego ruchu --");
  // tworzymy wezel na podstawie aktualnego stanu planszy
  const node = new TreeNode(JSON.parse(JSON.stringify(board)), null);
  nodeCount = 0;
  generateNextMoves(node, "O");
  log(`Wygenerowano ${nodeCount} możliwych stanów gry`);
  // szukamy następnego ruchu algorytmem Minimax
  const foundNode = minimax(node, true, 0, log);
  // zwracamy ruch ze znalezionego najlepszego wezla; jezeli takiego nie ma, to zwracamy pustą wartość
  return foundNode ? foundNode.move : null;
}

/**
 * Funkcja wyznaczająca
 * @param {*} node - wezel dla ktorego uruchamiamy algorytm
 * @param {*} shouldMax - true jesli liczymy wartosc max, false gdy min
 * @param {*} depth - głębokość rekursji
 * @param {*} log - funkcja do logowania informacji w konsoli
 */
function minimax(node, shouldMax, depth, log) {
  if (node.children.length === 0) {
    // dojechalismy do liscia drzewa, wiec obliczamy jego wartosc
    if (depth === 0) {
      // jezeli nie bylo to wywolanie rekurencyjne, zwrocmy pusta wartosc
      return null;
    }
    // wykorzystamy funkcje sprawdzajaca zwyciezce gry do podania wartosci planszy
    const whoWon = hasGameEnded(node.board);
    switch (whoWon) {
      case "X":
        return Number.NEGATIVE_INFINITY;
      case "O":
        return Number.POSITIVE_INFINITY;
      default:
        return 0;
    }
  }

  // zmienne pomocnicze do przechowania max lub min wartosci oraz odpowiadajacego jej wezla
  let foundNode = null;
  let value = shouldMax ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;

  // iterujmey po kolei po dzieciach wezla
  for (const child of node.children) {
    // wywolujemy rekursywnie minimax, aby poznac wartosc wezla
    const childValue = minimax(child, !shouldMax, depth + 1, log);
    if (shouldMax) {
      // w tym przypadku maksymalizujemy
      if (childValue > value) {
        value = childValue;
        foundNode = child;
      }
    } else {
      // przypadek minimalizacji
      if (childValue < value) {
        value = childValue;
        foundNode = child;
      }
    }
  }

  if (depth > 0) {
    // jezeli jestesmy wewnatrz wywolania rekursywnego, przekazmy dalej wartosc
    return value;
  } else {
    log(`Wybrano ruch ${foundNode.move} o wartości ${value}`);
    // jezeli nie jestesmy w wywolaniu rekursywnym, zwrocmy wezel
    return foundNode;
  }
}

// ponizej znajduje sie część związana z generowaniem drzewa stanu gry

/**
 * Klasa pomocnicza do reprezentacji drzewa
 */
class TreeNode {
  constructor(board, move) {
    this.board = board;
    this.move = move;
    this.children = [];
  }

  addChild(node) {
    if (!(node instanceof TreeNode)) {
      return;
    }
    this.children.push(node);
  }
}

/**
 * Obiekt ktory pomoze nam zdecydowac, jaki gracz ma nastepny ruch
 */
const nextPlayer = {
  X: "O",
  O: "X"
};

/**
 * Mapa przechowujaca wezly drzewa do szybszego odnajdowania. Kluczem jest zapis planszy w formacie JSON.
 */
// const knownStates = new Map();
let nodeCount = 0;

function generateNextMoves(node, player) {
  // iterujemy po kolei po polach planszy
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (node.board[i][j] != null) {
        // jezeli pole jest zajete, przechodzimy do nastepnego pola
        continue;
      }
      // kopiujemy plansze
      const newBoard = JSON.parse(JSON.stringify(node.board));
      // wykonujemy ruch
      newBoard[i][j] = player;
      // tworzymy nowy obiekt wezla drzewa
      const newNode = new TreeNode(newBoard, [i, j]);
      // dodajemy go jako dziecko dla aktualnego wezla
      node.addChild(newNode);
      nodeCount++;
      // wchodzimy rekurencyjnie wglab, aby odkryc potencjalne kolejne ruchy
      generateNextMoves(newNode, nextPlayer[player]);
    }
  }
}
