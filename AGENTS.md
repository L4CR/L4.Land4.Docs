---
layout: default
title: AGENTS.md
parent: Inteligencia Artificial
nav_order: 5
permalink: /docs/inteligencia-artificial/agents/
---

# AGENTS.md

Instrucciones para agentes de código que trabajen en este repositorio.

## Resumen del proyecto

Este repositorio contiene el portal central de documentación de LAND4. Es un sitio estático construido con Jekyll y el tema Just the Docs, publicado con GitHub Pages.

La documentación sigue el modelo Docs-as-Code:

- `README.md`: entrada del repositorio en GitHub.
- `docs-repo/index.md`: página inicial publicada del portal.
- `docs-repo/como-documentar.md`: estándar LAND4 para documentación de repositorios.
- `docs-repo/docs/`: documentación técnica del portal.
- `docs-repo/_config.yml`, `docs-repo/Gemfile`, `docs-repo/docker-compose.yml`, `docs-repo/_sass/`, `docs-repo/assets/` y `docs-repo/scripts/`: soporte de publicación, estilo y validación Jekyll.
- `docs-repo/procesos/`: procesos transversales.
- `docs-repo/req/`: requerimientos, historias y casos de uso.
- `docs-repo/scripts/sdlc-ai/`: extractor de contexto Issue + CU y generador de prompts reproducibles.
- `docs-repo/onboarding/`: guía inicial para colaboradores.

## Comandos de desarrollo

Usa el servicio `docs` definido en `docs-repo/docker-compose.yml`. Primero genera la documentación derivada de skills y luego valida Jekyll con Docker:

```bash
node --disable-warning=ExperimentalWarning --experimental-strip-types docs-repo/scripts/generate-skills-docs.ts
node --disable-warning=ExperimentalWarning --experimental-strip-types docs-repo/scripts/generate-pr-template-docs.ts
node --disable-warning=ExperimentalWarning --experimental-strip-types --test docs-repo/scripts/sdlc-ai/*.test.ts
docker compose -f docs-repo/docker-compose.yml run --rm docs bundle install
docker compose -f docs-repo/docker-compose.yml run --rm docs bundle exec jekyll build --config docs-repo/_config.yml
docker compose -f docs-repo/docker-compose.yml up docs
```

El sitio local queda disponible en `http://localhost:4003/L4.Land4.Docs/` por defecto. Si necesitas otro puerto, usa `DOCS_PORT=4004`.

## Convenciones de documentación

- Mantén Markdown simple y compatible con Jekyll.
- Cada página publicada debe tener frontmatter YAML válido con `layout: default`, `title` y, cuando aplique, `nav_order`, `parent`, `has_children` o `permalink`.
- Usa rutas relativas para enlaces internos.
- No dupliques contenido global; enlaza a la fuente principal.
- Documenta comandos reales del repositorio, no pasos genéricos.
- Si cambias despliegue, dependencias, workflows, contenedores, rutas, assets o configuración de Jekyll, actualiza `docs-repo/docs/despliegue.md` en el mismo cambio.
- Si agregas una página navegable, actualiza el índice correspondiente y valida que aparezca en la navegación de Just the Docs.

## Inteligencia Artificial, AGENTS.md y skills

- Sigue la guía publicada en `docs-repo/docs/inteligencia-artificial/index.md`.
- La organización implementa `AGENTS.md` y Agent Skills con base en estándares abiertos, no en una especificación interna propia.
- `AGENTS.md` debe contener instrucciones operativas para agentes: estructura, comandos, estilo, validación, seguridad y criterios de PR.
- Los Agent Skills deben vivir en una carpeta con un `SKILL.md` que incluya frontmatter YAML con `name` y `description`.
- El `name` de un skill debe coincidir con el nombre de su carpeta y usar solo minúsculas, números y guiones.
- Mantén cada `SKILL.md` enfocado. Mueve material largo a `references/`, scripts reutilizables a `scripts/` y plantillas o recursos a `assets/`.

## Seguridad

- Nunca agregues secretos, tokens, contraseñas, archivos `.env` reales ni credenciales.
- Usa ejemplos como `.env.example` cuando haga falta documentar variables.
- No publiques información interna sensible en páginas que se despliegan públicamente con GitHub Pages.
- Antes de enlazar un repositorio desde `docs-repo/docs/repositorios.md`, verifica que la documentación publicada sea adecuada para el nivel de visibilidad del repositorio.

## Verificación antes de finalizar

Para cambios de Markdown, normalmente basta con recargar el portal local y revisar visualmente la página modificada.

Si el servidor local no está levantado, usa:

```bash
docker compose -f docs-repo/docker-compose.yml up docs
```

Ejecuta build solo cuando el cambio toque configuración, navegación, dependencias, Mermaid complejo o estructura publicada:

```bash
docker compose -f docs-repo/docker-compose.yml run --rm docs bundle exec jekyll build --config docs-repo/_config.yml
```

Revisa que:

- Las páginas nuevas o modificadas aparecen en la navegación esperada.
- Los enlaces internos resuelven correctamente.
- Los diagramas Mermaid renderizan sin errores.
- No se generaron cambios innecesarios ni versionados en `_site/`, `.bundle/`, `.sass-cache/`, `vendor/`, `docs-repo/vendor/`, `docs-repo/docs/inteligencia-artificial/skills.md` o `docs-repo/docs/pr-templates/`.
- No se versionaron artefactos temporales en `.tmp/land4-prompts/`.

## Pull Requests

- Mantén los cambios acotados al tema del Pull Request.
- Incluye documentación junto con cambios que modifiquen procesos, despliegue o estructura del portal.
- No mezcles refactors de formato con cambios de contenido salvo que sea necesario.
- Indica en el PR qué validación ejecutaste.
