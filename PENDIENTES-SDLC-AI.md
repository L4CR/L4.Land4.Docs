# Pendientes SDLC + AI LAND4

Notas de continuidad para retomar el diseño y la implementación del estándar en la siguiente sesión.

## GitHub Projects y Backlog

- Revisar y mejorar la skill organizacional `l4-gh-kanban-manager` en `L4.Land4.Core.Packages/packages/skills/l4-gh-kanban-manager`:
  - Alinear permisos, scripts, estados y Custom Issue Types con el SDLC + AI.
  - Enfocarla como skill complementaria reutilizable por otros skills que no manipulan GitHub Projects directamente.
- Confirmado hasta ahora:
  - En GitHub no existen US nativas del flujo; se usa un `Issue` con `Issue Type = User Story`.
  - Los `Task`, `Test Case` y `Bug` tambien son `Issue Types` nativos.
  - `Area` vive como `Custom Field` del Project con valores `Tech`, `Business` y `Commercial`.
  - La relacion `User Story -> Task` y `User Story -> Test Case` se implementa con `Sub-Issues`.
  - `l4-gh-kanban-manager` no redacta contenido ni tiene templates propios; toma artefactos ya definidos en `.tmp/user-stories/<user-story-name>/` y solo administra GitHub Projects / Issues.
- Estado implementado en `l4-gh-kanban-manager`:
  - Script para crear `User Story` desde `.tmp/user-stories/<user-story-name>/us.md`, ligarla al Milestone, setear `Area`, agregarla al Project y dejarla en `Backlog`.
  - Script para crear `Task` como `Sub-Issues` desde `.tmp/user-stories/<user-story-name>/tasks/*.md`.
  - Script para mover una `User Story` a `Ready`.
  - Script para mover una `User Story` a `In Progress`.
  - Script para crear `Test Case` como `Sub-Issues` desde `.tmp/user-stories/<user-story-name>/test-cases/*.md`.
  - Metadata local `.github-kanban.json` por cada carpeta de US para persistir `issue number`, `url`, `area`, `milestone` y artefactos ya publicados.
- Definir cómo recuperar prioridad, milestone, asignados, `Area`, `Issue Type` y relaciones padre-hijo sin duplicar datos.
- Proxima sesion:
  - Probar el flujo con una US real de punta a punta sobre GitHub.
  - Validar el contrato real de `us.md`, `tasks/*.md` y `test-cases/*.md` contra los scripts.
  - Ajustar fricción en nombres de secciones, formato Markdown, `Issue Types`, `Area` y relaciones `Sub-Issue`.

## Casos de Uso

- Confirmar si una US puede relacionarse con varios CU o si debe existir un CU principal y CU secundarios.
- Afinar el esquema de `docs-repo/req/<caso-de-uso>/CONTRACT.md` con casos reales.
- Revisar estados, versionado y convenciones de identificación de los CU.
- Validar qué secciones son siempre obligatorias y cuáles pueden ser opcionales.

## Extracción y Prompting

- Ejecutar extracción y generación de plan al pasar la US de `Ready` a `In Progress`, no como prerrequisito para `Ready`.
- Adaptar `GitHubBacklogAdapter` para usar datos completos de GitHub Projects CLI y Sub-Issues.
- Revisar el contrato normalizado `context.json` después de probar una US real.
- Alinear el extractor global con la interfaz central de `l4-architect` para evitar divergencias.
- Definir prompts especializados por rol: Architect, Implementer, Refactorizer, QA y Reviewer.
- Evaluar si el prompt debe incluir contexto técnico adicional del repositorio además de US y CU.
- Mantener generación determinista: mismas entradas, mismo rol y mismo checkout deben producir los mismos bytes.

## Skills y Agentes

- Estado actual:
  - `l4-pm`: ayuda a redactar CU, CA y US.
  - `l4-pm-architect`: refina US `Tech`, propone CA tecnicos y tareas tecnicas.
  - `l4-pm-business`: refina US `Business`, propone CA y tareas de negocio.
  - `l4-pm-commercial`: refina US `Commercial`, propone CA y tareas comerciales.
  - `l4-architect`: genera contexto, prompt y plan temporal desde insumos locales.
- Flujo confirmado entre skills:
  - `l4-pm` trabaja con templates y deja la US lista localmente en `.tmp/user-stories/<user-story-name>/us.md` con secciones en ingles para `Story`, `Acceptance Criteria`, `Description` cuando aplique y links al CU.
  - `l4-gh-kanban-manager` materializa esa US en GitHub como `Issue Type = User Story`, la asocia a Milestone, setea `Area` en Project y la deja en `Backlog`.
  - `l4-pm-architect`, `l4-pm-business` o `l4-pm-commercial`, segun `Area`, definen tareas localmente y requieren aprobacion humana antes de que `l4-gh-kanban-manager` cree los `Task` como `Sub-Issues` y mueva la US a `Ready`.
  - `l4-architect` toma la US en `Ready`, usa `l4-gh-kanban-manager` para moverla a `In Progress`, leer el contexto ya definido y crear `Test Case` locales primero; luego `l4-gh-kanban-manager` publica esos `Test Case` como `Sub-Issues`.
- Pendiente por skill:
  - `l4-pm`: actualizar documentacion e instrucciones para que el output operativo quede en `.tmp/user-stories/<user-story-name>/us.md` y no declare `Ready` directamente.
  - `l4-pm-architect`, `l4-pm-business`, `l4-pm-commercial`: alinear salida operativa para generar `tasks/*.md` en `.tmp/user-stories/<user-story-name>/tasks/` sin manipular GitHub.
  - `l4-architect`: alinear salida operativa para generar `test-cases/*.md` en `.tmp/user-stories/<user-story-name>/test-cases/` y separar ese paso de la generacion del plan de implementacion.
  - `l4-gh-kanban-manager`: despues de probar con una US real, limpiar scripts viejos (`create_issue.py`, `update_status.py`, ejemplos heredados) si ya no aportan al flujo nuevo.
- Afinar las skills PM, PMA, PMB y PMC con ejemplos reales de refinamiento.
- Afinar `l4-architect` con una US real y revisar si el plan necesita mas detalle por stack.
- Definir o actualizar las skills Implementer, Refactorizer, QA y Reviewer según el uso efectivo.
- Documentar instalación y uso operativo de Webwright para E2E web con Playwright.
- Definir releases, autenticación y pinning reproducible para instalar skills organizacionales desde `L4.Land4.Core.Packages`.
- Mantener `.agents/skills/` únicamente para skills realmente propias del workspace.

## CI/CD y Gobierno

- Definir stacks reales antes de convertir los esqueletos CI/CD neutrales en pipelines concretos.
- Aplicar en cada repositorio el ruleset de `main` documentado en GitHub Flow y verificar sus checks requeridos reales.
- Definir cómo se registra y valida la revisión automática de Reviewer Codex en PR.
- Afinar quality gates de cobertura, Docs-as-Code, seguridad y despliegue por tipo de proyecto.
- Definir ambientes, verificación posterior y rollback por stack.

## Documentación y Diagramas

- Mantener el diagrama visual privado como material de trabajo:
  - `/private/tmp/LAND4-private/sdlc-ai-architecture.svg`
  - `/private/tmp/LAND4-private/sdlc-ai-architecture.png`
- Decidir posteriormente si se publica una versión simplificada Mermaid en el portal.
- Revisar terminología final del estándar después de ejecutar el primer flujo completo.
