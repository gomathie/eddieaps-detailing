"use client";

import { useState } from 'react';

const faqs = [
  {
    question: 'Do you need access to water or electricity for mobile detailing?',
    answer: 'No. Our mobile detailing unit is fully equipped with an onboard water tank and generator.',
  },
  {
    question: 'What is the difference between stationed and mobile detailing?',
    answer: 'Mobile detailing comes to you, while stationed detailing takes place at our facility for deeper work.',
  },
  {
    question: 'How often should I get my vehicle detailed?',
    answer: 'We recommend detailing at least twice a year to preserve paint, interior comfort, and resale value.',
  },
];

export function HomePageClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="contact" className="bg-slate-900 py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">Contact</p>
          <h2 className="mb-6 text-3xl font-extrabold text-white sm:text-4xl">Ready to restore your vehicle?</h2>
          <p className="text-slate-400">Book a mobile visit or visit our shop for an expert detailing experience.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={faq.question} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="flex w-full items-center justify-between text-left text-white">
                <span className="font-semibold">{faq.question}</span>
                <span>{openIndex === index ? '−' : '+'}</span>
              </button>
              {openIndex === index && <p className="mt-3 text-sm leading-relaxed text-slate-400">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
