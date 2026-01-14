import Image from 'next/image'

// Configura aquí los logos que quieres mostrar
// Coloca tus archivos de logo en la carpeta public/logos/
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

export function TechStackScroller() {
  return (
    <div className="w-full max-w-4xl pt-2 sm:pt-4 pb-2 relative overflow-hidden mask-gradient-x">
      <div className="flex animate-scroll hover:[animation-play-state:paused] will-change-transform">
        {[...Array(2)].map((_, groupIndex) => (
          <div
            key={groupIndex}
            className="flex items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 px-4 sm:px-6 md:px-8 flex-shrink-0"
          >
            {techStack.map((tech, index) => (
              <div
                key={`${groupIndex}-${index}`}
                className="flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all cursor-default flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
              >
                <Image
                  src={tech.logo}
                  alt={tech.alt}
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
