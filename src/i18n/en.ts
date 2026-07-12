import type es from './es';

const en: typeof es = {
  // ===== SEO / Meta =====
  siteTitle: 'Tp3studio — AI-Operated Digital Business',
  siteDesc: 'Your business online, operated by artificial intelligence. The agent chats with your customers 24/7 — you just talk to it.',
  siteKeywords: 'AI business agent, AI-operated digital business, chat-to-admin, e-commerce AI, business automation, Colombia, Mexico, Dominican Republic',
  siteAuthor: 'Tp3studio',

  // ===== Header =====
  nav: {
    portfolio: 'Success Stories',
    blog: 'Blog',
    precios: 'Pricing',
    preview: 'Try your site',
    about: 'Our Story',
    login: 'Log In',
    asesor: 'Advisor',
    logoAria: 'Tp3studio — Home',
    navAria: 'Main navigation',
    mobileAria: 'Main menu',
    toggleAria: 'Open menu',
  },

  // ===== Footer =====
  footer: {
    tagline: 'Empowering businesses with artificial intelligence',
    email: 'info@aitp3studio.com',
    empresa: 'Company',
    recursos: 'Resources',
    legal: 'Legal',
    sobreNosotros: 'About Us',
    whiteLabel: 'White Label',
    servicios: 'Services',
    comoFunciona: 'How It Works',
    testimonios: 'Testimonials',
    faq: 'FAQ',
    contacto: 'Contact',
    pruebaTuWeb: 'Try your site',
    privacidad: 'Privacy',
    terminos: 'Terms',
    hechoCon: 'Made with',
    amor: 'love',
    por: 'by',
  },

  // ===== 404 =====
  notFound: {
    title: 'Page Not Found',
    description: 'The page you are looking for does not exist or has been moved.',
    code: '404',
    message: 'Looks like you got lost...',
    details: 'The page you are looking for does not exist, was moved, or never existed. But don\'t worry, you can still find what you need.',
    home: 'Go back home',
    contact: 'Contact us',
  },

  // ===== Hero =====
  hero: {
    badge: 'AI agents for businesses in Colombia, Mexico & DR',
    title: 'Your digital business.',
    titleHighlight: 'AI-operated.',
    from: 'From',
    titleEnd: '$200,000 COP/month',
    subtitle: `Not another website. It's your business serving customers 24/7 with an AI agent that knows your products, answers questions, and keeps you informed. You focus on growing your business.`,
    subtitleBold: 'Technology works for you.',
    subtitleEnd: '',
    ctaPrimary: 'I want my AI-operated business',
    ctaWhatsapp: 'Get personalized advice',
    feat1: 'Ultra-fast site',
    feat2: 'AI agent 24/7',
    feat3: 'No complexity',
    chatHeader: 'Your Tp3studio Agent',
    chatMsg1: 'Hi Jaime, your agent handled 12 customer inquiries today. All resolved.',
    chatMsg2: 'Did any go unanswered?',
    chatMsg3: 'None. All 12 were about hours, pricing, and availability. Your agent responded with the correct information every time.',
    floatCard: 'Agent active now',
    footerCredit: 'by Tp3studio',
  },

  // ===== What is Tp3 =====
  whatIsTp3: {
    label: 'What is Tp3',
    title: 'The Perfect',
    titleHighlight: 'Product Page',
    subtitle: `Not another website builder. It's your business's context layer \u2014 your business becomes legible to AI.`,
    pillars: [
      {
        icon: '🧠',
        title: 'Your business becomes legible.',
        subtitle: 'AI understands it all.',
        desc: `Your products, prices, policies and customers live in a shared context layer. Your agent understands it, operates it, and updates it. Not a generic chatbot \u2014 it's the brain of your business running 24/7.`,
      },
      {
        icon: '📄',
        title: 'A single page.',
        subtitle: 'The one that sells.',
        desc: 'Not a 5-page site with blog, about, and contact that nobody reads. One single page designed to take the customer from "what is this?" to "I want to buy it" — no clicks, no distractions.',
      },
      {
        icon: '🤖',
        title: 'With a 24/7 agent.',
        subtitle: 'AI that responds for you.',
        desc: 'Your agent chats with every visitor, answers common questions, qualifies leads, and hands you only the clients ready to buy. Like having your best employee on the page — no salary, no days off.',
      },
      {
        icon: '💬',
        title: 'You talk, it does.',
        subtitle: 'No dashboard, no WordPress.',
        desc: 'Add a product? Tell it. Change a price? Tell it. Check sales? Tell it. Managing your product page is as simple as sending a WhatsApp message.',
      },
    ],
    vsTitle: 'The difference',
    vsLeft: {
      label: 'Traditional website',
      items: [
        '5 pages nobody reads (Home, About, Blog, Contact…)',
        'Slow WordPress, plugins that break',
        'You have to update everything manually',
        'Generic chatbot that just says "leave your email"',
        'Complicated admin panel',
        'No built-in payments',
      ],
    },
    vsRight: {
      label: 'Tp3 — Digital Business',
      items: [
        'One page that converts. Designed so every visitor takes action.',
        'Pure HTML. Loads in milliseconds. No plugins.',
        'You tell us what you need, we implement it',
        'AI agent trained for your business. Responds, qualifies, serves.',
        'Real support. You\'re not alone.',
        '24/7 operation. Your customers always get an answer.',
      ],
    },
  },
  // ===== Stats Bar =====
  statsBar: {
    items: [
      { value: '24/7', label: 'Continuous operation' },
      { value: '3-7 days', label: 'Delivery time' },
      { value: 'AI', label: 'Trained agent' },
      { value: '3', label: 'Countries' },
    ],
  },

  // ===== Industries Section =====
  industries: {
    label: 'Built for your business',
    title: 'No matter what',
    titleHighlight: 'your industry is',
    subtitle: 'The agent is trained specifically for your type of business. See how it helps in each sector.',
    cards: [
      { icon: '🍽️', name: 'Restaurants', desc: 'Reservations, orders, and menu via WhatsApp. The agent takes orders while you cook.' },
      { icon: '👗', name: 'Clothing stores', desc: 'Automatic catalog with sizes and colors. Publish products just by talking.' },
      { icon: '🩺', name: 'Medical offices', desc: 'Schedule appointments, send reminders, and resolve questions without overwhelming your phone.' },
      { icon: '⚖️', name: 'Professional services', desc: 'Qualify leads, send quotes, and only pass along clients ready to hire.' },
      { icon: '🏠', name: 'Real estate', desc: 'Show properties, schedule tours, and answer inquiries 24/7 with photos and prices.' },
      { icon: '📚', name: 'Academies', desc: 'Manage enrollments, send materials, and answer student questions automatically.' },
    ],
  },

  // ===== Chat-to-Admin Section (NEW) =====
  chatToAdmin: {
    label: 'The superpower',
    title: 'You don\'t need a complicated dashboard.',
    titleHighlight: 'You just need to know how to talk.',
    subtitle: 'Manage your site, check how your agent responds, request changes — all by chatting. Like having an employee who understands your business and never sleeps.',
    withoutTitle: 'Without Tp3studio',
    withoutItems: [
      'You have to learn WordPress or Shopify',
      'You hire someone to update the website',
      'You don\'t know if the chatbot is responding well',
      'Metrics are confusing',
      'Every change costs money and time',
    ],
    withTitle: 'With Tp3studio',
    withChats: [
      {
        user: 'How is the agent handling questions about hours?',
        agent: 'Here are the last 5 conversations about hours. In all of them I responded with the correct information.',
      },
      {
        user: 'I need to update this week\'s prices',
        agent: 'Tell me the new prices and I\'ll update them on the site. Want me to reflect them in the agent\'s responses too?',
      },
      {
        user: 'How many inquiries did the agent handle today?',
        agent: 'I handled 8 inquiries today. 5 about pricing, 3 about availability. All resolved.',
      },
      {
        user: 'Add this new photo to the site',
        agent: 'Done. The image is now on the page. Want me to use it when customers ask about products too?',
      },
    ],
  },

  // ===== Case Studies =====
  caseStudies: {
    label: 'Case studies',
    title: 'Real businesses,',
    titleHighlight: 'real results',
    subtitle: 'Every business is different. Every product page is too. Here\'s how we solved it for them.',
    viewSite: 'View site',
    cases: [
      {
        tab: 'Varsana',
        name: 'Varsana Eco Yoga Village',
        location: 'Granada, Colombia',
        industry: 'Tourism & E-commerce',
        headline: 'They sell retreats, farm products, and receive volunteers — all from a single page.',
        results: 'Automated bookings · Fresh produce catalog · Volunteer applications 24/7',
        body: 'Varsana needed a page that could do three things at once: sell yoga retreats, showcase their farm products, and receive volunteer applications. We built them a product page with an AI agent that understands all three. When someone asks about a retreat, the agent shows dates, prices, and availability. If they ask about products, it shows the catalog. If they want to volunteer, it guides them through the process. All on one page, no menus, no confusion.',
        url: 'https://varsana-astro.vercel.app',
      },
      {
        tab: 'Vanta',
        name: 'Vanta Perfume',
        location: 'Latin America',
        industry: 'E-commerce',
        headline: 'Every fragrance has a story. The agent tells it better than anyone.',
        results: 'Interactive visual catalog · Automated orders · Personalized service 24/7',
        body: 'Vanta creates artisanal perfumes. Each fragrance is unique and needs to be told. We built them a product page where the AI agent is a virtual perfumer: it describes the notes of each fragrance, recommends based on occasion, and guides the customer from "that smells nice" to "I\'ll buy it." The owner just creates fragrances. The page handles selling them.',
        url: 'https://vanta-ecomerce-template.onrender.com',
      },
      {
        tab: 'Outkast',
        name: 'Outkast Creative Agency',
        location: 'Latin America',
        industry: 'Creative services',
        headline: 'From sending quotes via WhatsApp to having an automatic salesperson.',
        results: 'Instant quotes · Living portfolio · Auto-qualified leads',
        body: 'Outkast is a design studio that was losing hours sending proposals via WhatsApp and answering the same questions over and over. We built them a product page where their portfolio speaks for itself and the AI agent qualifies every prospect: it asks what they need, shows similar projects, and sends an automatic quote. They only receive clients ready to start.',
        url: 'https://outkast-astro.pages.dev',
      },
      {
        tab: 'LovelyPet',
        name: 'LovelyPet',
        location: 'Latin America',
        industry: 'E-commerce',
        headline: 'The pet store that never closes. Literally.',
        results: 'Orders 24/7 · Automatic confirmation · Always-updated catalog',
        body: 'LovelyPet had a physical store that closed at 6 pm. Now their product page takes orders around the clock: the customer chooses products, the agent confirms stock and price, processes the payment, and coordinates delivery. The owners just pick up the ready orders. Nighttime sales now account for 40% of their revenue.',
        url: 'https://lovelypet.kantongsoftware.com',
      },
    ],
  },

  // ===== How It Works (4 steps) =====
  howItWorks: {
    label: 'How it works',
    title: 'In 4 steps, your business',
    titleHighlight: 'becomes intelligent',
    subtitle: 'No dashboards. No manuals. No coding.',
    step1: {
      number: '1',
      title: 'Tell us about your business',
      desc: 'Fill out a form. We learn what you sell, who your customers are, and what you need the agent to handle for you.',
    },
    step2: {
      number: '2',
      title: 'We build your AI-operated digital business',
      desc: 'We don\'t just build a website. We train an AI agent that knows your products, your policies, and how to sell for you.',
    },
    step3: {
      number: '3',
      title: 'Learn to talk to your agent',
      desc: 'We onboard you in a 15-minute conversation where you learn to manage everything by chatting. No panels, no tutorials.',
    },
    step4: {
      number: '4',
      title: 'Your agent learns and improves on its own',
      desc: 'Every time you publish new content, change a price, or add a product, the agent updates automatically. Your business learns and improves with every interaction.',
    },
    cta: 'I want to start',
  },

  // ===== Pricing =====
  pricing: {
    label: 'Transparent pricing',
    title: 'Choose your',
    titleHighlight: 'starting point',
    subtitle: 'Monthly subscription. No lock-in contracts. Cancel anytime.',
    guarantee: '✅ If you don\'t see results in the first month, we adjust the agent or refund your money.',
    plans: [
      {
        tier: 'Basic',
        name: 'Web Presence',
        desc: 'Professional website with chat widget. No AI agent.',
        price: '$200,000',
        period: 'COP / month',
        monthly: '≈ $48 USD',
        features: [
          'Astro SSR website (pure HTML, ultra-fast)',
          'Chat widget installed',
          'Umami analytics',
          'Hosting + domain included',
          'Up to 5 pages',
          'SEO optimized + instant loading',
          'Email support (48h response)',
          'Setup in 3-5 days',
        ],
        hosting: 'Hosting + domain included',
        cta: 'Start now',
      },
      {
        tier: 'Most Popular',
        name: 'Business with AI',
        desc: '24/7 AI customer service agent + lead form.',
        price: '$450,000',
        period: 'COP / month',
        monthly: '≈ $108 USD',
        features: [
          'Everything in Basic Plan',
          '24/7 AI customer service agent',
          'Trained with your business data',
          'Lead form with Telegram notifications',
          'Monthly adjustments (up to 2 changes)',
          'Priority support (chat + email, 24h)',
          'Setup in 5-7 days',
        ],
        hosting: 'Hosting + domain included',
        cta: 'I want my AI agent',
      },
      {
        tier: 'Premium',
        name: 'Total Operation',
        desc: 'Admin AI agent + multi-site + same-day support.',
        price: '$800,000',
        period: 'COP / month',
        monthly: '≈ $192 USD',
        features: [
          'Everything in Standard Plan',
          'Admin AI agent (manage by chat)',
          'Up to 3 sites under one plan',
          'Unlimited changes',
          'Direct Telegram support (same-day)',
          'Monthly metrics',
          'Setup in 7-10 days',
        ],
        hosting: 'Hosting + domain included',
        cta: 'I want total operation',
      },
    ],
  },

  // ===== Testimonials =====
  testimonials: {
    label: 'What they say',
    title: 'Real businesses',
    titleHighlight: 'already running on AI',
    items: [
      {
        initials: 'MG',
        name: 'Maria G.',
        biz: 'Clothing store, Bogotá',
        text: '"I talk to my agent like she\'s my employee. I tell her \'add these new dresses\' and she publishes them on her own.',
        textBold: 'I never touch an admin panel anymore.',
        textEnd: '"',
        rating: '★★★★★',
      },
      {
        initials: 'CR',
        name: 'Carlos R.',
        biz: 'Legal services, Mexico City',
        text: '"My agent qualifies leads better than my secretary. I only get clients who actually need a lawyer.',
        textBold: 'I save hours every day.',
        textEnd: '"',
        rating: '★★★★★',
      },
      {
        initials: 'LP',
        name: 'Laura & Pedro',
        biz: 'Restaurant, Santo Domingo',
        text: '"The agent takes reservations, confirms via WhatsApp, and keeps us updated every week.',
        textBold: 'It\'s like having a manager who doesn\'t take a salary.',
        textEnd: '"',
        rating: '★★★★★',
      },
    ],
    cta: 'See more stories',
  },

  // ===== FAQ =====
  faq: {
    label: 'FAQ',
    title: 'Your questions,',
    titleHighlight: 'answered',
    items: [
      {
        q: 'What exactly is an AI agent?',
        a: 'It\'s an artificial intelligence trained specifically for your business. It chats with your customers 24/7, answers questions, schedules appointments, processes payments, and obeys when you ask it something via chat. Like a digital employee that never sleeps, never gets sick, and never quits.',
      },
      {
        q: 'How do I manage my site? Do I need to learn something complicated?',
        a: 'No. You talk to it via chat, like a person. "Add this product", "show me today\'s sales", "change the price of X". No dashboards, no tutorials, no WordPress. If you know how to use WhatsApp, you know how to run your business.',
      },
      {
        q: 'What if the agent gives a wrong answer?',
        a: 'You can check how it responds at any time by simply chatting with it and seeing what it says. If something isn\'t right, tell us and we\'ll adjust it. Plus, the agent learns and improves with every real customer interaction.',
      },
      {
        q: 'Is it a subscription? What happens if I cancel?',
        a: 'Yes, it\'s a monthly subscription because your agent operates 24/7, consumes cloud infrastructure, and stays updated. If you cancel, your site is frozen and the agent stops working. No lock-in contracts, no minimum terms, no penalties.',
      },
      {
        q: 'Can the agent actually handle payments?',
        a: 'Currently, the agent guides your customers through the purchase process, but payments are handled outside the platform (bank transfer, Nequi, cash on delivery). Direct payment integration is on our roadmap.',
      },
      {
        q: 'How long until my digital business is ready?',
        a: 'In 3 to 7 business days your site is live with the agent active. Then we do a session where we teach you how to manage it. Most clients are fully operational within the first week.',
      },
    ],
  },

  // ===== CTA Final =====
  ctaFinal: {
    label: 'Your business deserves this',
    title: 'Your business deserves an employee that',
    titleHighlight: 'never sleeps',
    subtitle: 'Your business becomes legible to AI. Your agent serves 24/7 while you focus on what matters. Your business can be the next one running on AI.',
    riskReversal: '🔒 If you don\'t see results in the first month, we adjust the agent or refund your money. No questions asked.',
    ctaPrimary: 'I want my AI-operated business',
    ctaWhatsapp: 'Get personalized advice',
  },

  // ===== Pages - About =====
  about: {
    title: 'About Us — Tp3studio',
    desc: 'Learn the story of Tp3studio. How we went from an idea to building AI agents for real businesses in Latin America.',
    introLabel: 'Our Story',
    introTitle: 'From a chat to',
    introTitleHighlight: 'real businesses',
    introDesc: 'Born out of frustration: watching businesses lose customers every day because their digital presence depended on expensive agencies, complicated platforms, or "the nephew who knows websites." The technology already exists for a business to run itself — it just needed to be assembled.',
    storyTitle: 'Technology that works for you',
    storyDesc1: 'We don\'t build "websites." We build digital businesses operated by artificial intelligence. An agent that knows your products, chats with your customers 24/7, qualifies leads, and keeps you informed — while you focus on what really matters.',
    storyDesc2: 'Our first client, Varsana, already runs on a Tp3studio agent: automated bookings, a fresh produce catalog, and volunteer applications — all from a single page. We\'re bringing this same technology to more businesses across Colombia, Mexico, and the Dominican Republic.',
    stats: [
      { number: '24/7', label: 'Continuous operation' },
      { number: '3-7 days', label: 'Delivery time' },
      { number: '3', label: 'Countries' },
    ],
    cta: 'I want to be next',
    valuesTitle: 'What drives us',
    values: [
      { icon: '🤖', title: 'AI that works', desc: 'Not a generic chatbot. An agent trained for your specific business.' },
      { icon: '💬', title: 'Managing is talking', desc: 'No dashboards. No tutorials. If you can talk, you can run your business.' },
      { icon: '⚡', title: 'Actually fast', desc: 'Your site in 3-7 days. Results in the first week. No hype.' },
      { icon: '🌎', title: 'Built for LatAm', desc: 'Real Spanish, COP pricing, we understand your market because we\'re from here.' },
    ],
  },

  // ===== Audits =====
  audit: {
    title: 'Free Audit — Tp3studio',
    desc: 'Get a personalized diagnosis of your digital presence. No commitment, no cost.',
    heroLabel: 'Free audit',
    heroTitle: 'Is your business',
    heroHighlight: 'losing customers',
    heroEnd: 'online?',
    heroDesc: 'Find out in 3 minutes if your digital presence is working. We\'ll send you a personalized diagnosis with what you can improve.',
    form: {
      name: 'Name',
      namePlaceholder: 'Your name',
      business: 'Business name',
      businessPlaceholder: 'Your business name',
      email: 'Email',
      emailPlaceholder: 'you@email.com',
      phone: 'WhatsApp / Phone',
      phonePlaceholder: '+57 300 123 4567',
      website: 'Do you already have a website? (optional)',
      websitePlaceholder: 'https://',
      message: 'What would you like to improve?',
      messagePlaceholder: 'Tell us more about your business...',
      submit: 'Send request',
      success: '✅ Received! We\'ll contact you soon.',
      error: 'Error sending. Try again.',
      sending: 'Sending...',
      privacy: 'Your data is safe. We don\'t share anything without your permission.',
    },
  },

  // ===== Precios =====
  precios: {
    title: 'Pricing — Tp3studio',
    desc: 'Monthly subscription with no lock-in contracts. AI-operated digital business from $49 USD/mo. Cancel anytime.',
  },

  // ===== Preview =====
  preview: {
    title: 'Try Your Site — Tp3studio',
    desc: 'See how an AI-operated digital business looks and works. Interact with the agent, browse sections, feel the speed.',
  },

  // ===== Auth =====
  auth: {
    title: 'Log In — Tp3studio',
    desc: 'Access your Tp3studio client dashboard.',
  },

  // ===== Blog =====
  blog: {
    title: 'Blog — Tp3studio',
    desc: 'Tips, guides, and resources about AI-operated digital businesses. Virtual agents, automation, e-commerce for small businesses in Latin America.',
    label: 'Blog',
    empty: 'No articles yet.',
    readMore: 'Read more',
    backLink: 'Back to blog',
  },

  // ===== Portfolio =====
  portfolio: {
    title: 'Success Stories — Tp3studio',
    desc: 'Real businesses already running with a Tp3studio AI agent. See how they sell, respond, and manage without touching a dashboard.',
    label: 'Success Stories',
    empty: 'No cases yet.',
    backLink: 'Back to portfolio',
  },

  // ===== White Label =====
  whiteLabel: {
    title: 'White Label — Tp3studio',
    desc: 'Offer AI-operated digital businesses to your clients without investing in development. White label licensing for agencies, freelancers, and consultants.',
  },

  // ===== Breadcrumbs =====
  breadcrumbs: {
    home: 'Home',
    blog: 'Blog',
    portfolio: 'Success Stories',
    precios: 'Pricing',
    about: 'About Us',
    audit: 'Free Audit',
    auth: 'Log In',
    preview: 'Try your site',
    'white-label': 'White Label',
    privacidad: 'Privacy',
    terminos: 'Terms & Conditions',
  },

  // ===== Privacy =====
  privacidad: {
    label: 'Privacy',
    title: 'Privacy Policy — Tp3studio',
    desc: 'Learn how we handle your personal data at Tp3studio. Privacy policy for Colombia, Mexico, and Dominican Republic.',
    lastUpdate: 'Last updated: June 9, 2026',
    s1Title: '1. Information We Collect',
    s1Body: 'Through our contact and free audit form, we collect the following information that you voluntarily provide:',
    s1Items: [
      'Full name',
      'Email address',
      'WhatsApp / phone number',
      'Business name',
      'Your current website URL (if applicable)',
      'Message or description of your inquiry',
    ],
    s2Title: '2. How We Use Your Data',
    s2Body: 'We use the collected information exclusively to: respond to your contact or audit request, send you information about our services if requested, and improve our services based on aggregated and anonymous patterns.',
    s3Title: '3. Cookies',
    s3Body: 'This website may use cookies and similar technologies to improve the browsing experience, analyze site traffic, and remember preferences. We do not use cookies to track you beyond this site or for targeted advertising without your explicit consent.',
    s4Title: '4. Storage and Security',
    s4Body: 'Your data is securely stored on servers with encryption in transit (TLS) and at rest. We do not share, sell, or rent your personal information to third parties. Only authorized Tp3studio personnel have access to your data for the purposes described in this policy.',
    s5Title: '5. Your Rights',
    s5Body: 'In accordance with applicable data protection laws in Colombia (Law 1581 of 2012), Mexico (LFPDPPP), and Dominican Republic (Law 172-13), you have the following rights regarding your personal data:',
    s5Items: [
      'Access: request a copy of the data we hold about you',
      'Rectification: correct inaccurate or incomplete data',
      'Cancellation: request deletion of your data',
      'Opposition: object to the processing of your data for specific purposes',
      'Portability: receive your data in a structured format (where applicable)',
    ],
    s6Title: '6. Contact',
    s6Body: 'If you wish to exercise your rights, have questions about this policy, or want us to delete your data, contact us through our free audit form or by emailing info@aitp3studio.com.',
  },

  // ===== Terms & Conditions =====
  terminos: {
    label: 'Terms & Conditions',
    title: 'Terms & Conditions — Tp3studio',
    desc: 'Terms and conditions of Tp3studio service: AI-operated digital businesses, virtual agent, e-commerce, and WhatsApp Business.',
    lastUpdate: 'Last updated: June 28, 2026',
    s1Title: '1. Service Description',
    s1Body: 'Tp3studio offers the creation and operation of digital businesses managed by artificial intelligence. This includes: professional website (Astro/pure HTML), 24/7 AI customer service agent, conversational admin panel (chat-to-admin), payment integration, and communication channels (Web, WhatsApp, Telegram depending on the plan). The website is delivered within a maximum of 48 business hours from receipt of complete client information.',
    s2Title: '2. Subscription Model and Payment',
    s2Body: 'The service is billed monthly according to the selected plan (Start, Growth, or Scale). Payment is made in advance each month. There are no minimum terms or cancellation penalties. The client may cancel at any time and their site will be frozen until the subscription is reactivated. We offer annual billing with two months of discount off the monthly price.',
    s3Title: '3. Delivery Timeline',
    s3Body: 'Once complete client information is received, Tp3studio delivers the functional website with the active AI agent within a maximum of 48 business hours. A 15-minute onboarding session is then scheduled where the client learns to manage their business by chatting with the agent. Most clients are fully operational in less than a week.',
    s4Title: '4. Agent Modifications and Adjustments',
    s4Body: 'The client may request adjustments to the behavior, personality, or knowledge of the AI agent at any time. These adjustments are included in the monthly subscription at no additional cost. The agent also updates automatically when the client publishes new content, changes prices, or adds products.',
    s5Title: '5. Cancellation and Refund Policy',
    s5Body: 'The client may cancel their subscription at any time without penalty. If they cancel during the first month and are not satisfied with the results, Tp3studio will refund 100% of the payment. After the first month, no refunds are issued for the month already billed, and the service remains active until the end of the current billing period.',
    s6Title: '6. Limitation of Liability',
    s6Body: 'Tp3studio is not liable for direct, indirect, incidental, or consequential damages arising from the use or inability to use our services, including but not limited to data loss, loss of revenue, or business interruption. Our maximum liability is limited to the amount paid for the service in the last three months.',
    s7Title: '7. Intellectual Property',
    s7Body: 'The client receives all intellectual property rights to their website content (text, images, products). Tp3studio retains ownership of the AI agent code, the conversational management platform, and the underlying infrastructure. Tp3studio reserves the right to display the work in its portfolio unless a written confidentiality agreement is in place.',
    s8Title: '8. Applicable Law and Jurisdiction',
    s8Body: 'These terms are governed by the laws of the Republic of Colombia. Any disputes arising from this contract shall be submitted to the jurisdiction of the courts of Bogotá, Colombia. For clients in Mexico and Dominican Republic, local laws will apply in addition to what is established herein where they do not contradict it.',
  },

  // ===== Schema.org =====
  schema: {
    businessName: 'Tp3studio',
    businessDesc: 'AI-operated digital business platform for small businesses in Latin America. 24/7 AI agent, chat-to-admin, integrated e-commerce.',
    serviceName: 'AI-Operated Digital Business',
    serviceDesc: 'Professional website with integrated AI agent that chats with customers 24/7 and is managed conversationally. No dashboards, no WordPress, no complications.',
    areaServed: ['CO', 'MX', 'DO'],
    faqLabel: 'Frequently Asked Questions — Tp3studio',
  },
};

export default en;
