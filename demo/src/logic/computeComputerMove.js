/**
 * Funkcja obliczająca ruch komputerowego gracza. Powinna zwrócić współrzędne, gdzie połozyć symbol.
 * @param {*[][]} board - tablica przechowująca zawartość planszy
 */
export function computeComputerMove(board) {
  // wykonuje po kolei funkcje; jezeli któraś zwróci wartość, to dalsze nie będą wykonane i zwrócona zostanie jej wartość
  return (
    win(board) ||
    block(board) ||
    fork(board) ||
    blockFork(board) ||
    center(board) ||
    oppositeCorner(board) ||
    emptyCorner(board) ||
    emptySide(board)
  );
}

function win(board) {
  return winOrBlock(board, "O");
}

function block(board) {
  return winOrBlock(board, "X");
}

function fork(board) {
  return checkFork(board, "O");
}

function blockFork(board) {
  const result = checkFork(board, "X");
  if (!result) {
    return null;
  }
  const [x, y] = result;
  // sprawdźmy czy mozemy zmusić przeciwnika do blokowania
  for (let i = 0; i < 3; i++) {
    // najpierw sprawdzamy wiersze i kolumny
    if (!board[i][0] && !board[i][1] && board[i][2] === "O") {
      return [i, 1];
    }
    if (!board[i][0] && board[i][1] === "O" && !board[i][2]) {
      return [i, 0];
    }
    if (board[i][0] === "O" && !board[i][1] && !board[i][2]) {
      return [i, 1];
    }
    if (!board[0][i] && !board[1][i] && board[2][i] === "O") {
      return [1, i];
    }
    if (!board[0][i] && board[1][i] === "O" && !board[2][i]) {
      return [0, i];
    }
    if (board[0][i] === "O" && !board[1][i] && !board[2][i]) {
      return [1, i];
    }
  }
  // sprawdzamy przekątne
  if (!board[0][0] && !board[1][1] && board[2][2] === "O") {
    return [1, 1];
  }
  if (!board[0][0] && board[1][1] === "O" && !board[2][2]) {
    return [2, 2];
  }
  if (board[0][0] === "O" && !board[1][1] && !board[2][2]) {
    return [1, 1];
  }
  if (!board[0][2] && !board[1][1] && board[2][0] === "O") {
    return [1, 1];
  }
  if (!board[0][2] && board[1][1] === "O" && !board[2][0]) {
    return [2, 0];
  }
  if (board[0][2] === "O" && !board[1][1] && !board[2][0]) {
    return [1, 1];
  }
  // jezeli nie, to zwracamy miejsce przecięcia aby zablokować przeciwnika
  return [x, y];
}

function center(board) {
  return !board[1][1] ? [1, 1] : null;
}

function oppositeCorner(board) {
  // sprawdzamy czy na przeciwko zajetego naroznika jest wolny
  if (!board[0][0] && board[2][2] === "X") {
    return [0, 0];
  }
  if (!board[2][2] && board[0][0] === "X") {
    return [2, 2];
  }
  if (!board[0][2] && board[2][0] === "X") {
    return [0, 2];
  }
  if (!board[2][0] && board[0][2] === "X") {
    return [2, 0];
  }
  return null;
}

function emptyCorner(board) {
  // szukamy pusty naroznik
  if (!board[0][0]) {
    return [0, 0];
  }
  if (!board[2][0]) {
    return [2, 0];
  }
  if (!board[2][2]) {
    return [2, 2];
  }
  if (!board[0][2]) {
    return [0, 2];
  }
  return null;
}

function emptySide(board) {
  // szukamy pustych bokow
  if (!board[1][0]) {
    return [1, 0];
  }
  if (!board[2][1]) {
    return [2, 1];
  }
  if (!board[1][2]) {
    return [1, 2];
  }
  // jedyne pole, które pozostaje wolne
  if (!board[0][1]) {
    return [0, 1];
  }
  // błędna sytuacja, nie powinna się zdarzyć
  return null;
}

function winOrBlock(board, symbol) {
  // wygrywanie i blokowanie opieraja sie na tej samej logice wiec uwspolniamy kod
  for (let i = 0; i < 3; i++) {
    // petla sprawdzajaca rownoczesnie kolumny i wiersze
    if (board[i][0] === symbol && board[i][1] === symbol && !board[i][2]) {
      return [i, 2];
    }
    if (board[i][0] === symbol && !board[i][1] && board[i][2] === symbol) {
      return [i, 1];
    }
    if (!board[i][0] && board[i][1] === symbol && board[i][2] === symbol) {
      return [i, 0];
    }
    if (board[0][i] === symbol && board[1][i] === symbol && !board[2][i]) {
      return [2, i];
    }
    if (board[0][i] === symbol && !board[1][i] && board[2][i] === symbol) {
      return [1, i];
    }
    if (!board[0][i] && board[1][i] === symbol && board[2][i] === symbol) {
      return [0, i];
    }
  }
  // sprawdzenie przekatnych
  if (board[0][0] === symbol && board[1][1] === symbol && !board[2][2]) {
    return [2, 2];
  }
  if (board[0][0] === symbol && !board[1][1] && board[2][2] === symbol) {
    return [1, 1];
  }
  if (!board[0][0] && board[1][1] === symbol && board[2][2] === symbol) {
    return [0, 0];
  }
  if (board[0][2] === symbol && board[1][1] === symbol && !board[2][0]) {
    return [2, 0];
  }
  if (board[0][2] === symbol && !board[1][1] && board[2][0] === symbol) {
    return [1, 1];
  }
  if (!board[0][2] && board[1][1] === symbol && board[2][0] === symbol) {
    return [0, 2];
  }
}

function checkFork(board, symbol) {
  // rozgalezienie i rozgalezienie blokujace rowniez opieraja sie na tej samej logice, wiec uwspolniamy

  // dzięki temu zbiorowi, nie będziemy sprawdzać kilkakrotnie tych samych miejsc
  const invalidCols = new Set();

  // będziemy potrzebować informację na temat stanu przekątnych, tutaj sobie to obliczymy
  const { isDiag1Valid, isDiag2Valid } = checkForkDiagonals(board, symbol);

  // właściwa pętla sprawdzająca kolumny i wiersze
  for (let i = 0; i < 3; i++) {
    let rowInvalid = false;
    for (let j = 0; j < 3 && !rowInvalid; j++) {
      // sprawdzamy przeciecia kolumn i wierszy
      // miejsce przeciecia musi byc puste oraz sprawdzamy czy juz wczesniej nie zauwazylismy, ze kolumna nie spelnia wymagan
      if (board[i][j] != null || invalidCols.has(j)) {
        continue;
      }
      let mineCountRow = 0;
      let mineCountCol = 0;
      let emptyCountRow = 0;
      let emptyCountCol = 0;
      for (let k = 0; k < 3; k++) {
        // liczymy czy przecinające się wiersz i kolumna spełniają warunki
        if (board[i][k] === symbol) {
          mineCountRow++;
        } else if (!board[i][k]) {
          emptyCountRow++;
        }
        if (board[k][j] === symbol) {
          mineCountCol++;
        } else if (!board[k][j]) {
          emptyCountCol++;
        }
      }
      if (
        emptyCountRow === 2 &&
        emptyCountCol === 2 &&
        mineCountCol === 1 &&
        mineCountRow === 1
      ) {
        return [i, j];
      }
      if (emptyCountRow !== 2 && mineCountRow !== 1) {
        // wiersz jest nieprawidlowy, wiec go oznaczamy zeby nie sprawdzac go ponownie
        rowInvalid = true;
      }
      if (emptyCountCol !== 2 && mineCountCol !== 1) {
        // kolumna jest nieprawidlowa, wiec ja oznaczamy zeby nie sprawdzac jej ponownie
        invalidCols.add(j);
      }
    }
    // wykorzystujemy zewnętrzną pętlę, aby wykonać iteracje z przekątnymi, zarówno dla kolumn jak i wierszy
    // sprawdzamy przeciecia wiersza z przekatnymi
    if (!rowInvalid) {
      if (isDiag1Valid && !board[i][i]) {
        return board[i][i];
      }
      if (isDiag2Valid && !board[i][2 - i]) {
        return board[i][2 - i];
      }
    }
    // sprawdzamy przeciecia kolumny z przekatnymi
    if (!invalidCols.has(i)) {
      if (isDiag1Valid && !board[i][i]) {
        return board[i][i];
      }
      if (isDiag2Valid && !board[2 - i][i]) {
        return board[2 - i][i];
      }
    }
  }

  if (!board[1][1] && isDiag1Valid && isDiag2Valid) {
    // sprawdzamy przecięcie przekątnych
    return [1, 1];
  }

  return null;
}

function checkForkDiagonals(board, symbol) {
  // funkcja pomocnicza do sprawdzenia przekątnych, czy spełniają warunki dla rozgałęzienia
  let emptyCount1 = 0;
  let emptyCount2 = 0;
  let mineCount1 = 0;
  let mineCount2 = 0;

  for (let i = 0; i < 3; i++) {
    if (!board[i][i]) {
      emptyCount1++;
    } else if (board[i][i] === symbol) {
      mineCount1++;
    }
    if (!board[i][2 - i]) {
      emptyCount2++;
    } else if (board[i][2 - i] === symbol) {
      mineCount2++;
    }
  }

  return {
    isDiag1Valid: emptyCount1 === 2 && mineCount1 === 1,
    isDiag2Valid: emptyCount2 === 2 && mineCount2 === 1
  };
}
