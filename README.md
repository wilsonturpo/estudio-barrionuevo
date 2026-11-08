# Estudio Barrio Nuevo

Sitio estático multipágina para un estudio jurídico laboral en Perú, construido con Astro y Sass. El contenido incluido es demostrativo: debe validarse y sustituirse antes de cualquier publicación comercial.

## Requisitos

- Node.js 24 LTS (la versión usada en el proyecto está en `.nvmrc`).
- npm y Git.
- Chromium de Playwright para las pruebas: se instala mediante `npx playwright install chromium`.

## Inicio rápido

```bash
npm ci
npx playwright install chromium
npm run dev
```

Abra la URL indicada por Astro, normalmente `http://localhost:4321`.

## Comandos

| Comando | Uso |
| --- | --- |
| `npm run dev` | Servidor de desarrollo. |
| `npm run build` | Genera el sitio estático en `dist/`. |
| `npm run preview` | Sirve la última salida compilada. |
| `npm test` | Ejecuta Playwright contra Astro en desarrollo. |
| `npm run test:preview` | Compila y prueba la salida servida por `astro preview`. |
| `npm run test:ui` | Abre la interfaz de Playwright. |
| `npm run test:report` | Abre el último informe HTML de pruebas. |
| `npm run audit` | Ejecuta Lighthouse contra un preview que ya esté en el puerto 4323. |

Para auditar localmente:

```bash
npm run build
npm run preview -- --host 127.0.0.1 --port 4323
npm run audit
```

El archivo HTML de Lighthouse se genera en `docs/audits/`, directorio ignorado por Git.

## Contenido editable

No hay contenido comercial cargado desde el cliente. Astro toma los JSON de `src/data/` durante el build.

| Archivo | Qué editar |
| --- | --- |
| `site.json` | Nombre, lema, textos institucionales, correo, horario, ubicación y WhatsApp. |
| `navigation.json` | Navegación primaria visible. |
| `services.json` | Servicios, categorías, slugs y contenido de cada página de detalle. |
| `faq.json` | Preguntas frecuentes. |
| `team.json` | Perfiles profesionales cuando existan datos autorizados. |
| `social-links.json` | Solo WhatsApp y Facebook. Los enlaces vacíos no se muestran. |

### WhatsApp y formulario

Defina `site.whatsapp.number` únicamente con un número real, internacional y solo en dígitos, de 8 a 15 caracteres. Mientras esté vacío, el formulario muestra un aviso de demostración y no abre ningún destinatario. El formulario no tiene backend, no usa `localStorage` y no solicita documentos ni datos sensibles.

Revise antes de publicar el nombre del estudio, responsables de privacidad, RUC, correo, teléfono, horario, ubicación, perfiles, enlaces sociales y todos los textos jurídicos.

## Diseño

La paleta se centraliza exclusivamente en `src/styles/themes/_theme.scss`. Las familias tipográficas se exponen mediante `--font-display` y `--font-body`. Los componentes visuales guardan sus estilos SCSS junto a su componente para evitar una hoja global monolítica.

## SEO e indexación

Sin `SITE_URL`, el sitio publica `robots.txt` con `Disallow: /` y añade `noindex`; evita indexar una demostración sin dominio real. Con `SITE_URL` configurado, Astro genera canonicals, habilita el sitemap y `robots.txt` permite rastreo.

No se publica marcado `LegalService` hasta disponer de datos empresariales reales y verificables.

## GitHub Pages

El workflow `.github/workflows/deploy.yml` instala dependencias reproducibles, Chromium, ejecuta las pruebas contra la salida de producción y despliega con las acciones oficiales de GitHub Pages. No se activa Pages ni se publica automáticamente fuera de una ejecución autorizada en GitHub.

Para un repositorio de proyecto, el workflow usa:

```text
BASE_PATH=/<nombre-del-repositorio>/
SITE_URL=https://<usuario>.github.io/<nombre-del-repositorio>/
```

Esto se aplica en GitHub Actions usando el nombre real del repositorio. Antes de activar Pages, cambie la rama principal del workflow si su repositorio no usa `main`.

Para un dominio personalizado en la raíz:

1. Configure en el workflow `BASE_PATH=/` y `SITE_URL=https://su-dominio.pe/`.
2. Configure los DNS y HTTPS desde la sección Pages de GitHub.
3. Agregue `public/CNAME` solo cuando el dominio definitivo esté confirmado.
4. Verifique rutas, canonicals y sitemap con el dominio publicado.

GitHub Pages sirve `404.html` para rutas inexistentes, pero en sitios de proyecto puede mantener la URL solicitada según el comportamiento del hosting. La página 404 del proyecto ofrece enlaces de recuperación.

## Playwright MCP

`opencode.json` registra `@playwright/mcp` como servidor local. Después de clonar o modificar esa configuración, cierre y reinicie OpenCode: la configuración MCP se carga al iniciar. El servidor se valida con `npx @playwright/mcp --help` y utiliza el navegador instalado por Playwright.

## Estructura

```text
src/components/  Componentes UI, layout y secciones
src/data/        Contenido editable en JSON
src/layouts/     Layout base, metadatos y navegación compartida
src/pages/       Rutas estáticas y detalle generado de servicios
src/styles/      Fundamentos globales y tema
tests/           Pruebas E2E y capturas para revisión visual
```

## Problemas comunes

- **No se encuentra Chromium:** ejecute `npx playwright install chromium`.
- **Un puerto ya está ocupado:** use un puerto distinto al iniciar Astro o cierre el proceso local anterior.
- **Las rutas fallan en Pages:** confirme `BASE_PATH` y no cambie los enlaces generados por `localUrl()` a rutas absolutas manuales.
- **El MCP no aparece:** reinicie OpenCode tras guardar `opencode.json`.
