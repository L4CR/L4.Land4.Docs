---
layout: default
title: Guía de Implementación del Portal de Documentación
nav_exclude: true
---

# 📖 Guía Definitiva: Portal de Documentación Centralizado e Híbrido

Este documento establece el estándar técnico para la creación, mantenimiento y automatización del sistema de documentación de la organización. El ecosistema se basa en una arquitectura híbrida: un portal centralizado para políticas globales y documentación viva dentro de cada repositorio de código.

---

## ⚠️ Limitación Importante de Costos (GitHub Pages)

Para implementar esta solución sin incurrir en costos adicionales de licenciamiento corporativo (GitHub Enterprise / Pro), se debe tener en cuenta la siguiente regla de negocio de GitHub:

* **Repositorios Públicos:** GitHub Pages es **100% gratuito** y permite desplegar el sitio web de documentación de forma ilimitada. *Nota: Todo el contenido indexado será visible en internet.*
* **Repositorios Privados:** Si las políticas de seguridad de la organización exigen que la documentación sea estrictamente confidencial, el repositorio **debe estar bajo un plan de pago** (GitHub Pro, Team o Enterprise) para poder activar GitHub Pages de manera privada.

---

## 🏗️ Parte 1: Configuración del Portal Centralizado

El portal centralizado compila la arquitectura macro, procesos de *onboarding*, guías de estilo y glosarios globales. Utiliza **Jekyll** con el tema **Just the Docs** para generar un sitio estático con buscador integrado de forma automática.

### 1. Archivo de Configuración Base (`_config.yml`)
En la raíz del repositorio de documentación, se debe estructurar el archivo `_config.yml` omitiendo el uso de la etiqueta estándar `theme` (restringida por el entorno seguro de GitHub) y reemplazándola por `remote_theme`.

```yaml
title: Portal de Ingeniería y Documentación
description: Espacio centralizado para procesos, guías y arquitectura de la Organización.

# Configuración del tema remoto (Evita restricciones de entorno seguro)
remote_theme: just-the-docs/just-the-docs
plugins:
  - jekyll-remote-theme

# Configuración del buscador nativo integrado
search_enabled: true
search:
  tokenizer: separator
  preview_words_before: 5
  preview_words_after: 5

url: ""
