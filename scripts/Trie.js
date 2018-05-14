import Node from './Node.js';

export default class Trie {
  constructor() {
    this.root = new Node();
    this.counter = 0;
    this.suggest = [];
  }

  count() {
    return this.counter;
  }

  insert(data) {
    let wordArray = [...data.toLowerCase()];
    let currentNode = this.root;

    wordArray.forEach(letter => {
      if (!currentNode.children[letter]) {
        currentNode.children[letter] = new Node(letter);
      }
      currentNode = currentNode.children[letter];
    });

    if (!currentNode.complete) {
      this.counter++;
      currentNode.complete = wordArray.join('');
    }
  }

  suggest(letters) {
    let letterArray = [...letters.toLowerCase()];
    let currentNode = this.root;

    letterArray.forEach(letter => {
      if (currentNode.children.data === letter) {
        console.log('hi')
      }
    });
  }

  populate(array) {
    array.forEach(word => {
      this.insert(word);
    });
  }

  expand() {

  }

  optimize() {

  }
}