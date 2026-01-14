import Image from 'next/image'

const techStack = [
  { logo: '/logos/python.png', alt: 'Python' },
  { logo: '/logos/java.png', alt: 'Java' },
  { logo: '/logos/typescript.png', alt: 'TypeScript' },
  { logo: '/logos/nodejs.png', alt: 'NodeJs' },
  { logo: '/logos/nestjs.svg', alt: 'NestJs' },
  { logo: '/logos/html5.png', alt: 'HTML5' },
  { logo: '/logos/css3.png', alt: 'CSS3' },
  { logo: '/logos/javascript.png', alt: 'JavaScript' },
  { logo: '/logos/react.png', alt: 'ReactJs' },
  { logo: '/logos/vite.png', alt: 'Vite' },
  { logo: '/logos/postgres.png', alt: 'PostgreSQL' },
  { logo: '/logos/aws.png', alt: 'AWS' },
  { logo: '/logos/google-cloud.png', alt: 'GoogleCloud' },
  { logo: '/logos/azure.png', alt: 'Azure' },
  { logo: '/logos/kubernetes.png', alt: 'Kubernetes' },
  { logo: '/logos/terraform.svg', alt: 'Terraform' },
]

/**
 * OPTIMIZADO PARA MÓVILES - CSS puro con GPU acceleration
 *
 * Performance:
 * - 0KB JavaScript overhead
 * - GPU-accelerated (OMTA - Off Main Thread Animation)
 * - 60fps en móviles de gama baja
 * - Solo anima 'transform' (no causa reflow/repaint)
 *
 * Fuentes: Mozilla MDN, Framer Motion benchmarks
 */
export function TechStackScroller() {
  return (
    <div
      className="w-full max-w-4xl pt-2 sm:pt-4 pb-2 relative overflow-hidden mask-gradient-x"
      data-testid="tech-stack-scroller"
    >
      <div
        className="flex animate-scroll-seamless hover:[animation-play-state:paused] will-change-transform"
        style={{ width: 'calc(100px * 32)' }}
      >
        {/* Primera copia - 16 logos */}
        {techStack.map((tech, index) => (
          <div
            key={`first-${index}`}
            className="flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all cursor-default"
            style={{ width: '100px', height: '48px', flexShrink: 0 }}
          >
            <Image
              src={tech.logo}
              alt={tech.alt}
              width={48}
              height={48}
              className="w-12 h-12 object-contain"
              loading="lazy"
            />
          </div>
        ))}
        {/* Segunda copia - 16 logos */}
        {techStack.map((tech, index) => (
          <div
            key={`second-${index}`}
            className="flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all cursor-default"
            style={{ width: '100px', height: '48px', flexShrink: 0 }}
            aria-hidden="true"
          >
            <Image
              src={tech.logo}
              alt={tech.alt}
              width={48}
              height={48}
              className="w-12 h-12 object-contain"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
