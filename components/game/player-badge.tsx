import { cn } from "@/lib/utils"
import type { PlayerId } from "@/lib/game/types"

type PlayerBadgeProps = {
  player: PlayerId
  label: string
  isActive: boolean
}

export const PlayerBadge = ({ player, label, isActive }: PlayerBadgeProps) => {
  const isPlayerOne = player === 1

  return (
    <div
      className={cn(
        "relative flex min-w-[7.5rem] flex-col items-center justify-center rounded-xl border px-3 py-2 shadow-md transition-all duration-300 sm:min-w-[8.5rem] sm:rounded-2xl sm:px-4 sm:py-2.5",
        isPlayerOne
          ? "border-amber-300/50 bg-gradient-to-br from-amber-300 via-yellow-300 to-amber-400 text-amber-950"
          : "border-blue-400/50 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 text-white",
        isActive
          ? "scale-[1.02] shadow-lg ring-2 ring-white/70 sm:ring-[3px]"
          : "scale-100 opacity-75"
      )}
      aria-current={isActive ? "true" : undefined}
    >
      <span className="font-heading text-[0.6rem] font-semibold tracking-[0.15em] uppercase opacity-80 sm:text-[0.65rem]">
        {isPlayerOne ? "Amarillo" : "Azul"}
      </span>
      <span className="font-heading text-sm font-bold sm:text-base">
        {label}
      </span>
      {isActive ? (
        <span className="mt-0.5 rounded-full bg-black/10 px-1.5 py-px text-[0.6rem] font-semibold tracking-wide uppercase">
          Activo
        </span>
      ) : null}
    </div>
  )
}
