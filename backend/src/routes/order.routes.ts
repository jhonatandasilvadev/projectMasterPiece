import { Router } from 'express';
import {
  createOrder,
  listKitchenOrders,
  updateOrderStatus
} from '../controllers/order.controller';
import { authMiddleware, requireRoles } from '../middleware/auth';

export const orderRouter = Router();

orderRouter.post('/', createOrder);
orderRouter.get('/kitchen', authMiddleware, requireRoles(['OWNER', 'ADMIN', 'KITCHEN']), listKitchenOrders);
orderRouter.patch(
  '/:orderId/status',
  authMiddleware,
  requireRoles(['OWNER', 'ADMIN', 'KITCHEN']),
  updateOrderStatus
);
