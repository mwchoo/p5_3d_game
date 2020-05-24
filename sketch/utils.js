class TimerbyFrame {  // implemented by Minwoo Choo
  constructor(d, func) {
    this.frameDelta = d;
    this.execFunc = func;
    this.activated = false;
  }
  
  setTimer() {
    this.startFrame = frameCount;
    this.activated = true;
  }
  
  setFrameDelta(d) {
    this.frameDelta = d;
  }
  
  checkTimeout() {
    if (this.activated && this.startFrame + this.frameDelta < frameCount) {
      // expired!
      this.execFunc();
      this.activated = false;
    }
  }
}


class Timer {  // implemented by Minwoo Choo
  constructor(d, func) {
    this.timeDelta = d;  // ms
    this.execFunc = func;
    this.activated = false;
  }
  
  setTimer() {
    this.startFrame = Date.now();
    this.activated = true;
  }
  
  setTimeDelta(d) {
    this.timeDelta = d;
  }
  
  checkTimeout() {
    if (this.activated && this.startFrame + this.timeDelta < Date.now()) {
      // expired!
      this.execFunc();
      this.activated = false;
    }
  }
}

function valInRange(min, max, val) {
  return val >= min && val <= max;
}