
import { sql } from "./db";

import type {
  SacramentMeeting,
  MeetingType,
  Hymn,
  SpeakerItem,
  WardBusinessItem,
} from "./types";

const PAGE_SIZE = 5;

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

interface CountRow {
  total: number;
}

export interface PaginatedMeetings {
  meetings: SacramentMeeting[];
  totalMeetings: number;
  totalPages: number;
  currentPage: number;
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
    wardBusiness: row.ward_business ?? [],
    stakeBusiness: row.stake_business,
    sacramentHymn: row.sacrament_hymn,
    speakers: row.speakers ?? [],
    closingHymn: row.closing_hymn,
    closingPrayer: row.closing_prayer,
  };
}

// Get all meetings, optionally filtered by date.
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

// Get meetings with URL-based search and pagination.
export async function getPaginatedMeetings(
  query: string = "",
  page: number = 1
): Promise<PaginatedMeetings> {
  const searchTerm = query.trim();
  const currentPage = Math.max(1, Math.floor(page) || 1);
  const offset = (currentPage - 1) * PAGE_SIZE;

  const countRows = await sql`
    SELECT COUNT(*)::int AS total
    FROM meetings
    WHERE (
      ${searchTerm} = ''
      OR presiding ILIKE '%' || ${searchTerm} || '%'
      OR conducting ILIKE '%' || ${searchTerm} || '%'
      OR meeting_type ILIKE '%' || ${searchTerm} || '%'
      OR EXISTS (
        SELECT 1
        FROM jsonb_array_elements(
          COALESCE(speakers, '[]'::jsonb)
        ) AS speaker
        WHERE speaker->>'name' ILIKE '%' || ${searchTerm} || '%'
      )
    )
  `;

  const totalMeetings =
    (countRows[0] as unknown as CountRow).total;

  const totalPages = Math.ceil(totalMeetings / PAGE_SIZE);

  const rows = await sql`
    SELECT *, to_char(date, 'YYYY-MM-DD') AS date_text
    FROM meetings
    WHERE (
      ${searchTerm} = ''
      OR presiding ILIKE '%' || ${searchTerm} || '%'
      OR conducting ILIKE '%' || ${searchTerm} || '%'
      OR meeting_type ILIKE '%' || ${searchTerm} || '%'
      OR EXISTS (
        SELECT 1
        FROM jsonb_array_elements(
          COALESCE(speakers, '[]'::jsonb)
        ) AS speaker
        WHERE speaker->>'name' ILIKE '%' || ${searchTerm} || '%'
      )
    )
    ORDER BY date DESC
    LIMIT ${PAGE_SIZE}
    OFFSET ${offset}
  `;

  return {
    meetings: (rows as unknown as MeetingRow[]).map(mapMeeting),
    totalMeetings,
    totalPages,
    currentPage,
  };
}

// Get one meeting by its ID.
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


// Get the meeting scheduled for this Sunday's exact date.
export async function getCurrentMeeting(): Promise<
  SacramentMeeting | undefined
> {
  const today = new Date();

  // Find this week's Sunday.
  const sunday = new Date(today);
  sunday.setDate(today.getDate() + (7 - today.getDay()) % 7);

  const sundayString = [
    sunday.getFullYear(),
    String(sunday.getMonth() + 1).padStart(2, "0"),
    String(sunday.getDate()).padStart(2, "0"),
  ].join("-");

  const rows = await sql`
    SELECT *, to_char(date, 'YYYY-MM-DD') AS date_text
    FROM meetings
    WHERE date = ${sundayString}::date
    LIMIT 1
  `;

  if (rows.length === 0) {
    return undefined;
  }

  return mapMeeting(rows[0] as unknown as MeetingRow);
}