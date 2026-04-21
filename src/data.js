// All site copy + structured data in one place — edit here to change the site.

export const marqueeItems = [
  'YOUR RIGHTS', 'SECURED', '13,000 PEOPLE WAITING', 'JUSTICE FOR ALL',
  'BUILT FOR AFRICA', '4.5 BILLION UNSERVED', 'LEGAL INFRASTRUCTURE',
  'PRE-SEED', '$500K RAISE'
]

export const navLinks = [
  { href: '#mission', label: 'Mission' },
  { href: '#product', label: 'Product' },
  { href: '#impact', label: 'Impact' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#company', label: 'Company' }
]

export const typewriterWords = ['Everyone.', 'Africa.', 'The Forgotten.', 'You.']

export const heroStats = [
  { to: 13000, suffix: '+', label: 'People on waitlist' },
  { to: 5, label: 'Countries' },
  { to: 4.5, decimals: 1, suffix: 'B', label: 'Unserved globally' }
]

export const terminalLines = [
  '> Describing situation...',
  '> Jurisdiction: Nigeria ✓',
  '> Rights identified: 3',
  '> Evidence secured ✓',
  '> Lawyer matched ✓',
  '> Status: Case active'
]

// Interactive terminal responses — keyed by lowercased command
export const terminalCommands = {
  help: [
    'Available commands:',
    '  help         — show this list',
    '  jurisdictions — list supported countries',
    '  case          — simulate a case workflow',
    '  pricing       — show pricing tiers',
    '  clear         — clear the terminal'
  ],
  jurisdictions: [
    '> Nigeria  — full legal intelligence',
    '> Kenya    — full legal intelligence',
    '> Ghana    — full legal intelligence',
    '> Uganda   — full legal intelligence',
    '> Rwanda   — full legal intelligence'
  ],
  case: [
    '> Initializing case...',
    '> Capturing statement...',
    '> Identifying rights under local statute...',
    '> 3 rights identified ✓',
    '> Evidence vault: encrypted ✓',
    '> Lawyer matched: verified ✓',
    '> Status: Case active'
  ],
  pricing: [
    '> Free     — $0/forever',
    '> Pro      — $7/month',
    '> Institutions — custom'
  ]
}

export const problemStats = [
  { n: '70%', body: 'of Africans face at least one civil legal problem per year' },
  { n: '3%',  body: 'can access meaningful legal representation' },
  { n: '$0',  body: 'is what Justly costs to start' }
]

export const solutionCards = [
  { icon: 'shield',     title: 'AI Legal Intelligence',      body: 'Jurisdiction-specific legal guidance across Nigeria, Kenya, Ghana, Uganda, and Rwanda. Plain language. Instant. Calibrated to your exact situation — not a general answer.' },
  { icon: 'file-lock',  title: 'Encrypted Evidence Vault',   body: 'Every photo, document, audio file, and video you submit is encrypted, timestamped, and chain-of-custody verified. It holds up in court. That is the point.' },
  { icon: 'users',      title: 'Verified Lawyer Network',    body: 'Matched to verified counsel with your full case already prepared. No cold calls. No wasted consultations. No starting from zero.' },
  { icon: 'clipboard',  title: 'Case Management',            body: 'Every deadline, document, update, and next action in one place. For individuals, lawyers, and institutions — from first incident to final resolution.' }
]

export const howItWorks = [
  { n: '01', t: 'Describe',   b: 'Open Justly on WhatsApp, mobile, or browser. Describe what happened in plain language. No forms. No legal training required.' },
  { n: '02', t: 'Understand', b: 'Justly identifies your rights, your options, and your next steps — calibrated to your country, your case, and your circumstances.' },
  { n: '03', t: 'Act',        b: 'Secure your evidence. Draft your documents. Connect to verified counsel. Your case is built. You are ready.' }
]

export const platforms = [
  { icon: 'message-circle', tag: 'Most accessible', title: 'WhatsApp',   body: 'The channel already in every pocket. Send a message. Get legal guidance. Preserve evidence. All without leaving WhatsApp.' },
  { icon: 'smartphone',     tag: 'Full experience', title: 'Mobile App', body: 'iOS and Android. Real-time evidence capture. Case tracking. Lawyer communication. The full platform — in your pocket.' },
  { icon: 'monitor',        tag: 'For institutions', title: 'Web App',    body: 'The complete infrastructure layer. For individuals managing complex matters, legal aid organisations, law firms, and courts operating at scale.' }
]

export const founders = [
  { name: 'Linda', role: 'Co-Founder & CEO', detail: 'Strategy, Fundraising, Partnerships' },
  { name: 'Ali',   role: 'Co-Founder & CTO', detail: 'Product Architecture, Engineering' }
]

export const sdgs = [
  { n: '16', label: 'Goal 16', title: 'Peace, Justice & Strong Institutions', body: 'Target 16.3 — promote the rule of law and ensure equal access to justice for all. This is the goal Justly exists to move.' },
  { n: '10', label: 'Goal 10', title: 'Reduced Inequalities',                body: 'Closing the gap where wealth, language, and geography decide who has rights — and who does not.' },
  { n: '05', label: 'Goal 5',  title: 'Gender Equality',                     body: 'Women face disproportionate barriers to legal recourse. Justly meets them where they already are — in the language they already use.' },
  { n: '01', label: 'Goal 1',  title: 'No Poverty',                          body: 'A single unresolved legal matter can push a household into poverty. We break that chain before it forms.' }
]

// Each country card reveals a local stat on hover
export const countries = [
  { flag: '🇳🇬', name: 'Nigeria', stat: '70% of urban Nigerians cannot afford a private lawyer.' },
  { flag: '🇰🇪', name: 'Kenya',   stat: 'One lawyer per 1,400 people — concentrated in Nairobi.' },
  { flag: '🇬🇭', name: 'Ghana',   stat: 'Legal aid waitlists exceed 12 months in many circuits.' },
  { flag: '🇺🇬', name: 'Uganda',  stat: '86% of legal matters never reach formal resolution.' },
  { flag: '🇷🇼', name: 'Rwanda',  stat: 'Digital-first legal reform active — Justly launches here.' }
]

export const traction = [
  { to: 13000, label: 'Waitlist sign-ups' },
  { to: 0,     prefix: '$', label: 'Paid acquisition' },
  { to: 5,     label: 'Target markets' },
  { to: 40,    label: 'Partner organisations identified' }
]

// Pricing tiers — prices are in USD; the Pricing section renders a currency switcher
// that applies the approximate rate to Pro's monthly price (rough, for directional display).
export const currencies = [
  { code: 'USD', symbol: '$',   rate: 1,      name: 'US Dollar' },
  { code: 'NGN', symbol: '₦',   rate: 1600,   name: 'Nigerian Naira' },
  { code: 'KES', symbol: 'KSh ', rate: 130,    name: 'Kenyan Shilling' },
  { code: 'GHS', symbol: '₵',   rate: 15,     name: 'Ghanaian Cedi' },
  { code: 'UGX', symbol: 'USh ', rate: 3800,   name: 'Ugandan Shilling' },
  { code: 'RWF', symbol: 'RF ',  rate: 1300,   name: 'Rwandan Franc' }
]

export const pricingTiers = [
  {
    id: 'free',
    tag: 'For anyone',
    name: 'Free',
    priceUSD: 0,
    period: '/forever',
    features: [
      'AI legal guidance in 5 jurisdictions',
      'WhatsApp access',
      'Plain-language rights explanations',
      'Up to 3 case sessions per month'
    ],
    cta: { label: 'Join Waitlist', href: '#waitlist' },
    highlighted: false
  },
  {
    id: 'pro',
    tag: 'For individuals',
    name: 'Pro',
    priceUSD: 7,
    period: '/month',
    features: [
      'Everything in Free',
      'Unlimited case sessions',
      'Encrypted evidence vault',
      'Verified lawyer matching',
      'Document drafting',
      'Case tracking across devices'
    ],
    cta: { label: 'Get Early Access', href: '#waitlist' },
    highlighted: true
  },
  {
    id: 'institutions',
    tag: 'For legal aid, firms & courts',
    name: 'Institutions',
    priceUSD: null, // custom
    period: '',
    features: [
      'Everything in Pro',
      'Multi-seat case management',
      'API + integrations',
      'Bulk evidence handling',
      'SLA + dedicated support',
      'White-label options'
    ],
    cta: { label: 'Contact Sales', href: 'mailto:legal@getjustly.org' },
    highlighted: false
  }
]

export const faqs = [
  { q: 'Is Justly free?',            a: 'Basic access is free forever. Justly Pro — with full platform access, evidence vault, and lawyer matching — is $5–10/month. Less than one hour of legal consultation.' },
  { q: 'Is my information private?',  a: 'Your legal matter remains confidential at every stage. End-to-end encrypted. No public records. No silent sharing. You control when and how your information is disclosed.' },
  { q: 'Do I need a smartphone?',     a: 'No. WhatsApp works on basic phones. Partner organisations bridge access for users without any device. We designed for the lowest common denominator — deliberately.' },
  { q: 'Which countries are supported?', a: 'Nigeria, Kenya, Ghana, Uganda, and Rwanda at launch — with jurisdiction-specific legal intelligence in each market.' },
  { q: 'How is this different from ChatGPT?', a: 'ChatGPT gives information. Justly builds a case. The difference is infrastructure — evidence vault, verified lawyers, case continuity, and jurisdiction-specific legal logic. None of that exists in a general AI tool.' },
  { q: 'Are you raising funding?',    a: 'Yes. We are raising a $500K pre-seed round. If you are an investor aligned with access to justice, legal tech, or African infrastructure — reach out.' }
]

export const footerCols = [
  { h: 'Platform', links: ['AI Guidance', 'Evidence Vault', 'Lawyer Matching', 'Case Tracking'] },
  { h: 'Access',   links: ['WhatsApp', 'Mobile App', 'Web App'] },
  { h: 'Company',  links: ['About', 'Mission', 'Partners', 'Careers', 'Press'] },
  { h: 'Legal',    links: ['Privacy', 'Terms', 'Contact'] }
]

// Mock live-join feed — shown as toasts bottom-left every ~15-25s
export const joinFeed = [
  { name: 'Ada O.',     city: 'Lagos',    text: 'just joined the waitlist' },
  { name: 'Wanjiru K.', city: 'Nairobi',  text: 'just joined the waitlist' },
  { name: 'Kwame A.',   city: 'Accra',    text: 'just joined the waitlist' },
  { name: 'Asha M.',    city: 'Kampala',  text: 'just joined the waitlist' },
  { name: 'Eric U.',    city: 'Kigali',   text: 'just joined the waitlist' },
  { name: 'Funke T.',   city: 'Abuja',    text: 'just joined the waitlist' },
  { name: 'Daniel O.',  city: 'Mombasa',  text: 'just joined the waitlist' },
  { name: 'Abena S.',   city: 'Kumasi',   text: 'just joined the waitlist' }
]
