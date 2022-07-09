// License: GPL. For details, see LICENSE file.
class Config {

  constructor() {
    if (this.constructor === Config) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }
  isValid(obstacles) {
    throw new Error("Not Implemented Method");
  }

  render(ctx, color) {
    throw new Error("Not Implemented Method");
  }

  static dist(u, v) {
    throw new Error("Not Implemented Method");
  }

  static renderEdge(u, v, ctx, color, prec) {
    throw new Error("Not Implemented Method");
  }
}

class PointRobot extends Config {
  point;
  constructor(point) {
    super();
    this.point = point;
  }
  isValid() {
    let obstacles = getObstacles();
    for (var i = 0; i < obstacles.length; i++) {
      let polygon = obstacles[i];
      if (pointInsidePolygon(this.point, polygon)) {
        return false;
      }
    }
    return true;
  }

  render(ctx, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(this.point.x, this.point.y, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }

  dist(u, v) {
    return Math.sqrt(Math.pow((u.point.x - v.point.x), 2) + Math.pow((u.point.y - v.point.y), 2));
  }

  renderEdge(u, v, ctx, color, prec) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(u.point.x, u.point.y);
    ctx.lineTo(v.point.x, v.point.y);
    ctx.stroke();
    ctx.closePath();
  }

  renderPath(path, ctx, color, prec) {
    let cur = path;
    while (cur.parent != null) {
      let parent = cur.parent;
      let u = cur.node.config.point;
      let v = parent.node.config.point;
      let distance = this.dist(cur.node.config, parent.node.config);
      for (let lambda = prec; lambda < distance; lambda += prec) {
        let x = u.x + (v.x - u.x) * lambda / distance;
        let y = u.y + (v.y - u.y) * lambda / distance;
        let config = new PointRobot(new Point(x, y));
        config.render(ctx, color);
      }
      cur.node.config.render(ctx, color);
      parent.node.config.render(ctx, color);
      cur = cur.parent;
    }
  }
}

var recLength = 20.0;
var rectBreadth = 10.0;
var rectAgility = 10.0;
class RectangularRobot extends Config {
  point;
  theta;
  corners;
  constructor(point, theta) {
    super();
    this.point = point;
    this.theta = theta;
    this.corners = new Array();
    let x = point.x;
    let y = point.y;
    let l = recLength;
    let b = rectBreadth;
    this.corners.push(rotateAround(point, new Point(x + l / 2, y + b / 2), theta));
    this.corners.push(rotateAround(point, new Point(x - l / 2, y + b / 2), theta));
    this.corners.push(rotateAround(point, new Point(x - l / 2, y - b / 2), theta));
    this.corners.push(rotateAround(point, new Point(x + l / 2, y - b / 2), theta));
  }

  isValid() {
    let obstacles = getObstacles();
    for (var i = 0; i < obstacles.length; i++) {
      let polygon = obstacles[i];
      if (polygonIntersect(this.corners, polygon)) {
        return false;
      }
    }
    return true;
  }
  render(ctx, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < this.corners.length; i++) {
      let p = this.corners[i];
      if (i == 0) {
        ctx.moveTo(p.x, p.y);
      } else {
        ctx.lineTo(p.x, p.y);
      }
    }
    ctx.fill();
    ctx.closePath();
  }
  dist(u, v) {
    return Math.sqrt(Math.pow((u.point.x - v.point.x), 2) + Math.pow((u.point.y - v.point.y), 2))
            + rectAgility * piToPi(u.theta - v.theta);
  }

  renderEdge(u, v, ctx, color, prec) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(u.point.x, u.point.y);
    ctx.lineTo(v.point.x, v.point.y);
    ctx.stroke();
    ctx.closePath();
  }
  renderPath(path, ctx, color, prec) {
    let cur = path;
    while (cur.parent != null) {
      let parent = cur.parent;
      let u = cur.node.config.point;
      let v = parent.node.config.point;
      let distance = this.dist(cur.node.config, parent.node.config);
      for (let lambda = prec; lambda < distance; lambda += prec) {
        let x = u.x + (v.x - u.x) * lambda / distance;
        let y = u.y + (v.y - u.y) * lambda / distance;
        let theta = u.theta + piToPi(v.theta - u.theta) * lambda / distance;
        let config = new RectangularRobot(new Point(x, y), theta);
        config.render(ctx, color);
      }
      cur.node.config.render(ctx, color);
      parent.node.config.render(ctx, color);
      cur = cur.parent;
    }
  }
}


