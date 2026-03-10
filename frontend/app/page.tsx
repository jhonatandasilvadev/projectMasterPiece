import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col gap-4 p-6">
      <h1 className="text-2xl font-bold">Restaurant SaaS MVP</h1>
      <Link className="rounded bg-black px-4 py-2 text-white" href="/menu">
        Customer Menu
      </Link>
      <Link className="rounded bg-black px-4 py-2 text-white" href="/kitchen">
        Kitchen Dashboard
      </Link>
      <Link className="rounded bg-black px-4 py-2 text-white" href="/admin">
        Admin Dashboard
      </Link>
    </main>
  );
}
