"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { Pointer } from "lucide-react"

import { cn } from "@/lib/utils"
import { BOARD_COLS, BOARD_ROWS, type CellValue } from "@/lib/game/types"
import { isWinningCell } from "@/lib/game/logic"
import type { GameState } from "@/lib/game/types"

type GameBoardProps = {
  gameState: GameState
  onColumnSelect: (columnIndex: number) => void
  isInteractive: boolean
}

const getTokenClassName = (value: CellValue): string => {
  if (value === 1) {
    return "bg-gradient-to-br from-amber-300 via-yellow-300 to-amber-500 shadow-[inset_0_-4px_0_rgba(180,120,0,0.35),0_4px_10px_rgba(250,204,21,0.4)]"
  }

  if (value === 2) {
    return "bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-700 shadow-[inset_0_-4px_0_rgba(20,60,140,0.45),0_4px_10px_rgba(59,130,246,0.4)]"
  }

  return ""
}

const boardGridStyle = {
  gridTemplateColumns: `repeat(${BOARD_COLS}, minmax(0, 1fr))`,
  gap: "var(--board-gap)",
} as const

export const GameBoard = ({
  gameState,
  onColumnSelect,
  isInteractive,
}: GameBoardProps) => {
  const boardRef = useRef<HTMLDivElement>(null)
  const lastDropRef = useRef<string | null>(null)

  useEffect(() => {
    if (!boardRef.current) {
      return
    }

    gsap.fromTo(
      boardRef.current,
      { opacity: 0, y: 16, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "power3.out" }
    )
  }, [])

  useEffect(() => {
    if (!lastDropRef.current || !boardRef.current) {
      return
    }

    const token = boardRef.current.querySelector(
      `[data-drop-key="${lastDropRef.current}"]`
    )

    if (!token) {
      return
    }

    const cellHeight =
      boardRef.current.querySelector("[data-board-cell]")?.clientHeight ?? 48

    gsap.fromTo(
      token,
      { y: -(cellHeight * 2.2), scale: 0.8, opacity: 0.5 },
      { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: "bounce.out" }
    )
  }, [gameState.board, gameState.turn])

  useEffect(() => {
    if (gameState.status !== "won" || !boardRef.current) {
      return
    }

    const winningTokens = boardRef.current.querySelectorAll(
      "[data-winning='true']"
    )

    gsap.to(winningTokens, {
      scale: 1.08,
      repeat: 3,
      yoyo: true,
      duration: 0.35,
      ease: "power2.inOut",
      stagger: 0.08,
    })
  }, [gameState.status, gameState.winningCells])

  const handleColumnClick = (columnIndex: number) => {
    if (!isInteractive) {
      return
    }

    const column = gameState.board[columnIndex]
    let targetRow = -1

    for (let row = column.length - 1; row >= 0; row -= 1) {
      if (column[row] === 0) {
        targetRow = row
        break
      }
    }

    if (targetRow === -1) {
      return
    }

    lastDropRef.current = `${columnIndex}-${targetRow}`
    onColumnSelect(columnIndex)
  }

  const handleColumnKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    columnIndex: number
  ) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return
    }

    event.preventDefault()
    handleColumnClick(columnIndex)
  }

  return (
    <div
      ref={boardRef}
      className="game-board relative w-full max-w-[var(--board-max-width)] rounded-2xl border-[3px] border-slate-900/80 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 p-[var(--board-padding)] shadow-[0_16px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)] sm:rounded-3xl"
      role="grid"
      aria-label="Tablero de Conecta Cuatro"
    >
      <div className="grid" style={boardGridStyle}>
        {Array.from({ length: BOARD_COLS }, (_, columnIndex) => {
          const isColumnFull = gameState.board[columnIndex][0] !== 0

          return (
            <button
              key={`column-trigger-${columnIndex}`}
              type="button"
              className={cn(
                "group flex min-h-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40 sm:min-h-8"
              )}
              onClick={() => handleColumnClick(columnIndex)}
              onKeyDown={(event) => handleColumnKeyDown(event, columnIndex)}
              disabled={!isInteractive || isColumnFull}
              aria-label={`Soltar ficha en columna ${columnIndex + 1}`}
              tabIndex={0}
            >
              <Pointer
                className="size-4 text-amber-200 opacity-80 transition group-hover:translate-y-px group-hover:opacity-100 sm:size-[1.125rem]"
                aria-hidden
              />
            </button>
          )
        })}
      </div>

      <div
        className="mt-[var(--board-gap)] grid w-full"
        style={{
          ...boardGridStyle,
          gridTemplateRows: `repeat(${BOARD_ROWS}, minmax(0, 1fr))`,
          aspectRatio: `${BOARD_COLS} / ${BOARD_ROWS}`,
        }}
      >
        {Array.from({ length: BOARD_ROWS }, (_, rowIndex) =>
          Array.from({ length: BOARD_COLS }, (_, columnIndex) => {
            const value = gameState.board[columnIndex][rowIndex]
            const dropKey = `${columnIndex}-${rowIndex}`
            const isWinner = isWinningCell(
              rowIndex,
              columnIndex,
              gameState.winningCells
            )

            return (
              <div
                key={dropKey}
                data-board-cell
                className="relative aspect-square min-h-0 w-full"
                role="gridcell"
                aria-label={`Celda fila ${rowIndex + 1} columna ${columnIndex + 1}`}
              >
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-b from-slate-700 to-slate-950 shadow-[inset_0_4px_10px_rgba(0,0,0,0.55)] ring-1 ring-slate-950/80 sm:ring-2">
                  {value !== 0 ? (
                    <span
                      data-drop-key={dropKey}
                      data-winning={isWinner ? "true" : "false"}
                      className={cn(
                        "absolute inset-[14%] rounded-full transition-transform",
                        getTokenClassName(value),
                        isWinner &&
                          "ring-2 ring-white/90 ring-offset-1 ring-offset-transparent sm:ring-4 sm:ring-offset-2"
                      )}
                    />
                  ) : null}
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
