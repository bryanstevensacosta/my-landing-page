import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/avatar"
import { TechStackScroller } from "@/components/tech-stack-scroller"
import { StatsCards } from "@/components/stats-cards"
import { FloatingCards } from "@/components/floating-cards"
import { SocialLinks } from "@/components/social-links"

export function Hero() {
  return (
    <main className="relative min-h-screen pt-36 pb-24 flex flex-col items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/20 rounded-full blur-[160px] -z-10 opacity-50" />
      <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-neon-purple/15 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-[20%] left-[-5%] w-[400px] h-[400px] bg-neon-green/10 rounded-full blur-[100px] -z-10" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "5rem 5rem",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, #000 60%, transparent 100%)",
        }}
      />

      <div className="container max-w-6xl mx-auto px-6 relative z-10 flex flex-col items-center">
        <Avatar />

        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-semibold uppercase tracking-[0.2em] text-neon-blue">
            <Sparkles className="size-3.5" /> Senior Software Engineer
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight font-display leading-[1.05] text-white text-balance">
            Construyo el futuro con{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-primary to-neon-purple animate-pulse-glow">
              código de alto impacto
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed text-pretty">
            Especialista en arquitecturas escalables, IA y desarrollo Full-Stack. Transformo la visión de tu startup en
            productos digitales robustos y memorables.
          </p>

          {/* Tech Stack Scroller */}
          <TechStackScroller />

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-5 w-full justify-center pt-4">
            <Button className="w-full sm:w-auto h-14 px-10 rounded-2xl bg-primary hover:bg-primary-dark text-white font-bold transition-all shadow-[0_0_30px_rgba(37,37,244,0.4)] hover:shadow-[0_0_45px_rgba(37,37,244,0.6)] hover:-translate-y-1 active:scale-95">
              Explorar Proyectos <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button
              variant="outline"
              className="w-full sm:w-auto h-14 px-10 rounded-2xl border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 text-white font-bold transition-all hover:-translate-y-1 active:scale-95"
            >
              Iniciar Contacto
            </Button>
            <SocialLinks />
          </div>

          {/* Verified Badge */}
          <div className="flex items-center justify-center gap-3 text-xs md:text-sm text-muted-foreground uppercase tracking-widest pt-2">
            <CheckCircle2 className="text-neon-green size-4" />
            <span>Proyectos entregados a tiempo y con calidad técnica garantizada</span>
          </div>

          {/* Stats */}
          <StatsCards />
        </div>

        {/* Floating Cards */}
        <FloatingCards />
      </div>
    </main>
  )
}
