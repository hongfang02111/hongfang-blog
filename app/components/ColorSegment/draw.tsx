type Coordinate = {
  x: number;
  y: number;
};

export const drawSegment = () => {
  let canvas: HTMLCanvasElement =
    document.getElementsByTagName("canvas")[0] || null;

  let context = canvas.getContext("2d") || null;

  if (!context) {
    throw new Error(`2d context not supported or canvas already initialized`);
  }

  const pixelRatio = window.devicePixelRatio || 1;
  const width = window.innerWidth;
  const height = window.innerHeight;
  const initialDistance = 90;
  const tau = Math.PI * 2;

  let coordinateCollection: Array<Coordinate>;
  let r = 0;

  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;
  context.scale(pixelRatio, pixelRatio);
  context.globalAlpha = 0.6;

  function draw() {
    if (!context) {
      throw new Error(`2d context not supported or canvas already initialized`);
    }

    context.clearRect(0, 0, width, height);
    coordinateCollection = [
      { x: 0, y: height * 0.7 + initialDistance },
      { x: 0, y: height * 0.7 - initialDistance },
    ];
    while (coordinateCollection[1].x < width + initialDistance)
      d(coordinateCollection[0], coordinateCollection[1]);
  }

  function d(start: Coordinate, end: Coordinate) {
    if (!context) {
      throw new Error(`2d context not supported or canvas already initialized`);
    }

    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    let x = end.x + (Math.random() * 2 - 0.25) * initialDistance;
    let y = calculateYCoordinate(end.y);

    context.lineTo(x, y);
    context.closePath();
    r -= tau / -50;

    context.fillStyle =
      "#" +
      (
        ((Math.cos(r) * 127 + 128) << 16) |
        ((Math.cos(r + tau / 3) * 127 + 128) << 8) |
        (Math.cos(r + (tau / 3) * 2) * 127 + 128)
      ).toString(16);

    context.fill();
    coordinateCollection[0] = coordinateCollection[1];
    coordinateCollection[1] = { x, y };
  }

  function calculateYCoordinate(p: number): number {
    const yCoordinate = p + (Math.random() * 2 - 1.2) * initialDistance;
    return yCoordinate > height || yCoordinate < 0
      ? calculateYCoordinate(p)
      : yCoordinate;
  }

  document.onclick = draw;
  document.ontouchstart = draw;
  draw();
};
