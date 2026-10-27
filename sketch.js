const slidesData = [
    { title: "Relevo generacional: la ventaja que nadie está aprovechando.", sub: "INTRODUCCIÓN", img: "" }, // 1
    { title: "¿un gran auditorio solo para hacer grados?", sub: "EL PARADIGMA", img: "assets/FOTO 1.jpg" }, // 2
    { title: "Los eventos no llegaron a la Universidad. La Universidad decidió encontrarse con el mundo.", sub: "TRANSICIÓN", img: "" }, // 3
    { title: "Academia + Industria + Ciudad", sub: "CONVERGENCIA", img: "assets/FORUM_NOCHE.jpg" }, // 4
    { title: "Los eventos nunca fueron el objetivo. El impacto sí.", sub: "PROPÓSITO", img: "assets/FOTO 3.jpg" }, // 5
    { title: "Un evento trae personas. Una comunidad trae transformación.", sub: "COMUNIDAD", img: "" }, // 6
    { title: "El talento crece a la velocidad de la confianza.", sub: "CONFIANZA", img: "" }, // 7
    { title: "La experiencia construye el camino. Las nuevas generaciones descubren nuevas rutas.", sub: "RUTAS", img: "assets/IMG_1819.jpg" }, // 8
    { title: "Una visión. Dos generaciones.", sub: "INTEGRACIÓN", img: "" }, // 9
    { title: "El crecimiento no ocurre cuando una generación reemplaza a otra. Ocurre cuando trabajan juntas.", sub: "TRABAJO CONJUNTO", img: "assets/FORUM_DIA.jpg" }, // 10
    { title: "Los jóvenes no son el futuro. Son el presente que muchas organizaciones aún no ven.", sub: "PRESENTE", img: "" }, // 11
    { title: "El futuro no se hereda. Se construye.", sub: "FUTURO", img: "assets/MG_7563.jpg" }, // 12
    { title: "@centrodeeventosupb", sub: "CONTINUIDAD", img: "qr" } // 13
];

let slideActual = 0;
let particulas = [];
let redEnlaces = [];
let factorExpansion = 1;
let modoFisica = 'orbital';

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '1');

    // Inicializar 350 partículas interactivas
    for (let i = 0; i < 350; i++) {
        particulas.push(new ParticulaSimulacion());
    }

    configurarEventosUI();
    crearPuntosNav();
    actualizarUI();
}

function draw() {
    background(5, 5, 8, 90); // Fondo con breve rastro (motion blur)

    // El mouse afecta el centro gravitacional del arte visual
    let centroX = width * 0.5 + (mouseX - width * 0.5) * 0.1;
    let centroY = height * 0.5 + (mouseY - height * 0.5) * 0.1;

    // Actualizar y dibujar partículas
    for (let i = 0; i < particulas.length; i++) {
        let p = particulas[i];
        p.actualizar(centroX, centroY);
        p.dibujar();

        // Conectar partículas cercanas si estamos en modo comunidad/red
        if (modoFisica === 'red') {
            for (let j = i + 1; j < particulas.length; j++) {
                let p2 = particulas[j];
                let d = dist(p.x, p.y, p2.x, p2.y);
                if (d < 90) {
                    stroke(0, 229, 255, map(d, 0, 90, 150, 0));
                    strokeWeight(0.8);
                    line(p.x, p.y, p2.x, p2.y);
                }
            }
        }
    }
}

class ParticulaSimulacion {
    constructor() {
        this.radioBase = random(30, width * 0.45);
        this.angulo = random(TWO_PI);
        this.velocidad = random(0.002, 0.012);
        this.zOffset = random(-100, 100);
        this.tamano = random(1.5, 4);
        this.x = 0;
        this.y = 0;
        this.esJoven = random(1) > 0.4; // Tipos de generación
    }

    actualizar(cX, cY) {
        this.angulo += this.velocidad;
        let rActual = this.radioBase * factorExpansion;

        if (modoFisica === 'vortice' || modoFisica === 'orbital') {
            this.x = cX + cos(this.angulo) * rActual;
            this.y = cY + sin(this.angulo) * (rActual * 0.3) + this.zOffset;
        } else if (modoFisica === 'expansion') {
            this.x = cX + cos(this.angulo) * (rActual * 1.5);
            this.y = cY + sin(this.angulo) * (rActual * 1.2);
        } else if (modoFisica === 'red') {
            this.x = cX + cos(this.angulo + frameCount * 0.002) * rActual;
            this.y = cY + sin(this.angulo) * (rActual * 0.6);
        }

        // Reacción directa al mover el mouse cerca
        let dMouse = dist(mouseX, mouseY, this.x, this.y);
        if (dMouse < 100) {
            let fuerza = map(dMouse, 0, 100, 15, 0);
            this.x += (this.x - mouseX) * 0.1;
            this.y += (this.y - mouseY) * 0.1;
        }
    }

    dibujar() {
        noStroke();
        if (this.esJoven) {
            fill(0, 229, 255, 200); // Cian (Nuevas generaciones)
        } else {
            fill(255, 64, 129, 180); // Rosado/Magenta (Experiencia)
        }
        circle(this.x, this.y, this.tamano);
    }
}

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
        imgEl.onerror = function() { this.style.display = 'none'; }; // Si la foto falla, no interrumpe el canvas
        qrEl.style.display = "none";
    } else {
        imgEl.style.display = "none";
        qrEl.style.display = "none";
    }

    // Actualizar estados del sistema gráfico según el guion
    switch (slideActual) {
        case 1: // Auditorio estático
            modoFisica = 'orbital';
            factorExpansion = 1.6;
            break;
        case 3: // Academia + Industria + Ciudad
            modoFisica = 'expansion';
            factorExpansion = 1.1;
            break;
        case 5: // Comunidad
        case 6: // Confianza
            modoFisica = 'red';
            factorExpansion = 0.9;
            break;
        case 7: // Rutas
            modoFisica = 'vortice';
            factorExpansion = 1.4;
            break;
        case 9: // Trabajo conjunto
        case 11: // Construcción
            modoFisica = 'red';
            factorExpansion = 0.7;
            break;
        default:
            modoFisica = 'orbital';
            factorExpansion = 1.0;
            break;
    }

    // Actualizar dots
    let dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.className = index === slideActual ? 'dot active' : 'dot';
    });
}

function configurarEventosUI() {
    document.getElementById('btn-next').onclick = (e) => {
        e.stopPropagation();
        if (slideActual < slidesData.length - 1) {
            slideActual++;
            actualizarUI();
        }
    };

    document.getElementById('btn-prev').onclick = (e) => {
        e.stopPropagation();
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
