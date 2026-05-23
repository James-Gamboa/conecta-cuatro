"use client"

import { useState } from "react"

import { GameBoard } from "@/components/game/game-board"
import { GameControls } from "@/components/game/game-controls"
import { GameOverDialog } from "@/components/game/game-over-dialog"
import { GameStatusBanner } from "@/components/game/game-status"
import { Scoreboard } from "@/components/game/scoreboard"
import { Card, CardContent } from "@/components/ui/card"
import { useGame } from "@/hooks/use-game"

export const ConnectFourGame = () => {
  const { gameState, currentPlayer, handleColumnSelect, handleRestart } =
    useGame()
  const [dialogOpen, setDialogOpen] = useState(false)

  const isInteractive = gameState.status === "playing"

  return (
    <main className="game-play mx-auto flex max-h-dvh min-h-dvh w-full max-w-6xl flex-col gap-2 overflow-y-auto overscroll-y-contain px-3 py-3 sm:gap-3 sm:px-4 sm:py-4 lg:max-w-7xl">
      <header className="shrink-0 text-center">
        <p className="font-heading text-[0.65rem] font-semibold tracking-[0.28em] text-amber-200/80 uppercase sm:text-xs">
          Conecta Cuatro
        </p>
        <h1 className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Alinea cuatro fichas
        </h1>
        <p className="mt-1 hidden max-w-lg text-xs text-white/65 sm:block sm:text-sm">
          Presiona la fila superior para soltar tu ficha.
        </p>
      </header>

      <div className="flex shrink-0 flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:justify-center">
        <Scoreboard
          currentPlayer={currentPlayer}
          status={gameState.status}
          winner={gameState.winner}
        />
        <GameStatusBanner
          status={gameState.status}
          currentPlayer={currentPlayer}
          winner={gameState.winner}
        />
      </div>

      <Card className="flex min-h-0 w-full flex-1 flex-col border-white/10 bg-white/5 py-0 text-white shadow-xl backdrop-blur-md">
        <CardContent className="flex min-h-0 flex-1 flex-col items-center gap-2 px-2 pt-2 pb-3 sm:gap-3 sm:px-3 sm:pt-3 sm:pb-4">
          <div className="flex min-h-0 w-full flex-1 items-center justify-center">
            <GameBoard
              gameState={gameState}
              onColumnSelect={handleColumnSelect}
              isInteractive={isInteractive}
            />
          </div>
          <GameControls
            status={gameState.status}
            winner={gameState.winner}
            onRestart={handleRestart}
          />
        </CardContent>
      </Card>

      <GameOverDialog
        status={gameState.status}
        winner={gameState.winner}
        onRestart={handleRestart}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </main>
  )
}
