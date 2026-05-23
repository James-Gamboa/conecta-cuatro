import { cn } from "@/lib/utils"
import type { GameStatus, PlayerId } from "@/lib/game/types"

type GameStatusBannerProps = {
  status: GameStatus
  currentPlayer: PlayerId
  winner: PlayerId | null
}

const statusBaseClass =
  "shrink-0 rounded-full px-3 py-1 text-center text-xs font-semibold sm:text-sm"

export const GameStatusBanner = ({
  status,
  currentPlayer,
  winner,
}: GameStatusBannerProps) => {
  if (status === "won" && winner) {
    return (
      <p
        className={cn(
          statusBaseClass,
          "border border-amber-300/40 bg-amber-300/15 text-amber-100"
        )}
        role="status"
        aria-live="polite"
      >
        ¡Jugador {winner} gana!
      </p>
    )
  }

  if (status === "draw") {
    return (
      <p
        className={cn(
          statusBaseClass,
          "border border-white/20 bg-white/10 text-white/90"
        )}
        role="status"
        aria-live="polite"
      >
        Empate
      </p>
    )
  }

  return (
    <p
      className={cn(
        statusBaseClass,
        "font-medium text-white/85",
        currentPlayer === 1 ? "bg-amber-400/20" : "bg-blue-500/25"
      )}
      role="status"
      aria-live="polite"
    >
      Turno · Jugador {currentPlayer}
    </p>
  )
}
