
"use client";

import { useEffect, useState } from "react";
import type { SacramentMeeting } from "@/lib/types";
import MeetingCard from "@/components/MeetingCard";

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<SacramentMeeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMeetings() {
      try {
        const response = await fetch("/api/meetings");

        if (!response.ok) {
          throw new Error("Failed to load meetings.");
        }

        const data: SacramentMeeting[] = await response.json();
        setMeetings(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchMeetings();
  }, []);

  if (loading) {
    return <p className="py-10 text-center">Loading meetings...</p>;
  }

  if (error) {
    return <p className="py-10 text-center text-red-600">{error}</p>;
  }

  return (
    <section>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          All Sacrament Meetings
        </h1>

        <p className="mt-2 text-gray-600">
          View current and past meeting programs.
        </p>
      </div>

      {meetings.length === 0 ? (
        <p className="text-gray-600">No meetings found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      )}
    </section>
  );
}
