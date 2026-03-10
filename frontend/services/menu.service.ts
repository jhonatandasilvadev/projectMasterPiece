import { Menu } from '@/types';
import { api } from './api';

export async function fetchMenu(companyId: string): Promise<Menu> {
  const { data } = await api.get<Menu>('/menu', { params: { companyId } });
  return data;
}
