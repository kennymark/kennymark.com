

const mainProjects = [
  {
    name: 'E-Commerce Store',
    status: 'live',
    description: 'A full stack E-commerce application with built-in support for payments, auth and a dashboard ',
    image: 'https://gitlab.com/kennymark/nuxt-mercado/-/raw/master/screenshots/products.png',
    gif: '../images/gif/mercado.gif',
    link: 'https://nuxt-mercado.netlify.app/',
    source: 'https://gitlab.com/kennymark/nuxt-mercado',
    stack: ["Vue.js", "Stripe for payments", "Fireabse", "Vue data-grid"],
    color: 'red'
  },
  {
    name: 'petitions dashboard',
    status: 'live',
    description: 'An SPA that extracts valuable insight into UK parliamentary petition data with just a simple url.',
    image: 'https://raw.githubusercontent.com/kennymark/british-petitions-dashboard/master/screenshots/table-view.png',
    gif: '../images/gif/petitions.gif',
    link: 'https://petitions.now.sh/',
    source: 'https://github.com/kennymark/british-petitions-dashboard',
    color: 'green'
  },

  {
    name: 'clever advisor',
    status: 'in-progress',
    description: 'An application I built for an interview process. A tool for investors to view their finance ',
    image: 'https://gitlab.com/kennymark/clever-advisor/-/raw/master/screenshots/home.png',
    gif: '../images/gif/clever-advisor.gif',
    link: 'https://clever-advisor.netlify.com/',
    source: 'https://gitlab.com/kennymark/clever-advisor',
    color: 'gray'
  },
]

const topProjects = [
  {
    name: 'E-Commerce Store',
    status: 'live',
    description: 'A full stack E-commerce application with built-in support for payments, auth and a dashboard ',
    image: 'https://gitlab.com/kennymark/nuxt-mercado/-/raw/master/screenshots/products.png',
    gif: '../images/gif/mercado.gif',
    link: 'https://nuxt-mercado.netlify.app/',
    source: 'https://gitlab.com/kennymark/nuxt-mercado',
    stack: ["Vue.js", "Stripe for payments", "Fireabse Auth", "Firebase Store", "Vue data-grid"],
    color: '#FED7D7'
  },
  {
    name: 'Fullstack JavaScript Boilerplate',
    status: 'live',
    description: 'Express based app with email + social auth, password recovery, email etc.',
    image: 'https://raw.githubusercontent.com/kennymark/express-starter/master/screenshots/account.png',
    link: 'https://express-kenny.herokuapp.com/',
    source: 'https://github.com/kennymark/express-starter',
    stack: ["Node.js", "Express", "Passport.js for social/local login", "Handlebars", "Mongo"],
    color: '#f7e7df'
  },
  {
    name: 'good notes',
    status: 'live',
    description: 'A simple note taking application built with React and Firebase Auth and Firestore.',
    image: 'https://raw.githubusercontent.com/kennymark/Good-Notes/master/screenshots/main-page.png',
    link: 'https://goodnotes.netlify.com/',
    source: 'https://github.com/kennymark/Good-Notes',
    stack: ["React", "Firebase Auth", "Firebase firestore"],
    color: '#cfceff'
  },
  {
    name: 'stripe payment and subscriptions',
    status: 'live',
    description: `Charge or subscribe to a fictional product using Stripe's API.`,
    image: 'https://raw.githubusercontent.com/kennymark/stripe-subscriptions/master/screenshots/plans.png',
    link: 'https://stripe-subscriptions.vercel.app/',
    source: 'https://github.com/kennymark/stripe-subscriptions',
    stack: ["React.js", "ChakraUI", "Stripe api",],
    color: '#faeee7'
  },
  {
    name: 'petitions dashboard',
    status: 'live',
    description: 'An SPA that extracts valuable insight into UK parliamentary petition data with just a simple url.',
    image: 'https://raw.githubusercontent.com/kennymark/british-petitions-dashboard/master/screenshots/table-view.png',
    link: 'https://petitions.now.sh/',
    source: 'https://github.com/kennymark/british-petitions-dashboard',
    stack: ["React.js", "ChakraUI", "Material Datatable Component", "Parliaments API"],
    color: '#C6F6D5'
  },
  {
    name: 'flux weather',
    status: 'in-progress',
    description: 'A beautiful cross platform weather app built in React-Native expo.',
    image: 'https://camo.githubusercontent.com/2545a369f71065156e739ffbdc3b7cf9238361d1/68747470733a2f2f7374617469632e6e6f74696f6e2d7374617469632e636f6d2f61643364303635642d373135392d346138302d386130362d6134353531666361663938642f53696d756c61746f725f53637265656e5f53686f745f2d5f6950686f6e655f585f2d5f323031382d30322d32375f61745f31352e32312e33352e706e67',
    link: null,
    source: 'https://github.com/kennymark/Flux-Weather',
    stack: ["React native", "Darksky API", "Expo", "React Native Elements"],
    color: '#dafdff'
  },
  {
    name: 'angular hub',
    status: 'in-progress',
    description: 'An idea for a database for Angular libraries and components that google failed to build.',
    image: 'https://raw.githubusercontent.com/angular-hub/client/master/screenshot/home.jpg',
    link: 'https://angularhub.netlify.com/',
    source: 'https://github.com/angular-hub/client',
    stack: ["Angular", "Nebular UI"],

    color: '#bae8e8'
  },

  {
    name: 'clever advisor',
    status: 'in-progress',
    description: 'An application I built for an interview process. A tool for investors to view their finance',
    image: 'https://gitlab.com/kennymark/clever-advisor/-/raw/master/screenshots/home.png',
    link: 'https://clever-advisor.netlify.com/',
    source: 'https://gitlab.com/kennymark/clever-advisor',
    stack: ["Angular", "Bootstrap", "Ng2 Charts", "Ngx Datatable"],
    color: '#c9e8ff'
  },
]

const extraProjects = [
  {
    name: 'react airbnb',
    status: 'live',
    description: 'A simple airbnb clone without the backend logic.',
    image: 'https://raw.githubusercontent.com/kennymark/airbnb-clone-v2/master/screenshot/screenshot.jpg',
    link: 'https://react-airbnb.netlify.com/',
    source: 'https://github.com/kennymark/airbnb-clone-v2',
    color: '#faeee7'
  },
  {
    name: 'car info extractor',
    status: 'live',
    description: 'Get valuable info from a car before purchase (uk only).',
    image: 'https://raw.githubusercontent.com/kennymark/uk-car-search/master/img.png',
    link: 'https://car-finder.netlify.app/',
    github: 'https://github.com/kennymark/uk-car-search'
  },
  {
    name: 'oz studios',
    description: 'Oz Studios is a fictional web design agency website built to showcase my skills as a front-end developer or web designer.',
    link: 'https://oz-studios.netlify.com/'
  },
  {
    name: 'fse-rec',
    description: 'The FSE-REC is an asp.net web app built by me and and 3 other friends as my second year work based learning project for the University. It includes functionality ranging from a SQL database, dynamic routing, login integration.',
    link: 'https://codepen.io/kennymark/full/GmeGoa'
  },
  {
    name: 'simple card design',
    description: 'A showcase of my skills to reproduce pixel by pixel a projuct after it has been designed by a designer using normal front-end technologies.',
    link: 'https://codepen.io/kennymark/full/LGxpNz/'
  },
  {
    name: 'JS KeyCode Finder',
    description: 'The JS key code finder is a simple tool that detect which key has been pressed and then gives you its key code number. ',
    link: 'https://keycodefinder.netlify.com/.'
  }
]

export { mainProjects, extraProjects, topProjects }