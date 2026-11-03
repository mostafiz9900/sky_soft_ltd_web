// Source: Dhaka Stock Exchange TREC holder directory (dse.com.bd/trec-holders), checked Nov 2026.
export type Client = {
  name: string;
  short: string;
  initials: string;
  trec?: string;
  area?: string;
  city?: "Dhaka" | "Chattogram";
  website?: string;
  note?: string;
  featured?: boolean;
};

export const clients: Client[] = [
  {
    name: "Benemoy Securities Limited",
    short: "Benemoy Securities",
    initials: "BS",
    trec: "291",
    area: "Paltan",
    city: "Dhaka",
    website: "https://benemoysecurities.com",
    note: "Web trading terminal and iOS / Android apps",
    featured: true,
  },
  {
    name: "Square Securities Management Limited",
    short: "Square Securities",
    initials: "SQ",
    trec: "076",
    area: "Motijheel",
    city: "Dhaka",
    website: "https://www.ssml.com.bd",
    note: "Brokerage arm of Square Group",
  },
  {
    name: "Md. Fakhrul Islam Securities Ltd.",
    short: "Fakhrul Islam Securities",
    initials: "FI",
    trec: "090",
    area: "Gulshan",
    city: "Dhaka",
    website: "https://www.fisbd.com",
  },
  {
    name: "Alhaj Securities & Stocks Limited",
    short: "Alhaj Securities",
    initials: "AS",
    trec: "093",
    area: "Motijheel",
    city: "Dhaka",
    website: "http://alhajsecurities.org",
  },
  {
    name: "T. K. Shares & Securities Limited",
    short: "T.K. Shares & Securities",
    initials: "TK",
    trec: "265",
    area: "Khatungonj",
    city: "Chattogram",
    note: "Also a Chittagong Stock Exchange member",
  },
  {
    name: "Columbia Shares And Securities Ltd.",
    short: "Columbia Securities",
    initials: "CS",
    trec: "287",
    area: "Banani",
    city: "Dhaka",
  },
  {
    name: "B & Bss Trade International Limited",
    short: "B & BSS",
    initials: "BB",
    trec: "295",
    area: "Motijheel",
    city: "Dhaka",
  },
  {
    name: "Fariha Securities Limited",
    short: "Fariha Securities",
    initials: "FS",
    trec: "307",
    area: "Banani",
    city: "Dhaka",
  },
  {
    // TODO: not found under this name in the DSE directory; confirm the registered name.
    name: "Arrina Securities",
    short: "Arrina Securities",
    initials: "AR",
  },
];
