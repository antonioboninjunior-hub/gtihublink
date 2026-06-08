let nuvens = [];
let vacas = [];
let peixes = [];
let passaros = [];
let plantas = [];

let tratorX = 50;
let tempo = 0;

// 🎮 QUIZ EM SEQUÊNCIA
let modo = "fazenda"; // fazenda | quiz | final
let tempoInicio;

let perguntaAtual = 0;
let feedback = "";

let perguntas = [
  {
    pergunta: "O que as plantas precisam para crescer?",
    opcoes: ["A) Pedra", "B) Água", "C) Plástico"],
    resposta: "B"
  },
  {
    pergunta: "Qual animal produz leite?",
    opcoes: ["A) Vaca", "B) Peixe", "C) Trator"],
    resposta: "A"
  },
  {
    pergunta: "O Agrinho fala sobre:",
    opcoes: ["A) Cidade", "B) Agricultura", "C) Internet"],
    resposta: "B"
  }
];

function setup() {
  createCanvas(900, 500);

  tempoInicio = millis();

  for (let i = 0; i < 5; i++) {
    nuvens.push({ x: random(width), y: random(40, 140), vel: random(0.3, 1) });
  }

  for (let i = 0; i < 4; i++) {
    vacas.push({ x: random(400, 850), y: random(260, 340), vel: random(0.3, 0.7) });
  }

  for (let i = 0; i < 6; i++) {
    peixes.push({ x: random(350, 850), y: random(350, 450), vel: random(1, 2), fase: random(TWO_PI), tamanho: random(12, 22) });
  }

  for (let i = 0; i < 6; i++) {
    passaros.push({ x: random(width), y: random(40, 160), vel: random(1, 2) });
  }
}

function draw() {

  if (modo === "fazenda") {
    desenharFazenda();

    if (millis() - tempoInicio > 15000) {
      modo = "quiz";
    }
  }

  else if (modo === "quiz") {
    desenharQuiz();
  }

  else if (modo === "final") {
    desenharFinal();
  }
}

// ===================== FAZENDA =====================

function desenharFazenda() {

  tempo += 0.01;

  desenharCeu();
  desenharSol();
  desenharMontanhas();
  desenharCampo();
  desenharRio();

  desenharPassaros();
  desenharPeixes();

  desenharTrator();
  desenharVacas();

  desenharArvores();
  desenharCasa();
  desenharNuvens();

  desenharPlantas();
}

// ---------------- CÉU ----------------
function desenharCeu() {
  let intensidade = sin(tempo) * 0.5 + 0.5;
  let r = lerp(10, 135, intensidade);
  let g = lerp(10, 206, intensidade);
  let b = lerp(40, 235, intensidade);
  background(r, g, b);
}

function desenharSol() {
  let intensidade = sin(tempo) * 0.5 + 0.5;
  if (intensidade > 0.3) {
    noStroke();
    fill(255, 204, 0);
    ellipse(100, 80, 90);
  }
}

function desenharMontanhas() {
  fill(100, 160, 100);
  triangle(80, 250, 250, 100, 420, 250);
  triangle(300, 250, 500, 90, 700, 250);
  triangle(520, 250, 750, 120, 950, 250);
}

function desenharCampo() {
  fill(80, 180, 80);
  rect(0, 250, width, 250);
}

// ---------------- RIO ----------------
function desenharRio() {
  fill(50, 140, 255);
  beginShape();
  vertex(350, 500);
  bezierVertex(420, 420, 520, 420, 600, 500);
  vertex(900, 500);
  vertex(900, 380);
  bezierVertex(700, 320, 550, 300, 350, 380);
  endShape(CLOSE);
}

// ---------------- PASSÁROS ----------------
function desenharPassaros() {
  stroke(0);
  strokeWeight(2);
  noFill();

  for (let p of passaros) {
    p.x += p.vel;

    if (p.x > width + 20) {
      p.x = -20;
      p.y = random(40, 160);
    }

    let flap = sin(frameCount * 0.2 + p.x) * 5;

    line(p.x, p.y, p.x - 10, p.y + flap);
    line(p.x, p.y, p.x + 10, p.y + flap);
  }

  noStroke();
}

// ---------------- PEIXES ----------------
function desenharPeixes() {
  for (let p of peixes) {
    p.x += p.vel;

    if (p.x > width + 30) {
      p.x = 350;
    }

    let y = p.y + sin(frameCount * 0.1 + p.fase) * 20;

    fill(255, 140, 0);
    ellipse(p.x, y, p.tamanho * 1.5, p.tamanho);

    triangle(
      p.x - p.tamanho,
      y,
      p.x - p.tamanho - 8,
      y - 6,
      p.x - p.tamanho - 8,
      y + 6
    );
  }
}

// ---------------- TRATOR ----------------
function desenharTrator() {
  if (keyIsDown(LEFT_ARROW)) tratorX -= 2;
  if (keyIsDown(RIGHT_ARROW)) tratorX += 2;

  push();
  translate(tratorX, 300);

  fill(200, 0, 0);
  rect(0, 0, 60, 30);

  fill(30);
  ellipse(15, 35, 20);
  ellipse(45, 35, 20);

  pop();
}

// ---------------- VACAS ----------------
function desenharVacas() {
  for (let v of vacas) {

    v.x += v.vel;

    if (v.x > width + 50) {
      v.x = 400;
      v.y = random(260, 340);
    }

    fill(255);
    ellipse(v.x, v.y, 60, 35);

    fill(0);
    ellipse(v.x - 10, v.y - 5, 12, 10);

    fill(255);
    ellipse(v.x + 35, v.y - 5, 25, 20);

    fill(0);
    ellipse(v.x + 38, v.y - 7, 3, 3);

    stroke(0);
    line(v.x - 15, v.y + 15, v.x - 15, v.y + 30);
    line(v.x - 5, v.y + 15, v.x - 5, v.y + 30);
    line(v.x + 10, v.y + 15, v.x + 10, v.y + 30);
    line(v.x + 20, v.y + 15, v.x + 20, v.y + 30);
    noStroke();
  }
}

// ---------------- ARVORES ----------------
function desenharArvores() {
  for (let i = 420; i < width; i += 150) {
    fill(120, 70, 20);
    rect(i, 210, 20, 50);

    fill(40, 160, 40);
    ellipse(i + 10, 190, 60, 60);
  }
}

// ---------------- CASA ----------------
function desenharCasa() {
  fill(220, 120, 80);
  rect(650, 220, 140, 100);

  fill(150, 50, 50);
  triangle(630, 220, 720, 150, 810, 220);

  fill(100, 60, 20);
  rect(705, 260, 30, 60);
}

// ---------------- NUVENS ----------------
function desenharNuvens() {
  fill(255);

  for (let n of nuvens) {
    ellipse(n.x, n.y, 50, 40);
    ellipse(n.x + 20, n.y, 50, 40);
    ellipse(n.x + 10, n.y - 15, 50, 40);

    n.x += n.vel;

    if (n.x > width + 60) n.x = -60;
  }
}

// ---------------- PLANTAS ----------------
function desenharPlantas() {
  for (let p of plantas) {
    fill(0, 200, 0);
    ellipse(p.x, p.y, p.size);
  }
}

// ===================== QUIZ =====================

function desenharQuiz() {

  background(0, 120, 0);

  fill(255);
  textSize(18);

  let q = perguntas[perguntaAtual];

  text(q.pergunta, 40, 80);
  text(q.opcoes[0], 40, 140);
  text(q.opcoes[1], 40, 180);
  text(q.opcoes[2], 40, 220);

  text("Pressione A, B ou C", 40, 300);
  text(feedback, 40, 340);
}

// ===================== FINAL =====================

function desenharFinal() {
  background(0, 180, 0);

  fill(255);
  textSize(32);
  textAlign(CENTER);

  text("🎉 PARABÉNS!", width/2, height/2 - 20);
  textSize(18);
  text("Você completou a Fazenda + Quiz Agrinho", width/2, height/2 + 30);
}

// ===================== INTERAÇÃO =====================

function mousePressed() {
  if (modo === "fazenda") {
    plantas.push({ x: mouseX, y: mouseY, size: random(8, 15) });
  }
}

function keyPressed() {

  if (modo !== "quiz") return;

  let r = key.toUpperCase();
  let atual = perguntas[perguntaAtual];

  if (r === atual.resposta) {
    feedback = "✔ Correto!";
    perguntaAtual++;
  } else {
    feedback = "❌ Errado!";
  }

  if (perguntaAtual >= perguntas.length) {
    modo = "final";
  }
}