"use client"

import Link from "next/link"
import { BookOpen, RotateCcw } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { GameStatus, PlayerId } from "@/lib/game/types"

type GameControlsProps = {
  status: GameStatus
  winner: PlayerId | null
  onRestart: () => void
}

export const GameControls = ({
  status,
  winner,
  onRestart,
}: GameControlsProps) => {
  const handleRestart = () => {
    onRestart()
    toast.success("Partida reiniciada", {
      description: "El tablero está listo para una nueva ronda.",
    })
  }

  return (
    <TooltipProvider>
      <div className="flex shrink-0 flex-wrap items-center justify-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="border-amber-500/50 bg-[#fffb00] text-black hover:bg-amber-200 hover:text-black sm:h-9 sm:px-3 [&_svg]:text-black"
              asChild
            >
              <Link href="/instrucciones" className="text-black">
                <BookOpen className="text-black" />
                Instrucciones
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Ver reglas y consejos de juego</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              className="sm:h-9 sm:px-3"
              onClick={handleRestart}
            >
              <RotateCcw />
              Reiniciar
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {status === "won"
              ? `Nueva partida tras la victoria del jugador ${winner}`
              : "Comenzar una partida nueva"}
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
