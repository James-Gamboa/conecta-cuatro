"use client"

import Lenis from "lenis"
import { useEffect } from "react"

type LenisProviderProps = {
  children: React.ReactNode
}

export const LenisProvider = ({ children }: LenisProviderProps) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      touchMultiplier: 1.2,
    })

    let frameId = 0

    const handleFrame = (time: number) => {
      lenis.raf(time)
      frameId = requestAnimationFrame(handleFrame)
    }

    frameId = requestAnimationFrame(handleFrame)

    return () => {
      cancelAnimationFrame(frameId)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
