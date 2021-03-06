interface BSTNode {
  data: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

class BSTNode implements BSTNode {
  constructor(
    data: number,
    left: BSTNode | null = null,
    right: BSTNode | null = null
  ) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

interface BinarySearchTree {
  root: BSTNode | null;
  add(data: number): void;
}

class BinarySearchTree implements BinarySearchTree {
  constructor() {
    this.root = null;
  }

  add(data: number) {
    const node = this.root;
    if (node === null) {
      this.root = new BSTNode(data);
      return;
    } else {
      const searchTree = (node: BSTNode): BSTNode | null => {
        if (data < node.data) {
          // Left node
          if (node.left === null) {
            node.left = new BSTNode(data);
            return node.left;
          } else {
            return searchTree(node.left);
          }
        } else if (data > node.data) {
          // Right node
          if (node.right === null) {
            node.right = new BSTNode(data);
            return node.left;
          } else {
            return searchTree(node.right);
          }
        } else {
          // Same value. Return null
          return null;
        }
      };
      return searchTree(node);
    }
  }

  findMin() {
    let current = this.root;
    let minNode;
    while (current !== null) {
      minNode = current;
      current = current.left;
    }
    return minNode;
  }

  findMax() {
    let current = this.root;
    let maxNode;
    while (current !== null) {
      maxNode = current;
      current = current.right;
    }
    return maxNode;
  }

  find(data: number) {
    let searchTree = (node: BSTNode | null): BSTNode | null => {
      if (node === null) {
        return null;
      } else if (data < node.data) {
        return searchTree(node.left);
      } else if (data > node.data) {
        return searchTree(node.right);
      } else {
        // We found it
        return node;
      }
    };
    return searchTree(this.root);
  }

  isPresent(data: number) {
    return !!this.find(data);
  }

  remove(data: number) {
    const removeNode = (node: BSTNode | null, data: number) => {
      console.log("recursion");
      if (node === null) return null;
      if (data === node.data) {
        // We found node
        if (node.left === null && node.right === null) {
          // Node has no children. Simply remove it
          return null;
        }
        if (node.left === null) {
          // Has no left children. Place right to current
          return node.right;
        }
        if (node.right === null) {
          // Has no right children. Place left to current
          return node.left;
        }
        // Node has both children. Place lowest left node from the right branch
        let tempNode = node.right;
        while (tempNode.left !== null) {
          tempNode = tempNode.left;
        }
        node.data = tempNode.data;
        node.right = removeNode(node.right, tempNode.data);
        return node;
      } else if (data < node.data) {
        // We shoud move to the left
        node.left = removeNode(node.left, data);
        return node;
      } else {
        // We should move to the right
        node.right = removeNode(node.right, data);
        return node;
      }
    };
    this.root = removeNode(this.root, data);
    return this.root;
  }

  isBalanced() {
    return this.findMinHeight() >= this.findMaxHeight() - 1;
  }

  findMinHeight(node: BSTNode | null = this.root): number {
    if (node == null) return -1;
    const left = this.findMinHeight(node.left);
    const right = this.findMinHeight(node.right);
    if (left < right) return left + 1;
    else return right + 1;
  }

  findMaxHeight(node: BSTNode | null = this.root): number {
    if (node == null) return -1;
    const left = this.findMaxHeight(node.left);
    const right = this.findMaxHeight(node.right);
    if (left > right) return left + 1;
    else return right + 1;
  }

  preOrder() {
    if (this.root === null) {
      return null;
    } else {
      let result = new Array();
      const traversePreOrder = (node: BSTNode) => {
        result.push(node.data);
        node.left && traversePreOrder(node.left);
        node.right && traversePreOrder(node.right);
      };
      traversePreOrder(this.root);
      return result;
    }
  }

  inOrder() {
    if (this.root === null) {
      return null;
    } else {
      let result = new Array();
      const traverseInOrder = (node: BSTNode) => {
        node.left && traverseInOrder(node.left);
        result.push(node.data);
        node.right && traverseInOrder(node.right);
      };
      traverseInOrder(this.root);
      return result;
    }
  }

  postOrder() {
    if (this.root === null) {
      return null;
    } else {
      let result = new Array();
      const traversePostOrder = (node: BSTNode) => {
        node.left && traversePostOrder(node.left);
        node.right && traversePostOrder(node.right);
        result.push(node.data);
      };
      traversePostOrder(this.root);
      return result;
    }
  }

  levelOrder() {
    let result = new Array();
    let Q = new Array();
    if (this.root !== null) {
      Q.push(this.root);
      while (Q.length > 0) {
        let node = Q.shift();
        result.push(node.data);
        if (node.left != null) {
          Q.push(node.left);
        }
        if (node.right != null) {
          Q.push(node.right);
        }
      }
      return result;
    } else {
      return null;
    }
  }
}

const tree = new BinarySearchTree();
tree.add(5);
tree.add(2);
tree.add(6);
tree.add(4);
tree.add(9);
tree.add(1);
console.log(tree);
console.log("min", tree.findMin());
console.log("max", tree.findMax());
console.log("find 6", tree.find(6));
console.log("5 is present", tree.isPresent(5));
tree.remove(5);
console.log("find 5", tree.find(5));
console.log(tree);
console.log("find min height:", tree.findMinHeight());
console.log("find max height:", tree.findMaxHeight());
console.log("is balanced:", tree.isBalanced());
console.log("traverse inOrder:", tree.inOrder());
console.log("traverse preOrder:", tree.preOrder());
console.log("traverse postOrder:", tree.postOrder());
console.log("traverse levelOrder:", tree.levelOrder());

const tempTree = new BinarySearchTree();
tempTree.add(6);
tempTree.add(5);
tempTree.add(7);
tempTree.add(4);
console.log(tempTree);
