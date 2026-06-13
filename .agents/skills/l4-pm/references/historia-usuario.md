# Historia de Usuario (US)

Usa esta referencia solo cuando el usuario necesite crear o corregir una User Story.

Una US describe un incremento implementable de valor. En LAND4, la US vive en la plataforma de backlog. La implementación inicial usa GitHub Issues creados con `.github/ISSUE_TEMPLATE/user-story.yml`; GitHub Projects mantiene su estado operativo.

## Template

```markdown
## Area

| Campo | Valor |
| :--- | :--- |
| Area | Tech / Business / Commercial |

## CU relacionados

| CU | URL |
| :--- | :--- |
| CU-XXX | [URL GitHub a docs-repo/req/<caso-de-uso>/CONTRACT.md en main] |

## Historia

| Campo | Valor |
| :--- | :--- |
| Como | [actor] |
| Quiero | [acción o capacidad] |
| Para | [beneficio o resultado de negocio] |

## Descripción

[Contexto, restricciones y fuera de alcance. Incluye esta sección solo si ayuda a reducir ambigüedad.]

## Criterios de aceptación

| ID | Dado | Cuando | Entonces |
| :--- | :--- | :--- | :--- |
| CA-001 | [contexto inicial] | [acción o evento del usuario] | [resultado observable esperado] |

## Casos de prueba

| ID | CA relacionado | Tipo | Arrange | Act | Assert | Evidencia |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| CP-001 | CA-001 | Unitario / Integración / E2E | [preparación] | [acción] | [validación] | [enlace o nota] |

## Tareas

| ID | Descripción | Estado |
| :--- | :--- | :--- |
| TASK-001 | [descripción] | Backlog |
```

## Estados

GitHub Projects es la fuente canónica del estado:

| Estado | Uso |
| :--- | :--- |
| `Backlog` | Necesidad identificada que aún requiere refinamiento. |
| `Ready` | US completa, verificable y lista para implementación. |
| `In Progress` | Incremento en implementación. |
| `Blocked` | Existe un impedimento explícito. |
| `Done` | Cambio integrado, validado y documentado. |

Una US creada o refinada por el PM debe permanecer en `Backlog`. El estado `Ready` requiere refinamiento y validación posterior.

## Ejemplo

```markdown
## Area

| Campo | Valor |
| :--- | :--- |
| Area | Business |

## Historia

| Campo | Valor |
| :--- | :--- |
| Como | usuario autenticado |
| Quiero | registrar una orden con productos disponibles |
| Para | iniciar el seguimiento comercial de la compra |

## Descripción

La orden solo puede registrarse si el inventario confirma stock disponible. La gestión de pago queda fuera de alcance.

## Criterios de aceptación

| ID | Dado | Cuando | Entonces |
| :--- | :--- | :--- | :--- |
| CA-001 | un usuario autenticado y un producto con stock disponible | el usuario confirma la orden | la orden se registra exitosamente |
```
