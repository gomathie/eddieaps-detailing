export const services = [
  {
    slug: 'complete-detailing',
    name: 'Complete Detailing',
    description: 'The ultimate restoration package. Full deep clean of both interior and exterior including wax, polishing, and sanitization.',
    basePrice: 250,
    duration: '4-6 hours',
    imageUrl: 'https://images.unsplash.com/photo-1601362840469-51e4d8d59085?auto=format&fit=crop&q=80&w=800'
  },
  {
    slug: 'deep-interior',
    name: 'Deep Interior Detailing',
    description: 'Thorough steam cleaning, shampooing, leather conditioning, and stain removal for a factory-fresh cabin experience.',
    basePrice: 150,
    duration: '3-4 hours',
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800'
  },
  {
    slug: 'exterior-detailing',
    name: 'Exterior Detailing',
    description: 'Premium hand wash, clay bar treatment, iron decontamination, and high-gloss paint sealing or wax application.',
    basePrice: 120,
    duration: '2-3 hours',
    imageUrl: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&q=80&w=800'
  },
  {
    slug: 'paint-polishing',
    name: 'Paint Polishing',
    description: 'Remove swirl marks, minor scratches, and oxidation to restore deep color, clarity, and mirror-like reflections.',
    basePrice: 300,
    duration: '5-8 hours',
    imageUrl: 'https://images.unsplash.com/photo-1520340356584-f9917d1ecc6f?auto=format&fit=crop&q=80&w=800'
  }
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
