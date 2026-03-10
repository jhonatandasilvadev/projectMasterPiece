export function Header({ title }: { title: string }) {
  return (
    <header className="sticky top-0 z-20 border-b bg-white px-4 py-3">
      <h1 className="text-lg font-bold">{title}</h1>
    </header>
  );
}
