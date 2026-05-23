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
    A[Portal Centralizado <br> L4.docs-organizacion] --> B(Procesos Globales)
    A --> C(Guias de Onboarding)
    A --> D(Catalogo de Sistemas)
    A --> K(Requerimientos Globales /req)
    
    D -->|Enlaces a Repos| E[Repo: API Gateway]
    D -->|Enlaces a Repos| F[Repo: App Movil]
    
    E -->|Detalle Tecnico| H[docs/arquitectura.md]
    E -->|Casos de Uso| L[req/CU-01-registro.md]
    
    F -->|Detalle Tecnico| I[docs/setup.md]
    
    style A fill:#4F46E5,stroke:#312E81,stroke-width:2px,color:#fff
    style D fill:#10B981,stroke:#065F46,stroke-width:2px,color:#fff
    style K fill:#F59E0B,stroke:#B45309,stroke-width:2px,color:#fff
```

1. **El Portal Central (Este Repositorio):** Aloja las políticas de ingeniería, guías de estilo, onboarding globales, el catálogo de sistemas y los requerimientos de negocio transversales en `/req`.
2. **Documentación Técnica Viva (Cada Repositorio en `/docs`):** Los detalles específicos de instalación, arquitectura de software, endpoints de API y guías de despliegue residen en la carpeta `/docs` de su propio repositorio.
3. **Casos de Uso de Negocio Viva (Cada Repositorio en `/req`):** Los requerimientos de negocio, flujos y validaciones funcionales específicas residen en la carpeta `/req` de cada repositorio.

---

## 🔍 Secciones del Portal

Navega a través de los menús laterales o utiliza los enlaces directos a continuación:

*   **[🗺️ Catálogo de Sistemas](repositorios.md):** Accede a la documentación técnica y funcional específica de cada uno de los microservicios, APIs y aplicaciones de LAND4.
*   **[🎯 Requerimientos de Negocio](req/index.md):** Casos de uso globales y plantillas para la definición de flujos funcionales.
*   **[🚀 Guía de Onboarding](onboarding/bienvenida.md):** Si eres nuevo en el equipo de tecnología, sigue esta guía paso a paso para configurar tus accesos y tu entorno local.
*   **[📝 Guía: ¿Cómo Documentar?](como-documentar.md):** Aprende el estándar para estructurar y mantener la documentación técnica (`/docs`) y de negocio (`/req`) en tu repositorio.

---

## 🛠️ Cómo colaborar con esta documentación

Este portal se genera automáticamente usando **Jekyll** y el tema **Just the Docs** a través de GitHub Pages. Si deseas agregar una política global o corregir información general:

1. Realiza tus cambios en una nueva rama en este repositorio.
2. Envía un **Pull Request**.
3. Al aprobarse y fusionarse en la rama `main`, los cambios se compilarán y desplegarán automáticamente.
