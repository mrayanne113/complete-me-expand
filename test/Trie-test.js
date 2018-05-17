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
    assert.deepEqual(trie.suggestions, []);
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

    it('should return a empty array if the word isnt there', () => {
      trie.suggest('a');
      assert.deepEqual(trie.suggestions, []);
    });

    it('should return a empty array if the word isnt there', () => {
      trie.suggest('wo');
      assert.deepEqual(trie.suggestions, ['word', 'words', 'world']);
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

    it('should suggest() words from the dictionary', () => {
      trie.populate(dictionary);

      assert.deepEqual(trie.suggest('zapa'), ['zapara',  'zaparan', 'zaparo', 'zaparoan', 'zapas', 'zapatero']);
    });
  });

  
  describe('Optimize', () => {
    beforeEach(() => {
      trie.insert('cake');
      trie.insert('cherry');
      trie.insert('caketopper');
      trie.insert('dog');
      trie.insert('doug');
      
    });

    it('should reduce nodes together if possible', () => {
      trie.optimize();
      // console.log(JSON.stringify(trie, null, 4));

      assert.equal(trie.root.children.c.children.a.data, 'ake');
    });
  });

  describe('Expand', () => {
    it('should split nodes that have been optimized back into single letter nodes', () => {
      trie.populate(['cake', 'caketopper', 'cherry', 'chi']);
      trie.optimize();
      assert.deepEqual(trie.root.children.c.children.a.data, 'ake');

      trie.expand();
      console.log(JSON.stringify(trie, null, 4));      
    
      assert.deepEqual(trie.root.children.c.children.a.data, 'a');
    });
  });
});
