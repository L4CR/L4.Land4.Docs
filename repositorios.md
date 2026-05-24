---
layout: default
title: Catálogo de Sistemas
parent: Documentación Técnica
nav_order: 1
permalink: /docs/repositorios
---

# 🗺️ Catálogo de Sistemas y Repositorios

Este catálogo centraliza los accesos directos a la **documentación viva** de cada uno de los repositorios y sistemas que conforman el ecosistema de **LAND4**. 

La documentación técnica detallada (arquitectura, setup local, guías de desarrollo) vive dentro de cada repositorio individual para asegurar que evolucione junto con el código.

---

## 📂 Inventario de Repositorios

| Sistema / Proyecto | Tipo | Descripción | Documentación Viva | Equipo Responsable |
| :--- | :--- | :--- | :--- | :--- |
| **Repositorio Core** | API / Backend | API principal y servicios de negocio central. | [Ver Docs ↗](https://github.com/L4CR/core-repo-placeholder/tree/main/docs) | Team Backend |
| **Frontend Web** | Web App | Portal web principal de cara al usuario. | [Ver README ↗](https://github.com/L4CR/frontend-placeholder/blob/main/README.md) | Team Frontend |
| **App Móvil** | Mobile App | Aplicación móvil para iOS y Android. | [Ver Arquitectura ↗](https://github.com/L4CR/mobile-placeholder/blob/main/docs/arquitectura.md) | Team Mobile |
| **Servicios de Integración** | Microservicio | Conector con entidades externas y pasarelas. | [Ver Setup ↗](https://github.com/L4CR/integration-placeholder/blob/main/docs/setup.md) | Team Integraciones |

> *Nota: Reemplaza estos enlaces de ejemplo por las URLs reales de los repositorios de LAND4 a medida que se vayan incorporando.*

---

## 📥 ¿Cómo agregar tu proyecto a esta lista?

Si has creado un nuevo repositorio o quieres registrar uno existente en este catálogo:

1. Asegúrate de que tu repositorio cumpla con el estándar de documentación (con un `README.md` claro y una carpeta `/docs`). Puedes guiarte con nuestra **[Guía: ¿Cómo Documentar?](como-documentar.md)**.
2. Edita este archivo (`repositorios.md`) agregando una fila a la tabla anterior con:
   * **Nombre del Sistema:** Nombre del proyecto.
   * **Tipo:** Backend, Frontend, Microservicio, Infraestructura, etc.
   * **Descripción:** Un resumen breve de una sola frase sobre el propósito del sistema.
   * **Enlace a Docs Vivas:** El link directo a la carpeta `/docs` o al `README.md` en GitHub de tu repositorio.
   * **Equipo Responsable:** Quién o quiénes mantienen el sistema.
3. Envía tu Pull Request para actualizar la tabla.
4. Agrega un enlace al catálogo en el `README.md` del repositorio o en su documentación principal para que el equipo pueda volver fácilmente a este inventario central.
