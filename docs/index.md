---
layout: default
title: Documentación Técnica
nav_order: 4
has_children: true
permalink: /docs
---

# 🧱 Documentación Técnica

Esta sección centraliza estándares y accesos relacionados con la documentación técnica de los sistemas LAND4.

En cada repositorio de producto, la documentación técnica debe mantenerse en `/docs`. El portal central no reemplaza esa documentación: organiza el estándar común y enlaza a los repositorios donde vive el detalle técnico.

---

## 📂 Contenido del Directorio

En este directorio encontrarás:

*   **[Arquitectura](arquitectura.md):** Diseño técnico del portal, componentes, flujo de publicación y decisiones técnicas.
*   **[Catálogo de Sistemas](repositorios.md):** Inventario de repositorios y enlaces a su documentación publicada en GitHub Pages.
*   **[Despliegue](despliegue.md):** Ambientes, pasos y requerimientos para validar localmente y desplegar la documentación en GitHub Pages.

---

## 🧭 Separación de responsabilidades

*   **`README.md`:** Entrada principal del repositorio; resume el propósito, tecnologías y enlaces clave.
*   **`/docs`:** Documentación técnica viva del sistema: arquitectura, despliegue, APIs y decisiones técnicas.
*   **`/req`:** Requerimientos de negocio: casos de uso, historias de usuario, criterios de aceptación y reglas.
*   **`/procesos`:** Forma de trabajo: ramas, PRs, CI, aprobaciones, merge y entrega.
