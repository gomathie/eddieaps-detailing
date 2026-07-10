"use client";

import Link from 'next/link';
import { useState } from 'react';

const vehicleTypes = ['Sedan', 'SUV', 'Crossover', 'Pickup Truck', 'Minivan / Van', 'Sport Coupe', 'Motorcycle'];
const servicesList = [
  'Complete Detailing',
  'Deep Interior Detailing',
  'Exterior Detailing',
  'Engine Detailing',
  'Paint Polishing & Correction',
  'Headlight Restoration',
  'Waxing & Paint Sealing',
  'Ceramic Paint Protection',
];
const timeSlots = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];

export default function BookPage() {
  const [form, setForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: new Date().getFullYear(),
    vehicleType: 'Sedan',
    serviceName: '',
    preferredDate: '',
    preferredTime: '',
    address: '',
    isMobile: true,
    notes: '',
    imageUrls: [] as string[],
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string | number | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Unable to submit booking');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Unable to submit booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-slate-950/50">
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-3xl font-black text-white sm:text-4xl">Book Your Detailing Session</h1>
          <p className="text-slate-400">Tell us about your vehicle and we’ll confirm your appointment.</p>
        </div>

        {submitted ? (
          <div className="rounded-2xl border border-emerald-700/40 bg-emerald-950/30 p-8 text-center">
            <h2 className="mb-3 text-2xl font-semibold text-white">Booking Request Received</h2>
            <p className="text-slate-300">Thanks, {form.customerName || 'there'}. Your request has been received and we’ll contact you shortly.</p>
            <Link href="/" className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white">Back Home</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">Full Name</label>
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
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">Vehicle Make</label>
                <input required value={form.vehicleMake} onChange={(event) => handleChange('vehicleMake', event.target.value)} className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">Vehicle Model</label>
                <input required value={form.vehicleModel} onChange={(event) => handleChange('vehicleModel', event.target.value)} className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">Vehicle Year</label>
                <input required type="number" value={form.vehicleYear} onChange={(event) => handleChange('vehicleYear', Number(event.target.value))} className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white" />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">Vehicle Type</label>
                <select value={form.vehicleType} onChange={(event) => handleChange('vehicleType', event.target.value)} className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white">
                  {vehicleTypes.map((type) => (<option key={type} value={type}>{type}</option>))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">Service</label>
                <select value={form.serviceName} onChange={(event) => handleChange('serviceName', event.target.value)} className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white">
                  <option value="">Select a service</option>
                  {servicesList.map((service) => (<option key={service} value={service}>{service}</option>))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">Preferred Date</label>
                <input type="date" value={form.preferredDate} onChange={(event) => handleChange('preferredDate', event.target.value)} className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-300">Preferred Time</label>
                <select value={form.preferredTime} onChange={(event) => handleChange('preferredTime', event.target.value)} className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white">
                  <option value="">Select time</option>
                  {timeSlots.map((slot) => (<option key={slot} value={slot}>{slot}</option>))}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">Address</label>
              <input value={form.address} onChange={(event) => handleChange('address', event.target.value)} className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-300">Notes</label>
              <textarea rows={4} value={form.notes} onChange={(event) => handleChange('notes', event.target.value)} className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white" />
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <input type="checkbox" checked={form.isMobile} onChange={(event) => handleChange('isMobile', event.target.checked)} />
              <span>Mobile service requested</span>
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button type="submit" disabled={loading} className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:opacity-60">
              {loading ? 'Submitting...' : 'Submit Booking'}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
