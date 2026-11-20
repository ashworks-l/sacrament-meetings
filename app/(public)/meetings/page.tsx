
import { Suspense } from "react";
import { getPaginatedMeetings } from "@/lib/meetings-db";
import MeetingCard from "@/components/MeetingCard";
import MeetingSearch from "@/components/MeetingSearch";
import Pagination from "@/components/Pagination";

interface MeetingsPageProps {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}

export default async function MeetingsPage({
  searchParams,
}: MeetingsPageProps) {
  const params = await searchParams;

  const query = params.query ?? "";
  const requestedPage = Number(params.page ?? "1");

  const page =
    Number.isInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  const {
    meetings,
    totalPages,
    currentPage,
    totalMeetings,
  } = await getPaginatedMeetings(query, page);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="mb-3 text-3xl font-bold">
          Sacrament Meetings
        </h1>

        <p className="text-gray-600">
          Browse and search sacrament meeting programs.
        </p>
      </div>

      <Suspense fallback={<p>Loading search...</p>}>
        <MeetingSearch />
      </Suspense>

      <p className="mb-6 text-sm text-gray-600">
        {totalMeetings} meeting(s) found.
      </p>

      {meetings.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      ) : (
        <p className="rounded-lg border p-6 text-center">
          No meetings found. Try a different search.
        </p>
      )}

      <Suspense fallback={null}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </Suspense>
    </section>
  );
}
