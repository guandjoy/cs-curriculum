import { takeWhile } from "ramda";

interface LinkedListNode {
  element: any;
  next: LinkedListNode | null;
}

class LinkedListNode implements LinkedListNode {
  constructor(element: any) {
    this.element = element;
    this.next = null;
  }
}

export interface LinkedList {
  head: LinkedListNode | null;
  length: number;
  size(): number;
  add<T>(element: T): void;
  remove<T>(element: T): void;
  isEmpty(): boolean;
  indexOf<T>(element: T): number;
  elementAt(index: number): any;
  addAt<T>(index: number, element: T): boolean;
  removeAt(index: number): boolean;
}

export class LinkedList implements LinkedList {
  constructor(element: any = null) {
    this.head = element && new LinkedListNode(element);
    this.length = 0;
  }

  size() {
    return this.length;
  }

  add<T>(element: T) {
    const node = new LinkedListNode(element);
    if (this.head === null) {
      this.head = node;
    } else {
      let currentNode = this.head;
      while (currentNode.next) {
        // Walk to the last node
        currentNode = currentNode.next;
      }
      currentNode.next = node;
    }
    this.length++;
  }

  remove<T>(element: T) {
    if (this.head === null) return false;
    let prevNode = null;
    let currentNode = this.head;
    while (currentNode.next && currentNode.element !== element) {
      // Itterate through and pick the right node or stop on the last one
      prevNode = currentNode;
      currentNode = currentNode.next;
    }
    const isExist = currentNode.element === element;
    if (isExist === false) return false;
    // If we found node
    if (currentNode.next) {
      // If the node is somewhere in the middle
      // Replace it with the next one
      currentNode.element = currentNode.next.element;
      currentNode.next = currentNode.next.next;
    } else if (this.head === currentNode) {
      // if the node is head and the only node in the chain
      this.head = null;
    } else if (prevNode) {
      // if the node is the last in the chain but previous exists
      prevNode.next = null;
    }
    this.length--;
    return true;
  }

  isEmpty() {
    return this.length === 0;
  }

  indexOf(element: any) {
    let currentNode = this.head;
    let index = -1;
    if (currentNode === null) return index;
    while (currentNode) {
      index++;
      if (currentNode.element === element) return index;
      currentNode = currentNode.next;
    }
    return -1;
  }

  elementAt(index: number) {
    let count = -1;
    let currentNode = this.head;
    while (currentNode) {
      count++;
      if (index === count) return currentNode;
      currentNode = currentNode.next;
    }
    return null;
  }

  addAt<T>(index: number, element: T) {
    if (index > this.length)
      // Index if out of range
      return false;

    let newNode = new LinkedListNode(element);
    let currentNode = this.head;
    let prevNode;
    let currentIndex = 0;
    while (currentIndex < index && currentNode) {
      currentIndex++;
      prevNode = currentNode;
      currentNode = currentNode.next;
    }
    if (!prevNode && currentNode === null) {
      // List is empty & index = 0
      currentNode = newNode;
      return true;
    } else if (!prevNode) {
      // index = 0 & list non-empty. Change head
      newNode.next = currentNode;
      this.head = newNode;
    } else {
      // index > 0
      newNode.next = currentNode;
      prevNode.next = newNode;
    }
    this.length++;
    return true;
  }

  removeAt(index: number) {
    if (index < 0 || index >= this.length) return false;
    let currentNode = this.head;
    let currentIndex = 0;
    let prevNode;
    while (currentIndex < index && currentNode) {
      // Search for node to delete
      currentIndex++;
      prevNode = currentNode;
      currentNode = currentNode.next;
    }
    if (currentNode === null)
      // Nothing to delete
      return false;
    else if (!prevNode) {
      // Delete zero index
      this.head = currentNode.next;
    } else {
      // Delete more that zero index
      prevNode.next = currentNode.next;
    }
    this.length--;
    return true;
  }
}

// const LLInstance = new LinkedList();
// console.log(LLInstance.size());
// console.log(LLInstance.head);
// LLInstance.add("new one");
// LLInstance.add("second one");
// LLInstance.add("third one");
// console.log(LLInstance.size());
// console.log(LLInstance);
// console.log(LLInstance.remove("new one"));
// console.log(LLInstance);
// console.log(LLInstance.head);
// console.log(LLInstance.indexOf("second one"));
// console.log(LLInstance.elementAt(1));
// console.log(LLInstance.addAt(0, "WOW"));
// console.log(LLInstance);
// console.log(LLInstance.removeAt(1));
// console.log(LLInstance);
