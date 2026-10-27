/* =====================================================================
   RELEVO GENERACIONAL - Fórum UPB
   Para editar contenido, basta con tocar CONFIG y SLIDES.
   El motor (escenas, navegación) no necesita cambios.
   ===================================================================== */

// ---------- 1. CONFIGURACIÓN ----------
const CONFIG = {
    // Mantener en sincronía con las variables :root de style.css
    paleta: {
        fondo: [13, 24, 21],     // bosque nocturno
        hueso: [236, 231, 216],  // texto / trazos neutros
        oro:   [224, 176, 74],   // experiencia
        jade:  [111, 191, 158]   // nuevas generaciones
    },
    particulas: 220,
    fundidoMs: 300               // debe coincidir con transition de "main" en style.css
};

// ---------- 2. CONTENIDO ----------
// escena: anillos | matriz | enjambre | red | flujo | helice | topografia
// img: ruta en Assets, "" (sin imagen) o "qr"
const SLIDES = [
    { sub: "Introducción",     escena: "anillos",    img: "",
      title: "Relevo generacional: la ventaja que nadie está aprovechando." },
    { sub: "El paradigma",     escena: "matriz",     img: "Assets/FOTO%201.jpg",
      alt: "Lanzamiento de birretes en una ceremonia de grado en Fórum",
      title: "¿Un gran auditorio solo para hacer grados?" },
    { sub: "Transición",       escena: "anillos",    img: "Assets/FÓRUM%20JPG%20%20(2).jpg",
      alt: "Espacios abiertos de la UPB de día",
      title: "Los eventos no llegaron a la Universidad. La Universidad decidió encontrarse con el mundo." },
    { sub: "Convergencia",     escena: "enjambre",   img: "Assets/FÓRUM%20JPG%20%20(5).jpg",
      alt: "Fachada nocturna de Fórum UPB",
      title: "Academia + Industria + Ciudad" },
    { sub: "Propósito",        escena: "enjambre",   img: "Assets/FOTO%203.jpg",
      alt: "Panel de expertos en un evento corporativo",
      title: "Los eventos nunca fueron el objetivo. El impacto sí." },
    { sub: "Comunidad",        escena: "red",        img: "Assets/IMG_1819%20(2).jpg",
      alt: "Cena de gala y networking en el auditorio",
      title: "Un evento trae personas. Una comunidad trae transformación." },
    { sub: "Confianza",        escena: "red",        img: "",
      title: "El talento crece a la velocidad de la confianza." },
    { sub: "Rutas",            escena: "flujo",      img: "Assets/MG_7563.jpg",
      alt: "Auditorio principal, amplio y moderno",
      title: "La experiencia construye el camino. Las nuevas generaciones descubren nuevas rutas." },
    { sub: "Integración",      escena: "helice",     img: "",
      title: "Una visión. Dos generaciones." },
    { sub: "Trabajo conjunto", escena: "helice",     img: "Assets/FÓRUM%20JPG%20%20(2).jpg",
      alt: "Infraestructura y espacios abiertos de la UPB",
      title: "El crecimiento no ocurre cuando una generación reemplaza a otra. Ocurre cuando trabajan juntas." },
    { sub: "Presente",         escena: "helice",     img: "Assets/FOTO%203.jpg",
      alt: "Ecosistema de la industria reunido en un panel",
      title: "Los jóvenes no son el futuro. Son el presente que muchas organizaciones aún no ven." },
    { sub: "Futuro",           escena: "topografia", img: "Assets/FÓRUM%20JPG%20%20(5).jpg",
      alt: "Fórum UPB iluminado de noche",
      title: "El futuro no se hereda. Se construye." },
    { sub: "Continuidad",      escena: "topografia", img: "qr",
      title: "@centrodeeventosupb" }
];

// ---------- 3. ESTADO ----------
const C = CONFIG.paleta;
let actual = 0;        // slide visible
let destino = 0;       // slide al que vamos (acumula pulsaciones rápidas)
let temporizador = null;
let particulas = [];
let t = 0;             // tiempo global
let u = 1;             // unidad de escala: 1 = pantalla de 1000 px en su lado menor

// ---------- 4. P5: CICLO PRINCIPAL ----------
function setup() {
    pixelDensity(1);                       // rendimiento estable en pantallas 4K
    const cv = createCanvas(windowWidth, windowHeight);
    cv.parent('lienzo');                   // la capa y su z-index viven en CSS
    calcularUnidad();
    precargarImagenes();
    crearPuntosNav();
    configurarEventos();
    aplicarSlide();
}

function draw() {
    const escena = ESCENAS[SLIDES[actual].escena];
    // Escenas con estela: fundido parcial. Resto: borrado total (sin residuos).
    if (escena.estela) background(...C.fondo, escena.estela);
    else background(...C.fondo);

    t += 0.005;
    escena.draw(width / 2, height / 2);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    calcularUnidad();
    ESCENAS[SLIDES[actual].escena].init();   // recoloca partículas al nuevo tamaño
    background(...C.fondo);
}

function calcularUnidad() { u = min(width, height) / 1000; }

// ---------- 5. PARTÍCULAS ----------
function reiniciarParticulas() {
    particulas = [];
    for (let i = 0; i < CONFIG.particulas; i++) {
        particulas.push({
            id: i,
            x: random(width), y: random(height),
            vx: 0, vy: 0,
            fase: random(TWO_PI),
            k: random(0.05, 0.42),        // radio relativo (escena "red")
            joven: i % 2 === 0
        });
    }
}
const colorPart = (p, a) => p.joven ? [...C.jade, a] : [...C.oro, a];

// ---------- 6. ESCENAS ----------
// Cada una: init() prepara el estado, draw(cx, cy) dibuja un fotograma,
// estela (opcional) = opacidad del fundido por fotograma (0-255).
const ESCENAS = {

    // Anillos líquidos: ruido de Perlin para que respiren como una célula
    anillos: {
        init() {},
        draw(cx, cy) {
            noFill();
            strokeWeight(1.6 * u);
            for (let i = 1; i <= 6; i++) {
                stroke(...(i % 2 ? C.oro : C.jade), 140);
                beginShape();
                for (let a = 0; a < TWO_PI; a += 0.1) {
                    const n = noise(map(cos(a), -1, 1, 0, 1.5), map(sin(a), -1, 1, 0, 1.5), t * 2 + i);
                    const r = (i * 75 + map(n, 0, 1, -45, 45)) * u;
                    vertex(cx + r * cos(a), cy + r * sin(a));
                }
                endShape(CLOSE);
            }
        }
    },

    // Matriz: retícula intermitente donde las partículas saltan a la cuadrícula
    matriz: {
        init() { reiniciarParticulas(); },
        draw() {
            const paso = 60 * u;
            stroke(...C.hueso, 22);
            strokeWeight(1);
            for (let x = 0; x < width; x += paso)  if (noise(x * 0.01, t) > 0.5) line(x, 0, x, height);
            for (let y = 0; y < height; y += paso) if (noise(y * 0.01, t + 100) > 0.5) line(0, y, width, y);

            noStroke();
            for (const p of particulas) {
                if (p.id % 3) continue;
                p.x = lerp(p.x, round(p.x / paso) * paso + (noise(t, p.id) - 0.5) * 10 * u, 0.05);
                p.y = lerp(p.y, round(p.y / paso) * paso, 0.05);
                fill(...colorPart(p, 190));
                rect(p.x - 2 * u, p.y - 2 * u, 4 * u, 4 * u);
            }
        }
    },

    // Enjambre: tres atractores (academia, industria, ciudad)
    enjambre: {
        estela: 30,
        init() { reiniciarParticulas(); },
        draw(cx, cy) {
            const s = t * 2;
            const A = [
                [cx - width * 0.22, cy + sin(s) * 50 * u],
                [cx,                cy - height * 0.22 + cos(s) * 50 * u],
                [cx + width * 0.22, cy + sin(s + PI) * 50 * u]
            ];
            noStroke();
            for (const p of particulas) {
                const [ax, ay] = A[p.id % 3];
                const d = max(dist(p.x, p.y, ax, ay), 1);
                const ang = random(TWO_PI);
                p.vx += (ax - p.x) / d * 0.5 * u + cos(ang) * 0.25 * u;
                p.vy += (ay - p.y) / d * 0.5 * u + sin(ang) * 0.25 * u;
                const v = mag(p.vx, p.vy), lim = 3 * u;
                if (v > lim) { p.vx *= lim / v; p.vy *= lim / v; }
                p.x += p.vx; p.y += p.vy;
                fill(...colorPart(p, 190));
                circle(p.x, p.y, (p.id % 3 ? 2.2 : 4) * u);
            }
        }
    },

    // Red orgánica: nodos en órbitas de Lissajous unidos por hilos que palpitan
    red: {
        init() { reiniciarParticulas(); },
        draw(cx, cy) {
            const N = 150, lim = 120 * u, lim2 = lim * lim;
            for (let i = 0; i < N; i++) {
                const p = particulas[i];
                p.fase += 0.005;
                const R = p.k * width;
                p.x = cx + cos(p.fase + p.id) * R;
                p.y = cy + sin(p.fase * 1.5 + p.id) * R * 0.7;
            }
            for (let i = 0; i < N; i++) {
                const p = particulas[i];
                for (let j = i + 1; j < N; j++) {
                    const q = particulas[j];
                    const dx = p.x - q.x, dy = p.y - q.y, d2 = dx * dx + dy * dy;
                    if (d2 < lim2) {
                        const pal = noise(i, j, t * 5);
                        stroke(...(i % 2 ? C.jade : C.oro), (1 - d2 / lim2) * 170 * pal);
                        strokeWeight(pal * 1.6 * u);
                        line(p.x, p.y, q.x, q.y);
                    }
                }
            }
            noStroke();
            fill(...C.hueso, 190);
            for (let i = 0; i < N; i++) circle(particulas[i].x, particulas[i].y, 2.4 * u);
        }
    },

    // Campo de flujo: corrientes guiadas por ruido
    flujo: {
        estela: 22,
        init() { reiniciarParticulas(); },
        draw() {
            noStroke();
            for (const p of particulas) {
                const ang = noise(p.x * 0.005 / u, p.y * 0.005 / u, t * 0.5) * TWO_PI * 2;
                p.x += cos(ang) * 2.4 * u;
                p.y += sin(ang) * 2.4 * u;
                if (p.x < 0) p.x = width;  else if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height; else if (p.y > height) p.y = 0;
                fill(...colorPart(p, 200));
                circle(p.x, p.y, 2.6 * u);
            }
        }
    },

    // Hélice: dos generaciones enlazadas girando
    helice: {
        init() {},
        draw(cx, cy) {
            push();
            translate(cx, cy);
            rotate(t);
            const n = 50;
            for (let i = 0; i < n; i++) {
                const r = map(i, 0, n, 20 * u, width * 0.45);
                const a = i * 0.3 - t * 2;
                const x1 = cos(a) * r, y1 = sin(a) * r;
                const x2 = -x1, y2 = -y1;
                if (i % 2 === 0) { stroke(...C.hueso, 40); strokeWeight(1); line(x1, y1, x2, y2); }
                noStroke();
                fill(...C.oro, 220);  circle(x1, y1, (6 + sin(a) * 3) * u);
                fill(...C.jade, 220); circle(x2, y2, (6 + sin(a + PI) * 3) * u);
            }
            pop();
        }
    },

    // Topografía: malla en perspectiva isométrica, la altura se proyecta en Y
    topografia: {
        init() {},
        draw(cx, cy) {
            const n = 22;
            const cell = width * 0.8 / (1.8 * n);
            const pts = [];
            for (let i = 0; i <= n; i++) {
                pts[i] = [];
                for (let j = 0; j <= n; j++) {
                    const x = (i - n / 2) * cell, y = (j - n / 2) * cell;
                    const h = noise(i * 0.12, j * 0.12 - t * 0.8, t * 0.3);
                    const z = (h - 0.5) * 220 * u;
                    pts[i][j] = { sx: cx + (x - y) * 0.9, sy: cy + 60 * u + (x + y) * 0.45 - z, h };
                }
            }
            noFill();
            strokeWeight(1.3 * u);
            for (let i = 0; i <= n; i++) {
                for (let j = 0; j <= n; j++) {
                    const a = pts[i][j];
                    const m = constrain(map(a.h, 0.3, 0.7, 0, 1), 0, 1);
                    const c = [lerp(C.jade[0], C.oro[0], m), lerp(C.jade[1], C.oro[1], m), lerp(C.jade[2], C.oro[2], m)];
                    stroke(...c, 150);
                    if (i < n) line(a.sx, a.sy, pts[i + 1][j].sx, pts[i + 1][j].sy);
                    if (j < n) line(a.sx, a.sy, pts[i][j + 1].sx, pts[i][j + 1].sy);
                }
            }
        }
    }
};

// ---------- 7. NAVEGACIÓN E INTERFAZ ----------
// Única puerta de entrada para cambiar de slide (botones, teclado y puntos).
function irA(n) {
    n = constrain(n, 0, SLIDES.length - 1);
    if (n === destino) return;
    destino = n;
    const main = document.getElementById('contenido');
    main.classList.add('saliendo');
    clearTimeout(temporizador);
    temporizador = setTimeout(() => {
        actual = destino;
        aplicarSlide();
        main.classList.remove('saliendo');
    }, CONFIG.fundidoMs);
}

// Aplica el slide actual: limpia lienzo, reinicia la escena y actualiza textos.
function aplicarSlide() {
    const d = SLIDES[actual];
    ESCENAS[d.escena].init();
    background(...C.fondo);   // borrado total: ningún residuo del slide anterior

    document.getElementById('slide-title').textContent = d.title;
    document.getElementById('slide-subtitle').textContent = d.sub;
    document.getElementById('slide-counter').textContent =
        String(actual + 1).padStart(2, '0') + ' / ' + String(SLIDES.length).padStart(2, '0');

    const img = document.getElementById('slide-image');
    const qr = document.getElementById('qr-container');
    img.hidden = true;
    qr.hidden = true;
    if (d.img === 'qr') {
        qr.hidden = false;
    } else if (d.img) {
        img.onerror = () => { img.hidden = true; };   // antes de asignar src
        img.alt = d.alt || '';
        img.src = d.img;
        img.hidden = false;
    }

    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === actual);
        dot.setAttribute('aria-current', i === actual ? 'true' : 'false');
    });
}

function precargarImagenes() {
    SLIDES.forEach(s => { if (s.img && s.img !== 'qr') new Image().src = s.img; });
}

function crearPuntosNav() {
    const cont = document.getElementById('nav-dots');
    cont.innerHTML = '';
    SLIDES.forEach((s, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'dot';
        dot.setAttribute('aria-label', 'Ir al slide ' + (i + 1) + ': ' + s.sub);
        dot.onclick = () => irA(i);
        cont.appendChild(dot);
    });
}

function configurarEventos() {
    document.getElementById('btn-next').onclick = () => irA(destino + 1);
    document.getElementById('btn-prev').onclick = () => irA(destino - 1);

    window.addEventListener('keydown', (e) => {
        if (e.repeat) return;
        const k = e.key;
        if (k === 'ArrowRight' || k === ' ' || k === 'PageDown') {
            e.preventDefault();                 // evita el doble avance con botón enfocado
            irA(destino + 1);
        } else if (k === 'ArrowLeft' || k === 'PageUp') {
            e.preventDefault();
            irA(destino - 1);
        } else if (k === 'f' || k === 'F') {
            if (!document.fullscreenElement) document.documentElement.requestFullscreen();
            else document.exitFullscreen();
        }
    });
}
