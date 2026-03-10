import { OrderStatus } from '@prisma/client';
import { prisma } from '../config/prisma';

export type CreateOrderInput = {
  companyId: string;
  tabId: string;
  notes?: string;
  items: Array<{ productId: string; quantity: number; notes?: string }>;
};

export async function createOrderService(input: CreateOrderInput) {
  const products = await prisma.product.findMany({
    where: {
      companyId: input.companyId,
      id: { in: input.items.map((item) => item.productId) }
    }
  });

  if (products.length !== input.items.length) {
    throw new Error('Some products were not found');
  }

  const totalAmount = input.items.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId)!;
    return sum + Number(product.price) * item.quantity;
  }, 0);

  return prisma.order.create({
    data: {
      companyId: input.companyId,
      tabId: input.tabId,
      notes: input.notes,
      totalAmount,
      items: {
        create: input.items.map((item) => {
          const product = products.find((p) => p.id === item.productId)!;
          return {
            companyId: input.companyId,
            productId: item.productId,
            quantity: item.quantity,
            notes: item.notes,
            unitPrice: product.price
          };
        })
      }
    },
    include: {
      items: { include: { product: true } },
      tab: true
    }
  });
}

export function listKitchenOrdersService(companyId: string) {
  return prisma.order.findMany({
    where: { companyId },
    orderBy: { createdAt: 'desc' },
    include: {
      tab: { include: { table: true, seat: true } },
      items: { include: { product: true } }
    }
  });
}

export async function updateOrderStatusService(companyId: string, orderId: string, status: OrderStatus) {
  const existingOrder = await prisma.order.findFirst({ where: { id: orderId, companyId } });
  if (!existingOrder) throw new Error('Order not found');

  return prisma.order.update({
    where: { id: orderId },
    data: { status },
    include: { items: { include: { product: true } }, tab: true }
  });
}
