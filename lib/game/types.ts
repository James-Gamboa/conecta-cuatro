export const BOARD_ROWS = 8
export const BOARD_COLS = 8

export type PlayerId = 1 | 2
export type CellValue = 0 | PlayerId

export type BoardMatrix = CellValue[][]

export type WinPositions = {
  rows: number[]
  cols: number[]
}

export type GameStatus = "playing" | "won" | "draw"

export type GameState = {
  board: BoardMatrix
  turn: number
  status: GameStatus
  winner: PlayerId | null
  winningCells: WinPositions | null
}
