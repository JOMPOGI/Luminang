export const SITE_CONFIG = {
  name: process.env.NEXT_PUBLIC_STUDIO_NAME || 'Luminang Studios',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'LuminangStudios2026@gmail.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
} as const;