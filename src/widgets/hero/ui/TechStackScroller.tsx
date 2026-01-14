import { Layers, FileCode, Code2, Database, Cloud, Bot } from 'lucide-react'

const techStack = [
  { icon: Layers, name: 'REACT' },
  { icon: FileCode, name: 'TYPESCRIPT' },
  { icon: Code2, name: 'PYTHON' },
  { icon: Database, name: 'POSTGRES' },
  { icon: Cloud, name: 'AWS' },
  { icon: Bot, name: 'OPENAI' },
]

export function TechStackScroller() {
  return (
    <div className="w-full max-w-4xl pt-2 sm:pt-4 pb-2 relative overflow-hidden mask-gradient-x">
      <div className="flex w-[200%] animate-scroll hover:[animation-play-state:paused] will-change-transform">
        {[...Array(2)].map((_, groupIndex) => (
          <div
            key={groupIndex}
            className="flex w-1/2 justify-around items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 px-2 sm:px-4 md:px-6 flex-shrink-0"
          >
            {techStack.map((tech, index) => (
              <div
                key={`${groupIndex}-${index}`}
                className="flex items-center gap-1.5 sm:gap-2 md:gap-3 text-muted-foreground hover:text-white transition-colors cursor-default grayscale hover:grayscale-0 flex-shrink-0"
              >
                <tech.icon className="size-4 sm:size-5 md:size-6 flex-shrink-0" />
                <span className="font-mono text-[10px] sm:text-xs md:text-sm font-bold tracking-tight whitespace-nowrap">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
