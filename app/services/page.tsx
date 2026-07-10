import Link from 'next/link';
import { services } from '@/lib/services';

export default function ServicesPage() {
  return (
    <main className="bg-slate-950">
      <section className="bg-slate-900 px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="mb-4 text-4xl font-black text-white sm:text-5xl">Our Detailing Services</h1>
          <p className="text-lg text-slate-400">Professional solutions for every aspect of your vehicle’s care.</p>
        </div>
      </section>
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`} className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 transition hover:border-blue-600">
              <div className="h-40 bg-gradient-to-br from-blue-600 to-indigo-700" />
              <div className="p-8">
                <h2 className="mb-3 text-2xl font-semibold text-white">{service.name}</h2>
                <p className="mb-4 text-slate-400">{service.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">{service.duration}</span>
                  <span className="font-semibold text-blue-400">Learn more</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
