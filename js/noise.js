let noiseDensity = 0.05;

function setup() {
  const streetViewHeight = document.getElementById('streetview-iframe').offsetHeight;

  let canvas = createCanvas(windowWidth, streetViewHeight);
  canvas.parent("streetview");
  noLoop();

}

function draw() {
  // Draw white noise
  loadPixels();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (random(1) < noiseDensity) {
        let index = (x + y * width) * 4;
        let r = random(150, 255);
        pixels[index] = r;
        pixels[index + 1] = r;
        pixels[index + 2] = r;
        pixels[index + 3] = 127;
      }
    }
  }
  updatePixels();

  // Draw muscae volitantes
  noFill();
  stroke(0, 100);
  curve(200, 200, 300, 300, 200, 50, 200, 350);
}


