/**
 * Sprawdza, czy któryś gracz wygrał
 * @param {*[][]} board - plansza gry
 */
export function hasGameEnded(board) {
  return checkDiagonals(board) || checkRows(board) || checkColumns(board);
}

function checkDiagonals(board) {
  return (board[0][0] === board[1][1] && board[1][1] === board[2][2]) ||
    (board[0][2] === board[1][1] && board[1][1] === board[2][0])
    ? board[1][1]
    : null;
}

function checkRows(board) {
  for (let i = 0; i < 3; i++) {
    if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
      return board[0][i];
    }
  }
  return null;
}

function checkColumns(board) {
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
      return board[i][0];
    }
  }
  return null;
}
