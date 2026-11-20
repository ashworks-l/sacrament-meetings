
import { sql } from "./db";

import type {
  SacramentMeeting,
  MeetingType,
  Hymn,
  SpeakerItem,
  WardBusinessItem,
} from "./types";

interface MeetingRow {
  id: number;
  date: string | Date;
  date_text: string;
  meeting_type: string;
  presiding: string;
  conducting: string;
  announcements: string[] | null;
  opening_hymn: Hymn;
  opening_prayer: string;
  ward_business: WardBusinessItem[];
  stake_business: boolean;
  sacrament_hymn: Hymn;
  speakers: SpeakerItem[];
  closing_hymn: Hymn;
  closing_prayer: string;
}

function mapMeeting(row: MeetingRow): SacramentMeeting {
  return {
    id: row.id,
    date: row.date_text,
    meetingType: row.meeting_type as MeetingType,
    presiding: row.presiding,
    conducting: row.conducting,
    announcements: row.announcements ?? [],
    openingHymn: row.opening_hymn,
    openingPrayer: row.opening_prayer,
    wardBusiness: row.ward_business,
    stakeBusiness: row.stake_business,
    sacramentHymn: row.sacrament_hymn,
    speakers: row.speakers,
    closingHymn: row.closing_hymn,
    closingPrayer: row.closing_prayer,
  };
}

export async function getMeetings(
  date?: string
): Promise<SacramentMeeting[]> {
  const rows = date
    ? await sql`
        SELECT *, to_char(date, 'YYYY-MM-DD') AS date_text
        FROM meetings
        WHERE date = ${date}::date
        ORDER BY date DESC
      `
    : await sql`
        SELECT *, to_char(date, 'YYYY-MM-DD') AS date_text
        FROM meetings
        ORDER BY date DESC
      `;

  return (rows as unknown as MeetingRow[]).map(mapMeeting);
}

export async function getMeetingById(
  id: number
): Promise<SacramentMeeting | undefined> {
  const rows = await sql`
    SELECT *, to_char(date, 'YYYY-MM-DD') AS date_text
    FROM meetings
    WHERE id = ${id}
    LIMIT 1
  `;

  if (rows.length === 0) {
    return undefined;
  }

  return mapMeeting(rows[0] as unknown as MeetingRow);
}

export async function getCurrentMeeting(): Promise<
  SacramentMeeting | undefined
> {
  const today = new Date();

  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const rows = await sql`
    SELECT *, to_char(date, 'YYYY-MM-DD') AS date_text
    FROM meetings
    WHERE date <= ${todayString}::date
    ORDER BY date DESC
    LIMIT 1
  `;

  if (rows.length === 0) {
    return undefined;
  }

  return mapMeeting(rows[0] as unknown as MeetingRow);
}
