const featuredProjects = [
  {
    name: 'Togetha',
    status: 'live',
    company: 'Moradia',
    description:
      'Our flagship product at Moradia — property management software for letting agents and landlords, bringing tenancies, payments and maintenance into one calm place.',
    image: '/screenshots/togetha.png',
    gallery: ['/screenshots/togetha.png', '/screenshots/togetha-2.png'],
    link: 'https://togetha.co.uk',
    source: null,
    showCase: true,
    stack: ['TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 'Prisma', 'Stripe'],
    color: '#ccfbf1',
    tag: 'fullstack',
  },
  {
    name: 'Togetha Mobile',
    status: 'live',
    company: 'Moradia',
    description:
      'The Togetha companion app for tenants and landlords — rent, maintenance requests, documents and messages, all on the move.',
    image: '/screenshots/togetha-mobile-1.png',
    gallery: [
      '/screenshots/togetha-mobile-3.png',
      '/screenshots/togetha-mobile-1.png',
      '/screenshots/togetha-mobile-2.png',
    ],
    link: 'https://togetha.co.uk',
    source: null,
    showCase: true,
    stack: ['React Native', 'Expo', 'TypeScript', 'Tamagui', 'tRPC', 'PostgreSQL'],
    color: '#a7f3d0',
    tag: 'mobile',
  },
  {
    name: 'Ilemi',
    status: 'live',
    description:
      'Property listing marketplace built for the Nigerian market — discover homes to rent and buy with local payments, maps and verified listings.',
    image: '/screenshots/ilemi.png',
    link: 'https://ilemi.ng',
    source: null,
    showCase: true,
    stack: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Mapbox', 'Paystack'],
    color: '#99f6e4',
    tag: 'fullstack',
  },
  {
    name: 'Restora',
    status: 'live',
    description:
      'A database management tool for scheduling, running and restoring backups across Postgres, MySQL and Mongo — with a calm, engineer-first UI.',
    image: '/screenshots/restora.png',
    link: null,
    source: null,
    showCase: true,
    stack: ['TypeScript', 'Go', 'PostgreSQL', 'MySQL', 'MongoDB', 'Docker'],
    color: '#a7f3d0',
    tag: 'fullstack',
  },
];

const mainProjects = [...featuredProjects];

const topProjects = [
  ...featuredProjects,
  {
    name: 'Trader',
    status: 'live',
    description:
      'A personal replacement for my broker\u2019s interface \u2014 a watchlist with live quotes and charts, my imported Freetrade history with realized and open P&L, price alerts that reach me by email or Telegram, and opportunity scoring that says buy, hold or sell and why, then keeps a track record of whether it was right.',
    image: '/screenshots/trader.png',
    gallery: ['/screenshots/trader.png', '/screenshots/trader-portfolio.png'],
    link: 'https://kennymark.com/trader',
    source: 'https://github.com/kennymark/trader',
    showCase: true,
    stack: ['TypeScript', 'React', 'TanStack Router', 'Convex', 'Yahoo Finance', 'DeepSeek'],
    color: '#e0f2fe',
    tag: 'fullstack',
  },
  {
    name: 'petitions dashboard',
    status: 'live',
    description:
      'An SPA that extracts valuable insight into UK parliamentary petition data with just a simple url.',
    image:
      'https://raw.githubusercontent.com/kennymark/british-petitions-dashboard/master/screenshots/table-view.png',
    link: 'https://petitions.now.sh/',
    source: 'https://github.com/kennymark/british-petitions-dashboard',
    showCase: true,
    stack: ['React.js', 'ChakraUI', 'Material Datatable Component', 'Parliaments API'],
    color: '#C6F6D5',
    tag: 'frontend',
  },

  {
    name: 'Easywire',
    status: 'in-progress',
    description: 'This is a code version of a design by the TailwindUI team',
    image: 'https://github.com/kennymark/easywire/blob/master/screenshots/easywire.png?raw=true',
    link: 'https://kennymark.com/easywire',
    source: 'https://github.com/angular-hub/client',
    showCase: true,
    stack: ['React', 'Next.js', 'ChakraUI'],
    color: '#ccfbf1',
    tag: 'frontend',
  },
  {
    name: 'stripe payment and subscriptions',
    status: 'live',
    description: `Charge or subscribe to a fictional product using Stripe's API.`,
    image:
      'https://raw.githubusercontent.com/kennymark/stripe-subscriptions/master/screenshots/plans.png',
    link: 'https://stripe-subscriptions.vercel.app/',
    source: 'https://github.com/kennymark/stripe-subscriptions',
    showCase: true,
    stack: ['React.js', 'ChakraUI', 'Stripe api'],
    color: '#faeee7',
    tag: 'fullstack',
  },
  // {
  //   name: "clever advisor",
  //   status: "in-progress",
  //   description:
  //     "An application I built for an interview process. A tool for investors to view their finance",
  //   image:
  //     "https://gitlab.com/kennymark/clever-advisor/-/raw/master/screenshots/home.png",
  //   link: "https://clever-advisor.netlify.com/",
  //   source: "https://gitlab.com/kennymark/clever-advisor",
  //   showCase: true,
  //   stack: ["Angular", "Bootstrap", "Ng2 Charts", "Ngx Datatable"],
  //   color: "#c9e8ff",
  //   tag: "frontend",
  // },
  {
    name: 'flux weather',
    status: 'in-progress',
    description: 'A beautiful cross platform weather app built in React-Native expo.',
    image:
      'https://camo.githubusercontent.com/2545a369f71065156e739ffbdc3b7cf9238361d1/68747470733a2f2f7374617469632e6e6f74696f6e2d7374617469632e636f6d2f61643364303635642d373135392d346138302d386130362d6134353531666361663938642f53696d756c61746f725f53637265656e5f53686f745f2d5f6950686f6e655f585f2d5f323031382d30322d32375f61745f31352e32312e33352e706e67',
    link: null,
    source: 'https://github.com/kennymark/Flux-Weather',
    showCase: true,
    stack: ['React native', 'Darksky API', 'Expo', 'React Native Elements'],
    color: '#dafdff',
    tag: 'mobile',
  },
  {
    name: 'Sweet Bnb',
    status: 'in-progress',
    description: 'Another airbnb clone with a gorgeous ui inspired by my older clone',
    image: 'https://github.com/kennymark/SweetBnb/blob/dev/screenshots/popover.png?raw=true',
    link: 'https://kennymark.com/sweetbnb',
    source: 'https://github.com/kennymark/SweetBnb',
    showCase: true,
    stack: ['React', 'Next.js', 'Chakra UI', 'Ngx Datatable'],
    color: '#fbcfe8',
    tag: 'frontend',
  },
  {
    name: 'good notes',
    status: 'live',
    description:
      'A simple note taking application built with React and Firebase Auth and Firestore.',
    image:
      'https://raw.githubusercontent.com/kennymark/Good-Notes/master/screenshots/main-page.png',
    link: 'https://goodnotes.netlify.com/',
    source: 'https://github.com/kennymark/Good-Notes',
    stack: ['React', 'Firebase Auth', 'Firebase firestore'],
    color: '#cfceff',
    tag: 'frontend',
    showCase: true,
  },
  {
    name: 'Book search',
    status: 'live',
    description: 'A demo app to search for books in an elastic search db via appbase.io',
    image:
      'https://raw.githubusercontent.com/kennymark/react-native-book-search/master/book-search.png',
    link: '',
    source: 'https://github.com/kennymark/react-native-book-search',
    stack: ['React native', 'Appbase.io', 'Elastic search', 'expo'],
    color: '#fed7aa',
    tag: 'mobile',
    showCase: false,
  },
];

const extraProjects = [
  {
    name: 'Fullstack JavaScript Boilerplate',
    status: 'live',
    description: 'Express based app with email + social auth, password recovery, email etc.',
    image:
      'https://raw.githubusercontent.com/kennymark/express-starter/master/screenshots/account.png',
    link: 'https://express-kenny.herokuapp.com/',
    source: 'https://github.com/kennymark/express-starter',
    stack: ['Node.js', 'Express', 'Passport.js for social/local login', 'Handlebars', 'Mongo'],
    color: '#f7e7df',
  },
  {
    name: 'angular hub',
    status: 'in-progress',
    description:
      'An idea for a database for Angular libraries and components that google failed to build.',
    image: 'https://raw.githubusercontent.com/angular-hub/client/master/screenshot/home.jpg',
    link: 'https://angularhub.netlify.com/',
    source: 'https://github.com/angular-hub/client',
    stack: ['Angular', 'Nebular UI'],
    color: '#bae8e8',
  },
  {
    name: 'car info extractor',
    status: 'live',
    description: 'Get valuable info from a car before purchase (uk only).',
    image: 'https://raw.githubusercontent.com/kennymark/uk-car-search/master/img.png',
    link: 'https://car-finder.netlify.app/',
    github: 'https://github.com/kennymark/uk-car-search',
  },
  {
    name: 'oz studios',
    description:
      'Oz Studios is a fictional web design agency website built to showcase my skills as a front-end developer or web designer.',
    link: 'https://oz-studios.netlify.com/',
  },
  {
    name: 'fse-rec',
    description:
      'The FSE-REC is an asp.net web app built by me and and 3 other friends as my second year work based learning project for the University. It includes functionality ranging from a SQL database, dynamic routing, login integration.',
    link: 'https://codepen.io/kennymark/full/GmeGoa',
  },
  {
    name: 'JS KeyCode Finder',
    description:
      'The JS key code finder is a simple tool that detect which key has been pressed and then gives you its key code number. ',
    link: 'https://keycodefinder.netlify.com/.',
  },
];

export { extraProjects, mainProjects, topProjects };
