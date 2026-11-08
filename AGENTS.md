# AGENTS.md — Estudio Jurídico Laboral (Perú)

> **Documento rector para OpenCode — versión inicial 1.0.**
> Proyecto real, pequeño y mantenible. Este archivo contiene tanto la solicitud de implementación inicial como las normas que deben conservarse en futuras modificaciones.
>
> **Primera ejecución:** si el repositorio está vacío, implementa el sitio completo siguiendo este documento. No te limites a crear un esqueleto. Si ya existe código, inspecciónalo primero, conserva lo que funcione y adapta las instrucciones sin destruir trabajo previo.

## 1. Objetivo y criterios de éxito

Construir un sitio web **multipágina, estático, mobile-first, premium corporativo y elegante** para un estudio jurídico especializado en **derecho laboral peruano**, dirigido a **trabajadores y empresas**. Debe transmitir profesionalismo, confianza y claridad; facilitar consultas mediante WhatsApp y mostrar los servicios de manera comprensible. El contenido inicial utilizará datos y textos ficticios claramente identificables, fáciles de reemplazar.

**No se considera completado hasta que:**
1. Todas las páginas especificadas se generen correctamente y tengan navegación funcional.
2. El diseño sea consistente y visualmente cuidado en móvil, tableta y escritorio.
3. El contenido repetitivo proceda de archivos JSON en `src/data/`, no de tarjetas escritas manualmente.
4. Playwright Test ejecute pruebas automatizadas de navegación, responsive y contacto.
5. OpenCode use Playwright MCP para **abrir el sitio real, interactuar y revisar capturas** y corregir problemas visuales verificables.
6. `npm run build` genere correctamente el sitio estático en `dist/`.
7. Se entregue documentación y configuración de despliegue a GitHub Pages con GitHub Actions.
8. El informe final indique pruebas ejecutadas, resultados y cualquier limitación real, sin afirmar verificaciones no realizadas.

## 2. Stack aprobado y límites

- **Astro** con salida estática SSG (`output: 'static'` cuando corresponda a la versión), HTML semántico generado durante build.
- **SCSS (Sass moderno)**, sin Bootstrap, Tailwind ni otros frameworks CSS.
- **JavaScript nativo mínimo** para interacciones. Evitar introducir TypeScript para archivos de contenido: **catálogos y configuración en `.json`**. Si herramientas Astro generan archivos de configuración JS/TS, respetar lo habitual del framework sin añadir complejidad artificial.
- **Astro components** reutilizables, sin React, Angular, Vue ni hidratación de islas para elementos simples.
- **GitHub Pages** como hosting de archivos estáticos, con **GitHub Actions** para build/deploy y dominio personalizado futuro.
- **Playwright Test** para pruebas de regresión y **Playwright MCP** para navegación e inspección por el agente. Priorizar Chromium en primera iteración; ampliar cuando resulte útil.
- **Lighthouse** para auditorías de rendimiento, accesibilidad, buenas prácticas y SEO, usando la versión de producción/previsualización cuando sea posible.
- Dependencias mínimas, versiones compatibles y controladas mediante `package-lock.json`; no instalar Astro, Sass o Playwright globalmente.
- **No** backend, base de datos, autenticación, CMS, APIs privadas ni servicios de pago en esta versión.
- No publicar claves, tokens, teléfonos reales ficticios confundibles con definitivos ni información confidencial.

## 3. Preparación del entorno y metodología de implementación

1. Inspeccionar el repositorio y confirmar sistema operativo, Node.js, npm, Git y conectividad de OpenCode. **No asumir** que Astro o Playwright ya están instalados. Preferir una versión LTS de Node compatible con las versiones efectivamente instaladas; no cambiar instalaciones globales sin autorización.
2. Si no hay proyecto, inicializar Astro con npm y una estructura simple, sin plantillas recargadas.
3. Instalar Sass a nivel de proyecto y Playwright Test como dependencia de desarrollo. Instalar el navegador Chromium para las pruebas. Preferir versiones estables compatibles y consultar documentación oficial cuando sea necesario.
4. Configurar Playwright MCP **para OpenCode** según el esquema vigente de su configuración (`opencode.json`), con servidor local de `@playwright/mcp`; comprobar que las herramientas están disponibles. Si se requiere reiniciar OpenCode para cargar MCP, documentarlo claramente y continuar con Playwright Test mientras tanto.
5. Implementar por etapas: fundamentos visuales → componentes → datos JSON → layouts/páginas → interacciones → pruebas → mejoras → despliegue.
6. **Probar durante el desarrollo**, no únicamente al final. No dar por bueno un componente compartido sin verlo funcionando en resoluciones relevantes.
7. Ejecutar comandos que modifiquen archivos únicamente dentro del repositorio. Solicitar aprobación para instalaciones globales, operaciones destructivas o publicación externa. No ejecutar `git push`, conectar un dominio o activar Pages sin que el usuario lo solicite o autorice.
8. Crear scripts npm fáciles de entender para desarrollo, build, preview y pruebas, incluyendo opcionalmente modo UI de Playwright.

## 4. Estructura objetivo (ajustable si Astro requiere una convención)

```text
/
├── AGENTS.md
├── README.md
├── package.json
├── package-lock.json
├── astro.config.mjs
├── playwright.config.*
├── opencode.json                  # MCP local, si se configura en proyecto
├── .gitignore
├── .github/workflows/deploy.yml
├── public/
│   ├── favicon.svg
│   └── images/                    # recursos públicos y placeholders
├── src/
│   ├── assets/images/             # recursos optimizables por Astro
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button/Button.astro
│   │   │   ├── button/Button.scss
│   │   │   ├── card/Card.astro
│   │   │   ├── card/Card.scss
│   │   │   ├── badge/
│   │   │   └── section-title/
│   │   ├── layout/
│   │   │   ├── navbar/
│   │   │   ├── footer/
│   │   │   ├── mobile-menu/
│   │   │   └── whatsapp-button/
│   │   └── sections/
│   │       ├── hero/
│   │       ├── services/
│   │       ├── about/
│   │       ├── faq/
│   │       ├── contact/
│   │       └── call-to-action/
│   ├── layouts/BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── nosotros.astro
│   │   ├── servicios/index.astro
│   │   ├── servicios/[slug].astro
│   │   ├── contacto.astro
│   │   ├── politica-de-privacidad.astro
│   │   └── 404.astro
│   ├── data/
│   │   ├── site.json
│   │   ├── navigation.json
│   │   ├── services.json
│   │   ├── team.json
│   │   ├── faq.json
│   │   └── social-links.json
│   ├── styles/
│   │   ├── abstracts/_mixins.scss
│   │   ├── abstracts/_breakpoints.scss
│   │   ├── base/_reset.scss
│   │   ├── base/_typography.scss
│   │   ├── base/_global.scss
│   │   ├── themes/_theme.scss
│   │   └── main.scss
│   └── utils/                       # solo si hay lógica reutilizable real
├── tests/
│   ├── navigation.spec.*
│   ├── responsive.spec.*
│   ├── services.spec.*
│   └── contact.spec.*
└── docs/                           # opcional: auditoría, screenshots
```

No crear carpetas, componentes ni archivos vacíos solo para seguir el árbol. Cada componente visual **tiene su carpeta con `.astro` y `.scss` juntos**; añadir `.js` para comportamiento complejo solo cuando sea necesario. Mantener el diseño simple, evitar sobreingeniería.

## 5. Convenciones de componentes y estilos

- Organizar en `ui/` (genéricos), `layout/` (navegación/estructura), `sections/` (bloques de páginas).
- El componente genérico recibe propiedades (contenido, variantes, enlaces, etc.) y **no lee directamente** datos jurídicos o valores del negocio si puede evitarse. Las páginas/secciones leen JSON y pasan props.
- Reutilizar un único botón con variantes `primary`, `secondary`, `outline` y estados `default`, `hover`, `active`, `focus-visible` y, cuando aplique, `disabled`.
- Los archivos SCSS importados como hojas externas en Astro **no están encapsulados como `<style>` locales**; usar clases raíces únicas y **BEM** para impedir colisiones. Evitar selectores globales genéricos dentro de archivos de componentes.
- Usar `@use` / `@forward` de Sass; no usar `@import` de Sass obsoleto.
- `src/styles/` debe contener reset, tipografía, layout base, mixins y variables comunes. **No concentrar allí estilos específicos** de botones, tarjetas, menú, etc.
- Mantener **un solo tema claro**. No crear toggle de modo oscuro ni un motor de temas.
- Utilizar **CSS Custom Properties** para colores, espaciados, tipografías, radios y contenedores. En esta versión los componentes pueden referenciar directamente `--color-primary`, `--color-secondary`, `--color-tertiary`, y sus variantes. **No introducir una segunda capa compleja de tokens semánticos**.
- Definir variantes del mismo color para estados hover/active; **hover no significa usar automáticamente el color terciario**.
- Usar layout fluido (CSS Grid/Flexbox), `clamp()` y `min()`/`max()` cuando convenga. Breakpoints orientativos mobile-first: 768, 1024 y 1440 px; adaptar al contenido real.
- Reducir JavaScript entregado al cliente; preferir HTML nativo y CSS para componentes sin estado.

## 6. Identidad visual aprobada

**Dirección:** Premium corporativo, sofisticado, sobrio, elegante, cálido y actual; debe comunicar profesionalismo y confianza, evitando clichés recargados. Inspiración cromática: fotografía de una pintura de la Dama de la Justicia aportada por el cliente, con **marrón espresso, bronce/dorado y marfil**, además de neutros y terracota discreta.

**Paleta de partida editable**, con hexadecimales de aproximación artística (no muestreo exacto). Centralizar exclusivamente en `_theme.scss` para ajuste sencillo:

| Variable | Valor inicial sugerido | Rol |
|---|---|---|
| `--color-primary` | `#2C211D` | Marrón espresso profundo: marca, encabezados, footer, acciones principales |
| `--color-secondary` | `#B48B57` | Bronce dorado: detalles, iconos, acentos, botones secundarios |
| `--color-tertiary` | `#F6F0E7` | Marfil cálido: fondos alternos y superficies suaves |
| `--color-white` | `#FFFFFF` | Fondo de tarjetas, espacios limpios |
| `--color-text` | `#302923` | Texto principal sobre fondos claros |
| `--color-text-muted` | `#6C6159` | Texto secundario |
| `--color-border` | `#E8DED2` | Bordes suaves |
| `--color-accent` | `#A66A48` | Terracota discreta, uso limitado |

Crear variaciones para hover/active/focus que mantengan contraste suficiente y coherencia; verificar resultados con herramientas, no confiar solo en la apariencia. **No interpretar que solo existen tres colores CSS**: los tres son la base de marca; neutros y variantes son necesarios para accesibilidad.

**Uso recomendado:**
- Navbar blanco o marfil muy claro; enlaces marrón espresso, indicador activo bronce.
- Hero con composición editorial clara u oscura, preferentemente espresso como bloque protagonista con texto blanco y acentos bronce; evitar fondos que resten legibilidad.
- Botón primario espresso/blanco; secundario bronce/texto muy oscuro; outline transparente/borde espresso. Hover en variantes del color correspondiente.
- Tarjetas blancas con bordes tenues y detalles bronce; secciones alternando blanco y marfil.
- Footer espresso, textos claros y enlaces con foco/hover visibles.
- WhatsApp flotante con identidad visual reconocible de WhatsApp, tamaño táctil y sin ocultar contenido.

**Tipografías sugeridas:** `Cormorant Garamond` (titulares) e `Inter` (cuerpo y UI). Optimizar cargas y evitar cambios de diseño por fuentes; preferir alojamiento local si las licencias lo permiten. Mantener la opción de sustituir fuentes mediante variables.

**Ilustraciones y fotos:** usar placeholders elegantes e intencionales, con proporción consistente, texto alternativo apropiado y espacios preparados para fotografías auténticas. No usar retratos ficticios como si fueran abogados reales; no inventar instalaciones, credenciales, premios ni testimonios. La pintura original puede quedar reservada como posible recurso de la página Nosotros, **solo si existe autorización del titular para publicarla**. No es necesario incluir su archivo real en la versión inicial.

## 7. Arquitectura de información, páginas y navegación

**Multipágina** (no SPA). Navegación primaria: **Inicio, Nosotros, Servicios, Contacto**. No mostrar `Artículos` todavía; dejar documentada y preparada la posibilidad de incorporar blog/artículos en el futuro sin crear enlaces rotos ni páginas vacías. Enlaces a privacidad preferentemente en el footer.

### Inicio `/`
- Hero impactante con título claro, subtítulo orientado a derecho laboral peruano y CTA a WhatsApp.
- Presentación breve del estudio.
- Dos grupos de servicios: **para trabajadores** y **para empresas**; tarjetas de servicios destacadas cargadas desde JSON.
- Diferenciadores concretos formulados sin promesas no demostrables.
- Proceso de contacto sencillo (pasos de atención).
- Preguntas frecuentes basadas en datos JSON.
- CTA final, medios de contacto y footer.

### Nosotros `/nosotros/`
- Presentación, filosofía, compromiso y enfoque profesional.
- Equipo únicamente con información de ejemplo indicada como provisional; no inventar colegiaturas, universidades, especializaciones o años de experiencia presentándolos como hechos.
- Contemplar una composición editorial que permita incorporar la fotografía de la pintura o del equipo en el futuro.

### Servicios `/servicios/`
- Listado filtrable o agrupado visualmente por **Trabajadores** y **Empresas**, sin necesidad de un sistema de búsqueda complejo.
- Tarjetas reutilizables con título, resumen, categoría, enlace interno y CTA.

### Detalle `/servicios/[slug]/`
- Generación estática con `getStaticPaths()` a partir de `services.json`.
- Cada detalle: título, introducción, a quién se dirige, problemas frecuentes, alcance de la asesoría, preguntas orientativas, CTA a WhatsApp y enlaces relacionados si procede.
- Slugs descriptivos en español, con guiones; rutas canónicas válidas.
- Servicios iniciales **de ejemplo** (revisables por el estudio): despido arbitrario, beneficios sociales, hostigamiento laboral, contratos laborales, asesoría laboral para empresas, inspecciones SUNAFIL. No convertir textos informativos en asesoría individualizada ni prometer resultados.

### Contacto `/contacto/`
- Información obtenida de JSON: WhatsApp, teléfono, correo, ubicación (solo valores reales cuando se entreguen), horarios y Facebook.
- **Formulario sin backend** con nombre, público (trabajador/empresa), asunto y breve descripción; construir un mensaje legible y abrir `https://wa.me/<numero>?text=<mensaje-codificado>` después de validación y acción explícita del visitante.
- Número WhatsApp provisional centralizado; si no existe número válido, presentar estado de demostración **sin enviar al destino ficticio**.
- Evitar solicitar DNI, documentos laborales, datos sensibles o cargas de archivos. Mostrar aviso de privacidad breve antes del envío y enlace a la política de privacidad. No almacenar el contenido del formulario en localStorage ni enviarlo a servicios de terceros para analítica.
- Mantener una forma alternativa de contacto accesible.

### Política de privacidad `/politica-de-privacidad/`
- Crear estructura clara y **marcar el contenido como borrador sujeto a validación legal por el estudio**, atendiendo al contexto de protección de datos personales en Perú. No inventar identidad de responsable, RUC, domicilio, plazos o bases legales específicas. No publicarla como política final sin revisión.

### 404
- Página estilizada con navegación de regreso al inicio. Verificar las limitaciones del comportamiento 404 de GitHub Pages y documentarlas.

## 8. Datos JSON y contenido editable

- Guardar archivos `.json` en **`src/data/`**, consumirlos **durante la compilación** y renderizar HTML listo para indexación; **no hacer `fetch()` en cliente para cargar contenidos estáticos**.
- Evitar copiar manualmente tarjetas o ítems en `.astro`; renderizar listas desde JSON.
- Diseñar objetos simples, consistentes y legibles; usar IDs/slugs estables y categorías explícitas. Añadir comprobaciones básicas de integridad de contenido en build/tests si resulta práctico, sin introducir un framework de validación pesado.
- `site.json`: nombre de muestra, eslogan de muestra, textos institucionales, URL configurada, número de WhatsApp vacío/provisional, teléfono/correo de muestra claramente señalados, ubicación genérica, horarios de muestra y parámetros SEO comunes.
- `navigation.json`: elementos visibles del menú.
- `services.json`: categorías y servicios, slugs y campos del detalle.
- `team.json`: opcional, solo muestras transparentes.
- `faq.json`: preguntas y respuestas generales con lenguaje prudente, sin afirmaciones jurídicas específicas no verificadas.
- `social-links.json`: **solo WhatsApp y Facebook** en esta fase; ocultar enlaces sin URL válida.
- Definir ejemplos útiles y convincentes pero **sin inventar datos reales**, firmas, abogados, logros, reseñas o resultados judiciales.
- Incluir en README una guía concreta de qué JSON editar para modificar identidad, servicios, textos, WhatsApp y redes sociales.

## 9. Experiencia responsive, animaciones y accesibilidad

- Diseñar **móvil primero**, desde 320 px; validar al menos **320, 375, 390, 768, 1024, 1440 y 1920 px**.
- Navegación móvil con botón accesible, `aria-expanded`, cierre por botón/Escape y comportamiento correcto al navegar; evitar trampas de foco.
- No permitir overflow horizontal, solapamientos, textos cortados, botones inaccesibles ni diálogos invasivos.
- Controles táctiles cómodos, espacios equilibrados, contenido legible y formularios etiquetados.
- Animaciones **suaves y elegantes**: transiciones de botones, elevación ligera de cards, aparición discreta de secciones. Preferir CSS; si usa `IntersectionObserver`, hacerlo progresivamente y sin ocultar contenido cuando JS no funciona.
- Respetar `prefers-reduced-motion: reduce`. No cargar bibliotecas de animación si CSS/JS simple resuelve el caso.
- Objetivo **WCAG 2.2 AA**: contrastes medibles, foco claramente visible, jerarquía de encabezados, textos alternativos, landmarks, navegación por teclado, etiquetas de formularios y mensajes de error comprensibles.
- No confundir efectos visuales con funcionalidad: CTA visibles, navegación intuitiva y jerarquía clara.

## 10. SEO, rendimiento y buenas prácticas

- `lang="es-PE"` en el documento, estructura semántica y metadatos independientes por página.
- Títulos y descripciones claros, canonical coherente, Open Graph/Twitter cards básicos, favicon y, cuando corresponda, imagen social provisional identificable como tal.
- `robots.txt` y `sitemap.xml` según configuración real del dominio; evitar indexación de URLs ficticias si aún no hay URL pública definida.
- Datos estructurados Schema.org `LegalService` únicamente con **datos empresariales verídicos disponibles**; no generar reseñas, calificaciones, dirección o teléfono inventados como hechos.
- Optimizar imágenes mediante herramientas de Astro cuando proceda, dimensiones explícitas para evitar CLS, lazy loading en imágenes fuera del primer viewport; imagen hero cargada con prioridad adecuada.
- Evitar fuentes excesivas, JS innecesario y paquetes pesados. Mantener carga inicial rápida y Core Web Vitals saludables.
- No introducir servicios de analítica/cookies de seguimiento sin una decisión posterior de privacidad; sí dejar documentada su posible incorporación.
- No habilitar `unsafe-inline`, integraciones arbitrarias o secretos en el repositorio como supuesta solución rápida.

## 11. Verificación REAL obligatoria mediante Playwright

**No es opcional.** Requerimos dos niveles complementarios:

### A. Playwright Test (repetible)

Crear pruebas E2E y scripts npm para:
1. Cargar todas las páginas principales y cada detalle de servicio generado; comprobar ausencia de 404 y errores de JavaScript.
2. Verificar navbar, footer, enlaces internos, enlaces de servicios y navegación de retorno.
3. Abrir/cerrar el menú móvil y usarlo con teclado cuando aplique.
4. Verificar formulario: campos obligatorios, mensajes de validación, codificación correcta del texto WhatsApp y comportamiento seguro cuando falta un número válido. **No enviar mensajes reales**.
5. Verificar renderizado de servicios/FAQ desde JSON.
6. Comprobar que no existe overflow horizontal significativo en las resoluciones acordadas. Incluir comprobaciones de visibilidad, elementos solapados y targets accesibles cuando sea viable.
7. Probar al menos estado con `prefers-reduced-motion`.
8. Ejecutar contra `astro dev` y, en la validación final, contra la salida compilada con `astro preview`.
9. Conservar capturas de fallos como artefactos de prueba; no versionar capturas temporales sin motivo.

Configurar `webServer` de Playwright para iniciar el servidor local automáticamente cuando corresponda y evitar dependencias de procesos manuales. Ajustar puertos/base URL a la configuración real, sin suponer que un puerto siempre está libre.

### B. Playwright MCP (inspección interactiva por OpenCode)

1. Configurar **Playwright MCP** compatible con OpenCode y comprobar que el agente pueda invocarlo.
2. Abrir la web local con el navegador controlado por MCP, navegar por Inicio, Nosotros, Servicios, un mínimo de dos detalles y Contacto.
3. Interactuar de verdad: abrir menú móvil, pulsar enlaces, expandir FAQ, completar formulario con datos ficticios y revisar resultado **sin contactar a un número real**.
4. Tomar e **inspeccionar visualmente** capturas a tamaños móvil, tableta y desktop, poniendo atención al hero, tipografía, colores, navbar, cards, márgenes, footer y WhatsApp flotante.
5. Comparar la interfaz con el objetivo premium corporativo, detectar defectos visibles y corregirlos, repetir las pruebas necesarias.
6. Revisar consola y errores de carga/red cuando las herramientas lo permitan.
7. **Importante:** los snapshots de accesibilidad de MCP no equivalen a inspección visual. Si el modelo o el conjunto de herramientas no puede revisar imágenes capturadas, informar claramente esa limitación y realizar tantas verificaciones estructurales/automatizadas como sea posible; **no afirmar que se verificó visualmente sin hacerlo**.

### C. Calidad final

- Ejecutar `npm run build` y las pruebas E2E; corregir fallos detectados y repetir hasta aprobar o justificar una limitación real.
- Ejecutar o preparar auditoría Lighthouse sobre build de producción y tratar los hallazgos relevantes. Objetivos orientativos: Performance >= 90, Accessibility >= 95, Best Practices >= 95, SEO >= 95; **no son garantía automática de cumplimiento**.
- Realizar prueba rápida de navegación sin JavaScript donde sea compatible con la funcionalidad estática; la información esencial debe mantenerse accesible.
- Entregar un resumen final con comandos y resultados observados, pantallas revisadas, defectos corregidos, pendientes y limitaciones.

## 12. GitHub Pages, URL base y dominio

- Preparar `.github/workflows/deploy.yml` con la **acción oficial recomendada por Astro**, permisos mínimos, checkout, instalación reproducible de dependencias, build y deploy a GitHub Pages; añadir pruebas antes de deploy cuando sea viable.
- Configurar correctamente `site` y `base` de Astro según el destino. Diferenciar:
  - `https://usuario.github.io/nombre-repositorio/` (requiere normalmente `base` con el nombre del repo).
  - Dominio personalizado apuntando a la raíz (normalmente `base: '/'`).
- **No dejar rutas absolutas rotas**: centralizar construcción de enlaces locales y comprobar navegación con base path de repositorio. Probar el caso real disponible y documentar cómo cambiar al dominio personalizado.
- Mantener configuración sencilla; no introducir SSR/adapters de servidor.
- Preparar instrucciones para habilitar GitHub Pages usando GitHub Actions, configurar DNS, HTTPS y, si es necesario, el archivo `CNAME` según el escenario real. **No inventar dominio ni publicar de manera automática.**
- Considerar que en GitHub Free las publicaciones Pages de un repositorio normalmente requieren repositorio público; no incluir información privada.

## 13. Entregables y documentación

Implementar:
- Sitio Astro real y funcional, con estilo SCSS y componentes separados.
- JSON de ejemplo útiles, editables y sin datos falsamente atribuidos.
- Tests de Playwright y configuración de Playwright MCP para OpenCode.
- Workflow de GitHub Actions para Pages (configurable antes de publicar).
- `README.md` **para humanos**: requisitos (Node/npm/Git), instalación desde cero, desarrollo, build, preview, pruebas, estructura, personalización de JSON/colores, configuración WhatsApp y Facebook, despliegue a GitHub Pages, base path y dominio personalizado, y soluciones comunes.
- `.gitignore` correcto para `node_modules`, `dist`, `.astro`, resultados de Playwright y archivos locales, conservando los archivos necesarios de configuración.
- Informe final breve y verificable con checklist de criterios de éxito y cualquier tema pendiente de datos reales, privacidad o dominio.

## 14. Restricciones y prioridades de decisión

1. Mantener el sitio **estático, pequeño, rápido y mantenible**.
2. Priorizar calidad de UX y responsive sobre decoraciones espectaculares.
3. No añadir complejidad por analogía con Angular: aprovechar componentes Astro sin recrear módulos, servicios o DI.
4. No sustituir JSON con `.ts`, API, CMS ni backend en esta fase.
5. No añadir modo oscuro ni tematización dinámica.
6. No añadir blog visible ni contenido jurídico inventado de apariencia oficial.
7. No introducir formularios con servidores o servicios externos sin autorización.
8. No prometer resultados judiciales ni afirmar experiencia, colegios profesionales, premios o casos que no hayan sido suministrados.
9. Si una decisión no está explícita, elegir la opción más sencilla que satisfaga el objetivo y documentarla; no bloquear la implementación por detalles fácilmente configurables.
10. **No declarar el trabajo terminado hasta ejecutar las pruebas disponibles y reportar evidencia real.**

## 15. Instrucción de arranque para la primera sesión de OpenCode

Cuando el usuario te solicite construir el sitio a partir de este `AGENTS.md`:

1. Lee este archivo completo.
2. Inspecciona el directorio e identifica si debes inicializar Astro o continuar un proyecto existente.
3. Presenta un plan corto de implementación y procede con el trabajo; utiliza los placeholders autorizados.
4. Construye una primera versión usable **de todas las páginas** antes de pulir efectos secundarios.
5. Configura y ejecuta pruebas Playwright; navega con MCP e inspecciona la UI a varias resoluciones.
6. Corrige defectos encontrados, valida build de producción y documenta resultados.
7. Deja el repositorio listo para que el usuario configure GitHub y su dominio, **sin publicar por tu cuenta**.

**Fuentes oficiales de consulta (verificar versiones actuales al implementar):**
- Astro: https://docs.astro.build/
- Astro + GitHub Pages: https://docs.astro.build/es/guides/deploy/github/
- OpenCode AGENTS.md: https://opencode.ai/docs/instructions/
- Playwright Test: https://playwright.dev/docs/intro
- Playwright MCP: https://playwright.dev/docs/getting-started-mcp
