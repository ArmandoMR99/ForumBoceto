const slidesData = [
    { title: "Relevo generacional: la ventaja que nadie está aprovechando.", sub: "INTRODUCCIÓN", img: "" },
    { title: "¿un gran auditorio solo para hacer grados?", sub: "EL PARADIGMA", img: "assets/FOTO%201.jpg" },
    { title: "Los eventos no llegaron a la Universidad. La Universidad decidió encontrarse con el mundo.", sub: "TRANSICIÓN", img: "" },
    { title: "Academia + Industria + Ciudad", sub: "CONVERGENCIA", img: "assets/FORUM_NOCHE.jpg" },
    { title: "Los eventos nunca fueron el objetivo. El impacto sí.", sub: "PROPÓSITO", img: "assets/FOTO%203.jpg" },
    { title: "Un evento trae personas. Una comunidad trae transformación.", sub: "COMUNIDAD", img: "" },
    { title: "El talento crece a la velocidad de la confianza.", sub: "CONFIANZA", img: "" },
    { title: "La experiencia construye el camino. Las nuevas generaciones descubren nuevas rutas.", sub: "RUTAS", img: "assets/IMG_1819.jpg" },
    { title: "Una visión. Dos generaciones.", sub: "INTEGRACIÓN", img: "" },
    { title: "El crecimiento no ocurre cuando una generación reemplaza a otra. Ocurre cuando trabajan juntas.", sub: "TRABAJO CONJUNTO", img: "assets/FORUM_DIA.jpg" },
    { title: "Los jóvenes no son el futuro. Son el presente que muchas organizaciones aún no ven.", sub: "PRESENTE", img: "" },
    { title: "El futuro no se hereda. Se construye.", sub: "FUTURO", img: "assets/MG_7563.jpg" },
    { title: "@centrodeeventosupb", sub: "CONTINUIDAD", img: "qr" }
];

let slideActual = 0;
let particulas = [];
let factorExpansion = 1;
let modoFisica = 'orbital';

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '1');

    for (let i = 0; i < 300; i++) {
        particulas.push(new ParticulaSimulacion());
    }

    configurarEventosUI();
    crearPuntosNav();
    actualizarUI();
}

function draw() {
    background(5, 5, 8, 90);

    let centroX = width * 0.5 + (mouseX - width * 0.5) * 0.05;
    let centroY = height * 0.5 + (mouseY - height * 0.5) * 0.05;

    for (let i = 0; i < particulas.length; i++) {
        let p = particulas[i];
        p.actualizar(centroX, centroY);
        p.dibujar();

        if (modoFisica === 'red') {
            for (let j = i + 1; j < particulas.length; j++) {
                let p2 = particulas[j];
                let d = dist(p.x, p.y, p2.x, p2.y);
                if (d < 80) {
                    stroke(0, 229, 255, map(d, 0, 80, 120, 0));
                    strokeWeight(0.6);
                    line(p.x, p.y, p2.x, p2.y);
                }
            }
        }
    }
}

class ParticulaSimulacion {
    constructor() {
        this.radioBase = random(40, width * 0.4);
        this.angulo = random(TWO_PI);
        this.velocidad = random(0.002, 0.01);
        this.zOffset = random(-80, 80);
        this.tamano = random(2, 4);
        this.x = 0;
        this.y = 0;
        this.esJoven = random(1) > 0.4;
    }

    actualizar(cX, cY) {
        this.angulo += this.velocidad;
        let rActual = this.radioBase * factorExpansion;

        if (modoFisica === 'vortice' || modoFisica === 'orbital') {
            this.x = cX + cos(this.angulo) * rActual;
            this.y = cY + sin(this.angulo) * (rActual * 0.3) + this.zOffset;
        } else if (modoFisica === 'expansion') {
            this.x = cX + cos(this.angulo) * (rActual * 1.4);
            this.y = cY + sin(this.angulo) * (rActual * 1.1);
        } else if (modoFisica === 'red') {
            this.x = cX + cos(this.angulo + frameCount * 0.002) * rActual;
            this.y = cY + sin(this.angulo) * (rActual * 0.5);
        }
    }

    dibujar() {
        noStroke();
        if (this.esJoven) {
            fill(0, 229, 255, 200);
        } else {
            fill(255, 64, 129, 180);
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
        imgEl.onerror = function() { this.style.display = 'none'; };
        qrEl.style.display = "none";
    } else {
        imgEl.style.display = "none";
        qrEl.style.display = "none";
    }

    switch (slideActual) {
        case 1:
            modoFisica = 'orbital';
            factorExpansion = 1.6;
            break;
        case 3:
            modoFisica = 'expansion';
            factorExpansion = 1.1;
            break;
        case 5:
        case 6:
            modoFisica = 'red';
            factorExpansion = 0.9;
            break;
        case 7:
            modoFisica = 'vortice';
            factorExpansion = 1.4;
            break;
        case 9:
        case 11:
            modoFisica = 'red';
            factorExpansion = 0.7;
            break;
        default:
            modoFisica = 'orbital';
            factorExpansion = 1.0;
            break;
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
