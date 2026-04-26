/**
 * Professional experience — bilingual EN/ES.
 *
 * The array is sorted in reverse chronological order (newest first).
 * Experience.astro renders entries in the order declared here.
 */

import type { Lang } from "./i18n";

export interface ExperienceContent {
  role: string;
  description: string;
  /** Period text — already localized (includes "Present"/"Presente"). */
  period: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  /** True when the role is ongoing — used to highlight it in the UI. */
  current: boolean;
  /** Technology tags shared across languages. */
  tags: readonly string[];
  content: Record<Lang, ExperienceContent>;
}

export const experience: readonly ExperienceEntry[] = [
  {
    id: "dailybot",
    company: "DailyBot",
    current: true,
    tags: [
      "Python",
      "Vue 3",
      "TypeScript",
      "AWS",
      "Django",
      "Celery",
      "OpenAI",
    ],
    content: {
      en: {
        role: "Full Stack Developer",
        period: "November 2024 — Present",
        description:
          "Backend (Django + Celery), frontend (Vue 3), and serverless bot layer (AWS Lambda + TypeScript). Top-15 contributor across 3 core repositories (~1,200+ commits). Built AI agents, integration resilience systems, multi-platform bots, and billing infrastructure.",
      },
      es: {
        role: "Full Stack Developer",
        period: "Noviembre 2024 — Presente",
        description:
          "Backend (Django + Celery), frontend (Vue 3) y capa serverless del bot (AWS Lambda + TypeScript). Top-15 contributor en 3 repositorios principales (~1,200+ commits). Construí agentes de IA, sistemas de resiliencia de integraciones, bots multi-plataforma e infraestructura de billing.",
      },
    },
  },
  {
    id: "offbeat-lab",
    company: "OffBeat.Lab",
    current: false,
    tags: [
      "Shopify",
      "Liquid",
      "Node.js",
      "Angular",
      "Directus",
      "Azure",
      "Make",
    ],
    content: {
      en: {
        role: "Full Stack Developer",
        period: "October 2023 — November 2024",
        description:
          "Custom Shopify development for multiple clients. Built Liquid components, extended storefronts with Shopify API + Node.js, and automated workflows with Make. Led a full-code project built on Angular, Directus, and Azure.",
      },
      es: {
        role: "Full Stack Developer",
        period: "Octubre 2023 — Noviembre 2024",
        description:
          "Desarrollo Shopify a medida para múltiples clientes. Creé componentes en Liquid, extendí tiendas con Shopify API + Node.js y automaticé flujos con Make. Lideré un proyecto full-code en Angular, Directus y Azure.",
      },
    },
  },
  {
    id: "heinsohn",
    company: "Heinsohn Business Technology",
    current: false,
    tags: ["Git", "GitLab", "Version control"],
    content: {
      en: {
        role: "Programmer",
        period: "July 2022 — October 2023",
        description:
          "Version control management for an enterprise software team working in Delphi. Migrated the entire codebase from Visual SourceSafe to GitLab and trained the team on Git workflows — modernizing the development process from the ground up.",
      },
      es: {
        role: "Programador",
        period: "Julio 2022 — Octubre 2023",
        description:
          "Gestión de control de versiones para un equipo de software empresarial en Delphi. Migré toda la base de código de Visual SourceSafe a GitLab y capacité al equipo en flujos de trabajo con Git — modernizando el proceso de desarrollo desde cero.",
      },
    },
  },
];
