window.addEventListener("load", function () {
  // canvas settings
  const canvas = this.document.getElementById("fractalsCanvas");
  /** @type {CanvasRenderingContext2D} */
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth * 0.8;
  canvas.height = window.innerHeight * 0.8;

  // canvas styles
  ctx.fillStyle = "green";
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 10;
  ctx.lineCap = "round";

  // effect settings
  let size = 600;
  let sides = (Math.random() * 40 + 1).toFixed(0);
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(0.5, 0.5);

  for (let i = 0; i < sides; i++) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(size, canvas.height / 2);
    ctx.stroke();
    ctx.rotate((Math.PI * 2) / sides);
  }
});
