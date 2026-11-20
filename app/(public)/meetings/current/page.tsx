
import { Suspense } from "react";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { getCurrentMeeting } from "@/lib/meetings-db";
import type { ReactNode } from "react";

async function CurrentMeetingContent(): Promise<ReactNode> {
  await connection();

  const currentMeeting = await getCurrentMeeting();

  if (!currentMeeting) {
    redirect("/meetings");
  }

  redirect(`/meetings/${currentMeeting.id}`);
}

export default function CurrentMeetingPage() {
  return (
    <Suspense
      fallback={
        <p className="p-8 text-center">
          Loading current meeting...
        </p>
      }
    >
      <CurrentMeetingContent />
    </Suspense>
  );
}
