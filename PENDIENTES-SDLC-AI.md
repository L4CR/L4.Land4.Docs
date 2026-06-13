# Pendientes SDLC + AI LAND4

Notas de continuidad para retomar el diseño y la implementación del estándar en la siguiente sesión.

## GitHub Projects y Backlog

- Revisar y mejorar la skill local `l4-gh-kanban-manager`:
  - Fuente actual: `/Users/lan4mena/.agents/skills/l4-gh-kanban-manager/SKILL.md`.
  - Alinear permisos, scripts, estados y Custom Issue Types con el SDLC + AI.
- Leer la US y su estado mediante GitHub Projects CLI.
- Modelar las tareas de una US como Sub-Issues relacionados con Custom Issue Type `Task`.
- Eliminar la tabla de tareas del cuerpo del Issue cuando el adaptador soporte Sub-Issues.
- Definir cómo recuperar prioridad, milestone, asignados y relaciones padre-hijo sin duplicar datos.
- Ejecutar el flujo con una US real para identificar fricción y ajustar el esquema.

## Casos de Uso

- Confirmar si una US puede relacionarse con varios CU o si debe existir un CU principal y CU secundarios.
- Afinar el esquema de `docs-repo/req/<caso-de-uso>/CONTRACT.md` con casos reales.
- Revisar estados, versionado y convenciones de identificación de los CU.
- Validar qué secciones son siempre obligatorias y cuáles pueden ser opcionales.

## Extracción y Prompting

- Adaptar `GitHubBacklogAdapter` para usar datos completos de GitHub Projects CLI y Sub-Issues.
- Revisar el contrato normalizado `context.json` después de probar una US real.
- Definir prompts especializados por rol: Architect, Implementer, Refactorizer, QA y Reviewer.
- Evaluar si el prompt debe incluir contexto técnico adicional del repositorio además de US y CU.
- Mantener generación determinista: mismas entradas, mismo rol y mismo checkout deben producir los mismos bytes.

## Skills y Agentes

- Afinar las skills PM, PMA, PMB y PMC con ejemplos reales de refinamiento.
- Afinar las skills Architect, Implementer, Refactorizer, QA y Reviewer según el uso efectivo.
- Documentar instalación y uso operativo de Webwright para E2E web con Playwright.
- Decidir qué skills serán globales, cuáles vivirán en el portal central y cuáles serán específicas por repositorio.

## CI/CD y Gobierno

- Definir stacks reales antes de convertir los esqueletos CI/CD neutrales en pipelines concretos.
- Establecer branch protection, checks requeridos y aprobación humana mínima.
- Definir cómo se registra y valida la revisión automática de Reviewer Codex en PR.
- Afinar quality gates de cobertura, Docs-as-Code, seguridad y despliegue por tipo de proyecto.
- Definir ambientes, verificación posterior y rollback por stack.

## Documentación y Diagramas

- Mantener el diagrama visual privado como material de trabajo:
  - `/private/tmp/LAND4-private/sdlc-ai-architecture.svg`
  - `/private/tmp/LAND4-private/sdlc-ai-architecture.png`
- Decidir posteriormente si se publica una versión simplificada Mermaid en el portal.
- Revisar terminología final del estándar después de ejecutar el primer flujo completo.
