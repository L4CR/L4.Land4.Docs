---
name: crear-sitio-astro
description: Skill para la creación automatizada de sitios web utilizando Astro, siguiendo las mejores prácticas de arquitectura y rendimiento.
---

# Skill: Crear Sitio Astro

Esta skill proporciona las instrucciones para que el agente construya proyectos web basados en Astro JS.

## Instrucciones Principales

1. **Inicialización**: Utilizar `npm create astro@latest` (o `pnpm`, `yarn` según se prefiera) para iniciar el proyecto, usando la bandera `--yes` para automatizar.
2. **Estructura del Proyecto**: Asegurar una estructura modular con directorios para `src/components`, `src/layouts`, y `src/pages`.
3. **Estilos**: Configurar Tailwind CSS (u otro sistema requerido por el usuario) integrándolo correctamente en Astro.
4. **Optimización**: Asegurar el uso de componentes de imagen (`<Image />`) de Astro y optimizar para SEO.

## Referencias

Si se requieren guías detalladas de arquitectura o SEO, consultar en el directorio `references/` (por crear según necesidades del proyecto).

## Scripts

Los comandos de construcción y desarrollo (`npm run dev`, `npm run build`) deben utilizarse para validar el sitio localmente.
