import { Header } from '@/widgets/header/ui/Header'
import { Hero } from '@/widgets/hero/ui'
import { FeaturedProjects } from '@/widgets/featured-projects/ui/FeaturedProjects'

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-neon-purple/30 selection:text-white">
      <Header />
      <Hero />
      <FeaturedProjects />
    </div>
  )
}
