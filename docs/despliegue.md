---
layout: default
title: Despliegue
parent: Documentación Técnica
nav_order: 2
---

# 🚀 Despliegue del Portal

Este repositorio publica el portal central de documentación de LAND4 con **Jekyll**, **Just the Docs** y **GitHub Pages**.

El portal aplica, dentro de su propio alcance, el estándar que documenta para otros repositorios: mantiene `README.md`, `/docs`, procesos y validación local versionados junto al código fuente de la documentación.

---

## Ambientes

| Ambiente | Propósito | Implementación | URL / acceso |
| :--- | :--- | :--- | :--- |
| **Local** | Validar cambios antes del Pull Request. | Docker + Ruby 3.3 + Jekyll. | [http://localhost:4000](http://localhost:4000) |
| **CI** | Compilar el sitio y detectar errores antes de publicar. | GitHub Actions con `.github/workflows/pages.yml`. | Pestaña **Actions** del repositorio. |
| **Producción** | Publicar el portal central para consulta del equipo. | GitHub Pages después de fusionar en `main`. | URL configurada en GitHub Pages. |

Actualmente este portal no define un ambiente separado de staging. Si se agrega uno, el cambio debe incluir la configuración técnica y la actualización de esta guía.

---

## Requerimientos

Para validar cambios localmente se recomienda usar Docker, porque evita depender de la versión de Ruby instalada en la máquina.

*   Docker Desktop.
*   Acceso a internet para descargar la imagen `ruby:3.3` y las gems la primera vez.
*   Bundler dentro del contenedor, provisto por la imagen oficial de Ruby.

El repo incluye `Gemfile` y `Gemfile.lock` para mantener las dependencias de Jekyll reproducibles.

---

## Validación local

El ambiente **Local** permite compilar y previsualizar el portal antes de abrir o fusionar un Pull Request.

### Requisitos del ambiente local

*   Docker Desktop.
*   Git.
*   Acceso a internet la primera vez que se descargan la imagen `ruby:3.3` y las gems.
*   Puerto `4000` disponible si se quiere levantar el servidor local.

### Pasos

1. Instala dependencias dentro del contenedor:

   ```bash
   docker run --rm \
     -v "$PWD:/site" \
     -w /site \
     ruby:3.3 \
     bundle install --path vendor/bundle
   ```

2. Compila el sitio:

   ```bash
   docker run --rm \
     -e BUNDLE_PATH=vendor/bundle \
     -v "$PWD:/site" \
     -w /site \
     ruby:3.3 \
     bundle exec jekyll build
   ```

3. Levanta el servidor local:

   ```bash
   docker run --rm \
     -e BUNDLE_PATH=vendor/bundle \
     -p 4000:4000 \
     -v "$PWD:/site" \
     -w /site \
     ruby:3.3 \
     bundle exec jekyll serve --host 0.0.0.0
   ```

4. Abre el portal en:

   [http://localhost:4000](http://localhost:4000)

### Validaciones mínimas

Antes de abrir un Pull Request, valida:

*   El comando `bundle exec jekyll build` termina sin errores.
*   La página principal carga localmente.
*   La navegación muestra las páginas nuevas o modificadas.
*   Los enlaces agregados funcionan.
*   Los assets nuevos cargan correctamente.

---

## Despliegue en GitHub Pages

El despliegue productivo se ejecuta automáticamente con GitHub Actions.

1. Un cambio se fusiona en `main`.
2. GitHub ejecuta `.github/workflows/pages.yml`.
3. La acción `actions/jekyll-build-pages@v1` compila el sitio.
4. La acción `actions/upload-pages-artifact@v3` publica el artefacto.
5. La acción `actions/deploy-pages@v4` despliega en GitHub Pages.

Si el build falla, revisa la pestaña **Actions** del repositorio y corrige el error en una nueva rama antes de intentar desplegar de nuevo.

---

## Verificación posterior al despliegue

Después de un despliegue exitoso, valida:

*   El workflow de GitHub Actions terminó en estado exitoso.
*   La página principal carga correctamente.
*   La navegación lateral muestra las secciones principales.
*   El buscador del portal responde.
*   Los assets de marca, como `assets/images/L4.png`, cargan correctamente.
*   Los enlaces modificados en el Pull Request funcionan en el sitio publicado.

---

## Archivos generados localmente

Estos directorios son artefactos locales y no deben subirse a Git:

*   `.bundle/`
*   `.jekyll-cache/`
*   `_site/`
*   `vendor/`

Están excluidos en `.gitignore`.
