class Text { // implemented by Minwoo Choo
  constructor(t, sz, xp, yp, zp, c, font) {
    this._text = createGraphics(window.innerWidth - 4, window.innerHeight - 4, WEBGL);
    this._text.content = t; // content of text
    this._text.textSize(sz); // font size
    this._text.x = xp; // position
    this._text.y = yp;
    this._text.z = zp;
    this._text.fill(c); // font color
    this._text.textFont(font); // font family
    this._text.alignCenter = false;
  }

  setText(t) {
    this._text.content = t;
  }

  setSize(sz) {
    this._text.textSize(sz);
  }

  setPosition(xp, yp, zp) {
    this._text.x = xp;
    this._text.y = yp;
    this._text.z = zp;
  }

  setColor(c) {
    this._text.fill(c);
  }

  display() {
    push();
    this._text.redraw();
    this._text.clear();
    this._text.noStroke();
    noStroke();
    this._text.background(0, 0);
    translate(0, 0, this._text.z);
    this._text.text(this._text.content, this._text.x, this._text.y);
    texture(this._text);
    plane(window.innerWidth - 4, window.innerHeight - 4);
    pop();
  }
}
