---
layout: default
title: Documentación Técnica
nav_order: 4
has_children: true
permalink: /docs/
---

# 🧱 Documentación Técnica

Esta sección es la entrada técnica publicada de este repositorio. Reúne la arquitectura, el despliegue, el catálogo de repositorios y la referencia de inteligencia artificial del portal.

Este `docs-repo/docs/` implementa el estándar definido en **[¿Cómo Documentar?](/como-documentar.html)**: mantiene un índice técnico, una guía de arquitectura, una guía de despliegue y documentación navegable publicada con GitHub Pages.

---

## 📂 Índice técnico

En este directorio encontrarás:

*   **[Arquitectura](/docs/arquitectura.html):** Diseño técnico del portal, componentes, flujo de publicación y decisiones técnicas.
*   **[Despliegue](/docs/despliegue.html):** Ambientes, pasos y requerimientos para validar localmente y desplegar la documentación en GitHub Pages.
*   **[Catálogo de Repositorios](/docs/repositorios/):** Inventario de repositorios relacionados. En este portal central funciona como inventario de todos los repositorios LAND4.
*   **[Inteligencia Artificial](/docs/inteligencia-artificial/):** Implementación organizacional basada en estándares abiertos para `AGENTS.md` y Agent Skills.
*   **[Plantillas de Pull Request](/docs/pr-templates/):** Vista publicada de las plantillas operativas de `.github/PULL_REQUEST_TEMPLATE/`.

---

## ✅ Cumplimiento del estándar `/docs`

| Requisito | Implementación en este repositorio |
| :--- | :--- |
| `docs-repo/docs/index.md` como índice técnico | Esta página centraliza la navegación técnica del repositorio. |
| `docs-repo/docs/arquitectura.md` | Documenta el modelo centralizado y distribuido, componentes, flujo de publicación, decisiones técnicas y límites del portal. |
| `docs-repo/docs/despliegue.md` | Documenta ambientes, requerimientos, validación local, CI/CD, despliegue, verificación posterior y rollback. |
| `docs-repo/docs/inteligencia-artificial/index.md` | Documenta la implementación organizacional basada en estándares abiertos para `AGENTS.md` y Agent Skills. |
| Documentación publicada | El portal se publica con GitHub Pages desde los cambios fusionados a `main`. |
| Catálogo navegable | En repositorios de producto documenta dependencias o repositorios relacionados; en este portal central funciona como inventario de todos los repositorios LAND4. |
| APIs o endpoints | No aplica para este repositorio porque el portal es un sitio estático de documentación. |

---

## 🧭 Separación de responsabilidades

*   **`README.md`:** Entrada del repositorio en GitHub; resume el propósito y enlaza a la documentación relevante.
*   **`docs-repo/index.md`:** Inicio publicado del portal e índice principal navegable.
*   **`docs-repo/docs/`:** Documentación técnica viva del portal: arquitectura, despliegue, repositorios relacionados e inteligencia artificial.
*   **`docs-repo/req/`:** Requerimientos de negocio: casos de uso, historias de usuario, criterios de aceptación y reglas.
*   **`docs-repo/procesos/`:** Forma de trabajo: ramas, PRs, CI, aprobaciones, merge y entrega.
