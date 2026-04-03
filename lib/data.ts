// lib/data.ts — Updated March 2026

export const PERSONAL = {
  name: 'Nimish Juvekar',
  nameShort: 'Nimish',
  credentials: 'AFHEA · MSc · fCMgr · CMBE',
  title: 'Lecturer (Work-Based Learning)',
  institution: 'University of East London',
  school: 'Royal Docks School of Business and Law',
  location: 'London, United Kingdom',
  phone: '+44 7442605205',
  email: 'drievu.nimish@gmail.com',
  emailUEL: 'N.Juvekar@uel.ac.uk',
  linkedin: 'https://www.linkedin.com/in/nimishjuvekar',
  uel: 'https://www.uel.ac.uk/about-uel/staff/nimish-vivek-juvekar',
  orcid: 'https://orcid.org/0009-0000-4319-2899',
  orcidId: '0009-0000-4319-2899',
  gamma: 'https://nimish-juvekar-jrtjqh6.gamma.site/',
  photo: '/images/nimish.jpg',
  heroTagline: 'Bridging 15+ years of Global Industry Experience with Academic Excellence.',
  heroSub: 'From ELV systems in Mumbai to supply chains across South East Asia — now shaping the next generation of global business leaders at the University of East London.',
  summary: 'A highly accomplished and multi-disciplinary professional serving as Lecturer in Work-Based Learning at the University of East London. With an academic foundation in Electronics Engineering and an MSc in International Business Management, Nimish bridges the gap between complex technical theory and the practical realities of global business operations — across the UK, India, and the Middle East.',
  quote: '"Combining academic excellence with practical industry experience to develop the next generation of global business leaders."',
}

export const STATS = [
  { number: 15, suffix: '+', label: 'Years Industry Experience' },
  { number: 4,  suffix: '',  label: 'Countries Worked In' },
  { number: 50, suffix: '+', label: 'Professional Certifications' },
  { number: 4000, suffix: '+', label: 'Event Attendees Served' },
]

export const ACCREDITATIONS = [
  {
    title: 'Certified Management & Business Educator (CMBE)',
    body: 'Chartered Association of Business Schools',
    issued: 'March 2026',
    expires: 'March 2027',
    credentialId: 'CMBE2611617383',
    icon: 'award',
    color: '#0A66C2',
  },
  {
    title: 'Associate Fellow of Advance HE (AFHEA)',
    body: 'Advance HE',
    issued: 'March 2026',
    credentialId: 'PR337918',
    icon: 'graduation',
    color: '#0A66C2',
  },
  {
    title: 'Foundation Chartered Manager (fCMgr)',
    body: 'Chartered Management Institute',
    issued: '2025',
    credentialId: null,
    icon: 'briefcase',
    color: '#1A1A2E',
  },
]

export const EXPERIENCE = [
  {
    id: 1,
    role: 'Lecturer (Work-Based Learning)',
    company: 'University of East London',
    location: 'London, UK',
    period: 'Sep 2025 – Present',
    tag: 'Academia',
    tagColor: 'blue',
    highlights: [
      'Guides Level 7 Master\'s students through practical placement years, turning academic frameworks into day-one career skills.',
      'Manages relationships with external business clients, securing and maintaining valuable internship and placement opportunities.',
      'Acts as liaison between students, academics, and employers to ensure placements meet all stakeholder expectations.',
      'Completed a rigorous 2025 training programme including Trauma-Informed Practice, Safeguarding, Mental Health in the Workplace, and Diversity in Learning & Teaching.',
    ],
  },
  {
    id: 2,
    role: 'Hourly Paid Lecturer',
    company: 'University of East London',
    location: 'London, UK',
    period: 'Sep 2023 – Sep 2025',
    tag: 'Academia',
    tagColor: 'blue',
    highlights: [
      'Delivered comprehensive lectures on Global Project Management and Managing Resources in an International Business Environment.',
      'Designed educational materials tailored to diverse international learners, enhancing student outcomes.',
      'Mentored multicultural student body, addressing both academic and professional aspirations.',
      'Achieved 88% in Global Project Management — a module now taught to next-generation students.',
    ],
  },
  {
    id: 3,
    role: 'Assistant EHCP Coordinator (SEND Team)',
    company: 'Cognus Ltd',
    location: 'Sutton, UK',
    period: 'Aug 2024 – Jan 2025',
    tag: 'SEND & Education',
    tagColor: 'slate',
    highlights: [
      'Managed the full lifecycle of EHCP requests from initial receipt through to final plan development.',
      'Primary liaison between NHS health professionals, therapists, schools, and parents for integrated support plans.',
      'Authored comprehensive applicant profiles for the SEND Panel, synthesising complex educational and medical data.',
      'Maintained 100% statutory deadline compliance with the national SEND Code of Practice.',
      'Administered bespoke EHCP case management software, ensuring data integrity and milestone tracking.',
    ],
  },
  {
    id: 4,
    role: 'Technical Manager (India)',
    company: 'Firelife Safety Enterprises',
    location: 'Mumbai, India',
    period: 'Apr 2020 – Jan 2022',
    tag: 'Fire Safety',
    tagColor: 'slate',
    highlights: [
      'Supervised team of engineers, coordinating training on customer service and technical support processes.',
      'Created comprehensive user guides and video tutorials for proprietary technical software.',
      'Managed customer onboarding for Fire Alarm, PAVA, and AV systems.',
    ],
  },
  {
    id: 5,
    role: 'Regional Techno-Commercial Manager (West India)',
    company: 'Heinrich Limited',
    location: 'Mumbai, India',
    period: 'Feb 2019 – Mar 2020',
    tag: 'Sales & Operations',
    tagColor: 'slate',
    highlights: [
      'Led West India operations and sales, driving market penetration and growth.',
      'Provided technical training and support for South East Asia clients.',
      'Conducted root cause analysis for data interpretation and stakeholder reporting.',
    ],
  },
  {
    id: 6,
    role: 'Product Specialist (South East Asia)',
    company: 'Watchdog Security',
    location: 'Mumbai, India',
    period: 'Feb 2016 – Jan 2019',
    tag: 'ELV Systems',
    tagColor: 'slate',
    highlights: [
      'Led a team of over 50 engineers and technicians specialised in ELV systems.',
      'Recruited, trained, and managed technical team, achieving significant revenue growth across South East Asia.',
    ],
  },
  {
    id: 7,
    role: 'Assistant Technical Manager (South East Asia Pacific)',
    company: 'Teknoware Middle East',
    location: 'Mumbai, India',
    period: 'Jan 2015 – Jan 2016',
    tag: 'Emergency Lighting',
    tagColor: 'slate',
    highlights: [
      'Spearheaded technical support operations for South East Asia-Pacific region.',
      'Organised industry seminars on Emergency and Exit Lighting systems.',
    ],
  },
  {
    id: 8,
    role: 'System Engineer (India)',
    company: 'System Product Enterprises (India) Pvt Ltd',
    location: 'Mumbai, India',
    period: 'Jul 2008 – Dec 2014',
    tag: 'Engineering',
    tagColor: 'slate',
    highlights: [
      'Trained teams of technicians in theory and hands-on ELV system sessions.',
      'Conducted seminars for project consultants to demonstrate system proposals.',
    ],
  },
]

export const COMPETENCIES = {
  'Academic Leadership & Education': [
    'Work-Based Learning Facilitation',
    'Curriculum Design',
    'Multicultural Pedagogy',
    'Trauma-Informed Practice',
    'Safeguarding & SEND',
    'Academic Mentorship',
    'Inclusive Teaching Methods',
    'AFHEA & CMBE Certified',
  ],
  'Business & Management': [
    'Supply Chain Management (CSCMP)',
    'Project Management (PMI)',
    'International Business Strategy',
    'Stakeholder Engagement',
    'Business Analysis',
    'Inventory & Purchasing',
    'ITIL® Framework',
    'Operational Optimisation',
  ],
  'Technical & Engineering': [
    'Fire Alarm & PAVA Systems',
    'NFPA 72 Compliance',
    'ELV Systems Design',
    'AV & Automation',
    'Building Management Systems',
    'EasyIO FG Certified',
    'System Commissioning',
    'Technical Documentation',
  ],
  'Digital & Creative': [
    'Digital Content Creation',
    'Web Design & Management',
    'Advanced Excel & Data Analytics',
    'Microsoft Project',
    'Cloud Computing (Core)',
    'Digital Body Language',
    'Emotional Intelligence',
    'Social Media Strategy',
  ],
}

export const QUALIFICATIONS = [
  {
    type: 'degree',
    title: 'MSc International Business Management',
    institution: 'University of East London',
    country: 'United Kingdom',
    period: '2022 – 2023',
    grade: 'Merit',
    highlights: [
      'Global Project Management — 88%',
      'Applied Business Project — 70%',
      'Managing Resources in an International Business Environment — 62%',
    ],
  },
  {
    type: 'degree',
    title: 'Bachelor of Engineering — Electronics Engineering',
    institution: 'University of Mumbai',
    country: 'India',
    period: '2005 – 2008',
    grade: '2:1',
    highlights: [],
  },
  {
    type: 'diploma',
    title: 'Diploma in Electronics & Video Engineering',
    institution: 'Maharashtra State Board of Technical Education (MSBTE)',
    country: 'India',
    period: '2002 – 2005',
    grade: 'Distinction',
    highlights: [],
  },
]

export const CERTIFICATIONS = [
  // Elite Professional
  { title: 'Certified Management & Business Educator (CMBE)', issuer: 'Chartered Association of Business Schools', category: 'Elite' },
  { title: 'Associate Fellow of Advance HE (AFHEA)', issuer: 'Advance HE', category: 'Elite' },
  { title: 'Foundation Chartered Manager (fCMgr)', issuer: 'Chartered Management Institute', category: 'Elite' },
  // Supply Chain
  { title: 'CSCMP Supply Chain Foundations — The Essentials Professional Certificate', issuer: 'CSCMP', category: 'Supply Chain' },
  { title: 'Supply Chain Foundations: Project Management', issuer: 'LinkedIn Learning', category: 'Supply Chain' },
  { title: 'Implementing Supply Chain Management', issuer: 'LinkedIn Learning', category: 'Supply Chain' },
  { title: 'Inventory Management Foundations', issuer: 'LinkedIn Learning', category: 'Supply Chain' },
  { title: 'Purchasing Foundations', issuer: 'LinkedIn Learning', category: 'Supply Chain' },
  // Project Management
  { title: 'Project Management Foundations', issuer: 'PMI / LinkedIn Learning', category: 'Project Management' },
  { title: 'Supply Chain Foundations: Managing the Process', issuer: 'LinkedIn Learning', category: 'Project Management' },
  { title: 'Microsoft Project Quick Tips', issuer: 'LinkedIn Learning', category: 'Project Management' },
  // Technical
  { title: 'NFPA 72: National Fire Alarm and Signaling Code', issuer: 'NFPA', category: 'Technical' },
  { title: 'Integrated Building Management Systems Workshop', issuer: 'Industry', category: 'Technical' },
  { title: 'PAVA System Design, Testing & Commissioning (Module A)', issuer: 'Industry', category: 'Technical' },
  { title: 'EasyIO FG Training Certificate', issuer: 'EasyIO', category: 'Technical' },
  // Digital & Business
  { title: 'Business Analysis: Essential Tools and Techniques', issuer: 'LinkedIn Learning', category: 'Digital & Business' },
  { title: 'Learning ITIL®', issuer: 'LinkedIn Learning', category: 'Digital & Business' },
  { title: 'Excel: Advanced Formulas and Functions', issuer: 'LinkedIn / NASBA', category: 'Digital & Business' },
  { title: 'Learning Cloud Computing: Core Concepts', issuer: 'LinkedIn Learning', category: 'Digital & Business' },
  { title: 'Digital Body Language', issuer: 'LinkedIn Learning', category: 'Digital & Business' },
  // Leadership
  { title: 'Leading with Emotional Intelligence', issuer: 'LinkedIn Learning', category: 'Leadership' },
  { title: 'Effective Listening', issuer: 'LinkedIn Learning', category: 'Leadership' },
  { title: 'How to Be Both Assertive and Likable', issuer: 'LinkedIn Learning', category: 'Leadership' },
  { title: 'Banking Basics: What Every Business Leader Must Know', issuer: 'LinkedIn Learning', category: 'Leadership' },
]

export const TEACHING = {
  modules: [
    { name: 'Global Project Management', level: 'Level 7 (MSc)', score: '88%' },
    { name: 'Managing Resources in an International Business Environment', level: 'Level 7 (MSc)', score: null },
    { name: 'Work-Based Learning — Placement Year Support', level: 'Level 7 (MSc)', score: null },
  ],
  uelTraining2025: [
    'Trauma-Informed Practice in Higher Education',
    'Safeguarding Introduction',
    'Mental Health in the Workplace',
    'Diversity in Learning and Teaching',
    'Disability Awareness (Score: 100)',
    'Unconscious Bias (Score: 100)',
    'Academic Advising Toolkit',
    'Data Protection (Score: 100)',
    'Health & Safety (Score: 90)',
  ],
  philosophy: 'Teaching isn\'t about delivering content — it\'s about bridging the gap between theory and the messy reality of global business. Every concept I teach, I\'ve lived.',
}

export const COMMUNITY = [
  {
    role: 'Community Administrator',
    organisation: 'Indians In London Group',
    period: 'Feb 2023 – Present',
    highlights: [
      'Technical AV support and administration for large-scale community events.',
      'The Rang Barse Holi — 4,000+ attendees.',
      'High Commission of India Independence Day celebrations.',
    ],
  },
  {
    role: 'Community Volunteer',
    organisation: 'Inspiring Indian Women',
    period: 'Apr 2023 – Present',
    highlights: [
      'Supported She Inspires Awards and Dharma Dubey Awards.',
      'Global initiative to empower women across diaspora communities.',
    ],
  },
  {
    role: 'Council Volunteer',
    organisation: 'London Borough of Newham',
    period: 'Sep 2025 – Present',
    highlights: [
      'Resident awareness, diversity festivals, and support for vulnerable groups.',
    ],
  },
  {
    role: 'Council Volunteer',
    organisation: 'Elstree & Borehamwood Town Council',
    period: 'Oct 2024 – Present',
    highlights: [
      'Community engagement, diversity events, and local support initiatives.',
    ],
  },
]

export const FREELANCE_SERVICES = [
  {
    title: 'Technical Systems & Safety Consultancy',
    icon: 'shield',
    description: 'Fire Alarm, PAVA, AV & Automation design and compliance auditing to NFPA 72 and international standards. IBMS & EasyIO programming. Third-party commissioning oversight.',
    tags: ['NFPA 72', 'Fire Safety', 'PAVA', 'IBMS'],
  },
  {
    title: 'Strategic Operations & Supply Chain',
    icon: 'network',
    description: 'Certified CSCMP professional with MSc in International Business. Inventory control, business process mapping, supplier negotiation, and ITIL-based optimisation for SMEs.',
    tags: ['CSCMP', 'Supply Chain', 'ITIL', 'Procurement'],
  },
  {
    title: 'Project Leadership & Turnaround Management',
    icon: 'target',
    description: 'Iron-clad project architecture using Microsoft Project. Stakeholder management, requirements capture, change management, and risk register development.',
    tags: ['Project Management', 'PMI', 'Change Management'],
  },
  {
    title: 'Academic & Corporate Training Design',
    icon: 'book',
    description: 'AFHEA & CMBE-credentialed. Bespoke WBL curriculum, Inclusive Leadership workshops, Trauma-Informed Practice, and academic advising for HE institutions.',
    tags: ['AFHEA', 'CMBE', 'WBL', 'Corporate Training'],
  },
  {
    title: 'Digital Content Creation',
    icon: 'pen',
    description: 'Technical copywriting, educational social media strategy, and instructional video production for engineering firms, educators, and institutions.',
    tags: ['Content Strategy', 'LinkedIn', 'Technical Writing'],
  },
  {
    title: 'Web Design & Digital Ecosystem',
    icon: 'globe',
    description: 'End-to-end digital platform development for non-profits, educational academies, and community organisations.',
    tags: ['Web Design', 'Kajola.org', 'LE Academy', 'DKRIN'],
    projects: [
      { name: 'Kajola', url: 'https://kajola.org' },
      { name: 'LE Academy', url: 'https://leacademy.co.uk' },
      { name: 'Diversity Festival', url: 'https://diversityfestival.uk' },
      { name: 'DKRIN', url: 'https://dkrin.com' },
    ],
  },
]

export const PROJECTS = [
  {
    title: 'Work-Based Learning Programme',
    category: 'Academic — UEL',
    description: 'Designed and delivered a placement-integrated MSc module connecting students with industry partners across London. Built employer engagement frameworks, student mentoring systems, and academic assessment structures.',
    tags: ['Level 7', 'Work-Based Learning', 'UEL', 'MSc'],
    link: 'https://www.uel.ac.uk/about-uel/staff/nimish-vivek-juvekar',
    stat: { value: '50+', label: 'Students Mentored' },
  },
  {
    title: 'Global Project Management Module',
    category: 'Academic — UEL',
    description: 'Delivers comprehensive lectures on global project management to diverse international student cohorts. Achieved 88% in this module during own MSc — now teaches it with first-hand expertise.',
    tags: ['PMI', 'Global PM', 'Multicultural', 'MSc Level 7'],
    link: 'https://www.uel.ac.uk/about-uel/staff/nimish-vivek-juvekar',
    stat: { value: '88%', label: 'Module Score' },
  },
  {
    title: 'Holi Festival — Technical AV Production',
    category: 'Community — Indians In London',
    description: 'Led full technical AV production and community administration for The Rang Barse Holi, one of London\'s largest Indian diaspora events, serving over 4,000 attendees.',
    tags: ['AV Production', 'Event Management', 'Community', '4,000+ Attendees'],
    link: 'https://www.linkedin.com/in/nimishjuvekar',
    stat: { value: '4K+', label: 'Attendees' },
  },
  {
    title: 'ELV Systems — South East Asia Operations',
    category: 'Industry — Watchdog Security',
    description: 'Led a team of 50+ engineers and technicians across South East Asia delivering ELV system installations, product training, and technical support for high-value clients.',
    tags: ['ELV Systems', 'Team Leadership', 'South East Asia', 'Technical Training'],
    link: 'https://www.linkedin.com/in/nimishjuvekar',
    stat: { value: '50+', label: 'Engineers Led' },
  },
]

export const USP_CARDS = [
  {
    title: 'Global Leadership & Cross-Cultural Expertise',
    body: 'Extensive experience across India, South East Asia, the Middle East, and the UK. Managed teams of 50+ and mentored international Master\'s cohorts at UEL.',
    icon: 'Globe',
  },
  {
    title: 'Proven Educator with Elite Credentials',
    body: 'AFHEA, CMBE (Chartered Association of Business Schools), and fCMgr-accredited. Designs training programmes for both academic and corporate contexts.',
    icon: 'GraduationCap',
  },
  {
    title: 'Strategic Problem Solver',
    body: 'CSCMP-certified supply chain professional. Track record of streamlining workflows, improving operational efficiency, and managing complex project turnarounds.',
    icon: 'Lightbulb',
  },
  {
    title: 'Community Leader & Changemaker',
    body: '3+ years of active UK community service. Organised events for 4,000+ attendees. Volunteers with London Borough of Newham and supports Indian diaspora initiatives.',
    icon: 'Handshake',
  },
]

// ScrollyTelling overlay text (for ScrollyCanvas component)
export const SCROLLY_SECTIONS = [
  {
    range: [0.03, 0.25] as [number, number],
    align: 'center' as const,
    eyebrow: 'AFHEA · CMBE · fCMgr · Lecturer',
    title: 'Industry.\nMeets Academia.',
  },
  {
    range: [0.30, 0.50] as [number, number],
    align: 'left' as const,
    eyebrow: '15+ Years · 4 Countries',
    title: 'I build\nglobal leaders.',
  },
  {
    range: [0.55, 0.74] as [number, number],
    align: 'right' as const,
    eyebrow: 'From Mumbai to London',
    title: 'Bridging engineering\nand education.',
  },
  {
    range: [0.79, 0.96] as [number, number],
    align: 'center' as const,
    eyebrow: 'University of East London',
    title: 'Shaping the\nnext generation.',
  },
]

// Hero content (used by HeroSection)
export const heroContent = {
  name: 'Nimish Juvekar',
  credentials: 'AFHEA · MSc · fCMgr · CMBE',
  subtitle: 'Lecturer (Work-Based Learning) at University of East London',
  description: 'Bridging 15+ years of Global Industry Experience with Academic Excellence.',
  cta: 'View My Journey',
  scrollIndicator: 'Scroll to Explore',
}

// Scrolly content (used by existing ScrollyTellingWrapper)
export const scrollyContent = {
  sections: [
    { id: '1', eyebrow: 'AFHEA · CMBE · fCMgr · Lecturer', title: 'Industry.\nMeets Academia.', position: 'center' },
    { id: '2', eyebrow: '15+ Years · 4 Countries', title: 'I build\nglobal leaders.', position: 'left' },
    { id: '3', eyebrow: 'From Mumbai to London', title: 'Bridging engineering\nand education.', position: 'right' },
    { id: '4', eyebrow: 'University of East London', title: 'Shaping the\nnext generation.', position: 'center' },
  ],
}

// ===========================
// BACKWARD COMPATIBILITY ALIASES
// ===========================

export const personalInfo = {
  name: PERSONAL.name,
  credentials: PERSONAL.credentials,
  title: PERSONAL.title,
  institution: PERSONAL.institution,
  school: PERSONAL.school,
  location: PERSONAL.location,
  email: PERSONAL.emailUEL,
  linkedin: PERSONAL.linkedin,
  uel: PERSONAL.uel,
  orcid: PERSONAL.orcid,
  photo: PERSONAL.photo,
}

export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#teaching', label: 'Teaching' },
  { href: '#qualifications', label: 'Qualifications' },
  { href: '#contact', label: 'Contact' },
]

export const socialLinks = [
  { href: PERSONAL.linkedin, label: 'LinkedIn' },
  { href: PERSONAL.uel, label: 'UEL Profile' },
  { href: PERSONAL.orcid, label: 'ORCID' },
]

export const aboutContent = {
  title: 'About Me',
  story: [
    PERSONAL.summary,
    'Now at the Royal Docks School of Business and Law, I apply my practical expertise to develop the next generation of global business leaders through innovative, work-integrated learning programmes.',
    'My teaching philosophy centres on connecting academic theory with real-world practice — ensuring students graduate with both knowledge and applicable skills for the international business landscape.',
  ],
  credentials: ['AFHEA', 'MSc International Business Management', 'fCMgr', 'CMBE'],
}

export const statsContent = {
  title: 'By The Numbers',
  stats: STATS.map((s) => ({ value: s.number, label: s.label, suffix: s.suffix })),
}

export const experienceContent = {
  title: 'Experience',
  timeline: EXPERIENCE.map((exp) => ({
    year: exp.period,
    role: exp.role,
    company: `${exp.company}, ${exp.location}`,
    description: exp.highlights.join(' '),
  })),
}

export const teachingContent = {
  title: 'Teaching at UEL',
  modules: TEACHING.modules.map((m) => ({
    code: m.level,
    name: m.name,
    score: m.score || '',
    description: m.name,
    tags: [m.level, ...(m.score ? [`Score: ${m.score}`] : [])],
  })),
}

export const competenciesContent = {
  title: 'Core Competencies',
  categories: Object.entries(COMPETENCIES).map(([name, skills]) => ({ name, skills })),
}

export const projectsContent = {
  title: 'Selected Work',
  projects: PROJECTS.map((p) => ({
    title: p.title,
    category: p.category,
    description: p.description,
    tags: p.tags,
  })),
}

export const qualificationsContent = {
  title: 'Qualifications & Certifications',
  degrees: QUALIFICATIONS.map((q) => ({
    year: q.period,
    title: q.title,
    institution: q.institution,
    detail: q.grade,
    modules: q.highlights.map((h) => {
      const parts = h.split(' — ')
      return { name: parts[0], score: parts[1] || '' }
    }),
  })),
  certifications: CERTIFICATIONS.map((c) => ({
    title: c.title,
    institution: c.issuer,
  })),
}

export const uspContent = {
  title: 'Why Nimish',
  subtitle: 'Bridging Industry & Academia',
  quote: PERSONAL.quote.replace(/"/g, ''),
  cards: USP_CARDS.map((c) => ({
    title: c.title,
    description: c.body,
  })),
}

export const contactContent = {
  title: 'Get In Touch',
  subtitle: 'Interested in collaborating or have a question? I\'d love to hear from you.',
  email: PERSONAL.email,
  emailUEL: PERSONAL.emailUEL,
  phone: PERSONAL.phone,
  linkedin: PERSONAL.linkedin,
  formId: 'YOUR_FORMSPREE_ID',
  subjects: [
    'Academic Collaboration',
    'Industry Partnership',
    'Student Inquiry',
    'Speaking Engagement',
    'General Inquiry',
  ],
}
