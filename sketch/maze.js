/*
 Generate 3D maze using Eller’s algorithm.
 Navigate a route using DFS/BFS algorithm.
 Implemented by Minwoo Choo

 1. draw first line
 2. draw second line to HEIGHT - 1 line
 3. draw last line
 */

const WIDTH = 10;  // width of the maze
const HEIGHT = 10;  // height of the maze
let hWall = [];
let vWall = [];
let cell = [];
let set_id = 0;
let maze = [];
let maze_height = 3;
let entrance_height = 0;

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
  maze.push(curLine);

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

/*
Navigate a route using DFS / BFS algorithm
 */
let stack = [];  // x, y
let queue = [];  // x, y, from_x, from_y
let visited_dfs = Array.from(Array(HEIGHT * 2 + 3), () => Array());
let visited_bfs = Array.from(Array(HEIGHT * 2 + 3), () => Array());
console.log(visited_dfs);
let DFSflag = false;
let BFSflag = false;
let stacknum = 0;

// DFS (Iterative)
function DFS() {
  if (DFSflag) {
    DFSflag = true;
    return;
  }

  let x = 1;
  let y = 1;
  let i, j;

  for (i = 0; i < HEIGHT * 2 + 3; i++) {
    for (j = 0; j < WIDTH * 2 + 1; j++) {
      visited_dfs[i][j] = false;
    }
  }

  visited_dfs[y][x] = true;
  stacknum = 0;
  stack[stacknum] = {x: x, y: y};
  stacknum++;

  while (true) {
    console.log("@@@");
    let block = 0;

    if (y === HEIGHT * 2 + 2 && x === WIDTH * 2 - 1) {
      stack[stacknum] = {x: x, y: y};
      stacknum++;
      visited_dfs[y][x] = true;
      break;
    }

    if (y < HEIGHT * 2 + 2) {
      console.log("!!", x, visited_dfs[y + 1][x], maze[y + 1][x]);
      console.log(maze[y + 1], x);
      if (visited_dfs[y + 1][x] === false && maze[y + 1][x] === ' ') {
        stack[stacknum] = {x: x, y: y};
        stacknum++;
        visited_dfs[y + 1][x] = true;
        y++;
        block = 1;
        continue;
      }
    }

    if (x < WIDTH * 2) {
      if (visited_dfs[y][x + 1] === false && maze[y][x + 1] === ' ') {
        stack[stacknum] = {x: x, y: y};
        stacknum++;
        visited_dfs[y][x + 1] = true;
        x++;
        block = 1;
        continue;
      }
    }
    if (y > 1) {

      if (visited_dfs[y - 1][x] === false && maze[y - 1][x] === ' ') {
        stack[stacknum] = {x: x, y: y};
        stacknum++;
        visited_dfs[y - 1][x] = true;
        y--;
        block = 1;
        continue;
      }
    }
    if (x > 1) {

      if (visited_dfs[y][x - 1] === false && maze[y][x - 1] === ' ') {
        stack[stacknum] = {x: x, y: y};
        stacknum++;
        visited_dfs[y][x - 1] = true;
        x--;
        block = 1;
        continue;
      }
    }
    if (block === 0) {
      if (stacknum > 0) stacknum--;
      else break;
      console.log(stacknum);
      x = stack[stacknum].x;
      y = stack[stacknum].y;
    }
  }
  DFSflag = true;
}

// BFS (Iterative)
function BFS() {
  if (BFSflag) {
    BFSflag = true;
    return;
  }

  let i = 0;
  let j = 0;
  let x = 1;
  let y = 1;

  for (i = 0; i < HEIGHT * 2 + 3; i++) {
    for (j = 0; j < WIDTH * 2 + 1; j++) {
      visited_bfs[i][j] = false;
    }
  }

  visited_bfs[1][1] = true;
  queue.push({x: x, y: y, from_x: x, from_y: y});

  while (true) {
    const front = queue.unshift();
    y = front.y;
    x = front.x;

    if (y === HEIGHT * 2 + 2 && x === WIDTH * 2 - 1) {
      queue.push({x: x, y: y, from_x: x, from_y: y});
      visited_bfs[y][x] = true;
      break;
    }

    if (y < rows - 1) {
      if (visited_bfs[y + 1][x] === false && maze[y + 1][x] === ' ') {
        queue.push({x: x, y: y + 1, from_x: x, from_y: y});
        visited_bfs[y + 1][x] = true;
        visited_bfs[y][x] = true;
      }
    }

    if (x < cols - 1) {
      if (visited_bfs[y][x + 1] === false && maze[y][x + 1] === ' ') {
        queue.push({x: x + 1, y: y, from_x: x, from_y: y});
        visited_bfs[y][x + 1] = true;
        visited_bfs[y][x] = true;
      }
    }

    if (y > 1) {
      if (visited_bfs[y - 1][x] === false && maze[y - 1][x] === ' ') {
        queue.push({x: x, y: y - 1, from_x: x, from_y: y});
        visited_bfs[y - 1][x] = true;
        visited_bfs[y][x] = true;
      }
    }

    if (x > 1) {
      if (visited_bfs[y][x - 1] === false && maze[y][x - 1] === ' ') {
        queue.push({x: x - 1, y: y, from_x: x, from_y: y});
        visited_bfs[y][x - 1] = true;
        visited_bfs[y][x] = true;
      }
    }
  }
  BFSflag = true;
}

function drawMaze() {
  push();
  //scale(15);
  rotateY(-HALF_PI);

  //lights();
  directionalLight(1, 0, 0, 1, 0, 0);
  rotateX(radians(90));
  //fill(0.1);

  push();
  scale(15);
  noStroke();
  specularMaterial(50, 50, 50);
  shininess(20);
  texture(textures.grass);
  ellipse(0, 0, 100, 100); // draw ground
  push();
  specularMaterial(50, 50, 50);
  shininess(20);
  rotateX(-HALF_PI);
  rotateY(HALF_PI);
  texture(textures.sky);
  sphere(50); // draw sky
  pop();
  //plane(30, 30); // draw ground
  pop();

  push();
  scale(35);
  translate(-5, 0, 0);
  drawWalls();
  //drawDFSRoute();
  human.display();
  pop();

  pop();
}

function drawWalls() {
  push();
  noStroke();
  texture(textures.maze);
  translate(-11, -11, 0);
  for (let i = 1; i <= HEIGHT * 2 + 3; i++) {
    for (let j = 1; j <= WIDTH * 2 + 1; j++) {
      if (maze[i - 1][j - 1] === '-') {
        push();
        translate(j, i, 1); // 0.5);
        box(2, 1, maze_height);
        pop();
      } else if (maze[i - 1][j - 1] === '|') {
        if (i === 2 && j === 1) continue;  // destination
        if (i === HEIGHT * 2 + 2 && j === WIDTH * 2 + 1) {
          // entrance
          push();
          translate(1, 2, 5);
          fill(255, 0, 0);  // ToDo. apply exit gate texture
          box(1, 1, 1);
          pop();
          if (scene === 0 || scene === 1) continue;
        }
        push();
        translate(j, i, 1); // 0.5);
        if (i === HEIGHT * 2 + 2 && j === WIDTH * 2 + 1 && scene === 2) {
          box(1, 2, entrance_height);
        } else {
          box(1, 2, maze_height);
        }
        pop();
      } else if (maze[i - 1][j - 1] === '+') {
        push();
        translate(j, i, 1); // 0.5);
        box(1, 1, maze_height);
        pop();
      }
    }
  }
  pop();
}

function drawDFSRoute() {
  let i;
  let j;
  push();
  translate(-11, -11, 0);
  if (DFSflag) {  // ToDo. Add mode
    for (i = 2; i < HEIGHT * 2 + 3; i++) {
      for (j = 2; j < WIDTH * 2 + 1; j++) {
        if (visited_dfs[i][j - 1] && visited_dfs[i - 1][j - 1]) {
          stroke(150, 150, 150);
          line(j, i, j, i + 1);
        }
        if (visited_dfs[i - 1][j] && visited_dfs[i - 1][j - 1]) {
          stroke(150, 150, 150);
          line(j, i, j + 1, i);
        }
      }
    }

    for (j = 2; j < WIDTH * 2 + 1; j++) {
      stroke(150, 150, 150);
      line(j, HEIGHT * 2 + 3, j + 1, HEIGHT * 2 + 3);
    }

    for (i = 0; i < stack.length - 1; i++) {
      stroke(30, 30, 30);
      line(stack[i].x + 1, stack[i].y + 1, stack[i + 1].x + 1, stack[i + 1].y + 1);
    }
  }
  pop();
}

function closeEntrance() {
  if (entrance_height < maze_height) {
    entrance_height += 0.1;
  } else {
    scene = 3;
    gameStart = true;
  }
}