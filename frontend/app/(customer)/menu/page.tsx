'use client';

import { Header } from '@/components/layout/header';
import { MenuCard } from '@/components/menu/menu-card';
import { fetchMenu } from '@/services/menu.service';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

export default function MenuPage() {
  const companyId = process.env.NEXT_PUBLIC_COMPANY_ID || '';
  const { data, isLoading } = useQuery({ queryKey: ['menu', companyId], queryFn: () => fetchMenu(companyId) });

  if (isLoading) return <p className="p-4">Loading menu...</p>;
  if (!data) return <p className="p-4">Menu unavailable.</p>;

  return (
    <main className="mx-auto max-w-lg pb-24">
      <Header title="Digital Menu" />
      <div className="space-y-6 p-4">
        {data.categories.map((category) => (
          <section key={category.id} className="space-y-3">
            <h2 className="text-base font-bold">{category.name}</h2>
            <div className="grid gap-3">
              {category.products.map((product) => (
                <MenuCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        ))}
      </div>
      <Link href="/cart" className="fixed bottom-4 right-4 rounded-full bg-black px-5 py-3 text-white shadow-lg">
        View Cart
      </Link>
    </main>
  );
}
