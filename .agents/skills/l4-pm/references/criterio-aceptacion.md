# Criterio de Aceptación (CA)

Usa esta referencia solo cuando el usuario necesite crear o corregir criterios de aceptación. La estructura debe mantenerse consistente con `docs-repo/req/criterios-aceptacion.md`.

Los CA son condiciones verificables para aceptar una US. Viven en el Issue de la US, no en el CU.

## Template BDD

| ID | Dado | Cuando | Entonces |
| :--- | :--- | :--- | :--- |
| CA-001 | [contexto inicial] | [acción o evento del usuario] | [resultado observable esperado] |

## Redacción Gherkin Equivalente

Cuando el usuario pida el CA en Gherkin, conserva el mismo contenido del formato BDD:

```gherkin
CA-001: [Nombre del criterio]
Dado [contexto inicial]
Cuando [acción o evento del usuario]
Entonces [resultado observable esperado]
```

## Reglas

- Usa IDs `CA-XXX` únicos dentro de la US.
- Describe comportamiento observable de negocio, no detalles de implementación.
- Delimita errores, permisos y restricciones cuando apliquen.
- Mapea cada CA al menos a un Caso de Prueba (CP).
- Un CA ambiguo no permite mover la US a `Ready`.

## Ejemplo

| ID | Dado | Cuando | Entonces |
| :--- | :--- | :--- | :--- |
| CA-001 | un usuario autenticado y un producto con stock disponible | el usuario confirma la orden | la orden se registra exitosamente y queda disponible para seguimiento |

Equivalente Gherkin:

```gherkin
CA-001: Registrar orden con stock disponible
Dado un usuario autenticado y un producto con stock disponible
Cuando el usuario confirma la orden
Entonces la orden se registra exitosamente y queda disponible para seguimiento
```
