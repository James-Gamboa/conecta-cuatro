import Link from "next/link"
import { ArrowLeft, Grid3x3, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const rules = [
  "Solo dos jugadores.",
  "Para ganar, un jugador debe colocar sus cuatro fichas en una fila antes que su oponente.",
  "Existen tres formas de ganar: horizontal, vertical y diagonal.",
  "Presiona únicamente la fila superior del tablero para soltar cada ficha.",
]

export default function InstruccionesPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:max-w-6xl">
      <header className="space-y-2 text-center">
        <p className="font-heading text-xs font-semibold tracking-[0.3em] text-amber-200/80 uppercase">
          Guía rápida
        </p>
        <h1 className="font-heading text-4xl font-bold text-white">
          Bienvenido, jugador
        </h1>
        <p className="text-sm text-white/70 sm:text-base">
          Aprende las reglas clásicas de Conecta Cuatro en segundos.
        </p>
      </header>

      <Tabs defaultValue="reglas" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-white/10">
          <TabsTrigger value="reglas">Reglas</TabsTrigger>
          <TabsTrigger value="tablero">Tablero</TabsTrigger>
        </TabsList>

        <TabsContent value="reglas">
          <Card className="border-white/10 bg-white/5 text-white backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-heading">
                <Users className="size-5 text-amber-300" aria-hidden />
                Instrucciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm leading-relaxed text-white/85 sm:text-base">
                {rules.map((rule) => (
                  <li key={rule} className="flex gap-2">
                    <span className="text-amber-300" aria-hidden>
                      ●
                    </span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tablero">
          <Card className="border-white/10 bg-white/5 text-white backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-heading">
                <Grid3x3 className="size-5 text-sky-300" aria-hidden />
                Vista del tablero
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div
                className="grid w-full max-w-sm grid-cols-6 gap-2 rounded-2xl border border-white/15 bg-slate-900/70 p-4"
                aria-hidden
              >
                {Array.from({ length: 24 }).map((_, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-full bg-slate-700 shadow-inner"
                  />
                ))}
              </div>
              <p className="text-center text-sm text-white/75">
                Usa los indicadores superiores para elegir columna. Las fichas
                caen por gravedad hasta la posición libre más baja.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center">
        <Button
          size="lg"
          className="bg-[#fffb00] text-black hover:bg-amber-200 hover:text-black [&_svg]:text-black"
          asChild
        >
          <Link href="/" className="text-black">
            <ArrowLeft className="text-black" />
            Volver al juego
          </Link>
        </Button>
      </div>
    </main>
  )
}
