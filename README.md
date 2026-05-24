# LAND4 — Portal de Documentación Centralizado

Este repositorio aloja el portal central de documentación e ingeniería de **LAND4**. El sitio web está compilado con **Jekyll** y utiliza el tema **Just the Docs**, desplegándose automáticamente a través de **GitHub Pages**.

## 🏗️ Arquitectura Híbrida de Documentación

En LAND4 seguimos un modelo híbrido:
1. **Portal Central (Este repositorio):** Contiene onboarding, políticas globales, procesos transversales, guías de estilo comunes y el [Catálogo de Sistemas](docs/repositorios.md).
2. **README principal (En cada repositorio):** Es la entrada inicial del proyecto y debe enlazar a la documentación relevante.
3. **Docs Vivas (En cada repositorio):** La documentación detallada e instalación técnica de cada proyecto vive directamente en el directorio `/docs` de su propio repositorio.
4. **Requerimientos vivos (En cada repositorio):** Los casos de uso, historias de usuario y criterios funcionales específicos viven en `/req` cuando el proyecto lo requiera.

Para más detalles, consulta la guía de **[¿Cómo Documentar?](como-documentar.md)**.

---

## 💻 Desarrollo Local (Cómo probar los cambios)

Si quieres compilar y previsualizar este portal localmente antes de enviar un Pull Request, sigue estos pasos:

### Prerrequisitos
Asegúrate de tener instalado:
*   Ruby (versión 2.7 o superior)
*   Bundler

### Instrucciones de ejecución

1. **Instalar dependencias:**
   ```bash
   bundle install
   ```

2. **Iniciar el servidor local de Jekyll:**
   ```bash
   bundle exec jekyll serve
   ```

3. **Ver el sitio en tu navegador:**
   Abre [http://localhost:4000](http://localhost:4000) en tu navegador. El servidor de desarrollo recompilará automáticamente el sitio cuando guardes cambios en los archivos Markdown.

---

## 🚀 Despliegue

Cualquier cambio fusionado en la rama `main` iniciará automáticamente el workflow de GitHub Actions (`.github/workflows/pages.yml`), compilando y desplegando el nuevo sitio estático en el entorno de GitHub Pages.
