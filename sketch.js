const slidesData = [
    { title: "Relevo generacional: la ventaja que nadie está aprovechando.", sub: "INTRODUCCIÓN", img: "" }, // 1
    { title: "¿un gran auditorio solo para hacer grados?", sub: "EL PARADIGMA", img: "assets/FOTO 1.jpg" }, // 2[cite: 18]
    { title: "Los eventos no llegaron a la Universidad. La Universidad decidió encontrarse con el mundo.", sub: "TRANSICIÓN", img: "" }, // 3
    { title: "Academia + Industria + Ciudad", sub: "CONVERGENCIA", img: "assets/FÓRUM JPG  (5).jpg" }, // 4[cite: 17]
    { title: "Los eventos nunca fueron el objetivo. El impacto sí.", sub: "PROPÓSITO", img: "assets/FOTO 3.jpg" }, // 5[cite: 19]
    { title: "Un evento trae personas. Una comunidad trae transformación.", sub: "COMUNIDAD", img: "" }, // 6
    { title: "El talento crece a la velocidad de la confianza.", sub: "CONFIANZA", img: "" }, // 7
    { title: "La experiencia construye el camino. Las nuevas generaciones descubren nuevas rutas.", sub: "RUTAS", img: "assets/IMG_1819 (2).jpg" }, // 8[cite: 20]
    { title: "Una visión. Dos generaciones.", sub: "INTEGRACIÓN", img: "" }, // 9
    { title: "El crecimiento no ocurre cuando una generación reemplaza a otra. Ocurre cuando trabajan juntas.", sub: "TRABAJO CONJUNTO", img: "assets/FÓRUM JPG  (2).jpg" }, // 10[cite: 16]
    { title: "Los jóvenes no son el futuro. Son el presente que muchas organizaciones aún no ven.", sub: "PRESENTE", img: "" }, // 11
    { title: "El futuro no se hereda. Se construye.", sub: "FUTURO", img: "assets/MG_7563.jpg" }, // 12[cite: 21]
    { title: "@centrodeeventosupb", sub: "CONTINUIDAD", img: "qr" } // 13
];

let slideActual = 0;
let particulas = [];
let orbitaGlobal = 0;
let dispersion = 1;
let velocidadGlobal = 0.005;

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    
    for(let i = 0; i < 500; i++) {
        particulas.push(new Particula());
    }
    
    crearPuntosNav();
    actualizarUI();
}

function draw() {
    background(5, 5, 5, 80);
    
    translate(width * 0.5, height * 0.5);
    
    orbitaGlobal += velocidadGlobal * 0.5;
    rotate(orbitaGlobal);

    for (let p of particulas) {
        p.actualizar(dispersion, velocidadGlobal);
        p.dibujar();
    }
}

class Particula {
    constructor() {
        this.radioBase = random(20, windowWidth * 0.7);
        this.angulo = random(TWO_PI);
        this.velocidad = random(0.001, 0.012);
        this.zOffset = random(-80, 80);
        this.grosor = random(0.5, 2.5);
    }

    actualizar(dispersionAct, velGlobal) {
        this.angulo += this.velocidad + velGlobal;
        this.radioActual = this.radioBase * dispersionAct;
    }

    dibujar() {
        let x = cos(this.angulo) * this.radioActual;
        let y = sin(this.angulo) * (this.radioActual * 0.25) + this.zOffset; 
        
        let opacidad = map(this.radioActual, 20, windowWidth*0.7, 255, 0);
        stroke(255, 255, 255, opacidad);
        strokeWeight(this.grosor);
        point(x, y);
    }
}

function actualizarUI() {
    let data = slidesData[slideActual];
    
    document.getElementById('slide-title').innerText = data.title;
    document.getElementById('slide-subtitle').innerText = data.sub;
    document.getElementById('slide-counter').innerText = nf(slideActual + 1, 2) + " / " + slidesData.length;
    
    let imgEl = document.getElementById('slide-image');
    let qrEl = document.getElementById('qr-container');
    
    if (data.img === "qr") {
        imgEl.style.display = "none";
        qrEl.style.display = "flex";
    } else if (data.img !== "") {
        imgEl.src = data.img;
        imgEl.style.display = "block";
        qrEl.style.display = "none";
    } else {
        imgEl.style.display = "none";
        qrEl.style.display = "none";
    }

    let dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.className = index === slideActual ? 'dot active' : 'dot';
    });

    if (slideActual === 1) { 
        dispersion = 1.8; 
        velocidadGlobal = 0.001; 
    } else if (slideActual === 3) { 
        dispersion = 0.9; 
        velocidadGlobal = 0.008;
    } else if (slideActual === 7) { 
        dispersion = 1.3; 
        velocidadGlobal = 0.025; 
    } else if (slideActual === 9) {
        dispersion = 0.6;
        velocidadGlobal = 0.015;
    } else if (slideActual === 11) { 
        dispersion = 0.4; 
        velocidadGlobal = 0.01;
    } else {
        dispersion = lerp(dispersion, 1.0, 0.1);
        velocidadGlobal = 0.005;
    }
}

function keyPressed() {
    if ((keyCode === RIGHT_ARROW || keyCode === 32) && slideActual < slidesData.length - 1) {
        slideActual++;
        actualizarUI();
    } else if (keyCode === LEFT_ARROW && slideActual > 0) {
        slideActual--;
        actualizarUI();
    } else if (key === 'f' || key === 'F') {
        let fs = fullscreen();
        fullscreen(!fs);
    }
}

document.getElementById('btn-next').addEventListener('click', () => {
    if(slideActual < slidesData.length - 1) { slideActual++; actualizarUI(); }
});
document.getElementById('btn-prev').addEventListener('click', () => {
    if(slideActual > 0) { slideActual--; actualizarUI(); }
});

function crearPuntosNav() {
    let container = document.getElementById('nav-dots');
    for (let i = 0; i < slidesData.length; i++) {
        let dot = document.createElement('div');
        dot.className = 'dot';
        container.appendChild(dot);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
