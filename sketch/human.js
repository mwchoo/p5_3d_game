class Human {  // Implemented by Minwoo Choo
  constructor() {
    this.walk = true;
  }

  drawHead() {
    push();
    texture(textures.human.head);
    plane(1, 1);

    translate(0.5, 0, 0.5);
    rotateX(-HALF_PI);
    rotateY(HALF_PI);
    texture(textures.human.face);
    plane(1, 1);

    translate(0.5, 0, -0.5);
    rotateY(HALF_PI);
    texture(textures.human.head);
    plane(1, 1);

    translate(0.5, 0, -0.5);
    rotateY(HALF_PI);
    texture(textures.human.head);
    plane(1, 1);

    translate(0.5, 0, -0.5);
    rotateY(HALF_PI);
    texture(textures.human.head);
    plane(1, 1);

    translate(0, -0.5, -0.5);
    rotateX(HALF_PI);
    texture(textures.human.head);
    plane(1, 1);
    pop();
  }

  drawBody() {
    push();
    translate(0, 0, -0.7);
    rotateX(PI);
    texture(textures.human.body);
    box(0.5, 1, 1.5);
    pop();
  }

  drawArms() {
    push();
    translate(0, 0.7, -0.8);
    rotateX(PI);
    texture(textures.human.arm);
    box(0.5, 0.5, 1.5);

    translate(0, 1.4, 0);
    box(0.5, 0.5, 1.5);
    pop();
  }

  drawLegs() {
    push();
    translate(0, 0.2, -2.2);
    rotateX(PI);
    if (this.walk) {
      rotateY(mouseX/100);
    }
    texture(textures.human.leg);
    box(0.4, 0.5, 1.5);

    translate(0, 0.5, 0);
    box(0.4, 0.5, 1.5);
    pop();
  }

  display() {
    push();
    noStroke();
    translate(0, 0, 10);

    this.drawHead();
    this.drawBody();
    this.drawArms();
    this.drawLegs();

    pop();
  }
}