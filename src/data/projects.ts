/**
 * Featured project data — bilingual EN/ES.
 *
 * To add a new project: append an object to the `projects` array.
 * Work.astro renders every project in the list automatically.
 *
 * `details` and `outcomes` are optional and feed the project detail
 * modal (RF-10). When present they show up in the expanded view; when
 * absent the modal just falls back to the card content rendered in a
 * larger layout.
 */

import type { Lang } from "./i18n";

export type ProjectType = "production" | "client" | "open-source";

export interface ProjectContent {
  title: string;
  description: string;
  highlight: string;
  /** Optional deeper-dive paragraph rendered in the modal under
   *  the description. Use it for architecture, scope, or scale. */
  details?: string;
  /** Optional list of concrete outcomes / decisions / metrics shown
   *  as bullet points in the modal. Each entry is a single sentence. */
  outcomes?: readonly string[];
}

/** Optional set of public resources for a project. Currently used by
 *  open-source cards to surface npm, docs and source links directly
 *  on the card without requiring the visitor to open the modal. URLs
 *  are language-agnostic so they live on the Project itself, not on
 *  ProjectContent. Any subset is valid — the renderer skips missing
 *  keys. */
export interface ProjectLinks {
  github?: string;
  npm?: string;
  docs?: string;
  /** Reserved for future hosted demos / playgrounds. */
  demo?: string;
}

export interface Project {
  /** Stable identifier used for keys and anchors. */
  id: string;
  type: ProjectType;
  /** Company where the project was built. For self-published projects
   *  the field can hold the publishing namespace (e.g. "npm"). */
  company: string;
  /** Technology tags (same in EN/ES — not localized). */
  tags: readonly string[];
  /** Optional external resources surfaced on the card. */
  links?: ProjectLinks;
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
        details:
          "The agent runs on a 202-Accepted contract: the HTTP request returns immediately with a job handle and a Celery worker resolves the LLM plan, calls tools, and pushes the answer through the bot's existing message channel. That decoupling lets long-running tool chains (CRM lookups, MCP server roundtrips) finish without holding an HTTP socket open. A unified abstraction sits in front of OpenAI GPT-4o and Anthropic Claude so swapping providers is a config change.",
        outcomes: [
          "Designed a 202-Accepted contract that decouples agent latency from request lifetime, freeing the HTTP layer for long tool chains.",
          "Built guard rails that detect raw JSON, stub tool results, and hallucinated function calls before they ever reach the user.",
          "Implemented exponential backoff with jitter on MCP server reconnects to absorb transient failures without surfacing them in the chat.",
          "Resolved race conditions in async closures shared across Celery worker contexts that produced intermittent state corruption.",
          "Unified GPT-4o and Claude behind a single tool-calling interface so the runtime model is a configuration choice, not a rewrite.",
        ],
      },
      es: {
        title: "Agente de IA conversacional",
        description:
          "Diseñé e implementé un agente conversacional asíncrono con tool-calling, integración MCP y guards anti-alucinación. El endpoint HTTP responde 202 de inmediato mientras una tarea Celery resuelve el plan del agente y entrega el resultado por un canal lateral.",
        highlight:
          "Resolví race conditions en closures async, agregué exponential backoff en conexiones MCP y construí guards que evitan que JSON crudo o resultados stub lleguen al usuario.",
        details:
          "El agente corre sobre un contrato 202-Accepted: la petición HTTP responde de inmediato con un handle del job y un worker Celery resuelve el plan del LLM, llama herramientas y empuja la respuesta por el canal de mensajes del bot. Ese desacople permite que cadenas largas de tool-calling (consultas a CRM, roundtrips a servidores MCP) terminen sin mantener un socket HTTP abierto. Una abstracción unificada sobre OpenAI GPT-4o y Anthropic Claude hace que cambiar de proveedor sea cuestión de configuración.",
        outcomes: [
          "Diseñé un contrato 202-Accepted que desacopla la latencia del agente del ciclo de vida de la petición y libera la capa HTTP para tool chains largos.",
          "Construí guards que detectan JSON crudo, resultados stub de herramientas y llamadas alucinadas antes de que lleguen al usuario.",
          "Implementé exponential backoff con jitter en los reconectes a servidores MCP para absorber fallas transitorias sin exponerlas en el chat.",
          "Resolví race conditions en closures async compartidos entre contextos de workers Celery que generaban corrupción intermitente de estado.",
          "Unifiqué GPT-4o y Claude detrás de una sola interfaz de tool-calling: el modelo de runtime es una decisión de configuración, no un rewrite.",
        ],
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
        details:
          "Integrations like Linear and Jira fail in subtle ways — expired tokens, replayed webhooks, partial outages on the vendor side. The work spanned the full stack: a Django backend with token rotation, a Vue 3 panel that surfaces connection health in three states (connected, degraded, disconnected), and a Lambda bot layer that consumes the same events. The Redis cache layer was rebuilt around version-stamped keys so a single SET invalidates everything stale instead of scanning thousands of entries.",
        outcomes: [
          "Shipped the full OAuth2 refresh and rotation flow for Linear's GraphQL API, including retry-on-401 and rotation-on-403.",
          "Designed a webhook deduplication layer in Redis that survives replay attacks and out-of-order delivery from both vendors.",
          "Implemented a soft-disable pattern for Jira: on token failure the integration stays connected but pauses syncs and surfaces the state in the UI.",
          "Replaced an O(n²) webhook cleanup that was timing out for orgs with 10K+ tickets with a single indexed query.",
          "Resolved a Redis OOM production incident by enforcing explicit TTLs everywhere and switching invalidation to version-stamped keys.",
          "Brought a three-state connection detector (connected / degraded / disconnected) into the Vue 3 panel so customers can self-diagnose without a support ticket.",
        ],
      },
      es: {
        title: "Resiliencia de integraciones — Linear y Jira",
        description:
          "Construí el flujo completo de OAuth2 refresh para Linear, deduplicación de webhooks, soft-disable ante fallo de token en Jira y un sistema de detección de tres estados de conexión visible en la UI. Trabajé en backend (Django), frontend (Vue 3) y capa del bot (Lambda).",
        highlight:
          "Corregí un cuello de botella O(n²) en limpieza de webhooks y resolví un incidente OOM en Redis en producción con TTLs explícitos e invalidación por version-stamp.",
        details:
          "Integraciones como Linear y Jira fallan de formas sutiles — tokens expirados, webhooks duplicados, caídas parciales del proveedor. El trabajo abarcó toda la pila: un backend en Django con rotación de tokens, un panel Vue 3 que muestra la salud de la conexión en tres estados (conectado, degradado, desconectado) y una capa de bot en Lambda que consume los mismos eventos. La capa de cache en Redis se reconstruyó alrededor de claves con version-stamp: un solo SET invalida todo lo viejo en vez de escanear miles de entradas.",
        outcomes: [
          "Entregué el flujo completo de OAuth2 refresh y rotación para la API GraphQL de Linear, con retry-on-401 y rotación-on-403.",
          "Diseñé una capa de deduplicación de webhooks en Redis que sobrevive a replays y entregas fuera de orden de ambos proveedores.",
          "Implementé un patrón de soft-disable para Jira: ante fallo de token la integración queda conectada pero pausa los syncs y muestra el estado en la UI.",
          "Reemplacé una limpieza de webhooks O(n²) que hacía timeout en orgs con 10K+ tickets por una única consulta indexada.",
          "Resolví un incidente OOM en Redis en producción aplicando TTLs explícitos y migrando la invalidación a claves con version-stamp.",
          "Llevé el detector de conexión en tres estados (conectado / degradado / desconectado) al panel Vue 3 para que el cliente se diagnostique sin abrir ticket.",
        ],
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
        details:
          "Six chat platforms, three languages, one shared business logic core. Each platform exposes a different rendering primitive (Discord modals V2, Teams Adaptive Cards, Slack Block Kit, Google Chat cards) so the bot speaks each one natively while the underlying domain stays unified. The whole stack runs serverless on AWS Lambda with DynamoDB for state and SNS for fan-out, so a single business event produces six platform-specific renders without coupling them.",
        outcomes: [
          "Implemented native Discord modal V2 with full multi-value support and the platform's strict 5-component constraint.",
          "Built MS Teams Adaptive Cards localized to EN/ES/PT and an AdaptiveCardService that powers onboarding with built-in analytics.",
          "Shipped end-to-end kudos cards on 6 chat platforms (Slack, Teams, Discord, Google Chat, Telegram, Alexa) with platform-specific UI primitives.",
          "Designed an SNS fan-out so a single business event renders six platform-specific payloads without coupling the senders.",
          "Kept the deployable shape under the Lambda cold-start budget by trimming the Serverless Framework package per function.",
        ],
      },
      es: {
        title: "Bot multi-plataforma — Discord, Teams, Slack",
        description:
          "Implementé modales nativos V2 de Discord, Adaptive Cards de MS Teams con localización completa, y tarjetas de kudos de punta a punta en 6 plataformas de chat (Slack, Teams, Discord, Google Chat, Telegram, Alexa). Todo en EN/ES/PT.",
        highlight:
          "Apliqué el límite de 5 componentes de Discord, manejé arrays de valores en modales y construí un AdaptiveCardService completo para el onboarding de Teams con tracking analítico.",
        details:
          "Seis plataformas de chat, tres idiomas, un mismo núcleo de lógica de negocio. Cada plataforma expone una primitiva de render diferente (modales V2 de Discord, Adaptive Cards de Teams, Block Kit de Slack, cards de Google Chat) y el bot habla cada una de forma nativa mientras el dominio subyacente queda unificado. Todo el stack corre serverless sobre AWS Lambda con DynamoDB para estado y SNS para fan-out, así que un solo evento de negocio produce seis renders distintos sin acoplarlos.",
        outcomes: [
          "Implementé modales V2 nativos de Discord con soporte completo de multi-value y el límite estricto de 5 componentes de la plataforma.",
          "Construí Adaptive Cards de MS Teams localizadas en EN/ES/PT y un AdaptiveCardService que potencia el onboarding con analítica integrada.",
          "Entregué kudos cards de punta a punta en 6 plataformas (Slack, Teams, Discord, Google Chat, Telegram, Alexa) usando las primitivas de UI de cada una.",
          "Diseñé un fan-out por SNS para que un solo evento de negocio rinda seis payloads sin acoplar a los emisores.",
          "Mantuve el bundle deployable dentro del presupuesto de cold-start de Lambda recortando el package de Serverless Framework por función.",
        ],
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
        details:
          "Most Shopify agencies stop at the visual editor. Here the brief was the opposite — clients with operations that templates couldn't model: custom checkout flows, third-party stock sync, on-the-fly bilingual catalogs. The work spanned Liquid at the theme level, Node.js services that extended the Storefront API, and Make scenarios that wired Shopify into clients' fulfillment software. The Media Maratón Quindío project was a full-code build (Angular SPA + Directus headless CMS + Azure) shipped end-to-end.",
        outcomes: [
          "First on the team to work directly with Shopify's base theme source — opened the door to client work that templates could not deliver.",
          "Built custom Liquid components for Rubyrose, Café Quindío and other clients, each tied to specific operational needs.",
          "Extended storefronts with Node.js services on top of the Shopify API where the platform's primitives were not enough.",
          "Automated client workflows with Make (Integromat) so order events flowed into accounting, inventory, and fulfillment without manual relays.",
          "Led the Media Maratón Quindío project end-to-end on Angular + Directus + Azure: data model, frontend, headless CMS, and deploy.",
        ],
      },
      es: {
        title: "Desarrollo Shopify a medida",
        description:
          "Desarrollé componentes Liquid a medida e integraciones con la API de Shopify para clientes como Rubyrose, Café Quindío y Media Maratón Quindío. Fui más allá de las plantillas creando componentes desde el tema base, extendiendo tiendas con servicios en Node.js y automatizando flujos con Make. Lideré un proyecto full-code en Angular + Directus + Azure.",
        highlight:
          "Primer miembro del equipo en trabajar directamente con el código base del tema de Shopify, habilitando soluciones a medida más allá de las plantillas estándar.",
        details:
          "La mayoría de agencias Shopify se quedan en el editor visual. Aquí el brief era el opuesto — clientes con operaciones que las plantillas no podían modelar: checkouts a medida, sync de stock con terceros, catálogos bilingües al vuelo. El trabajo abarcó Liquid a nivel de tema, servicios Node.js que extendían la Storefront API y escenarios en Make que conectaban Shopify con el software de fulfillment de los clientes. El proyecto Media Maratón Quindío fue un build full-code (SPA Angular + CMS headless Directus + Azure) entregado end-to-end.",
        outcomes: [
          "Primero del equipo en trabajar directamente con el código base del tema de Shopify — abrió la puerta a trabajos que las plantillas no podían cubrir.",
          "Construí componentes Liquid a medida para Rubyrose, Café Quindío y otros clientes, cada uno atado a una necesidad operacional concreta.",
          "Extendí tiendas con servicios Node.js sobre la API de Shopify donde las primitivas de la plataforma se quedaban cortas.",
          "Automaticé flujos de clientes con Make (Integromat) para que los eventos de orden fluyeran a contabilidad, inventario y fulfillment sin relevos manuales.",
          "Lideré el proyecto Media Maratón Quindío de punta a punta sobre Angular + Directus + Azure: modelo de datos, frontend, CMS headless y deploy.",
        ],
      },
    },
  },
  {
    id: "mcp-devtools",
    type: "open-source",
    company: "npm",
    tags: [
      "TypeScript",
      "Node.js",
      "MCP",
      "npm",
      "Open Source",
      "VitePress",
    ],
    links: {
      npm: "https://www.npmjs.com/package/@oscarmarin/mcp-devtools",
      docs: "https://mcp-devtools.oscarmarindev.com",
      github: "https://github.com/marin1321/mcp-devtools",
    },
    content: {
      en: {
        title: "mcp-devtools — AI Developer Toolbox",
        description:
          "Published npm package that gives AI agents safe access to the local dev environment via MCP: filesystem, databases, processes, and OpenAPI specs. Used by Claude Desktop, Cursor, and any MCP-compatible agent.",
        highlight:
          "Designed from production MCP patterns at DailyBot: version-stamp cache invalidation, exponential backoff on reconnects, and an anti-hallucination layer that blocks stub results from reaching the user.",
        details:
          "mcp-devtools is the open-source distillation of the MCP integration patterns I built and operate at DailyBot. It exposes a curated, security-first surface so an AI agent can read files, run queries, spawn processes and call OpenAPI services without ever stepping outside the boundaries the developer authorises. Every tool runs through scope checks and a sandbox; the database tools default to read-only mode; the process tool consults an explicit allowlist before exec; and the HTTP transport requires Bearer auth so the same package powers local IDE use and remote / containerised deployments under one model.",
        outcomes: [
          "Published on npm as @oscarmarin/mcp-devtools — installable with npx @oscarmarin/mcp-devtools.",
          "14 tools across 4 groups: filesystem, database, process, and OpenAPI — all scope-checked and sandboxed.",
          "Security-first design: scope boundary enforcement, command allowlist, read-only DB mode, HTTP Bearer auth.",
          "Two transports: stdio for local use, HTTP with auth for remote and containerised deployments.",
          "Plugin API that lets users register custom tools without forking the package.",
          "Full documentation site at mcp-devtools.oscarmarindev.com built with VitePress.",
        ],
      },
      es: {
        title: "mcp-devtools — Caja de herramientas para IA",
        description:
          "Paquete npm publicado que da a los agentes de IA acceso seguro al entorno de desarrollo local vía MCP: filesystem, bases de datos, procesos y specs OpenAPI. Compatible con Claude Desktop, Cursor y cualquier agente MCP.",
        highlight:
          "Diseñado desde patrones MCP en producción en DailyBot: invalidación de cache por version-stamp, exponential backoff en reconexiones y una capa anti-alucinación que bloquea resultados stub antes de llegar al usuario.",
        details:
          "mcp-devtools es la destilación open-source de los patrones de integración MCP que construí y opero en DailyBot. Expone una superficie curada y security-first para que un agente de IA pueda leer archivos, ejecutar queries, lanzar procesos y llamar servicios OpenAPI sin salirse jamás de los límites que el desarrollador autoriza. Cada herramienta pasa por scope checks y un sandbox; las herramientas de base de datos arrancan en modo solo lectura; la herramienta de procesos consulta una allowlist explícita antes de exec; y el transporte HTTP exige auth Bearer, así que el mismo paquete potencia el uso local en el IDE y los deploys remotos / en contenedores bajo un solo modelo.",
        outcomes: [
          "Publicado en npm como @oscarmarin/mcp-devtools — instalable con npx @oscarmarin/mcp-devtools.",
          "14 herramientas en 4 grupos: filesystem, base de datos, proceso y OpenAPI — todas con scope check y sandbox.",
          "Diseño security-first: restricción de scope, allowlist de comandos, modo DB de solo lectura, auth Bearer HTTP.",
          "Dos transportes: stdio para uso local, HTTP con autenticación para deploys remotos y en contenedores.",
          "Plugin API que permite registrar herramientas personalizadas sin forkear el paquete.",
          "Sitio de documentación completo en mcp-devtools.oscarmarindev.com construido con VitePress.",
        ],
      },
    },
  },
];
