export function Avatar() {
  return (
    <div className="relative group mb-10 animate-float">
      {/* Glow Effect */}
      <div
        className="absolute -inset-1.5 rounded-full opacity-60 blur-lg group-hover:opacity-100 transition duration-700"
        style={{
          background: 'linear-gradient(90deg, #452CFF)',
        }}
      />

      {/* Avatar Container */}
      <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full p-1.5 bg-background">
        <div className="w-full h-full rounded-full bg-cover bg-center border-2 border-white/10 overflow-hidden bg-surface shadow-2xl">
          <img
            alt="Developer Avatar"
            className="w-full h-full object-cover"
            src="/professional-developer-portrait-dark-background.png"
          />
        </div>
      </div>

      {/* Status Badge */}
      <div className="absolute bottom-2 right-2 bg-background border border-white/10 rounded-full px-3 sm:px-4 py-1.5 flex items-center gap-2 shadow-2xl backdrop-blur-md">
        <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-neon-green" />
        </span>
        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider sm:tracking-widest text-white/90 whitespace-nowrap">
          Open To Work
        </span>
      </div>
    </div>
  )
}
