---
layout: default
title: CI/CD Standard
parent: Documentación Técnica
nav_order: 7
permalink: /docs/ci-cd-standard.html
---

# CI/CD Standard

Los repositorios LAND4 deben adaptar un pipeline al stack real del proyecto. El portal publica esqueletos copiables en `docs-repo/assets/workflow-templates/`; no impone package manager, framework ni proveedor de despliegue.

## Etapas esperadas

| Etapa | Regla |
| :--- | :--- |
| Checkout e instalación | Versionar runtime y comando real del stack. |
| Lint y análisis estático | Fallar ante incumplimientos acordados. |
| Build | Comprobar que el entregable compila. |
| Pruebas | Ejecutar unitarias, integración y E2E cuando apliquen. |
| Cobertura | Exigir el umbral versionado por el repositorio; default `80%`. |
| Docs-as-Code | Validar documentación modificada y registrar `actualizada` o `N/A` justificado. |
| Security scan | Ejecutar controles compatibles con el stack. |
| Review y aprobación | Reviewer Codex externo y al menos una aprobación humana. |
| Deploy | Adaptar ambientes, secretos, verificación y rollback al proyecto. |

Branch protection debe impedir el merge si fallan checks requeridos o falta aprobación humana.
