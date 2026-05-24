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
    └── nombre-del-skill/
        ├── SKILL.md
        ├── scripts/
        ├── references/
        └── assets/
```

El archivo `SKILL.md` debe incluir frontmatter YAML con, como mínimo, `name` y `description`, siguiendo la especificación abierta de Agent Skills.

## Contenido

*   **[AGENTS.md](agents.md):** Instrucciones operativas para agentes de código en este repositorio.
*   **[Skills](skills.md):** Skills propias de este repositorio disponibles para agentes.

## Referencias oficiales

Consulta la documentación oficial antes de crear o modificar estos archivos:

*   [AGENTS.md](https://agents.md/)
*   [Agent Skills](https://agentskills.io/home)
*   [Agent Skills Specification](https://agentskills.io/specification)
*   [Best practices for skill creators](https://agentskills.io/skill-creation/best-practices)
