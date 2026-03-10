import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

export async function getMenu(req: Request, res: Response) {
  const companyId = String(req.query.companyId || '');
  if (!companyId) return res.status(400).json({ message: 'companyId is required' });

  const menu = await prisma.menu.findFirst({
    where: { companyId, isPublished: true },
    include: {
      categories: {
        orderBy: { position: 'asc' },
        include: {
          products: {
            where: { isAvailable: true },
            orderBy: { name: 'asc' }
          }
        }
      }
    }
  });

  if (!menu) return res.status(404).json({ message: 'Menu not found' });
  return res.json(menu);
}
