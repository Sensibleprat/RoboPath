// License: GPL. For details, see LICENSE file.
class State {
  cost;
  fValue;
  node;
  parent;
  goalNode;

  constructor(node, cost, parent, goalNode) {
    this.node = node;
    this.cost = cost;
    this.parent = parent;
    this.goalNode = goalNode;
    this.fValue = cost + node.config.dist(node.config, goalNode.config);
  }

  nextStates() {
    let res = new Array();
    this.node.edges.forEach(edge => {
      if (edge[0].index == this.node.index) {
        res.push(new State(edge[1], this.cost + this.node.config.dist(edge[1].config, edge[0].config),
        this, this.goalNode));
      } else {
        res.push(new State(edge[0], this.cost + this.node.config.dist(edge[1].config, edge[0].config),
        this, this.goalNode));
      }
    });
    return res;
  }
}

