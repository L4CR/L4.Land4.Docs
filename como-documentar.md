---
layout: default
title: ¿Cómo Documentar?
nav_order: 3
---

# 📝 Guía Práctica: ¿Cómo Documentar?

Para garantizar que nuestra documentación técnica se mantenga actualizada y siga el ciclo de vida del código, en **LAND4** aplicamos el concepto de **Docs-as-Code** (Documentación como Código).

Esto significa que la documentación vive junto al código, se versiona en Git y se revisa mediante Pull Requests al igual que el código de producción.

---

## 🏗️ Estructura Estándar en cada Repositorio

Cada repositorio de código en la organización debe mantener la siguiente estructura mínima en su rama principal (`main` o `master`):

```text
nombre-del-repositorio/
├── README.md                # Entrada del repositorio en GitHub
├── index.md                 # Entrada publicada del repositorio e índice principal
├── docker-compose.yml       # Ambiente local versionado, si el repo usa contenedores
├── docs/                    # Carpeta para Documentación TÉCNICA
│   ├── index.md             # Índice de la documentación técnica publicada
│   ├── arquitectura.md      # Diseño del sistema, diagramas, decisiones técnicas
│   └── despliegue.md        # Pasos y requerimientos para validar y desplegar en ambientes
├── req/                     # Carpeta para Requerimientos de NEGOCIO (Casos de Uso)
│   └── CU-01-registro.md    # Especificaciones funcionales y flujos de negocio
├── procesos/                # Solo si el repositorio define procesos propios
└── ... (código fuente)
```

### 1. El archivo `README.md` (Entrada del repositorio)
Es la entrada del repositorio cuando se navega desde GitHub. Debe ser conciso y proporcionar una visión general del sistema sin intentar reemplazar la documentación publicada. Evita poner guías extensas aquí; en su lugar, utiliza enlaces a `/docs`, `/req`, procesos relevantes y a la GitHub Page del propio repositorio cuando exista. Un buen `README.md` contiene:
*   Una breve descripción de qué hace el proyecto.
*   Enlace a la documentación técnica: `[Documentación Técnica](docs/index.md)`.
*   Enlace rápido a la arquitectura cuando aplique: `[Arquitectura y Diseño](docs/arquitectura.md)`.
*   Enlace rápido a la guía de despliegue y validación local cuando aplique: `[Despliegue](docs/despliegue.md)`.
*   Enlace a la documentación publicada del propio repositorio en GitHub Pages.
*   Enlace al catálogo central publicado: `[Catálogo de Sistemas](https://l4cr.github.io/L4.docs-organizacion/docs/repositorios)`.
*   Enlaces a casos de uso o historias relevantes cuando existan en `/req`.

### 2. El archivo `index.md` (Entrada publicada)
Es la página principal del repositorio cuando su documentación se publica en GitHub Pages. Debe funcionar como índice navegable y reflejar la jerarquía real del menú:
*   Enlace a `README.md` solo si aporta contexto para colaboradores en GitHub.
*   Enlace a `docs/index.md` como entrada de la documentación técnica.
*   Enlaces a `/req`, `/procesos` u otras secciones cuando apliquen.
*   Enlaces a páginas hijas solo si ayudan a navegar sin duplicar contenido.

### 3. La carpeta `/docs` (Documentación técnica publicada)
Aquí vive el grueso del conocimiento de implementación y la entrada navegable de la documentación técnica del repositorio. Divide el contenido en archivos temáticos:
*   `index.md`: Índice de la documentación técnica publicada del repositorio. Debe enlazar a arquitectura, despliegue, catálogo interno o cualquier otra página técnica que aplique.
*   `arquitectura.md`: Diagramas de arquitectura (usando **Mermaid**), decisiones técnicas importantes (ADRs) y dependencias con otros servicios.
*   `despliegue.md`: Ambientes, incluyendo local, configuración de CI/CD, variables requeridas, pasos de publicación, rollback y cómo validar que el despliegue fue exitoso.

#### Qué debe contener `docs/despliegue.md`

Cada repositorio que tenga despliegue propio debe documentar su operación real, no una guía genérica. Como mínimo debe incluir:

*   **Ambientes:** local, CI, staging, producción u otros ambientes aplicables, con propósito y forma de acceso.
*   **Requerimientos:** herramientas, versiones, permisos, secretos y variables de entorno necesarias, sin exponer valores sensibles.
*   **Validación local:** comandos para compilar, probar o levantar el sistema antes del Pull Request como parte del ambiente local.
*   **Pipeline CI/CD:** archivo o servicio que ejecuta el despliegue, rama que lo dispara y condiciones de publicación.
*   **Pasos de despliegue:** qué ocurre desde el merge hasta que el cambio queda publicado.
*   **Verificación posterior:** checks mínimos para confirmar que el despliegue fue exitoso.
*   **Rollback o recuperación:** cómo volver a un estado anterior o dónde escalar si falla.
*   **Relación implementación-documentación:** cualquier cambio en infraestructura, pipeline, ambientes, variables, contenedores o assets requeridos debe actualizar `docs/despliegue.md` en el mismo Pull Request.

Además, si el repositorio se registra en el catálogo central, debe publicar su documentación en GitHub Pages para que el catálogo apunte a la documentación navegable, no a archivos Markdown crudos en GitHub.

### 4. La carpeta `/req` (Requerimientos de Negocio)
Esta carpeta se utiliza de forma opcional pero recomendada cuando el proyecto implementa lógicas complejas que requieren alineación con el lenguaje de negocio o de cara al cliente:
*   Contiene casos de uso redactados en lenguaje no técnico, facilitando la comprensión y validación entre ingenieros y tomadores de decisiones/Product Owners.
*   Usa archivos con nombres representativos (ej. `CU-01-registro-comercio.md`) basados en la **[Plantilla de Caso de Uso del Portal](req/CASO_USO_TEMPLATE.md)**.

### 5. La carpeta `/procesos` (Procesos del Repositorio)
Esta carpeta solo debe existir cuando el repositorio necesite documentar procesos propios que no estén cubiertos por el portal central. Para el flujo estándar de ramas, Pull Requests, CI y entregas, usa el **[GitHub Flow LAND4](procesos/github-flow.md)** del portal.

---

## 🌟 Buenas Prácticas de Redacción

1. **Usa Markdown Estándar:** Mantén el formato simple. Usa negrita para enfatizar, listas para pasos secuenciales y bloques de código con su lenguaje específico para sintaxis coloreada.
2. **Diagramas con Mermaid:** En lugar de subir imágenes estáticas (que no se pueden editar fácilmente), utiliza bloques de `mermaid` para crear diagramas de flujo o arquitectura secuenciales. Ejemplo:
   ```text
   ```mermaid
   sequenceDiagram
       Usuario->>API Gateway: GET /perfil
       API Gateway->>Microservicio: Validar Token
   ```
   ```
3. **No dupliques información:** Si algo ya está documentado de forma global en este portal central (como la configuración del Slack o VPN corporativa), no lo vuelvas a escribir en tu repositorio. Pon un enlace a este portal.
4. **Mantén las credenciales seguras:** **NUNCA** guardes contraseñas, tokens de API o archivos `.env` reales en los repositorios de documentación. Utiliza plantillas de ejemplo (como `.env.example`).

---

## 🔄 Proceso de Actualización

Cuando agregues una nueva funcionalidad, cambies una variable de entorno o modifiques la base de datos:

1. Crea tu rama de Git para desarrollar la funcionalidad.
2. Realiza los cambios en el código **y edita los archivos correspondientes en `README.md`, `docs/` o `req/` en esa misma rama**.
3. Envía tu Pull Request. El revisor evaluará tanto la calidad del código como que la documentación refleje el nuevo cambio.
4. Una vez fusionado en `main`, tu documentación estará actualizada.
