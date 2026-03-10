'use client';

import { motion } from 'framer-motion';
import { useCartStore } from '@/store/cart.store';
import { Product } from '@/types';

export function MenuCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl bg-white p-4 shadow">
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-sm text-slate-500">{product.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="font-bold">${Number(product.price).toFixed(2)}</span>
        <button className="rounded-lg bg-black px-3 py-1.5 text-sm text-white" onClick={() => addItem(product)}>
          Add
        </button>
      </div>
    </motion.div>
  );
}
