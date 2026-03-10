'use client';

import { patchOrderStatus } from '@/services/order.service';
import { Order } from '@/types';

const statuses: Order['status'][] = ['RECEIVED', 'PREPARING', 'READY', 'DELIVERED'];

export function KitchenOrderCard({
  order,
  companyId,
  token,
  onStatusChanged
}: {
  order: Order;
  companyId: string;
  token: string;
  onStatusChanged: () => void;
}) {
  return (
    <article className="rounded-xl bg-white p-4 shadow">
      <div className="flex justify-between">
        <h4 className="font-bold">Order #{order.id.slice(-6)}</h4>
        <span className="text-sm">{order.status}</span>
      </div>
      <ul className="mt-3 space-y-1 text-sm text-slate-600">
        {order.items.map((item) => (
          <li key={item.id}>
            {item.quantity}x {item.product.name}
          </li>
        ))}
      </ul>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={async () => {
              await patchOrderStatus(companyId, order.id, status, token);
              onStatusChanged();
            }}
            className="rounded-lg border px-2 py-1 text-xs"
          >
            {status}
          </button>
        ))}
      </div>
    </article>
  );
}
