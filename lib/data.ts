// lib/data.ts — Single source of truth for all portfolio content

export const PERSONAL = {
  name: 'Nimish Juvekar',
  nameShort: 'Nimish',
  credentials: 'AFHEA · MSc · fCMgr',
  title: 'Lecturer (Work-Based Learning)',
  institution: 'University of East London',
  school: 'Royal Docks School of Business and Law',
  location: 'London, United Kingdom',
  email: 'N.Juvekar@uel.ac.uk',
  linkedin: 'https://www.linkedin.com/in/nimishjuvekar',
  // Place the CV PDF in `public/` and point to it here (download).
  cv: '/Nimish_Juvekar_CV.pdf',
  uel: 'https://www.uel.ac.uk/about-uel/staff/nimish-vivek-juvekar',
  orcid: 'https://orcid.org/0009-0000-4319-2899',
  orcidId: '0009-0000-4319-2899',
  gamma: 'https://nimish-juvekar-jrtjqh6.gamma.site/',
  photo: '/images/nimish.jpg',
  heroTagline: 'Bridging 15+ years of Global Industry Experience with Academic Excellence at the University of East London.',
  heroSub: 'From ELV systems in Mumbai to supply chains across South East Asia — now shaping the next generation of global business leaders at the University of East London.',
  summary: `Over 15 years of operational and leadership experience across India, South East Asia, the Middle East, and the UK. Roles spanning ELV systems engineering, fire safety, supply chain, and sales — across companies including Teknoware, Heinrich, Watchdog Security, and Firelife Safety Enterprises.\n\nMoved to London in 2022 to complete an MSc in International Business Management at UEL, graduating with Merit. Now a Lecturer in Work-Based Learning at the Royal Docks School of Business and Law, University of East London.`,
  quote: '"Combining academic excellence with practical industry experience to develop the next generation of global business leaders."',
}

export const STATS = [
  { number: 15, suffix: '+', label: 'Years Industry Experience' },
  { number: 4,  suffix: '',  label: 'Countries Worked In' },
  { number: 8,  suffix: '',  label: 'Industry Roles Held' },
  { number: 2, suffix: '', label: 'Academic Institutions' },
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
      'Strategically supported and guided Level 7 Master\'s students throughout their practical placement year.',
      'Managed and nurtured key relationships with external business clients, securing valuable internship opportunities.',
      'Acted as crucial liaison between students, academics, and employers to ensure placements met stakeholder expectations.',
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
      'Mentored multicultural student body, addressing academic and professional aspirations.',
    ],
  },
  {
    id: 3,
    role: 'Assistant EHCP Coordinator',
    company: 'Cognus Limited',
    location: 'London, UK',
    period: 'Sep 2024 – Present',
    tag: 'Education Support',
    tagColor: 'slate',
    highlights: [
      'Supported EHCP Coordinator by improvising trackers, processes, and workflows with interactive automated Excel sheets.',
      'Conducted in-house team training on proprietary EHCP case management software.',
      'Coordinated between stakeholders, managing agendas and minutes for clear communication.',
    ],
  },
  {
    id: 4,
    role: 'Technical Manager',
    company: 'Firelife Safety Enterprises',
    location: 'Mumbai, India',
    period: 'Apr 2020 – Jan 2022',
    tag: 'Fire Safety',
    tagColor: 'slate',
    highlights: [
      'Supervised team of engineers, coordinating training on customer service and technical support processes.',
      'Conducted training on proprietary technical software, creating comprehensive user guides and video tutorials.',
      'Managed customer onboarding processes for technical systems with user-friendly training programmes.',
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
      'Maintained strong client relationships with deep technical expertise.',
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
      'Recruited, trained, and managed technical team, achieving significant revenue growth.',
      'Delivered product training and technical support across South East Asian markets.',
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
      'Conducted training for clients on advanced emergency and exit lighting technologies.',
      'Organised industry seminars, enhancing awareness about Emergency and Exit Lighting systems.',
    ],
  },
  {
    id: 8,
    role: 'Systems Engineer',
    company: 'System Product Enterprises (India) Pvt Ltd',
    location: 'Mumbai, India',
    period: 'Jul 2008 – Dec 2014',
    tag: 'Engineering',
    tagColor: 'slate',
    highlights: [
      'Trained various teams of technicians with theory and hands-on sessions on ELV systems.',
      'Conducted seminars for project consultants to demonstrate system proposals.',
      'Built foundational expertise in fire alarm, PAVA, AV, and automation systems.',
    ],
  },
]

export const COMPETENCIES = {
  'Academic Leadership & Mentorship': [
    'Team Leadership & Development',
    'Cross-Cultural Training Expertise',
    'Work-Based Learning Facilitation',
    'Culturally Adaptable Teaching',
    'Inspiring Educational Delivery',
    'Academic Mentorship & Coaching',
  ],
  'Business & Management': [
    'Client Relationship Management',
    'Stakeholder Engagement',
    'Supply Chain Management',
    'Project Management (PMI)',
    'International Business Strategy',
    'Process Improvement',
    'Operations Management',
  ],
  'Technical & Industry': [
    'ELV Systems (Fire, PAVA, AV)',
    'NFPA 72 Fire Alarm Code',
    'Advanced Excel & Automation',
    'Digital Training & Documentation',
    'System Integration',
    'Root Cause Analysis',
    'Technical Documentation',
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
  { title: 'CMI Level 7 Diploma — Strategic Management & Leadership', issuer: 'Chartered Management Institute' },
  { title: 'Associate Fellow of Advance HE (AFHEA)', issuer: 'Advance HE' },
  { title: 'Project Management Foundations', issuer: 'PMI / LinkedIn Learning' },
  { title: 'Managing Project Stakeholders', issuer: 'PMI' },
  { title: 'NFPA 72: National Fire Alarm and Signaling Code', issuer: 'NFPA' },
  { title: 'Integrated Building Management Systems Workshop', issuer: 'Industry' },
  { title: 'PAVA System Design, Testing & Commissioning (Module A)', issuer: 'Industry' },
  { title: 'EasyIO FG Training Certificate', issuer: 'EasyIO' },
  { title: 'Excel: Advanced Formulas and Functions', issuer: 'LinkedIn / NASBA' },
  { title: 'Learning ITIL', issuer: 'LinkedIn Learning' },
  { title: 'Inventory Management Foundations', issuer: 'LinkedIn Learning' },
  { title: 'Purchasing Foundations', issuer: 'LinkedIn Learning' },
  { title: 'Sustainability Strategies', issuer: 'LinkedIn Learning' },
]

export const TEACHING = {
  modules: [
    { name: 'Global Project Management', level: 'Level 7 (MSc)', score: '88%' },
    { name: 'Managing Resources in an International Business Environment', level: 'Level 7 (MSc)', score: null },
    { name: 'Work-Based Learning — Placement Year Support', level: 'Level 7 (MSc)', score: null },
  ],
  philosophy: 'Teaching isn\'t about delivering content — it\'s about bridging the gap between theory and the messy reality of global business. Every concept I teach, I\'ve lived. My goal is to help students turn academic frameworks into skills they can use on day one of their careers.',
  approach: [
    { label: 'Real-World Integration', desc: 'Every lecture uses actual industry case studies from 15+ years of operational experience.' },
    { label: 'Multicultural Pedagogy', desc: 'Designed for UEL\'s diverse international student body — methods adapted for cross-cultural learning.' },
    { label: 'Work-Based Focus', desc: 'Connects academic theory directly to workplace placement experiences at Master\'s level.' },
  ],
}

export const USP_CARDS = [
  {
    title: 'Global Leadership & Cross-Cultural Expertise',
    body: 'Experience across India, South East Asia, the Middle East, and the UK. Managed multicultural teams of 50+ and mentored international student cohorts at Master\'s level.',
    icon: 'Globe',
  },
  {
    title: 'Proven Educator & Innovative Trainer',
    body: 'University lecturer and former technical manager. Designs impactful training programmes for both academic and corporate contexts, using multimedia and hybrid methods.',
    icon: 'GraduationCap',
  },
  {
    title: 'Strategic Problem Solver',
    body: 'Track record of streamlining workflows, improving operational efficiency, and integrating digital improvements across complex, high-stakes operational environments.',
    icon: 'Lightbulb',
  },
  {
    title: 'Strong Stakeholder & Client Management',
    body: 'Nurtured long-term client relationships across multiple sectors and continents. Consistently aligns project goals with broader organisational objectives.',
    icon: 'Handshake',
  },
]

export const PROJECTS = [
  {
    title: 'Work-Based Learning Programme',
    category: 'Academic — UEL',
    description: 'Designed and delivered a placement-integrated MSc module connecting students with industry partners across London. Built frameworks for employer engagement, student mentoring, and academic assessment.',
    tags: ['Level 7', 'Work-Based Learning', 'UEL', 'MSc'],
    link: 'https://www.uel.ac.uk/about-uel/staff/nimish-vivek-juvekar',
  },
  {
    title: 'Global Project Management — MSc Module',
    category: 'Academic — UEL',
    description: 'Delivered comprehensive lectures on global project management to diverse international student cohorts. Achieved 88% in this module during MSc studies — now brings that depth to the lecture hall.',
    tags: ['PMI', 'Global PM', 'Multicultural', 'MSc Level 7'],
    link: 'https://www.uel.ac.uk/about-uel/staff/nimish-vivek-juvekar',
  },
  {
    title: 'ELV Systems — South East Asia Operations',
    category: 'Industry — Watchdog Security',
    description: 'Led a team of 50+ engineers and technicians across South East Asia, delivering ELV system installations, product training, and technical support for high-value clients.',
    tags: ['ELV Systems', 'Team Leadership', 'South East Asia', 'Technical Training'],
    link: 'https://www.linkedin.com/in/nimishjuvekar',
  },
  {
    title: 'West India Sales & Operations Expansion',
    category: 'Industry — Heinrich Limited',
    description: 'Drove market penetration across West India as Regional Techno-Commercial Manager, combining deep product expertise with strategic sales and stakeholder management.',
    tags: ['Sales', 'Operations', 'India', 'Supply Chain'],
    link: 'https://www.linkedin.com/in/nimishjuvekar',
  },
]
