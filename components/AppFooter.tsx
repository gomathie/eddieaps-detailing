import Link from 'next/link';

export function AppFooter() {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 px-6 py-16 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">Eddie APS Detailing</h3>
          <p className="text-sm leading-relaxed text-slate-400">Premium mobile and stationed detailing services that restore your vehicle’s beauty wherever you are.</p>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm text-slate-400">
            <Link href="/services" className="hover:text-white">All Services</Link>
            <Link href="/gallery" className="hover:text-white">Gallery</Link>
            <Link href="/blog" className="hover:text-white">Blog</Link>
            <Link href="/book" className="hover:text-white">Book Online</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Services</h4>
          <div className="flex flex-col gap-2 text-sm text-slate-400">
            <Link href="/services/complete-detailing" className="hover:text-white">Complete Detailing</Link>
            <Link href="/services/deep-interior" className="hover:text-white">Deep Interior</Link>
            <Link href="/services/exterior-detailing" className="hover:text-white">Exterior Detailing</Link>
            <Link href="/services/paint-polishing" className="hover:text-white">Paint Polishing</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Contact</h4>
          <div className="space-y-2 text-sm text-slate-400">
            <div>0595118973</div>
            <div>0591357411</div>
            <div>Mon – Sun 7:00 AM – 7:00 PM</div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-slate-900 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>© 2026 Eddie APS Detailing. All rights reserved.</p>
        <Link href="/admin/login" className="hover:text-white">Admin Portal</Link>
      </div>
    </footer>
  );
}
