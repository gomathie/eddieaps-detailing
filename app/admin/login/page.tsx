"use client";

import { useState } from 'react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (username === 'admin' && password === 'eddie-aps-admin-2026') {
      setMessage('Login simulated successfully.');
    } else {
      setMessage('Invalid credentials.');
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <h1 className="mb-6 text-3xl font-black text-white">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input value={username} onChange={(event) => setUsername(event.target.value)} className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white" placeholder="Username" />
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white" placeholder="Password" />
          <button type="submit" className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white">Sign In</button>
        </form>
        {message && <p className="mt-4 text-sm text-slate-300">{message}</p>}
      </div>
    </main>
  );
}
