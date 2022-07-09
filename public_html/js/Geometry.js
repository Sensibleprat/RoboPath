// License: GPL. For details, see LICENSE file.
var epsilon = 1e-8;
function pointInsidePolygon(Point, polygon) {
  let x = Point.x;
  let y = Point.y;
  for (let i = 0; i < polygon.length; i++) {
    let p1 = polygon[i];
    let p2 = polygon[(i + 1) % polygon.length];
    let p3 = polygon[(i + 2) % polygon.length];
    let sign1 = Math.sign(x - p2.x);
    let isSeparatingEdge = true;
    if (Math.abs(p1.x - p2.x) < epsilon) {
      var sign2 = Math.sign(p3.x - p2.x);
      if (sign1 * sign2 > epsilon) {
        isSeparatingEdge = false;
      }
    } else {
      let m, c;
      m = (p2.y - p1.y) / (p2.x - p1.x);
      c = (p1.y * (p2.x - p1.x) - p1.x * (p2.y - p1.y)) / (p2.x - p1.x);
      let sign1 = p3.y - m * p3.x - c;
      let sign2 = y - m * x - c;
      if (sign2 * sign1 > 0) {
        isSeparatingEdge = false;
      }
    }
    if (isSeparatingEdge) {
      return false;
    }
  }
  return true;
}

function rotateAround(cen, p, theta) {
  let tempX = p.x - cen.x;
  let tempY = p.y - cen.y;

// now apply rotation
  let rotatedX = tempX * Math.cos(theta) - tempY * Math.sin(theta);
  let rotatedY = tempX * Math.sin(theta) + tempY * Math.cos(theta);

// translate back
  let x = rotatedX + cen.x;
  let y = rotatedY + cen.y;
  return new Point(x, y);
}

function polygonIntersect(poly1, poly2) {
  return !hasSeparatingEdge(poly1, poly2) && !hasSeparatingEdge(poly2, poly1);
}

//check if first polygon has a separating edge
function hasSeparatingEdge(o1, o2) {
  let p1, p2;
  for (let i = 0; i < o1.length; i++) {
    p1 = o1[i];
    p2 = o1[(i + 1) % o1.length];
    let p3 = o1[(i + 2) % o1.length];

    let isSeparatingEdge = true;
    if (Math.abs(p1.x - p2.x) < epsilon) {
      let sign1 = Math.sign(p3.x - p2.x);

      for (let j = 0; j < o2.length; j++) {
        let p = o2[j];
        let sign2 = Math.sign(p.x - p2.x);
        if (sign2 * sign1 > 0) {
          isSeparatingEdge = false;
          break;
        }
      }
    } else {
      let m, c;
      m = (p2.y - p1.y) / (p2.x - p1.x);
      c = (p1.y * (p2.x - p1.x) - p1.x * (p2.y - p1.y)) / (p2.x - p1.x);
      let sign1 = Math.sign(p3.y - m * p3.x - c);
      for (let j = 0; j < o2.length; j++) {
        let p = o2[j];
        let sign2 = Math.sign(p.y - m * p.x - c);
        if (sign2 * sign1 > 0) {
          isSeparatingEdge = false;
          break;
        }
      }
    }
    if (isSeparatingEdge) {
      return true;
    }
  }
  return false;
}

function piToPi(theta) {
  return Math.atan2(Math.sin(theta), Math.cos(theta));
}



