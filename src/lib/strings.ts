/**
 * Central copy file. All user-facing strings live here so a Malayalam dictionary
 * can replace this module later (see docs/ROADMAP.md → i18n). Keys are grouped by area.
 */
export const t = {
  brand: {
    name: "idam",
    tagline: "A place for every occasion.",
    madeIn: "Made with care in Kerala.",
  },
  nav: {
    explore: "Explore",
    myBookings: "My bookings",
    forOwners: "For venue owners",
    login: "Log in",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    main: "Main navigation",
  },
  home: {
    headline: "Find your idam.",
    occasion: "What's the occasion?",
    listCta: "List your idam",
  },
  footer: {
    discover: "Discover",
    host: "Host",
    company: "Idam",
    weddingVenues: "Wedding venues",
    communityHalls: "Community halls",
    corporateVenues: "Corporate venues",
    listYourIdam: "List your idam",
    hostDashboard: "Host dashboard",
    about: "About us",
    help: "Help centre",
    cancellation: "Cancellation policy",
    privacy: "Privacy",
    terms: "Terms",
    legal: "© 2026 Idam Technologies Pvt. Ltd.",
    locale: "English (IN) · ₹ INR",
  },
  states: {
    loading: "Loading",
    errorTitle: "Something went wrong",
    errorBody: "Try again. If it keeps happening, contact support.",
    retry: "Try again",
    emptyTitle: "Nothing here yet",
  },
  venue: {
    instantBooking: "Instant booking",
    requestToBook: "Request to book",
    verified: "Idam Verified",
    perDay: "/ day",
    upTo: "Up to",
    guests: "guests",
  },
  pricing: {
    rent: "Venue rent",
    extras: "Extras",
    included: "Included",
    extra: "Extra",
    total: "Total",
    deposit: "Deposit due now",
    balance: "Balance due before the event",
  },
} as const
