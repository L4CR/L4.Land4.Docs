---
layout: default
title: Inteligencia Artificial
parent: Documentación Técnica
nav_order: 4
has_children: true
permalink: /docs/inteligencia-artificial/
---

# Inteligencia Artificial

Esta sección reúne la documentación relacionada con el uso de inteligencia artificial en repositorios LAND4.

La organización se basa en estándares abiertos existentes, principalmente:

*   `AGENTS.md` para instrucciones operativas de agentes dentro de un repositorio.
*   Agent Skills para empaquetar capacidades reutilizables mediante carpetas con `SKILL.md`.

La intención es mantener compatibilidad con herramientas del ecosistema, evitar formatos propietarios internos innecesarios y documentar las decisiones de cada repositorio de forma clara y versionada.

## Implementación en repositorios LAND4

El repositorio debe definir instrucciones para agentes de código en un archivo `AGENTS.md` en la raíz del proyecto.

Cuando un repositorio necesite capacidades reutilizables para agentes, puede usar la estructura:

```text
.agents/
└── skills/
    └── l4-nombre-del-skill/
        ├── SKILL.md
        ├── scripts/
        ├── references/
        └── assets/
```

El archivo `SKILL.md` debe incluir frontmatter YAML con, como mínimo, `name` y `description`, siguiendo la especificación abierta de Agent Skills.

## Nomenclatura de skills

Las skills propias de LAND4 deben nombrarse con el prefijo estándar `l4-`:

```text
l4-<nombre>
```

El nombre de la carpeta y el valor `name` del frontmatter deben coincidir exactamente. Ejemplo:

```text
.agents/skills/l4-pm/SKILL.md
```

```yaml
---
name: l4-pm
description: Ayudar a humanos a redactar Casos de Uso, Criterios de Aceptación y User Stories LAND4.
---
```

Usa solo minúsculas, números y guiones. No mezcles prefijos alternos para nuevas skills LAND4.

## Contenido

*   **[AGENTS.md](agents/):** Instrucciones operativas para agentes de código en este repositorio.
*   **[Skills](skills.html):** Skills propias de este repositorio disponibles para agentes.
*   **[SDLC + AI Standard](../../procesos/sdlc-ai.html):** Flujo de trabajo asistido por agentes.
*   **[TDD y Pruebas](../testing.html):** Cobertura, capas de prueba y uso de Webwright.

## Instalación de Skills Globales

Para documentar de forma consistente todos los repositorios de la organización y poder realizar pruebas locales siguiendo las directrices oficiales, se recomienda instalar la skill `land4-documentation` de forma global en tu máquina de desarrollo.

La fuente versionada de las skills vive en `.agents/skills/` y el resumen publicado se genera automáticamente en **[Skills](skills.html)** durante el despliegue.

## Referencias oficiales

Consulta la documentación oficial antes de crear o modificar estos archivos:

*   [AGENTS.md](https://agents.md/)
*   [Agent Skills](https://agentskills.io/home)
*   [Agent Skills Specification](https://agentskills.io/specification)
*   [Best practices for skill creators](https://agentskills.io/skill-creation/best-practices)
