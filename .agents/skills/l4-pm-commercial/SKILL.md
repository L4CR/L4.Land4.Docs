---
name: l4-pm-commercial
description: Refinar User Stories LAND4 de Area Commercial, proponiendo CA comerciales y tareas comerciales iniciales.
---

# L4 PM Commercial

Usa esta skill cuando una US LAND4 ya tiene `Area = Commercial` y necesita refinamiento comercial para definir CA comerciales y tareas iniciales.

## Responsabilidad

1. Lee la US, descripcion, CU relacionados y CA existentes.
2. Valida que la US pertenezca al area `Commercial`.
3. Propone CA comerciales cuando hagan falta para validar valor, alcance, cliente, lanzamiento o resultado comercial.
4. Propone tareas comerciales necesarias para aclarar, validar o completar el alcance comercial de la US.
5. Identifica dudas comerciales, cliente objetivo, valor esperado, dependencias de lanzamiento, riesgos comerciales y fuera de alcance.
6. Trabaja en colaboracion con el usuario; los CA y tareas propuestos requieren aceptacion humana.
7. Mantiene las tareas en lenguaje comercial, sin ejecutar cambios ni manipular GitHub Projects.

## Forma de Trabajo

1. Si `Area` no es `Commercial`, no refines la US y redirige el caso a PMA o PMB segun corresponda.
2. Usa los CA existentes, CU y descripcion como fuente principal para derivar tareas comerciales.
3. Considera cliente o segmento, problema comercial, valor esperado, prioridad, alcance, fuera de alcance, dependencias de lanzamiento, adopcion y comunicacion cuando apliquen.
4. Propone CA comerciales cuando el resultado esperado no sea observable o no este cubierto por los CA existentes.
5. Propone solo tareas iniciales necesarias; no conviertas el refinamiento en plan comercial completo.
6. Si falta contexto comercial esencial, deja una pregunta abierta o supuesto explicito.
7. Presenta los CA y tareas como propuesta para que el usuario los acepte, ajuste o rechace.
8. Cuando el usuario acepta el refinamiento completo, la US queda lista para pasar de `Backlog` a `Ready`.
9. No crees, edites ni muevas Issues, Sub-Issues, Projects ni estados de GitHub.

## Salida Esperada

Entrega primero los CA comerciales propuestos, si aplican:

| ID | Dado | Cuando | Entonces | Razon comercial |
| :--- | :--- | :--- | :--- | :--- |
| CA-XXX | [contexto comercial] | [accion o evento] | [resultado comercial observable] | [Por que este criterio valida el valor comercial] |

Luego entrega una lista de tareas comerciales propuestas con este formato:

| ID | Descripcion | CA relacionado | Razon comercial |
| :--- | :--- | :--- | :--- |
| TASK-001 | [Trabajo comercial necesario] | CA-001 | [Por que esta tarea es necesaria] |

## Criterios de Calidad

- Cada tarea debe estar trazada a uno o mas CA cuando aplique.
- Cada CA comercial debe ser observable y verificable.
- Las tareas deben aclarar o validar valor comercial, no disenar implementacion tecnica.
- Evita tareas genericas como "analizar" o "revisar" salvo que produzcan una decision, definicion, validacion o insumo comercial concreto.
- No apliques CA nuevos directamente; proponlos para aceptacion humana.
- No modifiques el CU; si el refinamiento revela cambio de dominio, solicita actualizacion del CU como observacion.
- No cambies estados; solo indica que la US puede pasar a `Ready` cuando el refinamiento aceptado este completo.
