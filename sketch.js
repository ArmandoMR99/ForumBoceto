const slidesData = [
    { title: "Relevo generacional: la ventaja que nadie está aprovechando.", sub: "INTRODUCCIÓN", img: "" }, 
    { title: "¿un gran auditorio solo para hacer grados?", sub: "EL PARADIGMA", img: "Assets/FOTO%201.jpg" }, 
    { title: "Los eventos no llegaron a la Universidad. La Universidad decidió encontrarse con el mundo.", sub: "TRANSICIÓN", img: "Assets/FÓRUM%20JPG%20%20(2).jpg" }, 
    { title: "Academia + Industria + Ciudad", sub: "CONVERGENCIA", img: "Assets/FÓRUM%20JPG%20%20(5).jpg" }, 
    { title: "Los eventos nunca fueron el objetivo. El impacto sí.", sub: "PROPÓSITO", img: "Assets/FOTO%203.jpg" }, 
    { title: "Un evento trae personas. Una comunidad trae transformación.", sub: "COMUNIDAD", img: "Assets/IMG_1819%20(2).jpg" }, 
    { title: "El talento crece a la velocidad de la confianza.", sub: "CONFIANZA", img: "" }, 
    { title: "La experiencia construye el camino. Las nuevas generaciones descubren nuevas rutas.", sub: "RUTAS", img: "Assets/MG_7563.jpg" }, 
    { title: "Una visión. Dos generaciones.", sub: "INTEGRACIÓN", img: "" }, 
    { title: "El crecimiento no ocurre cuando una generación reemplaza a otra. Ocurre cuando trabajan juntas.", sub: "TRABAJO CONJUNTO", img: "Assets/FÓRUM%20JPG%20%20(2).jpg" },  
    { title: "Los jóvenes no son el futuro. Son el presente que muchas organizaciones aún no ven.", sub: "PRESENTE", img: "Assets/FOTO%203.jpg" }, 
    { title: "El futuro no se hereda. Se construye.", sub: "FUTURO", img: "Assets/FÓRUM%20JPG%20%20(5).jpg" }, 
    { title: "@centrodeeventosupb", sub: "CONTINUIDAD", img: "qr" } 
];

let slideActual = 0;
let particulas = [];
let tiempoGlobal = 0;

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1'); 

    // Inicialización del ecosistema generativo
    for (let i = 0; i < 250; i++) {
        particulas.push(new AgenteVisual(i));
    }

    configurarEventosUI();
    crearPuntosNav();
    actualizarUI();
}

function draw() {
    // Usamos transparencia para crear estelas de movimiento orgánico.
    // La limpieza total se hace al cambiar de diapositiva.
    background(3, 3, 6, 25); 
    
    tiempoGlobal += 0.005;
    let cX = width * 0.5;
    let cY = height * 0.5;

    // Ejecutar el motor de renderizado según el concepto de la diapositiva
    switch (slideActual) {
        case 0:
        case 2:
            renderizarAnillosLiquidos(cX, cY);
            break;
        case 1:
            renderizarMatrizTopologica(cX, cY);
            break;
        case 3:
        case 4:
            renderizarEnjambreAtractores(cX, cY);
            break;
        case 5:
        case 6:
            renderizarRedNeuronal(cX, cY);
            break;
        case 7:
            renderizarCampoDeFlujo();
            break;
        case 8:
        case 9:
        case 10:
            renderizarEnlacesBiologicos(cX, cY);
            break;
        case 11:
        case 12:
            renderizarTopografia3D(cX, cY);
            break;
    }
}

// --- CLASE DEL AGENTE VISUAL (Partículas inteligentes) ---
class AgenteVisual {
    constructor(id) {
        this.id = id;
        this.fase = random(TWO_PI);
        this.radioBase = random(20, width * 0.4);
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(0, 0);
        this.esJoven = id % 2 === 0;
        this.colorStr = this.esJoven ? 'rgba(0, 229, 255, 0.7)' : 'rgba(255, 64, 129, 0.7)';
    }
}

// =======================================================
// DIRECCIÓN DE ARTE GENERATIVO (Diseños Únicos y Orgánicos)
// =======================================================

// 1. Anillos Líquidos (Ruido de Perlin para evitar círculos perfectos)
function renderizarAnillosLiquidos(cX, cY) {
    noFill();
    for (let i = 1; i <= 6; i++) {
        stroke(i % 2 === 0 ? color(0, 229, 255, 100) : color(255, 64, 129, 100));
        strokeWeight(1.5);
        beginShape();
        for (let a = 0; a < TWO_PI; a += 0.1) {
            // El ruido mapea el movimiento para que parezca una célula respirando
            let xoff = map(cos(a), -1, 1, 0, 1.5);
            let yoff = map(sin(a), -1, 1, 0, 1.5);
            let offset = map(noise(xoff, yoff, tiempoGlobal * 2 + i), 0, 1, -40, 40);
            let r = i * 60 + offset;
            vertex(cX + r * cos(a), cY + r * sin(a));
        }
        endShape(CLOSE);
    }
}

// 2. Matriz Topológica (Estética glitch sutil)
function renderizarMatrizTopologica(cX, cY) {
    stroke(255, 255, 255, 15);
    strokeWeight(1);
    let paso = 60;
    
    for (let x = 0; x < width; x += paso) {
        let ruidoLinea = noise(x * 0.01, tiempoGlobal) > 0.5;
        if (ruidoLinea) line(x, 0, x, height);
    }
    for (let y = 0; y < height; y += paso) {
        let ruidoLinea = noise(y * 0.01, tiempoGlobal + 100) > 0.5;
        if (ruidoLinea) line(0, y, width, y);
    }

    noStroke();
    for (let p of particulas) {
        if (p.id % 3 !== 0) continue; 
        let targetX = round(p.pos.x / paso) * paso;
        let targetY = round(p.pos.y / paso) * paso;
        // Salto estilo glitch
        p.pos.x = lerp(p.pos.x, targetX + (noise(tiempoGlobal, p.id)-0.5)*10, 0.05);
        p.pos.y = lerp(p.pos.y, targetY, 0.05);
        fill(255, 255, 255, 100);
        rect(p.pos.x - 2, p.pos.y - 2, 4, 4);
    }
}

// 3. Enjambre Atractor (Partículas formando figuras mediante físicas)
function renderizarEnjambreAtractores(cX, cY) {
    let t = tiempoGlobal * 2;
    let atractores = [
        createVector(cX - 300, cY + sin(t)*50),
        createVector(cX, cY - 200 + cos(t)*50),
        createVector(cX + 300, cY + sin(t+PI)*50)
    ];

    for (let i = 0; i < particulas.length; i++) {
        let p = particulas[i];
        let atractor = atractores[i % 3];
        
        // Comportamiento de enjambre (Swarm)
        let direccion = p5.Vector.sub(atractor, p.pos);
        direccion.normalize();
        direccion.mult(0.5);
        
        // Añadimos turbulencia
        let turbulencia = p5.Vector.random2D().mult(0.2);
        p.vel.add(direccion).add(turbulencia);
        p.vel.limit(3);
        p.pos.add(p.vel);

        noStroke();
        fill(p.colorStr);
        circle(p.pos.x, p.pos.y, p.id % 3 === 0 ? 4 : 2);
    }
}

// 4. Red Neuronal Orgánica (Plexus)
function renderizarRedNeuronal(cX, cY) {
    for (let i = 0; i < particulas.length; i++) {
        let p = particulas[i];
        p.fase += 0.005;
        // Movimiento complejo usando curvas de Lissajous orgánicas
        p.pos.x = cX + cos(p.fase + p.id) * p.radioBase;
        p.pos.y = cY + sin(p.fase * 1.5 + p.id) * (p.radioBase * 0.7);

        noStroke();
        fill(255, 255, 255, 150);
        circle(p.pos.x, p.pos.y, 2);

        for (let j = i + 1; j < particulas.length; j++) {
            let p2 = particulas[j];
            let d = dist(p.pos.x, p.pos.y, p2.pos.x, p2.pos.y);
            if (d < 120) {
                // El grosor y la opacidad cambian con el ruido para que "palpite"
                let palpito = noise(i, j, tiempoGlobal * 5);
                stroke(0, 229, 255, map(d, 0, 120, 150 * palpito, 0));
                strokeWeight(palpito * 1.5);
                line(p.pos.x, p.pos.y, p2.pos.x, p2.pos.y);
            }
        }
    }
}

// 5. Campo de Flujo (Simulación de corrientes y fluidos)
function renderizarCampoDeFlujo() {
    for (let p of particulas) {
        // La dirección depende del ruido topológico de su posición
        let angulo = noise(p.pos.x * 0.005, p.pos.y * 0.005, tiempoGlobal * 0.5) * TWO_PI * 2;
        p.vel.set(cos(angulo), sin(angulo)).mult(2.5);
        p.pos.add(p.vel);

        // Si sale de pantalla, reaparece suavemente
        if (p.pos.x < 0) p.pos.x = width;
        if (p.pos.x > width) p.pos.x = 0;
        if (p.pos.y < 0) p.pos.y = height;
        if (p.pos.y > height) p.pos.y = 0;

        noStroke();
        fill(p.colorStr);
        circle(p.pos.x, p.pos.y, 2.5);
    }
}

// 6. Enlaces Biológicos (Doble Hélice en 3D simulado)
function renderizarEnlacesBiologicos(cX, cY) {
    push();
    translate(cX, cY);
    rotate(tiempoGlobal);
    
    let cantidad = 50;
    for (let i = 0; i < cantidad; i++) {
        let r = map(i, 0, cantidad, 20, width * 0.45);
        let a = i * 0.3 - tiempoGlobal * 2;

        let x1 = cos(a) * r;
        let y1 = sin(a) * r;
        let x2 = cos(a + PI) * r; // Lado opuesto
        let y2 = sin(a + PI) * r;

        // Vínculo orgánico entre las dos generaciones
        stroke(255, 255, 255, 30);
        strokeWeight(1);
        if (i % 2 === 0) line(x1, y1, x2, y2);

        noStroke();
        fill(0, 229, 255, 200);
        circle(x1, y1, 6 + sin(a)*3);
        
        fill(255, 64, 129, 200);
        circle(x2, y2, 6 + sin(a+PI)*3);
    }
    pop();
}

// 7. Topografía 3D (Construcción wireframe isométrica)
function renderizarTopografia3D(cX, cY) {
    push();
    translate(cX, cY + 100);
    scale(1, 0.5); // Aplastar para dar perspectiva isométrica
    rotate(PI / 4 + tiempoGlobal * 0.2);
    
    noFill();
    let paso = 60;
    let gridOffset = (tiempoGlobal * 50) % paso; // Efecto de avance
    
    for (let x = -400; x <= 400; x += paso) {
        for (let y = -400; y <= 400; y += paso) {
            let realX = x + gridOffset;
            let realY = y + gridOffset;
            let z = map(noise(realX * 0.005, realY * 0.005, tiempoGlobal), 0, 1, -150, 150);
            
            stroke(z > 0 ? color(0, 229, 255, 80) : color(255, 64, 129, 80));
            strokeWeight(1.5);
            point(realX, realY, z);
            if (x < 400) line(realX, realY, realX + paso, realY);
            if (y < 400) line(realX, realY, realX, realY + paso);
        }
    }
    pop();
}

// ==========================================
// CONTROL DEL SISTEMA E INTERFAZ
// ==========================================

function actualizarUI() {
    // BORRADO TOTAL EN LA TRANSICIÓN: Garantiza que no queden "letras fantasma" de la diapositiva anterior
    background(3, 3, 6);

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
    background(3, 3, 6); // Limpiar fondo al redimensionar la ventana
}
