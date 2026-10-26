// ── Project data ──────────────────────────────────────────────
// Images: importate in App.tsx come asset statici Vite.
// Le seconde immagini placeholder sono segnaposto espliciti:
// sostituirle con screenshot reali del prodotto.

export type ProjectData = {
  num: string;
  type: { it: string; en: string };
  title: string;
  link: string;
  role: { it: string; en: string };
  stack: string[];
  context: { it: string; en: string };
  solution: { it: string; en: string };
  contribution: { it: string; en: string };
  decisions: { it: string[]; en: string[] };
};

export const projects: ProjectData[] = [
  {
    num: '01',
    type: { it: 'Cliente', en: 'Client' },
    title: 'Pannone Rent & Assicurazioni',
    link: 'https://www.pannone-rent-assicurazioni.it/',
    role: {
      it: 'Lead Full-Stack Developer & Project Manager',
      en: 'Lead Full-Stack Developer & Project Manager',
    },
    stack: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Google Maps API'],
    context: {
      it: "L'azienda aveva bisogno di un portale web per presentare i propri servizi di noleggio e assicurazioni, gestire richieste di preventivo e prenotazione, e aggiornare i contenuti in autonomia senza affidarsi a sviluppatori esterni.",
      en: "The company needed a web portal to present their rental and insurance services, handle quote and booking requests, and update content independently without relying on external developers.",
    },
    solution: {
      it: 'Ho realizzato il sito completo e un CMS proprietario che permette al cliente di gestire tutti i contenuti dal pannello amministrativo. Il sistema include flussi email per preventivi e prenotazioni, autenticazione con registrazione dei tentativi di accesso e integrazione di Google Maps.',
      en: 'I built the complete website and a custom CMS that lets the client manage all content from an admin panel. The system includes email flows for quotes and bookings, authentication with access attempt logging, and Google Maps integration.',
    },
    contribution: {
      it: 'Ho gestito lo sviluppo tecnico dall\'architettura al deploy e ho coordinato un team multidisciplinare di quattro professionisti, organizzando workflow, priorità e scadenze. Ho inoltre formato il cliente sull\'utilizzo della piattaforma.',
      en: 'I managed the technical development from architecture to deployment and coordinated a multidisciplinary team of four professionals, organising workflow, priorities and deadlines. I also trained the client on how to use the platform.',
    },
    decisions: {
      it: [
        'CMS proprietario per evitare vincoli di licenza e garantire manutenibilità a lungo termine',
        'Autenticazione con log degli accessi per requisiti di sicurezza del cliente',
        'Flussi email per la gestione delle richieste di preventivo e prenotazione',
        'Struttura PHP modulare per facilitare gli aggiornamenti futuri',
      ],
      en: [
        'Custom CMS to avoid licence constraints and ensure long-term maintainability',
        'Authentication with access logging for client security requirements',
        'Email workflows for handling quote and booking requests',
        'Modular PHP structure to facilitate future updates',
      ],
    },
  },
  {
    num: '02',
    type: { it: 'Cliente', en: 'Client' },
    title: 'Fulmine Intimo & Biancheria',
    link: 'https://www.fulmineintimoebiancheria.it/',
    role: {
      it: 'Full-Stack Developer & responsabile tecnico',
      en: 'Full-Stack Developer & technical lead',
    },
    stack: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    context: {
      it: 'Un negozio di biancheria e intimo aveva bisogno di un sito vetrina con catalogo prodotti gestibile autonomamente. I prodotti presentano varianti per taglie e colori e il cliente necessitava di un sistema semplice per aggiornarli.',
      en: 'A lingerie and homewear shop needed a showcase website with a self-manageable product catalogue. Products come in size and colour variants and the client needed a simple system to update them.',
    },
    solution: {
      it: 'Ho sviluppato il sito con un CMS proprietario che include un sistema di gestione prodotti con varianti taglia/colore tramite foreign key. Il backend converte automaticamente le immagini caricate in formato WebP per ottimizzare i tempi di caricamento.',
      en: 'I built the site with a custom CMS that includes a product management system with size/colour variants using foreign keys. The backend automatically converts uploaded images to WebP format to optimise load times.',
    },
    contribution: {
      it: 'Ho progettato il database relazionale, implementato il CMS e sviluppato il frontend responsive. Ho curato SEO tecnica e ho tenuto in considerazione i requisiti GDPR dichiarati per il progetto.',
      en: 'I designed the relational database, implemented the CMS and developed the responsive frontend. I handled technical SEO and took into account the GDPR requirements declared for the project.',
    },
    decisions: {
      it: [
        'Modello relazionale con foreign key per gestire la combinatoria taglia/colore senza ridondanza dei dati',
        'Conversione WebP server-side per non richiedere competenze tecniche al cliente durante l\'upload',
        'CMS proprietario per garantire indipendenza operativa al negozio',
        'Autenticazione con monitoraggio degli accessi per proteggere il pannello amministrativo',
      ],
      en: [
        'Relational model with foreign keys to handle size/colour combinations without data redundancy',
        'Server-side WebP conversion so the client needs no technical knowledge when uploading',
        'Custom CMS to guarantee operational independence for the shop',
        'Authentication with access monitoring to protect the admin panel',
      ],
    },
  },
  {
    num: '03',
    type: { it: 'Cliente', en: 'Client' },
    title: 'Matteo Di Giovanni — Portfolio',
    link: 'https://www.matteodigiov.com/',
    role: {
      it: 'Full-Stack Developer & responsabile tecnico',
      en: 'Full-Stack Developer & technical lead',
    },
    stack: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    context: {
      it: 'Il cliente, responsabile della progettazione grafica, aveva bisogno di uno sviluppatore che traducesse i suoi mockup in un sito web funzionante e gestisse dinamicamente i progetti tramite database.',
      en: 'The client, who handled the graphic design, needed a developer to translate their mockups into a working website and manage projects dynamically via a database.',
    },
    solution: {
      it: 'Ho implementato il sito partendo dai mockup del cliente, personalizzando le funzionalità di un template strutturale e sviluppando la gestione dinamica dei progetti tramite MySQL. Ho ottimizzato gli asset multimediali e curato la responsività e la fedeltà grafica al design originale.',
      en: 'I implemented the site from the client\'s mockups, customising the functionality of a structural template and developing dynamic project management via MySQL. I optimised media assets and ensured responsiveness and visual fidelity to the original design.',
    },
    contribution: {
      it: 'Il design originale è del cliente. Il mio contributo è stata la realizzazione tecnica completa: traduzione dei mockup in codice, personalizzazione della piattaforma, gestione dinamica dei contenuti e ottimizzazione finale.',
      en: 'The original design is the client\'s. My contribution was the complete technical implementation: translating mockups into code, customising the platform, dynamic content management and final optimisation.',
    },
    decisions: {
      it: [
        'Gestione dei progetti via database per permettere aggiornamenti senza modificare il codice',
        'Ottimizzazione degli asset multimediali per ridurre il peso della pagina',
        'Fedeltà ai mockup grafici come requisito principale del cliente',
      ],
      en: [
        'Database-driven project management to allow updates without touching the code',
        'Media asset optimisation to reduce page weight',
        'Visual fidelity to the client\'s mockups as the primary requirement',
      ],
    },
  },
];
