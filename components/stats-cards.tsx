import { CheckCircle, Award, Rocket } from "lucide-react"

const stats = [
  {
    icon: CheckCircle,
    value: "+40",
    label: "Éxitos logrados",
    color: "neon-blue",
  },
  {
    icon: Award,
    value: "6+",
    label: "Años experiencia",
    color: "primary",
  },
  {
    icon: Rocket,
    value: "25",
    label: "MVPs Lanzados",
    color: "neon-purple",
  },
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 w-full max-w-5xl">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`glass-card p-6 rounded-2xl flex items-center gap-5 hover:border-${stat.color}/30 transition-all group relative overflow-hidden`}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br from-${stat.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}
          />
          <div
            className={`size-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${
              stat.color === "neon-blue"
                ? "bg-neon-blue/10 text-neon-blue"
                : stat.color === "primary"
                  ? "bg-primary/10 text-primary"
                  : "bg-neon-purple/10 text-neon-purple"
            }`}
          >
            <stat.icon className="size-7" />
          </div>
          <div className="text-left">
            <h4 className="text-3xl font-bold text-white font-display">{stat.value}</h4>
            <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
