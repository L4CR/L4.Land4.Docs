---
layout: default
title: ¿Cómo Documentar?
nav_order: 3
---

# 📝 Guía Práctica: ¿Cómo Documentar en LAND4?

Para garantizar que nuestra documentación técnica se mantenga actualizada y siga el ciclo de vida del código, en **LAND4** aplicamos el concepto de **Docs-as-Code** (Documentación como Código).

Esto significa que la documentación técnica específica de un sistema vive en su propio repositorio de Git y se revisa mediante Pull Requests al igual que el código de producción.

---

## 🏗️ Estructura Estándar en cada Repositorio

Cada repositorio de código en la organización debe mantener la siguiente estructura mínima en su rama principal (`main` o `master`):

```text
nombre-del-repositorio/
├── docs/
│   ├── arquitectura.md      # Diseño del sistema, diagramas, decisiones técnicas
│   ├── setup.md             # Guía paso a paso para levantar el entorno local
│   └── despliegue.md        # Pasos y requerimientos para desplegar en ambientes
├── README.md                # Presentación rápida del proyecto y accesos directos
└── ... (código fuente)
```

### 1. El archivo `README.md` (La Entrada)
Debe ser conciso y proporcionar una visión general del sistema. Evita poner guías gigantes de instalación aquí; en su lugar, utiliza enlaces a la carpeta `/docs`. Un buen `README.md` contiene:
*   Una breve descripción de qué hace el proyecto.
*   Tecnologías principales (ej. Node.js, React, Python).
*   Enlace rápido a la guía de desarrollo local: `[Guía de Setup Local](docs/setup.md)`.
*   Enlace rápido a la arquitectura: `[Arquitectura y Diseño](docs/arquitectura.md)`.

### 2. La carpeta `/docs` (Detalle Técnico)
Aquí vive el grueso del conocimiento. Divide el contenido en archivos temáticos (evita un único archivo gigante de 5000 líneas):
*   `setup.md`: Requisitos previos (Docker, variables de entorno, comandos de base de datos) y comandos para iniciar el proyecto.
*   `arquitectura.md`: Diagramas de arquitectura (idealmente usando **Mermaid**), decisiones técnicas importantes (ADRs) y dependencias con otros servicios.
*   `despliegue.md`: Configuración de CI/CD, variables de producción y cómo validar que el despliegue fue exitoso.

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
2. Realiza los cambios en el código **y edita los archivos correspondientes en `docs/` o el `README.md` en esa misma rama**.
3. Envía tu Pull Request. El revisor evaluará tanto la calidad del código como que la documentación refleje el nuevo cambio.
4. Una vez fusionado en `main`, tu documentación estará actualizada.
