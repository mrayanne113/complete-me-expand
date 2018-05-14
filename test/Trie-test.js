import { assert } from 'chai';
import Trie from '../scripts/Trie.js';
import Node from '../scripts/Node.js';

const fs = require('fs');
const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n');

describe('Trie', () => {
  let trie;

  beforeEach(() => {
    trie = new Trie();
  });

  it('should start with default values', () => {
  
    assert.deepEqual(trie.root, new Node());
    assert.equal(trie.counter, 0);
    assert.deepEqual(trie.suggest, []);
  });

  describe('Insert', () => {
    it('should take in new words and create nodes for each letter of word', () => {
      trie.insert('word');
      const result = trie.root.children.w.children.o.children.r.children.d.complete;

      assert.equal(result, 'word');
    });

    it('should plus the trie.counter on each complete word', () => {
      assert.equal(trie.counter, 0);
      trie.insert('love');
      assert.equal(trie.counter, 1);      
    });
  });

  describe('Count', () => {
    it('should return the count of words in the trie', () => {
      assert.equal(trie.count(), 0);
      trie.insert('word');
      assert.equal(trie.count(), 1);      
    });
  });

  describe('Suggest', () => {
    beforeEach(() => {
      trie.insert('word');
      trie.insert('whoo');
      trie.insert('words');
      trie.insert('world');
    });

    it('should do something', () => {
      trie.suggest('w');

    });
  });

  describe('Populate', () => {
    it('should insert an array of words', () => {
      let array = ['fun', 'words', 'sleepy', 'eat'];

      trie.populate(array);

      assert.equal(trie.counter, 4);
    });

    it('should insert an large array', () => {
      trie.populate(dictionary);

      assert.equal(trie.counter, 234371);
    });
  });

  describe('Expand', () => {

  });

  describe('Optimize', () => {

  });
});
