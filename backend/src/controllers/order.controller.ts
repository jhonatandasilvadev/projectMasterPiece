import { OrderStatus } from '@prisma/client';
import { Request, Response } from 'express';
import { z } from 'zod';
import { io } from '../sockets/io';
import {
  createOrderService,
  listKitchenOrdersService,
  updateOrderStatusService
} from '../services/order.service';

const createOrderSchema = z.object({
  companyId: z.string().min(1),
  tabId: z.string().min(1),
  notes: z.string().optional(),
  items: z.array(
    z.object({
      productId: z.string().min(1),
      quantity: z.number().int().positive(),
      notes: z.string().optional()
    })
  )
});

const updateStatusSchema = z.object({
  status: z.nativeEnum(OrderStatus)
});

export async function createOrder(req: Request, res: Response) {
  try {
    const input = createOrderSchema.parse(req.body);
    const order = await createOrderService(input);

    io.to(`company:${order.companyId}:kitchen`).emit('order:new', order);
    io.to(`company:${order.companyId}:tab:${order.tabId}`).emit('order:new', order);

    return res.status(201).json(order);
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
  }
}

export async function listKitchenOrders(req: Request, res: Response) {
  const companyId = String(req.query.companyId || req.auth?.companyId || '');
  if (!companyId) return res.status(400).json({ message: 'companyId is required' });

  const orders = await listKitchenOrdersService(companyId);
  return res.json(orders);
}

export async function updateOrderStatus(req: Request, res: Response) {
  const companyId = String(req.query.companyId || req.auth?.companyId || '');
  if (!companyId) return res.status(400).json({ message: 'companyId is required' });

  try {
    const { status } = updateStatusSchema.parse(req.body);
    const order = await updateOrderStatusService(companyId, req.params.orderId, status);

    io.to(`company:${companyId}:kitchen`).emit('order:status-updated', order);
    io.to(`company:${companyId}:tab:${order.tabId}`).emit('order:status-updated', order);

    return res.json(order);
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
  }
}
