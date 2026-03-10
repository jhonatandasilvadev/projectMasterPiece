import { Request, Response } from 'express';
import { z } from 'zod';
import { loginService } from '../services/auth.service';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export async function login(req: Request, res: Response) {
  try {
    const input = loginSchema.parse(req.body);
    const result = await loginService(input.email, input.password);
    return res.json(result);
  } catch {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
}
