window.addEventListener("load", function () {
  // canvas settings
  const canvas = this.document.getElementById("fractalsCanvas");
  /** @type {CanvasRenderingContext2D} */
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // canvas styles
  ctx.fillStyle = "green";
  ctx.lineCap = "round";
  ctx.lineWidth = 10;

  // fractal settings
  let size =
    canvas.width < canvas.height ? canvas.width / 3.5 : canvas.height / 3.5;
  let shrink = 0.5;
  let branches = 2;
  let sides = 8;

  let maxDepth;
  let directionOfBranch;
  let color;

  function drawBranch(depth) {
    if (depth > maxDepth) {
      return;
    }
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(size, 0);
    ctx.stroke();

    for (let i = 0; i < branches; i++) {
      ctx.save();
      ctx.translate(size - (size / branches) * i, 0);
      ctx.scale(shrink, shrink);

      ctx.save();
      ctx.rotate(directionOfBranch);
      drawBranch(depth + 1);
      ctx.restore();

      ctx.save();
      ctx.rotate(-directionOfBranch);
      drawBranch(depth + 1);
      ctx.restore();

      ctx.restore();
    }
  }

  function drawFractal() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.strokeStyle = `hsl(${color}, 100%, 50%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(1, 1);
    ctx.rotate(0);
    for (let i = 0; i < sides; i++) {
      ctx.rotate((Math.PI * 2) / sides);
      drawBranch(0);
    }
    ctx.restore();
  }

  function randomizeFractal() {
    sides = (Math.random() * 7 + 2).toFixed();
    maxDepth = (Math.random() * 4 + 3).toFixed();
    directionOfBranch = Math.random() * 2.3 + 0.7;
    color = Math.random() * 360;
    drawFractal();
  }

  randomizeFractal();

  // controls

  const singleRandomizeButton = document.getElementById("btn_singleRandomize");
  singleRandomizeButton.addEventListener("click", function () {
    randomizeFractal();
    updateSliders();
  });

  const directionSlider = this.document.getElementById("direction");
  directionSlider.addEventListener("change", function (event) {
    directionOfBranch = +event.target.value;
    drawFractal();
  });
  const colorSlider = this.document.getElementById("color");
  colorSlider.addEventListener("change", function (event) {
    color = +event.target.value;
    console.log(event.target.value);
    drawFractal();
  });
  const sidesSlider = this.document.getElementById("sides");
  sidesSlider.addEventListener("change", function (event) {
    sides = +event.target.value;
    drawFractal();
  });
  const depthSlider = this.document.getElementById("depth");
  depthSlider.addEventListener("change", function (event) {
    maxDepth = +event.target.value;
    drawFractal();
  });

  function updateSliders() {
    colorSlider.value = color;
    depthSlider.value = maxDepth;
    sidesSlider.value = sides;
    directionSlider.value = directionOfBranch;
  }
});
