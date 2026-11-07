/* =====================================================================
   RENUEVA — js/main.js
   Todo el comportamiento del sitio está en este archivo.

   ÍNDICE
    1. CONFIGURACIÓN DE RENUEVA  (AQUÍ cambias teléfonos, correo, dirección, redes)
    2. Utilidades (enlaces de WhatsApp y correo, avisos)
    3. Datos de la empresa en la página
    4. Botones de WhatsApp y de correo
    5. Menú móvil
    6. Resaltado del menú según la sección visible
    7. Carrusel de la portada
    8. Filtros del portafolio
    9. Álbumes de fotos de los proyectos
   10. Visor de certificados
   11. Formulario de contacto (validación, envío real y alternativas: Gmail / app de correo / copiar)
   Redes sociales y mapa de Google
   12. Botón volver arriba
   13. Animaciones: aparición al desplazarse, parallax, barra de progreso y encabezado
   14. Inicio
   ===================================================================== */

"use strict";


/* =====================================================================
   1. CONFIGURACIÓN DE RENUEVA
   ESTE ES EL ÚNICO LUGAR donde cambias los datos de contacto.
   Todos los botones de la web leen estos valores.
   ===================================================================== */

/* EDITAR AQUÍ: teléfonos de la empresa (los dos funcionan como llamada y como WhatsApp).
   - label: cómo se ve escrito en la web.
   - number: formato internacional para WhatsApp y llamadas: código de país + número, sin
     espacios, guiones ni signo "+". Aquí se usó el código de Perú (51) porque son números
     peruanos; si fuera otro país, cámbialo.
   El PRIMER teléfono es el que usan los botones generales de WhatsApp (portada, menú, botón flotante).
   Para cambiar un número, edita solo esta lista. */
const COMPANY_PHONES = [
  { label: "941 729 826", number: "51941729826" },
  { label: "966 355 580", number: "51966355580" }
];

/* Número principal de WhatsApp (el primero de la lista de arriba). No hace falta editarlo. */
const WHATSAPP_NUMBER = COMPANY_PHONES[0].number;

/* EDITAR AQUÍ: mensaje que aparecerá escrito al abrir WhatsApp desde los botones generales.
   Algunos botones tienen su propio mensaje (atributo data-whatsapp-message en index.html).
   El visitante debe pulsar "Enviar" en WhatsApp; la web nunca envía nada sola. */
const WHATSAPP_MESSAGE = "Hola, quisiera recibir información sobre los servicios de Renueva Consultores y Constructores.";

/* EDITAR AQUÍ: correo real de la empresa. */
const COMPANY_EMAIL = "renuevacusco@gmail.com";

/* EDITAR AQUÍ: asunto y texto inicial cuando se pulsa un enlace de correo. */
const EMAIL_SUBJECT = "Consulta a Renueva Consultores y Constructores";
const EMAIL_BODY = "Hola, quisiera recibir información sobre los servicios de Renueva Consultores y Constructores.";

/* EDITAR AQUÍ: demás datos de la empresa.
   - Dirección y horario: si los dejas vacíos ("") ese dato se oculta en la web.
   - Redes sociales: una línea por cada cuenta. Pega la dirección completa en "url" (https://…).
     Si "url" está vacía, ese icono NO aparece. Redes disponibles: "facebook", "instagram", "tiktok", "linkedin".
     Para sumar otra cuenta (ejemplo: un tercer Facebook), copia una línea y cambia etiqueta y url.
     Por seguridad, la dirección debe pertenecer al dominio de la red elegida; si no, se ignora. */
const COMPANY_INFO = {
  nombre: "Renueva Consultores y Constructores",
  direccion: "Centro Comercial “Santa Fe”, Oficina N° 205",
  horario: "",     // Ejemplo: "Lunes a viernes, 9:00 a 18:00". Vacío = no se muestra.
  social: [
    { red: "facebook", etiqueta: "Facebook (página principal)", url: "" },   // Ejemplo: "https://www.facebook.com/tu_pagina"
    { red: "facebook", etiqueta: "Facebook (segunda página)", url: "" },
    { red: "tiktok", etiqueta: "TikTok", url: "" },                            // Ejemplo: "https://www.tiktok.com/@tu_cuenta"
    { red: "instagram", etiqueta: "Instagram", url: "" },                      // Ejemplo: "https://www.instagram.com/tu_cuenta/"
    { red: "linkedin", etiqueta: "LinkedIn", url: "" }                         // Ejemplo: "https://www.linkedin.com/company/tu_empresa"
  ]
};

/* EDITAR AQUÍ: MAPA de la sección "Ubicación".
   - MAP_EMBED_URL: la dirección "src" del código de inserción de Google Maps
     (Compartir → Insertar un mapa → copia solo lo que está dentro de src="…").
     Debe empezar con https://www.google.com/maps/embed
   - MAP_COORDS: latitud y longitud, para el botón "Cómo llegar".
   El mapa solo se carga cuando el visitante pulsa el botón. */
const MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!4v1793431243480!6m8!1m7!1sl8SMoOS3AcKaPjJb3yxrBQ!2m2!1d-13.52205199555312!2d-71.96387301416752!3f205.87!4f0!5f0.7820865974627469";
const MAP_COORDS = { lat: -13.52205199555312, lng: -71.96387301416752 };

/* EDITAR AQUÍ: segundos que se muestra cada mensaje del carrusel de la portada. */
const HERO_INTERVAL_MS = 8000;

/* EDITAR AQUÍ: ENVÍO REAL DEL FORMULARIO (servicio externo gratuito).
   Por defecto usa FormSubmit y envía las consultas a COMPANY_EMAIL, sin crear cuenta.
   IMPORTANTE (una sola vez): al publicar la web, envía un mensaje de prueba desde el formulario.
   FormSubmit enviará un correo de activación a COMPANY_EMAIL: ábrelo y pulsa "Activate Form".
   Desde ese momento, todas las consultas llegan a tu bandeja (revisa también el spam).
   OPCIONAL (recomendado tras activar): FormSubmit te da una dirección con letras al azar
   (ej. "https://formsubmit.co/ajax/a1b2c3d4e5f6a1b2c3d4") que oculta tu correo; pégala aquí.
   OTRA OPCIÓN: Formspree, con "https://formspree.io/f/xxxxxxxx".
   Si la dejas vacía (""), el formulario solo prepara el mensaje para enviarlo tú (Gmail o app de correo).
   SEGURIDAD: cualquier otra dirección será rechazada por el código y bloqueada por la CSP. */
const FORM_ENDPOINT = "";

/* Protecciones anti-spam del formulario (puedes ajustar los números). */
const FORM_MIN_SECONDS = 3;        // Tiempo mínimo desde que carga la página hasta poder enviar.
const FORM_COOLDOWN_SECONDS = 30;  // Espera mínima entre dos envíos desde el mismo navegador.
const FORM_TIMEOUT_MS = 10000;     // Tiempo máximo de espera de la respuesta del servicio.

/* Marcadores que indican que un dato todavía no es real. */
const EMAIL_PLACEHOLDER = "correo@dominio.com";


/* =====================================================================
   2. UTILIDADES
   ===================================================================== */

/* ¿El número de WhatsApp es válido? Debe tener solo dígitos (8 a 15). Sin argumento revisa el principal. */
function isWhatsappConfigured(number = WHATSAPP_NUMBER) {
  return /^\d{8,15}$/.test(number);
}

/* ¿El correo está configurado? Debe tener formato válido y no ser el ejemplo. */
function isEmailConfigured() {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(COMPANY_EMAIL) && COMPANY_EMAIL !== EMAIL_PLACEHOLDER;
}

/* ¿El servicio de formularios está configurado? Solo se aceptan direcciones de FormSubmit o Formspree. */
function isFormEndpointConfigured() {
  return /^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+$/.test(FORM_ENDPOINT) ||
    /^https:\/\/formsubmit\.co\/ajax\/([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}|[A-Za-z0-9]{12,})$/.test(FORM_ENDPOINT);
}

/* Construye el enlace de WhatsApp: https://wa.me/NÚMERO?text=MENSAJE (mensaje codificado). */
function buildWhatsappUrl(message = WHATSAPP_MESSAGE, number = WHATSAPP_NUMBER) {
  return "https://wa.me/" + number + "?text=" + encodeURIComponent(message);
}
/* Enlace para redactar un correo nuevo en Gmail (funciona en computadora y en celular). */
function buildGmailUrl(message) {
  return "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(COMPANY_EMAIL) +
    "&su=" + encodeURIComponent(message.subject) +
    "&body=" + encodeURIComponent(message.body);
}
/* Construye un enlace mailto: con destinatario, asunto y cuerpo bien codificados
   (espacios, tildes y saltos de línea). */
function buildMailtoUrl(subject = EMAIL_SUBJECT, body = EMAIL_BODY) {
  return "mailto:" + COMPANY_EMAIL +
    "?subject=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(body);
}

/* Muestra un aviso flotante unos segundos (se lee en voz alta por lector de pantalla). */
let noticeTimer = null;
function showNotice(text) {
  const notice = document.getElementById("aviso");
  if (!notice) return;
  notice.textContent = text;
  notice.hidden = false;
  window.clearTimeout(noticeTimer);
  noticeTimer = window.setTimeout(function () {
    notice.hidden = true;
  }, 7000);
}

/* Atajo para respetar la preferencia de menos movimiento. */
function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}


/* =====================================================================
   3. DATOS DE LA EMPRESA EN LA PÁGINA
   Rellena los textos marcados con data-company="..." y los iconos de redes.
   ===================================================================== */
function initCompanyData() {
  /* Textos: data-company="direccion" | "horario" | "correo" */
  const values = {
    direccion: COMPANY_INFO.direccion,
    horario: COMPANY_INFO.horario,
    correo: COMPANY_EMAIL
  };

  document.querySelectorAll("[data-company]").forEach(function (element) {
    const value = values[element.dataset.company];
    const container = element.closest("[data-company-item]");
    if (value) {
      element.textContent = value;
      if (container) container.hidden = false;
    } else if (container) {
      container.hidden = true;   // Dato vacío: se oculta el bloque completo.
    }
  });

  /* Teléfonos: data-phone="0" (primero) o "1" (segundo). Solo se escribe el número como texto
     (no es un enlace de llamada: para contactar se usan los botones de WhatsApp). */
  document.querySelectorAll("[data-phone]").forEach(function (element) {
    const phone = COMPANY_PHONES[Number(element.dataset.phone)];
    if (!phone || !isWhatsappConfigured(phone.number)) {
      element.hidden = true;
      return;
    }
    element.textContent = phone.label;
  });

  /* Los botones de WhatsApp de cada número indican cuál número es (lectores de pantalla). */
  document.querySelectorAll("[data-whatsapp][data-phone-index]").forEach(function (button) {
    const phone = COMPANY_PHONES[Number(button.dataset.phoneIndex)];
    if (phone) button.setAttribute("aria-label", "Escribir por WhatsApp al " + phone.label);
  });

  /* Enlaces de correo: data-mailto-link abre la aplicación de correo con asunto y texto iniciales. */
  document.querySelectorAll("[data-mailto-link]").forEach(function (link) {
    if (isEmailConfigured()) {
      link.href = buildMailtoUrl();
    } else {
      link.removeAttribute("href");
    }
  });

  /* Si se ocultaron los datos de la barra de la portada, se oculta la barra. */
  const heroBar = document.querySelector(".hero-bar");
  if (heroBar && !heroBar.querySelector(".hero-bar-item:not([hidden])")) {
    heroBar.hidden = true;
  }

  /* Año actual en el pie de página. */
  document.querySelectorAll("[data-year]").forEach(function (element) {
    element.textContent = String(new Date().getFullYear());
  });
}


/* =====================================================================
   4. BOTONES DE WHATSAPP Y DE CORREO
   Cualquier botón con data-whatsapp o data-email funciona automáticamente.
   Para añadir otro botón de WhatsApp: <button type="button" data-whatsapp>…</button>
   ===================================================================== */
/* Abre WhatsApp. Cada botón puede indicar:
   - data-phone-index="1": usar el segundo teléfono (por defecto, el primero).
   - data-whatsapp-message="...": su propio mensaje inicial (por defecto, WHATSAPP_MESSAGE). */
function openWhatsapp(event) {
  const button = event.currentTarget;
  const phone = COMPANY_PHONES[Number(button.dataset.phoneIndex || 0)];
  const number = phone ? phone.number : WHATSAPP_NUMBER;
  const message = button.dataset.whatsappMessage || WHATSAPP_MESSAGE;

  if (!isWhatsappConfigured(number)) {
    showNotice("Falta configurar el número de WhatsApp (COMPANY_PHONES en js/main.js).");
    return;
  }
  /* noopener: la nueva pestaña no puede controlar esta página. */
  window.open(buildWhatsappUrl(message, number), "_blank", "noopener");
}

function openEmail() {
  if (!isEmailConfigured()) {
    showNotice("Falta configurar el correo de la empresa (COMPANY_EMAIL en js/main.js).");
    return;
  }
  window.location.href = buildMailtoUrl();
}

function initContactButtons() {
  document.querySelectorAll("[data-whatsapp]").forEach(function (button) {
    button.addEventListener("click", openWhatsapp);
  });
  document.querySelectorAll("[data-email]").forEach(function (button) {
    button.addEventListener("click", openEmail);
  });
}


/* =====================================================================
   5. MENÚ MÓVIL
   - Se abre/cierra con el botón (aria-expanded se actualiza solo).
   - Se cierra al elegir un enlace, al pulsar Escape, al hacer clic fuera
     y al pasar a pantalla ancha.
   Si cambias los id "menu-toggle" o "menu-principal" en el HTML, cámbialos aquí.
   ===================================================================== */
function initMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("menu-principal");
  if (!toggle || !nav) return;

  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);   // Bloquea el scroll del fondo.
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  }

  function isOpen() {
    return nav.classList.contains("is-open");
  }

  toggle.addEventListener("click", function () {
    setMenu(!isOpen());
  });

  /* Al elegir cualquier enlace del menú, se cierra. */
  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setMenu(false);
    });
  });

  /* Escape cierra el menú y devuelve el foco al botón. */
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && isOpen()) {
      setMenu(false);
      toggle.focus();
    }
  });

  /* Clic fuera del menú y del botón. */
  document.addEventListener("click", function (event) {
    if (isOpen() && !nav.contains(event.target) && !toggle.contains(event.target)) {
      setMenu(false);
    }
  });

  /* Si se agranda la ventana (escritorio), se restaura todo. El valor debe coincidir con el
     punto de corte del menú horizontal en el CSS (75rem = 1200 px). */
  const desktopQuery = window.matchMedia("(min-width: 75rem)");
  desktopQuery.addEventListener("change", function (event) {
    if (event.matches) setMenu(false);
  });
}


/* =====================================================================
   6. RESALTADO DEL MENÚ SEGÚN LA SECCIÓN VISIBLE
   Marca con aria-current="true" el enlace de la sección que se está viendo.
   ===================================================================== */
function initActiveNav() {
  if (!("IntersectionObserver" in window)) return;

  const links = Array.from(document.querySelectorAll(".nav-list .nav-link"));
  const sections = links
    .map(function (link) { return document.querySelector(link.getAttribute("href")); })
    .filter(Boolean);
  if (!sections.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      links.forEach(function (link) {
        const active = link.getAttribute("href") === "#" + entry.target.id;
        if (active) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    });
  }, { rootMargin: "-40% 0px -55% 0px" });

  sections.forEach(function (section) { observer.observe(section); });
}


/* =====================================================================
   7. CARRUSEL DE LA PORTADA
   Alterna los mensajes (.hero-slide) cada HERO_INTERVAL_MS milisegundos.
   - Se detiene al pasar el ratón o enfocar con el teclado dentro de la portada.
   - El botón de pausa lo detiene del todo hasta que se pulse de nuevo.
   - Con "movimiento reducido" no avanza solo (el visitante usa los puntos).
   Los puntos (.hero-dot) permiten elegir un mensaje.
   ===================================================================== */
function initHeroSlider() {
  const slides = Array.from(document.querySelectorAll(".hero-slide"));
  const dots = Array.from(document.querySelectorAll(".hero-dot"));
  const controls = document.querySelector(".hero-controls");
  const pauseButton = document.getElementById("hero-pausa");
  const hero = document.getElementById("inicio");
  if (slides.length < 2 || !controls || !hero) return;

  const reduced = prefersReducedMotion();
  let current = 0;
  let timer = null;
  let userPaused = reduced;    // Con movimiento reducido arranca en pausa.
  let hovering = false;

  controls.style.setProperty("--slide-duration", HERO_INTERVAL_MS + "ms");

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach(function (slide, i) {
      const active = i === current;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
      slide.inert = !active;     // Los botones del mensaje oculto no reciben foco.
    });
    dots.forEach(function (dot, i) {
      const active = i === current;
      dot.classList.toggle("is-active", active);
      if (active) dot.setAttribute("aria-current", "true"); else dot.removeAttribute("aria-current");
    });
  }

  function stop() {
    window.clearTimeout(timer);
    controls.classList.remove("is-playing");
  }

  function schedule() {
    stop();
    if (userPaused || hovering) return;
    /* Reiniciar la clase fuerza que la barra de progreso empiece de cero. */
    void controls.offsetWidth;
    controls.classList.add("is-playing");
    timer = window.setTimeout(function () {
      show(current + 1);
      schedule();
    }, HERO_INTERVAL_MS);
  }

  function paintPause() {
    controls.classList.toggle("is-paused", userPaused);
    if (pauseButton) {
      pauseButton.setAttribute("aria-label", userPaused ? "Reanudar rotación automática" : "Pausar rotación automática");
    }
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener("click", function () {
      show(i);
      schedule();
    });
  });

  if (pauseButton) {
    pauseButton.addEventListener("click", function () {
      userPaused = !userPaused;
      paintPause();
      schedule();
    });
  }

  /* Pausa temporal mientras el visitante está sobre la portada o la usa con el teclado. */
  hero.addEventListener("mouseenter", function () { hovering = true; schedule(); });
  hero.addEventListener("mouseleave", function () { hovering = false; schedule(); });
  hero.addEventListener("focusin", function () { hovering = true; schedule(); });
  hero.addEventListener("focusout", function () { hovering = false; schedule(); });

  /* Si la pestaña no está visible, no avanza. */
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop(); else schedule();
  });

  show(0);
  paintPause();
  schedule();
}


/* =====================================================================
   8. FILTROS DEL PORTAFOLIO
   - Botones .filter-pill con data-filter="categoria".
   - Tarjetas .project-card con data-category="categoria".
   "todos" muestra todos los proyectos.
   ===================================================================== */
function applyFilter(category) {
  document.querySelectorAll(".project-card").forEach(function (card) {
    const show = category === "todos" || card.dataset.category === category;
    const wasHidden = card.hidden;
    card.hidden = !show;
    if (show && wasHidden) {
      card.classList.add("is-visible");       // Ya está a la vista: no esperar al efecto de scroll.
      card.classList.add("is-entering");      // Fundido de entrada (ver CSS, sección 15).
      card.addEventListener("animationend", function () {
        card.classList.remove("is-entering");
      }, { once: true });
    }
  });

  document.querySelectorAll(".filter-pill").forEach(function (pill) {
    const active = pill.dataset.filter === category;
    pill.classList.toggle("is-active", active);
    pill.setAttribute("aria-pressed", String(active));
  });
}

function initProjectFilters() {
  document.querySelectorAll(".filter-pill").forEach(function (pill) {
    pill.addEventListener("click", function () {
      applyFilter(pill.dataset.filter);
    });
  });
}


/* =====================================================================
   9. ÁLBUMES DE FOTOS DE LOS PROYECTOS
   Cada .project-card se convierte en un álbum con las fotos de su <ul class="album-slides">:
   - Tarjeta: foto principal con flechas, contador (1 / 7), miniaturas y deslizar con el dedo.
   - Visor grande (#dialogo-album): todas las fotos, miniaturas, flechas ← → y Escape.
   No hay límite de fotos: se usan las que estén escritas en index.html.
   Si un álbum no tiene fotos, su recuadro se oculta y solo se muestra el texto del proyecto.
   ===================================================================== */
const ALBUM_THUMBS_IN_CARD = 4;   // EDITAR AQUÍ: miniaturas visibles en cada tarjeta (el resto se resume como "+N").

/* Crea un icono SVG que usa un símbolo del bloque de iconos de index.html. */
function makeIcon(symbolId) {
  const SVG_NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("class", "icon");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  const use = document.createElementNS(SVG_NS, "use");
  use.setAttribute("href", "#" + symbolId);
  svg.appendChild(use);
  return svg;
}

/* Deslizar con el dedo: izquierda = siguiente, derecha = anterior. */
function addSwipe(element, onNext, onPrev) {
  let startX = 0;
  let startY = 0;
  element.addEventListener("touchstart", function (event) {
    const touch = event.changedTouches[0];
    startX = touch.clientX;
    startY = touch.clientY;
  }, { passive: true });
  element.addEventListener("touchend", function (event) {
    const touch = event.changedTouches[0];
    const dx = touch.clientX - startX;
    const dy = touch.clientY - startY;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) onNext(); else onPrev();
    }
  }, { passive: true });
}

function initAlbums() {
  const cards = Array.from(document.querySelectorAll(".project-card"));
  const dialog = document.getElementById("dialogo-album");
  if (!cards.length || !dialog) return;

  /* ---- Visor ampliado (uno solo para todos los álbumes) ---- */
  const viewer = {
    title: document.getElementById("album-titulo"),
    category: document.getElementById("album-categoria"),
    meta: document.getElementById("album-meta"),
    detail: document.getElementById("album-detalle"),
    box: document.getElementById("album-visor"),
    stage: document.getElementById("album-escenario"),
    image: document.getElementById("album-imagen"),
    caption: document.getElementById("album-pie"),
    counter: document.getElementById("album-contador"),
    thumbs: document.getElementById("album-miniaturas"),
    prev: document.getElementById("album-anterior"),
    next: document.getElementById("album-siguiente")
  };
  let active = null;      // Álbum abierto: { photos, controller }
  let viewIndex = 0;

  function renderViewer() {
    const photos = active.photos;
    const photo = photos[viewIndex];
    viewer.image.src = photo.src;
    viewer.image.alt = photo.alt;
    viewer.caption.textContent = photo.alt;
    viewer.counter.textContent = (viewIndex + 1) + " / " + photos.length;
    Array.from(viewer.thumbs.children).forEach(function (thumb, i) {
      const isActive = i === viewIndex;
      thumb.classList.toggle("is-active", isActive);
      if (isActive) {
        thumb.setAttribute("aria-current", "true");
        /* Centra la miniatura activa dentro de su fila (sin mover toda la página). */
        const box = viewer.thumbs;
        box.scrollLeft = thumb.offsetLeft - (box.clientWidth - thumb.clientWidth) / 2;
      } else {
        thumb.removeAttribute("aria-current");
      }
    });
    /* Precarga las fotos vecinas para que el cambio sea instantáneo. */
    [-1, 1].forEach(function (step) {
      const neighbour = photos[(viewIndex + step + photos.length) % photos.length];
      if (neighbour) new Image().src = neighbour.src;
    });
  }

  function goViewer(step) {
    if (!active || active.photos.length < 2) return;
    viewIndex = (viewIndex + step + active.photos.length) % active.photos.length;
    renderViewer();
  }

  function openViewer(album, index) {
    active = album;
    viewIndex = index;
    const card = album.card;

    viewer.title.textContent = card.querySelector("h3").textContent;
    viewer.meta.textContent = card.querySelector(".project-meta").textContent;
    viewer.category.textContent = card.querySelector(".project-tag").textContent;
    viewer.detail.textContent = card.dataset.detail || "";

    const photos = album.photos;
    viewer.box.hidden = photos.length === 0;
    const many = photos.length > 1;
    viewer.prev.hidden = !many;
    viewer.next.hidden = !many;
    viewer.thumbs.hidden = !many;
    viewer.thumbs.replaceChildren();

    if (many) {
      photos.forEach(function (photo, i) {
        const thumb = document.createElement("button");
        thumb.type = "button";
        thumb.className = "album-viewer-thumb";
        thumb.setAttribute("aria-label", "Ver foto " + (i + 1) + " de " + photos.length);
        const img = document.createElement("img");
        img.src = photo.src;
        img.alt = "";
        img.loading = "lazy";
        img.decoding = "async";
        thumb.appendChild(img);
        thumb.addEventListener("click", function () {
          viewIndex = i;
          renderViewer();
        });
        viewer.thumbs.appendChild(thumb);
      });
    }

    if (photos.length) renderViewer();
    if (typeof dialog.showModal === "function") dialog.showModal(); else dialog.setAttribute("open", "");
  }

  function closeViewer() {
    if (typeof dialog.close === "function") dialog.close(); else dialog.removeAttribute("open");
  }

  /* Al cerrar, la tarjeta queda en la última foto vista en el visor. */
  dialog.addEventListener("close", function () {
    if (active && active.photos.length) active.controller.show(viewIndex);
  });

  viewer.prev.addEventListener("click", function () { goViewer(-1); });
  viewer.next.addEventListener("click", function () { goViewer(1); });
  addSwipe(viewer.stage, function () { goViewer(1); }, function () { goViewer(-1); });

  dialog.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") { event.preventDefault(); goViewer(-1); }
    if (event.key === "ArrowRight") { event.preventDefault(); goViewer(1); }
    if (event.key === "Home" && active && active.photos.length) { event.preventDefault(); viewIndex = 0; renderViewer(); }
    if (event.key === "End" && active && active.photos.length) { event.preventDefault(); viewIndex = active.photos.length - 1; renderViewer(); }
  });

  dialog.querySelectorAll("[data-album-close]").forEach(function (element) {
    element.addEventListener("click", closeViewer);
  });

  /* Clic en el fondo oscuro (fuera del contenido) también cierra. */
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) closeViewer();
  });

  /* ---- Un álbum por cada tarjeta ---- */
  cards.forEach(function (card) {
    const media = card.querySelector(".project-media");
    const track = card.querySelector(".album-slides");
    const slides = track ? Array.from(track.querySelectorAll(".album-slide")) : [];
    const openButton = card.querySelector("[data-album-open]");
    const openText = card.querySelector("[data-album-open-text]");

    const photos = slides.map(function (slide) {
      const img = slide.querySelector("img");
      return { src: img.getAttribute("src"), alt: img.getAttribute("alt") || "" };
    });
    const total = photos.length;
    let index = 0;
    const title = card.querySelector("h3").textContent;
    const album = { card: card, photos: photos, controller: null };

    /* Texto del botón según la cantidad de fotos. */
    if (openText) {
      openText.textContent = total > 1 ? "Ver álbum · " + total + " fotos" : (total === 1 ? "Ver foto" : "Ver detalle");
    }
    if (openButton) {
      openButton.addEventListener("click", function () { openViewer(album, index); });
    }

    /* Sin fotos: se oculta el recuadro de imágenes. */
    if (!media || total === 0) {
      if (media) media.hidden = true;
      album.controller = { show: function () {} };
      return;
    }

    media.setAttribute("role", "group");
    media.setAttribute("aria-roledescription", "álbum de fotos");
    media.setAttribute("aria-label", "Álbum de fotos: " + title);

    /* Contador con icono de cámara. */
    const counter = document.createElement("span");
    counter.className = "album-count";
    counter.setAttribute("aria-hidden", "true");
    const counterText = document.createElement("span");
    counter.appendChild(makeIcon("i-camera"));
    counter.appendChild(counterText);
    media.appendChild(counter);

    /* Miniaturas (solo si hay más de una foto). */
    let thumbButtons = [];
    if (total > 1) {
      const strip = document.createElement("div");
      strip.className = "album-thumbs";
      const visible = Math.min(total, ALBUM_THUMBS_IN_CARD);
      for (let i = 0; i < visible; i++) {
        const thumb = document.createElement("button");
        thumb.type = "button";
        thumb.className = "album-thumb";
        const isMore = total > ALBUM_THUMBS_IN_CARD && i === visible - 1;
        thumb.setAttribute("aria-label", isMore
          ? "Abrir el álbum completo (" + total + " fotos)"
          : "Mostrar la foto " + (i + 1) + " de " + total);
        const img = document.createElement("img");
        img.src = photos[i].src;
        img.alt = "";
        img.loading = "lazy";
        img.decoding = "async";
        thumb.appendChild(img);
        if (isMore) {
          const more = document.createElement("span");
          more.className = "album-more";
          more.textContent = "+" + (total - visible + 1);
          thumb.appendChild(more);
        }
        thumb.addEventListener("click", function () {
          if (isMore) { openViewer(album, i); } else { show(i); }
        });
        strip.appendChild(thumb);
        thumbButtons.push(thumb);
      }
      media.insertAdjacentElement("afterend", strip);
    }

    function show(i) {
      index = (i + total) % total;
      slides.forEach(function (slide, k) { slide.classList.toggle("is-active", k === index); });
      counterText.textContent = (index + 1) + " / " + total;
      thumbButtons.forEach(function (thumb, k) { thumb.classList.toggle("is-active", k === index); });
      /* Precarga la siguiente foto. */
      if (total > 1) new Image().src = photos[(index + 1) % total].src;
    }
    album.controller = { show: show };

    /* Flechas (solo con 2 o más fotos). */
    if (total > 1) {
      media.classList.add("has-many");
      const prev = document.createElement("button");
      prev.type = "button";
      prev.className = "album-arrow album-prev";
      prev.setAttribute("aria-label", "Foto anterior");
      prev.appendChild(makeIcon("i-chevron-left"));
      prev.addEventListener("click", function () { show(index - 1); });

      const next = document.createElement("button");
      next.type = "button";
      next.className = "album-arrow album-next";
      next.setAttribute("aria-label", "Foto siguiente");
      next.appendChild(makeIcon("i-chevron-right"));
      next.addEventListener("click", function () { show(index + 1); });

      media.appendChild(prev);
      media.appendChild(next);
      addSwipe(track, function () { show(index + 1); }, function () { show(index - 1); });
    }

    /* Tocar o hacer clic en la foto abre el visor grande. */
    track.classList.add("is-clickable");
    track.addEventListener("click", function () { openViewer(album, index); });

    show(0);
  });
}


/* =====================================================================
   10. VISOR DE CERTIFICADOS
   Cada botón .cert-card (data-cert-open) abre la ventana #dialogo-certificado con su imagen.
   Se navega con los botones Anterior/Siguiente o con las flechas ← → del teclado.
   Datos que lee de cada tarjeta: la imagen (<img>), data-title y data-description.
   ===================================================================== */
function initCertificates() {
  const dialog = document.getElementById("dialogo-certificado");
  const cards = Array.from(document.querySelectorAll("[data-cert-open]"));
  if (!dialog || !cards.length) return;

  const titleEl = document.getElementById("cert-titulo");
  const imageEl = document.getElementById("cert-imagen");
  const descEl = document.getElementById("cert-descripcion");
  const counterEl = document.getElementById("cert-contador");
  const prevButton = document.getElementById("cert-anterior");
  const nextButton = document.getElementById("cert-siguiente");
  let index = 0;

  function render() {
    const card = cards[index];
    const thumb = card.querySelector("img");
    titleEl.textContent = card.dataset.title || "";
    descEl.textContent = card.dataset.description || "";
    imageEl.src = thumb.getAttribute("src");
    imageEl.alt = thumb.getAttribute("alt") || "";
    counterEl.textContent = (index + 1) + " de " + cards.length;
    const single = cards.length < 2;
    prevButton.hidden = single;
    nextButton.hidden = single;
  }

  function go(step) {
    index = (index + step + cards.length) % cards.length;
    render();
  }

  function closeViewer() {
    if (typeof dialog.close === "function") dialog.close(); else dialog.removeAttribute("open");
  }

  cards.forEach(function (card, i) {
    card.addEventListener("click", function () {
      index = i;
      render();
      if (typeof dialog.showModal === "function") dialog.showModal(); else dialog.setAttribute("open", "");
    });
  });

  prevButton.addEventListener("click", function () { go(-1); });
  nextButton.addEventListener("click", function () { go(1); });

  /* Flechas del teclado mientras el visor está abierto. */
  dialog.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") { event.preventDefault(); go(-1); }
    if (event.key === "ArrowRight") { event.preventDefault(); go(1); }
  });

  dialog.querySelectorAll("[data-cert-close]").forEach(function (button) {
    button.addEventListener("click", closeViewer);
  });

  /* Clic en el fondo oscuro (fuera del contenido) también cierra. */
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) closeViewer();
  });
}


/* =====================================================================
   11. FORMULARIO DE CONTACTO
   IMPORTANTE: HTML, CSS y JavaScript por sí solos NO pueden enviar un correo de forma
   segura. Este formulario valida los datos y PREPARA un mensaje en la aplicación de
   correo del visitante (mailto:). No simula ningún envío. Ver README, sección 14.
   ===================================================================== */

/* Devuelve el texto de error de un campo, o "" si está correcto. */
function getFieldError(field) {
  const value = field.value.trim();

  if (field.required && !value) {
    return field.tagName === "SELECT" ? "Selecciona una opción." : "Este campo es obligatorio.";
  }
  if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "Escribe un correo válido, por ejemplo nombre@dominio.com.";
  }
  if (field.type === "tel" && value && !/^[+\d\s()-]{6,20}$/.test(value)) {
    return "Escribe un teléfono válido (solo números, espacios, + - y paréntesis).";
  }
  if (field.id === "mensaje" && value && value.length < 10) {
    return "Cuéntanos un poco más (mínimo 10 caracteres).";
  }
  return "";
}

/* Muestra u oculta el error de un campo y actualiza aria-invalid. Devuelve true si es válido. */
function validateField(field) {
  const message = getFieldError(field);
  const errorEl = document.getElementById(field.id + "-error");
  if (errorEl) errorEl.textContent = message;
  if (message) {
    field.setAttribute("aria-invalid", "true");
  } else {
    field.removeAttribute("aria-invalid");
  }
  return message === "";
}

function setFormStatus(text, type) {
  const status = document.getElementById("formulario-estado");
  if (!status) return;
  status.textContent = text;
  status.classList.toggle("is-error", type === "error");
  status.classList.toggle("is-success", type === "success");
}

/* Lectura y escritura segura de sessionStorage (puede estar bloqueado por el navegador). */
function readLastSubmit() {
  try { return Number(window.sessionStorage.getItem("renueva:ultimoEnvio")) || 0; } catch (e) { return 0; }
}
function saveLastSubmit() {
  try { window.sessionStorage.setItem("renueva:ultimoEnvio", String(Date.now())); } catch (e) { /* sin acción */ }
}

/* Recorta cada valor a un largo máximo (defensa extra; el HTML también tiene maxlength). */
function clean(value, max) {
  return String(value || "").trim().slice(0, max);
}

/* Arma el asunto y el texto del mensaje con los datos del formulario. */
function buildMessage(data) {
  const subject = EMAIL_SUBJECT + " (" + clean(data.get("tipo"), 40) + ")";
  const body = [
    "Nombre: " + clean(data.get("nombre"), 100),
    "Correo: " + clean(data.get("correo"), 120),
    "Teléfono: " + (clean(data.get("telefono"), 20) || "No indicado"),
    "Tipo de consulta: " + clean(data.get("tipo"), 40),
    "Ubicación del local o inmueble: " + (clean(data.get("ubicacion"), 100) || "No indicada"),
    "",
    "Descripción del caso:",
    clean(data.get("mensaje"), 2000)
  ].join("\n");
  return { subject: subject, body: body };
}

/* Panel de alternativas: Gmail, aplicación de correo o copiar el mensaje.
   Sirve cuando no hay envío automático, o cuando este falla (así la consulta nunca se pierde). */
function showAlternatives(message) {
  const panel = document.getElementById("formulario-alternativas");
  const gmail = document.getElementById("alt-gmail");
  const mail = document.getElementById("alt-correo");
  const copy = document.getElementById("alt-copiar");
  if (!panel || !gmail || !mail || !copy) return;

  if (!isEmailConfigured()) {
    panel.hidden = true;
    return;
  }

  /* Gmail: abre la redacción de un correo nuevo, ya dirigido a la empresa. */
  gmail.href = "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(COMPANY_EMAIL) +
    "&su=" + encodeURIComponent(message.subject) + "&body=" + encodeURIComponent(message.body);

  /* Se reemplazan los controladores (onclick) para no acumular eventos entre envíos. */
  mail.onclick = function () {
    window.location.href = buildMailtoUrl(message.subject, message.body.replace(/\n/g, "\r\n"));
  };
  copy.onclick = function () {
    const text = "Para: " + COMPANY_EMAIL + "\nAsunto: " + message.subject + "\n\n" + message.body;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showNotice("Mensaje copiado. Pégalo en un correo o en WhatsApp.");
      }).catch(function () {
        showNotice("No se pudo copiar automáticamente. Escríbenos a " + COMPANY_EMAIL + ".");
      });
    } else {
      showNotice("Tu navegador no permite copiar desde aquí. Escríbenos a " + COMPANY_EMAIL + ".");
    }
  };
  panel.hidden = false;
}

function hideAlternatives() {
  const panel = document.getElementById("formulario-alternativas");
  if (panel) panel.hidden = true;
}

/* Envío real al servicio (FormSubmit o Formspree) con fetch.
   Solo se da por recibido si el servicio responde bien; si falla, se explica y se ofrecen alternativas. */
function sendToService(form, data, button, message) {
  const controller = new AbortController();
  const timer = window.setTimeout(function () { controller.abort(); }, FORM_TIMEOUT_MS);

  const payload = {
    nombre: clean(data.get("nombre"), 100),
    email: clean(data.get("correo"), 120),      // Permite responder directamente al visitante.
    telefono: clean(data.get("telefono"), 20),
    tipo: clean(data.get("tipo"), 40),
    ubicacion: clean(data.get("ubicacion"), 100),
    mensaje: clean(data.get("mensaje"), 2000),
    _subject: message.subject,
    _replyto: clean(data.get("correo"), 120),
    _template: "table",    // Correo en formato de tabla (FormSubmit).
    _captcha: "false",     // El anti-spam lo hace esta web (campo trampa, tiempo y espera); sin captcha molesto.
    _honey: ""             // Campo trampa propio de FormSubmit (siempre vacío para personas).
  };

  button.disabled = true;
  form.setAttribute("aria-busy", "true");
  hideAlternatives();
  setFormStatus("Enviando tu consulta…", "");

  fetch(FORM_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify(payload),
    credentials: "omit",                       // No envía cookies al servicio.
    referrerPolicy: "strict-origin-when-cross-origin",
    signal: controller.signal
  }).then(function (response) {
    if (!response.ok) throw new Error("respuesta " + response.status);
    return response.json().catch(function () { return {}; });
  }).then(function (result) {
    /* Si el servicio indica explícitamente que rechazó el envío, se trata como error. */
    if (result && (result.success === false || result.success === "false" || result.ok === false)) {
      throw new Error("rechazado");
    }
    saveLastSubmit();
    form.reset();
    form.querySelectorAll("[aria-invalid]").forEach(function (field) { field.removeAttribute("aria-invalid"); });
    setFormStatus("¡Gracias! Recibimos tu consulta y te responderemos pronto.", "success");
  }).catch(function () {
    /* No se afirma que se envió: se explica qué hacer y se ofrecen alternativas. */
    setFormStatus("No pudimos enviar tu consulta automáticamente. Puedes enviarla con una de estas opciones o escribirnos por WhatsApp.", "error");
    showAlternatives(message);
  }).finally(function () {
    window.clearTimeout(timer);
    button.disabled = false;
    form.removeAttribute("aria-busy");
  });
}

function initContactForm() {
  const form = document.getElementById("formulario-contacto");
  if (!form) return;

  const pageLoadedAt = Date.now();
  const button = document.getElementById("formulario-enviar");
  const note = document.getElementById("formulario-nota");
  const useService = isFormEndpointConfigured();

  /* El texto de ayuda y el botón dependen de cómo funcione el formulario. */
  if (note) {
    note.textContent = useService
      ? "Completa los datos y te responderemos lo antes posible."
      : "Completa los datos y te mostraremos cómo enviar el mensaje por Gmail o por tu aplicación de correo.";
  }
  if (button && !useService) button.textContent = "Preparar mensaje";

  /* Solo se validan los campos reales (el campo trampa no se valida). */
  const fields = Array.from(form.querySelectorAll("input, select, textarea"))
    .filter(function (field) { return field.name !== "_gotcha"; });

  /* Valida al salir de un campo y limpia el error cuando se corrige. */
  fields.forEach(function (field) {
    field.addEventListener("blur", function () { validateField(field); });
    field.addEventListener("input", function () {
      if (field.getAttribute("aria-invalid") === "true") validateField(field);
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    setFormStatus("", "");

    /* Se validan TODOS los campos (sin cortar en el primer error). */
    const invalid = fields.filter(function (field) { return !validateField(field); });
    if (invalid.length) {
      invalid[0].focus();
      setFormStatus("Revisa los campos marcados antes de continuar.", "error");
      return;
    }

    const data = new FormData(form);

    /* Anti-spam 1: campo trampa relleno = bot. Se descarta sin avisarle. */
    if (data.get("_gotcha")) return;

    /* Anti-spam 2: nadie completa un formulario en menos de unos segundos. */
    if (Date.now() - pageLoadedAt < FORM_MIN_SECONDS * 1000) {
      setFormStatus("Espera unos segundos e inténtalo de nuevo.", "error");
      return;
    }

    /* Anti-spam 3: espera mínima entre envíos. */
    const wait = FORM_COOLDOWN_SECONDS * 1000 - (Date.now() - readLastSubmit());
    if (wait > 0) {
      setFormStatus("Ya enviaste una consulta hace un momento. Espera " + Math.ceil(wait / 1000) + " segundos para enviar otra.", "error");
      return;
    }

    const message = buildMessage(data);

    if (useService) {
      sendToService(form, data, button, message);
        } else if (isEmailConfigured()) {
      window.open(buildGmailUrl(message), "_blank", "noopener");
      setFormStatus("Se abrió Gmail con tu mensaje listo. Pulsa «Enviar» en Gmail para terminar. Si no se abrió, usa una de estas opciones.", "success");
      showAlternatives(message);
    } else {
      setFormStatus("Falta configurar el correo de la empresa (COMPANY_EMAIL en js/main.js).", "error");
    }
  });
}


/* =====================================================================
   REDES SOCIALES Y MAPA
   - Redes: se dibujan solas desde COMPANY_INFO.social (solo las que tienen url válida).
   - Mapa: un botón carga el iframe de Google Maps solo cuando el visitante lo pide.
   ===================================================================== */
const SOCIAL_DOMAINS = {
  facebook: ["facebook.com", "fb.com"],
  instagram: ["instagram.com"],
  tiktok: ["tiktok.com"],
  linkedin: ["linkedin.com"]
};

/* Una red es válida si usa https y su dirección pertenece al dominio de esa red. */
function isValidSocialUrl(network, url) {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return false;
    const host = parsed.hostname.toLowerCase().replace(/^www\./, "");
    return (SOCIAL_DOMAINS[network] || []).some(function (domain) {
      return host === domain || host.endsWith("." + domain);
    });
  } catch (e) {
    return false;
  }
}

function initSocial() {
  const valid = COMPANY_INFO.social.filter(function (item) {
    return item && isValidSocialUrl(item.red, item.url);
  });
  document.querySelectorAll("[data-social-list]").forEach(function (list) {
    list.replaceChildren();
    valid.forEach(function (item) {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.className = "social-link";
      link.href = item.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", item.etiqueta + " (se abre en una pestaña nueva)");
      link.title = item.etiqueta;

      const svg = makeIcon("i-" + item.red);
      link.appendChild(svg);
      li.appendChild(link);
      list.appendChild(li);
    });
    list.hidden = valid.length === 0;    // Sin redes configuradas, la lista no se muestra.
  });
}

function initMap() {
  const card = document.getElementById("mapa-tarjeta");
  const box = document.getElementById("mapa-contenedor");
  const loadButton = document.getElementById("mapa-cargar");
  const directions = document.getElementById("mapa-como-llegar");

  /* Botón "Cómo llegar": enlace a Google Maps con las coordenadas de MAP_COORDS. */
  if (directions) {
    if (Number.isFinite(MAP_COORDS.lat) && Number.isFinite(MAP_COORDS.lng)) {
      directions.href = "https://www.google.com/maps/search/?api=1&query=" + MAP_COORDS.lat + "," + MAP_COORDS.lng;
    } else {
      directions.hidden = true;
    }
  }

  if (!card || !box || !loadButton) return;

  /* Seguridad: solo se acepta una dirección de inserción de Google Maps. */
  if (!/^https:\/\/www\.google\.com\/maps\/embed(\/v1\/[a-z]+)?\?/.test(MAP_EMBED_URL)) {
    card.hidden = true;
    return;
  }

  loadButton.addEventListener("click", function () {
    const frame = document.createElement("iframe");
    frame.className = "map-iframe";
    frame.title = "Mapa con la ubicación de " + COMPANY_INFO.nombre;
    frame.src = MAP_EMBED_URL;
    frame.referrerPolicy = "strict-origin-when-cross-origin";
    frame.allowFullscreen = true;
    /* sandbox: el mapa solo puede ejecutar lo imprescindible y abrir enlaces en pestañas nuevas. */
    frame.setAttribute("sandbox", "allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox");
    box.replaceChildren(frame);
    box.classList.add("is-loaded");
    frame.focus();
  });
}


/* =====================================================================
   12. BOTÓN VOLVER ARRIBA
   Aparece cuando se ha bajado más de 600 px.
   ===================================================================== */
function initBackToTop() {
  const button = document.getElementById("volver-arriba");
  if (!button) return;

  const SHOW_AFTER = 600;   // EDITAR AQUÍ: píxeles de scroll para mostrar el botón.

  function update() {
    button.hidden = window.scrollY < SHOW_AFTER;
  }

  window.addEventListener("scroll", update, { passive: true });
  update();

  button.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  });
}


/* =====================================================================
   13. ANIMACIONES AL DESPLAZARSE
   - Los bloques con data-reveal aparecen al entrar en pantalla (con retraso escalonado).
   - La barra superior muestra el progreso de lectura.
   - El encabezado se vuelve más sólido al bajar.
   Para animar otro bloque: agrégale el atributo data-reveal en index.html.
   ===================================================================== */
function initReveal() {
  const items = Array.from(document.querySelectorAll("[data-reveal]"));
  if (!items.length) return;

  /* Sin soporte o con movimiento reducido: todo visible de inmediato. */
  if (!("IntersectionObserver" in window) || prefersReducedMotion()) {
    items.forEach(function (item) { item.classList.add("is-visible", "reveal-done"); });
    return;
  }

  /* Retraso escalonado entre hermanos que se muestran a la vez (80 ms cada uno, máximo 320 ms). */
  items.forEach(function (item) {
    const siblings = Array.from(item.parentElement.children).filter(function (el) {
      return el.hasAttribute("data-reveal");
    });
    const index = Math.min(siblings.indexOf(item), 4);
    item.style.setProperty("--reveal-delay", (index * 80) + "ms");
  });

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const target = entry.target;
      target.classList.add("is-visible");
      observer.unobserve(target);           // Cada bloque se anima una sola vez.
      /* Terminada la entrada, se quita el retraso para que los efectos hover respondan al instante. */
      window.setTimeout(function () {
        target.classList.add("reveal-done");
        target.style.removeProperty("--reveal-delay");
      }, 1200);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

  items.forEach(function (item) { observer.observe(item); });
}

function initScrollEffects() {
  const header = document.querySelector(".site-header");
  const bar = document.getElementById("progreso-scroll");
  const heroMedia = document.querySelector(".hero-media");
  const parallax = !prefersReducedMotion();
  let ticking = false;

  function update() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.setProperty("--progress", max > 0 ? String(Math.min(window.scrollY / max, 1)) : "0");
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 20);
    /* Parallax: la imagen de la portada baja a un cuarto de la velocidad del scroll (máximo 96 px). */
    if (heroMedia && parallax) heroMedia.style.setProperty("--parallax", String(Math.min(window.scrollY * 0.25, 96)));
    ticking = false;
  }

  /* requestAnimationFrame: se actualiza como máximo una vez por cuadro (rendimiento). */
  window.addEventListener("scroll", function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }, { passive: true });
  window.addEventListener("resize", update, { passive: true });
  update();
}


/* =====================================================================
   14. INICIO
   Se ejecuta cuando el HTML ya está cargado.
   ===================================================================== */
function init() {
  initCompanyData();
  initContactButtons();
  initMobileMenu();
  initActiveNav();
  initHeroSlider();
  initProjectFilters();
  initAlbums();
  initCertificates();
  initSocial();
  initMap();
  initContactForm();
  initBackToTop();
  initReveal();
  initScrollEffects();

  /* Avisos en la consola del navegador (F12) sobre datos pendientes de configurar. */
  if (!isWhatsappConfigured()) console.warn("Renueva: revisa COMPANY_PHONES en js/main.js antes de publicar.");
  if (!isEmailConfigured()) console.warn("Renueva: configura COMPANY_EMAIL en js/main.js antes de publicar.");
  if (!isFormEndpointConfigured()) console.info("Renueva: FORM_ENDPOINT vacío; el formulario solo preparará el mensaje (Gmail o app de correo).");
}

document.addEventListener("DOMContentLoaded", init);
