import { AtSign, Terminal } from "lucide-react"

export function SocialLinks() {
  return (
    <div className="flex gap-4 sm:ml-4">
      <a
        className="size-12 rounded-xl bg-surface border border-white/5 flex items-center justify-center text-muted-foreground hover:text-white hover:border-primary/50 transition-all hover:bg-primary/10"
        href="#"
      >
        <AtSign className="size-5" />
      </a>
      <a
        className="size-12 rounded-xl bg-surface border border-white/5 flex items-center justify-center text-muted-foreground hover:text-white hover:border-primary/50 transition-all hover:bg-primary/10"
        href="#"
      >
        <Terminal className="size-5" />
      </a>
    </div>
  )
}
