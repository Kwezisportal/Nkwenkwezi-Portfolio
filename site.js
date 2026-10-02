/* ==========================================================================
   SITE CONTENT
   This is the ONE file you edit for words, projects, images, links and the CV.
   You never need to touch the HTML, CSS or render script for routine updates.

   Quick rules:
   - Text goes between the quote marks: "like this".
   - If your text contains a double quote, use a single quote around it instead,
     or write \" inside it.
   - Every item in a list ends with a comma.
   - Leave a field as "" (empty) to hide it. Empty fields never show on the site.
   - After saving, refresh the page in your browser to see changes.
   ========================================================================== */

window.SITE = {

  /* ---------- Browser tab + search preview ---------- */
  meta: {
    title: "Kwezi | Strategic Creative",
    description: "Portfolio of Kwezi, a Johannesburg-based strategic creative working across brand, social, content and campaign strategy."
  },

  /* ---------- CV ----------
     To replace your CV: put your PDF in the /cv folder and make sure the
     file name below matches it exactly (capital letters matter).
     The Download CV buttons in the nav and contact section both use this. */
  cv: {
    file: "cv/Kwezi-CV.pdf",
    label: "Download CV"
  },

  /* ---------- Links ----------
     Paste full web addresses, starting with https://
     Any link left as "" is hidden automatically. */
  links: {
    email: "",          // e.g. "yourname@gmail.com"
    linkedin: "",       // e.g. "https://www.linkedin.com/in/yourname"
    instagram: "",      // e.g. "https://www.instagram.com/yourhandle"
    other: [
      // Add more like this:
      // { label: "Behance", url: "https://www.behance.net/yourname" },
    ]
  },

  /* ---------- Navigation ---------- */
  nav: {
    brand: "Kwezi",
    items: [
      { label: "Work",    target: "work" },
      { label: "About",   target: "about" },
      { label: "Contact", target: "contact" }
    ]
  },

  /* ---------- Hero (top of the homepage) ----------
     Each line of the big statement is its own entry so you control the line breaks.
     style options:
       "display"  = big bold condensed type
       "accent"   = italic serif, for one or two softer words
       "olive"    = big bold condensed type in olive  */
  hero: {
    eyebrow: "Portfolio · Johannesburg",
    lines: [
      { text: "A strategic creative", style: "display" },
      { text: "who connects",         style: "accent" },
      { text: "culture, content",     style: "display" },
      { text: "and business.",        style: "olive" }
    ],
    intro: "I'm Kwezi. I work on brand, social and content strategy, and I like ideas that make sense to the audience and to the business at the same time.",
    areasLabel: "Areas of work",
    areas: [
      "Brand and social media",
      "Content strategy and planning",
      "Campaign concepts and creative proposals",
      "Digital marketing and e-commerce",
      "Marketing and creative strategy"
    ],
    /* Optional hero image. Put the file in /images/hero/ and type its path.
       Leave src as "" to show no image. */
    image: {
      src: "",          // e.g. "images/hero/hero.jpg"
      alt: "",
      caption: ""
    },
    primaryButton: "See the work"
  },

  /* ---------- Work section labels ---------- */
  work: {
    heading: "Selected work",
    intro: "A few projects that show how I think. Concept and proposal work is labelled as such.",
    archiveHeading: "Archive",
    archiveIntro: "More work, including programme projects and things in progress.",
    filterAllLabel: "All",
    caseStudyLabel: "Read the case study",
    presentationLabel: "View presentation",
    backLabel: "Back to all work",
    galleryHeading: "Images",
    emptyArchive: "Nothing in this category yet."
  },

  /* ---------- Categories used for filters ----------
     A project can use as many of these as you like (see "categories" on each project).
     Filters only show categories that at least one archive project uses. */
  categories: ["Brand", "Social", "Content", "Campaigns", "Digital", "E-commerce", "Strategy", "Creative"],

  /* ==========================================================================
     PROJECTS
     How to:
     - ADD a project: copy the TEMPLATE at the bottom of this list, paste it
       above, change "id" to something unique (lowercase, hyphens, no spaces).
     - HIDE a project: set visible: false
     - FEATURE on the homepage: featured: true
     - MOVE to the Archive: featured: false
     - REORDER: change "order" (lower numbers show first)
     - ON-SITE CASE STUDY: caseStudy: { enabled: true }. Set false to show only
       the summary and presentation link.

     IMAGES: put files in /images/projects/ and type the path, e.g.
     "images/projects/sofa-cover.jpg". If coverImage.src is "", the site shows
     a plain typographic panel in coverStyle colour (blush, olive, espresso or cream).
     ========================================================================== */
  projects: [

    {
      id: "sofa-symphony",
      visible: true,
      featured: true,
      order: 1,
      title: "Custom. Actually.",
      client: "Sofa Symphony",
      type: "Campaign proposal",
      status: "Proposal · not implemented",
      year: "2026",
      categories: ["Campaigns", "Social", "Strategy", "E-commerce", "Digital"],
      summary: "A full digital campaign proposal for a custom furniture brand, built around the idea that most \"custom\" furniture isn't really custom. Presented under Meadow.",
      brief: "Plan a digital marketing campaign for Sofa Symphony on a R20,000 budget. Originally a Digify PRO group brief; this version is my independent extension of the campaign.",
      contribution: "Strategy, audience personas, campaign concept, social media plan, content ideas, budget split and KPIs.",
      strategy: "Keep affordability as a real claim but let the tone feel quietly premium: quality speaks first and the price is the reassuring surprise. The plan is sized for a one or two person team, with content batch-produced in a single shoot and TikTok as the lead channel.",
      creativeSolution: "\"Custom. Actually.\" with a simple three-step mechanic, Pin It. Price It. Make It. Customers bring a Pinterest picture and the brand shows how close it can get and what it costs.",
      outcome: "Proposal only. KPIs in the deck are proposed targets, most of them directional estimates rather than figures calculated from account data.",
      learning: "",
      coverStyle: "blush",
      coverText: "Custom. Actually.",
      coverImage: { src: "", alt: "", caption: "" },
      galleryImages: [
        // { src: "images/projects/sofa-01.jpg", alt: "Campaign concept slide", caption: "The campaign idea" },
      ],
      presentationLink: { label: "", url: "" },   // e.g. your Canva link
      caseStudy: {
        enabled: true,
        sections: [
          { heading: "Audience", body: "Five personas, from first-time renters to the Upgrade Buyer replacing a worn-out family couch, and the Bulk Buyer furnishing several rental units at once." },
          { heading: "Channels", body: "TikTok three times a week, Instagram Stories mostly repurposed, daily community replies, and Facebook as a paid-only placement on the same Meta budget to reach older buyers." },
          { heading: "Content ideas", body: "Same Room, Different Life. This Isn't a Fabric Swap. 3 Custom Furniture Myths. Ask the Makers." },
          { heading: "Week 0", body: "Before launch, reply to the purchase-intent comments already sitting unanswered on past posts." }
        ]
      }
    },

    {
      id: "money-habits",
      visible: true,
      featured: true,
      order: 2,
      title: "Money Habits",
      client: "Woolworths MyDifference PLUS",
      type: "Campaign concept",
      status: "Self-initiated concept · not affiliated with Woolworths",
      year: "2026",
      categories: ["Brand", "Campaigns", "Creative", "Strategy"],
      summary: "A concept case study for a rewards programme. The core idea, the receipt strip system, shows everyday habits as line items on a till slip.",
      brief: "",
      contribution: "Concept, strategy and case study.",
      strategy: "",
      creativeSolution: "The receipt strip system: small, familiar habits printed as till-slip line items, so the value of the programme reads like something you already hold in your hand.",
      outcome: "Concept only.",
      learning: "",
      coverStyle: "olive",
      coverText: "Money Habits",
      coverImage: { src: "", alt: "", caption: "" },
      galleryImages: [],
      presentationLink: { label: "", url: "" },
      caseStudy: { enabled: false, sections: [] }
    },

    {
      id: "meadow",
      visible: true,
      featured: false,
      order: 3,
      title: "Meadow",
      client: "Meadow (co-founded)",
      type: "Brand identity",
      status: "In development",
      year: "2026",
      categories: ["Brand", "Social", "Strategy"],
      summary: "A faceless creative agency I'm starting with a co-founder, covering social, PR, brand communication and analytics. Currently building the brand kit and first event content.",
      brief: "",
      contribution: "Co-founder.",
      strategy: "",
      creativeSolution: "",
      outcome: "",
      learning: "",
      coverStyle: "espresso",
      coverText: "meadow",
      coverImage: { src: "", alt: "", caption: "" },
      galleryImages: [],
      presentationLink: { label: "", url: "" },
      caseStudy: { enabled: false, sections: [] }
    },

    {
      id: "me-in-pixels",
      visible: true,
      featured: false,
      order: 4,
      title: "Me in Pixels",
      client: "Digify PRO Africa",
      type: "Personal brand presentation",
      status: "Programme work",
      year: "2026",
      categories: ["Brand", "Content"],
      summary: "A personal brand presentation for the Digify PRO programme, in a pastel pink palette with punchy headings.",
      brief: "",
      contribution: "",
      strategy: "",
      creativeSolution: "",
      outcome: "",
      learning: "",
      coverStyle: "cream",
      coverText: "Me in Pixels",
      coverImage: { src: "", alt: "", caption: "" },
      galleryImages: [],
      presentationLink: { label: "", url: "" },
      caseStudy: { enabled: false, sections: [] }
    },

    /* ---------- TEMPLATE: copy this block to add a project ----------
       It is hidden (visible: false) so it never shows on the site. */
    {
      id: "template-copy-me",
      visible: false,
      featured: false,
      order: 99,
      title: "Project title",
      client: "Client or organisation",
      type: "Project type",
      status: "Concept",           // e.g. Concept, Proposal, Published, In development
      year: "",
      categories: ["Brand"],
      summary: "One or two sentences.",
      brief: "",
      contribution: "",
      strategy: "",
      creativeSolution: "",
      outcome: "",
      learning: "",
      coverStyle: "blush",
      coverText: "",
      coverImage: { src: "", alt: "", caption: "" },
      galleryImages: [],
      presentationLink: { label: "View presentation", url: "" },
      caseStudy: { enabled: false, sections: [] }
    }
  ],

  /* ---------- About ---------- */
  about: {
    heading: "About",
    statement: "Good marketing starts with paying attention.",
    paragraphs: [
      "I started in content operations, where I learned how much detail sits behind anything an audience actually sees. I bring that same care to strategy: reading the audience, finding the cultural angle and building a plan a small team can actually run.",
      "Right now I'm building concept work for corporate brands and small businesses, and I'm heading towards brand strategy."
    ],
    interestsHeading: "Drawn to",
    interests: "Brand strategy, social-first campaigns, audience and culture, content planning, e-commerce."
  },

  /* ---------- Experience & Learning ----------
     Keep this short. Your CV holds the detail. Leave "note" as "" to hide it.
     status options for learning: anything you like, e.g. "Completed", "In progress". */
  experience: {
    heading: "Experience & learning",
    experienceHeading: "Experience",
    items: [
      { role: "Content Planning Coordinator", org: "MultiChoice Group", note: "Planning and admin across the streaming catalogue." },
      { role: "Content QC, Design and Content Coordinator, Programme Acceptance Classifier", org: "Showmax", note: "Classification, metadata and compliance checks on titles." },
      { role: "Customer Service", org: "DASH BPO", note: "" },
      { role: "Customer Service", org: "South Point", note: "" }
    ],
    learningHeading: "Learning",
    learning: [
      { name: "Digital Marketing certification", provider: "Google", status: "Completed" },
      { name: "Digital skills programme (Digital Marketing Intern)", provider: "Digify Africa", status: "In progress" },
      { name: "CAPM", provider: "PMI", status: "In progress" }
    ]
  },

  /* ---------- Contact ---------- */
  contact: {
    heading: "Let's work together.",
    intro: "Open to roles, briefs and collaborations. Email is the quickest way to reach me.",
    emailLabel: "Email",
    copyLabel: "Copy",
    copiedLabel: "Copied",
    socialHeading: "Elsewhere"
  },

  /* ---------- Footer ---------- */
  footer: {
    text: "© 2026 Kwezi",
    fine: "Concept and proposal work is labelled as such. Brands named are not affiliated with this portfolio unless stated."
  }
};
