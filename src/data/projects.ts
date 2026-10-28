/**
 * Project data. Add a project by appending an object — the home page,
 * the "More work" index and /work/[slug] case studies all read from here.
 *
 * Copy was drafted from the project brief. Before publishing, review every
 * `role`, `stack` and case-study chapter and correct anything that does not
 * match what actually happened. Leave `year` / `liveUrl` / `image` undefined
 * when unknown — the UI hides empty fields instead of inventing them.
 */

export type ProjectVisual =
  | "vingo"
  | "wishhub"
  | "safat"
  | "academy"
  | "dental"
  | "realestate"
  | "billing"
  | "research"
  | "commerce";

export type ProjectStatus = "Live" | "Concept" | "Product work";

export type CaseChapter = {
  heading: string;
  body: string;
  points?: string[];
};

export type CaseStudy = {
  overview: CaseChapter;
  problem: CaseChapter;
  concept: CaseChapter;
  design: CaseChapter;
  development: CaseChapter;
  challenges: CaseChapter;
  solution: CaseChapter;
  result: CaseChapter;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  year?: string;
  /** One line used on cards. */
  summary: string;
  /** Short paragraph used on the featured slide. */
  description: string;
  role?: string;
  stack: string[];
  features: string[];
  purpose: string;
  liveUrl?: string;
  featured: boolean;
  status?: ProjectStatus;
  /** Which art-directed mockup to render until real screenshots exist. */
  visual: ProjectVisual;
  /** Stage tone for the featured slide. */
  tone: "light" | "dark";
  /** Optional real screenshot (path under /public). Replaces the mockup when set. */
  image?: string;
  /** "contain" for illustrations that must not be cropped. Defaults to "cover". */
  imageFit?: "cover" | "contain";
  /** Intrinsic [width, height] — required for "contain" so edges can be feathered. */
  imageSize?: [number, number];
  gallery?: string[];
  /** Omit until the real story is written — the project page then shows only the intro. */
  caseStudy?: CaseStudy;
};

export const caseChapterOrder: { key: keyof CaseStudy; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "problem", label: "Problem" },
  { key: "concept", label: "Concept" },
  { key: "design", label: "Design" },
  { key: "development", label: "Development" },
  { key: "challenges", label: "Challenges" },
  { key: "solution", label: "Solution" },
  { key: "result", label: "Result" },
];

export const projects: Project[] = [
  {
    slug: "vingobd",
    title: "VingoBD",
    category: "Design platform",
    summary: "A Canva-style editor built around Bangla cards and Bangladeshi occasions.",
    description:
      "A browser-based design platform for Bangla cards — festivals, events and cultural occasions — with a Canva-like editing experience instead of static templates.",
    role: "Product design & development",
    stack: [],
    features: [
      "Bangla card creation",
      "In-browser card editing",
      "Festival & event collections",
      "Occasion-based templates",
    ],
    purpose:
      "Give people a local, culturally specific alternative to generic design tools for Bangladeshi festivals and occasions.",
    liveUrl: "https://www.vingobd.com/",
    featured: true,
    status: "Live",
    visual: "vingo",
    tone: "light",
    image: "/myproject/vingobd.png",
    imageFit: "contain",
    imageSize: [1431, 1099],
    caseStudy: {
      overview: {
        heading: "A design tool that speaks Bangla first",
        body: "VingoBD is a digital design platform focused on Bangla cards for events, festivals and Bangladeshi occasions. Instead of downloading a fixed image, people open a card in an editor and make it their own.",
      },
      problem: {
        heading: "Global tools, local occasions",
        body: "Mainstream design tools are built around English templates and global holidays. Bangladeshi festivals and family occasions — and the Bangla language itself — are an afterthought there.",
      },
      concept: {
        heading: "Occasion-first, editor-second",
        body: "Organise the product around the moment people are celebrating, then hand them an editor. Browse a festival, pick a card, change the words, share it.",
        points: ["Browse by festival and event", "Open any card in the editor", "Edit text, colour and layout", "Export and share"],
      },
      design: {
        heading: "Familiar editing, local character",
        body: "The editing surface borrows patterns people already know from Canva-style tools — canvas in the middle, tools at the edges — so the learning curve goes to the content, not the interface.",
      },
      development: {
        heading: "An editor in the browser",
        body: "The core is an interactive canvas editor: selectable layers, editable Bangla text and exportable designs, wrapped in a catalogue of occasions.",
      },
      challenges: {
        heading: "Bangla is not Latin text",
        body: "Bangla script relies on conjuncts and vowel signs that must shape correctly wherever text is rendered and exported. An editor that handles English fine can still break Bangla words.",
      },
      solution: {
        heading: "Treat the script as a first-class constraint",
        body: "Typography and text rendering were considered from the start of the editor rather than patched in, so cards read correctly in the editor and in the exported result.",
      },
      result: {
        heading: "A live product, not a mockup",
        body: "VingoBD is live at vingobd.com — a product people can use, which is the kind of work I want more of.",
      },
    },
  },
  {
    slug: "wishhub",
    title: "WishHub",
    category: "Digital product",
    summary: "Digital wish cards that can be saved, scheduled and sent on the exact date.",
    description:
      "A digital wishing-card platform built at Digital Hub Bangladesh — birthday and event cards that can be saved and scheduled to send automatically at a chosen date and time.",
    role: "Development",
    stack: [],
    features: [
      "Birthday & event wish cards",
      "Save cards for later",
      "Date/time scheduled sending",
      "Customer information",
    ],
    purpose: "Turn a birthday message into a small digital experience that arrives exactly on time.",
    liveUrl: "https://wishhub.digitalhubbd.com",
    featured: true,
    status: "Live",
    visual: "wishhub",
    tone: "dark",
    image: "/myproject/wishhub.png",
    imageFit: "contain",
    imageSize: [1432, 1098],
    caseStudy: {
      overview: {
        heading: "Wishes that arrive on time",
        body: "WishHub is a digital wishing-card platform from Digital Hub Bangladesh. People create a card for a birthday or event, save it, and schedule it to be delivered automatically at the right moment.",
      },
      problem: {
        heading: "Good intentions, missed dates",
        body: "Messages for special occasions are easy to forget and hard to make feel special. A plain text on the day rarely carries the weight of the moment.",
      },
      concept: {
        heading: "Write now, deliver later",
        body: "Separate creating a wish from sending it. The card is designed ahead of time, and the platform takes care of delivery on the chosen date and time.",
        points: ["Choose an occasion", "Design the card", "Save it", "Schedule delivery"],
      },
      design: {
        heading: "Celebration without clutter",
        body: "The interface keeps the card as the hero and puts scheduling in a clear, calm flow — date, time, recipient — so the practical part never competes with the emotional part.",
      },
      development: {
        heading: "Scheduling as a core feature",
        body: "Cards, customer information and delivery times are stored together so each card can be sent automatically when its scheduled time is reached.",
      },
      challenges: {
        heading: "Time is a hard problem",
        body: "Automatic sending has to be reliable: the right card, to the right person, at the right moment — and nothing sent twice.",
      },
      solution: {
        heading: "One source of truth per card",
        body: "Each card carries its own schedule and delivery state, so the sending logic can check what is due and what has already gone out.",
      },
      result: {
        heading: "A live product in the Digital Hub ecosystem",
        body: "WishHub is live at wishhub.digitalhubbd.com as one of the digital products built in the Digital Hub Bangladesh environment.",
      },
    },
  },
  {
    slug: "safat-group",
    title: "Safat Group",
    category: "Industrial web experience",
    summary: "An industrial battery company, presented with modern UI and 3D storytelling.",
    description:
      "A website for an industrial and battery company — exploring how a traditional industry can be presented with modern UI, 3D visuals and a premium, story-led structure.",
    role: "Design & development",
    stack: [],
    features: [
      "Industrial storytelling",
      "3D product visuals",
      "Premium presentation",
      "Product & industry sections",
    ],
    purpose: "Make a traditional industrial company feel as modern as the technology it sells.",
    liveUrl: "https://safatgroupbd.com/",
    featured: true,
    status: "Live",
    visual: "safat",
    tone: "dark",
    image: "/myproject/safatgroupp.png",
    imageFit: "contain",
    imageSize: [1433, 1098],
    caseStudy: {
      overview: {
        heading: "Heavy industry, light interface",
        body: "Safat Group is an industrial and battery company. The website had to represent a traditional business in a way that feels current, credible and premium.",
      },
      problem: {
        heading: "Industrial sites often look dated",
        body: "Industrial companies are frequently represented by dense, generic websites that undersell the scale and quality of what they make.",
      },
      concept: {
        heading: "Tell the industry as a story",
        body: "Lead with visuals of the product and the industry, then guide visitors through the company in a clear sequence rather than a wall of information.",
        points: ["Product-first visuals", "Industrial storytelling", "Clear company structure"],
      },
      design: {
        heading: "Dark, material, confident",
        body: "A restrained palette, strong type and depth-based visuals give the brand weight — closer to a technology product than a brochure.",
      },
      development: {
        heading: "3D where it earns its place",
        body: "3D visual experiences are used to present products and industry in dimension, balanced against load time on real connections.",
      },
      challenges: {
        heading: "Premium without being slow",
        body: "3D and rich visuals can easily make a corporate site heavy. The experience had to stay fast and responsive across devices.",
      },
      solution: {
        heading: "Hierarchy over quantity",
        body: "Heavy visuals are concentrated in a few moments that matter; the rest of the site stays lean and typographic.",
      },
      result: {
        heading: "A modern face for a traditional company",
        body: "The site is live at safatgroupbd.com.",
      },
    },
  },
  {
    slug: "academy-platform",
    title: "Academy Platform",
    category: "Education platform",
    summary: "Course selling for IELTS, GRE, PTE, SAT, TOEFL and GED — with enrolment, payments and admin.",
    description:
      "An education platform concept for test-prep courses — student profiles, course enrolment, payments and an admin dashboard on a Supabase backend.",
    role: "Full-stack development",
    stack: ["Supabase", "PostgreSQL"],
    features: ["Course catalogue & selling", "Student profiles", "Enrolment & payments", "Admin dashboard"],
    purpose: "Give a test-prep academy one place to sell courses and manage students.",
    featured: true,
    status: "Concept",
    visual: "academy",
    tone: "light",
    image: "/myproject/scholarxacademy.png",
    imageFit: "contain",
    imageSize: [1132, 981],
    caseStudy: {
      overview: {
        heading: "One platform for test-prep courses",
        body: "An academy platform for IELTS, GRE, PTE, SAT, TOEFL and GED courses, covering the full loop from browsing a course to paying, enrolling and being managed by an admin.",
      },
      problem: {
        heading: "Courses, students and payments in different places",
        body: "Academies often juggle course information, student records and payments across separate tools, which makes enrolment slow and error-prone.",
      },
      concept: {
        heading: "Student and admin, one system",
        body: "Two sides of the same product: students browse, pay and enrol; admins manage courses, students and enrolments from a dashboard.",
        points: ["Browse courses", "Create a profile", "Pay & enrol", "Admin reviews & manages"],
      },
      design: {
        heading: "Clear paths for two audiences",
        body: "Students get a calm catalogue and a short enrolment flow. Admins get dense, scannable tables and status at a glance.",
      },
      development: {
        heading: "Supabase as the backend",
        body: "Supabase provides authentication and a PostgreSQL database for students, courses, enrolments and payments.",
      },
      challenges: {
        heading: "Who can see what",
        body: "Students must only see their own profile and enrolments, while admins need the full picture.",
      },
      solution: {
        heading: "Access rules in the data layer",
        body: "Roles are enforced at the database level rather than only in the interface, so the rules hold regardless of which screen asks.",
      },
      result: {
        heading: "A complete education product concept",
        body: "A full-stack platform concept covering catalogue, profiles, enrolment, payments and administration.",
      },
    },
  },
  {
    slug: "dental-platform",
    title: "Dental Clinic Platform",
    category: "Healthcare",
    summary: "Appointment booking, approvals, follow-ups and invoices for a modern dental clinic.",
    description:
      "A modern dental website concept with appointment booking, patient profiles and an admin dashboard for approvals, follow-ups, birthday emails and invoices.",
    role: "Full-stack development",
    stack: [],
    features: [
      "Appointment booking",
      "Approve / reject requests",
      "Follow-up scheduling",
      "Birthday email automation",
      "Image uploads",
      "Payments & invoices",
    ],
    purpose: "Replace phone-and-paper clinic admin with one calm system.",
    featured: false,
    status: "Concept",
    visual: "dental",
    tone: "light",
    caseStudy: {
      overview: {
        heading: "A clinic's front desk, online",
        body: "A dental platform concept where patients book appointments and clinic staff approve, schedule follow-ups and handle invoices from one dashboard.",
      },
      problem: {
        heading: "Admin eats clinic time",
        body: "Booking, reminders and billing are usually handled by phone and paper, which takes staff away from patients.",
      },
      concept: {
        heading: "Patients request, clinic decides",
        body: "Patients request a slot; the clinic approves or rejects it. Follow-ups, birthday emails and invoices hang off the same patient record.",
      },
      design: {
        heading: "Reassuring and clear",
        body: "Healthcare interfaces need calm: generous spacing, clear states and no ambiguity about whether an appointment is confirmed.",
      },
      development: {
        heading: "Workflows over pages",
        body: "Appointment states, image uploads, automated emails and invoices are modelled as connected workflows around each patient.",
      },
      challenges: {
        heading: "Many states per appointment",
        body: "Requested, approved, rejected, completed, followed up — each with different actions and messages.",
      },
      solution: {
        heading: "Explicit status model",
        body: "Every appointment carries one explicit status, and the dashboard only offers the actions that make sense for it.",
      },
      result: {
        heading: "End-to-end clinic concept",
        body: "A concept covering booking, patient profiles, approvals, follow-ups, automation and invoicing.",
      },
    },
  },
  {
    slug: "stay-booking",
    title: "Property & Booking Platform",
    category: "Real estate",
    summary: "Listings, bookings and Stripe payments — in the spirit of Airbnb and Booking.com.",
    description:
      "Real estate and stay-booking work: property listings, availability and booking flows, Stripe payments and admin dashboards.",
    role: "Full-stack development",
    stack: ["Stripe"],
    features: ["Property listings", "Booking system", "Stripe payments", "Admin dashboard"],
    purpose: "Let people find a property, pick dates and pay without leaving the page.",
    featured: true,
    visual: "realestate",
    tone: "light",
    image: "/myproject/kaslinhomes.png",
    imageFit: "contain",
    imageSize: [1604, 981],
    caseStudy: {
      overview: {
        heading: "From listing to paid booking",
        body: "Booking-platform work covering property listings, date selection, payment through Stripe and admin management.",
      },
      problem: {
        heading: "Booking is a trust exercise",
        body: "People need to understand a property, its availability and the total price before they are willing to pay.",
      },
      concept: {
        heading: "Airbnb-style clarity",
        body: "Listings lead with imagery and key facts; the booking panel stays visible so price and dates are always in view.",
      },
      design: {
        heading: "Imagery first",
        body: "Large photos, compact facts and a persistent booking panel keep decisions easy.",
      },
      development: {
        heading: "Payments with Stripe",
        body: "Stripe handles payment so bookings can be confirmed once payment succeeds.",
      },
      challenges: {
        heading: "Availability and payment must agree",
        body: "A booking should only be confirmed when dates are still free and the payment has gone through.",
      },
      solution: {
        heading: "Confirm on payment",
        body: "Bookings move to confirmed only after a successful payment, keeping availability accurate.",
      },
      result: {
        heading: "Booking flows that feel familiar",
        body: "Listing, booking, payment and admin flows modelled on patterns people already trust.",
      },
    },
  },
  {
    slug: "billing-saas",
    title: "Billing & Invoice System",
    category: "SaaS",
    summary: "Invoices, authentication and business workflows on Supabase.",
    description:
      "A billing and invoicing web application concept with authentication, admin dashboards and business workflows, built on Supabase.",
    role: "Full-stack development",
    stack: ["Supabase"],
    features: ["Invoice creation", "Authentication", "Admin dashboard", "Business workflows"],
    purpose: "Give small businesses a clean way to issue and track invoices.",
    featured: false,
    status: "Concept",
    visual: "billing",
    tone: "light",
    caseStudy: {
      overview: {
        heading: "Invoicing without spreadsheets",
        body: "A SaaS concept for creating, sending and tracking invoices behind secure authentication.",
      },
      problem: {
        heading: "Billing in spreadsheets",
        body: "Many small businesses track invoices manually, which makes status and totals hard to trust.",
      },
      concept: {
        heading: "Every invoice has a state",
        body: "Draft, sent, paid — an invoice moves through clear stages visible from the dashboard.",
      },
      design: {
        heading: "Documents and dashboards",
        body: "The invoice itself is designed as a clean document; the dashboard summarises what is outstanding.",
      },
      development: {
        heading: "Supabase for auth and data",
        body: "Supabase handles authentication and stores customers, invoices and line items.",
      },
      challenges: {
        heading: "Totals must always be right",
        body: "Line items, quantities and totals need to stay consistent as invoices are edited.",
      },
      solution: {
        heading: "Derive, don't duplicate",
        body: "Totals are calculated from line items rather than typed in, so they cannot drift.",
      },
      result: {
        heading: "A focused SaaS concept",
        body: "Authentication, invoicing and business workflows in one application.",
      },
    },
  },
  {
    slug: "research-ai",
    title: "Research AI Workspace",
    category: "AI product",
    summary: "Explorations in AI-assisted research, paper tools and academic platforms.",
    description:
      "Research-oriented AI product concepts: research lab sites, research-paper tools and AI-assisted reading and writing for academic work.",
    stack: [],
    features: ["Research lab presence", "Paper tools", "AI-assisted research", "Academic workflows"],
    purpose: "Explore where AI genuinely helps researchers — and where it should stay out of the way.",
    featured: true,
    status: "Concept",
    visual: "research",
    tone: "dark",
    image: "/myproject/scholarlabsx.png",
    imageFit: "contain",
    imageSize: [1433, 1098],
    caseStudy: {
      overview: {
        heading: "AI as a research companion",
        body: "Concept work on research labs, research-paper tools and AI-assisted academic workflows.",
      },
      problem: {
        heading: "Too much to read",
        body: "Researchers spend a large share of their time finding, reading and organising papers.",
      },
      concept: {
        heading: "Read with an assistant beside you",
        body: "Keep the paper central and put AI in a side panel for questions, summaries and notes.",
      },
      design: {
        heading: "Document first",
        body: "The paper stays the primary object; AI output is always secondary and clearly labelled.",
      },
      development: {
        heading: "Exploring AI-assisted flows",
        body: "Prototypes exploring how AI assistance fits into reading and research workflows.",
      },
      challenges: {
        heading: "Trust",
        body: "AI summaries must never be mistaken for the source text.",
      },
      solution: {
        heading: "Always link back to the source",
        body: "Design AI output to point back to the part of the document it came from.",
      },
      result: {
        heading: "An ongoing exploration",
        body: "Concepts that feed into how I think about AI products in general.",
      },
    },
  },
  {
    slug: "product-storefronts",
    title: "Product Storefronts",
    category: "E-commerce",
    summary: "Product catalogues, galleries and e-commerce style interfaces for businesses.",
    description:
      "Product-based websites with catalogues, product cards, image galleries and responsive e-commerce style layouts.",
    stack: [],
    features: ["Product catalogues", "Product cards", "Image galleries", "Responsive layouts"],
    purpose: "Present products clearly enough that people want to ask about them.",
    featured: true,
    visual: "commerce",
    tone: "light",
    image: "/myproject/nidory.png",
    imageFit: "contain",
    imageSize: [1254, 1254],
    caseStudy: {
      overview: {
        heading: "Products, presented properly",
        body: "Business websites centred on product catalogues, product detail and galleries.",
      },
      problem: {
        heading: "Products get lost in layouts",
        body: "Many business sites bury products under generic content.",
      },
      concept: {
        heading: "Catalogue as the backbone",
        body: "Structure the site around browsing and comparing products.",
      },
      design: {
        heading: "Consistent product cards",
        body: "One card system and one gallery pattern, reused everywhere.",
      },
      development: {
        heading: "Responsive by default",
        body: "Layouts rethought for phones, where most browsing happens.",
      },
      challenges: {
        heading: "Inconsistent product content",
        body: "Product images and descriptions arrive in every shape and size.",
      },
      solution: {
        heading: "Flexible components",
        body: "Components that stay tidy whatever length of text or ratio of image they receive.",
      },
      result: {
        heading: "Clean, reusable storefronts",
        body: "Catalogue and product patterns that carry across different businesses.",
      },
    },
  },
  // Copy below is taken only from what each showcase image shows. Add role,
  // stack, liveUrl, status and a caseStudy once the real details are written.
  {
    slug: "tourmate",
    title: "TourMate",
    category: "Travel app",
    summary: "A travel app for discovering Bangladesh — places, trips, packages and fellow travellers.",
    description:
      "A mobile travel app to find destinations, plan trips, book tour packages, share moments and connect with fellow travellers across Bangladesh.",
    stack: [],
    features: ["Destination discovery", "Trip planning", "Tour package booking", "Travel buddies & shared moments"],
    purpose: "Make exploring Bangladesh easier to plan and more social.",
    featured: true,
    visual: "realestate",
    tone: "light",
    image: "/myproject/TourMate_ Discover Bangladesh Together.png",
    imageFit: "contain",
    imageSize: [1433, 1098],
  },
  {
    slug: "naturematter",
    title: "NatureMatter",
    category: "Community platform",
    summary: "A community for sharing good deeds for the planet — with XP, levels and badges.",
    description:
      "A social platform where people share environmental good deeds, earn XP and grow from Seed to Nature Legend as part of a community working for a cleaner, greener planet.",
    stack: [],
    features: ["Good-deed feed", "XP, levels & badges", "Causes & impact tracking", "Monthly recognition"],
    purpose: "Turn small environmental actions into something visible and rewarding.",
    featured: true,
    visual: "research",
    tone: "light",
    image: "/myproject/NatureMatter_ Small Actions, Big Impact.png",
    imageFit: "contain",
    imageSize: [1536, 1024],
  },
  {
    slug: "oldzen",
    title: "OldZen",
    category: "Mobile game app",
    summary: "Classic games revived on mobile, with daily competitions and new winners every midnight.",
    description:
      "A retro gaming app with nostalgia and puzzle games — Snake, Brick, Tetris, Minesweeper and more — plus daily rounds, leaderboards and a player community, in English and Bangla.",
    stack: [],
    features: ["Classic games collection", "Daily competitions", "Leaderboards", "English & Bangla"],
    purpose: "Bring back the games people grew up with, and give them a reason to return every day.",
    featured: true,
    visual: "wishhub",
    tone: "light",
    image: "/myproject/OldZen Retro Gaming App Showcase.png",
    imageFit: "contain",
    imageSize: [1433, 1098],
  },
  {
    slug: "arthub",
    title: "ArtHub",
    category: "Art marketplace",
    summary: "A marketplace for buying original art directly from artists.",
    description:
      "An online art marketplace where people browse artworks, artists and exhibitions, and buy, sell or make offers on original pieces.",
    stack: [],
    features: ["Artwork & artist discovery", "Buy, sell & make offers", "Exhibitions & collections", "Favourites & cart"],
    purpose: "Connect artists directly with people who want their work.",
    featured: true,
    visual: "commerce",
    tone: "light",
    image: "/myproject/arthub.png",
    imageFit: "contain",
    imageSize: [1433, 1098],
  },
  {
    slug: "nexora-prime",
    title: "Nexora Prime",
    category: "Study abroad",
    summary: "A study and work abroad consultancy site with destinations, courses and a guided application.",
    description:
      "A website for a study-and-work-abroad consultancy — top destinations, popular courses, visa support and a step-by-step application process from free consultation to visa.",
    stack: [],
    features: ["Destination guides", "Course discovery", "Application process steps", "Consultation booking"],
    purpose: "Make the path abroad feel clear from the first consultation.",
    featured: true,
    visual: "academy",
    tone: "light",
    image: "/myproject/nexora.png",
    imageFit: "contain",
    imageSize: [1604, 981],
  },
  {
    slug: "agrovia",
    title: "Agrovia",
    category: "E-commerce",
    summary: "A storefront for seeds, LECA and fertilizers for home gardening and farming.",
    description:
      "A product website for premium seeds, LECA clay balls and fertilizers for home gardening, farming and commercial use, with best sellers and a responsive mobile layout.",
    stack: [],
    features: ["Product catalogue", "Best seller highlights", "Product gallery", "Responsive mobile layout"],
    purpose: "Present gardening products clearly for both home growers and commercial buyers.",
    featured: true,
    visual: "commerce",
    tone: "light",
    image: "/myproject/Agrovia Grows Naturally.png",
    imageFit: "contain",
    imageSize: [1433, 1098],
  },
  {
    slug: "digital-hub",
    title: "Digital Hub Bangladesh",
    category: "Agency website",
    summary: "A website for a digital agency offering A–Z solutions, from web development to automation.",
    description:
      "A company website presenting the agency's services — websites, digital marketing, branding, video, AI content and CRM automation — alongside recent projects and client reviews.",
    stack: [],
    features: ["Services overview", "Recent projects", "Client testimonials", "Quote requests"],
    purpose: "Show the full range of the agency's services in one clear place.",
    featured: true,
    visual: "billing",
    tone: "light",
    image: "/myproject/digitalhub.png",
    imageFit: "contain",
    imageSize: [1433, 1098],
  },
  {
    slug: "appu",
    title: "Appu",
    category: "App landing page",
    summary: "A landing page for a mobile app — features, pricing, screenshots and downloads.",
    description:
      "A landing page for the Appu mobile app with feature highlights, screenshots, pricing plans, a video section and App Store / Google Play downloads.",
    stack: [],
    features: ["Feature highlights", "Pricing plans", "Screenshot gallery", "App store downloads"],
    purpose: "Give a mobile app a clean, conversion-focused home on the web.",
    featured: true,
    visual: "wishhub",
    tone: "light",
    image: "/myproject/Appu Mobile App Hero Showcase.png",
    imageFit: "contain",
    imageSize: [1604, 981],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const moreProjects = projects.filter((p) => !p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
