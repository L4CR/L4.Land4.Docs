---
layout: default
title: User Story
parent: Requerimientos de Negocio
nav_order: 3
permalink: /req/user-story.html
---

# User Story (US)

Una **User Story (US)** describe un incremento implementable de valor. `HU` se conserva únicamente como alias histórico.

En LAND4, la US vive en la plataforma de backlog. La implementación inicial usa GitHub Issues creados con `.github/ISSUE_TEMPLATE/user-story.yml`; GitHub Projects mantiene su estado operativo.

## Estructura

| Sección | Contenido |
| :--- | :--- |
| CU relacionados | Una o más URL GitHub a `docs-repo/req/<caso-de-uso>/CONTRACT.md` en `main`. |
| Historia | Tabla con `Como`, `Quiero` y `Para`. |
| Descripción | Contexto, restricciones y fuera de alcance. |
| Criterios de aceptación | Tabla BDD con IDs `CA-XXX`. |
| Casos de prueba | Tabla con IDs `CP-XXX`, referencia al CA y `Arrange / Act / Assert`. |
| Tareas | Tabla con ID, descripción y estado. |

## Estados

GitHub Projects es la fuente canónica del estado:

| Estado | Uso |
| :--- | :--- |
| `Backlog` | Necesidad identificada que aún requiere refinamiento. |
| `Ready` | US completa, verificable y lista para implementación. |
| `In Progress` | Incremento en implementación. |
| `Blocked` | Existe un impedimento explícito. |
| `Done` | Cambio integrado, validado y documentado. |

## Gate Ready

Una US puede pasar a `Ready` cuando:

*   Referencia uno o más CU vigentes.
*   Define `Como / Quiero / Para` y contexto suficiente.
*   Cada CA es verificable y tiene ID único.
*   Cada CA mapea al menos un CP.
*   El extractor SDLC + AI genera contexto sin errores.

Consulta **[SDLC + AI Standard](../procesos/sdlc-ai.html)** para el flujo completo.
