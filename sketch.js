var clouds = [];

function setup() {
  createCanvas(400, 400);
  background(255);
  ground = new Ground(width, height / 4);
  for (i = 0; i < 15; i++) {
      let cloud = new Cloud(Math.random());
      cloud.image = loadImage('cloud.png');
      clouds.push(cloud);
  }
  dino = new Dino();
  dino.image = loadImage('pikachu.gif');
  cactus = new Cactus();
  cactus.image = loadImage('cactus.png');
}

function draw() {
  background(255);
  ground.draw();
  clouds.forEach((object) => {
    object.update();
    object.draw();
  })
    dino.draw();
    dino.update();
    cactus.draw();
    cactus.update();
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
      dino.jump();
    } 
  }

function Ground(width, height) {
  this.height = height;
  this.width = width;

  this.draw = function () {
    stroke(153);
    fill(153);
    rect(0, 3 * height, this.width, this.height);
  };
}

function Cloud(vel) {
  this.vel = vel;
  this.pos = createVector(width, Math.floor(Math.random() * 285));
  this.image;

  this.update = function () {
    this.pos.x -= this.vel;
    if (this.pos.x < 0) {
      this.pos.x = width;
    }
  };

  this.draw = function () {
    image(this.image, this.pos.x, this.pos.y, 25, 25);
  };
}

function Dino() {
    this.pos = createVector(width/4, 245);
    this.acceleration = 1;
    this.image;

    this.update = function() {
        this.pos.y += this.acceleration * 0.5;
        if (this.pos.y >= 245) {
            this.acceleration = 0;
        } else {
            this.acceleration += 1;
        }
    }

    this.jump = function() {
        if (this.pos.y >= 245) {
            this.acceleration = -25;
        }
    }

    this.draw = function(){
        fill(255, 255, 255);
        stroke(255);
        image(this.image, this.pos.x, this.pos.y, 45, 65);
    }
}

function Cactus() {
    this.pos = createVector(width, 255);
    this.vel = -0.5;
    this.image;

    this.update = function() {
        if (Math.random() < 0.01) {
            this.vel -= 0.1;
        }
        this.pos.x += this.vel;
        if (this.pos.x < 0) {
            this.pos.x = width;
        }
    }

    this.draw = function() {
        fill(0, 255, 0);
        stroke(0);
        image(this.image, this.pos.x, this.pos.y, 35, 55);
    }
}
