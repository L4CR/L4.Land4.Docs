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

## Redacción Gherkin equivalente

Cuando se redacte un CA en formato Gherkin, debe conservar el mismo contenido del formato BDD:

```gherkin
CA-001: [Nombre del criterio]
Dado [contexto inicial]
Cuando [acción o evento del usuario]
Entonces [resultado observable esperado]
```

Reglas:

*   Usa IDs `CA-XXX` únicos dentro de la US.
*   Describe comportamiento observable de negocio, no detalles de implementación.
*   Delimita errores, permisos y restricciones cuando apliquen.
*   Mapea cada CA al menos a un **[Caso de Prueba](../docs/casos-prueba.html)**.

Un CA ambiguo no permite mover la US a `Ready`.
