
var perimeter = new Array();
var complete = false;
var canvas = document.getElementById("map");

function line_intersects(p0, p1, p2, p3) {
  var s1_x, s1_y, s2_x, s2_y;
  s1_x = p1.x - p0.x;
  s1_y = p1.y - p0.y;
  s2_x = p3.x - p2.x;
  s2_y = p3.y - p2.y;

  var s, t;
  s = (-s1_y * (p0.x - p2.x) + s1_x * (p0.y - p2.y)) / (-s2_x * s1_y + s1_x * s2_y);
  t = (s2_x * (p0.y - p2.y) - s2_y * (p0.x - p2.x)) / (-s2_x * s1_y + s1_x * s2_y);

  if (s >= 0 && s <= 1 && t >= 0 && t <= 1)
  {
    // Collision detected
    return true;
  }
  return false; // No collision
}

function undo() {
  ctx = undefined;
  perimeter.pop();
  complete = false;
}

function clear_canvas() {
  ctx = undefined;
  perimeter = new Array();
  complete = false;
  document.getElementById('coordinates').value = '';
}

function draw(ctx) {
  ctx.lineWidth = 1;
  ctx.strokeStyle = "black";
  ctx.lineCap = "square";
  ctx.beginPath();

//  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeRect(0, 0, canvas.width, canvas.height);


  for (var i = 0; i < perimeter.length; i++) {
    if (i == 0) {
      ctx.moveTo(perimeter[i].x, perimeter[i].y);
    } else {
      ctx.lineTo(perimeter[i].x, perimeter[i].y);
    }
  }
  ctx.stroke();

  // print coordinates
  if (perimeter.length == 0) {
    document.getElementById('coordinates').value = '';
  } else {
    document.getElementById('coordinates').value = JSON.stringify(perimeter);
  }
}

function check_intersect(x, y) {
  if (perimeter.length < 4) {
    return false;
  }
  var p0 = new Point();
  var p1 = new Point();
  var p2 = new Point();
  var p3 = new Point();

  p2.x = perimeter[perimeter.length - 1].x;
  p2.y = perimeter[perimeter.length - 1].y;
  p3.x = x;
  p3.y = y;

  for (var i = 0; i < perimeter.length - 1; i++) {
    p0.x = perimeter[i].x;
    p0.y = perimeter[i].y;
    p1.x = perimeter[i + 1].x;
    p1.y = perimeter[i + 1].y;
    if (p1.x === p2.x && p1.y === p2.y) {
      continue;
    }
    if (p0.x === p3.x && p0.y === p3.y) {
      continue;
    }
    if (line_intersects(p0, p1, p2, p3) === true) {
      return true;
    }
  }
  return false;
}

function joinends() {
  complete = true;
  addObstacle(perimeter);
}
function point_it(event) {
  if (complete) {
    alert('Polygon already created');
    return false;
  }
  var rect, x, y;

  if (event.ctrlKey || event.which === 3 || event.button === 2) {
    if (perimeter.length === 2) {
      alert('You need at least three points for a polygon');
      return false;
    }
    x = perimeter[0].x;
    y = perimeter[0].y;
    if (check_intersect(x, y)) {
      alert('The line you are drawing intersect another line');
      return false;
    }
    joinends();
    event.preventDefault();
    return false;
  } else {
    rect = canvas.getBoundingClientRect();
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
    if (perimeter.length > 0 && x === perimeter[perimeter.length - 1].x && y === perimeter[perimeter.length - 1].y) {
      // same point - double click
      return false;
    }
    if (check_intersect(x, y)) {
      alert('The line you are drawing intersect another line');
      return false;
    }
    perimeter.push(new Point(x,y));
    return false;
  }
}

function renderPolygon(ctx) {
  draw(ctx);
}