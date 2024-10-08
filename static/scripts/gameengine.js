// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
  constructor(options) {
    // What you will use to draw
    // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    this.ctx = null;

    // Everything that will be updated and drawn each frame
    this.entities = [];

    // Information on the input
    this.left = false;
    this.right = false;
    this.down = false;
    this.X = false;
    this.misc = false; //for general purposes

    this.moment = 0;
    this.lastMoment = 0;

    // Options and the Details
    this.options = options || {
      debugging: false,
    };
  }

  init(ctx) {
    this.ctx = ctx;
    this.startInput();
    this.timer = new Timer();
  }

  start() {
    this.running = true;
    const gameLoop = () => {
      this.loop();
      requestAnimFrame(gameLoop, this.ctx.canvas);
    };
    gameLoop();
  }

  start() {
    this.running = true;
    const gameLoop = () => {
      this.loop();
      requestAnimFrame(gameLoop, this.ctx.canvas);
    };
    gameLoop();
  }

  startInput() {
    var that = this;

    var getXandY = function (e) {
      var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
      var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

      return { x: x, y: y, radius: 0 };
    };

    function keydownListener(e) {
      switch (e.code) {
        case "ArrowLeft":
        case "KeyA":
          that.left = true;
          that.leftframe = true;
          break;
        case "ArrowRight":
        case "KeyD":
          that.right = true;
          that.rightframe = true;
          break;
        case "ArrowUp":
        case "KeyW":
          that.up = true;
          that.upframe = true;
          break;
        case "ArrowDown":
        case "KeyS":
          that.down = true;
          that.downframe = true;
          break;
        case "KeyZ":
        case "Comma":
          that.B = true;
          break;
        case "KeyX":
        case "Period":
          that.X = true;
          break;
        case "Escape":
          that.escape = true;
          break;
      }
    }
    function keyUpListener(e) {
      switch (e.code) {
        case "ArrowLeft":
        case "KeyA":
          that.left = false;
          break;
        case "ArrowRight":
        case "KeyD":
          that.right = false;
          break;
        case "ArrowUp":
        case "KeyW":
          that.up = false;
          break;
        case "ArrowDown":
        case "KeyS":
          that.down = false;
          break;
        case "KeyZ":
        case "Comma":
          that.misc = false;
          break;
        case "KeyX":
        case "Period":
          that.X = false;
          break;
        case "Escape":
          that.escape = false;
          break;
      }
    }
    /*this.ctx.canvas.addEventListener("movemove", e => {
            if (this.options.debugging) {
                console.log("MOUSE_MOVE", getXandY(e));
            }
            this.mouse = getXandY(e);
        });

        this.ctx.canvas.addEventListener("click", e => {
            if (this.options.debugging) {
                console.log("CLICK", getXandY(e));
            }
            this.click = getXandY(e);
        });

        this.ctx.canvas.addEventListener("wheel", e => {
            if (this.options.debugging) {
                console.log("WHEEL", getXandY(e), e.wheelDelta);
            }
            e.preventDefault(); // Prevent Scrolling
            this.wheel = e;
        });

        this.ctx.canvas.addEventListener("contextmenu", e => {
            if (this.options.debugging) {
                console.log("RIGHT_CLICK", getXandY(e));
            }
            e.preventDefault(); // Prevent Context Menu
            this.rightclick = getXandY(e);
        });

        this.ctx.canvas.addEventListener("keydown", event => this.keys[event.key] = true);
        this.ctx.canvas.addEventListener("keyup", event => this.keys[event.key] = false);
        */

    that.keydown = keydownListener;
    that.keyup = keyUpListener;

    this.ctx.canvas.addEventListener("keydown", that.keydown, false);

    this.ctx.canvas.addEventListener("keyup", that.keyup, false);
  }

  addEntity(entity) {
    this.entities.push(entity);
    //console.log("Entity added:", entity);
  }

  reset() {
    for (let i = this.entities.length - 1; i >= 0; --i) {
      this.entities[i].removeFromWorld = true;
    }

    this.addEntity(new grid(this, data));
  }

  remove(entity) {
    for (let i = this.entities.length - 1; i >= 0; --i) {
      if (entity == this.entities[i]) {
        this.entities[i].removeFromWorld = true;
      }
    }
  }

  get player() {
    for (let i = this.entities.length - 1; i >= 0; --i) {
      if (this.entities[i].player) {
        return this.entities[i];
      }
    }
    return "dead";
  }

  draw() {
    // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    // Draw latest things first
    for (let i = this.entities.length - 1; i >= 0; i--) {
      this.entities[i].draw(this.ctx, this);
    }
  }

  update() {
    let entitiesCount = this.entities.length;

    var currentTime = Date.now();
    if (currentTime - this.lastMoment >= 200) {
      this.upframe = false;
      this.downframe = false;
      this.leftframe = false;
      this.rightframe = false;
    }

    for (let i = 0; i < entitiesCount; i++) {
      let entity = this.entities[i];

      if (!entity.removeFromWorld) {
        entity.update();
      }
    }

    for (let i = this.entities.length - 1; i >= 0; --i) {
      if (this.entities[i].removeFromWorld) {
        this.entities.splice(i, 1);
      }
    }
  }

  loop() {
    this.clockTick = this.timer.tick();
    this.update();
    this.draw();
  }
}

// KV Le was here :)
