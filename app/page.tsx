import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { FeaturedProjects } from "@/components/featured-projects"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-neon-purple/30 selection:text-white">
      <Header />
      <Hero />
      <FeaturedProjects />
    </div>
  )
}
