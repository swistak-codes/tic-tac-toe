/**
 * Funkcja obliczająca ruch komputerowego gracza. Powinna zwrócić współrzędne, gdzie połozyć symbol.
 * @param {*[][]} board - tablica przechowująca zawartość planszy
 * @param {*} log - funkcja do logowania informacji w konsoli
 */
export function computeComputerMove(board, log) {
  log("-- Szukam nowego ruchu --");
  // wykonuje po kolei funkcje; jezeli któraś zwróci wartość, to dalsze nie będą wykonane i zwrócona zostanie jej wartość
  return (
    win(board, log) ||
    block(board, log) ||
    fork(board, log) ||
    blockFork(board, log) ||
    center(board, log) ||
    oppositeCorner(board, log) ||
    emptyCorner(board, log) ||
    emptySide(board, log)
  );
}

function win(board, log) {
  log("1. Wygraj - sprawdzam");
  const result = winOrBlock(board, "O", log);
  if (!result) {
    log("Przechodzę dalej");
  } else {
    log(`Wygrywam stawiając kółko na (${result})`);
  }
  return result;
}

function block(board, log) {
  log("2. Zablokuj - sprawdzam");
  const result = winOrBlock(board, "X", log);
  if (!result) {
    log("Przechodzę dalej");
  } else {
    log(`Blokuję stawiając kółko na (${result})`);
  }
  return result;
}

function fork(board, log) {
  log("3. Zrób rozgałęzienie - sprawdzam");
  const result = checkFork(board, "O", log);
  if (!result) {
    log("Przechodzę dalej");
  } else {
    log(`Robię rozgałęzienie stawiając kółko na (${result})`);
  }
  return result;
}

function blockFork(board, log) {
  log("4. Zrób blokujące rozgałęzienie - sprawdzam");
  const result = checkFork(board, "X", log);
  if (!result) {
    log("Przechodzę dalej");
    return null;
  }
  log(`Wolny punkt przecięcia na (${result}), sprawdzam dalej`);
  // sprawdźmy czy mozemy zmusić przeciwnika do blokowania
  const twoInARowResult = checkTwoInARow(board);
  if (twoInARowResult) {
    log(`Zmuszam do blokady, stawiając na (${result})`);
    return twoInARowResult;
  }
  // jezeli nie, to zwracamy miejsce przecięcia aby zablokować przeciwnika
  log("Blokuję rozgałęzienie stawiając na punkcie przecięcia");
  return result;
}

function center(board, log) {
  log("5. Zagraj środek - sprawdzam");
  const result = !board[1][1] ? [1, 1] : null;

  if (result) {
    log("Gram na środku");
  } else {
    log("Przechodzę dalej");
  }

  return result;
}

function oppositeCorner(board, log) {
  log("6. Zagraj przeciwny narożnik - sprawdzam");
  // sprawdzamy czy na przeciwko zajetego naroznika jest wolny
  let result = null;
  if (!board[0][0] && board[2][2] === "X") {
    result = [0, 0];
  } else if (!board[2][2] && board[0][0] === "X") {
    result = [2, 2];
  } else if (!board[0][2] && board[2][0] === "X") {
    result = [0, 2];
  } else if (!board[2][0] && board[0][2] === "X") {
    result = [2, 0];
  }

  if (result) {
    log(`Gram na przeciwnym narożniku (${result})`);
  } else {
    log("Przechodzę dalej");
  }

  return null;
}

function emptyCorner(board, log) {
  log("7. Zagraj pusty narożnik - sprawdzam");
  // szukamy pusty naroznik
  let result = null;
  if (!board[0][0]) {
    result = [0, 0];
  } else if (!board[2][0]) {
    result = [2, 0];
  } else if (!board[2][2]) {
    result = [2, 2];
  } else if (!board[0][2]) {
    result = [0, 2];
  }

  if (result) {
    log(`Gram na pustym narożniku (${result})`);
  } else {
    log("Przechodzę dalej");
  }

  return null;
}

function emptySide(board, log) {
  log("8. Zagraj pusty bok - sprawdzam");
  // szukamy pustych bokow
  let result = null;
  if (!board[1][0]) {
    result = [1, 0];
  } else if (!board[2][1]) {
    result = [2, 1];
  } else if (!board[1][2]) {
    result = [1, 2];
  }
  // jedyne pole, które pozostaje wolne
  else if (!board[0][1]) {
    result = [0, 1];
  }

  if (result) {
    log(`Gram pusty bok (${result})`);
    return result;
  } else {
    // błędna sytuacja, nie powinna się zdarzyć
    log("Brak ruchu!");
    return null;
  }
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

function checkTwoInARow(board) {
  // sprawdzenie czy mozemy utworzyć sytuację dwa-pod-rząd
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

  return null;
}
