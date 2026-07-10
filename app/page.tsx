import Link from 'next/link';
import Image from 'next/image';
import { services } from '@/lib/services';
import { HomePageClient } from '@/components/HomePageClient';

const featuredServices = services.slice(0, 4);

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-slate-950 pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.25),transparent_60%)]" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center lg:px-8">
          <span className="mb-6 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-blue-400">
            Professional Auto Care
          </span>
          <h1 className="mb-6 max-w-4xl text-4xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">
            Premium Mobile &{' '}
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
              Stationed Auto Detailing
            </span>
          </h1>
          <p className="mb-10 max-w-2xl text-lg text-slate-300 sm:text-xl">
            Restore, protect, and preserve your vehicle’s beauty with premium detailing from our mobile team or our professional shop.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/book" className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-500">
              Book Appointment
            </Link>
            <Link href="/quote" className="rounded-xl border border-slate-700 bg-slate-900/80 px-8 py-4 font-semibold text-white transition hover:bg-slate-800">
              Get Free Quote
            </Link>
          </div>
          <div className="mt-16 grid w-full max-w-4xl grid-cols-2 gap-8 border-t border-slate-800/80 pt-10 text-sm text-slate-400 md:grid-cols-4">
            <div><div className="mb-1 text-2xl font-bold text-white">100%</div><div>Satisfaction Guarantee</div></div>
            <div><div className="mb-1 text-2xl font-bold text-white">Eco</div><div>Friendly Products</div></div>
            <div><div className="mb-1 text-2xl font-bold text-white">Mobile</div><div>We Come To You</div></div>
            <div><div className="mb-1 text-2xl font-bold text-white">5 ★</div><div>Top Rated Detailing</div></div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 py-24">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">About Us</p>
            <h2 className="mb-6 text-3xl font-extrabold text-white sm:text-4xl">Exceptional Results with Unmatched Convenience</h2>
            <p className="mb-4 text-slate-400">Eddie APS Detailing was founded to make premium detailing effortless for busy vehicle owners. We bring expert care directly to your location or welcome you to our shop for full-service restoration.</p>
            <p className="mb-8 text-slate-400">From deep interior sanitization to paint correction and protective coatings, every detail is handled with care using eco-friendly products and professional equipment.</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">Licensed & Insured</div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">Advanced Equipment</div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-slate-800">
            <Image src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&q=80&w=900" alt="Luxury car detailing" width={900} height={600} className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">Our Services</p>
            <h2 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl">Professional Auto Detailing Packages</h2>
            <p className="text-slate-400">Choose a package that fits your vehicle and your goals.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {featuredServices.map((service) => (
              <div key={service.slug} className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
                <Image src={service.imageUrl} alt={service.name} width={600} height={400} className="h-48 w-full object-cover" />
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold text-white">{service.name}</h3>
                  <p className="mb-4 text-sm text-slate-400">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-400">${service.basePrice}</span>
                    <Link href={`/services/${service.slug}`} className="text-sm font-semibold text-slate-200 hover:text-blue-400">Learn more →</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomePageClient />
    </main>
  );
}
