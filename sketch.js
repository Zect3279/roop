const easeOutExpo = function (x) { return x === 1 ? 1 : 1 - Math.pow(2, -10 * x); }
const easeInExpo = function (x) { return x === 0 ? 0 : Math.pow(2, 10 * x - 10); }
const easeOutQuart = function (x) { return 1 - Math.pow(1 - x, 4); }
const easeInOutExpo = function (x) { return x === 0
  ? 0
  : x === 1
  ? 1 : x < 0.5
  ? Math.pow(2, 20 * x - 10) / 2
  : (2 - Math.pow(2, -20 * x + 10)) / 2;
}
const easeOutQuad = function (x) { return 1 - (1 - x) * (1 - x); }
const easeInQuad = function (x) { return x * x; }
const easeOutBounce = function (x) {
const n1 = 7.5625;
  const d1 = 2.75;

  if (x < 1 / d1) {
      return n1 * x * x;
  } else if (x < 2 / d1) {
      return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
      return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
      return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
}

let index = 0;
let objs = []

P5Capture.setDefaultOptions({
  format: "webm",
  framerate: 60,
});

// Math.random() * ( 最大値 - 最小値 ) + 最小値;

function setup() {
  createCanvas(1920, 1080);
  frameRate(60);
  textAlign(CENTER, CENTER)
  rectMode(CENTER)
  noStroke()
  pg = createGraphics(width, height);
  // angleMode(DEGREES);
  for (let i = 0; i < 30; i++) {
    let x = Math.random() * ( width ) - width/2;
    let y = Math.random() * ( height ) - height/2;
    let life = Math.random() * 60
    if (i%4 === 0) {
      type = 1
      console.log(i)
    }
    else { type = 0 }
    objs.push({x, y, life, type})
  }
  console.log(objs)
}

function draw() {
  translate(width/2, height/2)
  // if (frameCount === 1) {
  //   const capture = P5Capture.getInstance();
  //   capture.start({
  //     format: "webm",
  //     duration: 120,
  //   });
  // }
  background(0);

  let n = 20

  objs.forEach(o => {
    push()
    translate(o.x, o.y)
    if (o.type == 0) {
      let w = map(easeInExpo(map(o.life%30, 0, 30, 0, 1)), 0, 1, 1, 5)
      let h = map(easeOutQuad(map(o.life%30, 0, 30, 0, 1)), 0, 1, 1, 10)
      rotate(PI/4)
      rect(0, 0, n/w, n*h)
      rotate(PI/2)
      rect(0, 0, n/w, n*h)
    } else if (o.type == 1) {
      let one = map(easeOutExpo(map(o.life%30, 0, 30, 0, 1)), 0, 1, 0, 100)
      let two = map(easeOutBounce(map(o.life%30, 0, 30, 0, 1)), 0, 1, 0, 99)

      fill(255);
      rect(0, 0, one, one)

      fill(0);
      rect(0, 0, two, two)
    }
    pop()
    o.life++
  });
  objs.forEach(o => {
    if (o.life >= 60) {
      let x = Math.random() * ( width ) - width/2;
      let y = Math.random() * ( height ) - height/2;
      o.x = x
      o.y = y
      o.life = 0
    }
  })

  push()

  if (index%2 == 0) {
    rotate(PI / 4)
  }
  if (frameCount%60 <= 30) {
    let a = map(easeOutExpo(map(frameCount%30, 0, 30, 0, 1)), 0, 1, 0, 1000)
    let b = map(easeOutExpo(map(frameCount%30, 0, 30, 0, 1)), 0, 1, 0, 800)
    let c = map(easeOutExpo(map(frameCount%30, 0, 30, 0, 1)), 0, 1, 0, 450)
    let d = map(easeOutExpo(map(frameCount%30, 0, 30, 0, 1)), 0, 1, 0, 300)
    let e = map(easeOutExpo(map(frameCount%30, 0, 30, 0, 1)), 0, 1, 0, 200)
    let f = map(easeOutExpo(map(frameCount%30, 0, 30, 0, 1)), 0, 1, 0, 100)
    let g = map(easeInOutExpo(map((frameCount)%30, 0, 30, 0, 1)), 0, 1, 0, 1000)

    fill(255);
    rect(0, 0, a, a)

    fill(0);
    rect(0, 0, b, b)

    fill(180);
    rect(0, 0, c, c)

    fill(255);
    rect(0, 0, d, d)

    fill(100);
    rect(0, 0, e, e)

    fill(0);
    rect(0, 0, f, f)

    fill(0)
    rect(0, 0, g, g)
  }
  pop()
  if (frameCount%60 == 0) {
    index++
  }
}
