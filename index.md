---
layout: default
title: Inicio
nav_order: 1
description: Portal centralizado de documentación y conocimiento de LAND4.
permalink: /
---

# 🚀 Portal de Documentación Centralizado — LAND4

¡Bienvenido al centro de conocimiento de **LAND4**! Este portal es la fuente única de verdad para el onboarding, estándares de desarrollo, procesos globales y arquitectura de nuestros sistemas.

---

## 🏗️ Arquitectura Híbrida de Documentación

Para garantizar que la documentación técnica no se quede obsoleta y evolucione a la par del código fuente, en **LAND4** adoptamos un modelo de documentación **híbrido y versionado**:

```mermaid
graph TD
    A[Portal Centralizado <br> L4.docs-organizacion] --> P(Procesos Transversales /procesos)
    A --> C(Guias de Onboarding)
    A --> T(Documentacion Tecnica /docs)
    A --> K(Requerimientos Globales /req)

    T --> D(Catalogo de Sistemas)
    D -->|Enlaces a Repos| E[Repo: API Gateway]
    D -->|Enlaces a Repos| F[Repo: App Movil]

    E -->|Detalle Tecnico| H[docs/arquitectura.md]
    E -->|Casos de Uso| L[req/CU-01-registro.md]

    F -->|Detalle Tecnico| I[docs/setup.md]

    style A fill:#4F46E5,stroke:#312E81,stroke-width:2px,color:#fff
    style D fill:#10B981,stroke:#065F46,stroke-width:2px,color:#fff
    style K fill:#F59E0B,stroke:#B45309,stroke-width:2px,color:#fff
```

1. **El Portal Central (Este Repositorio):** Aloja políticas de ingeniería, procesos globales, onboarding, catálogo de sistemas y requerimientos de negocio transversales.
2. **README principal (`README.md`):** Es la entrada inicial de cada repositorio: resume el propósito, tecnologías y enlaces a documentación relevante.
3. **Requerimientos de Negocio (`/req`):** Define qué necesita el negocio mediante casos de uso, historias de usuario, reglas y criterios de aceptación.
4. **Procesos Transversales (`/procesos`):** Define cómo colaboran Producto y TI para desarrollar, revisar, integrar y entregar cambios.
5. **Documentación Técnica Viva (Cada Repositorio en `/docs`):** Los detalles específicos de instalación, arquitectura de software, endpoints de API y guías de despliegue residen en la carpeta `/docs` de su propio repositorio.
6. **Casos de Uso de Negocio Viva (Cada Repositorio en `/req`):** Los requerimientos de negocio, flujos y validaciones funcionales específicas residen en la carpeta `/req` de cada repositorio.

---

## 🔍 Índice del Portal

Usa este índice para entrar a las secciones principales del portal:

*   **[📝 ¿Cómo Documentar?](como-documentar.md):** Estándar para estructurar `README.md`, `/docs`, `/req` y procesos relacionados en cada repositorio.
*   **[🧱 Documentación Técnica](docs/index.md):** Estándares y accesos a la documentación técnica viva de los sistemas LAND4. Dentro de esta sección encontrarás el **[Catálogo de Sistemas](repositorios.md)**.
*   **[🔄 Procesos Transversales](procesos/index.md):** Flujos de trabajo compartidos entre Producto y TI, incluyendo el GitHub Flow de LAND4.
*   **[🎯 Requerimientos de Negocio](req/index.md):** Casos de uso, historias de usuario, criterios de aceptación y reglas de negocio.
*   **[🚀 Onboarding](onboarding/bienvenida.md):** Guía inicial para configurar accesos, herramientas y entorno local.

---

## 🛠️ Cómo colaborar con esta documentación

Este portal se genera automáticamente usando **Jekyll** y el tema **Just the Docs** a través de GitHub Pages. Si deseas agregar una política global o corregir información general:

1. Realiza tus cambios en una nueva rama en este repositorio.
2. Envía un **Pull Request**.
3. Al aprobarse y fusionarse en la rama `main`, los cambios se compilarán y desplegarán automáticamente.
