let building_sl, rotate_sl;
let CITY_SIZE = 800;
let BUILDING_MAX_SIZE = 40;
let gridSz = CITY_SIZE / BUILDING_MAX_SIZE;
let map = [];

function initBuildings() {
  for (let i = 0; i < gridSz; i++) {
    map[i] = [];
    for (let j = 0; j < gridSz; j++) {
      map[i][j] = false;
    }
  }
  resetMap();
}

function resetMap() {
  for (let i = 0; i < gridSz; i++) {
    for (let j = 0; j < gridSz; j++) {
      map[i][j] = false;
    }
  }
}

function drawBuildings() {
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

  //fill(0.5);
  noStroke();
  let nBuildings = 178; // building_sl.value();
  translate(-CITY_SIZE / 2, -CITY_SIZE / 2);
  for (let i = 0; i < nBuildings; i++) {
    let foundEmptySpot = false;
    let x = 0,
      y = 0;
    // loop until it finds an empty spot
    while (foundEmptySpot === false) {
      x = floor(random(0, gridSz));
      y = floor(random(0, gridSz));
      if (map[x][y] === false) {
        foundEmptySpot = true;
        map[x][y] = true;
      }
    }

    if (x > -10 && x < 10
      && y > -10 && y < 10) {
      continue;
    }

    // randomly determine building dimensions
    let w = random(10, BUILDING_MAX_SIZE);
    let h = random(10, BUILDING_MAX_SIZE);
    let d = random(10, 100); // building height
    // render a building
    push();
    translate(x * BUILDING_MAX_SIZE, y * BUILDING_MAX_SIZE, d / 2);
    specularMaterial(20, 20, 20);
    shininess(20);
    box(w, h, d);
    pop();
  }
  resetMap();
  pop();
}
