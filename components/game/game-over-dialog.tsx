"use client"

import { useEffect, useRef } from "react"
import { Trophy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { GameStatus, PlayerId } from "@/lib/game/types"

type GameOverDialogProps = {
  status: GameStatus
  winner: PlayerId | null
  onRestart: () => void
  onOpenChange: (open: boolean) => void
  open: boolean
}

export const GameOverDialog = ({
  status,
  winner,
  onRestart,
  onOpenChange,
  open,
}: GameOverDialogProps) => {
  const previousStatus = useRef(status)

  useEffect(() => {
    const ended =
      (status === "won" || status === "draw") &&
      previousStatus.current === "playing"

    previousStatus.current = status

    if (ended) {
      onOpenChange(true)
    }
  }, [status, onOpenChange])

  const title =
    status === "won" ? `¡Jugador ${winner} gana!` : "Empate en el tablero"

  const description =
    status === "won"
      ? "Cuatro fichas alineadas. ¿Jugamos otra ronda?"
      : "No quedan espacios disponibles. Inténtalo de nuevo."

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-heading text-xl">
            <Trophy className="size-5 text-amber-400" aria-hidden />
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={() => {
              onRestart()
              onOpenChange(false)
            }}
          >
            Nueva partida
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
