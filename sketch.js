const slides = [
  "",
  "RELEVO GERACIONAL: A VANTAGEM QUE NINGUÉM ESTÁ APROVEITANDO\n@centrodeeventosupb", // Slide 1
  "um grande auditório apenas para realizar formaturas?", // Slide 2[cite: 2]
  "Os eventos não chegaram à Universidade.\nA Universidade decidiu encontrar-se com o mundo.", // Slide 3[cite: 2]
  "Academia + Indústria + Cidade", // Slide 4[cite: 2]
  "Os eventos nunca foram o objetivo.\nO impacto sim.", // Slide 5[cite: 2]
  "Um evento traz pessoas.\nUma comunidade traz transformação.", // Slide 6[cite: 2]
  "O talento cresce na velocidade da confiança.", // Slide 7[cite: 2]
  "A experiência constrói o caminho.\nAs novas gerações descobrem novas rotas.", // Slide 8[cite: 2]
  "Uma visão. Duas gerações.", // Slide 9[cite: 2]
  "O crescimento não ocorre quando uma geração substitui a outra.\nOcorre quando trabalham juntas.", // Slide 10[cite: 2]
  "Os jovens não são o futuro.\nSão o presente que muitas organizações ainda não veem.", // Slide 11[cite: 2]
  "O futuro não se herda. Se constrói.", // Slide 12[cite: 2]
  "Obrigado\nQR Memórias" // Slide 13[cite: 2]
];

let slideActual = 1;
let nodos = [];
// Variables de control de comportamiento
let fuerzaRepulsion = 1;
let distanciaConexion = 100;
let rigidez = 0.01;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Crear nodos con diferentes "edades/generaciones"
  for (let i = 0; i < 120; i++) {
    nodos.push(new Nodo(random(width), random(height), i % 3 === 0)); 
    // 1/3 son "experiencia" (nodos grandes), 2/3 son "juventud" (nodos ágiles)
  }
  actualizarSlide();
}

function draw() {
  background(17, 17, 17, 50); // Rastro sutil
  
  // Dibujar conexiones (Tensión y Vínculos)
  for (let i = 0; i < nodos.length; i++) {
    for (let j = i + 1; j < nodos.length; j++) {
      let d = dist(nodos[i].pos.x, nodos[i].pos.y, nodos[j].pos.x, nodos[j].pos.y);
      if (d < distanciaConexion) {
        stroke(255, map(d, 0, distanciaConexion, 255, 0));
        strokeWeight(rigidez > 0.05 ? 2 : 0.5); // Conexiones rígidas son más gruesas
        line(nodos[i].pos.x, nodos[i].pos.y, nodos[j].pos.x, nodos[j].pos.y);
        
        // Aplicar fuerza elástica si hay conexión
        let fuerza = p5.Vector.sub(nodos[j].pos, nodos[i].pos);
        fuerza.mult(rigidez);
        nodos[i].aplicarFuerza(fuerza);
        fuerza.mult(-1);
        nodos[j].aplicarFuerza(fuerza);
      }
    }
  }

  // Actualizar nodos
  for (let nodo of nodos) {
    nodo.comportamiento(fuerzaRepulsion);
    nodo.update();
    nodo.display();
  }
}

class Nodo {
  constructor(x, y, esExperiencia) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
    this.esExperiencia = esExperiencia;
    this.masa = esExperiencia ? 4 : 1.5;
    this.radio = esExperiencia ? 8 : 3;
    this.origen = createVector(x, y); // Para formaciones rígidas
  }

  aplicarFuerza(fuerza) {
    let f = p5.Vector.div(fuerza, this.masa);
    this.acc.add(f);
  }

  comportamiento(repulsion) {
    // Ruido perlin para movimiento orgánico
    let angle = noise(this.pos.x * 0.01, this.pos.y * 0.01, frameCount * 0.01) * TWO_PI;
    let fuerzaRuido = p5.Vector.fromAngle(angle).mult(0.1);
    
    // Si estamos en un slide rígido, forzar hacia su origen
    if (rigidez > 0.05) {
      let regreso = p5.Vector.sub(this.origen, this.pos).mult(0.05);
      this.aplicarFuerza(regreso);
    } else {
      this.aplicarFuerza(fuerzaRuido);
    }

    // Repulsión de los bordes
    if (this.pos.x < 50) this.aplicarFuerza(createVector(repulsion, 0));
    if (this.pos.x > width - 50) this.aplicarFuerza(createVector(-repulsion, 0));
    if (this.pos.y < 50) this.aplicarFuerza(createVector(0, repulsion));
    if (this.pos.y > height - 50) this.aplicarFuerza(createVector(0, -repulsion));
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.esExperiencia ? 1 : 3); // Experiencia es más lenta y estable
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  display() {
    noStroke();
    fill(this.esExperiencia ? '#ff4081' : '#00e5ff'); // Colores Fórum/Future Leaders
    circle(this.pos.x, this.pos.y, this.radio * 2);
  }
}

// Navegación
function keyPressed() {
  if (keyCode === RIGHT_ARROW && slideActual < slides.length - 1) {
    slideActual++;
    actualizarSlide();
  } else if (keyCode === LEFT_ARROW && slideActual > 1) {
    slideActual--;
    actualizarSlide();
  }
}

function actualizarSlide() {
  document.getElementById('slide-text').innerText = slides[slideActual];
  
  // Cambios estructurales según el discurso
  switch(slideActual) {
    case 2:
      // "¿Un gran auditorio...?"[cite: 2]: Estructura rígida, estática, aislada.
      distanciaConexion = 50;
      rigidez = 0.1; // Alta rigidez
      break;
    case 4:
      // "Academia + Industria + Ciudad"[cite: 2]: Se rompe la rigidez, comienzan a buscarse.
      distanciaConexion = 120;
      rigidez = 0.005; // Fluidez
      break;
    case 7:
      // "Velocidad de la confianza"[cite: 2]: Vínculos fuertes y extensos.
      distanciaConexion = 200;
      rigidez = 0.01;
      break;
    case 10:
      // "Ocurre cuando trabajan juntas"[cite: 2]: Las generaciones se atraen directamente.
      distanciaConexion = 150;
      rigidez = 0.02;
      for (let n of nodos) n.vel.mult(2); // Inyección de energía
      break;
    case 12:
      // "El futuro... se constrói"[cite: 2]: La red se consolida.
      distanciaConexion = 250;
      rigidez = 0.05;
      break;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
