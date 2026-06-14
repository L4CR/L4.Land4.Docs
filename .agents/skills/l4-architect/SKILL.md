---
name: l4-architect
description: Crear contexto, prompt determinista y plan de implementacion LAND4 para una US Ready desde insumos locales, sin leer GitHub Projects.
---

# L4 Architect

Usa esta skill cuando una US LAND4 ya esta en estado `Ready` y otro flujo preparo insumos locales, por ejemplo un fixture JSON del Issue.

## Responsabilidad

1. Recibe insumos locales; no consulta GitHub, GitHub Projects ni estados remotos.
2. Ejecuta scripts locales del skill para generar `context.json`, `prompt.md` y `implementation-plan.md`.
3. Verifica que el contexto indique `status: Ready`; si no esta `Ready`, detiene el flujo y solicita refinamiento.
4. Usa el prompt generado como fuente principal para crear un plan de implementacion acotado a US, CU, CA y CP.
5. Guarda los artefactos en `.tmp/plans/<user-story>/`.
6. Mantiene `.tmp/plans/` fuera de Git hasta que el humano apruebe el plan.
7. No implementa codigo, no crea PR y no mueve estados.

## Comandos

Usa un slug estable de la US para `<user-story>`.

Flujo completo desde fixture local:

```bash
node --disable-warning=ExperimentalWarning --experimental-strip-types .agents/skills/l4-architect/scripts/extract-agent-context.ts --fixture <issue.json> --out .tmp/plans/<user-story>/context.json
node --disable-warning=ExperimentalWarning --experimental-strip-types .agents/skills/l4-architect/scripts/generate-agent-prompt.ts --context .tmp/plans/<user-story>/context.json --out .tmp/plans/<user-story>/prompt.md
node --disable-warning=ExperimentalWarning --experimental-strip-types .agents/skills/l4-architect/scripts/create-implementation-plan.ts --context .tmp/plans/<user-story>/context.json --prompt .tmp/plans/<user-story>/prompt.md --out .tmp/plans/<user-story>/implementation-plan.md
```

Generar solo plan desde contexto y prompt ya existentes:

```bash
node --disable-warning=ExperimentalWarning --experimental-strip-types .agents/skills/l4-architect/scripts/create-implementation-plan.ts --context <context.json> --prompt <prompt.md> --out .tmp/plans/<user-story>/implementation-plan.md
```

El template del plan vive junto al skill:

```text
.agents/skills/l4-architect/assets/implementation-plan-template.md
```

El ejemplo de referencia vive en:

```text
.agents/skills/l4-architect/assets/implementation-plan-example.md
```

## Plan de Implementacion

El plan generado debe incluir estas secciones:

1. Trazabilidad: Issue, CU, commit, area, estado, CA y CP.
2. Objetivo de la US y alcance.
3. Fuera de alcance.
4. Supuestos, riesgos y preguntas abiertas.
5. Estrategia TDD: orden de pruebas, CP cubiertos, datos de prueba y cobertura esperada.
6. Plan de desarrollo por pasos.
7. Plan de refactor: criterios para simplificar sin cambiar comportamiento.
8. Plan QA: unitarias, integracion, E2E cuando aplique, regresion y evidencia.
9. Documentacion Docs-as-Code que debe actualizarse.
10. Criterios de PR y checks esperados.

## Criterios de Calidad

- El plan debe derivarse del `context.json` y del `prompt.md` recibidos como entrada.
- Usa `assets/implementation-plan-example.md` como guia de nivel de detalle y estilo, no como contenido para copiar literalmente.
- Para el mismo Issue, checkout y prompt generado, el plan debe ser reproducible.
- No inventes alcance fuera de la US, CA, CP o CU.
- No leas GitHub Projects ni ejecutes `gh`; otro skill debe preparar los insumos desde GitHub.
- No implementes codigo durante esta etapa.
- No versiones `.tmp/plans/` ni el plan generado antes de aprobacion humana.
- Si faltan CA, CP, CU, estado `Ready` o trazabilidad, detiene el flujo y reporta el bloqueo.
