let seed = Math.random(1, 100);

function setup() {
  const streetViewHeight = document.getElementById('streetview').offsetHeight;
  let canvas = createCanvas(windowWidth, streetViewHeight);
  canvas.parent("streetview");
  noLoop();
}

function draw() {
  // Draw white noise
  drawNoise();

  // Draw muscae volitantes
  drawMuscae(40, 15, 25, 50);
  drawMuscae(5, 200, 100, 20);
}

function drawNoise() {
  loadPixels();
  for (let y = 0; y < height * 4; y++) {
    for (let x = 0; x < width * 4; x++) {
      if (random(1) < 0.01) {
        let index = (x + y * width) * 4;
        let r = random(150, 200);
        pixels[index] = r;
        pixels[index + 1] = r;
        pixels[index + 2] = r;
        pixels[index + 3] = 127;
      }
    }
  }
  updatePixels();
}

function drawMuscae(numBase, fColor, fAlpha, bSize) {
  noFill();
  let numMus = Math.floor(numBase + Math.random() * 10); // muscaeの数
  for (let i = 0; i < numMus; i++) {
    stroke(fColor + Math.random() * 30, fAlpha + Math.random() * 30); // 線の濃さ
    strokeWeight(Math.random() * 3); // 線の太さ（太さを調整）
    let numControlPoints = Math.floor(2 + Math.random() * 8); // 制御点の数（数を調整）

    let xPoint = noise(seed) * width;
    let yPoint = noise(seed) * height;

    beginShape();
    vertex(xPoint, yPoint);
    for (let j = 0; j < numControlPoints; j++) {
      let xAnchor1 = xPoint + Math.random() * bSize - bSize / 2;
      let yAnchor1 = yPoint + Math.random() * bSize - bSize / 2;
      let xAnchor2 = xPoint + Math.random() * bSize - bSize / 2;
      let yAnchor2 = yPoint + Math.random() * bSize - bSize / 2;
      let xNext = xPoint + Math.random() * bSize * 2 - bSize;
      let yNext = yPoint + Math.random() * bSize * 2 - bSize;

      bezierVertex(xAnchor1, yAnchor1, xAnchor2, yAnchor2, xNext, yNext);
      xPoint = xNext;
      yPoint = yNext;
    }
    endShape();

    seed++;
  }
}