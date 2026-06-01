---
layout: default
title: Casos de Prueba
parent: Documentación Técnica
nav_order: 5
permalink: /docs/casos-prueba.html
---

# Casos de Prueba (CP)

Un **CP** traduce un CA a una validación ejecutable o revisable. Vive en el Issue de la US y puede enlazar la automatización o evidencia correspondiente.

## Formato

| ID | CA relacionado | Tipo | Arrange | Act | Assert | Evidencia / Automatización |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| CP-001 | CA-001 | Unit | comercio nuevo | enviar datos válidos | registro creado | enlace o pendiente |

Reglas:

*   Usa IDs `CP-XXX` únicos dentro de la US.
*   Cada CA debe mapear al menos un CP.
*   Usa `Unit`, `Integration`, `E2E` o `Manual` según corresponda.
*   No incluyas secretos ni datos sensibles reales.
*   Registra evidencia o enlace a automatización cuando aplique.

Consulta **[TDD y pruebas](testing.html)** para distribución por capas y ejecución dentro del pipeline.
