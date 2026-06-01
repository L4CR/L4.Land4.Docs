---
layout: default
title: Criterios de Aceptación
parent: Requerimientos de Negocio
nav_order: 2
permalink: /req/criterios-aceptacion.html
---

# Criterios de Aceptación (CA)

Los **CA** son condiciones verificables para aceptar una US. Viven en el Issue de la US, no en el CU.

## Formato BDD

| ID | Dado | Cuando | Entonces |
| :--- | :--- | :--- | :--- |
| CA-001 | un comercio nuevo | envía datos válidos | el sistema registra la información |

Reglas:

*   Usa IDs `CA-XXX` únicos dentro de la US.
*   Describe comportamiento observable de negocio, no detalles de implementación.
*   Delimita errores, permisos y restricciones cuando apliquen.
*   Mapea cada CA al menos a un **[Caso de Prueba](../docs/casos-prueba.html)**.

Un CA ambiguo no permite mover la US a `Ready`.
