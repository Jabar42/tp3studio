import type es from './es';

const en: typeof es = {
  // ===== SEO / Meta =====
  siteTitle: 'Tp3studio — Websites + AI Chatbots for Businesses in 48 Hours',
  siteDesc: 'Professional website with WhatsApp chatbot. Ready in 48 hours from $100 USD. No monthly fees. Launch your business with us.',
  siteKeywords: 'AI business solutions, chatbot, WhatsApp business, modern websites, business automation, Colombia',
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
    tagline: 'Empowering businesses with AI solutions',
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
    badge: '+100 businesses in Colombia, Mexico & DR already have it',
    title: 'Your business online, working for you, in',
    titleHighlight: '48 hours',
    from: 'From',
    titleEnd: '$100 USD',
    subtitle: 'Tell us about your business. In 48 hours we deliver a professional website with WhatsApp chatbot included. From',
    subtitleBold: '$100 USD',
    subtitleEnd: 'One time only.',
    ctaPrimary: 'I want my website',
    ctaWhatsapp: 'Get personalized advice',
    feat1: 'Ready in 48h',
    feat2: '24/7 Chatbot',
    feat3: 'Perfect on mobile',
    chatHeader: 'Tp3studio Chatbot',
    chatMsg1: 'Hi! How can I help you today?',
    chatMsg2: 'I want information about your services',
    chatMsg3: 'Sure! What kind of business do you have?',
    floatCard: 'Chatbot active now',
    footerCredit: 'by Aitp3studio.com',
  },

  // ===== Comparison Section =====
  comparison: {
    label: 'The awkward comparison',
    title: 'Look what you spend your money on',
    titleHighlight: 'without thinking',
    expensesTitle: 'Your monthly expenses',
    delivery: 'Delivery per month',
    dataPlan: 'Data plan',
    nightOut: 'Friday night out',
    haircuts: 'Two haircuts',
    nephew: '"Nephew who knows websites"',
    nephewNote: 'WASTED / MONTH',
    total: 'every month, forever',
    vs: 'VS',
    tp3Title: 'Tp3studio',
    tp3Price: '$100',
    tp3Note: 'USD · ONE TIME · FOREVER',
    tp3Benefits: [
      'Professional website ready in 48h',
      'AI Chatbot 24/7 included',
      'Custom responsive design',
      '1 year hosting included',
      'Optimized SEO + fast loading',
    ],
    tp3Tagline: 'The only difference is that this investment',
    tp3TaglineBold: 'pays you back every day',
    tp3Testimonial: '"In the first week I already had 12 inquiries from the chatbot. The website paid for itself." — Laura P., Restaurant',
  },

  // ===== How It Works =====
  howItWorks: {
    label: 'How It Works',
    title: 'So simple you can do it',
    titleHighlight: 'from your phone',
    subtitle: 'No meetings. No calls. No coding.',
    step1: {
      number: '1',
      title: 'Tell us about your business',
      desc: 'Fill a 3-minute form from your phone. No calls, no endless meetings.',
    },
    step2: {
      number: '2',
      title: 'We build everything',
      desc: 'Professional website + WhatsApp chatbot. Designed so you sell without lifting a finger.',
    },
    step3: {
      number: '3',
      title: 'Your business works for you',
      desc: 'In 48 hours you have a website and chatbot serving customers',
      descBold: 'while you sleep',
    },
    cta: 'I want to start',
  },

  // ===== Pricing =====
  pricing: {
    label: 'Transparent Pricing',
    title: 'Choose your',
    titleHighlight: 'starting point',
    subtitle: 'No fine print. No hidden monthly fees. Pay once and it\'s yours.',
    guarantee: '✅ If you\'re not satisfied, we adjust until it\'s perfect. At no extra cost.',
    plans: [
      {
        tier: 'Essential',
        name: 'Modern Website',
        desc: 'Your professional site with cutting-edge technology.',
        price: '$100',
        period: 'USD · one-time payment',
        monthly: '≈ $8/mo',
        features: [
          'Custom responsive design',
          'Optimized SEO + fast loading',
          'Testing on all devices',
          '1 year hosting included',
          'Domain: +$10 USD',
          'Revisions: $100 each',
        ],
        hosting: 'Includes 1 year hosting',
        cta: 'Start now',
      },
      {
        tier: 'Most Popular',
        name: 'Website + AI Agent',
        desc: 'Smart assistant that works 24/7, qualifies leads, and closes sales.',
        price: '$150',
        period: 'USD · one-time payment',
        monthly: '≈ $12/mo',
        features: [
          'Everything in Essential Plan',
          'Client tracking via chat',
          '9-5 EST support included',
          'Domain included ($10/yr)',
          'AI agent included',
          'WhatsApp Business integration (+$50)',
        ],
        hosting: '1 year hosting · Renews at $15 USD',
        cta: 'Buy Now',
      },
      {
        tier: 'Complete',
        name: 'Website + Agent + WhatsApp',
        desc: 'AI chatbot, WhatsApp Business, and integrated booking.',
        price: '$200',
        period: 'USD · one-time payment',
        monthly: '≈ $17/mo',
        features: [
          'Everything in Popular Plan',
          'WhatsApp Business configured',
          'Calendly integrated',
          'Custom AI agent',
          'Up to 10 pages',
          'Unlimited revisions',
        ],
        hosting: 'Free hosting + domain 1 year',
        note: 'As many revisions as you need to make it perfect',
        cta: 'Buy Now',
      },
    ],
  },

  // ===== Testimonials =====
  testimonials: {
    label: 'What they say',
    title: 'Real businesses',
    titleHighlight: 'are already growing',
    items: [
      {
        initials: 'MG',
        name: 'Maria G.',
        biz: 'Clothing store, Bogotá',
        text: '"I knew nothing about websites and in 48 hours I had my business online.',
        textBold: 'Amazing how easy it was.',
        textEnd: '"',
        rating: '★★★★★',
      },
      {
        initials: 'CR',
        name: 'Carlos R.',
        biz: 'Legal services, Mexico City',
        text: '"The chatbot changed the game. It answers inquiries while I sleep and I only see clients',
        textBold: 'ready to hire.',
        textEnd: '"',
        rating: '★★★★★',
      },
      {
        initials: 'LP',
        name: 'Laura & Pedro',
        biz: 'Restaurant, Santo Domingo',
        text: '"I thought having a website was super expensive.',
        textBold: 'For $150 USD',
        textEnd: ' my restaurant now has a professional presence and WhatsApp bookings."',
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
        q: 'Is it really ready in 48 hours?',
        a: 'Yes. Once we receive your information, we deliver in max 48h. Most in under 24h.',
      },
      {
        q: 'Do I need tech knowledge?',
        a: 'No. Just fill a 3-minute form. We handle all the technical stuff.',
      },
      {
        q: 'What happens after the first year?',
        a: 'Hosting renews at $15 USD/year. High-performance Cloudflare infrastructure.',
      },
      {
        q: 'Can I make changes later?',
        a: 'Yes. Popular and Complete plans include unlimited revisions. Essential: $100 USD per revision.',
      },
      {
        q: 'Does the chatbot work for any business?',
        a: 'Yes. We customize the AI agent for your business type: restaurant, store, services, office, etc.',
      },
      {
        q: 'What guarantee do I get?',
        a: 'We adjust until you\'re 100% satisfied. Popular and Complete plans have unlimited revisions.',
      },
    ],
  },

  // ===== CTA Final =====
  ctaFinal: {
    label: 'No excuses',
    title: 'Your business deserves',
    titleHighlight: 'to be online',
    subtitle: 'Tell us about your business and in 48 hours you\'ll have your professional website with chatbot. No runaround, no excuses.',
    riskReversal: '🔒 100% satisfied or we adjust until it\'s perfect. At no cost.',
    ctaPrimary: 'I want my website',
    ctaWhatsapp: 'Get personalized advice',
  },

  // ===== Pages - About =====
  about: {
    title: 'About Us — Tp3studio',
    desc: 'Learn the story of Tp3studio. How we went from an idea to empowering +100 businesses in Latin America with websites and AI agents.',
    introLabel: 'Our Story',
    introTitle: 'From a chat to',
    introTitleHighlight: '+100 businesses',
    introDesc: 'Born out of frustration: seeing businesses without digital presence, losing customers every day. Not because they didn\'t want to, but because options were expensive, slow, or complicated.',
    storyTitle: 'Less bureaucracy, more results',
    storyDesc1: 'We started with a simple idea: why should having a professional website take weeks and cost thousands of dollars? The answer is it shouldn\'t. We built a process that delivers in 48 hours, with modern technology and no quality compromise.',
    storyDesc2: 'Today, over 100 businesses in Colombia, Mexico, and the Dominican Republic trust us. We\'re not a traditional agency. We\'re a team that understands your time and money matter.',
    stats: [
      { number: '+100', label: 'Active businesses' },
      { number: '48h', label: 'Average delivery' },
      { number: '99%', label: 'Satisfaction' },
      { number: '3', label: 'Countries' },
    ],
    cta: 'I want to be next',
    valuesTitle: 'How we work',
    values: [
      { icon: '⚡', title: 'Real speed', desc: '48 hours, not weeks. No empty promises.' },
      { icon: '💰', title: 'Fair price', desc: 'One time. No monthly fees or surprises.' },
      { icon: '🤖', title: 'Practical AI', desc: 'Not for hype. Because it works and sells.' },
      { icon: '🌎', title: 'Built for LatAm', desc: 'We understand your market because we\'re from here.' },
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
    desc: 'Clear plans with no hidden monthly fees. Professional website from $100 USD. Pay once and it\'s yours.',
  },

  // ===== Preview =====
  preview: {
    title: 'Try Your Site — Tp3studio',
    desc: 'See how a Tp3studio website looks and works. Interact with the chatbot, browse sections, feel the speed.',
  },

  // ===== Auth =====
  auth: {
    title: 'Log In — Tp3studio',
    desc: 'Access your Tp3studio client dashboard.',
  },

  // ===== Blog =====
  blog: {
    title: 'Blog — Tp3studio',
    desc: 'Tips, guides, and resources to take your business digital. Websites, AI chatbots, digital marketing for small businesses.',
    label: 'Blog',
    empty: 'No articles yet.',
    readMore: 'Read more',
    backLink: 'Back to blog',
  },

  // ===== Portfolio =====
  portfolio: {
    title: 'Success Stories — Tp3studio',
    desc: 'Meet the businesses that have transformed their digital presence with Tp3studio. Real results, real clients.',
    label: 'Success Stories',
    empty: 'No cases yet.',
    backLink: 'Back to portfolio',
  },

  // ===== White Label =====
  whiteLabel: {
    title: 'White Label — Tp3studio',
    desc: 'Offer professional websites + AI chatbots to your clients without investing in development. White label licensing for agencies, freelancers, and consultants.',
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
  },

  // ===== Schema.org =====
  schema: {
    businessName: 'Tp3studio',
    businessDesc: 'We build professional websites with AI chatbots for small businesses in Latin America. Ready in 48 hours from $100 USD.',
    serviceName: 'Professional Website + AI Chatbot',
    serviceDesc: 'Professional website with integrated WhatsApp chatbot, responsive design, optimized SEO, hosting included. Delivered in 48 hours.',
    areaServed: ['CO', 'MX', 'DO'],
    faqLabel: 'Frequently Asked Questions — Tp3studio',
  },
};

export default en;
