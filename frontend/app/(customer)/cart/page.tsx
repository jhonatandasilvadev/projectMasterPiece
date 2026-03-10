'use client';

import { Header } from '@/components/layout/header';
import { submitOrder } from '@/services/order.service';
import { useCartStore } from '@/store/cart.store';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();
  const { items, tabId, clearCart } = useCartStore();

  const total = items.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0);

  async function handleCheckout() {
    if (!tabId || items.length === 0) return;

    const companyId = process.env.NEXT_PUBLIC_COMPANY_ID || '';
    const order = await submitOrder(companyId, tabId, items);
    clearCart();
    router.push(`/order-status/${order.tabId}`);
  }

  return (
    <main className="mx-auto max-w-lg">
      <Header title="Your Cart" />
      <div className="space-y-3 p-4">
        {items.map((item) => (
          <div key={item.product.id} className="rounded-xl bg-white p-4 shadow">
            <p className="font-semibold">{item.product.name}</p>
            <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
          </div>
        ))}
        <div className="rounded-xl bg-white p-4 shadow">
          <p className="font-bold">Total: ${total.toFixed(2)}</p>
          <button className="mt-3 w-full rounded-lg bg-black py-2 text-white" onClick={handleCheckout}>
            Send Order
          </button>
        </div>
      </div>
    </main>
  );
}
