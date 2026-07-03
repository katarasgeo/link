export const siteConfig = {
  name: "Biokarpet Candia",
  legalName: "Βιοκαρπέτ Candia Αιγίου",
  tagline: "Fine Rugs, Mattresses & Living",
  founder: "George Kataras",
  foundedYear: 1990,
  description:
    "Οικογενειακή επιχείρηση στο Αίγιο από το 1990. Χαλιά, στρώματα, κρεβάτια, καναπέδες, δάπεδα PVC και κουρτίνες υψηλής ποιότητας, με προσωπική φροντίδα σε κάθε επιλογή.",
  descriptionEn:
    "A family house of fine living since 1990. Rugs, mattresses, beds, sofas, PVC flooring and curtains, chosen with care and lasting craftsmanship.",
  url: "https://biokarpetaigio.gr",
  locale: "el_GR",

  contact: {
    address: {
      street: "Κορίνθου 140",
      city: "Αίγιο",
      region: "Αχαΐα",
      postalCode: "251 00",
      country: "GR",
      full: "Κορίνθου 140, Αίγιο 251 00",
    },
    phones: [
      { label: "Κατάστημα", number: "2691062265", display: "26910 62265" },
      { label: "Κινητό", number: "6944282924", display: "6944 282924" },
    ],
    email: "info@biokarpetaigio.gr",
    hours: [
      { days: "Δευτέρα – Σάββατο", hours: "09:00 – 21:00" },
    ],
    mapsUrl: "https://share.google/mLMIJXNK0MCL6eKJv",
    mapsEmbedQuery: "Κορίνθου 140, Αίγιο 251 00",
  },

  social: {
    facebook: "https://www.facebook.com/biokarpetaigio",
    instagram: "https://www.instagram.com/biokarpetaigio/",
    whatsapp: "https://wa.me/306944282924",
  },

  nav: [
    { label: "Αρχική", href: "/" },
    { label: "Ιστορία", href: "/about" },
    {
      label: "Προϊόντα",
      href: "/products",
      children: [
        { label: "Χαλιά", href: "/products/rugs" },
        { label: "Στρώματα", href: "/products/mattresses" },
        { label: "Κρεβάτια", href: "/products/beds" },
        { label: "Καναπέδες", href: "/products/sofas" },
        { label: "Δάπεδα PVC", href: "/products/pvc-flooring" },
        { label: "Κουρτίνες & Στόρια", href: "/products/curtains-blinds" },
      ],
    },
    { label: "Έργα", href: "/projects" },
    { label: "Προσφορές", href: "/offers" },
    { label: "Επικοινωνία", href: "/contact" },
  ],

  categories: [
    {
      slug: "rugs",
      name: "Χαλιά",
      nameEn: "Rugs",
      blurb: "Υφαντά με χαρακτήρα, από φυσικές ίνες, για κάθε χώρο.",
    },
    {
      slug: "mattresses",
      name: "Στρώματα",
      nameEn: "Mattresses",
      blurb: "Ύπνος σχεδιασμένος γύρω από το σώμα σας.",
    },
    {
      slug: "beds",
      name: "Κρεβάτια",
      nameEn: "Beds",
      blurb: "Δομές που ορίζουν τον χαρακτήρα του υπνοδωματίου.",
    },
    {
      slug: "sofas",
      name: "Καναπέδες",
      nameEn: "Sofas",
      blurb: "Άνεση με αρχιτεκτονική διάθεση.",
    },
    {
      slug: "pvc-flooring",
      name: "Δάπεδα PVC",
      nameEn: "PVC Flooring",
      blurb: "Η αίσθηση του φυσικού ξύλου, με σύγχρονη αντοχή.",
    },
    {
      slug: "curtains-blinds",
      name: "Κουρτίνες & Στόρια",
      nameEn: "Curtains & Blinds",
      blurb: "Φυσικό φως, σχεδιασμένο με ακρίβεια.",
    },
  ],
} as const;

export type Category = (typeof siteConfig.categories)[number];
