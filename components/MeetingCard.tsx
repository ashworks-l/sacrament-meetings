
import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-gray-900">
          {new Date(meeting.date + "T00:00:00").toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h2>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium capitalize text-blue-800">
          {meeting.meetingType}
        </span>
      </div>

      <div className="mt-4 space-y-2 text-sm text-gray-600">
        <p>
          <strong className="text-gray-800">Presiding:</strong>{" "}
          {meeting.presiding}
        </p>

        <p>
          <strong className="text-gray-800">Conducting:</strong>{" "}
          {meeting.conducting}
        </p>

        <p>
          <strong className="text-gray-800">Speakers:</strong>{" "}
          {meeting.speakers.length}
        </p>
      </div>

      <Link
        href={`/meetings/${meeting.id}`}
        className="mt-5 inline-block rounded-lg bg-blue-800 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-900"
      >
        View Meeting Details
      </Link>
    </article>
  );
}
