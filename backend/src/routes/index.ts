import { Router } from 'express';
import { authRouter } from './auth.routes';
import { menuRouter } from './menu.routes';
import { orderRouter } from './order.routes';
import { tableRouter } from './table.routes';

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/tables', tableRouter);
apiRouter.use('/menu', menuRouter);
apiRouter.use('/orders', orderRouter);
