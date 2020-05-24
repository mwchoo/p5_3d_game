function generateMaze() {
}

function drawMaze() {
  push();
  scale(20);
  translate(0, 0, 0);

  randomSeed(0);
  //lights();
  directionalLight(1, 0, 0, 1, 0, 0);
  rotateX(radians(90));
  fill(0.1);

  push();
  noStroke();
  specularMaterial(50, 50, 50);
  shininess(20);
  plane(1000, 1000); // draw ground
  pop();

  pop();
}
