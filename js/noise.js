let noiseDensity = 0.05;
let seed = Math.random(1, 100);
let offsetX = 0;
let speedX;
let noiseCanvas;
let muscaeCanvas;

function setup() {
  const streetViewHeight = document.getElementById('streetview').offsetHeight;
  let canvas = createCanvas(windowWidth, streetViewHeight);
  noiseCanvas = createGraphics(windowWidth, streetViewHeight);
  muscaeCanvas = createGraphics(windowWidth, streetViewHeight);
  canvas.parent("streetview");
  frameRate(5);

  speedX = random(-3, 3);

  drawNoise();
}

function draw() {
  background(255, 255, 255, 0);
  image(noiseCanvas, 0, 0);
  image(muscaeCanvas, 0, 0);

  // Draw muscae volitantes
  drawMuscae();
}

function drawNoise() {
  noiseCanvas.loadPixels();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (random(1) < noiseDensity) {
        let index = (x + y * width) * 4;
        let r = random(150, 255);
        noiseCanvas.pixels[index] = r;
        noiseCanvas.pixels[index + 1] = r;
        noiseCanvas.pixels[index + 2] = r;
        noiseCanvas.pixels[index + 3] = 127;
      }
    }
  }
  noiseCanvas.updatePixels();
}

function drawMuscae() {
  offsetX += speedX;
  if (frameCount % 50 === 0) {
    speedX = random(-3, 3);
  }

  noFill();

  let numMus = Math.floor(20 + Math.random() * 10); // muscaeの数
  for (let i = 0; i < numMus; i++) {
    let numControlPoints = Math.floor(2 + Math.random() * 4); // 制御点の数（数を調整）
    let xPoint = noise(seed + i) * width + offsetX;
    let yPoint = noise(seed + i + 100) * height;
    let xAnchor1, yAnchor1, xAnchor2, yAnchor2, xNext, yNext;

    let baseLineWidth = 0.3 + noise(seed) * 1.5;
    let outlineOffset = 1 + noise(seed) * 1.5; // 輪郭のオフセット（太さを調整）

    // 内側の黒い部分を描画
    muscaeCanvas.stroke(0, 0, 0, 10);
    muscaeCanvas.strokeWeight(baseLineWidth);
    muscaeCanvas.beginShape();
    muscaeCanvas.vertex(xPoint, yPoint);
    for (let j = 0; j < numControlPoints; j++) {
      xAnchor1 = xPoint + noise(seed + j * 50) * 50 - 25;
      yAnchor1 = yPoint + noise(seed + j * 50 + 200) * 50 - 25;
      xAnchor2 = xPoint + noise(seed + j * 50 + 300) * 50 - 25;
      yAnchor2 = yPoint + noise(seed + j * 50 + 400) * 50 - 25;
      xNext = xPoint + noise(seed + j * 50 + 500) * 100 - 50;
      yNext = yPoint + noise(seed + j * 50 + 600) * 100 - 50;

      bezierVertex(xAnchor1, yAnchor1, xAnchor2, yAnchor2, xNext, yNext);
      xPoint = xNext;
      yPoint = yNext;
    }
    muscaeCanvas.endShape();

    // 輪郭の描画
    for (let outline = -1; outline <= 1; outline += 2) {
      muscaeCanvas.stroke(200, 200, 200, 10); // 線の濃さ
      muscaeCanvas.strokeWeight(baseLineWidth + outline * outlineOffset); // 線の太さ（太さを調整）

      muscaeCanvas.beginShape();
      muscaeCanvas.vertex(xPoint, yPoint);
      for (let j = 0; j < numControlPoints; j++) {
        xAnchor1 = xPoint + noise(seed + j * 50 + 700) * 50 - 25;
        yAnchor1 = yPoint + noise(seed + j * 50 + 800) * 50 - 25;
        xAnchor2 = xPoint + noise(seed + j * 50 + 900) * 50 - 25;
        yAnchor2 = yPoint + noise(seed + j * 50 + 1000) * 50 - 25;
        xNext = xPoint + noise(seed + j * 50 + 1100) * 100 - 50;
        yNext = yPoint + noise(seed + j * 50 + 1200) * 100 - 50;

        bezierVertex(xAnchor1, yAnchor1, xAnchor2, yAnchor2, xNext, yNext);
        xPoint = xNext;
        yPoint = yNext;
      }
      muscaeCanvas.endShape();
    }
    seed += 0.001;
  }
}