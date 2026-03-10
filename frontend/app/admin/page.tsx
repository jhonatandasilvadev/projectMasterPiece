'use client';

import { Header } from '@/components/layout/header';
import { QrPreview } from '@/components/qr/qr-preview';
import { api } from '@/services/api';
import { FormEvent, useMemo, useState } from 'react';

export default function AdminPage() {
  const [email, setEmail] = useState('owner@demo.com');
  const [password, setPassword] = useState('123456');
  const [token, setToken] = useState('');
  const [table, setTable] = useState(1);
  const [seat, setSeat] = useState(1);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  const url = useMemo(() => `${baseUrl}/table/${table}/seat/${seat}`, [baseUrl, table, seat]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { data } = await api.post('/auth/login', { email, password });
    setToken(data.token);
    localStorage.setItem('kitchen_token', data.token);
  }

  return (
    <main className="mx-auto max-w-lg">
      <Header title="Admin Dashboard" />
      <section className="space-y-4 p-4">
        <form onSubmit={handleLogin} className="space-y-2 rounded-xl bg-white p-4 shadow">
          <h2 className="font-bold">Staff Login</h2>
          <input className="w-full rounded border p-2" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="w-full rounded border p-2" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
          <button className="w-full rounded bg-black py-2 text-white">Login</button>
          {token ? <p className="text-xs text-emerald-700">Token saved to localStorage.</p> : null}
        </form>

        <div className="rounded-xl bg-white p-4 shadow">
          <h2 className="mb-3 font-bold">QR Generator</h2>
          <div className="mb-2 flex gap-2">
            <input className="w-full rounded border p-2" type="number" value={table} onChange={(e) => setTable(Number(e.target.value))} />
            <input className="w-full rounded border p-2" type="number" value={seat} onChange={(e) => setSeat(Number(e.target.value))} />
          </div>
          <QrPreview url={url} />
          <p className="mt-2 text-xs text-slate-500">{url}</p>
        </div>
      </section>
    </main>
  );
}
