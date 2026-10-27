const slidesData = [
    { title: "Relevo generacional: la ventaja que nadie está aprovechando.", sub: "INTRODUCCIÓN", img: "" },
    { title: "¿un gran auditorio solo para hacer grados?", sub: "EL PARADIGMA", img: "assets/FOTO%201.jpg" }, //[cite: 18]
    { title: "Los eventos no llegaron a la Universidad. La Universidad decidió encontrarse con el mundo.", sub: "TRANSICIÓN", img: "" },
    { title: "Academia + Industria + Ciudad", sub: "CONVERGENCIA", img: "assets/FÓRUM%20JPG%20%20(5).jpg" }, //[cite: 17]
    { title: "Los eventos nunca fueron el objetivo. El impacto sí.", sub: "PROPÓSITO", img: "assets/FOTO%203.jpg" }, //[cite: 19]
    { title: "Un evento trae personas. Una comunidad trae transformación.", sub: "COMUNIDAD", img: "" },
    { title: "El talento crece a la velocidad de la confianza.", sub: "CONFIANZA", img: "" },
    { title: "La experiencia construye el camino. Las nuevas generaciones descubren nuevas rutas.", sub: "RUTAS", img: "assets/IMG_1819%20(2).jpg" }, //[cite: 20]
    { title: "Una visión. Dos generaciones.", sub: "INTEGRACIÓN", img: "" },
    { title: "El crecimiento no ocurre cuando una generación reemplaza a otra. Ocurre cuando trabajan juntas.", sub: "TRABAJO CONJUNTO", img: "assets/FÓRUM%20JPG%20%20(2).jpg" }, //[cite: 16]
    { title: "Los jóvenes no son el futuro. Son el presente que muchas organizaciones aún no ven.", sub: "PRESENTE", img: "" },
    { title: "El futuro no se hereda. Se construye.", sub: "FUTURO", img: "assets/MG_7563.jpg" }, //[cite: 21]
    { title: "@centrodeeventosupb", sub: "CONTINUIDAD", img: "qr" }
];

let slideActual = 0;
let elementosGenerativos = [];
let anguloGlobal = 0;

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '1');

    for (let i = 0; i < 200; i++) {
        elementosGenerativos.push(new ElementoArte(i));
    }

    configurarEventosUI();
    crearPuntosNav();
    actualizarUI();
}

function draw() {
    background(5, 5, 10, 80); // Transparencia sutil para rastros fluidos
    anguloGlobal += 0.005;

    let cX = width * 0.5;
    let cY = height * 0.5;

    // RENDERIZADO VISUAL SEGÚN EL SLIDE ACTUAL
    switch (slideActual) {
        case 0: // Slide 1: Geometría Sagrada / Anillos en movimiento
            dibujarAnillosGenerativos(cX, cY);
            break;

        case 1: // Slide 2: Cuadrícula Rígida (Auditorio Paralizado)
            dibujarMatrizRigida(cX, cY);
            break;

        case 3: // Slide 4: Academia + Industria + Ciudad (3 Atractores Geométricos)
            dibujarTresAtractores(cX, cY);
            break;

        case 5:
        case 6: // Slides 6 & 7: Red de Constelaciones (Comunidad y Confianza)
            dibujarRedConstelacion();
            break;

        case 7: // Slide 8: Nuevas Rutas / Formas de flores/pétalos dinámicos
            dibujarPetalosFlorales(cX, cY);
            break;

        case 8:
        case 9: // Slides 9 & 10: Doble Hélice Generacional (Trabajando Juntas)
            dibujarDobleHelice(cX, cY);
            break;

        case 11: // Slide 12: Cubos y Prismas 3D (Construcción del futuro)
            dibujarEstructuraConstruida(cX, cY);
            break;

        default: // Fondo estándar orbital expansivo
            dibujarSistemaOrbital(cX, cY);
            break;
    }
}

// --- CLASE PARA ELEMENTOS INDIVIDUALES ---
class ElementoArte {
    constructor(id) {
        this.id = id;
        this.angle = random(TWO_PI);
        this.radius = random(50, width * 0.4);
        this.speed = random(0.002, 0.01);
        this.size = random(3, 8);
        this.colorJoven = color(0, 229, 255, 180);
        this.colorExperiencia = color(255, 64, 129, 180);
        this.esJoven = id % 2 === 0;
    }
}

// --- ESCENOGRAFÍAS GEOMÉTRICAS GENERATIVAS ---

function dibujarAnillosGenerativos(cX, cY) {
    noFill();
    for (let i = 1; i <= 6; i++) {
        stroke(i % 2 === 0 ? '#00e5ff' : '#ff4081');
        strokeWeight(1);
        let r = i * 60 + sin(anguloGlobal * 2 + i) * 20;
        ellipse(cX, cY, r * 2, r * 0.8);
    }
}

function dibujarMatrizRigida(cX, cY) {
    stroke(255, 255, 255, 40);
    strokeWeight(1);
    let paso = 60;
    for (let x = paso; x < width; x += paso) {
        for (let y = paso; y < height; y += paso) {
            rect(x - 10, y - 10, 20, 20);
        }
    }
}

function dibujarTresAtractores(cX, cY) {
    let puntos = [
        { x: cX - 250, y: cY + 100, shape: 'triangulo', c: '#00e5ff' },
        { x: cX, y: cY - 150, shape: 'circulo', c: '#ffffff' },
        { x: cX + 250, y: cY + 100, shape: 'cuadrado', c: '#ff4081' }
    ];

    for (let p of puntos) {
        push();
        translate(p.x, p.y);
        rotate(anguloGlobal * 2);
        stroke(p.c);
        noFill();
        strokeWeight(2);
        if (p.shape === 'triangulo') triangle(-30, 20, 0, -30, 30, 20);
        if (p.shape === 'circulo') ellipse(0, 0, 60, 60);
        if (p.shape === 'cuadrado') rect(-25, -25, 50, 50);
        pop();
    }
}

function dibujarRedConstelacion() {
    for (let i = 0; i < elementosGenerativos.length; i++) {
        let p1 = elementosGenerativos[i];
        p1.angle += p1.speed;
        let x1 = width * 0.5 + cos(p1.angle) * p1.radius;
        let y1 = height * 0.5 + sin(p1.angle) * (p1.radius * 0.4);

        noStroke();
        fill(p1.esJoven ? p1.colorJoven : p1.colorExperiencia);
        circle(x1, y1, p1.size);

        for (let j = i + 1; j < elementosGenerativos.length; j++) {
            let p2 = elementosGenerativos[j];
            let x2 = width * 0.5 + cos(p2.angle) * p2.radius;
            let y2 = height * 0.5 + sin(p2.angle) * (p2.radius * 0.4);

            let d = dist(x1, y1, x2, y2);
            if (d < 90) {
                stroke(255, 255, 255, map(d, 0, 90, 100, 0));
                strokeWeight(0.5);
                line(x1, y1, x2, y2);
            }
        }
    }
}

function dibujarPetalosFlorales(cX, cY) {
    push();
    translate(cX, cY);
    noFill();
    strokeWeight(1.5);
    let petalos = 8;
    for (let i = 0; i < petalos; i++) {
        rotate(TWO_PI / petalos);
        stroke(i % 2 === 0 ? '#00e5ff' : '#ff4081');
        beginShape();
        curveVertex(0, 0);
        curveVertex(50, -100 + sin(anguloGlobal * 3) * 20);
        curveVertex(150, -150);
        curveVertex(0, 0);
        endShape();
    }
    pop();
}

function dibujarDobleHelice(cX, cY) {
    for (let i = 0; i < 40; i++) {
        let x = cX + (i - 20) * 25;
        let y1 = cY + sin(anguloGlobal * 3 + i * 0.2) * 80;
        let y2 = cY - sin(anguloGlobal * 3 + i * 0.2) * 80;

        stroke('#00e5ff');
        fill('#00e5ff');
        circle(x, y1, 6);

        stroke('#ff4081');
        fill('#ff4081');
        circle(x, y2, 6);

        stroke(255, 255, 255, 40);
        line(x, y1, x, y2);
    }
}

function dibujarEstructuraConstruida(cX, cY) {
    push();
    translate(cX, cY);
    rotateY(anguloGlobal);
    rotateX(0.5);
    stroke('#00e5ff');
    noFill();
    strokeWeight(1.5);

    for (let z = -100; z <= 100; z += 50) {
        push();
        translate(0, 0, z);
        box(120 + z * 0.5);
        pop();
    }
    pop();
}

function dibujarSistemaOrbital(cX, cY) {
    for (let p of elementosGenerativos) {
        p.angle += p.speed;
        let x = cX + cos(p.angle) * p.radius;
        let y = cY + sin(p.angle) * (p.radius * 0.3);

        noStroke();
        fill(p.esJoven ? p.colorJoven : p.colorExperiencia);
        circle(x, y, p.size);
    }
}

// --- ACTUALIZACIÓN DE NAVEGACIÓN E INTERFAZ ---

function actualizarUI() {
    let data = slidesData[slideActual];

    document.getElementById('slide-title').innerText = data.title;
    document.getElementById('slide-subtitle').innerText = data.sub;
    document.getElementById('slide-counter').innerText = 
        String(slideActual + 1).padStart(2, '0') + " / " + String(slidesData.length).padStart(2, '0');

    let imgEl = document.getElementById('slide-image');
    let qrEl = document.getElementById('qr-container');

    if (data.img === "qr") {
        imgEl.style.display = "none";
        qrEl.style.display = "flex";
    } else if (data.img !== "") {
        imgEl.src = data.img;
        imgEl.style.display = "block";
        imgEl.onerror = function() { this.style.display = 'none'; };
        qrEl.style.display = "none";
    } else {
        imgEl.style.display = "none";
        qrEl.style.display = "none";
    }

    let dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.className = index === slideActual ? 'dot active' : 'dot';
    });
}

function configurarEventosUI() {
    document.getElementById('btn-next').onclick = (e) => {
        if (slideActual < slidesData.length - 1) {
            slideActual++;
            actualizarUI();
        }
    };

    document.getElementById('btn-prev').onclick = (e) => {
        if (slideActual > 0) {
            slideActual--;
            actualizarUI();
        }
    };

    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            if (slideActual < slidesData.length - 1) {
                slideActual++;
                actualizarUI();
            }
        } else if (e.key === 'ArrowLeft') {
            if (slideActual > 0) {
                slideActual--;
                actualizarUI();
            }
        } else if (e.key === 'f' || e.key === 'F') {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        }
    });
}

function crearPuntosNav() {
    let container = document.getElementById('nav-dots');
    container.innerHTML = '';
    for (let i = 0; i < slidesData.length; i++) {
        let dot = document.createElement('div');
        dot.className = 'dot';
        dot.onclick = () => {
            slideActual = i;
            actualizarUI();
        };
        container.appendChild(dot);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
