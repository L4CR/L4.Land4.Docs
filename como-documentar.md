---
layout: default
title: ¿Cómo Documentar?
nav_order: 3
---

# 📝 Guía Práctica: ¿Cómo Documentar en LAND4?

Para garantizar que nuestra documentación técnica se mantenga actualizada y siga el ciclo de vida del código, en **LAND4** aplicamos el concepto de **Docs-as-Code** (Documentación como Código).

Esto significa que la documentación vive junto al código, se versiona en Git y se revisa mediante Pull Requests al igual que el código de producción.

---

## 🏗️ Estructura Estándar en cada Repositorio

Cada repositorio de código en la organización debe mantener la siguiente estructura mínima en su rama principal (`main` o `master`):

```text
nombre-del-repositorio/
├── README.md                # Entrada principal del proyecto
├── docs/                    # Carpeta para Documentación TÉCNICA
│   ├── arquitectura.md      # Diseño del sistema, diagramas, decisiones técnicas
│   ├── setup.md             # Guía paso a paso para levantar el entorno local
│   └── despliegue.md        # Pasos y requerimientos para desplegar en ambientes
├── req/                     # Carpeta para Requerimientos de NEGOCIO (Casos de Uso)
│   └── CU-01-registro.md    # Especificaciones funcionales y flujos de negocio
├── procesos/                # Solo si el repositorio define procesos propios
└── ... (código fuente)
```

### 1. El archivo `README.md` (La Entrada)
Es el índice principal del repositorio. Debe ser conciso y proporcionar una visión general del sistema. Evita poner guías extensas aquí; en su lugar, utiliza enlaces a `/docs`, `/req` y procesos relevantes. Un buen `README.md` contiene:
*   Una breve descripción de qué hace el proyecto.
*   Tecnologías principales (ej. Node.js, React, Python).
*   Enlace rápido a la guía de desarrollo local: `[Guía de Setup Local](docs/setup.md)`.
*   Enlace rápido a la arquitectura: `[Arquitectura y Diseño](docs/arquitectura.md)`.
*   Enlace al catálogo central: `[Catálogo de Sistemas](https://github.com/L4CR/L4.docs-organizacion/blob/main/repositorios.md)`.
*   Enlaces a casos de uso o historias relevantes cuando existan en `/req`.

### 2. La carpeta `/docs` (Detalle Técnico)
Aquí vive el grueso del conocimiento de implementación. Divide el contenido en archivos temáticos:
*   `setup.md`: Requisitos previos (Docker, variables de entorno, comandos de base de datos) y comandos para iniciar el proyecto.
*   `arquitectura.md`: Diagramas de arquitectura (usando **Mermaid**), decisiones técnicas importantes (ADRs) y dependencias con otros servicios.
*   `despliegue.md`: Configuración de CI/CD, variables de producción y cómo validar que el despliegue fue exitoso.

### 3. La carpeta `/req` (Requerimientos de Negocio)
Esta carpeta se utiliza de forma opcional pero recomendada cuando el proyecto implementa lógicas complejas que requieren alineación con el lenguaje de negocio o de cara al cliente:
*   Contiene casos de uso redactados en lenguaje no técnico, facilitando la comprensión y validación entre ingenieros y tomadores de decisiones/Product Owners.
*   Usa archivos con nombres representativos (ej. `CU-01-registro-comercio.md`) basados en la **[Plantilla de Caso de Uso del Portal](req/CASO_USO_TEMPLATE.md)**.

### 4. La carpeta `/procesos` (Procesos del Repositorio)
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
