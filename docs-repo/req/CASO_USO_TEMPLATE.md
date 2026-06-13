---
layout: default
title: Plantilla de Contrato de Caso de Uso
parent: Requerimientos de Negocio
nav_order: 1
permalink: /req/CASO_USO_TEMPLATE.html
artifact: CU
---

# CU-XXX - [Nombre del caso de uso]

Cada caso de uso es un contrato vivo del dominio. Copia esta plantilla en:

```text
docs-repo/req/<caso-de-uso>/CONTRACT.md
```

Conserva los encabezados y las columnas de las tablas: el extractor SDLC + AI los utiliza para generar contexto para los agentes.

## Datos generales

| Campo | Valor |
| :--- | :--- |
| Código | CU-XXX |
| Nombre | [Nombre claro del flujo] |
| Fecha de creación | AAAA-MM-DD |
| Fecha de modificación | AAAA-MM-DD |
| Propietario / Product Owner | [Responsable] |
| Versión | 1.0.0 |
| Estado | Draft |

## Descripción

[Describe brevemente y en lenguaje no técnico el objetivo que el usuario o el negocio busca lograr.]

## Lenguaje ubicuo

| Término | Definición |
| :--- | :--- |
| [Término] | [Definición compartida entre negocio y tecnología] |

## Actores

| Tipo | Actor | Responsabilidad |
| :--- | :--- | :--- |
| Principal | [Actor] | [Responsabilidad] |

## Precondiciones

| ID | Condición |
| :--- | :--- |
| PRE-01 | [Condición previa] |

## Flujo principal

| Paso | Actor | Acción |
| :--- | :--- | :--- |
| 1 | [Actor] | [Acción observable] |

## Flujos alternos

| ID | Paso origen | Condición | Flujo | Resultado |
| :--- | :--- | :--- | :--- | :--- |
| ALT-01 | 1 | [Condición] | [Secuencia alterna] | [Retorno o finalización] |

## Postcondiciones

| ID | Condición |
| :--- | :--- |
| POST-01 | [Estado resultante] |

## Reglas de negocio

| ID | Nombre | Descripción / Restricción |
| :--- | :--- | :--- |
| RN-01 | [Nombre] | [Política o restricción] |
