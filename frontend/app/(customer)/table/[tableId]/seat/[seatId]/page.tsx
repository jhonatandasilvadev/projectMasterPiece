'use client';

import { Header } from '@/components/layout/header';
import { api } from '@/services/api';
import { useCartStore } from '@/store/cart.store';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function OpenTabPage({ params }: { params: { tableId: string; seatId: string } }) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const setTabId = useCartStore((state) => state.setTabId);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const companyId = process.env.NEXT_PUBLIC_COMPANY_ID || '';

    const { data } = await api.post('/tables/tabs/open', {
      companyId,
      tableNumber: Number(params.tableId),
      seatNumber: Number(params.seatId),
      customerName: name,
      customerCpf: cpf
    });

    setTabId(data.id);
    router.push('/menu');
  }

  return (
    <main className="mx-auto max-w-md">
      <Header title={`Table ${params.tableId} - Seat ${params.seatId}`} />
      <form className="space-y-4 p-4" onSubmit={handleSubmit}>
        <input className="w-full rounded border p-3" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input className="w-full rounded border p-3" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
        <button className="w-full rounded-lg bg-black py-3 text-white">Open Tab</button>
      </form>
    </main>
  );
}
