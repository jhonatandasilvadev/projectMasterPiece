import { Request, Response } from 'express';
import { z } from 'zod';
import { getTableByNumber, openTabService } from '../services/table.service';

const openTabSchema = z.object({
  companyId: z.string().min(1),
  tableNumber: z.number().int().positive(),
  seatNumber: z.number().int().positive(),
  customerName: z.string().min(2),
  customerCpf: z.string().min(11)
});

export async function getTable(req: Request, res: Response) {
  const companyId = String(req.query.companyId || '');
  const tableNumber = Number(req.params.tableNumber);

  if (!companyId) return res.status(400).json({ message: 'companyId is required' });

  const table = await getTableByNumber(companyId, tableNumber);
  if (!table) return res.status(404).json({ message: 'Table not found' });

  return res.json(table);
}

export async function openTab(req: Request, res: Response) {
  try {
    const payload = openTabSchema.parse(req.body);
    const tab = await openTabService(payload);
    return res.status(201).json(tab);
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message });
  }
}
