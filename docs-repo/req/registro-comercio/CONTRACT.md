---
layout: default
title: CU-001 - Registro de comercio
parent: Casos de Uso
nav_order: 10
permalink: /req/registro-comercio/
artifact: CU
id: CU-001
---

# CU-001 - Registro de comercio

Este contrato de ejemplo demuestra el formato vivo que cada repositorio LAND4 mantiene junto al código.

## Datos generales

| Campo | Valor |
| :--- | :--- |
| Código | CU-001 |
| Nombre | Registro de comercio |
| Fecha de creación | 2026-01-01 |
| Fecha de modificación | 2026-01-01 |
| Propietario / Product Owner | Producto |
| Versión | 1.0.0 |
| Estado | Active |

## Descripción

Permitir que un comercio registre sus datos básicos.

## Lenguaje ubicuo

| Término | Definición |
| :--- | :--- |
| Comercio | Negocio solicitante que inicia el alta. |

## Actores

| Tipo | Actor | Responsabilidad |
| :--- | :--- | :--- |
| Principal | Comercio | Registrar sus datos básicos. |

## Precondiciones

| ID | Condición |
| :--- | :--- |
| PRE-01 | El comercio cuenta con un correo disponible. |

## Flujo principal

| Paso | Actor | Acción |
| :--- | :--- | :--- |
| 1 | Comercio | Envía datos válidos. |
| 2 | Sistema | Registra la información. |

## Flujos alternos

| ID | Paso origen | Condición | Flujo | Resultado |
| :--- | :--- | :--- | :--- | :--- |
| ALT-01 | 1 | El correo ya existe. | Mostrar error. | El flujo finaliza sin registro. |

## Postcondiciones

| ID | Condición |
| :--- | :--- |
| POST-01 | El comercio queda registrado. |

## Reglas de negocio

| ID | Nombre | Descripción / Restricción |
| :--- | :--- | :--- |
| RN-01 | Correo único | Un correo no puede registrar más de un comercio. |
