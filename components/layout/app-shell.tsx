import { LenisProvider } from "@/components/providers/lenis-provider"
import { Toaster } from "@/components/ui/sonner"

type AppShellProps = {
  children: React.ReactNode
}

export const AppShell = ({ children }: AppShellProps) => {
  return (
    <LenisProvider>
      <div className="game-ambient min-h-dvh overflow-x-hidden">{children}</div>
      <Toaster richColors position="top-center" />
    </LenisProvider>
  )
}
