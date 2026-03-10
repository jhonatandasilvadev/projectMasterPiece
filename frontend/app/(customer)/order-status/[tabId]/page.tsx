'use client';

import { Header } from '@/components/layout/header';
import { socket } from '@/sockets/client';
import { Order } from '@/types';
import { useEffect, useState } from 'react';

export default function OrderStatusPage({ params }: { params: { tabId: string } }) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const companyId = process.env.NEXT_PUBLIC_COMPANY_ID || '';
    socket.connect();
    socket.emit('join:tab', { companyId, tabId: params.tabId });

    socket.on('order:new', (order: Order) => setOrders((current) => [order, ...current]));
    socket.on('order:status-updated', (updated: Order) =>
      setOrders((current) => current.map((order) => (order.id === updated.id ? updated : order)))
    );

    return () => {
      socket.off('order:new');
      socket.off('order:status-updated');
      socket.disconnect();
    };
  }, [params.tabId]);

  return (
    <main className="mx-auto max-w-lg">
      <Header title="Order Status" />
      <div className="space-y-3 p-4">
        {orders.map((order) => (
          <article key={order.id} className="rounded-xl bg-white p-4 shadow">
            <p className="font-semibold">Order #{order.id.slice(-6)}</p>
            <p className="text-sm">Status: {order.status}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
