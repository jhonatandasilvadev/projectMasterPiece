import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

type JwtPayload = {
  sub: string;
  companyId: string;
  role: 'OWNER' | 'ADMIN' | 'WAITER' | 'KITCHEN';
};

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const token = header.replace('Bearer ', '');
    const payload = jwt.verify(token, env.jwtSecret) as JwtPayload;
    req.auth = {
      userId: payload.sub,
      companyId: payload.companyId,
      role: payload.role
    };
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export function requireRoles(roles: Array<'OWNER' | 'ADMIN' | 'WAITER' | 'KITCHEN'>) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.auth || !roles.includes(req.auth.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    return next();
  };
}
