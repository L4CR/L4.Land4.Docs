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

## Categorías de skills

El repositorio debe definir instrucciones para agentes de código en un archivo `AGENTS.md` en la raíz del proyecto.

LAND4 separa las skills por su alcance y fuente de verdad:

| Categoría | Fuente versionada | Destino predeterminado | Uso |
| :--- | :--- | :--- | :--- |
| Organizacional | [`L4.Land4.Core.Packages/packages/skills/<skill>`](https://github.com/L4CR/L4.Land4.Core.Packages/tree/main/packages/skills) | `~/.agents/skills/<skill>` | Capacidades compartidas entre repositorios, equipos o productos. |
| Propia del workspace | `.agents/skills/<skill>` en el repositorio que la necesita | El propio checkout | Capacidad acoplada al dominio, scripts o flujo exclusivo de ese workspace. |

El [catálogo raíz de `L4.Land4.Core.Packages`](https://github.com/L4CR/L4.Land4.Core.Packages) es el punto de entrada para descubrir las skills organizacionales. La fuente de una skill concreta vive en `packages/skills/<skill>` dentro de ese repositorio.

La instalación organizacional usa por defecto el alcance de usuario o máquina en `~/.agents/skills/<skill>`. `LAND4_SKILLS_HOME` permite cambiar el directorio base y `--target` seleccionar otro destino cuando el instalador central lo soporte. Ambos son overrides de instalación: no convierten el destino en fuente de verdad ni sustituyen el versionado de Core.Packages.

La definición de releases, autenticación y pinning reproducible del instalador central continúa como deuda de seguimiento. Esta documentación no presupone que los cambios actuales ya estén publicados como una nueva versión npm.

Cuando un repositorio necesite una capacidad verdaderamente propia, puede usar la estructura:

```text
.agents/
└── skills/
    └── nombre-del-skill/
        ├── SKILL.md
        ├── scripts/
        ├── references/
        └── assets/
```

El archivo `SKILL.md` debe incluir frontmatter YAML con, como mínimo, `name` y `description`, siguiendo la especificación abierta de Agent Skills. No copies en `.agents/skills/` una skill organizacional para personalizar su instalación: contribuye el cambio en Core.Packages o conserva una configuración local fuera de la fuente versionada.

## Nomenclatura de skills

Las skills propias de LAND4 deben nombrarse con el prefijo estándar `l4-`:

```text
l4-<nombre>
```

El nombre de la carpeta y el valor `name` del frontmatter deben coincidir exactamente. Ejemplo:

```text
.agents/skills/l4-docs-workspace/SKILL.md
```

```yaml
---
name: l4-docs-workspace
description: Automatizar una tarea exclusiva de este workspace de documentación.
---
```

Usa solo minúsculas, números y guiones. No mezcles prefijos alternos para nuevas skills LAND4.

## Contenido

*   **[AGENTS.md](agents/):** Instrucciones operativas para agentes de código en este repositorio.
*   **[SDLC + AI Standard](../../procesos/sdlc-ai.html):** Flujo de trabajo asistido por agentes.
*   **[TDD y Pruebas](../testing.html):** Cobertura, capas de prueba y uso de Webwright.

## Catálogo local opcional

Un repositorio que versione skills propias en `.agents/skills/` puede ejecutar `docs-repo/scripts/generate-skills-docs.ts` para publicar un catálogo derivado. Con cero skills locales, el generador elimina u omite esa página; por eso este portal no mantiene un enlace permanente a `skills.html`.

Las skills organizacionales se consultan en [`L4.Land4.Core.Packages`](https://github.com/L4CR/L4.Land4.Core.Packages), no en un catálogo generado desde este workspace.

## Referencias oficiales

Consulta la documentación oficial antes de crear o modificar estos archivos:

*   [AGENTS.md](https://agents.md/)
*   [Agent Skills](https://agentskills.io/home)
*   [Agent Skills Specification](https://agentskills.io/specification)
*   [Best practices for skill creators](https://agentskills.io/skill-creation/best-practices)
