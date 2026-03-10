import bcrypt from 'bcryptjs';
import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

const DEMO_COMPANY_ID = 'demo-company';
const OWNER_EMAIL = 'owner@demo.com';

async function main() {
  const hashedPassword = await bcrypt.hash('123456', 10);

  await prisma.company.upsert({
    where: { id: DEMO_COMPANY_ID },
    update: { name: 'Demo Bistro' },
    create: {
      id: DEMO_COMPANY_ID,
      name: 'Demo Bistro'
    }
  });

  await prisma.user.upsert({
    where: { email: OWNER_EMAIL },
    update: {
      name: 'Owner User',
      password: hashedPassword,
      role: UserRole.OWNER,
      companyId: DEMO_COMPANY_ID
    },
    create: {
      name: 'Owner User',
      email: OWNER_EMAIL,
      password: hashedPassword,
      role: UserRole.OWNER,
      companyId: DEMO_COMPANY_ID
    }
  });

  const existingTables = await prisma.table.findMany({ where: { companyId: DEMO_COMPANY_ID } });
  if (existingTables.length === 0) {
    await prisma.table.create({
      data: {
        companyId: DEMO_COMPANY_ID,
        number: 1,
        name: 'Table 1',
        seats: { create: [{ companyId: DEMO_COMPANY_ID, number: 1 }, { companyId: DEMO_COMPANY_ID, number: 2 }, { companyId: DEMO_COMPANY_ID, number: 3 }, { companyId: DEMO_COMPANY_ID, number: 4 }] }
      }
    });

    await prisma.table.create({
      data: {
        companyId: DEMO_COMPANY_ID,
        number: 2,
        name: 'Table 2',
        seats: { create: [{ companyId: DEMO_COMPANY_ID, number: 1 }, { companyId: DEMO_COMPANY_ID, number: 2 }] }
      }
    });
  }

  const existingMenu = await prisma.menu.findFirst({ where: { companyId: DEMO_COMPANY_ID, name: 'Main Menu' } });
  if (!existingMenu) {
    await prisma.menu.create({
      data: {
        companyId: DEMO_COMPANY_ID,
        name: 'Main Menu',
        categories: {
          create: [
            {
              companyId: DEMO_COMPANY_ID,
              name: 'Burgers',
              position: 1,
              products: {
                create: [
                  {
                    companyId: DEMO_COMPANY_ID,
                    name: 'Classic Burger',
                    description: 'Beef, lettuce, tomato, house sauce',
                    price: 29.9,
                    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
                    preparationTime: 15
                  },
                  {
                    companyId: DEMO_COMPANY_ID,
                    name: 'Bacon Burger',
                    description: 'Beef, bacon, cheddar, onions',
                    price: 34.9,
                    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349',
                    preparationTime: 18
                  }
                ]
              }
            },
            {
              companyId: DEMO_COMPANY_ID,
              name: 'Drinks',
              position: 2,
              products: {
                create: [
                  {
                    companyId: DEMO_COMPANY_ID,
                    name: 'Soda',
                    description: '350ml can',
                    price: 7.5,
                    image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e',
                    preparationTime: 2
                  }
                ]
              }
            }
          ]
        }
      }
    });
  }

  console.log('Seed complete for company demo-company');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
