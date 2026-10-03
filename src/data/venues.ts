import { rupeesToPaise } from "@/lib/money"

export type VenueSeed = {
  slug: string
  name: string
  venueType: string
  area: string
  city: string
  district: string
  description: string
  capacity: number
  fromPrice: number
  rating: number | null
  image: string
  verified: boolean
  instant: boolean
  eventTypes: string[]
  amenities: string[]
  rules: string[]
}

export const venueSeed: VenueSeed[] = [
  {
    slug: "the-fern-courtyard",
    name: "The Fern Courtyard",
    venueType: "Wedding venue",
    area: "Kakkanad",
    city: "Kochi",
    district: "Ernakulam",
    description:
      "A lush outdoor wedding destination with a grand mandap, warm lighting, and flexible indoor backup spaces for large family functions.",
    capacity: 450,
    fromPrice: rupeesToPaise(39000),
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    verified: true,
    instant: true,
    eventTypes: ["Wedding", "Reception", "Engagement"],
    amenities: ["Parking", "Stage", "Catering", "Power backup", "AC"],
    rules: ["No alcohol beyond venue-approved vendors.", "Sound cutoff after 10:30 PM."],
  },
  {
    slug: "greenroot-hall",
    name: "Greenroot Hall",
    venueType: "Community hall",
    area: "Ayyanthole",
    city: "Thrissur",
    district: "Thrissur",
    description:
      "A welcoming community space that works beautifully for family gatherings, birthday celebrations, and cultural events with easy parking.",
    capacity: 260,
    fromPrice: rupeesToPaise(21000),
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80",
    verified: true,
    instant: false,
    eventTypes: ["Community hall", "Birthday", "Family function"],
    amenities: ["Parking", "Dressing room", "Wi-Fi", "Sound system"],
    rules: ["No fireworks inside the hall.", "Cleanup included in standard rental."],
  },
  {
    slug: "pearl-view-banquets",
    name: "Pearl View Banquets",
    venueType: "Corporate venue",
    area: "Marine Drive",
    city: "Kochi",
    district: "Ernakulam",
    description:
      "A polished city venue for conferences, product launches, and leadership meetups with premium lighting and a dedicated events team.",
    capacity: 180,
    fromPrice: rupeesToPaise(34000),
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    verified: true,
    instant: true,
    eventTypes: ["Corporate", "Conference", "Product launch"],
    amenities: ["Projector", "Stage", "Parking", "Reception desk", "AC"],
    rules: ["Set-up window available from 9 AM.", "External AV requires prior approval."],
  },
  {
    slug: "horizon-community-hall",
    name: "Horizon Community Hall",
    venueType: "Event hall",
    area: "Kuttanellur",
    city: "Thrissur",
    district: "Thrissur",
    description:
      "A flexible indoor venue for memorials, festive gatherings, and private celebrations with warm lighting and quick turnaround availability.",
    capacity: 220,
    fromPrice: rupeesToPaise(18000),
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80",
    verified: false,
    instant: false,
    eventTypes: ["Birthday", "Community hall", "Family function"],
    amenities: ["Parking", "Kitchen", "Power backup", "Wheelchair access"],
    rules: ["No outside catering without coordination.", "Event time includes setup and cleanup."],
  },
  {
    slug: "riverfront-pavilion",
    name: "Riverfront Pavilion",
    venueType: "Wedding venue",
    area: "South Kalamassery",
    city: "Kochi",
    district: "Ernakulam",
    description:
      "A modern venue by the water with a grand foyer, landscaped lawns, and a clean, flexible event layout that suits both intimate weddings and larger celebrations.",
    capacity: 380,
    fromPrice: rupeesToPaise(50000),
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80",
    verified: true,
    instant: true,
    eventTypes: ["Wedding", "Reception", "Corporate retreat"],
    amenities: ["Garden", "Parking", "Stage", "Catering", "AC"],
    rules: ["No glass décor on the lawn.", "Recommended to share final guest count 3 days before event."],
  },
]
