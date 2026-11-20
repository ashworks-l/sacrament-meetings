export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 py-8">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-2xl font-bold">
          Administration
        </h1>
        <p className="text-gray-600">
          Sacrament Meeting Planner
        </p>
      </header>

      <main>{children}</main>
    </div>
  );
}
