/*
 Generate 3D maze using Eller’s algorithm.
 Navigate a route using DFS algorithm.
 Implemented by Minwoo Choo

 1. draw first line
 2. draw second line to HEIGHT - 1 line
 3. draw last line
 */

const WIDTH = 10;
const HEIGHT = 10;
let hWall = [];
let vWall = [];
let cell = [];
let set_id = 0;
let maze = [];

function generateMaze() {
  let prevWall = -1;
  let curLine = '';
  let i;
  let j;

  /* generate first line */
  // make vertical wall
  for (let i = 0; i < WIDTH; i++) {
    curLine += '+-';
  }
  curLine += '+';
  maze.push([curLine]);

  // make vertical wall to distribute the first set.
  for (i = 0; i < WIDTH - 1; i++) {
    vWall[i] = Math.round(Math.random());  // 0: don't make a wall, 1: make a wall
    if (vWall[i] === 1) {  // make a wall
      for (j = prevWall + 1; j <= i; j++) {
        /* prevWall is the position of previous vertical wall
           the default value of prevWall is -1. -1 means the leftmost wall.
           there is no wall from the leftmost wall to the ith wall.
         */
        cell[j] = set_id;
      }
      prevWall = i;
      set_id++;  // the same set has the same id. so increase set_id.
    }
  }

  for (i = prevWall + 1; i < WIDTH; i++) {
    cell[i] = set_id;
  }
  set_id++;
  vertical_print();

  /* generate mid rows */
  // set hWall[i]
  for (i = 0; i < HEIGHT - 1; i++) {
    makeNewHorizontal();  // make horizontal wall
    horizontal_print();  // print horizontal wall
    makeNewVertical();  // make vertical wall
    vertical_print();  // print vertical wall
  }

  /* generate last row */
  makeNewHorizontal();
  horizontal_print();

  for (i = 0; i < WIDTH - 1; i++) {
    if (cell[i] !== cell[i + 1]) {
      vWall[i] = 0;
      prevWall = cell[i + 1];
      cell[i + 1] = cell[i];

      for (j = 0; j < WIDTH; j++) {
        if (cell[j] === prevWall) {
          cell[j] = cell[i];
        }
      }
    } else vWall[i] = 1;
  }
  vertical_print();

  /* generate last outline */
  draw_outline();
}

function vertical_print() {
  // print vertical wall and push into maze data
  let curLine = '|';

  for (let i = 0; i < WIDTH - 1; i++) {
    curLine += ' ';
    console.log(vWall[i]);
    if (vWall[i] === 1) {
      curLine += '|';
    } else {
      curLine += ' ';
    }
  }
  curLine += ' |';

  maze.push(curLine);
}

function horizontal_print() {
  // print vertical wall and push into maze data
  let curLine = '+';

  for (let i = 0; i < WIDTH; i++) {
    if (hWall[i] === 1) {
      curLine += '-+';
    } else {
      curLine += ' +';
    }
  }

  maze.push(curLine);
}

function makeNewHorizontal() {
  let prevId;  // id of the upper cell
  let alreadyDone = 0;  // the num of gates

  prevId = cell[0];  // get upper cell's id
  for (let i = 0; i < WIDTH; i++) {
    hWall[i] = Math.round(Math.random());  // 0: don't make a wall, 1: make a wall
    if (hWall[i] === 0) {
      alreadyDone = 1;
    }

    if (i < WIDTH - 1) {  // if not the last horizontal wall
      if (prevId !== cell[i + 1]) {
        if (alreadyDone === 0) {  // the gate is not exists.
          hWall[i] = 0;
        } else {  // the gate is exists.
          alreadyDone = 0;  // init alreadyDone
        }
        prevId = cell[i + 1];  // set next prevId
      }
    }

    if (i === WIDTH - 1 && alreadyDone === 0) {  // if the last cell and the gate is not exists.
      hWall[i] = 0;  // make a gate
    }

    if (hWall[i]) {
      // if the closed wall, set new id
      cell[i] = set_id;
      set_id++;
    }
  }
}

function makeNewVertical() {
  let prevId;
  let join_flag = 0;

  for (let i = 0; i < WIDTH - 1; i++) {
    if (cell[i] !== cell[i + 1]) {
      join_flag = Math.round(Math.random());  // 0: don't make a wall, 1: make a wall
      if (join_flag === 0) {  // don't make a wall
        prevId = cell[i + 1];
        cell[i + 1] = cell[i];

        for (let j = 0; j < WIDTH; j++) {
          if (cell[j] === prevId) {
            cell[j] = cell[i];
          }
        }
        vWall[i] = 0;
      } else {  // make a wall
        vWall[i] = 1;
      }
    } else {
      // if the same cell, make a wall.
      vWall[i] = 1;
    }
  }
}

function draw_outline() {
  let curLine = '';

  for (let i = 0; i < WIDTH; i++) {
    curLine += '+-';
  }
  curLine += '+';

  maze.push(curLine);
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
