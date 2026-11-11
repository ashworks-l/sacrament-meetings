"use client";

import type { SacramentMeeting } from "@/lib/types";

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const formattedDate = new Date(
    meeting.date + "T00:00:00"
  ).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow-md">
      <header className="mb-8 border-b pb-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">
          Sacrament Meeting Planner
        </p>

        <h1 className="mt-3 text-3xl font-bold text-gray-900">
          Sacrament Meeting Program
        </h1>

        <p className="mt-2 text-gray-600">{formattedDate}</p>

        <p className="mt-2 font-medium capitalize text-blue-800">
          {meeting.meetingType} Meeting
        </p>
      </header>

      <section className="space-y-3 border-b pb-6">
        <p>
          <strong>Presiding:</strong> {meeting.presiding}
        </p>
        <p>
          <strong>Conducting:</strong> {meeting.conducting}
        </p>
      </section>

      {meeting.announcements && meeting.announcements.length > 0 && (
        <section className="border-b py-6">
          <h2 className="mb-3 text-xl font-bold text-gray-900">
            Announcements
          </h2>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            {meeting.announcements.map((announcement, index) => (
              <li key={index}>{announcement}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="border-b py-6">
        <h2 className="text-xl font-bold text-gray-900">Opening Hymn</h2>
        <p className="mt-2 text-gray-700">
          Hymn #{meeting.openingHymn.number} - {meeting.openingHymn.title}
        </p>

        <h2 className="mt-5 text-xl font-bold text-gray-900">
          Opening Prayer
        </h2>
        <p className="mt-2 text-gray-700">{meeting.openingPrayer}</p>
      </section>

      <section className="border-b py-6">
        <h2 className="text-xl font-bold text-gray-900">Ward Business</h2>

        {meeting.wardBusiness.length > 0 ? (
          <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-700">
            {meeting.wardBusiness.map((item, index) => (
              <li key={index}>{item.description}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-gray-500">No ward business.</p>
        )}

        <p className="mt-4 text-gray-700">
          <strong>Stake Business:</strong>{" "}
          {meeting.stakeBusiness ? "Yes" : "No"}
        </p>
      </section>

      {meeting.meetingType !== "stake" &&
        meeting.meetingType !== "general" && (
          <section className="border-b py-6">
            <h2 className="text-xl font-bold text-gray-900">
              Sacrament Hymn
            </h2>
            <p className="mt-2 text-gray-700">
              Hymn #{meeting.sacramentHymn.number} -{" "}
              {meeting.sacramentHymn.title}
            </p>
          </section>
        )}

      <section className="border-b py-6">
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          Speakers and Musical Numbers
        </h2>

        <div className="space-y-4">
          {meeting.speakers.map((item, index) => (
            <div key={index} className="rounded-lg bg-gray-50 p-4">
              <p className="font-semibold text-gray-900">{item.name}</p>
              <p className="mt-1 text-gray-600">{item.topic}</p>
              <span className="mt-2 inline-block text-sm capitalize text-blue-700">
                {item.type === "speaker" ? "Speaker" : "Musical Number"}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b py-6">
        <h2 className="text-xl font-bold text-gray-900">Closing Hymn</h2>
        <p className="mt-2 text-gray-700">
          Hymn #{meeting.closingHymn.number} - {meeting.closingHymn.title}
        </p>

        <h2 className="mt-5 text-xl font-bold text-gray-900">
          Closing Prayer
        </h2>
        <p className="mt-2 text-gray-700">{meeting.closingPrayer}</p>
      </section>

      <div className="mt-8 text-center print:hidden">
        <button
          onClick={() => window.print()}
          className="rounded-lg bg-blue-800 px-6 py-3 font-semibold text-white hover:bg-blue-900"
        >
          Print Meeting Program
        </button>
      </div>
    </article>
  );
}
