---
layout: default
title: Requerimientos de Negocio
nav_order: 6
has_children: true
permalink: /req/
---

# Requerimientos y Casos de Uso de Negocio

En esta sección se consolidan los requerimientos, flujos lógicos, casos de uso e historias de usuario expresados en **lenguaje de negocio**.

A diferencia de `README.md` (entrada principal del repositorio) y de `docs-repo/docs/` (documentación técnica y arquitectura de software), la carpeta `docs-repo/req/` define **qué necesita el negocio** y sirve como puente de comunicación entre Producto, Operaciones y Desarrollo. El proceso operativo para entregar esos cambios se documenta en **[Procesos](../procesos/)**.

---

## 📂 Contenido del Directorio

En este directorio encontrarás:
*   **[Casos de Uso](casos-uso/):** Contratos vivos publicados bajo `Requerimientos de Negocio > Casos de Uso`.
*   **[Plantilla de Contrato de Caso de Uso](CASO_USO_TEMPLATE.html):** Formato `docs-repo/req/<caso-de-uso>/CONTRACT.md`.
*   **[Criterios de Aceptación](criterios-aceptacion.html):** Formato BDD para CA verificables.
*   **[User Story](user-story.html):** Estructura de una US administrada desde el backlog.
*   **[SDLC + AI Standard](../procesos/sdlc-ai.html):** Ciclo transversal desde Backlog hasta CI/CD.
*   *Otros casos de uso de negocio globales cuando sea pertinente.*

---

## 🛠️ ¿Cuándo documentar en `docs-repo/req/`?

Debes agregar o modificar documentos aquí cuando:
1. Se defina una nueva regla de negocio global que afecte a múltiples sistemas.
2. Se diseñe un flujo de usuario complejo que involucre interacciones de cara al cliente.
3. Se requiera especificar flujos alternativos, validaciones y excepciones desde la perspectiva funcional.

Usa `docs-repo/procesos/` cuando necesites documentar cómo se trabaja, revisa, integra o entrega un cambio.
