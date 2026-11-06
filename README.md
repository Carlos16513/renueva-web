# Sitio web de Renueva Consultores y Constructores

Web corporativa de una sola página hecha solo con HTML, CSS y JavaScript puro. No usa frameworks, CDN, fuentes externas ni instalación de dependencias. Usa los colores del logo (azul marino y amarillo).

> **Estado:** el diseño, los servicios, los datos de contacto y el mapa ya están cargados. Quedan como marcadores `[EDITAR: …]` los **proyectos y certificados**, y vacíos el **horario y las redes sociales** (2 Facebook, TikTok, Instagram y LinkedIn) hasta que tengas las direcciones reales. El formulario requiere **una activación única** (ver sección 18).

---

## 1. Qué contiene

- Barra superior con teléfonos (solo texto), correo y dirección.
- Portada con dos mensajes que se alternan (locales clausurados y venta de propiedades).
- Servicios en 4 áreas, con botón de WhatsApp para cada una.
- Sección "Por qué elegirnos".
- **Proyectos como álbumes de fotos** con filtros por categoría (ejemplos por reemplazar).
- **Certificados**: galería con visor ampliado (ejemplos por reemplazar).
- Cómo trabajamos (3 pasos), contacto con formulario y **ubicación con mapa de Google**.
- Botón flotante de WhatsApp, volver arriba, menú móvil y animaciones.

## 2. Archivos y carpetas

```
RENUEVA/
├── index.html        Estructura y textos de la página
├── 404.html          Página de "no encontrado"
├── _headers          Seguridad y caché (Cloudflare Pages / Netlify)
├── .htaccess         Seguridad y caché (solo hosting Apache, ej. Hostinger)
├── robots.txt        Indicaciones para buscadores (ahora: no indexar)
├── css/styles.css    Todos los estilos
├── js/
│   ├── boot.js       Marca que JavaScript funciona (activa animaciones)
│   └── main.js       Comportamiento + CONFIGURACIÓN DE RENUEVA
├── assets/
│   ├── images/       Logos, certificados de ejemplo y la carpeta proyectos/
│   └── icons/        favicon.png
└── README.md         Esta guía
```

## 3. Abrir en Visual Studio Code

1. Abre Visual Studio Code → **Archivo → Abrir carpeta…** → elige `RENUEVA`.
2. Abre `index.html`, `css/styles.css` o `js/main.js` desde el panel izquierdo.
3. Los archivos que empiezan con punto (`.htaccess`) pueden verse atenuados: es normal.

## 4. Ejecutarlo en tu computadora

Haz doble clic en `index.html`, o mejor instala la extensión **Live Server** en VS Code → clic derecho en `index.html` → *Open with Live Server* (se recarga al guardar).

## 5. Cambiar los datos de contacto (un solo lugar)

Abre `js/main.js` y busca el bloque **CONFIGURACIÓN DE RENUEVA** al inicio:

```js
const COMPANY_PHONES = [
  { label: "941 729 826", number: "51941729826" },
  { label: "966 355 580", number: "51966355580" }
];
const COMPANY_EMAIL = "renuevacusco@gmail.com";
const COMPANY_INFO = { direccion: "...", horario: "", social: [ ... ] };
const MAP_EMBED_URL = "https://www.google.com/maps/embed?...";
```

- **Teléfonos:** `label` es lo que se ve; `number` lleva código de país (51 = Perú) sin espacios ni "+". Los números se muestran solo como **texto** (no son enlaces de llamada); para contactar se usan los botones de WhatsApp, que usan `number`. El primero es el de los botones generales.
- **Correo:** `COMPANY_EMAIL`. Asunto y texto inicial: `EMAIL_SUBJECT` y `EMAIL_BODY`.
- **Dirección y horario:** si dejas el horario vacío (`""`), no se muestra.
- **Redes sociales:** ver sección 20.
- Los textos de contacto escritos en `index.html` son solo un respaldo si JavaScript falla; al cargar, la web los reemplaza con lo de `main.js`.

## 6. Cambiar los colores

Abre `css/styles.css` y edita el bloque `:root` (sección 1):

| Variable | Qué cambia |
|---|---|
| `--color-primary` | Amarillo del logo: botones, acentos, enlaces |
| `--color-background` | Azul marino del fondo |
| `--color-surface`, `--color-surface-alt`, `--color-surface-raised` | Fondos de tarjetas y secciones |
| `--color-text`, `--color-text-muted`, `--color-text-faint` | Colores de texto |

Si cambias un color, cambia también su versión `--rgb-*` (se usa para transparencias). Los tamaños de texto son las variables `--text-*` y los espacios `--space-*`.

**Fuentes:** el diseño usa *Bodoni Moda* y *Space Grotesk* (de Google). Como no se usan recursos externos, la web usa fuentes del sistema de aspecto similar. Para usar las originales de forma local: descarga los `.woff2`, créalos en `assets/fonts/` y quita los comentarios del bloque `@font-face` en `css/styles.css`. No lo actives sin los archivos.

## 7. Cambiar textos y servicios

Los textos están en `index.html`. Busca el texto y edítalo. Para agregar un servicio dentro de un área, añade un `<li>` en su lista (`check-list`). Para cambiar el mensaje que se escribe al abrir WhatsApp desde un botón, edita su atributo `data-whatsapp-message`.

**Carrusel de la portada:** son los dos bloques `hero-slide`. Cambia el tiempo con `HERO_INTERVAL_MS` en `js/main.js`. Se pausa al pasar el ratón, con el botón de pausa y si el visitante prefiere menos movimiento.

## 8. Reemplazar las imágenes

| Ubicación | Archivo actual | Proporción recomendada |
|---|---|---|
| Portada | `assets/images/hero-placeholder.svg` | 16:9 (≈ 1920 × 1080 px) |
| Fotos de los álbumes | `assets/images/proyectos/<categoría>/01.svg` … | Horizontal, ≈ 1600 × 1000 px (ver sección 10) |
| Certificados 1 a 4 | `assets/images/certificado-01.svg` … `04.svg` | Cualquiera (se ve completo) |
| Logo del encabezado | `assets/images/logo-marca.png` | Solo el icono |
| Logo del pie | `assets/images/logo-completo.png` | Icono + nombre + lema |
| Icono de pestaña | `assets/icons/favicon.png` | Cuadrado |

Guarda tu imagen en `assets/images/` y cambia el nombre en el atributo `src` de `index.html` (y el texto `alt`, que debe describir la imagen real). Comprime las fotos (JPG o WebP, idealmente menos de 300 KB cada una). Si te dan el logo en SVG o con más resolución, reemplaza los archivos de logo.

## 9. Dónde poner los certificados

Sección **Certificados** (`id="certificados"`) de `index.html`. Es una galería: al pulsar uno se abre en grande, con botones Anterior/Siguiente y flechas del teclado.

**Para reemplazar un ejemplo:**
1. Guarda la imagen del certificado (JPG, PNG o WebP) en `assets/images/`.
2. En su `<li>`, cambia `src` (ruta de la imagen), `alt` (descripción), `data-title` (nombre) y `data-description` (entidad, año, para qué sirve) y el texto de `cert-caption`.

**Para agregar uno:** copia un `<li data-reveal> … </li>` completo de la lista `certificados-lista`, pégalo al final y cambia esos datos. **Para quitar uno:** borra su `<li>`. Si no tienes certificados, borra la sección y su enlace del menú (y del pie).

Consejos: escanea o fotografía los documentos con buena luz; si contienen datos sensibles (números de documento, firmas), tápalos antes de publicarlos. Para un certificado en PDF, conviértelo a imagen (captura o exportación de página).

## 10. Proyectos: álbumes de fotos

Cada recuadro de **Trabajos realizados** es un **álbum**. En la tarjeta se ve la foto principal con flechas, un contador (`1 / 7`) y miniaturas (la última dice `+3` si hay más). Al pulsar la foto o **Ver álbum** se abre el visor grande: todas las fotos, miniaturas, flechas del teclado (← →, Inicio, Fin) y deslizar con el dedo en el celular. Puedes poner **1, 7, 20 fotos o más: no hay límite y solo se muestran las que agregues** (si pones una sola, no aparecen flechas ni miniaturas).

**Para agregar fotos a un álbum:**
1. Guarda la foto en la carpeta de su categoría: `assets/images/proyectos/tramites/`, `seguridad/`, `arquitectura/` o `inmobiliario/`. Por ejemplo `assets/images/proyectos/tramites/08.jpg`.
2. En `index.html`, busca el álbum (comentario `ÁLBUM 1: TRÁMITES Y LICENCIAS`, etc.) y dentro de su `<ul class="album-slides">` copia una línea y pégala al final:

```html
<li class="album-slide"><img src="assets/images/proyectos/tramites/08.jpg" alt="Descripción de la foto" width="1600" height="1000" loading="lazy" decoding="async"></li>
```

3. Cambia `src` por tu archivo y `alt` por una descripción corta (se muestra como pie de foto en el visor y la leen los lectores de pantalla).

**Para quitar una foto:** borra su línea `<li>…</li>`. **Orden:** la primera línea es la portada del álbum.

**Los álbumes de ejemplo** traen 7, 4, 6 y 3 fotos de marcador (para que veas cómo se ve con distintas cantidades). Reemplázalas o bórralas.

**Para crear un álbum nuevo:** copia un bloque `<article class="project-card"> … </article>` completo y cambia `data-category` (`tramites`, `seguridad`, `arquitectura` o `inmobiliario`), `data-detail` (texto que se ve en el visor), el nombre, lugar/año, resumen y sus fotos. Para una categoría nueva, agrega un botón de filtro con `data-filter="nueva"`, y úsala en `data-category`.

**Consejos para las fotos:**
- Formato JPG o WebP, ancho de 1600 px aproximadamente y **menos de 300 KB cada una** (la página carga más rápido). Herramientas gratuitas: squoosh.app o tinypng.com.
- La tarjeta recorta la foto a formato 16:10 (centrada); el visor la muestra **completa**. Evita fotos con lo importante en los bordes.
- Si una foto es vertical, se verá completa en el visor, con franjas a los lados.
- Cuida que las fotos no muestren datos privados de clientes (placas, documentos, rostros) sin permiso.

## 11. Menú, enlaces y botones

| Botón / enlace | Qué hace | Dónde se cambia |
|---|---|---|
| Menú y pie | Navega a una sección | `<nav id="menu-principal">` y `<footer>` en `index.html` |
| Escríbenos / WhatsApp (varios) | Abre WhatsApp | `data-whatsapp`; números en `js/main.js` |
| Correo | Abre la aplicación de correo | `COMPANY_EMAIL` |
| Consultar por WhatsApp (servicios) | WhatsApp con mensaje propio | `data-whatsapp-message` |
| Filtros del portafolio | Muestran una categoría | `data-filter` |
| Ver álbum / foto principal | Abre el visor de fotos del proyecto | `data-album-open` |
| Tarjetas de certificados | Abren el visor | `data-cert-open` |
| Ver mapa interactivo | Carga el mapa de Google | `MAP_EMBED_URL` en `js/main.js` |
| Cómo llegar | Abre Google Maps con la ruta | `MAP_COORDS` en `js/main.js` |
| Puntos y pausa del carrusel | Cambian/pausan el mensaje | `.hero-controls` |
| Enviar consulta | Valida y envía | Formulario en `index.html`; lógica en `js/main.js` |

**Nueva sección:** crea `<section class="section" id="nombre">` en `<main>` y añade `<a href="#nombre">` al menú.

## 12. Animaciones

Entrada escalonada de la portada, carrusel con barra de progreso, aparición de bloques al desplazarse (desde abajo, izquierda o derecha), línea animada en las etiquetas de sección, elevación de tarjetas, subrayado animado del menú, parallax suave de la imagen de portada, ondas del botón de WhatsApp, barra de progreso de lectura, encabezado que se solidifica y ventanas con fundido.

Para animar otro bloque, agrégale `data-reveal` (o `data-reveal="left"` / `"right"`). Los tiempos están en la sección 15 de `css/styles.css`. **Todo se desactiva** si el visitante tiene activada la opción "reducir movimiento" en su dispositivo.

## 13. Dominio y hosting

1. Contrata hosting y dominio (ver sección 19 para Hostinger y para pruebas gratuitas).
2. Sube el contenido de la carpeta `RENUEVA` a la raíz del sitio (`public_html` en Hostinger), con `index.html` en la raíz.
3. Apunta el dominio al hosting y activa el SSL (HTTPS).
4. Quita la etiqueta `noindex` y la línea `Disallow` (sección 15).

## 14. Cómo funciona el formulario

HTML, CSS y JavaScript por sí solos **no pueden enviar un correo de forma segura**. Por eso el formulario usa un servicio externo gratuito, **FormSubmit**, que reenvía cada consulta a `renuevacusco@gmail.com`. No hace falta crear cuenta, pero sí **activarlo una vez** (sección 18).

Qué ve el visitante:
- **Envío correcto:** mensaje "¡Gracias! Recibimos tu consulta…". Solo aparece si el servicio respondió que sí.
- **Si falla** (sin internet, servicio caído o aún sin activar): la web lo dice y muestra tres alternativas para no perder la consulta: **Abrir en Gmail** (redacción lista, dirigida a la empresa), **Abrir mi app de correo** y **Copiar mensaje**.
- **Si `FORM_ENDPOINT` está vacío:** el formulario solo prepara el mensaje y muestra esas tres alternativas.

**Nunca pongas claves privadas en `main.js`.** Las direcciones permitidas son solo `formsubmit.co/ajax/…` y `formspree.io/f/…`.

## 15. Qué revisar antes de publicar

- [ ] `COMPANY_PHONES`, `COMPANY_EMAIL` y `FORM_ENDPOINT` correctos, y **formulario activado** (sección 18).
- [ ] Redes sociales (2 Facebook, TikTok, Instagram, LinkedIn) con sus direcciones, si existen.
- [ ] Buscar `[EDITAR` en `index.html` y `js/main.js`: no debe quedar ninguno (proyectos, certificados, textos).
- [ ] Horario y redes sociales (o dejarlos vacíos).
- [ ] Imágenes y certificados reales con su texto `alt`.
- [ ] Revisar que los textos de servicios y de "Por qué elegirnos" sean exactos, y que promesas como "resultados garantizados" o "tiempo récord" se puedan cumplir y demostrar.
- [ ] Quitar `<meta name="robots" content="noindex, nofollow">` de `index.html` y la línea `Disallow: /` de `robots.txt` (solo al publicar la web real).
- [ ] Probar en móvil y computadora, y en dos navegadores.
- [ ] Consola del navegador (F12): sin errores en rojo.

## 16. Probar que todo funciona

1. **Menú:** pulsa cada enlace; en móvil abre y cierra con el botón, con `Escape` y con clic fuera.
2. **Carrusel:** debe alternar los dos mensajes; prueba los puntos y la pausa.
3. **WhatsApp:** cada botón debe abrir WhatsApp con su mensaje; los dos botones de "Teléfono y WhatsApp" del contacto, cada uno con su número.
4. **Llamadas:** en un teléfono, pulsar un número abre el marcador.
5. **Filtros** y **álbumes**: flechas y miniaturas de cada tarjeta; abre el visor (foto o "Ver álbum"), pasa fotos con flechas, miniaturas y teclado (← → Inicio Fin), desliza en el celular; se cierra con la X, "Cerrar", `Escape` y clic fuera.
6. **Certificados:** abre uno, pasa con Anterior/Siguiente y con las flechas del teclado.
7. **Formulario:** vacío (errores), con correo mal escrito (error) y completo (éxito, o abre tu correo si no hay `FORM_ENDPOINT`).
8. **Teclado:** recorre con `Tab`; el foco siempre debe verse.
9. **Volver arriba** y **botón flotante** de WhatsApp.

---

## Tabla: qué archivo editar para cada cambio frecuente

| Quiero cambiar… | Archivo | Dónde |
|---|---|---|
| Teléfonos, correo, dirección, horario | `js/main.js` | `COMPANY_PHONES`, `COMPANY_EMAIL`, `COMPANY_INFO` |

| Mensaje inicial de WhatsApp | `js/main.js` / `index.html` | `WHATSAPP_MESSAGE` / `data-whatsapp-message` |
| Tiempo del carrusel | `js/main.js` | `HERO_INTERVAL_MS` |
| Envío real del formulario | `js/main.js` | `FORM_ENDPOINT` |
| Colores | `css/styles.css` | Bloque `:root` |
| Titulares de la portada | `index.html` | Sección `#inicio` |
| Servicios | `index.html` | Sección `#servicios` |
| Proyectos y sus fotos | `index.html` + `assets/images/proyectos/` | Sección `#proyectos` |
| Certificados | `index.html` + `assets/images/` | Sección `#certificados` |
| Pasos "Cómo trabajamos" | `index.html` | Sección `#metodologia` |
| Opciones del formulario | `index.html` | Sección `#contacto` |
| Logo | `assets/images/` | `logo-marca.png`, `logo-completo.png` |
| Título y descripción para Google | `index.html` | `<head>` |

---

## 17. Seguridad: qué se hizo y qué NO se puede prometer

**Ninguna web es "imposible de hackear".** Lo que sí se logra es reducir al mínimo lo que se puede atacar. Esta web es **estática** (sin base de datos, contraseñas ni panel de administración), lo que elimina de raíz las vulnerabilidades más comunes (inyección SQL, robo de sesiones, plugins desactualizados).

| Medida | Dónde | Qué te protege de |
|---|---|---|
| Política de Seguridad de Contenido (CSP) | `<meta>` en `index.html` y `_headers` | Scripts o estilos inyectados (XSS); solo se cargan recursos propios, solo se envía el formulario a FormSubmit/Formspree y solo se permite el mapa de Google |
| Mapa con carga por clic y `sandbox` | `js/main.js` | Que Google reciba datos del visitante sin su permiso; limita lo que el mapa puede hacer |
| Redes validadas por dominio | `js/main.js` | Enlaces falsos o mal escritos (cada red debe pertenecer a su dominio oficial) |
| `frame-ancestors 'none'` + `X-Frame-Options` | `_headers` / `.htaccess` | Que otra web incruste la tuya (clickjacking) |
| HSTS | `_headers` / `.htaccess` | Conexiones sin cifrar |
| `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `COOP`, `CORP` | `_headers` / `.htaccess` | Archivos disfrazados, fuga de datos, uso indebido de cámara/micrófono/ubicación |
| Sin `innerHTML`, `eval` ni scripts/estilos en línea | `js/main.js`, `index.html` | XSS |
| Sin librerías ni CDN de terceros | Todo el proyecto | Ataques a la cadena de suministro |
| Validación, `maxlength` y recorte de datos | `index.html`, `js/main.js` | Datos absurdos o enormes |
| Campo trampa, tiempo mínimo y espera entre envíos | `js/main.js` | Spam automático |
| Dirección del formulario validada por patrón | `js/main.js` | Que un cambio malicioso redirija los datos |
| Enlaces externos con `noopener noreferrer`; `fetch` sin cookies | `index.html`, `js/main.js` | Control de pestañas y fuga de cookies |
| Bloqueo de listado de carpetas y archivos ocultos | `.htaccess` | Exposición de archivos internos |

Límites honestos:

- Las cabeceras de `_headers` solo funcionan en hostings que las soporten (Cloudflare Pages, Netlify). En Apache/Hostinger actúa `.htaccess`. En GitHub Pages solo funciona la CSP del `<meta>`.
- La seguridad real depende también de **tus cuentas**: activa verificación en dos pasos en el hosting, el dominio y el correo (y en FormSubmit, si creas cuenta), con contraseñas largas y únicas.
- El spam se reduce pero no se elimina del todo.
- Los datos del formulario viajan cifrados al servicio (FormSubmit), que los procesa según su política de privacidad. El mapa carga contenido de Google solo cuando el visitante lo pide. Si recoges datos personales, publica una política de privacidad acorde con la ley de tu país.

## 18. Hacer funcionar el correo (FormSubmit, gratis y sin cuenta)

1. Publica la web (sección 19). El formulario ya apunta a `renuevacusco@gmail.com`.
2. Abre la web publicada y **envía un mensaje de prueba** desde el formulario.
3. FormSubmit enviará un correo de **activación** a `renuevacusco@gmail.com` (revisa también *Spam* y *Promociones*). Ábrelo y pulsa **Activate Form**.
4. A partir de ahí, cada consulta llega a tu bandeja con el asunto "Consulta a Renueva Consultores y Constructores (tipo de consulta)", en formato de tabla, y puedes **responder directamente** al cliente. Según el propio servicio, el mensaje de prueba queda retenido hasta activar y se entrega después.
5. **Recomendado:** tras activar, FormSubmit te da una dirección con letras al azar (por ejemplo `https://formsubmit.co/ajax/a1b2c3d4e5f6a1b2c3d4`). Pégala en `FORM_ENDPOINT` de `js/main.js`: así tu correo no queda visible en el código de la página.
6. Haz otra prueba y confirma que llega.

**Si algo falla:**
- *No llega nada:* revisa spam y que hayas pulsado "Activate Form".
- *La web muestra "No pudimos enviar…":* abre la consola (F12 → Consola) y revisa si aparece un error de CSP o de red; mientras tanto el visitante puede usar Gmail, la app de correo o copiar el mensaje.
- *Prefieres otro servicio:* Formspree (`https://formspree.io/f/xxxxxxxx`, requiere cuenta). Pégalo en `FORM_ENDPOINT`.
- *No quieres servicio externo:* deja `FORM_ENDPOINT = ""`; el formulario solo prepara el mensaje.

Los servicios gratuitos pueden cambiar sus condiciones: revisa las de FormSubmit en su sitio.

## 19. Subir la web

### Hostinger (hosting web con Apache)
1. Activa el **SSL** del dominio en hPanel **antes** de subir (el `.htaccess` obliga a usar HTTPS).
2. Abre el **Administrador de archivos** → `public_html`.
3. Sube el ZIP y extráelo de modo que `index.html`, `css/`, `js/`, `assets/` y los demás archivos queden **directamente dentro de `public_html`** (no en una subcarpeta).
4. Activa "mostrar archivos ocultos" y confirma que `.htaccess` esté en `public_html`.
5. `_headers` no se usa en Hostinger; las cabeceras las aplica `.htaccess`. Compruébalo en **securityheaders.com**; si no aparecen, pregunta al soporte si `mod_headers` está activo (la CSP del `<meta>` sigue protegiendo).
6. Necesitas un plan de **hosting web**, no solo el creador de sitios.

### Pruebas gratuitas (Netlify o Cloudflare Pages)
- **Netlify:** *Add new site → Deploy manually* y arrastra la carpeta `RENUEVA`.
- **Cloudflare Pages:** *Workers & Pages → Create → Pages → Upload assets* y sube la carpeta.
- Verifica HTTPS (candado), las cabeceras en **securityheaders.com**, la consola (F12) sin errores, el modo móvil y el correo.
- Las condiciones de los planes gratuitos cambian: revísalas en cada sitio.

## 20. Redes sociales (2 Facebook, TikTok, Instagram y LinkedIn)

En `js/main.js`, dentro de `COMPANY_INFO.social`, hay una línea por cuenta:

```js
social: [
  { red: "facebook", etiqueta: "Facebook (página principal)", url: "https://www.facebook.com/tu_pagina" },
  { red: "facebook", etiqueta: "Facebook (segunda página)", url: "https://www.facebook.com/otra_pagina" },
  { red: "tiktok", etiqueta: "TikTok", url: "https://www.tiktok.com/@tu_cuenta" }
]
```

- Pega la dirección completa en `url`. Las que estén vacías **no aparecen**.
- Aparecen en la sección de contacto y en el pie de página.
- Por seguridad, cada dirección debe pertenecer al dominio de su red (facebook.com, tiktok.com, instagram.com, linkedin.com); si no, se ignora.
- Redes disponibles: `facebook`, `instagram`, `tiktok` y `linkedin`. Ya vienen listas dos de Facebook, TikTok, Instagram y LinkedIn: solo pega la dirección en `url` de las que existan. Para sumar otra cuenta (por ejemplo un tercer Facebook), copia una línea.

## 21. Mapa de Ubicación

- Está en la sección **Ubicación** (`id="ubicacion"`). Muestra una vista previa estilizada y **solo carga el mapa de Google cuando el visitante pulsa el botón** (la página carga más rápido y Google no recibe datos antes).
- **Cambiar el mapa:** en Google Maps pulsa *Compartir → Insertar un mapa*, copia solo la dirección que está dentro de `src="…"` y pégala en `MAP_EMBED_URL` de `js/main.js`. Debe empezar con `https://www.google.com/maps/embed`.
- **Botón "Cómo llegar":** usa `MAP_COORDS` (latitud y longitud). Cámbialas si cambias de lugar.
- El mapa actual es el código de inserción que enviaste (una vista de calle). Si prefieres un mapa clásico, genera uno nuevo con *Insertar un mapa* y pega su dirección.
- Si `MAP_EMBED_URL` queda vacío o no es de Google Maps, el bloque del mapa se oculta solo.
- La política de seguridad (CSP) ya permite únicamente `https://www.google.com` para el mapa.

## 22. Qué se eliminó en la limpieza

- Estilos y código sin uso (botón claro, tarjetas antiguas, enlaces de filtro desde servicios, etc.).
- Las paletas alternativas y el selector de paleta (quedó solo la de los colores del logo).
- Las cifras y el testimonio de ejemplo de la plantilla.
- El favicon SVG duplicado (se usa `favicon.png`).

## 23. Adaptación a todos los dispositivos (responsive)

La web se diseña "móvil primero" y se ajusta en estos puntos de corte (`css/styles.css`, sección 17):

| Ancho | Qué cambia |
|---|---|
| Menos de 40rem (≈ 640 px, celulares) | 1 columna; menú de botón (☰) que se abre a pantalla completa, con enlaces grandes, botón de WhatsApp y los datos de contacto al pie; barra superior solo con teléfonos; botón flotante de WhatsApp redondo |
| 40rem (≈ 640 px, celulares grandes) | 2 columnas en certificados y "por qué elegirnos"; se muestran el correo y el lema del logo; botón flotante con texto |
| 56rem (≈ 900 px, tabletas) | Servicios, proyectos, ubicación y contacto en 2 columnas; pasos en 3 columnas; se muestra la dirección en la barra superior |
| 75rem (≈ 1200 px, portátiles) | Menú horizontal con los 6 enlaces y el botón "Escríbenos"; 4 columnas en certificados y "por qué elegirnos" |
| 80rem (≈ 1280 px o más) | Más espacio entre los enlaces del menú |

Detalles incluidos: respeto de las zonas seguras de iPhone con muesca, botones táctiles de tamaño cómodo, imágenes y mapa con proporción fija (sin saltos de diseño), sin efectos "hover" pegados en pantallas táctiles, textos largos que se parten sin desbordar y botones flotantes que no tapan el pie de página.

**Cómo comprobarlo:** en Chrome o Edge pulsa F12 → icono de dispositivos (Ctrl+Shift+M) y prueba 320, 360, 390, 768, 1024, 1280 y 1440 px, en vertical y en horizontal. Revisa que no haya desplazamiento lateral, que el menú abra bien y que nada quede tapado. Haz la misma prueba en tu teléfono real.
