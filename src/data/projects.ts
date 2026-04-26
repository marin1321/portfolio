/**
 * Featured project data — bilingual EN/ES.
 *
 * To add a new project: append an object to the `projects` array.
 * Work.astro renders every project in the list automatically.
 */

import type { Lang } from "./i18n";

export type ProjectType = "production" | "client";

export interface ProjectContent {
  title: string;
  description: string;
  highlight: string;
}

export interface Project {
  /** Stable identifier used for keys and anchors. */
  id: string;
  type: ProjectType;
  /** Company where the project was built. */
  company: string;
  /** Technology tags (same in EN/ES — not localized). */
  tags: readonly string[];
  /** Textual content per language. */
  content: Record<Lang, ProjectContent>;
}

export const projects: readonly Project[] = [
  {
    id: "conversational-ai-agent",
    type: "production",
    company: "DailyBot",
    tags: [
      "Python",
      "Django",
      "Celery",
      "OpenAI",
      "Claude",
      "MCP",
      "LangGraph",
      "AWS",
    ],
    content: {
      en: {
        title: "Conversational AI Agent",
        description:
          "Designed and implemented an async conversational agent with tool-calling, MCP integration, and anti-hallucination guards. The HTTP endpoint returns 202 immediately while a Celery task resolves the agent plan and delivers results through a side channel.",
        highlight:
          "Solved race conditions in async closures, exponential backoff on MCP server connections, and hallucination guards that prevent raw JSON or stub tool results from reaching the user.",
      },
      es: {
        title: "Agente de IA conversacional",
        description:
          "Diseñé e implementé un agente conversacional asíncrono con tool-calling, integración MCP y guards anti-alucinación. El endpoint HTTP responde 202 de inmediato mientras una tarea Celery resuelve el plan del agente y entrega el resultado por un canal lateral.",
        highlight:
          "Resolví race conditions en closures async, agregué exponential backoff en conexiones MCP y construí guards que evitan que JSON crudo o resultados stub lleguen al usuario.",
      },
    },
  },
  {
    id: "integration-resilience",
    type: "production",
    company: "DailyBot",
    tags: [
      "Python",
      "Django",
      "OAuth2",
      "Webhooks",
      "Redis",
      "Vue 3",
      "GraphQL",
      "REST",
    ],
    content: {
      en: {
        title: "Integration Resilience — Linear & Jira",
        description:
          "Built the complete OAuth2 refresh flow for Linear, webhook deduplication, soft-disable on token failure for Jira, and a three-state connection detection system visible in the UI. Worked across backend (Django), frontend (Vue 3), and bot layer (Lambda).",
        highlight:
          "Fixed an O(n²) webhook cleanup bottleneck and resolved a Redis OOM production incident by enforcing explicit TTLs and version-stamp cache invalidation.",
      },
      es: {
        title: "Resiliencia de integraciones — Linear y Jira",
        description:
          "Construí el flujo completo de OAuth2 refresh para Linear, deduplicación de webhooks, soft-disable ante fallo de token en Jira y un sistema de detección de tres estados de conexión visible en la UI. Trabajé en backend (Django), frontend (Vue 3) y capa del bot (Lambda).",
        highlight:
          "Corregí un cuello de botella O(n²) en limpieza de webhooks y resolví un incidente OOM en Redis en producción con TTLs explícitos e invalidación por version-stamp.",
      },
    },
  },
  {
    id: "multi-platform-bot",
    type: "production",
    company: "DailyBot",
    tags: [
      "TypeScript",
      "AWS Lambda",
      "DynamoDB",
      "SNS",
      "Serverless Framework",
      "Node.js",
    ],
    content: {
      en: {
        title: "Multi-platform Bot — Discord, Teams, Slack",
        description:
          "Implemented native Discord modal V2 components, MS Teams Adaptive Cards with full localization, and end-to-end kudos cards across 6 chat platforms (Slack, Teams, Discord, Google Chat, Telegram, Alexa). All features shipped in EN/ES/PT.",
        highlight:
          "Enforced Discord's 5-component limit, handled modal value arrays, and built a full AdaptiveCardService for Teams onboarding with analytics tracking.",
      },
      es: {
        title: "Bot multi-plataforma — Discord, Teams, Slack",
        description:
          "Implementé modales nativos V2 de Discord, Adaptive Cards de MS Teams con localización completa, y tarjetas de kudos de punta a punta en 6 plataformas de chat (Slack, Teams, Discord, Google Chat, Telegram, Alexa). Todo en EN/ES/PT.",
        highlight:
          "Apliqué el límite de 5 componentes de Discord, manejé arrays de valores en modales y construí un AdaptiveCardService completo para el onboarding de Teams con tracking analítico.",
      },
    },
  },
  {
    id: "shopify-custom-development",
    type: "client",
    company: "OffBeat.Lab",
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
        title: "Shopify Custom Development",
        description:
          "Built custom Liquid components and Shopify API integrations for clients including Rubyrose, Café Quindío, and Media Maratón Quindío. Went beyond templates by creating components from the base theme, extending storefronts with Node.js services, and automating workflows with Make. Led a full-code project on Angular + Directus + Azure.",
        highlight:
          "First team member to work directly with Shopify's base theme code, enabling custom client solutions beyond off-the-shelf templates.",
      },
      es: {
        title: "Desarrollo Shopify a medida",
        description:
          "Desarrollé componentes Liquid a medida e integraciones con la API de Shopify para clientes como Rubyrose, Café Quindío y Media Maratón Quindío. Fui más allá de las plantillas creando componentes desde el tema base, extendiendo tiendas con servicios en Node.js y automatizando flujos con Make. Lideré un proyecto full-code en Angular + Directus + Azure.",
        highlight:
          "Primer miembro del equipo en trabajar directamente con el código base del tema de Shopify, habilitando soluciones a medida más allá de las plantillas estándar.",
      },
    },
  },
];
