---
layout: default
title: Despliegue
parent: Documentación Técnica
nav_order: 2
permalink: /docs/despliegue.html
---

# 🚀 Despliegue del Portal

Este repositorio publica el portal central de documentación de LAND4 con **Jekyll**, **Just the Docs** y **GitHub Pages**.

El portal aplica el estándar que documenta para otros repositorios: mantiene `README.md` y `AGENTS.md` en la raíz, y concentra la documentación publicada, configuración, estilos, assets, scripts y validación Jekyll dentro de `docs-repo/`.

---

## Ambientes

| Ambiente | Propósito | Implementación | URL / acceso |
| :--- | :--- | :--- | :--- |
| **Local** | Validar cambios antes del Pull Request. | Docker Compose + Ruby 3.3 + Jekyll. | [http://localhost:4003/L4.docs-organizacion/](http://localhost:4003/L4.docs-organizacion/) |
| **CI** | Compilar el sitio y detectar errores antes de publicar. | GitHub Actions con `.github/workflows/docs.yml`. | Pestaña **Actions** del repositorio. |
| **Producción** | Publicar el portal central para consulta del equipo. | GitHub Pages después de fusionar en `main`. | [https://l4cr.github.io/L4.docs-organizacion/](https://l4cr.github.io/L4.docs-organizacion/) |

Actualmente este portal no define un ambiente separado de staging. Si se agrega uno, el cambio debe incluir la configuración técnica y la actualización de esta guía.

---

## Requerimientos

Para validar cambios localmente se usa `docs-repo/docker-compose.yml`, porque deja versionado el contenedor local y evita depender de la versión de Ruby instalada en la máquina. Para desplegar en GitHub Pages se requiere que el repositorio tenga Pages habilitado y que el workflow cuente con los permisos definidos en `.github/workflows/docs.yml`.

| Requerimiento | Uso | Observaciones |
| :--- | :--- | :--- |
| Docker Desktop con Docker Compose | Ambiente local | Permite ejecutar Ruby 3.3 y Jekyll sin instalar Ruby en la máquina. |
| Git | Ambiente local | Necesario para trabajar por ramas y Pull Requests. |
| Node.js 22 o compatible con TypeScript strip types | Local y CI | Requerido para ejecutar los scripts generadores de documentación derivada. |
| Acceso a internet | Ambiente local y CI | Requerido para descargar la imagen `ruby:3.3`, gems y acciones de GitHub. |
| `docs-repo/Gemfile` y `docs-repo/Gemfile.lock` | Local y CI | Mantienen dependencias reproducibles para Jekyll y el tema. |
| GitHub Pages habilitado | Producción | Debe publicar desde GitHub Actions. |
| Permisos del workflow | Producción | `contents: read`, `pages: write`, `id-token: write`. |

Este despliegue no requiere secretos personalizados ni variables de entorno sensibles. El token usado por GitHub Actions es el `GITHUB_TOKEN` administrado por GitHub y limitado por los permisos del workflow.

---

## Validación local

El ambiente **Local** permite compilar y previsualizar el portal antes de abrir o fusionar un Pull Request.

### Requisitos del ambiente local

*   Docker Desktop con Docker Compose.
*   Git.
*   Acceso a internet la primera vez que se descargan la imagen `ruby:3.3` y las gems.
*   Puerto `4003` disponible si se quiere levantar el servidor local.

El contenedor local está definido en `docs-repo/docker-compose.yml` con el servicio `docs`. La vista previa conserva el mismo `baseurl` productivo para validar las rutas reales de GitHub Pages.

### Pasos

1. Instala dependencias dentro del contenedor:

   ```bash
   docker compose -f docs-repo/docker-compose.yml run --rm docs bundle install
   ```

2. Ejecuta el generador de documentación para las skills. Es el mismo script que usa el workflow antes de compilar Jekyll:

   ```bash
   node --disable-warning=ExperimentalWarning --experimental-strip-types docs-repo/scripts/generate-skills-docs.ts
   node --disable-warning=ExperimentalWarning --experimental-strip-types docs-repo/scripts/generate-pr-template-docs.ts
   ```

   Para validar el MVP SDLC + AI sin acceso a GitHub:

   ```bash
   node --disable-warning=ExperimentalWarning --experimental-strip-types --test docs-repo/scripts/sdlc-ai/*.test.ts
   node --disable-warning=ExperimentalWarning --experimental-strip-types docs-repo/scripts/sdlc-ai/extract-agent-context.ts --fixture docs-repo/scripts/sdlc-ai/fixtures/issue-valid.json --out .tmp/land4-prompts/context.json
   node --disable-warning=ExperimentalWarning --experimental-strip-types docs-repo/scripts/sdlc-ai/generate-agent-prompt.ts --context .tmp/land4-prompts/context.json --role land4-implementer --out .tmp/land4-prompts/prompt.md
   ```

3. Compila el sitio:

   ```bash
   docker compose -f docs-repo/docker-compose.yml run --rm docs bundle exec jekyll build --config docs-repo/_config.yml
   ```

4. Levanta el servidor local:

   ```bash
   docker compose -f docs-repo/docker-compose.yml up docs
   ```

5. Abre el portal en:

   [http://localhost:4003/L4.docs-organizacion/](http://localhost:4003/L4.docs-organizacion/)

### Validaciones mínimas

Antes de abrir un Pull Request, valida:

*   El script `node --disable-warning=ExperimentalWarning --experimental-strip-types docs-repo/scripts/generate-skills-docs.ts` se ejecuta correctamente y genera/actualiza la documentación de las skills en `docs-repo/docs/inteligencia-artificial/skills.md`.
*   El script `node --disable-warning=ExperimentalWarning --experimental-strip-types docs-repo/scripts/generate-pr-template-docs.ts` se ejecuta correctamente y genera/actualiza la documentación de PR templates en `docs-repo/docs/pr-templates/`.
*   El comando `docker compose -f docs-repo/docker-compose.yml run --rm docs bundle exec jekyll build --config docs-repo/_config.yml` termina sin errores.
*   La página principal carga localmente.
*   La navegación muestra las páginas nuevas o modificadas.
*   Los enlaces agregados funcionan.
*   Los assets nuevos cargan correctamente.

---

## Despliegue en GitHub Pages

El despliegue productivo se ejecuta automáticamente con GitHub Actions.

### Pipeline CI/CD

| Campo | Valor |
| :--- | :--- |
| Workflow | `.github/workflows/docs.yml` |
| Disparadores | `push` a `main` con `paths` limitados a documentación, skills, plantillas de PR, Issue Forms y configuración del portal; ejecución manual con `workflow_dispatch` |
| Concurrencia | Grupo `pages`, con `cancel-in-progress: true` |
| Runner | `ubuntu-latest` |
| Ambiente GitHub | `github-pages` |
| Configuración Jekyll | `docs-repo/_config.yml` |
| URL base productiva | `https://l4cr.github.io/L4.docs-organizacion/` |
| Destination | `./_site` |
| Build | `bundle exec jekyll build --config docs-repo/_config.yml --destination ./_site` con Ruby 3.3 y Bundler cache |
| Publicación | `actions/upload-pages-artifact@v3` y `actions/deploy-pages@v4` |
| Ambiente destino | GitHub Pages |

### Pasos de despliegue

1. Un Pull Request aprobado se fusiona en `main`.
2. GitHub ejecuta `.github/workflows/docs.yml`.
3. `actions/checkout@v4` descarga el contenido del repositorio.
4. Se configura Node.js 22 y se ejecutan los mismos generadores usados localmente:
   * `node --disable-warning=ExperimentalWarning --experimental-strip-types docs-repo/scripts/generate-skills-docs.ts`
   * `node --disable-warning=ExperimentalWarning --experimental-strip-types docs-repo/scripts/generate-pr-template-docs.ts`
5. `actions/configure-pages@v5` prepara el entorno de GitHub Pages.
6. `ruby/setup-ruby@v1` configura Ruby 3.3 con caché de Bundler.
7. `bundle exec jekyll build --config docs-repo/_config.yml --destination ./_site` compila el sitio desde la raíz con configuración de `docs-repo/` hacia `./_site`.
8. `actions/upload-pages-artifact@v3` empaqueta el sitio generado.
9. `actions/deploy-pages@v4` publica el artefacto en GitHub Pages.
10. GitHub actualiza la URL productiva del portal.

Si el build falla, revisa la pestaña **Actions** del repositorio y corrige el error en una nueva rama antes de intentar desplegar de nuevo.

---

## Verificación posterior al despliegue

Después de un despliegue exitoso, valida:

*   El workflow de GitHub Actions terminó en estado exitoso.
*   La página principal carga correctamente en [https://l4cr.github.io/L4.docs-organizacion/](https://l4cr.github.io/L4.docs-organizacion/).
*   La navegación lateral muestra las secciones principales.
*   El buscador del portal responde.
*   Los assets de marca, como `docs-repo/assets/images/L4.png`, cargan correctamente.
*   Los enlaces modificados en el Pull Request funcionan en el sitio publicado.
*   Las páginas técnicas principales cargan correctamente:
    *   [Arquitectura](https://l4cr.github.io/L4.docs-organizacion/docs/arquitectura.html)
    *   [Despliegue](https://l4cr.github.io/L4.docs-organizacion/docs/despliegue.html)
    *   [Catálogo de Repositorios](https://l4cr.github.io/L4.docs-organizacion/docs/repositorios/)

---

## Rollback o recuperación

GitHub Pages publica el contenido generado desde la rama `main`. Si un despliegue introduce un error:

1. Identifica el Pull Request o commit que causó el problema.
2. Abre una rama de corrección o un Pull Request de revert.
3. Valida localmente con `docker compose -f docs-repo/docker-compose.yml run --rm docs bundle exec jekyll build --config docs-repo/_config.yml`.
4. Fusiona la corrección a `main` para disparar un nuevo despliegue.
5. Verifica el sitio publicado después de que GitHub Actions termine.

Si el problema impide navegar el portal o afecta assets críticos, prioriza revertir el cambio antes de agregar nueva funcionalidad.

---

## Relación implementación-documentación

Todo cambio que modifique el despliegue debe actualizar esta guía en el mismo Pull Request. Esto incluye:

*   Cambios en `.github/workflows/docs.yml`.
*   Cambios en `.github/ISSUE_TEMPLATE/` que modifiquen la captura estructurada de US.
*   Cambios en `docs-repo/_config.yml`.
*   Cambios en dependencias de Jekyll, `docs-repo/Gemfile` o `docs-repo/Gemfile.lock`.
*   Cambios en `docs-repo/docker-compose.yml`.
*   Cambios en ambientes, dominios, rutas base o configuración de GitHub Pages.
*   Cambios en assets requeridos por el build o por la navegación del portal.
*   Cambios en comandos de validación local.

---

## Archivos generados localmente

Estos directorios son artefactos locales y no deben subirse a Git:

*   `.bundle/`
*   `.jekyll-cache/`
*   `.sass-cache/`
*   `_site/`
*   `vendor/`
*   `docs-repo/vendor/`
*   `docs-repo/.bundle/`
*   `docs-repo/.jekyll-cache/`
*   `docs-repo/.sass-cache/`
*   `docs-repo/docs/inteligencia-artificial/skills.md`
*   `docs-repo/docs/pr-templates/`
*   `.tmp/`

Están excluidos en `.gitignore`.
