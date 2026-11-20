
import { Suspense } from "react";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { getCurrentMeeting } from "@/lib/meetings-db";
import MeetingDetail from "@/components/MeetingDetail";

async function CurrentMeetingContent() {
  await connection();

  const currentMeeting = await getCurrentMeeting();

  if (!currentMeeting) {
    redirect("/meetings");
  }

  return <MeetingDetail meeting={currentMeeting} />;
}

export default function CurrentMeetingPage() {
  return (
    <Suspense fallback={<p className="p-8 text-center">Loading current meeting...</p>}>
      <CurrentMeetingContent />
    </Suspense>
  );
}
