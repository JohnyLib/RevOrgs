import React from 'react';
import { Project, ExperienceItem, TechItem, ProcessStep } from './types';
import { 
  Code2, 
  Database, 
  Layout, 
  Smartphone, 
  Globe, 
  Box,
  Figma,
  Terminal,
  Triangle,
  Server,
  Zap,
  Workflow,
  Search,
  Compass,
  Palette,
  Rocket,
  Settings,
  Layers
} from 'lucide-react';
import { Lang } from './translations';

// Icons map for reuse
const ICONS = {
  search: <Search size={24} />,
  compass: <Compass size={24} />,
  palette: <Palette size={24} />,
  code: <Code2 size={24} />,
  rocket: <Rocket size={24} />
};

export const getProcess = (lang: Lang): ProcessStep[] => {
  const data = {
    en: [
      { id: '01', title: 'Discovery & Research', description: 'We immerse ourselves in your brand ecosystem. Through stakeholder interviews and market analysis, we uncover the core challenges and define clear KPIs for success.' },
      { id: '02', title: 'Strategy & Architecture', description: 'We blueprint the solution. This involves creating detailed sitemaps, user flows, and selecting the optimal tech stack to ensure scalability, security, and future-proofing.' },
      { id: '03', title: 'Design & Prototyping', description: 'We craft high-fidelity designs and interactive prototypes. Our focus is on intuitive UX and brand-defining UI that creates an emotional connection with users.' },
      { id: '04', title: 'Development', description: 'Our engineers bring the vision to life using clean, semantic code. We implement complex animations and backend logic while maintaining high performance scores.' },
      { id: '05', title: 'Launch & Evolution', description: 'We manage the deployment process and monitor real-world performance. Post-launch, we iterate based on user data to continuously optimize the experience.' }
    ],
    rom: [
      { id: '01', title: 'Descoperire & Cercetare', description: 'Ne imersăm în ecosistemul brandului tău. Prin interviuri și analize de piață, descoperim provocările principale și definim KPI-uri clare pentru succes.' },
      { id: '02', title: 'Strategie & Arhitectură', description: 'Planificăm soluția. Creăm hărți detaliate ale site-ului, fluxuri de utilizatori și selectăm stiva tehnologică optimă pentru scalabilitate și securitate.' },
      { id: '03', title: 'Design & Prototipare', description: 'Creăm design-uri high-fidelity și prototipuri interactive. Ne concentrăm pe UX intuitiv și UI care definește brandul și creează o conexiune emoțională.' },
      { id: '04', title: 'Dezvoltare', description: 'Inginerii noștri dau viață viziunii folosind cod curat și semantic. Implementăm animații complexe și logică backend, menținând performanța ridicată.' },
      { id: '05', title: 'Lansare & Evoluție', description: 'Gestionăm procesul de implementare și monitorizăm performanța. Post-lansare, optimizăm experiența pe baza datelor reale.' }
    ],
    ru: [
      { id: '01', title: 'Исследование', description: 'Мы погружаемся в экосистему вашего бренда. Через интервью и анализ рынка мы выявляем ключевые задачи и определяем KPI для успеха.' },
      { id: '02', title: 'Стратегия и Архитектура', description: 'Мы проектируем решение. Это включает создание подробных карт сайта, пользовательских сценариев и выбор оптимального стека технологий.' },
      { id: '03', title: 'Дизайн и Прототипирование', description: 'Мы создаем детализированные макеты и интерактивные прототипы. Наш фокус — интуитивный UX и UI, который формирует эмоциональную связь.' },
      { id: '04', title: 'Разработка', description: 'Наши инженеры воплощают видение в жизнь с помощью чистого кода. Мы реализуем сложные анимации и логику бэкенда, сохраняя высокую производительность.' },
      { id: '05', title: 'Запуск и Развитие', description: 'Мы управляем процессом развертывания и мониторинга. После запуска мы оптимизируем продукт на основе реальных пользовательских данных.' }
    ]
  };

  const steps = data[lang];
  return [
    { ...steps[0], icon: ICONS.search },
    { ...steps[1], icon: ICONS.compass },
    { ...steps[2], icon: ICONS.palette },
    { ...steps[3], icon: ICONS.code },
    { ...steps[4], icon: ICONS.rocket }
  ];
};

export const getPortfolio = (lang: Lang): Project[] => {
  const common = [
    {
      id: 'vendi',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2673&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2673&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop'
      ],
      link: 'https://vendi.md/ru/',
      year: '2024'
    },
    {
      id: 'chirie',
      image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=2636&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=2636&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?q=80&w=2728&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2670&auto=format&fit=crop'
      ],
      link: 'https://chirie-auto.md/',
      year: '2024'
    },
    {
      id: 'himalaya',
      image: 'https://images.unsplash.com/photo-1615485925763-867862f80f1e?q=80&w=2666&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1615485925763-867862f80f1e?q=80&w=2666&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1544367563-12123d8965cd?q=80&w=2670&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1603189999818-6f68532f1704?q=80&w=2670&auto=format&fit=crop'
      ],
      link: 'https://himalayasalt.md/',
      year: '2023'
    },
    {
      id: 'legalgrup',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2671&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2632&auto=format&fit=crop'
      ],
      link: 'https://legalgrup.md/ru',
      year: '2023'
    },
    {
      id: 'servicii',
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2600&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2670&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?q=80&w=2673&auto=format&fit=crop'
      ],
      link: 'https://serviciijuridice.md/',
      year: '2023'
    },
    {
      id: 'vptrokenbau',
      image: 'https://images.unsplash.com/photo-1541888946428-d63bb8f49f44?q=80&w=2670&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1541888946428-d63bb8f49f44?q=80&w=2670&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop'
      ],
      link: 'https://vptrokenbau.netlify.app/',
      year: '2024'
    }
  ];

  const content = {
    en: [
      { title: 'Vendi Imobiliare', category: 'Real Estate', client: 'Vendi', description: 'A comprehensive real estate marketplace simplifying the property buying and renting process.', tags: ['Marketplace', 'Next.js', 'Maps', 'Real Estate'] },
      { title: 'Chirie Auto', category: 'Automotive', client: 'Chirie Auto MD', description: 'A dynamic car rental platform designed for speed and ease of use. Users can browse a diverse fleet and book instantly.', tags: ['Rental System', 'React', 'Booking', 'Mobile First'] },
      { title: 'Himalaya Salt', category: 'E-Commerce', client: 'Himalaya Salt MD', description: 'An elegant e-commerce boutique dedicated to premium Himalayan salt products, emphasizing purity and wellness.', tags: ['E-Commerce', 'Wellness', 'Brand', 'Shopify'] },
      { title: 'LegalGrup', category: 'Corporate', client: 'LegalGrup SRL', description: 'A sophisticated corporate presence for a premier legal firm, establishing authority and trust through detailed service breakdowns.', tags: ['Corporate', 'Legal Tech', 'Multilingual', 'UI/UX'] },
      { title: 'Servicii Juridice', category: 'Legal Services', client: 'Servicii Juridice', description: 'A user-centric legal portal designed for rapid information retrieval and accessibility.', tags: ['SEO', 'Performance', 'Consulting', 'React'] },
      { title: 'VP Trokenbau', category: 'Construction', client: 'VP Trokenbau', description: 'A professional construction company website showcasing services, projects, and expertise in the construction industry.', tags: ['Construction', 'Corporate', 'React', 'Modern Design'] }
    ],
    rom: [
      { title: 'Vendi Imobiliare', category: 'Imobiliare', client: 'Vendi', description: 'Un marketplace imobiliar complet care simplifică procesul de cumpărare și închiriere a proprietăților.', tags: ['Marketplace', 'Next.js', 'Hărți', 'Imobiliare'] },
      { title: 'Chirie Auto', category: 'Auto', client: 'Chirie Auto MD', description: 'O platformă dinamică de închirieri auto. Utilizatorii pot naviga printr-o flotă diversă și pot rezerva instantaneu.', tags: ['Sistem Rezervări', 'React', 'Booking', 'Mobile First'] },
      { title: 'Himalaya Salt', category: 'E-Commerce', client: 'Himalaya Salt MD', description: 'Un boutique e-commerce elegant dedicat produselor din sare de Himalaya, punând accent pe puritate și wellness.', tags: ['E-Commerce', 'Wellness', 'Brand', 'Shopify'] },
      { title: 'LegalGrup', category: 'Corporativ', client: 'LegalGrup SRL', description: 'O prezență corporativă sofisticată pentru o firmă de avocatură de top, stabilind autoritate și încredere.', tags: ['Corporativ', 'Legal Tech', 'Multilingv', 'UI/UX'] },
      { title: 'Servicii Juridice', category: 'Servicii Juridice', client: 'Servicii Juridice', description: 'Un portal juridic centrat pe utilizator, conceput pentru recuperarea rapidă a informațiilor.', tags: ['SEO', 'Performanță', 'Consulting', 'React'] },
      { title: 'VP Trokenbau', category: 'Construcții', client: 'VP Trokenbau', description: 'Un site web profesional pentru o companie de construcții, prezentând servicii, proiecte și expertiză în industria construcțiilor.', tags: ['Construcții', 'Corporativ', 'React', 'Design Modern'] }
    ],
    ru: [
      { title: 'Vendi Imobiliare', category: 'Недвижимость', client: 'Vendi', description: 'Комплексный маркетплейс недвижимости, упрощающий процесс покупки и аренды жилья.', tags: ['Маркетплейс', 'Next.js', 'Карты', 'Недвижимость'] },
      { title: 'Chirie Auto', category: 'Авто', client: 'Chirie Auto MD', description: 'Динамичная платформа по аренде автомобилей. Пользователи могут просматривать автопарк и бронировать мгновенно.', tags: ['Бронирование', 'React', 'Авто', 'Mobile First'] },
      { title: 'Himalaya Salt', category: 'E-Commerce', client: 'Himalaya Salt MD', description: 'Элегантный интернет-магазин премиальных продуктов из гималайской соли.', tags: ['E-Commerce', 'Wellness', 'Бренд', 'Shopify'] },
      { title: 'LegalGrup', category: 'Корпоративный', client: 'LegalGrup SRL', description: 'Корпоративный сайт для ведущей юридической фирмы, укрепляющий авторитет и доверие.', tags: ['Корпоративный', 'Legal Tech', 'Multilingual', 'UI/UX'] },
      { title: 'Servicii Juridice', category: 'Юр. Услуги', client: 'Servicii Juridice', description: 'Юридический портал, ориентированный на пользователя, для быстрого поиска информации.', tags: ['SEO', 'Performance', 'Консалтинг', 'React'] },
      { title: 'VP Trokenbau', category: 'Строительство', client: 'VP Trokenbau', description: 'Профессиональный сайт строительной компании, демонстрирующий услуги, проекты и экспертизу в строительной отрасли.', tags: ['Строительство', 'Корпоративный', 'React', 'Современный Дизайн'] }
    ]
  };

  return common.map((item, index) => ({
    ...item,
    ...content[lang][index]
  }));
};

export const STACK: TechItem[] = [
  { name: 'React', icon: <Code2 size={40} /> },
  { name: 'Next.js', icon: <Globe size={40} /> },
  { name: 'Three.js', icon: <Box size={40} /> },
  { name: 'TypeScript', icon: <Terminal size={40} /> },
  { name: 'Node.js', icon: <Database size={40} /> },
  { name: 'Tailwind', icon: <Layout size={40} /> },
  { name: 'React Native', icon: <Smartphone size={40} /> },
  { name: 'WebGL', icon: <Triangle size={40} /> },
  { name: 'AWS', icon: <Server size={40} /> },
  { name: 'Docker', icon: <Zap size={40} /> },
  { name: 'GraphQL', icon: <Workflow size={40} /> },
  { name: 'Figma', icon: <Figma size={40} /> },
  { name: 'GSAP', icon: <Layers size={40} /> },
];

// Placeholder export for compatibility if needed elsewhere
export const PROCESS = getProcess('en');
export const PORTFOLIO = getPortfolio('en');
