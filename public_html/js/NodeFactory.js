// License: GPL. For details, see LICENSE file.

var index = 0;

function createIndexed(config) {
  return new Node(config, index++);
}

function create(config) {
  return new Node(config,null);
}
function getNodeCount() {
  return index;
}
