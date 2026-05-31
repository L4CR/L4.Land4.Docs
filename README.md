---
layout: default
title: README
nav_order: 2
permalink: /readme/
---

# LAND4 - Portal

Este repositorio aloja el portal central de documentación y conocimiento de la organización. El sitio web está compilado con **Jekyll** y utiliza el tema **Just the Docs**, desplegándose automáticamente a través de **GitHub Pages**.

Este repositorio implementa las prácticas de documentación: usa `README.md` como entrada del repositorio en GitHub, `docs-repo/index.md` como Inicio del portal publicado, `docs-repo/docs/` para documentación técnica, `docs-repo/procesos/` para flujos de trabajo y `docs-repo/req/` para documentación de negocio.
La intención es que sirva como referencia replicable para otros repositorios LAND4.

## Índice del repositorio

Este índice refleja la jerarquía del menú principal del portal publicado:

*   **[Inicio](/L4.docs-organizacion/):** Punto de entrada del portal publicado e índice principal.
*   **[¿Cómo Documentar?](/L4.docs-organizacion/como-documentar.html):** Estándar para documentar repositorios LAND4.
*   **[Documentación Técnica](/L4.docs-organizacion/docs/):** Entrada a la documentación técnica propia del portal.
    *   [Arquitectura](/L4.docs-organizacion/docs/arquitectura.html): Modelo centralizado y distribuido, componentes, flujo de publicación y decisiones técnicas.
    *   [Despliegue](/L4.docs-organizacion/docs/despliegue.html): Validación local, ambientes y despliegue en GitHub Pages.
    *   [Catálogo de Repositorios](/L4.docs-organizacion/docs/repositorios/): Inventario central de repositorios LAND4 y enlaces a sus GitHub Pages.
    *   [Inteligencia Artificial](/L4.docs-organizacion/docs/inteligencia-artificial/): Implementación organizacional basada en estándares abiertos para `AGENTS.md` y Agent Skills.
*   **[Procesos](/L4.docs-organizacion/procesos/):** Procesos transversales de colaboración entre Producto y TI.
    *   [GitHub Flow](/L4.docs-organizacion/procesos/github-flow.html): Flujo de trabajo para ramas, commits, Pull Requests y merges.
*   **[Requerimientos de Negocio](/L4.docs-organizacion/req/):** Guías para documentar requerimientos funcionales.
    *   [Plantilla de Caso de Uso](/L4.docs-organizacion/req/CASO_USO_TEMPLATE.html): Estructura base para casos de uso.
    *   [Criterios de Aceptación](/L4.docs-organizacion/req/criterios-aceptacion.html): Guía para definir validaciones de negocio.
    *   [Historia de Usuario](/L4.docs-organizacion/req/historia-usuario.html): Estructura y estados de una historia de usuario.
*   **[Onboarding](/L4.docs-organizacion/onboarding/):** Guía inicial para accesos, herramientas y entorno local.

---

## Desarrollo local

La validación local se ejecuta con el servicio `docs` definido en `docs-repo/docker-compose.yml`:

```bash
node --disable-warning=ExperimentalWarning --experimental-strip-types docs-repo/scripts/generate-skills-docs.ts
node --disable-warning=ExperimentalWarning --experimental-strip-types docs-repo/scripts/generate-pr-template-docs.ts
docker compose -f docs-repo/docker-compose.yml run --rm docs bundle install
docker compose -f docs-repo/docker-compose.yml run --rm docs bundle exec jekyll build --config docs-repo/_config.yml
docker compose -f docs-repo/docker-compose.yml up docs
```

El sitio local queda disponible en `http://localhost:4003/L4.docs-organizacion/`. El detalle operativo se documenta como parte del ambiente **Local** en la guía de **[Despliegue](/L4.docs-organizacion/docs/despliegue.html)**.

---

## Despliegue

Cualquier cambio fusionado en la rama `main` iniciará automáticamente el workflow de GitHub Actions (`.github/workflows/docs.yml`), compilando y desplegando el nuevo sitio estático en el entorno de GitHub Pages.

La guía operativa de este repositorio vive en **[docs-repo/docs/despliegue.md](/L4.docs-organizacion/docs/despliegue.html)**. Si cambia el workflow, la configuración de Jekyll, los ambientes, los assets requeridos por el build o la forma de validar localmente, esa guía debe actualizarse en el mismo Pull Request.

---

## Colaboración

1. Realiza tus cambios en una nueva rama en este repositorio.
2. Envía un **Pull Request**.
3. Al aprobarse y fusionarse en la rama `main`, los cambios se compilarán y desplegarán automáticamente.
