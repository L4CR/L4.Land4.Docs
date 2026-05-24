---
layout: default
title: Catálogo de Sistemas
parent: Documentación Técnica
nav_order: 3
permalink: /docs/repositorios
---

# 🗺️ Catálogo de Sistemas y Repositorios

Este catálogo centraliza los accesos directos a la **documentación publicada** de cada uno de los repositorios y sistemas que conforman el ecosistema de **LAND4**.

La documentación técnica detallada vive dentro de cada repositorio individual para asegurar que evolucione junto con el código. Cada repositorio debe publicar esa documentación en su propia GitHub Page, y este catálogo debe enlazar a esa página publicada.

---

## 📂 Inventario de Repositorios

| Sistema / Proyecto | Tipo | Descripción | Documentación publicada | Equipo Responsable |
| :--- | :--- | :--- | :--- | :--- |
| **Repositorio Core** | API / Backend | API principal y servicios de negocio central. | [Ver documentación ↗](https://l4cr.github.io/core-repo-placeholder/) | Team Backend |
| **Frontend Web** | Web App | Portal web principal de cara al usuario. | [Ver documentación ↗](https://l4cr.github.io/frontend-placeholder/) | Team Frontend |
| **App Móvil** | Mobile App | Aplicación móvil para iOS y Android. | [Ver documentación ↗](https://l4cr.github.io/mobile-placeholder/) | Team Mobile |
| **Servicios de Integración** | Microservicio | Conector con entidades externas y pasarelas. | [Ver documentación ↗](https://l4cr.github.io/integration-placeholder/) | Team Integraciones |

> *Nota: Reemplaza estos enlaces de ejemplo por las URLs reales de GitHub Pages de los repositorios de LAND4 a medida que se vayan incorporando.*

---

## 📥 ¿Cómo agregar tu proyecto a esta lista?

Si has creado un nuevo repositorio o quieres registrar uno existente en este catálogo:

1. Asegúrate de que tu repositorio cumpla con el estándar de documentación (con un `README.md` claro y una carpeta `/docs`) y publique esa documentación en su propia GitHub Page. Puedes guiarte con nuestra **[Guía: ¿Cómo Documentar?](como-documentar.md)**.
2. Edita este archivo (`docs/repositorios.md`) agregando una fila a la tabla anterior con:
   * **Nombre del Sistema:** Nombre del proyecto.
   * **Tipo:** Backend, Frontend, Microservicio, Infraestructura, etc.
   * **Descripción:** Un resumen breve de una sola frase sobre el propósito del sistema.
   * **Documentación publicada:** URL de la GitHub Page del repositorio registrado.
   * **Equipo Responsable:** Quién o quiénes mantienen el sistema.
3. Envía tu Pull Request para actualizar la tabla.
4. Agrega un enlace al catálogo en el `README.md` del repositorio o en su documentación principal para que el equipo pueda volver fácilmente a este inventario central.
