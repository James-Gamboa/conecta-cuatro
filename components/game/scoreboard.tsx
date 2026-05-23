"use client"

import { PlayerBadge } from "@/components/game/player-badge"
import { useScores } from "@/hooks/use-scores"
import type { GameStatus, PlayerId } from "@/lib/game/types"

type ScoreboardProps = {
  currentPlayer: PlayerId
  status: GameStatus
  winner: PlayerId | null
}

export const Scoreboard = ({
  currentPlayer,
  status,
  winner,
}: ScoreboardProps) => {
  const scores = useScores()

  return (
    <section
      className="flex w-full max-w-5xl flex-wrap items-center justify-center gap-2 sm:gap-3"
      aria-label="Marcador de jugadores"
    >
      <PlayerBadge
        player={1}
        label={`J1 · ${scores.player1}`}
        isActive={status === "playing" && currentPlayer === 1}
      />
      <PlayerBadge
        player={2}
        label={`J2 · ${scores.player2}`}
        isActive={status === "playing" && currentPlayer === 2}
      />
      {winner ? (
        <span className="sr-only">Último ganador: jugador {winner}</span>
      ) : null}
    </section>
  )
}
