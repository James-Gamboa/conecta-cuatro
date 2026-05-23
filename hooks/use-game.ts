"use client"

import { useCallback, useState } from "react"

import {
  createInitialGameState,
  dropPiece,
  getCurrentPlayer,
} from "@/lib/game/logic"
import { recordWin } from "@/lib/game/scores"
import type { GameState } from "@/lib/game/types"

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState>(createInitialGameState)

  const currentPlayer = getCurrentPlayer(gameState.turn)

  const handleColumnSelect = useCallback((columnIndex: number) => {
    setGameState((previous) => {
      const nextState = dropPiece(previous, columnIndex)

      if (
        nextState.status === "won" &&
        nextState.winner &&
        previous.status === "playing"
      ) {
        recordWin(nextState.winner)
      }

      return nextState
    })
  }, [])

  const handleRestart = useCallback(() => {
    setGameState(createInitialGameState())
  }, [])

  return {
    gameState,
    currentPlayer,
    handleColumnSelect,
    handleRestart,
  }
}
