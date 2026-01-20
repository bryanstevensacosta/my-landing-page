import { Header } from '@/widgets/header/ui/Header'
import { Hero } from '@/widgets/hero/ui'
import { Services } from '@/widgets/services'
import { FeaturedProjects } from '@/widgets/featured-projects/ui/FeaturedProjects'
import { Contact } from '@/widgets/contact'

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-neon-purple/30 selection:text-white">
      <Header />
      <Hero />
      <Services />
      <FeaturedProjects />
      <Contact />
    </div>
  )
}
