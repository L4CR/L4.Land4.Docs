---
layout: default
title: GitHub Flow LAND4
parent: Procesos
nav_order: 1
---

# 🔄 GitHub Flow LAND4

Este documento vive en `/procesos` porque define una forma de trabajo transversal. Explica cómo una **Historia de Usuario (HU)** avanza desde una necesidad validada por negocio hasta una entrega integrada en `main`. Es el punto de unión operativo entre Producto y TI: Producto define el valor esperado y los criterios de aceptación; TI implementa, prueba, integra y documenta el cambio.

---

## 🧭 Principio base

En LAND4 utilizamos **GitHub Flow**:

1. Todo cambio parte desde `main`.
2. El trabajo se realiza en una rama corta.
3. La integración ocurre mediante Pull Request.
4. El Pull Request debe pasar CI y revisión.
5. El cierre se realiza con `Squash merge`.
6. `main` representa el estado integrado y entregable.

---

## 🔗 Relación entre HU y entrega

```mermaid
flowchart TD
    CU[Caso de Uso o necesidad validada] --> Backlog[HU: Backlog]
    Backlog --> Ready[HU: Ready]
    Ready --> Branch[Rama desde main]
    Branch --> Progress[HU: In Progress]
    Progress --> PR[Pull Request hacia main]
    Progress --> Blocked[HU: Blocked]
    Blocked --> Progress
    PR --> CI[CI verde]
    CI --> Review[Revisión técnica]
    Review --> PO[Validación PO si aplica]
    PO --> Merge[Squash merge a main]
    Review --> Merge
    Merge --> Done[HU: Done]
```

La HU define el alcance y los criterios de aceptación. El Pull Request demuestra que el cambio fue implementado, revisado e integrado conforme a esos criterios.

---

## 📌 Estados de la Historia de Usuario

| Estado | Significado | Responsabilidad principal |
| :--- | :--- | :--- |
| **Backlog** | La necesidad existe, pero aún no está lista para desarrollo. | Producto |
| **Ready** | La HU tiene alcance, criterios de aceptación y prioridad suficiente para iniciar. | Producto + TI |
| **In Progress** | La implementación está en desarrollo en una rama de trabajo. | Desarrollo |
| **Blocked** | Existe un impedimento que impide avanzar o validar la HU. | Responsable del bloqueo |
| **Done** | El cambio está integrado en `main`, con CI verde, revisión aprobada y documentación actualizada si aplica. | Producto + TI |

Una HU no debe pasar a `Ready` si sus criterios de aceptación no son verificables. Una HU no debe pasar a `Done` si el Pull Request relacionado no fue integrado a `main`.

---

## 🌿 Ramas de trabajo

Toda rama debe crearse desde `main` y representar una HU o un cambio pequeño y trazable.

Formato recomendado:

```text
feature/HU-id-descripcion
```

Ejemplos:

```text
feature/HU-001-registro-comercio
feature/HU-014-validacion-correo
```

Para cambios que no nacen de una HU, usa un prefijo que describa la intención:

```text
fix/corregir-validacion-identificacion
docs/actualizar-guia-onboarding
chore/ajustar-ci
```

---

## 💻 Desarrollo y pruebas de desarrollador

Durante `In Progress`, la persona desarrolladora debe:

*   Implementar el cambio dentro del alcance de la HU.
*   Revisar los criterios de aceptación aplicables.
*   Ejecutar las pruebas de desarrollador correspondientes al tipo de repositorio.
*   Actualizar `README.md`, `/docs` o `/req` cuando el cambio modifique comportamiento, configuración, API, despliegue, reglas de negocio o flujos de usuario.

Las pruebas de desarrollador se registran en el Pull Request como checklist. No se requiere adjuntar evidencias, capturas o logs salvo que el equipo lo solicite explícitamente para un caso puntual.

---

## 🔁 Pull Request

Todo cambio debe integrarse mediante Pull Request hacia `main`. El PR debe ser pequeño, revisable y estar conectado con la HU o motivo del cambio.

LAND4 usa plantillas independientes por tipo de repositorio en `.github/PULL_REQUEST_TEMPLATE/`:

*   `backend.md`
*   `frontend.md`
*   `mobile.md`
*   `infra.md`
*   `docs.md`

Al abrir un PR, utiliza la plantilla que corresponda al repositorio o al cambio principal. Si el cambio toca más de un tipo, usa la plantilla del componente con mayor impacto y marca en el checklist lo que aplique.

Antes de solicitar revisión:

*   La descripción del PR debe indicar la HU relacionada o marcar `N/A`.
*   El tipo de cambio debe estar marcado.
*   Los criterios de aceptación aplicables deben estar chequeados o marcados como `N/A`.
*   Las pruebas de desarrollador aplicables deben estar chequeadas.
*   `README.md`, `/docs` o `/req` deben estar actualizados o marcados como `N/A`.
*   El CI requerido debe estar en verde.

---

## ✅ Aprobaciones

La aprobación mínima para fusionar un PR es:

*   **1 revisor técnico** para validar calidad, mantenibilidad, pruebas, impacto y consistencia con el estándar del repositorio.
*   **Product Owner opcional** cuando el cambio afecte comportamiento funcional, experiencia de usuario, criterios de aceptación, alcance, reglas de negocio o interpretación del valor esperado.

La validación del PO puede marcarse como `N/A`, `Requerido` o `Completado` en el template del PR.

---

## 🚀 Merge y entrega

El cierre estándar del PR es **Squash merge** hacia `main`. Esto deja un historial limpio y permite trazar cada entrega integrada a un PR concreto.

Para LAND4:

*   `main` representa el estado integrado y entregable.
*   Una HU llega a `Done` cuando el PR asociado fue aprobado, pasó CI y fue fusionado a `main`.
*   Si el repositorio tiene despliegue automático, el merge puede iniciar el flujo de entrega correspondiente.
*   Si el repositorio requiere despliegue manual, el merge deja el cambio listo para ese proceso.

---

## 🧾 Documentación relacionada

*   **[Historias de Usuario](../req/historia-usuario.md):** Cómo redactar y estructurar una HU.
*   **[Criterios de Aceptación](../req/criterios-aceptacion.md):** Cómo definir condiciones verificables.
*   **[¿Cómo Documentar?](../como-documentar.md):** Estándar Docs-as-Code para documentación técnica y de negocio.
