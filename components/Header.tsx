
export default function Header() {
  return (
    <header className="bg-blue-900 text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div>
          <h1 className="text-2xl font-bold">
            Sacrament Meeting Planner
          </h1>
          <p className="mt-1 text-sm text-blue-100">
            Sunday Worship Services
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm font-medium">
            My Ward
          </p>
          <p className="text-xs text-blue-200">
            Sunday Meeting
          </p>
        </div>
      </div>
    </header>
  );
}
