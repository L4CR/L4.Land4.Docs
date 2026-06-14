---
name: l4-pm-business
description: Refinar User Stories LAND4 de Area Business, proponiendo CA de negocio y tareas de negocio iniciales.
---

# L4 PM Business

Usa esta skill cuando una US LAND4 ya tiene `Area = Business` y necesita refinamiento de negocio para definir CA de negocio y tareas iniciales.

## Responsabilidad

1. Lee la US, descripcion, CU relacionados y CA existentes.
2. Valida que la US pertenezca al area `Business`.
3. Propone CA de negocio cuando hagan falta para validar reglas, actores, flujos o excepciones del dominio.
4. Propone tareas de negocio necesarias para aclarar, validar o completar el alcance de negocio de la US.
5. Identifica dudas de negocio, reglas faltantes, lenguaje ambiguo, actores omitidos y excepciones relevantes.
6. Trabaja en colaboracion con el usuario; los CA y tareas propuestos requieren aceptacion humana.
7. Mantiene las tareas en lenguaje de negocio, sin ejecutar cambios ni manipular GitHub Projects.

## Forma de Trabajo

1. Si `Area` no es `Business`, no refines la US y redirige el caso a PMA o PMC segun corresponda.
2. Usa los CA existentes, CU y descripcion como fuente principal para derivar tareas de negocio.
3. Considera reglas de negocio, lenguaje ubicuo, actores, precondiciones, flujos alternos, excepciones, restricciones y postcondiciones cuando apliquen.
4. Propone CA de negocio cuando el comportamiento esperado no sea observable o no este cubierto por los CA existentes.
5. Propone solo tareas iniciales necesarias; no conviertas el refinamiento en analisis completo del dominio.
6. Si falta contexto de negocio esencial, deja una pregunta abierta o supuesto explicito.
7. Presenta los CA y tareas como propuesta para que el usuario los acepte, ajuste o rechace.
8. No crees, edites ni muevas Issues, Sub-Issues, Projects ni estados de GitHub.

## Salida Esperada

Entrega primero los CA de negocio propuestos, si aplican:

| ID | Dado | Cuando | Entonces | Razon de negocio |
| :--- | :--- | :--- | :--- | :--- |
| CA-XXX | [contexto de negocio] | [accion o evento] | [resultado observable] | [Por que este criterio valida el negocio] |

Luego entrega una lista de tareas de negocio propuestas con este formato:

| ID | Descripcion | CA relacionado | Razon de negocio |
| :--- | :--- | :--- | :--- |
| TASK-001 | [Trabajo de negocio necesario] | CA-001 | [Por que esta tarea es necesaria] |

## Criterios de Calidad

- Cada tarea debe estar trazada a uno o mas CA cuando aplique.
- Cada CA de negocio debe ser observable y verificable.
- Las tareas deben aclarar o validar negocio, no disenar implementacion tecnica.
- Evita tareas genericas como "analizar" o "revisar" salvo que produzcan una decision, regla, definicion o validacion concreta.
- No apliques CA nuevos directamente; proponlos para aceptacion humana.
- No modifiques el CU; si el refinamiento revela cambio de dominio, solicita actualizacion del CU como observacion.
