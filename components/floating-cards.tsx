import { Activity } from "lucide-react"

export function FloatingCards() {
  return (
    <div className="absolute -bottom-10 -right-20 lg:right-5 w-[420px] h-auto z-0 opacity-40 lg:opacity-100 pointer-events-none hidden xl:block perspective-2000">
      {/* Code Card */}
      <div className="glass-card p-5 rounded-2xl shadow-2xl border-l-4 border-l-primary transform rotate-[-8deg] translate-y-16 translate-x-4 animate-float-delayed z-20">
        <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-3">
          <div className="flex gap-1.5">
            <div className="size-2.5 rounded-full bg-red-500/80" />
            <div className="size-2.5 rounded-full bg-yellow-500/80" />
            <div className="size-2.5 rounded-full bg-green-500/80" />
          </div>
          <div className="text-[11px] text-muted-foreground font-mono tracking-tight uppercase">
            realtime_metrics.py
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="w-1/4 h-2.5 bg-white/10 rounded-full" />
            <div className="w-2/3 h-2.5 bg-primary/40 rounded-full" />
          </div>
          <div className="flex gap-2">
            <div className="w-1/3 h-2.5 bg-white/10 rounded-full" />
            <div className="w-1/2 h-2.5 bg-neon-purple/40 rounded-full" />
          </div>
          <div className="w-full h-24 bg-white/5 rounded-xl border border-dashed border-white/10 flex items-center justify-center mt-2 group-hover:bg-white/10 transition-colors">
            <Activity className="text-white/30 size-10" />
          </div>
        </div>
      </div>

      {/* App Card */}
      <div className="glass-card p-5 rounded-2xl shadow-2xl border-t-4 border-t-neon-green transform rotate-[5deg] -translate-y-24 translate-x-24 animate-float bg-surface/95 z-30">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-bold text-white">Fintech Platform</span>
          <span className="px-2 py-0.5 rounded-full text-[9px] bg-neon-green/20 text-neon-green font-black tracking-wider">
            ONLINE
          </span>
        </div>
        <div className="space-y-3">
          <div className="h-8 w-full bg-white/5 rounded-lg border border-white/10 flex items-center px-3 justify-between">
            <div className="w-1/2 h-2 bg-white/20 rounded-full" />
            <div className="w-4 h-4 rounded-full bg-neon-green/30" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-[4/3] bg-white/5 rounded-xl border border-white/10" />
            <div className="aspect-[4/3] bg-white/5 rounded-xl border border-white/10" />
          </div>
          <div className="mt-2 w-full bg-primary h-10 rounded-xl flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-primary/20">
            Confirm Transaction
          </div>
        </div>
      </div>
    </div>
  )
}
