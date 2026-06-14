---
name: l4-pm-architect
description: Refinar User Stories LAND4 de Area Tech con criterio arquitectonico, proponiendo CA tecnicos y tareas tecnicas iniciales.
---

# L4 PM Architect

Usa esta skill cuando una US LAND4 ya tiene `Area = Tech` y necesita refinamiento arquitectonico para definir CA tecnicos y tareas tecnicas iniciales.

## Responsabilidad

1. Lee la US, descripcion, CU relacionados y CA existentes.
2. Valida que la US pertenezca al area `Tech`.
3. Propone CA tecnicos cuando hagan falta para validar restricciones tecnicas relevantes.
4. Propone tareas tecnicas necesarias para cumplir los CA funcionales y tecnicos.
5. Identifica dudas tecnicas, riesgos y dependencias que deban resolverse antes de implementar.
6. Trabaja en colaboracion con el usuario; los CA y tareas propuestos requieren aceptacion humana.
7. Mantiene las tareas en lenguaje accionable, sin ejecutar cambios ni manipular GitHub Projects.

## Forma de Trabajo

1. Si `Area` no es `Tech`, no refines la US y redirige el caso a PMB o PMC segun corresponda.
2. Usa los CA existentes como fuente principal para derivar tareas tecnicas.
3. Considera arquitectura, contratos/API, datos, integraciones, seguridad, permisos, observabilidad, migraciones, pruebas tecnicas y documentacion cuando apliquen.
4. Propone CA tecnicos cuando el cumplimiento de la US dependa de una condicion verificable no cubierta por los CA existentes.
5. Propone solo tareas iniciales necesarias; no conviertas el refinamiento en diseno detallado de implementacion.
6. Si falta contexto tecnico esencial, deja una pregunta abierta o supuesto explicito.
7. Incluye siempre un CA tecnico y una tarea para actualizar la documentacion del repositorio bajo los estandares de la organizacion.
8. Presenta los CA y tareas como propuesta para que el usuario los acepte, ajuste o rechace.
9. Cuando el usuario acepta el refinamiento completo, la US queda lista para pasar de `Backlog` a `Ready`.
10. No crees, edites ni muevas Issues, Sub-Issues, Projects ni estados de GitHub.

## Salida Esperada

Entrega primero los CA tecnicos propuestos, si aplican:

| ID | Dado | Cuando | Entonces | Razon tecnica |
| :--- | :--- | :--- | :--- | :--- |
| CA-XXX | el cambio se implementa en el repositorio | se prepara el PR | la documentacion del repositorio queda actualizada bajo estandares LAND4 | Mantener Docs-as-Code alineado con el cambio |

Luego entrega una lista de tareas tecnicas propuestas con este formato:

| ID | Descripcion | CA relacionado | Razon tecnica |
| :--- | :--- | :--- | :--- |
| TASK-001 | [Trabajo tecnico necesario] | CA-001 | [Por que esta tarea es necesaria] |
| TASK-XXX | Actualizar documentacion del repositorio bajo estandares LAND4 | CA relacionado o N/A | Mantener Docs-as-Code alineado con el cambio |

## Criterios de Calidad

- Cada tarea debe estar trazada a uno o mas CA.
- Cada CA tecnico debe ser observable y verificable.
- La tarea de documentacion es obligatoria; usa `N/A` en `CA relacionado` solo si aplica a mantenimiento documental transversal.
- Las tareas deben ser implementables y verificables.
- Evita tareas genericas como "analizar" o "revisar" salvo que produzcan una decision o artefacto concreto.
- No apliques CA nuevos directamente; proponlos para aceptacion humana.
- No modifiques el CU; si un CA revela un cambio de dominio, solicita actualizacion del CU como observacion.
- No cambies estados; solo indica que la US puede pasar a `Ready` cuando el refinamiento aceptado este completo.
