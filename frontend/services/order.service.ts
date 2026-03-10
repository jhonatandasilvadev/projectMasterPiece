import { api } from './api';
import { CartItem } from '@/types';

export async function submitOrder(companyId: string, tabId: string, items: CartItem[]) {
  const { data } = await api.post('/orders', {
    companyId,
    tabId,
    items: items.map((item) => ({ productId: item.product.id, quantity: item.quantity, notes: item.notes }))
  });
  return data;
}

export async function fetchKitchenOrders(companyId: string, token: string) {
  const { data } = await api.get('/orders/kitchen', {
    params: { companyId },
    headers: { Authorization: `Bearer ${token}` }
  });
  return data;
}

export async function patchOrderStatus(
  companyId: string,
  orderId: string,
  status: 'RECEIVED' | 'PREPARING' | 'READY' | 'DELIVERED',
  token: string
) {
  const { data } = await api.patch(
    `/orders/${orderId}/status`,
    { status },
    {
      params: { companyId },
      headers: { Authorization: `Bearer ${token}` }
    }
  );

  return data;
}
