"use client";

import Image from 'next/image';
import { useState } from 'react';

const galleryItems = [
  { id: 1, title: 'Leather Seat Steam Restoration', category: 'Interior', type: 'image', image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d59085?auto=format&fit=crop&q=80&w=800' },
  { id: 2, title: 'Swirl Mark Paint Correction', category: 'Paint Correction', type: 'image', image: 'https://images.unsplash.com/photo-1520340356584-f9917d1ecc6f?auto=format&fit=crop&q=80&w=800' },
  { id: 3, title: 'Hazy Headlight UV Restoration', category: 'Headlights', type: 'image', image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800' },
  { id: 4, title: 'Deep Carpet Shampooing', category: 'Interior', type: 'image', image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&q=80&w=800' },
];

const categories = ['All', 'Interior', 'Exterior', 'Paint Correction', 'Engine', 'Headlights'];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems = galleryItems.filter((item) => activeCategory === 'All' || item.category === activeCategory);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h1 className="mb-4 text-4xl font-black text-white sm:text-5xl">Detailing Portfolio Gallery</h1>
          <p className="text-lg text-slate-400">Browse a showcase of transformations from interior resets to paint correction.</p>
        </div>
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button key={category} onClick={() => setActiveCategory(category)} className={`rounded-full border px-4 py-2 text-sm font-semibold ${activeCategory === category ? 'border-blue-500 bg-blue-600 text-white' : 'border-slate-700 bg-slate-900 text-slate-400'}`}>
              {category}
            </button>
          ))}
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {filteredItems.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
              <div className="relative h-72">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <div className="flex items-center justify-between p-6">
                <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                <span className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1 text-xs font-semibold text-blue-400">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
