---
layout: default
title: TDD y Pruebas
parent: Documentación Técnica
nav_order: 6
permalink: /docs/testing.html
---

# TDD y Pruebas

LAND4 usa desarrollo guiado por pruebas: primero se define el comportamiento verificable, luego se implementa el mínimo cambio y finalmente se refactoriza manteniendo las pruebas verdes.

## Pirámide recomendada

| Capa | Distribución orientativa | Propósito |
| :--- | :--- | :--- |
| Unitarias | 70–80% | Lógica de dominio, funciones y clases aisladas. |
| Integración | 15–25% | Persistencia, APIs, eventos y dependencias relevantes. |
| E2E | 5–10% | Flujos críticos de usuario. |

La cobertura mínima predeterminada es `80%` cuando el stack soporte medición. Cada repositorio puede justificar y versionar un umbral diferente. La proporción por capa guía el diseño, pero no bloquea CI por sí sola.

## Ejecución

| Momento | Validación |
| :--- | :--- |
| Refinamiento | Cada CA mapea al menos un CP. |
| Implementación | El agente implementador sigue TDD y ejecuta pruebas locales. |
| Pull Request | CI ejecuta lint, análisis estático, pruebas y cobertura según el stack. |
| QA | Se validan regresión, integraciones y flujos críticos. |
| Antes del merge | Reviewer Codex y revisor humano verifican CA, CP y documentación. |

## E2E con Webwright

Para E2E web usa la skill upstream [microsoft/Webwright](https://github.com/microsoft/Webwright). Webwright utiliza Playwright para explorar flujos, conservar scripts reproducibles y producir evidencia visual. No reemplaza la selección cuidadosa de escenarios críticos ni los checks deterministas del pipeline.
