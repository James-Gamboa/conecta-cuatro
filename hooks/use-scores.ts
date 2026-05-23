"use client"

import { useSyncExternalStore } from "react"

import {
  getServerScoresSnapshot,
  readScores,
  subscribeScores,
} from "@/lib/game/scores"

export const useScores = () =>
  useSyncExternalStore(subscribeScores, readScores, getServerScoresSnapshot)
