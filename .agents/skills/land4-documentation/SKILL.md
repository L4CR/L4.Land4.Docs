---
name: land4-documentation
description: Usar al crear, revisar o actualizar documentación Docs-as-Code de repositorios LAND4 con Jekyll/Just the Docs, README.md, AGENTS.md, docs-repo/index.md, docs-repo/docs/, docs-repo/req/, docs-repo/procesos/, docs-repo/Gemfile, docs-repo/scripts/, docs-repo/docs/repositorios.md, navegación publicada, GitHub Pages, validación local Docker/Jekyll, tema visual LAND4 y Agent Skills.
---

# Documentación LAND4

Usa este skill para documentar repositorios LAND4 de forma consistente con el portal central:

https://l4cr.github.io/L4.docs-organizacion/como-documentar.html

La documentación LAND4 es Docs-as-Code: vive junto al código, se versiona en Git y se revisa en Pull Requests igual que el código.

## Principios

- El portal central mantiene estándares transversales, procesos, onboarding, IA e inventario completo LAND4.
- Cada repositorio mantiene solo la documentación que cambia con su código: arquitectura, despliegue, repositorios relacionados, requerimientos y procesos locales.
- No dupliques contenido canónico del portal central; enlázalo.
- No documentes como página local detalles que pertenecen a estándares generales, componentes comunes o datos evidentes del repo. Ejemplo: si el repo solo tiene `src/data/`, menciona que el contenido vive ahí; no crees una página para explicar cada JSON salvo que haya reglas de negocio reales.

## Estructura Estándar

Prefiere esta estructura, creando carpetas opcionales solo cuando apliquen:

```text
repository/
├── README.md
├── AGENTS.md
├── docs-repo/               # soporte de publicación/estilo/validación Jekyll
│   ├── index.md             # inicio publicado del sitio de documentación
│   ├── Gemfile              # si se publicará/probará documentación Jekyll local
│   ├── Gemfile.lock
│   ├── _config.yml
│   ├── docker-compose.yml
│   ├── scripts/
│   │   ├── generate-skills-docs.ts      # si se publica catálogo de Agent Skills
│   │   └── generate-pr-template-docs.ts # si se publican plantillas de PR
│   ├── _sass/
│   │   ├── color_schemes/land4.scss
│   │   └── custom/custom.scss
│   ├── assets/images/L4.png
│   ├── docs/
│       ├── index.md
│       ├── api.md
│       ├── arquitectura.md
│       ├── despliegue.md
│       ├── repositorios.md
│       ├── pnpm-migration-security.md
│       └── inteligencia-artificial/
│           ├── index.md
│           └── skills.md       # generado si hay catálogo de skills
│   ├── req/
│   └── procesos/
├── .github/
│   ├── workflows/docs.yml          # si se publica con GitHub Pages
│   └── PULL_REQUEST_TEMPLATE/*.md  # si se publican plantillas de PR
└── .agents/
    └── skills/<skill-name>/SKILL.md
```

No inventes `docs-repo/req/`, `docs-repo/procesos/`, `.agents/skills/`, `.github/` ni `docs-repo/scripts/` para llenar estructura.

Mantén todo lo posible relacionado con documentación publicada, contenido técnico, publicación, validación y estilo dentro de `docs-repo/`. Excepciones permitidas en raíz: `README.md`, `AGENTS.md`, `.github/workflows/docs.yml`, `.github/PULL_REQUEST_TEMPLATE/**` y `.agents/skills/**/SKILL.md`.

Si el repositorio ya tiene documentación histórica en `docs/`, muévela a `docs-repo/docs/` cuando se adopte este estándar y elimina los archivos raíz anteriores para evitar dos fuentes de verdad. Agrega `docs/` al `exclude` de Jekyll si queda alguna carpeta local no publicada o si el build corre desde la raíz.

## Frontmatter Publicable

Los archivos raíz pueden publicarse sin moverlos. Agrega frontmatter Jekyll cuando el repo use GitHub Pages/Just the Docs.

`README.md`:

```markdown
---
layout: default
title: README
nav_order: 2
permalink: /readme/
---
```

`AGENTS.md`:

```markdown
---
layout: default
title: AGENTS.md
parent: Inteligencia Artificial
nav_order: 5
permalink: /docs/inteligencia-artificial/agents/
---
```

`docs-repo/index.md`:

```markdown
---
layout: default
title: Inicio
nav_order: 1
---
```

`docs-repo/docs/index.md`:

```markdown
---
layout: default
title: Documentación Técnica
nav_order: 4
has_children: true
permalink: /docs/
---
```

Páginas técnicas hijas bajo `docs-repo/docs/`:

```markdown
---
layout: default
title: Arquitectura
parent: Documentación Técnica
nav_order: 1
---
```

`docs-repo/docs/inteligencia-artificial/index.md`:

```markdown
---
layout: default
title: Inteligencia Artificial
parent: Documentación Técnica
has_children: true
nav_order: 4
permalink: /docs/inteligencia-artificial/
---
```

## Navegación

El índice principal debe reflejar la jerarquía real del menú Just the Docs. No dejes una lista plana si el menú está anidado.

Ejemplo:

```markdown
## Navegación

- [README](README.md)
- [Documentación Técnica](docs/)
  - [API](docs/api/)
  - [Arquitectura](docs/arquitectura/)
  - [Despliegue](docs/despliegue/)
  - [Catálogo de Repositorios](docs/repositorios/)
  - [Inteligencia Artificial](docs/inteligencia-artificial/)
    - [AGENTS.md](AGENTS.md)
    - [Skills](docs/inteligencia-artificial/skills.html)
```

Actualiza índices cuando agregues, renombres o muevas páginas publicadas.

En GitHub Pages de proyecto, evita enlaces internos que empiecen con `/` sin incluir el `baseurl`: el navegador los resuelve contra el dominio y pierde el prefijo del repositorio. Usa enlaces relativos entre páginas publicadas. En el `README.md` publicado, usa rutas con el prefijo `/<repositorio>/` para que funcionen igual en local y producción.

## Responsabilidades por Archivo

- `README.md`: entrada breve del repo en GitHub; enlaza documentación técnica, arquitectura, despliegue, GitHub Pages del repo si existe y catálogo central.
- `docs-repo/index.md`: inicio publicado del sitio de documentación; navegación anidada igual al menú.
- `AGENTS.md`: instrucciones operativas para agentes; source of truth publicado en `/docs/inteligencia-artificial/agents/`.
- `docs-repo/docs/index.md`: índice técnico publicado.
- `docs-repo/docs/api.md`: superficie pública de API, Swagger, módulos, autenticación, convenciones de errores y ejemplos mínimos.
- `docs-repo/docs/arquitectura.md`: arquitectura, componentes relevantes, decisiones, diagramas Mermaid, límites y dependencias con explicación.
- `docs-repo/docs/despliegue.md`: ambientes, requerimientos, validación local, CI/CD, despliegue, verificación, rollback y relación implementación-documentación.
- `docs-repo/docs/repositorios.md`: repositorios relacionados con este sistema. Solo el portal central lista todos los repos LAND4.
- `docs-repo/docs/pnpm-migration-security.md`: política local de pnpm cuando el repo tenga decisiones propias de scripts aprobados/bloqueados.
- `docs-repo/docs/inteligencia-artificial/index.md`: índice de instrucciones para agentes y skills locales.
- `docs-repo/docs/inteligencia-artificial/skills.md`: catálogo generado de `.agents/skills/**/SKILL.md`; no se edita manualmente si existe script generador.
- `docs-repo/req/`: requerimientos de negocio, casos de uso, historias, criterios y reglas cuando apliquen.
- `docs-repo/procesos/`: solo procesos propios no cubiertos por el portal central.

## Catálogo de Repositorios

`docs-repo/docs/repositorios.md` debe usar el formato mínimo del portal central:

```markdown
| Sistema / Proyecto | Repositorio | Tipo | Descripción | Documentación publicada | Responsable | Estado |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
```

Estados válidos: `Activo`, `En desarrollo`, `Archivado`, `Deprecado`, `Pendiente de documentación`.

La columna "Documentación publicada" debe apuntar a GitHub Pages o indicar que está pendiente. No apuntes a Markdown crudo como documentación publicada.

## Jekyll/Just the Docs Local

Si el repo publica documentación en GitHub Pages, agrega la configuración mínima para probar localmente como el portal central.

La validación local de Jekyll debe ejecutarse con Docker Compose. No dependas de Ruby, Bundler o gems instaladas en la máquina del colaborador para validar documentación localmente.

`docs-repo/Gemfile`:

```ruby
source "https://rubygems.org"

gem "github-pages", group: :jekyll_plugins
```

`docs-repo/docker-compose.yml`:

```yaml
services:
  docs:
    image: ruby:3.3
    working_dir: /site
    environment:
      BUNDLE_GEMFILE: /site/docs-repo/Gemfile
      BUNDLE_PATH: vendor/bundle
    volumes:
      - ..:/site
    ports:
      - "${DOCS_PORT:-4003}:4000"
    command: bundle exec jekyll serve --config docs-repo/_config.yml --host 0.0.0.0
```

`docs-repo/_config.yml` debe incluir, ajustando `title`, `description`, `baseurl` y `aux_links`:

```yaml
remote_theme: just-the-docs/just-the-docs
plugins:
  - jekyll-remote-theme
url: "https://<organizacion>.github.io"
baseurl: "/<repositorio>"
color_scheme: land4
logo: "docs-repo/assets/images/L4.png"
search_enabled: true
mermaid:
  version: "10.1.0"
sass:
  sass_dir: docs-repo/_sass
exclude:
  - .bundle/
  - .jekyll-cache/
  - .astro/
  - _site/
  - dist/
  - node_modules/
  - vendor/
  - src/
  - prisma/
  - test/
  - coverage/
  - public/
  - .agents/
  - .github/
  - .vscode/
  - docs-repo/docker-compose.yml
  - docs/
```

En GitHub Pages de proyecto, configura `baseurl` con el nombre del repositorio para que Just the Docs genere correctamente el menú lateral, breadcrumbs y assets. Mantén el mismo `baseurl` en el servidor Docker local para validar las rutas reales en `http://localhost:4003/<repositorio>/`.

Agrega a `.gitignore`:

```gitignore
/vendor/
/.bundle/
/.jekyll-cache/
/.sass-cache/
/_site/
docs-repo/vendor/
docs-repo/.bundle/
docs-repo/.jekyll-cache/
docs-repo/.sass-cache/
docs-repo/docs/inteligencia-artificial/skills.md
docs-repo/docs/pr-templates/
```

Si el repo también tiene ESLint, ignora esos artefactos en la configuración de lint.

## Scripts y GitHub Pages

Si el repositorio publica catálogo de Agent Skills, usa el mismo script generador tanto en local como en el workflow. Ese script debe leer `.agents/skills/**/SKILL.md` y escribir la página publicada `docs-repo/docs/inteligencia-artificial/skills.md`.

Si el repositorio publica una vista navegable de plantillas de Pull Request, usa también el mismo script generador tanto en local como en el workflow. Ese script debe leer `.github/PULL_REQUEST_TEMPLATE/**/*.md` y escribir páginas derivadas en `docs-repo/docs/pr-templates/`.

Comandos canónicos de generadores para repos con `docs-repo/`:

```bash
node --disable-warning=ExperimentalWarning --experimental-strip-types docs-repo/scripts/generate-skills-docs.ts
node --disable-warning=ExperimentalWarning --experimental-strip-types docs-repo/scripts/generate-pr-template-docs.ts
```

Si el repo publica documentación, agrega scripts en `package.json` solo cuando el proyecto ya usa Node/pnpm o cuando faciliten validación repetible:

```json
{
  "scripts": {
    "docs:skills": "node --disable-warning=ExperimentalWarning --experimental-strip-types docs-repo/scripts/generate-skills-docs.ts",
    "docs:pr-templates": "node --disable-warning=ExperimentalWarning --experimental-strip-types docs-repo/scripts/generate-pr-template-docs.ts",
    "docs:generate": "pnpm run docs:skills && pnpm run docs:pr-templates",
    "docs:build": "pnpm run docs:generate && docker compose -f docs-repo/docker-compose.yml run --rm docs bundle exec jekyll build --config docs-repo/_config.yml",
    "docs:serve": "pnpm run docs:generate && docker compose -f docs-repo/docker-compose.yml up docs",
    "docs:down": "docker compose -f docs-repo/docker-compose.yml down"
  }
}
```

Si usas GitHub Pages, versiona `.github/workflows/docs.yml` con estos mínimos:

- Triggers solo en la rama publicable principal del repo (`main`) y ejecución manual con `workflow_dispatch` cuando aplique. No incluyas `staging`, `develop` ni ramas temporales.
- `paths` limitados a documentación, `AGENTS.md`, `README.md`, `docs-repo/**`, `.agents/skills/**`, `.github/PULL_REQUEST_TEMPLATE/**` y el workflow.
- Node 22 para ejecutar los mismos generadores usados en local:
  - `node --disable-warning=ExperimentalWarning --experimental-strip-types docs-repo/scripts/generate-skills-docs.ts`.
  - `node --disable-warning=ExperimentalWarning --experimental-strip-types docs-repo/scripts/generate-pr-template-docs.ts`, si se publica documentación derivada de plantillas de PR.
- Ruby 3.3 con `bundler-cache: true` y `working-directory: docs-repo`.
- `actions/configure-pages`, `bundle exec jekyll build --config docs-repo/_config.yml`, `actions/upload-pages-artifact` y `actions/deploy-pages`.

Esta configuración de Ruby aplica solo al build de Jekyll en el runner de GitHub Actions. Para validación local de Jekyll, usa siempre los comandos Docker de la sección de Validación Local. El generador de skills es el mismo comando Node en ambos entornos.

No agregues ramas temporales al workflow de documentación.

## Tema Visual LAND4

Para igualar el portal central, agrega:

- `_sass/color_schemes/land4.scss`
- `_sass/custom/custom.scss`
- `assets/images/L4.png`
- `color_scheme: land4` en `docs-repo/_config.yml`

Estos archivos deben vivir bajo `docs-repo/` en repos normales:

- `docs-repo/_sass/color_schemes/land4.scss`
- `docs-repo/_sass/custom/custom.scss`
- `docs-repo/assets/images/L4.png`

Usa el contenido del portal central como fuente canónica:

- `https://raw.githubusercontent.com/L4CR/L4.docs-organizacion/main/_sass/color_schemes/land4.scss`
- `https://raw.githubusercontent.com/L4CR/L4.docs-organizacion/main/_sass/custom/custom.scss`
- `https://raw.githubusercontent.com/L4CR/L4.docs-organizacion/main/assets/images/L4.png`

## Validación Local

Para documentación local, ejecuta primero los generadores que apliquen:

```bash
node --disable-warning=ExperimentalWarning --experimental-strip-types docs-repo/scripts/generate-skills-docs.ts
node --disable-warning=ExperimentalWarning --experimental-strip-types docs-repo/scripts/generate-pr-template-docs.ts
```

Luego valida Jekyll con Docker Compose:

```bash
docker compose -f docs-repo/docker-compose.yml run --rm docs bundle install
docker compose -f docs-repo/docker-compose.yml run --rm docs bundle exec jekyll build --config docs-repo/_config.yml
docker compose -f docs-repo/docker-compose.yml up docs
```

Por convención LAND4, usa `4003` como puerto local por defecto para evitar conflicto con el portal central en `4000`. Si `4003` está ocupado:

```bash
DOCS_PORT=4004 docker compose -f docs-repo/docker-compose.yml up docs
```

Revisa localmente:

- Página principal carga.
- Menú y `docs-repo/index.md` tienen la misma jerarquía.
- Páginas nuevas aparecen en navegación.
- Enlaces agregados funcionan.
- Mermaid renderiza si cambiaste diagramas.
- Páginas removidas ya no aparecen ni tienen enlaces internos.

Cuando cambien navegación, `baseurl`, permalinks, índices, generadores o estructura publicada, recorre el sitio servido localmente y valida todos los enlaces:

- Resuelve cada enlace interno desde la página donde aparece, igual que el navegador.
- Confirma que ninguna ruta interna escape del `baseurl` configurado.
- Verifica que cada destino interno responda correctamente y que cada anchor `#...` exista en su página.
- Revisa que los enlaces a páginas publicadas usen sus rutas navegables (`.html` o permalink), no referencias a archivos fuente `.md`.
- Comprueba que los enlaces externos agregados respondan correctamente.

Para repos con aplicación, ejecuta además sus validaciones propias (`npm run lint`, `npm run build`, tests, etc.).

## Personalización de Colores (Tema Oscuro)

Para evitar la fatiga visual y mejorar la accesibilidad (especialmente para usuarios que prefieren esquemas oscuros), los repositorios de documentación LAND4 deben ofrecer soporte para tema oscuro o utilizar variables oscuras en su esquema personalizado.

Para configurar el tema visual oscuro:

1. **Configuración en `_config.yml`:**
   Si se desea utilizar el tema oscuro nativo de Just the Docs, se puede establecer:
   ```yaml
   color_scheme: dark
   ```

2. **Esquema Personalizado Oscuro (`land4.scss`):**
   Si se utiliza `color_scheme: land4` (recomendado para consistencia de marca), las variables del archivo `docs-repo/_sass/color_schemes/land4.scss` deben definirse con valores oscuros que aseguren un alto contraste (por ejemplo, fondos en tonos oscuros como `#0f172a` y texto claro como `#cbd5e1`).

   Ejemplo de variables para el tema oscuro LAND4:
   ```scss
   $body-background-color: #0f172a; // slate-900
   $sidebar-color: #1e293b; // slate-800
   $search-background-color: #1e293b;
   $table-background-color: #1e293b;
   $code-background-color: #111827; // slate-950
   $body-heading-color: #f8fafc; // slate-50
   $body-text-color: #cbd5e1; // slate-300
   $link-color: #c084fc; // purple-400
   $nav-child-link-color: #94a3b8; // slate-400
   $border-color: #334155; // slate-700
   $btn-primary-color: #a855f7; // purple-500
   ```

## Revisión Final

Antes de terminar:

- Ningún enlace interno apunta a archivos removidos, renombrados o fuentes `.md` no publicadas.
- La revisión local de enlaces internos, anchors y enlaces externos agregados termina sin errores cuando cambió la navegación publicada.
- `README.md` es breve; los detalles técnicos viven en `docs-repo/docs/`.
- `docs-repo/docs/despliegue.md` concentra comandos de despliegue, CI/CD y validación local.
- `docs-repo/docs/repositorios.md` usa el formato de catálogo y no reemplaza arquitectura.
- `docs-repo/index.md` refleja la navegación anidada real.
- No se versionan `_site/`, `vendor/`, `docs-repo/vendor/`, `.bundle/`, `.jekyll-cache/`, `.sass-cache/`, `docs-repo/docs/inteligencia-artificial/skills.md` ni `docs-repo/docs/pr-templates/`.
- No hay páginas locales para contenido que pertenece a estándares generales o datos obvios.

## Agent Skills

Al crear un skill local:

- Usa `.agents/skills/<skill-name>/SKILL.md`.
- `name` debe coincidir con la carpeta.
- Usa minúsculas, números y guiones.
- Incluye `description` clara sobre cuándo debe activarse.
- No dupliques skills manualmente en `docs-repo/docs/`; si se publica un índice de skills, debe generarse durante el pipeline.
- Si el repo publica el catálogo, usa `docs-repo/scripts/generate-skills-docs.ts` para leer `.agents/skills/**/SKILL.md`, tolerar repos sin skills y escribir `docs-repo/docs/inteligencia-artificial/skills.md`.
- La página generada debe incluir frontmatter de Just the Docs, `parent: Inteligencia Artificial` y permalink estable, por ejemplo `/docs/inteligencia-artificial/skills.html`.
