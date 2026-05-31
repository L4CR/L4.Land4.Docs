---
layout: default
title: Inicio
nav_order: 1
description: Portal centralizado de documentación y conocimiento de LAND4.
permalink: /
---

# 🧠  LAND4 - Portal

¡Bienvenido al centro de conocimiento! Este portal es el punto de entrada para encontrar onboarding, estándares de desarrollo, procesos globales, requerimientos y documentación técnica.

Este repositorio implementa las prácticas de documentación interna de **LAND4**: usa `README.md` como entrada del repositorio en GitHub, `docs-repo/index.md` como Inicio del portal publicado, `docs-repo/docs/` para documentación técnica, `docs-repo/procesos/` para flujos de trabajo y `docs-repo/req/` para documentación de negocio.
La intención es que sirva como referencia replicable para otros repositorios de la organización.

---

## 🔍 Índice del Portal

Usa este índice como reflejo jerárquico del menú lateral del portal:

*   **[Inicio](./):** Punto de entrada del portal publicado e índice principal.
*   **[¿Cómo Documentar?](como-documentar.html):** Estándar para documentar repositorios LAND4.
*   **[Documentación Técnica](docs/):** Entrada a la documentación técnica propia del portal.
    *   [Arquitectura](docs/arquitectura.html): Modelo centralizado y distribuido, componentes, flujo de publicación y decisiones técnicas.
    *   [Despliegue](docs/despliegue.html): Validación local, ambientes y despliegue en GitHub Pages.
    *   [Catálogo de Repositorios](docs/repositorios/): Inventario central de repositorios LAND4 y enlaces a sus GitHub Pages.
    *   [Inteligencia Artificial](docs/inteligencia-artificial/): Implementación organizacional basada en estándares abiertos para `AGENTS.md` y Agent Skills.
    *   [Plantillas de Pull Request](docs/pr-templates/): Vista publicada de las plantillas operativas para PRs.
*   **[Procesos](procesos/):** Procesos transversales de colaboración entre Producto y TI.
    *   [GitHub Flow](procesos/github-flow.html): Flujo de trabajo para ramas, commits, Pull Requests y merges.
*   **[Requerimientos de Negocio](req/):** Guías para documentar requerimientos funcionales.
    *   [Plantilla de Caso de Uso](req/CASO_USO_TEMPLATE.html): Estructura base para casos de uso.
    *   [Criterios de Aceptación](req/criterios-aceptacion.html): Guía para definir validaciones de negocio.
    *   [Historia de Usuario](req/historia-usuario.html): Estructura y estados de una historia de usuario.
*   **[Onboarding](onboarding/):** Guía inicial para accesos, herramientas y entorno local.

---

## 🛠️ Cómo colaborar con esta documentación

Este portal se genera automáticamente usando **Jekyll** y el tema **Just the Docs** a través de GitHub Pages. Si deseas agregar una política global o corregir información general:

1. Realiza tus cambios en una nueva rama en este repositorio.
2. Envía un **Pull Request**.
3. Al aprobarse y fusionarse en la rama `main`, los cambios se compilarán y desplegarán automáticamente.
