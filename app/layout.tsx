import { Bricolage_Grotesque, DM_Sans } from "next/font/google"

import "./globals.css"
import { AppShell } from "@/components/layout/app-shell"
import { cn } from "@/lib/utils"

const fontHeading = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-heading",
})

const fontSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: "Conecta Cuatro",
  description:
    "Conecta Cuatro modernizado con Next.js, TypeScript y una experiencia visual premium.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontSans.variable,
        fontHeading.variable,
        "font-sans"
      )}
    >
      <body suppressHydrationWarning>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
