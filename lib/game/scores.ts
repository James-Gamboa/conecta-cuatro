import type { PlayerId } from "./types"

export type StoredScores = {
  player1: number
  player2: number
}

const SCORE_STORAGE_KEY = "conecta-cuatro-scores"

const EMPTY_SCORES: StoredScores = { player1: 0, player2: 0 }

export const getServerScoresSnapshot = (): StoredScores => EMPTY_SCORES

const listeners = new Set<() => void>()

let clientSnapshot: StoredScores = EMPTY_SCORES
let clientSnapshotKey = "0:0"

const toSnapshotKey = (player1: number, player2: number): string =>
  `${player1}:${player2}`

const setClientSnapshot = (player1: number, player2: number): StoredScores => {
  if (player1 === 0 && player2 === 0) {
    clientSnapshotKey = "0:0"
    clientSnapshot = EMPTY_SCORES
    return EMPTY_SCORES
  }

  const key = toSnapshotKey(player1, player2)

  if (key === clientSnapshotKey) {
    return clientSnapshot
  }

  clientSnapshotKey = key
  clientSnapshot = { player1, player2 }
  return clientSnapshot
}

export const subscribeScores = (listener: () => void): (() => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export const readScores = (): StoredScores => {
  if (typeof window === "undefined") {
    return EMPTY_SCORES
  }

  try {
    const raw = window.localStorage.getItem(SCORE_STORAGE_KEY)

    if (!raw) {
      return setClientSnapshot(0, 0)
    }

    const parsed = JSON.parse(raw) as StoredScores
    return setClientSnapshot(parsed.player1 ?? 0, parsed.player2 ?? 0)
  } catch {
    return setClientSnapshot(0, 0)
  }
}

const emitScores = () => {
  listeners.forEach((listener) => listener())
}

export const recordWin = (winner: PlayerId): void => {
  if (typeof window === "undefined") {
    return
  }

  const current = readScores()
  const nextPlayer1 = winner === 1 ? current.player1 + 1 : current.player1
  const nextPlayer2 = winner === 2 ? current.player2 + 1 : current.player2

  const nextScores = setClientSnapshot(nextPlayer1, nextPlayer2)

  window.localStorage.setItem(SCORE_STORAGE_KEY, JSON.stringify(nextScores))
  emitScores()
}
