
import type { SacramentMeeting } from "./types";

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: "2026-11-08",
    meetingType: "testimony",
    presiding: "Bishop John Smith",
    conducting: "Brother David Brown",
    announcements: [
      "Ward temple trip next Saturday.",
      "Youth activity on Wednesday at 6 PM.",
    ],
    openingHymn: {
      number: 2,
      title: "The Spirit of God",
    },
    openingPrayer: "Sister Mary Johnson",
    wardBusiness: [
      { description: "Sustaining of new ward teachers." },
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 169,
      title: "As Now We Take the Sacrament",
    },
    speakers: [
      {
        name: "Sarah Williams",
        topic: "Faith in Jesus Christ",
        type: "speaker",
      },
      {
        name: "Michael Davis",
        topic: "The Power of Prayer",
        type: "speaker",
      },
    ],
    closingHymn: {
      number: 124,
      title: "Be Still, My Soul",
    },
    closingPrayer: "Brother Peter Wilson",
  },
  {
    id: 2,
    date: "2026-11-01",
    meetingType: "regular",
    presiding: "Bishop John Smith",
    conducting: "Brother David Brown",
    announcements: ["Ward conference will be held next month."],
    openingHymn: {
      number: 19,
      title: "We Thank Thee, O God, for a Prophet",
    },
    openingPrayer: "Sister Anna Garcia",
    wardBusiness: [
      { description: "Presentation of the ward budget." },
    ],
    stakeBusiness: true,
    sacramentHymn: {
      number: 185,
      title: "Reverently and Meekly Now",
    },
    speakers: [
      {
        name: "Emily Taylor",
        topic: "Following the Savior",
        type: "speaker",
      },
      {
        name: "Robert Miller",
        topic: "Serving Others",
        type: "speaker",
      },
    ],
    closingHymn: {
      number: 85,
      title: "How Firm a Foundation",
    },
    closingPrayer: "Brother James Clark",
  },
  {
    id: 3,
    date: "2026-10-25",
    meetingType: "regular",
    presiding: "Bishop John Smith",
    conducting: "Sister Laura White",
    announcements: ["Remember the upcoming food donation drive."],
    openingHymn: {
      number: 6,
      title: "Redeemer of Israel",
    },
    openingPrayer: "Brother Daniel Lee",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 181,
      title: "Jesus of Nazareth, Savior and King",
    },
    speakers: [
      {
        name: "Ward Choir",
        topic: "I Know That My Redeemer Lives",
        type: "musical-number",
      },
      {
        name: "Olivia Anderson",
        topic: "The Book of Mormon",
        type: "speaker",
      },
    ],
    closingHymn: {
      number: 100,
      title: "Nearer, My God, to Thee",
    },
    closingPrayer: "Sister Rachel Moore",
  },
  {
    id: 4,
    date: "2026-10-18",
    meetingType: "stake",
    presiding: "Stake President Thomas Green",
    conducting: "Brother Daniel Lee",
    announcements: ["Stake leadership training next Sunday."],
    openingHymn: {
      number: 27,
      title: "Praise to the Man",
    },
    openingPrayer: "Brother Mark Hall",
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: {
      number: 0,
      title: "Not applicable",
    },
    speakers: [
      {
        name: "President Thomas Green",
        topic: "Strengthening Families",
        type: "speaker",
      },
    ],
    closingHymn: {
      number: 98,
      title: "I Need Thee Every Hour",
    },
    closingPrayer: "Sister Grace Adams",
  },
  {
    id: 5,
    date: "2026-10-11",
    meetingType: "general",
    presiding: "Bishop John Smith",
    conducting: "Brother David Brown",
    announcements: ["Ward service project this Saturday."],
    openingHymn: {
      number: 3,
      title: "Now Let Us Rejoice",
    },
    openingPrayer: "Sister Mary Johnson",
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 0,
      title: "Not applicable",
    },
    speakers: [
      {
        name: "Michael Davis",
        topic: "General Conference Messages",
        type: "speaker",
      },
    ],
    closingHymn: {
      number: 89,
      title: "The Lord Is My Shepherd",
    },
    closingPrayer: "Brother Peter Wilson",
  },
];

export function getMeetings(date?: string): SacramentMeeting[] {
  if (!date) {
    return [...meetings].sort((a, b) =>
      b.date.localeCompare(a.date)
    );
  }

  return meetings
    .filter((meeting) => meeting.date === date)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getMeetingById(
  id: number
): SacramentMeeting | undefined {
  return meetings.find((meeting) => meeting.id === id);
}

export function getCurrentMeeting(): SacramentMeeting | undefined {
  const today = new Date();
  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  return getMeetings().find((meeting) => meeting.date <= todayString);
}
