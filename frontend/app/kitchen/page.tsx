'use client';

import { Header } from '@/components/layout/header';
import { KitchenOrderCard } from '@/components/orders/kitchen-order-card';
import { fetchKitchenOrders } from '@/services/order.service';
import { socket } from '@/sockets/client';
import { Order } from '@/types';
import { useEffect, useState } from 'react';

export default function KitchenPage() {
  const companyId = process.env.NEXT_PUBLIC_COMPANY_ID || '';
  const [orders, setOrders] = useState<Order[]>([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(localStorage.getItem('kitchen_token') || '');
  }, []);

  async function refreshOrders() {
    if (!token) return;
    const data = await fetchKitchenOrders(companyId, token);
    setOrders(data);
  }

  useEffect(() => {
    if (!token) return;

    refreshOrders();
    socket.connect();
    socket.emit('join:kitchen', { companyId });

    socket.on('order:new', refreshOrders);
    socket.on('order:status-updated', refreshOrders);

    return () => {
      socket.off('order:new', refreshOrders);
      socket.off('order:status-updated', refreshOrders);
      socket.disconnect();
    };
  }, [token, companyId]);

  if (!token) {
    return (
      <main className="mx-auto max-w-lg p-4">
        <Header title="Kitchen Dashboard" />
        <p className="mt-4 rounded-lg bg-amber-100 p-4 text-sm">Set kitchen_token in localStorage from /admin login response.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl">
      <Header title="Kitchen Dashboard" />
      <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <KitchenOrderCard key={order.id} order={order} companyId={companyId} token={token} onStatusChanged={refreshOrders} />
        ))}
      </div>
    </main>
  );
}
