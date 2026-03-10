import { prisma } from '../config/prisma';

export async function getTableByNumber(companyId: string, tableNumber: number) {
  return prisma.table.findUnique({
    where: { companyId_number: { companyId, number: tableNumber } },
    include: { seats: true }
  });
}

export async function openTabService(input: {
  companyId: string;
  tableNumber: number;
  seatNumber: number;
  customerName: string;
  customerCpf: string;
}) {
  const table = await prisma.table.findUnique({
    where: { companyId_number: { companyId: input.companyId, number: input.tableNumber } },
    include: { seats: true }
  });

  if (!table) throw new Error('Table not found');

  const seat = table.seats.find((item) => item.number === input.seatNumber);
  if (!seat) throw new Error('Seat not found');

  const openTab = await prisma.tab.findFirst({
    where: { companyId: input.companyId, tableId: table.id, seatId: seat.id, status: 'OPEN' }
  });

  if (openTab) return openTab;

  return prisma.tab.create({
    data: {
      companyId: input.companyId,
      tableId: table.id,
      seatId: seat.id,
      customerName: input.customerName,
      customerCpf: input.customerCpf
    }
  });
}
