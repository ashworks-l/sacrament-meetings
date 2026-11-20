"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";
import MeetingDetail from "@/components/MeetingDetail";

export default function MeetingPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [meeting, setMeeting] = useState<SacramentMeeting | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMeeting() {
      try {
        const response = await fetch(`/api/meetings/${id}`);

        if (response.status === 404) {
          throw new Error("Meeting not found.");
        }

        if (!response.ok) {
          throw new Error("Failed to load meeting.");
        }

        const data: SacramentMeeting = await response.json();
        setMeeting(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchMeeting();
  }, [id]);

  if (loading) {
    return <p className="py-10 text-center">Loading meeting...</p>;
  }

  if (error || !meeting) {
    return (
      <section className="py-10 text-center">
        <p className="mb-4 text-red-600">{error || "Meeting not found."}</p>
        <Link href="/meetings" className="text-blue-700 underline">
          Back to meetings
        </Link>
      </section>
    );
  }

  return <MeetingDetail meeting={meeting} />;
}