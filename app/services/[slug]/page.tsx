import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getServiceBySlug } from '@/lib/services';

export function generateStaticParams() {
  return [
    { slug: 'complete-detailing' },
    { slug: 'deep-interior' },
    { slug: 'exterior-detailing' },
    { slug: 'paint-polishing' },
  ];
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="bg-slate-950">
      <section className="bg-slate-900 px-6 py-24 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">Service Detail</p>
            <h1 className="mb-6 text-4xl font-black text-white sm:text-5xl">{service.name}</h1>
            <p className="mb-6 text-lg text-slate-400">{service.description}</p>
            <div className="flex gap-4">
              <Link href="/book" className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white">Book This Service</Link>
              <Link href="/quote" className="rounded-xl border border-slate-700 px-6 py-3 font-semibold text-white">Request a Quote</Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-slate-800 lg:w-[420px]">
            <Image src={service.imageUrl} alt={service.name} width={600} height={400} className="h-80 w-full object-cover" />
          </div>
        </div>
      </section>
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-3xl border border-slate-800 bg-slate-900 p-10">
          <h2 className="mb-6 text-2xl font-bold text-white">Why clients choose this package</h2>
          <ul className="grid gap-3 text-slate-400 md:grid-cols-2">
            <li>• Tailored to your vehicle’s condition and goals</li>
            <li>• Professional equipment and premium products</li>
            <li>• Convenient mobile or shop-based service</li>
            <li>• Expert finish that preserves your paint and interior</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
