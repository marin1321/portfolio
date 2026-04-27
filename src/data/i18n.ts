/**
 * Centralized dictionary of UI strings in EN / ES.
 *
 * Principle: every visible piece of text on the site lives here or in
 * `projects.ts` / `experience.ts`. Updating the portfolio is done by
 * editing those files only — components stay untouched.
 */

export type Lang = "en" | "es";

export const LANGS = ["en", "es"] as const satisfies readonly Lang[];
export const DEFAULT_LANG: Lang = "en";

export interface NavStrings {
  about: string;
  work: string;
  experience: string;
  contact: string;
  langToggleLabel: string;
  menuOpen: string;
  menuClose: string;
  /** Accessible labels for the theme toggle. `toLight` / `toDark`
   *  describe the *destination* state, mirroring `langToggleLabel`. */
  themeToggleToLight: string;
  themeToggleToDark: string;
}

export interface HeroStat {
  /** Numeric value — same in EN/ES (e.g. "4+", "12"). */
  number: string;
  /** Localized label rendered next to the number. */
  label: string;
}

export interface HeroStrings {
  availability: string;
  headline: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  cvFile: string;
  stats: ReadonlyArray<HeroStat>;
}

export interface AboutStrings {
  eyebrow: string;
  heading: string;
  bio: string;
  stackHeading: string;
  educationHeading: string;
  educationCurrent: {
    institution: string;
    degree: string;
    period: string;
  };
  educationPrevious: {
    institution: string;
    degree: string;
    period: string;
  };
}

export interface WorkStrings {
  eyebrow: string;
  heading: string;
  description: string;
  badgeProduction: string;
  badgeClient: string;
  highlightLabel: string;
  companyLabel: string;
  /** Labels for the project filter tabs and its accessible name. */
  filters: {
    label: string;
    all: string;
    production: string;
    client: string;
    countSuffix: string;
  };
  /** Strings for the project detail modal (RF-10). */
  dialog: {
    /** Card-level button that opens the modal. */
    open: string;
    /** Accessible label for the close (×) button inside the modal. */
    close: string;
    /** Section heading for the bullet list of outcomes/decisions. */
    outcomes: string;
    /** Section heading for the tech stack list inside the modal. */
    stack: string;
  };
}

export interface ExperienceStrings {
  eyebrow: string;
  heading: string;
  description: string;
  presentLabel: string;
}

export interface ContactStrings {
  eyebrow: string;
  heading: string;
  description: string;
  emailLabel: string;
  linkedinLabel: string;
  githubLabel: string;
  locationLabel: string;
  locationValue: string;
  /** Copy for the Formspree-backed contact form (RF-11). When the
   *  endpoint isn't configured the form still renders, but submits
   *  fall through to a `mailto:` link instead. */
  form: {
    heading: string;
    intro: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    /** Auto-filled subject line on outbound submissions. */
    subject: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successBody: string;
    successReset: string;
    errorRequired: string;
    errorEmail: string;
    errorGeneric: string;
    errorOffline: string;
    /** Heading for the alternate-contact card grid below the form. */
    alternateHeading: string;
    privacy: string;
  };
}

export interface FooterStrings {
  builtWith: string;
}

export interface MetaStrings {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
}

export interface UIStrings {
  meta: MetaStrings;
  nav: NavStrings;
  hero: HeroStrings;
  about: AboutStrings;
  work: WorkStrings;
  experience: ExperienceStrings;
  contact: ContactStrings;
  footer: FooterStrings;
}

const en: UIStrings = {
  meta: {
    title: "Oscar Marín — Full Stack Engineer",
    description:
      "Full Stack Engineer with 4+ years shipping production software — conversational AI agents, multi-platform bots, Shopify integrations and AWS cloud infrastructure. Currently at DailyBot.",
    ogTitle: "Oscar Marín — Full Stack Engineer",
    ogDescription:
      "Building systems that scale. Backend, frontend, cloud, AI agents and integrations — currently at DailyBot.",
  },
  nav: {
    about: "About",
    work: "Work",
    experience: "Experience",
    contact: "Contact",
    langToggleLabel: "Switch language: EN · ES",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    themeToggleToLight: "Switch to light theme",
    themeToggleToDark: "Switch to dark theme",
  },
  hero: {
    availability: "Available for new opportunities",
    headline: "Full Stack Engineer building systems that scale.",
    subtitle:
      "4+ years shipping production software — from conversational AI agents and multi-platform bots to Shopify integrations and cloud infrastructure on AWS. Currently at DailyBot.",
    ctaPrimary: "View my work",
    ctaSecondary: "Download CV",
    cvFile: "/cv-oscar-marin-en.pdf",
    stats: [
      { number: "4+", label: "Years in production" },
      { number: "3", label: "Tech companies" },
      { number: "6", label: "Chat platforms integrated" },
    ],
  },
  about: {
    eyebrow: "About",
    heading: "End-to-end engineer with a backend-first mindset.",
    bio: "Full stack engineer focused on backend systems, cloud infrastructure, and real-world integrations. I work full-time at DailyBot — a global SaaS product — while pursuing my Systems Engineering degree at Universidad del Quindío. I enjoy building end-to-end: from the database to the UI to the bot message that lands in your Slack.",
    stackHeading: "Stack",
    educationHeading: "Education",
    educationCurrent: {
      institution: "Universidad del Quindío",
      degree: "Systems & Computing Engineering",
      period: "2023 — Present",
    },
    educationPrevious: {
      institution: "SENA",
      degree: "Software Analysis & Development (Tech.)",
      period: "2022",
    },
  },
  work: {
    eyebrow: "Work",
    heading: "Selected projects from production codebases.",
    description:
      "A few real systems I designed, shipped and operate today. Each one solved a concrete problem — not a demo.",
    badgeProduction: "Production",
    badgeClient: "Client work",
    highlightLabel: "Highlight",
    companyLabel: "Company",
    filters: {
      label: "Filter projects",
      all: "All",
      production: "Production",
      client: "Client work",
      countSuffix: "shown",
    },
    dialog: {
      open: "View details",
      close: "Close details",
      outcomes: "Key outcomes",
      stack: "Tech stack",
    },
  },
  experience: {
    eyebrow: "Experience",
    heading: "Three companies, four years, one through-line: shipping.",
    description:
      "From version control modernization to AI agents in production — a chronological view of where I've contributed.",
    presentLabel: "Present",
  },
  contact: {
    eyebrow: "Contact",
    heading: "Open to remote opportunities worldwide. Let's talk.",
    description:
      "If you're hiring, collaborating on something interesting, or just want to chat about systems and integrations — drop me a line.",
    emailLabel: "Email",
    linkedinLabel: "LinkedIn",
    githubLabel: "GitHub",
    locationLabel: "Location",
    locationValue: "Colombia — Remote friendly",
    form: {
      heading: "Send a message",
      intro:
        "Tell me a bit about your project, role, or idea — I usually reply within 24 hours.",
      nameLabel: "Name",
      namePlaceholder: "Jane Doe",
      emailLabel: "Email",
      emailPlaceholder: "jane@company.com",
      messageLabel: "Message",
      messagePlaceholder: "What are you working on?",
      subject: "New contact from oscarmarin.dev",
      submit: "Send message",
      submitting: "Sending…",
      successTitle: "Message sent.",
      successBody:
        "Thanks for reaching out — I'll get back to you within 24 hours.",
      successReset: "Send another message",
      errorRequired: "This field is required.",
      errorEmail: "Enter a valid email address.",
      errorGeneric:
        "Something went wrong sending the form. Please try again or email me directly.",
      errorOffline:
        "Looks like you're offline. Please try again once you're back online.",
      alternateHeading: "Or reach me directly",
      privacy:
        "Your details only land in my inbox — no marketing, no third parties.",
    },
  },
  footer: {
    builtWith: "Built with Astro & Tailwind CSS",
  },
};

const es: UIStrings = {
  meta: {
    title: "Oscar Marín — Ingeniero Full Stack",
    description:
      "Ingeniero Full Stack con 4+ años entregando software en producción — agentes de IA conversacionales, bots multi-plataforma, integraciones Shopify e infraestructura cloud en AWS. Actualmente en DailyBot.",
    ogTitle: "Oscar Marín — Ingeniero Full Stack",
    ogDescription:
      "Construyendo sistemas que escalan. Backend, frontend, cloud, agentes de IA e integraciones — actualmente en DailyBot.",
  },
  nav: {
    about: "Sobre mí",
    work: "Proyectos",
    experience: "Experiencia",
    contact: "Contacto",
    langToggleLabel: "Cambiar idioma: EN · ES",
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
    themeToggleToLight: "Cambiar a tema claro",
    themeToggleToDark: "Cambiar a tema oscuro",
  },
  hero: {
    availability: "Disponible para nuevas oportunidades",
    headline: "Ingeniero Full Stack construyendo sistemas que escalan.",
    subtitle:
      "4+ años entregando software en producción — desde agentes de IA conversacionales y bots multi-plataforma hasta integraciones Shopify e infraestructura en AWS. Actualmente en DailyBot.",
    ctaPrimary: "Ver mi trabajo",
    ctaSecondary: "Descargar CV",
    cvFile: "/cv-oscar-marin-es.pdf",
    stats: [
      { number: "4+", label: "Años en producción" },
      { number: "3", label: "Empresas tech" },
      { number: "6", label: "Plataformas de chat integradas" },
    ],
  },
  about: {
    eyebrow: "Sobre mí",
    heading: "Ingeniero end-to-end con mentalidad backend-first.",
    bio: "Ingeniero full stack con enfoque en sistemas backend, infraestructura cloud e integraciones reales. Trabajo a tiempo completo en DailyBot — un producto SaaS global — mientras curso Ingeniería en Sistemas en la Universidad del Quindío. Disfruto construir de punta a punta: desde la base de datos hasta la interfaz y el mensaje del bot que llega a tu Slack.",
    stackHeading: "Stack",
    educationHeading: "Educación",
    educationCurrent: {
      institution: "Universidad del Quindío",
      degree: "Ingeniería en Sistemas y Computación",
      period: "2023 — Presente",
    },
    educationPrevious: {
      institution: "SENA",
      degree: "Análisis y Desarrollo de Software (Tecnólogo)",
      period: "2022",
    },
  },
  work: {
    eyebrow: "Proyectos",
    heading: "Proyectos seleccionados desde código en producción.",
    description:
      "Algunos sistemas reales que diseñé, lancé y opero hoy. Cada uno resolvió un problema concreto — no un demo.",
    badgeProduction: "Producción",
    badgeClient: "Cliente",
    highlightLabel: "Highlight",
    companyLabel: "Empresa",
    filters: {
      label: "Filtrar proyectos",
      all: "Todos",
      production: "Producción",
      client: "Cliente",
      countSuffix: "visibles",
    },
    dialog: {
      open: "Ver detalles",
      close: "Cerrar detalles",
      outcomes: "Resultados clave",
      stack: "Stack",
    },
  },
  experience: {
    eyebrow: "Experiencia",
    heading: "Tres empresas, cuatro años, una constante: entregar.",
    description:
      "Desde modernizar control de versiones hasta agentes de IA en producción — vista cronológica de dónde he contribuido.",
    presentLabel: "Presente",
  },
  contact: {
    eyebrow: "Contacto",
    heading: "Abierto a oportunidades remotas en todo el mundo. Hablemos.",
    description:
      "Si estás contratando, colaborando en algo interesante o solo quieres charlar sobre sistemas e integraciones — escríbeme.",
    emailLabel: "Email",
    linkedinLabel: "LinkedIn",
    githubLabel: "GitHub",
    locationLabel: "Ubicación",
    locationValue: "Colombia — Remote friendly",
    form: {
      heading: "Envíame un mensaje",
      intro:
        "Cuéntame un poco sobre tu proyecto, vacante o idea — usualmente respondo en menos de 24 horas.",
      nameLabel: "Nombre",
      namePlaceholder: "Juana Pérez",
      emailLabel: "Email",
      emailPlaceholder: "juana@empresa.com",
      messageLabel: "Mensaje",
      messagePlaceholder: "¿En qué estás trabajando?",
      subject: "Nuevo contacto desde oscarmarin.dev",
      submit: "Enviar mensaje",
      submitting: "Enviando…",
      successTitle: "Mensaje enviado.",
      successBody:
        "Gracias por escribir — te respondo en menos de 24 horas.",
      successReset: "Enviar otro mensaje",
      errorRequired: "Este campo es obligatorio.",
      errorEmail: "Ingresa un email válido.",
      errorGeneric:
        "Algo salió mal al enviar el formulario. Intenta de nuevo o escríbeme directamente.",
      errorOffline:
        "Parece que estás offline. Intenta de nuevo cuando vuelvas a tener conexión.",
      alternateHeading: "O escríbeme directamente",
      privacy:
        "Tus datos solo llegan a mi bandeja de entrada — sin marketing, sin terceros.",
    },
  },
  footer: {
    builtWith: "Construido con Astro y Tailwind CSS",
  },
};

export const i18n: Record<Lang, UIStrings> = { en, es };

/**
 * Returns the UI strings for a given language, falling back to the
 * default language when the requested one is missing.
 */
export function getStrings(lang: Lang): UIStrings {
  return i18n[lang] ?? i18n[DEFAULT_LANG];
}

/**
 * Personal information shared across both languages.
 */
export const personal = {
  fullName: "Oscar Humberto Marín Molina",
  shortName: "Oscar Marín",
  email: "marinmolinao@gmail.com",
  linkedin: "https://www.linkedin.com/in/oscar-marin-molina",
  linkedinHandle: "linkedin.com/in/oscar-marin-molina",
  github: "https://github.com/marin1321",
  githubHandle: "github.com/marin1321",
  location: "Calarcá, Quindío, Colombia",
  domain: "https://oscarmarin.dev",
} as const;

/**
 * Copyright line — universal across languages, so it lives outside
 * the bilingual `UIStrings` to avoid duplicating identical strings.
 */
export const formatCopyright = (year: number): string =>
  `© ${year} ${personal.shortName}`;

/**
 * Stack categories — display label per language.
 */
export const stackCategories: Record<
  Lang,
  Record<
    | "backend"
    | "frontend"
    | "cloud"
    | "devops"
    | "ai"
    | "databases"
    | "tools",
    string
  >
> = {
  en: {
    backend: "Backend",
    frontend: "Frontend",
    cloud: "Cloud",
    devops: "DevOps",
    ai: "AI",
    databases: "Databases",
    tools: "Tools",
  },
  es: {
    backend: "Backend",
    frontend: "Frontend",
    cloud: "Cloud",
    devops: "DevOps",
    ai: "IA",
    databases: "Bases de datos",
    tools: "Herramientas",
  },
};

/**
 * Stack grouped by category — technology names only (not localized).
 */
export const stackByCategory: Record<
  keyof (typeof stackCategories)["en"],
  readonly string[]
> = {
  backend: ["Python", "Django", "DRF", "Celery", "Node.js"],
  frontend: ["Vue 3", "React", "Next.js", "Angular"],
  cloud: ["AWS Lambda", "EC2", "S3", "RDS", "DynamoDB", "CloudWatch"],
  devops: ["GitHub Actions", "AWS CodePipeline", "Docker"],
  ai: ["OpenAI GPT-4o", "Claude", "MCP", "LangGraph"],
  databases: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  tools: ["Shopify", "Jira", "Linear", "Directus", "Azure", "Make"],
};
