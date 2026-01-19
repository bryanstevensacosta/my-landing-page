import type { Service } from '../types'

export const services: Service[] = [
  {
    id: 'custom-software',
    icon: 'deployed_code',
    size: 'large',
    colSpan: 2,
    rowSpan: 2,
    badges: ['React', 'Node'],
    backgroundImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAQwxmLoPdKhzrMrFvvMTyy2FQ5Uji3AmfDOriLQ__j8EAwkJg7Iv65V6y2Aw7jRlZFcItgw54orYu7xN4fjaVpQhBqrMnbtuWvRIkADRxUX4WYwhF5OSDVbhWpzwhYi8tYburD9pM_jQT21Ngtki1gm00XSudANt3cPP-ifV37-IJIc9Rgpu3UmEh8hLotPKYxZ9qyXmX46pcZwjz1QXxc-8JwLlQCCAblIisFPoSnoqADdxhVmifoXviEYu82oz6jPq0C2kCO7-lt',
  },
  {
    id: 'legacy-migration',
    icon: 'system_update_alt',
    size: 'medium',
    colSpan: 1,
    rowSpan: 2,
    features: ['Zero Downtime', 'Data Integrity'],
  },
  {
    id: 'multi-platform',
    icon: 'devices',
    size: 'medium',
    colSpan: 1,
    rowSpan: 2,
    platforms: ['iOS', 'Android', 'Web'],
  },
  {
    id: 'ai-integration',
    icon: 'psychology',
    size: 'small',
    colSpan: 1,
    rowSpan: 1,
    variant: 'ai',
  },
  {
    id: 'ux-ui-design',
    icon: 'design_services',
    size: 'small',
    colSpan: 1,
    rowSpan: 1,
  },
  {
    id: 'landing-pages',
    icon: 'web',
    size: 'small',
    colSpan: 2,
    rowSpan: 1,
  },
]
