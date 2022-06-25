window.addEventListener("load", function () {
  // canvas settings
  const canvas = this.document.getElementById("fractalsCanvas");
  /** @type {CanvasRenderingContext2D} */
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // canvas styles
  ctx.fillStyle = "green";
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 25;
  ctx.lineCap = "round";

  // effect settings
  let size = 400;
  let maxDepth = 5;
  let directionOfBranch = 0.8;
  let shrink = 0.5;
  let branches = 2;

  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(1, 1);
  ctx.rotate(0);

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
      ctx.rotate(directionOfBranch);
      ctx.scale(shrink, shrink);
      drawBranch(depth + 1);
      ctx.restore();

      ctx.save();
      ctx.translate(size - (size / branches) * i, 0);
      ctx.rotate(-directionOfBranch);
      ctx.scale(shrink, shrink);
      drawBranch(depth + 1);
      ctx.restore();
    }
  }

  drawBranch(0);
});
