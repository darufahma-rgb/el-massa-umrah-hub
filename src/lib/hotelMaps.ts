export interface HotelMapEntry {
  label: string;
  city: "Makkah" | "Madinah";
  mapsUrl: string;
}

const HOTEL_MAP_DATA: HotelMapEntry[] = [
  {
    label: "Grand Al Massa",
    city: "Makkah",
    mapsUrl: "https://www.google.com/maps/search/Grand+Al+Massa+Hotel+Makkah/@21.4192,39.8235,17z",
  },
  {
    label: "Shofwah",
    city: "Makkah",
    mapsUrl: "https://www.google.com/maps/search/Shofwah+Tower+Makkah/@21.4228,39.8266,17z",
  },
  {
    label: "Zam Tower",
    city: "Makkah",
    mapsUrl: "https://www.google.com/maps/search/ZamZam+Tower+Makkah/@21.4228,39.8266,17z",
  },
  {
    label: "Zam",
    city: "Makkah",
    mapsUrl: "https://www.google.com/maps/search/ZamZam+Tower+Makkah/@21.4228,39.8266,17z",
  },
  {
    label: "Daar El Naeem",
    city: "Madinah",
    mapsUrl: "https://www.google.com/maps/search/Dar+Al+Naeem+Hotel+Madinah/@24.4680,39.6120,17z",
  },
  {
    label: "Dallah",
    city: "Madinah",
    mapsUrl: "https://www.google.com/maps/search/Dallah+Taibah+Hotel+Madinah/@24.4678,39.6130,17z",
  },
  {
    label: "Sanabel",
    city: "Madinah",
    mapsUrl: "https://www.google.com/maps/search/Hotel+Sanabel+Al+Rawdah+Madinah/@24.4672,39.6115,17z",
  },
];

export function getHotelMapsUrl(hotelName: string): string | null {
  const lower = hotelName.toLowerCase();
  for (const entry of HOTEL_MAP_DATA) {
    if (lower.includes(entry.label.toLowerCase())) {
      return entry.mapsUrl;
    }
  }
  return null;
}
