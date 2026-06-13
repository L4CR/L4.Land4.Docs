---
artifact: CU
id: CU-001
---
# CU-001 - Registro de comercio
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
| Comercio | Negocio solicitante |
## Actores
| Tipo | Actor | Responsabilidad |
| :--- | :--- | :--- |
| Principal | Comercio | Registrar datos |
## Precondiciones
| ID | Condición |
| :--- | :--- |
| PRE-01 | Correo disponible |
## Flujo principal
| Paso | Actor | Acción |
| :--- | :--- | :--- |
| 1 | Comercio | Envía datos válidos |
## Flujos alternos
| ID | Paso origen | Condición | Flujo | Resultado |
| :--- | :--- | :--- | :--- | :--- |
| ALT-01 | 1 | Correo duplicado | Mostrar error | Finaliza |
## Postcondiciones
| ID | Condición |
| :--- | :--- |
| POST-01 | Comercio registrado |
## Reglas de negocio
| ID | Nombre | Descripción / Restricción |
| :--- | :--- | :--- |
| RN-01 | Correo único | No se repite |
