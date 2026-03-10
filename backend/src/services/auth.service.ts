import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { prisma } from '../config/prisma';

export async function loginService(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ companyId: user.companyId, role: user.role }, env.jwtSecret, {
    subject: user.id,
    expiresIn: '12h'
  });

  return { token, user };
}
