"use client";

import Link from 'next/link';
import { useState } from 'react';

const servicesList = [
  'Complete Detailing',
  'Deep Interior Detailing',
  'Exterior Detailing',
  'Engine Detailing',
  'Paint Polishing & Correction',
  'Headlight Restoration',
  'Waxing & Paint Sealing',
  'Ceramic Paint Protection',
  'Multiple Vehicles / Custom Package',
];

const conditionsList = [
  { value: 'Excellent', label: 'Excellent (Clean, just needs light dust removal & seal)' },
  { value: 'Fair', label: 'Fair (Normal dust, small crumbs, minor water marks)' },
  { value: 'Needs Work', label: 'Needs Work (Pet hair, mud, beverage stains, light swirls)' },
  { value: 'Extremely Dirty', label: 'Extremely Dirty (Heavy staining, mold/mildew, deep scratches)' },
];

export default function QuotePage() {
  const [form, setForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: new Date().getFullYear(),
    serviceRequired: 'Complete Detailing',
    vehicleCondition: 'Fair',
    preferredDate: '',
    notes: '',
    imageUrls: [] as string[],
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field: string, value: string | number) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Unable to submit quote request');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Unable to submit quote request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-slate-950/50">
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-3xl font-black text-white sm:text-4xl">Request a Free Quote</h1>
          <p className="text-slate-400">Share your vehicle details and we’ll prepare a tailored estimate.</p>
        </div>

        {submitted ? (
          <div className="rounded-2xl border border-emerald-700/40 bg-emerald-950/30 p-8 text-center">
            <h2 className="mb-3 text-2xl font-semibold text-white">Quote Request Received</h2>
            <p className="text-slate-300">Thanks, {form.customerName || 'there'}. We’ll review your request and respond shortly.</p>
            <Link href="/" className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white">Back Home</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">Name</label>
                <input required value={form.customerName} onChange={(event) => handleChange('customerName', event.target.value)} className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">Email</label>
                <input required type="email" value={form.customerEmail} onChange={(event) => handleChange('customerEmail', event.target.value)} className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">Phone</label>
                <input required value={form.customerPhone} onChange={(event) => handleChange('customerPhone', event.target.value)} className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white" />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">Make</label>
                <input required value={form.vehicleMake} onChange={(event) => handleChange('vehicleMake', event.target.value)} className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">Model</label>
                <input required value={form.vehicleModel} onChange={(event) => handleChange('vehicleModel', event.target.value)} className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">Year</label>
                <input required type="number" value={form.vehicleYear} onChange={(event) => handleChange('vehicleYear', Number(event.target.value))} className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white" />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">Desired Service</label>
                <select value={form.serviceRequired} onChange={(event) => handleChange('serviceRequired', event.target.value)} className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white">
                  {servicesList.map((service) => (<option key={service} value={service}>{service}</option>))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">Target Date (Optional)</label>
                <input type="date" value={form.preferredDate} onChange={(event) => handleChange('preferredDate', event.target.value)} className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white" />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">Current Condition of Vehicle</label>
              <select value={form.vehicleCondition} onChange={(event) => handleChange('vehicleCondition', event.target.value)} className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white">
                {conditionsList.map((item) => (<option key={item.value} value={item.value}>{item.label}</option>))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">Specific Details</label>
              <textarea rows={4} value={form.notes} onChange={(event) => handleChange('notes', event.target.value)} className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white" />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button type="submit" disabled={loading} className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:opacity-60">
              {loading ? 'Submitting...' : 'Submit Quote Request'}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
