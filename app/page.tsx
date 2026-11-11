
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-slate-50">
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="mb-4 font-semibold uppercase tracking-widest text-blue-700">
            Sunday Worship Services
          </p>

          <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
            Sacrament Meeting Planner
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Plan, organize, and review sacrament meeting programs.
            Keep announcements, hymns, prayers, and speakers
            organized in one place.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/meetings"
              className="rounded-lg bg-blue-800 px-6 py-3 font-semibold text-white hover:bg-blue-900"
            >
              View All Meetings
            </Link>

            <Link
              href="/meetings/current"
              className="rounded-lg border border-blue-800 px-6 py-3 font-semibold text-blue-800 hover:bg-blue-50"
            >
              Current Meeting
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <Image
            src="/meeting.svg"
            alt="Illustration of a chapel for a sacrament meeting"
            width={600}
            height={400}
            priority
            className="h-auto w-full max-w-lg"
          />
        </div>
      </section>

      <section className="border-t bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-3xl font-bold text-slate-900">
            Manage Your Meetings
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
            Find meeting information and review complete
            programs for current and past Sundays.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">
                Meeting Programs
              </h3>
              <p className="mt-3 text-slate-600">
                View complete meeting agendas and program details.
              </p>
            </div>

            <div className="rounded-xl border p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">
                Organized Information
              </h3>
              <p className="mt-3 text-slate-600">
                Keep track of hymns, prayers, announcements, and speakers.
              </p>
            </div>

            <div className="rounded-xl border p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">
                Printable Programs
              </h3>
              <p className="mt-3 text-slate-600">
                Print meeting programs for easy access and reference.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
