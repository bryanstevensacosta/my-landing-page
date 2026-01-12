import { Terminal, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="size-10 bg-gradient-to-br from-primary to-neon-purple rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
            <Terminal className="text-white size-5" />
          </div>
          <h2 className="text-white text-xl font-bold tracking-tight font-display">DevPortfolio</h2>
        </div>

        <nav className="hidden md:flex items-center gap-10">
          <a
            className="text-muted-foreground hover:text-white transition-all text-sm font-medium tracking-wide"
            href="#"
          >
            Soluciones
          </a>
          <a
            className="text-muted-foreground hover:text-white transition-all text-sm font-medium tracking-wide"
            href="#"
          >
            Proyectos
          </a>
          <a
            className="text-muted-foreground hover:text-white transition-all text-sm font-medium tracking-wide"
            href="#"
          >
            Stack
          </a>
          <a
            className="text-muted-foreground hover:text-white transition-all text-sm font-medium tracking-wide"
            href="#"
          >
            Trayectoria
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="hidden sm:flex h-11 px-6 rounded-xl border-white/10 hover:bg-white/5 hover:border-white/30 text-white font-bold bg-transparent"
          >
            Descargar CV
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden text-white">
            <Menu className="size-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
