import { connection } from "next/server";
import { redirect } from "next/navigation";
import { getMeetings } from "@/lib/meetings-db";
import MeetingDetail from "@/components/MeetingDetail";

export default async function CurrentMeetingPage() {
  await connection();

  const meetings = getMeetings();

  const today = new Date();
  const sunday = new Date(today);

  sunday.setDate(today.getDate() - today.getDay());

  const sundayDate = [
    sunday.getFullYear(),
    String(sunday.getMonth() + 1).padStart(2, "0"),
    String(sunday.getDate()).padStart(2, "0"),
  ].join("-");

  const currentMeeting = meetings
    .filter((meeting) => meeting.date <= sundayDate)
    .sort((a, b) => b.date.localeCompare(a.date))[0];

  if (!currentMeeting) {
    redirect("/meetings");
  }

  return <MeetingDetail meeting={currentMeeting} />;
}