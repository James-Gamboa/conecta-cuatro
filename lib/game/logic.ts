import {
  BOARD_COLS,
  BOARD_ROWS,
  type BoardMatrix,
  type CellValue,
  type GameState,
  type PlayerId,
  type WinPositions,
} from "./types"

const createEmptyBoard = (): BoardMatrix =>
  Array.from({ length: BOARD_COLS }, () =>
    Array.from({ length: BOARD_ROWS }, () => 0 as CellValue)
  )

const transposeMatrix = (matrix: BoardMatrix): BoardMatrix => {
  const transposed = createEmptyBoard()
  for (let row = 0; row < matrix.length; row += 1) {
    for (let col = 0; col < row; col += 1) {
      const tmp = matrix[row][col]
      transposed[row][col] = matrix[col][row]
      transposed[col][row] = tmp
    }
  }
  return transposed
}

export const createInitialBoard = (): BoardMatrix =>
  transposeMatrix(createEmptyBoard())

export const createInitialGameState = (): GameState => ({
  board: createInitialBoard(),
  turn: 0,
  status: "playing",
  winner: null,
  winningCells: null,
})

const findLowestEmptyRow = (column: CellValue[]): number => {
  for (let row = column.length - 1; row >= 0; row -= 1) {
    if (column[row] === 0) {
      return row
    }
  }
  return -1
}

const checkFourInLine = (
  board: BoardMatrix,
  player: PlayerId
): WinPositions | null => {
  const size = board.length

  for (let col = 0; col < size; col += 1) {
    for (let row = 0; row < size - 3; row += 1) {
      if (
        board[col][row] === player &&
        board[col][row + 1] === player &&
        board[col][row + 2] === player &&
        board[col][row + 3] === player
      ) {
        return {
          rows: [row, row + 1, row + 2, row + 3],
          cols: [col, col, col, col],
        }
      }
    }
  }

  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size - 3; col += 1) {
      if (
        board[col][row] === player &&
        board[col + 1][row] === player &&
        board[col + 2][row] === player &&
        board[col + 3][row] === player
      ) {
        return {
          rows: [row, row, row, row],
          cols: [col, col + 1, col + 2, col + 3],
        }
      }
    }
  }

  for (let col = 0; col < size - 3; col += 1) {
    for (let row = 0; row < size - 3; row += 1) {
      if (
        board[col][row] === player &&
        board[col + 1][row + 1] === player &&
        board[col + 2][row + 2] === player &&
        board[col + 3][row + 3] === player
      ) {
        return {
          rows: [row, row + 1, row + 2, row + 3],
          cols: [col, col + 1, col + 2, col + 3],
        }
      }

      if (
        board[col][row + 3] === player &&
        board[col + 1][row + 2] === player &&
        board[col + 2][row + 1] === player &&
        board[col + 3][row] === player
      ) {
        return {
          rows: [row + 3, row + 2, row + 1, row],
          cols: [col, col + 1, col + 2, col + 3],
        }
      }
    }
  }

  return null
}

const isBoardFull = (board: BoardMatrix): boolean =>
  board.every((column) => column[0] !== 0)

export const getCurrentPlayer = (turn: number): PlayerId =>
  turn % 2 === 0 ? 1 : 2

export const isWinningCell = (
  row: number,
  col: number,
  winningCells: WinPositions | null
): boolean => {
  if (!winningCells) {
    return false
  }

  return winningCells.rows.some(
    (winRow, index) => winRow === row && winningCells.cols[index] === col
  )
}

export const dropPiece = (state: GameState, columnIndex: number): GameState => {
  if (state.status !== "playing") {
    return state
  }

  if (columnIndex < 0 || columnIndex >= BOARD_COLS) {
    return state
  }

  const board = state.board.map((column) => [...column])
  const targetRow = findLowestEmptyRow(board[columnIndex])

  if (targetRow === -1) {
    return state
  }

  const player = getCurrentPlayer(state.turn)
  board[columnIndex][targetRow] = player

  const winningCells = checkFourInLine(board, player)

  if (winningCells) {
    return {
      board,
      turn: state.turn + 1,
      status: "won",
      winner: player,
      winningCells,
    }
  }

  if (isBoardFull(board)) {
    return {
      board,
      turn: state.turn + 1,
      status: "draw",
      winner: null,
      winningCells: null,
    }
  }

  return {
    board,
    turn: state.turn + 1,
    status: "playing",
    winner: null,
    winningCells: null,
  }
}
