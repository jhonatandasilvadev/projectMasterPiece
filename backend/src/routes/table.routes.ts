import { Router } from 'express';
import { getTable, openTab } from '../controllers/table.controller';

export const tableRouter = Router();

tableRouter.get('/:tableNumber', getTable);
tableRouter.post('/tabs/open', openTab);
