const slidesData = [
    { title: "Relevo generacional: la ventaja que nadie está aprovechando.", sub: "INTRODUCCIÓN", img: "" }, // 0
    { title: "¿un gran auditorio solo para hacer grados?", sub: "EL PARADIGMA", img: "assets/FOTO%201.jpg" }, // 1
    { title: "Los eventos no llegaron a la Universidad. La Universidad decidió encontrarse con el mundo.", sub: "TRANSICIÓN", img: "" }, // 2
    { title: "Academia + Industria + Ciudad", sub: "CONVERGENCIA", img: "assets/FÓRUM%20JPG%20%20(5).jpg" }, // 3
    { title: "Los eventos nunca fueron el objetivo. El impacto sí.", sub: "PROPÓSITO", img: "assets/FOTO%203.jpg" }, // 4
    { title: "Un evento trae personas. Una comunidad trae transformación.", sub: "COMUNIDAD", img: "" }, // 5
    { title: "El talento crece a la velocidad de la confianza.", sub: "CONFIANZA", img: "" }, // 6
    { title: "La experiencia construye el camino. Las nuevas generaciones descubren nuevas rutas.", sub: "RUTAS", img: "assets/IMG_1819%20(2).jpg" }, // 7
    { title: "Una visión. Dos generaciones.", sub: "INTEGRACIÓN", img: "" }, // 8
    { title: "El crecimiento no ocurre cuando una generación reemplaza a otra. Ocurre cuando trabajan juntas.", sub: "TRABAJO CONJUNTO", img: "assets/FÓRUM%20JPG%20%20(2).jpg" }, // 9
    { title: "Los jóvenes no son el futuro. Son el presente que muchas organizaciones aún no ven.", sub: "PRESENTE", img: "" }, // 10
    { title: "El futuro no se hereda. Se construye.", sub: "FUTURO", img: "assets/MG_7563.jpg" }, // 11
    { title: "@centrodeeventosupb", sub: "CONTINUIDAD", img: "qr" } // 12
];

let slideActual = 0;
let particulas = [];
let tiempoGlobal = 0;

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    // Aseguramos que p5 se mantenga atrás
    canvas.style('z-index', '-1'); 

    // Crear 150 nodos base para las esculturas de datos
    for (let i = 0; i < 150; i++) {
        particulas.push({
            id: i,
            fase: random(TWO_PI),
            radio: random(50, width * 0.4),
            velocidad: random(0.002, 0.01),
            x: 0, y: 0
        });
    }

    configurarEventosUI();
    crearPuntosNav();
    actualizarUI();
}

function draw() {
    // FONDO SÓLIDO: Limpia completamente la pantalla. 
    // Esto ELIMINA el destello y el texto fantasma.
    background(5, 5, 12); 
    
    tiempoGlobal += 0.01;
    let centroX = width * 0.5;
    let centroY = height * 0.5;

    // MAGIA VISUAL: Seleccionar qué dibujar según la diapositiva
    switch (slideActual) {
        case 0:
        case 2:
            dibujarAnillosOndulantes(centroX, centroY);
            break;
        case 1:
            dibujarCuadriculaEstricta(centroX, centroY);
            break;
        case 3:
        case 4:
            dibujarConvergencia(centroX, centroY);
            break;
        case 5:
        case 6:
            dibujarRedComunidad(centroX, centroY);
            break;
        case 7:
            dibujarFlujoNuevasRutas(centroX, centroY);
            break;
        case 8:
        case 9:
        case 10:
            dibujarEspiralDoble(centroX, centroY);
            break;
        case 11:
        case 12:
            dibujarGeometriaConstruida(centroX, centroY);
            break;
    }
}

// ==========================================
// MÓDULOS DE ARTE GENERATIVO POR DIAPOSITIVA
// ==========================================

function dibujarAnillosOndulantes(cX, cY) {
    noFill();
    for (let i = 1; i <= 8; i++) {
        let r = i * 40 + sin(tiempoGlobal + i) * 15;
        strokeWeight(1.5);
        stroke(i % 2 === 0 ? color(0, 229, 255, 150) : color(255, 64, 129, 150));
        ellipse(cX, cY, r * 2, r * 2);
    }
}

function dibujarCuadriculaEstricta(cX, cY) {
    stroke(255, 255, 255, 30);
    strokeWeight(1);
    let paso = 50;
    for (let x = 0; x < width; x += paso) {
        line(x, 0, x, height);
    }
    for (let y = 0; y < height; y += paso) {
        line(0, y, width, y);
    }
    // Nodos congelados
    fill(255, 255, 255, 100);
    noStroke();
    for (let p of particulas) {
        let gridX = round(p.radio) % width;
        let gridY = round(p.fase * 100) % height;
        circle(gridX, gridY, 4);
    }
}

function dibujarConvergencia(cX, cY) {
    let radios = [150, 300, 450];
    noFill();
    stroke(255, 255, 255, 20);
    for (let r of radios) circle(cX, cY, r * 2);

    for (let i = 0; i < particulas.length; i++) {
        let p = particulas[i];
        p.fase += p.velocidad;
        p.x = cX + cos(p.fase) * (p.radio * 0.8);
        p.y = cY + sin(p.fase) * (p.radio * 0.8);

        noStroke();
        fill(p.id % 2 === 0 ? '#00e5ff' : '#ff4081');
        circle(p.x, p.y, 5);

        // Líneas apuntando al centro (Atracción)
        stroke(255, 255, 255, 30);
        strokeWeight(0.5);
        if (i % 3 === 0) line(p.x, p.y, cX, cY);
    }
}

function dibujarRedComunidad(cX, cY) {
    for (let i = 0; i < particulas.length; i++) {
        let p = particulas[i];
        p.fase += p.velocidad * 1.5; // Más rápido
        p.x = cX + cos(p.fase) * p.radio;
        p.y = cY + sin(p.fase * 1.2) * (p.radio * 0.6); // Forma elíptica

        noStroke();
        fill(255, 255, 255, 150);
        circle(p.x, p.y, 3);

        // Conexiones de red
        for (let j = i + 1; j < particulas.length; j++) {
            let p2 = particulas[j];
            let d = dist(p.x, p.y, p2.x, p2.y);
            if (d < 100) {
                stroke(0, 229, 255, map(d, 0, 100, 200, 0));
                strokeWeight(1);
                line(p.x, p.y, p2.x, p2.y);
            }
        }
    }
}

function dibujarFlujoNuevasRutas(cX, cY) {
    push();
    translate(cX, cY);
    noFill();
    for (let i = 0; i < particulas.length; i++) {
        let p = particulas[i];
        let angulo = p.fase + tiempoGlobal * 0.5;
        let ruido = noise(p.id, tiempoGlobal * 0.5) * 100;
        
        stroke(p.id % 2 === 0 ? color(0, 229, 255, 100) : color(255, 64, 129, 100));
        strokeWeight(2);
        
        beginShape();
        for(let j = 0; j < 4; j++) {
            let rad = p.radio * (j * 0.3) + ruido;
            curveVertex(cos(angulo + j*0.2) * rad, sin(angulo + j*0.2) * rad);
        }
        endShape();
    }
    pop();
}

function dibujarEspiralDoble(cX, cY) {
    push();
    translate(cX, cY);
    rotate(tiempoGlobal * 0.5);
    for (let i = 0; i < particulas.length; i++) {
        let p = particulas[i];
        let d = map(i, 0, particulas.length, 10, width * 0.4);
        let a = i * 0.2 + tiempoGlobal;

        let x1 = cos(a) * d;
        let y1 = sin(a) * d;
        let x2 = cos(a + PI) * d;
        let y2 = sin(a + PI) * d;

        // Generación 1
        noStroke();
        fill(0, 229, 255, 200);
        circle(x1, y1, 8);
        
        // Generación 2
        fill(255, 64, 129, 200);
        circle(x2, y2, 8);

        // Vínculo (Trabajar juntas)
        stroke(255, 255, 255, 40);
        strokeWeight(1);
        line(x1, y1, x2, y2);
    }
    pop();
}

function dibujarGeometriaConstruida(cX, cY) {
    push();
    translate(cX, cY);
    rotate(tiempoGlobal * 0.2);
    noFill();
    strokeWeight(1.5);

    let lados = 6;
    for (let r = 50; r < 400; r += 50) {
        stroke(r % 100 === 0 ? '#ff4081' : '#00e5ff');
        beginShape();
        for (let i = 0; i < lados; i++) {
            let a = map(i, 0, lados, 0, TWO_PI);
            vertex(cos(a) * r, sin(a) * r);
        }
        endShape(CLOSE);
    }
    
    // Nodos en los vértices
    fill(255);
    noStroke();
    for (let r = 50; r < 400; r += 50) {
        for (let i = 0; i < lados; i++) {
            let a = map(i, 0, lados, 0, TWO_PI);
            circle(cos(a) * r, sin(a) * r, 5);
        }
    }
    pop();
}


// ==========================================
// NAVEGACIÓN Y CONTROL DE LA INTERFAZ
// ==========================================

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
        imgEl.onerror = function() { this.style.display = 'none'; }; // Previene error si la imagen no existe
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
    document.getElementById('btn-next').onclick = () => {
        if (slideActual < slidesData.length - 1) {
            slideActual++;
            actualizarUI();
        }
    };

    document.getElementById('btn-prev').onclick = () => {
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
