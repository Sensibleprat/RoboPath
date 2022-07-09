// License: GPL. For details, see LICENSE file.

let obstacles = new Array();

obstacles.push(new Array());
obstacles[obstacles.length-1].push(new Point( 50, 0));
obstacles[obstacles.length-1].push(new Point( 950, 0));
obstacles[obstacles.length-1].push(new Point( 950, 50));
obstacles[obstacles.length-1].push(new Point( 50, 50));

obstacles.push(new Array());
obstacles[obstacles.length-1].push(new Point( 50, 50));
obstacles[obstacles.length-1].push(new Point( 50, 950));
obstacles[obstacles.length-1].push(new Point( 0, 950));
obstacles[obstacles.length-1].push(new Point( 0, 50));

obstacles.push(new Array());
obstacles[obstacles.length-1].push(new Point( 50, 950));
obstacles[obstacles.length-1].push(new Point( 950, 950));
obstacles[obstacles.length-1].push(new Point( 950, 1000));
obstacles[obstacles.length-1].push(new Point( 50, 1000));

obstacles.push(new Array());
obstacles[obstacles.length-1].push(new Point( 950, 950));
obstacles[obstacles.length-1].push(new Point( 1000, 950));
obstacles[obstacles.length-1].push(new Point( 1000, 50));
obstacles[obstacles.length-1].push(new Point( 950, 50));

function addObstacle(obstacle) {
  obstacles.push(obstacle);
}

function getObstacles() {
  return obstacles;
}

function drawObstacles(ctx) {

  obstacles.forEach(polygon => {
    ctx.beginPath();
    for (var i = 0; i < polygon.length; i++) {
      if (i === 0) {
        ctx.moveTo(polygon[i].x, polygon[i].y);
      } else {
        ctx.lineTo(polygon[i].x, polygon[i].y);
      }
    }
    ctx.lineTo(polygon[0].x, polygon[0].y);
    ctx.closePath();
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.stroke();
  });
}

