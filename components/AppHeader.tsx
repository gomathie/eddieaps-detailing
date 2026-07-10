"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/blog', label: 'Blog' },
];

export function AppHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/70 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="text-xl font-black tracking-[0.25em] text-white">
          EDDIE <span className="text-blue-500">APS</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={pathname === link.href ? 'text-blue-400' : 'text-slate-300 hover:text-white'}>
              {link.label}
            </Link>
          ))}
          <Link href="/#contact" className="text-slate-300 hover:text-white">Contact</Link>
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/quote" className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-900">Get Quote</Link>
          <Link href="/book" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500">Book</Link>
        </div>
        <button className="rounded-lg border border-slate-700 p-2 text-slate-200 md:hidden" onClick={() => setOpen((value) => !value)}>
          ☰
        </button>
      </div>
      {open && (
        <div className="border-t border-slate-800 bg-slate-950 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-slate-300">
                {link.label}
              </Link>
            ))}
            <Link href="/#contact" onClick={() => setOpen(false)} className="text-slate-300">Contact</Link>
            <Link href="/quote" onClick={() => setOpen(false)} className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200">Get Quote</Link>
            <Link href="/book" onClick={() => setOpen(false)} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Book</Link>
          </div>
        </div>
      )}
    </header>
  );
}
