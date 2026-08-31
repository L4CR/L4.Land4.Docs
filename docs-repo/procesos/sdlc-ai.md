---
layout: default
title: SDLC + AI Standard
parent: Procesos
nav_order: 1
permalink: /procesos/sdlc-ai.html
---

# SDLC + AI Standard LAND4

Este estándar define cómo humanos y agentes colaboran desde el backlog hasta el despliegue. La IA acelera el trabajo; la decisión de merge sigue requiriendo aprobación humana.

## Glosario

| Sigla | Significado |
| :--- | :--- |
| CU | Caso de Uso, contrato vivo del dominio. |
| CA | Criterio de Aceptación. |
| PM | Project Manager General. |
| PMA | Project Manager Architect. |
| PMB | Project Manager Business. |
| PMC | Project Manager Commercial. |
| US | User Story. `HU` queda como alias histórico. |
| CP | Caso de Prueba. |

## Flujo

```mermaid
flowchart LR
    Backlog["1. Backlog<br/>Humano + PM"] --> Refine["2. Refinamiento<br/>PMA / PMB / PMC"]
    Refine --> Contract["3. CU actualizado<br/>CONTRACT.md"]
    Contract --> Ready["4. US Ready<br/>Issue + CA + CP"]
    Ready --> InProgress["5. US In Progress<br/>inicio técnico"]
    InProgress --> Extract["6. Extracción<br/>Issue + CU"]
    Extract --> Prompt["7. Prompt<br/>rol técnico"]
    Prompt --> Implement["8. Implementación<br/>TDD"]
    Implement --> Review["9. PR<br/>Reviewer Codex + humano"]
    Review --> Delivery["10. CI/CD<br/>checks + deploy"]
    Delivery -. feedback .-> Backlog
```

## Fuentes de verdad

| Artefacto | Fuente canónica |
| :--- | :--- |
| CU | `docs-repo/req/<caso-de-uso>/CONTRACT.md` versionado con el código y publicado bajo `Requerimientos de Negocio > Casos de Uso`. |
| US, CA, CP y tareas | Issue de la plataforma de backlog. GitHub Issues es el primer adaptador. |
| Estado de US | GitHub Projects en la primera implementación. |
| Prompt | Artefacto temporal reproducible generado desde US + CU. |
| Documentación técnica | `README.md`, `AGENTS.md` y `docs-repo/` del repositorio. |
| Skills organizacionales | [`L4.Land4.Core.Packages/packages/skills/<skill>`](https://github.com/L4CR/L4.Land4.Core.Packages/tree/main/packages/skills). |
| Skills propias del workspace | `.agents/skills/<skill>` en el repositorio que necesita esa capacidad local. |

## Automatización MVP

La automatización queda separada por responsabilidad:

- La skill organizacional de administración de GitHub Projects prepara insumos locales desde GitHub.
- La skill organizacional [`l4-architect`](https://github.com/L4CR/L4.Land4.Core.Packages/tree/main/packages/skills/l4-architect) trabaja con esos insumos locales, genera contexto, prompt y plan sin leer GitHub Projects.
- Los scripts globales en `docs-repo/scripts/sdlc-ai/` permanecen como MVP de referencia y compatibilidad mientras se consolida la lógica autocontenida en skills.

La extracción y la generación del plan arrancan cuando la US pasa de `Ready` a `In Progress`. `Ready` indica que la US está suficientemente refinada para iniciar; no obliga a ejecutar todavía el extractor.

```bash
node --disable-warning=ExperimentalWarning --experimental-strip-types \
  docs-repo/scripts/sdlc-ai/extract-agent-context.ts \
  --issue <url-o-numero> --repo <owner/repo> \
  --out .tmp/land4-prompts/context.json

node --disable-warning=ExperimentalWarning --experimental-strip-types \
  docs-repo/scripts/sdlc-ai/generate-agent-prompt.ts \
  --context .tmp/land4-prompts/context.json \
  --role land4-implementer \
  --out .tmp/land4-prompts/prompt.md
```

Para pruebas reproducibles sin red, sustituye `--issue` por `--fixture <issue.json>`.

El extractor global implementa un adaptador GitHub mediante `gh issue view`; por eso no debe confundirse con skills que no administran GitHub Projects. El modelo normalizado permite agregar adaptadores para Jira, Azure DevOps u otras plataformas sin cambiar el contrato CU ni el generador de prompts.

Para el flujo autocontenido, invoca `l4-architect` mediante la interfaz descrita por su `SKILL.md` instalado. La instalación predeterminada vive en `~/.agents/skills/l4-architect`; `LAND4_SKILLS_HOME` o `--target` pueden cambiar el destino sin cambiar la fuente versionada en Core.Packages. El proceso no debe depender de una copia en `.agents/skills/l4-architect` dentro del repositorio consumidor.

La publicación reproducible de releases, el mecanismo de autenticación y el pinning de versiones del instalador central siguen pendientes de contrato. Hasta resolverlos, cada ejecución debe registrar la revisión de Core.Packages utilizada y no asumir que el contenido actual ya existe como una nueva versión npm.

El prompt y el plan conservan trazabilidad, tareas, CA, CP y el contexto completo de cada CU relacionado. Los artefactos en `.tmp/plans/` no se versionan hasta aprobación humana.

## Gates

| Gate | Condiciones |
| :--- | :--- |
| `Ready` | CU vigente, US completa, CA verificables y CA → CP trazable. |
| `In Progress` técnico | La US ya pasó a `In Progress` y el flujo técnico puede ejecutar extracción, prompt y plan sin bloquear el refinamiento previo. |
| PR revisable | Implementación acotada, pruebas ejecutadas, cobertura reportada y decisión Docs-as-Code explícita. |
| `Done` | CI verde, Reviewer Codex ejecutado, aprobación humana, documentación actualizada y merge completado. |
