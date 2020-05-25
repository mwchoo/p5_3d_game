/*
2020-1 Computer Grapics :: PROJECT 8 - 3D GAME
20141150 Minwoo Choo

< MANUAL >
ARROW_UP Key: go forward
ARROW_DOWN Key: go backward
ARROW_LEFT Key: go left
ARROW_RIGHT Key: go right

Mouse Click: switch pov mode
Mouse Move: cam angle

P Key: screen shot
*/

let scene = 0;
let pov_mode = 0;
let sounds = {
  bgm: undefined
}
let textures = {
  grass: undefined,
  maze: undefined,
  sky: undefined,
  human: {
    face: undefined,
    head: undefined,
    body: undefined,
    arm: undefined,
    leg: undefined
  }
}
let human;
//let keymap;
//let scene_timer;
let rot = 0;

let X = -160;  // 0;
let Y = -600;  // 0;
let Z = 520;  //1700;
let centerX = 0;
let centerY = -100;
let centerZ = 0;
let h = 20;

let spotPos, spotDir, modelPos;
let mrot, srot;
let isPlayed = false;

document.onselectstart = function () {
  // prevent mouse drag or text/element selection
  window.getSelection().removeAllRanges();
};

function preload() {
  sounds.bgm = loadSound('assets/bgm.mp3');
  textures.grass = loadImage('assets/grass_texture.jpg');
  textures.maze = loadImage('assets/leaves_texture.jpg');
  textures.sky = loadImage('assets/sky_texture.jpg');
  textures.human.face = loadImage('assets/face.png');
  textures.human.head = loadImage('assets/head.png');
  textures.human.body = loadImage('assets/body.png');
  textures.human.arm = loadImage('assets/arm.png');
  textures.human.leg = loadImage('assets/leg.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(RGB, 255, 255, 255, 1);
  /*
  gl = this._renderer.GL;
  gl.disable(gl.DEPTH_TEST);*/

  //scene_timer = new Timer(3000, handleScene);

  spotPos = new p5.Vector(-1000, 2000, 200);
  modelPos = new p5.Vector(-200, 1000, 0);
  mrot = 0;
  srot = 0;

  generateMaze();
  console.log(maze);
  DFS();

  human = new Human();
  //sounds.bgm.play();
  /*
  createDiv("<div class='info-wrapper'>" +
    "<h2 id='pov-info'>Default POV (CAM 0)</h2>" +
    "<h3 id='drone-pos'>Drone POS: (0, 0, 0)</h3>" +
    "<h3 id='drone-speed'>Propeller Speed: (0, 0, 0, 0)</h3>" +
    "<h3 id='altitude'>Altitude: 0 ft</h3>" +
    "<h3 id='cam-pos'>CAM POS: (0, 0, 0), (0, 0, 0)</h3>" +
    "</div>"
  );
  createDiv("<div class='keymap-wrapper'>" +
    "<img src='assets/keymap.png'>" +
    "</div>");
   */
}

function draw() {
  background(0);

  // scene control
  if (scene === 0) {
    // drawSplash();
    // return;
  }

  // light setting
  lights();
  pointLight(100, 100, 100, sin(srot) * 4000, -1300, cos(srot) * 100 - 100);


  srot += 0.01;
  spotPos.x = 200 * cos(srot);
  spotPos.y = 200 * sin(srot);
  spotDir = p5.Vector.sub(modelPos, spotPos);
  spotLight(0, 100, 100, spotPos, spotDir, radians(90), 1);

  // camera setting
  camera(X, Y, Z, centerX, centerY, centerZ, 0, 1, 0);

  drawMaze();
  //drawDFSRoute();

  /*
  if (!sounds.bgm.isPlaying()) {
    getAudioContext().resume();
    sounds.bgm.play();
  }
   */

  //handleDisplay();
  handleKeyDown();
  handlePov();
}

function handlePov() {
  if (pov_mode === 0) {
    /*X = -160;
    Y = -160;
    Z = 550;
    centerX = 0;
    centerY = -100;
    centerZ = 0;*/
  }
}

function handleDisplay() {
  const pov_info = document.getElementById('pov-info');
  const drone_pos = document.getElementById('drone-pos');
  const drone_speed = document.getElementById('drone-speed');
  const altitude = document.getElementById('altitude');
  const cam_pos = document.getElementById('cam-pos');
  const {x, y, z} = drone;
  const {front_left, front_right, rear_left, rear_right} = drone.propeller;
  pov_info.innerText = pov_mode === 0 ? 'Default POV (CAM 0)' : 'Drone POV (CAM 1)';
  drone_pos.innerText = 'Drone Pos: (' + parseInt(x) + ', ' + parseInt(y) + ', ' + parseInt(z) + ')';
  drone_speed.innerText = 'Propeller Speed: ' + front_left.rot_speed.toFixed(3) + ', '
    + front_right.rot_speed.toFixed(3) + ', ' + rear_left.rot_speed.toFixed(3) + ', '
    + rear_right.rot_speed.toFixed(3) + ')';
  altitude.innerText = 'Altitude: ' + parseInt(y) * -1 + ' ft';
  cam_pos.innerText = 'CAM POS: (' + parseInt(X) + ', ' + parseInt(Y) + ', ' + parseInt(Z) + ')'
    + ' (' + parseInt(centerX) + ', ' + parseInt(centerY) + ', ' + parseInt(centerZ) + ')';
}

function handleKeyDown() {
  // handle rot speed of propeller to control altitude


  if (keyIsDown(UP_ARROW)) {
    // W: go forward
    Z -= 10;
    Y = cos(Z / 50) * 60 - 100 - 200;  // walk effect
    centerX = 0;
    centerY = -100;
    centerZ = 0;
  } else if (keyIsDown(DOWN_ARROW)) {
    // S: go backward
    Z += 10;
    Y = cos(Z / 50) * 60 - 100 - 200;  // walk effect
    centerX = 0;
    centerY = -100;
    centerZ = 0;
  }
  if (keyIsDown(LEFT_ARROW)) {
    // A: turn your head to the left
    X -= 20;
    centerX = 0;
    centerY = -100;
    centerZ = 0;
  } else if (keyIsDown(RIGHT_ARROW)) {
    // D: turn your head to the right
    X += 20;
    centerX = 0;
    centerY = -100;
    centerZ = 0;
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW || keyCode === DOWN_ARROW || keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    /*if (!sounds.walk.isPlaying()) {
      sounds.walk.play();
    }*/
  }
  if (keyCode === 80) {
    saveImage();
  }
}

function keyReleased() {
  if (keyCode === UP_ARROW || keyCode === DOWN_ARROW || keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    /*if (sounds.walk.isPlaying()) {
      sounds.walk.stop();
    }*/
  }
}

function mouseClicked() {
  // mouse click event to control pov mode
  if (pov_mode === 0) {
    pov_mode = 1;
  } else {
    pov_mode = 0;
  }
}

function saveImage() {
  saveCanvas("image", "jpg");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}