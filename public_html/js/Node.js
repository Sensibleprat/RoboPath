// License: GPL. For details, see LICENSE file.
class Node {
  config;
  parent;
  childrens = new Array();
  edges = new Array();
  index;
  constructor(config, index) {
    this.config = config;
    this.index = index;
  }
  
  addChild(childNode) {
    this.childrens.push(childNode);
  }
  
  setParent(parentNode) {
    this.parent = parentNode;
  }
  
  addEdge(edge) {
    this.edges.push(edge);
  }
}

