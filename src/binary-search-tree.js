const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
* Your task is to implement the class BinarySearchTree. Each instance of BinarySearchTree must have following methods:

* root — return root node of the tree
* add(data) — add node with data to the tree
* has(data) — returns true if node with the data exists in the tree and false otherwise
* find(data) — returns node with the data if node with the data exists in the tree and null otherwise
* remove(data) — removes node with the data from the tree if node with the data exists
* min — returns minimal value stored in the tree (or null if tree has no nodes)
* max — returns maximal value stored in the tree (or null if tree has no nodes)

* @example:

* const tree = new BinarySearchTree();

* tree.add(1);

* tree.add(2);

* tree.add(3);

* tree.add(4);

* tree.add(5);

* tree.root().data => 1;

* tree.min() => 1

* tree.max() => 5

* tree.remove(5);

* tree.has(5) => false

* tree.max() => 4
*/


class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);
    if (this.rootNode === null) {
      this.rootNode = newNode;
      return;
    }

    let curr = this.rootNode;
    while (true) {
      if (data < curr.data) {
        if (curr.left === null) {
          curr.left = newNode;
          break;
        }
        curr = curr.left;
      } else {
        if (curr.right === null) {
          curr.right = newNode;
          break;
        }
        curr = curr.right;
      }
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    let curr = this.rootNode;
    while (curr !== null) {
      if (data === curr.data) {
        return curr;
      }
      curr = data < curr.data ? curr.left : curr.right;
    }
    return null;
  }

  remove(data) {
    this.rootNode = this.removeNode(this.rootNode, data);
  }

  removeNode(node, data) {
    if (node === null) {
      return null;
    }

    if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this.removeNode(node.right, data);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        return null;
      }
      if (node.left === null) {
        return node.right;
      }
      if (node.right === null) {
        return node.left;
      }

      let minRight = node.right;
      while (minRight.left !== null) {
        minRight = minRight.left;
      }
      node.data = minRight.data;
      node.right = this.removeNode(node.right, minRight.data);
      return node;
    }
  }

  findExtreme(node, direction) {
    if (node === null) {
      return null;
    }
    let curr = node;
    while (curr[direction] !== null) {
      curr = curr[direction];
    }
    return curr.data;
  }

  min() {
    return this.findExtreme(this.rootNode, 'left');
  }

  max() {
    return this.findExtreme(this.rootNode, 'right');
  }
}

module.exports = {
  BinarySearchTree
};